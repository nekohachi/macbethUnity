/**
 * トポロジ編集。docs/11 の要求どおり、すべての操作で UV を持ち越す。
 * UV はコーナー単位なので、面ごとに読んで新しい面へ配る。
 */
import { Mesh, MeshBuilder, edgeKey, faceUvs } from "./mesh.js";

export interface StripRecord {
  face: number;
  /** 入口エッジ（この向きで t を測る） */
  a: number;
  b: number;
  t: number;
  /** 出口エッジは (d, c)。同じ t で測る。 */
  c: number;
  d: number;
  /** 面の中でのコーナー位置。UV の補間に使う。 */
  ia: number;
  ib: number;
  ic: number;
  id: number;
}

/**
 * 四角形ストリップをたどる。マルチカット（エッジループ挿入）とエッジリング選択で共有。
 */
export function loopStrip(mesh: Mesh, ea: number, eb: number, t: number): StripRecord[] {
  const ef = mesh.edgeFaceMap();
  const strip: StripRecord[] = [];
  const seenFace = new Set<number>();

  const walk = (a: number, b: number, tt: number, fromFace: number, forward: boolean): void => {
    for (let guard = 0; guard < 100000; guard++) {
      const faces = ef.get(edgeKey(a, b)) ?? [];
      const f = faces.find((x) => x !== fromFace);
      if (f === undefined || seenFace.has(f)) return;
      const verts = mesh.faceVerts(f);
      if (verts.length !== 4) return;
      seenFace.add(f);
      let idx = -1;
      let aa = a,
        bb = b,
        tv = tt;
      for (let i = 0; i < 4; i++) {
        if (verts[i] === a && verts[(i + 1) % 4] === b) {
          idx = i;
          break;
        }
      }
      if (idx < 0) {
        for (let i = 0; i < 4; i++) {
          if (verts[i] === b && verts[(i + 1) % 4] === a) {
            idx = i;
            aa = b;
            bb = a;
            tv = 1 - tt;
            break;
          }
        }
      }
      if (idx < 0) return;
      const ic = (idx + 2) % 4;
      const id = (idx + 3) % 4;
      const rec: StripRecord = {
        face: f,
        a: aa,
        b: bb,
        t: tv,
        c: verts[ic],
        d: verts[id],
        ia: idx,
        ib: (idx + 1) % 4,
        ic,
        id,
      };
      if (forward) strip.push(rec);
      else strip.unshift(rec);
      fromFace = f;
      a = rec.d;
      b = rec.c;
      tt = tv;
    }
  };

  walk(ea, eb, t, -1, true);
  walk(eb, ea, 1 - t, strip.length ? strip[0].face : -1, false);
  return strip;
}

/** 分割点。エッジフローが有効なら頂点法線から三次ベジエ（PN エッジ）で曲げる。 */
export function splitPoint(
  mesh: Mesh,
  a: number,
  b: number,
  t: number,
  flow: boolean,
  vn: Float32Array | null,
): [number, number, number] {
  const p1 = mesh.getPosition(a);
  const p2 = mesh.getPosition(b);
  if (!flow || !vn) {
    return [p1[0] + (p2[0] - p1[0]) * t, p1[1] + (p2[1] - p1[1]) * t, p1[2] + (p2[2] - p1[2]) * t];
  }
  const n1: [number, number, number] = [vn[a * 3], vn[a * 3 + 1], vn[a * 3 + 2]];
  const n2: [number, number, number] = [vn[b * 3], vn[b * 3 + 1], vn[b * 3 + 2]];
  const d: [number, number, number] = [p2[0] - p1[0], p2[1] - p1[1], p2[2] - p1[2]];
  const w12 = d[0] * n1[0] + d[1] * n1[1] + d[2] * n1[2];
  const w21 = -(d[0] * n2[0] + d[1] * n2[1] + d[2] * n2[2]);
  const out: [number, number, number] = [0, 0, 0];
  const u = 1 - t;
  for (let k = 0; k < 3; k++) {
    const b210 = (2 * p1[k] + p2[k] - w12 * n1[k]) / 3;
    const b120 = (2 * p2[k] + p1[k] - w21 * n2[k]) / 3;
    out[k] = u * u * u * p1[k] + 3 * u * u * t * b210 + 3 * u * t * t * b120 + t * t * t * p2[k];
  }
  return out;
}

/** 予測線用。ループに沿った点列をローカル座標で返す。 */
export function loopPreviewPoints(
  mesh: Mesh,
  ea: number,
  eb: number,
  t: number,
  flow: boolean,
): { points: Array<[number, number, number]>; faceCount: number } | null {
  const strip = loopStrip(mesh, ea, eb, t);
  if (!strip.length) return null;
  const vn = flow ? mesh.vertexNormals() : null;
  const points: Array<[number, number, number]> = [splitPoint(mesh, strip[0].a, strip[0].b, strip[0].t, flow, vn)];
  for (const r of strip) points.push(splitPoint(mesh, r.d, r.c, r.t, flow, vn));
  return { points, faceCount: strip.length };
}

/**
 * エッジループの挿入。UV も同じ比率で補間して持ち越す。
 */
export function insertEdgeLoop(
  mesh: Mesh,
  ea: number,
  eb: number,
  t: number,
  flow = false,
): { mesh: Mesh; faceCount: number } | null {
  const strip = loopStrip(mesh, ea, eb, t);
  if (!strip.length) return null;
  const vn = flow ? mesh.vertexNormals() : null;
  const replaced = new Map<number, StripRecord>();
  for (const r of strip) replaced.set(r.face, r);

  const b = new MeshBuilder({ weld: false });
  for (let v = 0; v < mesh.vertexCount; v++) {
    const p = mesh.getPosition(v);
    b.vertex(p[0], p[1], p[2]);
  }
  // 分割頂点は「エッジごとに 1 つ」。隣り合う面が同じ頂点を共有する。
  const splitOf = new Map<string, number>();
  const splitVert = (a: number, bb: number, tt: number): number => {
    const lo = Math.min(a, bb);
    const hi = Math.max(a, bb);
    const k = `${lo}_${hi}`;
    const found = splitOf.get(k);
    if (found !== undefined) return found;
    const p = splitPoint(mesh, a, bb, tt, flow, vn);
    const idx = b.vertex(p[0], p[1], p[2]);
    splitOf.set(k, idx);
    return idx;
  };

  for (let f = 0; f < mesh.faceCount; f++) {
    const r = replaced.get(f);
    const uvs = faceUvs(mesh, f);
    const group = mesh.polygroup[f];
    const material = mesh.materialId[f];
    if (!r) {
      b.face(mesh.faceVerts(f), { uv: uvs ?? undefined, polygroup: group, materialId: material });
      continue;
    }
    const m1 = splitVert(r.a, r.b, r.t);
    const m2 = splitVert(r.d, r.c, r.t);
    // UV も同じ比率で。面ごとのコーナー UV を使うのでシームがあっても正しい。
    const mkUv = (rows: Array<number | [number, number]>): Map<string, number[][]> | undefined => {
      if (!uvs) return undefined;
      const out = new Map<string, number[][]>();
      for (const [name, src] of uvs) {
        out.set(
          name,
          rows.map((spec) => {
            if (typeof spec === "number") return src[spec] ?? [0, 0];
            const [ia, ib] = spec;
            const ua = src[ia] ?? [0, 0];
            const ub = src[ib] ?? [0, 0];
            return [ua[0] + (ub[0] - ua[0]) * r.t, ua[1] + (ub[1] - ua[1]) * r.t];
          }),
        );
      }
      return out;
    };
    // [a, m1, m2, d] と [m1, b, c, m2]。m1 は a→b の t、m2 は d→c の t。
    b.face([r.a, m1, m2, r.d], {
      uv: mkUv([r.ia, [r.ia, r.ib], [r.id, r.ic], r.id]),
      polygroup: group,
      materialId: material,
    });
    b.face([m1, r.b, r.c, m2], {
      uv: mkUv([[r.ia, r.ib], r.ib, r.ic, [r.id, r.ic]]),
      polygroup: group,
      materialId: material,
    });
  }

  const out = b.build();
  // クリースは頂点ペアで持っているので、分割されていないエッジのぶんを引き継ぐ
  for (const [key, value] of mesh.crease) {
    const [a, bb] = key.split("_").map(Number);
    if (!splitOf.has(`${Math.min(a, bb)}_${Math.max(a, bb)}`)) out.setCrease(a, bb, value);
  }
  for (const [v, s] of mesh.cornerSharp) out.cornerSharp.set(v, s);
  return { mesh: out, faceCount: strip.length };
}

/** 面の押し出し。選択面をまとめて 1 つの領域として扱い、境界に側面を張る。 */
export function extrudeFaces(
  mesh: Mesh,
  faceSet: Iterable<number>,
  distance: number,
): { mesh: Mesh; faceCount: number } | null {
  const sel = Array.from(new Set(faceSet));
  if (!sel.length) return null;
  const selSet = new Set(sel);

  // 押し出し方向は選択面の法線の平均
  let nx = 0,
    ny = 0,
    nz = 0;
  for (const f of sel) {
    const n = mesh.faceNormal(f);
    nx += n[0];
    ny += n[1];
    nz += n[2];
  }
  const len = Math.hypot(nx, ny, nz) || 1;
  nx /= len;
  ny /= len;
  nz /= len;

  const b = new MeshBuilder({ weld: false });
  for (let v = 0; v < mesh.vertexCount; v++) {
    const p = mesh.getPosition(v);
    b.vertex(p[0], p[1], p[2]);
  }
  const used = new Set<number>();
  for (const f of sel) for (const v of mesh.faceVerts(f)) used.add(v);
  const remap = new Map<number, number>();
  for (const v of used) {
    const p = mesh.getPosition(v);
    remap.set(v, b.vertex(p[0] + nx * distance, p[1] + ny * distance, p[2] + nz * distance));
  }

  // 選択領域の境界エッジ（選択面のうち 1 つだけが使うエッジ）
  const borderCount = new Map<string, number>();
  for (const f of sel) {
    const verts = mesh.faceVerts(f);
    for (let i = 0; i < verts.length; i++) {
      const k = edgeKey(verts[i], verts[(i + 1) % verts.length]);
      borderCount.set(k, (borderCount.get(k) ?? 0) + 1);
    }
  }

  const sideFaces: Array<{ verts: number[]; uv?: Map<string, number[][]>; group: number; material: number }> = [];
  for (let f = 0; f < mesh.faceCount; f++) {
    const uvs = faceUvs(mesh, f);
    const group = mesh.polygroup[f];
    const material = mesh.materialId[f];
    const verts = mesh.faceVerts(f);
    if (!selSet.has(f)) {
      b.face(verts, { uv: uvs ?? undefined, polygroup: group, materialId: material });
      continue;
    }
    // 選択面自体は押し出した頂点に張り替える。UV はそのまま。
    b.face(
      verts.map((v) => remap.get(v)!),
      { uv: uvs ?? undefined, polygroup: group, materialId: material },
    );
    for (let i = 0; i < verts.length; i++) {
      const a = verts[i];
      const bb = verts[(i + 1) % verts.length];
      if (borderCount.get(edgeKey(a, bb)) !== 1) continue;
      // 側面。UV は境界コーナーの UV を上下に繰り返す（要再展開なので簡易）
      let uv: Map<string, number[][]> | undefined;
      if (uvs) {
        uv = new Map();
        for (const [name, src] of uvs) {
          const ua = src[i] ?? [0, 0];
          const ub = src[(i + 1) % verts.length] ?? [0, 0];
          uv.set(name, [ua, ub, ub, ua]);
        }
      }
      sideFaces.push({ verts: [a, bb, remap.get(bb)!, remap.get(a)!], uv, group, material });
    }
  }
  for (const s of sideFaces) b.face(s.verts, { uv: s.uv, polygroup: s.group, materialId: s.material });

  const out = b.build();
  for (const [key, value] of mesh.crease) {
    const [a, bb] = key.split("_").map(Number);
    out.setCrease(a, bb, value);
  }
  return { mesh: out, faceCount: sel.length };
}

/**
 * エッジの押し出し。共有する頂点は一度だけ複製するので、連続したエッジは一枚の帯になる。
 * 新しく出来たエッジを newEdges で返す（押し出し直後にそれを選択し直すため）。
 */
export function extrudeEdges(
  mesh: Mesh,
  edges: Array<[number, number]>,
  distance: number,
): { mesh: Mesh; newEdges: Array<[number, number]>; faceCount: number } | null {
  if (!edges.length) return null;
  const ef = mesh.edgeFaceMap();
  const fn = mesh.faceNormals();

  let nx = 0,
    ny = 0,
    nz = 0;
  for (const [a, bb] of edges) {
    for (const f of ef.get(edgeKey(a, bb)) ?? []) {
      nx += fn[f * 3];
      ny += fn[f * 3 + 1];
      nz += fn[f * 3 + 2];
    }
  }
  const len = Math.hypot(nx, ny, nz);
  if (len < 1e-6) {
    nx = 0;
    ny = 1;
    nz = 0;
  } else {
    nx /= len;
    ny /= len;
    nz /= len;
  }

  const b = new MeshBuilder({ weld: false });
  for (let v = 0; v < mesh.vertexCount; v++) {
    const p = mesh.getPosition(v);
    b.vertex(p[0], p[1], p[2]);
  }
  const used = new Set<number>();
  for (const [a, bb] of edges) {
    used.add(a);
    used.add(bb);
  }
  const remap = new Map<number, number>();
  for (const v of used) {
    const p = mesh.getPosition(v);
    remap.set(v, b.vertex(p[0] + nx * distance, p[1] + ny * distance, p[2] + nz * distance));
  }

  for (let f = 0; f < mesh.faceCount; f++) {
    b.face(mesh.faceVerts(f), {
      uv: faceUvs(mesh, f) ?? undefined,
      polygroup: mesh.polygroup[f],
      materialId: mesh.materialId[f],
    });
  }
  // 隣接面での向きと逆向きに張ると法線が揃う
  for (const [a, bb] of edges) {
    const faces = ef.get(edgeKey(a, bb)) ?? [];
    let forward = true;
    if (faces.length) {
      const verts = mesh.faceVerts(faces[0]);
      for (let i = 0; i < verts.length; i++) {
        if (verts[i] === a && verts[(i + 1) % verts.length] === bb) {
          forward = false;
          break;
        }
      }
    }
    if (forward) b.face([a, bb, remap.get(bb)!, remap.get(a)!]);
    else b.face([bb, a, remap.get(a)!, remap.get(bb)!]);
  }

  const out = b.build();
  for (const [key, value] of mesh.crease) {
    const [a, bb] = key.split("_").map(Number);
    out.setCrease(a, bb, value);
  }
  return {
    mesh: out,
    newEdges: edges.map(([a, bb]) => [remap.get(a)!, remap.get(bb)!] as [number, number]),
    faceCount: edges.length,
  };
}

/**
 * 頂点の統合。groups の各組を 1 頂点に溶接する。
 * 潰れた面（3 頂点未満になったもの）は落とす。
 */
export function weldVertices(mesh: Mesh, groups: number[][]): Mesh {
  const target = new Map<number, string>();
  const made = new Map<string, [number, number, number]>();
  groups.forEach((g, gi) => {
    let x = 0,
      y = 0,
      z = 0;
    for (const v of g) {
      const p = mesh.getPosition(v);
      x += p[0];
      y += p[1];
      z += p[2];
    }
    const key = `g${gi}`;
    made.set(key, [x / g.length, y / g.length, z / g.length]);
    for (const v of g) target.set(v, key);
  });

  const b = new MeshBuilder({ weld: false });
  const index = new Map<string, number>();
  const outIndex = (v: number): number => {
    const key = target.get(v) ?? `v${v}`;
    const found = index.get(key);
    if (found !== undefined) return found;
    const p = target.has(v) ? made.get(target.get(v)!)! : mesh.getPosition(v);
    const idx = b.vertex(p[0], p[1], p[2]);
    index.set(key, idx);
    return idx;
  };
  for (let f = 0; f < mesh.faceCount; f++) {
    b.face(
      mesh.faceVerts(f).map(outIndex),
      { uv: faceUvs(mesh, f) ?? undefined, polygroup: mesh.polygroup[f], materialId: mesh.materialId[f] },
    );
  }
  return b.build();
}

/** 共有エッジ (u, v) をまたいで面 A と B を 1 枚に結合する。向きが揃わなければ null。 */
export function mergeFacesAcrossEdge(A: number[], B: number[], u: number, v: number): number[] | null {
  let i = -1;
  let p = -1,
    q = -1;
  for (let k = 0; k < A.length; k++) {
    const a = A[k];
    const b = A[(k + 1) % A.length];
    if ((a === u && b === v) || (a === v && b === u)) {
      i = k;
      p = a;
      q = b;
      break;
    }
  }
  if (i < 0) return null;
  const rotA: number[] = [];
  for (let k = 0; k < A.length; k++) rotA.push(A[(i + 1 + k) % A.length]); // q ... p
  let source = B;
  let j = -1;
  for (let k = 0; k < B.length; k++) {
    if (B[k] === q && B[(k + 1) % B.length] === p) {
      j = k;
      break;
    }
  }
  if (j < 0) {
    const rev = [...B].reverse();
    for (let k = 0; k < rev.length; k++) {
      if (rev[k] === q && rev[(k + 1) % rev.length] === p) {
        j = k;
        source = rev;
        break;
      }
    }
    if (j < 0) return null;
  }
  const rotB: number[] = [];
  for (let k = 0; k < source.length; k++) rotB.push(source[(j + 1 + k) % source.length]); // p ... q
  return [...rotA, ...rotB.slice(1, rotB.length - 1)];
}

/** 選択エッジの削除。両側の面を 1 枚に結合する（Maya の Delete Edge）。 */
export function dissolveEdges(mesh: Mesh, edges: Array<[number, number]>): { mesh: Mesh; merged: number } | null {
  let faces: number[][] = [];
  for (let f = 0; f < mesh.faceCount; f++) faces.push(mesh.faceVerts(f));
  const groups = Array.from(mesh.polygroup);
  const materials = Array.from(mesh.materialId);
  let merged = 0;

  for (const [a, bb] of edges) {
    // 面の並びが変わるので都度 edgeFaceMap を作り直す
    const ef = new Map<string, number[]>();
    faces.forEach((verts, f) => {
      for (let i = 0; i < verts.length; i++) {
        const k = edgeKey(verts[i], verts[(i + 1) % verts.length]);
        const list = ef.get(k);
        if (list) list.push(f);
        else ef.set(k, [f]);
      }
    });
    const fs = ef.get(edgeKey(a, bb)) ?? [];
    if (fs.length !== 2) continue;
    const result = mergeFacesAcrossEdge(faces[fs[0]], faces[fs[1]], a, bb);
    if (!result || result.length < 3) continue;
    faces[fs[0]] = result;
    faces.splice(fs[1], 1);
    groups.splice(fs[1], 1);
    materials.splice(fs[1], 1);
    merged++;
  }
  if (!merged) return null;

  const b = new MeshBuilder({ weld: false });
  for (let v = 0; v < mesh.vertexCount; v++) {
    const p = mesh.getPosition(v);
    b.vertex(p[0], p[1], p[2]);
  }
  faces.forEach((verts, i) => {
    b.face(verts, { polygroup: groups[i] ?? 0, materialId: materials[i] ?? 0 });
  });
  return { mesh: b.build(), merged };
}

/**
 * 面を消す。頂点はそのまま残すので、消したあとに compact を呼ぶと詰められる。
 * UV とクリースは残った面のぶんを持ち越す。
 */
export function deleteFaces(mesh: Mesh, faces: Iterable<number>): { mesh: Mesh; removed: number } | null {
  const remove = new Set(faces);
  if (!remove.size) return null;
  const b = new MeshBuilder({ weld: false });
  for (let v = 0; v < mesh.vertexCount; v++) {
    const p = mesh.getPosition(v);
    b.vertex(p[0], p[1], p[2]);
  }
  let removed = 0;
  for (let f = 0; f < mesh.faceCount; f++) {
    if (remove.has(f)) {
      removed++;
      continue;
    }
    b.face(mesh.faceVerts(f), {
      uv: faceUvs(mesh, f) ?? undefined,
      polygroup: mesh.polygroup[f],
      materialId: mesh.materialId[f],
    });
  }
  if (!removed) return null;
  const out = b.build();
  for (const [key, value] of mesh.crease) {
    const [a, bb] = key.split("_").map(Number);
    out.setCrease(a, bb, value);
  }
  return { mesh: out, removed };
}

/**
 * 選んだ面をそれぞれ 1 点に潰す（コラプス）。
 * 面ごとに頂点をまとめて溶接するので、面は消えて周りが繋がる。
 */
export function collapseFaces(mesh: Mesh, faces: Iterable<number>): Mesh | null {
  const groups: number[][] = [];
  for (const f of faces) {
    if (f < mesh.faceCount) groups.push(mesh.faceVerts(f));
  }
  if (!groups.length) return null;
  return weldVertices(mesh, groups);
}

/** 使われていない頂点を取り除き、インデックスを詰める。 */
export function compact(mesh: Mesh): Mesh {
  const used = new Set<number>();
  for (let i = 0; i < mesh.faceCorners.length; i++) used.add(mesh.faceCorners[i]);
  if (used.size === mesh.vertexCount) return mesh;
  const b = new MeshBuilder({ weld: false });
  const remap = new Map<number, number>();
  for (let v = 0; v < mesh.vertexCount; v++) {
    if (!used.has(v)) continue;
    const p = mesh.getPosition(v);
    remap.set(v, b.vertex(p[0], p[1], p[2]));
  }
  for (let f = 0; f < mesh.faceCount; f++) {
    b.face(
      mesh.faceVerts(f).map((v) => remap.get(v)!),
      { uv: faceUvs(mesh, f) ?? undefined, polygroup: mesh.polygroup[f], materialId: mesh.materialId[f] },
    );
  }
  const out = b.build();
  for (const [key, value] of mesh.crease) {
    const [a, bb] = key.split("_").map(Number);
    const ra = remap.get(a);
    const rb = remap.get(bb);
    if (ra !== undefined && rb !== undefined) out.setCrease(ra, rb, value);
  }
  return out;
}
