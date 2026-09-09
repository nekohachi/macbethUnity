/**
 * docs/08 の合格条件 V1〜V6。
 *
 * V3（剛体変換不変性）が中核。接空間デルタが正しく実装されていれば厳密に成立し、
 * 世界座標で差分を持っているなど実装が誤っていれば必ず落ちる。
 * V6（差分更新）は、動いた頂点の周りだけ計算し直したものが
 * 全部計算し直したものと一致することを見る。
 */
import { describe, expect, it } from "vitest";
import { PRIMITIVES, defaultParams } from "../src/core/primitives.js";
import { Mesh, edgeKey } from "../src/core/mesh.js";
import { SubdivPlan, catmullClark, subdivide } from "../src/core/subdivide.js";
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

/** 頂点 v とその周り（radius 以内）を法線方向に押し出した写しを返す。突起を作る。 */
function bumped(mesh: Mesh, center: number, radius: number, height: number): Mesh {
  const out = mesh.clone();
  const normals = mesh.vertexNormals();
  const c = mesh.getPosition(center);
  for (let v = 0; v < mesh.vertexCount; v++) {
    const p = mesh.getPosition(v);
    const d = Math.hypot(p[0] - c[0], p[1] - c[1], p[2] - c[2]);
    if (d > radius) continue;
    // 中心で最大、縁で 0 になる山
    const w = Math.cos((d / radius) * Math.PI * 0.5) ** 2;
    out.setPosition(
      v,
      p[0] + normals[v * 3] * height * w,
      p[1] + normals[v * 3 + 1] * height * w,
      p[2] + normals[v * 3 + 2] * height * w,
    );
  }
  return out;
}

/** v の位置と、その周り radius 以内にある頂点の番号。 */
function near(mesh: Mesh, center: [number, number, number], radius: number): number[] {
  const out: number[] = [];
  for (let v = 0; v < mesh.vertexCount; v++) {
    const p = mesh.getPosition(v);
    if (Math.hypot(p[0] - center[0], p[1] - center[1], p[2] - center[2]) <= radius) out.push(v);
  }
  return out;
}

describe("V4. ローモデルを編集してもディテールが剥がれない", () => {
  it("突起の近くを大きく動かしても、突起の高さ（S からの距離）が変わらない", () => {
    // 「球」はレベル 2 まで細分割した立方体でよい（docs/08 の但し書き）
    const ball = subdivide(cube(), 2);
    const stack = new Multires(ball);
    stack.divide();
    stack.divide();
    const top = stack.levelCount;

    // 局所的な突起をスカルプトする
    const level2 = stack.level(top);
    const center = level2.getPosition(0);
    stack.sculpt(top, bumped(level2, 0, 0.35, 0.12));

    const delta = stack.deltas[top - 1]!;
    const bump = near(stack.smoothLevel(top), center, 0.35);
    expect(bump.length).toBeGreaterThan(10);

    /** 突起の頂点ごとの「デルタのノルム」と「S からの距離」。 */
    const measure = (): { norm: number[]; gap: number[] } => {
      const smooth = stack.smoothLevel(top);
      const mesh = stack.level(top);
      const norm: number[] = [];
      const gap: number[] = [];
      for (const v of bump) {
        norm.push(Math.hypot(delta[v * 3], delta[v * 3 + 1], delta[v * 3 + 2]));
        gap.push(
          Math.hypot(
            mesh.positions[v * 3] - smooth.positions[v * 3],
            mesh.positions[v * 3 + 1] - smooth.positions[v * 3 + 1],
            mesh.positions[v * 3 + 2] - smooth.positions[v * 3 + 2],
          ),
        );
      }
      return { norm, gap };
    };

    const before = measure();
    // 接空間の基底は正規直交なので、デルタのノルムがそのまま S からの距離になる
    for (let i = 0; i < bump.length; i++) expect(before.gap[i]).toBeCloseTo(before.norm[i], 5);
    expect(Math.max(...before.norm)).toBeGreaterThan(0.05);

    // レベル 0 に戻って、突起の近くをモデルの大きさの 30% 動かす
    const size = 2; // 立方体は 1 辺 1、対角の幅がおよそ 2
    const edited = stack.base.clone();
    const movedVerts = near(stack.base, center, 0.6);
    expect(movedVerts.length).toBeGreaterThan(3);
    for (const v of movedVerts) {
      const p = edited.getPosition(v);
      edited.setPosition(v, p[0] + size * 0.3, p[1] + size * 0.3 * 0.5, p[2]);
    }
    stack.setBase(edited);

    // レベル 4 に戻る。突起は表面に張り付いたまま追従しているはず
    const after = measure();
    for (let i = 0; i < bump.length; i++) {
      expect(after.norm[i]).toBeCloseTo(before.norm[i], 5);
      expect(after.gap[i]).toBeCloseTo(before.gap[i], 5);
    }

    // 実際に大きく動いていること（動いていなければこの検証は無意味）
    const moved = stack.level(top);
    let travelled = 0;
    for (const v of bump) travelled = Math.max(travelled, Math.abs(moved.positions[v * 3] - 0));
    expect(travelled).toBeGreaterThan(0.1);
  });
});

describe("V5. 往復しても累積誤差が出ない", () => {
  it("スカルプトの取り込み → レベル 0 → 最大レベル を 10 回繰り返しても座標が動かない", () => {
    const stack = new Multires(cube());
    for (let i = 0; i < 3; i++) stack.divide();
    const top = stack.levelCount;
    stack.sculpt(top, bumped(stack.level(top), 0, 0.5, 0.1));

    const first = Float32Array.from(stack.level(top).positions);
    let worst = 0;
    for (let round = 0; round < 10; round++) {
      // 今の形をそのままスカルプト結果として取り込み直す（デルタを取り直す）
      stack.sculpt(top, stack.level(top).clone());
      // レベル 0 に降りて、そのまま戻す
      stack.setBase(stack.level(0).clone());
      const now = stack.level(top).positions;
      for (let i = 0; i < first.length; i++) worst = Math.max(worst, Math.abs(now[i] - first[i]));
    }
    expect(worst).toBeLessThan(1e-5);
  });
});

describe("V6. 差分更新", () => {
  it("影響する頂点だけ細分割し直しても、全部計算したときと同じ値になる", () => {
    const mesh = subdivide(cube(), 1);
    const plan = new SubdivPlan(mesh);
    const full = new Float32Array(plan.outCount * 3);
    plan.positions(mesh, full);

    const sub = plan.affected([5]);
    // 部分更新になっていること（全部なら差分更新の意味が無い）
    expect(sub.size).toBeGreaterThan(0);
    expect(sub.size).toBeLessThan(plan.outCount);

    const part = new Float32Array(plan.outCount * 3).fill(NaN);
    plan.positions(mesh, part, sub);
    for (const v of sub) {
      // 同じ式を同じ順序で通るので、丸めまで含めて完全に一致する
      expect(part[v * 3]).toBe(full[v * 3]);
      expect(part[v * 3 + 1]).toBe(full[v * 3 + 1]);
      expect(part[v * 3 + 2]).toBe(full[v * 3 + 2]);
    }
  });

  it("レベル 0 の頂点を 1 つ動かしたとき、差分更新が全体再計算と一致する", () => {
    /** レベル 1 と 3 にディテールを持つスタック。 */
    const build = (): Multires => {
      const stack = new Multires(cube());
      for (let i = 0; i < 3; i++) stack.divide();
      stack.sculpt(1, bumped(stack.level(1), 0, 0.9, 0.08));
      stack.sculpt(3, bumped(stack.level(3), 0, 0.4, 0.05));
      return stack;
    };
    /** 頂点 3 をずらした写し。 */
    const edit = (mesh: Mesh): Mesh => {
      const out = mesh.clone();
      const p = out.getPosition(3);
      out.setPosition(3, p[0] + 0.3, p[1] - 0.22, p[2] + 0.14);
      return out;
    };

    const incremental = build();
    const whole = build();
    // 先に控えを作っておく（作っていないと差分更新に入らない）
    const before = Float32Array.from(incremental.level(3).positions);

    incremental.setBase(edit(incremental.base), [3]);
    whole.setBase(edit(whole.base));

    const a = incremental.level(3).positions;
    const b = whole.level(3).positions;
    expect(a.length).toBe(b.length);

    let worst = 0;
    let worstAt = -1;
    for (let i = 0; i < a.length; i++) {
      const d = Math.abs(a[i] - b[i]);
      if (d > worst) {
        worst = d;
        worstAt = i;
      }
    }
    expect(worst, `頂点 ${Math.floor(worstAt / 3)} がずれている`).toBeLessThan(1e-6);

    // 実際に伝わっていること（伝わっていなければ一致しても意味が無い）
    let changed = 0;
    for (let i = 0; i < a.length; i++) if (Math.abs(a[i] - before[i]) > 1e-5) changed++;
    // 立方体はレベル 0 の頂点が 8 つしかないので、1 つ動かすと広く伝わる。
    // 「差分更新が部分計算になっているか」は SubdivPlan.affected の項目で見ている
    expect(changed).toBeGreaterThan(30);
  });

  it("何度も差分更新しても、全体再計算とずれない", () => {
    const make = (): Multires => {
      const stack = new Multires(cube());
      for (let i = 0; i < 3; i++) stack.divide();
      stack.sculpt(3, bumped(stack.level(3), 0, 0.5, 0.07));
      return stack;
    };
    const incremental = make();
    const whole = make();
    incremental.level(3);

    const rand = rng(4242);
    for (let step = 0; step < 8; step++) {
      const v = step % 8;
      const move = [(rand() - 0.5) * 0.3, (rand() - 0.5) * 0.3, (rand() - 0.5) * 0.3];
      const shift = (stack: Multires): Mesh => {
        const out = stack.base.clone();
        const p = out.getPosition(v);
        out.setPosition(v, p[0] + move[0], p[1] + move[1], p[2] + move[2]);
        return out;
      };
      incremental.setBase(shift(incremental), [v]);
      whole.setBase(shift(whole));
    }

    const a = incremental.level(3).positions;
    const b = whole.level(3).positions;
    let worst = 0;
    for (let i = 0; i < a.length; i++) worst = Math.max(worst, Math.abs(a[i] - b[i]));
    expect(worst).toBeLessThan(1e-6);
  });
});

/**
 * `32` の T2。core は wasm を知らないまま、速い細分割を差せること。
 * 差した関数が本当に使われていること、差さないときと結果が変わらないことを見る。
 */
describe("V7. 細分割の差し込み口", () => {
  const cube = (): Mesh => PRIMITIVES.cube.build(defaultParams("cube"));

  it("JS の catmullClark を明示的に差しても、差さないときと完全一致する", () => {
    const plain = new Multires(cube());
    const given = new Multires(cube(), { subdivide: (m) => catmullClark(m) });
    for (let i = 0; i < 3; i++) {
      plain.divide();
      given.divide();
    }
    const a = plain.levels();
    const b = given.levels();
    expect(b.length).toBe(a.length);
    for (let i = 0; i < a.length; i++) {
      expect([...b[i].positions]).toEqual([...a[i].positions]);
      expect([...b[i].faceCorners]).toEqual([...a[i].faceCorners]);
    }
  });

  it("差した関数が本当に使われる（わざとずらすと結果が変わる）", () => {
    let calls = 0;
    const shifted = new Multires(cube(), {
      subdivide: (m) => {
        calls++;
        const out = catmullClark(m);
        out.positions[0] += 5;
        return out;
      },
    });
    shifted.divide();
    const plain = new Multires(cube());
    plain.divide();
    // divide() では組まない。初めて中身を見たときに組む（遅延）
    expect(calls).toBe(0);
    expect(shifted.level(1).positions[0]).toBeCloseTo(plain.level(1).positions[0] + 5, 6);
    expect(calls).toBe(1);
  });

  it("計画は遅延で作られ、あとから差分更新しても全体計算と一致する", () => {
    const move = (m: Mesh): Mesh => {
      const out = m.clone();
      const p = out.getPosition(3);
      out.setPosition(3, p[0] + 0.3, p[1] + 0.2, p[2] - 0.1);
      return out;
    };
    const incremental = new Multires(cube());
    const whole = new Multires(cube());
    for (let i = 0; i < 2; i++) {
      incremental.divide();
      whole.divide();
    }
    // 先に levels() を呼ぶ（この時点では計画を作っていない）
    incremental.levels();
    incremental.setBase(move(incremental.base), [3]);
    whole.setBase(move(whole.base));
    const a = incremental.level(2);
    const b = whole.level(2);
    expect([...a.positions]).toEqual([...b.positions]);
  });

  it("デルタを乗せたあとでも差し込み口が効く", () => {
    const stack = new Multires(cube(), { subdivide: (m) => catmullClark(m) });
    stack.divide();
    stack.divide();
    const top = stack.level(2).clone();
    top.setPosition(0, top.positions[0] + 0.4, top.positions[1], top.positions[2]);
    stack.sculpt(2, top);
    expect(stack.level(2).positions[0]).toBeCloseTo(top.positions[0], 5);
  });
});
