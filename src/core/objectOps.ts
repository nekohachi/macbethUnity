/**
 * オブジェクトと面のまとまりを扱う操作（`12` の B7）。
 *
 * - `duplicateFaces` … 選んだ面を、その場に切り離した写しとして足す
 * - `extractFaces` … 選んだ面を抜き出して、別のメッシュにする
 * - `combineMeshes` … 複数のメッシュを 1 つにまとめる（トランスフォームを焼き込む）
 * - `separateShells` … 繋がっていない塊ごとに分ける
 * - `mirrorMesh` … 軸で鏡映して繋ぐ
 */
import { Mesh, MeshBuilder, faceUvs } from "./mesh.js";
import type { Transform } from "./document.js";
import { compact } from "./topology.js";
import { mergeByDistance } from "./vertexOps.js";

/** トランスフォームを 1 点に当てる。スケール → 回転 → 平行移動の順。 */
export function transformPoint(t: Transform, x: number, y: number, z: number): [number, number, number] {
  let px = x * t.scale[0];
  let py = y * t.scale[1];
  let pz = z * t.scale[2];
  const [qx, qy, qz, qw] = t.rotation;
  // v + 2q × (q × v + w v)
  const cx = 2 * (qy * pz - qz * py);
  const cy = 2 * (qz * px - qx * pz);
  const cz = 2 * (qx * py - qy * px);
  px += qw * cx + (qy * cz - qz * cy);
  py += qw * cy + (qz * cx - qx * cz);
  pz += qw * cz + (qx * cy - qy * cx);
  return [px + t.position[0], py + t.position[1], pz + t.position[2]];
}

/** 面をそのまま写した組み立て器へ、1 枚積む。 */
function copyFace(b: MeshBuilder, mesh: Mesh, f: number, remap: (v: number) => number): void {
  b.face(mesh.faceVerts(f).map(remap), {
    uv: faceUvs(mesh, f) ?? undefined,
    polygroup: mesh.polygroup[f],
    materialId: mesh.materialId[f],
  });
}

/**
 * 選んだ面を、その場に切り離した写しとして足す（Maya の Duplicate Face）。
 * 写しは元と頂点を共有しないので、そのまま動かせる。
 */
export function duplicateFaces(
  mesh: Mesh,
  faces: Iterable<number>,
): { mesh: Mesh; faces: number[]; verts: number[] } | null {
  const chosen = [...new Set(faces)].filter((f) => f >= 0 && f < mesh.faceCount);
  if (!chosen.length) return null;

  const b = new MeshBuilder({ weld: false });
  for (let v = 0; v < mesh.vertexCount; v++) {
    const p = mesh.getPosition(v);
    b.vertex(p[0], p[1], p[2]);
  }
  for (let f = 0; f < mesh.faceCount; f++) copyFace(b, mesh, f, (v) => v);

  // 写しの頂点は新しく作る（元と繋がっていないこと自体が目的）
  const made = new Map<number, number>();
  const verts: number[] = [];
  const newFaces: number[] = [];
  for (const f of chosen) {
    for (const v of mesh.faceVerts(f)) {
      if (made.has(v)) continue;
      const p = mesh.getPosition(v);
      const index = b.vertex(p[0], p[1], p[2]);
      made.set(v, index);
      verts.push(index);
    }
  }
  for (const f of chosen) {
    const index = mesh.faceCount + newFaces.length;
    copyFace(b, mesh, f, (v) => made.get(v)!);
    newFaces.push(index);
  }

  const out = b.build();
  for (const [key, value] of mesh.crease) {
    const [a, c] = key.split("_").map(Number);
    out.setCrease(a, c, value);
  }
  return { mesh: out, faces: newFaces, verts };
}

/**
 * 選んだ面を抜き出して別のメッシュにする（Maya の Extract）。
 * 残った方も抜いた方も、使われなくなった頂点は詰めて返す。
 */
export function extractFaces(
  mesh: Mesh,
  faces: Iterable<number>,
): { mesh: Mesh; extracted: Mesh; count: number } | null {
  const chosen = new Set([...faces].filter((f) => f >= 0 && f < mesh.faceCount));
  if (!chosen.size || chosen.size === mesh.faceCount) return null;

  const build = (want: (f: number) => boolean): Mesh => {
    const b = new MeshBuilder({ weld: false });
    for (let v = 0; v < mesh.vertexCount; v++) {
      const p = mesh.getPosition(v);
      b.vertex(p[0], p[1], p[2]);
    }
    for (let f = 0; f < mesh.faceCount; f++) if (want(f)) copyFace(b, mesh, f, (v) => v);
    const out = b.build();
    for (const [key, value] of mesh.crease) {
      const [a, c] = key.split("_").map(Number);
      out.setCrease(a, c, value);
    }
    return compact(out);
  };

  return {
    mesh: build((f) => !chosen.has(f)),
    extracted: build((f) => chosen.has(f)),
    count: chosen.size,
  };
}

/**
 * 複数のメッシュを 1 つにまとめる（Maya の Combine）。
 * トランスフォームは頂点に焼き込むので、まとめたあとの原点は世界の原点になる。
 * UV セットはすべての名前の和になり、持っていなかった面は 0 で埋まる。
 */
export function combineMeshes(parts: Array<{ mesh: Mesh; transform?: Transform }>): Mesh | null {
  if (parts.length < 2) return null;
  const names = new Set<string>();
  for (const part of parts) for (const name of part.mesh.uvSets.keys()) names.add(name);

  const b = new MeshBuilder({ weld: false });
  for (const { mesh, transform } of parts) {
    const base = b.vertexCount;
    for (let v = 0; v < mesh.vertexCount; v++) {
      const p = mesh.getPosition(v);
      const w = transform ? transformPoint(transform, p[0], p[1], p[2]) : p;
      b.vertex(w[0], w[1], w[2]);
    }
    for (let f = 0; f < mesh.faceCount; f++) {
      const verts = mesh.faceVerts(f);
      const source = faceUvs(mesh, f);
      let uv: Map<string, number[][]> | undefined;
      if (names.size) {
        uv = new Map();
        for (const name of names) {
          uv.set(name, source?.get(name) ?? verts.map(() => [0, 0]));
        }
      }
      b.face(
        verts.map((v) => base + v),
        { uv, polygroup: mesh.polygroup[f], materialId: mesh.materialId[f] },
      );
    }
  }
  return b.build();
}

/**
 * 繋がっていない塊ごとに分ける（Maya の Separate）。
 * 1 つしか無ければ null。
 */
export function separateShells(mesh: Mesh): Mesh[] | null {
  if (!mesh.faceCount) return null;
  // 頂点を共有する面どうしを union-find でまとめる
  const parent = new Int32Array(mesh.faceCount);
  for (let f = 0; f < mesh.faceCount; f++) parent[f] = f;
  const find = (a: number): number => {
    let root = a;
    while (parent[root] !== root) root = parent[root];
    let cur = a;
    while (parent[cur] !== root) {
      const up = parent[cur];
      parent[cur] = root;
      cur = up;
    }
    return root;
  };
  const owner = new Int32Array(mesh.vertexCount).fill(-1);
  for (let f = 0; f < mesh.faceCount; f++) {
    for (const v of mesh.faceVerts(f)) {
      if (owner[v] < 0) owner[v] = f;
      else {
        const ra = find(owner[v]);
        const rb = find(f);
        if (ra !== rb) parent[rb] = ra;
      }
    }
  }

  const groups = new Map<number, number[]>();
  for (let f = 0; f < mesh.faceCount; f++) {
    const root = find(f);
    const list = groups.get(root);
    if (list) list.push(f);
    else groups.set(root, [f]);
  }
  if (groups.size < 2) return null;

  const out: Mesh[] = [];
  for (const faces of groups.values()) {
    const b = new MeshBuilder({ weld: false });
    for (let v = 0; v < mesh.vertexCount; v++) {
      const p = mesh.getPosition(v);
      b.vertex(p[0], p[1], p[2]);
    }
    for (const f of faces) copyFace(b, mesh, f, (v) => v);
    const built = b.build();
    for (const [key, value] of mesh.crease) {
      const [a, c] = key.split("_").map(Number);
      built.setCrease(a, c, value);
    }
    out.push(compact(built));
  }
  return out;
}

/**
 * 軸で鏡映して繋ぐ（Maya の Mirror Geometry）。
 *
 * `axis` は 0 = X、1 = Y、2 = Z。原点を通る平面で折り返す。
 * 写した側は巻き方向が裏返るので、面の並びをひっくり返して表を揃える。
 * 境目にある頂点（平面から `weld` 以内）は溶接して 1 つにする。
 */
export function mirrorMesh(mesh: Mesh, axis: 0 | 1 | 2, weld = 0.001): { mesh: Mesh; welded: number } | null {
  if (!mesh.vertexCount) return null;
  const b = new MeshBuilder({ weld: false });
  for (let v = 0; v < mesh.vertexCount; v++) {
    const p = mesh.getPosition(v);
    b.vertex(p[0], p[1], p[2]);
  }
  const base = mesh.vertexCount;
  for (let v = 0; v < mesh.vertexCount; v++) {
    const p = mesh.getPosition(v);
    const q: [number, number, number] = [p[0], p[1], p[2]];
    q[axis] = -q[axis];
    b.vertex(q[0], q[1], q[2]);
  }

  for (let f = 0; f < mesh.faceCount; f++) copyFace(b, mesh, f, (v) => v);
  for (let f = 0; f < mesh.faceCount; f++) {
    const verts = mesh.faceVerts(f).map((v) => base + v);
    const source = faceUvs(mesh, f);
    let uv: Map<string, number[][]> | undefined;
    if (source) {
      uv = new Map();
      for (const [name, rows] of source) uv.set(name, [...rows].reverse());
    }
    // 鏡に映すと裏返るので、並びを逆にして表を元と揃える
    b.face(verts.reverse(), { uv, polygroup: mesh.polygroup[f], materialId: mesh.materialId[f] });
  }

  const joined = b.build();
  for (const [key, value] of mesh.crease) {
    const [a, c] = key.split("_").map(Number);
    joined.setCrease(a, c, value);
    joined.setCrease(base + a, base + c, value);
  }

  // 境目だけを溶接の対象にする。離れた所で偶然近い点まで巻き込まないため
  const seam: number[] = [];
  for (let v = 0; v < joined.vertexCount; v++) {
    if (Math.abs(joined.getPosition(v)[axis]) <= weld) seam.push(v);
  }
  const merged = seam.length >= 2 ? mergeByDistance(joined, Math.max(weld, 1e-6), seam) : null;
  return merged
    ? { mesh: compact(merged.mesh), welded: merged.merged }
    : { mesh: joined, welded: 0 };
}
