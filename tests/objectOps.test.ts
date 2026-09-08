/**
 * オブジェクトと面のまとまりを扱う操作（`12` の B7）。
 *
 * 複製は切り離されていること、抽出は両方が残ること、結合は座標が焼き込まれること、
 * 分離は塊の数だけ返ること、ミラーは表裏が揃って境目が溶接されること。
 */
import { describe, expect, it } from "vitest";
import { PRIMITIVES, defaultParams } from "../src/core/primitives.js";
import { Mesh, MeshBuilder, edgeKey } from "../src/core/mesh.js";
import { identityTransform } from "../src/core/document.js";
import {
  combineMeshes,
  duplicateFaces,
  extractFaces,
  mirrorMesh,
  separateShells,
  transformPoint,
} from "../src/core/objectOps.js";

const cube = () => PRIMITIVES.cube.build(defaultParams("cube"));

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

/** すべてのエッジが 2 枚の面に挟まれていれば閉じている。 */
function isClosed(mesh: Mesh): boolean {
  const ef = mesh.edgeFaceMap();
  for (const [a, b] of mesh.edges()) if ((ef.get(edgeKey(a, b)) ?? []).length !== 2) return false;
  return true;
}

describe("面の複製", () => {
  it("写しは元と頂点を共有しない", () => {
    const m = cube();
    const r = duplicateFaces(m, [0]);
    expect(r).not.toBeNull();
    expect(r!.faces.length).toBe(1);
    expect(r!.mesh.faceCount).toBe(m.faceCount + 1);
    expect(r!.mesh.vertexCount).toBe(m.vertexCount + 4);

    // 写しの頂点は元の面の頂点と重ならない
    const original = new Set(m.faceVerts(0));
    for (const v of r!.mesh.faceVerts(r!.faces[0])) expect(original.has(v)).toBe(false);
    // 位置は同じ
    for (let i = 0; i < 4; i++) {
      const a = m.getPosition(m.faceVerts(0)[i]);
      const b = r!.mesh.getPosition(r!.mesh.faceVerts(r!.faces[0])[i]);
      for (let k = 0; k < 3; k++) expect(b[k]).toBeCloseTo(a[k], 6);
    }
  });

  it("選択が無ければ何もしない", () => {
    expect(duplicateFaces(cube(), [])).toBeNull();
  });
});

describe("面の抽出", () => {
  it("抜いた側と残った側に分かれる", () => {
    const m = cube();
    const r = extractFaces(m, [0, 1]);
    expect(r).not.toBeNull();
    expect(r!.count).toBe(2);
    expect(r!.mesh.faceCount).toBe(4);
    expect(r!.extracted.faceCount).toBe(2);
    // 使われなくなった頂点は詰まっている
    expect(r!.extracted.vertexCount).toBeLessThanOrEqual(8);
    expect(windingConsistent(r!.extracted)).toBe(true);
  });

  it("全部を選んだら何もしない（残りが空になる）", () => {
    const m = cube();
    expect(extractFaces(m, [0, 1, 2, 3, 4, 5])).toBeNull();
  });
});

describe("結合", () => {
  it("トランスフォームが頂点に焼き込まれる", () => {
    const a = cube();
    const b = cube();
    const moved = { ...identityTransform(), position: [3, 0, 0] as [number, number, number] };
    const r = combineMeshes([{ mesh: a }, { mesh: b, transform: moved }]);
    expect(r).not.toBeNull();
    expect(r!.vertexCount).toBe(a.vertexCount + b.vertexCount);
    expect(r!.faceCount).toBe(a.faceCount + b.faceCount);

    // 後ろ半分が +3 だけずれている
    for (let v = 0; v < b.vertexCount; v++) {
      const before = b.getPosition(v);
      const after = r!.getPosition(a.vertexCount + v);
      expect(after[0]).toBeCloseTo(before[0] + 3, 5);
      expect(after[1]).toBeCloseTo(before[1], 5);
    }
    expect(windingConsistent(r!)).toBe(true);
  });

  it("1 つでは何もしない", () => {
    expect(combineMeshes([{ mesh: cube() }])).toBeNull();
  });

  it("回転も効く", () => {
    // Y まわり 90°
    const t = {
      position: [0, 0, 0] as [number, number, number],
      rotation: [0, Math.SQRT1_2, 0, Math.SQRT1_2] as [number, number, number, number],
      scale: [1, 1, 1] as [number, number, number],
    };
    const p = transformPoint(t, 1, 0, 0);
    expect(p[0]).toBeCloseTo(0, 6);
    expect(p[2]).toBeCloseTo(-1, 6);
  });
});

describe("分離", () => {
  it("繋がっていない 2 つの塊に分かれる", () => {
    const a = cube();
    const b = cube();
    const moved = { ...identityTransform(), position: [3, 0, 0] as [number, number, number] };
    const joined = combineMeshes([{ mesh: a }, { mesh: b, transform: moved }])!;

    const parts = separateShells(joined);
    expect(parts).not.toBeNull();
    expect(parts!.length).toBe(2);
    for (const part of parts!) {
      expect(part.faceCount).toBe(6);
      expect(part.vertexCount).toBe(8);
      expect(isClosed(part)).toBe(true);
    }
  });

  it("1 つの塊なら何もしない", () => {
    expect(separateShells(cube())).toBeNull();
  });
});

describe("ミラー", () => {
  it("X で折り返すと倍になり、表裏が揃う", () => {
    // 立方体を +X 側へずらして、原点の平面をまたがないようにする
    const m = cube();
    for (let v = 0; v < m.vertexCount; v++) {
      const p = m.getPosition(v);
      m.setPosition(v, p[0] + 1, p[1], p[2]);
    }
    const r = mirrorMesh(m, 0);
    expect(r).not.toBeNull();
    expect(r!.welded).toBe(0);
    expect(r!.mesh.faceCount).toBe(m.faceCount * 2);
    expect(r!.mesh.vertexCount).toBe(m.vertexCount * 2);
    expect(windingConsistent(r!.mesh)).toBe(true);

    // 写した側は X が反転している
    for (let v = 0; v < m.vertexCount; v++) {
      const a = m.getPosition(v);
      const b = r!.mesh.getPosition(m.vertexCount + v);
      expect(b[0]).toBeCloseTo(-a[0], 6);
      expect(b[1]).toBeCloseTo(a[1], 6);
    }
  });

  it("境目に乗っている頂点は溶接される", () => {
    // 2 辺が X = 0 に乗っている板。折り返すとその 2 点が重なる
    const b = new MeshBuilder({ weld: false });
    for (const [x, y, z] of [
      [0, 0, 0],
      [1, 0, 0],
      [1, 1, 0],
      [0, 1, 0],
    ]) {
      b.vertex(x, y, z);
    }
    b.face([0, 1, 2, 3]);
    const cut = b.build();

    const r = mirrorMesh(cut, 0, 0.01)!;
    // X = 0 に乗っている 2 点が、それぞれ写しと 1 つにまとまる
    expect(r.welded).toBe(2);
    expect(r.mesh.vertexCount).toBe(cut.vertexCount * 2 - 2);
    expect(windingConsistent(r.mesh)).toBe(true);
  });

  it("UV は持ち越される", () => {
    const m = cube();
    const r = mirrorMesh(m, 1)!;
    expect(r.mesh.uvSets.size).toBe(m.uvSets.size);
    for (const set of r.mesh.uvSets.values()) {
      expect(set.length).toBe(r.mesh.faceCorners.length * 2);
    }
  });
});
