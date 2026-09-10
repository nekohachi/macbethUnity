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
import type { Mesh, Triangulation } from "./mesh.js";

/** ブラシの種類。 */
export type BrushKind =
  | "standard"
  | "move"
  | "smooth"
  /** 平面から外へ盛る（`38` の T2）。 */
  | "clay"
  /** 平面を見ずに法線方向へ一定。重ねると立ち上がる。 */
  | "claybuildup"
  /** 面を押し広げる。 */
  | "inflate"
  /** 範囲の中心へ寄せて稜線を立てる。 */
  | "pinch"
  /** 平面へ両側から寄せる。 */
  | "flatten"
  /** 平面より外だけ削り取る。 */
  | "trim"
  /** Standard を細く鋭く。 */
  | "damien"
  /** 平面へ寄せてから隣の平均へ少し寄せる。 */
  | "polish";

/** 法線を使う種類。`localNormals` を作るかどうかの判定に使う。 */
const NEEDS_NORMAL: ReadonlySet<BrushKind> = new Set<BrushKind>([
  "standard",
  "clay",
  "claybuildup",
  "inflate",
  "flatten",
  "trim",
  "damien",
  "polish",
  "pinch",
]);

/**
 * 平面をあてる種類。Standard も入る（`39` の T2）: ZBrush の Standard は
 * **筆の中心の法線 1 本**に沿って持ち上げる。頂点ごとの法線で動かすのは Inflate。
 */
const NEEDS_PLANE: ReadonlySet<BrushKind> = new Set<BrushKind>(["standard", "clay", "claybuildup", "flatten", "trim", "polish"]);

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
  /**
   * 頂点ごとのマスク 0〜1（`34` の T1）。**あれば重みに `(1 - mask)` を掛ける。**
   *
   * 長さはメッシュの頂点数。短ければ足りない分は 0（マスクなし）とみなす。
   */
  mask?: Float32Array;
  /**
   * 裏面マスク（`34` の T1。`05` の「裏面マスク」）。
   *
   * カメラから面へ向かう向き（**オブジェクト空間**）。渡すと、法線がこれと
   * 同じ向きを向いている頂点＝**こちらに背を向けている頂点**を触らない。
   *
   * **これが無いと薄い形が破綻する。** 耳をムーブで引くと、反対側の耳まで
   * 一緒に動いてしまう。
   */
  viewDir?: readonly [number, number, number];
  /**
   * 押した瞬間の重み（ムーブ。`39` の T5）。渡すと減衰・マスク・裏面マスクを
   * 計算し直さず、これをそのまま使う。**押した瞬間の頂点を最後まで掴む**ため
   * （毎回取り直すと、引いている途中で範囲が滑って別の頂点を掴み直す）。
   * `grabWeights` で作る。長さは `fp.verts.length`。
   */
  grab?: Float32Array;
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

/**
 * 面ごとの控え（`38` の T1）。面積の重みを**面の単位**で持つため。
 *
 * 三角形ごとの面積にすると、四角をどちらの対角で割ったかで重みが変わり、
 * **`35` で立てた「コーナーの並び順で結果が変わらない」が壊れる**
 * （実際そう書いて通し確認が落ちた）。面の面積なら割り方に依らない。
 */
const faceScratch = { gen: new Int32Array(0), area: new Float32Array(0), stamp: 0 };

/** 面の控えを用意して、世代を 1 つ進める。 */
function beginFaceScratch(faceCount: number): number {
  if (faceScratch.gen.length < faceCount) {
    faceScratch.gen = new Int32Array(faceCount);
    faceScratch.area = new Float32Array(faceCount);
    faceScratch.stamp = 0;
  }
  return ++faceScratch.stamp;
}

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
 * `bvh` と `tris` は**そのメッシュのもの**（表示しているレベルのもの）。
 * `trianglesNear` は葉の単位で返すので半径の外の三角形も混じるが、
 * 頂点は距離で絞るので問題ない。
 */
export function strokeFootprint(
  mesh: Mesh,
  bvh: Bvh,
  tris: Triangulation,
  point: readonly [number, number, number],
  radius: number,
): Footprint {
  const tri = tris.tri;
  const near = trianglesNear(bvh, point, radius);
  const r2 = radius * radius;
  const stamp = beginScratch(mesh.vertexCount);
  const gen = scratch.gen;
  const verts: number[] = [];
  const hit: number[] = [];
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
    if (touches) hit.push(t);
  }
  return { verts: Uint32Array.from(verts), tris: Uint32Array.from(hit) };
}

/**
 * 範囲の三角形から、頂点ごとの法線を作る（面積で重み付け＝外積そのまま）。
 *
 * `stamp` は `applyStroke` が作った控えの世代（頂点番号 → 範囲内の何番目）。
 */
function localNormals(mesh: Mesh, fp: Footprint, tris: Triangulation, stamp: number): Float32Array {
  const out = new Float32Array(fp.verts.length * 3);
  const tri = tris.tri;
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

/**
 * 範囲の三角形から、頂点ごとの「隣の平均」を作る。
 *
 * **面積で重みを付ける**（`38` の T1）。数を数えるだけだと、三角形と四角の
 * 境目のように**密度が食い違う所で細かい側へ寄る**。辺を挟む三角形の面積を
 * 重みにすると、粗い側と細かい側が同じだけ効く。
 *
 * cotangent（本式の Laplace-Beltrami）は使わない。**鈍角で負になって暴れる**。
 * 面積なら常に正で、密度には同じだけ効く。
 *
 * 面積は外積の長さの半分。`localNormals` と同じ量なので、三角形を 2 度なめない。
 */
function localAverages(mesh: Mesh, fp: Footprint, tris: Triangulation, stamp: number): Float32Array {
  const sum = new Float32Array(fp.verts.length * 3);
  const total = new Float32Array(fp.verts.length);
  const tri = tris.tri;
  const real = tris.realEdges;
  const toFace = tris.triToFace;
  const p = mesh.positions;
  const gen = scratch.gen;
  const val = scratch.val;

  /** その三角形の面積（外積の長さの半分）。 */
  const areaOf = (t: number): number => {
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
    return Math.hypot(uy * vz - uz * vy, uz * vx - ux * vz, ux * vy - uy * vx) / 2;
  };

  // 1 周目: **面ごと**に面積を足す（三角形ごとだと割り方で変わる）
  const fstamp = beginFaceScratch(mesh.faceCount);
  const fgen = faceScratch.gen;
  const farea = faceScratch.area;
  for (const t of fp.tris) {
    const f = toFace[t];
    if (fgen[f] !== fstamp) {
      fgen[f] = fstamp;
      farea[f] = 0;
    }
    farea[f] += areaOf(t);
  }

  // 2 周目: 面の面積を重みにして、面の本物の辺だけ足す
  let w = 0;
  const add = (v: number, u: number): void => {
    if (gen[v] !== stamp) return;
    const i = val[v];
    sum[i * 3] += p[u * 3] * w;
    sum[i * 3 + 1] += p[u * 3 + 1] * w;
    sum[i * 3 + 2] += p[u * 3 + 2] * w;
    total[i] += w;
  };
  for (const t of fp.tris) {
    w = farea[toFace[t]];
    if (w <= 0) continue;
    // **面の本物の辺だけ**（`35` の T1）。四角を扇で割ると対角線が出るが、
    // それは隣ではない。数えると 1 リングの外まで平均してしまい、しかも
    // どちらの対角が出るかはコーナーの並び順で決まるので方向に偏る
    const r = real[t];
    if (r & 1) {
      add(a2(tri, t, 0), a2(tri, t, 1));
      add(a2(tri, t, 1), a2(tri, t, 0));
    }
    if (r & 2) {
      add(a2(tri, t, 1), a2(tri, t, 2));
      add(a2(tri, t, 2), a2(tri, t, 1));
    }
    if (r & 4) {
      add(a2(tri, t, 2), a2(tri, t, 0));
      add(a2(tri, t, 0), a2(tri, t, 2));
    }
  }
  for (let i = 0; i < fp.verts.length; i++) {
    if (!total[i]) continue;
    sum[i * 3] /= total[i];
    sum[i * 3 + 1] /= total[i];
    sum[i * 3 + 2] /= total[i];
  }
  return sum;
}

/** 三角形 `t` の `k` 番目の頂点。 */
function a2(tri: Uint32Array, t: number, k: number): number {
  return tri[t * 3 + k];
}

/** 範囲にあてた平面。Clay / Flatten / Trim / Polish が使う（`38` の T1）。 */
export interface LocalPlane {
  center: readonly [number, number, number];
  normal: readonly [number, number, number];
}

/**
 * 範囲に平面をあてる（`38` の T1）。
 *
 * 中心は**重みつきの重心**、向きは**範囲の法線の重みつき平均**。
 *
 * 共分散行列の固有分解はしない。3×3 の対称行列を解くぶんの値打ちが無く、
 * 法線の平均で十分に同じ向きが出る（範囲は筆の大きさなので、もともと
 * 平らに近い）。
 */
function localPlane(fp: Footprint, normals: Float32Array, positions: Float32Array, weights: Float32Array): LocalPlane | null {
  let cx = 0,
    cy = 0,
    cz = 0,
    nx = 0,
    ny = 0,
    nz = 0,
    total = 0;
  for (let i = 0; i < fp.verts.length; i++) {
    const w = weights[i];
    if (w <= 0) continue;
    const v = fp.verts[i];
    cx += positions[v * 3] * w;
    cy += positions[v * 3 + 1] * w;
    cz += positions[v * 3 + 2] * w;
    nx += normals[i * 3] * w;
    ny += normals[i * 3 + 1] * w;
    nz += normals[i * 3 + 2] * w;
    total += w;
  }
  if (!total) return null;
  const len = Math.hypot(nx, ny, nz);
  if (len < 1e-20) return null;
  return {
    center: [cx / total, cy / total, cz / total],
    normal: [nx / len, ny / len, nz / len],
  };
}

/** 減衰 × 強さ × (1 − マスク) の重み。`shape` には減衰そのものを書く。 */
function strokeWeights(p: Float32Array, fp: Footprint, input: StrokeInput, shape: Float32Array): Float32Array {
  const n = fp.verts.length;
  const weights = new Float32Array(n);
  const guard = input.excludeNearX ?? 0;
  const mask = input.mask;
  for (let i = 0; i < n; i++) {
    const v = fp.verts[i];
    // 中心線の頂点は 1 回目の呼び出しで動かしてある（`33` の T4）
    if (guard > 0 && Math.abs(p[v * 3]) < guard) continue;
    const d = Math.hypot(p[v * 3] - input.point[0], p[v * 3 + 1] - input.point[1], p[v * 3 + 2] - input.point[2]);
    const t = falloff(d / input.radius);
    shape[i] = t;
    let w = t * input.strength;
    // マスク（`34` の T1）。1 なら 1 ミリも動かない
    if (w !== 0 && mask && v < mask.length) w *= 1 - mask[v];
    weights[i] = w;
  }
  return weights;
}

/** 裏面マスク: カメラから面へ向かう向きと同じ側を向いている＝背を向けている。触らない */
function backfaceMask(weights: Float32Array, normals: Float32Array, viewDir: readonly [number, number, number]): void {
  const [dx, dy, dz] = viewDir;
  for (let i = 0; i < weights.length; i++) {
    if (weights[i] === 0) continue;
    if (normals[i * 3] * dx + normals[i * 3 + 1] * dy + normals[i * 3 + 2] * dz > 0) weights[i] = 0;
  }
}

/**
 * 押した瞬間の重みを作る（ムーブ。`39` の T5）。`applyStroke` と同じ減衰・マスク・
 * 裏面マスクで、あとは `StrokeInput.grab` に渡して最後まで使う。
 * 範囲の平均法線（正規化済み）も返す。ALT のムーブ（法線に沿う）に使う。
 */
export function grabWeights(
  mesh: Mesh,
  fp: Footprint,
  tris: Triangulation,
  input: StrokeInput,
): { weights: Float32Array; normal: readonly [number, number, number] | null } {
  const n = fp.verts.length;
  if (!n) return { weights: new Float32Array(0), normal: null };
  const stamp = beginScratch(mesh.vertexCount);
  for (let i = 0; i < n; i++) {
    const v = fp.verts[i];
    scratch.gen[v] = stamp;
    scratch.val[v] = i;
  }
  const weights = strokeWeights(mesh.positions, fp, input, new Float32Array(n));
  const normals = localNormals(mesh, fp, tris, stamp);
  if (input.viewDir) backfaceMask(weights, normals, input.viewDir);
  const plane = localPlane(fp, normals, mesh.positions, weights);
  return { weights, normal: plane ? plane.normal : null };
}

/**
 * ブラシを 1 回当てる。`mesh.positions` を書き換え、**実際に動いた頂点**を返す。
 *
 * 重み 0 の頂点は動かさないし返さない。返した頂点はそのまま履歴と部分描画に渡すので、
 * ここに余計なものを混ぜると、履歴の差分が無駄に太る。
 */
export function applyStroke(mesh: Mesh, fp: Footprint, tris: Triangulation, input: StrokeInput): Uint32Array {
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
  const grabbed = !!input.grab && input.grab.length === n;
  /** 減衰そのもの（強さもマスクも掛ける前）。クレイビルドアップが角ばらせるのに使う */
  const shape = new Float32Array(n);
  const weights = grabbed ? input.grab! : strokeWeights(p, fp, input, shape);

  // 法線。Standard は動く向きに、裏面マスクは向きの判定に使う。
  // **どちらも範囲の三角形から作る**ので、メッシュ全体には触らない。
  // 掴んでいる（`grab`）ときは裏面マスクも押した瞬間に済んでいる
  const normals = NEEDS_NORMAL.has(input.kind) || (input.viewDir && !grabbed) ? localNormals(mesh, fp, tris, stamp) : null;
  if (input.viewDir && normals && !grabbed) backfaceMask(weights, normals, input.viewDir);

  // 平面は裏面マスクを掛けたあとの重みであてる（触らない所を勘定に入れない）
  const plane = NEEDS_PLANE.has(input.kind) && normals ? localPlane(fp, normals, p, weights) : null;
  /** 平面からの符号つき距離。外が正。 */
  const signedTo = (v: number): number => {
    const [cx, cy, cz] = plane!.center;
    const [nx, ny, nz] = plane!.normal;
    return (p[v * 3] - cx) * nx + (p[v * 3 + 1] - cy) * ny + (p[v * 3 + 2] - cz) * nz;
  };

  const moved: number[] = [];
  if (input.kind === "standard" && plane) {
    // **範囲の法線 1 本**に沿って動かす（`39` の T2。ZBrush の Standard）。
    // 頂点ごとの法線で動かすと球が膨らむ（それは Inflate）。1 本にすると
    // 盛った山の側面が中心の法線に平行になり、ZBrush と同じ山になる。
    //
    // 動く量は半径に比例させる（大きい筆は深く彫れる）。
    // **1 打ちぶんの深さ**（ZBrush に合わせた。`33` の直し）。
    // 打つ間隔は半径の 1/4 なので、1 回なぞると同じ頂点に 8 打ちほど乗る。
    // 強さ 1 で 1 なぞり ≒ 半径の半分（0.0625 × 8 = 0.5）になる。
    // 既定の強さは 0.67（実機で触って決めた。ZBrush の Z Intensity 67 相当）
    // なので、ふつうに 1 回なぞると半径の 1/3 ほど。重ねれば深くなる。
    const amount = input.radius * DAB_DEPTH * (input.invert ? -1 : 1);
    const [nx, ny, nz] = plane.normal;
    for (let i = 0; i < n; i++) {
      const w = weights[i] * amount;
      if (w === 0) continue;
      const v = fp.verts[i];
      p[v * 3] += nx * w;
      p[v * 3 + 1] += ny * w;
      p[v * 3 + 2] += nz * w;
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
  } else if ((input.kind === "inflate" || input.kind === "damien") && normals) {
    // **頂点ごとの法線**へ。深さの基準は Standard と同じ `DAB_DEPTH` にして、
    // **強さの手触りを揃える**（実機で決めた 0.67 が全部に効くように）。
    // Inflate は膨らむ（球なら半径方向）。
    // Damien（DamStandard）は **既定で彫る**（`39` の T4。ZBrush は ZSub が既定）。ALT で盛る
    const dir = input.kind === "damien" ? -1 : 1;
    const amount = input.radius * DAB_DEPTH * (input.invert ? -dir : dir);
    for (let i = 0; i < n; i++) {
      let w = weights[i];
      if (w === 0) continue;
      // Damien は減衰を 2 乗して細く鋭くする（`t⁴` になる）
      if (input.kind === "damien") w *= w / Math.max(input.strength, 1e-6);
      const k = w * amount;
      const v = fp.verts[i];
      p[v * 3] += normals[i * 3] * k;
      p[v * 3 + 1] += normals[i * 3 + 1] * k;
      p[v * 3 + 2] += normals[i * 3 + 2] * k;
      moved.push(v);
    }
  } else if (input.kind === "pinch" && normals) {
    // 範囲の中心へ寄せる。**寄る量は半径に対する割合**で決める
    // （ワールド単位にすると大きい像で効かなくなる）。
    // **接平面の中で**寄せる（`39` の T6）: 中心へ向かうベクトルから頂点の法線成分を
    // 引く。引かないと、曲がった面では法線方向にも動いて膨らむ / へこむ
    const [cx, cy, cz] = input.point;
    const amount = DAB_DEPTH * (input.invert ? -1 : 1);
    for (let i = 0; i < n; i++) {
      const w = weights[i] * amount;
      if (w === 0) continue;
      const v = fp.verts[i];
      const tx = cx - p[v * 3];
      const ty = cy - p[v * 3 + 1];
      const tz = cz - p[v * 3 + 2];
      const nx = normals[i * 3],
        ny = normals[i * 3 + 1],
        nz = normals[i * 3 + 2];
      const dn = tx * nx + ty * ny + tz * nz;
      const ex = (tx - nx * dn) * w;
      const ey = (ty - ny * dn) * w;
      const ez = (tz - nz * dn) * w;
      // **ちょうど中心に居る頂点は動かない。** 動いていないものを返すと、
      // 履歴の差分が無駄に太る（`sculpt.ts` の前置きの約束）
      if (ex === 0 && ey === 0 && ez === 0) continue;
      p[v * 3] += ex;
      p[v * 3 + 1] += ey;
      p[v * 3 + 2] += ez;
      moved.push(v);
    }
  } else if ((input.kind === "clay" || input.kind === "claybuildup" || input.kind === "flatten" || input.kind === "trim") && plane) {
    const [nx, ny, nz] = plane.normal;
    // Clay の層の厚み。Standard の 1 打ちと同じ単位（強さの手触りが揃う）
    const h = input.radius * DAB_DEPTH;
    const buildup = input.kind === "claybuildup";
    for (let i = 0; i < n; i++) {
      let w = weights[i];
      if (w === 0) continue;
      const v = fp.verts[i];
      const d = signedTo(v);
      // Clay は**平面の上に厚み h の層を盛る**（`39` の T3。ZBrush の Clay）。
      //   天面 = 平面 + h。天面より下の頂点を、天面へ向かって w の割合だけ上げる。
      //   平らな所は w·h 上がり（Standard の 1 打ちと同じ深さ）、へこみはそれより
      //   多く上がって埋まり、天面より上の頂点は動かない（平らな天面になる）。
      //   前は「平面より内側だけ埋める」で、平らな所に置いても何も起きなかった。
      //   ALT は鏡: 底面 = 平面 − h へ向かって下げる（彫る）
      // ClayBuildup は同じ層を、角ばった減衰で盛る（中心の平らな部分が広い。
      //   ZBrush のアルファ 39 に相当）
      // Flatten は両側から平面へ寄せる
      // Trim は平面より外だけ落とす
      let k = 0;
      if (input.kind === "flatten") k = -d * w;
      else if (input.kind === "trim") k = d > 0 ? -d * w : 0;
      else {
        if (buildup) w = Math.min(w * 2, w / Math.max(shape[i], 1e-6));
        k = input.invert ? -w * Math.max(0, h + d) : w * Math.max(0, h - d);
      }
      if (k === 0) continue;
      p[v * 3] += nx * k;
      p[v * 3 + 1] += ny * k;
      p[v * 3 + 2] += nz * k;
      moved.push(v);
    }
  } else if (input.kind === "polish" && plane) {
    // **先に隣の平均へ寄せて、そのあと平面へ寄せる。**
    //
    // 逆にすると、平均は「平らにする前」の位置から取ってあるので、
    // 平均へ寄せた分が平らにした分を打ち消す（最初そう書いて、フラットより
    // でこぼこが残った）。
    //
    // 平面への寄せは控えめ（半分）にして、形そのものは残す。ZBrush の
    // Polish は「全体の形を保ったまま磨く」もので、Flatten とは別物。
    const avg = localAverages(mesh, fp, tris, stamp);
    const [cx, cy, cz] = plane.center;
    const [nx, ny, nz] = plane.normal;
    const next = new Float32Array(n * 3);
    for (let i = 0; i < n; i++) {
      const v = fp.verts[i];
      const w = Math.min(1, weights[i]);
      // 1. 隣の平均へ
      const x = p[v * 3] + (avg[i * 3] - p[v * 3]) * w;
      const y = p[v * 3 + 1] + (avg[i * 3 + 1] - p[v * 3 + 1]) * w;
      const z = p[v * 3 + 2] + (avg[i * 3 + 2] - p[v * 3 + 2]) * w;
      // 2. 平面へ（控えめに）
      const d = ((x - cx) * nx + (y - cy) * ny + (z - cz) * nz) * w * 0.5;
      next[i * 3] = x - nx * d;
      next[i * 3 + 1] = y - ny * d;
      next[i * 3 + 2] = z - nz * d;
    }
    for (let i = 0; i < n; i++) {
      if (weights[i] === 0) continue;
      const v = fp.verts[i];
      p[v * 3] = next[i * 3];
      p[v * 3 + 1] = next[i * 3 + 1];
      p[v * 3 + 2] = next[i * 3 + 2];
      moved.push(v);
    }
  } else {
    // 隣の平均へ寄せる。**1 コマで 1 回だけ**（重ねて掛けると形が縮む）
    const avg = localAverages(mesh, fp, tris, stamp);
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
