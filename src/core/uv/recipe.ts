/**
 * UV レシピ。`15` の 2 章。**この層が非破壊の要**。
 *
 * UV そのものではなく「UV の作り方」を持つ。切れ目・ピン・ソルバー・パッキングの
 * 設定から毎回計算し直し、人が手で動かした分は島ごとの差分として上に乗せる。
 * マルチ解像度（`03`）の「決定的な土台 + 差分」と同じ形。
 *
 *   recompute = pack( unwrap(mesh, seams, pins) ) + manual
 *
 * 切れ目を 1 本変えると、その島の指紋だけが変わる。だから**その島の差分だけ**が
 * 落ちて、他の島の手直しは残る。
 */
import { Mesh, edgeKey } from "../mesh.js";
import {
  buildCharts,
  chartMesh,
  cornerKey,
  parseCorner,
  type Chart,
  type CornerKey,
  type EdgeKey,
} from "./charts.js";
import { autoPins, lscm, normalizeScale } from "./lscm.js";
import { projectChart } from "./projection.js";
import { measure, type Distortion } from "./distortion.js";

export type UvMethod = "lscm" | "projection" | "none";

export interface UvRecipe {
  /** 切れ目。自動が最初に置き、人が足す / 消す。 */
  seams: Set<EdgeKey>;
  /** 固定する UV。ソルバーはここを動かさない。 */
  pins: Map<CornerKey, [number, number]>;
  method: UvMethod;
  packing: { margin: number; allowRotate: boolean; texelDensity: number | null };
  /** 手で動かした差分。島の指紋 → コーナーごとの (du, dv)。 */
  manual: Map<string, Map<CornerKey, [number, number]>>;
  autoSeamParams: {
    angle: number;
    useHardEdges: boolean;
    useCreases: boolean;
    usePolygroups: boolean;
    symmetric: boolean;
  };
}

export const UV_SET = "map1";

export function emptyRecipe(): UvRecipe {
  return {
    seams: new Set(),
    pins: new Map(),
    method: "lscm",
    packing: { margin: 1 / 128, allowRotate: true, texelDensity: null },
    manual: new Map(),
    autoSeamParams: {
      angle: 65,
      useHardEdges: true,
      useCreases: true,
      usePolygroups: true,
      symmetric: false,
    },
  };
}

export function cloneRecipe(recipe: UvRecipe): UvRecipe {
  const manual = new Map<string, Map<CornerKey, [number, number]>>();
  for (const [key, deltas] of recipe.manual) {
    manual.set(key, new Map([...deltas].map(([k, d]) => [k, [d[0], d[1]] as [number, number]])));
  }
  return {
    seams: new Set(recipe.seams),
    pins: new Map([...recipe.pins].map(([k, p]) => [k, [p[0], p[1]] as [number, number]])),
    method: recipe.method,
    packing: { ...recipe.packing },
    manual,
    autoSeamParams: { ...recipe.autoSeamParams },
  };
}

export interface RecomputeResult {
  charts: Chart[];
  /** 島ごとの歪み。並びは charts と同じ。 */
  distortion: Distortion[];
  /** いちばん歪んだ島の伸び。 */
  maxStretch: number;
  meanAngleError: number;
}

/**
 * レシピから UV を作り直して `mesh.uvSets["map1"]` に書く。
 *
 * 同じ mesh と recipe からは必ず同じ結果が出る（島の順、頂点の番号、丸めまで）。
 */
export function recompute(mesh: Mesh, recipe: UvRecipe, options: { skipPack?: boolean } = {}): RecomputeResult {
  const charts = buildCharts(mesh, recipe.seams);
  const uv = new Float32Array(mesh.faceCorners.length * 2);
  const distortion: Distortion[] = [];
  const boxes: Array<{ min: [number, number]; max: [number, number] }> = [];

  // 「なし」は今の UV を土台にする。手の差分だけで動かしたい人向け
  const previous = mesh.uvSets.get(UV_SET);

  for (const chart of charts) {
    const local = chartMesh(mesh, chart, recipe.seams);
    let flat: Float64Array;

    if (recipe.method === "none") {
      flat = new Float64Array(local.count * 2);
      for (const key of chart.corners) {
        const at = local.localOf.get(key)!;
        const corner = cornerIndex(mesh, key);
        flat[at * 2] = previous ? previous[corner * 2] : 0;
        flat[at * 2 + 1] = previous ? previous[corner * 2 + 1] : 0;
      }
    } else if (recipe.method === "projection") {
      flat = projectChart(local.positions, local.tri);
    } else {
      const pins = new Map<number, [number, number]>();
      for (const key of chart.corners) {
        const pinned = recipe.pins.get(key);
        if (!pinned) continue;
        const at = local.localOf.get(key);
        if (at !== undefined) pins.set(at, [pinned[0], pinned[1]]);
      }
      // 2 点足りないと平行移動・回転・拡大が決まらない
      if (pins.size < 2) for (const [v, p] of autoPins(local.positions)) if (!pins.has(v)) pins.set(v, p);
      flat = lscm(local.positions, local.tri, pins);
      // 固定した 2 点は向きと位置を決めるだけ。大きさは 3D の面積に合わせる
      if (recipe.pins.size < 2) normalizeScale(local.positions, local.tri, flat);
    }

    distortion.push(measure(local.positions, local.tri, flat));

    // 島の境界箱を控えて、パッキングに渡す
    let minU = Infinity;
    let minV = Infinity;
    let maxU = -Infinity;
    let maxV = -Infinity;
    for (let i = 0; i < local.count; i++) {
      minU = Math.min(minU, flat[i * 2]);
      maxU = Math.max(maxU, flat[i * 2]);
      minV = Math.min(minV, flat[i * 2 + 1]);
      maxV = Math.max(maxV, flat[i * 2 + 1]);
    }
    boxes.push({ min: [minU, minV], max: [maxU, maxV] });

    for (const key of chart.corners) {
      const at = local.localOf.get(key)!;
      const corner = cornerIndex(mesh, key);
      uv[corner * 2] = flat[at * 2];
      uv[corner * 2 + 1] = flat[at * 2 + 1];
    }
  }

  if (!options.skipPack && recipe.method !== "none") layout(charts, boxes, uv, mesh, recipe.packing.margin);

  // 手で動かした分を上に乗せる。指紋が合う島だけ
  for (const chart of charts) {
    const deltas = recipe.manual.get(chart.fingerprint);
    if (!deltas) continue;
    for (const [key, d] of deltas) {
      const corner = cornerIndex(mesh, key);
      if (corner < 0 || corner * 2 + 1 >= uv.length) continue;
      uv[corner * 2] += d[0];
      uv[corner * 2 + 1] += d[1];
    }
  }

  mesh.uvSets.set(UV_SET, uv);

  let maxStretch = 1;
  let angleSum = 0;
  for (const d of distortion) {
    maxStretch = Math.max(maxStretch, d.maxStretch);
    angleSum += d.meanAngleError;
  }
  return {
    charts,
    distortion,
    maxStretch,
    meanAngleError: distortion.length ? angleSum / distortion.length : 0,
  };
}

/**
 * C1 の仮のパッキング。島を横に並べて 0〜1 に収める。
 * ちゃんとした棚詰めとテクセル密度は C3（`16` のタスク C3）。
 */
function layout(
  charts: Chart[],
  boxes: Array<{ min: [number, number]; max: [number, number] }>,
  uv: Float32Array,
  mesh: Mesh,
  margin: number,
): void {
  if (!charts.length) return;
  let total = 0;
  let tallest = 0;
  for (const box of boxes) {
    total += Math.max(1e-6, box.max[0] - box.min[0]) + margin;
    tallest = Math.max(tallest, Math.max(1e-6, box.max[1] - box.min[1]));
  }
  const scale = Math.min(1 / Math.max(1e-6, total), 1 / Math.max(1e-6, tallest));
  let cursor = 0;
  charts.forEach((chart, i) => {
    const box = boxes[i];
    for (const key of chart.corners) {
      const corner = cornerIndex(mesh, key);
      uv[corner * 2] = (uv[corner * 2] - box.min[0]) * scale + cursor;
      uv[corner * 2 + 1] = (uv[corner * 2 + 1] - box.min[1]) * scale;
    }
    cursor += (box.max[0] - box.min[0]) * scale + margin;
  });
}

/** コーナーキー → `mesh.faceCorners` 内の位置。 */
export function cornerIndex(mesh: Mesh, key: CornerKey): number {
  const [f, at] = parseCorner(key);
  if (f < 0 || f >= mesh.faceCount) return -1;
  return mesh.faceOffsets[f] + at;
}

/**
 * 手で動かした分を記録する。呼び出し側は「レシピどおりの UV」との差を渡す。
 * 同じ島に既に差分があれば足し込む。
 */
export function recordManual(
  recipe: UvRecipe,
  fingerprint: string,
  deltas: Map<CornerKey, [number, number]>,
): void {
  const current = recipe.manual.get(fingerprint) ?? new Map<CornerKey, [number, number]>();
  for (const [key, d] of deltas) {
    const before = current.get(key) ?? [0, 0];
    current.set(key, [before[0] + d[0], before[1] + d[1]]);
  }
  recipe.manual.set(fingerprint, current);
}

/**
 * トポロジが変わったあとの後始末。`15` の 2.4。
 *
 * - 切れ目: 両端の頂点が残っていて、その辺がまだあるものだけ残す
 * - ピン: 面が消えた / 短くなったものは落とす
 * - 手の差分: 今あるどの島の指紋とも合わないものを落とす
 *
 * 全部消すのではなく、**対応が取れなくなった分だけ**落とす。
 */
export function reconcile(recipe: UvRecipe, mesh: Mesh): { droppedSeams: number; droppedIslands: number } {
  const alive = new Set<EdgeKey>();
  for (const [a, b] of mesh.edges()) alive.add(edgeKey(a, b));
  let droppedSeams = 0;
  for (const key of [...recipe.seams]) {
    if (alive.has(key)) continue;
    recipe.seams.delete(key);
    droppedSeams++;
  }

  for (const key of [...recipe.pins.keys()]) {
    const [f, at] = parseCorner(key);
    if (f < 0 || f >= mesh.faceCount || at >= mesh.faceSize(f)) recipe.pins.delete(key);
  }

  const charts = buildCharts(mesh, recipe.seams);
  const live = new Set(charts.map((c) => c.fingerprint));
  let droppedIslands = 0;
  for (const key of [...recipe.manual.keys()]) {
    if (live.has(key)) continue;
    recipe.manual.delete(key);
    droppedIslands++;
  }
  return { droppedSeams, droppedIslands };
}

/** 面 f の i 番目の辺（コーナー i と i+1 の間）のエッジキー。 */
export function faceEdgeKey(mesh: Mesh, f: number, i: number): EdgeKey {
  const verts = mesh.faceVerts(f);
  return edgeKey(verts[i], verts[(i + 1) % verts.length]);
}

export { cornerKey, parseCorner, buildCharts, chartMesh };
export type { Chart, CornerKey, EdgeKey, Distortion };

/* ---- 保存 ------------------------------------------------------------- */

/** JSON にできる形。Set と Map は配列にする。 */
export interface UvRecipeJson {
  seams: EdgeKey[];
  pins: Array<[CornerKey, number, number]>;
  method: UvMethod;
  packing: UvRecipe["packing"];
  manual: Array<[string, Array<[CornerKey, number, number]>]>;
  autoSeamParams: UvRecipe["autoSeamParams"];
}

export function serializeRecipe(recipe: UvRecipe): UvRecipeJson {
  return {
    // 並びをそろえておく。保存し直しても中身が同じなら同じ JSON になる
    seams: [...recipe.seams].sort(),
    pins: [...recipe.pins].sort((a, b) => (a[0] < b[0] ? -1 : 1)).map(([k, p]) => [k, p[0], p[1]]),
    method: recipe.method,
    packing: { ...recipe.packing },
    manual: [...recipe.manual]
      .sort((a, b) => (a[0] < b[0] ? -1 : 1))
      .map(([key, deltas]) => [
        key,
        [...deltas].sort((a, b) => (a[0] < b[0] ? -1 : 1)).map(([k, d]) => [k, d[0], d[1]] as [CornerKey, number, number]),
      ]),
    autoSeamParams: { ...recipe.autoSeamParams },
  };
}

export function deserializeRecipe(json: UvRecipeJson | null | undefined): UvRecipe | null {
  if (!json) return null;
  const recipe = emptyRecipe();
  for (const key of json.seams ?? []) recipe.seams.add(key);
  for (const [key, u, v] of json.pins ?? []) recipe.pins.set(key, [u, v]);
  if (json.method) recipe.method = json.method;
  if (json.packing) recipe.packing = { ...recipe.packing, ...json.packing };
  if (json.autoSeamParams) recipe.autoSeamParams = { ...recipe.autoSeamParams, ...json.autoSeamParams };
  for (const [fingerprint, deltas] of json.manual ?? []) {
    recipe.manual.set(fingerprint, new Map(deltas.map(([k, du, dv]) => [k, [du, dv] as [number, number]])));
  }
  return recipe;
}
