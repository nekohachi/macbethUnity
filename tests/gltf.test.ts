/**
 * glTF（.glb）の書き出し（`12` の Phase E2）。
 *
 * 見るのは 4 つ。容器の形（マジックとチャンク）、中身が読み戻せること、
 * 位置・法線・UV が合っていること、ハードエッジで頂点が分かれること。
 */
import { describe, expect, it } from "vitest";
import { PRIMITIVES, defaultParams } from "../src/core/primitives.js";
import { writeGlb, nodesFromObjects, type GltfNode } from "../src/core/io/gltf.js";
import { Document } from "../src/core/document.js";

const cube = () => PRIMITIVES.cube.build(defaultParams("cube"));

/** .glb を JSON とバイナリに戻す。 */
function readGlb(bytes: Uint8Array): { json: any; bin: Uint8Array<ArrayBufferLike> } {
  const dv = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);
  expect(dv.getUint32(0, true)).toBe(0x46546c67);
  expect(dv.getUint32(4, true)).toBe(2);
  expect(dv.getUint32(8, true)).toBe(bytes.byteLength);
  let at = 12;
  let json: any = null;
  let bin: Uint8Array<ArrayBufferLike> = new Uint8Array(0);
  while (at < bytes.byteLength) {
    const length = dv.getUint32(at, true);
    const kind = dv.getUint32(at + 4, true);
    const body = bytes.subarray(at + 8, at + 8 + length);
    if (kind === 0x4e4f534a) json = JSON.parse(new TextDecoder().decode(body));
    else bin = body;
    at += 8 + length;
  }
  return { json, bin };
}

/** アクセサを取り出す。 */
function accessorOf(json: any, bin: Uint8Array<ArrayBufferLike>, index: number): Float32Array | Uint32Array {
  const acc = json.accessors[index];
  const view = json.bufferViews[acc.bufferView];
  const size = acc.type === "SCALAR" ? 1 : acc.type === "VEC2" ? 2 : 3;
  const start = bin.byteOffset + (view.byteOffset ?? 0);
  const buffer = bin.buffer as ArrayBuffer;
  return acc.componentType === 5126
    ? new Float32Array(buffer, start, acc.count * size)
    : new Uint32Array(buffer, start, acc.count * size);
}

const node = (mesh = cube()): GltfNode => ({
  name: "Cube1",
  mesh,
  position: [1, 2, 3],
  rotation: [0, 0, 0, 1],
  scale: [1, 1, 1],
});

describe("G1. .glb の容器", () => {
  it("マジック・版・長さが合っていて、JSON と BIN が入っている", () => {
    const { json, bin } = readGlb(writeGlb([node()]));
    expect(json.asset.version).toBe("2.0");
    expect(json.scenes.length).toBe(1);
    expect(json.nodes.length).toBe(1);
    expect(json.meshes.length).toBe(1);
    expect(bin.byteLength).toBeGreaterThan(0);
    // バイナリの長さは宣言と一致する
    expect(bin.byteLength).toBeGreaterThanOrEqual(json.buffers[0].byteLength);
  });

  it("ノードのトランスフォームがそのまま出る", () => {
    const { json } = readGlb(writeGlb([node()]));
    expect(json.nodes[0].translation).toEqual([1, 2, 3]);
    expect(json.nodes[0].rotation).toEqual([0, 0, 0, 1]);
    expect(json.nodes[0].scale).toEqual([1, 1, 1]);
    expect(json.nodes[0].name).toBe("Cube1");
  });
});

describe("G2. 中身", () => {
  it("立方体は三角形 12 枚、位置は元のまま", () => {
    const mesh = cube();
    const { json, bin } = readGlb(writeGlb([node(mesh)]));
    const prim = json.meshes[0].primitives[0];
    const index = accessorOf(json, bin, prim.indices);
    expect(index.length).toBe(12 * 3);

    const position = accessorOf(json, bin, prim.attributes.POSITION);
    // 元の頂点はすべて出てくる（法線と UV で分かれるので数は増える）
    const wanted = new Set<string>();
    for (let v = 0; v < mesh.vertexCount; v++) {
      wanted.add(
        `${mesh.positions[v * 3].toFixed(4)},${mesh.positions[v * 3 + 1].toFixed(4)},${mesh.positions[v * 3 + 2].toFixed(4)}`,
      );
    }
    const got = new Set<string>();
    for (let i = 0; i < position.length / 3; i++) {
      got.add(`${position[i * 3].toFixed(4)},${position[i * 3 + 1].toFixed(4)},${position[i * 3 + 2].toFixed(4)}`);
    }
    for (const key of wanted) expect(got.has(key)).toBe(true);
  });

  it("UV が入っていて 0〜1 に収まる", () => {
    const { json, bin } = readGlb(writeGlb([node()]));
    const prim = json.meshes[0].primitives[0];
    expect(prim.attributes.TEXCOORD_0).toBeDefined();
    const uv = accessorOf(json, bin, prim.attributes.TEXCOORD_0);
    for (let i = 0; i < uv.length; i++) {
      expect(uv[i]).toBeGreaterThanOrEqual(-1e-4);
      expect(uv[i]).toBeLessThanOrEqual(1 + 1e-4);
    }
  });

  it("立方体はハードエッジなので、頂点は面ごとに分かれる（8 点 → 24 点）", () => {
    const { json, bin } = readGlb(writeGlb([node()], { smoothAngle: 30 }));
    const prim = json.meshes[0].primitives[0];
    const position = accessorOf(json, bin, prim.attributes.POSITION);
    expect(position.length / 3).toBe(24);
    // 法線は 6 種類（面の向き）
    const normal = accessorOf(json, bin, prim.attributes.NORMAL);
    const kinds = new Set<string>();
    for (let i = 0; i < normal.length / 3; i++) {
      kinds.add(`${normal[i * 3].toFixed(2)},${normal[i * 3 + 1].toFixed(2)},${normal[i * 3 + 2].toFixed(2)}`);
    }
    expect(kinds.size).toBe(6);
  });

  it("滑らかにすると頂点はまとまる（球）", () => {
    const mesh = PRIMITIVES.sphere.build({ ...defaultParams("sphere"), sdAxis: 8, sdHeight: 6 });
    const { json, bin } = readGlb(writeGlb([node(mesh)], { smoothAngle: 180 }));
    const prim = json.meshes[0].primitives[0];
    const position = accessorOf(json, bin, prim.attributes.POSITION);
    // UV の継ぎ目で分かれるぶんだけ増えるが、面ごとにバラけたりはしない
    expect(position.length / 3).toBeLessThan(mesh.faceCount * 4);
  });
});

describe("G3. シーンから", () => {
  it("見えているオブジェクトだけを出す", () => {
    const doc = new Document();
    const a = doc.addObject("cube");
    const b = doc.addObject("sphere");
    b.visible = false;
    const nodes = nodesFromObjects(doc.objects);
    expect(nodes.length).toBe(1);
    expect(nodes[0].name).toBe(a.name);

    const { json } = readGlb(writeGlb(nodes));
    expect(json.nodes.length).toBe(1);
    expect(json.materials.length).toBe(1);
  });
});
