import { describe, expect, it } from "vitest";
import { PRIMITIVES, PRIMITIVE_ORDER, defaultParams } from "../src/core/primitives.js";

describe("プリミティブ", () => {
  it("8 種類ある", () => {
    expect(PRIMITIVE_ORDER).toHaveLength(8);
    for (const id of PRIMITIVE_ORDER) expect(PRIMITIVES[id]).toBeDefined();
  });

  it("キューブは 8 頂点 12 エッジ 6 面", () => {
    const m = PRIMITIVES.cube.build({ width: 1, height: 1, depth: 1, sdW: 1, sdH: 1, sdD: 1 });
    expect(m.stats()).toMatchObject({ vertices: 8, edges: 12, faces: 6, triangles: 12 });
  });

  it("2 分割キューブは 26 頂点 24 面（重複頂点が溶接されている）", () => {
    const m = PRIMITIVES.cube.build({ width: 1, height: 1, depth: 1, sdW: 2, sdH: 2, sdD: 2 });
    expect(m.stats()).toMatchObject({ vertices: 26, faces: 24 });
  });

  it("すべてのプリミティブが既定パラメータで面を作れる", () => {
    for (const id of PRIMITIVE_ORDER) {
      const m = PRIMITIVES[id].build(defaultParams(id));
      expect(m.faceCount, `${id} の面数`).toBeGreaterThan(0);
      expect(m.vertexCount, `${id} の頂点数`).toBeGreaterThan(0);
    }
  });

  it("すべてのプリミティブが UV を持つ", () => {
    for (const id of PRIMITIVE_ORDER) {
      if (id === "platonic") continue; // 正多面体は UV を張らない
      const m = PRIMITIVES[id].build(defaultParams(id));
      const uv = m.uvSets.get("map1");
      expect(uv, `${id} の UV`).toBeDefined();
      expect(uv!.length, `${id} の UV 長`).toBe(m.cornerCount * 2);
    }
  });

  it("閉じたプリミティブの向きが揃っている（共有エッジを逆向きにたどる）", () => {
    for (const id of ["cube", "sphere", "cylinder", "cone", "torus", "platonic"]) {
      const m = PRIMITIVES[id].build(defaultParams(id));
      const directed = new Set<string>();
      let conflicts = 0;
      for (let f = 0; f < m.faceCount; f++) {
        const verts = m.faceVerts(f);
        for (let i = 0; i < verts.length; i++) {
          const key = `${verts[i]}>${verts[(i + 1) % verts.length]}`;
          if (directed.has(key)) conflicts++;
          directed.add(key);
        }
      }
      // 同じ向きの有向エッジが 2 回現れたら、どこかの面が裏返っている
      expect(conflicts, `${id} の向きの衝突`).toBe(0);
    }
  });

  it("閉じたプリミティブの符号付き体積が正（法線が外を向く）", () => {
    // 原点からの向きでは判定できない形（トーラスの内側など）でも正しく効く
    const signedVolume = (id: string): number => {
      const m = PRIMITIVES[id].build(defaultParams(id));
      const { tri } = m.triangulate();
      let v = 0;
      for (let i = 0; i < tri.length; i += 3) {
        const a = m.getPosition(tri[i]);
        const b = m.getPosition(tri[i + 1]);
        const c = m.getPosition(tri[i + 2]);
        v +=
          a[0] * (b[1] * c[2] - b[2] * c[1]) -
          a[1] * (b[0] * c[2] - b[2] * c[0]) +
          a[2] * (b[0] * c[1] - b[1] * c[0]);
      }
      return v / 6;
    };
    for (const id of ["cube", "sphere", "cylinder", "cone", "torus", "platonic"]) {
      expect(signedVolume(id), `${id} の符号付き体積`).toBeGreaterThan(0);
    }
  });

  it("キューブの体積が寸法と一致する", () => {
    const m = PRIMITIVES.cube.build({ width: 2, height: 3, depth: 4, sdW: 1, sdH: 1, sdD: 1 });
    const { tri } = m.triangulate();
    let v = 0;
    for (let i = 0; i < tri.length; i += 3) {
      const a = m.getPosition(tri[i]);
      const b = m.getPosition(tri[i + 1]);
      const c = m.getPosition(tri[i + 2]);
      v +=
        a[0] * (b[1] * c[2] - b[2] * c[1]) -
        a[1] * (b[0] * c[2] - b[2] * c[0]) +
        a[2] * (b[0] * c[1] - b[1] * c[0]);
    }
    expect(v / 6).toBeCloseTo(24, 5);
  });

  it("正多面体は 5 種類とも作れる", () => {
    const expected = [
      { kind: 0, faces: 4 },
      { kind: 1, faces: 6 },
      { kind: 2, faces: 8 },
      { kind: 3, faces: 12 },
      { kind: 4, faces: 20 },
    ];
    for (const e of expected) {
      const m = PRIMITIVES.platonic.build({ kind: e.kind, radius: 1 });
      expect(m.faceCount, `kind ${e.kind}`).toBe(e.faces);
    }
  });
});
