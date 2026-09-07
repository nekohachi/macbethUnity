/**
 * docs/08 の合格条件 V1〜V3。
 *
 * V3（剛体変換不変性）が中核。接空間デルタが正しく実装されていれば厳密に成立し、
 * 世界座標で差分を持っているなど実装が誤っていれば必ず落ちる。
 */
import { describe, expect, it } from "vitest";
import { PRIMITIVES, defaultParams } from "../src/core/primitives.js";
import { Mesh, edgeKey } from "../src/core/mesh.js";
import { subdivide } from "../src/core/subdivide.js";
import { Multires, buildFrames } from "../src/core/multires.js";

const cube = () => PRIMITIVES.cube.build(defaultParams("cube"));

/** 決まった順で同じ数列を出す。テストを再現できるようにするため。 */
function rng(seed: number): () => number {
  let s = seed >>> 0;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 0x100000000;
  };
}

/** エッジの二面角（度）。180 が平ら、90 が直角。 */
function dihedral(mesh: Mesh, a: number, b: number, ef: Map<string, number[]>): number {
  const faces = ef.get(edgeKey(a, b)) ?? [];
  if (faces.length !== 2) return NaN;
  const n1 = mesh.faceNormal(faces[0]);
  const n2 = mesh.faceNormal(faces[1]);
  const dot = Math.max(-1, Math.min(1, n1[0] * n2[0] + n1[1] * n2[1] + n1[2] * n2[2]));
  return 180 - (Math.acos(dot) * 180) / Math.PI;
}

/**
 * 点 p のまわり radius 以内にある「クリースの付いたエッジ」の二面角の平均。
 * docs/08 の V2 が言う「該当エッジの二面角」はこれ。
 * クリースが 1 本も無ければ NaN。
 */
function creasedDihedralNear(mesh: Mesh, p: [number, number, number], radius: number): number {
  let sum = 0;
  let count = 0;
  const ef = mesh.edgeFaceMap();
  for (const [a, b] of mesh.edges()) {
    if (mesh.getCrease(a, b) <= 0) continue;
    const pa = mesh.getPosition(a);
    const pb = mesh.getPosition(b);
    const m = [(pa[0] + pb[0]) / 2, (pa[1] + pb[1]) / 2, (pa[2] + pb[2]) / 2];
    if (Math.hypot(m[0] - p[0], m[1] - p[1], m[2] - p[2]) > radius) continue;
    const d = dihedral(mesh, a, b, ef);
    if (Number.isFinite(d)) {
      sum += d;
      count++;
    }
  }
  return count ? sum / count : NaN;
}

/**
 * 点 p のまわり radius 以内にあるエッジの二面角のうち、最も鋭いもの（度）。
 * クリースが無い側で「丸まっているか」を見るのに使う。
 */
function sharpestDihedralNear(mesh: Mesh, p: [number, number, number], radius: number): number {
  const ef = mesh.edgeFaceMap();
  let sharpest = 180;
  for (const [a, b] of mesh.edges()) {
    const faces = ef.get(edgeKey(a, b)) ?? [];
    if (faces.length !== 2) continue;
    const pa = mesh.getPosition(a);
    const pb = mesh.getPosition(b);
    const m = [(pa[0] + pb[0]) / 2, (pa[1] + pb[1]) / 2, (pa[2] + pb[2]) / 2];
    if (Math.hypot(m[0] - p[0], m[1] - p[1], m[2] - p[2]) > radius) continue;
    const n1 = mesh.faceNormal(faces[0]);
    const n2 = mesh.faceNormal(faces[1]);
    const dot = Math.max(-1, Math.min(1, n1[0] * n2[0] + n1[1] * n2[1] + n1[2] * n2[2]));
    sharpest = Math.min(sharpest, 180 - (Math.acos(dot) * 180) / Math.PI);
  }
  return sharpest;
}

/** 回転 + 平行移動。列優先ではなく素直に成分で書く。 */
function rigid(angle: number, axis: [number, number, number], move: [number, number, number]) {
  const L = Math.hypot(...axis);
  const [x, y, z] = [axis[0] / L, axis[1] / L, axis[2] / L];
  const c = Math.cos(angle);
  const s = Math.sin(angle);
  const t = 1 - c;
  const R = [
    [t * x * x + c, t * x * y - s * z, t * x * z + s * y],
    [t * x * y + s * z, t * y * y + c, t * y * z - s * x],
    [t * x * z - s * y, t * y * z + s * x, t * z * z + c],
  ];
  return (p: [number, number, number]): [number, number, number] => [
    R[0][0] * p[0] + R[0][1] * p[1] + R[0][2] * p[2] + move[0],
    R[1][0] * p[0] + R[1][1] * p[1] + R[1][2] * p[2] + move[1],
    R[2][0] * p[0] + R[2][1] * p[1] + R[2][2] * p[2] + move[2],
  ];
}

function transformed(mesh: Mesh, m: (p: [number, number, number]) => [number, number, number]): Mesh {
  const out = mesh.clone();
  for (let v = 0; v < out.vertexCount; v++) {
    const q = m(mesh.getPosition(v));
    out.setPosition(v, q[0], q[1], q[2]);
  }
  return out;
}

describe("V1. 細分割の基本", () => {
  it("立方体をレベル 5 まで細分割すると理論値の頂点数になる", () => {
    // Catmull-Clark: V' = V + E + F, F' = Σ面の角数, E' = 2E + F'
    let v = 8;
    let e = 12;
    let f = 6;
    const expected: number[] = [];
    for (let i = 0; i < 5; i++) {
      const nf = f * 4; // 立方体は四角形だけなので角数の和は 4F
      const nv = v + e + f;
      const ne = 2 * e + nf;
      v = nv;
      e = ne;
      f = nf;
      expected.push(v);
    }
    expect(expected[4]).toBe(6146);

    let m = cube();
    for (let i = 0; i < 5; i++) {
      m = subdivide(m, 1);
      expect(m.vertexCount).toBe(expected[i]);
    }
    expect(m.faceCount).toBe(6144);
  });

  it("デルタが無ければマルチ解像度は素の細分割と一致する", () => {
    const stack = new Multires(cube());
    for (let i = 0; i < 3; i++) stack.divide();
    const plain = subdivide(cube(), 3);
    const top = stack.level(3);
    expect(top.vertexCount).toBe(plain.vertexCount);
    for (let i = 0; i < plain.positions.length; i++) {
      expect(top.positions[i]).toBeCloseTo(plain.positions[i], 10);
    }
  });
});

describe("V2. クリースの伝播", () => {
  it("クリース 10 なら上面の縁は直角のまま、0 なら丸まる", () => {
    const sharp = cube();
    // 上面（y = 0.5）を囲む 4 本にクリース 10
    let count = 0;
    for (const [a, b] of sharp.edges()) {
      if (Math.abs(sharp.getPosition(a)[1] - 0.5) < 1e-6 && Math.abs(sharp.getPosition(b)[1] - 0.5) < 1e-6) {
        sharp.setCrease(a, b, 10);
        count++;
      }
    }
    expect(count).toBe(4);

    // 上面の縁のまんなか。レベル 5 の刻みは 1/32 ≒ 0.031 なので、少し広めに見る
    const midpoint: [number, number, number] = [0, 0.5, 0.5];
    const sharpAngle = creasedDihedralNear(subdivide(sharp, 5), midpoint, 0.08);
    expect(Number.isFinite(sharpAngle)).toBe(true);
    expect(Math.abs(sharpAngle - 90)).toBeLessThan(5);

    const softAngle = sharpestDihedralNear(subdivide(cube(), 5), midpoint, 0.08);
    expect(softAngle).toBeGreaterThan(150);
  });
});

describe("V3. 剛体変換不変性", () => {
  it("ベースを剛体変換すると、スカルプトしたレベル 4 も同じ変換で動く", () => {
    const stack = new Multires(cube());
    for (let i = 0; i < 4; i++) stack.divide();

    // レベル 4 で法線方向にランダムに変位させる
    const level4 = stack.level(4);
    const normals = level4.vertexNormals();
    const rand = rng(20260907);
    const sculpted = level4.clone();
    for (let v = 0; v < sculpted.vertexCount; v++) {
      const amount = (rand() - 0.5) * 0.08;
      sculpted.setPosition(
        v,
        level4.positions[v * 3] + normals[v * 3] * amount,
        level4.positions[v * 3 + 1] + normals[v * 3 + 1] * amount,
        level4.positions[v * 3 + 2] + normals[v * 3 + 2] * amount,
      );
    }
    stack.sculpt(4, sculpted);

    // A = 変換前のレベル 4
    const A = Float32Array.from(stack.level(4).positions);
    // ディテールが実際に乗っていること（乗っていなければこの検証は無意味）
    const plain = subdivide(cube(), 4);
    let maxDetail = 0;
    for (let i = 0; i < A.length; i++) maxDetail = Math.max(maxDetail, Math.abs(A[i] - plain.positions[i]));
    expect(maxDetail).toBeGreaterThan(0.01);

    // ベース全体に剛体変換をかける
    const M = rigid(0.7, [0.3, 1, 0.45], [1.5, -0.8, 2.25]);
    stack.setBase(transformed(cube(), M));

    // B = 変換後のレベル 4。M·A と一致するはず
    const B = stack.level(4).positions;
    let worst = 0;
    for (let v = 0; v < B.length / 3; v++) {
      const want = M([A[v * 3], A[v * 3 + 1], A[v * 3 + 2]]);
      worst = Math.max(
        worst,
        Math.abs(B[v * 3] - want[0]),
        Math.abs(B[v * 3 + 1] - want[1]),
        Math.abs(B[v * 3 + 2] - want[2]),
      );
    }
    expect(worst).toBeLessThan(1e-4);
  });

  it("接空間の基底は剛体変換と一緒に回る", () => {
    const smooth = subdivide(cube(), 2);
    const before = buildFrames(smooth);
    const M = rigid(1.1, [1, 0.2, -0.6], [0, 0, 0]); // 回転だけ
    const after = buildFrames(transformed(smooth, M));
    for (let v = 0; v < smooth.vertexCount; v++) {
      for (let k = 0; k < 3; k++) {
        const o = v * 9 + k * 3;
        const want = M([before[o], before[o + 1], before[o + 2]]);
        expect(after[o]).toBeCloseTo(want[0], 5);
        expect(after[o + 1]).toBeCloseTo(want[1], 5);
        expect(after[o + 2]).toBeCloseTo(want[2], 5);
      }
    }
  });
});
