/**
 * X 対称の頂点の対応表（`41` の T1）。
 *
 * 対称は前まで「鏡映した点でもう 1 回ブラシを当てる」だけだった（`33` の T4）。
 * 幾何としては対称だが、**2 回目は 1 回目が動かしたあとの面から法線と平面を取る**
 * ので、中心線の近くで左右がわずかにずれる。`39` で Standard が「範囲の法線 1 本」に
 * なってから、そのずれが実機で見えるようになった。
 *
 * ZBrush の Topological Symmetry と同じ考えで、**頂点ごとに鏡映の相手を持ち、
 * 押した側の座標を相手へ写す**。すると差は浮動小数の丸めだけになる。
 *
 * ここは core なので、控えの持ち方（段ごと、トポロジが変わったら捨てる）は
 * app 側（`app/levels.ts` の `mirrorMapOf`）の仕事。
 */

/** 頂点の鏡映の対応（`buildMirrorMap` の戻り値）。 */
export interface MirrorMap {
  /**
   * `mirror[v]` = v の鏡映の相手。**相手が居なければ -1**、
   * 中心線（|x| ≤ tol）の頂点は**自分自身**。
   *
   * 相手が居るなら必ず相手の相手が自分（`mirror[mirror[v]] === v`）。
   * 片側だけ密度が違う所は、対にならないので -1 になる。
   */
  mirror: Int32Array;
  /**
   * 表を作ったときの x の符号（+1 / −1 / 0 = 中心線）。
   *
   * **どちらが「押した側」かの判定に使う。** 座標そのものを見ると、
   * 彫って中心線を跨いだ頂点で符号が入れ替わってしまう。
   */
  side: Int8Array;
  /** 相手のある頂点の数（中心線を含む）。全部 0 なら対称に使えない。 */
  paired: number;
}

/** 境界箱の対角。筆の太さ（`levels.ts`）と対称の許容の両方が使う。 */
export function boundsDiagonal(positions: Float32Array): number {
  if (!positions.length) return 0;
  let minX = Infinity,
    minY = Infinity,
    minZ = Infinity,
    maxX = -Infinity,
    maxY = -Infinity,
    maxZ = -Infinity;
  for (let i = 0; i < positions.length; i += 3) {
    if (positions[i] < minX) minX = positions[i];
    if (positions[i] > maxX) maxX = positions[i];
    if (positions[i + 1] < minY) minY = positions[i + 1];
    if (positions[i + 1] > maxY) maxY = positions[i + 1];
    if (positions[i + 2] < minZ) minZ = positions[i + 2];
    if (positions[i + 2] > maxZ) maxZ = positions[i + 2];
  }
  return Math.hypot(maxX - minX, maxY - minY, maxZ - minZ);
}

/** 格子番号を 1 つの数へ畳む。三つ組が近ければ近いほど散る、ふつうの整数ハッシュ。 */
function cellHash(qx: number, qy: number, qz: number): number {
  return (Math.imul(qx, 73856093) ^ Math.imul(qy, 19349663) ^ Math.imul(qz, 83492791)) >>> 0;
}

/**
 * 鏡映の対応表を作る。O(頂点数)。
 *
 * **文字列のキーと `Map` は使わない。** `tools/softSelect.ts` の `mirrorPairs` は
 * 座標を `toFixed(3)` の文字列にして `Map` に入れているが、25 万頂点では
 * 数百 ms かかるうえヒープが太る。ここは整数の格子ハッシュを CSR（先頭表 + 中身）に
 * 並べて引く。
 *
 * 格子の目は `tol`。鏡映の相手は各軸で `tol` 以内に居るので、**同じ格子か
 * 隣の格子**に必ず居る。ふつうは同じ格子で当たるので、外れたときだけ隣の 26 個を見る。
 *
 * @param tol 同じ点とみなす距離。境界箱の対角 × 1e-4 くらい。
 */
export function buildMirrorMap(positions: Float32Array, vertexCount: number, tol: number): MirrorMap {
  const mirror = new Int32Array(vertexCount).fill(-1);
  const side = new Int8Array(vertexCount);
  if (vertexCount <= 0 || !(tol > 0)) return { mirror, side, paired: 0 };

  const inv = 1 / tol;
  // 格子番号。x は**絶対値**で取る（鏡映の相手と同じ格子に来るように）
  const qx = new Int32Array(vertexCount);
  const qy = new Int32Array(vertexCount);
  const qz = new Int32Array(vertexCount);
  for (let v = 0; v < vertexCount; v++) {
    const x = positions[v * 3];
    qx[v] = Math.round(Math.abs(x) * inv);
    qy[v] = Math.round(positions[v * 3 + 1] * inv);
    qz[v] = Math.round(positions[v * 3 + 2] * inv);
    side[v] = Math.abs(x) <= tol ? 0 : x > 0 ? 1 : -1;
  }

  // バケットの数は頂点数の 2 倍以上の 2 のべき乗（衝突を減らす）
  let buckets = 1;
  while (buckets < vertexCount * 2) buckets *= 2;
  const mask = buckets - 1;
  const heads = new Int32Array(buckets + 1);
  const slot = new Int32Array(vertexCount);
  for (let v = 0; v < vertexCount; v++) {
    slot[v] = cellHash(qx[v], qy[v], qz[v]) & mask;
    heads[slot[v] + 1]++;
  }
  for (let b = 0; b < buckets; b++) heads[b + 1] += heads[b];
  const items = new Int32Array(vertexCount);
  const cursor = Int32Array.from(heads.subarray(0, buckets));
  for (let v = 0; v < vertexCount; v++) items[cursor[slot[v]]++] = v;

  /**
   * v と同じ側で v と**重なっている**頂点のうち、番号が v より小さいものの数。
   *
   * 押し出し（距離 0）のあとは元の頂点と先端が同じ場所に重なる。相手を「最初に
   * 見つかった 1 つ」にすると、両側の元どうしが組になって先端が余る（`47` の T3）。
   * 重なりは**番号の順で k 番目どうし**を組にする。
   */
  const rankOf = (v: number): number => {
    const x = positions[v * 3],
      y = positions[v * 3 + 1],
      z = positions[v * 3 + 2];
    const bucket = slot[v];
    let rank = 0;
    for (let i = heads[bucket]; i < heads[bucket + 1]; i++) {
      const u = items[i];
      if (u >= v || side[u] !== side[v]) continue;
      if (Math.abs(positions[u * 3] - x) > tol) continue;
      if (Math.abs(positions[u * 3 + 1] - y) > tol) continue;
      if (Math.abs(positions[u * 3 + 2] - z) > tol) continue;
      rank++;
    }
    return rank;
  };

  /** そのバケットの中から、v の鏡映の相手（重なりの中では `skip` 番目）を探す。無ければ -1。 */
  const findIn = (bucket: number, v: number, skip: number): number => {
    const x = positions[v * 3],
      y = positions[v * 3 + 1],
      z = positions[v * 3 + 2];
    const wantSide = side[v];
    let seen = 0;
    for (let i = heads[bucket]; i < heads[bucket + 1]; i++) {
      const u = items[i];
      if (u === v) continue;
      // 中心線の頂点は自分自身が相手。ここへは来ない
      if (side[u] !== -wantSide) continue;
      if (Math.abs(positions[u * 3] + x) > tol) continue;
      if (Math.abs(positions[u * 3 + 1] - y) > tol) continue;
      if (Math.abs(positions[u * 3 + 2] - z) > tol) continue;
      if (seen++ === skip) return u;
    }
    return -1;
  };

  let paired = 0;
  for (let v = 0; v < vertexCount; v++) {
    if (side[v] === 0) {
      mirror[v] = v;
      paired++;
      continue;
    }
    const rank = rankOf(v);
    let m = findIn(slot[v], v, rank);
    if (m < 0) {
      // 格子の境目をまたいだ。隣の 26 個を見る
      outer: for (let dx = -1; dx <= 1; dx++) {
        for (let dy = -1; dy <= 1; dy++) {
          for (let dz = -1; dz <= 1; dz++) {
            if (dx === 0 && dy === 0 && dz === 0) continue;
            const b = cellHash(qx[v] + dx, qy[v] + dy, qz[v] + dz) & mask;
            m = findIn(b, v, rank);
            if (m >= 0) break outer;
          }
        }
      }
    }
    if (m >= 0) mirror[v] = m;
  }

  // **相手の相手が自分でなければ対にしない。** 片側だけ密度が違う所で、
  // 1 つの頂点に 2 つがぶら下がると、写した結果が行ったり来たりする
  for (let v = 0; v < vertexCount; v++) {
    const m = mirror[v];
    if (m < 0 || m === v) continue;
    if (mirror[m] !== v) {
      mirror[v] = -1;
      continue;
    }
    paired++;
  }
  return { mirror, side, paired };
}
