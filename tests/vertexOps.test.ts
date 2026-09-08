/**
 * 頂点まわりの操作（`12` の B4）。
 *
 * 見るのは 3 つ。距離のマージが「近いものだけ」まとめること、
 * 頂点の削除でまわりが 1 枚の面になること、頂点の押し出しで尖ること。
 */
import { describe, expect, it } from "vitest";
import { PRIMITIVES, defaultParams } from "../src/core/primitives.js";
import { Mesh, edgeKey } from "../src/core/mesh.js";
import { compact } from "../src/core/topology.js";
import { subdivide } from "../src/core/subdivide.js";
import { dissolveVertices, extrudeVertices, mergeByDistance } from "../src/core/vertexOps.js";

const cube = () => PRIMITIVES.cube.build(defaultParams("cube"));
/**
 * 閉じたメッシュ。球のプリミティブは UV の切れ目で頂点が割れていて（境界エッジが 27 本）、
 * 極や継ぎ目の頂点は扇が閉じない。閉じた形が要るところではこちらを使う。
 */
const ball = () => subdivide(PRIMITIVES.cube.build(defaultParams("cube")), 2);
const sphere = () => PRIMITIVES.sphere.build(defaultParams("sphere"));

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

describe("距離でマージ", () => {
  it("しきい値より近い頂点だけがまとまる", () => {
    const m = cube();
    // 頂点 0 のすぐ隣に、ほんの少しずらした点を持つ立方体を作る
    const moved = m.clone();
    const p = moved.getPosition(0);
    // 1 辺 1 の立方体。0.02 なら隣の頂点（1.0 離れている）には届かない
    moved.setPosition(1, p[0] + 0.01, p[1], p[2]);

    const r = mergeByDistance(moved, 0.02);
    expect(r).not.toBeNull();
    expect(r!.merged).toBe(1);
    expect(compact(r!.mesh).vertexCount).toBe(7);
  });

  it("しきい値が小さければ何もしない", () => {
    expect(mergeByDistance(cube(), 0.001)).toBeNull();
  });

  it("対象を絞れば、その中だけを見る", () => {
    const m = cube();
    const p = m.getPosition(0);
    m.setPosition(1, p[0] + 0.01, p[1], p[2]);
    // 0 と 1 が近いが、対象に 1 を入れなければまとまらない
    expect(mergeByDistance(m, 0.02, [0, 2, 3])).toBeNull();
    expect(mergeByDistance(m, 0.02, [0, 1])?.merged).toBe(1);
  });

  it("鎖のように繋がっていればまとめて 1 点になる", () => {
    const m = cube();
    const p = m.getPosition(0);
    // 0 → 1 → 2 と 0.01 ずつずらす。端どうしは 0.02 離れているが繋がる
    m.setPosition(1, p[0] + 0.01, p[1], p[2]);
    m.setPosition(2, p[0] + 0.02, p[1], p[2]);
    const r = mergeByDistance(m, 0.015)!;
    expect(r.merged).toBe(2);
    expect(compact(r.mesh).vertexCount).toBe(6);
  });
});

describe("頂点の削除", () => {
  it("頂点を消すと、まわりが 1 枚の面になる", () => {
    const m = ball();
    // 面が 4 枚以上ぶら下がっている頂点を選ぶ
    const vf = m.vertexFaces();
    let target = -1;
    for (const [v, faces] of vf) {
      if (faces.length >= 4) {
        target = v;
        break;
      }
    }
    expect(target).toBeGreaterThanOrEqual(0);
    const around = vf.get(target)!.length;

    const r = dissolveVertices(m, [target]);
    expect(r).not.toBeNull();
    expect(r!.removed).toBe(1);
    // まわりの面が消えて、代わりに 1 枚
    expect(r!.mesh.faceCount).toBe(m.faceCount - around + 1);
    const out = compact(r!.mesh);
    expect(out.vertexCount).toBe(m.vertexCount - 1);
    expect(isClosed(out)).toBe(true);
    expect(windingConsistent(out)).toBe(true);
  });

  it("立方体の角を消すと 3 枚が 1 枚になる", () => {
    const m = cube();
    const r = dissolveVertices(m, [0])!;
    expect(r.mesh.faceCount).toBe(4); // 6 枚のうち 3 枚が 1 枚に
    // 3 枚の四角形から角を抜くので、残りは 6 角形になる
    const merged = r.mesh.faceVerts(r.mesh.faceCount - 1);
    expect(merged.length).toBe(6);
    expect(windingConsistent(compact(r.mesh))).toBe(true);
  });

  it("面が繋がっていない頂点は触らない", () => {
    expect(dissolveVertices(cube(), [])).toBeNull();
  });

  it("扇が開いていても消せる（球の極は UV の切れ目で開いている）", () => {
    const m = sphere();
    const around = m.vertexFaces().get(0)!.length;
    expect(around).toBeGreaterThan(4);
    const r = dissolveVertices(m, [0]);
    expect(r!.removed).toBe(1);
    expect(r!.mesh.faceCount).toBe(m.faceCount - around + 1);
  });
});

describe("頂点の押し出し", () => {
  it("立方体の角を押し出すと尖る", () => {
    const m = cube();
    const before = m.getPosition(0);
    const r = extrudeVertices(m, [0], 0.5, 0.3);
    expect(r).not.toBeNull();

    // 角には 3 枚の面。輪の 3 点と先端が増える
    expect(r!.mesh.vertexCount).toBe(m.vertexCount + 4);
    // 3 枚が広がり、蓋の三角形が 3 枚増える
    expect(r!.mesh.faceCount).toBe(m.faceCount + 3);
    expect(isClosed(r!.mesh)).toBe(true);
    expect(windingConsistent(r!.mesh)).toBe(true);

    // 先端が元の位置より外へ出ていること
    const tip = r!.mesh.getPosition(r!.mesh.vertexCount - 1);
    const grew = Math.hypot(tip[0], tip[1], tip[2]) - Math.hypot(before[0], before[1], before[2]);
    expect(grew).toBeGreaterThan(0.3);
  });

  it("押し出した先が元の頂点の法線方向にある", () => {
    const m = ball();
    const vf = m.vertexFaces();
    let target = -1;
    for (const [v, faces] of vf) {
      if (faces.length === 4) {
        target = v;
        break;
      }
    }
    const normals = m.vertexNormals();
    const p = m.getPosition(target);
    const r = extrudeVertices(m, [target], 0.4, 0.25)!;
    const tip = r.mesh.getPosition(r.mesh.vertexCount - 1);
    for (let k = 0; k < 3; k++) {
      expect(tip[k]).toBeCloseTo(p[k] + normals[target * 3 + k] * 0.4, 5);
    }
  });

  it("輪の点は辺の上に乗る", () => {
    const m = cube();
    const r = extrudeVertices(m, [0], 0.5, 0.25)!;
    const p = m.getPosition(0);
    const neighbors = m.vertexNeighbors().get(0)!;
    // 追加された 4 点のうち、先端以外の 3 点が辺の 25% の位置にある
    for (let v = m.vertexCount; v < m.vertexCount + 3; v++) {
      const q = r.mesh.getPosition(v);
      const onSome = neighbors.some((u) => {
        const n = m.getPosition(u);
        return (
          Math.abs(q[0] - (p[0] + (n[0] - p[0]) * 0.25)) < 1e-6 &&
          Math.abs(q[1] - (p[1] + (n[1] - p[1]) * 0.25)) < 1e-6 &&
          Math.abs(q[2] - (p[2] + (n[2] - p[2]) * 0.25)) < 1e-6
        );
      });
      expect(onSome).toBe(true);
    }
  });

  it("隣り合う頂点を同時に指定しても壊れない", () => {
    const m = cube();
    const neighbor = m.vertexNeighbors().get(0)![0];
    const r = extrudeVertices(m, [0, neighbor], 0.4, 0.25)!;
    // 面を取り合うので、後から来た方は飛ばす
    expect(isClosed(r.mesh)).toBe(true);
    expect(windingConsistent(r.mesh)).toBe(true);
  });

  it("扇が開いている頂点は尖らせない", () => {
    // 球の極は UV の切れ目で輪になっていない。輪が無いと蓋が張れないので何もしない
    expect(extrudeVertices(sphere(), [0], 0.3)).toBeNull();
  });

  it("UV は持ち越される", () => {
    const m = cube();
    expect(m.uvSets.size).toBeGreaterThan(0);
    const r = extrudeVertices(m, [0], 0.3, 0.25)!;
    expect(r.mesh.uvSets.size).toBe(m.uvSets.size);
    for (const set of r.mesh.uvSets.values()) {
      expect(set.length).toBe(r.mesh.faceCorners.length * 2);
    }
  });
});
