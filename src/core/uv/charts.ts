/**
 * 切れ目でメッシュを島（チャート）に分ける。`15` の 2 章。
 *
 * 島の中では、切れ目でない辺を共有するコーナーは同じ UV 頂点になる。
 * 切れ目を挟むと同じ 3D 頂点でも UV は別々になる — これが「切る」ということ。
 *
 * 走査の順は面番号・頂点番号でそろえてあり、Map の並びに依存しない。
 * 同じ入力からは必ず同じ島・同じ番号が出る（`15` の「決定的であること」）。
 */
import { Mesh, edgeKey } from "../mesh.js";

/** エッジの識別子。`mesh.ts` の edgeKey と同じ "小_大"。 */
export type EdgeKey = string;
/** コーナーの識別子。"面:面内の位置"。`mesh.uvSets` の単位と 1 対 1。 */
export type CornerKey = string;

export function cornerKey(face: number, index: number): CornerKey {
  return `${face}:${index}`;
}

export function parseCorner(key: CornerKey): [number, number] {
  const at = key.indexOf(":");
  return [Number(key.slice(0, at)), Number(key.slice(at + 1))];
}

export interface Chart {
  /** 島に含まれる面。昇順。 */
  faces: number[];
  /** 島のコーナー。面番号 → 面内の位置の順。 */
  corners: CornerKey[];
  /** 島の縁にある切れ目。昇順。 */
  boundarySeams: EdgeKey[];
  /** 面の集合と縁の切れ目から決まる指紋。手の編集を島に結び付ける鍵。 */
  fingerprint: string;
}

/** FNV-1a。文字列から 32bit。並びを固定してから渡すこと。 */
function hash(text: string): string {
  let h = 0x811c9dc5;
  for (let i = 0; i < text.length; i++) {
    h ^= text.charCodeAt(i);
    h = Math.imul(h, 0x01000193) >>> 0;
  }
  return h.toString(16).padStart(8, "0");
}

/**
 * 島の指紋。面の集合と、その島の縁にある切れ目から作る。
 *
 * 面が増減しても、縁の切れ目が動いても値が変わる。
 * 手で動かした差分をこの値で引くので、**切れ目を変えた島だけ**差分が落ちる。
 */
export function chartFingerprint(faces: number[], boundarySeams: EdgeKey[]): string {
  const f = [...faces].sort((a, b) => a - b).join(",");
  const s = [...boundarySeams].sort().join(",");
  return hash(`${f}|${s}`);
}

/** 面 f のどの位置に頂点 v が居るか。無ければ -1。 */
function indexOfVertex(mesh: Mesh, f: number, v: number): number {
  const start = mesh.faceOffsets[f];
  const end = mesh.faceOffsets[f + 1];
  for (let i = start; i < end; i++) if (mesh.faceCorners[i] === v) return i - start;
  return -1;
}

/**
 * 切れ目で面を島に分ける。
 * 切れ目でない辺を共有する面どうしが同じ島になる。
 */
export function buildCharts(mesh: Mesh, seams: Set<EdgeKey>): Chart[] {
  const ef = mesh.edgeFaceMap();
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

  for (const [key, faces] of ef) {
    if (faces.length !== 2 || seams.has(key)) continue;
    const ra = find(faces[0]);
    const rb = find(faces[1]);
    if (ra !== rb) parent[Math.max(ra, rb)] = Math.min(ra, rb);
  }

  // 根の小さい順に並べる。Map の走査順に依存させない
  const groups = new Map<number, number[]>();
  for (let f = 0; f < mesh.faceCount; f++) {
    const root = find(f);
    const list = groups.get(root);
    if (list) list.push(f);
    else groups.set(root, [f]);
  }

  const out: Chart[] = [];
  for (const root of [...groups.keys()].sort((a, b) => a - b)) {
    const faces = groups.get(root)!;
    const corners: CornerKey[] = [];
    const inChart = new Set(faces);
    const boundary = new Set<EdgeKey>();
    for (const f of faces) {
      const n = mesh.faceSize(f);
      for (let i = 0; i < n; i++) corners.push(cornerKey(f, i));
      const verts = mesh.faceVerts(f);
      for (let i = 0; i < n; i++) {
        const key = edgeKey(verts[i], verts[(i + 1) % n]);
        // 縁 = 切れ目、または島の外と接している辺
        const nb = ef.get(key) ?? [];
        if (seams.has(key) || nb.length !== 2 || !nb.every((g) => inChart.has(g))) boundary.add(key);
      }
    }
    const boundarySeams = [...boundary].sort();
    out.push({ faces, corners, boundarySeams, fingerprint: chartFingerprint(faces, boundarySeams) });
  }
  return out;
}

export interface ChartMesh {
  /** 島内の UV 頂点数。 */
  count: number;
  /** 3 × 三角形数。島内の番号。 */
  tri: Uint32Array;
  /** 島内の UV 頂点 → 3D の位置（3 × count）。 */
  positions: Float64Array;
  /** コーナー → 島内の UV 頂点番号。 */
  localOf: Map<CornerKey, number>;
  /** 島内の UV 頂点 → 元のメッシュ頂点。 */
  vertexOf: Int32Array;
}

/**
 * 島を「UV 頂点」に詰め直して三角形にする。
 *
 * 切れ目でない辺を共有するコーナーだけを 1 つの UV 頂点にまとめる。
 * n 角形は扇で三角形に割る（解くときだけ。結果はコーナーへ書き戻す）。
 */
export function chartMesh(mesh: Mesh, chart: Chart, seams: Set<EdgeKey>): ChartMesh {
  const ef = mesh.edgeFaceMap();
  const inChart = new Set(chart.faces);

  // コーナーを 0.. に並べ、切れ目でない辺の両側をまとめる
  const index = new Map<CornerKey, number>();
  chart.corners.forEach((key, i) => index.set(key, i));
  const parent = new Int32Array(chart.corners.length);
  for (let i = 0; i < parent.length; i++) parent[i] = i;
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
  const union = (a: number, b: number): void => {
    const ra = find(a);
    const rb = find(b);
    if (ra !== rb) parent[Math.max(ra, rb)] = Math.min(ra, rb);
  };

  for (const f of chart.faces) {
    const verts = mesh.faceVerts(f);
    for (let i = 0; i < verts.length; i++) {
      const a = verts[i];
      const b = verts[(i + 1) % verts.length];
      const key = edgeKey(a, b);
      if (seams.has(key)) continue;
      const faces = ef.get(key) ?? [];
      if (faces.length !== 2) continue;
      const g = faces[0] === f ? faces[1] : faces[0];
      if (g === f || !inChart.has(g)) continue;
      // 辺の両端を、隣の面の同じ頂点のコーナーと結ぶ
      for (const [v, at] of [
        [a, i],
        [b, (i + 1) % verts.length],
      ]) {
        const there = indexOfVertex(mesh, g, v);
        if (there < 0) continue;
        const here = index.get(cornerKey(f, at));
        const other = index.get(cornerKey(g, there));
        if (here !== undefined && other !== undefined) union(here, other);
      }
    }
  }

  // 根に通し番号を振る。根は昇順なので番号も安定する
  const idOfRoot = new Map<number, number>();
  const localOf = new Map<CornerKey, number>();
  const vertexList: number[] = [];
  for (let i = 0; i < chart.corners.length; i++) {
    const root = find(i);
    let id = idOfRoot.get(root);
    if (id === undefined) {
      id = idOfRoot.size;
      idOfRoot.set(root, id);
      const [f, at] = parseCorner(chart.corners[i]);
      vertexList.push(mesh.faceVerts(f)[at]);
    }
    localOf.set(chart.corners[i], id);
  }

  const count = idOfRoot.size;
  const positions = new Float64Array(count * 3);
  const vertexOf = new Int32Array(count);
  for (let i = 0; i < count; i++) {
    const v = vertexList[i];
    vertexOf[i] = v;
    positions[i * 3] = mesh.positions[v * 3];
    positions[i * 3 + 1] = mesh.positions[v * 3 + 1];
    positions[i * 3 + 2] = mesh.positions[v * 3 + 2];
  }

  const tri: number[] = [];
  for (const f of chart.faces) {
    const n = mesh.faceSize(f);
    const local: number[] = [];
    for (let i = 0; i < n; i++) local.push(localOf.get(cornerKey(f, i))!);
    for (let i = 1; i < n - 1; i++) tri.push(local[0], local[i], local[i + 1]);
  }

  return { count, tri: Uint32Array.from(tri), positions, localOf, vertexOf };
}
