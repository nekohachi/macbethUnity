/**
 * 表示に使う材質。色は Maya に合わせてある。
 *   オブジェクト選択 = グリーン、コンポーネント選択 = オレンジ、未選択の頂点 = パープル
 */
import {
  type CanvasTexture,
  DoubleSide,
  LineBasicMaterial,
  MeshBasicMaterial,
  MeshPhongMaterial,
  PointsMaterial,
} from "three";
import { checkerTexture, type CheckerPattern } from "./checker.js";

export const AXIS_COLORS = [0xd8524f, 0x6cc94a, 0x4f8fe0];

/**
 * 歪みのヒートマップ（`23` の T2）。面ごとの色を頂点色で持つので、
 * ライティングは通さない（色をそのまま見せたいため）。
 */
export function heatMaterial(): MeshBasicMaterial {
  return new MeshBasicMaterial({ vertexColors: true, side: DoubleSide });
}

/**
 * UV の確認用チェッカー。UV セットをそのまま貼るので、歪みと継ぎ目が目で分かる。
 * 模様は 2D の下地と同じ 1 つの関数から作る（`23` の T3）。
 * テクスチャは設定ごとに 1 枚だけ持ち、変わったら捨てる。
 */
let checker: { key: string; texture: CanvasTexture } | null = null;
export function checkerMaterial(cells: number, pattern: CheckerPattern): MeshPhongMaterial {
  const key = `${cells}/${pattern}`;
  if (checker && checker.key !== key) {
    checker.texture.dispose();
    checker = null;
  }
  if (!checker) checker = { key, texture: checkerTexture({ cells, pattern, tone: "light", mark: true }) };
  return new MeshPhongMaterial({
    map: checker.texture,
    specular: 0x1a2026,
    shininess: 14,
    side: DoubleSide,
  });
}

export const MAT = {
  surf: new MeshPhongMaterial({ color: 0x9aa4ad, specular: 0x2a3138, shininess: 24, side: DoubleSide }),
  wire: new LineBasicMaterial({ color: 0x141a1f, transparent: true, opacity: 0.9 }),
  /** オブジェクトモードで選択中。 */
  wireSel: new LineBasicMaterial({ color: 0x4dff4d }),
  /** コンポーネントモード中のワイヤ。 */
  wireComp: new LineBasicMaterial({ color: 0x46525d }),
  vert: new PointsMaterial({ color: 0x8b5fb0, size: 6, sizeAttenuation: false }),
  vertSel: new PointsMaterial({ color: 0xff9e00, size: 11, sizeAttenuation: false }),
  edgeSel: new LineBasicMaterial({ color: 0xff9e00 }),
  faceSel: new MeshBasicMaterial({
    color: 0xff9e00,
    transparent: true,
    opacity: 0.5,
    side: DoubleSide,
    depthWrite: false,
  }),
  softPt: new PointsMaterial({ color: 0xd06a2a, size: 7, sizeAttenuation: false }),
  /** UV の切れ目（テクスチャボーダー）。Maya と同じで 3D にも出す。 */
  seam: new LineBasicMaterial({ color: 0xff6b4a }),
  cutLine: new LineBasicMaterial({ color: 0xffe14a }),
  cutPt: new PointsMaterial({ color: 0xffe14a, size: 9, sizeAttenuation: false }),
  pivot: new LineBasicMaterial({ color: 0xf2d97a }),
};
