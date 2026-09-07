/**
 * アプリ本体。状態・描画・入力・保存をつなぐ。
 *
 * プロトタイプ（prototype/modeling-ui-prototype.html）からの移植途中。
 * 移植が済んだ順に、ここへ機能が増えていく。docs/10 の土台フェーズ。
 */
import { Matrix4, Raycaster, Vector3 } from "three";
import {
  PRIMITIVES,
  PRIMITIVE_ORDER,
  cloneTransform,
  collapseFaces,
  compact,
  deleteFaces,
  dissolveEdges,
  extrudeEdges,
  extrudeFaces,
  weldVertices,
  parseObj,
  subdivide,
  writeObj,
  type SceneObject,
} from "../core/index.js";
import { GestureRouter, type GestureHandlers } from "./input/gestures.js";
import { Picker, type ScreenPoint } from "./render/picking.js";
import { Viewport } from "./render/viewport.js";
import { HANDLE_TWEAK, Manipulator, TOUCH_TOLERANCE, handleKind } from "./render/manipulator.js";
import { AppState, type CompMode, type Display, type Manip } from "./state.js";
import { History } from "./history.js";
import { Autosave } from "./storage/autosave.js";
import { openFile, saveAs, saveMethodLabel } from "./storage/files.js";
import { MultiCut } from "./tools/multicut.js";
import { Selector } from "./tools/select.js";
import { mirrorPairs, softWeights } from "./tools/softSelect.js";
import { beginDrag, updateDrag, type DragState, type DragTarget } from "./tools/transform.js";
import { applyTransform } from "./render/meshView.js";
import { Docking, type Zone } from "./ui/docking.js";
import { byId, el } from "./ui/dom.js";
import { Gauge } from "./ui/gauges.js";
import { Hud } from "./ui/hud.js";
import { panelShell, renderOptions, renderOutliner, type PanelHost } from "./ui/panels.js";
import { ICONS, iconSvg } from "./ui/icons.js";
import { attachRadialButton, closeRadial, openRadial, type RadialMenu } from "./ui/radial.js";

const COMP_MODES: Array<{ id: CompMode; label: string; key: string }> = [
  { id: "object", label: "オブジェクト", key: "F8" },
  { id: "vertex", label: "頂点", key: "F9" },
  { id: "edge", label: "エッジ", key: "F10" },
  { id: "face", label: "フェース", key: "F11" },
];

const DISPLAY_KEYS: Record<string, Display> = { "4": "wire", "5": "shaded", "6": "shadedWire", "7": "smooth" };

const COMP_ICONS: Record<CompMode, string> = {
  object: ICONS.vObj,
  vertex: ICONS.vVert,
  edge: ICONS.vEdge,
  face: ICONS.vFace,
};

const PRIMITIVE_ICONS: Record<string, string> = {
  cube: ICONS.pCube,
  sphere: ICONS.pSphere,
  cylinder: ICONS.pCylinder,
  cone: ICONS.pCone,
  torus: ICONS.pTorus,
  plane: ICONS.pPlane,
  disk: ICONS.pDisk,
  platonic: ICONS.pPlatonic,
};

export class App {
  readonly state = new AppState();
  readonly history = new History(this.state);
  private viewport: Viewport;
  private picker: Picker;
  private selector: Selector;
  private autosave = new Autosave(this.state);
  private hud = new Hud(this.state);
  private gauges: Gauge[] = [];
  private marqueeEl = byId("marquee");
  private marquee: { x0: number; y0: number; x1: number; y1: number } | null = null;
  private popup: HTMLElement | null = null;
  private router: GestureRouter;
  private manipulator: Manipulator;
  private multicut: MultiCut;
  private docking: Docking;
  /** パネルの置き場所。移したら覚えて、次に開いたときに戻す。 */
  private zones: Record<string, Zone> = { tools: "left", options: "rightTop", outliner: "rightBottom" };
  private optionsBody: HTMLElement | null = null;
  private outlinerBody: HTMLElement | null = null;
  /** スライダーを触り始めたときの状態。離したときに履歴へ積む。 */
  private paramSnapshot: ReturnType<History["snapshot"]> | null = null;
  private drag: DragState | null = null;
  /** ドラッグ開始前のスナップショット。動いたときだけ履歴に積む。 */
  private dragSnapshot: ReturnType<History["snapshot"]> | null = null;
  private raycaster = new Raycaster();

  constructor() {
    const vp = byId("vp");
    const canvas = byId<HTMLCanvasElement>("gl");
    this.viewport = new Viewport(vp, canvas, this.state);
    this.picker = new Picker(this.viewport, vp);
    this.selector = new Selector(this.state, this.picker, (id) => {
      const o = this.state.doc.find(id);
      return o ? this.viewport.viewOf(o) : undefined;
    });

    this.multicut = new MultiCut(this.state, this.picker, this.viewport.preview);

    // ソフト選択の影響範囲をオーバーレイに出すため、重みの求め方を渡しておく
    this.viewport.softWeightsProvider = () => {
      const o = this.state.selected;
      if (!o) return new Map();
      return softWeights(o.mesh, this.selector.selectedVertices(), {
        strength: this.state.soft.strength,
        radius: this.state.soft.radius,
        enabled: true,
      }).weights;
    };

    this.manipulator = new Manipulator({
      toScreen: (v) => {
        const p = v.clone().project(this.viewport.camera);
        return {
          x: ((p.x + 1) / 2) * (vp.clientWidth || 1),
          y: ((-p.y + 1) / 2) * (vp.clientHeight || 1),
          z: p.z,
        };
      },
      camera: () => this.viewport.camera,
      orthoDistance: () => (this.state.camOpts.ortho ? this.viewport.cam.distance : null),
    });
    this.viewport.manip.add(this.manipulator.group);

    this.history.onChange = () => {
      this.updateHistoryButtons();
      this.autosave.schedule();
    };
    this.autosave.onSaved = (at) =>
      this.hud.setSaveNote(`自動保存 ${new Date(at).toLocaleTimeString("ja-JP", { timeStyle: "short" })}`);
    this.autosave.onError = (m) => this.hud.toast(m);

    this.router = new GestureRouter(canvas, (e) => this.picker.local(e), this.gestureHandlers());
    this.router.attach();
    this.docking = new Docking(byId("stage"), {
      onZoneChange: (key, zone) => {
        this.zones[key] = zone;
        localStorage.setItem("macbeth.panelZones", JSON.stringify(this.zones));
      },
      onMessage: (text) => this.hud.toast(text),
      onLayoutChange: () => this.viewport.resize(),
    });
    try {
      const saved = localStorage.getItem("macbeth.panelZones");
      if (saved) this.zones = { ...this.zones, ...(JSON.parse(saved) as Record<string, Zone>) };
    } catch {
      /* 保存が壊れていても既定の配置で始める */
    }
    this.buildToolDock();
    this.buildPanels();
    this.buildGauges();
    this.buildCluster();
    this.bindKeyboard();
    this.bindTopBar();

    window.addEventListener("resize", () => this.viewport.resize());
    this.viewport.resize();
    this.viewport.start();
  }

  /** 起動。前回の続きがあれば復元し、無ければ立方体を 1 つ置く。 */
  async boot(): Promise<void> {
    const restored = await this.autosave.restore();
    if (!restored) this.state.doc.addObject("cube");
    this.state.select(this.state.doc.objects[0] ?? null);
    this.viewport.syncAll();
    // 起動時の画角はプロトタイプと同じ既定値のまま。F を押せば選択に寄る
    this.refresh();
    this.hud.defaultHint();
    if (restored) this.hud.toast("前回の続きを復元しました");
    else this.hud.setSaveNote(saveMethodLabel());
  }

  /* ---- 入力の割り振り -------------------------------------------------- */

  private gestureHandlers(): GestureHandlers {
    return {
      toolDown: (p, e) => this.startTool(p, e),
      toolMove: (p, e) => this.moveTool(p, e),
      toolUp: (p, e, moved) => this.finishTool(p, e, moved),
      hover: (p, e) => this.updateCutPreview(p, e),
      hoverLeave: () => this.multicut.clear(),
      openMarkingMenu: (x, y, edit) => this.openMarkingMenu(x, y, edit),
      undo: () => this.doUndo(),
      redo: () => this.doRedo(),
      abort: () => {
        this.endMarquee();
        this.drag = null;
        this.dragSnapshot = null;
        this.manipulator.hot = -1;
        this.multicut.clear();
      },
      // 指で置いた場所がツールの対象か。マニピュレータのハンドルは
      // メッシュの外にはみ出すので、面のヒットだけで判定すると指でつかめない
      isOnMesh: (p, e) => {
        const tol = this.tolerance(e);
        if (this.state.selected && this.manipulator.pick(p, this.pivotWorld(), this.state.manip, tol) >= 0) {
          return true;
        }
        return this.hitSelectedComponent(p, tol) || !!this.picker.pickSurface(p);
      },
      zoomPivot: () => this.pivotWorld(),
      marqueeStart: (p) => this.startMarquee(p),
      tumble: (dx, dy) => this.viewport.tumble(dx, dy),
      pan: (dx, dy) => this.viewport.pan(dx, dy),
      dolly: (f) => this.viewport.dolly(f),
      dollyAbout: (pivot, f) => this.viewport.dollyAbout(pivot, f),
      shiftOn: (e) => this.state.modOn("shift") || e.shiftKey,
      altOn: (e) => this.state.modOn("alt") || e.altKey,
    };
  }

  /* ---- ツールの押下・移動・解放 ---------------------------------------- */

  private ray(p: ScreenPoint) {
    this.raycaster.setFromCamera(this.picker.ndc(p), this.viewport.camera);
    return this.raycaster.ray;
  }

  private cameraPosition(): Vector3 {
    return this.viewport.camera.position;
  }

  /** ペンとマウスは 1.0、指は当たりが粗いので広げる。 */
  private tolerance(e: PointerEvent): number {
    return e.pointerType === "touch" ? TOUCH_TOLERANCE : 1;
  }

  /** 選択中のコンポーネントを直接つかんだか（Maya のツイークに相当）。 */
  private hitSelectedComponent(p: ScreenPoint, tolerance = 1): boolean {
    const o = this.state.selected;
    const view = o ? this.viewport.viewOf(o) : undefined;
    if (!o || !view || !this.state.comp.size) return false;
    if (this.state.compMode === "face") {
      const hit = this.picker.pickSurface(p);
      return !!hit && hit.object === o && this.state.comp.has(hit.face);
    }
    if (this.state.compMode === "vertex") {
      const v = this.picker.pickVertex(view, p, 22 * tolerance);
      return v >= 0 && this.state.comp.has(v);
    }
    if (this.state.compMode === "edge") {
      const r = this.picker.pickEdge(view, p, 16 * tolerance);
      return r.edge >= 0 && this.state.comp.has(r.edge);
    }
    return false;
  }

  /** ドラッグ開始時に動かす対象を控える。ソフト選択と対称編集もここで決める。 */
  private captureTarget(): DragTarget | null {
    const o = this.state.selected;
    if (!o) return null;
    const view = this.viewport.viewOf(o);
    if (!view) return null;
    view.group.updateMatrixWorld();

    if (this.state.compMode === "object") {
      return { kind: "object", transform: cloneTransform(o.transform) };
    }

    const seeds = this.selector.selectedVertices();
    if (!seeds.length) return null;
    const soft = softWeights(o.mesh, seeds, {
      strength: this.state.soft.strength,
      radius: this.state.soft.radius,
      enabled: true,
    });
    if (soft.skipped) this.hud.toast("範囲が広すぎるのでソフト選択を省きました");

    const verts: number[] = [];
    const weights: number[] = [];
    const world: Vector3[] = [];
    for (const [v, w] of soft.weights) {
      const p = o.mesh.getPosition(v);
      verts.push(v);
      weights.push(w);
      world.push(new Vector3(p[0], p[1], p[2]).applyMatrix4(view.group.matrixWorld));
    }
    return {
      kind: "component",
      verts,
      weights,
      world,
      inverse: new Matrix4().copy(view.group.matrixWorld).invert(),
      mirror: this.state.symX ? mirrorPairs(o.mesh, verts) : [],
    };
  }

  /** マルチカットの予測線を引き直す。 */
  private updateCutPreview(p: ScreenPoint, e: PointerEvent): void {
    if (this.state.tool !== "multicut") return;
    const o = this.state.selected;
    const hint = this.multicut.update(
      p,
      o ? this.viewport.viewOf(o) : undefined,
      this.state.modOn("shift") || e.shiftKey,
    );
    if (hint) byId("hudHint").innerHTML = hint;
  }

  private startTool(p: ScreenPoint, e: PointerEvent): void {
    // マルチカットは押している間ずっと予測線、離した位置で確定する
    if (this.state.tool === "multicut") {
      this.updateCutPreview(p, e);
      return;
    }
    const o = this.state.selected;
    const pivot = this.pivotWorld();
    const tol = this.tolerance(e);
    let handle = o ? this.manipulator.pick(p, pivot, this.state.manip, tol) : -1;
    // ハンドルを外しても、選択中のコンポーネントの上ならつかんだ扱いにする
    if (handle < 0 && o && this.state.compMode !== "object" && this.hitSelectedComponent(p, tol)) {
      handle = HANDLE_TWEAK;
    }
    if (handle < 0 || !o || !pivot) {
      this.startMarquee(p);
      return;
    }

    const snapshot = this.history.snapshot();
    let label = { move: "移動", rotate: "回転", scale: "スケール" }[handleKind(handle) ?? "move"];

    // Shift + 移動 = 押し出してから移動（Maya と同じ）
    if (
      handleKind(handle) === "move" &&
      this.state.compMode !== "object" &&
      this.state.comp.size &&
      (this.state.modOn("shift") || e.shiftKey)
    ) {
      if (this.extrudeForDrag(o)) label = "押し出し";
    }

    const target = this.captureTarget();
    if (!target) {
      this.startMarquee(p);
      return;
    }

    this.dragSnapshot = snapshot;
    this.drag = beginDrag({
      handle,
      pivot: this.pivotWorld() ?? pivot,
      target,
      point: p,
      pivotScreen: this.manipulator.toScreen(this.pivotWorld() ?? pivot),
      ray: this.ray(p),
      cameraPosition: this.cameraPosition(),
      label,
    });
    this.manipulator.hot = handle;
    this.refreshManipulator();
  }

  /** Shift ドラッグの押し出し。面とエッジに対応。頂点はそのまま移動する。 */
  private extrudeForDrag(o: SceneObject): boolean {
    if (this.state.compMode === "face") {
      const r = extrudeFaces(o.mesh, this.state.comp, 0);
      if (!r) return false;
      o.mesh = r.mesh;
      o.markTopologyChanged();
      this.viewport.rebuildObject(o);
      this.viewport.rebuildOverlay();
      return true;
    }
    if (this.state.compMode === "edge") {
      const view = this.viewport.viewOf(o);
      if (!view) return false;
      const edges = [...this.state.comp].map((i) => view.edges[i]).filter(Boolean);
      const r = extrudeEdges(o.mesh, edges, 0);
      if (!r) return false;
      o.mesh = r.mesh;
      o.markTopologyChanged();
      this.viewport.rebuildObject(o);
      const next = this.viewport.viewOf(o);
      if (next) {
        // 押し出しでできた新しいエッジを選択に置き換える
        const keys = new Set(r.newEdges.map(([a, b]) => `${Math.min(a, b)}_${Math.max(a, b)}`));
        this.state.comp.clear();
        next.edges.forEach(([a, b], i) => {
          if (keys.has(`${Math.min(a, b)}_${Math.max(a, b)}`)) this.state.comp.add(i);
        });
      }
      this.viewport.rebuildOverlay();
      return true;
    }
    this.hud.toast("頂点の押し出しは未対応です（そのまま移動します）");
    return false;
  }

  private moveTool(p: ScreenPoint, e: PointerEvent): void {
    if (this.state.tool === "multicut") return this.updateCutPreview(p, e);
    if (this.marquee) return this.updateMarquee(p);
    const drag = this.drag;
    const o = this.state.selected;
    if (!drag || !o) return;
    void e;
    updateDrag(drag, o, p, this.ray(p), this.cameraPosition());
    if (drag.target.kind === "object") {
      const view = this.viewport.viewOf(o);
      if (view) {
        applyTransform(view.group, o.transform);
        view.group.updateMatrixWorld();
      }
    } else {
      this.viewport.refreshPositions(o);
    }
    this.viewport.rebuildOverlay();
    this.refreshManipulator();
    this.hud.refreshStats();
  }

  private finishTool(p: ScreenPoint, e: PointerEvent, moved: boolean): void {
    if (this.state.tool === "multicut") {
      this.doMultiCut();
      if (this.state.releaseLatches()) this.syncModButtons();
      return;
    }
    const m = this.marquee;
    if (m) {
      this.endMarquee();
      const r = this.selector.marquee(m.x0, m.y0, m.x1, m.y1, p, e);
      this.applySelectResult(r);
    } else if (this.drag) {
      const drag = this.drag;
      this.drag = null;
      this.manipulator.hot = -1;
      // 動かさずに離したなら、何も変えていないので選択として扱う。
      // マニピュレータの中心は選択の中心に出るので、これがないと
      // 選び直しやダブルクリックがハンドルに吸われてしまう。
      // ただし Shift 押し出しは押した時点でメッシュが変わっているので確定する。
      if (!moved && drag.label !== "押し出し") {
        this.dragSnapshot = null;
        this.applySelectResult(this.selector.click(p, e));
      } else if (this.dragSnapshot) {
        this.history.commit(drag.label, this.dragSnapshot);
        this.dragSnapshot = null;
        this.hud.toast(drag.label);
      } else {
        this.dragSnapshot = null;
      }
      this.refresh();
    } else if (!moved) {
      this.applySelectResult(this.selector.click(p, e));
    }
    if (this.state.releaseLatches()) this.syncModButtons();
  }

  /** 予測どおりに切る。 */
  private doMultiCut(): void {
    const o = this.state.selected;
    if (!o) return;
    const snapshot = this.history.snapshot();
    const r = this.multicut.commit(this.viewport.viewOf(o));
    if (!r) return;
    o.markTopologyChanged();
    this.state.comp.clear();
    this.history.commit("エッジループ挿入", snapshot);
    this.viewport.rebuildObject(o);
    this.viewport.rebuildOverlay();
    this.refresh();
    this.hud.toast(`エッジループを挿入しました — ${r.faceCount} 面`);
  }

  /** マニピュレータを今の選択に合わせる。 */
  private refreshManipulator(): void {
    if (this.state.tool !== "select") {
      this.manipulator.clear();
      return;
    }
    const signature = [
      this.state.compMode,
      this.state.selected?.id ?? "-",
      this.state.comp.size,
      this.state.tool,
    ].join(",");
    this.manipulator.rebuild(this.pivotWorld(), this.state.manip, signature);
  }

  setTool(tool: string): void {
    if (this.state.tool === tool) return;
    this.state.tool = tool;
    this.multicut.clear();
    this.manipulator.clear();
    this.refresh();
    for (const b of document.querySelectorAll<HTMLElement>("[data-tool]")) {
      b.setAttribute("aria-pressed", String(b.dataset.tool === tool));
    }
    this.hud.toast(tool === "multicut" ? "マルチカット" : "選択・変形");
    this.hud.defaultHint();
  }

  setDisplay(display: Display): void {
    this.state.display = display;
    // 「シェード」はすべてハードエッジなので、法線を作り直す必要がある
    this.viewport.syncAll();
    this.refresh();
    this.hud.toast(
      { wire: "ワイヤーフレーム", shaded: "シェード", shadedWire: "シェード + ワイヤー", smooth: "スムースシェード" }[
        display
      ],
    );
  }

  private cycleDisplay(): void {
    const order: Display[] = ["wire", "shaded", "shadedWire", "smooth"];
    this.setDisplay(order[(order.indexOf(this.state.display) + 1) % order.length]);
  }

  /** カメラ設定。Maya のカメラアトリビュートに合わせてある。 */
  private openCameraPopup(anchor: HTMLElement): void {
    this.closePopup();
    const r = anchor.getBoundingClientRect();
    const pop = el("div", "panel floating");
    pop.style.left = `${r.right + 6}px`;
    pop.style.top = `${r.top}px`;
    const body = el("div", "pbody");

    const aov = el("div", "hint");
    const updateAov = () => {
      // 35mm アカデミーのフィルムゲート幅 24mm から画角を出す
      const deg = (2 * Math.atan(24 / (2 * this.state.camOpts.focal)) * 180) / Math.PI;
      aov.textContent = `アングル オブ ビュー  ${deg.toFixed(2)}°\nフィルム ゲート  35mm アカデミー`;
    };

    const row = (label: string, key: "focal" | "near" | "far", min: number, max: number, step: number) => {
      const wrap = el("div", "row");
      wrap.appendChild(el("label", undefined, label));
      const num = el("input", "num") as HTMLInputElement;
      num.type = "text";
      num.readOnly = true;
      num.value = String(this.state.camOpts[key]);
      wrap.appendChild(num);
      const slider = el("input", "slider") as HTMLInputElement;
      slider.type = "range";
      slider.min = String(min);
      slider.max = String(max);
      slider.step = String(step);
      slider.value = String(this.state.camOpts[key]);
      slider.addEventListener("input", () => {
        const v = Number(slider.value);
        this.state.camOpts[key] = v;
        num.value = String(v);
        this.viewport.applyCamera();
        updateAov();
        this.refreshManipulator();
      });
      wrap.appendChild(slider);
      body.appendChild(wrap);
    };

    row("焦点距離", "focal", 10, 200, 1);
    row("ニア クリップ", "near", 0.01, 1, 0.01);
    row("ファー クリップ", "far", 50, 2000, 10);
    updateAov();
    body.appendChild(aov);

    const ortho = el("button", "chk");
    ortho.setAttribute("aria-pressed", String(this.state.camOpts.ortho));
    ortho.appendChild(el("i"));
    ortho.appendChild(el("span", undefined, "平行投影"));
    ortho.addEventListener("click", () => {
      this.state.camOpts.ortho = !this.state.camOpts.ortho;
      ortho.setAttribute("aria-pressed", String(this.state.camOpts.ortho));
      this.viewport.applyCamera();
      this.refresh();
    });
    body.appendChild(ortho);

    pop.appendChild(body);
    document.body.appendChild(pop);
    this.popup = pop;
  }

  setManip(manip: Manip): void {
    this.state.manip = manip;
    this.manipulator.clear();
    this.refreshManipulator();
    this.hud.toast(`マニピュレータ: ${{ all: "ユニバーサル", move: "移動", rotate: "回転", scale: "スケール" }[manip]}`);
  }

  private applySelectResult(r: { changed: boolean; objectChanged: boolean; message?: string }): void {
    if (!r.changed) return;
    if (r.objectChanged) this.viewport.applyDisplayAll();
    this.viewport.rebuildOverlay();
    this.refresh();
    if (r.message) this.hud.toast(r.message);
  }

  /* ---- 矩形選択 -------------------------------------------------------- */

  private startMarquee(p: ScreenPoint): void {
    this.marquee = { x0: p.x, y0: p.y, x1: p.x, y1: p.y };
    this.marqueeEl.style.display = "block";
    this.updateMarquee(p);
  }

  private updateMarquee(p: ScreenPoint): void {
    const m = this.marquee;
    if (!m) return;
    m.x1 = p.x;
    m.y1 = p.y;
    this.marqueeEl.style.left = `${Math.min(m.x0, m.x1)}px`;
    this.marqueeEl.style.top = `${Math.min(m.y0, m.y1)}px`;
    this.marqueeEl.style.width = `${Math.abs(m.x1 - m.x0)}px`;
    this.marqueeEl.style.height = `${Math.abs(m.y1 - m.y0)}px`;
  }

  private endMarquee(): void {
    this.marquee = null;
    this.marqueeEl.style.display = "none";
  }

  /** 選択の中心（ワールド）。Maya と同じで、オブジェクトなら原点、コンポーネントなら境界箱の中心。 */
  private pivotWorld(): Vector3 | null {
    const o = this.state.selected;
    if (!o) return null;
    const view = this.viewport.viewOf(o);
    if (!view) return null;
    view.group.updateMatrixWorld();
    if (this.state.compMode === "object" || !this.state.comp.size) {
      return new Vector3().setFromMatrixPosition(view.group.matrixWorld);
    }
    const verts = this.selector.selectedVertices();
    if (!verts.length) return null;
    const min = new Vector3(Infinity, Infinity, Infinity);
    const max = new Vector3(-Infinity, -Infinity, -Infinity);
    for (const v of verts) {
      const p = o.mesh.getPosition(v);
      const w = new Vector3(p[0], p[1], p[2]).applyMatrix4(view.group.matrixWorld);
      min.min(w);
      max.max(w);
    }
    return min.add(max).multiplyScalar(0.5);
  }

  /* ---- マーキングメニュー ---------------------------------------------- */

  /**
   * 右クリック（PC）/ ビューポート長押し（タブレット）で開く。
   * 通常は選択モードの切り替え。Shift 側は編集メニュー（移植は順次）。
   * 配置は Maya のポリゴン用マーキングメニューと同じ 8 方位。
   */
  private openMarkingMenu(x: number, y: number, edit: boolean): void {
    this.closePopup();
    openRadial(edit ? this.editMenu() : this.selectModeMenu(), x, y);
  }

  /** マニピュレータの種類。長押しで出す。 */
  private manipMenu(): RadialMenu {
    return {
      N: { label: "ユニバーサル", sub: "All  T", icon: ICONS.xform, run: () => this.setManip("all") },
      E: { label: "移動", sub: "Move  W", icon: ICONS.move, run: () => this.setManip("move") },
      S: { label: "回転", sub: "Rotate  E", icon: ICONS.rotate, run: () => this.setManip("rotate") },
      W: { label: "スケール", sub: "Scale  R", icon: ICONS.scale, run: () => this.setManip("scale") },
    };
  }

  private shadingMenu(): RadialMenu {
    return {
      N: { label: "ワイヤーフレーム", sub: "4", icon: ICONS.wire, run: () => this.setDisplay("wire") },
      E: { label: "シェード", sub: "5", icon: ICONS.shaded, run: () => this.setDisplay("shaded") },
      S: { label: "シェード + ワイヤー", sub: "6", icon: ICONS.shadedWire, run: () => this.setDisplay("shadedWire") },
      W: { label: "スムースシェード", sub: "7", icon: ICONS.smooth, run: () => this.setDisplay("smooth") },
    };
  }

  private selectModeMenu(): RadialMenu {
    const todo = (name: string) => () => this.hud.toast(`${name} は未実装です`);
    return {
      N: { label: "エッジ", sub: "Edge", icon: ICONS.vEdge, run: () => this.setCompMode("edge") },
      NE: { label: "オブジェクト モード", sub: "Object", icon: ICONS.vObj, run: () => this.setCompMode("object") },
      // 東は空き。UV は選択モードではなく独立した UV モードにする
      SE: { label: "マルチ", sub: "Multi", icon: ICONS.vMulti, run: todo("マルチコンポーネント選択") },
      S: { label: "フェース", sub: "Face", icon: ICONS.vFace, run: () => this.setCompMode("face") },
      SW: { label: "頂点フェース", sub: "Vertex Face", icon: ICONS.vVertFace, run: todo("頂点フェース選択") },
      W: { label: "頂点", sub: "Vertex", icon: ICONS.vVert, run: () => this.setCompMode("vertex") },
    };
  }

  /** 編集メニュー。選択モードごとに中身が変わる。移植が済んだものから実装に差し替える。 */
  private editMenu(): RadialMenu {
    const todo = (name: string) => () => this.hud.toast(`${name} は未実装です`);
    if (this.state.compMode === "face") {
      return {
        N: { label: "押し出し", sub: "Extrude", icon: ICONS.extrude, run: () => this.doExtrudeFaces() },
        NE: { label: "ベベル", sub: "Bevel", icon: ICONS.scale, run: todo("ベベル") },
        E: { label: "ブリッジ", sub: "Bridge", icon: ICONS.vEdge, run: todo("ブリッジ") },
        SE: { label: "複製", sub: "Duplicate", icon: ICONS.dup, run: todo("フェースの複製") },
        S: { label: "削除", sub: "Delete", icon: ICONS.del, run: () => this.doDeleteFaces() },
        SW: { label: "コラプス", sub: "Collapse", icon: ICONS.vVert, run: () => this.doCollapseFaces() },
        W: { label: "スムース", sub: "Smooth", icon: ICONS.smooth, run: () => this.doSmooth() },
        NW: { label: "抽出", sub: "Extract", icon: ICONS.vFace, run: todo("抽出") },
      };
    }
    if (this.state.compMode === "edge") {
      return {
        N: { label: "押し出し", sub: "Extrude", icon: ICONS.extrude, run: () => this.doExtrudeEdgesMenu() },
        NE: { label: "ベベル", sub: "Bevel", icon: ICONS.scale, run: todo("ベベル") },
        E: { label: "ブリッジ", sub: "Bridge", icon: ICONS.vEdge, run: todo("ブリッジ") },
        SE: {
          label: "エッジループ挿入",
          sub: "Insert Loop",
          icon: ICONS.multicut,
          run: () => this.setTool("multicut"),
        },
        S: { label: "削除", sub: "Delete", icon: ICONS.del, run: () => this.doDeleteEdges() },
        SW: { label: "スピン", sub: "Spin", icon: ICONS.rotate, run: todo("スピンエッジ") },
        W: { label: "接続", sub: "Connect", icon: ICONS.vMulti, run: todo("接続") },
        NW: { label: "分離", sub: "Detach", icon: ICONS.vVertFace, run: todo("分離") },
      };
    }
    if (this.state.compMode === "vertex") {
      return {
        N: { label: "マージ", sub: "Merge", icon: ICONS.vVert, run: () => this.doMergeVertices() },
        NE: { label: "中心にマージ", sub: "To Center", icon: ICONS.vObj, run: () => this.doMergeVertices() },
        E: { label: "面取り", sub: "Chamfer", icon: ICONS.scale, run: todo("面取り") },
        SE: { label: "接続", sub: "Connect", icon: ICONS.vMulti, run: todo("接続") },
        S: { label: "削除", sub: "Delete", icon: ICONS.del, run: todo("頂点の削除") },
        SW: { label: "平均化", sub: "Average", icon: ICONS.smooth, run: todo("平均化") },
        W: { label: "分離", sub: "Detach", icon: ICONS.vVertFace, run: todo("分離") },
        NW: { label: "押し出し", sub: "Extrude", icon: ICONS.extrude, run: todo("頂点の押し出し") },
      };
    }
    return {
      N: { label: "スムース", sub: "Smooth", icon: ICONS.smooth, run: () => this.doSmooth() },
      NE: { label: "中心にピボット", sub: "Center Pivot", icon: ICONS.vObj, run: () => this.doCenterPivot() },
      E: { label: "分離", sub: "Separate", icon: ICONS.vVertFace, run: todo("分離") },
      SE: { label: "複製", sub: "Duplicate", icon: ICONS.dup, run: () => this.doDuplicate() },
      S: { label: "削除", sub: "Delete", icon: ICONS.del, run: () => this.doDelete() },
      SW: { label: "ミラー", sub: "Mirror", icon: ICONS.sym, run: todo("ミラー") },
      W: { label: "ブーリアン", sub: "Boolean", icon: ICONS.pCube, run: todo("ブーリアン") },
      NW: { label: "フリーズ", sub: "Freeze", icon: ICONS.vObj, run: () => this.doFreeze() },
    };
  }

  /* ---- 編集 ------------------------------------------------------------ */

  /** スムース（Catmull-Clark）。ディバイドの土台。 */
  private doSmooth(): void {
    const o = this.state.selected;
    if (!o) return void this.hud.toast("オブジェクトを選択してください");
    this.history.push("スムース");
    o.mesh = subdivide(o.mesh, 1);
    o.markTopologyChanged();
    this.state.comp.clear();
    this.viewport.rebuildObject(o);
    this.viewport.rebuildOverlay();
    this.refresh();
    this.hud.toast(`スムース — ${o.mesh.faceCount} 面`);
  }

  /**
   * トポロジを変える操作の共通処理。
   * パラメトリックなら通常メッシュに落とし、上位レベルも破棄する（docs/03）。
   */
  private applyTopologyChange(
    o: SceneObject,
    label: string,
    change: () => boolean,
    message: (o: SceneObject) => string,
  ): void {
    const snapshot = this.history.snapshot();
    if (!change()) return;
    const dropped = o.markTopologyChanged();
    this.state.comp.clear();
    this.history.commit(label, snapshot);
    this.viewport.rebuildObject(o);
    this.viewport.rebuildOverlay();
    this.refresh();
    let note = message(o);
    if (dropped.droppedLevels || dropped.droppedLayers) {
      note += ` · 上位レベル ${dropped.droppedLevels} とレイヤー ${dropped.droppedLayers} を破棄`;
    }
    this.hud.toast(note);
  }

  /** 対象を確かめる。合っていなければ理由を出して null。 */
  private requireComponents(mode: CompMode, least = 1): SceneObject | null {
    const o = this.state.selected;
    const name = { object: "オブジェクト", vertex: "頂点", edge: "エッジ", face: "フェース" }[mode];
    if (!o || this.state.compMode !== mode || this.state.comp.size < least) {
      this.hud.toast(`${name}モードで${least > 1 ? `${least} つ以上` : ""}選択してから実行してください`);
      return null;
    }
    return o;
  }

  private doExtrudeFaces(): void {
    const o = this.requireComponents("face");
    if (!o) return;
    let count = 0;
    this.applyTopologyChange(
      o,
      "押し出し",
      () => {
        const r = extrudeFaces(o.mesh, this.state.comp, this.state.toolOpts.extrudeDist);
        if (!r) return false;
        o.mesh = r.mesh;
        count = r.faceCount;
        return true;
      },
      () => `面を押し出し — ${count} 面`,
    );
  }

  private doExtrudeEdgesMenu(): void {
    const o = this.requireComponents("edge");
    if (!o) return;
    const view = this.viewport.viewOf(o);
    if (!view) return;
    const edges = [...this.state.comp].map((i) => view.edges[i]).filter(Boolean);
    let count = 0;
    this.applyTopologyChange(
      o,
      "エッジを押し出し",
      () => {
        const r = extrudeEdges(o.mesh, edges, this.state.toolOpts.extrudeDist);
        if (!r) return false;
        o.mesh = r.mesh;
        count = r.faceCount;
        return true;
      },
      () => `エッジを押し出し — ${count} 面`,
    );
  }

  private doDeleteFaces(): void {
    const o = this.requireComponents("face");
    if (!o) return;
    let removed = 0;
    this.applyTopologyChange(
      o,
      "面を削除",
      () => {
        const r = deleteFaces(o.mesh, this.state.comp);
        if (!r) return false;
        // 使われなくなった頂点はここで詰める
        o.mesh = compact(r.mesh);
        removed = r.removed;
        return true;
      },
      () => `${removed} 面を削除`,
    );
  }

  private doCollapseFaces(): void {
    const o = this.requireComponents("face");
    if (!o) return;
    this.applyTopologyChange(
      o,
      "コラプス",
      () => {
        const m = collapseFaces(o.mesh, this.state.comp);
        if (!m) return false;
        o.mesh = compact(m);
        return true;
      },
      () => "フェースをコラプス",
    );
  }

  private doMergeVertices(): void {
    const o = this.requireComponents("vertex", 2);
    if (!o) return;
    this.applyTopologyChange(
      o,
      "頂点をマージ",
      () => {
        o.mesh = compact(weldVertices(o.mesh, [[...this.state.comp]]));
        return true;
      },
      () => "頂点をマージ",
    );
  }

  private doDeleteEdges(): void {
    const o = this.requireComponents("edge");
    if (!o) return;
    const view = this.viewport.viewOf(o);
    if (!view) return;
    const edges = [...this.state.comp].map((i) => view.edges[i]).filter(Boolean);
    let merged = 0;
    const r = dissolveEdges(o.mesh, edges);
    if (!r) {
      this.hud.toast("結合できるエッジがありません（境界エッジは削除できません）");
      return;
    }
    this.applyTopologyChange(
      o,
      "エッジを削除",
      () => {
        o.mesh = r.mesh;
        merged = r.merged;
        return true;
      },
      () => `エッジを削除 — ${merged} 面を結合`,
    );
  }

  /** ピボットをメッシュの中心へ。座標はそのままで、原点だけ動かす。 */
  private doCenterPivot(): void {
    const o = this.state.selected;
    if (!o) return;
    this.history.push("中心にピボット");
    const c = o.mesh.boundsCenter();
    for (let v = 0; v < o.mesh.vertexCount; v++) {
      const p = o.mesh.getPosition(v);
      o.mesh.setPosition(v, p[0] - c[0], p[1] - c[1], p[2] - c[2]);
    }
    // 見た目が動かないよう、引いたぶんをトランスフォームへ戻す
    o.transform.position = [
      o.transform.position[0] + c[0] * o.transform.scale[0],
      o.transform.position[1] + c[1] * o.transform.scale[1],
      o.transform.position[2] + c[2] * o.transform.scale[2],
    ];
    o.parametric = false;
    this.viewport.rebuildObject(o);
    this.viewport.rebuildOverlay();
    this.refresh();
    this.hud.toast("ピボットを中心へ");
  }

  /** トランスフォームを頂点に焼き込んで、位置と回転とスケールを初期値に戻す。 */
  private doFreeze(): void {
    const o = this.state.selected;
    if (!o) return;
    const view = this.viewport.viewOf(o);
    if (!view) return;
    this.history.push("フリーズ");
    view.group.updateMatrixWorld();
    const m = view.group.matrixWorld;
    for (let v = 0; v < o.mesh.vertexCount; v++) {
      const p = o.mesh.getPosition(v);
      const w = new Vector3(p[0], p[1], p[2]).applyMatrix4(m);
      o.mesh.setPosition(v, w.x, w.y, w.z);
    }
    o.transform = { position: [0, 0, 0], rotation: [0, 0, 0, 1], scale: [1, 1, 1] };
    o.parametric = false;
    this.viewport.rebuildObject(o);
    this.viewport.rebuildOverlay();
    this.refresh();
    this.hud.toast("トランスフォームをフリーズ");
  }

  private doDuplicate(): void {
    const o = this.state.selected;
    if (!o) return;
    this.history.push("複製");
    const copy = this.state.doc.addMesh(o.mesh.clone(), `${o.name}_copy`);
    copy.transform = cloneTransform(o.transform);
    this.state.select(copy);
    this.viewport.syncAll();
    this.refresh();
    this.hud.toast(`${copy.name} を複製しました`);
  }

  private doDelete(): void {
    const o = this.state.selected;
    if (!o) return;
    this.history.push("削除");
    this.state.doc.remove(o);
    this.state.select(null);
    this.viewport.syncAll();
    this.refresh();
    this.hud.toast(`${o.name} を削除しました`);
  }

  /* ---- 履歴 ------------------------------------------------------------ */

  private doUndo(): void {
    const label = this.history.undo();
    if (!label) return;
    this.viewport.syncAll();
    this.selector.reset();
    this.refresh();
    this.hud.toast(`元に戻す: ${label}`);
  }

  private doRedo(): void {
    const label = this.history.redo();
    if (!label) return;
    this.viewport.syncAll();
    this.selector.reset();
    this.refresh();
    this.hud.toast(`やり直す: ${label}`);
  }

  private updateHistoryButtons(): void {
    byId<HTMLButtonElement>("btnUndo").disabled = !this.history.canUndo;
    byId<HTMLButtonElement>("btnRedo").disabled = !this.history.canRedo;
  }

  /* ---- ツール列 -------------------------------------------------------- */

  private buildToolDock(): void {
    byId("dockLeft").textContent = "";
    const { panel, body } = panelShell("tools", "ツール");
    const col = el("div", "toolcol");

    // 「選択・変形」1 つ。長押しで移動 / 回転 / スケールの単独モードを選ぶ
    col.appendChild(el("div", "minilbl", "変形"));
    const xform = el("button", "ibtn");
    xform.innerHTML = iconSvg(ICONS.xform);
    xform.dataset.radial = "manip";
    xform.dataset.tool = "select";
    xform.title = "選択・変形（長押しで 移動 / 回転 / スケール）";
    xform.setAttribute("aria-pressed", "true");
    attachRadialButton(
      xform,
      () => this.manipMenu(),
      () => {
        this.setTool("select");
        this.setManip("all");
      },
    );
    col.appendChild(xform);

    const cut = el("button", "ibtn");
    cut.innerHTML = iconSvg(ICONS.multicut);
    cut.dataset.tool = "multicut";
    cut.title = "マルチカット（エッジループ挿入）";
    cut.setAttribute("aria-pressed", "false");
    cut.addEventListener("click", () => this.setTool("multicut"));
    col.appendChild(cut);

    col.appendChild(el("div", "tool-sep"));
    col.appendChild(el("div", "minilbl", "選択"));
    for (const m of COMP_MODES) {
      const b = el("button", "ibtn");
      b.innerHTML = iconSvg(COMP_ICONS[m.id]);
      b.title = `${m.label} (${m.key})`;
      b.setAttribute("aria-pressed", String(this.state.compMode === m.id));
      b.dataset.compMode = m.id;
      b.addEventListener("click", () => this.setCompMode(m.id));
      col.appendChild(b);
    }

    col.appendChild(el("div", "tool-sep"));
    col.appendChild(el("div", "minilbl", "表示"));

    const shade = el("button", "ibtn");
    shade.innerHTML = iconSvg(ICONS.shade);
    shade.dataset.radial = "shading";
    shade.title = "シェーディング（長押しで切り替え。4–7）";
    attachRadialButton(shade, () => this.shadingMenu(), () => this.cycleDisplay());
    col.appendChild(shade);

    const camera = el("button", "ibtn");
    camera.innerHTML = iconSvg(ICONS.camera);
    camera.title = "カメラ設定";
    camera.addEventListener("click", (e) => this.openCameraPopup(e.currentTarget as HTMLElement));
    col.appendChild(camera);

    col.appendChild(el("div", "tool-sep"));
    col.appendChild(el("div", "minilbl", "追加"));
    for (const id of PRIMITIVE_ORDER) {
      const def = PRIMITIVES[id];
      const b = el("button", "ibtn");
      b.innerHTML = iconSvg(PRIMITIVE_ICONS[id] ?? ICONS.prim);
      b.title = `${def.label} を原点に追加`;
      b.addEventListener("click", () => this.addPrimitive(id));
      col.appendChild(b);
    }

    body.appendChild(col);
    this.docking.attach(panel);
    this.docking.place(panel, this.zones.tools ?? "left");
  }

  /* ---- 右のパネル ------------------------------------------------------ */

  private buildPanels(): void {
    const options = panelShell("options", "オプション");
    this.docking.attach(options.panel);
    this.docking.place(options.panel, this.zones.options ?? "rightTop");
    this.optionsBody = options.body;

    const outliner = panelShell("outliner", "アウトライナ");
    this.docking.attach(outliner.panel);
    this.docking.place(outliner.panel, this.zones.outliner ?? "rightBottom");
    this.outlinerBody = outliner.body;
    this.renderPanels();

    this.viewport.resize();
  }

  private panelHost(): PanelHost {
    return {
      onParamInput: (o, key, value) => {
        this.paramSnapshot ??= this.history.snapshot();
        o.params[key] = value;
        o.rebuild();
        this.viewport.rebuildObject(o);
        this.viewport.rebuildOverlay();
        this.hud.refreshStats();
        this.refreshManipulator();
      },
      onParamCommit: (_o, label) => {
        if (!this.paramSnapshot) return;
        this.history.commit(label, this.paramSnapshot);
        this.paramSnapshot = null;
      },
      onSoftChange: (which, value) => {
        this.state.soft[which] = value;
        this.viewport.rebuildOverlay();
        this.refresh();
      },
      onCutChange: (key, value) => {
        if (key === "edgeFlow") this.state.cut.edgeFlow = value as boolean;
        else this.state.cut.snapStep = value as number;
      },
      onSmoothAngleChange: (value) => {
        this.state.smoothAngle = value;
        for (const o of this.state.doc.objects) this.viewport.rebuildObject(o);
      },
      onSelect: (o) => {
        this.state.select(o);
        this.viewport.applyDisplayAll();
        this.viewport.rebuildOverlay();
        this.refresh();
      },
      onRename: (o, name) => {
        this.history.push("名前変更");
        o.name = name;
        this.refresh();
      },
      onOutlinerMenu: (o, x, y) => {
        openRadial(
          {
            N: { label: "名前変更", sub: "Rename", icon: ICONS.rename, run: () => this.hud.toast("行をダブルタップでも変更できます") },
            E: {
              label: "複製",
              sub: "Duplicate",
              icon: ICONS.dup,
              run: () => {
                this.state.select(o);
                this.doDuplicate();
              },
            },
            S: {
              label: "削除",
              sub: "Delete",
              icon: ICONS.del,
              run: () => {
                this.state.select(o);
                this.doDelete();
              },
            },
            W: {
              label: "フレーム",
              sub: "Frame",
              icon: ICONS.frame,
              run: () => {
                this.state.select(o);
                this.refresh();
                this.viewport.frameSelected();
              },
            },
          },
          x,
          y,
        );
      },
    };
  }

  private renderPanels(): void {
    const host = this.panelHost();
    if (this.optionsBody) {
      renderOptions(
        this.optionsBody,
        {
          tool: this.state.tool,
          selected: this.state.selected,
          soft: this.state.soft,
          cut: this.state.cut,
          smoothAngle: this.state.smoothAngle,
          compMode: this.state.compMode,
        },
        host,
      );
    }
    if (this.outlinerBody) {
      renderOutliner(this.outlinerBody, this.state.doc.objects, this.state.selected, host);
    }
  }

  private addPrimitive(kind: string): void {
    this.history.push(`${PRIMITIVES[kind].label} を追加`);
    const o = this.state.doc.addObject(kind);
    this.state.select(o);
    this.viewport.syncAll();
    this.refresh();
    this.hud.toast(`${o.name} を追加しました`);
  }

  setCompMode(mode: CompMode): void {
    if (this.state.compMode === mode) return;
    this.state.compMode = mode;
    this.state.comp.clear();
    this.selector.reset();
    this.viewport.applyDisplayAll();
    this.viewport.rebuildOverlay();
    this.refresh();
    for (const b of document.querySelectorAll<HTMLElement>("[data-comp-mode]")) {
      b.setAttribute("aria-pressed", String(b.dataset.compMode === mode));
    }
    this.hud.toast(COMP_MODES.find((m) => m.id === mode)?.label ?? mode);
  }

  /* ---- ゲージと修飾キー ------------------------------------------------ */

  private buildGauges(): void {
    const onInput = () => this.viewport.rebuildOverlay();
    this.gauges = [
      new Gauge(this.state, "gauge1", "g1", "g1lbl", "g1val", onInput, () => this.refresh()),
      new Gauge(this.state, "gauge2", "g2", "g2lbl", "g2val", onInput, () => this.refresh()),
    ];
  }

  private buildCluster(): void {
    const cycle = (name: "shift" | "ctrl" | "alt") => {
      const cur = this.state.mods[name];
      this.state.mods[name] = cur === "off" ? "latch" : cur === "latch" ? "lock" : "off";
      this.syncModButtons();
    };
    byId("modShift").addEventListener("click", () => cycle("shift"));
    byId("modCtrl").addEventListener("click", () => cycle("ctrl"));
    byId("modAlt").addEventListener("click", () => cycle("alt"));

    // F は押しっぱなしで効く修飾。タップならフレーム
    const f = byId("btnFrame");
    f.addEventListener("touchstart", (e) => e.preventDefault(), { passive: false });
    f.addEventListener("pointerdown", (e) => {
      f.setPointerCapture(e.pointerId);
      this.fHeld = true;
    });
    for (const t of ["pointerup", "pointercancel"] as const) {
      f.addEventListener(t, () => {
        if (!this.fHeld) return;
        this.fHeld = false;
        if (!this.fChord) this.viewport.frameSelected();
        this.fChord = false;
      });
    }
  }

  /** F の押下状態は GestureRouter が持つ（矩形選択とピンチの分岐に使う）。 */
  private get fHeld(): boolean {
    return this.router.fHeld;
  }
  private set fHeld(v: boolean) {
    this.router.fHeld = v;
  }
  private get fChord(): boolean {
    return this.router.fChord;
  }
  private set fChord(v: boolean) {
    this.router.fChord = v;
  }

  private syncModButtons(): void {
    for (const [name, id] of [
      ["shift", "modShift"],
      ["ctrl", "modCtrl"],
      ["alt", "modAlt"],
    ] as const) {
      byId(id).dataset.state = this.state.mods[name];
    }
  }

  /* ---- キーボード ------------------------------------------------------ */

  private bindKeyboard(): void {
    window.addEventListener("keydown", (e) => {
      const target = e.target as HTMLElement | null;
      if (target && (target.tagName === "INPUT" || target.tagName === "TEXTAREA")) return;

      const mode = COMP_MODES.find((m) => m.key === e.key);
      if (mode) {
        e.preventDefault();
        this.setCompMode(mode.id);
        return;
      }
      const display = DISPLAY_KEYS[e.key];
      if (display) {
        this.setDisplay(display);
        return;
      }
      if (e.key === "f" || e.key === "F") {
        this.viewport.frameSelected();
        return;
      }
      // Maya と同じ割り当て。Q はツール解除の位置だが、ここではユニバーサルに戻す
      const manip = { q: "all", t: "all", w: "move", e: "rotate", r: "scale" }[e.key.toLowerCase()];
      if (manip && !e.ctrlKey && !e.metaKey) {
        this.setManip(manip as Manip);
        return;
      }
      if (e.key === "x" || e.key === "X") {
        this.state.symX = !this.state.symX;
        this.refresh();
        this.hud.toast(`対称編集 X: ${this.state.symX ? "オン" : "オフ"}`);
        return;
      }
      if ((e.ctrlKey || e.metaKey) && (e.key === "z" || e.key === "Z")) {
        e.preventDefault();
        if (e.shiftKey) this.doRedo();
        else this.doUndo();
        return;
      }
      if ((e.ctrlKey || e.metaKey) && (e.key === "y" || e.key === "Y")) {
        e.preventDefault();
        this.doRedo();
      }
    });
  }

  /* ---- ヘッダ ---------------------------------------------------------- */

  private bindTopBar(): void {
    byId("btnUndo").addEventListener("click", () => this.doUndo());
    byId("btnRedo").addEventListener("click", () => this.doRedo());
    byId("btnPanels").addEventListener("click", () => {
      this.state.panelsHidden = !this.state.panelsHidden;
      byId("btnPanels").setAttribute("aria-pressed", String(this.state.panelsHidden));
      byId("dockLeft").hidden = this.state.panelsHidden;
      byId("dockColRight").hidden = this.state.panelsHidden;
      this.viewport.resize();
    });
    byId("fileBtn").addEventListener("click", (e) => this.openFileMenu(e.currentTarget as HTMLElement));
    document.addEventListener("pointerdown", (e) => {
      if (this.popup && !this.popup.contains(e.target as Node)) this.closePopup();
    });
  }

  private closePopup(): void {
    this.popup?.remove();
    this.popup = null;
    closeRadial();
  }

  private openFileMenu(anchor: HTMLElement): void {
    this.closePopup();
    const r = anchor.getBoundingClientRect();
    const pop = el("div", "panel floating");
    pop.style.left = `${r.left}px`;
    pop.style.top = `${r.bottom + 2}px`;
    const body = el("div", "pbody");
    const item = (label: string, run: () => void | Promise<void>) => {
      const b = el("button", "act", label);
      b.addEventListener("click", () => {
        this.closePopup();
        void run();
      });
      body.appendChild(b);
    };
    item("新規シーン", () => this.newScene());
    item("プロジェクトを開く (.mbz)", () => this.openProject());
    item("プロジェクトを保存 (.mbz)", () => this.saveProject());
    item("OBJ を読み込む", () => this.importObj());
    item("OBJ を書き出す", () => this.exportObj());
    pop.appendChild(body);
    document.body.appendChild(pop);
    this.popup = pop;
  }

  /* ---- ファイル -------------------------------------------------------- */

  private async newScene(): Promise<void> {
    this.history.push("新規シーン");
    this.state.doc.objects.length = 0;
    this.state.select(null);
    this.state.doc.addObject("cube");
    this.state.select(this.state.doc.objects[0]);
    this.viewport.syncAll();
    this.refresh();
    await this.autosave.saveNow();
  }

  private async saveProject(): Promise<void> {
    const { packMbz } = await import("../core/index.js");
    const bytes = packMbz(this.state.doc, { appVersion: "0.1.0" });
    const name = `${this.state.doc.objects[0]?.name ?? "scene"}.mbz`;
    const r = await saveAs(bytes, name);
    this.hud.toast(r.saved ? `${name} を保存しました` : "保存を取り消しました");
  }

  private async openProject(): Promise<void> {
    const file = await openFile(".mbz");
    if (!file) return;
    try {
      const { unpackMbz } = await import("../core/index.js");
      const { document: doc } = unpackMbz(file.bytes);
      this.state.doc = doc;
      this.state.select(doc.objects[0] ?? null);
      this.history.clear();
      this.viewport.syncAll();
      this.viewport.frameSelected();
      this.refresh();
      this.hud.toast(`${file.name} を開きました`);
    } catch (err) {
      this.hud.toast(err instanceof Error ? err.message : "読み込めませんでした");
    }
  }

  private async importObj(): Promise<void> {
    const file = await openFile(".obj,text/plain");
    if (!file) return;
    try {
      const parsed = parseObj(file.text);
      if (!parsed.length) return void this.hud.toast("面が見つかりませんでした");
      this.history.push("OBJ 読み込み");
      let last: SceneObject | null = null;
      for (const g of parsed) last = this.state.doc.addMesh(g.mesh, g.name);
      this.state.select(last);
      this.viewport.syncAll();
      this.viewport.frameSelected();
      this.refresh();
      this.hud.toast(`${file.name} を読み込みました`);
    } catch (err) {
      this.hud.toast(err instanceof Error ? err.message : "読み込めませんでした");
    }
  }

  private async exportObj(): Promise<void> {
    const targets = this.state.selected ? [this.state.selected] : this.state.doc.objects;
    if (!targets.length) return void this.hud.toast("書き出すものがありません");
    const text = writeObj(targets.map((o) => ({ mesh: o.mesh, name: o.name })));
    const name = `${targets[0].name}.obj`;
    const r = await saveAs(text, name);
    this.hud.toast(r.saved ? `${name} を書き出しました` : "書き出しを取り消しました");
  }

  /* ---- 更新 ------------------------------------------------------------ */

  refresh(): void {
    this.viewport.applyDisplayAll();
    this.refreshManipulator();
    this.hud.refreshStats();
    for (const g of this.gauges) g.paint();
    this.updateHistoryButtons();
    // スライダーを触っている最中に描き直すと掴んでいる指が外れる
    if (!this.paramSnapshot) this.renderPanels();
  }
}
