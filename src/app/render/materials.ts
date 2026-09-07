/**
 * 表示に使う材質。色は Maya に合わせてある。
 *   オブジェクト選択 = グリーン、コンポーネント選択 = オレンジ、未選択の頂点 = パープル
 */
import {
  DoubleSide,
  LineBasicMaterial,
  MeshBasicMaterial,
  MeshPhongMaterial,
  PointsMaterial,
} from "three";

export const AXIS_COLORS = [0xd8524f, 0x6cc94a, 0x4f8fe0];

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
  cutLine: new LineBasicMaterial({ color: 0xffe14a }),
  cutPt: new PointsMaterial({ color: 0xffe14a, size: 9, sizeAttenuation: false }),
  pivot: new LineBasicMaterial({ color: 0xf2d97a }),
};
