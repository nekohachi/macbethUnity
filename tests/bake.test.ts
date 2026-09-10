import { describe, expect, it } from "vitest";
import { PRIMITIVES } from "../src/core/primitives.js";
import { catmullClark } from "../src/core/subdivide.js";
import { bakeMaps, heightToBytes } from "../src/core/bake.js";
import { bakeStamp } from "../src/core/io/hash.js";
import { SceneObject } from "../src/core/document.js";
import type { Mesh } from "../src/core/mesh.js";

const plane = (sd = 4) => PRIMITIVES.plane.build({ width: 2, height: 2, sdW: sd, sdH: sd });

/** UV を「島」に押し込む（u,v → u*scale + ox, v*scale + oy）。 */
function remapUv(mesh: Mesh, scale: number, ox: number, oy: number): Mesh {
  const uv = mesh.uvSets.get("map1")!;
  for (let i = 0; i < uv.length; i += 2) {
    uv[i] = uv[i] * scale + ox;
    uv[i + 1] = uv[i + 1] * scale + oy;
  }
  return mesh;
}

/** テクセル (x, y) の RGB。 */
const rgb = (n: Uint8Array, size: number, x: number, y: number) => [
  n[(y * size + x) * 4],
  n[(y * size + x) * 4 + 1],
  n[(y * size + x) * 4 + 2],
];

describe("ベイク（法線マップと高さマップ）", () => {
  it("平らな板（ロー = ハイ）は法線が (128, 128, 255)、高さが 0", () => {
    const low = plane();
    const r = bakeMaps(low, low, { size: 32, padding: 0 })!;
    expect(r).not.toBeNull();
    expect(r.covered).toBe(32 * 32); // UV が 0〜1 いっぱいなので全部
    for (let t = 0; t < r.coverage.length; t++) {
      expect([r.normal[t * 4], r.normal[t * 4 + 1], r.normal[t * 4 + 2], r.normal[t * 4 + 3]]).toEqual([
        128, 128, 255, 255,
      ]);
      expect(r.height[t]).toBe(0);
    }
    expect(r.heightRange).toEqual([0, 0]);
  });

  it("膨らみを彫った板は高さが正で、法線が膨らみの向きへ傾く", () => {
    const low = plane();
    const high = catmullClark(catmullClark(low));
    // 中心に丸い膨らみ（+Y。ローの法線は +Y）
    for (let v = 0; v < high.vertexCount; v++) {
      const x = high.positions[v * 3];
      const z = high.positions[v * 3 + 2];
      const d = Math.hypot(x, z);
      if (d < 0.6) high.positions[v * 3 + 1] += 0.25 * (1 + Math.cos((d / 0.6) * Math.PI)) * 0.5;
    }
    const size = 64;
    const r = bakeMaps(low, high, { size, padding: 0 })!;
    expect(r.heightRange[1]).toBeGreaterThan(0.15);
    expect(r.heightRange[0]).toBeCloseTo(0, 2);
    // 中心（u = v = 0.5）はてっぺんなので平ら
    const mid = size / 2;
    const top = rgb(r.normal, size, mid, mid);
    expect(Math.abs(top[0] - 128)).toBeLessThan(8); // テクセルの中心は頂点から半テクセルずれる
    expect(top[2]).toBeGreaterThan(250);
    // u は +X、v は +Z。膨らみの +X 側は法線が +X へ倒れる → 赤が上がる
    const east = rgb(r.normal, size, mid + 10, mid);
    const west = rgb(r.normal, size, mid - 10, mid);
    expect(east[0]).toBeGreaterThan(150);
    expect(west[0]).toBeLessThan(106);
    // 緑は v（+Z）の向き。この板は UV が裏返っているので、向きを取り違えると符号が逆になる
    const north = rgb(r.normal, size, mid, mid + 10);
    const south = rgb(r.normal, size, mid, mid - 10);
    expect(north[1]).toBeGreaterThan(150);
    expect(south[1]).toBeLessThan(106);
  });

  it("島の外は coverage が 0。埋めると縁の外まで色が付く", () => {
    const size = 64;
    const bare = bakeMaps(remapUv(plane(), 0.5, 0.25, 0.25), remapUv(plane(), 0.5, 0.25, 0.25), {
      size,
      padding: 0,
    })!;
    expect(bare.covered).toBe(32 * 32);
    expect(bare.coverage[0]).toBe(0);
    // 島は x, y が 16〜47。その 1 つ外
    expect(bare.coverage[24 * size + 15]).toBe(0);
    expect(rgb(bare.normal, size, 15, 24)).toEqual([0, 0, 0]);

    const filled = bakeMaps(remapUv(plane(), 0.5, 0.25, 0.25), remapUv(plane(), 0.5, 0.25, 0.25), {
      size,
      padding: 4,
    })!;
    expect(filled.covered).toBe(32 * 32); // 埋めても「島が覆った数」は増えない
    expect(filled.coverage[24 * size + 15]).toBe(2);
    expect(filled.coverage[24 * size + 12]).toBe(2);
    expect(filled.coverage[24 * size + 11]).toBe(0); // 4 テクセルより先は埋めない
    expect(rgb(filled.normal, size, 15, 24)).toEqual([128, 128, 255]);
    expect(bare.coverage[0]).toBe(0);
  });

  it("UV を動かすと焼いた絵も付いてくる", () => {
    const size = 32;
    const a = bakeMaps(remapUv(plane(), 0.5, 0, 0), remapUv(plane(), 0.5, 0, 0), { size, padding: 0 })!;
    const b = bakeMaps(remapUv(plane(), 0.5, 0.5, 0), remapUv(plane(), 0.5, 0.5, 0), { size, padding: 0 })!;
    expect(a.covered).toBe(b.covered);
    for (let y = 0; y < size; y++) {
      for (let x = 0; x < size / 2; x++) {
        expect(b.coverage[y * size + x + size / 2]).toBe(a.coverage[y * size + x]);
      }
    }
    expect(a.coverage[0]).toBe(1);
    expect(b.coverage[0]).toBe(0);
  });

  it("指紋は形・デルタ・UV のどれが変わっても変わる", () => {
    const o = new SceneObject("plane", "p1");
    o.mesh = plane();
    o.multires = [{ level: 1, delta: new Float32Array(catmullClark(o.mesh).vertexCount * 3) }];
    const first = bakeStamp(o);
    expect(bakeStamp(o)).toBe(first); // 何もしなければ同じ
    o.mesh.positions[1] += 0.3;
    const moved = bakeStamp(o);
    expect(moved).not.toBe(first);
    o.multires[0].delta[0] = 0.5;
    const carved = bakeStamp(o);
    expect(carved).not.toBe(moved);
    o.mesh.uvSets.get("map1")![0] += 0.25;
    expect(bakeStamp(o)).not.toBe(carved);
  });

  it("UV が無ければ焼けない", () => {
    const low = plane();
    low.uvSets.delete("map1");
    expect(bakeMaps(low, low, { size: 8 })).toBeNull();
  });

  it("高さを 8 ビットにすると、平らは 128、山は上、谷は下", () => {
    const low = plane();
    const high = catmullClark(low);
    for (let v = 0; v < high.vertexCount; v++) {
      high.positions[v * 3 + 1] += high.positions[v * 3] > 0 ? 0.2 : -0.2;
    }
    const size = 32;
    const r = bakeMaps(low, high, { size, padding: 0 })!;
    const g = heightToBytes(r);
    expect(g[((16 * size + 24) * 4) | 0]).toBeGreaterThan(200);
    expect(g[((16 * size + 8) * 4) | 0]).toBeLessThan(56);
    const flat = bakeMaps(low, low, { size, padding: 0 })!;
    expect(heightToBytes(flat)[0]).toBe(128);
  });
});
