/**
 * LSCM（Least Squares Conformal Maps、Lévy 2002）。`15` の 3.1。
 *
 * 三角形ごとに「角を保つ」条件を 1 本の複素方程式で書き、全部まとめて
 * 最小二乗で解く。未知数は各 UV 頂点の (u, v)。2 点を固定すると
 * 残りが 1 通りに決まる（固定しないと平行移動・回転・拡大が自由に残る）。
 *
 * 解くのは正規方程式 AᵀA x = Aᵀb を共役勾配法で。疎行列を素直に持つだけで、
 * 外部のライブラリは使わない（`12` の決め）。
 */

/** 疎な行列。行ごとに (列, 係数) を持つ。 */
interface SparseRows {
  cols: Int32Array[];
  vals: Float64Array[];
  /** 右辺。固定した頂点のぶんを移してある。 */
  rhs: Float64Array;
  columns: number;
}

/** A x を計算する。 */
function multiply(A: SparseRows, x: Float64Array): Float64Array {
  const out = new Float64Array(A.cols.length);
  for (let r = 0; r < A.cols.length; r++) {
    const cols = A.cols[r];
    const vals = A.vals[r];
    let sum = 0;
    for (let k = 0; k < cols.length; k++) sum += vals[k] * x[cols[k]];
    out[r] = sum;
  }
  return out;
}

/** Aᵀ y を計算する。 */
function multiplyTransposed(A: SparseRows, y: Float64Array): Float64Array {
  const out = new Float64Array(A.columns);
  for (let r = 0; r < A.cols.length; r++) {
    const cols = A.cols[r];
    const vals = A.vals[r];
    const yr = y[r];
    if (yr === 0) continue;
    for (let k = 0; k < cols.length; k++) out[cols[k]] += vals[k] * yr;
  }
  return out;
}

/**
 * 正規方程式 AᵀA x = Aᵀb を共役勾配法で解く。
 * A は対称でも正定値でもないが、AᵀA はそうなるのでこれで解ける。
 */
export function conjugateGradient(A: SparseRows, iterations = 2000, tolerance = 1e-6): Float64Array {
  const n = A.columns;
  const x = new Float64Array(n);
  const b = multiplyTransposed(A, A.rhs);
  // r = Aᵀb − AᵀA x。x は 0 から始めるので r = Aᵀb
  const r = Float64Array.from(b);
  const p = Float64Array.from(r);
  let rr = 0;
  for (let i = 0; i < n; i++) rr += r[i] * r[i];
  const goal = Math.max(1e-300, rr) * tolerance * tolerance;
  if (rr <= goal) return x;

  for (let step = 0; step < iterations; step++) {
    const ap = multiplyTransposed(A, multiply(A, p));
    let pap = 0;
    for (let i = 0; i < n; i++) pap += p[i] * ap[i];
    if (!(Math.abs(pap) > 1e-300)) break;
    const alpha = rr / pap;
    for (let i = 0; i < n; i++) {
      x[i] += alpha * p[i];
      r[i] -= alpha * ap[i];
    }
    let next = 0;
    for (let i = 0; i < n; i++) next += r[i] * r[i];
    if (next <= goal) break;
    const beta = next / rr;
    for (let i = 0; i < n; i++) p[i] = r[i] + beta * p[i];
    rr = next;
  }
  return x;
}

/** 三角形を、その三角形の平面に置いた 2D 座標にする。 */
function flatten(
  positions: Float64Array,
  a: number,
  b: number,
  c: number,
): { x: [number, number, number]; y: [number, number, number]; area2: number } {
  const ex = positions[b * 3] - positions[a * 3];
  const ey = positions[b * 3 + 1] - positions[a * 3 + 1];
  const ez = positions[b * 3 + 2] - positions[a * 3 + 2];
  const fx = positions[c * 3] - positions[a * 3];
  const fy = positions[c * 3 + 1] - positions[a * 3 + 1];
  const fz = positions[c * 3 + 2] - positions[a * 3 + 2];
  const len = Math.hypot(ex, ey, ez);
  if (len < 1e-12) return { x: [0, 0, 0], y: [0, 0, 0], area2: 0 };
  // 第 1 辺を x 軸に置く
  const x2 = len;
  const dot = (ex * fx + ey * fy + ez * fz) / len;
  const cx = ey * fz - ez * fy;
  const cy = ez * fx - ex * fz;
  const cz = ex * fy - ey * fx;
  const y3 = Math.hypot(cx, cy, cz) / len;
  return { x: [0, x2, dot], y: [0, 0, y3], area2: x2 * y3 };
}

/**
 * LSCM を解く。返るのは 2 × 頂点数（u, v の順で交互）。
 *
 * `pins` は「島内の頂点番号 → (u, v)」。2 つ未満なら呼び出し側で足しておくこと
 * （足りないと解が 1 つに定まらない）。
 */
export function lscm(
  positions: Float64Array,
  tri: Uint32Array,
  pins: Map<number, [number, number]>,
): Float64Array {
  const count = positions.length / 3;
  const uv = new Float64Array(count * 2);
  if (!count) return uv;

  // 固定していない頂点だけを未知数にする。u が前半、v が後半
  const free: number[] = [];
  const slot = new Int32Array(count).fill(-1);
  for (let v = 0; v < count; v++) {
    if (pins.has(v)) continue;
    slot[v] = free.length;
    free.push(v);
  }
  const columns = free.length * 2;
  if (!columns) {
    for (const [v, p] of pins) {
      uv[v * 2] = p[0];
      uv[v * 2 + 1] = p[1];
    }
    return uv;
  }

  const cols: Int32Array[] = [];
  const vals: Float64Array[] = [];
  const rhsList: number[] = [];

  for (let t = 0; t < tri.length; t += 3) {
    const idx = [tri[t], tri[t + 1], tri[t + 2]];
    const { x, y, area2 } = flatten(positions, idx[0], idx[1], idx[2]);
    if (!(area2 > 1e-16)) continue;
    const scale = 1 / Math.sqrt(area2);
    // W_j = (x_{j+2} − x_{j+1}) + i (y_{j+2} − y_{j+1})
    const wx = [x[2] - x[1], x[0] - x[2], x[1] - x[0]];
    const wy = [y[2] - y[1], y[0] - y[2], y[1] - y[0]];

    // 実部と虚部で 2 本の式。u の係数は (wx, wy)、v の係数は (−wy, wx)
    for (const part of [0, 1]) {
      const c: number[] = [];
      const a: number[] = [];
      let rhs = 0;
      for (let j = 0; j < 3; j++) {
        const cu = (part === 0 ? wx[j] : wy[j]) * scale;
        const cv = (part === 0 ? -wy[j] : wx[j]) * scale;
        const v = idx[j];
        const pinned = pins.get(v);
        if (pinned) {
          rhs -= cu * pinned[0] + cv * pinned[1];
          continue;
        }
        c.push(slot[v], free.length + slot[v]);
        a.push(cu, cv);
      }
      if (!c.length) continue;
      cols.push(Int32Array.from(c));
      vals.push(Float64Array.from(a));
      rhsList.push(rhs);
    }
  }

  const solved = conjugateGradient({
    cols,
    vals,
    rhs: Float64Array.from(rhsList),
    columns,
  });

  for (let i = 0; i < free.length; i++) {
    const v = free[i];
    uv[v * 2] = solved[i];
    uv[v * 2 + 1] = solved[free.length + i];
  }
  for (const [v, p] of pins) {
    uv[v * 2] = p[0];
    uv[v * 2 + 1] = p[1];
  }
  return uv;
}

/**
 * 固定する 2 点を選ぶ。島の中で最も離れた 2 頂点を (0,0) と (1,0) に置く。
 *
 * ここで決まるのは向きと位置だけ。**大きさは後で面積比でそろえる**
 * （`normalizeScale`）。3D の距離をそのまま使うと、開いたときに離れる 2 点を
 * 無理に近づけることになって島全体が縮む。筒で伸びが 1.3 になるのがそれ。
 */
export function autoPins(positions: Float64Array): Map<number, [number, number]> {
  const count = positions.length / 3;
  const pins = new Map<number, [number, number]>();
  if (count < 2) {
    if (count === 1) pins.set(0, [0, 0]);
    return pins;
  }
  // 境界箱の端から始めて、最遠点を 2 回取る（総当たりを避ける）
  let far = 0;
  let best = -1;
  for (let v = 1; v < count; v++) {
    const d = distance(positions, 0, v);
    if (d > best) {
      best = d;
      far = v;
    }
  }
  let other = 0;
  best = -1;
  for (let v = 0; v < count; v++) {
    if (v === far) continue;
    const d = distance(positions, far, v);
    if (d > best) {
      best = d;
      other = v;
    }
  }
  const a = Math.min(far, other);
  const b = Math.max(far, other);
  pins.set(a, [0, 0]);
  pins.set(b, [1, 0]);
  return pins;
}

function distance(positions: Float64Array, a: number, b: number): number {
  return Math.hypot(
    positions[a * 3] - positions[b * 3],
    positions[a * 3 + 1] - positions[b * 3 + 1],
    positions[a * 3 + 2] - positions[b * 3 + 2],
  );
}

/**
 * 面積が 3D と合うように、島全体を一様に拡大縮小する。
 *
 * LSCM が決めるのは形だけで、大きさは固定した 2 点の置き方で決まってしまう。
 * 展開できる面（円筒や立方体の展開図）なら、面積を合わせた時点で伸びが 1.00 になる。
 */
export function normalizeScale(positions: Float64Array, tri: Uint32Array, uv: Float64Array): number {
  let area3d = 0;
  let areaUv = 0;
  for (let t = 0; t < tri.length; t += 3) {
    const a = tri[t];
    const b = tri[t + 1];
    const c = tri[t + 2];
    const ex = positions[b * 3] - positions[a * 3];
    const ey = positions[b * 3 + 1] - positions[a * 3 + 1];
    const ez = positions[b * 3 + 2] - positions[a * 3 + 2];
    const fx = positions[c * 3] - positions[a * 3];
    const fy = positions[c * 3 + 1] - positions[a * 3 + 1];
    const fz = positions[c * 3 + 2] - positions[a * 3 + 2];
    const cx = ey * fz - ez * fy;
    const cy = ez * fx - ex * fz;
    const cz = ex * fy - ey * fx;
    area3d += Math.hypot(cx, cy, cz) / 2;
    const du2 = uv[b * 2] - uv[a * 2];
    const dv2 = uv[b * 2 + 1] - uv[a * 2 + 1];
    const du3 = uv[c * 2] - uv[a * 2];
    const dv3 = uv[c * 2 + 1] - uv[a * 2 + 1];
    areaUv += Math.abs(du2 * dv3 - dv2 * du3) / 2;
  }
  if (!(area3d > 1e-16) || !(areaUv > 1e-16)) return 1;
  const scale = Math.sqrt(area3d / areaUv);
  for (let i = 0; i < uv.length; i++) uv[i] *= scale;
  return scale;
}
