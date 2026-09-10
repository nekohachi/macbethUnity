/**
 * マスクの段の持ち替え（`34` の T2）。
 *
 * マスクは**1 つの段にだけ**持つので、彫る段を変えたら一緒に移す。
 * ここで見るのは「移したあとも頂点の数が合っていること」と、
 * **見ているだけの行き来でマスクを削らないこと**。
 */
import { describe, expect, it } from "vitest";
import { Document, catmullClark, type SceneObject } from "../src/core/index.js";
import { moveMaskTo } from "../src/app/levels.js";

/** 段を n 個持つオブジェクトを用意する（デルタは 0）。 */
function withLevels(n: number): SceneObject {
  const doc = new Document();
  const o = doc.addObject("cube");
  let mesh = o.mesh;
  const levels = [];
  for (let i = 1; i <= n; i++) {
    mesh = catmullClark(mesh);
    levels.push({ level: i, delta: new Float32Array(mesh.vertexCount * 3) });
  }
  o.multires = levels;
  return o;
}

/** その段の頂点数。 */
function vertsAt(o: SceneObject, level: number): number {
  let mesh = o.mesh;
  for (let i = 0; i < level; i++) mesh = catmullClark(mesh);
  return mesh.vertexCount;
}

describe("マスクを段のあいだで移す", () => {
  it("上げると頂点の数がその段に合う", () => {
    const o = withLevels(2);
    const v1 = vertsAt(o, 1);
    o.mask = { level: 1, values: new Float32Array(v1).fill(0.5) };
    moveMaskTo(o, 2);
    expect(o.mask?.level).toBe(2);
    expect(o.mask?.values.length).toBe(vertsAt(o, 2));
    // 全部同じ値なら、上げても全部同じ値のまま（境目に穴が空かない）
    for (const x of o.mask!.values) expect(x).toBeCloseTo(0.5, 6);
  });

  it("下げても頂点の数が合う", () => {
    const o = withLevels(2);
    o.mask = { level: 2, values: new Float32Array(vertsAt(o, 2)).fill(1) };
    moveMaskTo(o, 1);
    expect(o.mask?.level).toBe(1);
    expect(o.mask?.values.length).toBe(vertsAt(o, 1));
    for (const x of o.mask!.values) expect(x).toBe(1);
  });

  it("上げて下げると、下の段の値は元どおり", () => {
    const o = withLevels(2);
    const v1 = vertsAt(o, 1);
    const src = new Float32Array(v1);
    for (let v = 0; v < v1; v++) src[v] = (v % 5) / 4;
    o.mask = { level: 1, values: src.slice() };
    moveMaskTo(o, 2);
    moveMaskTo(o, 1);
    expect(Array.from(o.mask!.values)).toEqual(Array.from(src));
  });

  it("レベル 0 へは移さない（見ているだけで削らない）", () => {
    const o = withLevels(2);
    o.mask = { level: 2, values: new Float32Array(vertsAt(o, 2)).fill(0.3) };
    const was = o.mask.values.length;
    moveMaskTo(o, 0);
    // 段も長さもそのまま
    expect(o.mask?.level).toBe(2);
    expect(o.mask?.values.length).toBe(was);
  });

  it("段より上を指しても、いちばん上で止まる", () => {
    const o = withLevels(2);
    o.mask = { level: 1, values: new Float32Array(vertsAt(o, 1)).fill(0.2) };
    moveMaskTo(o, 9);
    expect(o.mask?.level).toBe(2);
    expect(o.mask?.values.length).toBe(vertsAt(o, 2));
  });

  it("全部 0 になったら持たない", () => {
    const o = withLevels(2);
    o.mask = { level: 1, values: new Float32Array(vertsAt(o, 1)) };
    moveMaskTo(o, 2);
    expect(o.mask).toBe(null);
  });

  it("マスクが無ければ何も起きない", () => {
    const o = withLevels(2);
    moveMaskTo(o, 2);
    expect(o.mask).toBe(null);
  });
});
