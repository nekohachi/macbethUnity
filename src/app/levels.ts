/**
 * サブディビジョンレベルの出し入れ（`32` の T3。`03` の 3.3）。
 *
 * `app.ts` を太らせないために、レベルまわりはここへ寄せる。
 *
 * 真は `o.multires`（レベルごとのデルタ）。`o.stack` は生きた `Multires` で、
 * デルタから作り直せる控え。**`.mbz` にも履歴にも入らない。**
 *
 * 細分割は wasm があればそれを使う（`30` の T3）。無ければ JS の
 * `catmullClark` に落ちる。どちらで組んだかは `usingWasm()` で分かる。
 */
import {
  Multires,
  averageEdge,
  boundsDiagonal,
  buildBvh,
  buildMirrorMap,
  projectOnto,
  catmullClark,
  estimateLevelBytes,
  maskDown,
  maskIsEmpty,
  maskUp,
  type Mesh,
  type MirrorMap,
  type SceneObject,
  type SculptLayer,
} from "../core/index.js";
import { buildFromGeometry, loadWasm, subdivGeometry, type WasmModule } from "./wasm/index.js";

/** 読み込みが済んだ wasm。まだなら null。 */
let wasm: WasmModule | null = null;
/** 読み込み中の約束。**待っている人がいれば同じものを返す。** */
let warming: Promise<void> | null = null;

/**
 * wasm を読み始める。スカルプトに入ったときに呼び、段を組む前にも待つ。
 *
 * **2 度目以降も「読み終わるまで」を返す。** 「もう頼んだ」で素通りさせると、
 * 読み込み中に段を足したときだけ JS で組まれてしまう。
 * 読めても読めなくても、段の操作はできる（JS に落ちるだけ）。
 */
export function warmUpLevels(): Promise<void> {
  return (warming ??= loadWasm().then((m) => {
    wasm = m;
  }));
}

/** いま細分割に wasm を使えるか。HUD に出す。 */
export function usingWasm(): boolean {
  return wasm !== null;
}

/**
 * 1 レベルぶんの細分割。wasm があればそれ、無ければ JS。
 *
 * wasm がメモリ不足で返せなかったときも JS に落ちる。結果は 1 ビットも
 * 同じなので（`tests/subdiv-wasm.test.ts`）、途中で切り替わっても構わない。
 */
function subdivideOne(mesh: Mesh): Mesh {
  if (wasm) {
    const g = subdivGeometry(wasm, mesh);
    if (g) return buildFromGeometry(mesh, g);
  }
  return catmullClark(mesh);
}

/**
 * 生きたスタックを用意する。`o.multires` の中身と食い違っていれば作り直す。
 *
 * `o.stack.deltas` と `o.multires` は**別の配列**にする。履歴が
 * `multires.slice()` で控えるので、同じものを指すとずれるため。
 */
export function levelsOf(o: SceneObject): Multires {
  const want = o.multires.length;
  let stack = o.stack;
  if (stack && (stack.base !== o.mesh || stack.levelCount !== want)) stack = null;
  if (!stack) {
    stack = new Multires(o.mesh, { subdivide: subdivideOne });
    for (let i = 0; i < want; i++) stack.divide();
    o.stack = stack;
  }
  // デルタを入れ直す（履歴で戻ったときも、ここでそろう）。
  // **レイヤーがある段だけ**合成したものを入れる（`42` の T3）。1 枚も無ければ
  // 今までどおり `multires` のデルタをそのまま渡すので、掛かりも増えない
  for (let i = 0; i < want; i++) {
    const level = o.multires.find((m) => m.level === i + 1);
    stack.deltas[i] = hasLayers(o, i + 1) ? combinedFor(o, i + 1) : (level ? level.delta : null);
  }
  return stack;
}

/** その段にレイヤーが 1 枚でもあるか。 */
export function hasLayers(o: SceneObject, level: number): boolean {
  return o.sculptLayers.some((l) => l.level === level);
}

/** その段の素のデルタ（レイヤーを足す前）。無ければ null。 */
export function baseDelta(o: SceneObject, level: number): Float32Array | null {
  return o.multires.find((m) => m.level === level)?.delta ?? null;
}

/**
 * その段の**効いているデルタ**（`42` の T3）。`base + Σ(見えているレイヤー × 重み)`。
 * 控えは `o.combined`。長さが合わなければ作り直す。
 */
export function combinedFor(o: SceneObject, level: number): Float32Array {
  const base = baseDelta(o, level);
  const size = base?.length ?? 0;
  let out = o.combined.get(level);
  if (!out || out.length !== size) {
    out = new Float32Array(size);
    o.combined.set(level, out);
    refreshCombined(o, level);
  }
  return out;
}

/**
 * 合成を計算し直す。`verts` を渡せばその頂点だけ（1 コマぶんの流しで使う）。
 * レイヤーが無い段なら何もしない（`multires` のデルタがそのまま効いている）。
 */
export function refreshCombined(o: SceneObject, level: number, verts?: Iterable<number>): void {
  const out = o.combined.get(level);
  const base = baseDelta(o, level);
  if (!out || !base || out.length !== base.length) return;
  const layers = o.sculptLayers.filter((l) => l.level === level && l.visible && l.weight !== 0);
  const write = (v: number) => {
    const i = v * 3;
    if (i + 2 >= out.length) return;
    let x = base[i],
      y = base[i + 1],
      z = base[i + 2];
    for (const l of layers) {
      if (i + 2 >= l.delta.length) continue;
      x += l.delta[i] * l.weight;
      y += l.delta[i + 1] * l.weight;
      z += l.delta[i + 2] * l.weight;
    }
    out[i] = x;
    out[i + 1] = y;
    out[i + 2] = z;
  };
  if (verts) for (const v of verts) write(v);
  else for (let v = 0; v * 3 < out.length; v++) write(v);
}

/**
 * レイヤーの重み・表示・並びを触ったあとに呼ぶ。合成を捨てて形を作り直す。
 * 戻り値はその段の頂点の数（描画の作り直しに使う）。
 */
export function applyLayers(o: SceneObject, level: number): number {
  o.combined.delete(level);
  const stack = levelsOf(o);
  if (level < 1 || level > stack.levelCount) return 0;
  const count = stack.level(level).vertexCount;
  const all = new Uint32Array(count);
  for (let v = 0; v < count; v++) all[v] = v;
  stack.rebuildDetail(level, all);
  return count;
}

/** いま記録しているレイヤー（`state.activeLayer`）。素のデルタへ書くなら null。 */
export function layerById(o: SceneObject, id: string | null): SculptLayer | null {
  if (!id) return null;
  return o.sculptLayers.find((l) => l.id === id) ?? null;
}

/**
 * マスクを目当ての段へ移す（`34` の T2）。
 *
 * マスクは**1 つの段にだけ**持つので、彫る段を変えたら一緒に移す。
 * 1 段ずつ `maskUp` / `maskDown` を通す（`SubdivPlan` は作らない）。
 *
 * **レベル 0 へは移さない。** レベル 0 では彫らない（`canSculpt` が段 1 以上を
 * 求める）ので移す意味がないし、下ろして戻すと細部が消える。見ているだけの
 * 行き来でマスクを削らないため、そのまま置いておく。
 *
 * 下ろしてから戻すと細部は消える（`34` の 1 章で受け入れた分）。ぼかしで直る。
 */
export function moveMaskTo(o: SceneObject, level: number): void {
  const m = o.mask;
  if (!m) return;
  const want = Math.max(0, Math.min(level, levelCount(o)));
  if (want === 0 || want === m.level) return;
  const stack = levelsOf(o);
  let values = m.values;
  let at = m.level;
  while (at < want) {
    values = maskUp(stack.level(at), values);
    at++;
  }
  while (at > want) {
    values = maskDown(values, stack.level(at - 1).vertexCount);
    at--;
  }
  // 全部 0 になったら持たない（`34` の 1 章）
  o.mask = maskIsEmpty(values) ? null : { level: want, values };
}

/**
 * `o.stack.deltas` を `o.multires` へ書き戻す（`42`）。
 *
 * ふつうは同じ `Float32Array` を指しているので何もしなくてよいが、
 * `Multires.sculpt` はデルタを**作り直す**（新しい配列になる）。
 * それを使ったあとは必ずここを通すこと。
 */
export function syncDeltas(o: SceneObject): void {
  const stack = o.stack;
  if (!stack) return;
  o.multires = stack.deltas.map((d, i) => ({
    level: i + 1,
    delta: d ?? new Float32Array(stack.level(i + 1).vertexCount * 3),
  }));
}

/**
 * ローをハイに合わせる（`42` の T1）。形は変わらず、デルタだけ小さくなる。
 * レベル 0 の座標が変わるので、パラメトリックではなくなる。
 */
export function fitLowToHigh(o: SceneObject): { residual: number; before: number; after: number } | null {
  if (!o.multires.length) return null;
  const out = levelsOf(o).fitBaseToDetail();
  o.parametric = false;
  syncDeltas(o);
  // レベル 0 が変われば対称の対応表も引き直す
  o.mirrorMaps.clear();
  return out;
}

/**
 * 捨てる前のハイを、今のいちばん上の段へ焼き戻す（`42` の T2）。
 * 控えが無ければ `null`。
 */
export function reprojectDetail(o: SceneObject): { moved: number; worst: number; missed: number } | null {
  const cache = o.detailCache;
  if (!cache || !o.multires.length) return null;
  const stack = levelsOf(o);
  const top = o.multires.length;
  const mesh = stack.level(top);
  const src = cache.mesh;
  const tris = src.triangulate();
  const bvh = buildBvh(src.positions, { tri: tris.tri });
  const edge = averageEdge(src.positions, { tri: tris.tri });
  const out = projectOnto(mesh, src.positions, { tri: tris.tri }, bvh, Math.max(edge * 2, 1e-6), edge * 32);
  // 動かした座標をデルタに焼く（`sculpt` は控えを捨てるので `syncDeltas` が要る）
  stack.sculpt(top, mesh);
  syncDeltas(o);
  return out;
}

/** 段の数（レベル 0 を含まない）。 */
export function levelCount(o: SceneObject): number {
  return o.multires.length;
}

/** レベル L の四角形数。 */
export function facesAt(o: SceneObject, level: number): number {
  return o.mesh.faceCount * 4 ** level;
}

/** いまある段ぜんぶの推定メモリ（バイト）。`extra` を渡すと、その段も足して見積もる。 */
export function estimateBytes(o: SceneObject, extra = 0): number {
  let total = 0;
  const top = levelCount(o) + extra;
  for (let l = 1; l <= top; l++) total += estimateLevelBytes(facesAt(o, l));
  return total;
}

/**
 * メモリの予算（バイト）。`01` の 1.4 の表（iPad Pro 3.0GB / mini 1.2GB）から
 * 余裕を見た値。`?budget=`（MB）で上書きできる（通し確認用）。
 */
export function budgetBytes(): number {
  const override = Number(new URLSearchParams(location.search).get("budget"));
  if (override > 0) return override * 1048576;
  const ua = navigator.userAgent;
  const safari = ua.includes("Safari") && !ua.includes("Chrome") && !ua.includes("Chromium");
  return safari ? 1024 * 1048576 : 2560 * 1048576;
}

/** 段を 1 つ足せるか。足せないときは理由を返す。 */
export function canAddLevel(o: SceneObject): { ok: boolean; want: number; budget: number } {
  const want = estimateBytes(o, 1);
  const budget = budgetBytes();
  return { ok: want <= budget, want, budget };
}

/** メモリの見せ方。1MB に満たないと「0 MB」になってしまうので、そこは KB で。 */
export function asMb(bytes: number): string {
  if (bytes < 1048576) return `${Math.round(bytes / 1024)} KB`;
  return `${Math.round(bytes / 1048576)} MB`;
}

/**
 * オブジェクトの大きさからブラシの半径を決める（`33` の T1）。
 *
 * 半径はワールド単位なので、小さい像と大きい像で同じ数字では使えない。
 * 対角の **6.6%** を初期値にする。**選び直したときだけ**呼ぶこと（ユーザーが
 * ゲージで決めた値を毎回上書きしてはいけない）。
 *
 * **実機で触って決めた値**（2026-09-09）。既定の球（対角 3.46）で 0.23 になる。
 * 8% → 3% と下げたが、3% は細すぎるとのことだったので間に戻した。
 *
 * **太さは 1 コマの重さに直結する**（触る頂点は半径の 2 乗で増える）。
 * ここを変えたらベンチの B6 を測り直すこと。
 */
export function fitBrushRadius(o: SceneObject): number {
  return radiusFor(o, DEFAULT_SIZE_RATIO);
}

/** 既定の筆の太さ（対象の対角に対する割合）。`33` で実機を見て決めた 6.6%。 */
export const DEFAULT_SIZE_RATIO = 0.066;

/**
 * そのオブジェクトの大きさ（境界箱の対角）。**レベル 0 で測る。**
 *
 * 段を上げても外形はほとんど変わらないので、段ごとに測り直さない
 * （25 万頂点をなめる必要が無い）。
 */
export function objectDiagonal(o: SceneObject): number {
  const d = boundsDiagonal(o.mesh.positions);
  return d > 0 ? d : 1;
}

/** 割合から筆の半径（ワールド単位）。ゲージが書くのは割合のほう（`41` の T2）。 */
export function radiusFor(o: SceneObject | null, ratio: number): number {
  const diagonal = o ? objectDiagonal(o) : 1;
  return Math.max(0.01, Math.min(10, diagonal * ratio));
}

/**
 * X 対称の対応表（`41` の T1）。段ごとに作って控える。
 *
 * **一度作ったら持ち続ける**（`SceneObject.mirrorMaps`）。左右非対称に彫った
 * あとの座標から引き直すと相手が見つからなくなるが、対応そのものはトポロジの
 * 話なので彫っても変わらない。トポロジを変えたときは `markTopologyChanged` が捨てる。
 *
 * 対になる頂点が 1 つも無ければ `null`（対称に使えないメッシュ）。
 * 呼ぶ側は今までどおり「鏡映した点でもう 1 回当てる」だけで進む。
 */
export function mirrorMapOf(o: SceneObject, level: number, mesh: Mesh): MirrorMap | null {
  const cached = o.mirrorMaps.get(level);
  if (cached && cached.mirror.length === mesh.vertexCount) return cached.paired ? cached : null;
  const built = buildMirrorMap(mesh.positions, mesh.vertexCount, Math.max(objectDiagonal(o) * 1e-4, 1e-9));
  o.mirrorMaps.set(level, built);
  return built.paired ? built : null;
}
