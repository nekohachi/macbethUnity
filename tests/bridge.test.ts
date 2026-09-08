/**
 * ブリッジ（`12` の B3）。
 *
 * 要点は 3 つ。列の対応付けが向きまで含めて合うこと、繋いだ面の表裏が
 * 隣の面と揃うこと、繋げない入力では何もしないこと。
 */
import { describe, expect, it } from "vitest";
import { PRIMITIVES, defaultParams } from "../src/core/primitives.js";
import { Mesh, MeshBuilder, edgeKey } from "../src/core/mesh.js";
import { bridgeEdges, edgeChains } from "../src/core/bridge.js";

const cube = () => PRIMITIVES.cube.build(defaultParams("cube"));

/** 面が 1 枚しか付いていないエッジ。 */
function borderEdges(mesh: Mesh): Array<[number, number]> {
  const ef = mesh.edgeFaceMap();
  const out: Array<[number, number]> = [];
  for (const [a, b] of mesh.edges()) {
    if ((ef.get(edgeKey(a, b)) ?? []).length === 1) out.push([a, b]);
  }
  return out;
}

/**
 * 向かい合った 2 枚の四角形。下は下向き、上は上向きに張ってあるので、
 * 縁どうしを繋ぐと閉じた箱になる。ブリッジの素直な使い道そのもの。
 */
function facingSquares(): Mesh {
  const b = new MeshBuilder({ weld: false });
  for (const [x, y, z] of [
    [0, 0, 0],
    [1, 0, 0],
    [1, 0, 1],
    [0, 0, 1],
    [0, 1, 0],
    [1, 1, 0],
    [1, 1, 1],
    [0, 1, 1],
  ]) {
    b.vertex(x, y, z);
  }
  b.face([0, 1, 2, 3]); // 下面（法線は −Y）
  b.face([4, 7, 6, 5]); // 上面（法線は +Y）
  return b.build();
}

/** すべてのエッジが 2 枚の面に挟まれていれば閉じている。 */
function isClosed(mesh: Mesh): boolean {
  const ef = mesh.edgeFaceMap();
  for (const [a, b] of mesh.edges()) if ((ef.get(edgeKey(a, b)) ?? []).length !== 2) return false;
  return true;
}

/** 表裏が揃っているか。同じエッジを 2 枚の面が逆向きに通っていれば揃っている。 */
function windingConsistent(mesh: Mesh): boolean {
  const seen = new Map<string, number>();
  for (let f = 0; f < mesh.faceCount; f++) {
    const verts = mesh.faceVerts(f);
    for (let i = 0; i < verts.length; i++) {
      const key = `${verts[i]}>${verts[(i + 1) % verts.length]}`;
      seen.set(key, (seen.get(key) ?? 0) + 1);
      if (seen.get(key)! > 1) return false; // 同じ向きに 2 回通っている = 裏返り
    }
  }
  return true;
}

describe("エッジ列の切り出し", () => {
  it("2 つの輪に分かれる", () => {
    const chains = edgeChains(borderEdges(facingSquares()));
    expect(chains).not.toBeNull();
    expect(chains!.length).toBe(2);
    for (const c of chains!) {
      expect(c.closed).toBe(true);
      expect(c.verts.length).toBe(4);
    }
  });

  it("枝分かれがあれば null", () => {
    // 1 つの頂点に 3 本集まる形
    expect(
      edgeChains([
        [0, 1],
        [0, 2],
        [0, 3],
      ]),
    ).toBeNull();
  });

  it("開いた列は端から並ぶ", () => {
    const chains = edgeChains([
      [1, 2],
      [3, 2],
      [3, 4],
    ]);
    expect(chains!.length).toBe(1);
    expect(chains![0].closed).toBe(false);
    expect(chains![0].verts).toEqual([1, 2, 3, 4]);
  });
});

describe("ブリッジ", () => {
  it("向かい合った 2 枚の縁を繋ぐと閉じた箱になる", () => {
    const open = facingSquares();
    expect(isClosed(open)).toBe(false);
    const r = bridgeEdges(open, borderEdges(open));
    expect(r).not.toBeNull();
    expect(r!.faces).toBe(4);
    expect(r!.mesh.faceCount).toBe(open.faceCount + 4);
    // 縁が塞がって閉じた形になる
    expect(isClosed(r!.mesh)).toBe(true);
    expect(windingConsistent(r!.mesh)).toBe(true);
  });

  it("繋いだ面が上下の縁を 1 本ずつ結んでいる", () => {
    const open = facingSquares();
    const before = open.faceCount;
    const r = bridgeEdges(open, borderEdges(open))!;
    // 追加された面はすべて四角形で、上の縁と下の縁の頂点を 2 つずつ含む
    for (let f = before; f < r.mesh.faceCount; f++) {
      const verts = r.mesh.faceVerts(f);
      expect(verts.length).toBe(4);
      let high = 0;
      for (const v of verts) if (r.mesh.getPosition(v)[1] > 0) high++;
      expect(high).toBe(2);
    }
  });

  it("分割数を上げると段が増える（`23` の T4）", () => {
    const open = facingSquares();
    const before = open.faceCount;
    const r = bridgeEdges(open, borderEdges(open), 3)!;
    expect(r).not.toBeNull();
    // 4 本 × 3 段
    expect(r.faces).toBe(12);
    expect(r.mesh.faceCount).toBe(before + 12);
    expect(isClosed(r.mesh)).toBe(true);
    expect(windingConsistent(r.mesh)).toBe(true);

    // 中間の輪は両端の 1/3・2/3 の高さに並ぶ（下が y=0、上が y=1）
    const heights = new Set<string>();
    for (let v = open.vertexCount; v < r.mesh.vertexCount; v++) {
      heights.add(r.mesh.getPosition(v)[1].toFixed(4));
    }
    expect([...heights].sort()).toEqual(["0.3333", "0.6667"]);
    // 中間の頂点は 4 つ × 2 段
    expect(r.mesh.vertexCount).toBe(open.vertexCount + 8);
  });

  it("本数が違えば何もしない", () => {
    const open = facingSquares();
    const edges = borderEdges(open);
    // 片方の輪から 1 本落として本数を崩す
    expect(bridgeEdges(open, edges.slice(0, edges.length - 1))).toBeNull();
  });

  it("境界でないエッジは繋がない", () => {
    const m = cube();
    const edges = m.edges().slice(0, 8);
    expect(bridgeEdges(m, edges)).toBeNull();
  });

  it("列が 1 つしかなければ何もしない", () => {
    const open = facingSquares();
    const chains = edgeChains(borderEdges(open))!;
    const one: Array<[number, number]> = [];
    const verts = chains[0].verts;
    for (let i = 0; i < verts.length; i++) one.push([verts[i], verts[(i + 1) % verts.length]]);
    expect(bridgeEdges(open, one)).toBeNull();
  });

  it("向きが逆でも近い頂点どうしが繋がる", () => {
    const open = facingSquares();
    const chains = edgeChains(borderEdges(open))!;
    // 片方の輪を逆順にした入力でも、対応付けは同じ結果になるはず
    const edgesOf = (verts: number[]): Array<[number, number]> => {
      const out: Array<[number, number]> = [];
      for (let i = 0; i < verts.length; i++) out.push([verts[i], verts[(i + 1) % verts.length]]);
      return out;
    };
    const forward = bridgeEdges(open, [...edgesOf(chains[0].verts), ...edgesOf(chains[1].verts)])!;
    const backward = bridgeEdges(open, [
      ...edgesOf(chains[0].verts),
      ...edgesOf([...chains[1].verts].reverse()),
    ])!;
    // 繋がれた辺の集合が一致すること（並びの向きに依らない）
    const pairs = (m: Mesh, from: number): Set<string> => {
      const out = new Set<string>();
      for (let f = from; f < m.faceCount; f++) {
        for (const v of m.faceVerts(f)) out.add(`${f - from}:${v}`);
      }
      return out;
    };
    expect(windingConsistent(backward.mesh)).toBe(true);
    expect([...pairs(backward.mesh, open.faceCount)].sort()).toEqual(
      [...pairs(forward.mesh, open.faceCount)].sort(),
    );
  });
});
