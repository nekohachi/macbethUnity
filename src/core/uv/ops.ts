/**
 * UV の整え（`15` の 6.3、`16` の C3）。
 *
 * どれも **UV 空間の純粋な関数**。渡した座標をその場で書き換えるだけで、
 * メッシュもレシピも触らない。差分として記録するのは app 側の仕事。
 *
 * 参考にしたのは Maya の UV エディタと AriUV 系 MEL の**考え方**（`01`）。
 */

/** UV の並び。1 点あたり 2 つ（u, v）。 */
export type UvArray = Float32Array | Float64Array;

/** 選んだ点の U を 1 本にそろえる。where は平均 / 最小 / 最大。 */
export function alignU(uv: UvArray, points: Iterable<number>, where: "center" | "min" | "max" = "center"): void {
  align(uv, points, 0, where);
}

/** 選んだ点の V を 1 本にそろえる。 */
export function alignV(uv: UvArray, points: Iterable<number>, where: "center" | "min" | "max" = "center"): void {
  align(uv, points, 1, where);
}

function align(uv: UvArray, points: Iterable<number>, axis: 0 | 1, where: "center" | "min" | "max"): void {
  const list = [...points];
  if (list.length < 2) return;
  let sum = 0;
  let min = Infinity;
  let max = -Infinity;
  for (const v of list) {
    const value = uv[v * 2 + axis];
    sum += value;
    min = Math.min(min, value);
    max = Math.max(max, value);
  }
  const goal = where === "min" ? min : where === "max" ? max : sum / list.length;
  for (const v of list) uv[v * 2 + axis] = goal;
}

/**
 * 選んだ点を 1 本の直線に載せる（AriUVRatio の考え方の前半）。
 *
 * 最小二乗で主軸を出し、その軸へ落とす。**並び順は変えない** —
 * 落とす前後で点どうしの順序が入れ替わらないので、辺が交差しない。
 */
export function straightenPoints(uv: UvArray, points: Iterable<number>): void {
  const list = [...points];
  if (list.length < 3) return;
  let cu = 0;
  let cv = 0;
  for (const v of list) {
    cu += uv[v * 2];
    cv += uv[v * 2 + 1];
  }
  cu /= list.length;
  cv /= list.length;

  // 主軸（共分散行列の大きいほうの固有ベクトル）
  let sxx = 0;
  let sxy = 0;
  let syy = 0;
  for (const v of list) {
    const x = uv[v * 2] - cu;
    const y = uv[v * 2 + 1] - cv;
    sxx += x * x;
    sxy += x * y;
    syy += y * y;
  }
  const theta = 0.5 * Math.atan2(2 * sxy, sxx - syy);
  const ax = Math.cos(theta);
  const ay = Math.sin(theta);

  for (const v of list) {
    const x = uv[v * 2] - cu;
    const y = uv[v * 2 + 1] - cv;
    const t = x * ax + y * ay;
    uv[v * 2] = cu + ax * t;
    uv[v * 2 + 1] = cv + ay * t;
  }
}

/**
 * 島の境界を軸に沿わせる（Maya の Straighten UV Border）。
 *
 * 境界の点を順にたどり、辺の向きが U 軸と V 軸のどちらに近いかで振り分けて、
 * 同じ向きが続くひとまとまりを直線にそろえる。
 */
export function straightenBorder(uv: UvArray, loop: number[]): void {
  if (loop.length < 4) return;
  // 辺ごとに、横向きか縦向きかを決める
  const horizontal: boolean[] = [];
  for (let i = 0; i < loop.length; i++) {
    const a = loop[i];
    const b = loop[(i + 1) % loop.length];
    horizontal.push(Math.abs(uv[b * 2] - uv[a * 2]) >= Math.abs(uv[b * 2 + 1] - uv[a * 2 + 1]));
  }
  // 同じ向きが続くまとまりごとに、平均へそろえる
  let start = 0;
  while (start < loop.length) {
    let end = start;
    while (end + 1 < loop.length && horizontal[end + 1] === horizontal[start]) end++;
    const run: number[] = [];
    for (let i = start; i <= end + 1 && i < loop.length + 1; i++) run.push(loop[i % loop.length]);
    if (run.length >= 2) {
      if (horizontal[start]) align(uv, run, 1, "center");
      else align(uv, run, 0, "center");
    }
    start = end + 1;
  }
}

/**
 * 四角形の帯を格子にそろえる（AriUVGridding の考え方）。
 *
 * `rows` は「帯の並び」。行ごとに V を、列ごとに U を等間隔に置き直す。
 * 行の長さが揃っていなくても、その行の中で等間隔にする。
 */
export function gridding(uv: UvArray, rows: number[][]): void {
  if (rows.length < 2) return;
  // 全体の境界箱に収める
  let minU = Infinity;
  let minV = Infinity;
  let maxU = -Infinity;
  let maxV = -Infinity;
  for (const row of rows) {
    for (const v of row) {
      minU = Math.min(minU, uv[v * 2]);
      maxU = Math.max(maxU, uv[v * 2]);
      minV = Math.min(minV, uv[v * 2 + 1]);
      maxV = Math.max(maxV, uv[v * 2 + 1]);
    }
  }
  if (!Number.isFinite(minU)) return;
  const height = rows.length - 1;
  for (let r = 0; r < rows.length; r++) {
    const row = rows[r];
    const v = height > 0 ? minV + ((maxV - minV) * r) / height : minV;
    const width = row.length - 1;
    for (let c = 0; c < row.length; c++) {
      const u = width > 0 ? minU + ((maxU - minU) * c) / width : minU;
      uv[row[c] * 2] = u;
      uv[row[c] * 2 + 1] = v;
    }
  }
}

/** 選んだ点を U で反転する（中心はその点たちの境界箱）。 */
export function flipU(uv: UvArray, points: Iterable<number>): void {
  flip(uv, points, 0);
}

/** 選んだ点を V で反転する。 */
export function flipV(uv: UvArray, points: Iterable<number>): void {
  flip(uv, points, 1);
}

function flip(uv: UvArray, points: Iterable<number>, axis: 0 | 1): void {
  const list = [...points];
  if (!list.length) return;
  let min = Infinity;
  let max = -Infinity;
  for (const v of list) {
    min = Math.min(min, uv[v * 2 + axis]);
    max = Math.max(max, uv[v * 2 + axis]);
  }
  const center = (min + max) / 2;
  for (const v of list) uv[v * 2 + axis] = center * 2 - uv[v * 2 + axis];
}

/** 選んだ点を 90° 回す（中心はその点たちの境界箱）。 */
export function rotate90(uv: UvArray, points: Iterable<number>, turns = 1): void {
  const list = [...points];
  if (!list.length) return;
  let minU = Infinity;
  let minV = Infinity;
  let maxU = -Infinity;
  let maxV = -Infinity;
  for (const v of list) {
    minU = Math.min(minU, uv[v * 2]);
    maxU = Math.max(maxU, uv[v * 2]);
    minV = Math.min(minV, uv[v * 2 + 1]);
    maxV = Math.max(maxV, uv[v * 2 + 1]);
  }
  const cu = (minU + maxU) / 2;
  const cv = (minV + maxV) / 2;
  const n = ((turns % 4) + 4) % 4;
  for (let i = 0; i < n; i++) {
    for (const v of list) {
      const x = uv[v * 2] - cu;
      const y = uv[v * 2 + 1] - cv;
      uv[v * 2] = cu - y;
      uv[v * 2 + 1] = cv + x;
    }
  }
}

/**
 * 近い UV 点をひとまとめにする（Maya の Merge UVs）。
 * 距離が `distance` 以内の組を平均の位置へ寄せる。戻り値はまとめた数。
 */
export function mergeUvs(uv: UvArray, points: Iterable<number>, distance: number): number {
  const list = [...points].sort((a, b) => a - b);
  const used = new Set<number>();
  let merged = 0;
  for (let i = 0; i < list.length; i++) {
    const a = list[i];
    if (used.has(a)) continue;
    const group = [a];
    for (let j = i + 1; j < list.length; j++) {
      const b = list[j];
      if (used.has(b)) continue;
      const d = Math.hypot(uv[a * 2] - uv[b * 2], uv[a * 2 + 1] - uv[b * 2 + 1]);
      if (d <= distance) {
        group.push(b);
        used.add(b);
      }
    }
    if (group.length < 2) continue;
    let cu = 0;
    let cv = 0;
    for (const v of group) {
      cu += uv[v * 2];
      cv += uv[v * 2 + 1];
    }
    cu /= group.length;
    cv /= group.length;
    for (const v of group) {
      uv[v * 2] = cu;
      uv[v * 2 + 1] = cv;
    }
    merged += group.length - 1;
  }
  return merged;
}

/**
 * 対称 X の相手へ UV を写す（Maya の Symmetrize）。
 *
 * `pairs` は「元 → 相手」の UV 点の組。相手の UV を、対称軸 `axis`（既定は
 * 島の中央）で鏡映した位置に置く。
 */
export function symmetrizeUv(uv: UvArray, pairs: Array<[number, number]>, axis?: number): void {
  if (!pairs.length) return;
  let center = axis;
  if (center === undefined) {
    let sum = 0;
    let count = 0;
    for (const [a, b] of pairs) {
      sum += uv[a * 2] + uv[b * 2];
      count += 2;
    }
    center = count ? sum / count : 0;
  }
  for (const [a, b] of pairs) {
    uv[b * 2] = center * 2 - uv[a * 2];
    uv[b * 2 + 1] = uv[a * 2 + 1];
  }
}

/** 相似変換（移動 + 回転 + 一様スケール）。 */
export interface Similarity {
  du: number;
  dv: number;
  /** ラジアン。 */
  angle: number;
  scale: number;
}

/**
 * 2 点の対応から相似変換を出す（`20` の T6 の Move and Sew）。
 *
 * `a0 → b0`、`a1 → b1` に重なる変換。2 点なら一意に決まる
 * （Procrustes の 2 点版。回転と一様スケールは複素数の割り算 1 回で出る）。
 */
export function similarityFrom2(
  a0: [number, number],
  a1: [number, number],
  b0: [number, number],
  b1: [number, number],
): Similarity {
  const ax = a1[0] - a0[0];
  const ay = a1[1] - a0[1];
  const bx = b1[0] - b0[0];
  const by = b1[1] - b0[1];
  const len2 = ax * ax + ay * ay;
  if (len2 < 1e-18) return { du: b0[0] - a0[0], dv: b0[1] - a0[1], angle: 0, scale: 1 };
  // (bx + i·by) / (ax + i·ay)
  const rx = (bx * ax + by * ay) / len2;
  const ry = (by * ax - bx * ay) / len2;
  const scale = Math.hypot(rx, ry);
  const angle = Math.atan2(ry, rx);
  // a0 を b0 へ運ぶ平行移動は、回転と拡大のあとで決まる
  const moved = applySimilarity(a0, a0, { du: 0, dv: 0, angle, scale });
  return { du: b0[0] - moved[0], dv: b0[1] - moved[1], angle, scale };
}

/** 点 `p` を、基点 `origin` のまわりで回して拡大し、平行移動する。 */
export function applySimilarity(
  p: [number, number],
  origin: [number, number],
  t: Similarity,
): [number, number] {
  const x = p[0] - origin[0];
  const y = p[1] - origin[1];
  const cos = Math.cos(t.angle) * t.scale;
  const sin = Math.sin(t.angle) * t.scale;
  return [origin[0] + x * cos - y * sin + t.du, origin[1] + x * sin + y * cos + t.dv];
}
