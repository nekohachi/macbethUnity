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
import { uprightChart } from "./orient.js";
import { equalizeTexelDensity, shelfPack, surfaceArea, type PackBox } from "./pack.js";

export type UvMethod = "lscm" | "projection" | "none";

export interface UvRecipe {
  /** 切れ目。自動が最初に置き、人が足す / 消す。 */
  seams: Set<EdgeKey>;
  /** 固定する UV。ソルバーはここを動かさない。 */
  pins: Map<CornerKey, [number, number]>;
  method: UvMethod;
  /**
   * 取り込んだ UV（コーナーごと。長さはコーナー数 × 2）。
   * `method: "none"` のときの土台。ここに `manual` を乗せた結果が `map1` になる。
   * `map1` を土台にすると、再計算のたびに手の差分が二重に乗ってしまう。
   */
  base: Float32Array | null;
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
    base: null,
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
    base: recipe.base ? Float32Array.from(recipe.base) : null,
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
  // パッキングに渡す島ごとの情報
  const flats: Float64Array[] = [];
  const tris: Uint32Array[] = [];
  const areas: number[] = [];

  // 「なし」は取り込んだ UV（base）を土台にする。base が無ければ今の map1
  // （古い保存物のため）。map1 を土台にすると手の差分が二重に乗る
  const previous = recipe.base ?? mesh.uvSets.get(UV_SET);

  for (const chart of charts) {
    const local = chartMesh(mesh, chart, recipe.seams);
    let flat: Float64Array;
    // 解いたあとで島を立てるか（`19` の 1.1）。人がピンで向きを決めている島は動かさない
    let upright = recipe.method !== "none";

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
      if (pins.size < 2) {
        for (const [v, p] of autoPins(local.positions, local.tri)) if (!pins.has(v)) pins.set(v, p);
      } else {
        upright = false;
      }
      flat = lscm(local.positions, local.tri, pins);
      // 解けなかった島（畳まれた・数値が壊れた）は投影に落とす。
      // 平面投影は歪むが、少なくとも見える形で出てくる
      if (!isUsable(flat, local.count)) flat = projectChart(local.positions, local.tri);
      // 固定した 2 点は向きと位置を決めるだけ。大きさは 3D の面積に合わせる
      if (recipe.pins.size < 2) normalizeScale(local.positions, local.tri, flat);
    }

    // 島を立てる。ここでやれば歪みの評価もパッキングも回したあとの形を見る
    if (upright) uprightChart(local.positions, local.tri, flat);

    distortion.push(measure(local.positions, local.tri, flat));
    flats.push(flat);
    tris.push(local.tri);
    areas.push(surfaceArea(local.positions, local.tri));

    for (const key of chart.corners) {
      const at = local.localOf.get(key)!;
      const corner = cornerIndex(mesh, key);
      uv[corner * 2] = flat[at * 2];
      uv[corner * 2 + 1] = flat[at * 2 + 1];
    }
  }

  // テクセル密度をそろえてから棚に詰める（`15` の 5 章）
  if (!options.skipPack && recipe.method !== "none") {
    equalizeTexelDensity(flats, tris, areas, recipe.packing.texelDensity);
    packCharts(charts, flats, uv, mesh, recipe.packing);
  }

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
 * 解が使いものになるか。数値が壊れていないか、1 点に畳まれていないか。
 */
function isUsable(uv: Float64Array, count: number): boolean {
  if (!count) return true;
  let minU = Infinity;
  let minV = Infinity;
  let maxU = -Infinity;
  let maxV = -Infinity;
  for (let i = 0; i < count; i++) {
    const u = uv[i * 2];
    const v = uv[i * 2 + 1];
    if (!Number.isFinite(u) || !Number.isFinite(v)) return false;
    minU = Math.min(minU, u);
    maxU = Math.max(maxU, u);
    minV = Math.min(minV, v);
    maxV = Math.max(maxV, v);
  }
  const w = maxU - minU;
  const h = maxV - minV;
  // 片方が完全に潰れていたら畳まれている
  return w > 1e-9 && h > 1e-9;
}

/**
 * 島を棚に詰めて 0〜1 に収める。島どうしの大きさの比は変えない
 * （テクセル密度は `equalizeTexelDensity` で先にそろえてある）。
 */
function packCharts(
  charts: Chart[],
  flats: Float64Array[],
  uv: Float32Array,
  mesh: Mesh,
  packing: UvRecipe["packing"],
): void {
  if (!charts.length) return;
  const boxes: PackBox[] = [];
  const mins: Array<[number, number]> = [];
  flats.forEach((flat) => {
    let minU = Infinity;
    let minV = Infinity;
    let maxU = -Infinity;
    let maxV = -Infinity;
    for (let i = 0; i < flat.length / 2; i++) {
      minU = Math.min(minU, flat[i * 2]);
      maxU = Math.max(maxU, flat[i * 2]);
      minV = Math.min(minV, flat[i * 2 + 1]);
      maxV = Math.max(maxV, flat[i * 2 + 1]);
    }
    mins.push([minU, minV]);
    boxes.push({ w: maxU - minU, h: maxV - minV });
  });

  const placed = shelfPack(boxes, packing.margin, packing.allowRotate);
  charts.forEach((chart, i) => {
    const p = placed[i];
    const [minU, minV] = mins[i];
    for (const key of chart.corners) {
      const corner = cornerIndex(mesh, key);
      const u = uv[corner * 2] - minU;
      const v = uv[corner * 2 + 1] - minV;
      // 寝かせて置いた島は 90° 回す
      const x = p.rotated ? v : u;
      const y = p.rotated ? boxes[i].w - u : v;
      uv[corner * 2] = p.x + x * p.scale;
      uv[corner * 2 + 1] = p.y + y * p.scale;
    }
  });
}

/**
 * 今ある UV の切れ目を読み取る（`17` の 1.2）。
 *
 * 2 枚の面が共有する辺で、辺の両端のコーナー UV が面をまたいで合わなければ切れ目。
 * 境界の辺（面が 1 枚）は切れ目にしない（島の縁は切れ目が無くても縁）。
 */
export function seamsFromUv(mesh: Mesh, eps = 1e-6): Set<EdgeKey> {
  const seams = new Set<EdgeKey>();
  const uv = mesh.uvSets.get(UV_SET);
  if (!uv) return seams;

  // 辺 → その辺を含む (面, その面での位置) の一覧
  const byEdge = new Map<EdgeKey, Array<[number, number]>>();
  for (let f = 0; f < mesh.faceCount; f++) {
    const n = mesh.faceSize(f);
    for (let i = 0; i < n; i++) {
      const key = faceEdgeKey(mesh, f, i);
      const list = byEdge.get(key);
      if (list) list.push([f, i]);
      else byEdge.set(key, [[f, i]]);
    }
  }

  for (const [key, uses] of byEdge) {
    if (uses.length !== 2) continue;
    const [a, b] = key.split("_").map(Number);
    // 面ごとに、その辺の両端の頂点に当たるコーナーの UV を取る
    const uvOf = (f: number, vertex: number): [number, number] | null => {
      const verts = mesh.faceVerts(f);
      const at = verts.indexOf(vertex);
      if (at < 0) return null;
      const corner = mesh.faceOffsets[f] + at;
      return [uv[corner * 2], uv[corner * 2 + 1]];
    };
    let split = false;
    for (const vertex of [a, b]) {
      const p = uvOf(uses[0][0], vertex);
      const q = uvOf(uses[1][0], vertex);
      if (!p || !q) continue;
      if (Math.abs(p[0] - q[0]) > eps || Math.abs(p[1] - q[1]) > eps) split = true;
    }
    if (split) seams.add(key);
  }
  return seams;
}

/**
 * 今のメッシュの UV をそのまま受け継ぐレシピを作る（`17` の 1 章）。
 *
 * UV モードに入っただけで開き直さないための入口。プリミティブが持っている
 * UV（立方体なら面ごとに 0〜1、球なら経緯度）はそのまま見える。
 * UV が無ければ投影で当座の UV を作る。
 */
export function recipeFromMesh(mesh: Mesh): UvRecipe {
  const recipe = emptyRecipe();
  const uv = mesh.uvSets.get(UV_SET);
  if (!uv) {
    recipe.method = "projection";
    return recipe;
  }
  recipe.method = "none";
  recipe.base = Float32Array.from(uv);
  for (const key of seamsFromUv(mesh)) recipe.seams.add(key);
  return recipe;
}

/**
 * 土台の UV の上で辺を縫う（Maya の Sew）。`method: "none"` のとき、
 * 切れ目を消しただけでは UV は動かないので、両側のコーナーを中点へ寄せる。
 */
export function sewInBase(mesh: Mesh, base: Float32Array, edges: Iterable<EdgeKey>): void {
  const wanted = new Set(edges);
  if (!wanted.size) return;

  // 辺 → (面, その面での位置)
  const byEdge = new Map<EdgeKey, Array<[number, number]>>();
  for (let f = 0; f < mesh.faceCount; f++) {
    const n = mesh.faceSize(f);
    for (let i = 0; i < n; i++) {
      const key = faceEdgeKey(mesh, f, i);
      if (!wanted.has(key)) continue;
      const list = byEdge.get(key);
      if (list) list.push([f, i]);
      else byEdge.set(key, [[f, i]]);
    }
  }

  for (const [key, uses] of byEdge) {
    if (uses.length !== 2) continue;
    const [a, b] = key.split("_").map(Number);
    for (const vertex of [a, b]) {
      const corners: number[] = [];
      for (const [f] of uses) {
        const at = mesh.faceVerts(f).indexOf(vertex);
        if (at >= 0) corners.push(mesh.faceOffsets[f] + at);
      }
      if (corners.length !== 2) continue;
      const u = (base[corners[0] * 2] + base[corners[1] * 2]) / 2;
      const v = (base[corners[0] * 2 + 1] + base[corners[1] * 2 + 1]) / 2;
      for (const c of corners) {
        base[c * 2] = u;
        base[c * 2 + 1] = v;
      }
    }
  }
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
export function reconcile(
  recipe: UvRecipe,
  mesh: Mesh,
): { droppedSeams: number; droppedIslands: number; rebased: boolean } {
  // 「なし」は土台を取り直す。押し出しやベベルは新しい面へ UV を補間するので、
  // その時点の map1 が「ユーザーが見ていた UV」そのもの。差分は既にそこへ
  // 焼き込まれているから捨ててよい（`17` の 1.2）
  if (recipe.method === "none") {
    const uv = mesh.uvSets.get(UV_SET);
    if (uv) {
      recipe.base = Float32Array.from(uv);
      recipe.manual.clear();
      for (const key of seamsFromUv(mesh)) recipe.seams.add(key);
      for (const key of [...recipe.pins.keys()]) {
        const [f, at] = parseCorner(key);
        if (f < 0 || f >= mesh.faceCount || at >= mesh.faceSize(f)) recipe.pins.delete(key);
      }
      let dropped = 0;
      const live = new Set<EdgeKey>();
      for (const [a, b] of mesh.edges()) live.add(edgeKey(a, b));
      for (const key of [...recipe.seams]) {
        if (live.has(key)) continue;
        recipe.seams.delete(key);
        dropped++;
      }
      return { droppedSeams: dropped, droppedIslands: 0, rebased: true };
    }
  }

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
  return { droppedSeams, droppedIslands, rebased: false };
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
  /** 取り込んだ UV。長いので数値の配列でそのまま持つ。 */
  base: number[] | null;
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
    base: recipe.base ? [...recipe.base] : null,
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
  if (json.base) recipe.base = Float32Array.from(json.base);
  if (json.packing) recipe.packing = { ...recipe.packing, ...json.packing };
  if (json.autoSeamParams) recipe.autoSeamParams = { ...recipe.autoSeamParams, ...json.autoSeamParams };
  for (const [fingerprint, deltas] of json.manual ?? []) {
    recipe.manual.set(fingerprint, new Map(deltas.map(([k, du, dv]) => [k, [du, dv] as [number, number]])));
  }
  return recipe;
}
