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
  emptyRecipe,
  measure,
  recompute,
  recordManual,
  reconcile,
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
