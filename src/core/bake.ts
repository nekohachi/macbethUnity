/**
 * ベイク（`44`。`31` の 4）。ハイの細部を、ローの UV の絵に焼く。
 *
 * **光線を飛ばさない。** ハイはローの細分割そのもので、`assembleQuads` は
 * UV も一緒に細分割している（コーナーの UV → 中点と面の平均）。つまり
 * **ハイの UV の島は、ローの島とぴったり同じ場所を覆う**。だから
 *
 * ```
 * テクセル ← ローをラスタライズ → P_low, N_low, T_low, B_low
 * テクセル ← ハイをラスタライズ → P_high, N_high
 * 法線マップ = N_high をローの接空間で表したもの
 * 高さマップ = (P_high − P_low) · N_low
 * ```
 *
 * ケージも距離も貫通の判定も要らず、継ぎ目も割れない。
 */
import type { Mesh } from "./mesh.js";

export interface BakeOptions {
  /** 1 辺のテクセル数。1024 / 2048 / 4096。 */
  size: number;
  /** 島の外へ色を伸ばす幅（テクセル）。0 で伸ばさない。 */
  padding?: number;
  uvSet?: string;
}

export interface BakeResult {
  size: number;
  /** 接空間法線（RGBA8。+Z が外向き、A は 255）。 */
  normal: Uint8Array;
  /** 高さ（ローの法線方向の差。ワールド単位）。 */
  height: Float32Array;
  /** 島の中なら 1、埋めたぶんは 2、外は 0。 */
  coverage: Uint8Array;
  /** 高さの min / max。書き出すときの正規化に使う。 */
  heightRange: [number, number];
  /** 島が覆ったテクセルの数（埋めたぶんは含まない）。 */
  covered: number;
}

/** 頂点ごとの接空間（`44` の T1）。法線は面積の重み、接線は UV の微分から。 */
interface Frames {
  normal: Float32Array;
  tangent: Float32Array;
  /** 従法線の向き（+1 / −1）。`B = sign × (N × T)`。glTF の `TANGENT.w` と同じ。 */
  sign: Float32Array;
}

/**
 * 頂点ごとの法線と接線を作る。
 *
 * 法線は面の外積（長さが面積の 2 倍）をそのまま足す＝**面積の重み**。
 * 接線は三角形ごとの `dP/du` を足してから正規化する（MikkTSpace と同じ考え方で、
 * glTF と Substance が期待する形）。
 *
 * **`dP/dv` も一緒に足して、従法線の向きを覚えておく。** UV が裏返っている島
 * （このアプリのプレーンがそう）で `N × T` をそのまま使うと、緑が逆さに焼ける。
 */
function buildFrames(mesh: Mesh, uv: Float32Array): Frames {
  const n = mesh.vertexCount;
  const normal = new Float32Array(n * 3);
  const tangent = new Float32Array(n * 3);
  const bitangent = new Float32Array(n * 3);
  const p = mesh.positions;
  for (let f = 0; f < mesh.faceCount; f++) {
    const s = mesh.faceOffsets[f];
    const count = mesh.faceOffsets[f + 1] - s;
    // 頂点 0 からの扇。`mesh.triangulate` と同じ割り方
    for (let i = 1; i + 1 < count; i++) {
      const ca = s;
      const cb = s + i;
      const cc = s + i + 1;
      const a = mesh.faceCorners[ca];
      const b = mesh.faceCorners[cb];
      const c = mesh.faceCorners[cc];
      const e1x = p[b * 3] - p[a * 3],
        e1y = p[b * 3 + 1] - p[a * 3 + 1],
        e1z = p[b * 3 + 2] - p[a * 3 + 2];
      const e2x = p[c * 3] - p[a * 3],
        e2y = p[c * 3 + 1] - p[a * 3 + 1],
        e2z = p[c * 3 + 2] - p[a * 3 + 2];
      const nx = e1y * e2z - e1z * e2y;
      const ny = e1z * e2x - e1x * e2z;
      const nz = e1x * e2y - e1y * e2x;
      // UV の微分から接線
      const du1 = uv[cb * 2] - uv[ca * 2];
      const dv1 = uv[cb * 2 + 1] - uv[ca * 2 + 1];
      const du2 = uv[cc * 2] - uv[ca * 2];
      const dv2 = uv[cc * 2 + 1] - uv[ca * 2 + 1];
      const det = du1 * dv2 - du2 * dv1;
      let tx = 0,
        ty = 0,
        tz = 0;
      let sx = 0,
        sy = 0,
        sz = 0;
      if (Math.abs(det) > 1e-20) {
        const r = 1 / det;
        tx = (e1x * dv2 - e2x * dv1) * r;
        ty = (e1y * dv2 - e2y * dv1) * r;
        tz = (e1z * dv2 - e2z * dv1) * r;
        sx = (e2x * du1 - e1x * du2) * r;
        sy = (e2y * du1 - e1y * du2) * r;
        sz = (e2z * du1 - e1z * du2) * r;
      }
      for (const v of [a, b, c]) {
        normal[v * 3] += nx;
        normal[v * 3 + 1] += ny;
        normal[v * 3 + 2] += nz;
        tangent[v * 3] += tx;
        tangent[v * 3 + 1] += ty;
        tangent[v * 3 + 2] += tz;
        bitangent[v * 3] += sx;
        bitangent[v * 3 + 1] += sy;
        bitangent[v * 3 + 2] += sz;
      }
    }
  }
  const sign = new Float32Array(n);
  for (let v = 0; v < n; v++) {
    const nl = Math.hypot(normal[v * 3], normal[v * 3 + 1], normal[v * 3 + 2]) || 1;
    normal[v * 3] /= nl;
    normal[v * 3 + 1] /= nl;
    normal[v * 3 + 2] /= nl;
    const tl = Math.hypot(tangent[v * 3], tangent[v * 3 + 1], tangent[v * 3 + 2]);
    if (tl < 1e-12) {
      // UV が潰れている頂点。法線と直交する軸を適当に選ぶ
      const ax = Math.abs(normal[v * 3]) < 0.9 ? 1 : 0;
      tangent[v * 3] = ax ? 0 : 1;
      tangent[v * 3 + 1] = ax ? normal[v * 3 + 2] : 0;
      tangent[v * 3 + 2] = ax ? -normal[v * 3 + 1] : 0;
    } else {
      tangent[v * 3] /= tl;
      tangent[v * 3 + 1] /= tl;
      tangent[v * 3 + 2] /= tl;
    }
    // N × T が dP/dv とどちら向きか
    const cx = normal[v * 3 + 1] * tangent[v * 3 + 2] - normal[v * 3 + 2] * tangent[v * 3 + 1];
    const cy = normal[v * 3 + 2] * tangent[v * 3] - normal[v * 3] * tangent[v * 3 + 2];
    const cz = normal[v * 3] * tangent[v * 3 + 1] - normal[v * 3 + 1] * tangent[v * 3];
    const d = cx * bitangent[v * 3] + cy * bitangent[v * 3 + 1] + cz * bitangent[v * 3 + 2];
    sign[v] = d < 0 ? -1 : 1;
  }
  return { normal, tangent, sign };
}

/** ラスタライズで 1 テクセルに書き込むもの。 */
type Sample = (texel: number, a: number, b: number, c: number, wa: number, wb: number, wc: number) => void;

/**
 * UV の三角形をテクセルへ落とす。**テクセルの中心**で判定する。
 *
 * `size` の升目の (0,0) は UV (0,0)、v は下から上へ（UV の決まり）。
 */
function rasterize(mesh: Mesh, uv: Float32Array, size: number, write: Sample): void {
  for (let f = 0; f < mesh.faceCount; f++) {
    const s = mesh.faceOffsets[f];
    const count = mesh.faceOffsets[f + 1] - s;
    for (let i = 1; i + 1 < count; i++) {
      const ca = s,
        cb = s + i,
        cc = s + i + 1;
      const ax = uv[ca * 2] * size,
        ay = uv[ca * 2 + 1] * size;
      const bx = uv[cb * 2] * size,
        by = uv[cb * 2 + 1] * size;
      const cx = uv[cc * 2] * size,
        cy = uv[cc * 2 + 1] * size;
      const area = (bx - ax) * (cy - ay) - (cx - ax) * (by - ay);
      if (Math.abs(area) < 1e-20) continue;
      const inv = 1 / area;
      const lo = (v: number) => Math.max(0, Math.floor(Math.min(v, size - 1)));
      const hi = (v: number) => Math.min(size - 1, Math.ceil(Math.max(v, 0)));
      const x0 = lo(Math.min(ax, bx, cx));
      const x1 = hi(Math.max(ax, bx, cx));
      const y0 = lo(Math.min(ay, by, cy));
      const y1 = hi(Math.max(ay, by, cy));
      for (let y = y0; y <= y1; y++) {
        const py = y + 0.5;
        for (let x = x0; x <= x1; x++) {
          const px = x + 0.5;
          const wa = ((bx - px) * (cy - py) - (cx - px) * (by - py)) * inv;
          const wb = ((cx - px) * (ay - py) - (ax - px) * (cy - py)) * inv;
          const wc = 1 - wa - wb;
          if (wa < 0 || wb < 0 || wc < 0) continue;
          write(y * size + x, mesh.faceCorners[ca], mesh.faceCorners[cb], mesh.faceCorners[cc], wa, wb, wc);
        }
      }
    }
  }
}

/** 島の外へ色を伸ばす（`44` の T1）。伸ばしたテクセルは `coverage` が 2。 */
function dilate(normal: Uint8Array, height: Float32Array, coverage: Uint8Array, size: number, rounds: number): void {
  if (rounds <= 0) return;
  const offsets = [-1, 1, -size, size, -size - 1, -size + 1, size - 1, size + 1];
  for (let r = 0; r < rounds; r++) {
    const grown: number[] = [];
    for (let t = 0; t < coverage.length; t++) {
      if (coverage[t]) continue;
      const x = t % size;
      let count = 0;
      let nr = 0,
        ng = 0,
        nb = 0,
        h = 0;
      for (const off of offsets) {
        const u = t + off;
        if (u < 0 || u >= coverage.length || !coverage[u]) continue;
        // 横に回り込まない（左端と右端はつながっていない）
        const ux = u % size;
        if (Math.abs(ux - x) > 1) continue;
        nr += normal[u * 4];
        ng += normal[u * 4 + 1];
        nb += normal[u * 4 + 2];
        h += height[u];
        count++;
      }
      if (!count) continue;
      grown.push(t, (nr / count) | 0, (ng / count) | 0, (nb / count) | 0);
      height[t] = h / count;
    }
    for (let i = 0; i < grown.length; i += 4) {
      const t = grown[i];
      normal[t * 4] = grown[i + 1];
      normal[t * 4 + 1] = grown[i + 2];
      normal[t * 4 + 2] = grown[i + 3];
      normal[t * 4 + 3] = 255;
      coverage[t] = 2;
    }
  }
}

/**
 * 法線マップと高さマップを焼く（`44`）。
 *
 * `low` と `high` は**同じ UV の島**を持っていること（`high` は `low` を細分割した
 * ものであれば必ずそうなる）。`low` に `map1` が無ければ `null`。
 */
export function bakeMaps(low: Mesh, high: Mesh, options: BakeOptions): BakeResult | null {
  const name = options.uvSet ?? "map1";
  const lowUv = low.uvSets.get(name);
  const highUv = high.uvSets.get(name);
  if (!lowUv || !highUv) return null;
  const size = Math.max(1, Math.floor(options.size));
  const texels = size * size;

  const frames = buildFrames(low, lowUv);
  const highNormal = buildFrames(high, highUv).normal;

  // ローのぶん
  const pLow = new Float32Array(texels * 3);
  const nLow = new Float32Array(texels * 3);
  const tLow = new Float32Array(texels * 3);
  const sLow = new Float32Array(texels);
  const coverage = new Uint8Array(texels);
  const lp = low.positions;
  rasterize(low, lowUv, size, (t, a, b, c, wa, wb, wc) => {
    coverage[t] = 1;
    sLow[t] = frames.sign[a] * wa + frames.sign[b] * wb + frames.sign[c] * wc;
    for (let k = 0; k < 3; k++) {
      pLow[t * 3 + k] = lp[a * 3 + k] * wa + lp[b * 3 + k] * wb + lp[c * 3 + k] * wc;
      nLow[t * 3 + k] = frames.normal[a * 3 + k] * wa + frames.normal[b * 3 + k] * wb + frames.normal[c * 3 + k] * wc;
      tLow[t * 3 + k] = frames.tangent[a * 3 + k] * wa + frames.tangent[b * 3 + k] * wb + frames.tangent[c * 3 + k] * wc;
    }
  });

  // ローの接空間を、テクセルごとにここで直交化しておく（補間で崩れているため）。
  // **ハイのぶんを溜めない**（2K で 100MB 変わる）。ハイは 1 回なめて、その場で書く
  const normal = new Uint8Array(texels * 4);
  const height = new Float32Array(texels);
  let covered = 0;
  for (let t = 0; t < texels; t++) {
    if (!coverage[t]) continue;
    covered++;
    let nx = nLow[t * 3],
      ny = nLow[t * 3 + 1],
      nz = nLow[t * 3 + 2];
    const nl = Math.hypot(nx, ny, nz) || 1;
    nx /= nl;
    ny /= nl;
    nz /= nl;
    let tx = tLow[t * 3],
      ty = tLow[t * 3 + 1],
      tz = tLow[t * 3 + 2];
    const dot = tx * nx + ty * ny + tz * nz;
    tx -= nx * dot;
    ty -= ny * dot;
    tz -= nz * dot;
    let tl = Math.hypot(tx, ty, tz);
    if (tl < 1e-12) {
      const ax = Math.abs(nx) < 0.9 ? 1 : 0;
      tx = ax ? 0 : 1;
      ty = ax ? nz : 0;
      tz = ax ? -ny : 0;
      tl = Math.hypot(tx, ty, tz) || 1;
    }
    nLow[t * 3] = nx;
    nLow[t * 3 + 1] = ny;
    nLow[t * 3 + 2] = nz;
    tLow[t * 3] = tx / tl;
    tLow[t * 3 + 1] = ty / tl;
    tLow[t * 3 + 2] = tz / tl;
    // ハイが乗らなかったテクセル（島のふちで丸めが食い違ったとき）は平ら
    normal[t * 4] = 128;
    normal[t * 4 + 1] = 128;
    normal[t * 4 + 2] = 255;
    normal[t * 4 + 3] = 255;
  }

  // ハイのぶん。テクセルごとに、その場で接空間へ落として書く
  const hp = high.positions;
  rasterize(high, highUv, size, (t, a, b, c, wa, wb, wc) => {
    if (!coverage[t]) return;
    const nx = nLow[t * 3],
      ny = nLow[t * 3 + 1],
      nz = nLow[t * 3 + 2];
    const tx = tLow[t * 3],
      ty = tLow[t * 3 + 1],
      tz = tLow[t * 3 + 2];
    const w = sLow[t] < 0 ? -1 : 1;
    const bx = (ny * tz - nz * ty) * w;
    const by = (nz * tx - nx * tz) * w;
    const bz = (nx * ty - ny * tx) * w;
    let ex = highNormal[a * 3] * wa + highNormal[b * 3] * wb + highNormal[c * 3] * wc;
    let ey = highNormal[a * 3 + 1] * wa + highNormal[b * 3 + 1] * wb + highNormal[c * 3 + 1] * wc;
    let ez = highNormal[a * 3 + 2] * wa + highNormal[b * 3 + 2] * wb + highNormal[c * 3 + 2] * wc;
    const el = Math.hypot(ex, ey, ez) || 1;
    ex /= el;
    ey /= el;
    ez /= el;
    const px = hp[a * 3] * wa + hp[b * 3] * wb + hp[c * 3] * wc;
    const py = hp[a * 3 + 1] * wa + hp[b * 3 + 1] * wb + hp[c * 3 + 1] * wc;
    const pz = hp[a * 3 + 2] * wa + hp[b * 3 + 2] * wb + hp[c * 3 + 2] * wc;
    height[t] = (px - pLow[t * 3]) * nx + (py - pLow[t * 3 + 1]) * ny + (pz - pLow[t * 3 + 2]) * nz;
    const sx = ex * tx + ey * ty + ez * tz;
    const sy = ex * bx + ey * by + ez * bz;
    const sz = ex * nx + ey * ny + ez * nz;
    const sl = Math.hypot(sx, sy, sz) || 1;
    normal[t * 4] = Math.max(0, Math.min(255, Math.round(((sx / sl) * 0.5 + 0.5) * 255)));
    normal[t * 4 + 1] = Math.max(0, Math.min(255, Math.round(((sy / sl) * 0.5 + 0.5) * 255)));
    normal[t * 4 + 2] = Math.max(0, Math.min(255, Math.round(((sz / sl) * 0.5 + 0.5) * 255)));
  });

  let lo = Infinity;
  let hiRange = -Infinity;
  for (let t = 0; t < texels; t++) {
    if (!coverage[t]) continue;
    if (height[t] < lo) lo = height[t];
    if (height[t] > hiRange) hiRange = height[t];
  }

  dilate(normal, height, coverage, size, options.padding ?? 4);
  return {
    size,
    normal,
    height,
    coverage,
    heightRange: covered ? [lo, hiRange] : [0, 0],
    covered,
  };
}

/**
 * 高さを 8 ビットのグレーへ（書き出し用）。`range` を渡すと、そこを 0〜255 に割り当てる。
 * 渡さなければ結果の min / max を使う。**平らなら 128**。
 */
export function heightToBytes(result: BakeResult, range?: [number, number]): Uint8Array {
  const [lo, hi] = range ?? result.heightRange;
  const span = Math.max(Math.abs(lo), Math.abs(hi));
  const out = new Uint8Array(result.size * result.size * 4);
  for (let t = 0; t < result.height.length; t++) {
    const v = span > 0 ? result.height[t] / span : 0;
    const g = Math.max(0, Math.min(255, Math.round((v * 0.5 + 0.5) * 255)));
    out[t * 4] = g;
    out[t * 4 + 1] = g;
    out[t * 4 + 2] = g;
    out[t * 4 + 3] = 255;
  }
  return out;
}
