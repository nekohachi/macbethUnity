/**
 * .mbz — 作業用のプロジェクト形式。docs/11 の 1 章。
 *
 * zip の中に manifest.json、scene.json、メッシュとレイヤーのバイナリを入れる。
 * formatVersion を最初から持ち、版が上がるたびに変換関数を足す。
 * 変換関数は必ず 1 段ずつ（v1 → v2 → v3）書くこと。まとめて飛ばさない。
 */
import { unzipSync, zipSync } from "fflate";
import {
  Document,
  SceneObject,
  identityTransform,
  type BakeRecipe,
  type MultiresLevel,
  type SculptLayer,
} from "../document.js";
import { deserializeRecipe, serializeRecipe, type UvRecipeJson } from "../uv/recipe.js";
import { decodeMesh, encodeMesh } from "./binary.js";
import { topologyHash } from "./hash.js";

export const MBZ_FORMAT_VERSION = 1;

export interface MbzManifest {
  formatVersion: number;
  app: string;
  appVersion: string;
  created: string;
  modified: string;
  thumbnail?: string;
}

interface SceneObjectJson {
  id: string;
  name: string;
  kind: string;
  parametric: boolean;
  params: Record<string, number>;
  transform: ReturnType<typeof identityTransform>;
  visible: boolean;
  locked?: boolean;
  /** 不透明度（`25` の T4）。無ければ 1。 */
  opacity?: number;
  activeLevel: number;
  exportedTopologyHash: string | null;
  multires: Array<{ level: number; count: number }>;
  sculptLayers: Array<Omit<SculptLayer, "delta"> & { count: number }>;
  paintLayers: SceneObject["paintLayers"];
  /**
   * マスクを持っている段（`34` の T2）。無ければ `null` か省略。
   * 中身は `mask/<id>.bin`（f32）。
   */
  maskLevel?: number | null;
  /** UV の作り方（`15`）。無い版のファイルもあるので任意。 */
  uv?: UvRecipeJson | null;
  /** 焼き方（`44` の T2）。大きさと指紋だけ。焼いた絵そのものは入れない。 */
  bake?: BakeRecipe | null;
}

interface SceneJson {
  objects: SceneObjectJson[];
  settings: Record<string, unknown>;
  cameraBookmarks: Document["cameraBookmarks"];
  /** ビューポートの分割（`25` の T6）。無い版のファイルもあるので任意。 */
  layout?: Document["layout"];
}

const encoder = new TextEncoder();
const decoder = new TextDecoder();

function f32ToBytes(a: Float32Array): Uint8Array {
  return new Uint8Array(a.buffer.slice(a.byteOffset, a.byteOffset + a.byteLength));
}
function bytesToF32(b: Uint8Array): Float32Array {
  return new Float32Array(b.buffer.slice(b.byteOffset, b.byteOffset + b.byteLength));
}

export interface PackOptions {
  appVersion?: string;
  /** PNG のバイト列。プロジェクト一覧の見出しに使う。 */
  thumbnail?: Uint8Array;
  /** 読み込んだ外部テクスチャなど。パス → バイト列。 */
  extraFiles?: Map<string, Uint8Array>;
}

export function packMbz(doc: Document, options: PackOptions = {}): Uint8Array {
  const files: Record<string, Uint8Array> = {};
  const now = new Date().toISOString();

  const scene: SceneJson = {
    objects: doc.objects.map((o) => {
      files[`meshes/${o.id}.bin`] = encodeMesh(o.mesh);
      for (const level of o.multires) {
        files[`multires/${o.id}/L${level.level}.bin`] = f32ToBytes(level.delta);
      }
      for (const layer of o.sculptLayers) {
        files[`layers/${o.id}/${layer.id}.bin`] = f32ToBytes(layer.delta);
      }
      // マスク（`34` の T2）。無ければファイルも作らない
      if (o.mask) files[`mask/${o.id}.bin`] = f32ToBytes(o.mask.values);
      return {
        id: o.id,
        name: o.name,
        kind: o.kind,
        parametric: o.parametric,
        params: o.params,
        transform: o.transform,
        visible: o.visible,
        locked: o.locked,
        opacity: o.opacity,
        activeLevel: o.activeLevel,
        exportedTopologyHash: o.exportedTopologyHash,
        multires: o.multires.map((m) => ({ level: m.level, count: m.delta.length })),
        sculptLayers: o.sculptLayers.map((l) => ({
          id: l.id,
          name: l.name,
          level: l.level,
          weight: l.weight,
          visible: l.visible,
          count: l.delta.length,
        })),
        paintLayers: o.paintLayers,
        maskLevel: o.mask ? o.mask.level : null,
        uv: o.uv ? serializeRecipe(o.uv) : null,
        bake: o.bake ? { ...o.bake } : null,
      };
    }),
    settings: doc.settings,
    cameraBookmarks: doc.cameraBookmarks,
    layout: doc.layout,
  };

  const manifest: MbzManifest = {
    formatVersion: MBZ_FORMAT_VERSION,
    app: "macbeth",
    appVersion: options.appVersion ?? "0.1.0",
    created: now,
    modified: now,
  };
  if (options.thumbnail) {
    files["thumbnail.png"] = options.thumbnail;
    manifest.thumbnail = "thumbnail.png";
  }
  if (options.extraFiles) for (const [path, data] of options.extraFiles) files[path] = data;

  files["manifest.json"] = encoder.encode(JSON.stringify(manifest, null, 2));
  files["scene.json"] = encoder.encode(JSON.stringify(scene));
  // メッシュのバイナリは既に密なので、圧縮の手間を掛けすぎない
  return zipSync(files, { level: 6 });
}

/* ---- 版の変換 ---------------------------------------------------------- */

type Migration = (scene: SceneJson, files: Record<string, Uint8Array>) => SceneJson;

/**
 * 版 n のシーンを版 n+1 に上げる関数。版を上げたらここに 1 つ足す。
 * 例: MIGRATIONS[1] は v1 を v2 にする。
 */
const MIGRATIONS: Record<number, Migration> = {};

function migrate(scene: SceneJson, files: Record<string, Uint8Array>, from: number): SceneJson {
  let current = scene;
  for (let v = from; v < MBZ_FORMAT_VERSION; v++) {
    const step = MIGRATIONS[v];
    if (!step) throw new Error(`版 ${v} から ${v + 1} への変換がありません`);
    current = step(current, files);
  }
  return current;
}

export interface UnpackResult {
  document: Document;
  manifest: MbzManifest;
  /** 未使用のファイル（テクスチャなど）。 */
  extraFiles: Map<string, Uint8Array>;
}

export function unpackMbz(bytes: Uint8Array): UnpackResult {
  const files = unzipSync(bytes);
  const manifestBytes = files["manifest.json"];
  if (!manifestBytes) throw new Error("manifest.json がありません。macbeth のプロジェクトではないようです");
  const manifest = JSON.parse(decoder.decode(manifestBytes)) as MbzManifest;
  if (manifest.formatVersion > MBZ_FORMAT_VERSION) {
    throw new Error(
      `このプロジェクトは新しい版 (v${manifest.formatVersion}) で保存されています。アプリを更新してください`,
    );
  }
  let scene = JSON.parse(decoder.decode(files["scene.json"])) as SceneJson;
  if (manifest.formatVersion < MBZ_FORMAT_VERSION) scene = migrate(scene, files, manifest.formatVersion);

  const doc = new Document();
  doc.settings = scene.settings ?? {};
  doc.cameraBookmarks = scene.cameraBookmarks ?? [];
  doc.layout = scene.layout ?? null;
  const consumed = new Set<string>(["manifest.json", "scene.json"]);

  for (const j of scene.objects) {
    const o = new SceneObject(j.kind, j.id, j.name);
    o.parametric = j.parametric;
    o.params = j.params;
    o.transform = j.transform ?? identityTransform();
    o.visible = j.visible ?? true;
    o.locked = j.locked ?? false;
    o.opacity = typeof j.opacity === "number" ? Math.max(0, Math.min(1, j.opacity)) : 1;
    o.activeLevel = j.activeLevel ?? 0;
    o.exportedTopologyHash = j.exportedTopologyHash ?? null;
    o.bake = j.bake
      ? {
          size: Math.max(1, Math.floor(j.bake.size ?? 2048)),
          padding: Math.max(0, Math.floor(j.bake.padding ?? 4)),
          stamp: j.bake.stamp ?? null,
        }
      : null;

    const meshPath = `meshes/${j.id}.bin`;
    const meshBytes = files[meshPath];
    if (!meshBytes) throw new Error(`${j.name} のメッシュ (${meshPath}) がありません`);
    o.mesh = decodeMesh(meshBytes);
    consumed.add(meshPath);

    o.multires = (j.multires ?? [])
      .map((m): MultiresLevel | null => {
        const path = `multires/${j.id}/L${m.level}.bin`;
        const data = files[path];
        if (!data) return null;
        consumed.add(path);
        return { level: m.level, delta: bytesToF32(data) };
      })
      .filter((x): x is MultiresLevel => x !== null);

    o.sculptLayers = (j.sculptLayers ?? [])
      .map((l): SculptLayer | null => {
        const path = `layers/${j.id}/${l.id}.bin`;
        const data = files[path];
        if (!data) return null;
        consumed.add(path);
        return { id: l.id, name: l.name, level: l.level, weight: l.weight, visible: l.visible, delta: bytesToF32(data) };
      })
      .filter((x): x is SculptLayer => x !== null);

    o.paintLayers = j.paintLayers ?? [];

    // マスク（`34` の T2）。段とファイルの両方がそろっているときだけ載せる。
    // **古いファイルには無い**ので、無いことは異常ではない
    const maskPath = `mask/${j.id}.bin`;
    const maskBytes = files[maskPath];
    if (typeof j.maskLevel === "number" && j.maskLevel > 0 && maskBytes) {
      consumed.add(maskPath);
      o.mask = { level: j.maskLevel, values: bytesToF32(maskBytes) };
    }

    o.uv = deserializeRecipe(j.uv);
    doc.objects.push(o);
  }
  doc.syncIdCounter();

  const extraFiles = new Map<string, Uint8Array>();
  for (const [path, data] of Object.entries(files)) {
    if (!consumed.has(path)) extraFiles.set(path, data);
  }
  return { document: doc, manifest, extraFiles };
}

/**
 * 外部から戻ってきたメッシュを、既存オブジェクトに取り込む（docs/11 の 5 章）。
 * トポロジが同じならレベル 0 の座標だけ差し替えて上の層を残す。違えば呼び出し側で確認する。
 */
export function canReplaceBase(o: SceneObject, incomingHash: string): boolean {
  return topologyHash(o.mesh) === incomingHash;
}
