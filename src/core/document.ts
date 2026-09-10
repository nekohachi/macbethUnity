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
import type { Multires } from "./multires.js";
import type { MirrorMap } from "./symmetry.js";
import type { BakeResult } from "./bake.js";
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

/**
 * 焼き方（`44` の T2）。**焼いた結果そのものは持たない**（`SceneObject.bakeResult`）。
 */
export interface BakeRecipe {
  /** 1 辺のテクセル数。1024 / 2048 / 4096。既定 2048。 */
  size: number;
  /** 島の外へ色を伸ばす幅（テクセル）。既定 4。 */
  padding: number;
  /** 焼いたときの指紋（`bakeStamp`）。今の指紋と違えば「古い」。まだ焼いていなければ null。 */
  stamp: string | null;
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
  /** ロック中。選択も変形も受け付けない（`19` の 3.3 のアウトライナ）。 */
  locked = false;
  /**
   * 不透明度（0〜1、既定 1。`25` の T4）。`visible` とは別で、
   * 透明でもそこにあるので選べる。`.mbz` と履歴に残る。
   */
  opacity = 1;
  /** 最後に書き出したときのトポロジ。往復で戻ってきたときの照合に使う。 */
  exportedTopologyHash: string | null = null;
  /**
   * UV の作り方（`15`）。切れ目・ピン・ソルバー・手の差分を持つ。
   * ここから `mesh.uvSets` を作り直す。null なら UV は素のまま（プリミティブの UV）。
   */
  uv: UvRecipe | null = null;
  /**
   * 面ごとの歪み（`recompute` の `perFace`）。ヒートマップの表示にだけ使う
   * 見た目の控えなので `.mbz` には入れない（開き直せば作り直せる）。
   */
  uvHeat: Float32Array | null = null;
  /**
   * マスク（`34`）。無ければ `null`。**1 つの段にだけ持つ。**
   *
   * `values` は頂点ごとの 0〜1（0 = 彫れる、1 = 彫れない）。長さはその段の
   * 頂点数。段を変えたら `maskUp` / `maskDown` で移す（app の `goLevel`）。
   *
   * **0 で埋めた配列を持たない。** マスクを使わない人に、掛け算も色も
   * メモリも払わせないため。全部 0 になったら `null` へ落とす。
   */
  mask: { level: number; values: Float32Array } | null = null;
  /**
   * 生きたマルチ解像度スタック（`32` の T2）。**`.mbz` にも履歴にも入れない。**
   * 真は `multires`（デルタ）で、これはそこから作り直せる控え。
   * トポロジが変わったときと履歴を戻したときは `invalidateLevels()` で捨てる。
   */
  stack: Multires | null = null;
  /**
   * X 対称の対応表（`41` の T1）。段ごと。**`.mbz` にも履歴にも入れない**控え。
   *
   * 一度作ったら**トポロジが変わるまで持ち続ける**。作り直さないのは、
   * 左右非対称に彫ったあとの座標から引き直すと相手が見つからなくなるため。
   * 対応そのものはトポロジの話なので、彫っても変わらない。
   */
  mirrorMaps = new Map<number, MirrorMap>();
  /**
   * 捨てる前のハイ（`42` の T2）。トポロジを変えると上位レベルは対応を失うので、
   * **捨てる直前のいちばん上のメッシュ**をここへ控える。段を割り直したあと
   * 「ハイを戻す（再投影）」で焼き戻す。
   *
   * **`.mbz` にも履歴にも入れない**（作業中の都合。開き直せば無い）。
   * 控えは 1 つだけ。トポロジを 2 回変えたら 2 回目で上書きする。
   */
  detailCache: { mesh: Mesh; level: number } | null = null;
  /**
   * 段ごとの**効いているデルタ**の控え（`42` の T3）。
   * `base + Σ(見えているレイヤー × 重み)`。**レイヤーが 1 枚も無い段は持たない**
   * （そのときは `multires` のデルタをそのまま使う。今までと同じ道）。
   *
   * `.mbz` にも履歴にも入れない。レイヤーを触ったら捨てて作り直す。
   */
  combined = new Map<number, Float32Array>();
  /**
   * 焼き方（`44` の T2）。**`.mbz` には入れる**（大きさと指紋だけなので軽い）。
   * まだ一度も焼いていなければ `null`。
   */
  bake: BakeRecipe | null = null;
  /**
   * 焼いた結果の控え（`44` の T2）。**`.mbz` にも履歴にも入れない。**
   * 2K で 20MB になるので、開き直したら焼き直す。
   */
  bakeResult: BakeResult | null = null;

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

  /**
   * 表示するメッシュ（`32` の T2）。`level` を渡さなければ `activeLevel`。
   *
   * レベル 0 か、スタックが無ければ `mesh`（レベル 0）。モデリングモードは
   * 常にレベル 0 を見せるので、呼ぶ側が 0 を渡す。
   */
  shown(level = this.activeLevel): Mesh {
    if (level <= 0 || !this.stack) return this.mesh;
    return this.stack.level(Math.min(level, this.stack.levelCount));
  }

  /** 生きたスタックを捨てる。デルタから作り直せるので、いつ捨ててもよい。 */
  invalidateLevels(): void {
    this.stack = null;
  }

  /** トポロジを変えた。上位レベルとスカルプトレイヤーは対応関係を失うので破棄する（docs/03）。 */
  markTopologyChanged(): {
    droppedLevels: number;
    droppedLayers: number;
    droppedSeams: number;
    droppedIslands: number;
    /** マスクを捨てたか（`34` の T2）。 */
    droppedMask: boolean;
    /** UV の土台を今の map1 で取り直したか（`17` の 1.2）。 */
    rebased: boolean;
    /** 捨てる前のハイを控えたか（`42` の T2）。 */
    cachedDetail: boolean;
  } {
    // **捨てる前にハイを控える**（`42` の T2）。生きたスタックがあるときだけ
    // （画面に出ていれば必ずある。無ければ控えずに進む）
    let cachedDetail = false;
    if (this.stack && this.multires.length) {
      this.detailCache = { mesh: this.stack.level(this.multires.length).clone(), level: this.multires.length };
      cachedDetail = true;
    }
    const droppedLevels = this.multires.length;
    const droppedLayers = this.sculptLayers.length;
    // マスクは頂点ごとに持っているので、頂点の数が変われば対応が取れない
    const droppedMask = this.mask !== null;
    // 対応表は頂点の番号で持っているので、頂点の数が変われば引き直す（`41` の T1）
    this.mirrorMaps.clear();
    this.combined.clear();
    this.parametric = false;
    this.multires = [];
    this.sculptLayers = [];
    this.mask = null;
    this.activeLevel = 0;
    this.invalidateLevels();
    // UV は全部捨てずに、対応が取れなくなった分だけ落とす（`15` の 2.4）
    const uv = this.uv
      ? reconcile(this.uv, this.mesh)
      : { droppedSeams: 0, droppedIslands: 0, rebased: false };
    return { droppedLevels, droppedLayers, droppedMask, cachedDetail, ...uv };
  }

  topologyHash(): string {
    return topologyHash(this.mesh);
  }

  /** UV を持っているか。書き出し前の確認に使う。 */
  hasUv(): boolean {
    return this.mesh.uvSets.size > 0;
  }
}

/**
 * ビューポートの分割（`25` の T6）。`.mbz` に入れて、開き直したときに戻す。
 * `kind` はアプリ側の `LayoutKind`（"single" / "cols" / "rows" / "quad"）。
 */
export interface PaneLayout {
  kind: string;
  /** 分割線の位置（0〜1。`27` の T2）。無ければ半分。 */
  split?: { x: number; y: number };
  panes: Array<{
    view: string;
    target: Vec3;
    theta: number;
    phi: number;
    distance: number;
    focal: number;
    ortho: boolean;
    display: string;
  }>;
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
  /** ビューポートの分割と、各ペインのカメラ（`25` の T6）。無ければ 1 画面。 */
  layout: PaneLayout | null = null;
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
