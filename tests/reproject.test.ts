/**
 * 再投影（`42` の T2）。捨てる前のハイを、割り直したローの上へ焼き戻す。
 *
 * 見るのは 2 つ。**彫った形が戻ること**と、**遠すぎる所へ吸い付かないこと**。
 */
import { describe, expect, it } from "vitest";
import {
  PRIMITIVES,
  averageEdge,
  buildBvh,
  catmullClark,
  defaultParams,
  projectOnto,
  type Mesh,
} from "../src/core/index.js";

function sphere(sd = 12): Mesh {
  return PRIMITIVES.sphere.build({ ...defaultParams("sphere"), sdAxis: sd, sdHeight: Math.max(4, sd / 2) });
}

/** そのメッシュへ寄せる道具一式。 */
function onto(source: Mesh) {
  const tris = source.triangulate();
  const bvh = buildBvh(source.positions, { tri: tris.tri });
  const edge = averageEdge(source.positions, { tri: tris.tri });
  return { tris: { tri: tris.tri }, bvh, edge };
}

/** `target` の頂点から `source` の面までの、平均の距離。 */
function meanGap(target: Mesh, source: Mesh): number {
  const { tris, bvh, edge } = onto(source);
  const probe = target.clone();
  projectOnto(probe, source.positions, tris, bvh, edge * 2, edge * 64);
  let sum = 0;
  for (let v = 0; v < target.vertexCount; v++) {
    sum += Math.hypot(
      target.positions[v * 3] - probe.positions[v * 3],
      target.positions[v * 3 + 1] - probe.positions[v * 3 + 1],
      target.positions[v * 3 + 2] - probe.positions[v * 3 + 2],
    );
  }
  return sum / target.vertexCount;
}

describe("再投影（`42` の T2）", () => {
  it("彫った形が戻る（割り直した面が控えに寄る）", () => {
    // 控え: 細分割した球を、片側だけ膨らませたもの
    const cache = catmullClark(sphere(12));
    for (let v = 0; v < cache.vertexCount; v++) {
      const x = cache.positions[v * 3];
      if (x <= 0) continue;
      cache.positions[v * 3] += x * 0.4;
    }
    // 割り直した面: 素の細分割（控えとはずれている）
    const fresh = catmullClark(sphere(12));
    const before = meanGap(fresh, cache);
    expect(before).toBeGreaterThan(0);

    const { tris, bvh, edge } = onto(cache);
    const out = projectOnto(fresh, cache.positions, tris, bvh, edge * 2, edge * 32);
    // 膨らませた側の頂点は動く（反対側はもともと面の上なので動かない）
    expect(out.moved).toBeGreaterThan(fresh.vertexCount * 0.3);
    expect(out.missed).toBe(0);
    // 寄せたあとは控えの面の上（距離がほぼ 0）
    expect(meanGap(fresh, cache)).toBeLessThan(before * 0.02);
  });

  it("遠すぎる所へは吸い付かない", () => {
    const cache = sphere(8);
    const far = sphere(8);
    // 控えから 100 離す。どの面からも遠い
    for (let v = 0; v < far.vertexCount; v++) far.positions[v * 3] += 100;
    const kept = far.positions.slice();
    const { tris, bvh, edge } = onto(cache);
    const out = projectOnto(far, cache.positions, tris, bvh, edge * 2, edge * 8);
    expect(out.missed).toBe(far.vertexCount);
    expect(out.moved).toBe(0);
    expect(Array.from(far.positions)).toEqual(Array.from(kept));
  });

  it("もともと面の上にある頂点は動かない", () => {
    const cache = sphere(10);
    const same = cache.clone();
    const { tris, bvh, edge } = onto(cache);
    const out = projectOnto(same, cache.positions, tris, bvh, edge * 2, edge * 32);
    expect(out.worst).toBeLessThan(1e-5);
    for (let i = 0; i < same.positions.length; i++) {
      expect(same.positions[i]).toBeCloseTo(cache.positions[i], 5);
    }
  });
});
