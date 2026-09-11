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
import { buildBvh, occludedBvh, raycastBvh } from "./bvh.js";

/**
 * 焼ける絵（`46`）。**頼まれた絵だけ作る。**
 *
 * 法線と高さは光線が要らないので既定。曲率・位置・ID も光線は要らない。
 * AO と 厚みだけ BVH へ光線を飛ばす（`46` の T2）。
 */
export type BakeMap = "normal" | "height" | "curvature" | "position" | "id" | "ao" | "thickness";

/** 升目の 1 辺（`46` の T3）。2K なら 8 × 8 = 64 枚。 */
export const BAKE_TILE = 256;

export interface BakeOptions {
  /** 1 辺のテクセル数。1024 / 2048 / 4096。 */
  size: number;
  /** 島の外へ色を伸ばす幅（テクセル）。0 で伸ばさない。 */
  padding?: number;
  uvSet?: string;
  /** 焼く絵。省くと法線と高さだけ（`44` と同じ重さ）。 */
  maps?: readonly BakeMap[];
  /** AO と 厚みの本数（`46` の T2）。既定 8。 */
  aoSamples?: number;
  /**
   * 焼き直す升目（`46` の T3）。升目ごとに 0 / 1。省くと全部。
   * 立っていない升目にかかる面は**なめずに飛ばす**ので、そのぶん速い。
   */
  only?: Uint8Array;
  /** 前の結果に上書きする（差分焼き）。大きさと絵の顔ぶれが同じでなければ無視する。 */
  into?: BakeResult;
}

export interface BakeResult {
  size: number;
  /** 焼いた絵の顔ぶれ。 */
  maps: BakeMap[];
  /** 接空間法線（RGBA8。+Z が外向き、A は 255）。 */
  normal: Uint8Array;
  /** 高さ（ローの法線方向の差。ワールド単位）。 */
  height: Float32Array;
  /** 曲率（1 テクセル 1 バイト。128 が平ら、上が尾根）。 */
  curvature: Uint8Array | null;
  /** AO（1 バイト。**白 = 開けている**）。 */
  ao: Uint8Array | null;
  /** 厚み（1 バイト。**白 = 薄い**）。 */
  thickness: Uint8Array | null;
  /** 位置（RGBA8。ローの境界箱で正規化）。 */
  position: Uint8Array | null;
  /** ポリグループ / マテリアルの色分け（RGBA8）。 */
  id: Uint8Array | null;
  /** 島の中なら 1、埋めたぶんは 2、外は 0。 */
  coverage: Uint8Array;
  /** 高さの min / max。書き出すときの正規化に使う。 */
  heightRange: [number, number];
  /** 島が覆ったテクセルの数（埋めたぶんは含まない）。 */
  covered: number;
}

/** 焼いた絵のうち 1 バイトのもの（グレー）。書き出すときに広げる。 */
export const GRAY_MAPS: readonly BakeMap[] = ["curvature", "ao", "thickness"];

/**
 * 番号 → 色（ID マップ）。**黄金比で色相を回す**ので、
 * 隣り合う番号でも色が離れ、同じ番号なら毎回同じ色になる。
 */
export function idColor(id: number): [number, number, number] {
  if (id === 0) return [40, 40, 40];
  const h = (id * 0.618033988749895) % 1;
  const s = 0.65;
  const v = 0.95;
  const i = Math.floor(h * 6);
  const f = h * 6 - i;
  const p = v * (1 - s);
  const q = v * (1 - f * s);
  const t = v * (1 - (1 - f) * s);
  const rgb = [
    [v, t, p],
    [q, v, p],
    [p, v, t],
    [p, q, v],
    [t, p, v],
    [v, p, q],
  ][i % 6];
  return [Math.round(rgb[0] * 255), Math.round(rgb[1] * 255), Math.round(rgb[2] * 255)];
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
      // **法線に直交させてから正規化する**（グラム・シュミット。`48` の T2）。
      // MikkTSpace と Substance / Blender はこの基底を前提にしているので、
      // ここを揃えておかないと `.glb` へ接線を渡しても向こうで組み直されてずれる
      const d = tangent[v * 3] * normal[v * 3] + tangent[v * 3 + 1] * normal[v * 3 + 1] + tangent[v * 3 + 2] * normal[v * 3 + 2];
      let ox = tangent[v * 3] - normal[v * 3] * d;
      let oy = tangent[v * 3 + 1] - normal[v * 3 + 1] * d;
      let oz = tangent[v * 3 + 2] - normal[v * 3 + 2] * d;
      let ol = Math.hypot(ox, oy, oz);
      if (ol < 1e-12) {
        // 接線が法線と平行だった。法線に直交する軸を機械的に選ぶ
        const ax = Math.abs(normal[v * 3]) < 0.9 ? 1 : 0;
        ox = ax ? 0 : 1;
        oy = ax ? normal[v * 3 + 2] : 0;
        oz = ax ? -normal[v * 3 + 1] : 0;
        ol = Math.hypot(ox, oy, oz) || 1;
      }
      tangent[v * 3] = ox / ol;
      tangent[v * 3 + 1] = oy / ol;
      tangent[v * 3 + 2] = oz / ol;
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

/** 焼くときの接空間（`48` の T2）。glTF の書き出しが**同じ基底**を使うための口。 */
export type BakeFrames = Frames;

/**
 * 焼くときと同じ法線・接線を頂点ごとに作る（`48` の T2）。
 *
 * 法線マップは接空間なので、書き出し先で別の接線を組まれると陰影がずれる。
 * `.glb` に TANGENT を入れるときはここを通す。
 */
export function bakeFrames(mesh: Mesh, uv: Float32Array): BakeFrames {
  return buildFrames(mesh, uv);
}

/** ラスタライズで 1 テクセルに書き込むもの。`face` は元の面の番号（ID マップに使う）。 */
type Sample = (
  texel: number,
  a: number,
  b: number,
  c: number,
  wa: number,
  wb: number,
  wc: number,
  face: number,
) => void;

/**
 * UV の三角形をテクセルへ落とす。**テクセルの中心**で判定する。
 *
 * `size` の升目の (0,0) は UV (0,0)、v は下から上へ（UV の決まり）。
 *
 * `only` を渡すと、**三角形の外接する升目が 1 つも立っていなければ飛ばす**
 * （`46` の T3）。テクセルごとに見るだけでは、面をなめる時間が減らない。
 */
function rasterize(mesh: Mesh, uv: Float32Array, size: number, write: Sample, only?: Uint8Array): void {
  const tiles = only ? Math.max(1, Math.ceil(size / BAKE_TILE)) : 0;
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
      if (only && !touchesTile(only, tiles, x0, y0, x1, y1)) continue;
      for (let y = y0; y <= y1; y++) {
        const py = y + 0.5;
        for (let x = x0; x <= x1; x++) {
          const px = x + 0.5;
          const wa = ((bx - px) * (cy - py) - (cx - px) * (by - py)) * inv;
          const wb = ((cx - px) * (ay - py) - (ax - px) * (cy - py)) * inv;
          const wc = 1 - wa - wb;
          if (wa < 0 || wb < 0 || wc < 0) continue;
          write(y * size + x, mesh.faceCorners[ca], mesh.faceCorners[cb], mesh.faceCorners[cc], wa, wb, wc, f);
        }
      }
    }
  }
}

/** 外接する升目のどれかが立っているか（`46` の T3）。 */
function touchesTile(only: Uint8Array, tiles: number, x0: number, y0: number, x1: number, y1: number): boolean {
  const tx0 = Math.floor(x0 / BAKE_TILE);
  const tx1 = Math.floor(x1 / BAKE_TILE);
  const ty0 = Math.floor(y0 / BAKE_TILE);
  const ty1 = Math.floor(y1 / BAKE_TILE);
  for (let ty = ty0; ty <= ty1; ty++) {
    for (let tx = tx0; tx <= tx1; tx++) {
      if (only[ty * tiles + tx]) return true;
    }
  }
  return false;
}

/**
 * 島の外へ色を伸ばす（`44` の T1、`46` の T1）。伸ばしたテクセルは `coverage` が 2。
 *
 * **焼いた絵ぜんぶを一緒に伸ばす。** 1 枚だけ伸ばすと、縁でその絵だけ色が変わる。
 */
function dilate(
  channels: Array<{ data: Uint8Array; stride: number }>,
  height: Float32Array,
  coverage: Uint8Array,
  size: number,
  rounds: number,
): void {
  if (rounds <= 0) return;
  const offsets = [-1, 1, -size, size, -size - 1, -size + 1, size - 1, size + 1];
  const sums = new Float64Array(channels.reduce((n, g) => n + g.stride, 0));
  for (let r = 0; r < rounds; r++) {
    const grown: number[] = [];
    const values: number[] = [];
    for (let t = 0; t < coverage.length; t++) {
      if (coverage[t]) continue;
      const x = t % size;
      let count = 0;
      let h = 0;
      sums.fill(0);
      for (const off of offsets) {
        const u = t + off;
        if (u < 0 || u >= coverage.length || !coverage[u]) continue;
        // 横に回り込まない（左端と右端はつながっていない）
        const ux = u % size;
        if (Math.abs(ux - x) > 1) continue;
        let at = 0;
        for (const g of channels) {
          for (let k = 0; k < g.stride; k++) sums[at + k] += g.data[u * g.stride + k];
          at += g.stride;
        }
        h += height[u];
        count++;
      }
      if (!count) continue;
      grown.push(t);
      for (let k = 0; k < sums.length; k++) values.push(sums[k] / count);
      height[t] = h / count;
    }
    for (let i = 0; i < grown.length; i++) {
      const t = grown[i];
      let at = i * sums.length;
      for (const g of channels) {
        for (let k = 0; k < g.stride; k++) g.data[t * g.stride + k] = values[at + k] | 0;
        at += g.stride;
      }
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

  const maps: BakeMap[] = [...(options.maps ?? ["normal", "height"])];
  if (!maps.includes("normal")) maps.push("normal");
  if (!maps.includes("height")) maps.push("height");
  const want = (m: BakeMap) => maps.includes(m);

  // 差分焼き（`46` の T3）。前の結果に上書きできるのは、大きさと顔ぶれが同じときだけ
  const into =
    options.into &&
    options.into.size === size &&
    maps.length === options.into.maps.length &&
    maps.every((m) => options.into!.maps.includes(m))
      ? options.into
      : null;
  const only = into ? options.only : undefined;

  const frames = buildFrames(low, lowUv);
  const highFrames = buildFrames(high, highUv);
  const highNormal = highFrames.normal;
  // ハイの頂点ごとの量（曲率・AO・厚み）。**光線はここで飛ばす**（`46` の 1）
  const highCurv = want("curvature") ? vertexCurvature(high, highNormal) : null;
  const rays =
    want("ao") || want("thickness")
      ? vertexRays(high, highNormal, options.aoSamples ?? 8, want("ao"), want("thickness"))
      : null;
  // 位置はローの箱で正規化する（ハイで測ると、彫るたびに全部の色が変わる）
  const box = want("position") ? boundsOf(low.positions) : null;
  const groups = want("id") ? (low.polygroup.some((g) => g !== 0) ? low.polygroup : low.materialId) : null;

  // ローのぶん
  const pLow = new Float32Array(texels * 3);
  const nLow = new Float32Array(texels * 3);
  const tLow = new Float32Array(texels * 3);
  const sLow = new Float32Array(texels);
  const coverage = into && only ? into.coverage : new Uint8Array(texels);
  const curvature = want("curvature") ? (into?.curvature ?? new Uint8Array(texels)) : null;
  const ao = want("ao") ? (into?.ao ?? new Uint8Array(texels)) : null;
  const thickness = want("thickness") ? (into?.thickness ?? new Uint8Array(texels)) : null;
  const position = want("position") ? (into?.position ?? new Uint8Array(texels * 4)) : null;
  const id = want("id") ? (into?.id ?? new Uint8Array(texels * 4)) : null;
  const lp = low.positions;
  rasterize(
    low,
    lowUv,
    size,
    (t, a, b, c, wa, wb, wc, face) => {
    coverage[t] = 1;
    if (id && groups) {
      const [r, g, b2] = idColor(groups[face]);
      id[t * 4] = r;
      id[t * 4 + 1] = g;
      id[t * 4 + 2] = b2;
      id[t * 4 + 3] = 255;
    }
    sLow[t] = frames.sign[a] * wa + frames.sign[b] * wb + frames.sign[c] * wc;
    for (let k = 0; k < 3; k++) {
      pLow[t * 3 + k] = lp[a * 3 + k] * wa + lp[b * 3 + k] * wb + lp[c * 3 + k] * wc;
      nLow[t * 3 + k] = frames.normal[a * 3 + k] * wa + frames.normal[b * 3 + k] * wb + frames.normal[c * 3 + k] * wc;
      tLow[t * 3 + k] = frames.tangent[a * 3 + k] * wa + frames.tangent[b * 3 + k] * wb + frames.tangent[c * 3 + k] * wc;
    }
    },
    only,
  );

  // ローの接空間を、テクセルごとにここで直交化しておく（補間で崩れているため）。
  // **ハイのぶんを溜めない**（2K で 100MB 変わる）。ハイは 1 回なめて、その場で書く
  const normal = into?.normal ?? new Uint8Array(texels * 4);
  const height = into?.height ?? new Float32Array(texels);
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
    if (curvature) curvature[t] = 128;
    if (ao) ao[t] = 255;
    if (thickness) thickness[t] = 0;
  }

  // ハイのぶん。テクセルごとに、その場で接空間へ落として書く
  const hp = high.positions;
  rasterize(
    high,
    highUv,
    size,
    (t, a, b, c, wa, wb, wc) => {
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

    const mix = (src: Float32Array) => src[a] * wa + src[b] * wb + src[c] * wc;
    if (curvature && highCurv) curvature[t] = byte(mix(highCurv) * 0.5 + 0.5);
    if (ao && rays?.ao) ao[t] = byte(mix(rays.ao));
    if (thickness && rays?.thickness) thickness[t] = byte(mix(rays.thickness));
    if (position && box) {
      position[t * 4] = byte((px - box.min[0]) / box.span);
      position[t * 4 + 1] = byte((py - box.min[1]) / box.span);
      position[t * 4 + 2] = byte((pz - box.min[2]) / box.span);
      position[t * 4 + 3] = 255;
    }
    },
    only,
  );

  let lo = Infinity;
  let hiRange = -Infinity;
  for (let t = 0; t < texels; t++) {
    if (!coverage[t]) continue;
    if (height[t] < lo) lo = height[t];
    if (height[t] > hiRange) hiRange = height[t];
  }

  const gray: Array<{ data: Uint8Array; stride: number }> = [{ data: normal, stride: 4 }];
  if (curvature) gray.push({ data: curvature, stride: 1 });
  if (ao) gray.push({ data: ao, stride: 1 });
  if (thickness) gray.push({ data: thickness, stride: 1 });
  if (position) gray.push({ data: position, stride: 4 });
  if (id) gray.push({ data: id, stride: 4 });
  dilate(gray, height, coverage, size, options.padding ?? 4);
  return {
    size,
    maps,
    normal,
    height,
    curvature,
    ao,
    thickness,
    position,
    id,
    coverage,
    heightRange: covered ? [lo, hiRange] : [0, 0],
    covered,
  };
}

/**
 * ハイの頂点ごとの曲率（`46` の T1）。**尾根で正、谷で負**。
 *
 * 隣の頂点が接平面のどちら側に居るかを、辺の長さで割って平均する。
 * `c = −Σ((p_u − p_v)·n_v / |p_u − p_v|) / 価数`。曲がっていなければ 0。
 *
 * 隣は**面の辺**からなめる（`Map` を作らない。25 万四角形で効く）。
 * 四角以上を扇で割った対角線は辺ではないので、コーナーの並びだけを見る。
 */
function vertexCurvature(mesh: Mesh, normals: Float32Array, gain = 4): Float32Array {
  const n = mesh.vertexCount;
  const acc = new Float32Array(n);
  const count = new Uint32Array(n);
  const p = mesh.positions;
  const add = (v: number, u: number) => {
    const dx = p[u * 3] - p[v * 3];
    const dy = p[u * 3 + 1] - p[v * 3 + 1];
    const dz = p[u * 3 + 2] - p[v * 3 + 2];
    const len = Math.hypot(dx, dy, dz);
    if (len < 1e-12) return;
    acc[v] += (dx * normals[v * 3] + dy * normals[v * 3 + 1] + dz * normals[v * 3 + 2]) / len;
    count[v]++;
  };
  for (let f = 0; f < mesh.faceCount; f++) {
    const s = mesh.faceOffsets[f];
    const size = mesh.faceOffsets[f + 1] - s;
    for (let i = 0; i < size; i++) {
      const a = mesh.faceCorners[s + i];
      const b = mesh.faceCorners[s + ((i + 1) % size)];
      add(a, b);
      add(b, a);
    }
  }
  const out = new Float32Array(n);
  for (let v = 0; v < n; v++) {
    // 面の数だけ二重に数えているが、平均なので割り算で消える
    out[v] = count[v] ? Math.max(-1, Math.min(1, (-acc[v] / count[v]) * gain)) : 0;
  }
  return out;
}

/**
 * ハイの頂点ごとの AO と 厚み（`46` の T2）。**光線はここだけ。**
 *
 * テクセルごとに飛ばすと 2K で 6700 万本になる。ハイの頂点は 23 万なので、
 * 頂点ごとなら 370 万本で済み、しかも**テクスチャの大きさに関係しない**。
 * AO も厚みもなめらかに変わる量で、ハイはテクセルより細かいので、絵は変わらない。
 *
 * 向きは**コサイン重みの半球**。Hammersley の列（乱数ではない）なので、
 * 同じ形なら毎回同じ絵になる。
 */
function vertexRays(
  mesh: Mesh,
  normals: Float32Array,
  samples: number,
  wantAo: boolean,
  wantThickness: boolean,
): { ao: Float32Array | null; thickness: Float32Array | null } {
  const n = mesh.vertexCount;
  const ao = wantAo ? new Float32Array(n) : null;
  const thickness = wantThickness ? new Float32Array(n) : null;
  const tris = mesh.triangulate();
  const bvh = buildBvh(mesh.positions, { tri: tris.tri });
  const diagonal = boundsOf(mesh.positions).diagonal;
  // **AO は近くだけ見る**（`46` の T2）。箱の対角の 15%。
  // 半分まで見ると、当たらない光線が木の大半をなめて 4 倍遅くなるうえ、
  // 「部屋の隅が暗い」ような大きな遮りまで拾ってしまう。
  // 彫った溝や皺を出すのが目的なので、Substance の Attenuation と同じで近くでよい
  const aoDist = diagonal * 0.15;
  // 厚みは**反対側まで届かないと測れない**ので、対角いっぱいまで見る。
  // 半分にすると、球のように厚いものが「当たらない = 厚い」で全部黒くなる
  const maxDist = diagonal;
  const eps = Math.max(diagonal * 1e-4, 1e-9);
  const count = Math.max(1, Math.floor(samples));

  // コサイン重みの半球（接空間）。全部の頂点で同じ列を使い回す
  const dirs = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    // Hammersley: 1 つ目は等間隔、2 つ目はビットを逆さに読む
    const u1 = (i + 0.5) / count;
    let bits = i;
    bits = ((bits << 16) | (bits >>> 16)) >>> 0;
    bits = (((bits & 0x55555555) << 1) | ((bits & 0xaaaaaaaa) >>> 1)) >>> 0;
    bits = (((bits & 0x33333333) << 2) | ((bits & 0xcccccccc) >>> 2)) >>> 0;
    bits = (((bits & 0x0f0f0f0f) << 4) | ((bits & 0xf0f0f0f0) >>> 4)) >>> 0;
    bits = (((bits & 0x00ff00ff) << 8) | ((bits & 0xff00ff00) >>> 8)) >>> 0;
    const u2 = bits * 2.3283064365386963e-10;
    const r = Math.sqrt(u1);
    const phi = 2 * Math.PI * u2;
    dirs[i * 3] = r * Math.cos(phi);
    dirs[i * 3 + 1] = r * Math.sin(phi);
    dirs[i * 3 + 2] = Math.sqrt(Math.max(0, 1 - u1));
  }

  const origin: [number, number, number] = [0, 0, 0];
  const dir: [number, number, number] = [0, 0, 0];
  for (let v = 0; v < n; v++) {
    const nx = normals[v * 3],
      ny = normals[v * 3 + 1],
      nz = normals[v * 3 + 2];
    // 法線に直交する軸を 2 本（接空間の向きは何でもよい。分布は回しても同じ）
    let tx = Math.abs(nx) < 0.9 ? 1 : 0,
      ty = Math.abs(nx) < 0.9 ? 0 : 1,
      tz = 0;
    const d = tx * nx + ty * ny + tz * nz;
    tx -= nx * d;
    ty -= ny * d;
    tz -= nz * d;
    const tl = Math.hypot(tx, ty, tz) || 1;
    tx /= tl;
    ty /= tl;
    tz /= tl;
    const bx = ny * tz - nz * ty;
    const by = nz * tx - nx * tz;
    const bz = nx * ty - ny * tx;

    let blocked = 0;
    let depth = 0;
    for (let i = 0; i < count; i++) {
      const sx = dirs[i * 3],
        sy = dirs[i * 3 + 1],
        sz = dirs[i * 3 + 2];
      if (ao) {
        dir[0] = tx * sx + bx * sy + nx * sz;
        dir[1] = ty * sx + by * sy + ny * sz;
        dir[2] = tz * sx + bz * sy + nz * sz;
        origin[0] = mesh.positions[v * 3] + nx * eps;
        origin[1] = mesh.positions[v * 3 + 1] + ny * eps;
        origin[2] = mesh.positions[v * 3 + 2] + nz * eps;
        // **遠くの当たりは数えない**。数えると閉じた形が真っ黒になる。
        // 「いちばん手前」は要らないので、当たった時点で止める（`occludedBvh`）
        if (occludedBvh(bvh, mesh.positions, { tri: tris.tri }, origin, dir, aoDist)) blocked++;
      }
      if (thickness) {
        // 裏側へ。当たらなければ「厚い」（maxDist 扱い）
        dir[0] = -(tx * sx + bx * sy + nx * sz);
        dir[1] = -(ty * sx + by * sy + ny * sz);
        dir[2] = -(tz * sx + bz * sy + nz * sz);
        origin[0] = mesh.positions[v * 3] - nx * eps;
        origin[1] = mesh.positions[v * 3 + 1] - ny * eps;
        origin[2] = mesh.positions[v * 3 + 2] - nz * eps;
        // 厚みは距離が要るので、いちばん手前を探す（ただし `maxDist` で刈る）
        const hit = raycastBvh(bvh, mesh.positions, { tri: tris.tri }, origin, dir, maxDist);
        depth += hit ? hit.t : maxDist;
      }
    }
    if (ao) ao[v] = 1 - blocked / count;
    if (thickness) thickness[v] = 1 - depth / count / maxDist;
  }
  return { ao, thickness };
}

/** 0〜1 を 0〜255 へ。範囲の外は端で止める。 */
function byte(v: number): number {
  return Math.max(0, Math.min(255, Math.round(v * 255)));
}

/** 境界箱と、いちばん長い辺と対角（位置マップの正規化と、光線の届く距離に使う）。 */
function boundsOf(positions: Float32Array): {
  min: [number, number, number];
  span: number;
  diagonal: number;
} {
  const min: [number, number, number] = [Infinity, Infinity, Infinity];
  const max: [number, number, number] = [-Infinity, -Infinity, -Infinity];
  for (let i = 0; i < positions.length; i += 3) {
    for (let k = 0; k < 3; k++) {
      if (positions[i + k] < min[k]) min[k] = positions[i + k];
      if (positions[i + k] > max[k]) max[k] = positions[i + k];
    }
  }
  const span = Math.max(max[0] - min[0], max[1] - min[1], max[2] - min[2]) || 1;
  const diagonal = Math.hypot(max[0] - min[0], max[1] - min[1], max[2] - min[2]) || span;
  return { min, span, diagonal };
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
