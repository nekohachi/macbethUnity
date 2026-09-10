/**
 * マスク（`34` の T1。`05` の「マスキング」）。
 *
 * ここは **`Float32Array` を書き換えるだけ**。マルチ解像度も履歴も描画も知らない。
 * 段への持ち替えは app、表示は viewport の仕事。
 *
 * マスクは**頂点ごとの 0〜1**。0 = 彫れる、1 = 彫れない。ブラシの重みに
 * `(1 - mask)` を掛けるだけなので、彫る側はほとんど何も知らなくてよい
 * （`sculpt.ts` の `applyStroke` を見よ）。
 *
 * **無いときは `null` を持つ**（0 で埋めた配列を持たない）。マスクを使わない人に
 * 掛け算も色も払わせないため。
 */
import { falloff, type Footprint } from "./sculpt.js";
import type { Mesh, Triangulation } from "./mesh.js";

/** 1 回ぶんのマスク塗り。 */
export interface MaskInput {
  /** 当たった点（オブジェクト空間）。 */
  point: readonly [number, number, number];
  radius: number;
  /** 0〜1。 */
  strength: number;
  /** 消す（引く）。ALT を押しているとき。 */
  erase: boolean;
  /** X = 0 からこの距離より近い頂点を触らない（`33` の T4 と同じ）。 */
  excludeNearX?: number;
}

/**
 * 1 打ちで乗る濃さ（強さ 1 のとき）。
 *
 * `sculpt.ts` の `DAB_DEPTH` と同じ考えで、**打つ間隔（半径の 1/4）と対**。
 * 1 回なぞると同じ頂点に 8 打ちほど乗るので、0.125 × 8 = 1.0。つまり
 * **強さ 1 で 1 なぞりするとちょうど塗り切る**。既定の強さ 0.67 なら
 * 1 なぞりで 0.67 まで乗り、重ねれば 1 になる。
 */
export const MASK_DAB = 0.125;

/**
 * マスクを 1 回塗る。`values` を書き換え、**実際に変わった頂点**を返す。
 *
 * 範囲の取り方は彫るときと同じ（`strokeFootprint`）。変わらなかった頂点は
 * 返さない（履歴の差分と部分描画にそのまま渡すので、余計なものを混ぜると太る）。
 */
export function paintMask(mesh: Mesh, fp: Footprint, values: Float32Array, input: MaskInput): Uint32Array {
  const n = fp.verts.length;
  if (!n || input.radius <= 0 || input.strength <= 0) return new Uint32Array(0);

  const p = mesh.positions;
  const guard = input.excludeNearX ?? 0;
  const amount = MASK_DAB * input.strength * (input.erase ? -1 : 1);
  const changed: number[] = [];
  for (let i = 0; i < n; i++) {
    const v = fp.verts[i];
    // 中心線の頂点は 1 回目の呼び出しで塗ってある（`33` の T4 と同じ）
    if (guard > 0 && Math.abs(p[v * 3]) < guard) continue;
    const d = Math.hypot(p[v * 3] - input.point[0], p[v * 3 + 1] - input.point[1], p[v * 3 + 2] - input.point[2]);
    const w = falloff(d / input.radius);
    if (w === 0) continue;
    const was = values[v];
    const next = Math.max(0, Math.min(1, was + w * amount));
    if (next === was) continue;
    values[v] = next;
    changed.push(v);
  }
  return Uint32Array.from(changed);
}

/**
 * 隣の平均へ 1 リングぶん寄せる。**全頂点**を 1 回。
 *
 * **面の本物の辺だけ**を両向きに足す（`sculpt.ts` の `localAverages` と同じ
 * やり方。`35` の T1）。四角を扇で割ると対角線が三角形の辺として出てくるが、
 * それは隣ではない。ぼかしは境目をなじませるためのものなので、隣でないほうへ
 * 寄ると用を成さない。
 *
 * **読みながら書かない**（先に全部読む）。書きながら読むと、頂点の番号順で
 * 結果が変わってしまう。
 *
 * `Mesh` は要らない（三角形の並びと印だけで隣が分かる）。呼ぶ側は表示に使って
 * いる `view.tri` をそのまま渡せばよい。
 */
export function blurMask(tris: Triangulation, values: Float32Array): void {
  const n = values.length;
  const tri = tris.tri;
  const real = tris.realEdges;
  const sum = new Float32Array(n);
  const count = new Uint32Array(n);
  const add = (v: number, u: number): void => {
    if (v >= n || u >= n) return;
    sum[v] += values[u];
    count[v]++;
  };
  for (let t = 0; t < tri.length; t += 3) {
    const a = tri[t];
    const b = tri[t + 1];
    const c = tri[t + 2];
    const r = real[t / 3];
    if (r & 1) {
      add(a, b);
      add(b, a);
    }
    if (r & 2) {
      add(b, c);
      add(c, b);
    }
    if (r & 4) {
      add(c, a);
      add(a, c);
    }
  }
  for (let v = 0; v < n; v++) {
    if (!count[v]) continue;
    // 自分も 1 票入れる。入れないと 1 回で角が丸くなりすぎる
    values[v] = (sum[v] + values[v] * count[v]) / (count[v] * 2);
  }
}

/** 反転。2 回で元に戻る。 */
export function invertMask(values: Float32Array): void {
  for (let v = 0; v < values.length; v++) values[v] = 1 - values[v];
}

/**
 * 1 つ上の段へ移す（`34` の T1）。
 *
 * 細分割の出力の並びは **頂点点 `[0, V)` → エッジ点 `[V, V+E)` → 面点** で、
 * エッジ点の並びは `below.edges()` の並び（`subdivide.ts` の 120 行目。
 * wasm 版も同じ並びを守る）。だから `SubdivPlan` を作らずに移せる
 * （作ると 25 万四角形で数秒かかる）。
 *
 * **Catmull-Clark の重みは使わない。** マスクは柔らかい場なので、
 * エッジ点は両端の平均、面点は角の平均で足りる。
 */
export function maskUp(below: Mesh, values: Float32Array): Float32Array {
  const v = below.vertexCount;
  const edges = below.edges();
  const out = new Float32Array(v + edges.length + below.faceCount);
  // 頂点点はそのまま
  out.set(values.subarray(0, Math.min(v, values.length)));
  for (let e = 0; e < edges.length; e++) {
    const [a, b] = edges[e];
    out[v + e] = (values[a] + values[b]) / 2;
  }
  const faceBase = v + edges.length;
  for (let f = 0; f < below.faceCount; f++) {
    const verts = below.faceVerts(f);
    let s = 0;
    for (const u of verts) s += values[u];
    out[faceBase + f] = verts.length ? s / verts.length : 0;
  }
  return out;
}

/**
 * 1 つ下の段へ移す。先頭の `belowVertexCount` 個が下の段の頂点そのものなので、
 * 切り出すだけ。**上げてから下げると必ず元に戻る。**
 */
export function maskDown(values: Float32Array, belowVertexCount: number): Float32Array {
  const out = new Float32Array(belowVertexCount);
  out.set(values.subarray(0, Math.min(belowVertexCount, values.length)));
  return out;
}

/** 全部 0 か。0 なら持つ意味がないので、app 側で `null` に落とす。 */
export function maskIsEmpty(values: Float32Array): boolean {
  for (let v = 0; v < values.length; v++) if (values[v] !== 0) return false;
  return true;
}
