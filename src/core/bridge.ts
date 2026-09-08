/**
 * ブリッジ。2 つのエッジ列を面で繋ぐ（Maya の Bridge）。
 *
 * 対象は**境界エッジ**（面が 1 枚しか付いていない辺）に限る。新しい面の
 * 表裏は隣の面の巻き方向から決めるので、境界でないと向きが定まらないため。
 * 穴の空いたメッシュの縁どうしを繋ぐ、というのが本来の用途でもある。
 *
 * 対応付けは列の向きで決める。
 * - 開いた列: 端どうしの距離の和が小さくなる向き（`14` の B3 の決め）
 * - 閉じた輪: 回し始めと向きを総当たりして、対応する頂点間の距離の和が最小の組
 *
 * 本数が違う、枝分かれしている、2 列になっていない、境界でない — どれかなら
 * 何もせず null を返す。呼び出し側が理由を出す。
 */
import { Mesh, MeshBuilder, edgeKey, faceUvs } from "./mesh.js";

interface Chain {
  /** 並んだ頂点。閉じている場合は最後と最初が繋がっている（重複はさせない）。 */
  verts: number[];
  closed: boolean;
}

/** 列の辺の本数。 */
function segments(c: Chain): number {
  return c.closed ? c.verts.length : c.verts.length - 1;
}

/** 列の i 番目の辺 (from, to)。 */
function segment(c: Chain, i: number): [number, number] {
  return [c.verts[i], c.verts[(i + 1) % c.verts.length]];
}

/** 選んだエッジを連結成分ごとの頂点列に分ける。枝分かれがあれば null。 */
export function edgeChains(edges: Array<[number, number]>): Chain[] | null {
  const adj = new Map<number, number[]>();
  const push = (a: number, b: number): void => {
    const list = adj.get(a);
    if (list) list.push(b);
    else adj.set(a, [b]);
  };
  const seen = new Set<string>();
  for (const [a, b] of edges) {
    if (a === b) continue;
    const key = edgeKey(a, b);
    if (seen.has(key)) continue;
    seen.add(key);
    push(a, b);
    push(b, a);
  }
  // 3 本以上集まる頂点があると列にならない
  for (const list of adj.values()) if (list.length > 2) return null;

  const done = new Set<number>();
  const walk = (start: number): number[] => {
    const verts = [start];
    done.add(start);
    let prev = -1;
    let cur = start;
    for (;;) {
      const next = (adj.get(cur) ?? []).find((u) => u !== prev && !done.has(u));
      if (next === undefined) return verts;
      verts.push(next);
      done.add(next);
      prev = cur;
      cur = next;
    }
  };

  const out: Chain[] = [];
  // 端（隣が 1 つしかない頂点）から歩けば開いた列になる
  for (const [v, list] of adj) {
    if (list.length === 1 && !done.has(v)) out.push({ verts: walk(v), closed: false });
  }
  // 残りは閉じた輪
  for (const v of adj.keys()) {
    if (done.has(v)) continue;
    const verts = walk(v);
    const last = verts[verts.length - 1];
    const closed = verts.length > 2 && (adj.get(last) ?? []).includes(verts[0]);
    out.push({ verts, closed });
  }
  return out;
}

/** 2 点の距離。 */
function distance(mesh: Mesh, a: number, b: number): number {
  const p = mesh.getPosition(a);
  const q = mesh.getPosition(b);
  return Math.hypot(p[0] - q[0], p[1] - q[1], p[2] - q[2]);
}

/** 対応する頂点どうしの距離の合計。 */
function totalDistance(mesh: Mesh, a: number[], b: number[]): number {
  let sum = 0;
  for (let i = 0; i < a.length; i++) sum += distance(mesh, a[i], b[i]);
  return sum;
}

/** B を A に合わせて並べ替える。 */
function align(mesh: Mesh, a: Chain, b: Chain): number[] {
  const bs = b.verts;
  if (!b.closed) {
    // 端どうしが近くなる向きを選ぶ
    const straight = distance(mesh, a.verts[0], bs[0]) + distance(mesh, a.verts[a.verts.length - 1], bs[bs.length - 1]);
    const flipped = distance(mesh, a.verts[0], bs[bs.length - 1]) + distance(mesh, a.verts[a.verts.length - 1], bs[0]);
    return flipped < straight ? [...bs].reverse() : [...bs];
  }
  // 閉じた輪は回し始めと向きを総当たり
  let best: number[] = bs;
  let bestScore = Infinity;
  for (const source of [bs, [...bs].reverse()]) {
    for (let j = 0; j < source.length; j++) {
      const rotated = source.map((_, k) => source[(j + k) % source.length]);
      const score = totalDistance(mesh, a.verts, rotated);
      if (score < bestScore) {
        bestScore = score;
        best = rotated;
      }
    }
  }
  return best;
}

/**
 * 2 つのエッジ列を面で繋ぐ。繋げなければ null。
 * 返る faces は作った面の数。
 */
export function bridgeEdges(mesh: Mesh, edges: Array<[number, number]>): { mesh: Mesh; faces: number } | null {
  const chains = edgeChains(edges);
  if (!chains || chains.length !== 2) return null;
  const [a, b] = chains;
  if (a.closed !== b.closed) return null;
  const count = segments(a);
  if (count < 1 || count !== segments(b)) return null;

  // 境界エッジであること。隣の面が 1 枚だけなら、その巻き方向で表裏が決まる
  const ef = mesh.edgeFaceMap();
  const borderFace = (u: number, v: number): number => {
    const faces = ef.get(edgeKey(u, v)) ?? [];
    return faces.length === 1 ? faces[0] : -1;
  };
  for (const chain of [a, b]) {
    for (let i = 0; i < segments(chain); i++) {
      const [u, v] = segment(chain, i);
      if (borderFace(u, v) < 0) return null;
    }
  }

  const bs = align(mesh, a, b);
  const paired: Chain = { verts: bs, closed: b.closed };

  const out = new MeshBuilder({ weld: false });
  for (let v = 0; v < mesh.vertexCount; v++) {
    const p = mesh.getPosition(v);
    out.vertex(p[0], p[1], p[2]);
  }
  for (let f = 0; f < mesh.faceCount; f++) {
    out.face(mesh.faceVerts(f), {
      uv: faceUvs(mesh, f) ?? undefined,
      polygroup: mesh.polygroup[f],
      materialId: mesh.materialId[f],
    });
  }

  let made = 0;
  for (let i = 0; i < count; i++) {
    const [a0, a1] = segment(a, i);
    const [c0, c1] = segment(paired, i);
    const f = borderFace(a0, a1);
    if (f < 0) continue;
    // 隣の面が a0 → a1 の向きに通っているなら、新しい面は a1 → a0 で通す
    const verts = mesh.faceVerts(f);
    const at = verts.indexOf(a0);
    const forward = at >= 0 && verts[(at + 1) % verts.length] === a1;
    const quad = forward ? [a1, a0, c0, c1] : [a0, a1, c1, c0];
    if (out.face(quad, { polygroup: mesh.polygroup[f], materialId: mesh.materialId[f] }) >= 0) made++;
  }
  if (!made) return null;

  const built = out.build();
  for (const [key, value] of mesh.crease) {
    const [u, v] = key.split("_").map(Number);
    built.setCrease(u, v, value);
  }
  return { mesh: built, faces: made };
}
