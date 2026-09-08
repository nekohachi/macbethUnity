/**
 * シーンのドキュメントモデル。docs/11 の層構造をそのまま型にする。
 *
 *   Object
 *   ├ Base            プリミティブのパラメータ | 読み込んだメッシュ | 編集済みメッシュ  ← レベル 0
 *   ├ Multires        レベル 1..N の接空間デルタ
 *   ├ SculptLayers    レベルごとのデルタ + 重み
 *   ├ UVSets          メッシュが持つ（コーナー単位）
 *   ├ Materials       面ごとのマテリアル ID（メッシュが持つ）
 *   └ PaintLayers     テクスチャセット × チャンネル × レイヤー
 *
 * レベル 0 は破壊編集 + Undo、その上は非破壊で保持し再評価する。
 */
import { Mesh } from "./mesh.js";
import { PRIMITIVES, defaultParams, type PrimitiveParams } from "./primitives.js";
import { topologyHash } from "./io/hash.js";
import { reconcile, type UvRecipe } from "./uv/recipe.js";

export type Vec3 = [number, number, number];
export type Quat = [number, number, number, number];

export interface Transform {
  position: Vec3;
  /** クォータニオン (x, y, z, w) */
  rotation: Quat;
  scale: Vec3;
}

export function identityTransform(): Transform {
  return { position: [0, 0, 0], rotation: [0, 0, 0, 1], scale: [1, 1, 1] };
}

export function cloneTransform(t: Transform): Transform {
  const [px, py, pz] = t.position;
  const [rx, ry, rz, rw] = t.rotation;
  const [sx, sy, sz] = t.scale;
  return { position: [px, py, pz], rotation: [rx, ry, rz, rw], scale: [sx, sy, sz] };
}

/** マルチ解像度の 1 レベル。デルタは接空間で持つ（docs/03）。 */
export interface MultiresLevel {
  level: number;
  /** 3 × 頂点数。接空間でのズレ。 */
  delta: Float32Array;
}

/** スカルプトレイヤー。対象レベルのデルタに重みを掛けて合成する。 */
export interface SculptLayer {
  id: string;
  name: string;
  level: number;
  weight: number;
  visible: boolean;
  delta: Float32Array;
}

export type PaintChannel =
  | "baseColor"
  | "roughness"
  | "metallic"
  | "normal"
  | "height"
  | "ao"
  | "opacity"
  | "emissive";

export interface PaintLayer {
  id: string;
  name: string;
  channel: PaintChannel;
  blend: "normal" | "multiply" | "add" | "overlay";
  opacity: number;
  visible: boolean;
  /** .mbz 内の画像ファイルへの参照。 */
  imagePath: string;
  maskPath?: string;
}

export class SceneObject {
  id: string;
  name: string;
  /** プリミティブ ID。読み込んだメッシュや編集済みなら "mesh"。 */
  kind: string;
  /** パラメトリックなら params からメッシュを再生成できる。トポロジ編集で false になる。 */
  parametric: boolean;
  params: PrimitiveParams;
  transform: Transform;
  /** レベル 0 のメッシュ。 */
  mesh: Mesh;
  multires: MultiresLevel[] = [];
  sculptLayers: SculptLayer[] = [];
  paintLayers: PaintLayer[] = [];
  /** 表示中のサブディビジョンレベル。0 はベース。 */
  activeLevel = 0;
  visible = true;
  /** 最後に書き出したときのトポロジ。往復で戻ってきたときの照合に使う。 */
  exportedTopologyHash: string | null = null;
  /**
   * UV の作り方（`15`）。切れ目・ピン・ソルバー・手の差分を持つ。
   * ここから `mesh.uvSets` を作り直す。null なら UV は素のまま（プリミティブの UV）。
   */
  uv: UvRecipe | null = null;

  constructor(kind: string, id: string, name?: string) {
    this.id = id;
    this.kind = kind;
    const def = PRIMITIVES[kind];
    this.name = name ?? (def ? def.en.replace(/\s/g, "") : "mesh") + id;
    this.parametric = !!def;
    this.params = defaultParams(kind);
    this.transform = identityTransform();
    this.mesh = def ? def.build(this.params) : Mesh.empty();
  }

  /** パラメータからメッシュを作り直す。パラメトリックでなければ何もしない。 */
  rebuild(): void {
    if (!this.parametric) return;
    const def = PRIMITIVES[this.kind];
    if (def) this.mesh = def.build(this.params);
  }

  /** トポロジを変えた。上位レベルとスカルプトレイヤーは対応関係を失うので破棄する（docs/03）。 */
  markTopologyChanged(): { droppedLevels: number; droppedLayers: number; droppedSeams: number; droppedIslands: number } {
    const droppedLevels = this.multires.length;
    const droppedLayers = this.sculptLayers.length;
    this.parametric = false;
    this.multires = [];
    this.sculptLayers = [];
    this.activeLevel = 0;
    // UV は全部捨てずに、対応が取れなくなった分だけ落とす（`15` の 2.4）
    const uv = this.uv ? reconcile(this.uv, this.mesh) : { droppedSeams: 0, droppedIslands: 0 };
    return { droppedLevels, droppedLayers, ...uv };
  }

  topologyHash(): string {
    return topologyHash(this.mesh);
  }

  /** UV を持っているか。書き出し前の確認に使う。 */
  hasUv(): boolean {
    return this.mesh.uvSets.size > 0;
  }
}

export interface CameraBookmark {
  name: string;
  target: Vec3;
  theta: number;
  phi: number;
  distance: number;
  /** 焦点距離（mm）。無ければ今の設定のまま。 */
  focal?: number;
  /** 平行投影かどうか。無ければ今の設定のまま。 */
  ortho?: boolean;
}

export class Document {
  objects: SceneObject[] = [];
  /** 表示設定など、シーン全体に効くもの。 */
  settings: Record<string, unknown> = {};
  cameraBookmarks: CameraBookmark[] = [];
  private nextId = 1;

  newId(): string {
    return String(this.nextId++);
  }

  addObject(kind: string): SceneObject {
    const o = new SceneObject(kind, this.newId());
    this.objects.push(o);
    return o;
  }

  addMesh(mesh: Mesh, name: string): SceneObject {
    const o = new SceneObject("mesh", this.newId(), name);
    o.parametric = false;
    o.mesh = mesh;
    this.objects.push(o);
    return o;
  }

  remove(o: SceneObject): void {
    const i = this.objects.indexOf(o);
    if (i >= 0) this.objects.splice(i, 1);
  }

  find(id: string): SceneObject | undefined {
    return this.objects.find((o) => o.id === id);
  }

  /** 採番が衝突しないよう、読み込み後に呼ぶ。 */
  syncIdCounter(): void {
    let max = 0;
    for (const o of this.objects) {
      const n = Number(o.id);
      if (Number.isFinite(n) && n > max) max = n;
    }
    this.nextId = max + 1;
  }

  stats(): { objects: number; vertices: number; faces: number; triangles: number } {
    let vertices = 0,
      faces = 0,
      triangles = 0;
    for (const o of this.objects) {
      const s = o.mesh.stats();
      vertices += s.vertices;
      faces += s.faces;
      triangles += s.triangles;
    }
    return { objects: this.objects.length, vertices, faces, triangles };
  }
}
