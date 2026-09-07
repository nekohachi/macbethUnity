/**
 * アプリ本体。状態・描画・入力・保存をつなぐ。
 *
 * プロトタイプ（prototype/modeling-ui-prototype.html）からの移植途中。
 * 移植が済んだ順に、ここへ機能が増えていく。docs/10 の土台フェーズ。
 */
import { Vector3 } from "three";
import {
  PRIMITIVES,
  PRIMITIVE_ORDER,
  cloneTransform,
  parseObj,
  subdivide,
  writeObj,
  type SceneObject,
} from "../core/index.js";
import { GestureRouter, type GestureHandlers } from "./input/gestures.js";
import { Picker, type ScreenPoint } from "./render/picking.js";
import { Viewport } from "./render/viewport.js";
import { AppState, type CompMode, type Display } from "./state.js";
import { History } from "./history.js";
import { Autosave } from "./storage/autosave.js";
import { openFile, saveAs, saveMethodLabel } from "./storage/files.js";
import { Selector } from "./tools/select.js";
import { byId, el } from "./ui/dom.js";
import { Gauge } from "./ui/gauges.js";
import { Hud } from "./ui/hud.js";
import { ICONS, iconSvg } from "./ui/icons.js";
import { closeRadial, openRadial, type RadialMenu } from "./ui/radial.js";

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

  constructor() {
    const vp = byId("vp");
    const canvas = byId<HTMLCanvasElement>("gl");
    this.viewport = new Viewport(vp, canvas, this.state);
    this.picker = new Picker(this.viewport, vp);
    this.selector = new Selector(this.state, this.picker, (id) => {
      const o = this.state.doc.find(id);
      return o ? this.viewport.viewOf(o) : undefined;
    });

    this.history.onChange = () => {
      this.updateHistoryButtons();
      this.autosave.schedule();
    };
    this.autosave.onSaved = (at) =>
      this.hud.setSaveNote(`自動保存 ${new Date(at).toLocaleTimeString("ja-JP", { timeStyle: "short" })}`);
    this.autosave.onError = (m) => this.hud.toast(m);

    this.router = new GestureRouter(canvas, (e) => this.picker.local(e), this.gestureHandlers());
    this.router.attach();
    this.buildToolDock();
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
      toolDown: () => {},
      toolMove: (p) => this.updateMarquee(p),
      toolUp: (p, e, moved) => this.finishTool(p, e, moved),
      hover: () => {},
      hoverLeave: () => {},
      openMarkingMenu: (x, y, edit) => this.openMarkingMenu(x, y, edit),
      undo: () => this.doUndo(),
      redo: () => this.doRedo(),
      abort: () => this.endMarquee(),
      isOnMesh: (p) => !!this.picker.pickSurface(p),
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

  private finishTool(p: ScreenPoint, e: PointerEvent, moved: boolean): void {
    const m = this.marquee;
    if (m) {
      this.endMarquee();
      const r = this.selector.marquee(m.x0, m.y0, m.x1, m.y1, p, e);
      this.applySelectResult(r);
    } else if (!moved) {
      this.applySelectResult(this.selector.click(p, e));
    }
    if (this.state.releaseLatches()) this.syncModButtons();
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

  private selectModeMenu(): RadialMenu {
    const todo = (name: string) => () => this.hud.toast(`${name} は未実装です`);
    return {
      N: { label: "エッジ", sub: "Edge", icon: ICONS.vEdge, run: () => this.setCompMode("edge") },
      NE: { label: "オブジェクト モード", sub: "Object", icon: ICONS.vObj, run: () => this.setCompMode("object") },
      E: { label: "UV", sub: "UV ▸", icon: ICONS.vUV, run: todo("UV コンポーネント選択") },
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
        N: { label: "押し出し", sub: "Extrude", icon: ICONS.extrude, run: todo("押し出し") },
        NE: { label: "ベベル", sub: "Bevel", icon: ICONS.scale, run: todo("ベベル") },
        E: { label: "ブリッジ", sub: "Bridge", icon: ICONS.vEdge, run: todo("ブリッジ") },
        SE: { label: "複製", sub: "Duplicate", icon: ICONS.dup, run: todo("フェースの複製") },
        S: { label: "削除", sub: "Delete", icon: ICONS.del, run: todo("削除") },
        SW: { label: "コラプス", sub: "Collapse", icon: ICONS.vVert, run: todo("コラプス") },
        W: { label: "スムース", sub: "Smooth", icon: ICONS.smooth, run: () => this.doSmooth() },
        NW: { label: "抽出", sub: "Extract", icon: ICONS.vFace, run: todo("抽出") },
      };
    }
    if (this.state.compMode === "edge") {
      return {
        N: { label: "押し出し", sub: "Extrude", icon: ICONS.extrude, run: todo("押し出し") },
        NE: { label: "ベベル", sub: "Bevel", icon: ICONS.scale, run: todo("ベベル") },
        E: { label: "ブリッジ", sub: "Bridge", icon: ICONS.vEdge, run: todo("ブリッジ") },
        SE: { label: "エッジループ挿入", sub: "Insert Loop", icon: ICONS.multicut, run: todo("エッジループ挿入") },
        S: { label: "削除", sub: "Delete", icon: ICONS.del, run: todo("エッジの削除") },
        SW: { label: "スピン", sub: "Spin", icon: ICONS.rotate, run: todo("スピンエッジ") },
        W: { label: "接続", sub: "Connect", icon: ICONS.vMulti, run: todo("接続") },
        NW: { label: "分離", sub: "Detach", icon: ICONS.vVertFace, run: todo("分離") },
      };
    }
    if (this.state.compMode === "vertex") {
      return {
        N: { label: "マージ", sub: "Merge", icon: ICONS.vVert, run: todo("マージ") },
        NE: { label: "中心にマージ", sub: "To Center", icon: ICONS.vObj, run: todo("中心にマージ") },
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
      NE: { label: "中心にピボット", sub: "Center Pivot", icon: ICONS.vObj, run: todo("中心にピボット") },
      E: { label: "分離", sub: "Separate", icon: ICONS.vVertFace, run: todo("分離") },
      SE: { label: "複製", sub: "Duplicate", icon: ICONS.dup, run: () => this.doDuplicate() },
      S: { label: "削除", sub: "Delete", icon: ICONS.del, run: () => this.doDelete() },
      SW: { label: "ミラー", sub: "Mirror", icon: ICONS.sym, run: todo("ミラー") },
      W: { label: "ブーリアン", sub: "Boolean", icon: ICONS.pCube, run: todo("ブーリアン") },
      NW: { label: "フリーズ", sub: "Freeze", icon: ICONS.vObj, run: todo("フリーズ") },
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
    const dock = byId("dockLeft");
    dock.textContent = "";
    const panel = el("div", "panel");
    panel.dataset.panel = "tools";
    const head = el("div", "phead");
    head.appendChild(el("span", undefined, "ツール"));
    const body = el("div", "pbody");
    const col = el("div", "toolcol");

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
    panel.append(head, body);
    dock.appendChild(panel);
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
        this.state.display = display;
        this.viewport.syncAll();
        this.refresh();
        return;
      }
      if (e.key === "f" || e.key === "F") {
        this.viewport.frameSelected();
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
    this.hud.refreshStats();
    for (const g of this.gauges) g.paint();
    this.updateHistoryButtons();
  }
}
