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

/** accessorOf は VEC4 を知らないので、接線用に別口で読む。 */
function vec4Of(json: any, bin: Uint8Array<ArrayBufferLike>, index: number): Float32Array {
  const acc = json.accessors[index];
  const view = json.bufferViews[acc.bufferView];
  expect(acc.type).toBe("VEC4");
  return new Float32Array(bin.buffer as ArrayBuffer, bin.byteOffset + (view.byteOffset ?? 0), acc.count * 4);
}

/** バッファビューの生バイト。埋めた PNG を取り出すのに使う。 */
function viewBytes(json: any, bin: Uint8Array<ArrayBufferLike>, index: number): Uint8Array {
  const view = json.bufferViews[index];
  const start = (view.byteOffset ?? 0);
  return bin.subarray(start, start + view.byteLength);
}

const png = (tag: number, length = 40) => Uint8Array.from({ length }, (_, i) => (i === 0 ? tag : (i * 7 + tag) % 256));

describe("G4. 焼いた絵を添える（`48` の T2）", () => {
  it("絵を渡さなければ今までどおり（マテリアル 1 つ・画像なし・接線なし）", () => {
    const { json } = readGlb(writeGlb([node(), node()]));
    expect(json.materials.length).toBe(1);
    expect(json.images).toBeUndefined();
    expect(json.textures).toBeUndefined();
    expect(json.meshes[0].primitives[0].material).toBe(0);
    expect(json.meshes[0].primitives[0].attributes.TANGENT).toBeUndefined();
  });

  it("法線と AO を渡すと、画像 2 枚とノードごとのマテリアルができる", () => {
    const a: GltfNode = { ...node(), name: "Head", maps: { normal: png(1), occlusion: png(2) } };
    const b: GltfNode = { ...node(), name: "Body" };
    const { json } = readGlb(writeGlb([a, b]));
    expect(json.images.length).toBe(2);
    expect(json.textures.length).toBe(2);
    expect(json.samplers.length).toBe(1);
    // 絵のあるノードとないノードで、別のマテリアルになる
    expect(json.materials.length).toBe(2);
    const head = json.materials[json.meshes[0].primitives[0].material];
    const body = json.materials[json.meshes[1].primitives[0].material];
    expect(head.normalTexture.index).not.toBe(head.occlusionTexture.index);
    expect(body.normalTexture).toBeUndefined();
    expect(json.images[0].mimeType).toBe("image/png");
  });

  it("埋めた PNG は 1 バイトも変わらずに出てくる", () => {
    const normal = png(1, 37); // 4 の倍数でない長さ（詰め物が混ざらないか）
    const occlusion = png(2, 64);
    const { json, bin } = readGlb(writeGlb([{ ...node(), maps: { normal, occlusion } }]));
    expect([...viewBytes(json, bin, json.images[0].bufferView)]).toEqual([...normal]);
    expect([...viewBytes(json, bin, json.images[1].bufferView)]).toEqual([...occlusion]);
  });

  it("接線は VEC4 で、w は ±1・法線と直交する", () => {
    const { json, bin } = readGlb(writeGlb([{ ...node(), maps: { normal: png(1) } }]));
    const prim = json.meshes[0].primitives[0];
    const tangent = vec4Of(json, bin, prim.attributes.TANGENT);
    const normal = accessorOf(json, bin, prim.attributes.NORMAL);
    expect(tangent.length / 4).toBe(normal.length / 3);
    for (let i = 0; i < tangent.length / 4; i++) {
      const t = [tangent[i * 4], tangent[i * 4 + 1], tangent[i * 4 + 2]];
      const n = [normal[i * 3], normal[i * 3 + 1], normal[i * 3 + 2]];
      expect(Math.abs(tangent[i * 4 + 3])).toBe(1);
      expect(Math.hypot(t[0], t[1], t[2])).toBeCloseTo(1, 5);
      expect(t[0] * n[0] + t[1] * n[1] + t[2] * n[2]).toBeCloseTo(0, 5);
    }
  });

  it("絵を添えると角で割らない（焼いたときと同じなめらかな法線）", () => {
    const plain = readGlb(writeGlb([node()], { smoothAngle: 30 }));
    const withMap = readGlb(writeGlb([{ ...node(), maps: { normal: png(1) } }], { smoothAngle: 30 }));
    const count = (r: { json: any; bin: Uint8Array<ArrayBufferLike> }) =>
      accessorOf(r.json, r.bin, r.json.meshes[0].primitives[0].attributes.POSITION).length / 3;
    expect(count(plain)).toBe(24); // 面ごとに割れる
    expect(count(withMap)).toBeLessThan(24); // なめらかなのでまとまる
  });

  it("V をひっくり返して出す（glTF は (0,0) が画像の左上）", () => {
    const mesh = PRIMITIVES.plane.build({ ...defaultParams("plane"), sdW: 1, sdH: 1 });
    const { json, bin } = readGlb(writeGlb([node(mesh)]));
    const uv = accessorOf(json, bin, json.meshes[0].primitives[0].attributes.TEXCOORD_0);
    const source = mesh.uvSets.get("map1")!;
    // 元の v と足して 1 になる組が、どの頂点にも必ずある
    for (let i = 0; i < uv.length / 2; i++) {
      expect(uv[i * 2 + 1]).toBeGreaterThanOrEqual(-1e-6);
      expect(uv[i * 2 + 1]).toBeLessThanOrEqual(1 + 1e-6);
    }
    const flipped = new Set<string>();
    for (let c = 0; c < source.length / 2; c++) flipped.add(`${source[c * 2].toFixed(3)},${(1 - source[c * 2 + 1]).toFixed(3)}`);
    for (let i = 0; i < uv.length / 2; i++) {
      expect(flipped.has(`${uv[i * 2].toFixed(3)},${uv[i * 2 + 1].toFixed(3)}`)).toBe(true);
    }
  });
});
