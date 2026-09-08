/**
 * 接続（`12` の B5）。
 *
 * 見るのは 4 つ。同じ面の 2 点が結ばれること、隣り合う 2 点は結ばないこと、
 * 3 点以上でも順に分かれること、エッジの中点どうしが結ばれること。
 */
import { describe, expect, it } from "vitest";
import { PRIMITIVES, defaultParams } from "../src/core/primitives.js";
import { Mesh, edgeKey } from "../src/core/mesh.js";
import { connectEdges, connectVertices } from "../src/core/connect.js";

const cube = () => PRIMITIVES.cube.build(defaultParams("cube"));

/** そのエッジが存在するか。 */
function hasEdge(mesh: Mesh, a: number, b: number): boolean {
  return mesh.edgeFaceMap().has(edgeKey(a, b));
}

/** すべてのエッジが 2 枚の面に挟まれていれば閉じている。 */
function isClosed(mesh: Mesh): boolean {
  const ef = mesh.edgeFaceMap();
  for (const [a, b] of mesh.edges()) if ((ef.get(edgeKey(a, b)) ?? []).length !== 2) return false;
  return true;
}

/** 同じ向きに 2 回通っているエッジが無ければ表裏が揃っている。 */
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

/** 面 f の対角にある 2 頂点。 */
function diagonalOf(mesh: Mesh, f: number): [number, number] {
  const verts = mesh.faceVerts(f);
  return [verts[0], verts[2]];
}

describe("頂点の接続", () => {
  it("同じ面の対角を結ぶと、その面が 2 枚になる", () => {
    const m = cube();
    const [a, b] = diagonalOf(m, 0);
    expect(hasEdge(m, a, b)).toBe(false);

    const r = connectVertices(m, [a, b]);
    expect(r).not.toBeNull();
    expect(r!.edges).toBe(1);
    expect(r!.mesh.faceCount).toBe(m.faceCount + 1);
    expect(r!.mesh.vertexCount).toBe(m.vertexCount);
    expect(hasEdge(r!.mesh, a, b)).toBe(true);
    expect(isClosed(r!.mesh)).toBe(true);
    expect(windingConsistent(r!.mesh)).toBe(true);
  });

  it("隣り合う 2 点は結ばない（すでに辺がある）", () => {
    const m = cube();
    const verts = m.faceVerts(0);
    expect(connectVertices(m, [verts[0], verts[1]])).toBeNull();
  });

  it("同じ面に居ない 2 点は結ばない", () => {
    const m = cube();
    // 立方体の対角にある 2 頂点。同じ面には乗らない
    let far: [number, number] | null = null;
    for (let a = 0; a < m.vertexCount && !far; a++) {
      const pa = m.getPosition(a);
      for (let b = a + 1; b < m.vertexCount; b++) {
        const pb = m.getPosition(b);
        if (Math.abs(pa[0] + pb[0]) < 1e-6 && Math.abs(pa[1] + pb[1]) < 1e-6 && Math.abs(pa[2] + pb[2]) < 1e-6) {
          far = [a, b];
          break;
        }
      }
    }
    expect(far).not.toBeNull();
    expect(connectVertices(m, far!)).toBeNull();
  });

  it("選択が 1 つなら何もしない", () => {
    expect(connectVertices(cube(), [0])).toBeNull();
  });

  it("3 点を指定しても、結べる組だけが分かれる", () => {
    const m = cube();
    const hex = m.faceVerts(0);
    expect(hex.length).toBe(4);
    // 四角形では 3 点のうち 2 組が隣り合うので、分かれるのは 1 回だけ
    const r = connectVertices(m, [hex[0], hex[1], hex[2]])!;
    expect(r.edges).toBe(1);
    expect(windingConsistent(r.mesh)).toBe(true);
  });

  it("複数の面をまとめて分けられる", () => {
    const m = cube();
    // 2 枚の面それぞれの対角を同時に指定する
    const [a, b] = diagonalOf(m, 0);
    const [c, d] = diagonalOf(m, 3);
    const r = connectVertices(m, [a, b, c, d])!;
    expect(r.edges).toBeGreaterThanOrEqual(2);
    expect(isClosed(r.mesh)).toBe(true);
    expect(windingConsistent(r.mesh)).toBe(true);
  });
});

describe("エッジの接続", () => {
  it("同じ面の向かい合う 2 辺の中点が結ばれる", () => {
    const m = cube();
    const verts = m.faceVerts(0);
    const e1: [number, number] = [verts[0], verts[1]];
    const e2: [number, number] = [verts[2], verts[3]];

    const r = connectEdges(m, [e1, e2]);
    expect(r).not.toBeNull();
    // 中点が 2 つ増える
    expect(r!.mesh.vertexCount).toBe(m.vertexCount + 2);
    // 中点を挟んだ面 0 が 2 枚に分かれる
    expect(r!.mesh.faceCount).toBe(m.faceCount + 1);
    expect(hasEdge(r!.mesh, m.vertexCount, m.vertexCount + 1)).toBe(true);
    expect(isClosed(r!.mesh)).toBe(true);
    expect(windingConsistent(r!.mesh)).toBe(true);
  });

  it("エッジ 1 本では何もしない", () => {
    const m = cube();
    const verts = m.faceVerts(0);
    expect(connectEdges(m, [[verts[0], verts[1]]])).toBeNull();
  });

  it("面を 1 枚も共有しない 2 辺なら中点は結ばれない", () => {
    const m = cube();
    const ef = m.edgeFaceMap();
    const all = m.edges();
    // 隣接面がまったく重ならない組を探す。中点が同じ面に乗らないので結べない
    let pair: Array<[number, number]> | null = null;
    for (let i = 0; i < all.length && !pair; i++) {
      const fa = new Set(ef.get(edgeKey(...all[i])) ?? []);
      for (let j = i + 1; j < all.length; j++) {
        const fb = ef.get(edgeKey(...all[j])) ?? [];
        if (fb.every((f) => !fa.has(f))) {
          pair = [all[i], all[j]];
          break;
        }
      }
    }
    expect(pair).not.toBeNull();
    expect(connectEdges(m, pair!)).toBeNull();
  });

  it("辺を 1 枚の面で共有していれば、離れた面の辺でも中点が結ばれる", () => {
    const m = cube();
    // 上面と下面の辺。どちらも同じ側面に接しているので、その側面の中で結ばれる
    const a = m.faceVerts(0);
    const b = m.faceVerts(1);
    const r = connectEdges(m, [
      [a[0], a[1]],
      [b[0], b[1]],
    ]);
    expect(r).not.toBeNull();
    expect(windingConsistent(r!.mesh)).toBe(true);
  });

  it("UV は持ち越される", () => {
    const m = cube();
    const verts = m.faceVerts(0);
    const r = connectEdges(m, [
      [verts[0], verts[1]],
      [verts[2], verts[3]],
    ])!;
    expect(r.mesh.uvSets.size).toBe(m.uvSets.size);
    for (const set of r.mesh.uvSets.values()) {
      expect(set.length).toBe(r.mesh.faceCorners.length * 2);
    }
  });
});
