import { describe, expect, it } from "vitest";
import { PRIMITIVES, defaultParams } from "../src/core/primitives.js";
import { Mesh, edgeKey } from "../src/core/mesh.js";
import { bevelEdges } from "../src/core/bevel.js";

const cube = () => PRIMITIVES.cube.build(defaultParams("cube"));

/** 立方体の、指定した 2 頂点を結ぶエッジを探す。 */
function findEdge(mesh: Mesh, near: (p: [number, number, number]) => boolean): Array<[number, number]> {
  const out: Array<[number, number]> = [];
  for (const [a, b] of mesh.edges()) {
    if (near(mesh.getPosition(a)) && near(mesh.getPosition(b))) out.push([a, b]);
  }
  return out;
}

/**
 * 閉じているか。すべてのエッジがちょうど 2 面に接していれば穴が無い。
 * ベベルで隙間が開いていないことの確認に使う。
 */
function isClosed(mesh: Mesh): boolean {
  const ef = mesh.edgeFaceMap();
  for (const faces of ef.values()) if (faces.length !== 2) return false;
  return true;
}

/** 符号付き体積。正なら面が外を向いている。 */
function signedVolume(mesh: Mesh): number {
  const { tri } = mesh.triangulate();
  let sum = 0;
  for (let i = 0; i < tri.length; i += 3) {
    const a = mesh.getPosition(tri[i]);
    const b = mesh.getPosition(tri[i + 1]);
    const c = mesh.getPosition(tri[i + 2]);
    sum +=
      a[0] * (b[1] * c[2] - b[2] * c[1]) -
      a[1] * (b[0] * c[2] - b[2] * c[0]) +
      a[2] * (b[0] * c[1] - b[1] * c[0]);
  }
  return sum / 6;
}

/** 有向エッジが重複していないか。重複は面の向きが揃っていない印。 */
function windingConsistent(mesh: Mesh): boolean {
  const seen = new Set<string>();
  for (let f = 0; f < mesh.faceCount; f++) {
    const verts = mesh.faceVerts(f);
    for (let i = 0; i < verts.length; i++) {
      const key = `${verts[i]}>${verts[(i + 1) % verts.length]}`;
      if (seen.has(key)) return false;
      seen.add(key);
    }
  }
  return true;
}

describe("bevelEdges", () => {
  it("1 辺をベベルすると帯が 1 枚増え、閉じたままになる", () => {
    const m = cube();
    const before = m.stats();
    // 上面の辺を 1 本
    const edge = m.edges().find(([a, b]) => {
      const pa = m.getPosition(a);
      const pb = m.getPosition(b);
      return Math.abs(pa[1] - 0.5) < 1e-6 && Math.abs(pb[1] - 0.5) < 1e-6;
    })!;
    const r = bevelEdges(m, [edge], 0.15, 1);
    expect(r).not.toBeNull();
    // 帯が 1 枚。角の穴は開かない
    expect(r!.newFaces).toBe(1);
    expect(r!.mesh.stats().faces).toBe(before.faces + 1);
    expect(isClosed(r!.mesh)).toBe(true);
    expect(windingConsistent(r!.mesh)).toBe(true);
    expect(signedVolume(r!.mesh)).toBeGreaterThan(0);
  });

  it("1 頂点に集まる 3 辺をベベルすると角の面ができる", () => {
    const m = cube();
    const before = m.stats();
    // 1 つの角（+x +y +z）に集まる 3 辺
    const corner = (p: [number, number, number]) =>
      Math.abs(p[0] - 0.5) < 1e-6 && Math.abs(p[1] - 0.5) < 1e-6 && Math.abs(p[2] - 0.5) < 1e-6;
    const three = m.edges().filter(([a, b]) => corner(m.getPosition(a)) || corner(m.getPosition(b)));
    expect(three.length).toBe(3);

    const r = bevelEdges(m, three, 0.15, 1);
    expect(r).not.toBeNull();
    // 帯 3 枚 + 角 1 枚
    expect(r!.newFaces).toBe(4);
    expect(r!.mesh.stats().faces).toBe(before.faces + 4);
    expect(isClosed(r!.mesh)).toBe(true);
    expect(windingConsistent(r!.mesh)).toBe(true);
    expect(signedVolume(r!.mesh)).toBeGreaterThan(0);
  });

  it("上面のエッジループ 4 本をベベルしても角の面は要らない", () => {
    const m = cube();
    const before = m.stats();
    const loop = findEdge(m, (p) => Math.abs(p[1] - 0.5) < 1e-6);
    expect(loop.length).toBe(4);

    const r = bevelEdges(m, loop, 0.15, 1);
    expect(r).not.toBeNull();
    // 帯 4 枚だけ。角は 2 点しか無いので穴は開かない
    expect(r!.newFaces).toBe(4);
    expect(r!.mesh.stats().faces).toBe(before.faces + 4);
    expect(isClosed(r!.mesh)).toBe(true);
    expect(windingConsistent(r!.mesh)).toBe(true);
    expect(signedVolume(r!.mesh)).toBeGreaterThan(0);
  });

  it("セグメントを増やすと帯が分割されて丸くなる", () => {
    const m = cube();
    const edge = m.edges().find(([a, b]) => {
      const pa = m.getPosition(a);
      const pb = m.getPosition(b);
      return Math.abs(pa[1] - 0.5) < 1e-6 && Math.abs(pb[1] - 0.5) < 1e-6;
    })!;
    const one = bevelEdges(cube(), [edge], 0.15, 1)!;
    const three = bevelEdges(cube(), [edge], 0.15, 3)!;
    // 帯 3 枚に加え、丸めると断面が元の角の側へ膨らむので両端に蓋が要る
    expect(three.newFaces).toBe(5);
    expect(three.mesh.stats().faces).toBe(one.mesh.stats().faces + 4);
    expect(isClosed(three.mesh)).toBe(true);
    expect(windingConsistent(three.mesh)).toBe(true);
    // 丸めた側は面取りより体積が大きい（角の側へ膨らむため）
    expect(signedVolume(three.mesh)).toBeGreaterThan(signedVolume(one.mesh));
  });

  it("UV を持ち越す", () => {
    const m = cube();
    expect(m.uvSets.size).toBeGreaterThan(0);
    const edge = m.edges()[0];
    const r = bevelEdges(m, [edge], 0.1, 1)!;
    expect(r.mesh.uvSets.size).toBe(m.uvSets.size);
    const uv = r.mesh.uvSets.get("map1")!;
    expect(uv.length).toBe(r.mesh.faceCorners.length * 2);
    for (const value of uv) expect(Number.isFinite(value)).toBe(true);
  });

  it("境界エッジは断る", () => {
    const plane = PRIMITIVES.plane.build(defaultParams("plane"));
    const boundary = plane.edges().find(([a, b]) => (plane.edgeFaceMap().get(edgeKey(a, b)) ?? []).length === 1);
    expect(boundary).toBeDefined();
    expect(bevelEdges(plane, [boundary!], 0.1, 1)).toBeNull();
  });

  it("幅が 0 以下、選択が空なら断る", () => {
    const m = cube();
    expect(bevelEdges(m, [], 0.1, 1)).toBeNull();
    expect(bevelEdges(m, [m.edges()[0]], 0, 1)).toBeNull();
  });

  it("幅がエッジ長を越えても裏返らない", () => {
    const m = cube();
    const loop = findEdge(m, (p) => Math.abs(p[1] - 0.5) < 1e-6);
    const r = bevelEdges(m, loop, 10, 1);
    expect(r).not.toBeNull();
    expect(signedVolume(r!.mesh)).toBeGreaterThan(0);
    expect(windingConsistent(r!.mesh)).toBe(true);
  });
});
