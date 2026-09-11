/**
 * 表示に使う材質。色は Maya に合わせてある。
 *   オブジェクト選択 = グリーン、コンポーネント選択 = オレンジ、未選択の頂点 = パープル
 */
import {
  type CanvasTexture,
  DoubleSide,
  FrontSide,
  LineBasicMaterial,
  MeshBasicMaterial,
  MeshPhongMaterial,
  PointsMaterial,
} from "three";
import { checkerTexture, type CheckerPattern } from "./checker.js";

export const AXIS_COLORS = [0xd8524f, 0x6cc94a, 0x4f8fe0];

/**
 * マスク表示の材質（`34` の T3）。**`MAT.surf` の複製**に頂点色を立てたもの。
 *
 * 頂点色は素の色に**掛かる**ので、マスク 0 なら見た目は素のまま、
 * 1 なら 0.35 倍で暗くなる。陰影は残るので形が読める（`heatMaterial` の
 * ように光を無視すると、マスクしている間だけ形が見えなくなる）。
 */
export function maskMaterial(): MeshPhongMaterial {
  const m = MAT.surf.clone();
  m.vertexColors = true;
  return m;
}

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

/**
 * 焼いた絵を貼って見るための材質（`49` の T2）。
 *
 * `MAT.surf` の複製に `normalMap` と `aoMap` を足せる形にしただけ。
 * 地の色は少し明るくしてある（AO が掛かると暗くなるので、素の灰色のままだと沈む）。
 */
export function materialPreview(): MeshPhongMaterial {
  const m = MAT.surf.clone();
  m.color.setHex(0xb4bcc4);
  m.shininess = 18;
  return m;
}

export const MAT = {
  surf: new MeshPhongMaterial({ color: 0x9aa4ad, specular: 0x2a3138, shininess: 24, side: DoubleSide }),
  /**
   * ハイを重ねて見せるときの面（`43` の T4）。薄く、深度を書かない。
   * 深度を書くとローのワイヤーが隠れて「どこを直しているか」が見えなくなる。
   */
  ghost: new MeshPhongMaterial({
    color: 0x6ea8d8,
    specular: 0x223044,
    shininess: 16,
    side: FrontSide,
    transparent: true,
    opacity: 0.25,
    depthWrite: false,
  }),
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
  /** 筆の円（`33` の T3）。面に埋もれないよう深度を見ない。 */
  brush: new LineBasicMaterial({ color: 0x7fd4ff, depthTest: false, transparent: true, opacity: 0.9 }),
};
