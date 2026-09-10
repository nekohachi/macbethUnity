/**
 * ベイクをつなぐ（`44` の T2）。core は RGBA の並びまでを作り、
 * **PNG にするのはここ**（core は DOM を知らない。`02`）。
 */
import {
  bakeMaps,
  bakeStamp,
  heightToBytes,
  type BakeRecipe,
  type BakeResult,
  type SceneObject,
} from "../core/index.js";
import { levelsOf } from "./levels.js";
import { saveAs } from "./storage/files.js";

export const BAKE_SIZES = [1024, 2048, 4096];

export function defaultRecipe(): BakeRecipe {
  return { size: 2048, padding: 4, stamp: null };
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
}

/**
 * 焼く。ローは**レベル 0**、ハイは**いちばん上の段**。
 *
 * ハイはローの細分割そのものなので、UV の島は同じ場所を覆う（`44` の 1）。
 * 光線も距離もケージも要らない。
 */
export function bakeObject(o: SceneObject): BakeReport {
  if (!o.multires.length) return { ok: false, reason: "noLevels" };
  if (!o.mesh.uvSets.get("map1")) return { ok: false, reason: "noUv" };
  const recipe = o.bake ?? defaultRecipe();
  const high = levelsOf(o).level(o.multires.length);
  const t0 = performance.now();
  const result = bakeMaps(o.mesh, high, { size: recipe.size, padding: recipe.padding });
  const ms = performance.now() - t0;
  if (!result) return { ok: false, reason: "failed" };
  o.bake = { ...recipe, stamp: bakeStamp(o) };
  o.bakeResult = result;
  return { ok: true, result, ms };
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

export type BakeMapKind = "normal" | "height";

/** 焼いた絵を PNG で書き出す。 */
export async function exportBake(o: SceneObject, kind: BakeMapKind): Promise<{ ok: boolean; name?: string }> {
  const result = o.bakeResult;
  if (!result) return { ok: false };
  const rgba = kind === "normal" ? result.normal : heightToBytes(result);
  const png = await rgbaToPng(rgba, result.size);
  const name = `${o.name}_${kind === "normal" ? "normal" : "height"}_${result.size}.png`;
  const saved = await saveAs(png, name);
  return { ok: saved.saved, name };
}
