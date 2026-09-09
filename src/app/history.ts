/**
 * 元に戻す / やり直す。
 *
 * シーン全体のスナップショットを取る方式。メッシュだけ複製し、マルチ解像度と
 * スカルプトレイヤーは参照で持つ（delta は書き換えず必ず作り直す約束なので、
 * 参照を共有しても壊れない）。
 */
import { UV_SET, cloneRecipe, cloneTransform, type Mesh, type SceneObject, type Transform } from "../core/index.js";
import type { AppState, CompMode } from "./state.js";

interface ObjectSnapshot {
  ref: SceneObject;
  name: string;
  kind: string;
  parametric: boolean;
  params: Record<string, number>;
  transform: Transform;
  visible: boolean;
  locked: boolean;
  opacity: number;
  activeLevel: number;
  mesh: Mesh;
  /**
   * UV のレシピ（`19` の 1.3）。メッシュだけ戻しても切れ目・ピン・土台・差分は
   * 戻らないので、ここで一緒に控える。`cloneRecipe` は `base` の Float32Array も複製する。
   */
  uv: SceneObject["uv"];
  multires: SceneObject["multires"];
  sculptLayers: SceneObject["sculptLayers"];
  paintLayers: SceneObject["paintLayers"];
}

interface Snapshot {
  objects: ObjectSnapshot[];
  selectedId: string | null;
  /** 選択モードと選択中のコンポーネント。戻したときに選択も戻す。 */
  compMode: CompMode;
  comp: number[];
}

/**
 * 座標だけの差分（`29` の B-T4）。
 *
 * ツイーク・マニピュレータのドラッグ・3 本指の変形は、**動いた頂点しか変えない**。
 * シーン全部を複製する代わりに、動いた頂点の番号と前後の座標だけを持つ。
 * スカルプトのストロークもこれになる。
 */
interface PositionDiff {
  ref: SceneObject;
  verts: Uint32Array;
  /** 3 × verts.length。 */
  before: Float32Array;
  after: Float32Array;
  /** UV も動いたとき（Preserve UVs でレシピが無い場合）。変わったコーナーだけ。 */
  uvCorners?: Uint32Array;
  uvBefore?: Float32Array;
  uvAfter?: Float32Array;
}

/** トランスフォームだけの差分。オブジェクトモードのドラッグと 3 本指。 */
interface TransformDiff {
  ref: SceneObject;
  before: Transform;
  after: Transform;
}

/** 戻したときに選択も戻すための控え。3 種類で共通。 */
interface SelectionSnap {
  selectedId: string | null;
  compMode: CompMode;
  comp: number[];
}

type Entry =
  | { kind: "full"; label: string; snap: Snapshot }
  | { kind: "positions"; label: string; diff: PositionDiff; sel: SelectionSnap }
  | { kind: "transform"; label: string; diff: TransformDiff; sel: SelectionSnap };

/** 積む前の控え。`beginPositions` / `beginTransform` からコミットまでのあいだ。 */
type Pending =
  | { kind: "positions"; ref: SceneObject; verts: Uint32Array; before: Float32Array; uvCorners?: Uint32Array; uvBefore?: Float32Array; sel: SelectionSnap }
  | { kind: "transform"; ref: SceneObject; before: Transform; sel: SelectionSnap };

const LIMIT = 40;

export class History {
  private undoStack: Entry[] = [];
  private redoStack: Entry[] = [];
  /** 差分の控え。`beginPositions` / `beginTransform` からコミットまで（`29` の B-T4）。 */
  private pending: Pending | null = null;
  /** 履歴が動いたときに呼ばれる。ボタンの有効・無効と自動保存に使う。 */
  onChange: (() => void) | null = null;

  constructor(private state: AppState) {}

  get canUndo(): boolean {
    return this.undoStack.length > 0;
  }
  get canRedo(): boolean {
    return this.redoStack.length > 0;
  }
  get undoLabel(): string | null {
    return this.undoStack.at(-1)?.label ?? null;
  }
  get redoLabel(): string | null {
    return this.redoStack.at(-1)?.label ?? null;
  }

  /**
   * 現在の状態を記録する。ドラッグのように「開始前の状態」を積みたい場合は
   * snapshot() を先に取っておいて commit(label, snap) を使う。
   */
  push(label: string): void {
    this.commit(label, this.snapshot());
  }

  snapshot(): Snapshot {
    return {
      objects: this.state.doc.objects.map((o) => ({
        ref: o,
        name: o.name,
        kind: o.kind,
        parametric: o.parametric,
        params: { ...o.params },
        transform: cloneTransform(o.transform),
        visible: o.visible,
        locked: o.locked,
        opacity: o.opacity,
        activeLevel: o.activeLevel,
        mesh: o.mesh.clone(),
        uv: o.uv ? cloneRecipe(o.uv) : null,
        multires: o.multires.slice(),
        sculptLayers: o.sculptLayers.slice(),
        paintLayers: o.paintLayers.slice(),
      })),
      selectedId: this.state.selected?.id ?? null,
      compMode: this.state.compMode,
      comp: [...this.state.comp],
    };
  }

  commit(label: string, snap: Snapshot): void {
    this.push2({ kind: "full", label, snap });
  }

  private push2(e: Entry): void {
    this.undoStack.push(e);
    if (this.undoStack.length > LIMIT) this.undoStack.shift();
    this.redoStack.length = 0;
    this.onChange?.();
  }

  /* ---- 差分（`29` の B-T4） -------------------------------------------- */

  /** 今の選択を控える。戻したときに選択も戻すため。 */
  private selectionSnap(): SelectionSnap {
    return {
      selectedId: this.state.selected?.id ?? null,
      compMode: this.state.compMode,
      comp: [...this.state.comp],
    };
  }

  /**
   * 座標だけを変える操作を始める（`29` の B-T4）。
   * `verts` は動かす頂点（対称編集の相手も含める）。`uvCorners` を渡すと UV も控える。
   */
  beginPositions(o: SceneObject, verts: Iterable<number>, uvCorners?: Iterable<number>): void {
    const list = Uint32Array.from(verts);
    const before = new Float32Array(list.length * 3);
    for (let i = 0; i < list.length; i++) {
      const v = list[i];
      before[i * 3] = o.mesh.positions[v * 3];
      before[i * 3 + 1] = o.mesh.positions[v * 3 + 1];
      before[i * 3 + 2] = o.mesh.positions[v * 3 + 2];
    }
    const pending: Pending = { kind: "positions", ref: o, verts: list, before, sel: this.selectionSnap() };
    const uv = uvCorners ? o.mesh.uvSets.get(UV_SET) : undefined;
    if (uvCorners && uv) {
      const corners = Uint32Array.from(uvCorners);
      const uvBefore = new Float32Array(corners.length * 2);
      for (let i = 0; i < corners.length; i++) {
        uvBefore[i * 2] = uv[corners[i] * 2];
        uvBefore[i * 2 + 1] = uv[corners[i] * 2 + 1];
      }
      pending.uvCorners = corners;
      pending.uvBefore = uvBefore;
    }
    this.pending = pending;
  }

  /** トランスフォームだけを変える操作を始める（オブジェクトモード）。 */
  beginTransform(o: SceneObject): void {
    this.pending = { kind: "transform", ref: o, before: cloneTransform(o.transform), sel: this.selectionSnap() };
  }

  /** 控えを捨てる（何も起きなかった / 別の道へ行った）。 */
  abortPending(): void {
    this.pending = null;
  }

  /** 控えを取っている最中か。 */
  get hasPending(): boolean {
    return this.pending !== null;
  }

  /**
   * 差分を積む。何も変わっていなければ積まずに false。
   * 座標は今のメッシュから読み直す（`after`）。
   */
  commitPending(label: string): boolean {
    const p = this.pending;
    this.pending = null;
    if (!p) return false;
    if (p.kind === "transform") {
      const after = cloneTransform(p.ref.transform);
      if (sameTransform(p.before, after)) return false;
      this.push2({ kind: "transform", label, diff: { ref: p.ref, before: p.before, after }, sel: p.sel });
      return true;
    }
    const after = new Float32Array(p.verts.length * 3);
    let moved = false;
    for (let i = 0; i < p.verts.length; i++) {
      const v = p.verts[i];
      after[i * 3] = p.ref.mesh.positions[v * 3];
      after[i * 3 + 1] = p.ref.mesh.positions[v * 3 + 1];
      after[i * 3 + 2] = p.ref.mesh.positions[v * 3 + 2];
      for (let k = 0; k < 3; k++) if (after[i * 3 + k] !== p.before[i * 3 + k]) moved = true;
    }
    const diff: PositionDiff = { ref: p.ref, verts: p.verts, before: p.before, after };
    const uv = p.uvCorners ? p.ref.mesh.uvSets.get(UV_SET) : undefined;
    if (p.uvCorners && p.uvBefore && uv) {
      const uvAfter = new Float32Array(p.uvCorners.length * 2);
      for (let i = 0; i < p.uvCorners.length; i++) {
        uvAfter[i * 2] = uv[p.uvCorners[i] * 2];
        uvAfter[i * 2 + 1] = uv[p.uvCorners[i] * 2 + 1];
        for (let k = 0; k < 2; k++) if (uvAfter[i * 2 + k] !== p.uvBefore[i * 2 + k]) moved = true;
      }
      diff.uvCorners = p.uvCorners;
      diff.uvBefore = p.uvBefore;
      diff.uvAfter = uvAfter;
    }
    if (!moved) return false;
    this.push2({ kind: "positions", label, diff, sel: p.sel });
    return true;
  }

  /**
   * 差分のつもりだったものを全複製に切り替える（`29` の B-T4）。
   *
   * ドラッグの途中でトポロジが変わったとき（ターゲットウェルド）に使う。
   * **動かす前の座標へ一度戻して**全複製を取り、動かし直してから返す。
   * 返した控えは呼び出し側が `commit` する。
   */
  upgradeToFull(): Snapshot | null {
    const p = this.pending;
    if (!p) return null;
    this.pending = null;
    if (p.kind === "transform") {
      const after = cloneTransform(p.ref.transform);
      p.ref.transform = cloneTransform(p.before);
      const snap = this.snapshot();
      p.ref.transform = after;
      return snap;
    }
    const after = new Float32Array(p.verts.length * 3);
    for (let i = 0; i < p.verts.length; i++) {
      const v = p.verts[i];
      for (let k = 0; k < 3; k++) after[i * 3 + k] = p.ref.mesh.positions[v * 3 + k];
    }
    writePositions(p.ref, p.verts, p.before);
    const snap = this.snapshot();
    writePositions(p.ref, p.verts, after);
    return snap;
  }

  /** 直前に積んだ段の種類と大きさ（通し確認から見るため）。 */
  lastEntry(): { kind: Entry["kind"]; bytes: number } | null {
    const e = this.undoStack.at(-1);
    return e ? { kind: e.kind, bytes: entryBytes(e) } : null;
  }

  /** 履歴に残さない操作のあとで、直前のスナップショットを捨てる。 */
  drop(): void {
    this.undoStack.pop();
    this.onChange?.();
  }

  undo(): string | null {
    const e = this.undoStack.pop();
    if (!e) return null;
    if (e.kind === "full") {
      this.redoStack.push({ kind: "full", label: e.label, snap: this.snapshot() });
      this.restore(e.snap);
    } else {
      // 差分は前後を持っているので、控えを取り直さずそのまま向きだけ変える
      this.redoStack.push(e);
      this.applyDiff(e, "before");
    }
    this.onChange?.();
    return e.label;
  }

  redo(): string | null {
    const e = this.redoStack.pop();
    if (!e) return null;
    if (e.kind === "full") {
      this.undoStack.push({ kind: "full", label: e.label, snap: this.snapshot() });
      this.restore(e.snap);
    } else {
      this.undoStack.push(e);
      this.applyDiff(e, "after");
    }
    this.onChange?.();
    return e.label;
  }

  /** 差分を当てる。`which` が `before` なら戻す、`after` ならやり直す。 */
  private applyDiff(e: Entry, which: "before" | "after"): void {
    if (e.kind === "full") return;
    if (e.kind === "transform") {
      e.diff.ref.transform = cloneTransform(e.diff[which]);
    } else {
      const d = e.diff;
      writePositions(d.ref, d.verts, d[which]);
      const uv = d.uvCorners ? d.ref.mesh.uvSets.get(UV_SET) : undefined;
      const from = which === "before" ? d.uvBefore : d.uvAfter;
      if (d.uvCorners && from && uv) {
        for (let i = 0; i < d.uvCorners.length; i++) {
          const c = d.uvCorners[i];
          if (c * 2 + 1 >= uv.length) continue;
          uv[c * 2] = from[i * 2];
          uv[c * 2 + 1] = from[i * 2 + 1];
        }
      }
    }
    this.restoreSelection(e.sel);
  }

  clear(): void {
    this.undoStack.length = 0;
    this.redoStack.length = 0;
    this.pending = null;
    this.onChange?.();
  }

  /**
   * スナップショットを書き戻す。SceneObject のインスタンスは作り直さず中身を
   * 差し替える。UI がオブジェクトを参照で持っていても切れないようにするため。
   */
  private restore(snap: Snapshot): void {
    const doc = this.state.doc;
    doc.objects = snap.objects.map((s) => {
      const o = s.ref;
      o.name = s.name;
      o.kind = s.kind;
      o.parametric = s.parametric;
      o.params = { ...s.params };
      o.transform = cloneTransform(s.transform);
      o.visible = s.visible;
      o.locked = s.locked;
      o.opacity = s.opacity;
      o.activeLevel = s.activeLevel;
      o.mesh = s.mesh.clone();
      o.uv = s.uv ? cloneRecipe(s.uv) : null;
      o.multires = s.multires.slice();
      o.sculptLayers = s.sculptLayers.slice();
      o.paintLayers = s.paintLayers.slice();
      return o;
    });
    this.restoreSelection(snap);
  }

  /** 選択とコンポーネントを戻す。全複製でも差分でも同じ扱い。 */
  private restoreSelection(sel: SelectionSnap): void {
    this.state.selected = sel.selectedId ? (this.state.doc.find(sel.selectedId) ?? null) : null;
    this.state.compMode = sel.compMode;
    this.state.comp.clear();
    // トポロジが変わっていると番号がずれるので、今のメッシュに収まるものだけ戻す
    const mesh = this.state.selected?.mesh;
    const limit =
      !mesh || sel.compMode === "object"
        ? 0
        : sel.compMode === "vertex"
          ? mesh.vertexCount
          : sel.compMode === "face"
            ? mesh.faceCount
            : Infinity;
    for (const i of sel.comp) if (i < limit) this.state.comp.add(i);
  }
}

/** 差分の座標を書き戻す。番号が今のメッシュに無ければ飛ばす（安全側）。 */
function writePositions(o: SceneObject, verts: Uint32Array, xyz: Float32Array): void {
  for (let i = 0; i < verts.length; i++) {
    const v = verts[i];
    if (v >= o.mesh.vertexCount) continue;
    o.mesh.positions[v * 3] = xyz[i * 3];
    o.mesh.positions[v * 3 + 1] = xyz[i * 3 + 1];
    o.mesh.positions[v * 3 + 2] = xyz[i * 3 + 2];
  }
}

function sameTransform(a: Transform, b: Transform): boolean {
  return (
    a.position.every((v, i) => v === b.position[i]) &&
    a.rotation.every((v, i) => v === b.rotation[i]) &&
    a.scale.every((v, i) => v === b.scale[i])
  );
}

/** その段が抱えている大きさ（おおよそのバイト数）。通し確認で見る。 */
function entryBytes(e: Entry): number {
  if (e.kind === "transform") return 2 * 10 * 8;
  if (e.kind === "positions") {
    const d = e.diff;
    return (
      d.verts.byteLength +
      d.before.byteLength +
      d.after.byteLength +
      (d.uvCorners?.byteLength ?? 0) +
      (d.uvBefore?.byteLength ?? 0) +
      (d.uvAfter?.byteLength ?? 0)
    );
  }
  let bytes = 0;
  for (const o of e.snap.objects) {
    bytes += o.mesh.positions.byteLength + o.mesh.faceCorners.byteLength + o.mesh.faceOffsets.byteLength;
    for (const uv of o.mesh.uvSets.values()) bytes += uv.byteLength;
  }
  return bytes;
}
