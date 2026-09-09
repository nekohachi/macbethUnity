/**
 * マスク（`34` の T1）。
 *
 * ここで見るのは**値の正しさ**だけ（UI も段の持ち替えも入らない）。
 * とくに 2 つ。**マスク 1 の頂点が 1 ミリも動かない**ことと、
 * **裏面マスクで背を向けた頂点が動かない**こと。前者が漏れるとマスクの意味が
 * 無くなり、後者が漏れると薄い形が破綻する（`05`）。
 */
import { describe, expect, it } from "vitest";
import {
  PRIMITIVES,
  applyStroke,
  blurMask,
  buildBvh,
  defaultParams,
  invertMask,
  maskDown,
  maskIsEmpty,
  maskUp,
  paintMask,
  strokeFootprint,
  catmullClark,
  type Mesh,
  type MaskInput,
  type StrokeInput,
} from "../src/core/index.js";

/** 平面を 1 枚。sd を上げると細かくなる。 */
function plane(sd = 12): Mesh {
  return PRIMITIVES.plane.build({ ...defaultParams("plane"), sdW: sd, sdH: sd });
}

function sphere(sd = 12): Mesh {
  return PRIMITIVES.sphere.build({ ...defaultParams("sphere"), sdAxis: sd, sdHeight: sd });
}

function triOf(mesh: Mesh): Uint32Array {
  return mesh.triangulate().tri;
}

/** マスクを 1 回塗る。戻り値は変わった頂点。 */
function mask(mesh: Mesh, values: Float32Array, input: MaskInput): Uint32Array {
  const tri = triOf(mesh);
  const bvh = buildBvh(mesh.positions, { tri });
  const fp = strokeFootprint(mesh, bvh, tri, input.point, input.radius);
  return paintMask(mesh, fp, values, input);
}

/** ブラシを 1 回当てる。戻り値は動いた頂点。 */
function stroke(mesh: Mesh, input: StrokeInput): Uint32Array {
  const tri = triOf(mesh);
  const bvh = buildBvh(mesh.positions, { tri });
  const fp = strokeFootprint(mesh, bvh, tri, input.point, input.radius);
  return applyStroke(mesh, fp, tri, input);
}

const at: [number, number, number] = [0, 0, 0];
const paint: MaskInput = { point: at, radius: 0.4, strength: 1, erase: false };

describe("マスクを塗る", () => {
  it("中心がいちばん濃く、半径の外は 0 のまま", () => {
    const m = plane();
    const values = new Float32Array(m.vertexCount);
    mask(m, values, paint);

    let center = -1;
    let bestD = Infinity;
    for (let v = 0; v < m.vertexCount; v++) {
      const d = Math.hypot(m.positions[v * 3] - at[0], m.positions[v * 3 + 1] - at[1], m.positions[v * 3 + 2] - at[2]);
      if (d < bestD) {
        bestD = d;
        center = v;
      }
    }
    expect(values[center]).toBeGreaterThan(0);
    for (let v = 0; v < m.vertexCount; v++) {
      const d = Math.hypot(m.positions[v * 3] - at[0], m.positions[v * 3 + 1] - at[1], m.positions[v * 3 + 2] - at[2]);
      if (d >= paint.radius) expect(values[v]).toBe(0);
      else expect(values[v]).toBeLessThanOrEqual(values[center]);
    }
  });

  it("重ねても 1 を超えない", () => {
    const m = plane();
    const values = new Float32Array(m.vertexCount);
    for (let i = 0; i < 40; i++) mask(m, values, paint);
    for (let v = 0; v < m.vertexCount; v++) {
      expect(values[v]).toBeLessThanOrEqual(1);
      expect(values[v]).toBeGreaterThanOrEqual(0);
    }
    // 中心は塗り切れている
    expect(Math.max(...Array.from(values))).toBe(1);
  });

  it("erase で戻り、0 を下回らない", () => {
    const m = plane();
    const values = new Float32Array(m.vertexCount);
    for (let i = 0; i < 8; i++) mask(m, values, paint);
    const painted = Array.from(values);
    expect(Math.max(...painted)).toBeGreaterThan(0.5);
    for (let i = 0; i < 40; i++) mask(m, values, { ...paint, erase: true });
    for (let v = 0; v < m.vertexCount; v++) expect(values[v]).toBe(0);
  });

  it("変わった頂点だけを返す", () => {
    const m = plane();
    const values = new Float32Array(m.vertexCount);
    const changed = mask(m, values, paint);
    expect(changed.length).toBeGreaterThan(0);
    for (const v of changed) expect(values[v]).toBeGreaterThan(0);
    // 塗り切った頂点はもう返らない（ふちは減衰が小さいのでまだ埋まっていく）
    for (let i = 0; i < 40; i++) mask(m, values, paint);
    const again = mask(m, values, paint);
    expect(again.length).toBeLessThan(changed.length);
    for (const v of again) expect(values[v]).toBeLessThanOrEqual(1);
    // 1 に届いた頂点が 1 つ以上あって、それは返っていない
    const full = [...values.keys()].filter((v) => values[v] === 1);
    expect(full.length).toBeGreaterThan(0);
    for (const v of full) expect(again).not.toContain(v);
  });

  it("中心線よけ（excludeNearX）が効く", () => {
    const m = plane();
    const values = new Float32Array(m.vertexCount);
    mask(m, values, { ...paint, point: [0.1, 0, 0], excludeNearX: 0.02 });
    for (let v = 0; v < m.vertexCount; v++) {
      if (Math.abs(m.positions[v * 3]) < 0.02) expect(values[v]).toBe(0);
    }
  });
});

describe("ぼかす・反転する", () => {
  it("1 点だけ 1 の場が、1 回で隣へ広がる", () => {
    const m = plane(8);
    const tri = triOf(m);
    const values = new Float32Array(m.vertexCount);
    values[10] = 1;
    blurMask(tri, values);
    expect(values[10]).toBeLessThan(1);
    expect(values[10]).toBeGreaterThan(0);
    // 隣が 0 より大きくなっている
    let spread = 0;
    for (let v = 0; v < m.vertexCount; v++) if (v !== 10 && values[v] > 0) spread++;
    expect(spread).toBeGreaterThan(0);
  });

  it("0〜1 を出ない。ばらつきが減る", () => {
    const m = plane(8);
    const tri = triOf(m);
    const values = new Float32Array(m.vertexCount);
    for (let v = 0; v < m.vertexCount; v++) values[v] = v % 2;
    const spreadOf = (a: Float32Array): number => {
      let mean = 0;
      for (const x of a) mean += x;
      mean /= a.length;
      let s = 0;
      for (const x of a) s += (x - mean) ** 2;
      return s / a.length;
    };
    const before = spreadOf(values);
    for (let i = 0; i < 5; i++) blurMask(tri, values);
    expect(spreadOf(values)).toBeLessThan(before);
    for (const x of values) {
      expect(x).toBeGreaterThanOrEqual(0);
      expect(x).toBeLessThanOrEqual(1);
    }
  });

  it("反転は 2 回で元に戻る", () => {
    const values = new Float32Array([0, 0.25, 0.5, 1]);
    invertMask(values);
    expect(Array.from(values)).toEqual([1, 0.75, 0.5, 0]);
    invertMask(values);
    expect(Array.from(values)).toEqual([0, 0.25, 0.5, 1]);
  });

  it("空かどうかを見分ける", () => {
    expect(maskIsEmpty(new Float32Array(10))).toBe(true);
    const v = new Float32Array(10);
    v[3] = 0.01;
    expect(maskIsEmpty(v)).toBe(false);
  });
});

describe("段を移す", () => {
  it("上げてから下げると必ず元に戻る", () => {
    const below = plane(6);
    const values = new Float32Array(below.vertexCount);
    for (let v = 0; v < below.vertexCount; v++) values[v] = (v % 7) / 6;
    const up = maskUp(below, values);
    const back = maskDown(up, below.vertexCount);
    expect(Array.from(back)).toEqual(Array.from(values));
  });

  it("上げた長さが細分割の頂点数と合う", () => {
    const below = plane(6);
    const values = new Float32Array(below.vertexCount);
    const up = maskUp(below, values);
    expect(up.length).toBe(catmullClark(below).vertexCount);
  });

  it("エッジ点は両端の平均になっている", () => {
    const below = plane(4);
    const values = new Float32Array(below.vertexCount);
    for (let v = 0; v < below.vertexCount; v++) values[v] = v / below.vertexCount;
    const up = maskUp(below, values);
    const edges = below.edges();
    for (let e = 0; e < edges.length; e++) {
      const [a, b] = edges[e];
      expect(up[below.vertexCount + e]).toBeCloseTo((values[a] + values[b]) / 2, 6);
    }
  });

  it("全部 1 を上げても全部 1（境目に穴が空かない）", () => {
    const below = plane(5);
    const values = new Float32Array(below.vertexCount).fill(1);
    const up = maskUp(below, values);
    for (const x of up) expect(x).toBeCloseTo(1, 6);
  });
});

describe("彫るときにマスクを見る", () => {
  const base: Omit<StrokeInput, "kind" | "point"> = { radius: 0.4, strength: 1, invert: false };

  it("マスク 1 なら 1 ミリも動かない", () => {
    const m = plane();
    const before = Array.from(m.positions);
    const values = new Float32Array(m.vertexCount).fill(1);
    const moved = stroke(m, { ...base, kind: "standard", point: at, mask: values });
    expect(moved.length).toBe(0);
    expect(Array.from(m.positions)).toEqual(before);
  });

  it("マスク 0.5 なら半分だけ動く", () => {
    const full = plane();
    const half = plane();
    const rest = plane();
    stroke(full, { ...base, kind: "standard", point: at });
    stroke(half, { ...base, kind: "standard", point: at, mask: new Float32Array(half.vertexCount).fill(0.5) });

    let checked = 0;
    for (let v = 0; v < full.vertexCount; v++) {
      const df = full.positions[v * 3 + 1] - rest.positions[v * 3 + 1];
      const dh = half.positions[v * 3 + 1] - rest.positions[v * 3 + 1];
      if (Math.abs(df) < 1e-7) continue;
      expect(dh / df).toBeCloseTo(0.5, 5);
      checked++;
    }
    expect(checked).toBeGreaterThan(0);
  });

  it("ムーブとスムースでも効く", () => {
    for (const kind of ["move", "smooth"] as const) {
      const m = plane();
      const before = Array.from(m.positions);
      const values = new Float32Array(m.vertexCount).fill(1);
      const moved = stroke(m, { ...base, kind, point: at, move: [0.2, 0, 0], mask: values });
      expect(moved.length).toBe(0);
      expect(Array.from(m.positions)).toEqual(before);
    }
  });

  it("マスクが短くても落ちない（足りない分は 0）", () => {
    const m = plane();
    const moved = stroke(m, { ...base, kind: "standard", point: at, mask: new Float32Array(3) });
    expect(moved.length).toBeGreaterThan(0);
  });
});

describe("裏面マスク", () => {
  const base: Omit<StrokeInput, "kind" | "point"> = { radius: 3, strength: 1, invert: false };
  // 球の手前（+Z 側）を触る。カメラは +Z から見ているので、視線は -Z
  const front: [number, number, number] = [0, 0, 1];
  const viewDir: [number, number, number] = [0, 0, -1];

  it("渡すと裏側の頂点が動かない", () => {
    const m = sphere();
    const rest = sphere();
    const moved = stroke(m, { ...base, kind: "move", point: front, move: [0, 0, 0.3], viewDir });
    expect(moved.length).toBeGreaterThan(0);
    for (const v of moved) {
      // 動いたのは手前を向いている頂点だけ
      expect(rest.positions[v * 3 + 2]).toBeGreaterThan(-1e-6);
    }
  });

  it("渡さなければ裏も動く（今までどおり）", () => {
    const m = sphere();
    const rest = sphere();
    const moved = stroke(m, { ...base, kind: "move", point: front, move: [0, 0, 0.3] });
    let back = 0;
    for (const v of moved) if (rest.positions[v * 3 + 2] < -0.2) back++;
    expect(back).toBeGreaterThan(0);
  });

  it("スタンダードとスムースでも効く", () => {
    for (const kind of ["standard", "smooth"] as const) {
      const m = sphere();
      const rest = sphere();
      const moved = stroke(m, { ...base, kind, point: front, viewDir });
      expect(moved.length).toBeGreaterThan(0);
      for (const v of moved) expect(rest.positions[v * 3 + 2]).toBeGreaterThan(-1e-6);
    }
  });

  it("マスクと同時に効く", () => {
    const m = sphere();
    const before = Array.from(m.positions);
    const moved = stroke(m, {
      ...base,
      kind: "move",
      point: front,
      move: [0, 0, 0.3],
      viewDir,
      mask: new Float32Array(m.vertexCount).fill(1),
    });
    expect(moved.length).toBe(0);
    expect(Array.from(m.positions)).toEqual(before);
  });
});

/**
 * 重さ（`34` の T1 の最後）。
 *
 * マスクは掛け算 1 つ、裏面マスクは**範囲の法線 1 回**で終わっているはず。
 * ここが倍を超えるなら、どこかでメッシュ全体に触っている。
 */
describe("マスクを見ても重くならない", () => {
  it("マスクと裏面マスクを渡しても、当てる時間が 2 倍を超えない", () => {
    const m = sphere(60);
    const tri = triOf(m);
    const bvh = buildBvh(m.positions, { tri });
    const point: [number, number, number] = [0, 0, 1];
    const base = { kind: "standard" as const, point, radius: 0.6, strength: 0.2, invert: false };
    const values = new Float32Array(m.vertexCount).fill(0.3);

    const timeIt = (fn: () => void): number => {
      for (let i = 0; i < 3; i++) fn();
      const t0 = performance.now();
      for (let i = 0; i < 20; i++) fn();
      return performance.now() - t0;
    };
    const fp = strokeFootprint(m, bvh, tri, point, base.radius);
    expect(fp.verts.length).toBeGreaterThan(100);

    const plainMs = timeIt(() => void applyStroke(m, fp, tri, base));
    const bothMs = timeIt(() => void applyStroke(m, fp, tri, { ...base, mask: values, viewDir: [0, 0, -1] }));
    // 揺れるので、下限を置いたうえで比を見る
    expect(bothMs).toBeLessThan(Math.max(plainMs, 1) * 2);
  });
});
