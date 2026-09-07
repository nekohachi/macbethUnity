/**
 * メッシュのバイナリ形式。docs/11 の表そのまま。
 *
 * 各フィールドはチャンクとして並べる。未知のチャンクは読み飛ばせるので、
 * 後からフィールドを足しても古い版のファイルが読める。
 *
 * レイアウト:
 *   magic "MBMESH\0\0" (8) | version u32 | chunkCount u32
 *   チャンクごと: tag(4 バイトの ASCII) | byteLength u32 | データ（4 バイト境界に整列）
 */
import { Mesh, type UvSet } from "../mesh.js";

const MAGIC = "MBMESH\0\0";
export const MESH_BINARY_VERSION = 1;

interface Chunk {
  tag: string;
  data: Uint8Array;
}

function align4(n: number): number {
  return (n + 3) & ~3;
}

function encodeChunks(chunks: Chunk[]): Uint8Array {
  let total = 16;
  for (const c of chunks) total += 8 + align4(c.data.byteLength);
  const out = new Uint8Array(total);
  const view = new DataView(out.buffer);
  for (let i = 0; i < 8; i++) out[i] = MAGIC.charCodeAt(i);
  view.setUint32(8, MESH_BINARY_VERSION, true);
  view.setUint32(12, chunks.length, true);
  let off = 16;
  for (const c of chunks) {
    for (let i = 0; i < 4; i++) out[off + i] = c.tag.charCodeAt(i);
    view.setUint32(off + 4, c.data.byteLength, true);
    out.set(c.data, off + 8);
    off += 8 + align4(c.data.byteLength);
  }
  return out;
}

function decodeChunks(bytes: Uint8Array): { version: number; chunks: Map<string, Uint8Array> } {
  for (let i = 0; i < 8; i++) {
    if (bytes[i] !== MAGIC.charCodeAt(i)) throw new Error("メッシュのバイナリ形式ではありません");
  }
  const view = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);
  const version = view.getUint32(8, true);
  const count = view.getUint32(12, true);
  const chunks = new Map<string, Uint8Array>();
  let off = 16;
  for (let i = 0; i < count; i++) {
    let tag = "";
    for (let k = 0; k < 4; k++) tag += String.fromCharCode(bytes[off + k]);
    const len = view.getUint32(off + 4, true);
    chunks.set(tag, bytes.subarray(off + 8, off + 8 + len));
    off += 8 + align4(len);
  }
  return { version, chunks };
}

/** 型付き配列をバイト列に写す。バイト境界がずれている可能性があるのでコピーする。 */
function toBytes(arr: ArrayBufferView): Uint8Array {
  return new Uint8Array(arr.buffer.slice(arr.byteOffset, arr.byteOffset + arr.byteLength));
}
function asF32(b: Uint8Array): Float32Array {
  return new Float32Array(b.buffer.slice(b.byteOffset, b.byteOffset + b.byteLength));
}
function asU32(b: Uint8Array): Uint32Array {
  return new Uint32Array(b.buffer.slice(b.byteOffset, b.byteOffset + b.byteLength));
}
function asU16(b: Uint8Array): Uint16Array {
  return new Uint16Array(b.buffer.slice(b.byteOffset, b.byteOffset + b.byteLength));
}

const encoder = new TextEncoder();
const decoder = new TextDecoder();

export function encodeMesh(mesh: Mesh): Uint8Array {
  const chunks: Chunk[] = [
    { tag: "POSI", data: toBytes(mesh.positions) },
    { tag: "FOFF", data: toBytes(mesh.faceOffsets) },
    { tag: "FCOR", data: toBytes(mesh.faceCorners) },
  ];
  if (mesh.polygroup.some((x) => x !== 0)) chunks.push({ tag: "PGRP", data: toBytes(mesh.polygroup) });
  if (mesh.materialId.some((x) => x !== 0)) chunks.push({ tag: "MTID", data: toBytes(mesh.materialId) });
  if (mesh.vertexColor) chunks.push({ tag: "VCOL", data: toBytes(mesh.vertexColor) });

  // クリースは USD と同じく「頂点ペア + 鋭さ」の 2 本の配列にする
  if (mesh.crease.size) {
    const idx = new Uint32Array(mesh.crease.size * 2);
    const sharp = new Float32Array(mesh.crease.size);
    let i = 0;
    for (const [key, value] of mesh.crease) {
      const [a, b] = key.split("_").map(Number);
      idx[i * 2] = a;
      idx[i * 2 + 1] = b;
      sharp[i] = value;
      i++;
    }
    chunks.push({ tag: "CRID", data: toBytes(idx) }, { tag: "CRSH", data: toBytes(sharp) });
  }
  if (mesh.cornerSharp.size) {
    const idx = new Uint32Array(mesh.cornerSharp.size);
    const sharp = new Float32Array(mesh.cornerSharp.size);
    let i = 0;
    for (const [v, s] of mesh.cornerSharp) {
      idx[i] = v;
      sharp[i] = s;
      i++;
    }
    chunks.push({ tag: "CNID", data: toBytes(idx) }, { tag: "CNSH", data: toBytes(sharp) });
  }
  // UV セットは名前を JSON で持ち、データを順に並べる
  if (mesh.uvSets.size) {
    const names = Array.from(mesh.uvSets.keys());
    chunks.push({ tag: "UVNM", data: encoder.encode(JSON.stringify(names)) });
    names.forEach((name, i) => {
      chunks.push({ tag: `UV${String(i).padStart(2, "0")}`, data: toBytes(mesh.uvSets.get(name)!) });
      void name;
    });
  }
  return encodeChunks(chunks);
}

export function decodeMesh(bytes: Uint8Array): Mesh {
  const { version, chunks } = decodeChunks(bytes);
  if (version > MESH_BINARY_VERSION) {
    throw new Error(`このメッシュは新しい版 (v${version}) で保存されています。アプリを更新してください`);
  }
  const positions = asF32(chunks.get("POSI")!);
  const faceOffsets = asU32(chunks.get("FOFF")!);
  const faceCorners = asU32(chunks.get("FCOR")!);

  const uvSets = new Map<string, UvSet>();
  const nameChunk = chunks.get("UVNM");
  if (nameChunk) {
    const names = JSON.parse(decoder.decode(nameChunk)) as string[];
    names.forEach((name, i) => {
      const data = chunks.get(`UV${String(i).padStart(2, "0")}`);
      if (data) uvSets.set(name, asF32(data));
    });
  }

  const crease = new Map<string, number>();
  const crid = chunks.get("CRID");
  const crsh = chunks.get("CRSH");
  if (crid && crsh) {
    const idx = asU32(crid);
    const sharp = asF32(crsh);
    for (let i = 0; i < sharp.length; i++) {
      const a = idx[i * 2];
      const b = idx[i * 2 + 1];
      crease.set(a < b ? `${a}_${b}` : `${b}_${a}`, sharp[i]);
    }
  }
  const cornerSharp = new Map<number, number>();
  const cnid = chunks.get("CNID");
  const cnsh = chunks.get("CNSH");
  if (cnid && cnsh) {
    const idx = asU32(cnid);
    const sharp = asF32(cnsh);
    for (let i = 0; i < sharp.length; i++) cornerSharp.set(idx[i], sharp[i]);
  }

  const faceCount = Math.max(0, faceOffsets.length - 1);
  const pgrp = chunks.get("PGRP");
  const mtid = chunks.get("MTID");
  const vcol = chunks.get("VCOL");
  return new Mesh(positions, faceOffsets, faceCorners, {
    uvSets,
    crease,
    cornerSharp,
    polygroup: pgrp ? asU16(pgrp) : new Uint16Array(faceCount),
    materialId: mtid ? asU16(mtid) : new Uint16Array(faceCount),
    vertexColor: vcol ? new Uint8Array(vcol) : null,
  });
}
