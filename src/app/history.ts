/**
 * 元に戻す / やり直す。
 *
 * シーン全体のスナップショットを取る方式。メッシュだけ複製し、マルチ解像度と
 * スカルプトレイヤーは参照で持つ（delta は書き換えず必ず作り直す約束なので、
 * 参照を共有しても壊れない）。
 */
import { cloneRecipe, cloneTransform, type Mesh, type SceneObject, type Transform } from "../core/index.js";
import type { AppState, CompMode } from "./state.js";

interface ObjectSnapshot {
  ref: SceneObject;
  name: string;
  kind: string;
  parametric: boolean;
  params: Record<string, number>;
  transform: Transform;
  visible: boolean;
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

interface Entry {
  label: string;
  snap: Snapshot;
}

const LIMIT = 40;

export class History {
  private undoStack: Entry[] = [];
  private redoStack: Entry[] = [];
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
    this.undoStack.push({ label, snap });
    if (this.undoStack.length > LIMIT) this.undoStack.shift();
    this.redoStack.length = 0;
    this.onChange?.();
  }

  /** 履歴に残さない操作のあとで、直前のスナップショットを捨てる。 */
  drop(): void {
    this.undoStack.pop();
    this.onChange?.();
  }

  undo(): string | null {
    const e = this.undoStack.pop();
    if (!e) return null;
    this.redoStack.push({ label: e.label, snap: this.snapshot() });
    this.restore(e.snap);
    this.onChange?.();
    return e.label;
  }

  redo(): string | null {
    const e = this.redoStack.pop();
    if (!e) return null;
    this.undoStack.push({ label: e.label, snap: this.snapshot() });
    this.restore(e.snap);
    this.onChange?.();
    return e.label;
  }

  clear(): void {
    this.undoStack.length = 0;
    this.redoStack.length = 0;
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
      o.activeLevel = s.activeLevel;
      o.mesh = s.mesh.clone();
      o.uv = s.uv ? cloneRecipe(s.uv) : null;
      o.multires = s.multires.slice();
      o.sculptLayers = s.sculptLayers.slice();
      o.paintLayers = s.paintLayers.slice();
      return o;
    });
    this.state.selected = snap.selectedId ? (doc.find(snap.selectedId) ?? null) : null;
    this.state.compMode = snap.compMode;
    this.state.comp.clear();
    // トポロジが変わっていると番号がずれるので、今のメッシュに収まるものだけ戻す
    const mesh = this.state.selected?.mesh;
    const limit =
      !mesh || snap.compMode === "object"
        ? 0
        : snap.compMode === "vertex"
          ? mesh.vertexCount
          : snap.compMode === "face"
            ? mesh.faceCount
            : Infinity;
    for (const i of snap.comp) if (i < limit) this.state.comp.add(i);
  }
}
