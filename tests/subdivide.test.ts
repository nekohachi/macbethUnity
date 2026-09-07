import { describe, expect, it } from "vitest";
import { PRIMITIVES } from "../src/core/primitives.js";
import { catmullClark, subdivide } from "../src/core/subdivide.js";

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
