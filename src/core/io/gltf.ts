/**
 * glTF 2.0（.glb）の書き出し。`12` の Phase E2。
 *
 * Substance Painter は glTF を読めるので、テクスチャ作業への渡しはここが経路になる
 * （`11` の 3 章）。読み込みは作らない（外から持ってくるのは FBX / OBJ）。
 *
 * 出すのは 1 ファイルの **.glb**（JSON とバイナリを 1 つにまとめた形）。
 * タブレットでは「ファイルが 1 つ」がそのまま扱いやすさになる。
 *
 * 座標系は glTF も Y 上・右手系で、こちらと同じ。変換は要らない。
 */
import { Mesh } from "../mesh.js";
import { UV_SET } from "../uv/recipe.js";
import type { SceneObject } from "../document.js";

/** 書き出す 1 つ分。 */
export interface GltfNode {
  name: string;
  mesh: Mesh;
  position: [number, number, number];
  /** クォータニオン (x, y, z, w)。 */
  rotation: [number, number, number, number];
  scale: [number, number, number];
}

export interface GltfOptions {
  /** 法線を分ける角度（度）。3D の表示と同じ規則。 */
  smoothAngle?: number;
  /** 生成元の名前。asset.generator に入る。 */
  generator?: string;
}

/**
 * 三角形の並びを作る。
 *
 * glTF は「1 頂点 = 位置 + 法線 + UV の組」なので、同じ位置でも法線や UV が
 * 違えば別の頂点になる。面のコーナーごとに鍵を作ってまとめ直す。
 */
function buildPrimitive(
  mesh: Mesh,
  smoothAngle: number,
): { position: Float32Array; normal: Float32Array; uv: Float32Array | null; index: Uint32Array } {
  const faceNormals = mesh.faceNormals();
  const uvSet = mesh.uvSets.get(UV_SET) ?? null;
  const limit = Math.cos((Math.max(0, Math.min(180, smoothAngle)) * Math.PI) / 180);

  // 頂点ごとの「滑らかな法線」。角度が開いている面はそこに混ぜない
  const smooth = new Float32Array(mesh.vertexCount * 3);
  for (let f = 0; f < mesh.faceCount; f++) {
    for (let i = mesh.faceOffsets[f]; i < mesh.faceOffsets[f + 1]; i++) {
      const v = mesh.faceCorners[i];
      smooth[v * 3] += faceNormals[f * 3];
      smooth[v * 3 + 1] += faceNormals[f * 3 + 1];
      smooth[v * 3 + 2] += faceNormals[f * 3 + 2];
    }
  }
  for (let v = 0; v < mesh.vertexCount; v++) {
    const len = Math.hypot(smooth[v * 3], smooth[v * 3 + 1], smooth[v * 3 + 2]) || 1;
    smooth[v * 3] /= len;
    smooth[v * 3 + 1] /= len;
    smooth[v * 3 + 2] /= len;
  }

  const position: number[] = [];
  const normal: number[] = [];
  const uv: number[] = [];
  const index: number[] = [];
  const seen = new Map<string, number>();

  const emit = (corner: number): number => {
    const f = faceOfCorner(mesh, corner);
    const v = mesh.faceCorners[corner];
    // 面の法線が滑らかな法線から離れていればハードエッジ。面の法線を使う
    const dot =
      faceNormals[f * 3] * smooth[v * 3] +
      faceNormals[f * 3 + 1] * smooth[v * 3 + 1] +
      faceNormals[f * 3 + 2] * smooth[v * 3 + 2];
    const hard = dot < limit;
    const n: [number, number, number] = hard
      ? [faceNormals[f * 3], faceNormals[f * 3 + 1], faceNormals[f * 3 + 2]]
      : [smooth[v * 3], smooth[v * 3 + 1], smooth[v * 3 + 2]];
    const t: [number, number] = uvSet ? [uvSet[corner * 2], uvSet[corner * 2 + 1]] : [0, 0];
    const key = `${v}|${n[0].toFixed(4)},${n[1].toFixed(4)},${n[2].toFixed(4)}|${t[0].toFixed(6)},${t[1].toFixed(6)}`;
    const found = seen.get(key);
    if (found !== undefined) return found;
    const at = position.length / 3;
    position.push(mesh.positions[v * 3], mesh.positions[v * 3 + 1], mesh.positions[v * 3 + 2]);
    normal.push(n[0], n[1], n[2]);
    uv.push(t[0], t[1]);
    seen.set(key, at);
    return at;
  };

  for (let f = 0; f < mesh.faceCount; f++) {
    const start = mesh.faceOffsets[f];
    const end = mesh.faceOffsets[f + 1];
    // 扇で三角形に割る（面の巻き方向はそのまま）
    for (let i = start + 1; i < end - 1; i++) {
      index.push(emit(start), emit(i), emit(i + 1));
    }
  }

  return {
    position: Float32Array.from(position),
    normal: Float32Array.from(normal),
    uv: uvSet ? Float32Array.from(uv) : null,
    index: Uint32Array.from(index),
  };
}

/** コーナーの位置から面番号を引く（二分探索）。 */
function faceOfCorner(mesh: Mesh, corner: number): number {
  let lo = 0;
  let hi = mesh.faceCount - 1;
  while (lo < hi) {
    const mid = (lo + hi + 1) >> 1;
    if (mesh.faceOffsets[mid] <= corner) lo = mid;
    else hi = mid - 1;
  }
  return lo;
}

/** 4 の倍数に切り上げる（glTF は 4 バイト境界を求める）。 */
function pad4(n: number): number {
  return (n + 3) & ~3;
}

/**
 * .glb を組み立てる。
 *
 * 出すのは 1 シーン・ノードごとに 1 メッシュ・1 プリミティブ。
 * マテリアルは 1 つだけ付ける（マテリアルの編集はまだ無いので既定値）。
 */
export function writeGlb(nodes: GltfNode[], options: GltfOptions = {}): Uint8Array {
  const smoothAngle = options.smoothAngle ?? 30;
  const chunks: Uint8Array[] = [];
  let offset = 0;
  const bufferViews: Array<Record<string, number>> = [];
  const accessors: Array<Record<string, unknown>> = [];

  const addView = (data: Uint8Array, target?: number): number => {
    const padded = pad4(data.byteLength);
    const block = new Uint8Array(padded);
    block.set(data);
    chunks.push(block);
    const view: Record<string, number> = { buffer: 0, byteOffset: offset, byteLength: data.byteLength };
    if (target !== undefined) view.target = target;
    bufferViews.push(view);
    offset += padded;
    return bufferViews.length - 1;
  };

  const addAccessor = (
    data: Float32Array | Uint32Array,
    type: "SCALAR" | "VEC2" | "VEC3",
    componentType: number,
    target: number,
  ): number => {
    const view = addView(new Uint8Array(data.buffer, data.byteOffset, data.byteLength), target);
    const size = type === "SCALAR" ? 1 : type === "VEC2" ? 2 : 3;
    const count = data.length / size;
    const min: number[] = new Array(size).fill(Infinity);
    const max: number[] = new Array(size).fill(-Infinity);
    for (let i = 0; i < count; i++) {
      for (let k = 0; k < size; k++) {
        const value = data[i * size + k];
        if (value < min[k]) min[k] = value;
        if (value > max[k]) max[k] = value;
      }
    }
    accessors.push({ bufferView: view, componentType, count, type, min, max });
    return accessors.length - 1;
  };

  const meshes: Array<Record<string, unknown>> = [];
  const gltfNodes: Array<Record<string, unknown>> = [];

  nodes.forEach((node) => {
    const prim = buildPrimitive(node.mesh, smoothAngle);
    const attributes: Record<string, number> = {
      // 34962 = ARRAY_BUFFER、34963 = ELEMENT_ARRAY_BUFFER
      POSITION: addAccessor(prim.position, "VEC3", 5126, 34962),
      NORMAL: addAccessor(prim.normal, "VEC3", 5126, 34962),
    };
    if (prim.uv) attributes.TEXCOORD_0 = addAccessor(prim.uv, "VEC2", 5126, 34962);
    const indices = addAccessor(prim.index, "SCALAR", 5125, 34963);
    meshes.push({ name: node.name, primitives: [{ attributes, indices, material: 0, mode: 4 }] });
    gltfNodes.push({
      name: node.name,
      mesh: meshes.length - 1,
      translation: node.position,
      rotation: node.rotation,
      scale: node.scale,
    });
  });

  const json = {
    asset: { version: "2.0", generator: options.generator ?? "macbeth" },
    scene: 0,
    scenes: [{ nodes: gltfNodes.map((_, i) => i) }],
    nodes: gltfNodes,
    meshes,
    materials: [
      {
        name: "macbeth",
        pbrMetallicRoughness: {
          baseColorFactor: [0.75, 0.78, 0.81, 1],
          metallicFactor: 0,
          roughnessFactor: 0.7,
        },
        doubleSided: true,
      },
    ],
    accessors,
    bufferViews,
    buffers: [{ byteLength: offset }],
  };

  // JSON チャンクは空白で、バイナリチャンクはゼロで 4 バイトに詰める
  const encoder = new TextEncoder();
  let jsonBytes = encoder.encode(JSON.stringify(json));
  const jsonPadded = pad4(jsonBytes.byteLength);
  if (jsonPadded !== jsonBytes.byteLength) {
    const padded = new Uint8Array(jsonPadded).fill(0x20);
    padded.set(jsonBytes);
    jsonBytes = padded;
  }
  const binLength = offset;

  const total = 12 + 8 + jsonBytes.byteLength + (binLength ? 8 + binLength : 0);
  const out = new Uint8Array(total);
  const dv = new DataView(out.buffer);
  let at = 0;
  dv.setUint32(at, 0x46546c67, true); // "glTF"
  dv.setUint32(at + 4, 2, true);
  dv.setUint32(at + 8, total, true);
  at += 12;
  dv.setUint32(at, jsonBytes.byteLength, true);
  dv.setUint32(at + 4, 0x4e4f534a, true); // "JSON"
  at += 8;
  out.set(jsonBytes, at);
  at += jsonBytes.byteLength;
  if (binLength) {
    dv.setUint32(at, binLength, true);
    dv.setUint32(at + 4, 0x004e4942, true); // "BIN"
    at += 8;
    for (const chunk of chunks) {
      out.set(chunk, at);
      at += chunk.byteLength;
    }
  }
  return out;
}

/** シーンのオブジェクトから書き出し用のノードを作る。 */
export function nodesFromObjects(objects: SceneObject[]): GltfNode[] {
  return objects
    .filter((o) => o.visible && o.mesh.faceCount > 0)
    .map((o) => ({
      name: o.name,
      mesh: o.mesh,
      position: [...o.transform.position] as [number, number, number],
      rotation: [...o.transform.rotation] as [number, number, number, number],
      scale: [...o.transform.scale] as [number, number, number],
    }));
}
