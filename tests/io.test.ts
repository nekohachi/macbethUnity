import { unzipSync, zipSync } from "fflate";
import { describe, expect, it } from "vitest";
import { PRIMITIVES } from "../src/core/primitives.js";
import { parseObj, writeObj } from "../src/core/io/obj.js";
import { decodeMesh, encodeMesh } from "../src/core/io/binary.js";
import { compareTopology, topologyHash } from "../src/core/io/hash.js";
import { packMbz, unpackMbz } from "../src/core/io/mbz.js";
import { Document } from "../src/core/document.js";
import { insertEdgeLoop } from "../src/core/topology.js";

const cube = () => PRIMITIVES.cube.build({ width: 1, height: 1, depth: 1, sdW: 1, sdH: 1, sdD: 1 });

describe("OBJ", () => {
  it("複数オブジェクト、n-gon、負のインデックスを読める", () => {
    const text = [
      "# t",
      "o cubeA",
      "v -1 -1 -1",
      "v 1 -1 -1",
      "v 1 1 -1",
      "v -1 1 -1",
      "v -1 -1 1",
      "v 1 -1 1",
      "v 1 1 1",
      "v -1 1 1",
      "f 1/1/1 2/2/2 3/3/3 4/4/4",
      "f 5 8 7 6",
      "f 1 5 6 2",
      "f 2 6 7 3",
      "f 3 7 8 4",
      "f 5 1 4 8",
      "o pent",
      "v 0 0 5",
      "v 1 0 5",
      "v 1.5 1 5",
      "v 0.5 2 5",
      "v -0.5 1 5",
      "f -5 -4 -3 -2 -1",
    ].join("\n");
    const objs = parseObj(text);
    expect(objs).toHaveLength(2);
    expect(objs[0].name).toBe("cubeA");
    expect(objs[0].mesh.stats()).toMatchObject({ vertices: 8, faces: 6 });
    expect(objs[1].mesh.stats()).toMatchObject({ vertices: 5, faces: 1 });
  });

  it("g をポリグループとして読む", () => {
    const text = ["v 0 0 0", "v 1 0 0", "v 1 1 0", "v 0 1 0", "g first", "f 1 2 3", "g second", "f 1 3 4"].join("\n");
    const objs = parseObj(text);
    expect(objs).toHaveLength(1);
    expect(Array.from(objs[0].mesh.polygroup)).toEqual([0, 1]);
  });

  it("書き出して読み直すと形が保たれる", () => {
    const m = cube();
    const objs = parseObj(writeObj([{ name: "cube", mesh: m }]));
    expect(objs[0].mesh.stats()).toMatchObject({ vertices: 8, faces: 6 });
  });

  it("ポリグループと UV が往復する", () => {
    const m = PRIMITIVES.plane.build({ width: 2, height: 2, sdW: 2, sdH: 2 });
    m.polygroup[0] = 1;
    m.polygroup[3] = 2;
    const back = parseObj(writeObj([{ name: "p", mesh: m }]))[0].mesh;
    expect(back.faceCount).toBe(m.faceCount);
    expect(new Set(Array.from(back.polygroup)).size).toBe(3);
    expect(back.uvSets.get("map1")).toBeDefined();
  });
});

describe("メッシュのバイナリ", () => {
  it("すべてのフィールドが往復する", () => {
    const m = PRIMITIVES.plane.build({ width: 2, height: 2, sdW: 2, sdH: 2 });
    const [a, b] = m.edges()[0];
    m.setCrease(a, b, 4.5);
    m.cornerSharp.set(0, 2.5);
    m.polygroup[1] = 7;
    m.materialId[2] = 3;

    const back = decodeMesh(encodeMesh(m));
    expect(back.stats()).toEqual(m.stats());
    expect(back.getCrease(a, b)).toBeCloseTo(4.5, 5);
    expect(back.cornerSharp.get(0)).toBeCloseTo(2.5, 5);
    expect(back.polygroup[1]).toBe(7);
    expect(back.materialId[2]).toBe(3);
    expect(Array.from(back.uvSets.get("map1")!)).toEqual(Array.from(m.uvSets.get("map1")!));
    for (let v = 0; v < m.vertexCount; v++) expect(back.getPosition(v)).toEqual(m.getPosition(v));
  });

  it("空のメッシュでも壊れない", () => {
    const m = PRIMITIVES.cube.build({ width: 1, height: 1, depth: 1, sdW: 1, sdH: 1, sdD: 1 });
    m.uvSets.clear();
    const back = decodeMesh(encodeMesh(m));
    expect(back.uvSets.size).toBe(0);
    expect(back.faceCount).toBe(6);
  });
});

describe("トポロジのハッシュ", () => {
  it("同じメッシュは同じハッシュ", () => {
    expect(topologyHash(cube())).toBe(topologyHash(cube()));
  });

  it("座標を動かしてもハッシュは変わらない（外部で形を変えて戻る前提）", () => {
    const m = cube();
    const h = topologyHash(m);
    m.setPosition(0, 5, 5, 5);
    expect(topologyHash(m)).toBe(h);
    expect(compareTopology(cube(), m).same).toBe(true);
  });

  it("トポロジが変わるとハッシュも変わる", () => {
    const m = cube();
    const [a, b] = m.edges()[0];
    const cut = insertEdgeLoop(m, a, b, 0.5)!.mesh;
    expect(topologyHash(cut)).not.toBe(topologyHash(m));
    expect(compareTopology(m, cut).same).toBe(false);
  });

  it("面の並びが変われば検出される", () => {
    const m = cube();
    const swapped = m.clone();
    // 面 0 のコーナーを回転させる（頂点数も面数も同じだが並びが違う）
    const s = swapped.faceOffsets[0];
    const n = swapped.faceSize(0);
    const verts = swapped.faceVerts(0);
    for (let i = 0; i < n; i++) swapped.faceCorners[s + i] = verts[(i + 1) % n];
    expect(compareTopology(m, swapped)).toMatchObject({ same: false, reason: "faceOrder" });
  });
});

describe(".mbz", () => {
  it("シーンが往復する", () => {
    const doc = new Document();
    const a = doc.addObject("cube");
    a.transform.position = [1, 2, 3];
    a.params.sdW = 2;
    a.rebuild();
    const b = doc.addObject("sphere");
    b.name = "MySphere";
    b.visible = false;

    const { document: back, manifest } = unpackMbz(packMbz(doc));
    expect(manifest.formatVersion).toBe(1);
    expect(back.objects).toHaveLength(2);
    expect(back.objects[0].transform.position).toEqual([1, 2, 3]);
    expect(back.objects[0].mesh.stats()).toEqual(a.mesh.stats());
    expect(back.objects[1].name).toBe("MySphere");
    expect(back.objects[1].visible).toBe(false);
  });

  it("マルチ解像度のデルタとスカルプトレイヤーが往復する", () => {
    const doc = new Document();
    const o = doc.addObject("cube");
    o.multires = [{ level: 1, delta: new Float32Array([0.1, 0.2, 0.3, 0.4]) }];
    o.sculptLayers = [
      { id: "L1", name: "しわ", level: 1, weight: 0.7, visible: true, delta: new Float32Array([1, 2, 3]) },
    ];

    const { document: back } = unpackMbz(packMbz(doc));
    expect(Array.from(back.objects[0].multires[0].delta)).toEqual([
      0.10000000149011612, 0.20000000298023224, 0.30000001192092896, 0.4000000059604645,
    ]);
    expect(back.objects[0].sculptLayers[0]).toMatchObject({ name: "しわ", level: 1, weight: 0.7, visible: true });
  });

  it("マスクが段ごと往復する（`34` の T2）", () => {
    const doc = new Document();
    const o = doc.addObject("cube");
    o.multires = [
      { level: 1, delta: new Float32Array(24) },
      { level: 2, delta: new Float32Array(96) },
    ];
    o.mask = { level: 2, values: new Float32Array([0, 0.25, 0.5, 1]) };

    const { document: back } = unpackMbz(packMbz(doc));
    expect(back.objects[0].mask?.level).toBe(2);
    expect(Array.from(back.objects[0].mask!.values)).toEqual([0, 0.25, 0.5, 1]);
  });

  it("マスクが無ければファイルも作らない（古いファイルも読める）", () => {
    const doc = new Document();
    doc.addObject("cube");
    const bytes = packMbz(doc);
    const files = unzipSync(bytes);
    expect(Object.keys(files).some((k) => k.startsWith("mask/"))).toBe(false);
    // 読み戻しても null のまま
    expect(unpackMbz(bytes).document.objects[0].mask).toBe(null);
  });

  it("トポロジを変えるとマスクを捨て、そう言う", () => {
    const doc = new Document();
    const o = doc.addObject("cube");
    o.multires = [{ level: 1, delta: new Float32Array(24) }];
    o.mask = { level: 1, values: new Float32Array([1, 1, 1]) };
    const dropped = o.markTopologyChanged();
    expect(dropped.droppedMask).toBe(true);
    expect(o.mask).toBe(null);
    // 元々無ければ「捨てた」とは言わない
    expect(doc.addObject("cube").markTopologyChanged().droppedMask).toBe(false);
  });

  it("追加ファイル（テクスチャなど）が保たれる", () => {
    const doc = new Document();
    doc.addObject("cube");
    const extra = new Map([["textures/base.png", new Uint8Array([1, 2, 3, 4])]]);
    const { extraFiles } = unpackMbz(packMbz(doc, { extraFiles: extra }));
    expect(Array.from(extraFiles.get("textures/base.png")!)).toEqual([1, 2, 3, 4]);
  });

  it("新しい版のファイルは読まずにエラーを出す", () => {
    const doc = new Document();
    doc.addObject("cube");
    const bytes = packMbz(doc);
    // manifest の formatVersion を 99 に書き換える
    const files = unzipSync(bytes);
    const manifest = JSON.parse(new TextDecoder().decode(files["manifest.json"]));
    manifest.formatVersion = 99;
    files["manifest.json"] = new TextEncoder().encode(JSON.stringify(manifest));
    expect(() => unpackMbz(zipSync(files))).toThrow(/新しい版/);
  });
});
