import { describe, expect, it } from "vitest";
import { PRIMITIVES } from "../src/core/primitives.js";
import { edgeKey } from "../src/core/mesh.js";
import {
  arcBetween,
  boundaryEdges,
  edgeLoopFrom,
  edgeRingFrom,
  growFaces,
  shellFaces,
  shrinkFaces,
} from "../src/core/selection.js";

const cube2 = () => PRIMITIVES.cube.build({ width: 1, height: 1, depth: 1, sdW: 2, sdH: 2, sdD: 2 });
const cube4 = () => PRIMITIVES.cube.build({ width: 1, height: 1, depth: 1, sdW: 4, sdH: 4, sdD: 4 });

describe("エッジループ", () => {
  it("2 分割キューブの赤道は 8 本で閉じる", () => {
    const m = cube2();
    const equator = m.edges().find(([a, b]) => {
      const pa = m.getPosition(a);
      const pb = m.getPosition(b);
      return Math.abs(pa[1]) < 1e-6 && Math.abs(pb[1]) < 1e-6;
    })!;
    const loop = edgeLoopFrom(m, equator[0], equator[1]);
    expect(loop.edges).toHaveLength(8);
    expect(loop.closed).toBe(true);
  });

  it("開いた平面では境界で止まり、両方向に伸びる", () => {
    const m = PRIMITIVES.plane.build({ width: 2, height: 2, sdW: 4, sdH: 4 });
    const middle = m.edges().find(([a, b]) => {
      const pa = m.getPosition(a);
      const pb = m.getPosition(b);
      return Math.abs(pa[2]) < 1e-6 && Math.abs(pb[2]) < 1e-6 && Math.abs(pa[2] - pb[2]) < 1e-6;
    })!;
    const loop = edgeLoopFrom(m, middle[0], middle[1]);
    expect(loop.closed).toBe(false);
    expect(loop.edges).toHaveLength(4);
  });
});

describe("エッジリング", () => {
  it("2 分割キューブのリングは 8 本で閉じる", () => {
    const m = cube2();
    const equator = m.edges().find(([a, b]) => {
      const pa = m.getPosition(a);
      const pb = m.getPosition(b);
      return Math.abs(pa[1]) < 1e-6 && Math.abs(pb[1]) < 1e-6;
    })!;
    const ring = edgeRingFrom(m, equator[0], equator[1]);
    expect(ring.edges).toHaveLength(8);
    expect(ring.closed).toBe(true);
  });

  it("離れた平行エッジの間をリングで取れる（ループでは取れない）", () => {
    const m = cube4();
    // 前面 (z = +0.5) の垂直エッジのうち、中央付近のものを x 順に並べる
    const column = m
      .edges()
      .filter(([a, b]) => {
        const pa = m.getPosition(a);
        const pb = m.getPosition(b);
        return (
          Math.abs(pa[2] - 0.5) < 1e-6 &&
          Math.abs(pb[2] - 0.5) < 1e-6 &&
          Math.abs(pa[0] - pb[0]) < 1e-6 &&
          Math.min(pa[1], pb[1]) > -1e-6 &&
          Math.max(pa[1], pb[1]) < 0.26
        );
      })
      .sort((p, q) => m.getPosition(p[0])[0] - m.getPosition(q[0])[0]);
    expect(column).toHaveLength(5);

    const e1 = column[0];
    const e2 = column[3];
    const k1 = edgeKey(e1[0], e1[1]);
    const k2 = edgeKey(e2[0], e2[1]);

    // 平行エッジは同じループには乗らない
    expect(arcBetween(edgeLoopFrom(m, e1[0], e1[1]), k1, k2)).toBeNull();

    // 同じリングには乗る。間は 4 本（両端を含む）
    const ring = edgeRingFrom(m, e1[0], e1[1]);
    expect(ring.closed).toBe(true);
    expect(ring.edges).toHaveLength(16);
    expect(arcBetween(ring, k1, k2)).toHaveLength(4);
  });

  it("閉じた列では短い側を返す", () => {
    const m = cube2();
    const equator = m.edges().find(([a, b]) => {
      const pa = m.getPosition(a);
      const pb = m.getPosition(b);
      return Math.abs(pa[1]) < 1e-6 && Math.abs(pb[1]) < 1e-6;
    })!;
    const loop = edgeLoopFrom(m, equator[0], equator[1]);
    const key = (i: number) => edgeKey(loop.edges[i][0], loop.edges[i][1]);
    expect(arcBetween(loop, key(0), key(3))).toHaveLength(4);
    expect(arcBetween(loop, key(0), key(6))).toHaveLength(3); // 反対回りの方が短い
  });
});

describe("シェルと拡張・縮小", () => {
  it("2 分割キューブは 1 つのシェル（24 面）", () => {
    const m = cube2();
    expect(shellFaces(m, 0)).toHaveLength(24);
  });

  it("平面には境界エッジがある", () => {
    const m = PRIMITIVES.plane.build({ width: 2, height: 2, sdW: 2, sdH: 2 });
    expect(boundaryEdges(m)).toHaveLength(8);
  });

  it("閉じたメッシュには境界エッジが無い", () => {
    expect(boundaryEdges(cube2())).toHaveLength(0);
  });

  it("面選択の拡張と縮小が対称に動く", () => {
    const m = cube4();
    const grown = growFaces(m, [0]);
    expect(grown.length).toBeGreaterThan(1);
    expect(shrinkFaces(m, grown)).toContain(0);
  });
});
