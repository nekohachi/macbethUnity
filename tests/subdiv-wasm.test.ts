/**
 * wasm の Catmull-Clark が JS 版と**完全に一致**することを確かめる（`30` の T3）。
 *
 * ずれたら、マルチ解像度も差分更新も静かに壊れる。ここが一致の門。
 * 生成物（`src/wasm/macbeth.wasm`）は `native/build.sh` が作ってコミットする。
 * 無ければ読み込みが `null` を返し、最初のテストが落ちる。
 */
import { describe, expect, it, beforeAll } from "vitest";
import { PRIMITIVES, catmullClark, defaultParams, MeshBuilder, type Mesh } from "../src/core/index.js";
import { loadWasm, catmullClarkWasm, forgetWasmForTest, subdivGeometry, type WasmModule } from "../src/app/wasm/index.js";

let mod: WasmModule | null = null;
beforeAll(async () => {
  mod = await loadWasm();
});

/** 2 つのメッシュが 1 つ違わず同じかどうか。 */
function expectSame(got: Mesh, want: Mesh, eps = 1e-6): void {
  expect(got.vertexCount).toBe(want.vertexCount);
  expect(got.faceCount).toBe(want.faceCount);
  expect([...got.faceOffsets]).toEqual([...want.faceOffsets]);
  expect([...got.faceCorners]).toEqual([...want.faceCorners]);
  for (let i = 0; i < want.positions.length; i++) {
    expect(Math.abs(got.positions[i] - want.positions[i])).toBeLessThanOrEqual(eps);
  }
  expect([...got.crease.entries()].sort()).toEqual([...want.crease.entries()].sort());
  expect([...got.cornerSharp.entries()].sort()).toEqual([...want.cornerSharp.entries()].sort());
  expect([...got.uvSets.keys()].sort()).toEqual([...want.uvSets.keys()].sort());
  for (const [name, uv] of want.uvSets) {
    const mine = got.uvSets.get(name)!;
    expect(mine.length).toBe(uv.length);
    for (let i = 0; i < uv.length; i++) expect(Math.abs(mine[i] - uv[i])).toBeLessThanOrEqual(eps);
  }
}

describe("wasm の細分割", () => {
  it("読めて呼べる", () => {
    // Node にもブラウザにも WebAssembly はある。読めないなら生成物が壊れている
    expect(typeof WebAssembly).not.toBe("undefined");
    expect(mod).not.toBeNull();
    expect(mod!.exports.mb_add(2, 3)).toBe(5);
    expect(mod!.byteLength).toBeGreaterThan(1000);
  });

  it("立方体が JS 版と一致する", async () => {
    if (!mod) return;
    const cube = PRIMITIVES.cube.build(defaultParams("cube"));
    const got = await catmullClarkWasm(cube);
    expect(got).not.toBeNull();
    expectSame(got!, catmullClark(cube));
  });

  it("球（三角形の極を含む）が JS 版と一致する", async () => {
    if (!mod) return;
    const s = PRIMITIVES.sphere.build({ ...defaultParams("sphere"), sdAxis: 12, sdHeight: 8 });
    const got = await catmullClarkWasm(s);
    expect(got).not.toBeNull();
    expectSame(got!, catmullClark(s));
  });

  it("平面（境界のあるメッシュ）が JS 版と一致する", async () => {
    if (!mod) return;
    const p = PRIMITIVES.plane.build({ ...defaultParams("plane"), sdW: 5, sdH: 4 });
    const got = await catmullClarkWasm(p);
    expect(got).not.toBeNull();
    expectSame(got!, catmullClark(p));
  });

  it("クリースが JS 版と一致する（半端な鋭さも）", async () => {
    if (!mod) return;
    const cube = PRIMITIVES.cube.build(defaultParams("cube"));
    // 1 本は鋭さ 1 未満、1 本は 2（段が減って引き継がれる）
    const [a, b] = cube.edges()[0];
    const [c, d] = cube.edges()[1];
    const [e, f] = cube.edges()[2];
    cube.setCrease(a, b, 0.4);
    cube.setCrease(c, d, 2);
    cube.setCrease(e, f, 1);
    cube.cornerSharp.set(0, 2);
    const got = await catmullClarkWasm(cube);
    expect(got).not.toBeNull();
    expectSame(got!, catmullClark(cube));
  });

  it("三角形と五角形が混ざっても一致する", async () => {
    if (!mod) return;
    const b = new MeshBuilder({ weld: false });
    b.vertex(0, 0, 0);
    b.vertex(1, 0, 0);
    b.vertex(2, 0.2, 0);
    b.vertex(2, 1, 0);
    b.vertex(1, 1.4, 0);
    b.vertex(0, 1, 0);
    b.vertex(-1, 0.5, 0.3);
    b.face([0, 1, 2, 3, 4]); // 五角形
    b.face([0, 4, 5]); // 三角形
    b.face([0, 5, 6]); // 三角形
    const mesh = b.build();
    const got = await catmullClarkWasm(mesh);
    expect(got).not.toBeNull();
    expectSame(got!, catmullClark(mesh));
  });

  it("2 レベル重ねても一致する", async () => {
    if (!mod) return;
    const cube = PRIMITIVES.cube.build(defaultParams("cube"));
    const once = await catmullClarkWasm(cube);
    const twice = await catmullClarkWasm(once!);
    expectSame(twice!, catmullClark(catmullClark(cube)));
  });

  it("続けて呼んでも前の結果を壊さない（ヒープを使い回すため）", () => {
    if (!mod) return;
    const cube = PRIMITIVES.cube.build(defaultParams("cube"));
    const first = subdivGeometry(mod, cube)!;
    const keep = first.positions.slice();
    subdivGeometry(mod, PRIMITIVES.sphere.build({ ...defaultParams("sphere"), sdAxis: 20, sdHeight: 16 }));
    expect([...first.positions]).toEqual([...keep]);
  });

  it("wasm が使えない環境では null を返す（呼ぶ側が JS 版に落ちる）", async () => {
    const saved = globalThis.WebAssembly;
    forgetWasmForTest();
    try {
      // @ts-expect-error 使えない環境をまねる
      delete globalThis.WebAssembly;
      expect(await loadWasm()).toBeNull();
      expect(await catmullClarkWasm(PRIMITIVES.cube.build(defaultParams("cube")))).toBeNull();
    } finally {
      globalThis.WebAssembly = saved;
      forgetWasmForTest();
      mod = await loadWasm();
    }
  });

  it("面が 1 つも無いメッシュでも落ちない", () => {
    if (!mod) return;
    const b = new MeshBuilder({ weld: false });
    b.vertex(0, 0, 0);
    b.vertex(1, 0, 0);
    const mesh = b.build();
    const g = subdivGeometry(mod, mesh);
    expect(g).not.toBeNull();
    expect(g!.outCount).toBe(2);
  });
});
