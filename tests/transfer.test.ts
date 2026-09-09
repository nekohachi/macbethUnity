/**
 * アトリビュートの転送（`24` の T6。Maya の Transfer Attributes）。
 *
 * 見るのは 4 つ。番号で写せること、いちばん近い点で UV が写ること、
 * 位置が元の形に吸い付くこと、合わない入力では何もしないこと。
 */
import { describe, expect, it } from "vitest";
import { PRIMITIVES, defaultParams } from "../src/core/primitives.js";
import { identityTransform, type Transform } from "../src/core/document.js";
import { UV_SET } from "../src/core/uv/recipe.js";
import { transferAttributes } from "../src/core/transfer.js";
import type { Mesh } from "../src/core/mesh.js";

const build = (kind: string, params: Record<string, number> = {}): Mesh =>
  PRIMITIVES[kind].build({ ...defaultParams(kind), ...params });

const side = (mesh: Mesh, transform: Transform = identityTransform()) => ({ mesh, transform });

describe("アトリビュートの転送", () => {
  it("コンポーネント空間は番号でそのまま写す", () => {
    const source = build("cube");
    const target = build("cube");
    const su = source.uvSets.get(UV_SET)!;
    for (let i = 0; i < su.length; i++) su[i] *= 0.5;
    const before = Float32Array.from(target.positions);

    const r = transferAttributes(side(source), side(target), {
      positions: false,
      uvs: true,
      space: "component",
    });
    expect(r).not.toBeNull();
    expect(r!.uv).toBeDefined();
    for (let i = 0; i < su.length; i++) expect(r!.uv![i]).toBeCloseTo(su[i], 6);
    // 位置は頼んでいないので返らない（先も変わらない）
    expect(r!.positions).toBeUndefined();
    expect([...target.positions]).toEqual([...before]);
  });

  it("ワールド空間でいちばん近い点から UV を取る", () => {
    // 同じ大きさの平面。分割だけ違う
    const source = build("plane", { sdWidth: 2, sdHeight: 2 });
    const target = build("plane", { sdWidth: 4, sdHeight: 4 });
    const r = transferAttributes(side(source), side(target), {
      positions: false,
      uvs: true,
      space: "world",
    })!;
    expect(r).not.toBeNull();
    expect(r.matched).toBe(target.vertexCount);

    // 平面の UV は (x, z) から決まる。同じ関係が先でも成り立つはず
    const su = source.uvSets.get(UV_SET)!;
    // 元の (x, z) → UV の対応を 1 つ拾って、係数を出す
    const c0 = source.faceCorners[0];
    const p0 = source.getPosition(c0);
    const uv0 = [su[0], su[1]];
    const c1 = source.faceCorners[1];
    const p1 = source.getPosition(c1);
    const uv1 = [su[2], su[3]];
    // 少なくとも 1 軸は動いているはず
    expect(Math.abs(p1[0] - p0[0]) + Math.abs(p1[2] - p0[2])).toBeGreaterThan(1e-6);

    for (let f = 0; f < target.faceCount; f++) {
      const start = target.faceOffsets[f];
      for (let i = 0; i < target.faceSize(f); i++) {
        const v = target.faceCorners[start + i];
        const p = target.getPosition(v);
        // 元の平面上の点なので、UV は (x, z) の線形。0〜1 に収まる
        const u = r.uv![(start + i) * 2];
        const vv = r.uv![(start + i) * 2 + 1];
        expect(u).toBeGreaterThanOrEqual(-1e-3);
        expect(u).toBeLessThanOrEqual(1 + 1e-3);
        expect(vv).toBeGreaterThanOrEqual(-1e-3);
        expect(vv).toBeLessThanOrEqual(1 + 1e-3);
        // 端の頂点は端の UV になる
        if (Math.abs(p[0] - p0[0]) < 1e-6 && Math.abs(p[2] - p0[2]) < 1e-6) {
          expect(u).toBeCloseTo(uv0[0], 3);
          expect(vv).toBeCloseTo(uv0[1], 3);
        }
        if (Math.abs(p[0] - p1[0]) < 1e-6 && Math.abs(p[2] - p1[2]) < 1e-6) {
          expect(u).toBeCloseTo(uv1[0], 3);
          expect(vv).toBeCloseTo(uv1[1], 3);
        }
      }
    }
  });

  it("ワールド空間の位置は元の形に吸い付く", () => {
    const source = build("sphere");
    const target = build("sphere");
    // 先の頂点を法線（= 原点からの向き）に沿って動かして、球から外す
    for (let v = 0; v < target.vertexCount; v++) {
      const p = target.getPosition(v);
      const len = Math.hypot(p[0], p[1], p[2]) || 1;
      const k = 1 + (v % 2 === 0 ? 0.1 : -0.1);
      target.positions[v * 3] = (p[0] / len) * len * k;
      target.positions[v * 3 + 1] = (p[1] / len) * len * k;
      target.positions[v * 3 + 2] = (p[2] / len) * len * k;
    }
    const radius = Math.hypot(...source.getPosition(0));

    const r = transferAttributes(side(source), side(target), {
      positions: true,
      uvs: false,
      space: "world",
    })!;
    expect(r.positions).toBeDefined();
    expect(r.uv).toBeUndefined();
    for (let v = 0; v < target.vertexCount; v++) {
      const d = Math.hypot(r.positions![v * 3], r.positions![v * 3 + 1], r.positions![v * 3 + 2]);
      // 元の球の面に乗る。面は平らなので、半径よりわずかに内側までは許す
      expect(d).toBeLessThanOrEqual(radius + 1e-3);
      expect(d).toBeGreaterThan(radius * 0.97);
    }
  });

  it("トポロジが違えばコンポーネント空間では何もしない", () => {
    const source = build("cube");
    const target = build("sphere");
    expect(
      transferAttributes(side(source), side(target), { positions: true, uvs: true, space: "component" }),
    ).toBeNull();
    // ワールドなら写せる
    expect(
      transferAttributes(side(source), side(target), { positions: false, uvs: true, space: "world" }),
    ).not.toBeNull();
  });

  it("トランスフォームを跨いでも位置が合う（ワールド）", () => {
    const source = build("cube");
    const target = build("cube");
    const moved: Transform = { ...identityTransform(), position: [3, 0, 0] };
    // 元を右へ 3 動かして、先はそのまま。ワールドで写すと先の形は変わらない
    const r = transferAttributes(side(source, moved), side(target, moved), {
      positions: true,
      uvs: false,
      space: "world",
    })!;
    for (let i = 0; i < target.positions.length; i++) {
      expect(r.positions![i]).toBeCloseTo(target.positions[i], 3);
    }
  });

  it("細かいメッシュでも現実的な時間で終わる", () => {
    const source = build("sphere", { sdAxis: 48, sdHeight: 32 });
    const target = build("sphere", { sdAxis: 40, sdHeight: 28 });
    const t0 = performance.now();
    const r = transferAttributes(side(source), side(target), {
      positions: true,
      uvs: true,
      space: "world",
    })!;
    const ms = performance.now() - t0;
    expect(r.matched).toBe(target.vertexCount);
    // 3000 頂点 × 3000 三角形。総当たりだと数秒かかる
    expect(ms).toBeLessThan(1500);
  });
});
