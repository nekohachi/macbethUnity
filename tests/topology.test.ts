import { describe, expect, it } from "vitest";
import { PRIMITIVES, defaultParams } from "../src/core/primitives.js";
import { edgeKey } from "../src/core/mesh.js";
import {
  collapseFaces,
  compact,
  deleteFaces,
  dissolveEdges,
  extrudeEdges,
  extrudeFaces,
  insertEdgeLoop,
  loopPreviewPoints,
  mergeFacesAcrossEdge,
  weldVertices,
} from "../src/core/topology.js";

const cube = () => PRIMITIVES.cube.build({ width: 1, height: 1, depth: 1, sdW: 1, sdH: 1, sdD: 1 });

describe("エッジループ挿入", () => {
  it("キューブに 1 本挿すと 6 面が 10 面になる", () => {
    const m = cube();
    const [a, b] = m.edges()[0];
    const result = insertEdgeLoop(m, a, b, 0.5)!;
    expect(result).not.toBeNull();
    expect(result.faceCount).toBe(4); // 4 面のストリップを分割
    expect(result.mesh.stats()).toMatchObject({ vertices: 12, faces: 10 });
  });

  it("予測線は面数 + 1 の点を返す", () => {
    const m = cube();
    const [a, b] = m.edges()[0];
    const preview = loopPreviewPoints(m, a, b, 0.5, false)!;
    expect(preview.points).toHaveLength(preview.faceCount + 1);
  });

  it("エッジフローを有効にすると位置が変わる（平面上では変わらない）", () => {
    const sphere = PRIMITIVES.sphere.build({ radius: 1, sdAxis: 8, sdHeight: 6 });
    const edge = sphere.edges()[10];
    const flat = loopPreviewPoints(sphere, edge[0], edge[1], 0.5, false)!;
    const flow = loopPreviewPoints(sphere, edge[0], edge[1], 0.5, true)!;
    const moved = flat.points.some((p, i) => Math.hypot(p[0] - flow.points[i][0], p[1] - flow.points[i][1], p[2] - flow.points[i][2]) > 1e-4);
    expect(moved).toBe(true);
  });

  it("UV を補間して持ち越す", () => {
    const m = PRIMITIVES.plane.build({ width: 2, height: 2, sdW: 2, sdH: 2 });
    expect(m.uvSets.get("map1")).toBeDefined();
    const inner = m.edges().find(([a, b]) => {
      const pa = m.getPosition(a);
      const pb = m.getPosition(b);
      return Math.abs(pa[0]) < 1e-6 && Math.abs(pb[0]) < 1e-6;
    })!;
    const result = insertEdgeLoop(m, inner[0], inner[1], 0.5)!;
    const uv = result.mesh.uvSets.get("map1")!;
    expect(uv.length).toBe(result.mesh.cornerCount * 2);
    // UV が 0..1 の範囲に収まっている（補間なので外へ出ない）
    for (let i = 0; i < uv.length; i++) expect(uv[i]).toBeGreaterThanOrEqual(-1e-6);
  });

  it("三角形だけのメッシュでは挿入できない", () => {
    const ico = PRIMITIVES.platonic.build({ kind: 4, radius: 1 });
    const [a, b] = ico.edges()[0];
    expect(insertEdgeLoop(ico, a, b, 0.5)).toBeNull();
  });
});

describe("押し出し", () => {
  it("面を 1 つ押し出すと 10 面 12 頂点になる", () => {
    const m = cube();
    const result = extrudeFaces(m, [0], 0.5)!;
    expect(result.mesh.stats()).toMatchObject({ vertices: 12, faces: 10 });
  });

  it("エッジを 1 本押し出すと 7 面 10 頂点になる", () => {
    const m = cube();
    const [a, b] = m.edges()[0];
    const result = extrudeEdges(m, [[a, b]], 0.3)!;
    expect(result.mesh.stats()).toMatchObject({ vertices: 10, faces: 7 });
    expect(result.newEdges).toHaveLength(1);
  });

  it("押し出した側面の向きが隣の面と揃う", () => {
    const m = cube();
    const [a, b] = m.edges()[0];
    const result = extrudeEdges(m, [[a, b]], 0.3)!;
    const ef = result.mesh.edgeFaceMap();
    const faces = ef.get(edgeKey(a, b))!;
    expect(faces.length).toBeGreaterThanOrEqual(2);
    const fn = result.mesh.faceNormals();
    // 共有エッジの両側で法線が正反対になっていない（同じ側を向いている＝裏返っていない）
    const dot = fn[faces[0] * 3] * fn[faces[1] * 3] + fn[faces[0] * 3 + 1] * fn[faces[1] * 3 + 1] + fn[faces[0] * 3 + 2] * fn[faces[1] * 3 + 2];
    expect(dot).toBeGreaterThan(-0.99);
  });

  it("押し出しても UV が残る", () => {
    const m = PRIMITIVES.cube.build({ width: 1, height: 1, depth: 1, sdW: 1, sdH: 1, sdD: 1 });
    const result = extrudeFaces(m, [0], 0.5)!;
    const uv = result.mesh.uvSets.get("map1")!;
    expect(uv.length).toBe(result.mesh.cornerCount * 2);
  });
});

describe("統合と削除", () => {
  it("面の頂点を溶接すると 5 頂点 5 面になる", () => {
    const m = cube();
    const result = weldVertices(m, [m.faceVerts(0)]);
    expect(result.stats()).toMatchObject({ vertices: 5, faces: 5 });
  });

  it("共有エッジで 2 面を結合すると 6 頂点の面になる", () => {
    const m = cube();
    const [a, b] = m.edges()[0];
    const faces = m.edgeFaceMap().get(edgeKey(a, b))!;
    const merged = mergeFacesAcrossEdge(m.faceVerts(faces[0]), m.faceVerts(faces[1]), a, b);
    expect(merged).toHaveLength(6);
  });

  it("エッジを削除すると面が 1 枚減る", () => {
    const m = cube();
    const [a, b] = m.edges()[0];
    const result = dissolveEdges(m, [[a, b]])!;
    expect(result.merged).toBe(1);
    expect(result.mesh.faceCount).toBe(5);
  });

  it("境界エッジは削除できない", () => {
    const plane = PRIMITIVES.plane.build({ width: 2, height: 2, sdW: 1, sdH: 1 });
    const [a, b] = plane.edges()[0];
    expect(dissolveEdges(plane, [[a, b]])).toBeNull();
  });
});

describe("deleteFaces / collapseFaces", () => {
  it("面を消すと面数が減り、残りの UV は保たれる", () => {
    const cube = PRIMITIVES.cube.build(defaultParams("cube"));
    const before = cube.stats().faces;
    const r = deleteFaces(cube, [0]);
    expect(r).not.toBeNull();
    expect(r!.removed).toBe(1);
    expect(r!.mesh.stats().faces).toBe(before - 1);
    // UV セットが消えていない
    expect(r!.mesh.uvSets.size).toBe(cube.uvSets.size);
    // 頂点はそのまま残る。詰めるのは compact の仕事
    expect(r!.mesh.vertexCount).toBe(cube.vertexCount);
    expect(compact(r!.mesh).vertexCount).toBeLessThanOrEqual(cube.vertexCount);
  });

  it("消す面が無ければ null", () => {
    const cube = PRIMITIVES.cube.build(defaultParams("cube"));
    expect(deleteFaces(cube, [])).toBeNull();
  });

  it("コラプスすると面が潰れて頂点が減る", () => {
    const cube = PRIMITIVES.cube.build(defaultParams("cube"));
    const out = collapseFaces(cube, [0]);
    expect(out).not.toBeNull();
    // 4 頂点が 1 点にまとまる
    expect(compact(out!).vertexCount).toBeLessThan(cube.vertexCount);
  });
});
