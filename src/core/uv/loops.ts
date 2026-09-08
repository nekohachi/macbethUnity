/**
 * 2D の走査（`20` の T4）。UV のループ選択と、その区間。
 *
 * 3D の `selection.ts` と同じ規則を、UV のつながり（`topology.ts`）で行う。
 * 違うのは 2 つだけ。
 *
 * - **島の外へは出ない。** 切れ目で分かれた先は別の島なので、そこで止まる
 * - **縁の辺から始めたら、縁を一周する。** Maya の UV エディタで縁を選ぶときの動き
 */
import type { UvTopology } from "./topology.js";

/** UV のループ。`edges` は並んでいる（区間を切り出せる）。 */
export interface UvLoop {
  /** UV エッジの番号。ループの順に並んでいる。 */
  edges: number[];
  /** 一周して戻ったか。 */
  closed: boolean;
}

/** UV 頂点 → その頂点に集まる UV エッジ。 */
export function uvIncidentEdges(t: UvTopology): number[][] {
  const at: number[][] = [];
  for (let v = 0; v < t.vertexUv.length / 2; v++) at.push([]);
  t.edges.forEach(([a, b], i) => {
    at[a]?.push(i);
    at[b]?.push(i);
  });
  return at;
}

/**
 * `start` を含む UV のループ。
 *
 * 内側の辺は「価数 4 の頂点で、入ってきた辺と面を共有しない辺」へ進む
 * （3D の `edgeLoopFrom` と同じ）。縁の辺は縁だけをたどる。
 */
export function uvEdgeLoopFrom(t: UvTopology, start: number): UvLoop {
  if (!t.edges[start]) return { edges: [], closed: false };
  const at = uvIncidentEdges(t);
  const border = (t.edgeFaces[start]?.length ?? 0) < 2;

  /** v まで来たとき、次に進む辺とその先の頂点。無ければ null。 */
  const step = (from: number, v: number): { edge: number; next: number } | null => {
    const list = at[v] ?? [];
    let candidates: number[];
    if (border) {
      // 縁は縁だけをたどる。分岐していたら止める
      candidates = list.filter((e) => e !== from && (t.edgeFaces[e]?.length ?? 0) < 2);
    } else {
      // 価数 4 以外（極や切れ目の端）では止める
      if (list.length !== 4) return null;
      const incoming = t.edgeFaces[from] ?? [];
      candidates = list.filter((e) => e !== from && !(t.edgeFaces[e] ?? []).some((f) => incoming.includes(f)));
    }
    if (candidates.length !== 1) return null;
    const edge = candidates[0];
    const [a, b] = t.edges[edge];
    return { edge, next: a === v ? b : a };
  };

  const [s0, s1] = t.edges[start];
  const seen = new Set<number>([start]);
  const edges = [start];
  let closed = false;

  // 前へ
  let from = start;
  let v = s1;
  for (let guard = 0; guard < 1000000; guard++) {
    const s = step(from, v);
    if (!s) break;
    if (seen.has(s.edge)) {
      closed = s.edge === start;
      break;
    }
    seen.add(s.edge);
    edges.push(s.edge);
    from = s.edge;
    v = s.next;
  }
  // 閉じていれば後ろへは行かなくてよい
  if (!closed) {
    from = start;
    v = s0;
    for (let guard = 0; guard < 1000000; guard++) {
      const s = step(from, v);
      if (!s || seen.has(s.edge)) break;
      seen.add(s.edge);
      edges.unshift(s.edge);
      from = s.edge;
      v = s.next;
    }
  }
  return { edges, closed };
}

/**
 * ループの上で、2 本の辺の間（両端を含む）。
 * 閉じたループなら短いほうを返す。どちらかがループに無ければ null。
 */
export function uvArcBetween(loop: UvLoop, a: number, b: number): number[] | null {
  const i = loop.edges.indexOf(a);
  const j = loop.edges.indexOf(b);
  if (i < 0 || j < 0) return null;
  const [lo, hi] = i < j ? [i, j] : [j, i];
  const inside = loop.edges.slice(lo, hi + 1);
  if (!loop.closed) return inside;
  // 一周しているので、外回りのほうが短いことがある
  const outside = [...loop.edges.slice(hi), ...loop.edges.slice(0, lo + 1)];
  return inside.length <= outside.length ? inside : outside;
}

/** ループの UV 頂点を、並んだ順に返す。 */
export function uvLoopVertices(t: UvTopology, loop: UvLoop): number[] {
  if (!loop.edges.length) return [];
  const first = t.edges[loop.edges[0]];
  if (loop.edges.length === 1) return [first[0], first[1]];
  const second = t.edges[loop.edges[1]];
  // 1 本目の「次に繋がらないほう」から始める
  let v = first[0] === second[0] || first[0] === second[1] ? first[1] : first[0];
  const out = [v];
  for (const e of loop.edges) {
    const [a, b] = t.edges[e];
    v = a === v ? b : a;
    out.push(v);
  }
  return out;
}

/** 島に属する UV エッジ。 */
export function uvChartEdges(t: UvTopology, chart: number): number[] {
  const out: number[] = [];
  for (let i = 0; i < t.edges.length; i++) if (t.edgeChart[i] === chart) out.push(i);
  return out;
}

/** 島に属する UV 頂点。 */
export function uvChartVertices(t: UvTopology, chart: number): number[] {
  const out: number[] = [];
  for (let v = 0; v < t.vertexChart.length; v++) if (t.vertexChart[v] === chart) out.push(v);
  return out;
}

/**
 * 2 つの UV 頂点の間の頂点列。同じループの上に無ければ null。
 * 3D の「頂点列」（`select.ts` の `double`）と同じ考え方。
 */
export function uvVertexPath(t: UvTopology, a: number, b: number): number[] | null {
  if (a === b) return [a];
  const at = uvIncidentEdges(t);
  for (const e of at[a] ?? []) {
    const loop = uvEdgeLoopFrom(t, e);
    const verts = uvLoopVertices(t, loop);
    const i = verts.indexOf(a);
    const j = verts.indexOf(b);
    if (i < 0 || j < 0) continue;
    const [lo, hi] = i < j ? [i, j] : [j, i];
    const inside = verts.slice(lo, hi + 1);
    if (!loop.closed) return inside;
    const outside = [...verts.slice(hi), ...verts.slice(0, lo + 1)];
    return inside.length <= outside.length ? inside : outside;
  }
  return null;
}

/**
 * 頂点 `from` から辺 `edge` の向きへ、格子に沿ってまっすぐ進む。通った頂点を順に返す。
 *
 * 進み方は `uvEdgeLoopFrom` の内側と同じ「入ってきた辺と面を共有しない辺」。
 * ただし価数は問わないので、島の縁の上でも角で止まるだけで真っすぐ進める。
 */
export function uvStraightRun(t: UvTopology, from: number, edge: number): { verts: number[]; edges: number[] } {
  const at = uvIncidentEdges(t);
  const first = t.edges[edge];
  if (!first) return { verts: [from], edges: [] };
  let v = first[0] === from ? first[1] : first[0];
  const verts = [from, v];
  const edges = [edge];
  const seen = new Set<number>([edge]);

  for (let guard = 0; guard < 1000000; guard++) {
    const incoming = t.edgeFaces[edges[edges.length - 1]] ?? [];
    const next = (at[v] ?? []).filter(
      (e) => !seen.has(e) && !(t.edgeFaces[e] ?? []).some((f) => incoming.includes(f)),
    );
    if (next.length !== 1) break;
    const e = next[0];
    const [a, b] = t.edges[e];
    v = a === v ? b : a;
    if (verts.includes(v)) break; // 一周した
    seen.add(e);
    edges.push(e);
    verts.push(v);
  }
  return { verts, edges };
}

/**
 * 島が四角形の格子（帯）なら、行ごとの UV 頂点の並びを返す。格子でなければ null。
 * 「格子化」（`20` の T5）が使う。
 */
export function uvGridRows(t: UvTopology, chart: number): number[][] | null {
  const faces = t.charts[chart]?.faces ?? [];
  if (!faces.length) return null;

  const at = uvIncidentEdges(t);
  const verts = uvChartVertices(t, chart);
  if (verts.length < 4) return null;

  // 角を探す。格子の四隅は「この島の辺が 2 本だけ集まる点」
  const inChart = new Set(verts);
  const degree = (v: number): number[] => (at[v] ?? []).filter((e) => t.edgeChart[e] === chart);
  const corner = verts.find((v) => degree(v).length === 2);
  if (corner === undefined) return null;

  const [e0, e1] = degree(corner);
  // 1 行目と、行の頭を並べる列
  const firstRow = uvStraightRun(t, corner, e0);
  const column = uvStraightRun(t, corner, e1);
  if (firstRow.verts.length < 2 || column.verts.length < 2) return null;

  const rows: number[][] = [firstRow.verts];
  for (let k = 1; k < column.verts.length; k++) {
    const v = column.verts[k];
    const incoming = t.edgeFaces[column.edges[k - 1]] ?? [];
    // 行の向きは「列の辺と面を共有する辺」。縁の上なので 1 本に決まる
    const next = degree(v).filter(
      (e) => e !== column.edges[k - 1] && (t.edgeFaces[e] ?? []).some((f) => incoming.includes(f)),
    );
    if (next.length !== 1) return null;
    const row = uvStraightRun(t, v, next[0]);
    if (row.verts.length !== firstRow.verts.length) return null;
    rows.push(row.verts);
  }

  // 島の頂点をちょうど 1 回ずつ通っていること（格子になっている証拠）
  const covered = new Set<number>();
  for (const row of rows) for (const v of row) covered.add(v);
  if (covered.size !== verts.length) return null;
  for (const v of covered) if (!inChart.has(v)) return null;
  return rows;
}
