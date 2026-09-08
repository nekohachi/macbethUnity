/**
 * 2D 側のつながり（`20` の T4）。
 *
 * 島に切り分けたあとの「UV 頂点」「UV エッジ」と、元のメッシュとの対応。
 * 2D ビューの当たり判定・選択・カット / ソーがこれを見る。
 *
 * ここは core なので DOM にも Three.js にも触れない。2D ビュー（app）は
 * この結果に描画用のものを足して使う。
 */
import type { Mesh } from "../mesh.js";
import { UV_SET, cornerIndex } from "./recipe.js";
import { buildCharts, chartMesh, cornerKey, type Chart, type CornerKey, type EdgeKey } from "./charts.js";

/** 2D 側のつながり。 */
export interface UvTopology {
  charts: Chart[];
  /** UV 頂点 → そこに集まるコーナー。 */
  vertexCorners: CornerKey[][];
  /** UV 頂点の位置（長さは UV 頂点数 × 2）。 */
  vertexUv: Float32Array;
  /** UV 頂点 → 属する島。 */
  vertexChart: Int32Array;
  /** UV エッジ（UV 頂点の組）。 */
  edges: Array<[number, number]>;
  /** UV エッジ → 属する島。 */
  edgeChart: Int32Array;
  /** UV エッジ → 元のメッシュのエッジキー。カット / ソーに使う。 */
  edgeKeys: EdgeKey[];
  /** UV エッジ → その辺を使っている面。1 枚なら島の縁。 */
  edgeFaces: number[][];
  /** コーナー → UV 頂点。 */
  cornerToVertex: Map<CornerKey, number>;
  /** 面 → 島の番号。3D との同期に使う。 */
  chartOfFace: Map<number, number>;
}

/** 切れ目で島に分けて、2D 側のつながりを作る。 */
export function buildUvTopology(mesh: Mesh, seams: Set<EdgeKey>): UvTopology | null {
  const uv = mesh.uvSets.get(UV_SET);
  if (!uv) return null;
  const charts = buildCharts(mesh, seams);

  const vertexCorners: CornerKey[][] = [];
  const vertexUvList: number[] = [];
  const vertexChartList: number[] = [];
  const cornerToVertex = new Map<CornerKey, number>();
  const chartOfFace = new Map<number, number>();

  charts.forEach((chart, ci) => {
    for (const f of chart.faces) chartOfFace.set(f, ci);
    const local = chartMesh(mesh, chart, seams);
    const base = vertexCorners.length;
    for (let i = 0; i < local.count; i++) {
      vertexCorners.push([]);
      vertexUvList.push(0, 0);
      vertexChartList.push(ci);
    }
    for (const key of chart.corners) {
      const at = base + local.localOf.get(key)!;
      vertexCorners[at].push(key);
      cornerToVertex.set(key, at);
      const corner = cornerIndex(mesh, key);
      vertexUvList[at * 2] = uv[corner * 2];
      vertexUvList[at * 2 + 1] = uv[corner * 2 + 1];
    }
  });

  // UV エッジ。面の辺をたどって、同じ組は 1 本にまとめる
  const edges: Array<[number, number]> = [];
  const edgeChart: number[] = [];
  const edgeKeys: EdgeKey[] = [];
  const edgeFaces: number[][] = [];
  const index = new Map<string, number>();
  for (let f = 0; f < mesh.faceCount; f++) {
    const verts = mesh.faceVerts(f);
    const ci = chartOfFace.get(f) ?? 0;
    for (let i = 0; i < verts.length; i++) {
      const a = cornerToVertex.get(cornerKey(f, i));
      const b = cornerToVertex.get(cornerKey(f, (i + 1) % verts.length));
      if (a === undefined || b === undefined) continue;
      const id = `${Math.min(a, b)}_${Math.max(a, b)}`;
      const already = index.get(id);
      if (already !== undefined) {
        edgeFaces[already].push(f);
        continue;
      }
      index.set(id, edges.length);
      edges.push([a, b]);
      edgeChart.push(ci);
      edgeFaces.push([f]);
      const va = verts[i];
      const vb = verts[(i + 1) % verts.length];
      edgeKeys.push(`${Math.min(va, vb)}_${Math.max(va, vb)}`);
    }
  }

  return {
    charts,
    vertexCorners,
    vertexUv: Float32Array.from(vertexUvList),
    vertexChart: Int32Array.from(vertexChartList),
    edges,
    edgeChart: Int32Array.from(edgeChart),
    edgeKeys,
    edgeFaces,
    cornerToVertex,
    chartOfFace,
  };
}
