/**
 * Catmull-Clark 細分割。Maya の Smooth に相当し、docs/03 のマルチ解像度の土台になる。
 *
 * UV は面ごとに線形に細分割する（シームがあっても正しく残る）。
 * クリースは semi-sharp の規則で 1 段ごとに 1 減らす。OpenSubdiv と同じ扱い。
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

export function catmullClark(mesh: Mesh): Mesh {
  const ef = mesh.edgeFaceMap();
  const vertexFaces = mesh.vertexFaces();
  const edges = mesh.edges();

  // 面点
  const facePoint: Vec3[] = [];
  for (let f = 0; f < mesh.faceCount; f++) facePoint.push(mesh.faceCenter(f));

  // エッジ点。内部は (2 頂点 + 2 面点) / 4、境界は中点。
  // クリースが付いているエッジは、鋭さに応じて中点へ寄せる（semi-sharp の近似）。
  const edgePoint = new Map<string, Vec3>();
  for (const [a, b] of edges) {
    const key = edgeKey(a, b);
    const pa = mesh.getPosition(a);
    const pb = mesh.getPosition(b);
    const mid: Vec3 = [(pa[0] + pb[0]) / 2, (pa[1] + pb[1]) / 2, (pa[2] + pb[2]) / 2];
    const faces = ef.get(key) ?? [];
    if (faces.length !== 2) {
      edgePoint.set(key, mid);
      continue;
    }
    const f0 = facePoint[faces[0]];
    const f1 = facePoint[faces[1]];
    const smooth: Vec3 = [
      (pa[0] + pb[0] + f0[0] + f1[0]) / 4,
      (pa[1] + pb[1] + f0[1] + f1[1]) / 4,
      (pa[2] + pb[2] + f0[2] + f1[2]) / 4,
    ];
    const sharpness = Math.min(1, mesh.getCrease(a, b));
    edgePoint.set(key, [
      smooth[0] + (mid[0] - smooth[0]) * sharpness,
      smooth[1] + (mid[1] - smooth[1]) * sharpness,
      smooth[2] + (mid[2] - smooth[2]) * sharpness,
    ]);
  }

  // 頂点ごとの隣接。エッジを毎回なめると頂点数 × エッジ数になるので先に作る
  const neighbors = mesh.vertexNeighbors();

  /**
   * 鋭い辺（境界、またはクリースの付いた辺）の一覧。
   * 境界は鋭さ 1 とみなす。頂点点の規則をどれだけ折り目側へ寄せるかに使う。
   */
  const sharpAt = new Map<number, Array<{ other: number; sharpness: number }>>();
  for (const [a, bb] of edges) {
    const faces = ef.get(edgeKey(a, bb)) ?? [];
    const sharpness = faces.length === 1 ? 1 : Math.min(1, mesh.getCrease(a, bb));
    if (sharpness <= 0) continue;
    for (const [v, w] of [
      [a, bb],
      [bb, a],
    ]) {
      const list = sharpAt.get(v) ?? [];
      list.push({ other: w, sharpness });
      sharpAt.set(v, list);
    }
  }

  // 頂点点
  const vertexPoint: Vec3[] = [];
  for (let v = 0; v < mesh.vertexCount; v++) {
    const P = mesh.getPosition(v);
    const faces = vertexFaces.get(v) ?? [];
    const n = faces.length;
    const nb = neighbors.get(v) ?? [];

    // 滑らかな規則（Catmull-Clark の内部頂点）
    let smooth: Vec3;
    if (!n || !nb.length) {
      smooth = [P[0], P[1], P[2]];
    } else {
      let fx = 0,
        fy = 0,
        fz = 0;
      for (const f of faces) {
        fx += facePoint[f][0];
        fy += facePoint[f][1];
        fz += facePoint[f][2];
      }
      fx /= n;
      fy /= n;
      fz /= n;
      let rx = 0,
        ry = 0,
        rz = 0;
      for (const w of nb) {
        const q = mesh.getPosition(w);
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

    const sharp = sharpAt.get(v) ?? [];
    if (sharp.length < 2) {
      // 鋭い辺が 1 本以下なら折り目にならない。滑らかな規則のまま
      vertexPoint.push(smooth);
      continue;
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
    vertexPoint.push([
      smooth[0] + (creased[0] - smooth[0]) * blend,
      smooth[1] + (creased[1] - smooth[1]) * blend,
      smooth[2] + (creased[2] - smooth[2]) * blend,
    ]);
  }

  // 組み立て。頂点の順序を安定させるため、頂点点 → エッジ点 → 面点の順で採番する。
  const b = new MeshBuilder({ weld: false });
  const vIndex: number[] = [];
  for (const p of vertexPoint) vIndex.push(b.vertex(p[0], p[1], p[2]));
  const eIndex = new Map<string, number>();
  for (const [a, bb] of edges) {
    const key = edgeKey(a, bb);
    const p = edgePoint.get(key)!;
    eIndex.set(key, b.vertex(p[0], p[1], p[2]));
  }
  const fIndex: number[] = [];
  for (const p of facePoint) fIndex.push(b.vertex(p[0], p[1], p[2]));

  for (let f = 0; f < mesh.faceCount; f++) {
    const verts = mesh.faceVerts(f);
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
      b.face([vIndex[v], eIndex.get(edgeKey(v, vn))!, fIndex[f], eIndex.get(edgeKey(vp, v))!], {
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
    const mid = eIndex.get(edgeKey(a, bb));
    if (mid === undefined) continue;
    out.setCrease(vIndex[a], mid, next);
    out.setCrease(mid, vIndex[bb], next);
  }
  for (const [v, s] of mesh.cornerSharp) {
    const next = s - 1;
    if (next > 0) out.cornerSharp.set(vIndex[v], next);
  }
  return out;
}

/** 指定回数だけ細分割する。 */
export function subdivide(mesh: Mesh, levels: number): Mesh {
  let out = mesh;
  for (let i = 0; i < levels; i++) out = catmullClark(out);
  return out;
}
