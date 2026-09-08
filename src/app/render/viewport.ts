/**
 * ビューポート。シーン、カメラ、描画ループ、オブジェクトの同期を持つ。
 *
 * カメラは Maya と同じ球座標（target / theta / phi / distance）。
 * PC の操作割り当ては input 側で行い、ここは動きだけを提供する。
 */
import {
  BufferGeometry,
  DirectionalLight,
  Float32BufferAttribute,
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
  WebGLRenderer,
  type Camera,
} from "three";
import type { SceneObject } from "../../core/index.js";
import type { AppState } from "../state.js";
import { MAT, checkerMaterial } from "./materials.js";
import {
  applyTransform,
  buildObjectView,
  disposeObject3D,
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

export class Viewport {
  readonly renderer: WebGLRenderer;
  readonly scene = new Scene();
  readonly persp = new PerspectiveCamera(45, 1, 0.05, 500);
  readonly ortho = new OrthographicCamera(-1, 1, 1, -1, 0.05, 500);
  camera: Camera = this.persp;

  readonly root = new Group();
  readonly overlay = new Group();
  readonly manip = new Group();
  /** マルチカットなどの予測表示。 */
  readonly preview = new Group();
  /** ホバーのプリセレクション。予測表示とは別の層にして、片方の消去が他方を巻き込まないようにする。 */
  readonly preselect = new Group();

  readonly cam: OrbitCamera = {
    target: new Vector3(0, 0.4, 0),
    theta: 0.72,
    phi: 1.12,
    distance: 7.2,
  };

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
    this.applyCamera();
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

  applyCamera(): void {
    const { cam } = this;
    const s = Math.sin(cam.phi);
    const px = cam.target.x + cam.distance * s * Math.sin(cam.theta);
    const py = cam.target.y + cam.distance * Math.cos(cam.phi);
    const pz = cam.target.z + cam.distance * s * Math.cos(cam.theta);
    const opts = this.state.camOpts;

    this.persp.position.set(px, py, pz);
    this.persp.lookAt(cam.target);
    this.persp.near = opts.near;
    this.persp.far = opts.far;
    this.persp.setFocalLength(opts.focal);

    this.ortho.position.set(px, py, pz);
    this.ortho.lookAt(cam.target);
    const aspect = (this.container.clientWidth || 1) / (this.container.clientHeight || 1);
    const half = cam.distance * 0.42;
    this.ortho.left = -half * aspect;
    this.ortho.right = half * aspect;
    this.ortho.top = half;
    this.ortho.bottom = -half;
    this.ortho.near = opts.near;
    this.ortho.far = opts.far;
    this.ortho.updateProjectionMatrix();

    this.camera = opts.ortho ? this.ortho : this.persp;
  }

  /** 標準ビューへ向きだけ切り替える。注視点と距離はそのまま。 */
  setView(name: ViewName): void {
    const v = STANDARD_VIEWS[name];
    this.cam.theta = v.theta;
    this.cam.phi = v.phi;
    this.state.camOpts.ortho = v.ortho;
    this.applyCamera();
  }

  tumble(dx: number, dy: number): void {
    this.cam.theta -= dx * 0.0088;
    this.cam.phi = Math.max(0.05, Math.min(Math.PI - 0.05, this.cam.phi - dy * 0.0088));
    this.applyCamera();
  }

  pan(dx: number, dy: number): void {
    const right = new Vector3().setFromMatrixColumn(this.camera.matrix, 0);
    const up = new Vector3().setFromMatrixColumn(this.camera.matrix, 1);
    const k = this.cam.distance * 0.0016;
    this.cam.target.addScaledVector(right, -dx * k).addScaledVector(up, dy * k);
    this.applyCamera();
  }

  dolly(factor: number): void {
    this.cam.distance = Math.max(MIN_DIST, Math.min(MAX_DIST, this.cam.distance * factor));
    this.applyCamera();
  }

  /** pivot が画面上で動かないズーム。F を押しながらのピンチで使う。 */
  dollyAbout(pivot: Vector3, factor: number): void {
    const next = Math.max(MIN_DIST, Math.min(MAX_DIST, this.cam.distance * factor));
    const f = next / this.cam.distance;
    this.cam.target.sub(pivot).multiplyScalar(f).add(pivot);
    this.cam.distance = next;
    this.applyCamera();
  }

  /** 選択（なければ全体）にフレームを合わせる。Maya の F。 */
  frameSelected(): void {
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
    this.cam.distance = Math.max(1.4, size * 2.4);
    this.applyCamera();
  }

  /* ---- オブジェクトの同期 --------------------------------------------- */

  viewOf(o: SceneObject): ObjectView | undefined {
    return this.views.get(o.id);
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
  }

  applyDisplay(view: ObjectView): void {
    const d = this.state.display;
    // Shift で足したオブジェクトも同じ色で光らせる（結合の相手が見えるように）
    const selected = view.object === this.state.selected || this.state.also.has(view.object);
    view.surface.visible = d !== "wire";
    // チェッカーは UV をそのまま貼る。歪みと継ぎ目が目で分かる
    view.surface.material = d === "checker" ? (view.checker ??= checkerMaterial()) : MAT.surf;
    view.wire.visible = d === "wire" || d === "shadedWire" || selected;
    view.wire.material = !selected
      ? MAT.wire
      : this.state.compMode === "object"
        ? MAT.wireSel
        : MAT.wireComp;
    view.points.visible = selected && this.state.compMode === "vertex";
    view.group.visible = view.object.visible;
  }

  applyDisplayAll(): void {
    for (const view of this.views.values()) this.applyDisplay(view);
  }

  /* ---- 選択のオーバーレイ --------------------------------------------- */

  /** ソフト選択の影響範囲を出すための重み。app 側から差し込む。 */
  softWeightsProvider: (() => Map<number, number>) | null = null;

  rebuildOverlay(): void {
    for (const c of this.overlay.children.slice()) {
      this.overlay.remove(c);
      disposeObject3D(c);
    }
    const o = this.state.selected;
    const view = o ? this.views.get(o.id) : undefined;
    if (!o || !view || !this.state.comp.size) return;
    const m = o.mesh;

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
    this.persp.aspect = w / h;
    this.persp.updateProjectionMatrix();
    this.applyCamera();
  }

  start(): void {
    const loop = () => {
      this.frame = requestAnimationFrame(loop);
      this.renderer.render(this.scene, this.camera);
    };
    loop();
  }

  stop(): void {
    cancelAnimationFrame(this.frame);
  }
}
