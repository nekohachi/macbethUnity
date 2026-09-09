/**
 * トポロジのハッシュ。docs/11 の「同じトポロジで戻ってきた」判定に使う。
 *
 * 頂点数が同じでも並びが変わっていれば別のハッシュになる。座標は含めない
 * （外部アプリで形を変えて戻ってくるのが前提なので、形は違って当たり前）。
 */
import { Mesh } from "../mesh.js";

/** FNV-1a 32bit。短くて衝突が少なく、同じ入力なら常に同じ値になる。 */
export function fnv1a(hash: number, value: number): number {
  hash ^= value & 0xff;
  hash = Math.imul(hash, 0x01000193);
  hash ^= (value >>> 8) & 0xff;
  hash = Math.imul(hash, 0x01000193);
  hash ^= (value >>> 16) & 0xff;
  hash = Math.imul(hash, 0x01000193);
  hash ^= (value >>> 24) & 0xff;
  hash = Math.imul(hash, 0x01000193);
  return hash >>> 0;
}

export function topologyHash(mesh: Mesh): string {
  let h = 0x811c9dc5;
  h = fnv1a(h, mesh.vertexCount);
  h = fnv1a(h, mesh.faceCount);
  for (let i = 0; i < mesh.faceOffsets.length; i++) h = fnv1a(h, mesh.faceOffsets[i]);
  for (let i = 0; i < mesh.faceCorners.length; i++) h = fnv1a(h, mesh.faceCorners[i]);
  return h.toString(16).padStart(8, "0");
}

export interface TopologyMatch {
  same: boolean;
  reason?: "vertexCount" | "faceCount" | "faceOrder";
}

/**
 * 2 つのメッシュが同じトポロジかを判定する。
 * 同じなら、上位レベルとレイヤーを残したままレベル 0 の座標だけ差し替えられる。
 */
export function compareTopology(a: Mesh, b: Mesh): TopologyMatch {
  if (a.vertexCount !== b.vertexCount) return { same: false, reason: "vertexCount" };
  if (a.faceCount !== b.faceCount) return { same: false, reason: "faceCount" };
  if (a.faceCorners.length !== b.faceCorners.length) return { same: false, reason: "faceOrder" };
  for (let i = 0; i < a.faceOffsets.length; i++) {
    if (a.faceOffsets[i] !== b.faceOffsets[i]) return { same: false, reason: "faceOrder" };
  }
  for (let i = 0; i < a.faceCorners.length; i++) {
    if (a.faceCorners[i] !== b.faceCorners[i]) return { same: false, reason: "faceOrder" };
  }
  return { same: true };
}
