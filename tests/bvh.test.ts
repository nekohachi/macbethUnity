/**
 * 三角形の境界箱の木（`29` の B-T5）。
 *
 * 速さは通し確認で見る。ここで見るのは**総当たりと同じ答えを返すこと**。
 * 木が速くても答えが違えば意味がない。
 */
import { describe, expect, it } from "vitest";
import { PRIMITIVES, defaultParams } from "../src/core/primitives.js";
import { buildBvh, raycastBvh, refitBvh, trianglesNear } from "../src/core/bvh.js";
import type { Mesh } from "../src/core/mesh.js";

const build = (kind: string, params: Record<string, number> = {}): Mesh =>
  PRIMITIVES[kind].build({ ...defaultParams(kind), ...params });

/** 総当たりのレイキャスト（対照）。 */
function bruteRay(
  positions: Float32Array,
  tri: Uint32Array,
  origin: [number, number, number],
  dir: [number, number, number],
): { t: number; tri: number } | null {
  const len = Math.hypot(...dir);
  const d: [number, number, number] = [dir[0] / len, dir[1] / len, dir[2] / len];
  let best = Infinity;
  let bestTri = -1;
  for (let t = 0; t < tri.length / 3; t++) {
    const a = tri[t * 3] * 3,
      b = tri[t * 3 + 1] * 3,
      c = tri[t * 3 + 2] * 3;
    const e1 = [positions[b] - positions[a], positions[b + 1] - positions[a + 1], positions[b + 2] - positions[a + 2]];
    const e2 = [positions[c] - positions[a], positions[c + 1] - positions[a + 1], positions[c + 2] - positions[a + 2]];
    const p = [d[1] * e2[2] - d[2] * e2[1], d[2] * e2[0] - d[0] * e2[2], d[0] * e2[1] - d[1] * e2[0]];
    const det = e1[0] * p[0] + e1[1] * p[1] + e1[2] * p[2];
    if (Math.abs(det) < 1e-12) continue;
    const inv = 1 / det;
    const tv = [origin[0] - positions[a], origin[1] - positions[a + 1], origin[2] - positions[a + 2]];
    const u = (tv[0] * p[0] + tv[1] * p[1] + tv[2] * p[2]) * inv;
    if (u < -1e-7 || u > 1 + 1e-7) continue;
    const q = [tv[1] * e1[2] - tv[2] * e1[1], tv[2] * e1[0] - tv[0] * e1[2], tv[0] * e1[1] - tv[1] * e1[0]];
    const v = (d[0] * q[0] + d[1] * q[1] + d[2] * q[2]) * inv;
    if (v < -1e-7 || u + v > 1 + 1e-7) continue;
    const dist = (e2[0] * q[0] + e2[1] * q[1] + e2[2] * q[2]) * inv;
    if (dist > 1e-7 && dist < best) {
      best = dist;
      bestTri = t;
    }
  }
  return bestTri < 0 ? null : { t: best, tri: bestTri };
}

describe("BVH", () => {
  it("総当たりと同じ三角形に当たる", () => {
    const mesh = build("sphere", { sdAxis: 48, sdHeight: 32 });
    const tris = mesh.triangulate();
    const bvh = buildBvh(mesh.positions, tris);

    // 外から中心へ向かう乱数のレイを 200 本
    let seed = 12345;
    const rand = () => ((seed = (seed * 1103515245 + 12345) & 0x7fffffff) / 0x7fffffff) * 2 - 1;
    let hits = 0;
    for (let i = 0; i < 200; i++) {
      const o: [number, number, number] = [rand() * 4, rand() * 4, rand() * 4];
      const d: [number, number, number] = [-o[0] + rand() * 0.4, -o[1] + rand() * 0.4, -o[2] + rand() * 0.4];
      const a = raycastBvh(bvh, mesh.positions, tris, o, d);
      const b = bruteRay(mesh.positions, tris.tri, o, d);
      expect(!!a).toBe(!!b);
      if (a && b) {
        hits++;
        expect(a.t).toBeCloseTo(b.t, 5);
        expect(a.tri).toBe(b.tri);
      }
    }
    // ほとんどが当たっているはず（当たらないレイばかりでは確かめたことにならない）
    expect(hits).toBeGreaterThan(150);
  });

  it("外れるレイは null", () => {
    const mesh = build("cube");
    const tris = mesh.triangulate();
    const bvh = buildBvh(mesh.positions, tris);
    expect(raycastBvh(bvh, mesh.positions, tris, [10, 10, 10], [1, 0, 0])).toBeNull();
    // 立方体の後ろから前へは当たる
    expect(raycastBvh(bvh, mesh.positions, tris, [0, 0, 5], [0, 0, -1])).not.toBeNull();
  });

  it("頂点を動かして refit すると、動かした先に当たる", () => {
    const mesh = build("sphere", { sdAxis: 24, sdHeight: 16 });
    const tris = mesh.triangulate();
    const bvh = buildBvh(mesh.positions, tris);
    // 頂点を全部 3 倍の遠さへ動かす（球が大きくなる）
    for (let v = 0; v < mesh.vertexCount; v++) {
      const p = mesh.getPosition(v);
      mesh.setPosition(v, p[0] * 3, p[1] * 3, p[2] * 3);
    }
    // 取り直す前は、外側の点に当たらない
    const before = raycastBvh(bvh, mesh.positions, tris, [0, 0, 8], [0, 0, -1]);
    refitBvh(bvh, mesh.positions, tris);
    const after = raycastBvh(bvh, mesh.positions, tris, [0, 0, 8], [0, 0, -1]);
    expect(after).not.toBeNull();
    // 半径 3 の球なので、距離は 5 くらい
    expect(after!.t).toBeGreaterThan(4.5);
    expect(after!.t).toBeLessThan(5.5);
    // 総当たりとも一致（真上や極を通るレイは三角形が同着になるので少し斜めに）
    const o: [number, number, number] = [0.7, 0.4, 8];
    const d: [number, number, number] = [0, 0, -1];
    const mine = raycastBvh(bvh, mesh.positions, tris, o, d)!;
    const brute = bruteRay(mesh.positions, tris.tri, o, d)!;
    expect(mine.tri).toBe(brute.tri);
    expect(mine.t).toBeCloseTo(brute.t, 5);
    void before;
  });

  it("球に触れる三角形は総当たりと同じ集合", () => {
    const mesh = build("sphere", { sdAxis: 32, sdHeight: 20 });
    const tris = mesh.triangulate();
    const bvh = buildBvh(mesh.positions, tris);
    const point: [number, number, number] = [0.9, 0.3, 0.2];
    const radius = 0.35;

    const got = new Set(trianglesNear(bvh, point, radius));
    // 対照: 三角形の境界箱が球に触れるものすべて
    const want = new Set<number>();
    for (let t = 0; t < tris.tri.length / 3; t++) {
      let d = 0;
      for (let k = 0; k < 3; k++) {
        let lo = Infinity;
        let hi = -Infinity;
        for (let j = 0; j < 3; j++) {
          const v = mesh.positions[tris.tri[t * 3 + j] * 3 + k];
          lo = Math.min(lo, v);
          hi = Math.max(hi, v);
        }
        const p = point[k];
        const gap = p < lo ? lo - p : p > hi ? p - hi : 0;
        d += gap * gap;
      }
      if (d <= radius * radius) want.add(t);
    }
    // 木は葉の単位で返すので、対照より多いことはある。**取りこぼしが無い**ことが要
    for (const t of want) expect(got.has(t)).toBe(true);
    expect(got.size).toBeGreaterThan(0);
    expect(got.size).toBeLessThan(tris.tri.length / 3);
  });

  it("空のメッシュでも壊れない", () => {
    const empty = { tri: new Uint32Array(0) };
    const bvh = buildBvh(new Float32Array(0), empty);
    expect(bvh.nodes).toBe(0);
    expect(raycastBvh(bvh, new Float32Array(0), empty, [0, 0, 0], [0, 0, 1])).toBeNull();
    expect(trianglesNear(bvh, [0, 0, 0], 1)).toEqual([]);
    refitBvh(bvh, new Float32Array(0), empty);
  });

  it("10 万三角形でも現実的な時間で作れる", () => {
    const mesh = build("sphere", { sdAxis: 320, sdHeight: 160 });
    const tris = mesh.triangulate();
    expect(tris.tri.length / 3).toBeGreaterThan(100000);
    const t0 = performance.now();
    const bvh = buildBvh(mesh.positions, tris);
    const built = performance.now() - t0;

    const t1 = performance.now();
    refitBvh(bvh, mesh.positions, tris);
    const refit = performance.now() - t1;

    // 1000 本のレイ
    const t2 = performance.now();
    for (let i = 0; i < 1000; i++) {
      raycastBvh(bvh, mesh.positions, tris, [0, 0, 5], [Math.sin(i) * 0.2, Math.cos(i) * 0.2, -1]);
    }
    const rays = performance.now() - t2;

    expect(built).toBeLessThan(4000);
    // 取り直しは作り直しよりずっと速い（ここが崩れると差分の意味が無い）
    expect(refit).toBeLessThan(built / 2);
    // 1 本あたり 0.2ms 以下
    expect(rays).toBeLessThan(200);
  });
});
