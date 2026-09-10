/**
 * スカルプトレイヤー（`42` の T3）。
 *
 * その段の効いているデルタは `素のデルタ + Σ(見えているレイヤー × 重み)`。
 * 見るのは 4 つ: 足し合わせ、重み、表示、統合。
 */
import { describe, expect, it } from "vitest";
import { Document, PRIMITIVES, defaultParams, type SceneObject } from "../src/core/index.js";
import { applyLayers, baseDelta, combinedFor, hasLayers, levelsOf, refreshCombined } from "../src/app/levels.js";

/** 段を 1 つ持ったオブジェクト。 */
function withLevel(): SceneObject {
  const doc = new Document();
  const o = doc.addMesh(PRIMITIVES.cube.build(defaultParams("cube")), "L");
  const stack = levelsOf(o);
  stack.divide();
  o.multires = [{ level: 1, delta: new Float32Array(stack.level(1).vertexCount * 3) }];
  o.activeLevel = 1;
  o.invalidateLevels();
  return o;
}

/** その段にレイヤーを 1 枚足す。`fill` を全成分に入れる。 */
function addLayer(o: SceneObject, id: string, fill: number, weight = 1): void {
  const count = levelsOf(o).level(1).vertexCount;
  o.sculptLayers = [
    ...o.sculptLayers,
    { id, name: id, level: 1, weight, visible: true, delta: new Float32Array(count * 3).fill(fill) },
  ];
  o.combined.delete(1);
}

describe("スカルプトレイヤー（`42` の T3）", () => {
  it("レイヤーが無ければ、素のデルタがそのまま効く（掛かりが増えない）", () => {
    const o = withLevel();
    expect(hasLayers(o, 1)).toBe(false);
    const stack = levelsOf(o);
    // レイヤーが無い段は、`multires` の配列を**そのまま**渡している
    expect(stack.deltas[0]).toBe(baseDelta(o, 1));
  });

  it("見えているレイヤーが重みぶん足される", () => {
    const o = withLevel();
    baseDelta(o, 1)!.fill(0.1);
    addLayer(o, "a", 0.2);
    addLayer(o, "b", 0.4, 0.5);
    const combined = combinedFor(o, 1);
    // 0.1 + 0.2 × 1 + 0.4 × 0.5 = 0.5
    for (let i = 0; i < combined.length; i++) expect(combined[i]).toBeCloseTo(0.5, 6);
    // レイヤーがある段は、合成のほうが渡る
    expect(levelsOf(o).deltas[0]).toBe(combined);
  });

  it("重み 0 と非表示は同じ（効かない）", () => {
    const o = withLevel();
    baseDelta(o, 1)!.fill(0.1);
    addLayer(o, "a", 0.5);
    const on = Array.from(combinedFor(o, 1));

    o.sculptLayers[0].weight = 0;
    refreshCombined(o, 1);
    const zero = Array.from(combinedFor(o, 1));

    o.sculptLayers[0].weight = 1;
    o.sculptLayers[0].visible = false;
    refreshCombined(o, 1);
    const hidden = Array.from(combinedFor(o, 1));

    expect(on[0]).toBeCloseTo(0.6, 6);
    expect(zero[0]).toBeCloseTo(0.1, 6);
    expect(hidden).toEqual(zero);
  });

  it("重み 0.5 はちょうど半分", () => {
    const o = withLevel();
    addLayer(o, "a", 0.8, 0.5);
    expect(combinedFor(o, 1)[0]).toBeCloseTo(0.4, 6);
    o.sculptLayers[0].weight = 1;
    refreshCombined(o, 1);
    expect(combinedFor(o, 1)[0]).toBeCloseTo(0.8, 6);
  });

  it("統合しても形が変わらない", () => {
    const o = withLevel();
    baseDelta(o, 1)!.fill(0.1);
    addLayer(o, "a", 0.2);
    addLayer(o, "b", 0.4, 0.5);
    applyLayers(o, 1);
    const before = levelsOf(o).level(1).positions.slice();

    // 統合（`app.mergeSculptLayers` と同じ手順）
    const base = baseDelta(o, 1)!;
    for (const l of o.sculptLayers) {
      if (!l.visible || l.weight === 0) continue;
      for (let i = 0; i < base.length; i++) base[i] += l.delta[i] * l.weight;
    }
    o.sculptLayers = [];
    applyLayers(o, 1);

    expect(hasLayers(o, 1)).toBe(false);
    const after = levelsOf(o).level(1).positions;
    for (let i = 0; i < before.length; i++) expect(after[i]).toBeCloseTo(before[i], 6);
  });

  it("重みを変えると形が変わる", () => {
    const o = withLevel();
    addLayer(o, "a", 0.3);
    applyLayers(o, 1);
    const full = levelsOf(o).level(1).positions.slice();
    o.sculptLayers[0].weight = 0;
    applyLayers(o, 1);
    const none = levelsOf(o).level(1).positions.slice();
    let moved = 0;
    for (let i = 0; i < full.length; i++) if (Math.abs(full[i] - none[i]) > 1e-6) moved++;
    expect(moved).toBeGreaterThan(0);
  });
});
