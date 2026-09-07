/**
 * メッシュ。docs/02（データ構造）と docs/11（保存形式）の仕様に従う。
 *
 * 面は CSR 形式で持つ（faceOffsets + faceCorners）。これは USD の
 * faceVertexCounts / faceVertexIndices と同じ考え方で、四角形も n-gon も扱える。
 *
 * このファイルは DOM にも Three.js にも依存しない。docs/02 の「core/ を
 * プラットフォーム非依存に保つ」原則そのもので、v1.5 で C++ → wasm に
 * 差し替えるときの境界になる。
 */

/** エッジのキー。常に小さい方の頂点を先にする。 */
export function edgeKey(a: number, b: number): string {
  return a < b ? `${a}_${b}` : `${b}_${a}`;
}

/** UV セット。コーナー単位（faceVarying）なので、シームがあっても正しく持てる。 */
export type UvSet = Float32Array; // 2 × コーナー数

export interface MeshStats {
  vertices: number;
  edges: number;
  faces: number;
  triangles: number;
  corners: number;
}

export class Mesh {
  /** 頂点座標。3 × 頂点数。 */
  positions: Float32Array;
  /** 面 f のコーナーは faceCorners[faceOffsets[f] .. faceOffsets[f+1]]。長さは面数 + 1。 */
  faceOffsets: Uint32Array;
  /** 面を構成する頂点インデックス列。 */
  faceCorners: Uint32Array;

  /** UV セット。名前 → コーナー単位の UV。既定のセット名は "map1"（Maya に合わせる）。 */
  uvSets: Map<string, UvSet>;
  /** エッジのクリース値 0..10。OpenSubdiv / USD の semi-sharp crease と同じ意味。 */
  crease: Map<string, number>;
  /** 頂点のシャープネス 0..10。0 は既定なので、値を持つ頂点だけを入れる。 */
  cornerSharp: Map<number, number>;
  /** 面ごとのポリグループ（OBJ の g、ZBrush のポリグループ）。 */
  polygroup: Uint16Array;
  /** 面ごとのマテリアル ID（Substance のテクスチャセット、USD の GeomSubset）。 */
  materialId: Uint16Array;
  /** 頂点カラー。4 × 頂点数、または未設定。 */
  vertexColor: Uint8Array | null;

  constructor(
    positions: Float32Array,
    faceOffsets: Uint32Array,
    faceCorners: Uint32Array,
    options: {
      uvSets?: Map<string, UvSet>;
      crease?: Map<string, number>;
      cornerSharp?: Map<number, number>;
      polygroup?: Uint16Array;
      materialId?: Uint16Array;
      vertexColor?: Uint8Array | null;
    } = {},
  ) {
    this.positions = positions;
    this.faceOffsets = faceOffsets;
    this.faceCorners = faceCorners;
    const faceCount = Math.max(0, faceOffsets.length - 1);
    this.uvSets = options.uvSets ?? new Map();
    this.crease = options.crease ?? new Map();
    this.cornerSharp = options.cornerSharp ?? new Map();
    this.polygroup = options.polygroup ?? new Uint16Array(faceCount);
    this.materialId = options.materialId ?? new Uint16Array(faceCount);
    this.vertexColor = options.vertexColor ?? null;
  }

  static empty(): Mesh {
    return new Mesh(new Float32Array(0), new Uint32Array([0]), new Uint32Array(0));
  }

  get vertexCount(): number {
    return this.positions.length / 3;
  }
  get faceCount(): number {
    return Math.max(0, this.faceOffsets.length - 1);
  }
  get cornerCount(): number {
    return this.faceCorners.length;
  }

  /** 面 f のコーナー数。 */
  faceSize(f: number): number {
    return this.faceOffsets[f + 1] - this.faceOffsets[f];
  }
  /** 面 f の頂点インデックス列。新しい配列を返す。 */
  faceVerts(f: number): number[] {
    const out: number[] = [];
    for (let i = this.faceOffsets[f]; i < this.faceOffsets[f + 1]; i++) out.push(this.faceCorners[i]);
    return out;
  }
  /** 面 f の i 番目のコーナーの、faceCorners 内での位置。UV の参照に使う。 */
  cornerIndex(f: number, i: number): number {
    return this.faceOffsets[f] + i;
  }

  getPosition(v: number, out: [number, number, number] = [0, 0, 0]): [number, number, number] {
    out[0] = this.positions[v * 3];
    out[1] = this.positions[v * 3 + 1];
    out[2] = this.positions[v * 3 + 2];
    return out;
  }
  setPosition(v: number, x: number, y: number, z: number): void {
    this.positions[v * 3] = x;
    this.positions[v * 3 + 1] = y;
    this.positions[v * 3 + 2] = z;
  }

  getCrease(a: number, b: number): number {
    return this.crease.get(edgeKey(a, b)) ?? 0;
  }
  setCrease(a: number, b: number, value: number): void {
    const k = edgeKey(a, b);
    if (value <= 0) this.crease.delete(k);
    else this.crease.set(k, Math.min(10, value));
  }

  /** 重複のないエッジ一覧。[lo, hi] の組を返す。 */
  edges(): Array<[number, number]> {
    const seen = new Set<string>();
    const out: Array<[number, number]> = [];
    for (let f = 0; f < this.faceCount; f++) {
      const s = this.faceOffsets[f];
      const n = this.faceOffsets[f + 1] - s;
      for (let i = 0; i < n; i++) {
        const a = this.faceCorners[s + i];
        const b = this.faceCorners[s + ((i + 1) % n)];
        const k = edgeKey(a, b);
        if (!seen.has(k)) {
          seen.add(k);
          out.push([Math.min(a, b), Math.max(a, b)]);
        }
      }
    }
    return out;
  }

  /** エッジキー → そのエッジを共有する面の一覧。 */
  edgeFaceMap(): Map<string, number[]> {
    const m = new Map<string, number[]>();
    for (let f = 0; f < this.faceCount; f++) {
      const s = this.faceOffsets[f];
      const n = this.faceOffsets[f + 1] - s;
      for (let i = 0; i < n; i++) {
        const k = edgeKey(this.faceCorners[s + i], this.faceCorners[s + ((i + 1) % n)]);
        const list = m.get(k);
        if (list) list.push(f);
        else m.set(k, [f]);
      }
    }
    return m;
  }

  /** 頂点 → 隣接する面の一覧。 */
  vertexFaces(): Map<number, number[]> {
    const m = new Map<number, number[]>();
    for (let f = 0; f < this.faceCount; f++) {
      for (let i = this.faceOffsets[f]; i < this.faceOffsets[f + 1]; i++) {
        const v = this.faceCorners[i];
        const list = m.get(v);
        if (list) list.push(f);
        else m.set(v, [f]);
      }
    }
    return m;
  }

  /** 頂点 → 隣接する頂点の一覧。 */
  vertexNeighbors(): Map<number, number[]> {
    const m = new Map<number, number[]>();
    const push = (a: number, b: number) => {
      const list = m.get(a);
      if (list) {
        if (!list.includes(b)) list.push(b);
      } else m.set(a, [b]);
    };
    for (const [a, b] of this.edges()) {
      push(a, b);
      push(b, a);
    }
    return m;
  }

  /** 三角形分割。tri は 3 つ組の頂点インデックス、triToFace は各三角形の元の面。 */
  triangulate(): { tri: Uint32Array; triToFace: Uint32Array } {
    let triCount = 0;
    for (let f = 0; f < this.faceCount; f++) triCount += Math.max(0, this.faceSize(f) - 2);
    const tri = new Uint32Array(triCount * 3);
    const triToFace = new Uint32Array(triCount);
    let t = 0;
    for (let f = 0; f < this.faceCount; f++) {
      const s = this.faceOffsets[f];
      const n = this.faceOffsets[f + 1] - s;
      for (let i = 1; i < n - 1; i++) {
        tri[t * 3] = this.faceCorners[s];
        tri[t * 3 + 1] = this.faceCorners[s + i];
        tri[t * 3 + 2] = this.faceCorners[s + i + 1];
        triToFace[t] = f;
        t++;
      }
    }
    return { tri, triToFace };
  }

  faceCenter(f: number): [number, number, number] {
    const s = this.faceOffsets[f];
    const n = this.faceOffsets[f + 1] - s;
    let x = 0,
      y = 0,
      z = 0;
    for (let i = 0; i < n; i++) {
      const v = this.faceCorners[s + i];
      x += this.positions[v * 3];
      y += this.positions[v * 3 + 1];
      z += this.positions[v * 3 + 2];
    }
    return [x / n, y / n, z / n];
  }

  /** Newell の方法。n-gon でも凹面でも安定する。 */
  faceNormal(f: number): [number, number, number] {
    const s = this.faceOffsets[f];
    const n = this.faceOffsets[f + 1] - s;
    let nx = 0,
      ny = 0,
      nz = 0;
    for (let i = 0; i < n; i++) {
      const a = this.faceCorners[s + i];
      const b = this.faceCorners[s + ((i + 1) % n)];
      const ax = this.positions[a * 3],
        ay = this.positions[a * 3 + 1],
        az = this.positions[a * 3 + 2];
      const bx = this.positions[b * 3],
        by = this.positions[b * 3 + 1],
        bz = this.positions[b * 3 + 2];
      nx += (ay - by) * (az + bz);
      ny += (az - bz) * (ax + bx);
      nz += (ax - bx) * (ay + by);
    }
    const len = Math.hypot(nx, ny, nz) || 1;
    return [nx / len, ny / len, nz / len];
  }

  faceNormals(): Float32Array {
    const out = new Float32Array(this.faceCount * 3);
    for (let f = 0; f < this.faceCount; f++) {
      const n = this.faceNormal(f);
      out[f * 3] = n[0];
      out[f * 3 + 1] = n[1];
      out[f * 3 + 2] = n[2];
    }
    return out;
  }

  /** 面法線の平均による頂点法線。エッジフローの三次補間に使う。 */
  vertexNormals(): Float32Array {
    const fn = this.faceNormals();
    const out = new Float32Array(this.vertexCount * 3);
    for (let f = 0; f < this.faceCount; f++) {
      for (let i = this.faceOffsets[f]; i < this.faceOffsets[f + 1]; i++) {
        const v = this.faceCorners[i];
        out[v * 3] += fn[f * 3];
        out[v * 3 + 1] += fn[f * 3 + 1];
        out[v * 3 + 2] += fn[f * 3 + 2];
      }
    }
    for (let v = 0; v < this.vertexCount; v++) {
      const len = Math.hypot(out[v * 3], out[v * 3 + 1], out[v * 3 + 2]) || 1;
      out[v * 3] /= len;
      out[v * 3 + 1] /= len;
      out[v * 3 + 2] /= len;
    }
    return out;
  }

  boundsCenter(): [number, number, number] {
    if (this.vertexCount === 0) return [0, 0, 0];
    const mn = [Infinity, Infinity, Infinity];
    const mx = [-Infinity, -Infinity, -Infinity];
    for (let i = 0; i < this.positions.length; i += 3) {
      for (let k = 0; k < 3; k++) {
        const x = this.positions[i + k];
        if (x < mn[k]) mn[k] = x;
        if (x > mx[k]) mx[k] = x;
      }
    }
    return [(mn[0] + mx[0]) / 2, (mn[1] + mx[1]) / 2, (mn[2] + mx[2]) / 2];
  }

  stats(): MeshStats {
    let triangles = 0;
    for (let f = 0; f < this.faceCount; f++) triangles += Math.max(0, this.faceSize(f) - 2);
    return {
      vertices: this.vertexCount,
      edges: this.edges().length,
      faces: this.faceCount,
      triangles,
      corners: this.cornerCount,
    };
  }

  clone(): Mesh {
    const uvSets = new Map<string, UvSet>();
    for (const [name, uv] of this.uvSets) uvSets.set(name, uv.slice());
    return new Mesh(this.positions.slice(), this.faceOffsets.slice(), this.faceCorners.slice(), {
      uvSets,
      crease: new Map(this.crease),
      cornerSharp: new Map(this.cornerSharp),
      polygroup: this.polygroup.slice(),
      materialId: this.materialId.slice(),
      vertexColor: this.vertexColor ? this.vertexColor.slice() : null,
    });
  }
}

/**
 * メッシュを組み立てる。位置での重複排除（溶接）を任意で行う。
 * トポロジ操作もプリミティブ生成もこれを通す。
 */
export class MeshBuilder {
  private pos: number[] = [];
  private offsets: number[] = [0];
  private corners: number[] = [];
  private uv: Map<string, number[]> = new Map();
  private groups: number[] = [];
  private materials: number[] = [];
  private weldMap: Map<string, number> | null;
  crease: Map<string, number> = new Map();
  cornerSharp: Map<number, number> = new Map();

  constructor(options: { weld?: boolean } = {}) {
    this.weldMap = options.weld === false ? null : new Map();
  }

  /** 頂点を追加。溶接が有効なら同じ位置の頂点を再利用する。 */
  vertex(x: number, y: number, z: number): number {
    if (this.weldMap) {
      const key = `${x.toFixed(5)},${y.toFixed(5)},${z.toFixed(5)}`;
      const found = this.weldMap.get(key);
      if (found !== undefined) return found;
      const index = this.pos.length / 3;
      this.pos.push(x, y, z);
      this.weldMap.set(key, index);
      return index;
    }
    const index = this.pos.length / 3;
    this.pos.push(x, y, z);
    return index;
  }

  /** 既存の頂点数（溶接後）。 */
  get vertexCount(): number {
    return this.pos.length / 3;
  }

  /** 積んだ頂点の座標を読む。溶接後の位置を使って計算したいときに要る。 */
  positionAt(index: number): [number, number, number] {
    return [this.pos[index * 3], this.pos[index * 3 + 1], this.pos[index * 3 + 2]];
  }
  get faceCount(): number {
    return this.offsets.length - 1;
  }

  /**
   * 面を追加。連続する重複頂点は取り除く（極で四角形が三角形に潰れる場合の対策）。
   * 3 頂点未満になったら追加しない。追加した面の index を返す。しなかったら -1。
   */
  face(verts: number[], options: { uv?: Map<string, number[][]>; polygroup?: number; materialId?: number } = {}): number {
    const clean: number[] = [];
    const keep: number[] = []; // clean に残ったコーナーの、元の verts 内での位置
    for (let i = 0; i < verts.length; i++) {
      const v = verts[i];
      if (clean.length && clean[clean.length - 1] === v) continue;
      if (clean.includes(v)) continue;
      clean.push(v);
      keep.push(i);
    }
    if (clean.length >= 2 && clean[0] === clean[clean.length - 1]) {
      clean.pop();
      keep.pop();
    }
    if (clean.length < 3) return -1;

    for (const v of clean) this.corners.push(v);
    this.offsets.push(this.corners.length);
    this.groups.push(options.polygroup ?? 0);
    this.materials.push(options.materialId ?? 0);

    if (options.uv) {
      for (const [name, rows] of options.uv) {
        let list = this.uv.get(name);
        if (!list) {
          // 既存のコーナー分を 0 で埋めてから追加する
          list = new Array((this.corners.length - clean.length) * 2).fill(0);
          this.uv.set(name, list);
        }
        for (const k of keep) {
          const row = rows[k] ?? [0, 0];
          list.push(row[0], row[1]);
        }
      }
    }
    // この面で指定されなかった UV セットは 0 で埋め、長さを揃える
    for (const [name, list] of this.uv) {
      const want = this.corners.length * 2;
      while (list.length < want) list.push(0);
      void name;
    }
    return this.faceCount - 1;
  }

  build(): Mesh {
    const uvSets = new Map<string, UvSet>();
    for (const [name, list] of this.uv) {
      const arr = new Float32Array(this.corners.length * 2);
      arr.set(list.slice(0, arr.length));
      uvSets.set(name, arr);
    }
    return new Mesh(
      new Float32Array(this.pos),
      new Uint32Array(this.offsets),
      new Uint32Array(this.corners),
      {
        uvSets,
        crease: this.crease,
        cornerSharp: this.cornerSharp,
        polygroup: new Uint16Array(this.groups),
        materialId: new Uint16Array(this.materials),
      },
    );
  }
}

/**
 * 面ごとの UV を取り出す補助。UV セットが無ければ null。
 * トポロジ操作で「元の面の UV を読んで、新しい面に配る」ために使う。
 */
export function faceUvs(mesh: Mesh, f: number): Map<string, number[][]> | null {
  if (mesh.uvSets.size === 0) return null;
  const out = new Map<string, number[][]>();
  const s = mesh.faceOffsets[f];
  const n = mesh.faceOffsets[f + 1] - s;
  for (const [name, uv] of mesh.uvSets) {
    const rows: number[][] = [];
    for (let i = 0; i < n; i++) rows.push([uv[(s + i) * 2], uv[(s + i) * 2 + 1]]);
    out.set(name, rows);
  }
  return out;
}

/** UV セットの名前一覧。 */
export function uvSetNames(mesh: Mesh): string[] {
  return Array.from(mesh.uvSets.keys());
}

/** 2 つの UV 行を補間する。エッジループ挿入で新しいコーナーの UV を作るのに使う。 */
export function lerpUvRows(
  uvs: Map<string, number[][]> | null,
  ia: number,
  ib: number,
  t: number,
): Map<string, number[]> | null {
  if (!uvs) return null;
  const out = new Map<string, number[]>();
  for (const [name, rows] of uvs) {
    const a = rows[ia] ?? [0, 0];
    const b = rows[ib] ?? [0, 0];
    out.set(name, [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t]);
  }
  return out;
}
