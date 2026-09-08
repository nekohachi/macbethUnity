/**
 * UV モードの取りまとめ。2D ビュー、選択、指の操作、3D との同期。
 *
 * 3D 側と同じ割り当てにしてある（`15` の 6.4）。1 本 = ツール、2 本 = パン / ズーム、
 * 3 本 = つまむとスケール・スワイプで U / V へ移動、長押し = サークルメニュー。
 * しきい値は `input/gestures.ts` のものをそのまま使う。
 */
import {
  UV_SET,
  chartMesh,
  cornerIndex,
  measure,
  recompute,
  recordManual,
  type CornerKey,
  type SceneObject,
  type UvRecipe,
} from "../../core/index.js";
import {
  GestureRouter,
  TAP_DURATION,
  TAP_MOVE,
  TOOL_MOVE,
  type GestureDelta,
  type GestureHandlers,
} from "../input/gestures.js";
import type { ScreenPoint } from "../render/picking.js";
import { UvView } from "./uvView.js";

export type UvUnit = "vertex" | "edge" | "shell";
/** 2D / 両方 / 3D。 */
export type UvSplit = "uv" | "both" | "view";

const VERTEX_RADIUS = 20;
const EDGE_RADIUS = 14;

export interface UvHost {
  /** 今の対象。無ければ何もしない。 */
  object(): SceneObject | null;
  recipe(): UvRecipe | null;
  /** 何か変えた。3D 側の描き直しと HUD の更新を頼む。 */
  changed(label: string | null): void;
  /** 履歴に積む前の控え。 */
  snapshot(): unknown;
  commit(label: string, snapshot: unknown): void;
  /** 2D で選んだものを 3D の面の選択へ渡す。 */
  syncToView(faces: number[]): void;
  markingMenu(x: number, y: number, edit: boolean): void;
  cameraMenu(x: number, y: number): void;
  hint(html: string): void;
  toast(text: string): void;
  undo(): void;
  redo(): void;
  shiftOn(e: PointerEvent): boolean;
  ctrlOn(e: PointerEvent): boolean;
}

export class UvMode {
  readonly view: UvView;
  private router: GestureRouter;
  unit: UvUnit = "shell";
  /** 選んでいるもの。意味は unit で変わる。 */
  readonly chosen = new Set<number>();
  /** ピン留めしている UV 頂点。 */
  readonly pinned = new Set<number>();

  /** ドラッグ中の控え。 */
  private drag: {
    start: ScreenPoint;
    base: Map<CornerKey, [number, number]>;
    chart: number;
    snapshot: unknown;
    moved: boolean;
    /** ペンと指は動きが確かになるまで待つ（docs/17 の 3 章）。 */
    pending: boolean;
    t0: number;
  } | null = null;
  private gesture: { base: Map<CornerKey, [number, number]>; chart: number; snapshot: unknown; moved: boolean } | null =
    null;

  constructor(
    private pane: HTMLElement,
    canvas: HTMLCanvasElement,
    private host: UvHost,
  ) {
    this.view = new UvView(pane, canvas);
    this.router = new GestureRouter(canvas, (e) => this.local(e), this.handlers());
    this.router.attach();
  }

  private local(e: { clientX: number; clientY: number }): ScreenPoint {
    const r = this.pane.getBoundingClientRect();
    return { x: e.clientX - r.left, y: e.clientY - r.top };
  }

  start(): void {
    this.view.start();
  }
  stop(): void {
    this.view.stop();
  }
  resize(): void {
    this.view.resize();
  }

  /** 今の歪みの数値。HUD に出す。 */
  stats(): { charts: number; maxStretch: number; unit: string } {
    const object = this.host.object();
    const recipe = this.host.recipe();
    const label = { vertex: "UV 頂点", edge: "UV エッジ", shell: "UV シェル" }[this.unit];
    if (!object || !recipe) return { charts: 0, maxStretch: 1, unit: label };
    // 数字を出すためだけに解き直したくないので、今の UV から測る
    let maxStretch = 1;
    const t = this.view.uvTopology;
    if (t) {
      for (const chart of t.charts) {
        const local = chartMesh(object.mesh, chart, recipe.seams);
        const uv = object.mesh.uvSets.get(UV_SET);
        if (!uv) continue;
        const flat = new Float64Array(local.count * 2);
        for (const key of chart.corners) {
          const at = local.localOf.get(key)!;
          const corner = cornerIndex(object.mesh, key);
          flat[at * 2] = uv[corner * 2];
          flat[at * 2 + 1] = uv[corner * 2 + 1];
        }
        maxStretch = Math.max(maxStretch, measure(local.positions, local.tri, flat).maxStretch);
      }
    }
    return { charts: t?.charts.length ?? 0, maxStretch, unit: label };
  }

  /** 2D の中身を作り直して、選択の色も塗り直す。 */
  rebuild(): void {
    const object = this.host.object();
    this.view.build(object, this.host.recipe());
    this.syncPins();
    this.refreshHighlight();
  }

  refreshHighlight(): void {
    this.view.highlight(this.unit, this.chosen, this.pinned, this.host.object());
  }

  setUnit(unit: UvUnit): void {
    if (this.unit === unit) return;
    this.unit = unit;
    this.chosen.clear();
    this.refreshHighlight();
    this.host.changed(null);
  }

  /** レシピのピンを 2D の頂点番号に直す。 */
  private syncPins(): void {
    this.pinned.clear();
    const t = this.view.uvTopology;
    const recipe = this.host.recipe();
    if (!t || !recipe) return;
    for (const key of recipe.pins.keys()) {
      const at = t.cornerToVertex.get(key);
      if (at !== undefined) this.pinned.add(at);
    }
  }

  /** 3D で面を選んだら、その島を選ぶ。 */
  syncFromView(faces: Iterable<number>): void {
    const t = this.view.uvTopology;
    if (!t) return;
    this.unit = "shell";
    this.chosen.clear();
    for (const f of faces) {
      const ci = t.chartOfFace.get(f);
      if (ci !== undefined) this.chosen.add(ci);
    }
    this.refreshHighlight();
  }

  /** 選んでいるものに含まれる面。3D へ渡す。 */
  facesOfSelection(): number[] {
    const t = this.view.uvTopology;
    if (!t) return [];
    const faces = new Set<number>();
    if (this.unit === "shell") {
      for (const ci of this.chosen) for (const f of t.charts[ci]?.faces ?? []) faces.add(f);
    } else {
      const corners: CornerKey[] = [];
      if (this.unit === "vertex") for (const v of this.chosen) corners.push(...(t.vertexCorners[v] ?? []));
      else {
        for (const e of this.chosen) {
          const [a, b] = t.edges[e] ?? [-1, -1];
          corners.push(...(t.vertexCorners[a] ?? []), ...(t.vertexCorners[b] ?? []));
        }
      }
      for (const key of corners) faces.add(Number(key.slice(0, key.indexOf(":"))));
    }
    return [...faces].sort((a, b) => a - b);
  }

  /** 選んでいるコーナー。移動の対象。 */
  private selectedCorners(): { corners: CornerKey[]; chart: number } {
    const t = this.view.uvTopology;
    if (!t) return { corners: [], chart: -1 };
    const corners: CornerKey[] = [];
    let chart = -1;
    const note = (ci: number): void => {
      if (chart < 0) chart = ci;
    };
    if (this.unit === "shell") {
      for (const ci of this.chosen) {
        note(ci);
        for (const key of t.charts[ci]?.corners ?? []) corners.push(key);
      }
    } else if (this.unit === "vertex") {
      for (const v of this.chosen) {
        note(t.vertexChart[v]);
        corners.push(...(t.vertexCorners[v] ?? []));
      }
    } else {
      for (const e of this.chosen) {
        note(t.edgeChart[e]);
        const [a, b] = t.edges[e] ?? [-1, -1];
        corners.push(...(t.vertexCorners[a] ?? []), ...(t.vertexCorners[b] ?? []));
      }
    }
    return { corners: [...new Set(corners)], chart };
  }

  /** 今の UV を控える。動かした差はここからの差分になる。 */
  private captureBase(corners: CornerKey[]): Map<CornerKey, [number, number]> {
    const object = this.host.object();
    const base = new Map<CornerKey, [number, number]>();
    if (!object) return base;
    const uv = object.mesh.uvSets.get(UV_SET);
    if (!uv) return base;
    for (const key of corners) {
      const at = cornerIndex(object.mesh, key);
      if (at >= 0) base.set(key, [uv[at * 2], uv[at * 2 + 1]]);
    }
    return base;
  }

  /** 控えからの差を UV に当てる。まだ履歴には積まない。 */
  private applyOffset(base: Map<CornerKey, [number, number]>, du: number, dv: number, scale = 1): void {
    const object = this.host.object();
    if (!object) return;
    const uv = object.mesh.uvSets.get(UV_SET);
    if (!uv) return;
    // 拡大縮小の基点は選択の中心
    let cu = 0;
    let cv = 0;
    for (const [, p] of base) {
      cu += p[0];
      cv += p[1];
    }
    if (base.size) {
      cu /= base.size;
      cv /= base.size;
    }
    for (const [key, p] of base) {
      const at = cornerIndex(object.mesh, key);
      if (at < 0) continue;
      uv[at * 2] = cu + (p[0] - cu) * scale + du;
      uv[at * 2 + 1] = cv + (p[1] - cv) * scale + dv;
    }
    this.rebuildGeometryOnly();
  }

  /** 動かした結果を差分としてレシピに記録する。 */
  private recordFrom(base: Map<CornerKey, [number, number]>, chart: number): boolean {
    const object = this.host.object();
    const recipe = this.host.recipe();
    const t = this.view.uvTopology;
    if (!object || !recipe || !t || chart < 0) return false;
    const uv = object.mesh.uvSets.get(UV_SET);
    const fingerprint = t.charts[chart]?.fingerprint;
    if (!uv || !fingerprint) return false;
    const deltas = new Map<CornerKey, [number, number]>();
    let any = false;
    for (const [key, p] of base) {
      const at = cornerIndex(object.mesh, key);
      if (at < 0) continue;
      const du = uv[at * 2] - p[0];
      const dv = uv[at * 2 + 1] - p[1];
      if (Math.abs(du) < 1e-9 && Math.abs(dv) < 1e-9) continue;
      deltas.set(key, [du, dv]);
      any = true;
    }
    if (any) recordManual(recipe, fingerprint, deltas);
    return any;
  }

  /** 位置だけ描き直す。島の分け方は変わっていない。 */
  private rebuildGeometryOnly(): void {
    this.view.build(this.host.object(), this.host.recipe());
    this.refreshHighlight();
  }

  /* ---- 操作 ------------------------------------------------------------ */

  /** レシピどおりに開き直す。 */
  unfold(): void {
    const object = this.host.object();
    const recipe = this.host.recipe();
    if (!object || !recipe) return;
    const snapshot = this.host.snapshot();
    const r = recompute(object.mesh, recipe);
    this.host.commit("展開", snapshot);
    this.rebuild();
    this.host.changed(`展開 — 島 ${r.charts.length} / 伸び ×${r.maxStretch.toFixed(2)}`);
  }

  /** 選んだエッジを切る / 縫う。 */
  cutOrSew(cut: boolean): void {
    const recipe = this.host.recipe();
    const t = this.view.uvTopology;
    if (!recipe || !t) return;
    if (this.unit !== "edge" || !this.chosen.size) {
      this.host.toast("UV エッジを選んでから実行してください");
      return;
    }
    const snapshot = this.host.snapshot();
    let count = 0;
    for (const e of this.chosen) {
      const key = t.edgeKeys[e];
      if (!key) continue;
      if (cut ? !recipe.seams.has(key) : recipe.seams.has(key)) {
        if (cut) recipe.seams.add(key);
        else recipe.seams.delete(key);
        count++;
      }
    }
    if (!count) {
      this.host.toast(cut ? "すでに切れています" : "切れ目ではありません");
      return;
    }
    const object = this.host.object()!;
    recompute(object.mesh, recipe);
    this.host.commit(cut ? "カット" : "ソー", snapshot);
    this.chosen.clear();
    this.rebuild();
    this.host.changed(`${cut ? "カット" : "ソー"} — ${count} 本`);
  }

  /** 選んだ UV 頂点をピン留めする / 外す。 */
  pinOrUnpin(pin: boolean): void {
    const object = this.host.object();
    const recipe = this.host.recipe();
    const t = this.view.uvTopology;
    if (!object || !recipe || !t) return;
    if (this.unit !== "vertex" || !this.chosen.size) {
      this.host.toast("UV 頂点を選んでから実行してください");
      return;
    }
    const uv = object.mesh.uvSets.get(UV_SET);
    if (!uv) return;
    const snapshot = this.host.snapshot();
    for (const v of this.chosen) {
      for (const key of t.vertexCorners[v] ?? []) {
        if (pin) {
          const at = cornerIndex(object.mesh, key);
          recipe.pins.set(key, [uv[at * 2], uv[at * 2 + 1]]);
        } else {
          recipe.pins.delete(key);
        }
      }
    }
    this.host.commit(pin ? "ピン" : "ピン解除", snapshot);
    this.syncPins();
    this.refreshHighlight();
    this.host.changed(`${pin ? "ピン" : "ピン解除"} — ${this.chosen.size} 点`);
  }

  /** 島を反転・回転する。結果は差分として残る。 */
  transformSelection(kind: "flipU" | "flipV" | "rotate90"): void {
    const object = this.host.object();
    if (!object) return;
    const { corners, chart } = this.selectedCorners();
    if (!corners.length) {
      this.host.toast("選択してから実行してください");
      return;
    }
    const uv = object.mesh.uvSets.get(UV_SET);
    if (!uv) return;
    const snapshot = this.host.snapshot();
    const base = this.captureBase(corners);
    let cu = 0;
    let cv = 0;
    for (const [, p] of base) {
      cu += p[0];
      cv += p[1];
    }
    cu /= base.size;
    cv /= base.size;
    for (const [key, p] of base) {
      const at = cornerIndex(object.mesh, key);
      const du = p[0] - cu;
      const dv = p[1] - cv;
      if (kind === "flipU") uv[at * 2] = cu - du;
      else if (kind === "flipV") uv[at * 2 + 1] = cv - dv;
      else {
        uv[at * 2] = cu - dv;
        uv[at * 2 + 1] = cv + du;
      }
    }
    this.recordFrom(base, chart);
    this.host.commit({ flipU: "反転 U", flipV: "反転 V", rotate90: "90° 回転" }[kind], snapshot);
    this.rebuildGeometryOnly();
    this.host.changed(null);
  }

  /* ---- 指とペン -------------------------------------------------------- */

  private handlers(): GestureHandlers {
    return {
      toolDown: (p, e) => this.down(p, e),
      toolMove: (p) => this.move(p),
      toolUp: (p, e, moved) => this.up(p, e, moved),
      hover: () => {},
      hoverLeave: () => {},
      openMarkingMenu: (x, y, edit) => this.host.markingMenu(x, y, edit),
      openTwoFingerMenu: (x, y) => this.host.markingMenu(x, y, true),
      openCameraMenu: (x, y) => this.host.cameraMenu(x, y),
      undo: () => this.host.undo(),
      redo: () => this.host.redo(),
      abort: () => {
        this.drag = null;
        this.gesture = null;
      },
      transformBegin: () => this.gestureBegin(),
      transformUpdate: (t) => this.gestureUpdate(t),
      transformEnd: () => this.gestureEnd(),
      // 2D はどこを触ってもツール。タンブルは無い
      isOnMesh: () => true,
      zoomPivot: () => null,
      marqueeStart: () => {},
      tumble: () => {},
      pan: (dx, dy) => this.view.pan(dx, dy),
      dolly: (factor) => this.view.zoom(factor),
      dollyAbout: (_pivot, factor) => this.view.zoom(factor),
      shiftOn: (e) => this.host.shiftOn(e),
      altOn: () => false,
    };
  }

  private down(p: ScreenPoint, e: PointerEvent): void {
    const object = this.host.object();
    if (!object) return;
    const hit = this.pick(p, object);
    const add = this.host.shiftOn(e);
    const sub = this.host.ctrlOn(e);

    // すでに選んでいるものの上を押したら、そのまま動かす
    if (hit >= 0 && this.chosen.has(hit) && !add && !sub) {
      this.beginDrag(p, e);
      return;
    }
    if (hit < 0) {
      if (!add && !sub) {
        this.chosen.clear();
        this.refreshHighlight();
        this.host.syncToView([]);
      }
      return;
    }
    if (sub) this.chosen.delete(hit);
    else {
      if (!add) this.chosen.clear();
      this.chosen.add(hit);
    }
    this.refreshHighlight();
    this.host.syncToView(this.facesOfSelection());
    this.beginDrag(p, e);
  }

  private pick(p: ScreenPoint, object: SceneObject): number {
    if (this.unit === "vertex") return this.view.pickVertex(p, VERTEX_RADIUS);
    if (this.unit === "edge") return this.view.pickEdge(p, EDGE_RADIUS);
    const face = this.view.pickFace(p, object);
    if (face < 0) return -1;
    return this.view.uvTopology?.chartOfFace.get(face) ?? -1;
  }

  private beginDrag(p: ScreenPoint, e: PointerEvent): void {
    const { corners, chart } = this.selectedCorners();
    if (!corners.length) return;
    this.drag = {
      start: p,
      base: this.captureBase(corners),
      chart,
      snapshot: this.host.snapshot(),
      moved: false,
      pending: e.pointerType !== "mouse",
      t0: performance.now(),
    };
  }

  private move(p: ScreenPoint): void {
    const drag = this.drag;
    if (!drag) return;
    // 待たせている間は UV を触らない。離せばただのタップになる
    if (drag.pending) {
      const d = Math.hypot(p.x - drag.start.x, p.y - drag.start.y);
      const held = performance.now() - drag.t0;
      if (d <= TAP_MOVE && !(d > TOOL_MOVE && held > TAP_DURATION)) return;
      drag.pending = false;
    }
    const k = this.view.pixelToUv();
    const du = (p.x - drag.start.x) * k;
    const dv = -(p.y - drag.start.y) * k;
    if (Math.abs(du) > 1e-9 || Math.abs(dv) > 1e-9) drag.moved = true;
    this.applyOffset(drag.base, du, dv);
    this.host.hint(`移動 <kbd>${du.toFixed(3)}, ${dv.toFixed(3)}</kbd>`);
  }

  private up(_p: ScreenPoint, _e: PointerEvent, _moved: boolean): void {
    const drag = this.drag;
    this.drag = null;
    if (!drag || !drag.moved) return;
    if (this.recordFrom(drag.base, drag.chart)) this.host.commit("UV を移動", drag.snapshot);
    this.host.changed(null);
  }

  private gestureBegin(): boolean {
    const { corners, chart } = this.selectedCorners();
    if (!corners.length) return false;
    this.gesture = { base: this.captureBase(corners), chart, snapshot: this.host.snapshot(), moved: false };
    return true;
  }

  private gestureUpdate(t: GestureDelta): void {
    const g = this.gesture;
    if (!g) return;
    g.moved = true;
    const k = this.view.pixelToUv();
    if (t.kind === "scale") {
      this.applyOffset(g.base, 0, 0, Math.max(0.02, t.scale));
      this.host.hint(`スケール <kbd>×${t.scale.toFixed(2)}</kbd> · 指 3 本`);
      return;
    }
    // 上下は V、左右は U（3D の「上下 = Y、左右 = X か Z」と同じ考え方）
    const du = t.axis === "horizontal" ? t.pixels * k : 0;
    const dv = t.axis === "vertical" ? -t.pixels * k : 0;
    this.applyOffset(g.base, du, dv);
    this.host.hint(`移動 <kbd>${t.axis === "vertical" ? "V" : "U"} ${(du + dv).toFixed(3)}</kbd> · 指 3 本`);
  }

  private gestureEnd(): void {
    const g = this.gesture;
    this.gesture = null;
    if (!g || !g.moved) return;
    if (this.recordFrom(g.base, g.chart)) this.host.commit("UV を変形", g.snapshot);
    this.host.changed(null);
  }

  /** F ボタン。選択、無ければ 0〜1 にフレーム。 */
  frame(): void {
    const t = this.view.uvTopology;
    const { corners } = this.selectedCorners();
    const object = this.host.object();
    if (!t || !object || !corners.length) return this.view.frameUnit();
    const uv = object.mesh.uvSets.get(UV_SET);
    if (!uv) return this.view.frameUnit();
    this.view.framepoints(
      corners.map((key) => {
        const at = cornerIndex(object.mesh, key);
        return { u: uv[at * 2], v: uv[at * 2 + 1] };
      }),
    );
  }
}
