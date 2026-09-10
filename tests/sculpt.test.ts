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
  MeshBuilder,
  Multires,
  strokeFootprint,
  type BrushKind,
  type Mesh,
  type StrokeInput,
} from "../src/core/index.js";

/** 平面を 1 枚。sd を上げると細かくなる。 */
function plane(sd = 12): Mesh {
  return PRIMITIVES.plane.build({ ...defaultParams("plane"), sdW: sd, sdH: sd });
}

/** 球。インフレートの見どころ。 */
function sphereMesh(sd = 16): Mesh {
  return PRIMITIVES.sphere.build({ ...defaultParams("sphere"), sdAxis: sd, sdHeight: sd });
}

/** そのメッシュで 1 回ブラシを当てる。戻り値は動いた頂点。 */
function stroke(mesh: Mesh, input: StrokeInput): Uint32Array {
  const tris = mesh.triangulate();
  const bvh = buildBvh(mesh.positions, { tri: tris.tri });
  const fp = strokeFootprint(mesh, bvh, tris, input.point, input.radius);
  return applyStroke(mesh, fp, tris, input);
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


/**
 * 「隣」の数え方（`35` の T1）。
 *
 * 四角以上を**頂点 0 からの扇**で三角形にしているので、対角線が三角形の辺として
 * 出てくる。これを隣として数えると 1 リングの外まで平均してしまい、しかも
 * **どちらの対角が出るかは面のコーナーの並び順で決まる**ので、形とは関係のない
 * 方向へ偏る。極（三角形の痕）や境界のまわりで効いてくる。
 */
describe("隣は面の本物の辺だけ（`35` の T1）", () => {
  /** 同じ形のまま、面のコーナーの並びだけ回したメッシュ。 */
  function rotateCorners(m: Mesh, by: number): Mesh {
    // 溶接すると頂点の番号が変わってしまうので切る
    const b = new MeshBuilder({ weld: false });
    for (let v = 0; v < m.vertexCount; v++) {
      b.vertex(m.positions[v * 3], m.positions[v * 3 + 1], m.positions[v * 3 + 2]);
    }
    for (let f = 0; f < m.faceCount; f++) {
      const vs = m.faceVerts(f);
      b.face(vs.map((_, i) => vs[(i + by) % vs.length]));
    }
    return b.build();
  }

  it("印の立っている辺は、必ず面の辺になっている", () => {
    for (const m of [plane(4), PRIMITIVES.sphere.build({ ...defaultParams("sphere"), sdAxis: 8, sdHeight: 6 })]) {
      const { tri, realEdges } = m.triangulate();
      const real = new Set(m.edges().map(([a, b]) => `${Math.min(a, b)},${Math.max(a, b)}`));
      const key = (a: number, b: number) => `${Math.min(a, b)},${Math.max(a, b)}`;
      let marked = 0;
      for (let t = 0; t < realEdges.length; t++) {
        const [a, b, c] = [tri[t * 3], tri[t * 3 + 1], tri[t * 3 + 2]];
        const r = realEdges[t];
        if (r & 1) { expect(real.has(key(a, b))).toBe(true); marked++; }
        if (r & 2) { expect(real.has(key(b, c))).toBe(true); marked++; }
        if (r & 4) { expect(real.has(key(c, a))).toBe(true); marked++; }
      }
      expect(marked).toBeGreaterThan(0);
    }
  });

  it("面のどの辺も、どこかの三角形で印が立っている（数え落としがない）", () => {
    const m = plane(4);
    const { tri, realEdges } = m.triangulate();
    const key = (a: number, b: number) => `${Math.min(a, b)},${Math.max(a, b)}`;
    const seen = new Set<string>();
    for (let t = 0; t < realEdges.length; t++) {
      const [a, b, c] = [tri[t * 3], tri[t * 3 + 1], tri[t * 3 + 2]];
      const r = realEdges[t];
      if (r & 1) seen.add(key(a, b));
      if (r & 2) seen.add(key(b, c));
      if (r & 4) seen.add(key(c, a));
    }
    for (const [a, b] of m.edges()) expect(seen.has(key(a, b))).toBe(true);
  });

  it("三角形の面は 3 辺とも本物、四角の面は三角形ごとに 2 辺だけ", () => {
    const b = new MeshBuilder({ weld: false });
    const v = [0, 1, 2, 3, 4].map((i) => b.vertex(i, 0, 0));
    b.face([v[0], v[1], v[2]]); // 三角形
    b.face([v[0], v[1], v[2], v[3]]); // 四角
    b.face([v[0], v[1], v[2], v[3], v[4]]); // 五角形
    const { realEdges } = b.build().triangulate();
    const bits = (r: number) => (r & 1 ? 1 : 0) + (r & 2 ? 1 : 0) + (r & 4 ? 1 : 0);
    // 三角形 1 枚 / 四角 2 枚 / 五角形 3 枚
    expect(realEdges.length).toBe(1 + 2 + 3);
    expect(bits(realEdges[0])).toBe(3);
    expect([bits(realEdges[1]), bits(realEdges[2])]).toEqual([2, 2]);
    // 五角形の真ん中の三角形は、面の辺が 1 つだけ
    expect([bits(realEdges[3]), bits(realEdges[4]), bits(realEdges[5])]).toEqual([2, 1, 2]);
  });

  it("スムースの結果が、面のコーナーの並び順で変わらない", () => {
    // 対角を数えていると、同じ形でもコーナーを回しただけで結果が変わる。
    // ここが一致することが「隣を正しく見ている」ことの証明になる。
    //
    // **筆はメッシュ全体を覆う大きさにする。** 範囲のふちでは、どの三角形が
    // 拾われるかが割り方で変わるので隣が少し欠ける（`sculpt.ts` の前置き
    // どおり、そこは許している）。見たいのはその欠けではなく対角のほう
    const at: [number, number, number] = [0, 0, 0];
    const runs: Float32Array[] = [];
    for (const by of [0, 1, 2, 3]) {
      const m = rotateCorners(plane(10), by);
      // でこぼこにしてから均す（平らなままだとスムースが何もしない）
      for (let v = 0; v < m.vertexCount; v++) m.positions[v * 3 + 1] += (v % 3) * 0.02;
      for (let i = 0; i < 3; i++) stroke(m, { kind: "smooth", point: at, radius: 5, strength: 1, invert: false });
      runs.push(m.positions.slice());
    }
    for (let k = 1; k < runs.length; k++) {
      let worst = 0;
      for (let i = 0; i < runs[0].length; i++) worst = Math.max(worst, Math.abs(runs[k][i] - runs[0][i]));
      // **平らでない四角には一意な面積が無い**（`38` の T1 で面積の重みを
      // 入れてから 1.6e-5 残る。座標が 1 前後なので 0.002%）。対角を数えて
      // いれば桁違いにずれるので、この幅でも捕まる
      expect(worst).toBeLessThan(1e-4);
    }
  });

  it("内部の頂点は、対角の頂点を平均に入れない", () => {
    // 中心の**対角の頂点だけ**を持ち上げる。正しく隣を見ていれば、
    // 中心は「隣は全部 0」と見るので 0 のまま。対角を数えていると持ち上がる
    const m = plane(10);
    let mid = 0;
    let bestD = Infinity;
    for (let v = 0; v < m.vertexCount; v++) {
      const d = Math.hypot(m.positions[v * 3], m.positions[v * 3 + 2]);
      if (d < bestD) { bestD = d; mid = v; }
    }
    const distTo = (v: number) =>
      Math.hypot(m.positions[v * 3] - m.positions[mid * 3], m.positions[v * 3 + 2] - m.positions[mid * 3 + 2]);
    let spacing = Infinity;
    for (let v = 0; v < m.vertexCount; v++) if (v !== mid) spacing = Math.min(spacing, distTo(v));
    let diagonals = 0;
    for (let v = 0; v < m.vertexCount; v++) {
      // 斜めに 1 つ隣（格子の対角）だけを持ち上げる
      if (Math.abs(distTo(v) - spacing * Math.SQRT2) < spacing * 0.05) {
        m.positions[v * 3 + 1] = 1;
        diagonals++;
      }
    }
    expect(diagonals).toBe(4);

    const at: [number, number, number] = [m.positions[mid * 3], 0, m.positions[mid * 3 + 2]];
    stroke(m, { kind: "smooth", point: at, radius: spacing * 1.6, strength: 1, invert: false });
    // 対角を 2 つ数えていたときは 2/6 = 0.33 ほど持ち上がっていた
    expect(Math.abs(m.positions[mid * 3 + 1])).toBeLessThan(1e-6);
  });
});

/**
 * 足したブラシ 8 つ（`38` の T2）。
 *
 * 共通で見るのは 3 つ。**半径の外は動かない・マスク 1 で動かない・
 * 動いた頂点だけ返す。** そのうえで種類ごとの持ち味を 1 つずつ。
 */
describe("ブラシ 8 種（`38` の T2）", () => {
  const KINDS: BrushKind[] = ["clay", "claybuildup", "inflate", "pinch", "flatten", "trim", "damien", "polish"];
  const base: Omit<StrokeInput, "kind" | "point"> = { radius: 0.4, strength: 1, invert: false };
  const at: [number, number, number] = [0, 0, 0];

  /** でこぼこにした板。平面あてを使う種類の見どころ。 */
  function bumpy(sd = 14): Mesh {
    const m = plane(sd);
    for (let v = 0; v < m.vertexCount; v++) m.positions[v * 3 + 1] += ((v % 5) - 2) * 0.01;
    return m;
  }
  const spreadY = (m: Mesh, within: number): number => {
    const ys: number[] = [];
    for (let v = 0; v < m.vertexCount; v++) {
      if (Math.hypot(m.positions[v * 3], m.positions[v * 3 + 2]) < within) ys.push(m.positions[v * 3 + 1]);
    }
    const mean = ys.reduce((a, b) => a + b, 0) / ys.length;
    return ys.reduce((s, y) => s + (y - mean) ** 2, 0) / ys.length;
  };

  it("どの種類も、半径の外は 1 ミリも動かない", () => {
    for (const kind of KINDS) {
      const m = bumpy();
      const before = Array.from(m.positions);
      stroke(m, { ...base, kind, point: at });
      for (let v = 0; v < m.vertexCount; v++) {
        const d = Math.hypot(m.positions[v * 3] - at[0], m.positions[v * 3 + 1] - at[1], m.positions[v * 3 + 2] - at[2]);
        if (d < base.radius) continue;
        for (let k = 0; k < 3; k++) {
          expect(Math.abs(m.positions[v * 3 + k] - before[v * 3 + k])).toBeLessThan(1e-9);
        }
      }
    }
  });

  it("どの種類も、マスク 1 なら動かない", () => {
    for (const kind of KINDS) {
      const m = bumpy();
      const before = Array.from(m.positions);
      const moved = stroke(m, { ...base, kind, point: at, mask: new Float32Array(m.vertexCount).fill(1) });
      expect(moved.length, kind).toBe(0);
      expect(Array.from(m.positions), kind).toEqual(before);
    }
  });

  it("どの種類も、返すのは実際に動いた頂点だけ", () => {
    for (const kind of KINDS) {
      const m = bumpy();
      const before = Array.from(m.positions);
      const moved = stroke(m, { ...base, kind, point: at });
      expect(moved.length, kind).toBeGreaterThan(0);
      for (const v of moved) {
        const d = Math.hypot(
          m.positions[v * 3] - before[v * 3],
          m.positions[v * 3 + 1] - before[v * 3 + 1],
          m.positions[v * 3 + 2] - before[v * 3 + 2],
        );
        expect(d, `${kind} の頂点 ${v}`).toBeGreaterThan(0);
      }
    }
  });

  it("フラットはでこぼこを均す。平らな板は平らなまま", () => {
    // **筆の中ほどで見る。** ふちは減衰が 0 に近くて動かないので、
    // 半径いっぱいで測ると「中は平ら・ふちはでこぼこ」の形になって
    // ばらつきがかえって増える（最初そう書いて落ちた）
    const m = bumpy(24);
    const was = spreadY(m, base.radius * 0.5);
    for (let i = 0; i < 4; i++) stroke(m, { ...base, kind: "flatten", point: at });
    expect(spreadY(m, base.radius * 0.5)).toBeLessThan(was * 0.5);

    // もともと平らなら動かない（平面が板と重なるので）
    const flat = plane(14);
    const before = Array.from(flat.positions);
    stroke(flat, { ...base, kind: "flatten", point: at });
    for (let i = 0; i < flat.positions.length; i++) {
      expect(Math.abs(flat.positions[i] - before[i])).toBeLessThan(1e-6);
    }
  });

  it("トリムは平面より外だけ削り、内側は動かさない", () => {
    const m = bumpy();
    const before = Array.from(m.positions);
    stroke(m, { ...base, kind: "trim", point: at });
    let cut = 0;
    for (let v = 0; v < m.vertexCount; v++) {
      const dy = m.positions[v * 3 + 1] - before[v * 3 + 1];
      if (Math.abs(dy) < 1e-9) continue;
      // 動いたなら必ず下向き（外を落とす）
      expect(dy).toBeLessThan(0);
      cut++;
    }
    expect(cut).toBeGreaterThan(0);
  });

  it("クレイは盛る（下がる頂点が無い）", () => {
    const m = bumpy();
    const before = Array.from(m.positions);
    stroke(m, { ...base, kind: "clay", point: at });
    let up = 0;
    for (let v = 0; v < m.vertexCount; v++) {
      const dy = m.positions[v * 3 + 1] - before[v * 3 + 1];
      if (Math.abs(dy) < 1e-9) continue;
      expect(dy).toBeGreaterThan(0);
      up++;
    }
    expect(up).toBeGreaterThan(0);
  });

  it("インフレートは球を膨らませる", () => {
    const m = sphereMesh(16);
    const at2: [number, number, number] = [0, 0, 1];
    const radiusAt = (mesh: Mesh, v: number) =>
      Math.hypot(mesh.positions[v * 3], mesh.positions[v * 3 + 1], mesh.positions[v * 3 + 2]);
    const rest = sphereMesh(16);
    const moved = stroke(m, { ...base, kind: "inflate", point: at2, radius: 0.5 });
    expect(moved.length).toBeGreaterThan(0);
    for (const v of moved) expect(radiusAt(m, v)).toBeGreaterThan(radiusAt(rest, v));
  });

  it("ピンチは範囲の頂点を中心へ寄せる", () => {
    const m = plane(14);
    const spread = (mesh: Mesh) => {
      let s = 0;
      let n = 0;
      for (let v = 0; v < mesh.vertexCount; v++) {
        const d = Math.hypot(mesh.positions[v * 3], mesh.positions[v * 3 + 2]);
        if (d > base.radius) continue;
        s += d;
        n++;
      }
      return s / n;
    };
    const was = spread(m);
    for (let i = 0; i < 4; i++) stroke(m, { ...base, kind: "pinch", point: at });
    expect(spread(m)).toBeLessThan(was);
  });

  it("ダミアンは同じ強さのスタンダードより細い", () => {
    const a = plane(20);
    const b = plane(20);
    const wide = stroke(a, { ...base, kind: "standard", point: at });
    const thin = stroke(b, { ...base, kind: "damien", point: at });
    // 触る範囲は同じでも、実際に動く量が中心へ寄る。
    // 中心から離れた頂点の動きを比べる
    const rest = plane(20);
    const farMove = (m: Mesh) => {
      let s = 0;
      for (let v = 0; v < m.vertexCount; v++) {
        const d = Math.hypot(m.positions[v * 3], m.positions[v * 3 + 2]);
        if (d < base.radius * 0.5 || d > base.radius) continue;
        s += Math.abs(m.positions[v * 3 + 1] - rest.positions[v * 3 + 1]);
      }
      return s;
    };
    expect(wide.length).toBeGreaterThan(0);
    expect(thin.length).toBeGreaterThan(0);
    expect(farMove(b)).toBeLessThan(farMove(a) * 0.6);
  });

  it("ポリッシュはでこぼこを取るが、フラットより形を残す", () => {
    // ZBrush の Polish は「全体の形を保ったまま磨く」もので、Flatten とは別物。
    // 見るのは 2 つ: でこぼこが減ること、動かす量がフラットより小さいこと
    const rest = bumpy(24);
    const a = bumpy(24);
    const b = bumpy(24);
    const was = spreadY(rest, base.radius * 0.5);
    for (let i = 0; i < 2; i++) stroke(a, { ...base, kind: "flatten", point: at });
    for (let i = 0; i < 2; i++) stroke(b, { ...base, kind: "polish", point: at });
    expect(spreadY(b, base.radius * 0.5)).toBeLessThan(was);

    const travel = (m: Mesh) => {
      let s = 0;
      for (let v = 0; v < m.vertexCount; v++) {
        s += Math.hypot(
          m.positions[v * 3] - rest.positions[v * 3],
          m.positions[v * 3 + 1] - rest.positions[v * 3 + 1],
          m.positions[v * 3 + 2] - rest.positions[v * 3 + 2],
        );
      }
      return s;
    };
    expect(travel(b)).toBeLessThan(travel(a));
  });

  it("クレイビルドアップは重ねると積み上がる", () => {
    const m = plane(14);
    const rest = plane(14);
    const highest = () => {
      let h = 0;
      for (let v = 0; v < m.vertexCount; v++) h = Math.max(h, m.positions[v * 3 + 1] - rest.positions[v * 3 + 1]);
      return h;
    };
    stroke(m, { ...base, kind: "claybuildup", point: at });
    const one = highest();
    for (let i = 0; i < 3; i++) stroke(m, { ...base, kind: "claybuildup", point: at });
    expect(highest()).toBeGreaterThan(one * 2);
  });
});
