/**
 * ビューポート。シーン、カメラ、描画ループ、オブジェクトの同期を持つ。
 *
 * カメラは Maya と同じ球座標（target / theta / phi / distance）。
 * PC の操作割り当ては input 側で行い、ここは動きだけを提供する。
 */
import {
  BackSide,
  Box3,
  BufferGeometry,
  DirectionalLight,
  DoubleSide,
  Float32BufferAttribute,
  FrontSide,
  GridHelper,
  Group,
  HemisphereLight,
  Line,
  LineBasicMaterial,
  LineSegments,
  Mesh as ThreeMesh,
  OrthographicCamera,
  PerspectiveCamera,
  Points,
  Scene,
  Vector3,
  WebGLRenderTarget,
  WebGLRenderer,
  type Camera,
  type MeshBasicMaterial,
  type MeshPhongMaterial,
} from "three";
import type { PaneLayout, SceneObject } from "../../core/index.js";
import { defaultCamOpts, type AppState, type PaneLike } from "../state.js";
import { MAT, checkerMaterial, heatMaterial } from "./materials.js";
import {
  applyTransform,
  buildObjectView,
  disposeObject3D,
  disposeViewMaterials,
  heatColors,
  positionGeometry,
  surfaceGeometry,
  wireGeometry,
  type ObjectView,
} from "./meshView.js";

export interface OrbitCamera {
  target: Vector3;
  theta: number;
  phi: number;
  distance: number;
}

export type ViewName = "persp" | "top" | "bottom" | "front" | "back" | "right" | "left";

/**
 * Maya と同じ標準ビュー。パース以外は平行投影にする。
 *
 * 真上・真下は視線が上方向ベクトルと重なって向きが決まらなくなるので、
 * φ をわずかにずらしてある（画面の上が Maya と同じ向きになる値）。
 */
export const STANDARD_VIEWS: Record<ViewName, { label: string; sub: string; theta: number; phi: number; ortho: boolean }> = {
  persp: { label: "パース", sub: "Persp", theta: 0.72, phi: 1.12, ortho: false },
  top: { label: "上", sub: "Top", theta: 0, phi: 0.001, ortho: true },
  bottom: { label: "下", sub: "Bottom", theta: 0, phi: Math.PI - 0.001, ortho: true },
  front: { label: "前", sub: "Front", theta: 0, phi: Math.PI / 2, ortho: true },
  back: { label: "後", sub: "Back", theta: Math.PI, phi: Math.PI / 2, ortho: true },
  right: { label: "右", sub: "Right", theta: Math.PI / 2, phi: Math.PI / 2, ortho: true },
  left: { label: "左", sub: "Left", theta: -Math.PI / 2, phi: Math.PI / 2, ortho: true },
};

const MIN_DIST = 0.3;
const MAX_DIST = 140;

/** ビューポートの分割（`25` の T6）。3 分割は入れない（指示書の T6）。 */
export type LayoutKind = "single" | "cols" | "rows" | "quad";

/** 分割したときの既定の向き。4 分割は Maya と同じ パース / 上 / 前 / 右。 */
const LAYOUT_VIEWS: Record<LayoutKind, ViewName[]> = {
  single: ["persp"],
  cols: ["persp", "front"],
  rows: ["persp", "front"],
  quad: ["persp", "top", "front", "right"],
};

/** 1 つのペイン。自分のカメラと自分のシェーディングを持つ。 */
export interface Pane extends PaneLike {
  /** 標準ビューのどれとして作ったか。 */
  view: ViewName;
  cam: OrbitCamera;
  persp: PerspectiveCamera;
  ortho: OrthographicCamera;
  /**
   * このペインだけで見せるオブジェクトの id（Maya の Isolate Select。`27` の T3）。
   * null なら全部見せる。`.mbz` には入れない（作業中の都合）。
   */
  isolate: Set<string> | null;
}

/** ペインの矩形（container の中の CSS ピクセル。左上が原点）。 */
export interface PaneRect {
  x: number;
  y: number;
  w: number;
  h: number;
}

function makePane(view: ViewName): Pane {
  const v = STANDARD_VIEWS[view];
  return {
    view,
    viewName: v.label,
    display: "shadedWire",
    camOpts: { ...defaultCamOpts(), ortho: v.ortho },
    cam: { target: new Vector3(0, 0.4, 0), theta: v.theta, phi: v.phi, distance: 7.2 },
    persp: new PerspectiveCamera(45, 1, 0.05, 500),
    ortho: new OrthographicCamera(-1, 1, 1, -1, 0.05, 500),
    isolate: null,
  };
}

export class Viewport {
  readonly renderer: WebGLRenderer;
  readonly scene = new Scene();
  /** 床のグリッド。サムネイルのときだけ消す。 */
  private grid!: GridHelper;

  readonly root = new Group();
  readonly overlay = new Group();
  readonly manip = new Group();
  /** マルチカットなどの予測表示。 */
  readonly preview = new Group();
  /** ホバーのプリセレクション。予測表示とは別の層にして、片方の消去が他方を巻き込まないようにする。 */
  readonly preselect = new Group();

  /* ---- ペイン（`25` の T6） -------------------------------------------- */

  layout: LayoutKind = "single";
  /**
   * 分割の比（`27` の T2）。左の列の幅と上の段の高さ、どちらも 0〜1。
   * 分割線を掴んで動かすと変わる。
   */
  split = { x: 0.5, y: 0.5 };
  panes: Pane[] = [makePane("persp")];
  /** 最後に触れたペイン。シェードとカメラはここに効く。 */
  active = 0;
  /**
   * 入力の座標に使うペイン。`picker.local()` が指の下のペインで更新する。
   * ホバーは触っていなくても起きるので、`active` とは分けてある。
   */
  inputPane = 0;
  /**
   * 指を置いている間は入力のペインを固定する。隣へはみ出しても
   * 座標の基準が入れ替わらないようにするため（`25` の T6）。
   */
  inputLocked = false;
  /** 分割の枠（DOM）。canvas の上に重ねる。当たり判定は持たない。 */
  private frames: HTMLElement | null = null;

  private views = new Map<string, ObjectView>();
  private frame = 0;

  constructor(
    private container: HTMLElement,
    canvas: HTMLCanvasElement,
    private state: AppState,
  ) {
    this.renderer = new WebGLRenderer({ canvas, antialias: true, alpha: true });
    this.renderer.setClearColor(0x000000, 0);
    this.scene.add(this.root, this.overlay, this.manip, this.preview, this.preselect);
    this.addLights();
    this.addGrid();
    this.state.pane = this.panes[0];
    this.applyCamera();
  }

  /** 今つながっているペイン（最後に触れたもの）。 */
  get pane(): Pane {
    return this.panes[this.active] ?? this.panes[0];
  }

  /** 入力の座標に使うペイン（指やポインタの下）。 */
  get inputPaneRef(): Pane {
    return this.panes[this.inputPane] ?? this.pane;
  }

  /** アクティブなペインのカメラ。今までの `camera` と同じ意味。 */
  get camera(): Camera {
    return this.cameraOf(this.inputPaneRef);
  }

  /** アクティブなペインの球座標。今までの `cam` と同じ意味。 */
  get cam(): OrbitCamera {
    return this.pane.cam;
  }

  cameraOf(p: Pane): Camera {
    return p.camOpts.ortho ? p.ortho : p.persp;
  }

  /** 分割の仕方を変える。ペインは作り直し、アクティブは先頭へ。 */
  setLayout(kind: LayoutKind): void {
    if (this.layout === kind) return;
    this.layout = kind;
    const views = LAYOUT_VIEWS[kind];
    const next: Pane[] = [];
    for (let i = 0; i < views.length; i++) {
      // 既にあるペインは中身を引き継ぐ（見ている向きを取り上げない）
      next.push(this.panes[i] ?? makePane(views[i]));
    }
    this.panes = next;
    this.setActive(0);
    this.resize();
  }

  setActive(i: number): void {
    this.active = Math.max(0, Math.min(this.panes.length - 1, i));
    this.inputPane = this.active;
    this.state.pane = this.panes[this.active];
    this.paintFrames();
  }

  /** ペインの矩形。container の中の CSS ピクセル。 */
  paneRect(i: number): PaneRect {
    const w = this.container.clientWidth || 1;
    const h = this.container.clientHeight || 1;
    // 分割線の位置。掴んで動かせる（`27` の T2）
    const sx = Math.round(w * this.split.x);
    const sy = Math.round(h * this.split.y);
    switch (this.layout) {
      case "cols":
        return i === 0 ? { x: 0, y: 0, w: sx, h } : { x: sx, y: 0, w: w - sx, h };
      case "rows":
        return i === 0 ? { x: 0, y: 0, w, h: sy } : { x: 0, y: sy, w, h: h - sy };
      case "quad":
        return {
          x: i % 2 === 0 ? 0 : sx,
          y: i < 2 ? 0 : sy,
          w: i % 2 === 0 ? sx : w - sx,
          h: i < 2 ? sy : h - sy,
        };
      default:
        return { x: 0, y: 0, w, h };
    }
  }

  /**
   * 分割線を動かす（`27` の T2）。`which` は縦線 / 横線、値は 0〜1 の比。
   * 端に寄せすぎるとペインが潰れるので 0.15〜0.85 で止める。
   */
  setSplit(which: "x" | "y", ratio: number): void {
    this.split[which] = Math.max(0.15, Math.min(0.85, ratio));
    this.applyCameraAll();
    this.paintFrames();
  }

  /** container の中のローカル座標が、どのペインに入るか。 */
  paneAt(x: number, y: number): number {
    for (let i = this.panes.length - 1; i >= 0; i--) {
      const r = this.paneRect(i);
      if (x >= r.x && x < r.x + r.w && y >= r.y && y < r.y + r.h) return i;
    }
    return this.active;
  }

  /** 画面座標（clientX / clientY）から。ポインタを置いたときに使う。 */
  paneAtClient(clientX: number, clientY: number): number {
    const r = this.container.getBoundingClientRect();
    return this.paneAt(clientX - r.left, clientY - r.top);
  }

  /**
   * 分割の枠を描き直す。canvas の上に置いた div で、アクティブなペインを
   * `--accent` の細い枠で示す。当たり判定は持たない（`pointer-events: none`）。
   */
  private paintFrames(): void {
    if (this.layout === "single") {
      this.frames?.remove();
      this.frames = null;
      return;
    }
    if (!this.frames) {
      this.frames = document.createElement("div");
      this.frames.className = "panes";
      this.container.appendChild(this.frames);
    }
    this.frames.textContent = "";
    for (let i = 0; i < this.panes.length; i++) {
      const r = this.paneRect(i);
      const f = document.createElement("div");
      f.className = "paneframe";
      f.dataset.index = String(i);
      if (i === this.active) f.dataset.active = "true";
      f.style.left = `${r.x}px`;
      f.style.top = `${r.y}px`;
      f.style.width = `${r.w}px`;
      f.style.height = `${r.h}px`;
      const label = document.createElement("i");
      label.textContent = this.panes[i].viewName + (this.panes[i].isolate ? " · 選択だけ" : "");
      f.appendChild(label);
      this.frames.appendChild(f);
    }
    this.paintSplitters();
  }

  /**
   * 分割線のつまみ（`27` の T2）。枠と違ってこれだけは指を受ける。
   * 縦線は左右の幅、横線は上下の高さを変える。
   */
  private paintSplitters(): void {
    if (!this.frames) return;
    const w = this.container.clientWidth || 1;
    const h = this.container.clientHeight || 1;
    const add = (which: "x" | "y") => {
      const bar = document.createElement("div");
      bar.className = `panesplit ${which === "x" ? "vertical" : "horizontal"}`;
      bar.dataset.axis = which;
      if (which === "x") bar.style.left = `${Math.round(w * this.split.x)}px`;
      else bar.style.top = `${Math.round(h * this.split.y)}px`;
      this.attachSplitter(bar, which);
      this.frames?.appendChild(bar);
    };
    if (this.layout === "cols" || this.layout === "quad") add("x");
    if (this.layout === "rows" || this.layout === "quad") add("y");
  }

  private attachSplitter(bar: HTMLElement, which: "x" | "y"): void {
    let pid: number | null = null;
    const move = (e: PointerEvent) => {
      if (e.pointerId !== pid) return;
      const r = this.container.getBoundingClientRect();
      const ratio =
        which === "x" ? (e.clientX - r.left) / (r.width || 1) : (e.clientY - r.top) / (r.height || 1);
      // 動かすと枠ごと作り直されるので、掴んでいる要素は途中で無くなる。
      // 購読は window に置いてあるので追いかけ続けられる
      this.setSplit(which, ratio);
    };
    const up = (e: PointerEvent) => {
      if (e.pointerId !== pid) return;
      pid = null;
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
      window.removeEventListener("pointercancel", up);
    };
    bar.addEventListener("pointerdown", (e) => {
      e.preventDefault();
      e.stopPropagation();
      pid = e.pointerId;
      window.addEventListener("pointermove", move);
      window.addEventListener("pointerup", up);
      window.addEventListener("pointercancel", up);
    });
  }

  /**
   * このペインでそのオブジェクトを見せるか（`27` の T3）。
   * 隠しているもの（`visible = false`）と、隔離から外れたものは見せない。
   */
  shownIn(pane: Pane, o: SceneObject): boolean {
    return o.visible && (!pane.isolate || pane.isolate.has(o.id));
  }

  /**
   * アクティブなペインの隔離を入れ替える（Maya の Isolate Select）。
   * 入れるのは今の選択。返すのは入れたあとの状態。
   */
  toggleIsolate(ids: string[]): boolean {
    const pane = this.pane;
    pane.isolate = pane.isolate ? null : new Set(ids);
    this.paintFrames();
    return !!pane.isolate;
  }

  /** 入力を受けているペインで隠れているか。ピッキングが見る（`27` の T3）。 */
  isolatedOut(o: SceneObject): boolean {
    const pane = this.inputPaneRef;
    return !!pane.isolate && !pane.isolate.has(o.id);
  }

  /** ペインの名前や向きが変わったときに、枠の表示をそろえる。 */
  refreshFrames(): void {
    this.paintFrames();
  }

  /** 今の分割とカメラを doc に控える（`.mbz` に入る。`25` の T6）。 */
  saveLayout(): PaneLayout {
    return {
      kind: this.layout,
      split: { ...this.split },
      panes: this.panes.map((p) => ({
        view: p.view,
        target: [p.cam.target.x, p.cam.target.y, p.cam.target.z] as [number, number, number],
        theta: p.cam.theta,
        phi: p.cam.phi,
        distance: p.cam.distance,
        focal: p.camOpts.focal,
        ortho: p.camOpts.ortho,
        display: p.display,
      })),
    };
  }

  /** 控えた分割を戻す。無ければ 1 画面のまま。 */
  restoreLayout(saved: PaneLayout | null): void {
    const kind = (saved?.kind ?? "single") as LayoutKind;
    if (saved?.split) this.split = { x: saved.split.x, y: saved.split.y };
    const views = LAYOUT_VIEWS[kind] ?? LAYOUT_VIEWS.single;
    this.layout = LAYOUT_VIEWS[kind] ? kind : "single";
    this.panes = views.map((v, i) => {
      const pane = makePane(v);
      const j = saved?.panes?.[i];
      if (j) {
        pane.view = (STANDARD_VIEWS[j.view as ViewName] ? j.view : v) as ViewName;
        pane.viewName = STANDARD_VIEWS[pane.view].label;
        pane.cam.target.set(j.target[0], j.target[1], j.target[2]);
        pane.cam.theta = j.theta;
        pane.cam.phi = j.phi;
        pane.cam.distance = j.distance;
        pane.camOpts.focal = j.focal;
        pane.camOpts.ortho = j.ortho;
        pane.display = j.display as Pane["display"];
      }
      return pane;
    });
    this.setActive(0);
    this.resize();
  }

  private addLights(): void {
    this.scene.add(new HemisphereLight(0xbcc7d1, 0x33383d, 0.85));
    const key = new DirectionalLight(0xffffff, 0.72);
    key.position.set(3, 6, 4);
    const fill = new DirectionalLight(0x9fb4c6, 0.28);
    fill.position.set(-4, 2, -3);
    this.scene.add(key, fill);
  }

  private addGrid(): void {
    const grid = new GridHelper(24, 24, 0x6d7880, 0x4b545c);
    this.grid = grid;
    const m = grid.material as LineBasicMaterial;
    m.transparent = true;
    m.opacity = 0.55;
    this.scene.add(grid);
    // 原点の X 軸と Z 軸を Maya と同じ色で強調する
    const axis = (pts: number[], color: number) => {
      const g = new BufferGeometry();
      g.setAttribute("position", new Float32BufferAttribute(pts, 3));
      this.scene.add(new Line(g, new LineBasicMaterial({ color })));
    };
    axis([-12, 0, 0, 12, 0, 0], 0xc06a6a);
    axis([0, 0, -12, 0, 0, 12], 0x6a8ac0);
  }

  /* ---- カメラ --------------------------------------------------------- */

  /** アクティブなペインのカメラを組み直す。 */
  applyCamera(): void {
    this.applyCameraTo(this.active);
  }

  /** 全ペインのカメラを組み直す。分割や大きさが変わったときに使う。 */
  applyCameraAll(): void {
    for (let i = 0; i < this.panes.length; i++) this.applyCameraTo(i);
  }

  applyCameraTo(i: number): void {
    const pane = this.panes[i];
    if (!pane) return;
    const cam = pane.cam;
    const s = Math.sin(cam.phi);
    const px = cam.target.x + cam.distance * s * Math.sin(cam.theta);
    const py = cam.target.y + cam.distance * Math.cos(cam.phi);
    const pz = cam.target.z + cam.distance * s * Math.cos(cam.theta);
    const opts = pane.camOpts;
    const rect = this.paneRect(i);
    const aspect = rect.w / (rect.h || 1);

    pane.persp.position.set(px, py, pz);
    pane.persp.lookAt(cam.target);
    pane.persp.near = opts.near;
    pane.persp.far = opts.far;
    pane.persp.aspect = aspect;
    pane.persp.setFocalLength(opts.focal);

    pane.ortho.position.set(px, py, pz);
    pane.ortho.lookAt(cam.target);
    const half = cam.distance * 0.42;
    pane.ortho.left = -half * aspect;
    pane.ortho.right = half * aspect;
    pane.ortho.top = half;
    pane.ortho.bottom = -half;
    pane.ortho.near = opts.near;
    pane.ortho.far = opts.far;
    pane.ortho.updateProjectionMatrix();
  }

  /**
   * カメラがロックされているか（`25` の T5）。
   * 動かす操作はすべてここを通してから効かせる。選択やマニピュレータは止めない。
   */
  get locked(): boolean {
    return this.state.camOpts.locked;
  }

  /** 標準ビューへ向きだけ切り替える。注視点と距離はそのまま。アクティブなペインに効く。 */
  setView(name: ViewName): void {
    if (this.locked) return;
    const v = STANDARD_VIEWS[name];
    const pane = this.pane;
    pane.view = name;
    pane.cam.theta = v.theta;
    pane.cam.phi = v.phi;
    pane.camOpts.ortho = v.ortho;
    this.applyCamera();
    this.refreshFrames();
  }

  tumble(dx: number, dy: number): void {
    if (this.locked) return;
    this.cam.theta -= dx * 0.0088;
    this.cam.phi = Math.max(0.05, Math.min(Math.PI - 0.05, this.cam.phi - dy * 0.0088));
    this.applyCamera();
  }

  pan(dx: number, dy: number): void {
    if (this.locked) return;
    const right = new Vector3().setFromMatrixColumn(this.camera.matrix, 0);
    const up = new Vector3().setFromMatrixColumn(this.camera.matrix, 1);
    const k = this.cam.distance * 0.0016;
    this.cam.target.addScaledVector(right, -dx * k).addScaledVector(up, dy * k);
    this.applyCamera();
  }

  dolly(factor: number): void {
    if (this.locked) return;
    this.cam.distance = Math.max(MIN_DIST, Math.min(MAX_DIST, this.cam.distance * factor));
    this.applyCamera();
  }

  /** pivot が画面上で動かないズーム。F を押しながらのピンチで使う。 */
  dollyAbout(pivot: Vector3, factor: number): void {
    if (this.locked) return;
    const next = Math.max(MIN_DIST, Math.min(MAX_DIST, this.cam.distance * factor));
    const f = next / this.cam.distance;
    this.cam.target.sub(pivot).multiplyScalar(f).add(pivot);
    this.cam.distance = next;
    this.applyCamera();
  }

  /** 選択（なければ全体）にフレームを合わせる。Maya の F。 */
  frameSelected(): void {
    if (this.locked) return;
    const targets = this.state.selected ? [this.state.selected] : this.state.doc.objects;
    let min = [Infinity, Infinity, Infinity];
    let max = [-Infinity, -Infinity, -Infinity];
    let any = false;
    for (const o of targets) {
      const view = this.views.get(o.id);
      if (!view) continue;
      const p = o.mesh.positions;
      for (let v = 0; v < o.mesh.vertexCount; v++) {
        const w = new Vector3(p[v * 3], p[v * 3 + 1], p[v * 3 + 2]).applyMatrix4(view.group.matrixWorld);
        min = [Math.min(min[0], w.x), Math.min(min[1], w.y), Math.min(min[2], w.z)];
        max = [Math.max(max[0], w.x), Math.max(max[1], w.y), Math.max(max[2], w.z)];
        any = true;
      }
    }
    if (!any) return;
    this.cam.target.set((min[0] + max[0]) / 2, (min[1] + max[1]) / 2, (min[2] + max[2]) / 2);
    const size = Math.max(max[0] - min[0], max[1] - min[1], max[2] - min[2]);
    // 選択を包む球の半径。どの向きから見ても、これが収まれば全部見える
    const radius = Math.hypot(max[0] - min[0], max[1] - min[1], max[2] - min[2]) / 2;
    this.cam.distance = Math.max(1.4, size * 2.4, this.fitDistance(radius));
    this.applyCamera();
  }

  /**
   * 半径 `radius` の球が画角に収まる距離（`24` の T1）。
   *
   * パースの縦の画角は**アスペクト比で変わる**（three.js は焦点距離とフィルム
   * ゲージから縦の画角を出すので、横長になるほど縦が狭くなる）。ビューポートが
   * 広がったぶん縦が狭くなり、`size * 2.4` だけでは選択がはみ出すようになった。
   * 平行投影は左右がアスペクト比で伸びるだけなので、縦がはみ出すことはない。
   */
  private fitDistance(radius: number): number {
    const pane = this.pane;
    if (pane.camOpts.ortho || radius <= 0) return 0;
    const fovY = (pane.persp.fov * Math.PI) / 180;
    const halfY = Math.max(1e-3, fovY / 2);
    const halfX = Math.atan(Math.tan(halfY) * Math.max(0.01, pane.persp.aspect));
    // 少し余白を持たせる（画面の縁ぎりぎりに置かない）
    return (radius / Math.sin(Math.min(halfY, halfX))) * 1.1;
  }

  /* ---- オブジェクトの同期 --------------------------------------------- */

  viewOf(o: SceneObject): ObjectView | undefined {
    return this.views.get(o.id);
  }

  /**
   * そのオブジェクトだけを小さく描いた画像（アウトライナのサムネイル。`19` の 3.3）。
   *
   * ふだんの描画に使っているレンダラを一時的に別の的へ向けて 1 枚描く。
   * 開いたときに全行ぶん作るだけなので、毎フレームの負担にはならない。
   */
  thumbnail(o: SceneObject, size = 80): string {
    const view = this.views.get(o.id);
    if (!view) return "";
    const hidden: Array<[ObjectView, boolean]> = [];
    for (const v of this.views.values()) {
      hidden.push([v, v.group.visible]);
      v.group.visible = v === view;
    }
    const gridWas = this.grid.visible;
    const overlayWas = this.overlay.visible;
    this.grid.visible = false;
    this.overlay.visible = false;

    // そのオブジェクトが収まる位置へカメラを置く
    const box = new Box3().setFromObject(view.group);
    const center = box.getCenter(new Vector3());
    const radius = Math.max(1e-3, box.getSize(new Vector3()).length() / 2);
    const cam = new PerspectiveCamera(35, 1, 0.01, radius * 40);
    cam.position.set(center.x + radius * 2.2, center.y + radius * 1.6, center.z + radius * 2.6);
    cam.lookAt(center);

    const target = new WebGLRenderTarget(size, size);
    const oldTarget = this.renderer.getRenderTarget();
    this.renderer.setRenderTarget(target);
    this.renderer.setClearColor(0x2c3238, 1);
    this.renderer.clear();
    this.renderer.render(this.scene, cam);
    const pixels = new Uint8Array(size * size * 4);
    this.renderer.readRenderTargetPixels(target, 0, 0, size, size, pixels);
    this.renderer.setRenderTarget(oldTarget);
    this.renderer.setClearColor(0x000000, 0);
    target.dispose();

    for (const [v, was] of hidden) v.group.visible = was;
    this.grid.visible = gridWas;
    this.overlay.visible = overlayWas;

    // 読み出しは下が原点なので、上下をひっくり返して canvas へ
    const canvas = document.createElement("canvas");
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext("2d");
    if (!ctx) return "";
    const image = ctx.createImageData(size, size);
    for (let y = 0; y < size; y++) {
      const from = (size - 1 - y) * size * 4;
      image.data.set(pixels.subarray(from, from + size * 4), y * size * 4);
    }
    ctx.putImageData(image, 0, 0);
    return canvas.toDataURL("image/png");
  }

  allViews(): ObjectView[] {
    return [...this.views.values()];
  }

  /** 1 オブジェクトだけ作り直す。トポロジや座標を変えたあとに呼ぶ。 */
  rebuildObject(o: SceneObject): void {
    const old = this.views.get(o.id);
    if (old) {
      this.root.remove(old.group);
      disposeObject3D(old.group);
      disposeViewMaterials(old);
    }
    const view = buildObjectView(o, this.shadingAngle);
    this.root.add(view.group);
    this.views.set(o.id, view);
    this.applyDisplay(view);
  }

  /** ドキュメントの中身と描画をそろえる。増減にも対応する。 */
  syncAll(): void {
    const alive = new Set(this.state.doc.objects.map((o) => o.id));
    for (const [id, view] of this.views) {
      if (!alive.has(id)) {
        this.root.remove(view.group);
        disposeObject3D(view.group);
        disposeViewMaterials(view);
        this.views.delete(id);
      }
    }
    for (const o of this.state.doc.objects) this.rebuildObject(o);
    this.rebuildOverlay();
  }

  /** 表示に使うスムージング角度。「シェード」表示はすべてハードエッジ。 */
  private get shadingAngle(): number {
    return this.state.display === "shaded" ? 0 : this.state.smoothAngle;
  }

  /** 座標だけ動いた場合の軽い更新。トポロジが変わっていないときに使う。 */
  refreshPositions(o: SceneObject): void {
    const view = this.views.get(o.id);
    if (!view) return this.rebuildObject(o);
    applyTransform(view.group, o.transform);
    view.group.updateMatrixWorld();
    view.surface.geometry.dispose();
    view.surface.geometry = surfaceGeometry(o.mesh, view.tri, this.shadingAngle);
    view.wire.geometry.dispose();
    view.wire.geometry = wireGeometry(o.mesh, view.edges);
    view.points.geometry.dispose();
    view.points.geometry = positionGeometry(o.mesh.positions);
    if (this.state.display === "heat") this.applyHeat(view);
  }

  /** 面ごとの歪みを頂点色にして積む（`23` の T2）。 */
  private applyHeat(view: ObjectView): void {
    const colors = heatColors(view.tri, view.object.uvHeat);
    view.surface.geometry.setAttribute("color", new Float32BufferAttribute(colors, 3));
  }

  /**
   * そのペインのシェーディングを材質に反映する（`25` の T6）。
   * 描く直前に呼ぶ。材質の付け替えだけなので毎フレームでも軽い。
   */
  private applyPaneDisplay(pane: Pane): void {
    if (this.paneDisplayApplied === pane.display && this.paneDisplayStamp === this.displayStamp) return;
    this.paneDisplayApplied = pane.display;
    this.paneDisplayStamp = this.displayStamp;
    for (const view of this.views.values()) this.applyDisplay(view, pane.display);
  }

  /**
   * そのペインで見せるものだけを表示にする（`27` の T3）。
   * 表示の付け替えと違って毎フレーム必ず通す（真偽値の代入だけなので軽い）。
   */
  private applyPaneVisibility(pane: Pane): void {
    for (const view of this.views.values()) view.group.visible = this.shownIn(pane, view.object);
  }

  /** 最後に材質へ当てた表示。ペインを跨ぐたびに付け替えるので、同じなら省く。 */
  private paneDisplayApplied: string | null = null;
  private paneDisplayStamp = -1;
  /** 材質を当て直す必要が出た合図（選択やチェッカーの作り直しなど）。 */
  private displayStamp = 0;

  applyDisplay(view: ObjectView, display = this.state.display): void {
    const d = display;
    // Shift で足したオブジェクトも同じ色で光らせる（結合の相手が見えるように）
    const selected = view.object === this.state.selected || this.state.also.has(view.object);
    view.surface.visible = d !== "wire";
    // チェッカーは UV をそのまま貼る。歪みと継ぎ目が目で分かる
    if (d === "heat") this.applyHeat(view);
    // 不透明度が 1 未満なら、そのオブジェクトだけの材質にする（`25` の T4）。
    // 共有の MAT.surf を透明にすると全部が透けるので、複製を 1 つ持つ。
    const opacity = view.object.opacity;
    const mat =
      d === "checker"
        ? (view.checker ??= checkerMaterial(this.state.checker.cells, this.state.checker.pattern))
        : d === "heat"
          ? (view.heat ??= heatMaterial())
          : opacity < 1
            ? (view.faded ??= MAT.surf.clone())
            : MAT.surf;
    if (mat !== MAT.surf) {
      // 裏の面が先に描かれて手前が消えるのを避けるため、透けているあいだは深度を書かない
      mat.transparent = opacity < 1;
      mat.opacity = opacity;
      mat.depthWrite = opacity >= 1;
      mat.side = this.state.cullBack ? FrontSide : DoubleSide;
      mat.needsUpdate = true;
    }
    view.surface.material = mat;
    // 透けているときは「裏面 → 表面」の 2 回に分けて描く（`27` の T4）
    this.applyBackPass(view, mat, opacity < 1 && view.surface.visible && !this.state.cullBack);
    view.wire.visible = d === "wire" || d === "shadedWire" || selected;
    view.wire.material = !selected
      ? MAT.wire
      : this.state.compMode === "object"
        ? MAT.wireSel
        : MAT.wireComp;
    view.points.visible = selected && this.state.compMode === "vertex";
    view.group.visible = view.object.visible;
  }

  /**
   * 透けている面を「裏 → 表」の 2 回に分けて描く（`27` の T4）。
   *
   * 1 回で描くと、同じオブジェクトの裏の面が表より後に来ることがあり、
   * 内側の形が手前に浮いて見える。裏面だけの複製を先に描けばその順が決まる。
   * `depthWrite` は両方とも切ったまま（深度を書くと透けなくなる）。
   *
   * 透けたオブジェクトどうしの前後は three.js の距離順に任せている。
   * 重なった透明 2 つの厳密な順までは面倒を見ない（`27` の「やらないこと」）。
   */
  private applyBackPass(view: ObjectView, front: MeshPhongMaterial | MeshBasicMaterial, on: boolean): void {
    if (!on) {
      if (view.back) view.back.visible = false;
      return;
    }
    if (!view.back) {
      view.back = new ThreeMesh(view.surface.geometry, front);
      // 表より先に描く
      view.back.renderOrder = -1;
      view.group.add(view.back);
    }
    if (view.backSource !== front) {
      view.backMaterial?.dispose();
      view.backMaterial = front.clone();
      view.backSource = front;
    }
    const m = view.backMaterial as MeshPhongMaterial;
    m.side = BackSide;
    m.transparent = true;
    m.opacity = front.opacity;
    m.depthWrite = false;
    m.needsUpdate = true;
    // ジオメトリは作り直されることがあるので、毎回そろえる
    view.back.geometry = view.surface.geometry;
    view.back.material = m;
    view.back.visible = true;
  }

  applyDisplayAll(): void {
    for (const view of this.views.values()) this.applyDisplay(view);
    this.applyCulling();
    // 次のフレームでペインの表示を当て直す（選択の色などが変わっているため）
    this.displayStamp++;
    this.paneDisplayApplied = null;
  }

  /**
   * 裏面を描かない（`23` の T6）。面の材質だけを片面にする。
   * ワイヤと選択の重ね描きは変えない（裏の選択が消えると分かりにくいので）。
   */
  applyCulling(): void {
    const side = this.state.cullBack ? FrontSide : DoubleSide;
    MAT.surf.side = side;
    MAT.surf.needsUpdate = true;
    for (const view of this.views.values()) {
      for (const m of [view.checker, view.heat, view.faded]) {
        if (!m) continue;
        m.side = side;
        m.needsUpdate = true;
      }
      // 裏面を描かないなら、裏面のぶんも要らない（`27` の T4）
      if (this.state.cullBack && view.back) view.back.visible = false;
    }
    // 次のフレームでペインごとに当て直す（裏面のぶんの出し入れもここで決まる）
    this.displayStamp++;
    this.paneDisplayApplied = null;
  }

  /** チェッカーの細かさや模様を変えた（`23` の T3）。材質を作り直す。 */
  refreshChecker(): void {
    for (const view of this.views.values()) {
      view.checker?.dispose();
      view.checker = undefined;
    }
    this.applyDisplayAll();
  }

  /** 床のグリッドの表示（`23` の T6）。 */
  setGridVisible(on: boolean): void {
    this.grid.visible = on;
  }

  gridVisible(): boolean {
    return this.grid.visible;
  }

  /** 面の材質の side。通し確認から裏面の設定を見るため（0 = 表だけ、2 = 両面）。 */
  surfaceSide(): number {
    return MAT.surf.side;
  }

  /* ---- 選択のオーバーレイ --------------------------------------------- */

  /** ソフト選択の影響範囲を出すための重み。app 側から差し込む。 */
  softWeightsProvider: (() => Map<number, number>) | null = null;
  /**
   * UV の切れ目。3D にも出して、どこで切れているかが分かるようにする
   * （Maya の Texture Border Edges と同じ考え方。ユーザー要望）。
   */
  seamProvider: (() => Set<string> | null) | null = null;

  rebuildOverlay(): void {
    for (const c of this.overlay.children.slice()) {
      this.overlay.remove(c);
      disposeObject3D(c);
    }
    const o = this.state.selected;
    const view = o ? this.views.get(o.id) : undefined;
    if (!o || !view) return;
    const m = o.mesh;

    // UV の切れ目。選択の有無に関わらず出す。少し浮かせて面に埋もれないように
    const seams = this.seamProvider?.();
    if (seams?.size) {
      const p: number[] = [];
      for (const [a, b] of view.edges) {
        const key = `${Math.min(a, b)}_${Math.max(a, b)}`;
        if (!seams.has(key)) continue;
        p.push(m.positions[a * 3], m.positions[a * 3 + 1], m.positions[a * 3 + 2]);
        p.push(m.positions[b * 3], m.positions[b * 3 + 1], m.positions[b * 3 + 2]);
      }
      if (p.length) {
        const ls = new LineSegments(positionGeometry(p), MAT.seam);
        applyTransform(ls, o.transform).renderOrder = 3;
        this.overlay.add(ls);
      }
    }

    if (!this.state.comp.size) return;

    // 影響を受けるが選択そのものではない頂点をオレンジで示す
    if (this.state.soft.strength > 0 && this.state.compMode !== "object" && this.softWeightsProvider) {
      const p: number[] = [];
      for (const [v, w] of this.softWeightsProvider()) {
        if (w > 0.02 && w < 0.999) p.push(m.positions[v * 3], m.positions[v * 3 + 1], m.positions[v * 3 + 2]);
      }
      if (p.length) {
        const pts = new Points(positionGeometry(p), MAT.softPt);
        applyTransform(pts, o.transform).renderOrder = 2;
        this.overlay.add(pts);
      }
    }

    if (this.state.compMode === "vertex") {
      const p: number[] = [];
      for (const v of this.state.comp) p.push(m.positions[v * 3], m.positions[v * 3 + 1], m.positions[v * 3 + 2]);
      const pts = new Points(positionGeometry(p), MAT.vertSel);
      applyTransform(pts, o.transform).renderOrder = 4;
      this.overlay.add(pts);
    } else if (this.state.compMode === "edge") {
      const p: number[] = [];
      for (const ei of this.state.comp) {
        const e = view.edges[ei];
        if (!e) continue;
        p.push(m.positions[e[0] * 3], m.positions[e[0] * 3 + 1], m.positions[e[0] * 3 + 2]);
        p.push(m.positions[e[1] * 3], m.positions[e[1] * 3 + 1], m.positions[e[1] * 3 + 2]);
      }
      const ls = new LineSegments(positionGeometry(p), MAT.edgeSel);
      applyTransform(ls, o.transform).renderOrder = 4;
      this.overlay.add(ls);
    } else if (this.state.compMode === "face") {
      const p: number[] = [];
      const idx: number[] = [];
      for (const fi of this.state.comp) {
        if (fi >= m.faceCount) continue;
        const verts = m.faceVerts(fi);
        const base = p.length / 3;
        for (const v of verts) p.push(m.positions[v * 3], m.positions[v * 3 + 1], m.positions[v * 3 + 2]);
        for (let i = 1; i < verts.length - 1; i++) idx.push(base, base + i, base + i + 1);
      }
      const g = positionGeometry(p);
      g.setIndex(idx);
      const mh = new ThreeMesh(g, MAT.faceSel);
      applyTransform(mh, o.transform).renderOrder = 4;
      this.overlay.add(mh);
    }
  }

  /* ---- 描画ループ ----------------------------------------------------- */

  resize(): void {
    const w = this.container.clientWidth || 1;
    const h = this.container.clientHeight || 1;
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    this.renderer.setSize(w, h, false);
    this.applyCameraAll();
    this.paintFrames();
  }

  /**
   * 1 フレーム描く（`25` の T6）。
   *
   * 分割しているときは canvas は 1 枚のまま、`setScissor` で場所を区切って
   * ペインの数だけ描く。塗るピクセルの合計は 1 ペインのときと同じで、増えるのは
   * 頂点の処理と描画呼び出しだけ。マニピュレータはアクティブなペインにだけ出す。
   */
  private renderFrame(): void {
    const r = this.renderer;
    if (this.panes.length <= 1) {
      r.setScissorTest(false);
      const w = this.container.clientWidth || 1;
      const h = this.container.clientHeight || 1;
      r.setViewport(0, 0, w, h);
      this.applyPaneDisplay(this.panes[0]);
      this.applyPaneVisibility(this.panes[0]);
      r.render(this.scene, this.cameraOf(this.panes[0]));
      return;
    }
    const h = this.container.clientHeight || 1;
    r.setScissorTest(true);
    const manipWas = this.manip.visible;
    for (let i = 0; i < this.panes.length; i++) {
      const rect = this.paneRect(i);
      // WebGL の原点は左下なので、上からの y をひっくり返す
      const y = h - (rect.y + rect.h);
      r.setViewport(rect.x, y, rect.w, rect.h);
      r.setScissor(rect.x, y, rect.w, rect.h);
      this.manip.visible = manipWas && i === this.active;
      this.applyPaneDisplay(this.panes[i]);
      this.applyPaneVisibility(this.panes[i]);
      r.render(this.scene, this.cameraOf(this.panes[i]));
    }
    this.manip.visible = manipWas;
    r.setScissorTest(false);
  }

  start(): void {
    const loop = () => {
      this.frame = requestAnimationFrame(loop);
      this.renderFrame();
    };
    loop();
  }

  stop(): void {
    cancelAnimationFrame(this.frame);
  }
}
