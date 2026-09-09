/**
 * ブラシの状態（`33` の T1）。
 *
 * 見るのは 2 つ。**ソフト選択と混ざらないこと**と、**筆圧の式が言葉どおり**
 * であること。前者はここが崩れると、スカルプトでサイズを変えるたびに
 * モデリングのソフト選択が動く（実際そうなっていた）。
 */
import { describe, expect, it } from "vitest";
import { AppState, GAUGES, brushAt, type BrushState } from "../src/app/state.js";

describe("ブラシとソフト選択は別物", () => {
  it("スカルプトのゲージはブラシを書き、ソフト選択に触らない", () => {
    const s = new AppState();
    const before = { ...s.soft };
    GAUGES.sculpt.g1.kind === "absolute" && GAUGES.sculpt.g1.set(s, 0.9);
    GAUGES.sculpt.g2.kind === "absolute" && GAUGES.sculpt.g2.set(s, 2.5);
    expect(s.brush.strength).toBe(0.9);
    expect(s.brush.radius).toBe(2.5);
    expect(s.soft).toEqual(before);
  });

  it("モデリングのゲージはソフト選択を書き、ブラシに触らない", () => {
    const s = new AppState();
    const before = { ...s.brush };
    GAUGES.model.g1.kind === "absolute" && GAUGES.model.g1.set(s, 0.7);
    GAUGES.model.g2.kind === "absolute" && GAUGES.model.g2.set(s, 3);
    expect(s.soft.strength).toBe(0.7);
    expect(s.soft.radius).toBe(3);
    expect(s.brush).toEqual(before);
  });

  it("読むほうも別々", () => {
    const s = new AppState();
    s.soft.radius = 1.5;
    s.brush.radius = 4;
    expect(GAUGES.model.g2.kind === "absolute" && GAUGES.model.g2.get(s)).toBe(1.5);
    expect(GAUGES.sculpt.g2.kind === "absolute" && GAUGES.sculpt.g2.get(s)).toBe(4);
  });
});

describe("ブラシの筆圧", () => {
  const base: BrushState = {
    kind: "standard",
    strength: 1,
    radius: 1,
    invert: false,
    pressureSize: true,
    pressureStrength: true,
    symmetryX: true,
  };

  it("強く押すほど太く強くなる", () => {
    const light = brushAt(base, 0.2);
    const hard = brushAt(base, 1);
    expect(hard.radius).toBeGreaterThan(light.radius);
    expect(hard.strength).toBeGreaterThan(light.strength);
    expect(hard.radius).toBeCloseTo(1, 6);
    expect(hard.strength).toBeCloseTo(1, 6);
  });

  it("軽く触れたときは強度のほうが急に落ちる（2 乗なので）", () => {
    const at = brushAt(base, 0.3);
    expect(at.strength).toBeLessThan(at.radius);
  });

  it("筆圧を返さない入力（0）は 0.5 として扱う", () => {
    expect(brushAt(base, 0)).toEqual(brushAt(base, 0.5));
  });

  it("切っていれば筆圧を無視する", () => {
    const off = brushAt({ ...base, pressureSize: false, pressureStrength: false }, 0.1);
    expect(off.radius).toBe(1);
    expect(off.strength).toBe(1);
  });

  it("1 を超える筆圧は 1 で頭打ち", () => {
    expect(brushAt(base, 3)).toEqual(brushAt(base, 1));
  });
});
