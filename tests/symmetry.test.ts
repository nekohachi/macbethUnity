/**
 * X 対称の対応表と、対称に彫ったときの左右差・継ぎ目（`41` の T1）。
 *
 * 見るのは 3 つ。
 *
 * 1. 対応表が**相互**であること（相手の相手が自分）
 * 2. 押した側を写すと、左右が**浮動小数の丸めまで**一致すること
 * 3. 中心線に**継ぎ目（溝）が出ない**こと。`33` の T4 は「中心線が 2 回動くと筋が出る」と
 *    して 2 回目を避けていたが、逆だった。2 つの筆はどちらも中心線に届くので、
 *    そこだけ 1 回にすると濃さが半分になる
 */
import { describe, expect, it } from "vitest";
import {
  PRIMITIVES,
  applyStroke,
  boundsDiagonal,
  buildBvh,
  buildMirrorMap,
  defaultParams,
  strokeFootprint,
  type Mesh,
  type MirrorMap,
  type StrokeInput,
} from "../src/core/index.js";

function plane(sd = 16): Mesh {
  return PRIMITIVES.plane.build({ ...defaultParams("plane"), sdW: sd, sdH: sd });
}

function sphereMesh(sd = 16): Mesh {
  return PRIMITIVES.sphere.build({ ...defaultParams("sphere"), sdAxis: sd, sdHeight: sd });
}

function mapOf(mesh: Mesh): MirrorMap {
  return buildMirrorMap(mesh.positions, mesh.vertexCount, boundsDiagonal(mesh.positions) * 1e-4);
}

/** 1 打ち当てる。 */
function stroke(mesh: Mesh, input: StrokeInput): void {
  const tris = mesh.triangulate();
  const bvh = buildBvh(mesh.positions, { tri: tris.tri });
  const fp = strokeFootprint(mesh, bvh, tris, input.point, input.radius);
  applyStroke(mesh, fp, tris, input);
}

/** 対称に 1 打ち。`copy` が真なら、押した側を相手へ写す（`stroke.ts` の `mirrorPending`）。 */
function stampSymmetric(mesh: Mesh, input: StrokeInput, map: MirrorMap | null, copy: boolean): void {
  const point = input.point;
  stroke(mesh, input);
  stroke(mesh, { ...input, point: [-point[0], point[1], point[2]] });
  if (!copy || !map) return;
  const primary = point[0] < 0 ? -1 : 1;
  const p = mesh.positions;
  for (let v = 0; v < mesh.vertexCount; v++) {
    const m = map.mirror[v];
    if (m < 0) continue;
    if (m === v) {
      p[v * 3] = 0;
      continue;
    }
    if (map.side[v] !== primary) continue;
    p[m * 3] = -p[v * 3];
    p[m * 3 + 1] = p[v * 3 + 1];
    p[m * 3 + 2] = p[v * 3 + 2];
  }
}

/** 左右のずれの最大。0 なら厳密に対称。 */
function asymmetry(mesh: Mesh, map: MirrorMap): number {
  const p = mesh.positions;
  let worst = 0;
  for (let v = 0; v < mesh.vertexCount; v++) {
    const m = map.mirror[v];
    if (m < 0) continue;
    worst = Math.max(
      worst,
      Math.abs(p[v * 3] + p[m * 3]),
      Math.abs(p[v * 3 + 1] - p[m * 3 + 1]),
      Math.abs(p[v * 3 + 2] - p[m * 3 + 2]),
    );
  }
  return worst;
}

const base: Omit<StrokeInput, "kind" | "point"> = { radius: 0.4, strength: 1, invert: false };

describe("鏡映の対応表（`41` の T1）", () => {
  it("球は全部の頂点に相手が居て、相手の相手が自分", () => {
    const m = sphereMesh(16);
    const map = mapOf(m);
    expect(map.paired).toBe(m.vertexCount);
    for (let v = 0; v < m.vertexCount; v++) {
      const partner = map.mirror[v];
      expect(partner).toBeGreaterThanOrEqual(0);
      expect(map.mirror[partner]).toBe(v);
    }
  });

  it("中心線の頂点は自分自身が相手", () => {
    const m = plane(8);
    const map = mapOf(m);
    let center = 0;
    for (let v = 0; v < m.vertexCount; v++) {
      if (Math.abs(m.positions[v * 3]) > 1e-6) continue;
      expect(map.mirror[v]).toBe(v);
      expect(map.side[v]).toBe(0);
      center++;
    }
    expect(center).toBeGreaterThan(0);
  });

  it("片側だけ動かした（左右非対称な）メッシュは、その頂点が対にならない", () => {
    const m = plane(8);
    // 右側の頂点を 1 つ、z 方向へずらす。相手が見つからなくなる
    let moved = -1;
    for (let v = 0; v < m.vertexCount; v++) {
      if (m.positions[v * 3] > 0.3) {
        moved = v;
        break;
      }
    }
    expect(moved).toBeGreaterThanOrEqual(0);
    m.positions[moved * 3 + 2] += 0.3;
    const map = mapOf(m);
    expect(map.mirror[moved]).toBe(-1);
    // その相手だったほうも、相互でなくなるので外れる
    expect(map.paired).toBeLessThan(m.vertexCount);
  });

  it("控えを使い回しても（続けて 2 回作っても）同じ表になる", () => {
    const a = mapOf(sphereMesh(12));
    const b = mapOf(sphereMesh(12));
    expect(Array.from(a.mirror)).toEqual(Array.from(b.mirror));
  });
});

describe("対称に彫ったときの左右差（`41` の T1）", () => {
  it("押した側を写すと、左右が丸めの幅まで一致する", () => {
    const at: [number, number, number] = [0.3, 0.9, 0.2];
    const withCopy = sphereMesh(24);
    const withoutCopy = sphereMesh(24);
    const map = mapOf(sphereMesh(24));

    stampSymmetric(withCopy, { ...base, kind: "standard", point: at, radius: 0.5 }, map, true);
    stampSymmetric(withoutCopy, { ...base, kind: "standard", point: at, radius: 0.5 }, map, false);

    const after = asymmetry(withCopy, map);
    const before = asymmetry(withoutCopy, map);
    expect(after).toBeLessThan(1e-6);
    // 写さないと、2 回目が 1 回目の動かしたあとの面から法線を取るぶんだけずれる
    expect(before).toBeGreaterThan(after);
  });

  it("ムーブでも、マスクでも同じように写せる（対応表は種類に依らない）", () => {
    const at: [number, number, number] = [0.25, 0, 0.1];
    const m = plane(20);
    const map = mapOf(plane(20));
    stampSymmetric(m, { ...base, kind: "move", point: at, move: [0, 0.2, 0] }, map, true);
    expect(asymmetry(m, map)).toBeLessThan(1e-6);
  });
});

describe("中心線の継ぎ目（`41` の T1）", () => {
  /** z がいちばん 0 に近い列を、x の順に並べて返す。 */
  function profile(mesh: Mesh): Array<{ x: number; y: number }> {
    let bestZ = Infinity;
    for (let v = 0; v < mesh.vertexCount; v++) bestZ = Math.min(bestZ, Math.abs(mesh.positions[v * 3 + 2]));
    const out: Array<{ x: number; y: number }> = [];
    for (let v = 0; v < mesh.vertexCount; v++) {
      if (Math.abs(Math.abs(mesh.positions[v * 3 + 2]) - bestZ) > 1e-6) continue;
      out.push({ x: mesh.positions[v * 3], y: mesh.positions[v * 3 + 1] });
    }
    out.sort((a, b) => a.x - b.x);
    return out;
  }

  /** 中心線（x にいちばん近い列）の高さ。 */
  function centerHeight(mesh: Mesh): number {
    const line = profile(mesh);
    let best = line[0];
    for (const q of line) if (Math.abs(q.x) < Math.abs(best.x)) best = q;
    return best.y;
  }

  it("中心線の真上に当てると、2 回ぶんがそのまま乗る（半分にならない）", () => {
    const at: [number, number, number] = [0, 0, 0];
    const sym = plane(20);
    const twice = plane(20);
    stampSymmetric(sym, { ...base, kind: "standard", point: at }, mapOf(plane(20)), true);
    stroke(twice, { ...base, kind: "standard", point: at });
    stroke(twice, { ...base, kind: "standard", point: at });
    for (let i = 0; i < sym.positions.length; i++) {
      expect(sym.positions[i]).toBeCloseTo(twice.positions[i], 6);
    }
  });

  it("中心線をまたぐと、断面が x = 0 で折れない", () => {
    const at: [number, number, number] = [0.2, 0, 0];
    const m = plane(24);
    stampSymmetric(m, { ...base, kind: "standard", point: at }, mapOf(plane(24)), true);
    const line = profile(m);
    // 中心の点が、両隣の平均から大きく外れないこと。溝（継ぎ目）が出ていると落ち込む
    let mid = 0;
    for (let i = 0; i < line.length; i++) if (Math.abs(line[i].x) < Math.abs(line[mid].x)) mid = i;
    expect(mid).toBeGreaterThan(0);
    const lo = line[mid - 1].y;
    const hi = line[mid + 1].y;
    const step = Math.abs(line[mid + 2].y - hi);
    expect(Math.abs(line[mid].y - (lo + hi) / 2)).toBeLessThan(step + 1e-9);
  });

  it("中心線を避けると（前のやり方）、そこだけ落ち込む", () => {
    // 直した理由を残すためのテスト。`excludeNearX` の口そのものは core に残っている
    const at: [number, number, number] = [0.2, 0, 0];
    const guarded = plane(24);
    stroke(guarded, { ...base, kind: "standard", point: at });
    stroke(guarded, { ...base, kind: "standard", point: [-at[0], at[1], at[2]], excludeNearX: base.radius * 0.01 });
    const now = plane(24);
    stampSymmetric(now, { ...base, kind: "standard", point: at }, mapOf(plane(24)), true);
    // 中心線が、いまのやり方よりはっきり低い（= そこだけ 1 回ぶんしか乗っていない）
    expect(centerHeight(guarded)).toBeLessThan(centerHeight(now) * 0.9);
  });
});
