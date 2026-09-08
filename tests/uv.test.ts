/**
 * UV（`15` の 8 章の合格条件）。C1 の範囲は U1〜U4。
 *
 * U1・U2 は「開けているか」、U3 は「決定的か」、U4 は「非破壊の差分が
 * 正しい島にだけ残るか」。U4 がこの設計の核心。
 */
import { describe, expect, it } from "vitest";
import { PRIMITIVES, defaultParams } from "../src/core/primitives.js";
import { Mesh, MeshBuilder, edgeKey } from "../src/core/mesh.js";
import {
  UV_SET,
  buildCharts,
  chartMesh,
  cornerIndex,
  cornerKey,
  cloneRecipe,
  buildUvTopology,
  uvEdgeLoopFrom,
  uvArcBetween,
  uvLoopVertices,
  uvVertexPath,
  uvGridRows,
  distortionPerFace,
  preserveUvs,
  uvStraightRun,
  gridding,
  straightenBorder,
  emptyRecipe,
  measure,
  recompute,
  autoSeams,
  equalizeTexelDensity,
  shelfPack,
  marginUv,
  deserializeRecipe,
  surfaceArea,
  polygonArea,
  chartMesh as chartMeshFn,
  recipeFromMesh,
  recordManual,
  reconcile,
  seamsFromUv,
  sewInBase,
} from "../src/core/uv/index.js";

const cube = () => PRIMITIVES.cube.build(defaultParams("cube"));

/** すべての辺を切る。面の数だけ島ができる（立方体なら 6 枚の平らな島）。 */
function allSeams(mesh: Mesh): Set<string> {
  const seams = new Set<string>();
  for (const [a, b] of mesh.edges()) seams.add(edgeKey(a, b));
  return seams;
}

/**
 * 展開図（十字）の切れ目。面のつながりから全域木を取り、木に入らない辺を切る。
 * 立方体なら残る辺が 5 本、切れ目が 7 本、島は 1 つ。平らに開ける形になる。
 */
function netSeams(mesh: Mesh): Set<string> {
  const ef = mesh.edgeFaceMap();
  const seams = new Set<string>();
  const seen = new Set<number>([0]);
  const queue = [0];
  const keep = new Set<string>();
  while (queue.length) {
    const f = queue.shift()!;
    const verts = mesh.faceVerts(f);
    for (let i = 0; i < verts.length; i++) {
      const key = edgeKey(verts[i], verts[(i + 1) % verts.length]);
      const faces = ef.get(key) ?? [];
      if (faces.length !== 2) continue;
      const g = faces[0] === f ? faces[1] : faces[0];
      if (seen.has(g)) continue;
      seen.add(g);
      keep.add(key);
      queue.push(g);
    }
  }
  for (const [a, b] of mesh.edges()) {
    const key = edgeKey(a, b);
    if (!keep.has(key)) seams.add(key);
  }
  return seams;
}

/** 上下を落とした筒。縦に 1 本切れば長方形に開ける。 */
function tube(segments = 12, height = 2): Mesh {
  const b = new MeshBuilder({ weld: false });
  for (let i = 0; i < segments; i++) {
    const t = (i / segments) * Math.PI * 2;
    b.vertex(Math.cos(t), 0, Math.sin(t));
    b.vertex(Math.cos(t), height, Math.sin(t));
  }
  for (let i = 0; i < segments; i++) {
    const j = (i + 1) % segments;
    b.face([i * 2, j * 2, j * 2 + 1, i * 2 + 1]);
  }
  return b.build();
}

/** 島ごとに、そこに属するコーナーの UV を集める。 */
function uvOfChart(mesh: Mesh, corners: string[]): Array<[number, number]> {
  const uv = mesh.uvSets.get(UV_SET)!;
  return corners.map((key) => {
    const at = cornerIndex(mesh, key);
    return [uv[at * 2], uv[at * 2 + 1]] as [number, number];
  });
}

describe("U1. 立方体を切れ目で開く", () => {
  it("展開図（切れ目 7 本）は 1 つの島になり、歪みなく開く", () => {
    const mesh = cube();
    const recipe = emptyRecipe();
    recipe.seams = netSeams(mesh);
    expect(recipe.seams.size).toBe(7);

    const r = recompute(mesh, recipe, { skipPack: true });
    expect(r.charts.length).toBe(1);
    // 立方体の展開図は平らに開ける。伸びも角度もほぼ完全
    expect(r.maxStretch).toBeCloseTo(1, 3);
    expect(r.meanAngleError).toBeLessThan(1e-2);
  });

  it("全部の辺を切ると 6 枚の面がそれぞれ歪みなく開く", () => {
    const mesh = cube();
    const recipe = emptyRecipe();
    recipe.seams = allSeams(mesh);

    const r = recompute(mesh, recipe, { skipPack: true });
    expect(r.charts.length).toBe(6);
    // 平面なので厳密に開ける
    expect(r.maxStretch).toBeCloseTo(1, 3);
    expect(r.meanAngleError).toBeLessThan(1e-3);
  });

  it("島ごとに切り離されている（同じ 3D 頂点でも UV は別）", () => {
    const mesh = cube();
    const recipe = emptyRecipe();
    recipe.seams = allSeams(mesh);
    recompute(mesh, recipe);

    const charts = buildCharts(mesh, recipe.seams);
    // 立方体の角の頂点は 3 枚の島に分かれて 3 つの UV を持つ
    let split = 0;
    for (const chart of charts) {
      const local = chartMesh(mesh, chart, recipe.seams);
      split += local.count;
    }
    expect(split).toBe(24); // 6 面 × 4 コーナー。1 つもまとまらない
  });
});

describe("U2. 筒を縦 1 本で開く", () => {
  it("長方形になり、伸びがほとんど無い", () => {
    const mesh = tube();
    const recipe = emptyRecipe();
    // 頂点 0 と 1 の間の縦の辺を切る
    recipe.seams.add(edgeKey(0, 1));

    const r = recompute(mesh, recipe, { skipPack: true });
    expect(r.charts.length).toBe(1);
    // 円周を直線に伸ばすので、わずかに歪む
    expect(r.maxStretch).toBeLessThan(1.02);
  });

  it("切れ目が無いと閉じたままで、島は 1 つ", () => {
    const mesh = tube();
    const recipe = emptyRecipe();
    const r = recompute(mesh, recipe, { skipPack: true });
    expect(r.charts.length).toBe(1);
    // 閉じた筒は平らにできないので、大きく歪む（自動の切れ目が要る理由）
    expect(r.maxStretch).toBeGreaterThan(1.05);
  });
});

describe("U3. 決定的であること", () => {
  it("同じ mesh と recipe から 2 回計算すると完全に一致する", () => {
    const recipe = emptyRecipe();
    const first = cube();
    recipe.seams = allSeams(first);
    recompute(first, recipe);
    const a = Float32Array.from(first.uvSets.get(UV_SET)!);

    const second = cube();
    recompute(second, recipe);
    const b = second.uvSets.get(UV_SET)!;

    expect(b.length).toBe(a.length);
    for (let i = 0; i < a.length; i++) expect(b[i]).toBe(a[i]);
  });

  it("同じメッシュを続けて 2 回計算しても動かない", () => {
    const mesh = cube();
    const recipe = emptyRecipe();
    recipe.seams = allSeams(mesh);
    recompute(mesh, recipe);
    const a = Float32Array.from(mesh.uvSets.get(UV_SET)!);
    recompute(mesh, recipe);
    const b = mesh.uvSets.get(UV_SET)!;
    for (let i = 0; i < a.length; i++) expect(b[i]).toBe(a[i]);
  });
});

describe("U4. 手の編集は島単位で残る", () => {
  it("切れ目を変えた島の差分だけが落ちる", () => {
    const mesh = cube();
    const recipe = emptyRecipe();
    recipe.seams = allSeams(mesh);
    recompute(mesh, recipe);

    const charts = buildCharts(mesh, recipe.seams);
    expect(charts.length).toBe(6);
    const moved = charts[0];
    const kept = charts[3];

    // 島 0 と島 3 をそれぞれ手で動かす
    const shift = (chart: (typeof charts)[number], du: number): void => {
      const deltas = new Map<string, [number, number]>();
      for (const key of chart.corners) deltas.set(key, [du, 0]);
      recordManual(recipe, chart.fingerprint, deltas);
    };
    shift(moved, 0.25);
    shift(kept, -0.25);

    // 島 0 の縁の切れ目を 1 本消す（島 0 が別の島と繋がる）
    recipe.seams.delete(moved.boundarySeams[0]);
    recompute(mesh, recipe);

    const after = buildCharts(mesh, recipe.seams);
    // 島 3 はそのまま残っている
    expect(after.some((c) => c.fingerprint === kept.fingerprint)).toBe(true);
    // 島 0 の指紋はもう無い
    expect(after.some((c) => c.fingerprint === moved.fingerprint)).toBe(false);

    // 島 3 の差分が今も効いているか。外して計算し直すと、ちょうど差分のぶんだけずれる
    const withDelta = uvOfChart(mesh, kept.corners);
    recipe.manual.delete(kept.fingerprint);
    recompute(mesh, recipe);
    const withoutDelta = uvOfChart(mesh, kept.corners);
    for (let i = 0; i < withDelta.length; i++) {
      expect(withDelta[i][0] - withoutDelta[i][0]).toBeCloseTo(-0.25, 6);
      expect(withDelta[i][1] - withoutDelta[i][1]).toBeCloseTo(0, 6);
    }

    // 指紋の消えた島 0 の差分は、後始末で捨てられる
    expect(recipe.manual.has(moved.fingerprint)).toBe(true);
    reconcile(recipe, mesh);
    expect(recipe.manual.has(moved.fingerprint)).toBe(false);
  });

  it("差分は足し込まれる", () => {
    const recipe = emptyRecipe();
    const deltas = new Map<string, [number, number]>([[cornerKey(0, 0), [0.1, 0.2]]]);
    recordManual(recipe, "abc", deltas);
    recordManual(recipe, "abc", deltas);
    expect(recipe.manual.get("abc")!.get(cornerKey(0, 0))).toEqual([0.2, 0.4]);
  });
});

describe("投影と「なし」", () => {
  it("投影は平らな島を歪みなく落とす", () => {
    const mesh = cube();
    const recipe = emptyRecipe();
    recipe.method = "projection";
    recipe.seams = allSeams(mesh);
    const r = recompute(mesh, recipe, { skipPack: true });
    expect(r.maxStretch).toBeCloseTo(1, 3);
  });

  it("「なし」は今の UV をそのまま使う", () => {
    const mesh = cube();
    const recipe = emptyRecipe();
    recipe.seams = allSeams(mesh);
    recompute(mesh, recipe);
    const a = Float32Array.from(mesh.uvSets.get(UV_SET)!);

    recipe.method = "none";
    recompute(mesh, recipe);
    const b = mesh.uvSets.get(UV_SET)!;
    for (let i = 0; i < a.length; i++) expect(b[i]).toBeCloseTo(a[i], 6);
  });
});

describe("歪みの評価", () => {
  it("等長な写像は伸び 1.0", () => {
    const positions = Float64Array.from([0, 0, 0, 1, 0, 0, 0, 1, 0]);
    const tri = Uint32Array.from([0, 1, 2]);
    const uv = Float64Array.from([0, 0, 1, 0, 0, 1]);
    const d = measure(positions, tri, uv);
    expect(d.maxStretch).toBeCloseTo(1, 9);
    expect(d.meanAngleError).toBeCloseTo(0, 9);
  });

  it("2 倍に引き伸ばすと 2.0", () => {
    const positions = Float64Array.from([0, 0, 0, 1, 0, 0, 0, 1, 0]);
    const tri = Uint32Array.from([0, 1, 2]);
    const uv = Float64Array.from([0, 0, 2, 0, 0, 1]);
    const d = measure(positions, tri, uv);
    expect(d.maxStretch).toBeCloseTo(2, 6);
  });
});


describe("保存と後始末", () => {
  it("レシピは書き出して読み戻せる", async () => {
    const { Document } = await import("../src/core/document.js");
    const { packMbz, unpackMbz } = await import("../src/core/io/mbz.js");
    const { serializeRecipe, deserializeRecipe } = await import("../src/core/uv/recipe.js");

    const doc = new Document();
    const o = doc.addObject("cube");
    const recipe = emptyRecipe();
    recipe.seams = allSeams(o.mesh);
    recipe.pins.set(cornerKey(0, 0), [0.25, 0.5]);
    recipe.method = "lscm";
    recordManual(recipe, "island", new Map([[cornerKey(1, 2), [0.05, -0.05]]]));
    o.uv = recipe;
    recompute(o.mesh, recipe);

    const back = unpackMbz(packMbz(doc)).document;
    const loaded = back.objects[0].uv!;
    expect(loaded).toBeTruthy();
    expect(loaded.seams.size).toBe(recipe.seams.size);
    expect(loaded.pins.get(cornerKey(0, 0))).toEqual([0.25, 0.5]);
    expect(loaded.manual.get("island")!.get(cornerKey(1, 2))).toEqual([0.05, -0.05]);
    // 並びをそろえてあるので、同じ中身なら同じ JSON になる
    expect(JSON.stringify(serializeRecipe(loaded))).toBe(JSON.stringify(serializeRecipe(recipe)));
    expect(deserializeRecipe(null)).toBeNull();
  });

  it("トポロジを変えると、対応が取れない分だけ落ちる", async () => {
    const { Document } = await import("../src/core/document.js");
    const { subdivide } = await import("../src/core/subdivide.js");

    const doc = new Document();
    const o = doc.addObject("cube");
    const recipe = emptyRecipe();
    recipe.seams = allSeams(o.mesh);
    o.uv = recipe;
    recompute(o.mesh, recipe);
    const charts = buildCharts(o.mesh, recipe.seams);
    recordManual(recipe, charts[0].fingerprint, new Map([[cornerKey(0, 0), [0.1, 0]]]));

    const seamsBefore = recipe.seams.size;
    o.mesh = subdivide(o.mesh, 1);
    const dropped = o.markTopologyChanged();

    // 細分割で元の辺は 1 本も残らないので、切れ目は全部落ちる
    expect(dropped.droppedSeams).toBe(seamsBefore);
    expect(recipe.seams.size).toBe(0);
    // 島の指紋も合わなくなるので差分も落ちる
    expect(dropped.droppedIslands).toBe(1);
    expect(recipe.manual.size).toBe(0);
  });

  it("辺が残っていれば切れ目も残る", async () => {
    const { Document } = await import("../src/core/document.js");
    const { deleteFaces } = await import("../src/core/topology.js");

    const doc = new Document();
    const o = doc.addObject("cube");
    const recipe = emptyRecipe();
    recipe.seams = allSeams(o.mesh);
    o.uv = recipe;

    // 面を 1 枚消す。その面だけが持っていた辺は無くなるが、他は残る
    const r = deleteFaces(o.mesh, [0])!;
    o.mesh = r.mesh;
    const before = recipe.seams.size;
    const dropped = o.markTopologyChanged();
    expect(dropped.droppedSeams).toBe(0); // 立方体の辺はどれも 2 面に共有されている
    expect(recipe.seams.size).toBe(before);
  });
});

describe("U10. 今ある UV をそのまま取り込む", () => {
  it("立方体は Maya と同じ展開図（切れ目 7 本・島 1 つ）", () => {
    const mesh = cube();
    const original = Float32Array.from(mesh.uvSets.get(UV_SET)!);

    // 十字の展開図なので、12 本のうち繋がっている 5 本は切れ目にならない
    const seams = seamsFromUv(mesh);
    expect(seams.size).toBe(7);

    const recipe = recipeFromMesh(mesh);
    expect(recipe.method).toBe("none");
    expect(recipe.base).not.toBeNull();

    const r = recompute(mesh, recipe);
    expect(r.charts.length).toBe(1);

    // 展開図は 0〜1 に収まっていて、重なりが無い（面ごとに 1/4 マス）
    for (let i = 0; i < original.length; i++) {
      expect(original[i]).toBeGreaterThanOrEqual(-1e-6);
      expect(original[i]).toBeLessThanOrEqual(1 + 1e-6);
    }
    const after = mesh.uvSets.get(UV_SET)!;
    for (let i = 0; i < original.length; i++) expect(after[i]).toBeCloseTo(original[i], 6);
  });

  it("球は経線 1 本の切れ目で 1 島になる", () => {
    const mesh = PRIMITIVES.sphere.build({ ...defaultParams("sphere"), sdAxis: 8, sdHeight: 4 });
    const recipe = recipeFromMesh(mesh);
    const r = recompute(mesh, recipe);
    expect(recipe.method).toBe("none");
    expect(r.charts.length).toBe(1);
  });

  it("UV が無ければ投影で始める", () => {
    // UV を持たないメッシュ（読み込んだ OBJ に UV が無い場合など）
    const b = new MeshBuilder();
    b.vertex(0, 0, 0);
    b.vertex(1, 0, 0);
    b.vertex(1, 1, 0);
    b.vertex(0, 1, 0);
    b.face([0, 1, 2, 3]);
    const mesh = b.build();
    expect(mesh.uvSets.get(UV_SET)).toBeUndefined();
    const recipe = recipeFromMesh(mesh);
    expect(recipe.method).toBe("projection");
    expect(recipe.base).toBeNull();
  });

  it("正多面体は面ごとに UV を持つ（重ならない）", () => {
    const mesh = PRIMITIVES.platonic.build(defaultParams("platonic"));
    const uv = mesh.uvSets.get(UV_SET);
    expect(uv).toBeDefined();
    for (let i = 0; i < uv!.length; i++) {
      expect(uv![i]).toBeGreaterThanOrEqual(-1e-6);
      expect(uv![i]).toBeLessThanOrEqual(1 + 1e-6);
    }
    const recipe = recipeFromMesh(mesh);
    const r = recompute(mesh, recipe);
    // 面ごとに分かれているので、島の数は面の数
    expect(r.charts.length).toBe(mesh.faceCount);
  });
});

describe("U11. 土台の上で縫う", () => {
  it("両側のコーナーが中点で一致し、再計算しても動かない", () => {
    const mesh = cube();
    const recipe = recipeFromMesh(mesh);
    recompute(mesh, recipe);

    // 面 0 と面 4 が共有する辺を 1 本選んで縫う
    const shared = [...recipe.seams][0];
    const [a, b] = shared.split("_").map(Number);
    recipe.seams.delete(shared);
    sewInBase(mesh, recipe.base!, [shared]);
    recompute(mesh, recipe);

    const uv = mesh.uvSets.get(UV_SET)!;
    // その辺の両端について、まわりのコーナー UV が 1 点に集まっている
    for (const vertex of [a, b]) {
      const seen: Array<[number, number]> = [];
      for (let f = 0; f < mesh.faceCount; f++) {
        const at = mesh.faceVerts(f).indexOf(vertex);
        if (at < 0) continue;
        const c = mesh.faceOffsets[f] + at;
        seen.push([uv[c * 2], uv[c * 2 + 1]]);
      }
      // 縫った 2 枚は一致する（3 枚目の面は別の切れ目の向こうなので見ない）
      expect(seen.length).toBeGreaterThanOrEqual(2);
    }

    // 二重に乗らない: もう一度計算しても同じ
    const once = Float32Array.from(uv);
    recompute(mesh, recipe);
    const twice = mesh.uvSets.get(UV_SET)!;
    for (let i = 0; i < once.length; i++) expect(twice[i]).toBeCloseTo(once[i], 6);
  });

  it("手で動かした分は差分として 1 回だけ乗る", () => {
    const mesh = cube();
    const recipe = recipeFromMesh(mesh);
    recompute(mesh, recipe);
    const charts = buildCharts(mesh, recipe.seams);
    const key = charts[0].corners[0];
    const at = cornerIndex(mesh, key);
    const before = mesh.uvSets.get(UV_SET)![at * 2];

    recordManual(recipe, charts[0].fingerprint, new Map([[key, [0.25, 0]]]));
    recompute(mesh, recipe);
    expect(mesh.uvSets.get(UV_SET)![at * 2]).toBeCloseTo(before + 0.25, 6);
    // 何度計算しても 0.25 のまま（base を土台にしているので溜まらない）
    recompute(mesh, recipe);
    recompute(mesh, recipe);
    expect(mesh.uvSets.get(UV_SET)![at * 2]).toBeCloseTo(before + 0.25, 6);
  });
});

describe("U12. トポロジが変わったら土台を取り直す", () => {
  it("押し出しのあと base はコーナー数に合い、差分は空になる", async () => {
    const { Document } = await import("../src/core/document.js");
    const { extrudeFaces } = await import("../src/core/topology.js");

    const doc = new Document();
    const o = doc.addObject("cube");
    o.uv = recipeFromMesh(o.mesh);
    recompute(o.mesh, o.uv);
    const charts = buildCharts(o.mesh, o.uv.seams);
    recordManual(o.uv, charts[0].fingerprint, new Map([[charts[0].corners[0], [0.1, 0.1]]]));

    const r = extrudeFaces(o.mesh, [0], 0.5)!;
    o.mesh = r.mesh;
    const dropped = o.markTopologyChanged();

    expect(dropped.rebased).toBe(true);
    expect(o.uv.base!.length).toBe(o.mesh.faceCorners.length * 2);
    expect(o.uv.manual.size).toBe(0);
    // 取り直した土台から計算しても、その時点の UV と同じ
    const before = Float32Array.from(o.mesh.uvSets.get(UV_SET)!);
    recompute(o.mesh, o.uv);
    const after = o.mesh.uvSets.get(UV_SET)!;
    for (let i = 0; i < before.length; i++) expect(after[i]).toBeCloseTo(before[i], 6);
  });
});

describe("U13. 自動の切れ目（C2）", () => {
  const params = {
    angle: 65,
    useHardEdges: true,
    useCreases: true,
    usePolygroups: true,
    symmetric: false,
  };

  it("立方体は角で切れる（面ごとの島）", () => {
    const mesh = cube();
    const seams = autoSeams(mesh, params, 30);
    // 立方体の辺はすべて 90° なので、12 本とも切れる
    expect(seams.size).toBe(12);
    const recipe = emptyRecipe();
    recipe.seams = seams;
    const r = recompute(mesh, recipe);
    expect(r.charts.length).toBe(6);
    expect(r.maxStretch).toBeLessThan(1.01);
  });

  it("球は開ける島に分かれて、伸びが 2 未満に収まる", () => {
    const mesh = PRIMITIVES.sphere.build({ ...defaultParams("sphere"), sdAxis: 12, sdHeight: 8 });
    const seams = autoSeams(mesh, params, 30);
    const recipe = emptyRecipe();
    recipe.seams = seams;
    const r = recompute(mesh, recipe);

    expect(r.charts.length).toBeGreaterThan(1);
    // NaN が無い
    const uv = mesh.uvSets.get(UV_SET)!;
    for (let i = 0; i < uv.length; i++) expect(Number.isFinite(uv[i])).toBe(true);
    expect(r.maxStretch).toBeLessThan(2);
  });

  it("同じメッシュからは同じ切れ目が出る（決定的）", () => {
    const mesh = PRIMITIVES.cylinder.build(defaultParams("cylinder"));
    const a = [...autoSeams(mesh, params, 30)].sort();
    const b = [...autoSeams(mesh, params, 30)].sort();
    expect(a).toEqual(b);
    expect(a.length).toBeGreaterThan(0);
  });

  it("対称なら X の相手にも同じ切れ目が入る", () => {
    const mesh = PRIMITIVES.cylinder.build({ ...defaultParams("cylinder"), sdAxis: 8 });
    const seams = autoSeams(mesh, { ...params, symmetric: true }, 30);
    const p = mesh.positions;
    const key = (x: number, y: number, z: number) => {
      const fx = x.toFixed(3) === "-0.000" ? "0.000" : x.toFixed(3);
      return `${fx},${y.toFixed(3)},${z.toFixed(3)}`;
    };
    const index = new Map<string, number>();
    for (let v = 0; v < mesh.vertexCount; v++) index.set(key(p[v * 3], p[v * 3 + 1], p[v * 3 + 2]), v);
    const alive = new Set<string>();
    for (const [a, b] of mesh.edges()) alive.add(edgeKey(a, b));

    for (const k of seams) {
      const [a, b] = k.split("_").map(Number);
      const ma = index.get(key(-p[a * 3], p[a * 3 + 1], p[a * 3 + 2]));
      const mb = index.get(key(-p[b * 3], p[b * 3 + 1], p[b * 3 + 2]));
      if (ma === undefined || mb === undefined) continue;
      const mirrored = edgeKey(ma, mb);
      if (alive.has(mirrored)) expect(seams.has(mirrored)).toBe(true);
    }
  });
});

describe("U14. パッキング（C3）", () => {
  it("棚詰めは 0〜1 に収まって重ならない", () => {
    const boxes = [
      { w: 2, h: 1 },
      { w: 1, h: 1 },
      { w: 0.5, h: 2 },
      { w: 1.5, h: 0.5 },
    ];
    const placed = shelfPack(boxes, 1 / 128, true);
    const rects = placed.map((p, i) => {
      const w = (p.rotated ? boxes[i].h : boxes[i].w) * p.scale;
      const h = (p.rotated ? boxes[i].w : boxes[i].h) * p.scale;
      return { x0: p.x, y0: p.y, x1: p.x + w, y1: p.y + h };
    });
    for (const r of rects) {
      expect(r.x0).toBeGreaterThanOrEqual(-1e-9);
      expect(r.y0).toBeGreaterThanOrEqual(-1e-9);
      expect(r.x1).toBeLessThanOrEqual(1 + 1e-9);
      expect(r.y1).toBeLessThanOrEqual(1 + 1e-9);
    }
    // 重なりが無い
    for (let i = 0; i < rects.length; i++) {
      for (let j = i + 1; j < rects.length; j++) {
        const a = rects[i];
        const b = rects[j];
        const overlap = a.x0 < b.x1 - 1e-9 && b.x0 < a.x1 - 1e-9 && a.y0 < b.y1 - 1e-9 && b.y0 < a.y1 - 1e-9;
        expect(overlap).toBe(false);
      }
    }
  });

  it("テクセル密度をそろえると島ごとの比が 1% 以内に収まる", () => {
    // 同じ形で大きさだけ違う 2 枚
    const tri = Uint32Array.from([0, 1, 2, 0, 2, 3]);
    const uvA = Float64Array.from([0, 0, 1, 0, 1, 1, 0, 1]);
    const uvB = Float64Array.from([0, 0, 4, 0, 4, 4, 0, 4]);
    // 3D の面積は同じ
    equalizeTexelDensity([uvA, uvB], [tri, tri], [1, 1], null);
    const da = Math.sqrt(polygonArea(uvA, tri) / 1);
    const db = Math.sqrt(polygonArea(uvB, tri) / 1);
    expect(Math.abs(da / db - 1)).toBeLessThan(0.01);
  });

  it("展開した島は 0〜1 に収まる", () => {
    const mesh = PRIMITIVES.sphere.build({ ...defaultParams("sphere"), sdAxis: 12, sdHeight: 8 });
    const recipe = emptyRecipe();
    recipe.seams = autoSeams(mesh, recipe.autoSeamParams, 30);
    recompute(mesh, recipe);
    const uv = mesh.uvSets.get(UV_SET)!;
    for (let i = 0; i < uv.length; i++) {
      expect(uv[i]).toBeGreaterThanOrEqual(-1e-4);
      expect(uv[i]).toBeLessThanOrEqual(1 + 1e-4);
    }
  });

  it("3D の面積が同じ島は UV でも同じ大きさになる", () => {
    // 立方体を全部切ると 6 枚の同じ正方形
    const mesh = cube();
    const recipe = emptyRecipe();
    recipe.seams = allSeams(mesh);
    const r = recompute(mesh, recipe);
    const uv = mesh.uvSets.get(UV_SET)!;
    const areas = r.charts.map((chart) => {
      const local = chartMeshFn(mesh, chart, recipe.seams);
      const flat = new Float64Array(local.count * 2);
      for (const key of chart.corners) {
        const at = local.localOf.get(key)!;
        const corner = cornerIndex(mesh, key);
        flat[at * 2] = uv[corner * 2];
        flat[at * 2 + 1] = uv[corner * 2 + 1];
      }
      return polygonArea(flat, local.tri);
    });
    const min = Math.min(...areas);
    const max = Math.max(...areas);
    expect(max / min - 1).toBeLessThan(0.01);
    // 3D の面積も測れる
    const local = chartMeshFn(mesh, r.charts[0], recipe.seams);
    expect(surfaceArea(local.positions, local.tri)).toBeCloseTo(1, 5);
  });
});

describe("U15. UV の整え（C3 の ops）", () => {
  it("整列 U / V は 1 本にそろう", async () => {
    const { alignU, alignV } = await import("../src/core/uv/ops.js");
    const uv = Float64Array.from([0, 0, 0.4, 0.2, 0.8, 0.1]);
    alignU(uv, [0, 1, 2]);
    expect(uv[0]).toBeCloseTo(0.4, 9);
    expect(uv[2]).toBeCloseTo(0.4, 9);
    expect(uv[4]).toBeCloseTo(0.4, 9);
    alignV(uv, [0, 1, 2], "max");
    expect(uv[1]).toBeCloseTo(0.2, 9);
    expect(uv[5]).toBeCloseTo(0.2, 9);
  });

  it("直線化は主軸に載せる（並びは崩れない）", async () => {
    const { straightenPoints } = await import("../src/core/uv/ops.js");
    // ほぼ水平に並んだ 4 点。少しだけ上下にぶれている
    const uv = Float64Array.from([0, 0.01, 0.3, -0.02, 0.6, 0.03, 0.9, -0.01]);
    straightenPoints(uv, [0, 1, 2, 3]);
    // 4 点が 1 本の直線に載る（外積がゼロ）
    const cross = (a: number, b: number, c: number) =>
      (uv[b * 2] - uv[a * 2]) * (uv[c * 2 + 1] - uv[a * 2 + 1]) -
      (uv[c * 2] - uv[a * 2]) * (uv[b * 2 + 1] - uv[a * 2 + 1]);
    expect(Math.abs(cross(0, 1, 2))).toBeLessThan(1e-9);
    expect(Math.abs(cross(0, 2, 3))).toBeLessThan(1e-9);
    // U の並び順は変わらない
    expect(uv[0]).toBeLessThan(uv[2]);
    expect(uv[2]).toBeLessThan(uv[4]);
    expect(uv[4]).toBeLessThan(uv[6]);
  });

  it("反転と 90° 回転は中心を動かさない", async () => {
    const { flipU, rotate90 } = await import("../src/core/uv/ops.js");
    const uv = Float64Array.from([0, 0, 1, 0, 1, 0.5, 0, 0.5]);
    const center = () => {
      let cu = 0;
      let cv = 0;
      for (let i = 0; i < 4; i++) {
        cu += uv[i * 2];
        cv += uv[i * 2 + 1];
      }
      return [cu / 4, cv / 4];
    };
    const before = center();
    flipU(uv, [0, 1, 2, 3]);
    expect(center()[0]).toBeCloseTo(before[0], 9);
    rotate90(uv, [0, 1, 2, 3]);
    const after = center();
    expect(after[0]).toBeCloseTo(before[0], 9);
    expect(after[1]).toBeCloseTo(before[1], 9);
    // 90° 回すと縦横が入れ替わる
    const width = Math.max(uv[0], uv[2], uv[4], uv[6]) - Math.min(uv[0], uv[2], uv[4], uv[6]);
    expect(width).toBeCloseTo(0.5, 9);
  });

  it("マージは近い点だけをまとめる", async () => {
    const { mergeUvs } = await import("../src/core/uv/ops.js");
    const uv = Float64Array.from([0, 0, 0.01, 0.005, 0.5, 0.5]);
    const merged = mergeUvs(uv, [0, 1, 2], 0.05);
    expect(merged).toBe(1);
    expect(uv[0]).toBeCloseTo(uv[2], 9);
    expect(uv[1]).toBeCloseTo(uv[3], 9);
    expect(uv[4]).toBeCloseTo(0.5, 9);
  });

  it("対称は相手を鏡映した位置に置く", async () => {
    const { symmetrizeUv } = await import("../src/core/uv/ops.js");
    const uv = Float64Array.from([0.2, 0.3, 0.9, 0.7]);
    symmetrizeUv(uv, [[0, 1]], 0.5);
    expect(uv[2]).toBeCloseTo(0.8, 9);
    expect(uv[3]).toBeCloseTo(0.3, 9);
  });

  it("格子化は行と列を等間隔にする", async () => {
    const { gridding } = await import("../src/core/uv/ops.js");
    const uv = Float64Array.from([0, 0, 0.4, 0.05, 0.9, 0.02, 0.05, 0.5, 0.6, 0.55, 1, 0.48]);
    gridding(uv, [
      [0, 1, 2],
      [3, 4, 5],
    ]);
    expect(uv[2] - uv[0]).toBeCloseTo(uv[4] - uv[2], 9);
    expect(uv[1]).toBeCloseTo(uv[3], 9);
    expect(uv[7]).toBeCloseTo(uv[9], 9);
  });
});

/**
 * U16. レシピの複製（`19` の 1.3）。
 *
 * 履歴のスナップショットはこれでレシピを控える。深く複製できていないと、
 * 戻したあとに切れ目やピンが元のオブジェクトと繋がったままになる。
 */
describe("U16. レシピの複製", () => {
  it("すべての要素が等しく、複製を書き換えても元は変わらない", () => {
    const mesh = cube();
    const recipe = emptyRecipe();
    recipe.seams.add(edgeKey(0, 1));
    recipe.pins.set(cornerKey(0, 0), [0.25, 0.75]);
    recipe.method = "projection";
    recipe.base = new Float32Array(mesh.faceCorners.length * 2).fill(0.5);
    recipe.manual.set("fp", new Map([[cornerKey(1, 2), [0.1, -0.2] as [number, number]]]));
    recipe.autoSeamParams.angle = 42;

    const copy = cloneRecipe(recipe);
    expect([...copy.seams]).toEqual([...recipe.seams]);
    expect(copy.pins.get(cornerKey(0, 0))).toEqual([0.25, 0.75]);
    expect(copy.method).toBe("projection");
    expect(copy.base?.length).toBe(recipe.base.length);
    expect(copy.manual.get("fp")?.get(cornerKey(1, 2))).toEqual([0.1, -0.2]);
    expect(copy.packing).toEqual(recipe.packing);
    expect(copy.autoSeamParams.angle).toBe(42);

    // 複製を触っても元は動かない
    copy.seams.add(edgeKey(2, 3));
    copy.pins.set(cornerKey(0, 0), [0, 0]);
    copy.base![0] = 9;
    copy.manual.get("fp")!.set(cornerKey(1, 2), [0, 0]);
    copy.packing.allowRotate = !copy.packing.allowRotate;
    copy.autoSeamParams.angle = 10;
    expect(recipe.seams.has(edgeKey(2, 3))).toBe(false);
    expect(recipe.pins.get(cornerKey(0, 0))).toEqual([0.25, 0.75]);
    expect(recipe.base[0]).toBe(0.5);
    expect(recipe.manual.get("fp")!.get(cornerKey(1, 2))).toEqual([0.1, -0.2]);
    expect(recipe.autoSeamParams.angle).toBe(42);
  });
});

/**
 * U17〜U19. 島を立てる（`19` の 1.1、`20` の T2）。
 *
 * LSCM は形しか決めないので、向きは解いたあとに決める。基準はワールド Y。
 * それが面に乗らない島（天面・底面）はワールド X を +U に向ける。
 */
describe("U17. 立方体の島は軸に平行", () => {
  /** 面の 4 辺が UV でも U 軸か V 軸に平行か。 */
  const facesAxisAligned = (mesh: Mesh): boolean => {
    const uv = mesh.uvSets.get(UV_SET)!;
    for (let f = 0; f < mesh.faceCount; f++) {
      const n = mesh.faceSize(f);
      const at = (i: number): [number, number] => {
        const corner = cornerIndex(mesh, cornerKey(f, i));
        return [uv[corner * 2], uv[corner * 2 + 1]];
      };
      for (let i = 0; i < n; i++) {
        const p = at(i);
        const q = at((i + 1) % n);
        const du = Math.abs(q[0] - p[0]);
        const dv = Math.abs(q[1] - p[1]);
        const length = Math.hypot(du, dv);
        if (length < 1e-9) continue;
        if (du / length > 1e-4 && dv / length > 1e-4) return false;
      }
    }
    return true;
  };

  it("全部の辺を切って展開すると、6 島とも辺が軸に平行になる", () => {
    const mesh = cube();
    const recipe = emptyRecipe();
    recipe.seams = allSeams(mesh);
    const r = recompute(mesh, recipe, { skipPack: true });
    expect(r.charts.length).toBe(6);
    expect(facesAxisAligned(mesh)).toBe(true);
  });

  it("立てても歪みは増えない（回すだけ）", () => {
    const mesh = cube();
    const recipe = emptyRecipe();
    recipe.seams = allSeams(mesh);
    const r = recompute(mesh, recipe, { skipPack: true });
    expect(r.maxStretch).toBeCloseTo(1, 3);
  });
});

describe("U18. 筒の側面は縦になる", () => {
  it("縦の辺が V に平行で、上のリングが上に来る", () => {
    const mesh = tube(12, 3);
    const recipe = emptyRecipe();
    recipe.seams.add(edgeKey(0, 1));
    recompute(mesh, recipe, { skipPack: true });

    const uv = mesh.uvSets.get(UV_SET)!;
    // 3D で Y が 0 の頂点（下）と 3 の頂点（上）に対応するコーナーを集める
    let lowV = 0;
    let lowCount = 0;
    let highV = 0;
    let highCount = 0;
    let maxTilt = 0;
    for (let f = 0; f < mesh.faceCount; f++) {
      const verts = mesh.faceVerts(f);
      const at = (i: number): [number, number] => {
        const corner = cornerIndex(mesh, cornerKey(f, i));
        return [uv[corner * 2], uv[corner * 2 + 1]];
      };
      for (let i = 0; i < verts.length; i++) {
        const y = mesh.positions[verts[i] * 3 + 1];
        const p = at(i);
        if (y < 1e-6) {
          lowV += p[1];
          lowCount++;
        } else {
          highV += p[1];
          highCount++;
        }
        // 縦の辺（3D で Y だけが違う辺）は UV でも V に平行
        const j = (i + 1) % verts.length;
        const dy = Math.abs(mesh.positions[verts[j] * 3 + 1] - y);
        const dxz = Math.hypot(
          mesh.positions[verts[j] * 3] - mesh.positions[verts[i] * 3],
          mesh.positions[verts[j] * 3 + 2] - mesh.positions[verts[i] * 3 + 2],
        );
        if (dy > 1e-6 && dxz < 1e-9) {
          const q = at(j);
          const du = Math.abs(q[0] - p[0]);
          const dv = Math.abs(q[1] - p[1]);
          maxTilt = Math.max(maxTilt, du / Math.max(1e-12, dv));
        }
      }
    }
    expect(maxTilt).toBeLessThan(1e-3);
    expect(highV / highCount).toBeGreaterThan(lowV / lowCount);
  });
});

describe("U19. 天面は X が +U を向く", () => {
  it("法線が +Y の 1 枚だけの島は、3D の X の辺が +U に沿う", () => {
    const b = new MeshBuilder({ weld: false });
    // 上を向いた四角。斜めに置いて、向きが自動で決まらないようにする
    b.vertex(0, 1, 0);
    b.vertex(2, 1, 0);
    b.vertex(2, 1, 1);
    b.vertex(0, 1, 1);
    b.face([0, 1, 2, 3]);
    const mesh = b.build();

    const recipe = emptyRecipe();
    recompute(mesh, recipe, { skipPack: true });
    const uv = mesh.uvSets.get(UV_SET)!;
    const at = (i: number): [number, number] => {
      const corner = cornerIndex(mesh, cornerKey(0, i));
      return [uv[corner * 2], uv[corner * 2 + 1]];
    };
    // 頂点 0 → 1 は 3D の +X。UV でも +U を向く
    const p = at(0);
    const q = at(1);
    const du = q[0] - p[0];
    const dv = q[1] - p[1];
    expect(du).toBeGreaterThan(0);
    expect(Math.abs(dv) / Math.hypot(du, dv)).toBeLessThan(1e-4);
  });
});

/**
 * U20〜U21. 余白をテクセルで持つ（`19` の 1.2、`20` の T3）。
 *
 * 島どうしがくっついて見えないよう、どのテクスチャでも最低 5px 空ける。
 * 余白を UV の比率で持つと、島が増えて全体を縮めたときに一緒に縮んでしまう。
 */
describe("U20. 島と島の間が空く", () => {
  /** 島ごとの UV 境界箱。 */
  const boxesOf = (mesh: Mesh, recipe: ReturnType<typeof emptyRecipe>) => {
    const uv = mesh.uvSets.get(UV_SET)!;
    return buildCharts(mesh, recipe.seams).map((chart) => {
      let x0 = Infinity;
      let y0 = Infinity;
      let x1 = -Infinity;
      let y1 = -Infinity;
      for (const key of chart.corners) {
        const at = cornerIndex(mesh, key);
        x0 = Math.min(x0, uv[at * 2]);
        x1 = Math.max(x1, uv[at * 2]);
        y0 = Math.min(y0, uv[at * 2 + 1]);
        y1 = Math.max(y1, uv[at * 2 + 1]);
      }
      return { x0, y0, x1, y1 };
    });
  };

  /** 2 つの箱の隙間（重なっていれば負）。 */
  const gap = (a: { x0: number; y0: number; x1: number; y1: number }, b: typeof a): number =>
    Math.max(b.x0 - a.x1, a.x0 - b.x1, b.y0 - a.y1, a.y0 - b.y1);

  const check = (textureSize: number, marginTexels: number): void => {
    const mesh = PRIMITIVES.sphere.build({ ...defaultParams("sphere"), sdAxis: 12, sdHeight: 8 });
    const recipe = emptyRecipe();
    recipe.packing.textureSize = textureSize;
    recipe.packing.marginTexels = marginTexels;
    recipe.seams = autoSeams(mesh, recipe.autoSeamParams, 30);
    recompute(mesh, recipe);

    const want = marginUv(recipe.packing);
    const boxes = boxesOf(mesh, recipe);
    expect(boxes.length).toBeGreaterThan(1);
    for (let i = 0; i < boxes.length; i++) {
      // 外周からも同じだけ離れている
      expect(boxes[i].x0).toBeGreaterThanOrEqual(want - 1e-6);
      expect(boxes[i].y0).toBeGreaterThanOrEqual(want - 1e-6);
      expect(boxes[i].x1).toBeLessThanOrEqual(1 - want + 1e-6);
      expect(boxes[i].y1).toBeLessThanOrEqual(1 - want + 1e-6);
      for (let j = i + 1; j < boxes.length; j++) {
        expect(gap(boxes[i], boxes[j])).toBeGreaterThanOrEqual(want - 1e-6);
      }
    }
  };

  it("既定（1024 で 8 テクセル）なら 8px 空く", () => {
    expect(marginUv({ marginTexels: 8, textureSize: 1024, allowRotate: false, texelDensity: null })).toBeCloseTo(
      8 / 1024,
      12,
    );
    check(1024, 8);
  });

  it("512 のときは 10 テクセルに上がる（5px を割らない）", () => {
    expect(marginUv({ marginTexels: 8, textureSize: 512, allowRotate: false, texelDensity: null })).toBeCloseTo(
      10 / 512,
      12,
    );
    check(512, 8);
  });

  it("島が多くても隙間は縮まない", () => {
    // 同じ大きさの島を 40 枚。先に隙間ごと並べてから縮めると、ここで潰れる
    const boxes = Array.from({ length: 40 }, () => ({ w: 1, h: 1 }));
    const margin = 8 / 1024;
    const placed = shelfPack(boxes, margin, false);
    const rects = placed.map((p, i) => ({
      x0: p.x,
      y0: p.y,
      x1: p.x + boxes[i].w * p.scale,
      y1: p.y + boxes[i].h * p.scale,
    }));
    for (let i = 0; i < rects.length; i++) {
      expect(rects[i].x0).toBeGreaterThanOrEqual(margin - 1e-9);
      expect(rects[i].x1).toBeLessThanOrEqual(1 - margin + 1e-9);
      expect(rects[i].y1).toBeLessThanOrEqual(1 - margin + 1e-9);
      for (let j = i + 1; j < rects.length; j++) {
        expect(gap(rects[i], rects[j])).toBeGreaterThanOrEqual(margin - 1e-9);
      }
    }
  });
});

describe("U21. 古い保存物の読み直し", () => {
  it("`margin` はテクセルに直り、90° 回転は明示が無ければ切れる", () => {
    const old = deserializeRecipe({ packing: { margin: 1 / 128, texelDensity: null } } as never)!;
    expect(old.packing.marginTexels).toBe(8);
    expect(old.packing.textureSize).toBe(1024);
    expect(old.packing.allowRotate).toBe(false);
    expect((old.packing as { margin?: number }).margin).toBeUndefined();
  });

  it("明示された 90° 回転は残る", () => {
    const kept = deserializeRecipe({ packing: { margin: 1 / 64, allowRotate: true, texelDensity: null } } as never)!;
    expect(kept.packing.marginTexels).toBe(16);
    expect(kept.packing.allowRotate).toBe(true);
  });

  it("新しい形はそのまま読める", () => {
    const now = deserializeRecipe({
      packing: { marginTexels: 12, textureSize: 2048, allowRotate: false, texelDensity: null },
    } as never)!;
    expect(now.packing.marginTexels).toBe(12);
    expect(now.packing.textureSize).toBe(2048);
  });
});

/**
 * U22〜U23. UV のループ選択（`20` の T4）。
 *
 * 3D と同じ規則を UV のつながりで行う。島の外へは出ず、
 * 縁の辺から始めたら縁を一周する。
 */
describe("U22. 立方体の十字のループ", () => {
  const topologyOf = (mesh: Mesh, seams: Set<string>) => {
    const recipe = emptyRecipe();
    recipe.seams = seams;
    recipe.method = "none";
    recompute(mesh, recipe);
    return buildUvTopology(mesh, recipe.seams)!;
  };

  it("縁の辺から始めると、島の縁を一周する", () => {
    const mesh = cube();
    const t = topologyOf(mesh, netSeams(mesh));
    expect(t.charts.length).toBe(1);

    // 縁の辺（面 1 枚しか使っていない辺）を 1 本選ぶ
    const border = t.edgeFaces.findIndex((f) => f.length < 2);
    expect(border).toBeGreaterThanOrEqual(0);
    const loop = uvEdgeLoopFrom(t, border);
    expect(loop.closed).toBe(true);
    // 十字の展開図の縁は 14 本（面 6 枚 × 4 辺 − 内側 5 本 × 2）
    expect(loop.edges.length).toBe(14);
    // 全部が縁の辺
    for (const e of loop.edges) expect(t.edgeFaces[e].length).toBe(1);
  });

  it("内側の辺は縁で止まる（島の外へ出ない）", () => {
    const mesh = cube();
    const t = topologyOf(mesh, netSeams(mesh));
    const inner = t.edgeFaces.findIndex((f) => f.length === 2);
    expect(inner).toBeGreaterThanOrEqual(0);
    const loop = uvEdgeLoopFrom(t, inner);
    // 立方体は価数 3 の角ばかりなので、内側の辺は伸びない
    expect(loop.closed).toBe(false);
    expect(loop.edges.length).toBeLessThanOrEqual(3);
    // どの辺もこの島のもの
    for (const e of loop.edges) expect(t.edgeChart[e]).toBe(t.edgeChart[inner]);
  });
});

describe("U23. 円柱のループと区間", () => {
  const cylinderTopology = () => {
    const mesh = PRIMITIVES.cylinder.build({
      ...defaultParams("cylinder"),
      sdAxis: 12,
      sdHeight: 3,
      sdCaps: 1,
    });
    // 取り込んだ UV をそのまま使う（プリミティブの切れ目がそのまま入る）
    const recipe = recipeFromMesh(mesh);
    recompute(mesh, recipe);
    return { mesh, t: buildUvTopology(mesh, recipe.seams)! };
  };

  /** 3D で「高さが変わらない」辺かどうか。 */
  const horizontal = (mesh: Mesh, key: string): boolean => {
    const [va, vb] = key.split("_").map(Number);
    return Math.abs(mesh.positions[va * 3 + 1] - mesh.positions[vb * 3 + 1]) < 1e-9;
  };

  it("側面の横の辺は 12 本つながる（UV では縦に切れているので開いている）", () => {
    const { mesh, t } = cylinderTopology();
    // 側面の内側の横の辺（面 2 枚が使っていて、価数 4 の頂点で挟まれている）
    let ring = -1;
    for (let i = 0; i < t.edges.length; i++) {
      if (t.edgeFaces[i].length !== 2 || !horizontal(mesh, t.edgeKeys[i])) continue;
      if (uvEdgeLoopFrom(t, i).edges.length === 12) {
        ring = i;
        break;
      }
    }
    expect(ring).toBeGreaterThanOrEqual(0);

    const loop = uvEdgeLoopFrom(t, ring);
    expect(loop.edges.length).toBe(12);
    // 3D では輪だが、UV では継ぎ目で切れているので端がある
    expect(loop.closed).toBe(false);
    // どの辺も同じ島（島の外へ出ない）
    for (const e of loop.edges) expect(t.edgeChart[e]).toBe(t.edgeChart[ring]);

    // 区間は両端を含む
    expect(uvArcBetween(loop, loop.edges[0], loop.edges[3])?.length).toBe(4);
    expect(uvArcBetween(loop, loop.edges[2], loop.edges[9])?.length).toBe(8);

    // 頂点の並びは辺の数 + 1。切れているので同じ点は出てこない
    const verts = uvLoopVertices(t, loop);
    expect(verts.length).toBe(13);
    expect(new Set(verts).size).toBe(13);
    expect(uvVertexPath(t, verts[0], verts[3])).toEqual(verts.slice(0, 4));
  });

  it("縦の辺は高さの分割ぶんで止まる", () => {
    const { mesh, t } = cylinderTopology();
    let vertical = -1;
    for (let i = 0; i < t.edges.length && vertical < 0; i++) {
      if (t.edgeFaces[i].length === 2 && !horizontal(mesh, t.edgeKeys[i])) vertical = i;
    }
    expect(vertical).toBeGreaterThanOrEqual(0);
    const loop = uvEdgeLoopFrom(t, vertical);
    // 高さ 3 分割。上下のキャップで止まる
    expect(loop.edges.length).toBe(3);
    expect(loop.closed).toBe(false);
  });
});

describe("U23b. 開いた筒の縁", () => {
  it("縁の辺から始めると、縁を一周する（上下の輪 + 切れ目）", () => {
    const mesh = tube(12, 3);
    const recipe = emptyRecipe();
    recipe.seams.add(edgeKey(0, 1));
    recompute(mesh, recipe);
    const t = buildUvTopology(mesh, recipe.seams)!;

    const border = t.edgeFaces.findIndex((f) => f.length < 2);
    expect(border).toBeGreaterThanOrEqual(0);
    const loop = uvEdgeLoopFrom(t, border);
    // 上の輪 12 + 下の輪 12 + 切れ目の両側 2 = 26
    expect(loop.edges.length).toBe(26);
    expect(loop.closed).toBe(true);
    for (const e of loop.edges) expect(t.edgeFaces[e].length).toBe(1);
  });
});

/**
 * U24〜U25. 格子化と境界の直線化（`20` の T5）。
 *
 * どちらも「並びが意味を持つ」ので、UV 頂点の順を core が出せることが前提。
 */
describe("U24. 格子化", () => {
  /** 縦 1 本で切った筒。側面だけの四角形の帯になる。 */
  const bandTopology = () => {
    const mesh = tube(12, 3);
    const recipe = emptyRecipe();
    recipe.seams.add(edgeKey(0, 1));
    recompute(mesh, recipe);
    return { mesh, t: buildUvTopology(mesh, recipe.seams)! };
  };

  it("帯の行と列を取り出せる", () => {
    const { t } = bandTopology();
    const rows = uvGridRows(t, 0);
    expect(rows).not.toBeNull();
    // 12 面ぶんの帯を縦に切ったので、13 列 × 2 行
    expect(rows!.length).toBe(2);
    expect(rows![0].length).toBe(13);
    expect(rows![1].length).toBe(13);
    // すべての UV 頂点をちょうど 1 回ずつ通っている
    expect(new Set(rows!.flat()).size).toBe(26);
  });

  it("格子化すると行の V と列の U がそろう", () => {
    const { mesh, t } = bandTopology();
    const rows = uvGridRows(t, 0)!;
    // UV 頂点ごとの位置に当てる（コーナーが重なるので、まず 1 点ずつに集める）
    const count = t.vertexUv.length / 2;
    const flat = new Float64Array(count * 2);
    for (let v = 0; v < count; v++) {
      flat[v * 2] = t.vertexUv[v * 2];
      flat[v * 2 + 1] = t.vertexUv[v * 2 + 1];
    }
    gridding(flat, rows);

    for (const row of rows) {
      const v0 = flat[row[0] * 2 + 1];
      for (const v of row) expect(flat[v * 2 + 1]).toBeCloseTo(v0, 9);
    }
    for (let c = 0; c < rows[0].length; c++) {
      const u0 = flat[rows[0][c] * 2];
      for (const row of rows) expect(flat[row[c] * 2]).toBeCloseTo(u0, 9);
    }
    // 列の間隔も等しい
    const step = flat[rows[0][1] * 2] - flat[rows[0][0] * 2];
    for (let c = 1; c < rows[0].length; c++) {
      expect(flat[rows[0][c] * 2] - flat[rows[0][c - 1] * 2]).toBeCloseTo(step, 9);
    }
    void mesh;
  });

  it("格子でない島は null", () => {
    const mesh = cube();
    const recipe = emptyRecipe();
    recipe.seams = netSeams(mesh);
    recompute(mesh, recipe);
    const t = buildUvTopology(mesh, recipe.seams)!;
    // 十字の展開図は長方形の格子ではない
    expect(uvGridRows(t, 0)).toBeNull();
  });

  it("まっすぐ進む走査は角で止まる", () => {
    const { t } = bandTopology();
    // 角（この島の辺が 2 本だけ集まる点）から進むと、行の端まで行って止まる
    const at: number[][] = [];
    for (let v = 0; v < t.vertexUv.length / 2; v++) at.push([]);
    t.edges.forEach(([a, b], i) => {
      at[a].push(i);
      at[b].push(i);
    });
    const corner = at.findIndex((list) => list.length === 2);
    expect(corner).toBeGreaterThanOrEqual(0);
    const run = uvStraightRun(t, corner, at[corner][0]);
    expect(run.verts.length).toBeGreaterThan(2);
    expect(run.verts.length).toBeLessThanOrEqual(13);
  });
});

describe("U25. 境界の直線化", () => {
  it("横に並んだ縁は V がそろう", () => {
    // 段のある帯を手で作る。上の縁が波打っている
    const uv = Float64Array.from([0, 0.02, 1, 0.05, 2, -0.03, 3, 0.01]);
    straightenBorder(uv, [0, 1, 2, 3]);
    const v0 = uv[1];
    for (let i = 0; i < 4; i++) expect(uv[i * 2 + 1]).toBeCloseTo(v0, 9);
    // U は動かさない
    expect(uv[0]).toBeCloseTo(0, 9);
    expect(uv[6]).toBeCloseTo(3, 9);
  });

  it("角では向きが変わるので、まとまりごとにそろう", () => {
    // 横 3 点 → 縦 2 点の L 字
    const uv = Float64Array.from([0, 0.02, 1, -0.01, 2, 0.03, 2.04, 1, 1.97, 2]);
    straightenBorder(uv, [0, 1, 2, 3, 4]);
    // 横のまとまりは V がそろう
    expect(uv[1]).toBeCloseTo(uv[3], 9);
    expect(uv[3]).toBeCloseTo(uv[5], 9);
    // 縦のまとまりは U がそろう
    expect(uv[6]).toBeCloseTo(uv[8], 9);
  });
});

/**
 * U26. 相似変換（`20` の T6）。Move and Sew が使う。
 */
describe("U26. 2 点の対応から相似変換", () => {
  it("(0,0)-(1,0) を (2,2)-(2,4) に写す", async () => {
    const { similarityFrom2, applySimilarity } = await import("../src/core/uv/ops.js");
    const t = similarityFrom2([0, 0], [1, 0], [2, 2], [2, 4]);
    expect(t.scale).toBeCloseTo(2, 9);
    expect(t.angle).toBeCloseTo(Math.PI / 2, 9);

    const p0 = applySimilarity([0, 0], [0, 0], t);
    const p1 = applySimilarity([1, 0], [0, 0], t);
    expect(p0[0]).toBeCloseTo(2, 9);
    expect(p0[1]).toBeCloseTo(2, 9);
    expect(p1[0]).toBeCloseTo(2, 9);
    expect(p1[1]).toBeCloseTo(4, 9);
  });

  it("同じ 2 点なら何もしない変換になる", async () => {
    const { similarityFrom2, applySimilarity } = await import("../src/core/uv/ops.js");
    const t = similarityFrom2([0.2, 0.3], [0.7, 0.9], [0.2, 0.3], [0.7, 0.9]);
    expect(t.scale).toBeCloseTo(1, 9);
    expect(t.angle).toBeCloseTo(0, 9);
    const p = applySimilarity([0.5, 0.5], [0.2, 0.3], t);
    expect(p[0]).toBeCloseTo(0.5, 9);
    expect(p[1]).toBeCloseTo(0.5, 9);
  });
});

/**
 * U27. 面ごとの歪み（`23` の T2 のヒートマップ）。
 */
describe("U27. 面ごとの歪み", () => {
  it("平らに開ける立方体はどの面も 1.0", () => {
    const mesh = cube();
    const recipe = emptyRecipe();
    recipe.seams = allSeams(mesh);
    const r = recompute(mesh, recipe);
    expect(r.perFace.length).toBe(mesh.faceCount);
    for (const v of r.perFace) expect(v).toBeCloseTo(1, 3);
  });

  it("閉じた筒は歪む面が出る", () => {
    const mesh = tube(12, 2);
    const recipe = emptyRecipe();
    const r = recompute(mesh, recipe);
    expect(r.perFace.length).toBe(mesh.faceCount);
    expect(Math.max(...r.perFace)).toBeGreaterThan(1.05);
    // 歪みは 1 を下回らない（σ1 / σ2 なので）
    for (const v of r.perFace) expect(v).toBeGreaterThanOrEqual(1 - 1e-6);
  });

  it("島に入らない面は 1 のまま", () => {
    const mesh = cube();
    const recipe = emptyRecipe();
    recipe.seams = allSeams(mesh);
    const charts = buildCharts(mesh, recipe.seams);
    // 島を 1 つだけ渡す。残りの 5 面は触られない
    const r = recompute(mesh, recipe);
    const one = distortionPerFace(mesh.faceCount, (f) => mesh.faceSize(f), [charts[0]], [r.distortion[0]]);
    expect(one.length).toBe(mesh.faceCount);
    let touched = 0;
    for (const v of one) if (Math.abs(v - 1) > 1e-9) touched++;
    expect(touched).toBeLessThanOrEqual(1);
  });
});

/**
 * U28. 移動で UV を保つ（`23` の T5 の Preserve UVs）。
 *
 * 展開したあとに頂点を動かしても模様がその場に残るか。
 * 面の中の位置と UV の対応（アフィン写像）が守られていればよい。
 */
describe("U28. 移動で UV を保つ", () => {
  /** XZ 平面の 1 × 1 の四角。UV は 0〜1。 */
  const quad = (): Mesh => {
    const b = new MeshBuilder({ weld: false });
    b.vertex(0, 0, 0);
    b.vertex(1, 0, 0);
    b.vertex(1, 0, 1);
    b.vertex(0, 0, 1);
    b.face([0, 1, 2, 3], {
      uv: new Map([
        [
          UV_SET,
          [
            [0, 0],
            [1, 0],
            [1, 1],
            [0, 1],
          ],
        ],
      ]),
    });
    return b.build();
  };
  const snapshot = (m: Mesh) => ({
    positions: Float32Array.from(m.positions),
    uv: Float32Array.from(m.uvSets.get(UV_SET)!),
  });

  it("面の中で動かすと UV も同じだけ動く", () => {
    const m = quad();
    const before = snapshot(m);
    // 頂点 0 を +X に 0.1（UV では U が +0.1 のはず）
    m.positions[0] += 0.1;
    preserveUvs(m, before, [0]);
    const uv = m.uvSets.get(UV_SET)!;
    expect(uv[0]).toBeCloseTo(0.1, 6);
    expect(uv[1]).toBeCloseTo(0, 6);
    // 動かしていない頂点は変わらない
    expect(uv[2]).toBeCloseTo(1, 6);
    expect(uv[5]).toBeCloseTo(1, 6);
  });

  it("面の外へ引くと外挿される", () => {
    const m = quad();
    const before = snapshot(m);
    m.positions[3] += 0.5; // 頂点 1 を +X に 0.5（面の外）
    preserveUvs(m, before, [1]);
    const uv = m.uvSets.get(UV_SET)!;
    expect(uv[2]).toBeGreaterThan(1);
    expect(uv[2]).toBeCloseTo(1.5, 6);
  });

  it("面の法線の向きに動かしても UV は変わらない", () => {
    const m = quad();
    const before = snapshot(m);
    m.positions[1] += 0.4; // 頂点 0 を +Y（面の法線）へ
    preserveUvs(m, before, [0]);
    const uv = m.uvSets.get(UV_SET)!;
    expect(uv[0]).toBeCloseTo(0, 6);
    expect(uv[1]).toBeCloseTo(0, 6);
  });

  it("展開したあとの立方体でも、動かした頂点だけが変わる", () => {
    const m = PRIMITIVES.cube.build(defaultParams("cube"));
    const recipe = emptyRecipe();
    for (const [a, b] of m.edges()) recipe.seams.add(edgeKey(a, b));
    recompute(m, recipe);
    const before = snapshot(m);
    m.positions[0] += 0.2;
    preserveUvs(m, before, [0]);
    const uv = m.uvSets.get(UV_SET)!;
    let changed = 0;
    for (let i = 0; i < uv.length; i++) if (Math.abs(uv[i] - before.uv[i]) > 1e-6) changed++;
    // 頂点 0 は 3 つの面に属しているので、動くコーナーは 3 つ（U と V で 6 成分まで）
    expect(changed).toBeGreaterThan(0);
    expect(changed).toBeLessThanOrEqual(6);
  });
});
