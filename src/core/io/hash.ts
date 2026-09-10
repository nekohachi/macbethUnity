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

/** Float32Array を混ぜる。全部は舐めず、間引いて拾う（大きいデルタで速さを保つ）。 */
function mixFloats(hash: number, values: Float32Array, samples = 4096): number {
  const n = values.length;
  hash = fnv1a(hash, n);
  const step = Math.max(1, Math.floor(n / samples));
  const scratch = new Float32Array(1);
  const bits = new Uint32Array(scratch.buffer);
  for (let i = 0; i < n; i += step) {
    scratch[0] = values[i];
    hash = fnv1a(hash, bits[0]);
  }
  return hash;
}

/** `bakeStamp` が見るもの。`SceneObject` がそのまま渡せる形（`44` の T2）。 */
export interface BakeStampSource {
  mesh: Mesh;
  multires: Array<{ level: number; delta: Float32Array }>;
  sculptLayers: Array<{ level: number; weight: number; visible: boolean; delta: Float32Array }>;
}

/**
 * 焼いたときの指紋（`44` の T2、`31` の 2）。
 *
 * **トポロジ + レベル 0 の形 + ハイのデルタ + UV** を混ぜた 1 本の文字列。
 * 焼いたあとにどれか 1 つでも変われば違う値になり、バッジが `古い` に変わる。
 * デルタは間引いて拾うので、**1 テクセルぶんの彫りでは変わらないことがある**。
 * 印は「作り直したほうがいい」の目安であって、正しさの保証ではない。
 */
export function bakeStamp(o: BakeStampSource): string {
  let h = 0x811c9dc5;
  h = fnv1a(h, o.mesh.vertexCount);
  h = fnv1a(h, o.mesh.faceCount);
  // コーナーも間引く。**ボタンを描くたびに呼ぶ**ので、25 万四角形（コーナー 100 万）を
  // 丸ごと舐めるわけにはいかない
  const corners = o.mesh.faceCorners;
  const step = Math.max(1, Math.floor(corners.length / 4096));
  h = fnv1a(h, corners.length);
  for (let i = 0; i < corners.length; i += step) h = fnv1a(h, corners[i]);
  h = mixFloats(h, o.mesh.positions);
  for (const uv of o.mesh.uvSets.values()) h = mixFloats(h, uv);
  for (const level of o.multires) {
    h = fnv1a(h, level.level);
    h = mixFloats(h, level.delta);
  }
  for (const layer of o.sculptLayers) {
    h = fnv1a(h, layer.level);
    h = fnv1a(h, Math.round(layer.weight * 1000));
    h = fnv1a(h, layer.visible ? 1 : 0);
    h = mixFloats(h, layer.delta);
  }
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
