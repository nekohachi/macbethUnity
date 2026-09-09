import { describe, expect, it } from "vitest";
import { PRIMITIVES, defaultParams } from "../src/core/primitives.js";
import { MeshBuilder, faceUvs, type Mesh } from "../src/core/mesh.js";
import { catmullClark, subdivide, SubdivPlan } from "../src/core/subdivide.js";

const cube = () => PRIMITIVES.cube.build({ width: 1, height: 1, depth: 1, sdW: 1, sdH: 1, sdD: 1 });

describe("Catmull-Clark 細分割", () => {
  it("キューブ 1 回で 26 頂点 48 エッジ 24 面", () => {
    expect(catmullClark(cube()).stats()).toMatchObject({ vertices: 26, edges: 48, faces: 24 });
  });

  it("2 回で 98 頂点 96 面", () => {
    expect(subdivide(cube(), 2).stats()).toMatchObject({ vertices: 98, faces: 96 });
  });

  it("球に近づく（半径のばらつきが小さくなる）", () => {
    const m = subdivide(cube(), 3);
    let min = Infinity;
    let max = -Infinity;
    for (let v = 0; v < m.vertexCount; v++) {
      const p = m.getPosition(v);
      const r = Math.hypot(p[0], p[1], p[2]);
      min = Math.min(min, r);
      max = Math.max(max, r);
    }
    expect(max - min).toBeLessThan(0.05);
  });

  it("すべて四角形になる", () => {
    const m = catmullClark(PRIMITIVES.platonic.build({ kind: 4, radius: 1 }));
    for (let f = 0; f < m.faceCount; f++) expect(m.faceSize(f)).toBe(4);
  });

  it("境界のある平面でも面数と頂点数が合う", () => {
    const plane = PRIMITIVES.plane.build({ width: 2, height: 2, sdW: 2, sdH: 2 });
    expect(catmullClark(plane).stats()).toMatchObject({ vertices: 25, faces: 16 });
  });

  it("境界の角が縮まない（開いた平面の外周が保たれる）", () => {
    const plane = PRIMITIVES.plane.build({ width: 2, height: 2, sdW: 1, sdH: 1 });
    const out = catmullClark(plane);
    let maxX = -Infinity;
    for (let v = 0; v < out.vertexCount; v++) maxX = Math.max(maxX, out.getPosition(v)[0]);
    // 角は (m1 + m2 + 6P)/8 で少しだけ内へ寄るが、大きくは縮まない
    expect(maxX).toBeGreaterThan(0.7);
  });

  it("UV も細分割される", () => {
    const plane = PRIMITIVES.plane.build({ width: 2, height: 2, sdW: 2, sdH: 2 });
    const out = catmullClark(plane);
    const uv = out.uvSets.get("map1")!;
    expect(uv.length).toBe(out.cornerCount * 2);
    let maxU = -Infinity;
    for (let i = 0; i < uv.length; i += 2) maxU = Math.max(maxU, uv[i]);
    expect(maxU).toBeCloseTo(1, 5);
  });

  it("クリースは 1 段ごとに 1 減る", () => {
    const m = cube();
    const [a, b] = m.edges()[0];
    m.setCrease(a, b, 3);
    const out = catmullClark(m);
    const values = Array.from(out.crease.values());
    expect(values.length).toBeGreaterThan(0);
    for (const v of values) expect(v).toBeCloseTo(2, 5);
  });

  it("クリースが 1 以下になったら消える", () => {
    const m = cube();
    const [a, b] = m.edges()[0];
    m.setCrease(a, b, 1);
    expect(catmullClark(m).crease.size).toBe(0);
  });

  it("クリースの付いたエッジは丸まりにくい", () => {
    const sharp = cube();
    const [a, b] = sharp.edges()[0];
    sharp.setCrease(a, b, 10);
    const smooth = cube();

    const sharpOut = catmullClark(sharp);
    const smoothOut = catmullClark(smooth);
    // 同じ位置のエッジ点を比べると、クリース側の方が元の中点に近い
    const pa = sharp.getPosition(a);
    const pb = sharp.getPosition(b);
    const mid = [(pa[0] + pb[0]) / 2, (pa[1] + pb[1]) / 2, (pa[2] + pb[2]) / 2];
    const nearest = (mesh: typeof sharpOut) => {
      let best = Infinity;
      for (let v = 0; v < mesh.vertexCount; v++) {
        const p = mesh.getPosition(v);
        best = Math.min(best, Math.hypot(p[0] - mid[0], p[1] - mid[1], p[2] - mid[2]));
      }
      return best;
    };
    expect(nearest(sharpOut)).toBeLessThan(nearest(smoothOut));
  });
});

/**
 * `32` の T1。組み立てを `MeshBuilder` から typed array に移したので、
 * **移す前とまったく同じものが出る**ことを固定する。
 *
 * ここでの `MeshBuilder` 版は移す前の `SubdivPlan.build` をそのまま写したもの。
 * これが将来の速い実装の基準になる（潰れた面の扱いも含めて）。
 */
function buildWithMeshBuilder(plan: SubdivPlan, mesh: Mesh): Mesh {
  const pos = new Float32Array(plan.outCount * 3);
  plan.positions(mesh, pos);
  const b = new MeshBuilder({ weld: false });
  for (let i = 0; i < plan.outCount; i++) b.vertex(pos[i * 3], pos[i * 3 + 1], pos[i * 3 + 2]);

  const averageUv = (rows: number[][]): number[] => {
    let u = 0,
      v = 0;
    for (const r of rows) {
      u += r[0];
      v += r[1];
    }
    return [u / rows.length, v / rows.length];
  };

  for (let f = 0; f < mesh.faceCount; f++) {
    const verts = mesh.faceVerts(f);
    const uvs = faceUvs(mesh, f);
    const n = verts.length;
    const faceUvAvg = new Map<string, number[]>();
    if (uvs) for (const [name, rows] of uvs) faceUvAvg.set(name, averageUv(rows));
    for (let i = 0; i < n; i++) {
      const v = verts[i];
      const vn = verts[(i + 1) % n];
      const vp = verts[(i - 1 + n) % n];
      let uv: Map<string, number[][]> | undefined;
      if (uvs) {
        uv = new Map();
        for (const [name, rows] of uvs) {
          const cur = rows[i] ?? [0, 0];
          const next = rows[(i + 1) % n] ?? [0, 0];
          const prev = rows[(i - 1 + n) % n] ?? [0, 0];
          uv.set(name, [
            cur,
            [(cur[0] + next[0]) / 2, (cur[1] + next[1]) / 2],
            faceUvAvg.get(name)!,
            [(prev[0] + cur[0]) / 2, (prev[1] + cur[1]) / 2],
          ]);
        }
      }
      b.face([v, plan.edgePointOf(v, vn), plan.faceBase + f, plan.edgePointOf(vp, v)], {
        uv,
        polygroup: mesh.polygroup[f],
        materialId: mesh.materialId[f],
      });
    }
  }
  const out = b.build();
  for (const [key, value] of mesh.crease) {
    const next = value - 1;
    if (next <= 0) continue;
    const [a, bb] = key.split("_").map(Number);
    const mid = plan.edgePointOf(a, bb);
    if (mid < 0) continue;
    out.setCrease(a, mid, next);
    out.setCrease(mid, bb, next);
  }
  for (const [v, s] of mesh.cornerSharp) {
    const next = s - 1;
    if (next > 0) out.cornerSharp.set(v, next);
  }
  return out;
}

function expectIdentical(got: Mesh, want: Mesh): void {
  expect(got.vertexCount).toBe(want.vertexCount);
  expect(got.faceCount).toBe(want.faceCount);
  expect([...got.positions]).toEqual([...want.positions]);
  expect([...got.faceOffsets]).toEqual([...want.faceOffsets]);
  expect([...got.faceCorners]).toEqual([...want.faceCorners]);
  expect([...got.polygroup]).toEqual([...want.polygroup]);
  expect([...got.materialId]).toEqual([...want.materialId]);
  expect([...got.crease.entries()].sort()).toEqual([...want.crease.entries()].sort());
  expect([...got.cornerSharp.entries()].sort()).toEqual([...want.cornerSharp.entries()].sort());
  expect([...got.uvSets.keys()].sort()).toEqual([...want.uvSets.keys()].sort());
  for (const [name, uv] of want.uvSets) expect([...got.uvSets.get(name)!]).toEqual([...uv]);
}

describe("組み立て（assembleQuads）", () => {
  const cases: Array<[string, () => Mesh]> = [
    ["立方体", () => PRIMITIVES.cube.build(defaultParams("cube"))],
    ["球（極に三角形）", () => PRIMITIVES.sphere.build({ ...defaultParams("sphere"), sdAxis: 10, sdHeight: 7 })],
    ["平面（境界あり）", () => PRIMITIVES.plane.build({ ...defaultParams("plane"), sdW: 4, sdH: 3 })],
    ["円柱（三角形と四角形）", () => PRIMITIVES.cylinder.build({ ...defaultParams("cylinder"), sdAxis: 8 })],
  ];

  for (const [name, make] of cases) {
    it(`${name}が MeshBuilder 版と完全一致する`, () => {
      const mesh = make();
      const plan = new SubdivPlan(mesh);
      expectIdentical(plan.build(mesh), buildWithMeshBuilder(plan, mesh));
    });
  }

  it("五角形と三角形が混ざっても一致する", () => {
    const b = new MeshBuilder({ weld: false });
    b.vertex(0, 0, 0);
    b.vertex(1, 0, 0);
    b.vertex(2, 0.2, 0);
    b.vertex(2, 1, 0);
    b.vertex(1, 1.4, 0);
    b.vertex(0, 1, 0);
    b.vertex(-1, 0.5, 0.3);
    const uv = (n: number): Map<string, number[][]> =>
      new Map([["map1", Array.from({ length: n }, (_, i) => [i * 0.1, i * 0.2])]]);
    b.face([0, 1, 2, 3, 4], { uv: uv(5), polygroup: 2, materialId: 1 });
    b.face([0, 4, 5], { uv: uv(3), polygroup: 3, materialId: 0 });
    b.face([0, 5, 6], { uv: uv(3), polygroup: 3, materialId: 2 });
    const mesh = b.build();
    const plan = new SubdivPlan(mesh);
    expectIdentical(plan.build(mesh), buildWithMeshBuilder(plan, mesh));
  });

  it("クリースと頂点シャープが一致する（段が減って引き継がれる）", () => {
    const mesh = PRIMITIVES.cube.build(defaultParams("cube"));
    const edges = mesh.edges();
    mesh.setCrease(edges[0][0], edges[0][1], 0.4);
    mesh.setCrease(edges[1][0], edges[1][1], 2);
    mesh.setCrease(edges[2][0], edges[2][1], 1);
    mesh.cornerSharp.set(0, 3);
    mesh.cornerSharp.set(1, 1);
    const plan = new SubdivPlan(mesh);
    expectIdentical(plan.build(mesh), buildWithMeshBuilder(plan, mesh));
  });

  it("UV セットが 2 つあっても両方そろう", () => {
    const mesh = PRIMITIVES.cube.build(defaultParams("cube"));
    const second = new Float32Array(mesh.cornerCount * 2);
    for (let i = 0; i < second.length; i++) second[i] = i * 0.03;
    mesh.uvSets.set("map2", second);
    const plan = new SubdivPlan(mesh);
    expectIdentical(plan.build(mesh), buildWithMeshBuilder(plan, mesh));
  });

  it("UV が無いメッシュでは UV セットも作らない", () => {
    const b = new MeshBuilder({ weld: false });
    b.vertex(0, 0, 0);
    b.vertex(1, 0, 0);
    b.vertex(1, 1, 0);
    b.vertex(0, 1, 0);
    b.face([0, 1, 2, 3]);
    const mesh = b.build();
    expect(mesh.uvSets.size).toBe(0);
    const out = catmullClark(mesh);
    expect(out.uvSets.size).toBe(0);
    expect(out.faceCount).toBe(4);
  });
});
