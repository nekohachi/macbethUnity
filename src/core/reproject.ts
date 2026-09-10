/**
 * 再投影（`42` の T2。ZBrush の Project All）。
 *
 * トポロジを変えると上位レベルは対応を失って捨てられる（`markTopologyChanged`）。
 * **捨てる直前のハイを控えておいて、割り直したローの上へ焼き戻す**（`31` の 5）。
 *
 * 寄せ方は**最近点**。法線に沿って光線を飛ばす手もあるが、へこみや薄い所で
 * 刺さらずに抜けることがある。最近点なら必ずどこかに当たる。
 */
import { trianglesNear, type Bvh, type Triangles } from "./bvh.js";
import type { Mesh } from "./mesh.js";

/** 三角形の上でいちばん近い点（Ericson の書き方）。`out` に書いて距離の 2 乗を返す。 */
function closestOnTriangle(
  px: number,
  py: number,
  pz: number,
  ax: number,
  ay: number,
  az: number,
  bx: number,
  by: number,
  bz: number,
  cx: number,
  cy: number,
  cz: number,
  out: Float32Array,
): number {
  const abx = bx - ax,
    aby = by - ay,
    abz = bz - az;
  const acx = cx - ax,
    acy = cy - ay,
    acz = cz - az;
  const apx = px - ax,
    apy = py - ay,
    apz = pz - az;
  const d1 = abx * apx + aby * apy + abz * apz;
  const d2 = acx * apx + acy * apy + acz * apz;
  let qx = ax,
    qy = ay,
    qz = az;
  if (d1 > 0 || d2 > 0) {
    const bpx = px - bx,
      bpy = py - by,
      bpz = pz - bz;
    const d3 = abx * bpx + aby * bpy + abz * bpz;
    const d4 = acx * bpx + acy * bpy + acz * bpz;
    const cpx = px - cx,
      cpy = py - cy,
      cpz = pz - cz;
    const d5 = abx * cpx + aby * cpy + abz * cpz;
    const d6 = acx * cpx + acy * cpy + acz * cpz;
    const vc = d1 * d4 - d3 * d2;
    const vb = d5 * d2 - d1 * d6;
    const va = d3 * d6 - d5 * d4;
    if (d1 <= 0 && d2 <= 0) {
      // A のかど
    } else if (d3 >= 0 && d4 <= d3) {
      qx = bx;
      qy = by;
      qz = bz;
    } else if (d6 >= 0 && d5 <= d6) {
      qx = cx;
      qy = cy;
      qz = cz;
    } else if (vc <= 0 && d1 >= 0 && d3 <= 0) {
      const t = d1 / (d1 - d3);
      qx = ax + abx * t;
      qy = ay + aby * t;
      qz = az + abz * t;
    } else if (vb <= 0 && d2 >= 0 && d6 <= 0) {
      const t = d2 / (d2 - d6);
      qx = ax + acx * t;
      qy = ay + acy * t;
      qz = az + acz * t;
    } else if (va <= 0 && d4 - d3 >= 0 && d5 - d6 >= 0) {
      const t = (d4 - d3) / (d4 - d3 + (d5 - d6));
      qx = bx + (cx - bx) * t;
      qy = by + (cy - by) * t;
      qz = bz + (cz - bz) * t;
    } else {
      const denom = 1 / (va + vb + vc);
      const v = vb * denom;
      const w = vc * denom;
      qx = ax + abx * v + acx * w;
      qy = ay + aby * v + acy * w;
      qz = az + abz * v + acz * w;
    }
  }
  out[0] = qx;
  out[1] = qy;
  out[2] = qz;
  const dx = px - qx,
    dy = py - qy,
    dz = pz - qz;
  return dx * dx + dy * dy + dz * dz;
}

/** 三角形の辺の長さの平均（探す半径の目安）。頭の 500 個だけ見る。 */
export function averageEdge(positions: Float32Array, tris: Triangles): number {
  const count = (tris.tri.length / 3) | 0;
  if (!count) return 0;
  const take = Math.min(count, 500);
  let sum = 0;
  for (let t = 0; t < take; t++) {
    const a = tris.tri[t * 3],
      b = tris.tri[t * 3 + 1],
      c = tris.tri[t * 3 + 2];
    sum +=
      Math.hypot(positions[a * 3] - positions[b * 3], positions[a * 3 + 1] - positions[b * 3 + 1], positions[a * 3 + 2] - positions[b * 3 + 2]) +
      Math.hypot(positions[b * 3] - positions[c * 3], positions[b * 3 + 1] - positions[c * 3 + 1], positions[b * 3 + 2] - positions[c * 3 + 2]) +
      Math.hypot(positions[c * 3] - positions[a * 3], positions[c * 3 + 1] - positions[a * 3 + 1], positions[c * 3 + 2] - positions[a * 3 + 2]);
  }
  return sum / (take * 3);
}

/**
 * `target` の頂点を、`source` の面のいちばん近い所へ寄せる（`42` の T2）。
 *
 * 探す半径は `startRadius` から始めて、当たらなければ 2 倍を 3 回まで。
 * `maxDist` より遠い所しか無ければ**動かさない**（トポロジを大きく変えたときに、
 * 見当違いの所へ吸い付かないため）。
 *
 * `target.positions` をその場で書き換える。
 */
export function projectOnto(
  target: Mesh,
  source: Float32Array,
  tris: Triangles,
  bvh: Bvh,
  startRadius: number,
  maxDist: number,
): { moved: number; worst: number; missed: number } {
  const p = target.positions;
  const best = new Float32Array(3);
  const hit = new Float32Array(3);
  let moved = 0;
  let worst = 0;
  let missed = 0;
  const limit = maxDist * maxDist;
  for (let v = 0; v < target.vertexCount; v++) {
    const px = p[v * 3],
      py = p[v * 3 + 1],
      pz = p[v * 3 + 2];
    let bestD = Infinity;
    let radius = startRadius;
    for (let grow = 0; grow < 4 && bestD === Infinity; grow++, radius *= 2) {
      const near = trianglesNear(bvh, [px, py, pz], radius);
      for (const t of near) {
        const a = tris.tri[t * 3],
          b = tris.tri[t * 3 + 1],
          c = tris.tri[t * 3 + 2];
        const d = closestOnTriangle(
          px,
          py,
          pz,
          source[a * 3],
          source[a * 3 + 1],
          source[a * 3 + 2],
          source[b * 3],
          source[b * 3 + 1],
          source[b * 3 + 2],
          source[c * 3],
          source[c * 3 + 1],
          source[c * 3 + 2],
          hit,
        );
        if (d >= bestD) continue;
        bestD = d;
        best[0] = hit[0];
        best[1] = hit[1];
        best[2] = hit[2];
      }
    }
    if (bestD === Infinity || bestD > limit) {
      missed++;
      continue;
    }
    const dist = Math.sqrt(bestD);
    if (dist > worst) worst = dist;
    if (dist > 1e-9) moved++;
    p[v * 3] = best[0];
    p[v * 3 + 1] = best[1];
    p[v * 3 + 2] = best[2];
  }
  return { moved, worst, missed };
}
