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
import { Mesh, MeshBuilder, edgeKey, faceUvs } from "./mesh.js";

type Vec3 = [number, number, number];

/** 面ごとの UV から、その面の平均 UV を求める。 */
function averageUv(rows: number[][]): number[] {
  let u = 0,
    v = 0;
  for (const r of rows) {
    u += r[0];
    v += r[1];
  }
  return [u / rows.length, v / rows.length];
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
  readonly edgeList: Array<[number, number]>;
  /** 出力でエッジ点が始まる位置。 */
  readonly edgeBase: number;
  /** 出力で面点が始まる位置。 */
  readonly faceBase: number;
  readonly outCount: number;

  private readonly faceVerts: number[][] = [];
  private readonly vertexFaces: number[][] = [];
  private readonly neighbors: number[][] = [];
  private readonly edgeIndex = new Map<string, number>();
  /** エッジごとの隣接面。境界は 1 つ。 */
  private readonly edgeFaces: number[][] = [];
  /** エッジごとの鋭さ 0..1（クリースを 1 で頭打ちにしたもの）。 */
  private readonly edgeSharp: Float64Array;
  /** 頂点ごとの鋭い辺（境界は鋭さ 1）。並びはエッジの並び。 */
  private readonly sharpAt: Array<Array<{ other: number; sharpness: number }>> = [];

  constructor(mesh: Mesh) {
    this.vertexCount = mesh.vertexCount;
    this.faceCount = mesh.faceCount;
    this.edgeList = mesh.edges();
    this.edgeBase = this.vertexCount;
    this.faceBase = this.vertexCount + this.edgeList.length;
    this.outCount = this.faceBase + this.faceCount;

    for (let f = 0; f < this.faceCount; f++) this.faceVerts.push(mesh.faceVerts(f));

    const vf = mesh.vertexFaces();
    const nb = mesh.vertexNeighbors();
    for (let v = 0; v < this.vertexCount; v++) {
      this.vertexFaces.push(vf.get(v) ?? []);
      this.neighbors.push(nb.get(v) ?? []);
      this.sharpAt.push([]);
    }

    const ef = mesh.edgeFaceMap();
    this.edgeSharp = new Float64Array(this.edgeList.length);
    for (let i = 0; i < this.edgeList.length; i++) {
      const [a, b] = this.edgeList[i];
      const key = edgeKey(a, b);
      this.edgeIndex.set(key, i);
      const faces = ef.get(key) ?? [];
      this.edgeFaces.push(faces);
      this.edgeSharp[i] = Math.min(1, mesh.getCrease(a, b));
      // 頂点点の規則で使う「鋭い辺」。境界は鋭さ 1 とみなす
      const sharpness = faces.length === 1 ? 1 : this.edgeSharp[i];
      if (sharpness > 0) {
        this.sharpAt[a].push({ other: b, sharpness });
        this.sharpAt[b].push({ other: a, sharpness });
      }
    }
  }

  /** エッジ (a, b) のエッジ点の出力番号。無ければ -1。 */
  edgePointOf(a: number, b: number): number {
    const i = this.edgeIndex.get(edgeKey(a, b));
    return i === undefined ? -1 : this.edgeBase + i;
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
      const list = this.vertexFaces[v];
      // 面に属さない孤立した頂点は、自分自身だけが動く
      if (!list.length) out.add(v);
      for (const f of list) faces.add(f);
    }
    for (const f of faces) {
      out.add(this.faceBase + f);
      const verts = this.faceVerts[f];
      for (let i = 0; i < verts.length; i++) {
        out.add(verts[i]);
        const e = this.edgeIndex.get(edgeKey(verts[i], verts[(i + 1) % verts.length]));
        if (e !== undefined) out.add(this.edgeBase + e);
      }
    }
    return out;
  }

  /**
   * 細分割後の位置を書く。`subset` を渡すとその出力頂点だけを書き直す。
   * 面点は必要になったぶんだけ倍精度で作る（全部でも一部でも同じ値になる）。
   */
  positions(mesh: Mesh, out: Float32Array, subset?: Iterable<number>): void {
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
      const [a, b] = this.edgeList[i];
      const pa = mesh.getPosition(a);
      const pb = mesh.getPosition(b);
      const mid: Vec3 = [(pa[0] + pb[0]) / 2, (pa[1] + pb[1]) / 2, (pa[2] + pb[2]) / 2];
      const w = (this.edgeBase + i) * 3;
      const faces = this.edgeFaces[i];
      if (faces.length !== 2) {
        out[w] = mid[0];
        out[w + 1] = mid[1];
        out[w + 2] = mid[2];
        return;
      }
      const o0 = faceP(faces[0]);
      const o1 = faceP(faces[1]);
      const sharpness = this.edgeSharp[i];
      for (let k = 0; k < 3; k++) {
        const smooth = (pa[k] + pb[k] + fp[o0 + k] + fp[o1 + k]) / 4;
        out[w + k] = smooth + (mid[k] - smooth) * sharpness;
      }
    };

    const writeVertexPoint = (v: number): void => {
      const P = mesh.getPosition(v);
      const faces = this.vertexFaces[v];
      const n = faces.length;
      const nb = this.neighbors[v];
      const w = v * 3;

      // 滑らかな規則（Catmull-Clark の内部頂点）
      let smooth: Vec3;
      if (!n || !nb.length) {
        smooth = [P[0], P[1], P[2]];
      } else {
        let fx = 0,
          fy = 0,
          fz = 0;
        for (const f of faces) {
          const o = faceP(f);
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
        for (const u of nb) {
          const q = mesh.getPosition(u);
          rx += (P[0] + q[0]) / 2;
          ry += (P[1] + q[1]) / 2;
          rz += (P[2] + q[2]) / 2;
        }
        rx /= nb.length;
        ry /= nb.length;
        rz /= nb.length;
        smooth = [
          (fx + 2 * rx + (n - 3) * P[0]) / n,
          (fy + 2 * ry + (n - 3) * P[1]) / n,
          (fz + 2 * rz + (n - 3) * P[2]) / n,
        ];
      }

      const sharp = this.sharpAt[v];
      if (sharp.length < 2) {
        // 鋭い辺が 1 本以下なら折り目にならない。滑らかな規則のまま
        out[w] = smooth[0];
        out[w + 1] = smooth[1];
        out[w + 2] = smooth[2];
        return;
      }

      // 折り目の規則。鋭い辺が 2 本なら (m1 + m2 + 6P) / 8、3 本以上は角として固定
      let creased: Vec3;
      if (sharp.length >= 3) {
        creased = [P[0], P[1], P[2]];
      } else {
        let sx = 0,
          sy = 0,
          sz = 0;
        for (const e of sharp) {
          const q = mesh.getPosition(e.other);
          sx += (P[0] + q[0]) / 2;
          sy += (P[1] + q[1]) / 2;
          sz += (P[2] + q[2]) / 2;
        }
        creased = [(sx + 6 * P[0]) / 8, (sy + 6 * P[1]) / 8, (sz + 6 * P[2]) / 8];
      }

      // 半端な鋭さは、滑らかな規則と折り目の規則の間を取る（semi-sharp の近似）
      let blend = 0;
      for (const e of sharp) blend += e.sharpness;
      blend = Math.min(1, blend / sharp.length);
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
    for (let i = 0; i < this.edgeList.length; i++) writeEdgePoint(i);
    for (let v = 0; v < this.vertexCount; v++) writeVertexPoint(v);
  }

  /** 細分割したメッシュを作る。UV とクリースも持ち越す。 */
  build(mesh: Mesh): Mesh {
    const pos = new Float32Array(this.outCount * 3);
    this.positions(mesh, pos);

    // 組み立て。頂点の順序を安定させるため、頂点点 → エッジ点 → 面点の順で採番する。
    const b = new MeshBuilder({ weld: false });
    for (let i = 0; i < this.outCount; i++) b.vertex(pos[i * 3], pos[i * 3 + 1], pos[i * 3 + 2]);

    for (let f = 0; f < this.faceCount; f++) {
      const verts = this.faceVerts[f];
      const uvs = faceUvs(mesh, f);
      const group = mesh.polygroup[f];
      const material = mesh.materialId[f];
      const n = verts.length;
      const faceUvAvg = new Map<string, number[]>();
      if (uvs) for (const [name, rows] of uvs) faceUvAvg.set(name, averageUv(rows));
      for (let i = 0; i < n; i++) {
        const v = verts[i];
        const vn = verts[(i + 1) % n];
        const vp = verts[(i - 1 + n) % n];
        let uv: Map<string, number[][]> | undefined;
        if (uvs) {
          uv = new Map();
          for (const [name, rows] of uvs) {
            const cur = rows[i] ?? [0, 0];
            const next = rows[(i + 1) % n] ?? [0, 0];
            const prev = rows[(i - 1 + n) % n] ?? [0, 0];
            uv.set(name, [
              cur,
              [(cur[0] + next[0]) / 2, (cur[1] + next[1]) / 2],
              faceUvAvg.get(name)!,
              [(prev[0] + cur[0]) / 2, (prev[1] + cur[1]) / 2],
            ]);
          }
        }
        b.face([v, this.edgePointOf(v, vn), this.faceBase + f, this.edgePointOf(vp, v)], {
          uv,
          polygroup: group,
          materialId: material,
        });
      }
    }

    const out = b.build();
    // クリースは 1 段ごとに 1 減らし、分割された両側に引き継ぐ（semi-sharp の規則）
    for (const [key, value] of mesh.crease) {
      const next = value - 1;
      if (next <= 0) continue;
      const [a, bb] = key.split("_").map(Number);
      const mid = this.edgePointOf(a, bb);
      if (mid < 0) continue;
      out.setCrease(a, mid, next);
      out.setCrease(mid, bb, next);
    }
    for (const [v, s] of mesh.cornerSharp) {
      const next = s - 1;
      if (next > 0) out.cornerSharp.set(v, next);
    }
    return out;
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
