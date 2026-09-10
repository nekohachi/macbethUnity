import { describe, expect, it } from "vitest";
import { Matrix4, Vector3 } from "three";
import { normalFrame, objectFrame, worldFrame } from "../src/app/tools/frame.js";

const near = (v: Vector3, x: number, y: number, z: number, digits = 6) => {
  expect(v.x).toBeCloseTo(x, digits);
  expect(v.y).toBeCloseTo(y, digits);
  expect(v.z).toBeCloseTo(z, digits);
};

/** 右手系か（U × V = N）。マニピュレータの色と回す向きがこれで決まる。 */
const rightHanded = (f: ReturnType<typeof worldFrame>) => {
  const cross = new Vector3().crossVectors(f.axes[0], f.axes[1]);
  near(cross, f.axes[2].x, f.axes[2].y, f.axes[2].z, 5);
};

describe("マニピュレータの軸の向き（`45` の T2）", () => {
  it("ワールドは X Y Z で右手系", () => {
    const f = worldFrame();
    near(f.axes[0], 1, 0, 0);
    near(f.axes[1], 0, 1, 0);
    near(f.axes[2], 0, 0, 1);
    expect(f.labels).toEqual(["X", "Y", "Z"]);
    rightHanded(f);
  });

  it("オブジェクトは回転に付いてくる。スケールが入っていても長さ 1", () => {
    const m = new Matrix4().makeRotationY(Math.PI / 2).premultiply(new Matrix4().makeScale(3, 3, 3));
    const f = objectFrame(m);
    // Y に 90° 回すと、ローカルの +X はワールドの −Z を向く
    near(f.axes[0], 0, 0, -1, 5);
    near(f.axes[1], 0, 1, 0, 5);
    near(f.axes[2], 1, 0, 0, 5);
    for (const a of f.axes) expect(a.length()).toBeCloseTo(1, 6);
    expect(f.labels).toEqual(["X", "Y", "Z"]);
  });

  it("法線は [U, V, N] の並びで、N が 3 本目（青）", () => {
    const f = normalFrame(new Vector3(0, 2, 0), null, worldFrame());
    near(f.axes[2], 0, 1, 0);
    near(f.axes[0], 1, 0, 0); // fallback の X がそのまま U に
    near(f.axes[1], 0, 0, -1); // V = N × U
    expect(f.labels).toEqual(["U", "V", "N"]);
    rightHanded(f);
  });

  it("法線が fallback の X と平行なら、Z から U を取る", () => {
    const f = normalFrame(new Vector3(1, 0, 0), null, worldFrame());
    near(f.axes[2], 1, 0, 0);
    near(f.axes[0], 0, 0, 1);
    rightHanded(f);
  });

  it("U のヒントは法線に直交させてから使う", () => {
    // 法線 +Y に対して斜めのヒント。Y 成分が落ちて +X になる
    const f = normalFrame(new Vector3(0, 1, 0), new Vector3(1, 1, 0), worldFrame());
    near(f.axes[0], 1, 0, 0, 5);
    near(f.axes[2], 0, 1, 0, 5);
    expect(f.axes[0].dot(f.axes[2])).toBeCloseTo(0, 6);
    rightHanded(f);
  });

  it("法線が 0 なら fallback をそのまま返す", () => {
    const base = objectFrame(new Matrix4().makeRotationZ(0.3));
    const f = normalFrame(new Vector3(0, 0, 0), null, base);
    expect(f).toBe(base);
  });

  it("ヒントが法線と平行でも潰れない", () => {
    const f = normalFrame(new Vector3(0, 1, 0), new Vector3(0, 3, 0), worldFrame());
    for (const a of f.axes) expect(a.length()).toBeCloseTo(1, 6);
    expect(f.axes[0].dot(f.axes[2])).toBeCloseTo(0, 6);
    rightHanded(f);
  });
});
