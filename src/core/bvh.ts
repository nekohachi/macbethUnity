/**
 * 三角形の境界箱の木（BVH。`29` の B-T5）。
 *
 * ピッキングとベイクの光線に使う。今までは面のレイキャストが総当たり
 * （O(三角形)）で、頂点とエッジは毎フレーム全頂点を投影していた。
 * スカルプトの規模（100 万三角形）ではどちらも成り立たない。
 *
 * 作りは素朴に: **最長軸の中央値で 2 分**、葉は 8 三角形まで、深さの上限 32。
 * ノードは平坦な配列に持つ（オブジェクトを作らない = GC を動かさない）。
 *
 * ここは core なので Three.js を知らない。**呼び出し側がローカル空間に
 * 直してから渡す**（ワールドの行列は app 側の仕事）。wasm に出すときも
 * この形のまま移せる。
 */

/** 葉に入れる三角形の上限。 */
const LEAF = 8;
/** 木の深さの上限。これを越えたら分けずに葉にする。 */
const MAX_DEPTH = 32;

/**
 * 平坦な木。
 *
 * `bounds` は 1 ノードにつき 6 つ（minx, miny, minz, maxx, maxy, maxz）。
 * 内部ノードは `left` に左の子の番号（右は左 + 1 ではなく `right` に持つ）、
 * 葉は `start` と `count` で `order` の範囲を指す。
 */
export interface Bvh {
  bounds: Float32Array;
  /** 内部ノードなら左の子、葉なら −1。 */
  left: Int32Array;
  right: Int32Array;
  /** 葉の三角形の範囲（`order` の中の位置）。内部ノードは 0。 */
  start: Uint32Array;
  count: Uint32Array;
  /** 葉に並べ替えた三角形の番号。 */
  order: Uint32Array;
  /** 親のノード番号（根は −1）。一部だけ取り直すときに上へ辿る。 */
  parent: Int32Array;
  /** 三角形 → それが入っている葉のノード番号。 */
  triLeaf: Int32Array;
  nodes: number;
}

/** 三角形の並び。`Mesh.triangulate()` の `tri` をそのまま渡す。 */
export type Triangles = { tri: Uint32Array };

/** 三角形の重心（分ける軸の中央値を出すのに使う）。 */
function centroids(positions: Float32Array, tri: Uint32Array): Float32Array {
  const n = tri.length / 3;
  const c = new Float32Array(n * 3);
  for (let t = 0; t < n; t++) {
    const a = tri[t * 3] * 3;
    const b = tri[t * 3 + 1] * 3;
    const d = tri[t * 3 + 2] * 3;
    c[t * 3] = (positions[a] + positions[b] + positions[d]) / 3;
    c[t * 3 + 1] = (positions[a + 1] + positions[b + 1] + positions[d + 1]) / 3;
    c[t * 3 + 2] = (positions[a + 2] + positions[b + 2] + positions[d + 2]) / 3;
  }
  return c;
}

/** その範囲の三角形を包む箱を `bounds` の `node` 番目へ書く。 */
function fitBounds(
  bounds: Float32Array,
  node: number,
  positions: Float32Array,
  tri: Uint32Array,
  order: Uint32Array,
  start: number,
  count: number,
): void {
  let x0 = Infinity,
    y0 = Infinity,
    z0 = Infinity,
    x1 = -Infinity,
    y1 = -Infinity,
    z1 = -Infinity;
  for (let i = start; i < start + count; i++) {
    const t = order[i];
    for (let k = 0; k < 3; k++) {
      const p = tri[t * 3 + k] * 3;
      const x = positions[p],
        y = positions[p + 1],
        z = positions[p + 2];
      if (x < x0) x0 = x;
      if (y < y0) y0 = y;
      if (z < z0) z0 = z;
      if (x > x1) x1 = x;
      if (y > y1) y1 = y;
      if (z > z1) z1 = z;
    }
  }
  bounds[node * 6] = x0;
  bounds[node * 6 + 1] = y0;
  bounds[node * 6 + 2] = z0;
  bounds[node * 6 + 3] = x1;
  bounds[node * 6 + 4] = y1;
  bounds[node * 6 + 5] = z1;
}

/**
 * 木を作る。三角形が無ければ空の木（`nodes === 0`）を返す。
 * 100 万三角形で 1 秒前後（JS）。作り直すのはトポロジが変わったときだけ。
 */
export function buildBvh(positions: Float32Array, tris: Triangles): Bvh {
  const count = tris.tri.length / 3;
  const order = new Uint32Array(count);
  for (let i = 0; i < count; i++) order[i] = i;
  if (!count) {
    return {
      bounds: new Float32Array(0),
      left: new Int32Array(0),
      right: new Int32Array(0),
      start: new Uint32Array(0),
      count: new Uint32Array(0),
      order,
      parent: new Int32Array(0),
      triLeaf: new Int32Array(0),
      nodes: 0,
    };
  }

  // ノード数の上限は 2 × 葉の数。葉は最小 1 三角形なので 2 × 三角形数で足りる
  const cap = Math.max(1, 2 * Math.ceil(count / 1) + 1);
  const bounds = new Float32Array(cap * 6);
  const left = new Int32Array(cap).fill(-1);
  const right = new Int32Array(cap).fill(-1);
  const start = new Uint32Array(cap);
  const size = new Uint32Array(cap);
  const parent = new Int32Array(cap).fill(-1);
  const triLeaf = new Int32Array(count).fill(-1);
  const c = centroids(positions, tris.tri);
  let nodes = 0;

  /** 葉にする。三角形からその葉を引けるようにしておく。 */
  const makeLeaf = (node: number, from: number, n: number): number => {
    start[node] = from;
    size[node] = n;
    for (let i = from; i < from + n; i++) triLeaf[order[i]] = node;
    return node;
  };

  /** 範囲 [from, from + n) を 1 ノードにする。番号を返す。 */
  const build = (from: number, n: number, depth: number): number => {
    const node = nodes++;
    fitBounds(bounds, node, positions, tris.tri, order, from, n);
    if (n <= LEAF || depth >= MAX_DEPTH) return makeLeaf(node, from, n);
    // いちばん長い軸で分ける
    const ex = bounds[node * 6 + 3] - bounds[node * 6];
    const ey = bounds[node * 6 + 4] - bounds[node * 6 + 1];
    const ez = bounds[node * 6 + 5] - bounds[node * 6 + 2];
    const axis = ex >= ey && ex >= ez ? 0 : ey >= ez ? 1 : 2;
    const mid = from + (n >> 1);
    nthElement(order, from, from + n, mid, c, axis);
    // 全部が同じ位置にあると分けられない。そのときは葉にする
    if (mid === from || mid === from + n) return makeLeaf(node, from, n);
    left[node] = build(from, mid - from, depth + 1);
    right[node] = build(mid, from + n - mid, depth + 1);
    parent[left[node]] = node;
    parent[right[node]] = node;
    return node;
  };
  build(0, count, 0);

  return { bounds, left, right, start, count: size, order, parent, triLeaf, nodes };
}

/**
 * `order` の [from, to) を、`k` 番目が正しい位置に来るまで分ける（部分クイックソート）。
 * 全部を並べ替えるより速い。中央値で分けるのに使う。
 */
function nthElement(
  order: Uint32Array,
  from: number,
  to: number,
  k: number,
  centroid: Float32Array,
  axis: number,
): void {
  let lo = from;
  let hi = to - 1;
  const key = (i: number) => centroid[order[i] * 3 + axis];
  while (lo < hi) {
    // 3 つの中央を軸に選ぶ（すでに並んでいる入力で遅くならないように）
    const mid = (lo + hi) >> 1;
    const pivot = median3(key(lo), key(mid), key(hi));
    let i = lo;
    let j = hi;
    while (i <= j) {
      while (key(i) < pivot) i++;
      while (key(j) > pivot) j--;
      if (i <= j) {
        const tmp = order[i];
        order[i] = order[j];
        order[j] = tmp;
        i++;
        j--;
      }
    }
    if (k <= j) hi = j;
    else if (k >= i) lo = i;
    else return;
  }
}

function median3(a: number, b: number, c: number): number {
  return a < b ? (b < c ? b : a < c ? c : a) : b < c ? (a < c ? a : c) : b;
}

/**
 * 木の形はそのままに、境界箱だけ取り直す（`29` の B-T5）。
 * **座標だけ変わったとき**（ツイーク、スカルプトのストローク）に使う。
 * 作り直すより 10 倍以上速い。
 */
export function refitBvh(bvh: Bvh, positions: Float32Array, tris: Triangles): void {
  if (!bvh.nodes) return;
  // 子は必ず親より大きい番号なので、後ろから前へ 1 回なめれば足りる
  for (let node = bvh.nodes - 1; node >= 0; node--) {
    const l = bvh.left[node];
    if (l < 0) {
      fitBounds(bvh.bounds, node, positions, tris.tri, bvh.order, bvh.start[node], bvh.count[node]);
      continue;
    }
    const r = bvh.right[node];
    for (let k = 0; k < 3; k++) {
      bvh.bounds[node * 6 + k] = Math.min(bvh.bounds[l * 6 + k], bvh.bounds[r * 6 + k]);
      bvh.bounds[node * 6 + 3 + k] = Math.max(bvh.bounds[l * 6 + 3 + k], bvh.bounds[r * 6 + 3 + k]);
    }
  }
}

/**
 * 動いた三角形のぶんだけ取り直す（`29` の B-T6）。
 *
 * ドラッグやスカルプトのストロークで動くのは全体のごく一部なので、
 * 全部を取り直す（`refitBvh`）より桁で速い。触れた葉と、その先祖だけを直す。
 */
export function refitBvhPartial(
  bvh: Bvh,
  positions: Float32Array,
  tris: Triangles,
  triangles: Iterable<number>,
): void {
  if (!bvh.nodes) return;
  const dirty = new Set<number>();
  for (const t of triangles) {
    const leaf = bvh.triLeaf[t];
    if (leaf >= 0) dirty.add(leaf);
  }
  if (!dirty.size) return;
  // 葉を直してから、親を深い順に直す（子が先に済んでいる必要がある）
  const byDepth = new Map<number, Set<number>>();
  const depthOf = (node: number): number => {
    let d = 0;
    for (let n = node; bvh.parent[n] >= 0; n = bvh.parent[n]) d++;
    return d;
  };
  for (const leaf of dirty) {
    fitBounds(bvh.bounds, leaf, positions, tris.tri, bvh.order, bvh.start[leaf], bvh.count[leaf]);
    for (let n = bvh.parent[leaf]; n >= 0; n = bvh.parent[n]) {
      const d = depthOf(n);
      let set = byDepth.get(d);
      if (!set) byDepth.set(d, (set = new Set()));
      if (set.has(n)) break;
      set.add(n);
    }
  }
  const depths = [...byDepth.keys()].sort((a, b) => b - a);
  for (const d of depths) {
    for (const node of byDepth.get(d)!) {
      const l = bvh.left[node];
      const r = bvh.right[node];
      for (let k = 0; k < 3; k++) {
        bvh.bounds[node * 6 + k] = Math.min(bvh.bounds[l * 6 + k], bvh.bounds[r * 6 + k]);
        bvh.bounds[node * 6 + 3 + k] = Math.max(bvh.bounds[l * 6 + 3 + k], bvh.bounds[r * 6 + 3 + k]);
      }
    }
  }
}

export interface RayHit {
  /** 光線の始点からの距離。 */
  t: number;
  /** 当たった三角形の番号（`tri` の中の位置）。 */
  tri: number;
}

/** 箱と光線の交差（スラブ法）。当たらなければ Infinity。 */
function hitBox(bounds: Float32Array, node: number, ox: number, oy: number, oz: number, ix: number, iy: number, iz: number, best: number): number {
  const b = node * 6;
  let t0 = (bounds[b] - ox) * ix;
  let t1 = (bounds[b + 3] - ox) * ix;
  let lo = Math.min(t0, t1);
  let hi = Math.max(t0, t1);
  t0 = (bounds[b + 1] - oy) * iy;
  t1 = (bounds[b + 4] - oy) * iy;
  lo = Math.max(lo, Math.min(t0, t1));
  hi = Math.min(hi, Math.max(t0, t1));
  t0 = (bounds[b + 2] - oz) * iz;
  t1 = (bounds[b + 5] - oz) * iz;
  lo = Math.max(lo, Math.min(t0, t1));
  hi = Math.min(hi, Math.max(t0, t1));
  if (hi < Math.max(lo, 0) || lo > best) return Infinity;
  return Math.max(lo, 0);
}

/**
 * 光線をいちばん手前の三角形に当てる（Möller–Trumbore。両面）。
 * `dir` は正規化していなくてよい（`t` は `dir` の長さを 1 とした値）。
 */
export function raycastBvh(
  bvh: Bvh,
  positions: Float32Array,
  tris: Triangles,
  origin: readonly [number, number, number],
  dir: readonly [number, number, number],
): RayHit | null {
  if (!bvh.nodes) return null;
  const [ox, oy, oz] = origin;
  const len = Math.hypot(dir[0], dir[1], dir[2]) || 1;
  const dx = dir[0] / len,
    dy = dir[1] / len,
    dz = dir[2] / len;
  const ix = 1 / (dx || 1e-30),
    iy = 1 / (dy || 1e-30),
    iz = 1 / (dz || 1e-30);

  let best = Infinity;
  let bestTri = -1;
  // 明示のスタック（再帰より速く、深さも読める）
  const stack = new Int32Array(MAX_DEPTH * 2 + 8);
  let sp = 0;
  stack[sp++] = 0;

  while (sp > 0) {
    const node = stack[--sp];
    if (hitBox(bvh.bounds, node, ox, oy, oz, ix, iy, iz, best) === Infinity) continue;
    const l = bvh.left[node];
    if (l < 0) {
      const from = bvh.start[node];
      for (let i = from; i < from + bvh.count[node]; i++) {
        const t = bvh.order[i];
        const hit = hitTriangle(positions, tris.tri, t, ox, oy, oz, dx, dy, dz);
        if (hit >= 0 && hit < best) {
          best = hit;
          bestTri = t;
        }
      }
      continue;
    }
    const r = bvh.right[node];
    // 近いほうを後に積む（先に見る）
    const dl = hitBox(bvh.bounds, l, ox, oy, oz, ix, iy, iz, best);
    const dr = hitBox(bvh.bounds, r, ox, oy, oz, ix, iy, iz, best);
    if (dl < dr) {
      if (dr !== Infinity) stack[sp++] = r;
      if (dl !== Infinity) stack[sp++] = l;
    } else {
      if (dl !== Infinity) stack[sp++] = l;
      if (dr !== Infinity) stack[sp++] = r;
    }
  }
  return bestTri < 0 ? null : { t: best, tri: bestTri };
}

/** 三角形 1 つとの交差。当たらなければ −1。 */
function hitTriangle(
  positions: Float32Array,
  tri: Uint32Array,
  t: number,
  ox: number,
  oy: number,
  oz: number,
  dx: number,
  dy: number,
  dz: number,
): number {
  const a = tri[t * 3] * 3;
  const b = tri[t * 3 + 1] * 3;
  const c = tri[t * 3 + 2] * 3;
  const e1x = positions[b] - positions[a];
  const e1y = positions[b + 1] - positions[a + 1];
  const e1z = positions[b + 2] - positions[a + 2];
  const e2x = positions[c] - positions[a];
  const e2y = positions[c + 1] - positions[a + 1];
  const e2z = positions[c + 2] - positions[a + 2];
  const px = dy * e2z - dz * e2y;
  const py = dz * e2x - dx * e2z;
  const pz = dx * e2y - dy * e2x;
  const det = e1x * px + e1y * py + e1z * pz;
  // 両面。潰れた三角形だけ飛ばす
  if (Math.abs(det) < 1e-12) return -1;
  const inv = 1 / det;
  const tx = ox - positions[a];
  const ty = oy - positions[a + 1];
  const tz = oz - positions[a + 2];
  const u = (tx * px + ty * py + tz * pz) * inv;
  if (u < -1e-7 || u > 1 + 1e-7) return -1;
  const qx = ty * e1z - tz * e1y;
  const qy = tz * e1x - tx * e1z;
  const qz = tx * e1y - ty * e1x;
  const v = (dx * qx + dy * qy + dz * qz) * inv;
  if (v < -1e-7 || u + v > 1 + 1e-7) return -1;
  const dist = (e2x * qx + e2y * qy + e2z * qz) * inv;
  return dist > 1e-7 ? dist : -1;
}

/**
 * 球に触れる三角形（`29` の B-T5）。
 * 頂点とエッジのピッキングで「近くの三角形だけ投影する」のに使う。
 * 葉の単位で返すので、球に触れない三角形が混じることはある（取りこぼしは無い）。
 */
export function trianglesNear(
  bvh: Bvh,
  point: readonly [number, number, number],
  radius: number,
): number[] {
  const out: number[] = [];
  if (!bvh.nodes || !(radius > 0)) return out;
  const [px, py, pz] = point;
  const stack: number[] = [0];
  while (stack.length) {
    const node = stack.pop()!;
    const b = node * 6;
    // 箱までの距離が半径より遠ければ、その下は全部外
    let d = 0;
    for (let k = 0; k < 3; k++) {
      const v = k === 0 ? px : k === 1 ? py : pz;
      const lo = bvh.bounds[b + k];
      const hi = bvh.bounds[b + 3 + k];
      const gap = v < lo ? lo - v : v > hi ? v - hi : 0;
      d += gap * gap;
    }
    if (d > radius * radius) continue;
    const l = bvh.left[node];
    if (l < 0) {
      const from = bvh.start[node];
      for (let i = from; i < from + bvh.count[node]; i++) out.push(bvh.order[i]);
      continue;
    }
    stack.push(l, bvh.right[node]);
  }
  return out;
}
