/**
 * 焼いた絵を画面に貼るためのテクスチャ（`49` の T1）。
 *
 * **PNG を経由しない。** 焼いた配列（`BakeResult`）をそのまま `DataTexture` に渡す。
 * 2K の 1 枚は 16MB で、PNG に直して読み直すと数百 ms かかるうえ、
 * 画面に出すだけなら圧縮する意味がない。
 *
 * **向き**: 焼いた配列は行 0 が v = 0。WebGL も `flipY` が false なら行 0 が v = 0
 * なので、**そのまま合う**（縦を返すのは PNG に出すときだけ。`44` の `rgbaToPng`）。
 *
 * 持ち方はオブジェクトごとに 1 組。ペインを分けても同じものを使い回す。
 */
import { DataTexture, LinearFilter, LinearMipmapLinearFilter, NoColorSpace, RGBAFormat, RedFormat, UnsignedByteType } from "three";
import type { SceneObject } from "../../core/index.js";

export interface BakeTextures {
  /** 接空間の法線マップ（RGBA）。 */
  normal: DataTexture | null;
  /** AO（赤 1 枚）。three の `aoMap` は赤だけを見る。 */
  ao: DataTexture | null;
  /** 作ったときの大きさ。変わったら作り直す目印。 */
  size: number;
}

/** オブジェクト id → テクスチャ。`SceneObject` は core なので three を持たせない。 */
const CACHE = new Map<string, BakeTextures>();

function makeTexture(data: Uint8Array, size: number, red: boolean): DataTexture {
  const t = new DataTexture(data, size, size, red ? RedFormat : RGBAFormat, UnsignedByteType);
  // 法線も AO も「色」ではなくデータなので、ガンマを掛けない
  t.colorSpace = NoColorSpace;
  t.minFilter = LinearMipmapLinearFilter;
  t.magFilter = LinearFilter;
  t.generateMipmaps = true;
  t.needsUpdate = true;
  return t;
}

/**
 * 焼いた結果からテクスチャを作る（あれば使い回す）。焼いていなければ null。
 */
export function bakeTextures(o: SceneObject): BakeTextures | null {
  const result = o.bakeResult;
  if (!result) {
    disposeBakeTextures(o);
    return null;
  }
  const found = CACHE.get(o.id);
  if (found && found.size === result.size) return found;
  disposeBakeTextures(o);
  const made: BakeTextures = {
    normal: result.maps.includes("normal") ? makeTexture(result.normal, result.size, false) : null,
    ao: result.ao ? makeTexture(result.ao, result.size, true) : null,
    size: result.size,
  };
  CACHE.set(o.id, made);
  return made;
}

/**
 * 焼き直したあとに呼ぶ。**同じ配列を書き換えただけなら送り直すだけ**
 * （`46` の差分焼きは同じ `Uint8Array` に書き込む）。大きさや枚数が変われば作り直す。
 */
export function refreshBakeTextures(o: SceneObject): void {
  const result = o.bakeResult;
  const found = CACHE.get(o.id);
  if (!result) return disposeBakeTextures(o);
  // 大きさが違う・AO の有無が変わった → 作り直し
  if (!found || found.size !== result.size || !!found.ao !== !!result.ao || !!found.normal !== result.maps.includes("normal")) {
    disposeBakeTextures(o);
    bakeTextures(o);
    return;
  }
  if (found.normal) {
    found.normal.image.data = result.normal;
    found.normal.needsUpdate = true;
  }
  if (found.ao && result.ao) {
    found.ao.image.data = result.ao;
    found.ao.needsUpdate = true;
  }
}

export function disposeBakeTextures(o: SceneObject | string): void {
  const id = typeof o === "string" ? o : o.id;
  const found = CACHE.get(id);
  if (!found) return;
  found.normal?.dispose();
  found.ao?.dispose();
  CACHE.delete(id);
}

/** 生きているオブジェクト以外のぶんを捨てる（オブジェクトを消したとき）。 */
export function pruneBakeTextures(alive: Set<string>): void {
  for (const id of [...CACHE.keys()]) if (!alive.has(id)) disposeBakeTextures(id);
}
