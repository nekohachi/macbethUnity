/**
 * ブラシのストローク（`33` の T2）。
 *
 * ここで見るのは**形の正しさ**だけ（UI も段も入らない）。
 * とくに「半径の外は 1 ミリも動かない」は毎回見る。ここが漏れると、
 * 履歴の差分が無駄に太り、`sculptAt` が触らなくていい頂点まで書き直す。
 */
import { describe, expect, it } from "vitest";
import {
  PRIMITIVES,
  applyStroke,
  buildBvh,
  defaultParams,
  falloff,
  Multires,
  strokeFootprint,
  type Mesh,
  type StrokeInput,
} from "../src/core/index.js";

/** 平面を 1 枚。sd を上げると細かくなる。 */
function plane(sd = 12): Mesh {
  return PRIMITIVES.plane.build({ ...defaultParams("plane"), sdW: sd, sdH: sd });
}

/** そのメッシュで 1 回ブラシを当てる。戻り値は動いた頂点。 */
function stroke(mesh: Mesh, input: StrokeInput): Uint32Array {
  const { tri } = mesh.triangulate();
  const bvh = buildBvh(mesh.positions, { tri });
  const fp = strokeFootprint(mesh, bvh, tri, input.point, input.radius);
  return applyStroke(mesh, fp, tri, input);
}

const base: Omit<StrokeInput, "kind" | "point"> = { radius: 0.4, strength: 1, invert: false };

describe("減衰", () => {
  it("中心で 1、半径で 0、その間は単調に減る", () => {
    expect(falloff(0)).toBe(1);
    expect(falloff(1)).toBe(0);
    expect(falloff(1.5)).toBe(0);
    let prev = falloff(0);
    for (let t = 0.05; t <= 1; t += 0.05) {
      const now = falloff(t);
      expect(now).toBeLessThan(prev);
      prev = now;
    }
  });
});

describe("Standard", () => {
  it("真ん中がいちばん動き、半径の外は動かない", () => {
    const mesh = plane();
    const before = mesh.positions.slice();
    stroke(mesh, { ...base, kind: "standard", point: [0, 0, 0] });

    let center = -1;
    let bestD = Infinity;
    const moved: number[] = [];
    for (let v = 0; v < mesh.vertexCount; v++) {
      const p = before.subarray(v * 3, v * 3 + 3);
      const d = Math.hypot(p[0], p[1], p[2]);
      const delta = Math.hypot(
        mesh.positions[v * 3] - p[0],
        mesh.positions[v * 3 + 1] - p[1],
        mesh.positions[v * 3 + 2] - p[2],
      );
      if (d < bestD) {
        bestD = d;
        center = v;
      }
      if (delta > 0) moved.push(v);
      // 半径の外は 1 ミリも動かない
      if (d > base.radius) expect(delta).toBe(0);
    }
    expect(moved.length).toBeGreaterThan(0);

    const centerDelta = Math.hypot(
      mesh.positions[center * 3] - before[center * 3],
      mesh.positions[center * 3 + 1] - before[center * 3 + 1],
      mesh.positions[center * 3 + 2] - before[center * 3 + 2],
    );
    for (const v of moved) {
      const d = Math.hypot(
        mesh.positions[v * 3] - before[v * 3],
        mesh.positions[v * 3 + 1] - before[v * 3 + 1],
        mesh.positions[v * 3 + 2] - before[v * 3 + 2],
      );
      expect(d).toBeLessThanOrEqual(centerDelta + 1e-6);
    }
  });

  it("invert で向きが反転する", () => {
    const up = plane();
    const down = plane();
    stroke(up, { ...base, kind: "standard", point: [0, 0, 0] });
    stroke(down, { ...base, kind: "standard", point: [0, 0, 0], invert: true });
    for (let i = 0; i < up.positions.length; i++) {
      const a = up.positions[i] - plane().positions[i];
      const b = down.positions[i] - plane().positions[i];
      expect(b).toBeCloseTo(-a, 6);
    }
  });

  it("動いた頂点だけを返す（重み 0 は返さない）", () => {
    const mesh = plane();
    const before = mesh.positions.slice();
    const moved = stroke(mesh, { ...base, kind: "standard", point: [0, 0, 0] });
    for (const v of moved) {
      const d = Math.hypot(
        mesh.positions[v * 3] - before[v * 3],
        mesh.positions[v * 3 + 1] - before[v * 3 + 1],
        mesh.positions[v * 3 + 2] - before[v * 3 + 2],
      );
      expect(d).toBeGreaterThan(0);
    }
    // 返していない頂点は動いていない
    const set = new Set(moved);
    for (let v = 0; v < mesh.vertexCount; v++) {
      if (set.has(v)) continue;
      for (let k = 0; k < 3; k++) expect(mesh.positions[v * 3 + k]).toBe(before[v * 3 + k]);
    }
  });
});

describe("Move", () => {
  it("全部同じ向きに動き、中心がいちばん大きい", () => {
    const mesh = plane();
    const before = mesh.positions.slice();
    const moved = stroke(mesh, { ...base, kind: "move", point: [0, 0, 0], move: [0.2, 0, 0] });
    expect(moved.length).toBeGreaterThan(0);
    let best = 0;
    for (const v of moved) {
      const dx = mesh.positions[v * 3] - before[v * 3];
      // 向きはそろっている（X の正の側だけ）
      expect(dx).toBeGreaterThan(0);
      expect(mesh.positions[v * 3 + 1]).toBe(before[v * 3 + 1]);
      expect(mesh.positions[v * 3 + 2]).toBe(before[v * 3 + 2]);
      best = Math.max(best, dx);
    }
    // 中心にいちばん近い頂点が、いちばん大きく動いている
    expect(best).toBeGreaterThan(0.1);
    expect(best).toBeLessThanOrEqual(0.2 + 1e-6);
  });

  it("移動量が 0 なら何も動かない", () => {
    const mesh = plane();
    const before = mesh.positions.slice();
    const moved = stroke(mesh, { ...base, kind: "move", point: [0, 0, 0], move: [0, 0, 0] });
    expect(moved.length).toBe(0);
    expect([...mesh.positions]).toEqual([...before]);
  });
});

describe("Smooth", () => {
  /** 平面をぎざぎざにする。 */
  function bumpy(): Mesh {
    const mesh = plane(16);
    for (let v = 0; v < mesh.vertexCount; v++) {
      const p = mesh.getPosition(v);
      mesh.setPosition(v, p[0], p[1] + (v % 2 ? 0.08 : -0.08), p[2]);
    }
    return mesh;
  }

  /** 半径の中の頂点の Y のばらつき。 */
  function spread(mesh: Mesh, radius: number): number {
    const ys: number[] = [];
    for (let v = 0; v < mesh.vertexCount; v++) {
      const p = mesh.getPosition(v);
      if (Math.hypot(p[0], 0, p[2]) < radius * 0.6) ys.push(p[1]);
    }
    const mean = ys.reduce((a, b) => a + b, 0) / ys.length;
    return ys.reduce((a, b) => a + (b - mean) ** 2, 0) / ys.length;
  }

  it("ばらつきが減り、半径の外は動かない", () => {
    const mesh = bumpy();
    const before = mesh.positions.slice();
    const was = spread(mesh, base.radius);
    stroke(mesh, { ...base, kind: "smooth", point: [0, 0, 0] });
    expect(spread(mesh, base.radius)).toBeLessThan(was);
    for (let v = 0; v < mesh.vertexCount; v++) {
      const d = Math.hypot(before[v * 3], 0, before[v * 3 + 2]);
      if (d <= base.radius) continue;
      for (let k = 0; k < 3; k++) expect(mesh.positions[v * 3 + k]).toBe(before[v * 3 + k]);
    }
  });

  it("10 回掛けても平面が縮まない（外形が保たれる）", () => {
    const mesh = bumpy();
    const width = () => {
      let min = Infinity;
      let max = -Infinity;
      for (let v = 0; v < mesh.vertexCount; v++) {
        min = Math.min(min, mesh.positions[v * 3]);
        max = Math.max(max, mesh.positions[v * 3]);
      }
      return max - min;
    };
    const was = width();
    for (let i = 0; i < 10; i++) stroke(mesh, { ...base, kind: "smooth", point: [0, 0, 0] });
    expect(width()).toBeCloseTo(was, 6);
  });
});

describe("段への取り込み（sculptAt）", () => {
  function stack(levels = 2): { multi: Multires; mesh: Mesh } {
    const mesh = PRIMITIVES.cube.build(defaultParams("cube"));
    const multi = new Multires(mesh);
    for (let i = 0; i < levels; i++) multi.divide();
    return { multi, mesh };
  }

  it("全部取り直した場合と完全に一致する", () => {
    const a = stack();
    const b = stack();
    const move = (multi: Multires): number[] => {
      const top = multi.level(2);
      const verts = [3, 7, 11, 15];
      for (const v of verts) {
        const p = top.getPosition(v);
        top.setPosition(v, p[0] + 0.05, p[1] + 0.03, p[2] - 0.02);
      }
      return verts;
    };
    const verts = move(a.multi);
    a.multi.sculptAt(2, verts);

    const editedTop = b.multi.level(2).clone();
    for (const v of verts) {
      const p = editedTop.getPosition(v);
      editedTop.setPosition(v, p[0] + 0.05, p[1] + 0.03, p[2] - 0.02);
    }
    b.multi.sculpt(2, editedTop);

    // -0 と 0 は同じ値。触っていない頂点は片方が -0 になることがあるので均す
    const zero = (x: number): number => (x === 0 ? 0 : x);
    expect([...a.multi.deltas[1]!].map(zero)).toEqual([...b.multi.deltas[1]!].map(zero));
    expect([...a.multi.level(2).positions]).toEqual([...b.multi.level(2).positions]);
  });

  it("下の段は 1 つも動かない", () => {
    const { multi } = stack();
    const level0 = multi.level(0).positions.slice();
    const level1 = multi.level(1).positions.slice();
    const top = multi.level(2);
    const p = top.getPosition(5);
    top.setPosition(5, p[0] + 0.2, p[1], p[2]);
    multi.sculptAt(2, [5]);
    expect([...multi.level(0).positions]).toEqual([...level0]);
    expect([...multi.level(1).positions]).toEqual([...level1]);
  });

  it("途中の段で彫ると上の段にも伝わる", () => {
    const { multi } = stack();
    const before = multi.level(2).positions.slice();
    const mid = multi.level(1);
    const p = mid.getPosition(4);
    mid.setPosition(4, p[0], p[1] + 0.3, p[2]);
    multi.sculptAt(1, [4]);
    let changed = 0;
    const after = multi.level(2).positions;
    for (let i = 0; i < after.length; i++) if (Math.abs(after[i] - before[i]) > 1e-9) changed++;
    expect(changed).toBeGreaterThan(0);
  });

  it("控えを捨てないので、続けて彫っても積み上がる", () => {
    const { multi } = stack();
    const top = multi.level(2);
    const start = top.getPosition(6)[1];
    for (let i = 0; i < 3; i++) {
      const p = multi.level(2).getPosition(6);
      multi.level(2).setPosition(6, p[0], p[1] + 0.05, p[2]);
      multi.sculptAt(2, [6]);
    }
    expect(multi.level(2).getPosition(6)[1]).toBeCloseTo(start + 0.15, 5);
  });

  it("デルタがまだ無い段でも彫れる", () => {
    const { multi } = stack(1);
    expect(multi.deltas[0]).toBeNull();
    const top = multi.level(1);
    const p = top.getPosition(2);
    top.setPosition(2, p[0], p[1] + 0.1, p[2]);
    multi.sculptAt(1, [2]);
    expect(multi.deltas[0]).not.toBeNull();
    expect(multi.level(1).getPosition(2)[1]).toBeCloseTo(p[1] + 0.1, 5);
  });
});

describe("対称の中心線（`33` の T4）", () => {
  it("excludeNearX を渡すと中心近くの頂点を触らない", () => {
    const mesh = plane();
    const before = mesh.positions.slice();
    stroke(mesh, { ...base, kind: "standard", point: [0, 0, 0], excludeNearX: 0.05 });
    let nearMoved = 0;
    let farMoved = 0;
    for (let v = 0; v < mesh.vertexCount; v++) {
      const d = Math.hypot(
        mesh.positions[v * 3] - before[v * 3],
        mesh.positions[v * 3 + 1] - before[v * 3 + 1],
        mesh.positions[v * 3 + 2] - before[v * 3 + 2],
      );
      if (d === 0) continue;
      if (Math.abs(before[v * 3]) < 0.05) nearMoved++;
      else farMoved++;
    }
    expect(nearMoved).toBe(0);
    expect(farMoved).toBeGreaterThan(0);
  });

  it("鏡映して 2 回当てても、中心線が二重に動かない", () => {
    // 1 回目（右）と 2 回目（左・中心線よけ）を当て、
    // 中心線の頂点が「1 回ぶん」しか動いていないことを見る
    const twice = plane();
    const once = plane();
    const at: [number, number, number] = [0.15, 0, 0];
    stroke(twice, { ...base, kind: "standard", point: at });
    stroke(twice, { ...base, kind: "standard", point: [-at[0], at[1], at[2]], excludeNearX: base.radius * 0.01 });
    stroke(once, { ...base, kind: "standard", point: at });

    // X = 0 の頂点は、1 回だけ当てたものと同じだけ動いている
    for (let v = 0; v < once.vertexCount; v++) {
      if (Math.abs(plane().positions[v * 3]) > 1e-6) continue;
      const a = Math.abs(twice.positions[v * 3 + 1] - plane().positions[v * 3 + 1]);
      const b = Math.abs(once.positions[v * 3 + 1] - plane().positions[v * 3 + 1]);
      expect(a).toBeCloseTo(b, 6);
    }
  });
});

/**
 * 頂点番号の控え（`scratch`）は**モジュールに 1 つだけ**あって使い回される。
 * 消さずに世代番号で無効にしているので、**前の呼び出しの跡が残っていても
 * 結果が変わらない**ことを見る。ここが崩れると、大きいメッシュを触ったあとの
 * 小さいメッシュだけおかしくなる、という直しにくいバグになる。
 */
describe("頂点番号の控えを使い回しても結果が変わらない", () => {
  const at: [number, number, number] = [0.1, 0, 0.05];

  it("大きいメッシュを挟んでも、同じ 1 打ちは同じ結果", () => {
    const alone = plane(12);
    stroke(alone, { ...base, kind: "standard", point: at });

    // 間に別の大きさのメッシュを何度も挟む（控えが伸び、世代も進む）
    const between = plane(40);
    for (let i = 0; i < 5; i++) stroke(between, { ...base, kind: "standard", point: [i * 0.05, 0, 0] });
    const after = plane(12);
    stroke(after, { ...base, kind: "standard", point: at });

    expect(Array.from(after.positions)).toEqual(Array.from(alone.positions));
  });

  it("小さいメッシュを挟んでも同じ（控えは縮まない）", () => {
    const alone = plane(40);
    stroke(alone, { ...base, kind: "smooth", point: at });

    const between = plane(6);
    for (let i = 0; i < 5; i++) stroke(between, { ...base, kind: "smooth", point: [i * 0.05, 0, 0] });
    const after = plane(40);
    stroke(after, { ...base, kind: "smooth", point: at });

    expect(Array.from(after.positions)).toEqual(Array.from(alone.positions));
  });

  it("同じメッシュに続けて当てても、1 打ちずつの積み上げと一致する", () => {
    // 控えが「前の打ちの範囲」を引きずっていないこと
    const a = plane(20);
    const b = plane(20);
    const points: [number, number, number][] = [
      [0, 0, 0],
      [0.2, 0, 0],
      [0.4, 0, 0.1],
    ];
    for (const p of points) stroke(a, { ...base, kind: "standard", point: p });
    // 間に別メッシュを挟みながら同じ順で当てる
    const noise = plane(30);
    for (const p of points) {
      stroke(noise, { ...base, kind: "standard", point: p });
      stroke(b, { ...base, kind: "standard", point: p });
    }
    expect(Array.from(b.positions)).toEqual(Array.from(a.positions));
  });
});
