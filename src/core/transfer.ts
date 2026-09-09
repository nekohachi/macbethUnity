/**
 * アトリビュートの転送（Maya の Transfer Attributes。`24` の T6）。
 *
 * 元のメッシュの**位置**と **UV** を、別のメッシュへ写す。使いどころは 3 つ:
 *
 * - 分割数を変えて作り直したものに、前に展開した UV を戻す（ワールド）
 * - 同じトポロジの複製どうしで UV を揃える（コンポーネント）
 * - 荒いメッシュを細かいメッシュの形に吸い付かせる（位置のワールド転送）
 *
 * 先は書き換えず、**結果だけ返す**。書き込むかどうかは呼び出し側が決める
 * （履歴に積む前に「できるか」を確かめたいので）。
 */
import type { Transform } from "./document.js";
import { Mesh } from "./mesh.js";
import { transformPoint } from "./objectOps.js";
import { UV_SET } from "./uv/recipe.js";

/** どの空間で対応を取るか。 */
export type SampleSpace = "component" | "world" | "local";

export interface TransferOptions {
  positions: boolean;
  uvs: boolean;
  space: SampleSpace;
}

export interface TransferSide {
  mesh: Mesh;
  transform: Transform;
}

export interface TransferResult {
  /** 先の頂点ごとの新しい位置（先のローカル座標）。`positions: false` なら無し。 */
  positions?: Float32Array;
  /** 先のコーナーごとの新しい UV。`uvs: false` か元に UV が無ければ無し。 */
  uv?: Float32Array;
  /** 対応が取れた先の頂点の数。 */
  matched: number;
}

/**
 * 元の位置 / UV を先へ写す。コンポーネント空間でトポロジが合わなければ null。
 *
 * ワールド / ローカルでは、先の頂点ごとに**元の面のいちばん近い点**を探し、
 * その三角形の重心座標で混ぜる。総当たりだと重いので、元の三角形を
 * 一様グリッドに入れてから近いセルだけを見る。
 */
export function transferAttributes(
  source: TransferSide,
  target: TransferSide,
  options: TransferOptions,
): TransferResult | null {
  if (options.space === "component") return byComponent(source.mesh, target.mesh, options);
  return byClosestPoint(source, target, options);
}

/** 番号でそのまま写す。頂点数・面数・面の大きさが全部同じでなければ null。 */
function byComponent(source: Mesh, target: Mesh, options: TransferOptions): TransferResult | null {
  if (source.vertexCount !== target.vertexCount || source.faceCount !== target.faceCount) return null;
  for (let f = 0; f < source.faceCount; f++) {
    if (source.faceSize(f) !== target.faceSize(f)) return null;
  }
  const out: TransferResult = { matched: target.vertexCount };
  if (options.positions) out.positions = Float32Array.from(source.positions);
  if (options.uvs) {
    const uv = source.uvSets.get(UV_SET);
    if (uv) out.uv = Float32Array.from(uv);
  }
  return out;
}

/** 元の三角形を、ワールド（またはローカル）座標で 1 枚ずつ並べたもの。 */
interface Triangles {
  /** 三角形 × 3 点 × 3 成分。 */
  p: Float64Array;
  /** 三角形ごとの、元のコーナー番号（UV を引くため）。 */
  corners: Int32Array;
  count: number;
}

function buildTriangles(side: TransferSide, world: boolean): Triangles {
  const mesh = side.mesh;
  const tri = mesh.triangulate();
  const count = tri.tri.length / 3;
  const p = new Float64Array(count * 9);
  const corners = new Int32Array(count * 3);

  // 三角形は面ごとの扇。面が変わるたびに数え直せばコーナーの位置が分かる
  let face = -1;
  let step = 0;
  for (let t = 0; t < count; t++) {
    const fi = tri.triToFace[t];
    if (fi !== face) {
      face = fi;
      step = 0;
    }
    const local = [0, step + 1, step + 2];
    for (let j = 0; j < 3; j++) {
      const v = tri.tri[t * 3 + j];
      const q = mesh.getPosition(v);
      const w = world ? transformPoint(side.transform, q[0], q[1], q[2]) : q;
      p[t * 9 + j * 3] = w[0];
      p[t * 9 + j * 3 + 1] = w[1];
      p[t * 9 + j * 3 + 2] = w[2];
      corners[t * 3 + j] = mesh.faceOffsets[fi] + local[j];
    }
    step++;
  }
  return { p, corners, count };
}

/** 三角形を一様グリッドに入れて、近いものだけ見られるようにする。 */
class TriangleGrid {
  private cells = new Map<number, number[]>();
  private min = [0, 0, 0];
  private size = 1;
  readonly div: number;

  constructor(
    private tris: Triangles,
    div = 24,
  ) {
    this.div = Math.max(1, div);
    let min = [Infinity, Infinity, Infinity];
    let max = [-Infinity, -Infinity, -Infinity];
    for (let i = 0; i < tris.count * 3; i++) {
      for (let k = 0; k < 3; k++) {
        const v = tris.p[i * 3 + k];
        if (v < min[k]) min[k] = v;
        if (v > max[k]) max[k] = v;
      }
    }
    if (!Number.isFinite(min[0])) {
      min = [0, 0, 0];
      max = [1, 1, 1];
    }
    this.min = min;
    this.size = Math.max(1e-6, Math.max(max[0] - min[0], max[1] - min[1], max[2] - min[2])) / this.div;

    for (let t = 0; t < tris.count; t++) {
      let lo = [Infinity, Infinity, Infinity];
      let hi = [-Infinity, -Infinity, -Infinity];
      for (let j = 0; j < 3; j++) {
        for (let k = 0; k < 3; k++) {
          const v = tris.p[t * 9 + j * 3 + k];
          if (v < lo[k]) lo[k] = v;
          if (v > hi[k]) hi[k] = v;
        }
      }
      lo = lo.map((v, k) => this.cellOf(v, k));
      hi = hi.map((v, k) => this.cellOf(v, k));
      for (let x = lo[0]; x <= hi[0]; x++) {
        for (let y = lo[1]; y <= hi[1]; y++) {
          for (let z = lo[2]; z <= hi[2]; z++) {
            const key = this.key(x, y, z);
            const list = this.cells.get(key);
            if (list) list.push(t);
            else this.cells.set(key, [t]);
          }
        }
      }
    }
  }

  private cellOf(v: number, axis: number): number {
    return Math.max(0, Math.min(this.div - 1, Math.floor((v - this.min[axis]) / this.size)));
  }

  private key(x: number, y: number, z: number): number {
    return (x * 73856093) ^ (y * 19349663) ^ (z * 83492791);
  }

  /**
   * その点にいちばん近い三角形を探す。まわりのセルから輪を広げていき、
   * 見つかった距離より遠い輪まで来たら止める。
   */
  nearest(x: number, y: number, z: number): { tri: number; w: [number, number, number] } | null {
    const cx = this.cellOf(x, 0);
    const cy = this.cellOf(y, 1);
    const cz = this.cellOf(z, 2);
    let best = -1;
    let bestD = Infinity;
    let bestW: [number, number, number] = [1, 0, 0];
    const seen = new Set<number>();

    for (let ring = 0; ring < this.div; ring++) {
      // 前の輪までで見つかっていて、この輪より近いなら終わり
      if (best >= 0 && bestD < ((ring - 1) * this.size) ** 2) break;
      let any = false;
      for (let dx = -ring; dx <= ring; dx++) {
        for (let dy = -ring; dy <= ring; dy++) {
          for (let dz = -ring; dz <= ring; dz++) {
            // 輪の表面だけ（中は前の輪で見た）
            if (ring > 0 && Math.max(Math.abs(dx), Math.abs(dy), Math.abs(dz)) !== ring) continue;
            const list = this.cells.get(this.key(cx + dx, cy + dy, cz + dz));
            if (!list) continue;
            any = true;
            for (const t of list) {
              if (seen.has(t)) continue;
              seen.add(t);
              const hit = closestOnTriangle(this.tris.p, t, x, y, z);
              if (hit.d2 < bestD) {
                bestD = hit.d2;
                best = t;
                bestW = hit.w;
              }
            }
          }
        }
      }
      // 端まで来たら、まだ何も無くても打ち切る
      if (!any && ring > this.div) break;
    }
    return best >= 0 ? { tri: best, w: bestW } : null;
  }
}

/** 点と三角形のいちばん近い点。重心座標と距離の 2 乗を返す。 */
function closestOnTriangle(
  p: Float64Array,
  t: number,
  x: number,
  y: number,
  z: number,
): { d2: number; w: [number, number, number] } {
  const ax = p[t * 9];
  const ay = p[t * 9 + 1];
  const az = p[t * 9 + 2];
  const bx = p[t * 9 + 3];
  const by = p[t * 9 + 4];
  const bz = p[t * 9 + 5];
  const cx = p[t * 9 + 6];
  const cy = p[t * 9 + 7];
  const cz = p[t * 9 + 8];

  const abx = bx - ax;
  const aby = by - ay;
  const abz = bz - az;
  const acx = cx - ax;
  const acy = cy - ay;
  const acz = cz - az;
  const apx = x - ax;
  const apy = y - ay;
  const apz = z - az;

  const d1 = abx * apx + aby * apy + abz * apz;
  const d2 = acx * apx + acy * apy + acz * apz;
  if (d1 <= 0 && d2 <= 0) return { d2: sq(x - ax, y - ay, z - az), w: [1, 0, 0] };

  const bpx = x - bx;
  const bpy = y - by;
  const bpz = z - bz;
  const d3 = abx * bpx + aby * bpy + abz * bpz;
  const d4 = acx * bpx + acy * bpy + acz * bpz;
  if (d3 >= 0 && d4 <= d3) return { d2: sq(x - bx, y - by, z - bz), w: [0, 1, 0] };

  const vc = d1 * d4 - d3 * d2;
  if (vc <= 0 && d1 >= 0 && d3 <= 0) {
    const v = d1 / (d1 - d3);
    return { d2: sq(x - (ax + abx * v), y - (ay + aby * v), z - (az + abz * v)), w: [1 - v, v, 0] };
  }

  const cpx = x - cx;
  const cpy = y - cy;
  const cpz = z - cz;
  const d5 = abx * cpx + aby * cpy + abz * cpz;
  const d6 = acx * cpx + acy * cpy + acz * cpz;
  if (d6 >= 0 && d5 <= d6) return { d2: sq(x - cx, y - cy, z - cz), w: [0, 0, 1] };

  const vb = d5 * d2 - d1 * d6;
  if (vb <= 0 && d2 >= 0 && d6 <= 0) {
    const w = d2 / (d2 - d6);
    return { d2: sq(x - (ax + acx * w), y - (ay + acy * w), z - (az + acz * w)), w: [1 - w, 0, w] };
  }

  const va = d3 * d6 - d5 * d4;
  if (va <= 0 && d4 - d3 >= 0 && d5 - d6 >= 0) {
    const w = (d4 - d3) / (d4 - d3 + (d5 - d6));
    const qx = bx + (cx - bx) * w;
    const qy = by + (cy - by) * w;
    const qz = bz + (cz - bz) * w;
    return { d2: sq(x - qx, y - qy, z - qz), w: [0, 1 - w, w] };
  }

  const denom = 1 / (va + vb + vc);
  const v = vb * denom;
  const w = vc * denom;
  const qx = ax + abx * v + acx * w;
  const qy = ay + aby * v + acy * w;
  const qz = az + abz * v + acz * w;
  return { d2: sq(x - qx, y - qy, z - qz), w: [1 - v - w, v, w] };
}

function sq(x: number, y: number, z: number): number {
  return x * x + y * y + z * z;
}

/** ワールド / ローカル。先の頂点ごとに元のいちばん近い点を取る。 */
function byClosestPoint(
  source: TransferSide,
  target: TransferSide,
  options: TransferOptions,
): TransferResult {
  const world = options.space === "world";
  const tris = buildTriangles(source, world);
  const grid = new TriangleGrid(tris);
  const sourceUv = options.uvs ? source.mesh.uvSets.get(UV_SET) : undefined;

  const positions = options.positions ? Float32Array.from(target.mesh.positions) : undefined;
  const uv = sourceUv ? new Float32Array(target.mesh.faceOffsets[target.mesh.faceCount] * 2) : undefined;
  // 頂点ごとの UV（先のコーナーには同じものを入れる。切れ目は失われる）
  const perVertex = uv ? new Float32Array(target.mesh.vertexCount * 2) : undefined;
  let matched = 0;

  for (let v = 0; v < target.mesh.vertexCount; v++) {
    const q = target.mesh.getPosition(v);
    const w = world ? transformPoint(target.transform, q[0], q[1], q[2]) : q;
    const hit = tris.count ? grid.nearest(w[0], w[1], w[2]) : null;
    if (!hit) continue;
    matched++;
    const t = hit.tri;
    if (positions) {
      let px = 0;
      let py = 0;
      let pz = 0;
      for (let j = 0; j < 3; j++) {
        px += tris.p[t * 9 + j * 3] * hit.w[j];
        py += tris.p[t * 9 + j * 3 + 1] * hit.w[j];
        pz += tris.p[t * 9 + j * 3 + 2] * hit.w[j];
      }
      // ワールドで取った点は、先のローカルへ戻してから書く
      const local = world ? inverseTransformPoint(target.transform, px, py, pz) : [px, py, pz];
      positions[v * 3] = local[0];
      positions[v * 3 + 1] = local[1];
      positions[v * 3 + 2] = local[2];
    }
    if (perVertex && sourceUv) {
      let u = 0;
      let vv = 0;
      for (let j = 0; j < 3; j++) {
        const c = tris.corners[t * 3 + j];
        u += sourceUv[c * 2] * hit.w[j];
        vv += sourceUv[c * 2 + 1] * hit.w[j];
      }
      perVertex[v * 2] = u;
      perVertex[v * 2 + 1] = vv;
    }
  }

  if (uv && perVertex) {
    for (let f = 0; f < target.mesh.faceCount; f++) {
      const start = target.mesh.faceOffsets[f];
      const n = target.mesh.faceSize(f);
      for (let i = 0; i < n; i++) {
        const v = target.mesh.faceCorners[start + i];
        uv[(start + i) * 2] = perVertex[v * 2];
        uv[(start + i) * 2 + 1] = perVertex[v * 2 + 1];
      }
    }
  }

  const out: TransferResult = { matched };
  if (positions) out.positions = positions;
  if (uv) out.uv = uv;
  return out;
}

/** `transformPoint` の逆。平行移動 → 回転 → スケールの順で戻す。 */
function inverseTransformPoint(t: Transform, x: number, y: number, z: number): [number, number, number] {
  let px = x - t.position[0];
  let py = y - t.position[1];
  let pz = z - t.position[2];
  // 回転の逆は共役四元数
  const [qx, qy, qz, qw] = [-t.rotation[0], -t.rotation[1], -t.rotation[2], t.rotation[3]];
  const cx = 2 * (qy * pz - qz * py);
  const cy = 2 * (qz * px - qx * pz);
  const cz = 2 * (qx * py - qy * px);
  px += qw * cx + (qy * cz - qz * cy);
  py += qw * cy + (qz * cx - qx * cz);
  pz += qw * cz + (qx * cy - qy * cx);
  return [px / (t.scale[0] || 1), py / (t.scale[1] || 1), pz / (t.scale[2] || 1)];
}
