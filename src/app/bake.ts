/**
 * ベイクをつなぐ（`44` の T2）。core は RGBA の並びまでを作り、
 * **PNG にするのはここ**（core は DOM を知らない。`02`）。
 */
import {
  BAKE_TILE,
  bakeMaps,
  bakeStamp,
  heightToBytes,
  type BakeMap,
  type BakeRecipe,
  type BakeResult,
  type Mesh,
  type SceneObject,
} from "../core/index.js";
import { levelsOf } from "./levels.js";
import { saveAs } from "./storage/files.js";

export const BAKE_SIZES = [1024, 2048, 4096];

export function defaultRecipe(): BakeRecipe {
  // 既定は法線と高さだけ（`44` と同じ重さ）。曲率や AO は選んでから
  return { size: 2048, padding: 4, stamp: null, maps: ["normal", "height"], aoSamples: 8 };
}

/** 焼いた絵の状態（バッジ）。 */
export type BakeState = "none" | "fresh" | "stale";

export function bakeState(o: SceneObject | null): BakeState {
  if (!o || !o.bake?.stamp || !o.bakeResult) return "none";
  return o.bake.stamp === bakeStamp(o) ? "fresh" : "stale";
}

export interface BakeReport {
  ok: boolean;
  reason?: "noLevels" | "noUv" | "failed";
  result?: BakeResult;
  /** 焼くのに掛かった時間（ms）。 */
  ms?: number;
  /** 焼き直した升目の数（`46` の T3）。全部焼いたときは 0。 */
  tiles?: number;
}

/**
 * 焼く。ローは**レベル 0**、ハイは**いちばん上の段**。
 *
 * ハイはローの細分割そのものなので、UV の島は同じ場所を覆う（`44` の 1）。
 * 光線も距離もケージも要らない。
 */
export function bakeObject(o: SceneObject, partial = false): BakeReport {
  if (!o.multires.length) return { ok: false, reason: "noLevels" };
  if (!o.mesh.uvSets.get("map1")) return { ok: false, reason: "noUv" };
  const recipe = o.bake ?? defaultRecipe();
  const high = levelsOf(o).level(o.multires.length);
  // 差分は「前の絵があって、升目が一部だけ立っている」ときだけ（`46` の T3）
  const dirty = partial && o.bakeResult && o.bakeResult.size === recipe.size ? o.bakeDirty : null;
  const tiles = dirty ? dirty.reduce((n, v) => n + (v ? 1 : 0), 0) : 0;
  const t0 = performance.now();
  const result = bakeMaps(o.mesh, high, {
    size: recipe.size,
    padding: recipe.padding,
    maps: recipe.maps,
    aoSamples: recipe.aoSamples,
    ...(dirty && tiles ? { only: dirty, into: o.bakeResult! } : {}),
  });
  const ms = performance.now() - t0;
  if (!result) return { ok: false, reason: "failed" };
  o.bake = { ...recipe, stamp: bakeStamp(o) };
  o.bakeResult = result;
  o.bakeDirty = null;
  return { ok: true, result, ms, tiles: dirty ? tiles : 0 };
}

/** 升目の数（1 辺）。 */
export function tileCount(size: number): number {
  return Math.max(1, Math.ceil(size / BAKE_TILE));
}

/**
 * 動いた頂点の UV から、焼き直す升目を立てる（`46` の T3）。
 *
 * ハイの UV の島はローと同じ場所なので、**ハイの頂点の UV をそのまま使える**。
 * 焼いていないオブジェクトでは何もしない（立てても使い道が無い）。
 */
export function markBakeTiles(o: SceneObject, mesh: Mesh, verts: Iterable<number>): void {
  if (!o.bakeResult || !o.bake) return;
  const uv = mesh.uvSets.get("map1");
  if (!uv) return;
  const n = tileCount(o.bake.size);
  if (!o.bakeDirty || o.bakeDirty.length !== n * n) o.bakeDirty = new Uint8Array(n * n);
  const dirty = o.bakeDirty;
  const wanted = verts instanceof Set ? (verts as Set<number>) : new Set(verts);
  if (!wanted.size) return;
  // コーナーをなめる（UV はコーナーごと。頂点 → コーナーの表は持たない）
  for (let c = 0; c < mesh.faceCorners.length; c++) {
    if (!wanted.has(mesh.faceCorners[c])) continue;
    const x = Math.min(n - 1, Math.max(0, Math.floor(uv[c * 2] * n)));
    const y = Math.min(n - 1, Math.max(0, Math.floor(uv[c * 2 + 1] * n)));
    dirty[y * n + x] = 1;
    // 島の縁は隣の升目にも滲む（埋める幅のぶん）。**隣も立てる**
    for (const [dx, dy] of [
      [1, 0],
      [-1, 0],
      [0, 1],
      [0, -1],
    ]) {
      const tx = x + dx;
      const ty = y + dy;
      if (tx < 0 || ty < 0 || tx >= n || ty >= n) continue;
      const u = uv[c * 2] * n - x;
      const v = uv[c * 2 + 1] * n - y;
      // 升目の縁から 2% 以内のときだけ（全部立てると差分の意味が無い）
      if ((dx > 0 && u > 0.98) || (dx < 0 && u < 0.02) || (dy > 0 && v > 0.98) || (dy < 0 && v < 0.02)) {
        dirty[ty * n + tx] = 1;
      }
    }
  }
}

/**
 * 升目を全部立てる（`46` の T3）。レベル 0 を触った / トポロジを変えたとき。
 * 形が丸ごと変わるので、差分では追いつかない。
 */
export function bakeAllDirty(o: SceneObject): void {
  if (!o.bakeResult || !o.bake) return;
  const n = tileCount(o.bake.size);
  o.bakeDirty = new Uint8Array(n * n).fill(1);
}

/** 立っている升目の数。 */
export function dirtyTiles(o: SceneObject | null): number {
  return o?.bakeDirty ? o.bakeDirty.reduce((n, v) => n + (v ? 1 : 0), 0) : 0;
}

/** RGBA の並びを PNG のバイト列に。`canvas.toBlob` を使うのでここ（app）。 */
export async function rgbaToPng(rgba: Uint8Array, size: number): Promise<Uint8Array> {
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("2D コンテキストが取れませんでした");
  const image = ctx.createImageData(size, size);
  // 絵は上から下へ並ぶが、UV は下から上。**縦をひっくり返す**
  for (let y = 0; y < size; y++) {
    const src = (size - 1 - y) * size * 4;
    image.data.set(rgba.subarray(src, src + size * 4), y * size * 4);
  }
  ctx.putImageData(image, 0, 0);
  const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob((b) => resolve(b), "image/png"));
  if (!blob) throw new Error("PNG にできませんでした");
  return new Uint8Array(await blob.arrayBuffer());
}

export type BakeMapKind = BakeMap;

/** 絵の名前（メニューと書き出すファイル名）。 */
export const MAP_LABEL: Record<BakeMap, string> = {
  normal: "法線",
  height: "高さ",
  curvature: "曲率",
  ao: "AO",
  thickness: "厚み",
  position: "位置",
  id: "ID",
};

/** 1 バイトのグレーを RGBA へ広げる（書き出し用）。 */
export function grayToBytes(gray: Uint8Array): Uint8Array {
  const out = new Uint8Array(gray.length * 4);
  for (let t = 0; t < gray.length; t++) {
    out[t * 4] = gray[t];
    out[t * 4 + 1] = gray[t];
    out[t * 4 + 2] = gray[t];
    out[t * 4 + 3] = 255;
  }
  return out;
}

/** 焼いてある絵の RGBA。焼いていなければ null。 */
export function mapBytes(result: BakeResult, kind: BakeMap): Uint8Array | null {
  switch (kind) {
    case "normal":
      return result.normal;
    case "height":
      return heightToBytes(result);
    case "curvature":
      return result.curvature ? grayToBytes(result.curvature) : null;
    case "ao":
      return result.ao ? grayToBytes(result.ao) : null;
    case "thickness":
      return result.thickness ? grayToBytes(result.thickness) : null;
    case "position":
      return result.position;
    case "id":
      return result.id;
  }
}

/** 焼いた絵を PNG で書き出す。 */
export async function exportBake(o: SceneObject, kind: BakeMapKind): Promise<{ ok: boolean; name?: string }> {
  const result = o.bakeResult;
  if (!result) return { ok: false };
  const rgba = mapBytes(result, kind);
  if (!rgba) return { ok: false };
  const png = await rgbaToPng(rgba, result.size);
  const name = `${o.name}_${kind}_${result.size}.png`;
  const saved = await saveAs(png, name);
  return { ok: saved.saved, name };
}
