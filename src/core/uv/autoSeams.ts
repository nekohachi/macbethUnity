/**
 * 経験則の切れ目（`15` の 4 章、`16` の C2）。
 *
 * 「いい感じに開く」の中身。4 つの規則で切れ目を置いてから、大きすぎる島を
 * 育てて分け、最後に閉じた島へ 1 本通す（閉じたままだと平らにできない）。
 *
 * 参考にしたのは **考え方だけ**。xatlas のチャート育成と Maya の自動 UV の
 * 振る舞いを見て、同じ順序で組み直した。コードは見ていない（`01`）。
 */
import { Mesh, edgeKey } from "../mesh.js";
import { buildCharts } from "./charts.js";
import type { EdgeKey } from "./charts.js";

export interface AutoSeamParams {
  /** 二面角がこれを超えたら切れ目（度）。 */
  angle: number;
  useHardEdges: boolean;
  useCreases: boolean;
  usePolygroups: boolean;
  /** X で鏡映して揃える。 */
  symmetric: boolean;
}

/** 辺 → その辺を挟む面（2 枚とは限らない）。 */
function edgeFaces(mesh: Mesh): Map<EdgeKey, number[]> {
  const map = new Map<EdgeKey, number[]>();
  for (let f = 0; f < mesh.faceCount; f++) {
    const verts = mesh.faceVerts(f);
    for (let i = 0; i < verts.length; i++) {
      const key = edgeKey(verts[i], verts[(i + 1) % verts.length]);
      const list = map.get(key);
      if (list) list.push(f);
      else map.set(key, [f]);
    }
  }
  return map;
}

function dot(a: [number, number, number], b: [number, number, number]): number {
  return a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
}

/**
 * 経験則で切れ目を置く。結果は決定的（辺の並び順に依らない）。
 *
 * `smoothAngle` は 3D の表示と同じスムージング角度。ハードエッジの判定に使う。
 */
export function autoSeams(mesh: Mesh, params: AutoSeamParams, smoothAngle: number): Set<EdgeKey> {
  const seams = new Set<EdgeKey>();
  if (mesh.faceCount === 0) return seams;

  const faces = edgeFaces(mesh);
  const normals: Array<[number, number, number]> = [];
  for (let f = 0; f < mesh.faceCount; f++) normals.push(mesh.faceNormal(f));

  const angleCos = Math.cos((Math.max(0, Math.min(180, params.angle)) * Math.PI) / 180);
  const hardCos = Math.cos((Math.max(0, Math.min(180, smoothAngle)) * Math.PI) / 180);

  // 1. 角度・ハードエッジ・クリース・ポリグループ
  for (const key of [...faces.keys()].sort()) {
    const uses = faces.get(key)!;
    // 境界（面 1 枚）はそもそも島の縁なので、切れ目にする必要がない
    if (uses.length !== 2) continue;
    const [a, b] = uses;
    const cos = dot(normals[a], normals[b]);
    if (cos < angleCos) {
      seams.add(key);
      continue;
    }
    if (params.useHardEdges && cos < hardCos) {
      seams.add(key);
      continue;
    }
    if (params.useCreases && (mesh.crease.get(key) ?? 0) > 0) {
      seams.add(key);
      continue;
    }
    if (params.usePolygroups && mesh.polygroup[a] !== mesh.polygroup[b]) {
      seams.add(key);
    }
  }

  // 2. 大きすぎる島を分ける。3. どの島も円盤になるまで割る
  splitLargeCharts(mesh, seams, normals, faces);
  ensureDisks(mesh, seams, normals, faces);

  // 4. 対称なら X で鏡映して和を取る
  if (params.symmetric) mirrorSeams(mesh, seams);
  return seams;
}

/**
 * 大きすぎる島（面数が全体の 1/3 を超える、または法線のばらつきが 120° を
 * 超える）を、法線のいちばん離れた 2 面から育てて 2 つに分ける。
 */
function splitLargeCharts(
  mesh: Mesh,
  seams: Set<EdgeKey>,
  normals: Array<[number, number, number]>,
  faces: Map<EdgeKey, number[]>,
): void {
  // 分けるたびに島が変わるので、何度か繰り返す（増えすぎないよう上限を置く）
  for (let round = 0; round < 4; round++) {
    const charts = buildCharts(mesh, seams);
    let split = false;
    for (const chart of charts) {
      if (chart.faces.length < 4) continue;
      // spread は「いちばん離れた 2 面の法線の cos」。小さいほど開いている
      const tooBig = chart.faces.length > mesh.faceCount / 3;
      const tooSpread = normalSpread(chart.faces, normals) < Math.cos((120 * Math.PI) / 180);
      if (!tooBig && !tooSpread) continue;
      if (growAndCut(chart.faces, seams, normals, faces)) split = true;
    }
    if (!split) return;
  }
}

/** 島の中で、法線がいちばん離れた 2 面の cos。小さいほど開いている。 */
function normalSpread(faces: number[], normals: Array<[number, number, number]>): number {
  let worst = 1;
  // 全組み合わせは面数が多いと重いので、最初の面から遠い面を種にして 2 段で探す
  const first = faces[0];
  let far = first;
  for (const f of faces) {
    const c = dot(normals[first], normals[f]);
    if (c < worst) {
      worst = c;
      far = f;
    }
  }
  let worst2 = 1;
  for (const f of faces) worst2 = Math.min(worst2, dot(normals[far], normals[f]));
  return Math.min(worst, worst2);
}

/**
 * 島を 2 つに育て分けて、境目に切れ目を足す。
 * 種は法線がいちばん離れた 2 面。面はどちらか近いほうへ順に取り込む。
 */
function growAndCut(
  chartFaces: number[],
  seams: Set<EdgeKey>,
  normals: Array<[number, number, number]>,
  faces: Map<EdgeKey, number[]>,
): boolean {
  const set = new Set(chartFaces);
  const sorted = [...chartFaces].sort((a, b) => a - b);
  // 種を選ぶ
  const first = sorted[0];
  let seedA = first;
  let worst = 1;
  for (const f of sorted) {
    const c = dot(normals[first], normals[f]);
    if (c < worst) {
      worst = c;
      seedA = f;
    }
  }
  let seedB = seedA;
  worst = 1;
  for (const f of sorted) {
    const c = dot(normals[seedA], normals[f]);
    if (c < worst) {
      worst = c;
      seedB = f;
    }
  }
  if (seedA === seedB) return false;

  // 隣接（この島の中だけ、切れ目は越えない）
  const neighbors = new Map<number, number[]>();
  for (const [key, uses] of faces) {
    if (uses.length !== 2 || seams.has(key)) continue;
    const [a, b] = uses;
    if (!set.has(a) || !set.has(b)) continue;
    for (const [x, y] of [
      [a, b],
      [b, a],
    ]) {
      const list = neighbors.get(x);
      if (list) list.push(y);
      else neighbors.set(x, [y]);
    }
  }

  // 2 つの種から交互に育てる。近い法線のほうへ吸い寄せる
  const side = new Map<number, 0 | 1>();
  side.set(seedA, 0);
  side.set(seedB, 1);
  const queue: number[] = [seedA, seedB];
  while (queue.length) {
    const f = queue.shift()!;
    for (const n of (neighbors.get(f) ?? []).sort((x, y) => x - y)) {
      if (side.has(n)) continue;
      // 種の法線が近いほうへ入れる
      const toA = dot(normals[n], normals[seedA]);
      const toB = dot(normals[n], normals[seedB]);
      side.set(n, toA >= toB ? 0 : 1);
      queue.push(n);
    }
  }

  // 境目に切れ目を足す
  let added = 0;
  for (const key of [...faces.keys()].sort()) {
    const uses = faces.get(key)!;
    if (uses.length !== 2 || seams.has(key)) continue;
    const [a, b] = uses;
    if (!set.has(a) || !set.has(b)) continue;
    const sa = side.get(a);
    const sb = side.get(b);
    if (sa === undefined || sb === undefined || sa === sb) continue;
    seams.add(key);
    added++;
  }
  return added > 0;
}

/**
 * すべての島を円盤にする。
 *
 * LSCM は円盤（穴も筒も無い、縁が 1 本の面）しか平らにできない。球のように
 * 閉じた島も、ぐるりと回った帯（穴あき）も、そのままでは畳まれて壊れる。
 * オイラー標数 χ = V − E + F を見て、1 でなければ法線で 2 つに割る。
 */
function ensureDisks(
  mesh: Mesh,
  seams: Set<EdgeKey>,
  normals: Array<[number, number, number]>,
  faces: Map<EdgeKey, number[]>,
): void {
  for (let round = 0; round < 8; round++) {
    const charts = buildCharts(mesh, seams);
    let changed = false;
    for (const chart of charts) {
      if (isDisk(mesh, chart.faces, seams)) continue;
      if (growAndCut(chart.faces, seams, normals, faces)) {
        changed = true;
        continue;
      }
      // 育てて分けられない形。面を 1 枚まわりから切り離して縁を作る
      const f = [...chart.faces].sort((a, b) => a - b)[0];
      const verts = mesh.faceVerts(f);
      for (let i = 0; i < verts.length; i++) {
        seams.add(edgeKey(verts[i], verts[(i + 1) % verts.length]));
      }
      changed = true;
    }
    if (!changed) return;
  }
}

/**
 * その島が円盤か。切れ目で割れた「UV 側の頂点」で数える。
 * χ = V − E + F が 1 なら円盤。2 なら閉じた球、0 以下なら帯や穴あき。
 */
function isDisk(mesh: Mesh, chartFaces: number[], seams: Set<EdgeKey>): boolean {
  const set = new Set(chartFaces);
  // 切れ目で分かれた頂点をまとめる（chartMesh と同じ規則を軽く再現する）
  const parent = new Map<string, string>();
  const find = (k: string): string => {
    let root = k;
    while (parent.get(root) !== root) root = parent.get(root) ?? root;
    let at = k;
    while (parent.get(at) !== root) {
      const next = parent.get(at) ?? root;
      parent.set(at, root);
      at = next;
    }
    return root;
  };
  const union = (a: string, b: string): void => {
    const ra = find(a);
    const rb = find(b);
    if (ra !== rb) parent.set(ra, rb);
  };
  const corner = (f: number, i: number) => `${f}:${i}`;
  for (const f of chartFaces) {
    for (let i = 0; i < mesh.faceSize(f); i++) parent.set(corner(f, i), corner(f, i));
  }
  // 切れ目でない共有辺の両側のコーナーを繋ぐ
  for (const f of chartFaces) {
    const verts = mesh.faceVerts(f);
    for (let i = 0; i < verts.length; i++) {
      const a = verts[i];
      const b = verts[(i + 1) % verts.length];
      const key = edgeKey(a, b);
      if (seams.has(key)) continue;
      for (const g of chartFaces) {
        if (g === f) continue;
        const other = mesh.faceVerts(g);
        const ja = other.indexOf(a);
        const jb = other.indexOf(b);
        if (ja < 0 || jb < 0) continue;
        // 隣の面でも辺として隣り合っているか
        const n = other.length;
        if ((ja + 1) % n !== jb && (jb + 1) % n !== ja) continue;
        union(corner(f, i), corner(g, ja));
        union(corner(f, (i + 1) % verts.length), corner(g, jb));
      }
    }
  }

  const vertices = new Set<string>();
  for (const f of chartFaces) {
    for (let i = 0; i < mesh.faceSize(f); i++) vertices.add(find(corner(f, i)));
  }
  const edges = new Set<string>();
  for (const f of chartFaces) {
    const n = mesh.faceSize(f);
    for (let i = 0; i < n; i++) {
      const a = find(corner(f, i));
      const b = find(corner(f, (i + 1) % n));
      edges.add(a < b ? `${a}|${b}` : `${b}|${a}`);
    }
  }
  void set;
  return vertices.size - edges.size + chartFaces.length === 1;
}

/** X で鏡映した相手の辺にも切れ目を入れる。 */
function mirrorSeams(mesh: Mesh, seams: Set<EdgeKey>): void {
  const p = mesh.positions;
  const key = (x: number, y: number, z: number) => {
    const fx = x.toFixed(3) === "-0.000" ? "0.000" : x.toFixed(3);
    return `${fx},${y.toFixed(3)},${z.toFixed(3)}`;
  };
  const index = new Map<string, number>();
  for (let v = 0; v < mesh.vertexCount; v++) {
    index.set(key(p[v * 3], p[v * 3 + 1], p[v * 3 + 2]), v);
  }
  const alive = new Set<EdgeKey>();
  for (const [a, b] of mesh.edges()) alive.add(edgeKey(a, b));

  for (const k of [...seams].sort()) {
    const [a, b] = k.split("_").map(Number);
    const ma = index.get(key(-p[a * 3], p[a * 3 + 1], p[a * 3 + 2]));
    const mb = index.get(key(-p[b * 3], p[b * 3 + 1], p[b * 3 + 2]));
    if (ma === undefined || mb === undefined) continue;
    const mirrored = edgeKey(ma, mb);
    if (alive.has(mirrored)) seams.add(mirrored);
  }
}
