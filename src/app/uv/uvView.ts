/**
 * UV の 2D ビュー。`15` の 6 章。
 *
 * 平行投影で UV 空間を映すだけの、独立した小さなビューポート。
 * タンブルは無い（平面なので回す意味がない）。当たり判定はレイではなく
 * UV 空間の距離で見る — 2D なので投影を通す必要がない。
 *
 * UV の「頂点」は、切れ目でつながっているコーナーの集まり。
 * つまり `core/uv` の島の中の頂点と同じ単位で、ここでも作り直す。
 */
import {
  BufferGeometry,
  CanvasTexture,
  DoubleSide,
  Float32BufferAttribute,
  LineBasicMaterial,
  LineSegments,
  Mesh as ThreeMesh,
  MeshBasicMaterial,
  NearestFilter,
  OrthographicCamera,
  PlaneGeometry,
  Points,
  PointsMaterial,
  RepeatWrapping,
  Scene,
  WebGLRenderer,
} from "three";
import {
  UV_SET,
  buildCharts,
  chartMesh,
  cornerIndex,
  cornerKey,
  type Chart,
  type CornerKey,
  type UvRecipe,
} from "../../core/index.js";
import type { SceneObject } from "../../core/index.js";
import type { ScreenPoint } from "../render/picking.js";

/** UV 空間の 1 点。 */
export interface UvPoint {
  u: number;
  v: number;
}

/** 2D 側のつながり。選択と当たり判定に使う。 */
export interface UvTopology {
  charts: Chart[];
  /** UV 頂点 → そこに集まるコーナー。 */
  vertexCorners: CornerKey[][];
  /** UV 頂点の位置。 */
  vertexUv: Float32Array;
  /** UV 頂点 → 属する島。 */
  vertexChart: Int32Array;
  /** UV エッジ（UV 頂点の組）。 */
  edges: Array<[number, number]>;
  /** UV エッジ → 属する島。 */
  edgeChart: Int32Array;
  /** UV エッジ → 元のメッシュのエッジキー。カット / ソーに使う。 */
  edgeKeys: string[];
  /** コーナー → UV 頂点。 */
  cornerToVertex: Map<CornerKey, number>;
  /** 面 → 島の番号。3D との同期に使う。 */
  chartOfFace: Map<number, number>;
}

// 島が背景に埋もれないよう、面は青みがかった塗りで、線は明るく。
// 市松は「歪みを見るための下地」なので、目立たせるのは島のほう
const MAT = {
  face: new MeshBasicMaterial({ color: 0x76a8dd, transparent: true, opacity: 0.3, side: DoubleSide, depthWrite: false }),
  faceSel: new MeshBasicMaterial({ color: 0xf0913c, transparent: true, opacity: 0.5, side: DoubleSide, depthWrite: false }),
  wire: new LineBasicMaterial({ color: 0xe6eef6 }),
  seam: new LineBasicMaterial({ color: 0xff6b4a }),
  wireSel: new LineBasicMaterial({ color: 0xf0913c }),
  point: new PointsMaterial({ color: 0xb79bea, size: 6, sizeAttenuation: false }),
  pointSel: new PointsMaterial({ color: 0xf0913c, size: 9, sizeAttenuation: false }),
  pin: new PointsMaterial({ color: 0x6cf07a, size: 11, sizeAttenuation: false }),
  border: new LineBasicMaterial({ color: 0x93a1ad }),
  manip: new LineBasicMaterial({ color: 0xe2c860 }),
  manipHot: new LineBasicMaterial({ color: 0xffe680 }),
  manipCenter: new PointsMaterial({ color: 0xe2c860, size: 10, sizeAttenuation: false }),
  // ピボット編集中は 3D と同じ黄緑
  manipPivot: new LineBasicMaterial({ color: 0x9ade4a }),
  manipPivotPoint: new PointsMaterial({ color: 0x9ade4a, size: 12, sizeAttenuation: false }),
};

/** 市松模様のテクスチャ。歪みを目で見るための背景。 */
function checkerTexture(cells: number): CanvasTexture {
  const size = 256;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d")!;
  const step = size / cells;
  for (let y = 0; y < cells; y++) {
    for (let x = 0; x < cells; x++) {
      ctx.fillStyle = (x + y) % 2 === 0 ? "#333a42" : "#282e35";
      ctx.fillRect(x * step, y * step, step, step);
    }
  }
  const texture = new CanvasTexture(canvas);
  texture.wrapS = RepeatWrapping;
  texture.wrapT = RepeatWrapping;
  texture.magFilter = NearestFilter;
  return texture;
}

export class UvView {
  readonly renderer: WebGLRenderer;
  readonly scene = new Scene();
  readonly camera = new OrthographicCamera(-0.2, 1.2, 1.2, -0.2, -10, 10);
  /** 表示の中心と幅（UV 空間）。パンとズームはこれを動かす。 */
  private center = { u: 0.5, v: 0.5 };
  private span = 1.4;
  private checkerCells = 8;

  private group = new Scene();
  private topology: UvTopology | null = null;
  private frame = 0;

  constructor(
    private container: HTMLElement,
    canvas: HTMLCanvasElement,
  ) {
    this.renderer = new WebGLRenderer({ canvas, antialias: true, alpha: true });
    this.renderer.setClearColor(0x20242a, 1);
    this.scene.add(this.group);
    this.buildBackground();
    this.resize();
  }

  private background: ThreeMesh | null = null;

  private buildBackground(): void {
    if (this.background) {
      this.scene.remove(this.background);
      this.background.geometry.dispose();
      (this.background.material as MeshBasicMaterial).map?.dispose();
      (this.background.material as MeshBasicMaterial).dispose();
    }
    const geometry = new PlaneGeometry(1, 1);
    geometry.translate(0.5, 0.5, 0);
    const material = new MeshBasicMaterial({ map: checkerTexture(this.checkerCells) });
    const plane = new ThreeMesh(geometry, material);
    plane.position.z = -1;
    this.scene.add(plane);
    this.background = plane;

    // 0〜1 の枠
    const frame = new BufferGeometry();
    frame.setAttribute(
      "position",
      new Float32BufferAttribute([0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 1, 0, 1, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0], 3),
    );
    const border = new LineSegments(frame, MAT.border);
    border.position.z = -0.5;
    this.scene.add(border);
  }

  setCheckerCells(cells: number): void {
    this.checkerCells = cells;
    this.buildBackground();
  }

  get cells(): number {
    return this.checkerCells;
  }

  /* ---- カメラ ---------------------------------------------------------- */

  resize(): void {
    const w = this.container.clientWidth || 1;
    const h = this.container.clientHeight || 1;
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    this.renderer.setSize(w, h, false);
    this.applyCamera();
  }

  /**
   * `span` 四方が必ず収まるようにする。縦長のペインでは横が、
   * 横長のペインでは縦が余る。縦だけを合わせると、縦持ちのときに
   * 0〜1 の枠が左右にはみ出して「何も無い」ように見えてしまう。
   */
  applyCamera(): void {
    const w = this.container.clientWidth || 1;
    const h = this.container.clientHeight || 1;
    const aspect = w / h;
    const half = this.span / 2;
    const halfU = aspect >= 1 ? half * aspect : half;
    const halfV = aspect >= 1 ? half : half / aspect;
    this.camera.left = this.center.u - halfU;
    this.camera.right = this.center.u + halfU;
    this.camera.top = this.center.v + halfV;
    this.camera.bottom = this.center.v - halfV;
    this.camera.updateProjectionMatrix();
  }

  /** 画面の 1px が UV 空間でいくつか。縦横どちらで合わせていても同じ値になる。 */
  pixelToUv(): number {
    const h = this.container.clientHeight || 1;
    return (this.camera.top - this.camera.bottom) / h;
  }

  pan(dx: number, dy: number): void {
    const k = this.pixelToUv();
    this.center.u -= dx * k;
    this.center.v += dy * k;
    this.applyCamera();
  }

  zoom(factor: number): void {
    this.span = Math.max(0.02, Math.min(20, this.span * factor));
    this.applyCamera();
  }

  /** 0〜1 の枠が収まるように戻す。 */
  frameUnit(): void {
    this.center = { u: 0.5, v: 0.5 };
    this.span = 1.4;
    this.applyCamera();
  }

  /** 指定した UV 点の集まりが収まるように寄せる。 */
  framepoints(points: UvPoint[]): void {
    if (!points.length) return this.frameUnit();
    let minU = Infinity;
    let minV = Infinity;
    let maxU = -Infinity;
    let maxV = -Infinity;
    for (const p of points) {
      minU = Math.min(minU, p.u);
      maxU = Math.max(maxU, p.u);
      minV = Math.min(minV, p.v);
      maxV = Math.max(maxV, p.v);
    }
    this.center = { u: (minU + maxU) / 2, v: (minV + maxV) / 2 };
    this.span = Math.max(0.05, Math.max(maxU - minU, maxV - minV) * 1.5);
    this.applyCamera();
  }

  /** ペイン内のローカル座標 → UV。 */
  toUv(p: ScreenPoint): UvPoint {
    const w = this.container.clientWidth || 1;
    const h = this.container.clientHeight || 1;
    return {
      u: this.camera.left + (p.x / w) * (this.camera.right - this.camera.left),
      v: this.camera.top - (p.y / h) * (this.camera.top - this.camera.bottom),
    };
  }

  /** UV → ペイン内のローカル座標。 */
  toScreen(u: number, v: number): ScreenPoint {
    const w = this.container.clientWidth || 1;
    const h = this.container.clientHeight || 1;
    return {
      x: ((u - this.camera.left) / (this.camera.right - this.camera.left)) * w,
      y: ((this.camera.top - v) / (this.camera.top - this.camera.bottom)) * h,
    };
  }

  /* ---- 中身 ------------------------------------------------------------ */

  get uvTopology(): UvTopology | null {
    return this.topology;
  }

  /** 島・UV 頂点・UV エッジを作り直す。選択の当たり判定もここが元になる。 */
  build(object: SceneObject | null, recipe: UvRecipe | null): void {
    for (const child of this.group.children.slice()) {
      this.group.remove(child);
      if (child instanceof ThreeMesh || child instanceof LineSegments || child instanceof Points) {
        child.geometry.dispose();
      }
    }
    this.topology = null;
    if (!object) return;
    const mesh = object.mesh;
    const uv = mesh.uvSets.get(UV_SET);
    if (!uv) return;

    const seams = recipe?.seams ?? new Set<string>();
    const charts = buildCharts(mesh, seams);

    const vertexCorners: CornerKey[][] = [];
    const vertexUvList: number[] = [];
    const vertexChartList: number[] = [];
    const cornerToVertex = new Map<CornerKey, number>();
    const chartOfFace = new Map<number, number>();

    charts.forEach((chart, ci) => {
      for (const f of chart.faces) chartOfFace.set(f, ci);
      const local = chartMesh(mesh, chart, seams);
      const base = vertexCorners.length;
      for (let i = 0; i < local.count; i++) {
        vertexCorners.push([]);
        vertexUvList.push(0, 0);
        vertexChartList.push(ci);
      }
      for (const key of chart.corners) {
        const at = base + local.localOf.get(key)!;
        vertexCorners[at].push(key);
        cornerToVertex.set(key, at);
        const corner = cornerIndex(mesh, key);
        vertexUvList[at * 2] = uv[corner * 2];
        vertexUvList[at * 2 + 1] = uv[corner * 2 + 1];
      }
    });

    // UV エッジ。面の辺をたどって、同じ組は 1 本にまとめる
    const edges: Array<[number, number]> = [];
    const edgeChart: number[] = [];
    const edgeKeys: string[] = [];
    const seen = new Set<string>();
    for (let f = 0; f < mesh.faceCount; f++) {
      const verts = mesh.faceVerts(f);
      const ci = chartOfFace.get(f) ?? 0;
      for (let i = 0; i < verts.length; i++) {
        const a = cornerToVertex.get(cornerKey(f, i));
        const b = cornerToVertex.get(cornerKey(f, (i + 1) % verts.length));
        if (a === undefined || b === undefined) continue;
        const id = `${Math.min(a, b)}_${Math.max(a, b)}`;
        if (seen.has(id)) continue;
        seen.add(id);
        edges.push([a, b]);
        edgeChart.push(ci);
        const va = verts[i];
        const vb = verts[(i + 1) % verts.length];
        edgeKeys.push(`${Math.min(va, vb)}_${Math.max(va, vb)}`);
      }
    }

    this.topology = {
      charts,
      vertexCorners,
      vertexUv: Float32Array.from(vertexUvList),
      vertexChart: Int32Array.from(vertexChartList),
      edges,
      edgeChart: Int32Array.from(edgeChart),
      edgeKeys,
      cornerToVertex,
      chartOfFace,
    };

    this.draw(object, seams);
  }

  /** 面・辺・点を描く。選択の色付けは `highlight` が上から足す。 */
  private draw(object: SceneObject, seams: Set<string>): void {
    const t = this.topology!;
    const mesh = object.mesh;

    // 面
    const flat: number[] = [];
    const index: number[] = [];
    for (let i = 0; i < t.vertexUv.length / 2; i++) flat.push(t.vertexUv[i * 2], t.vertexUv[i * 2 + 1], 0);
    for (let f = 0; f < mesh.faceCount; f++) {
      const n = mesh.faceSize(f);
      const local: number[] = [];
      for (let i = 0; i < n; i++) {
        const at = this.vertexOfCorner(cornerKey(f, i));
        if (at >= 0) local.push(at);
      }
      if (local.length < 3) continue;
      for (let i = 1; i < local.length - 1; i++) index.push(local[0], local[i], local[i + 1]);
    }
    const faceGeometry = new BufferGeometry();
    faceGeometry.setAttribute("position", new Float32BufferAttribute(flat, 3));
    faceGeometry.setIndex(index);
    const faces = new ThreeMesh(faceGeometry, MAT.face);
    faces.renderOrder = 0;
    this.group.add(faces);

    // 辺。切れ目は色を変える
    const plain: number[] = [];
    const cut: number[] = [];
    t.edges.forEach(([a, b], i) => {
      const into = seams.has(t.edgeKeys[i]) ? cut : plain;
      into.push(t.vertexUv[a * 2], t.vertexUv[a * 2 + 1], 0.01, t.vertexUv[b * 2], t.vertexUv[b * 2 + 1], 0.01);
    });
    for (const [points, material] of [
      [plain, MAT.wire],
      [cut, MAT.seam],
    ] as const) {
      if (!points.length) continue;
      const g = new BufferGeometry();
      g.setAttribute("position", new Float32BufferAttribute(points, 3));
      const lines = new LineSegments(g, material);
      lines.renderOrder = 1;
      this.group.add(lines);
    }

    // 点
    const pts: number[] = [];
    for (let i = 0; i < t.vertexUv.length / 2; i++) pts.push(t.vertexUv[i * 2], t.vertexUv[i * 2 + 1], 0.02);
    const pointGeometry = new BufferGeometry();
    pointGeometry.setAttribute("position", new Float32BufferAttribute(pts, 3));
    const points = new Points(pointGeometry, MAT.point);
    points.renderOrder = 2;
    this.group.add(points);
  }

  private vertexOfCorner(key: CornerKey): number {
    return this.topology?.cornerToVertex.get(key) ?? -1;
  }

  /* ---- 選択の表示 ------------------------------------------------------ */

  private overlay: Array<ThreeMesh | LineSegments | Points> = [];

  /** 選んでいるものを重ねて描く。 */
  highlight(
    kind: "vertex" | "edge" | "shell",
    chosen: Set<number>,
    pins: Set<number>,
    object: SceneObject | null,
  ): void {
    for (const node of this.overlay) {
      this.group.remove(node);
      node.geometry.dispose();
    }
    this.overlay = [];
    const t = this.topology;
    if (!t || !object) return;

    if (kind === "vertex" && chosen.size) {
      const pts: number[] = [];
      for (const v of chosen) pts.push(t.vertexUv[v * 2], t.vertexUv[v * 2 + 1], 0.05);
      this.addOverlay(new Points(geometryOf(pts), MAT.pointSel));
    }
    if (kind === "edge" && chosen.size) {
      const pts: number[] = [];
      for (const e of chosen) {
        const [a, b] = t.edges[e] ?? [0, 0];
        pts.push(t.vertexUv[a * 2], t.vertexUv[a * 2 + 1], 0.05, t.vertexUv[b * 2], t.vertexUv[b * 2 + 1], 0.05);
      }
      this.addOverlay(new LineSegments(geometryOf(pts), MAT.wireSel));
    }
    if (kind === "shell" && chosen.size) {
      const flat: number[] = [];
      const index: number[] = [];
      for (const ci of chosen) {
        const chart = t.charts[ci];
        if (!chart) continue;
        for (const f of chart.faces) {
          const n = object.mesh.faceSize(f);
          const local: number[] = [];
          for (let i = 0; i < n; i++) {
            const at = this.vertexOfCorner(cornerKey(f, i));
            if (at < 0) continue;
            local.push(flat.length / 3);
            flat.push(t.vertexUv[at * 2], t.vertexUv[at * 2 + 1], 0.04);
          }
          for (let i = 1; i < local.length - 1; i++) index.push(local[0], local[i], local[i + 1]);
        }
      }
      const g = geometryOf(flat);
      g.setIndex(index);
      this.addOverlay(new ThreeMesh(g, MAT.faceSel));
    }
    if (pins.size) {
      const pts: number[] = [];
      for (const v of pins) pts.push(t.vertexUv[v * 2], t.vertexUv[v * 2 + 1], 0.06);
      this.addOverlay(new Points(geometryOf(pts), MAT.pin));
    }
  }

  /* ---- 2D のマニピュレータ ---------------------------------------------- */

  private manip: LineSegments | null = null;
  private manipPoints: Points | null = null;

  /**
   * 2D のマニピュレータを描く。3D と同じ形（U と V の矢印、中心、リング、箱）を
   * 平面に置いたもの。大きさは画面上で一定になるようにする。
   */
  drawManipulator(pivot: UvPoint | null, hot: number, sizePx: number, pivotEdit: boolean): void {
    for (const node of [this.manip, this.manipPoints]) {
      if (!node) continue;
      this.group.remove(node);
      node.geometry.dispose();
    }
    this.manip = null;
    this.manipPoints = null;
    if (!pivot) return;

    const k = this.pixelToUv();
    const len = sizePx * k;
    const lines: number[] = [];
    const push = (x0: number, y0: number, x1: number, y1: number) => {
      lines.push(pivot.u + x0, pivot.v + y0, 0.08, pivot.u + x1, pivot.v + y1, 0.08);
    };
    // U と V の矢印（矢じりは短い 2 本で表す）
    push(0, 0, len, 0);
    push(len, 0, len - len * 0.18, len * 0.09);
    push(len, 0, len - len * 0.18, -len * 0.09);
    push(0, 0, 0, len);
    push(0, len, len * 0.09, len - len * 0.18);
    push(0, len, -len * 0.09, len - len * 0.18);
    if (!pivotEdit) {
      // 拡大縮小の箱（斜め）
      const s = len * 0.78;
      const box = len * 0.07;
      push(s - box, s - box, s + box, s - box);
      push(s + box, s - box, s + box, s + box);
      push(s + box, s + box, s - box, s + box);
      push(s - box, s + box, s - box, s - box);
      push(0, 0, s - box, s - box);
      // 回転のリング
      const r = len * 1.15;
      const segments = 48;
      for (let i = 0; i < segments; i++) {
        const a0 = (i / segments) * Math.PI * 2;
        const a1 = ((i + 1) / segments) * Math.PI * 2;
        push(Math.cos(a0) * r, Math.sin(a0) * r, Math.cos(a1) * r, Math.sin(a1) * r);
      }
    }
    const g = geometryOf(lines);
    const node = new LineSegments(g, pivotEdit ? MAT.manipPivot : hot >= 0 ? MAT.manipHot : MAT.manip);
    node.renderOrder = 6;
    this.group.add(node);
    this.manip = node;

    const center = new Points(
      geometryOf([pivot.u, pivot.v, 0.09]),
      pivotEdit ? MAT.manipPivotPoint : MAT.manipCenter,
    );
    center.renderOrder = 7;
    this.group.add(center);
    this.manipPoints = center;
  }

  /**
   * マニピュレータのハンドルを拾う。番号は 3D と同じ意味:
   * 0 = U 移動、1 = V 移動、3 = 自由移動、10 = 回転、23 = 均等スケール。
   */
  pickManipulator(p: ScreenPoint, pivot: UvPoint | null, sizePx: number, pivotEdit: boolean): number {
    if (!pivot) return -1;
    const at = this.toUv(p);
    const k = this.pixelToUv();
    const du = (at.u - pivot.u) / k;
    const dv = (at.v - pivot.v) / k;
    const distance = Math.hypot(du, dv);
    if (distance < 14) return 3;

    const near = (x: number, y: number) => Math.hypot(du - x, dv - y) < 14;
    if (!pivotEdit && near(sizePx * 0.78, sizePx * 0.78)) return 23;
    // 矢印は軸から外れていないかで見る
    if (du > 10 && du < sizePx * 1.1 && Math.abs(dv) < 12) return 0;
    if (dv > 10 && dv < sizePx * 1.1 && Math.abs(du) < 12) return 1;
    if (!pivotEdit && Math.abs(distance - sizePx * 1.15) < 12) return 10;
    return -1;
  }

  private addOverlay(node: ThreeMesh | LineSegments | Points): void {
    node.renderOrder = 5;
    this.group.add(node);
    this.overlay.push(node);
  }

  /* ---- 当たり判定（UV 空間の距離で見る） ------------------------------- */

  pickVertex(p: ScreenPoint, radiusPx: number): number {
    const t = this.topology;
    if (!t) return -1;
    const at = this.toUv(p);
    const limit = radiusPx * this.pixelToUv();
    let best = -1;
    let bestDistance = limit;
    for (let i = 0; i < t.vertexUv.length / 2; i++) {
      const d = Math.hypot(t.vertexUv[i * 2] - at.u, t.vertexUv[i * 2 + 1] - at.v);
      if (d < bestDistance) {
        bestDistance = d;
        best = i;
      }
    }
    return best;
  }

  pickEdge(p: ScreenPoint, radiusPx: number): number {
    const t = this.topology;
    if (!t) return -1;
    const at = this.toUv(p);
    const limit = radiusPx * this.pixelToUv();
    let best = -1;
    let bestDistance = limit;
    t.edges.forEach(([a, b], i) => {
      const ax = t.vertexUv[a * 2];
      const ay = t.vertexUv[a * 2 + 1];
      const bx = t.vertexUv[b * 2];
      const by = t.vertexUv[b * 2 + 1];
      const dx = bx - ax;
      const dy = by - ay;
      const len2 = dx * dx + dy * dy;
      const s = len2 > 1e-12 ? Math.max(0, Math.min(1, ((at.u - ax) * dx + (at.v - ay) * dy) / len2)) : 0;
      const d = Math.hypot(ax + dx * s - at.u, ay + dy * s - at.v);
      if (d < bestDistance) {
        bestDistance = d;
        best = i;
      }
    });
    return best;
  }

  /** その点を含む面。無ければ -1。 */
  pickFace(p: ScreenPoint, object: SceneObject): number {
    const t = this.topology;
    if (!t) return -1;
    const at = this.toUv(p);
    for (let f = 0; f < object.mesh.faceCount; f++) {
      const n = object.mesh.faceSize(f);
      const poly: Array<[number, number]> = [];
      for (let i = 0; i < n; i++) {
        const v = this.vertexOfCorner(cornerKey(f, i));
        if (v < 0) continue;
        poly.push([t.vertexUv[v * 2], t.vertexUv[v * 2 + 1]]);
      }
      if (poly.length >= 3 && inside(poly, at.u, at.v)) return f;
    }
    return -1;
  }

  /* ---- 描画ループ ------------------------------------------------------ */

  start(): void {
    const loop = (): void => {
      this.frame = requestAnimationFrame(loop);
      this.renderer.render(this.scene, this.camera);
    };
    if (!this.frame) loop();
  }

  stop(): void {
    if (this.frame) cancelAnimationFrame(this.frame);
    this.frame = 0;
  }
}

function geometryOf(points: number[]): BufferGeometry {
  const g = new BufferGeometry();
  g.setAttribute("position", new Float32BufferAttribute(points, 3));
  return g;
}

/** 多角形の内側か。交差数で判定する。 */
function inside(poly: Array<[number, number]>, x: number, y: number): boolean {
  let hit = false;
  for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
    const [xi, yi] = poly[i];
    const [xj, yj] = poly[j];
    if (yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) hit = !hit;
  }
  return hit;
}
