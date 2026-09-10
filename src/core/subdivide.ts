/**
 * Catmull-Clark 細分割。Maya の Smooth に相当し、docs/03 のマルチ解像度の土台になる。
 *
 * UV は面ごとに線形に細分割する（シームがあっても正しく残る）。
 * クリースは semi-sharp の規則で 1 段ごとに 1 減らす。OpenSubdiv と同じ扱い。
 *
 * 規則の実装は `SubdivPlan` に 1 つだけ置く。全部まとめて計算しても、
 * 動いた頂点の周りだけ計算し直しても、同じ式を同じ順序で通るようにするため
 * （docs/08 の V6。2 つ書くと必ずずれる）。
 */
import { Mesh, edgeKey } from "./mesh.js";

type Vec3 = [number, number, number];

/**
 * 細分割の出力を `Mesh` に組む（`32` の T1）。
 *
 * **`MeshBuilder` は通さない。** 出力は「全部四角形・番号は決まっている・
 * 潰れた面は出ない」と分かっているので、溶接も重複の除去も要らない。
 * typed array を直に埋めるぶん、100 万四角形で数秒とギガ単位のメモリが浮く
 * （`MeshBuilder` は `number[]` にコーナーを積むため）。
 *
 * JS 版（`SubdivPlan.build`）と wasm 版（`app/wasm/subdiv.ts`）の**両方が
 * ここを通る**。組み立てが 1 本なら、両者の一致テストが両方を守る。
 *
 * @param source 元のメッシュ。UV・ポリグループ・マテリアル・クリースの元。
 * @param positions 出力頂点の座標。3 × 出力頂点数。
 * @param quads 出力面の頂点番号。4 × 出力面数。**元のコーナーと同じ並び**。
 * @param edgePointOf クリースの引き継ぎだけに使う。(a, b) のエッジ点の出力番号。
 *   無ければ -1。元にクリースが無ければ呼ばれない。
 */
export function assembleQuads(
  source: Mesh,
  positions: Float32Array,
  quads: Uint32Array,
  edgePointOf: (a: number, b: number) => number,
): Mesh {
  const outFaces = (quads.length / 4) | 0;
  const faceOffsets = new Uint32Array(outFaces + 1);
  for (let i = 0; i <= outFaces; i++) faceOffsets[i] = i * 4;

  const polygroup = new Uint16Array(outFaces);
  const materialId = new Uint16Array(outFaces);

  const names = [...source.uvSets.keys()];
  const src = names.map((n) => source.uvSets.get(n)!);
  const dst = names.map(() => new Float32Array(outFaces * 8));

  let q = 0;
  for (let f = 0; f < source.faceCount; f++) {
    const s = source.faceOffsets[f];
    const n = source.faceOffsets[f + 1] - s;
    const group = source.polygroup[f];
    const material = source.materialId[f];

    for (let k = 0; k < src.length; k++) {
      const uv = src[k];
      const out = dst[k];
      // 面の平均 UV（面点のぶん）。面ごとに 1 度だけ
      let au = 0,
        av = 0;
      for (let i = 0; i < n; i++) {
        au += uv[(s + i) * 2];
        av += uv[(s + i) * 2 + 1];
      }
      au /= n;
      av /= n;
      for (let i = 0; i < n; i++) {
        const c = (s + i) * 2;
        const nx = (s + ((i + 1) % n)) * 2;
        const pv = (s + ((i - 1 + n) % n)) * 2;
        // この面の i 番目のコーナーから生まれる四角形は (q + i) 番
        const w = (q + i) * 8;
        out[w] = uv[c];
        out[w + 1] = uv[c + 1];
        out[w + 2] = (uv[c] + uv[nx]) / 2;
        out[w + 3] = (uv[c + 1] + uv[nx + 1]) / 2;
        out[w + 4] = au;
        out[w + 5] = av;
        out[w + 6] = (uv[pv] + uv[c]) / 2;
        out[w + 7] = (uv[pv + 1] + uv[c + 1]) / 2;
      }
    }

    for (let i = 0; i < n; i++) {
      polygroup[q + i] = group;
      materialId[q + i] = material;
    }
    q += n;
  }

  const uvSets = new Map<string, Float32Array>();
  for (let k = 0; k < names.length; k++) uvSets.set(names[k], dst[k]);
  const out = new Mesh(positions, faceOffsets, quads, { uvSets, polygroup, materialId });

  // クリースは 1 段ごとに 1 減らし、分割された両側に引き継ぐ（semi-sharp の規則）
  for (const [key, value] of source.crease) {
    const next = value - 1;
    if (next <= 0) continue;
    const sep = key.indexOf("_");
    const a = Number(key.slice(0, sep));
    const b = Number(key.slice(sep + 1));
    const mid = edgePointOf(a, b);
    if (mid < 0) continue;
    out.setCrease(a, mid, next);
    out.setCrease(mid, b, next);
  }
  for (const [v, s] of source.cornerSharp) {
    const next = s - 1;
    if (next > 0) out.cornerSharp.set(v, next);
  }
  return out;
}

/**
 * 細分割の下ごしらえ。**トポロジとクリースから決まるものだけ**を持つ。
 *
 * 頂点が動いただけなら作り直さなくてよいので、差分更新はこれを使い回して
 * 「動いた頂点の周りだけ」を計算し直す。トポロジかクリースを変えたら作り直すこと。
 *
 * 出力の採番は 頂点点 `[0, V)` → エッジ点 `[V, V+E)` → 面点 `[V+E, V+E+F)`。
 * `edgeList` の並びがエッジ点の並びになる。
 */
export class SubdivPlan {
  readonly vertexCount: number;
  readonly faceCount: number;
  readonly edgeCount: number;
  /** 出力でエッジ点が始まる位置。 */
  readonly edgeBase: number;
  /** 出力で面点が始まる位置。 */
  readonly faceBase: number;
  readonly outCount: number;

  /*
   * **隣接はぜんぶ CSR の typed array**（`43` の T2）。
   *
   * 前は `number[][]` と `Array<Array<{...}>>` と `Map<string, number>` で持っていた。
   * 25 万四角形のレベル 2（23 万頂点・23 万面・46 万辺）では、
   * **JS の配列とオブジェクトが 100 万個以上**できていて、実データ 19MB に対して
   * ヒープが 165MB になっていた（`32` の T5）。並びは前と 1 つも変えていない
   * （足す順が変わると浮動小数の結果が変わるため）。
   */
  /** 面 → 頂点。 */
  private readonly fvOffsets: Uint32Array;
  private readonly fvVerts: Uint32Array;
  /** 頂点 → 接する面（面番号の昇順）。 */
  private readonly vfOffsets: Uint32Array;
  private readonly vfFaces: Uint32Array;
  /** 頂点 → 隣接頂点（辺の並び順）。`nbEdge` はその隣へ向かう辺の番号。 */
  private readonly nbOffsets: Uint32Array;
  private readonly nbVerts: Uint32Array;
  private readonly nbEdge: Uint32Array;
  /** 辺の両端（`a < b`）。 */
  private readonly edgeA: Uint32Array;
  private readonly edgeB: Uint32Array;
  /** 辺に触る面。境界は 1 つで、余りは −1。 */
  private readonly edgeFace0: Int32Array;
  private readonly edgeFace1: Int32Array;
  /** エッジごとの鋭さ 0..1（クリースを 1 で頭打ちにしたもの）。 */
  private readonly edgeSharp: Float64Array;
  /** 頂点ごとの鋭い辺（境界は鋭さ 1）。並びはエッジの並び。 */
  private readonly sharpOffsets: Uint32Array;
  private readonly sharpOther: Uint32Array;
  private readonly sharpValue: Float64Array;

  constructor(mesh: Mesh) {
    const nv = (this.vertexCount = mesh.vertexCount);
    const nf = (this.faceCount = mesh.faceCount);
    const corners = mesh.faceCorners;
    const offsets = mesh.faceOffsets;

    // 面 → 頂点。`mesh` のコーナーをそのまま写す
    this.fvOffsets = new Uint32Array(nf + 1);
    for (let f = 0; f < nf; f++) this.fvOffsets[f + 1] = offsets[f + 1];
    this.fvVerts = corners.slice(0, offsets[nf]);

    // 頂点 → 面。数えてから詰める（面番号の昇順になる = 前の `vertexFaces` と同じ並び）
    this.vfOffsets = new Uint32Array(nv + 1);
    for (let i = 0; i < offsets[nf]; i++) this.vfOffsets[corners[i] + 1]++;
    for (let v = 0; v < nv; v++) this.vfOffsets[v + 1] += this.vfOffsets[v];
    this.vfFaces = new Uint32Array(this.vfOffsets[nv]);
    {
      const cursor = Uint32Array.from(this.vfOffsets.subarray(0, nv));
      for (let f = 0; f < nf; f++) {
        for (let i = offsets[f]; i < offsets[f + 1]; i++) this.vfFaces[cursor[corners[i]]++] = f;
      }
    }

    // 辺。`mesh.edges()` の並びをそのまま番号にする（`edgePointOf` の答えが変わらない）
    const edges = mesh.edges();
    const ne = (this.edgeCount = edges.length);
    this.edgeBase = nv;
    this.faceBase = nv + ne;
    this.outCount = this.faceBase + nf;
    this.edgeA = new Uint32Array(ne);
    this.edgeB = new Uint32Array(ne);
    for (let i = 0; i < ne; i++) {
      this.edgeA[i] = edges[i][0];
      this.edgeB[i] = edges[i][1];
    }

    // 頂点 → 隣接（辺の並び順。前の `vertexNeighbors` と同じ）
    this.nbOffsets = new Uint32Array(nv + 1);
    for (let i = 0; i < ne; i++) {
      this.nbOffsets[this.edgeA[i] + 1]++;
      this.nbOffsets[this.edgeB[i] + 1]++;
    }
    for (let v = 0; v < nv; v++) this.nbOffsets[v + 1] += this.nbOffsets[v];
    this.nbVerts = new Uint32Array(this.nbOffsets[nv]);
    this.nbEdge = new Uint32Array(this.nbOffsets[nv]);
    {
      const cursor = Uint32Array.from(this.nbOffsets.subarray(0, nv));
      for (let i = 0; i < ne; i++) {
        const a = this.edgeA[i];
        const b = this.edgeB[i];
        this.nbVerts[cursor[a]] = b;
        this.nbEdge[cursor[a]++] = i;
        this.nbVerts[cursor[b]] = a;
        this.nbEdge[cursor[b]++] = i;
      }
    }

    // 辺 → 面と、鋭さ
    const ef = mesh.edgeFaceMap();
    this.edgeFace0 = new Int32Array(ne).fill(-1);
    this.edgeFace1 = new Int32Array(ne).fill(-1);
    this.edgeSharp = new Float64Array(ne);
    this.sharpOffsets = new Uint32Array(nv + 1);
    const sharpness = new Float64Array(ne);
    for (let i = 0; i < ne; i++) {
      const a = this.edgeA[i];
      const b = this.edgeB[i];
      const faces = ef.get(edgeKey(a, b)) ?? [];
      if (faces.length > 0) this.edgeFace0[i] = faces[0];
      if (faces.length > 1) this.edgeFace1[i] = faces[1];
      this.edgeSharp[i] = Math.min(1, mesh.getCrease(a, b));
      // 頂点点の規則で使う「鋭い辺」。境界は鋭さ 1 とみなす
      sharpness[i] = faces.length === 1 ? 1 : this.edgeSharp[i];
      if (sharpness[i] > 0) {
        this.sharpOffsets[a + 1]++;
        this.sharpOffsets[b + 1]++;
      }
    }
    for (let v = 0; v < nv; v++) this.sharpOffsets[v + 1] += this.sharpOffsets[v];
    this.sharpOther = new Uint32Array(this.sharpOffsets[nv]);
    this.sharpValue = new Float64Array(this.sharpOffsets[nv]);
    {
      const cursor = Uint32Array.from(this.sharpOffsets.subarray(0, nv));
      for (let i = 0; i < ne; i++) {
        if (sharpness[i] <= 0) continue;
        const a = this.edgeA[i];
        const b = this.edgeB[i];
        this.sharpOther[cursor[a]] = b;
        this.sharpValue[cursor[a]++] = sharpness[i];
        this.sharpOther[cursor[b]] = a;
        this.sharpValue[cursor[b]++] = sharpness[i];
      }
    }
  }

  /**
   * 辺 (a, b) の番号。無ければ -1。
   *
   * 前は辺ごとに文字列の鍵を作って `Map` で引いていた。価数は 4〜6 なので、
   * `a` の隣接を舐めるほうが速いし、辺の数だけ文字列を作らずに済む（`43` の T2）。
   */
  private edgeIndexOf(a: number, b: number): number {
    if (a < 0 || a >= this.vertexCount) return -1;
    for (let i = this.nbOffsets[a]; i < this.nbOffsets[a + 1]; i++) {
      if (this.nbVerts[i] === b) return this.nbEdge[i];
    }
    return -1;
  }

  /** エッジ (a, b) のエッジ点の出力番号。無ければ -1。 */
  edgePointOf(a: number, b: number): number {
    const i = this.edgeIndexOf(a, b);
    return i < 0 ? -1 : this.edgeBase + i;
  }

  /**
   * 位置が変わった入力頂点から、位置が変わる出力頂点を出す。
   *
   * 動いた頂点に接する面を集めれば、その面から生まれる出力頂点（面点・エッジ点・
   * 頂点点）で漏れなく足りる。頂点点は隣接と接する面点に依るが、隣接であれば
   * 必ず同じ面に居るので、この集め方で覆える。
   */
  affected(moved: Iterable<number>): Set<number> {
    const faces = new Set<number>();
    const out = new Set<number>();
    for (const v of moved) {
      if (v < 0 || v >= this.vertexCount) continue;
      const from = this.vfOffsets[v];
      const to = this.vfOffsets[v + 1];
      // 面に属さない孤立した頂点は、自分自身だけが動く
      if (from === to) out.add(v);
      for (let i = from; i < to; i++) faces.add(this.vfFaces[i]);
    }
    for (const f of faces) {
      out.add(this.faceBase + f);
      const s = this.fvOffsets[f];
      const n = this.fvOffsets[f + 1] - s;
      for (let i = 0; i < n; i++) {
        const a = this.fvVerts[s + i];
        out.add(a);
        const e = this.edgeIndexOf(a, this.fvVerts[s + ((i + 1) % n)]);
        if (e >= 0) out.add(this.edgeBase + e);
      }
    }
    return out;
  }

  /**
   * 細分割後の位置を書く。`subset` を渡すとその出力頂点だけを書き直す。
   * 面点は必要になったぶんだけ倍精度で作る（全部でも一部でも同じ値になる）。
   */
  positions(mesh: Mesh, out: Float32Array, subset?: Iterable<number>): void {
    const p = mesh.positions;
    const fp = new Float64Array(this.faceCount * 3);
    const ready = new Uint8Array(this.faceCount);
    const faceP = (f: number): number => {
      if (!ready[f]) {
        const c = mesh.faceCenter(f);
        fp[f * 3] = c[0];
        fp[f * 3 + 1] = c[1];
        fp[f * 3 + 2] = c[2];
        ready[f] = 1;
      }
      return f * 3;
    };

    const writeFacePoint = (f: number): void => {
      const o = faceP(f);
      const w = (this.faceBase + f) * 3;
      out[w] = fp[o];
      out[w + 1] = fp[o + 1];
      out[w + 2] = fp[o + 2];
    };

    // エッジ点。内部は (2 頂点 + 2 面点) / 4、境界は中点。
    // クリースが付いているエッジは、鋭さに応じて中点へ寄せる（semi-sharp の近似）。
    const writeEdgePoint = (i: number): void => {
      const a = this.edgeA[i];
      const b = this.edgeB[i];
      const w = (this.edgeBase + i) * 3;
      const f0 = this.edgeFace0[i];
      const f1 = this.edgeFace1[i];
      if (f0 < 0 || f1 < 0) {
        for (let k = 0; k < 3; k++) out[w + k] = (p[a * 3 + k] + p[b * 3 + k]) / 2;
        return;
      }
      const o0 = faceP(f0);
      const o1 = faceP(f1);
      const sharp = this.edgeSharp[i];
      for (let k = 0; k < 3; k++) {
        const mid = (p[a * 3 + k] + p[b * 3 + k]) / 2;
        const smooth = (p[a * 3 + k] + p[b * 3 + k] + fp[o0 + k] + fp[o1 + k]) / 4;
        out[w + k] = smooth + (mid - smooth) * sharp;
      }
    };

    const smooth: Vec3 = [0, 0, 0];
    const creased: Vec3 = [0, 0, 0];
    const writeVertexPoint = (v: number): void => {
      const px = p[v * 3],
        py = p[v * 3 + 1],
        pz = p[v * 3 + 2];
      const fFrom = this.vfOffsets[v];
      const n = this.vfOffsets[v + 1] - fFrom;
      const nbFrom = this.nbOffsets[v];
      const nbCount = this.nbOffsets[v + 1] - nbFrom;
      const w = v * 3;

      // 滑らかな規則（Catmull-Clark の内部頂点）
      if (!n || !nbCount) {
        smooth[0] = px;
        smooth[1] = py;
        smooth[2] = pz;
      } else {
        let fx = 0,
          fy = 0,
          fz = 0;
        for (let i = fFrom; i < fFrom + n; i++) {
          const o = faceP(this.vfFaces[i]);
          fx += fp[o];
          fy += fp[o + 1];
          fz += fp[o + 2];
        }
        fx /= n;
        fy /= n;
        fz /= n;
        let rx = 0,
          ry = 0,
          rz = 0;
        for (let i = nbFrom; i < nbFrom + nbCount; i++) {
          const u = this.nbVerts[i];
          rx += (px + p[u * 3]) / 2;
          ry += (py + p[u * 3 + 1]) / 2;
          rz += (pz + p[u * 3 + 2]) / 2;
        }
        rx /= nbCount;
        ry /= nbCount;
        rz /= nbCount;
        smooth[0] = (fx + 2 * rx + (n - 3) * px) / n;
        smooth[1] = (fy + 2 * ry + (n - 3) * py) / n;
        smooth[2] = (fz + 2 * rz + (n - 3) * pz) / n;
      }

      const sFrom = this.sharpOffsets[v];
      const sCount = this.sharpOffsets[v + 1] - sFrom;
      if (sCount < 2) {
        // 鋭い辺が 1 本以下なら折り目にならない。滑らかな規則のまま
        out[w] = smooth[0];
        out[w + 1] = smooth[1];
        out[w + 2] = smooth[2];
        return;
      }

      // 折り目の規則。鋭い辺が 2 本なら (m1 + m2 + 6P) / 8、3 本以上は角として固定
      if (sCount >= 3) {
        creased[0] = px;
        creased[1] = py;
        creased[2] = pz;
      } else {
        let sx = 0,
          sy = 0,
          sz = 0;
        for (let i = sFrom; i < sFrom + sCount; i++) {
          const u = this.sharpOther[i];
          sx += (px + p[u * 3]) / 2;
          sy += (py + p[u * 3 + 1]) / 2;
          sz += (pz + p[u * 3 + 2]) / 2;
        }
        creased[0] = (sx + 6 * px) / 8;
        creased[1] = (sy + 6 * py) / 8;
        creased[2] = (sz + 6 * pz) / 8;
      }

      // 半端な鋭さは、滑らかな規則と折り目の規則の間を取る（semi-sharp の近似）
      let blend = 0;
      for (let i = sFrom; i < sFrom + sCount; i++) blend += this.sharpValue[i];
      blend = Math.min(1, blend / sCount);
      for (let k = 0; k < 3; k++) out[w + k] = smooth[k] + (creased[k] - smooth[k]) * blend;
    };

    const one = (index: number): void => {
      if (index >= this.faceBase) writeFacePoint(index - this.faceBase);
      else if (index >= this.edgeBase) writeEdgePoint(index - this.edgeBase);
      else writeVertexPoint(index);
    };

    if (subset) {
      for (const index of subset) if (index >= 0 && index < this.outCount) one(index);
      return;
    }
    // 全部。面点 → エッジ点 → 頂点点の順に作れば面点の作り直しが起きない
    for (let f = 0; f < this.faceCount; f++) writeFacePoint(f);
    for (let i = 0; i < this.edgeCount; i++) writeEdgePoint(i);
    for (let v = 0; v < this.vertexCount; v++) writeVertexPoint(v);
  }

  /**
   * 出力の四角形を並べる。1 つの入力コーナーから 1 つの四角形が出るので、
   * 並びは入力のコーナー順そのまま。wasm 版もこの並びを守る。
   */
  quads(): Uint32Array {
    const corners = this.fvOffsets[this.faceCount];
    const out = new Uint32Array(corners * 4);
    let q = 0;
    for (let f = 0; f < this.faceCount; f++) {
      const s = this.fvOffsets[f];
      const n = this.fvOffsets[f + 1] - s;
      const center = this.faceBase + f;
      for (let i = 0; i < n; i++, q++) {
        const v = this.fvVerts[s + i];
        out[q * 4] = v;
        out[q * 4 + 1] = this.edgePointOf(v, this.fvVerts[s + ((i + 1) % n)]);
        out[q * 4 + 2] = center;
        out[q * 4 + 3] = this.edgePointOf(this.fvVerts[s + ((i - 1 + n) % n)], v);
      }
    }
    return out;
  }

  /** 細分割したメッシュを作る。UV とクリースも持ち越す。 */
  build(mesh: Mesh): Mesh {
    const pos = new Float32Array(this.outCount * 3);
    this.positions(mesh, pos);
    return assembleQuads(mesh, pos, this.quads(), (a, b) => this.edgePointOf(a, b));
  }
}

export function catmullClark(mesh: Mesh): Mesh {
  return new SubdivPlan(mesh).build(mesh);
}

/** 指定回数だけ細分割する。 */
export function subdivide(mesh: Mesh, levels: number): Mesh {
  let out = mesh;
  for (let i = 0; i < levels; i++) out = catmullClark(out);
  return out;
}
