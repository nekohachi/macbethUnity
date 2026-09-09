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
import { Multires, catmullClark, estimateLevelBytes, type Mesh, type SceneObject } from "../core/index.js";
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
  // デルタを入れ直す（履歴で戻ったときも、ここでそろう）
  for (let i = 0; i < want; i++) {
    const level = o.multires.find((m) => m.level === i + 1);
    stack.deltas[i] = level ? level.delta : null;
  }
  return stack;
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
  const p = o.mesh.positions;
  if (!p.length) return 0.4;
  let minX = Infinity,
    minY = Infinity,
    minZ = Infinity,
    maxX = -Infinity,
    maxY = -Infinity,
    maxZ = -Infinity;
  for (let v = 0; v < p.length; v += 3) {
    if (p[v] < minX) minX = p[v];
    if (p[v] > maxX) maxX = p[v];
    if (p[v + 1] < minY) minY = p[v + 1];
    if (p[v + 1] > maxY) maxY = p[v + 1];
    if (p[v + 2] < minZ) minZ = p[v + 2];
    if (p[v + 2] > maxZ) maxZ = p[v + 2];
  }
  const diagonal = Math.hypot(maxX - minX, maxY - minY, maxZ - minZ);
  return Math.max(0.01, Math.min(10, diagonal * 0.066));
}
