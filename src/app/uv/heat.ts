/**
 * 歪みを色にする（`23` の T2）。
 *
 * 見るのは `core/uv/distortion.ts` の σ1 / σ2（形の歪み）。1.0 が完全。
 * 1.0 のところは島の今の色のままにして、歪んだところにだけ色が乗るようにする。
 * 縮尺（テクセル密度）は色にしない — それはパッキングの話（`19` の決め）。
 */

import {
  UV_SET,
  buildCharts,
  chartMesh,
  cornerIndex,
  distortionPerFace,
  measure,
  type Distortion,
  type SceneObject,
} from "../../core/index.js";

export type Rgb = [number, number, number];

/** 目盛り。1.0 = 島の色（青灰）、1.2 = 緑、1.5 = 黄、2.0 以上 = 赤。 */
const STOPS: Array<{ at: number; color: Rgb }> = [
  { at: 1.0, color: [0.463, 0.659, 0.867] },
  { at: 1.2, color: [0.353, 0.816, 0.361] },
  { at: 1.5, color: [0.949, 0.847, 0.251] },
  { at: 2.0, color: [0.918, 0.239, 0.196] },
];

/** 歪みなしのときの色。色を持たない面（切れ目の外）にも使う。 */
export const HEAT_BASE: Rgb = STOPS[0].color;

/**
 * 今の UV から面ごとの歪みを測る（開き直さない）。
 *
 * `recompute` は結果に `perFace` を持っているのでふつうはそれを使う。
 * これは「まだ開き直していないのに色を出したい」ときの入口で、
 * 手で動かしたあとの UV もそのまま測れる。UV セットが無ければ null。
 */
export function measureFaceHeat(object: SceneObject): Float32Array | null {
  const uv = object.mesh.uvSets.get(UV_SET);
  if (!uv) return null;
  const seams = object.uv?.seams ?? new Set<string>();
  const charts = buildCharts(object.mesh, seams);
  const distortion: Distortion[] = [];
  for (const chart of charts) {
    const local = chartMesh(object.mesh, chart, seams);
    const flat = new Float64Array(local.count * 2);
    for (const key of chart.corners) {
      const at = local.localOf.get(key);
      if (at === undefined) continue;
      const corner = cornerIndex(object.mesh, key);
      flat[at * 2] = uv[corner * 2];
      flat[at * 2 + 1] = uv[corner * 2 + 1];
    }
    distortion.push(measure(local.positions, local.tri, flat));
  }
  return distortionPerFace(object.mesh.faceCount, (f) => object.mesh.faceSize(f), charts, distortion);
}

/** σ1 / σ2 を色にする。範囲の外は端の色で止める。 */
export function heatColor(stretch: number): Rgb {
  if (!Number.isFinite(stretch) || stretch <= STOPS[0].at) return [...STOPS[0].color];
  const last = STOPS[STOPS.length - 1];
  if (stretch >= last.at) return [...last.color];
  for (let i = 1; i < STOPS.length; i++) {
    const a = STOPS[i - 1];
    const b = STOPS[i];
    if (stretch > b.at) continue;
    const t = (stretch - a.at) / (b.at - a.at);
    return [
      a.color[0] + (b.color[0] - a.color[0]) * t,
      a.color[1] + (b.color[1] - a.color[1]) * t,
      a.color[2] + (b.color[2] - a.color[2]) * t,
    ];
  }
  return [...last.color];
}
