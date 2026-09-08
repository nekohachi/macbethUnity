/**
 * 歪みの評価。`15` の 3.1 の最後。
 *
 * 三角形ごとに「3D の形 → UV の形」の 2×2 行列を出し、その特異値を見る。
 *
 * 見るのは **σ1 / σ2**（形の歪み）。1.00 なら形は保たれている。
 * max(σ1, 1/σ2) にすると全体の縮尺まで数えてしまい、たとえば立方体の展開図
 * （1 辺 1 の面を 1/4 のマスに置く）が「伸び ×4.00」と出て、
 * 何も歪んでいないのに壊れているように見える。縮尺はテクセル密度の話なので
 * パッキング側（C3）で見る。
 */

export interface Distortion {
  /** いちばん歪んだ三角形の形の歪み（σ1 / σ2）。1.0 が完全。 */
  maxStretch: number;
  /** 角度の差の平均（度）。 */
  meanAngleError: number;
  /** 三角形ごとの伸び。ヒートマップに使う（C4）。 */
  perTriangle: Float32Array;
}

export function measure(positions: Float64Array, tri: Uint32Array, uv: Float64Array): Distortion {
  const triangles = tri.length / 3;
  const perTriangle = new Float32Array(triangles);
  let maxStretch = 1;
  let angleSum = 0;
  let angleCount = 0;

  for (let t = 0; t < triangles; t++) {
    const a = tri[t * 3];
    const b = tri[t * 3 + 1];
    const c = tri[t * 3 + 2];

    // 3D の三角形をその平面に置く
    const ex = positions[b * 3] - positions[a * 3];
    const ey = positions[b * 3 + 1] - positions[a * 3 + 1];
    const ez = positions[b * 3 + 2] - positions[a * 3 + 2];
    const fx = positions[c * 3] - positions[a * 3];
    const fy = positions[c * 3 + 1] - positions[a * 3 + 1];
    const fz = positions[c * 3 + 2] - positions[a * 3 + 2];
    const len = Math.hypot(ex, ey, ez);
    if (len < 1e-12) {
      perTriangle[t] = 1;
      continue;
    }
    const x2 = len;
    const x3 = (ex * fx + ey * fy + ez * fz) / len;
    const cx = ey * fz - ez * fy;
    const cy = ez * fx - ex * fz;
    const cz = ex * fy - ey * fx;
    const y3 = Math.hypot(cx, cy, cz) / len;
    const det = x2 * y3;
    if (!(Math.abs(det) > 1e-16)) {
      perTriangle[t] = 1;
      continue;
    }

    // UV 側の 2 辺
    const du2 = uv[b * 2] - uv[a * 2];
    const dv2 = uv[b * 2 + 1] - uv[a * 2 + 1];
    const du3 = uv[c * 2] - uv[a * 2];
    const dv3 = uv[c * 2 + 1] - uv[a * 2 + 1];

    // J = UV · X⁻¹。X = [[x2, x3], [0, y3]]
    const j00 = (du2 * y3 - du3 * 0) / det;
    const j01 = (-du2 * x3 + du3 * x2) / det;
    const j10 = (dv2 * y3 - dv3 * 0) / det;
    const j11 = (-dv2 * x3 + dv3 * x2) / det;

    // 2×2 の特異値
    const e = (j00 + j11) / 2;
    const f = (j00 - j11) / 2;
    const g = (j10 + j01) / 2;
    const h = (j10 - j01) / 2;
    const q = Math.hypot(e, h);
    const r = Math.hypot(f, g);
    const s1 = q + r;
    const s2 = Math.abs(q - r);
    // 形の歪みだけを見る（縮尺には依らない）
    const stretch = s2 > 1e-12 ? s1 / s2 : 1e12;
    perTriangle[t] = stretch;
    if (stretch > maxStretch) maxStretch = stretch;

    // 角度の差。3 つの角をそれぞれ比べる
    const corners3d: Array<[number, number]> = [
      [0, 0],
      [x2, 0],
      [x3, y3],
    ];
    const cornersUv: Array<[number, number]> = [
      [uv[a * 2], uv[a * 2 + 1]],
      [uv[b * 2], uv[b * 2 + 1]],
      [uv[c * 2], uv[c * 2 + 1]],
    ];
    for (let k = 0; k < 3; k++) {
      const p = corners3d[k];
      const q1 = corners3d[(k + 1) % 3];
      const q2 = corners3d[(k + 2) % 3];
      const u = cornersUv[k];
      const w1 = cornersUv[(k + 1) % 3];
      const w2 = cornersUv[(k + 2) % 3];
      const a3 = angleAt(p, q1, q2);
      const au = angleAt(u, w1, w2);
      if (Number.isFinite(a3) && Number.isFinite(au)) {
        angleSum += Math.abs(a3 - au);
        angleCount++;
      }
    }
  }

  return {
    maxStretch,
    meanAngleError: angleCount ? (angleSum / angleCount) * (180 / Math.PI) : 0,
    perTriangle,
  };
}

function angleAt(p: [number, number], a: [number, number], b: [number, number]): number {
  const ax = a[0] - p[0];
  const ay = a[1] - p[1];
  const bx = b[0] - p[0];
  const by = b[1] - p[1];
  const la = Math.hypot(ax, ay);
  const lb = Math.hypot(bx, by);
  if (la < 1e-12 || lb < 1e-12) return NaN;
  const cos = Math.max(-1, Math.min(1, (ax * bx + ay * by) / (la * lb)));
  return Math.acos(cos);
}
