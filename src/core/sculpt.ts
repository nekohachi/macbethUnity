/**
 * ブラシのストローク（`33` の T2。`05` の 5.2）。
 *
 * ここは **`Mesh` の座標を書き換えるだけ**。マルチ解像度も履歴も描画も知らない。
 * 段への取り込みは `Multires.sculptAt`、履歴は app の仕事。
 *
 * 速さの決め手は「**メッシュ全体を触らない**」こと。法線も隣接も、
 * ブラシが当たった範囲の三角形からその場で作る。全体の隣接表を持たないので、
 * 100 万頂点でも 1 コマの重さは**筆の太さだけ**で決まる。
 *
 * その代わり、範囲のふちの頂点は法線と隣接が少し欠ける。ただしふちは
 * 重みが 0 に近いので、見た目には出ない。
 */
import type { Bvh } from "./bvh.js";
import { trianglesNear } from "./bvh.js";
import type { Mesh } from "./mesh.js";

/** ブラシの種類。 */
export type BrushKind = "standard" | "move" | "smooth";

/** 1 回ぶんのブラシ。 */
export interface StrokeInput {
  kind: BrushKind;
  /** 当たった点（オブジェクト空間）。 */
  point: readonly [number, number, number];
  /** Move の移動量（オブジェクト空間）。他のブラシでは見ない。 */
  move?: readonly [number, number, number];
  radius: number;
  /** 0〜1。 */
  strength: number;
  /** Standard だけ効く（凹ませる）。 */
  invert: boolean;
  /**
   * X = 0 からこの距離より近い頂点を**触らない**（`33` の T4）。
   *
   * 対称で 2 回当てるとき、中心線の頂点は両方の呼び出しで拾われて 2 回動き、
   * そこだけ深くなって筋が出る。鏡映側の呼び出しにこれを渡して逃がす。
   */
  excludeNearX?: number;
}

/** ブラシが当たった範囲。 */
export interface Footprint {
  /** 触る頂点。 */
  verts: Uint32Array;
  /** 範囲の三角形（`tri` の 3 つ組の番号）。法線と隣接をここから作る。 */
  tris: Uint32Array;
}

/**
 * 減衰。中心で 1、半径で 0、その間はなだらか。
 *
 * `(1 - t²)²` は端の傾きも 0 になるので、ストロークの境目に段差が出ない。
 */
/**
 * 1 打ちで法線方向へ動く量（筆の半径に対する割合）。
 *
 * 打つ間隔（`DAB_SPACING` = 半径の 1/4）と対になっている。**片方を変えたら
 * もう片方も見直すこと**（間隔を狭めると同じ強さでも濃くなる）。
 */
export const DAB_DEPTH = 0.0625;

export function falloff(t: number): number {
  if (t >= 1) return 0;
  const u = 1 - t * t;
  return u * u;
}

/**
 * 「頂点番号 → 何かの番号」を引くための控え。**1 打ちごとに作り直さない。**
 *
 * `Map` や `Set` を毎回組むと、1 打ちで 1〜7 万件の出し入れになって、そこが
 * ストロークのいちばん重い所になる。頂点番号で直に引ける配列にすると消える。
 * CI・25 万四角形・1.66 万頂点で、範囲を拾って動かす所が **12.2ms → 5.9ms**。
 *
 * **効くのは平均より散らばりのほう。** 前は 11〜17ms と揺れていた（1 打ちごとに
 * 数万件を捨てるので、掃除がいつ来るかで変わる）。いまは 5.7〜5.9ms に収まる。
 * なぞっている最中に時々引っかかる、という手触りはここから来ていた。
 *
 * **消す代わりに世代番号で無効にする。** 使い終わりに配列を埋め直すと、
 * 頂点数に比例した仕事になってしまい、「重さは筆の太さだけで決まる」という
 * この章の前提が崩れるため。
 */
const scratch = { gen: new Int32Array(0), val: new Int32Array(0), stamp: 0 };

/** 控えを頂点数ぶん用意して、世代を 1 つ進める。返り値がその世代番号。 */
function beginScratch(vertexCount: number): number {
  if (scratch.gen.length < vertexCount) {
    // 伸ばすときは中身も新しくなるので、世代を 0 に戻してよい
    scratch.gen = new Int32Array(vertexCount);
    scratch.val = new Int32Array(vertexCount);
    scratch.stamp = 0;
  }
  return ++scratch.stamp;
}

/**
 * ブラシが当たる頂点と三角形を集める。
 *
 * `bvh` と `tri` は**そのメッシュのもの**（表示しているレベルのもの）。
 * `trianglesNear` は葉の単位で返すので半径の外の三角形も混じるが、
 * 頂点は距離で絞るので問題ない。
 */
export function strokeFootprint(
  mesh: Mesh,
  bvh: Bvh,
  tri: Uint32Array,
  point: readonly [number, number, number],
  radius: number,
): Footprint {
  const near = trianglesNear(bvh, point, radius);
  const r2 = radius * radius;
  const stamp = beginScratch(mesh.vertexCount);
  const gen = scratch.gen;
  const verts: number[] = [];
  const tris: number[] = [];
  const p = mesh.positions;
  for (const t of near) {
    let touches = false;
    for (let k = 0; k < 3; k++) {
      const v = tri[t * 3 + k];
      const dx = p[v * 3] - point[0];
      const dy = p[v * 3 + 1] - point[1];
      const dz = p[v * 3 + 2] - point[2];
      if (dx * dx + dy * dy + dz * dz <= r2) {
        touches = true;
        // 「もう入れた」を世代番号で見る（Set の代わり）
        if (gen[v] !== stamp) {
          gen[v] = stamp;
          verts.push(v);
        }
      }
    }
    // 頂点が 1 つでも入っていれば、法線と隣接のためにこの三角形も持つ
    if (touches) tris.push(t);
  }
  return { verts: Uint32Array.from(verts), tris: Uint32Array.from(tris) };
}

/**
 * 範囲の三角形から、頂点ごとの法線を作る（面積で重み付け＝外積そのまま）。
 *
 * `stamp` は `applyStroke` が作った控えの世代（頂点番号 → 範囲内の何番目）。
 */
function localNormals(mesh: Mesh, fp: Footprint, tri: Uint32Array, stamp: number): Float32Array {
  const out = new Float32Array(fp.verts.length * 3);
  const p = mesh.positions;
  const gen = scratch.gen;
  const val = scratch.val;
  for (const t of fp.tris) {
    const a = tri[t * 3];
    const b = tri[t * 3 + 1];
    const c = tri[t * 3 + 2];
    const ax = p[a * 3],
      ay = p[a * 3 + 1],
      az = p[a * 3 + 2];
    const ux = p[b * 3] - ax,
      uy = p[b * 3 + 1] - ay,
      uz = p[b * 3 + 2] - az;
    const vx = p[c * 3] - ax,
      vy = p[c * 3 + 1] - ay,
      vz = p[c * 3 + 2] - az;
    const nx = uy * vz - uz * vy;
    const ny = uz * vx - ux * vz;
    const nz = ux * vy - uy * vx;
    // 3 頂点ぶんを開いて書く。`[a, b, c]` で回すと**三角形ごとに配列を 1 つ**
    // 作ることになり、1 打ちで数万回の確保になる
    if (gen[a] === stamp) {
      const i = val[a] * 3;
      out[i] += nx;
      out[i + 1] += ny;
      out[i + 2] += nz;
    }
    if (gen[b] === stamp) {
      const i = val[b] * 3;
      out[i] += nx;
      out[i + 1] += ny;
      out[i + 2] += nz;
    }
    if (gen[c] === stamp) {
      const i = val[c] * 3;
      out[i] += nx;
      out[i + 1] += ny;
      out[i + 2] += nz;
    }
  }
  // 正規化。長さ 0（潰れた面ばかり）のときは動かさない
  for (let i = 0; i < fp.verts.length; i++) {
    const len = Math.hypot(out[i * 3], out[i * 3 + 1], out[i * 3 + 2]);
    if (len > 1e-20) {
      out[i * 3] /= len;
      out[i * 3 + 1] /= len;
      out[i * 3 + 2] /= len;
    }
  }
  return out;
}

/** 範囲の三角形から、頂点ごとの「隣の平均」を作る。 */
function localAverages(mesh: Mesh, fp: Footprint, tri: Uint32Array, stamp: number): Float32Array {
  const sum = new Float32Array(fp.verts.length * 3);
  const count = new Uint32Array(fp.verts.length);
  const p = mesh.positions;
  const gen = scratch.gen;
  const val = scratch.val;
  const add = (v: number, u: number): void => {
    if (gen[v] !== stamp) return;
    const i = val[v];
    sum[i * 3] += p[u * 3];
    sum[i * 3 + 1] += p[u * 3 + 1];
    sum[i * 3 + 2] += p[u * 3 + 2];
    count[i]++;
  };
  for (const t of fp.tris) {
    const a = tri[t * 3];
    const b = tri[t * 3 + 1];
    const c = tri[t * 3 + 2];
    // 三角形の 3 辺。同じ隣を何度も足すことになるが、平均なので偏りは出ない
    add(a, b);
    add(b, a);
    add(b, c);
    add(c, b);
    add(c, a);
    add(a, c);
  }
  for (let i = 0; i < fp.verts.length; i++) {
    if (!count[i]) continue;
    sum[i * 3] /= count[i];
    sum[i * 3 + 1] /= count[i];
    sum[i * 3 + 2] /= count[i];
  }
  return sum;
}

/**
 * ブラシを 1 回当てる。`mesh.positions` を書き換え、**実際に動いた頂点**を返す。
 *
 * 重み 0 の頂点は動かさないし返さない。返した頂点はそのまま履歴と部分描画に渡すので、
 * ここに余計なものを混ぜると、履歴の差分が無駄に太る。
 */
export function applyStroke(mesh: Mesh, fp: Footprint, tri: Uint32Array, input: StrokeInput): Uint32Array {
  const n = fp.verts.length;
  if (!n || input.radius <= 0 || input.strength <= 0) return new Uint32Array(0);

  // 頂点番号 → 範囲内の何番目。**Map を作らない**（`scratch` の説明を見よ）
  const stamp = beginScratch(mesh.vertexCount);
  for (let i = 0; i < n; i++) {
    const v = fp.verts[i];
    scratch.gen[v] = stamp;
    scratch.val[v] = i;
  }

  const p = mesh.positions;
  const weights = new Float32Array(n);
  const guard = input.excludeNearX ?? 0;
  for (let i = 0; i < n; i++) {
    const v = fp.verts[i];
    // 中心線の頂点は 1 回目の呼び出しで動かしてある（`33` の T4）
    if (guard > 0 && Math.abs(p[v * 3]) < guard) continue;
    const d = Math.hypot(p[v * 3] - input.point[0], p[v * 3 + 1] - input.point[1], p[v * 3 + 2] - input.point[2]);
    weights[i] = falloff(d / input.radius) * input.strength;
  }

  const moved: number[] = [];
  if (input.kind === "standard") {
    // 法線方向へ。動く量は半径に比例させる（大きい筆は深く彫れる）。
    //
    // **1 打ちぶんの深さ**（ZBrush に合わせた。`33` の直し）。
    // 打つ間隔は半径の 1/4 なので、1 回なぞると同じ頂点に 8 打ちほど乗る。
    // 強さ 1 で 1 なぞり ≒ 半径の半分（0.0625 × 8 = 0.5）になる。
    // 既定の強さは 0.67（実機で触って決めた。ZBrush の Z Intensity 67 相当）
    // なので、ふつうに 1 回なぞると半径の 1/3 ほど。重ねれば深くなる。
    const normals = localNormals(mesh, fp, tri, stamp);
    const amount = input.radius * DAB_DEPTH * (input.invert ? -1 : 1);
    for (let i = 0; i < n; i++) {
      const w = weights[i] * amount;
      if (w === 0) continue;
      const v = fp.verts[i];
      p[v * 3] += normals[i * 3] * w;
      p[v * 3 + 1] += normals[i * 3 + 1] * w;
      p[v * 3 + 2] += normals[i * 3 + 2] * w;
      moved.push(v);
    }
  } else if (input.kind === "move") {
    const [mx, my, mz] = input.move ?? [0, 0, 0];
    if (mx === 0 && my === 0 && mz === 0) return new Uint32Array(0);
    for (let i = 0; i < n; i++) {
      const w = weights[i];
      if (w === 0) continue;
      const v = fp.verts[i];
      p[v * 3] += mx * w;
      p[v * 3 + 1] += my * w;
      p[v * 3 + 2] += mz * w;
      moved.push(v);
    }
  } else {
    // 隣の平均へ寄せる。**1 コマで 1 回だけ**（重ねて掛けると形が縮む）
    const avg = localAverages(mesh, fp, tri, stamp);
    // 平均を先に全部読んでから書く。書きながら読むと順番で結果が変わる
    const next = new Float32Array(n * 3);
    for (let i = 0; i < n; i++) {
      const v = fp.verts[i];
      const w = Math.min(1, weights[i]);
      next[i * 3] = p[v * 3] + (avg[i * 3] - p[v * 3]) * w;
      next[i * 3 + 1] = p[v * 3 + 1] + (avg[i * 3 + 1] - p[v * 3 + 1]) * w;
      next[i * 3 + 2] = p[v * 3 + 2] + (avg[i * 3 + 2] - p[v * 3 + 2]) * w;
    }
    for (let i = 0; i < n; i++) {
      if (weights[i] === 0) continue;
      const v = fp.verts[i];
      p[v * 3] = next[i * 3];
      p[v * 3 + 1] = next[i * 3 + 1];
      p[v * 3 + 2] = next[i * 3 + 2];
      moved.push(v);
    }
  }
  return Uint32Array.from(moved);
}
