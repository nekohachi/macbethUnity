/**
 * 平面投影。`15` の 3.2。
 *
 * 島の平均法線に垂直な平面へ落とす（Maya の「平面マッピング・最適な平面」）。
 * 全部手で切りたい人が「まず平らに落として、あとは手で」と進めるための土台。
 * 曲がった島に当てると重なるが、それは投影の性質なのでそのまま出す。
 */

/** 返るのは 2 × 頂点数（u, v の順で交互）。 */
export function projectChart(positions: Float64Array, tri: Uint32Array): Float64Array {
  const count = positions.length / 3;
  const uv = new Float64Array(count * 2);
  if (!count) return uv;

  // 面積で重み付けした平均法線
  let nx = 0;
  let ny = 0;
  let nz = 0;
  for (let t = 0; t < tri.length; t += 3) {
    const a = tri[t] * 3;
    const b = tri[t + 1] * 3;
    const c = tri[t + 2] * 3;
    const ex = positions[b] - positions[a];
    const ey = positions[b + 1] - positions[a + 1];
    const ez = positions[b + 2] - positions[a + 2];
    const fx = positions[c] - positions[a];
    const fy = positions[c + 1] - positions[a + 1];
    const fz = positions[c + 2] - positions[a + 2];
    nx += ey * fz - ez * fy;
    ny += ez * fx - ex * fz;
    nz += ex * fy - ey * fx;
  }
  let len = Math.hypot(nx, ny, nz);
  if (len < 1e-12) {
    nx = 0;
    ny = 0;
    nz = 1;
    len = 1;
  }
  nx /= len;
  ny /= len;
  nz /= len;

  // 法線と平行でない軸を選んで、そこから直交する 2 本を作る
  const ax = Math.abs(nx) < 0.9 ? 1 : 0;
  const ay = Math.abs(nx) < 0.9 ? 0 : 1;
  let ux = ay * nz - 0 * ny;
  let uy = 0 * nx - ax * nz;
  let uz = ax * ny - ay * nx;
  const ulen = Math.hypot(ux, uy, uz) || 1;
  ux /= ulen;
  uy /= ulen;
  uz /= ulen;
  const vx = ny * uz - nz * uy;
  const vy = nz * ux - nx * uz;
  const vz = nx * uy - ny * ux;

  for (let i = 0; i < count; i++) {
    const px = positions[i * 3];
    const py = positions[i * 3 + 1];
    const pz = positions[i * 3 + 2];
    uv[i * 2] = px * ux + py * uy + pz * uz;
    uv[i * 2 + 1] = px * vx + py * vy + pz * vz;
  }
  return uv;
}
