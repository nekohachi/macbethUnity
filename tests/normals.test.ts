/**
 * 動いた頂点の周りだけ法線を作り直す（`40` の T2）。
 *
 * 見るのは 1 つ。**丸ごと作り直した `surfaceGeometry` と同じ法線になること。**
 * ここが崩れると、離したあとの陰影が作り直しと食い違い、次に段を変えた瞬間に
 * 見た目が変わる。動いていない所を触らないことも見る。
 */
import { describe, expect, it } from "vitest";
import { PRIMITIVES, defaultParams, type Mesh } from "../src/core/index.js";
import { buildVertexSlots, refreshSurfaceNormals, surfaceGeometry } from "../src/app/render/meshView.js";

function sphere(sd = 12): Mesh {
  return PRIMITIVES.sphere.build({ ...defaultParams("sphere"), sdAxis: sd, sdHeight: sd });
}

function cube(): Mesh {
  return PRIMITIVES.cube.build(defaultParams("cube"));
}

/** 頂点 `verts` を法線方向っぽく少し動かして、部分更新と作り直しを比べる。 */
function compare(mesh: Mesh, verts: number[], angle: number): { partial: Float32Array; full: Float32Array; before: Float32Array; ring: number } {
  const tri = mesh.triangulate();
  const edges = mesh.edges();
  const geo = surfaceGeometry(mesh, tri, angle);
  const partial = (geo.getAttribute("normal").array as Float32Array).slice();
  const before = partial.slice();
  for (const v of verts) {
    mesh.positions[v * 3] *= 1.15;
    mesh.positions[v * 3 + 1] *= 1.15;
    mesh.positions[v * 3 + 2] *= 1.15;
  }
  const slots = buildVertexSlots(mesh.vertexCount, tri, edges);
  const ring = refreshSurfaceNormals(mesh, tri, slots, partial, verts, angle);
  const full = surfaceGeometry(mesh, tri, angle).getAttribute("normal").array as Float32Array;
  return { partial, full, before, ring };
}

function maxDiff(a: Float32Array, b: Float32Array): number {
  let m = 0;
  for (let i = 0; i < a.length; i++) m = Math.max(m, Math.abs(a[i] - b[i]));
  return m;
}

describe("動いた頂点の周りだけ法線を作り直す（`40` の T2）", () => {
  it("作り直した場合と一致する（球、すべてスムース）", () => {
    const m = sphere();
    const verts = [5, 6, 7, 20, 21];
    const { partial, full } = compare(m, verts, 180);
    expect(maxDiff(partial, full)).toBeLessThan(1e-5);
  });

  it("スムージング角度が効く（立方体の角はハードのまま）", () => {
    const m = cube();
    const { partial, full } = compare(m, [0, 1], 30);
    expect(maxDiff(partial, full)).toBeLessThan(1e-5);
    // 角の頂点のコーナーは面ごとに違う法線を持つ（ハード）
    const tri = m.triangulate();
    const slots = buildVertexSlots(m.vertexCount, tri, m.edges());
    const s0 = slots.surfaceSlots[slots.surfaceOffsets[0]];
    const s1 = slots.surfaceSlots[slots.surfaceOffsets[1] - 1];
    const dot = partial[s0 * 3] * partial[s1 * 3] + partial[s0 * 3 + 1] * partial[s1 * 3 + 1] + partial[s0 * 3 + 2] * partial[s1 * 3 + 2];
    expect(Math.abs(dot)).toBeLessThan(0.999);
  });

  it("1 リングの外は触らない", () => {
    const m = sphere();
    const verts = [40];
    const { partial, before, full, ring } = compare(m, verts, 180);
    // 動いた頂点 1 つ + その隣。球の内部の頂点は価数 4 なので 5〜9
    expect(ring).toBeGreaterThanOrEqual(5);
    expect(ring).toBeLessThanOrEqual(9);
    // 全体としては作り直しと一致し、
    expect(maxDiff(partial, full)).toBeLessThan(1e-5);
    // 変わったコーナーの数は 1 リングの分だけ（法線が変わる頂点のコーナー ≤ ring × 8）
    let changed = 0;
    for (let i = 0; i < partial.length; i += 3) {
      if (Math.abs(partial[i] - before[i]) + Math.abs(partial[i + 1] - before[i + 1]) + Math.abs(partial[i + 2] - before[i + 2]) > 0) changed++;
    }
    expect(changed).toBeGreaterThan(0);
    expect(changed).toBeLessThanOrEqual(ring * 8);
  });

  it("続けて 2 回呼んでも（控えを使い回しても）一致する", () => {
    const m = sphere();
    const tri = m.triangulate();
    const geo = surfaceGeometry(m, tri, 180);
    const nor = geo.getAttribute("normal").array as Float32Array;
    const slots = buildVertexSlots(m.vertexCount, tri, m.edges());
    for (const v of [10, 11]) m.positions[v * 3 + 1] += 0.1;
    refreshSurfaceNormals(m, tri, slots, nor, [10, 11], 180);
    for (const v of [11, 12, 30]) m.positions[v * 3] += 0.1;
    refreshSurfaceNormals(m, tri, slots, nor, [11, 12, 30], 180);
    const full = surfaceGeometry(m, tri, 180).getAttribute("normal").array as Float32Array;
    expect(maxDiff(nor, full)).toBeLessThan(1e-5);
  });
});
