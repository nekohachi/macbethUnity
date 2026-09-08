/**
 * 表示に使う材質。色は Maya に合わせてある。
 *   オブジェクト選択 = グリーン、コンポーネント選択 = オレンジ、未選択の頂点 = パープル
 */
import {
  CanvasTexture,
  DoubleSide,
  LineBasicMaterial,
  MeshBasicMaterial,
  MeshPhongMaterial,
  PointsMaterial,
  RepeatWrapping,
} from "three";

export const AXIS_COLORS = [0xd8524f, 0x6cc94a, 0x4f8fe0];

/**
 * UV の確認用チェッカー。UV セットをそのまま貼るので、歪みと継ぎ目が目で分かる。
 * テクスチャは初めて要るときに作る（UV を見ない人には作らない）。
 */
let checker: CanvasTexture | null = null;
export function checkerMaterial(): MeshPhongMaterial {
  if (!checker) {
    const size = 512;
    const cells = 16;
    const canvas = document.createElement("canvas");
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext("2d")!;
    const step = size / cells;
    for (let y = 0; y < cells; y++) {
      for (let x = 0; x < cells; x++) {
        ctx.fillStyle = (x + y) % 2 === 0 ? "#d7dde3" : "#7d8891";
        ctx.fillRect(x * step, y * step, step, step);
      }
    }
    // 向きが分かるように、左下の升だけ色を変える
    ctx.fillStyle = "#e0723c";
    ctx.fillRect(0, size - step, step, step);
    checker = new CanvasTexture(canvas);
    checker.wrapS = RepeatWrapping;
    checker.wrapT = RepeatWrapping;
  }
  return new MeshPhongMaterial({ map: checker, specular: 0x1a2026, shininess: 14, side: DoubleSide });
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
  cutLine: new LineBasicMaterial({ color: 0xffe14a }),
  cutPt: new PointsMaterial({ color: 0xffe14a, size: 9, sizeAttenuation: false }),
  pivot: new LineBasicMaterial({ color: 0xf2d97a }),
};
