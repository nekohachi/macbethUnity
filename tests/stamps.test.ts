/**
 * 指紋（`31` の 2、`32` の T4）。
 *
 * 見るのは 2 つだけ。**変えた段の指紋だけが変わること**と、**同じ形なら
 * 同じ指紋になること**（決まった値であること）。ここが崩れると、S3 のベイクが
 * 「古い」を取り違えて、焼き直さないか、毎回焼き直すかのどちらかになる。
 */
import { describe, expect, it } from "vitest";
import { Document, PRIMITIVES, defaultParams, extrudeFaces, Multires, changedStamps, stampsOf } from "../src/core/index.js";
import { autoSeams, recipeFromMesh, recompute } from "../src/core/uv/index.js";

function cube(): ReturnType<Document["addObject"]> {
  const doc = new Document();
  const o = doc.addObject("cube");
  return o;
}

describe("指紋", () => {
  it("同じ形なら同じ指紋（決まった値）", () => {
    const a = cube();
    const b = cube();
    expect(stampsOf(a)).toEqual(stampsOf(b));
    // 2 回取っても同じ
    expect(stampsOf(a)).toEqual(stampsOf(a));
  });

  it("頂点を 1 つ動かすと base だけ変わる", () => {
    const o = cube();
    const before = stampsOf(o);
    const p = o.mesh.getPosition(0);
    o.mesh.setPosition(0, p[0] + 0.01, p[1], p[2]);
    expect(changedStamps(before, stampsOf(o))).toEqual(["base"]);
  });

  it("動かして戻すと指紋も戻る", () => {
    const o = cube();
    const before = stampsOf(o);
    const p = o.mesh.getPosition(0);
    o.mesh.setPosition(0, p[0] + 0.5, p[1], p[2]);
    expect(changedStamps(before, stampsOf(o))).toEqual(["base"]);
    o.mesh.setPosition(0, p[0], p[1], p[2]);
    expect(changedStamps(before, stampsOf(o))).toEqual([]);
  });

  it("押し出すと topology と base が変わる", () => {
    const o = cube();
    const before = stampsOf(o);
    const r = extrudeFaces(o.mesh, new Set([0]), 0.4);
    expect(r).not.toBeNull();
    o.mesh = r!.mesh;
    const changed = changedStamps(before, stampsOf(o));
    expect(changed).toContain("topology");
    expect(changed).toContain("base");
    expect(changed).not.toContain("high");
  });

  it("段を足してディテールを入れると high だけ変わる", () => {
    const o = cube();
    const before = stampsOf(o);
    const stack = new Multires(o.mesh);
    stack.divide();
    // 段を足しただけ（デルタは 0）でも、持ち物が増えるので high は変わる
    o.multires = [{ level: 1, delta: new Float32Array(stack.level(1).vertexCount * 3) }];
    const added = stampsOf(o);
    expect(changedStamps(before, added)).toEqual(["high"]);

    // ディテールを入れると high がもう一度変わる。ほかは動かない
    o.multires[0].delta[3] = 0.25;
    expect(changedStamps(added, stampsOf(o))).toEqual(["high"]);
  });

  it("UV を作ると uv だけ変わる", () => {
    const o = cube();
    const before = stampsOf(o);
    o.uv = recipeFromMesh(o.mesh);
    o.uv.seams = autoSeams(o.mesh, o.uv.autoSeamParams, 30);
    recompute(o.mesh, o.uv);
    expect(changedStamps(before, stampsOf(o))).toEqual(["uv"]);
  });

  it("UV の切れ目を足すと uv が変わる", () => {
    const o = cube();
    o.uv = recipeFromMesh(o.mesh);
    recompute(o.mesh, o.uv);
    const before = stampsOf(o);
    o.uv.seams.add("0_1");
    expect(changedStamps(before, stampsOf(o))).toEqual(["uv"]);
  });

  it("UV を持たないメッシュの uv は空", () => {
    const doc = new Document();
    const o = doc.addMesh(PRIMITIVES.cube.build(defaultParams("cube")).clone(), "m");
    o.mesh.uvSets.clear();
    expect(stampsOf(o).uv).toBe("");
    expect(stampsOf(o).high).toBe("");
  });

  it("形が違えば指紋も違う（当たり前だが、同じ長さで見分けが付くこと）", () => {
    const a = cube();
    const b = cube();
    // 同じ頂点数・同じトポロジで、座標だけ入れ替える
    const p0 = a.mesh.getPosition(0);
    const p1 = a.mesh.getPosition(1);
    a.mesh.setPosition(0, p1[0], p1[1], p1[2]);
    a.mesh.setPosition(1, p0[0], p0[1], p0[2]);
    expect(stampsOf(a).topology).toBe(stampsOf(b).topology);
    expect(stampsOf(a).base).not.toBe(stampsOf(b).base);
  });
});
