/**
 * スライド（`17` の 5 章）。
 *
 * 見るのは 2 つ。レールに沿って t だけ滑ること（t = 0.5 で隣との中点、
 * t = 0 で元どおり）と、レールの無い頂点は動かないこと。
 */
import { describe, expect, it } from "vitest";
import { PRIMITIVES, defaultParams } from "../src/core/primitives.js";
import { subdivide } from "../src/core/subdivide.js";
import { slideRails, slideVertices } from "../src/core/slide.js";

const cube = () => PRIMITIVES.cube.build(defaultParams("cube"));

describe("S1 レールに沿って滑る", () => {
  it("t = 0.5 で隣の頂点との中点に来る", () => {
    // 円柱の真ん中の輪はきれいなエッジループになる（上下にレールが 1 本ずつ）
    const mesh = PRIMITIVES.cylinder.build({
      ...defaultParams("cylinder"),
      sdAxis: 8,
      sdHeight: 2,
      sdCaps: 0,
    });
    const base = Float32Array.from(mesh.positions);

    const band: number[] = [];
    for (let v = 0; v < mesh.vertexCount; v++) {
      if (Math.abs(base[v * 3 + 1]) < 1e-6) band.push(v);
    }
    expect(band.length).toBeGreaterThanOrEqual(8);

    const rails = slideRails(mesh, band);
    // 帯の外へ出るレールが必ずある
    for (const v of band) expect((rails.get(v) ?? []).length).toBeGreaterThan(0);

    const choice = new Map<number, number>();
    for (const v of band) choice.set(v, rails.get(v)![0]);

    slideVertices(mesh, base, choice, 0.5);
    for (const [v, n] of choice) {
      const p = mesh.getPosition(v);
      for (let a = 0; a < 3; a++) {
        expect(p[a]).toBeCloseTo((base[v * 3 + a] + base[n * 3 + a]) / 2, 6);
      }
    }

    // t = 0 で元の位置へ戻る
    slideVertices(mesh, base, choice, 0);
    for (const v of band) {
      const p = mesh.getPosition(v);
      for (let a = 0; a < 3; a++) expect(p[a]).toBeCloseTo(base[v * 3 + a], 6);
    }
  });

  it("t は 0.99 で止まる（隣に重ねない）", () => {
    const mesh = subdivide(cube(), 2);
    const base = Float32Array.from(mesh.positions);
    const rails = slideRails(mesh, [0]);
    const n = rails.get(0)![0];
    slideVertices(mesh, base, new Map([[0, n]]), 5);
    const p = mesh.getPosition(0);
    for (let a = 0; a < 3; a++) {
      expect(p[a]).toBeCloseTo(base[a] + (base[n * 3 + a] - base[a]) * 0.99, 6);
    }
  });
});

describe("S2 レールの無い頂点", () => {
  it("まわりが全部選ばれていれば動かない", () => {
    const mesh = cube();
    const base = Float32Array.from(mesh.positions);
    const all = [...Array(mesh.vertexCount).keys()];
    const rails = slideRails(mesh, all);
    for (const v of all) expect(rails.get(v)).toEqual([]);

    // レール先が無いので choice は空。呼んでも何も動かない
    slideVertices(mesh, base, new Map(), 0.5);
    for (let i = 0; i < base.length; i++) expect(mesh.positions[i]).toBeCloseTo(base[i], 6);
  });
});
