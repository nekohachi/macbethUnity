/**
 * ブラシの状態（`33` の T1）。
 *
 * 見るのは 2 つ。**ソフト選択と混ざらないこと**と、**筆圧の式が言葉どおり**
 * であること。前者はここが崩れると、スカルプトでサイズを変えるたびに
 * モデリングのソフト選択が動く（実際そうなっていた）。
 */
import { describe, expect, it } from "vitest";
import { AppState, GAUGES, brushAt, gaugeRatio, gaugeValue, type BrushState } from "../src/app/state.js";
import { PRIMITIVES, defaultParams } from "../src/core/index.js";
import { objectDiagonal } from "../src/app/levels.js";

describe("ブラシとソフト選択は別物", () => {
  it("スカルプトのゲージはブラシを書き、ソフト選択に触らない", () => {
    const s = new AppState();
    const before = { ...s.soft };
    GAUGES.sculpt.g1.kind === "absolute" && GAUGES.sculpt.g1.set(s, 0.9);
    // サイズのゲージが書くのは**割合**（`41` の T2）。半径はそこからの派生
    GAUGES.sculpt.g2.kind === "absolute" && GAUGES.sculpt.g2.set(s, 0.2);
    expect(s.brush.strength).toBe(0.9);
    expect(s.brush.sizeRatio).toBe(0.2);
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
    s.brush.sizeRatio = 0.04;
    expect(GAUGES.model.g2.kind === "absolute" && GAUGES.model.g2.get(s)).toBe(1.5);
    expect(GAUGES.sculpt.g2.kind === "absolute" && GAUGES.sculpt.g2.get(s)).toBe(0.04);
  });
});

describe("筆の太さは対象の割合（`41` の T2）", () => {
  const g2 = GAUGES.sculpt.g2;
  if (g2.kind !== "absolute") throw new Error("サイズは絶対値のゲージ");

  it("つまみの端から端で 0.5%〜50%、2 乗のカーブ", () => {
    expect(gaugeValue(g2, 0)).toBeCloseTo(0.005, 6);
    expect(gaugeValue(g2, 1)).toBeCloseTo(0.5, 6);
    // 真ん中で 12.9%（線形なら 25% になる所）
    expect(gaugeValue(g2, 0.5)).toBeCloseTo(0.005 + 0.25 * 0.495, 6);
    // 行って戻る
    for (const t of [0, 0.2, 0.35, 0.7, 1]) {
      expect(gaugeRatio(g2, gaugeValue(g2, t))).toBeCloseTo(t, 6);
    }
  });

  it("既定の 6.6% は、つまみの下から 3 分の 1 あたりに来る", () => {
    const t = gaugeRatio(g2, 0.066);
    expect(t).toBeGreaterThan(0.25);
    expect(t).toBeLessThan(0.45);
  });

  it("半径は「対象の対角 × 割合」。選び直しても割合は変わらない", () => {
    const s = new AppState();
    const small = s.doc.addMesh(PRIMITIVES.sphere.build(defaultParams("sphere")), "S");
    const bigMesh = PRIMITIVES.cube.build(defaultParams("cube"));
    for (let i = 0; i < bigMesh.positions.length; i++) bigMesh.positions[i] *= 6;
    const big = s.doc.addMesh(bigMesh, "B");
    s.select(small);
    g2.set(s, 0.1);
    expect(s.brush.radius).toBeCloseTo(objectDiagonal(small) * 0.1, 6);
    // 大きいほうへ移ると半径は増えるが、ゲージの読みは同じ
    s.select(big);
    g2.set(s, s.brush.sizeRatio);
    expect(g2.get(s)).toBeCloseTo(0.1, 6);
    expect(s.brush.radius).toBeCloseTo(objectDiagonal(big) * 0.1, 6);
    expect(objectDiagonal(big)).toBeGreaterThan(objectDiagonal(small));
  });
});

describe("ブラシの筆圧", () => {
  const base: BrushState = {
    kind: "standard",
    strength: 1,
    radius: 1,
    sizeRatio: 0.066,
    pressureSize: true,
    pressureSizePow: 1,
    pressureStrengthPow: 2,
    pressureStrength: true,
    symmetryX: true,
    backfaceMask: true,
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

/**
 * 筆圧のカーブ（`38` の T4）。効き = 筆圧 ^ pow。
 */
describe("筆圧のカーブ", () => {
  const b: BrushState = {
    kind: "standard",
    strength: 1,
    radius: 1,
    sizeRatio: 0.066,
    pressureSize: true,
    pressureSizePow: 1,
    pressureStrengthPow: 2,
    pressureStrength: true,
    symmetryX: false,
    backfaceMask: true,
  };

  it("カーブが小さいほど、軽い筆圧でも効く", () => {
    const light = 0.4;
    const soft = brushAt({ ...b, pressureStrengthPow: 1 }, light).strength;
    const mid = brushAt({ ...b, pressureStrengthPow: 2 }, light).strength;
    const hard = brushAt({ ...b, pressureStrengthPow: 4 }, light).strength;
    expect(soft).toBeGreaterThan(mid);
    expect(mid).toBeGreaterThan(hard);
    // 目一杯押せばカーブに関わらず同じ
    for (const pow of [0.25, 1, 4]) {
      expect(brushAt({ ...b, pressureStrengthPow: pow }, 1).strength).toBeCloseTo(1, 6);
    }
  });

  it("サイズと強さで別々に効く", () => {
    const at = brushAt({ ...b, pressureSizePow: 4, pressureStrengthPow: 1 }, 0.5);
    const flipped = brushAt({ ...b, pressureSizePow: 1, pressureStrengthPow: 4 }, 0.5);
    expect(at.radius).toBeLessThan(flipped.radius);
    expect(at.strength).toBeGreaterThan(flipped.strength);
  });

  it("切っていればカーブは効かない", () => {
    const off = { ...b, pressureSize: false, pressureStrength: false };
    for (const pow of [0.25, 4]) {
      const r = brushAt({ ...off, pressureSizePow: pow, pressureStrengthPow: pow }, 0.2);
      expect(r.radius).toBe(1);
      expect(r.strength).toBe(1);
    }
  });
});
