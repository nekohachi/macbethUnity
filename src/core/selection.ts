/**
 * 選択のためのトポロジ走査。Maya のダブルクリック選択に対応する。
 *
 * - エッジループ: 価数 4 の頂点で「面を共有しない向かいのエッジ」へ進む。極と境界で止まる
 * - エッジリング: 四角形をまたいで平行なエッジをたどる（マルチカットのストリップと同じ）
 * - シェル: エッジ共有で繋がった面すべて
 */
import { Mesh, edgeKey } from "./mesh.js";

export type Edge = [number, number];

export interface EdgeChain {
  edges: Edge[];
  /** 一周して閉じているか。部分区間の取り方が変わる。 */
  closed: boolean;
}

/**
 * a-b から始まるエッジループ。
 * 開いている場合は逆方向にも伸ばすので、開始エッジは列の途中に入る。
 */
export function edgeLoopFrom(mesh: Mesh, a: number, b: number): EdgeChain {
  const neighbors = mesh.vertexNeighbors();
  const ef = mesh.edgeFaceMap();
  const seen = new Set<string>();

  /** prev から v に来たとき、v を挟んで向かい側のエッジの相手を返す。無ければ -1。 */
  const next = (prev: number, v: number): number => {
    const ns = neighbors.get(v);
    if (!ns || ns.length !== 4) return -1; // 価数 4 以外（極）では止める
    const incoming = ef.get(edgeKey(prev, v)) ?? [];
    for (const w of ns) {
      if (w === prev) continue;
      const faces = ef.get(edgeKey(v, w)) ?? [];
      if (!faces.some((f) => incoming.includes(f))) return w;
    }
    return -1;
  };

  const edges: Edge[] = [];
  const walk = (u: number, v: number, forward: boolean, skipFirst: boolean): boolean => {
    let first = true;
    for (let guard = 0; guard < 100000; guard++) {
      const k = edgeKey(u, v);
      if (seen.has(k) && !first) return true; // 一周した
      if (!(first && skipFirst)) {
        seen.add(k);
        if (forward) edges.push([u, v]);
        else edges.unshift([v, u]);
      }
      first = false;
      const w = next(u, v);
      if (w < 0) return false;
      u = v;
      v = w;
    }
    return false;
  };

  const closed = walk(a, b, true, false);
  if (!closed) walk(b, a, false, true); // 逆方向。開始エッジは登録済みなので飛ばす
  return { edges, closed };
}

/**
 * a-b を含むエッジリング。四角形ストリップをたどって平行なエッジを集める。
 * loopStrip（topology.ts）と同じ走査だが、こちらはエッジだけを返す。
 */
export function edgeRingFrom(mesh: Mesh, a: number, b: number): EdgeChain {
  const ef = mesh.edgeFaceMap();
  const seenFace = new Set<number>();
  const forwardEdges: Edge[] = [];
  const backwardEdges: Edge[] = [];

  const walk = (u: number, v: number, fromFace: number, out: Edge[]): boolean => {
    for (let guard = 0; guard < 100000; guard++) {
      const faces = ef.get(edgeKey(u, v)) ?? [];
      const f = faces.find((x) => x !== fromFace);
      if (f === undefined) return false;
      if (seenFace.has(f)) return true; // 一周した
      const verts = mesh.faceVerts(f);
      if (verts.length !== 4) return false;
      seenFace.add(f);
      let idx = -1;
      let aa = u,
        bb = v;
      for (let i = 0; i < 4; i++) {
        if (verts[i] === u && verts[(i + 1) % 4] === v) {
          idx = i;
          break;
        }
      }
      if (idx < 0) {
        for (let i = 0; i < 4; i++) {
          if (verts[i] === v && verts[(i + 1) % 4] === u) {
            idx = i;
            aa = v;
            bb = u;
            break;
          }
        }
      }
      if (idx < 0) return false;
      const c = verts[(idx + 2) % 4];
      const d = verts[(idx + 3) % 4];
      out.push([d, c]);
      fromFace = f;
      u = d;
      v = c;
      void aa;
      void bb;
    }
    return false;
  };

  const startFaces = ef.get(edgeKey(a, b)) ?? [];
  const closed = walk(a, b, -1, forwardEdges);
  if (!closed) {
    const used = startFaces.find((f) => seenFace.has(f));
    walk(b, a, used ?? -1, backwardEdges);
  }
  const edges: Edge[] = [...backwardEdges.reverse(), [a, b], ...forwardEdges];
  // 閉じている場合、末尾が開始エッジと重複するので落とす
  if (closed && edges.length > 1) {
    const last = edges[edges.length - 1];
    if (edgeKey(last[0], last[1]) === edgeKey(a, b)) edges.pop();
  }
  return { edges, closed };
}

/**
 * 順序付きのエッジ列から、2 つのエッジの間の区間を取り出す。
 * 閉じた列では短い方を返す（Maya と同じ）。どちらかが列に無ければ null。
 */
export function arcBetween(chain: EdgeChain, k1: string, k2: string): Edge[] | null {
  const keys = chain.edges.map((e) => edgeKey(e[0], e[1]));
  let i = keys.indexOf(k1);
  let j = keys.indexOf(k2);
  if (i < 0 || j < 0) return null;
  if (i > j) [i, j] = [j, i];
  const inner = chain.edges.slice(i, j + 1);
  if (!chain.closed) return inner;
  const outer = [...chain.edges.slice(j), ...chain.edges.slice(0, i + 1)];
  return outer.length < inner.length ? outer : inner;
}

/** f0 とエッジで繋がった面すべて。 */
export function shellFaces(mesh: Mesh, f0: number): number[] {
  const ef = mesh.edgeFaceMap();
  const seen = new Set<number>([f0]);
  const stack = [f0];
  const out: number[] = [];
  while (stack.length) {
    const f = stack.pop()!;
    out.push(f);
    const verts = mesh.faceVerts(f);
    for (let i = 0; i < verts.length; i++) {
      const faces = ef.get(edgeKey(verts[i], verts[(i + 1) % verts.length])) ?? [];
      for (const g of faces) {
        if (!seen.has(g)) {
          seen.add(g);
          stack.push(g);
        }
      }
    }
  }
  return out;
}

/** シェルに属する頂点すべて。 */
export function shellVertices(mesh: Mesh, f0: number): number[] {
  const out = new Set<number>();
  for (const f of shellFaces(mesh, f0)) for (const v of mesh.faceVerts(f)) out.add(v);
  return Array.from(out);
}

/** エッジ列を通る頂点の並び。部分頂点ループの取り出しに使う。 */
export function chainVertices(chain: EdgeChain): number[] {
  const out: number[] = [];
  for (const [a, b] of chain.edges) {
    if (!out.includes(a)) out.push(a);
    if (!out.includes(b)) out.push(b);
  }
  return out;
}

/** 境界エッジ（面を 1 つしか持たないエッジ）。 */
export function boundaryEdges(mesh: Mesh): Edge[] {
  const out: Edge[] = [];
  for (const [key, faces] of mesh.edgeFaceMap()) {
    if (faces.length === 1) {
      const [a, b] = key.split("_").map(Number);
      out.push([a, b]);
    }
  }
  return out;
}

/** 選択の拡張。頂点集合を、辺で繋がった隣へ 1 段広げる。 */
export function growVertices(mesh: Mesh, selected: Iterable<number>): number[] {
  const neighbors = mesh.vertexNeighbors();
  const out = new Set<number>(selected);
  for (const v of Array.from(out)) for (const w of neighbors.get(v) ?? []) out.add(w);
  return Array.from(out);
}

/** 選択の縮小。隣がすべて選択されている頂点だけを残す。 */
export function shrinkVertices(mesh: Mesh, selected: Iterable<number>): number[] {
  const neighbors = mesh.vertexNeighbors();
  const set = new Set<number>(selected);
  return Array.from(set).filter((v) => (neighbors.get(v) ?? []).every((w) => set.has(w)));
}

/** 面選択の拡張。辺を共有する隣接面を加える。 */
export function growFaces(mesh: Mesh, selected: Iterable<number>): number[] {
  const ef = mesh.edgeFaceMap();
  const out = new Set<number>(selected);
  for (const f of Array.from(out)) {
    const verts = mesh.faceVerts(f);
    for (let i = 0; i < verts.length; i++) {
      for (const g of ef.get(edgeKey(verts[i], verts[(i + 1) % verts.length])) ?? []) out.add(g);
    }
  }
  return Array.from(out);
}

/** 面選択の縮小。隣接面がすべて選択されている面だけを残す。 */
export function shrinkFaces(mesh: Mesh, selected: Iterable<number>): number[] {
  const ef = mesh.edgeFaceMap();
  const set = new Set<number>(selected);
  return Array.from(set).filter((f) => {
    const verts = mesh.faceVerts(f);
    for (let i = 0; i < verts.length; i++) {
      for (const g of ef.get(edgeKey(verts[i], verts[(i + 1) % verts.length])) ?? []) {
        if (!set.has(g)) return false;
      }
    }
    return true;
  });
}
