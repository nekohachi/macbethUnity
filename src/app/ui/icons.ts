/**
 * アイコン。24×24 の SVG フラグメント。
 * プロトタイプから移した。線は currentColor で描くので、色は使う側が決める。
 */

export const ICONS = {
  select: "<path d=\"m5 3 6 16 2.4-6.2L19.6 10z\"/>",
  move: "<path d=\"M12 3v18M3 12h18M12 3l-2.6 2.6M12 3l2.6 2.6M12 21l-2.6-2.6M12 21l2.6-2.6M3 12l2.6-2.6M3 12l2.6 2.6M21 12l-2.6-2.6M21 12l-2.6 2.6\"/>",
  rotate: "<path d=\"M20.5 12a8.5 8.5 0 1 1-2.9-6.4\"/><path d=\"M20.5 3.6v5h-5\"/>",
  scale: "<path d=\"M5 19 18 6\"/><path d=\"M12.5 6H18v5.5\"/><rect x=\"3.2\" y=\"15.2\" width=\"5.6\" height=\"5.6\" rx=\".8\"/>",
  multicut: "<circle cx=\"5.5\" cy=\"5.5\" r=\"2.3\"/><circle cx=\"5.5\" cy=\"18.5\" r=\"2.3\"/><path d=\"M7.4 6.8 20 18M7.4 17.2 20 6\"/>",
  extrude: "<path d=\"M4.5 13.5h8v7h-8z\"/><path d=\"m4.5 13.5 4-4h8v7M12.5 13.5l4-4\"/><path d=\"M20 3v5m0-5-1.8 1.8M20 3l1.8 1.8\"/>",
  prim: "<path d=\"m12 2.6 8.6 4.8v9.2L12 21.4l-8.6-4.8V7.4z\"/><path d=\"M12 12.2 20.6 7.4M12 12.2v9.2M12 12.2 3.4 7.4\"/>",
  camera: "<path d=\"M3.4 8.4h3.2l1.6-2.4h7.6l1.6 2.4h3.2v9.8a1 1 0 0 1-1 1H4.4a1 1 0 0 1-1-1z\"/><circle cx=\"12\" cy=\"13\" r=\"3.4\"/>",
  shade: "<circle cx=\"12\" cy=\"12\" r=\"8.8\"/><path d=\"M12 3.2a8.8 8.8 0 0 1 0 17.6z\" fill=\"currentColor\" fill-opacity=\".5\"/>",
  vObj: "<path d=\"m12 3 8 4.5v9L12 21l-8-4.5v-9z\"/>",
  vVert: "<rect x=\"6\" y=\"6\" width=\"12\" height=\"12\"/><circle cx=\"6\" cy=\"6\" r=\"2\" fill=\"currentColor\"/><circle cx=\"18\" cy=\"6\" r=\"2\" fill=\"currentColor\"/><circle cx=\"6\" cy=\"18\" r=\"2\" fill=\"currentColor\"/><circle cx=\"18\" cy=\"18\" r=\"2\" fill=\"currentColor\"/>",
  vEdge: "<rect x=\"6\" y=\"6\" width=\"12\" height=\"12\"/><path d=\"M6 6h12\" stroke-width=\"3.4\"/>",
  vFace: "<rect x=\"6\" y=\"6\" width=\"12\" height=\"12\" fill=\"currentColor\" fill-opacity=\".45\"/>",
  vVertFace: "<rect x=\"6\" y=\"6\" width=\"12\" height=\"12\" fill=\"currentColor\" fill-opacity=\".2\"/><circle cx=\"8.6\" cy=\"8.6\" r=\"2.1\" fill=\"currentColor\"/>",
  vMulti: "<rect x=\"6\" y=\"6\" width=\"12\" height=\"12\"/><circle cx=\"6\" cy=\"6\" r=\"1.9\" fill=\"currentColor\"/><path d=\"M6 18h12\" stroke-width=\"3\"/>",
  vUV: "<rect x=\"4\" y=\"4\" width=\"16\" height=\"16\" rx=\"1\"/><path d=\"M4 12h16M12 4v16\" stroke-dasharray=\"2.4 2\"/>",
  wire: "<rect x=\"4\" y=\"4\" width=\"16\" height=\"16\"/><path d=\"M4 9.3h16M4 14.6h16M9.3 4v16M14.6 4v16\"/>",
  shaded: "<rect x=\"4\" y=\"4\" width=\"16\" height=\"16\" rx=\"1\" fill=\"currentColor\" fill-opacity=\".5\"/>",
  shadedWire: "<rect x=\"4\" y=\"4\" width=\"16\" height=\"16\" rx=\"1\" fill=\"currentColor\" fill-opacity=\".3\"/><path d=\"M4 12h16M12 4v16\"/>",
  smooth: "<circle cx=\"12\" cy=\"12\" r=\"8.6\" fill=\"currentColor\" fill-opacity=\".5\"/><path d=\"M8 15.4a6 6 0 0 1 5-6.6\"/>",
  sym: "<path d=\"M12 3v18\" stroke-dasharray=\"2.4 2.4\"/><path d=\"M9.4 7 4.5 12l4.9 5zM14.6 7l4.9 5-4.9 5z\"/>",
  xform: "<path d=\"M12 3v18M3 12h18\"/><circle cx=\"12\" cy=\"12\" r=\"6.5\"/><rect x=\"16.6\" y=\"16.6\" width=\"4.2\" height=\"4.2\"/><path d=\"M12 3l-2 2M12 3l2 2M3 12l2-2M3 12l2 2\"/>",
  // 磁石。スナップ
  snap: "<path d=\"M6 20V10a6 6 0 0 1 12 0v10\"/><path d=\"M6 15h4v5H6zM14 15h4v5h-4z\"/>",
  // 十字と中心。マニピュレータ / ピボット
  pivot: "<circle cx=\"12\" cy=\"12\" r=\"2.2\" fill=\"currentColor\"/><path d=\"M12 2.6v5.6M12 15.8v5.6M2.6 12h5.6M15.8 12h5.6\"/><circle cx=\"12\" cy=\"12\" r=\"6.6\" stroke-dasharray=\"2.2 2.4\"/>",
  file: "<path d=\"M6 3h8l5 5v13H6z\"/><path d=\"M14 3v5h5\"/>",
  rename: "<path d=\"M4 20h16\"/><path d=\"M15.4 4.6 19 8.2 8.6 18.6 4.4 19.6l1-4.2z\"/>",
  eye: "<path d=\"M2.5 12S6 5.8 12 5.8 21.5 12 21.5 12 18 18.2 12 18.2 2.5 12 2.5 12z\"/><circle cx=\"12\" cy=\"12\" r=\"2.8\"/>",
  eyeOff:
    "<path d=\"M4.6 6.4C3.1 8 2.5 12 2.5 12S6 18.2 12 18.2c1.5 0 2.8-.4 3.9-.9\"/><path d=\"M9.6 6.1c.8-.2 1.6-.3 2.4-.3 6 0 9.5 6.2 9.5 6.2s-.8 1.5-2.3 3\"/><path d=\"M3.5 3.5l17 17\"/>",
  lock: "<rect x=\"5\" y=\"10.5\" width=\"14\" height=\"9.5\" rx=\"1.2\"/><path d=\"M8.2 10.5V7.8a3.8 3.8 0 0 1 7.6 0v2.7\"/>",
  lockOpen: "<rect x=\"5\" y=\"10.5\" width=\"14\" height=\"9.5\" rx=\"1.2\"/><path d=\"M8.2 10.5V7.8a3.8 3.8 0 0 1 7.4-.9\"/>",
  layers: "<path d=\"M12 3.4 21 8l-9 4.6L3 8z\"/><path d=\"M3 12.6 12 17.2l9-4.6\"/><path d=\"M3 16.8 12 21.4l9-4.6\"/>",
  dup: "<rect x=\"3.6\" y=\"3.6\" width=\"12\" height=\"12\" rx=\"1\"/><path d=\"M8.4 20.4h12v-12\"/>",
  del: "<path d=\"M4 6.6h16M9.4 6.6V4.4h5.2v2.2M6.4 6.6l1 13.2a1 1 0 0 0 1 .9h7.2a1 1 0 0 0 1-.9l1-13.2\"/>",
  /** ビューポートの分割（`25` の T6）。1 / 2 / 4 で見た目が変わる */
  layout1: "<rect x=\"3.5\" y=\"5\" width=\"17\" height=\"14\" rx=\"1\"/>",
  layoutCols: "<rect x=\"3.5\" y=\"5\" width=\"17\" height=\"14\" rx=\"1\"/><path d=\"M12 5v14\"/>",
  layoutRows: "<rect x=\"3.5\" y=\"5\" width=\"17\" height=\"14\" rx=\"1\"/><path d=\"M3.5 12h17\"/>",
  layoutQuad: "<rect x=\"3.5\" y=\"5\" width=\"17\" height=\"14\" rx=\"1\"/><path d=\"M12 5v14M3.5 12h17\"/>",
  frame: "<path d=\"M4 8V5a1 1 0 0 1 1-1h3M16 4h3a1 1 0 0 1 1 1v3M20 16v3a1 1 0 0 1-1 1h-3M8 20H5a1 1 0 0 1-1-1v-3\"/><circle cx=\"12\" cy=\"12\" r=\"3\"/>",
  finger: "<path d=\"M9 11V5.6a1.6 1.6 0 0 1 3.2 0V11\"/><path d=\"M12.2 11V9.4a1.6 1.6 0 0 1 3.2 0V11\"/><path d=\"M15.4 11.4v-.8a1.6 1.6 0 0 1 3.2 0V15a5.6 5.6 0 0 1-5.6 5.6h-1.3a5 5 0 0 1-3.9-1.9L5 15.5a1.6 1.6 0 0 1 2.4-2.1L9 15\"/>",
  mModel: "<path d=\"m12 2.6 8.6 4.8v9.2L12 21.4l-8.6-4.8V7.4z\"/><path d=\"M12 12.2 20.6 7.4M12 12.2v9.2M12 12.2 3.4 7.4\"/>",
  /** オプション（`24` の T5）。横線につまみ = スライダーの絵。 */
  options: "<path d=\"M4 7h10M18.5 7H20M4 12h3M11 12h9M4 17h8M16.5 17H20\"/><circle cx=\"16\" cy=\"7\" r=\"2.1\"/><circle cx=\"9\" cy=\"12\" r=\"2.1\"/><circle cx=\"14\" cy=\"17\" r=\"2.1\"/>",
  /** 歪みのヒートマップ（`23` の T2）。炎で「熱い＝歪んでいる」を表す。 */
  heat: "<path d=\"M12 3.2c3.4 3.4 5.6 6.1 5.6 9.3a5.6 5.6 0 0 1-11.2 0c0-1.7.6-3.1 1.8-4.7.6 1.4 1.4 2.2 2.4 2.5-.6-2.5-.4-4.7 1.4-7.1z\"/>",
  poles: "<path d=\"M4 5h16v14H4z\"/><path d=\"M12 12 4 5M12 12l8-7M12 12l-8 7M12 12l8 7M12 12h-8M12 12h8\"/><circle cx=\"12\" cy=\"12\" r=\"1.8\"/>",
  mask: "<circle cx=\"12\" cy=\"12\" r=\"8.5\"/><path d=\"M12 3.5a8.5 8.5 0 0 0 0 17z\" fill=\"currentColor\"/>",
  bClay: "<path d=\"M3 17h18\"/><path d=\"M6 17c1.6-6 10.8-6 12 0\" fill=\"currentColor\" fill-opacity=\".35\"/>",
  bClayBuildup: "<path d=\"M3 18h18\"/><path d=\"M7 18v-3h10v3z\" fill=\"currentColor\" fill-opacity=\".35\"/><path d=\"M9 15v-3h6v3z\" fill=\"currentColor\" fill-opacity=\".35\"/>",
  bInflate: "<circle cx=\"12\" cy=\"13\" r=\"5\"/><path d=\"M12 5v2.4M4.6 13H7M17 13h2.4M6.8 7.8l1.7 1.7M17.2 7.8l-1.7 1.7\"/>",
  bPinch: "<path d=\"M3 18h18\"/><path d=\"m8 18 4-9 4 9\" fill=\"currentColor\" fill-opacity=\".35\"/><path d=\"M7 7.5 9.6 10M17 7.5 14.4 10\"/>",
  bFlatten: "<path d=\"M3 13.5h18\"/><path d=\"M6 9.5v4M12 8v5.5M18 10.5v3\"/>",
  bTrim: "<path d=\"M3 13.5h18\"/><path d=\"M6 13.5v4.5h12v-4.5z\" fill=\"currentColor\" fill-opacity=\".35\"/><path d=\"m8.5 10 3-3 3 3\"/>",
  bDamien: "<path d=\"M3 18h18\"/><path d=\"m11 18 1-11 1 11z\" fill=\"currentColor\" fill-opacity=\".55\"/>",
  bPolish: "<path d=\"M3 14h18\"/><path d=\"M5 14c2-4 5-4 7 0s5 4 7 0\"/>",
  eraseAll: "<circle cx=\"12\" cy=\"12\" r=\"8.5\"/><path d=\"m8.4 8.4 7.2 7.2M15.6 8.4l-7.2 7.2\"/>",
  mUV: "<rect x=\"3.4\" y=\"3.4\" width=\"17.2\" height=\"17.2\" rx=\"1\"/><path d=\"M3.4 12h17.2M12 3.4v17.2\" stroke-dasharray=\"2.6 2.2\"/>",
  mSculpt: "<path d=\"M16.4 3.6 20.4 7.6 9.6 18.4l-5.2 1.2 1.2-5.2z\"/><path d=\"m14.4 5.6 4 4\"/>",
  mMaterial: "<circle cx=\"12\" cy=\"12\" r=\"8.6\"/><path d=\"M12 3.4a8.6 8.6 0 0 1 0 17.2z\" fill=\"currentColor\" fill-opacity=\".45\"/><path d=\"M3.4 12h17.2\"/>",
  pCube: "<path d=\"m12 2.6 8.6 4.8v9.2L12 21.4l-8.6-4.8V7.4z\"/><path d=\"M12 12.2 20.6 7.4M12 12.2v9.2M12 12.2 3.4 7.4\"/>",
  pSphere: "<circle cx=\"12\" cy=\"12\" r=\"9\"/><ellipse cx=\"12\" cy=\"12\" rx=\"4\" ry=\"9\"/><path d=\"M3 12h18\"/>",
  pCylinder: "<ellipse cx=\"12\" cy=\"5.6\" rx=\"7\" ry=\"2.8\"/><path d=\"M5 5.6v12.8M19 5.6v12.8\"/><path d=\"M5 18.4a7 2.8 0 0 0 14 0\"/>",
  pCone: "<path d=\"M12 3 19 18.4M12 3 5 18.4\"/><ellipse cx=\"12\" cy=\"18.4\" rx=\"7\" ry=\"2.8\"/>",
  pTorus: "<ellipse cx=\"12\" cy=\"12\" rx=\"9.2\" ry=\"5.4\"/><ellipse cx=\"12\" cy=\"12\" rx=\"3.6\" ry=\"1.9\"/>",
  pPlane: "<path d=\"M2.6 16.4 9.4 6.6h12L14.6 16.4z\"/><path d=\"M6 11.5h12\"/>",
  pDisk: "<ellipse cx=\"12\" cy=\"12\" rx=\"9.2\" ry=\"5.4\"/><path d=\"M2.8 12h18.4\"/>",
  pPlatonic: "<path d=\"m12 2.8 8.8 6.4-3.4 10.4H6.6L3.2 9.2z\"/><path d=\"M12 2.8v16.8M3.2 9.2l13.8 10M20.8 9.2 7 19.2\"/>",
} as const;

export type IconName = keyof typeof ICONS;

/** フラグメントを <svg> で包む。ボタンなどに差し込むとき用。 */
export function iconSvg(fragment: string, size = 18, strokeWidth = 1.6): string {
  return (
    `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" ` +
    `stroke-width="${strokeWidth}" stroke-linecap="round" stroke-linejoin="round">${fragment}</svg>`
  );
}
