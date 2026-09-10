/**
 * UV モードの取りまとめ。2D ビュー、選択、指の操作、3D との同期。
 *
 * 3D 側と同じ割り当てにしてある（`15` の 6.4）。1 本 = ツール、2 本 = パン / ズーム、
 * 3 本 = つまむとスケール・スワイプで U / V へ移動、長押し = サークルメニュー。
 * しきい値は `input/gestures.ts` のものをそのまま使う。
 */
import {
  UV_SET,
  alignU,
  alignV,
  autoSeams,
  chartMesh,
  edgeKey,
  mergeUvs,
  straightenPoints,
  symmetrizeUv,
  cornerIndex,
  measure,
  recompute,
  recordManual,
  sewInBase,
  uvArcBetween,
  uvChartVertices,
  uvEdgeLoopFrom,
  uvVertexPath,
  uvGridRows,
  uvLoopVertices,
  straightenBorder,
  similarityFrom2,
  applySimilarity,
  gridding,
  type CornerKey,
  type EdgeKey,
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
import { measureFaceHeat } from "./heat.js";
import { UvView, type UvTopology } from "./uvView.js";

export type UvUnit = "vertex" | "edge" | "shell";
/** 2D / 両方 / 3D。 */
export type UvSplit = "uv" | "both" | "view";

const VERTEX_RADIUS = 20;
const EDGE_RADIUS = 14;
/** ダブルタップの間合い。3D（`select.ts`）と同じ。 */
const DOUBLE_MS = 380;
const DOUBLE_PX = 14;

export interface UvHost {
  /** 今の対象。無ければ何もしない。 */
  object(): SceneObject | null;
  recipe(): UvRecipe | null;
  /** 何か変えた。3D 側の描き直しと HUD の更新を頼む。 */
  changed(label: string | null): void;
  /** 履歴に積む前の控え。 */
  snapshot(): unknown;
  commit(label: string, snapshot: unknown): void;
  /**
   * 2D で選んだものを 3D の選択へ渡す。単位ごと渡すので、3D 側でも
   * 同じもの（頂点 / エッジ / 面）が選ばれる（Maya と同じ）。
   */
  syncToView(selection: { mode: "vertex" | "edge" | "face"; verts: number[]; edges: string[]; faces: number[] }): void;
  markingMenu(x: number, y: number, edit: boolean): void;
  /** 矩形選択の枠を出す。null で消す。座標は 2D ペインの中。 */
  marquee(rect: { x0: number; y0: number; x1: number; y1: number } | null): void;
  cameraMenu(x: number, y: number): void;
  hint(html: string): void;
  toast(text: string): void;
  undo(): void;
  redo(): void;
  shiftOn(e: PointerEvent): boolean;
  ctrlOn(e: PointerEvent): boolean;
  /** UV のスナップ。効いていなければ null（`17` の 7.4）。 */
  uvSnap(): { kind: "grid" | "vertex"; step: number } | null;
  /** 3D 側で選ばれている面。島の一部だけを切りたいときに使う。 */
  selectedFaces(): number[];
  /** マニピュレータの見た目の大きさ（3D と共通）。 */
  manipSize(): number;
  /** ピボット編集中か（Maya の D。3D と共通）。 */
  pivotEdit(): boolean;
  /** スムージング角度。自動の切れ目でハードエッジを見るのに使う。 */
  smoothAngle(): number;
  /** 歪みを色で見るか（`23` の T2）。 */
  heatOn(): boolean;
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
  /** 矩形選択。押した時点では選択を変えず、離すときに決める。 */
  private marquee: {
    x0: number;
    y0: number;
    x1: number;
    y1: number;
    add: boolean;
    sub: boolean;
    moved: boolean;
  } | null = null;
  /** この押しでサークルメニューを出したか。出したなら離しても何も選ばない。 */
  private menuOpened = false;
  /**
   * 直前のタップ。ダブルタップでループ / 島を選ぶのに使う（`20` の T4）。
   * `before` は 1 回目のタップより前の選択（3D の `select.ts` と同じ扱い）。
   */
  private lastTap: { t: number; x: number; y: number; unit: UvUnit; hit: number; before: number[] } | null = null;
  /** 2D マニピュレータのドラッグ。 */
  private manipDrag: {
    handle: number;
    start: { u: number; v: number };
    pivot: { u: number; v: number };
    base: Map<CornerKey, [number, number]>;
    chart: number;
    snapshot: unknown;
    moved: boolean;
  } | null = null;
  /** 手で動かしたピボット（UV 空間）。選択を変えると消える。 */
  private pivotOverride: { u: number; v: number } | null = null;

  constructor(
    private pane: HTMLElement,
    canvas: HTMLCanvasElement,
    private host: UvHost,
  ) {
    this.view = new UvView(pane, canvas);
    this.router = new GestureRouter(canvas, (e) => this.local(e), this.handlers());
    this.router.attach();
  }

  /** 押している最中の選択・移動を取り消す（メニューを出したときなど）。 */
  private cancelPress(): void {
    this.menuOpened = true;
    this.marquee = null;
    this.host.marquee(null);
    this.drag = null;
    this.manipDrag = null;
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

  /**
   * 開き直して、面ごとの歪みをオブジェクトに控える（`23` の T2）。
   * `recompute` を呼ぶところは全部ここを通す。
   */
  private solve(object: SceneObject, recipe: UvRecipe): ReturnType<typeof recompute> {
    const r = recompute(object.mesh, recipe);
    object.uvHeat = r.perFace;
    return r;
  }

  /**
   * 2D に渡す面ごとの歪み。オフなら null（塗りは今までどおり）。
   * まだ開き直していない（`solve` を通っていない）ときは、今の UV から測る。
   */
  private heatFor(object: SceneObject | null): Float32Array | null {
    if (!object || !this.host.heatOn()) return null;
    if (!object.uvHeat || object.uvHeat.length !== object.mesh.faceCount) object.uvHeat = measureFaceHeat(object);
    return object.uvHeat;
  }

  /** 2D の中身を作り直して、選択の色も塗り直す。 */
  rebuild(): void {
    const object = this.host.object();
    this.view.build(object, this.host.recipe(), this.heatFor(object));
    this.syncPins();
    this.refreshHighlight();
  }

  refreshHighlight(): void {
    this.view.highlight(this.unit, this.chosen, this.pinned, this.host.object());
    this.refreshManipulator();
  }

  setUnit(unit: UvUnit): void {
    if (this.unit === unit) return;
    this.unit = unit;
    this.chosen.clear();
    // ピボットは選択について回るもの（3D と同じ規則）
    this.pivotOverride = null;
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

  /**
   * 3D の選択を 2D へ写す（Maya と同じで、選択は 2D と 3D で共通）。
   * 単位も合わせる: 頂点 → UV 頂点、エッジ → UV エッジ、面 → UV シェル。
   */
  syncFromView(
    mode: "object" | "vertex" | "edge" | "face",
    selection: { verts?: Iterable<number>; edges?: Iterable<string>; faces?: Iterable<number> },
  ): void {
    const t = this.view.uvTopology;
    const object = this.host.object();
    if (!t || !object) return;

    if (mode === "vertex") {
      this.unit = "vertex";
      this.chosen.clear();
      const want = new Set(selection.verts ?? []);
      // 同じ 3D 頂点に乗る UV 頂点は、切れ目で分かれていても全部選ぶ
      for (let v = 0; v < t.vertexCorners.length; v++) {
        for (const key of t.vertexCorners[v] ?? []) {
          const [f, at] = key.split(":").map(Number);
          const verts = object.mesh.faceVerts(f);
          if (verts[at] !== undefined && want.has(verts[at])) {
            this.chosen.add(v);
            break;
          }
        }
      }
    } else if (mode === "edge") {
      this.unit = "edge";
      this.chosen.clear();
      const want = new Set(selection.edges ?? []);
      t.edgeKeys.forEach((key, i) => {
        if (want.has(key)) this.chosen.add(i);
      });
    } else {
      this.unit = "shell";
      this.chosen.clear();
      for (const f of selection.faces ?? []) {
        const ci = t.chartOfFace.get(f);
        if (ci !== undefined) this.chosen.add(ci);
      }
    }
    this.refreshHighlight();
  }

  /** 通し確認から選択の同期を叩くための入口。 */
  pushToViewForTest(): void {
    this.pushToView();
  }

  /** 今の選択を 3D 側の形にして渡す。 */
  private pushToView(): void {
    const t = this.view.uvTopology;
    const object = this.host.object();
    if (!t || !object) {
      this.host.syncToView({ mode: "face", verts: [], edges: [], faces: [] });
      return;
    }
    if (this.unit === "vertex") {
      const verts = new Set<number>();
      for (const v of this.chosen) {
        for (const key of t.vertexCorners[v] ?? []) {
          const [f, at] = key.split(":").map(Number);
          const list = object.mesh.faceVerts(f);
          if (list[at] !== undefined) verts.add(list[at]);
        }
      }
      this.host.syncToView({ mode: "vertex", verts: [...verts].sort((a, b) => a - b), edges: [], faces: [] });
      return;
    }
    if (this.unit === "edge") {
      const edges = new Set<string>();
      for (const e of this.chosen) {
        const key = t.edgeKeys[e];
        if (key) edges.add(key);
      }
      this.host.syncToView({ mode: "edge", verts: [], edges: [...edges].sort(), faces: [] });
      return;
    }
    this.host.syncToView({ mode: "face", verts: [], edges: [], faces: this.facesOfSelection() });
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
  private applyOffset(
    base: Map<CornerKey, [number, number]>,
    du: number,
    dv: number,
    scale = 1,
    rotate = 0,
    pivot?: { u: number; v: number },
  ): void {
    const object = this.host.object();
    if (!object) return;
    const uv = object.mesh.uvSets.get(UV_SET);
    if (!uv) return;
    // 基点は指定が無ければ選択の中心
    const center = pivot ?? centerOf(base);
    const cos = Math.cos(rotate);
    const sin = Math.sin(rotate);
    for (const [key, p] of base) {
      const at = cornerIndex(object.mesh, key);
      if (at < 0) continue;
      const x = (p[0] - center.u) * scale;
      const y = (p[1] - center.v) * scale;
      uv[at * 2] = center.u + x * cos - y * sin + du;
      uv[at * 2 + 1] = center.v + x * sin + y * cos + dv;
    }
    this.rebuildGeometryOnly();
  }

  /* ---- 2D のマニピュレータ ---------------------------------------------- */

  /** マニピュレータの中心。手で動かしていればそこ、無ければ選択の境界箱の中心。 */
  manipulatorPivot(): { u: number; v: number } | null {
    if (this.pivotOverride) return this.pivotOverride;
    const t = this.view.uvTopology;
    if (!t || !this.chosen.size) return null;
    const { corners } = this.selectedCorners();
    if (!corners.length) return null;
    const object = this.host.object();
    const uv = object?.mesh.uvSets.get(UV_SET);
    if (!object || !uv) return null;
    let minU = Infinity;
    let minV = Infinity;
    let maxU = -Infinity;
    let maxV = -Infinity;
    for (const key of corners) {
      const at = cornerIndex(object.mesh, key);
      if (at < 0) continue;
      minU = Math.min(minU, uv[at * 2]);
      maxU = Math.max(maxU, uv[at * 2]);
      minV = Math.min(minV, uv[at * 2 + 1]);
      maxV = Math.max(maxV, uv[at * 2 + 1]);
    }
    if (!Number.isFinite(minU)) return null;
    return { u: (minU + maxU) / 2, v: (minV + maxV) / 2 };
  }

  /** マニピュレータを描き直す。選択やピボットが動いたら呼ぶ。 */
  refreshManipulator(): void {
    this.view.drawManipulator(
      this.manipulatorPivot(),
      this.manipDrag?.handle ?? -1,
      this.manipSizePx(),
      this.host.pivotEdit(),
    );
  }

  private manipSizePx(): number {
    return 60 * this.host.manipSize();
  }

  /** ピボットを選択の中心へ戻す。 */
  resetPivot(): void {
    this.pivotOverride = null;
    this.refreshManipulator();
  }

  private beginManip(handle: number, p: ScreenPoint, pivot: { u: number; v: number }): void {
    const at = this.view.toUv(p);
    if (this.host.pivotEdit()) {
      this.manipDrag = { handle, start: at, pivot, base: new Map(), chart: -1, snapshot: null, moved: false };
      this.refreshManipulator();
      return;
    }
    const { corners, chart } = this.selectedCorners();
    if (!corners.length) return;
    this.manipDrag = {
      handle,
      start: at,
      pivot,
      base: this.captureBase(corners),
      chart,
      snapshot: this.host.snapshot(),
      moved: false,
    };
    this.refreshManipulator();
  }

  private updateManip(p: ScreenPoint): void {
    const d = this.manipDrag;
    if (!d) return;
    const at = this.view.toUv(p);
    const du = at.u - d.start.u;
    const dv = at.v - d.start.v;

    // ピボット編集中は中心だけが動く。UV も履歴も触らない
    if (this.host.pivotEdit()) {
      const next = { u: d.pivot.u + du, v: d.pivot.v + dv };
      if (d.handle === 0) next.v = d.pivot.v;
      if (d.handle === 1) next.u = d.pivot.u;
      const snap = this.host.uvSnap();
      if (snap?.kind === "grid") {
        next.u = Math.round(next.u / snap.step) * snap.step;
        next.v = Math.round(next.v / snap.step) * snap.step;
      }
      this.pivotOverride = next;
      d.moved = true;
      this.refreshManipulator();
      this.host.hint(`ピボット <kbd>${next.u.toFixed(3)}, ${next.v.toFixed(3)}</kbd>`);
      return;
    }

    d.moved = true;
    if (d.handle === 10) {
      // 回転。押した位置と今の位置の角度差
      const a0 = Math.atan2(d.start.v - d.pivot.v, d.start.u - d.pivot.u);
      const a1 = Math.atan2(at.v - d.pivot.v, at.u - d.pivot.u);
      const angle = a1 - a0;
      this.applyOffset(d.base, 0, 0, 1, angle, d.pivot);
      this.host.hint(`回転 <kbd>${((angle * 180) / Math.PI).toFixed(1)}°</kbd>`);
      return;
    }
    if (d.handle === 23) {
      // 均等スケール。中心からの距離の比
      const r0 = Math.hypot(d.start.u - d.pivot.u, d.start.v - d.pivot.v);
      const r1 = Math.hypot(at.u - d.pivot.u, at.v - d.pivot.v);
      const scale = r0 > 1e-6 ? Math.max(0.02, r1 / r0) : 1;
      this.applyOffset(d.base, 0, 0, scale, 0, d.pivot);
      this.host.hint(`スケール <kbd>×${scale.toFixed(2)}</kbd>`);
      return;
    }
    // 移動。軸のハンドルなら片方だけ
    let mu = d.handle === 1 ? 0 : du;
    let mv = d.handle === 0 ? 0 : dv;
    const snap = this.host.uvSnap();
    if (snap) {
      const anchor = centerOf(d.base);
      if (snap.kind === "grid") {
        const wantU = Math.round((anchor.u + mu) / snap.step) * snap.step;
        const wantV = Math.round((anchor.v + mv) / snap.step) * snap.step;
        if (d.handle !== 1) mu = wantU - anchor.u;
        if (d.handle !== 0) mv = wantV - anchor.v;
      }
    }
    this.applyOffset(d.base, mu, mv, 1, 0, d.pivot);
    this.host.hint(`移動 <kbd>${mu.toFixed(3)}, ${mv.toFixed(3)}</kbd>`);
  }

  private endManip(): void {
    const d = this.manipDrag;
    this.manipDrag = null;
    if (!d) return;
    if (d.moved && !this.host.pivotEdit() && d.snapshot !== null) {
      const label = d.handle === 10 ? "UV を回転" : d.handle === 23 ? "UV をスケール" : "UV を移動";
      if (this.recordFrom(d.base, d.chart)) this.host.commit(label, d.snapshot);
      this.host.changed(null);
    }
    this.refreshManipulator();
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
    const object = this.host.object();
    this.view.build(object, this.host.recipe(), this.heatFor(object));
    this.refreshHighlight();
  }

  /* ---- 操作 ------------------------------------------------------------ */

  /** レシピどおりに開き直す。 */
  /**
   * 展開する。取り込んだままの UV（`method: "none"`）はここで初めて
   * ソルバーに渡る。UV モードに入っただけでは開き直さない（`17` の 1 章）。
   */
  unfold(): void {
    const object = this.host.object();
    const recipe = this.host.recipe();
    if (!object || !recipe) return;
    const snapshot = this.host.snapshot();
    const wasImported = recipe.method === "none";
    if (wasImported) recipe.method = "lscm";
    const r = this.solve(object, recipe);
    this.host.commit("展開", snapshot);
    this.rebuild();
    this.host.changed(
      `展開 — 島 ${r.charts.length} / 伸び ×${r.maxStretch.toFixed(2)}` +
        (wasImported ? "（LSCM に切り替えた）" : ""),
    );
  }

  /**
   * 自動 UV（`16` の C2）。経験則で切れ目を引き直して開く。
   * 手で動かした分は捨てる（切れ目が変わると島の指紋も変わるため）。
   */
  autoUnwrap(): void {
    const object = this.host.object();
    const recipe = this.host.recipe();
    if (!object || !recipe) return;
    const snapshot = this.host.snapshot();
    const seams = autoSeams(object.mesh, recipe.autoSeamParams, this.host.smoothAngle());
    recipe.seams = seams;
    recipe.manual.clear();
    recipe.pins.clear();
    recipe.method = "lscm";
    const r = this.solve(object, recipe);
    this.host.commit("自動 UV", snapshot);
    this.chosen.clear();
    this.rebuild();
    this.host.changed(
      `自動 UV — 切れ目 ${seams.size} 本 / 島 ${r.charts.length} / 伸び ×${r.maxStretch.toFixed(2)}`,
    );
  }

  /**
   * 島を並べ直す（整列 / パッキング）。テクセル密度をそろえてから棚に詰める。
   * 手で動かした分は「島の並べ直し」と食い違うので捨てる。
   */
  repack(): void {
    const object = this.host.object();
    const recipe = this.host.recipe();
    if (!object || !recipe) return;
    if (recipe.method === "none") {
      this.host.toast("「取り込んだまま」では並べ直せません。先に展開してください");
      return;
    }
    const snapshot = this.host.snapshot();
    recipe.manual.clear();
    const r = this.solve(object, recipe);
    this.host.commit("整列", snapshot);
    this.rebuild();
    this.host.changed(`整列 — 島 ${r.charts.length} を 0〜1 に詰めた`);
  }

  /** ソルバーを変える。オプションパネルから。 */
  setMethod(method: UvRecipe["method"]): void {
    const object = this.host.object();
    const recipe = this.host.recipe();
    if (!object || !recipe || recipe.method === method) return;
    const snapshot = this.host.snapshot();
    recipe.method = method;
    // 「なし」に戻すなら、今見えている UV を土台として控え直す
    if (method === "none") {
      const uv = object.mesh.uvSets.get(UV_SET);
      if (uv) {
        recipe.base = Float32Array.from(uv);
        recipe.manual.clear();
      }
    }
    this.solve(object, recipe);
    this.host.commit("ソルバーの変更", snapshot);
    this.rebuild();
    this.host.changed({ lscm: "LSCM", projection: "投影", none: "なし" }[method]);
  }

  /**
   * 選んでいるものを切る / 縫う。単位ごとに意味が変わる（`17` の 2.3）。
   *
   * - エッジ: 選んだ辺そのもの
   * - 頂点: 両端が選ばれている辺。1 点だけならその点のまわりを全部（分離）
   * - シェル / 面: 選んだ面と外との境（カット）、選んだ面どうしの切れ目（ソー）
   */
  cutOrSew(cut: boolean): void {
    const object = this.host.object();
    const recipe = this.host.recipe();
    const t = this.view.uvTopology;
    if (!object || !recipe || !t) return;
    if (!this.chosen.size) {
      this.host.toast("先に選んでから実行してください");
      return;
    }

    const targets = this.edgesForCutSew(cut);
    const snapshot = this.host.snapshot();
    const touched: string[] = [];
    for (const key of targets) {
      if (cut ? !recipe.seams.has(key) : recipe.seams.has(key)) {
        if (cut) recipe.seams.add(key);
        else recipe.seams.delete(key);
        touched.push(key);
      }
    }
    if (!touched.length) {
      this.host.toast(cut ? "すでに切れています" : "切れ目ではありません");
      return;
    }
    // 取り込んだままの UV は、切れ目を消しただけでは繋がらない。土台の上で縫う
    if (!cut && recipe.method === "none" && recipe.base) {
      sewInBase(object.mesh, recipe.base, touched);
    }
    this.solve(object, recipe);
    this.host.commit(cut ? "カット" : "ソー", snapshot);
    this.chosen.clear();
    this.rebuild();
    this.host.changed(`${cut ? "カット" : "ソー"} — ${touched.length} 本`);
  }

  /** 今の単位と選択から、切る / 縫う対象の辺を集める。 */
  private edgesForCutSew(cut: boolean): string[] {
    const object = this.host.object();
    const t = this.view.uvTopology;
    if (!object || !t) return [];

    if (this.unit === "edge") {
      return [...this.chosen].map((e) => t.edgeKeys[e]).filter((k): k is string => !!k);
    }

    if (this.unit === "vertex") {
      // 選んだ UV 頂点に対応する 3D 頂点を集める
      const verts = new Set<number>();
      for (const v of this.chosen) {
        for (const key of t.vertexCorners[v] ?? []) {
          const [f, at] = key.split(":").map(Number);
          const list = object.mesh.faceVerts(f);
          if (list[at] !== undefined) verts.add(list[at]);
        }
      }
      const keys = new Set<string>();
      for (const [a, b] of object.mesh.edges()) {
        // 2 点以上選んでいれば「両端とも選ばれている辺」、
        // 1 点だけならその点のまわり全部（Maya の Split UVs にあたる）
        const both = verts.has(a) && verts.has(b);
        const around = verts.size === 1 && (verts.has(a) || verts.has(b));
        if (both || around) keys.add(edgeKey(a, b));
      }
      return [...keys].sort();
    }

    // シェル / 面。3D で面を選んでいればそれを、無ければ島ぜんぶを対象にする。
    // 島ぜんぶだと「中と外の境」が無いので、カットは 3D の面選択と組で使う
    const fromView = this.host.selectedFaces();
    const faces = new Set(fromView.length ? fromView : this.facesOfSelection());
    const inside = (f: number): boolean => faces.has(f);
    const byEdge = new Map<string, number[]>();
    for (let f = 0; f < object.mesh.faceCount; f++) {
      const n = object.mesh.faceSize(f);
      const verts = object.mesh.faceVerts(f);
      for (let i = 0; i < n; i++) {
        const key = edgeKey(verts[i], verts[(i + 1) % n]);
        const list = byEdge.get(key);
        if (list) list.push(f);
        else byEdge.set(key, [f]);
      }
    }
    const keys: string[] = [];
    for (const [key, uses] of byEdge) {
      if (uses.length !== 2) continue;
      const [a, b] = uses;
      // カットは「選んだ面と外との境」、ソーは「選んだ面どうしの間」
      const wanted = cut ? inside(a) !== inside(b) : inside(a) && inside(b);
      if (wanted) keys.push(key);
    }
    return keys.sort();
  }

  /**
   * Move and Sew（`20` の T6）。切れ目の向こう側の島を動かしてから縫う。
   *
   * 選んだ切れ目の両端が相手側の両端に重なるよう、**小さいほうの島**を
   * 相似変換（移動 + 回転 + 一様スケール）で寄せる。動かした分は差分として残るので、
   * 縫ったあとの再計算でも位置が保たれる。
   */
  moveAndSew(): void {
    const object = this.host.object();
    const recipe = this.host.recipe();
    const t = this.view.uvTopology;
    const uv = object?.mesh.uvSets.get(UV_SET);
    if (!object || !recipe || !t || !uv) return;

    // 縫う対象の切れ目
    const targets = this.edgesForCutSew(false).filter((key) => recipe.seams.has(key));
    if (!targets.length) {
      this.host.toast("切れ目を選んでから実行してください");
      return;
    }

    // その切れ目の両側にある UV エッジを集めて、島ごとに分ける
    const want = new Set(targets);
    const sides = new Map<number, number[]>();
    t.edgeKeys.forEach((key, i) => {
      if (!want.has(key)) return;
      const chart = t.edgeChart[i];
      const list = sides.get(chart);
      if (list) list.push(i);
      else sides.set(chart, [i]);
    });
    if (sides.size !== 2) {
      // 同じ島の中の切れ目（縫っても島は増減しない）はそのまま縫う
      this.cutOrSew(false);
      return;
    }

    // 面の少ないほうを動かす。同じなら番号の大きいほう
    const [first, second] = [...sides.keys()];
    const sizeOf = (c: number) => t.charts[c]?.faces.length ?? 0;
    const moving = sizeOf(first) < sizeOf(second) || (sizeOf(first) === sizeOf(second) && first > second)
      ? first
      : second;
    const fixed = moving === first ? second : first;

    // 切れ目の端どうしを対応させる。同じ 3D の辺の端点で結びつける
    const endpointOf = (chart: number, key: EdgeKey): [number, number] | null => {
      const i = (sides.get(chart) ?? []).find((e) => t.edgeKeys[e] === key);
      return i === undefined ? null : t.edges[i];
    };
    const pairs: Array<[number, number]> = [];
    for (const key of targets) {
      const a = endpointOf(moving, key);
      const b = endpointOf(fixed, key);
      if (!a || !b) continue;
      // 3D の頂点で向きを合わせる
      const vertsOf = (v: number): number => {
        const corner = t.vertexCorners[v]?.[0];
        if (!corner) return -1;
        const [f, at] = corner.split(":").map(Number);
        return object.mesh.faceVerts(f)[at] ?? -1;
      };
      const [a0, a1] = a;
      const [b0, b1] = b;
      if (vertsOf(a0) === vertsOf(b0)) pairs.push([a0, b0], [a1, b1]);
      else pairs.push([a0, b1], [a1, b0]);
    }
    if (pairs.length < 2) {
      this.cutOrSew(false);
      return;
    }

    const at = (v: number): [number, number] => [t.vertexUv[v * 2], t.vertexUv[v * 2 + 1]];
    // いちばん離れた 2 組で相似変換を決める（近い 2 点だと向きが決まらない）
    let best: [number, number] = [0, 1];
    let far = -1;
    for (let i = 0; i < pairs.length; i++) {
      for (let j = i + 1; j < pairs.length; j++) {
        const p = at(pairs[i][0]);
        const q = at(pairs[j][0]);
        const d = Math.hypot(q[0] - p[0], q[1] - p[1]);
        if (d > far) {
          far = d;
          best = [i, j];
        }
      }
    }
    if (far < 1e-9) {
      this.cutOrSew(false);
      return;
    }
    const transform = similarityFrom2(
      at(pairs[best[0]][0]),
      at(pairs[best[1]][0]),
      at(pairs[best[0]][1]),
      at(pairs[best[1]][1]),
    );

    const corners = t.charts[moving]?.corners ?? [];
    const snapshot = this.host.snapshot();
    const base = this.captureBase(corners);
    const origin = at(pairs[best[0]][0]);
    for (const key of corners) {
      const index = cornerIndex(object.mesh, key);
      if (index < 0) continue;
      const moved = applySimilarity([uv[index * 2], uv[index * 2 + 1]], origin, transform);
      uv[index * 2] = moved[0];
      uv[index * 2 + 1] = moved[1];
    }
    this.recordFrom(base, moving);

    // 動かしたところで縫う
    for (const key of targets) recipe.seams.delete(key);
    if (recipe.method === "none" && recipe.base) sewInBase(object.mesh, recipe.base, targets);
    this.solve(object, recipe);
    this.host.commit("Move and Sew", snapshot);
    this.chosen.clear();
    this.rebuild();
    this.host.changed(`Move and Sew — ${targets.length} 本`);
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
  /**
   * 選んだ UV を整える（`15` の 6.3 の残り。C3）。
   * core の純粋な関数を、選択中のコーナーに当てて差分として記録する。
   */
  /**
   * 島の縁を直線に整える（`20` の T5）。選んだ辺が縁の並びになっているときだけ効く。
   * 縁は角で向きが変わるので、`straightenBorder` が向きのまとまりごとにそろえる。
   */
  straightenBorderEdges(): void {
    const object = this.host.object();
    const t = this.view.uvTopology;
    if (!object || !t) return;
    if (this.unit !== "edge" || this.chosen.size < 2) {
      this.host.toast("縁の辺を 2 本以上選んでから実行してください");
      return;
    }
    const chosen = [...this.chosen];
    if (chosen.some((e) => (t.edgeFaces[e]?.length ?? 0) >= 2)) {
      this.host.toast("縁の辺を選んでください");
      return;
    }
    // 選んだ辺を縁の順に並べる
    const loop = uvEdgeLoopFrom(t, chosen[0]);
    const want = new Set(chosen);
    const part = { edges: loop.edges.filter((e) => want.has(e)), closed: loop.closed };
    if (part.edges.length !== chosen.length) {
      this.host.toast("ひと続きの縁を選んでください");
      return;
    }
    const ordered = uvLoopVertices(t, part);
    this.applyToUvVertices(ordered, "境界の直線化", (temp, list) => straightenBorder(temp, list));
  }

  /** 島を格子にそろえる（`20` の T5）。四角形の帯のときだけ効く。 */
  gridChart(): void {
    const t = this.view.uvTopology;
    if (!t) return;
    const chart = this.unit === "shell" ? [...this.chosen][0] : this.selectedCorners().chart;
    if (chart === undefined || chart < 0) {
      this.host.toast("島を選んでから実行してください");
      return;
    }
    const rows = uvGridRows(t, chart);
    if (!rows) {
      this.host.toast("四角形の帯（格子）になっている島でだけ使えます");
      return;
    }
    const flat = rows.flat();
    this.applyToUvVertices(flat, "格子化", (temp) => gridding(temp, rows));
  }

  /**
   * UV 頂点の並びに core の関数を当てる。
   *
   * core の関数は「点の並び」で受けるが、並びが意味を持つもの（縁・格子）は
   * **UV 頂点**の順でなければならない。同じ UV に何本ものコーナーが重なるので、
   * UV 頂点ごとの配列に写して当ててから、コーナーへ書き戻す。
   */
  private applyToUvVertices(
    vertices: number[],
    label: string,
    run: (temp: Float64Array, list: number[]) => void,
  ): void {
    const object = this.host.object();
    const t = this.view.uvTopology;
    const uv = object?.mesh.uvSets.get(UV_SET);
    if (!object || !t || !uv || vertices.length < 2) return;

    const corners: CornerKey[] = [];
    for (const v of vertices) corners.push(...(t.vertexCorners[v] ?? []));
    const unique = [...new Set(corners)];
    const snapshot = this.host.snapshot();
    const base = this.captureBase(unique);
    const chart = t.vertexChart[vertices[0]] ?? -1;

    // UV 頂点ごとの位置を集めて、そこへ当てる
    const temp = new Float64Array(t.vertexUv.length / 2 > 0 ? (t.vertexUv.length / 2) * 2 : 0);
    for (let v = 0; v < t.vertexUv.length / 2; v++) {
      const key = t.vertexCorners[v]?.[0];
      if (!key) continue;
      const at = cornerIndex(object.mesh, key);
      if (at < 0) continue;
      temp[v * 2] = uv[at * 2];
      temp[v * 2 + 1] = uv[at * 2 + 1];
    }
    run(temp, vertices);

    // 同じ UV 頂点に乗るコーナーはすべて同じ位置へ
    for (const v of vertices) {
      for (const key of t.vertexCorners[v] ?? []) {
        const at = cornerIndex(object.mesh, key);
        if (at < 0) continue;
        uv[at * 2] = temp[v * 2];
        uv[at * 2 + 1] = temp[v * 2 + 1];
      }
    }

    this.recordFrom(base, chart);
    this.host.commit(label, snapshot);
    this.rebuildGeometryOnly();
    this.rebuild();
    this.host.changed(label);
  }

  tidy(kind: "alignU" | "alignV" | "straighten" | "merge" | "symmetry"): void {
    const object = this.host.object();
    if (!object) return;
    const { corners, chart } = this.selectedCorners();
    if (corners.length < 2) {
      this.host.toast("2 つ以上選んでから実行してください");
      return;
    }
    const uv = object.mesh.uvSets.get(UV_SET);
    if (!uv) return;
    const snapshot = this.host.snapshot();
    const base = this.captureBase(corners);

    // core の関数は「点の並び」で受けるので、コーナー → 点番号に直す
    const points: number[] = [];
    const at = new Map<number, string>();
    for (const key of corners) {
      const index = cornerIndex(object.mesh, key);
      if (index < 0) continue;
      points.push(index);
      at.set(index, key);
    }
    // 重なっている UV は 1 点として扱う（見た目どおりに動かすため）
    const label = { alignU: "整列 U", alignV: "整列 V", straighten: "直線化", merge: "マージ", symmetry: "対称" }[
      kind
    ];

    if (kind === "alignU") alignU(uv, points);
    else if (kind === "alignV") alignV(uv, points);
    else if (kind === "straighten") straightenPoints(uv, orderedForLine(uv, points));
    else if (kind === "merge") mergeUvs(uv, points, 0.01);
    else {
      // 対称: U の中央を軸に、左右で近い点どうしを組にする
      const pairs = symmetryPairs(uv, points);
      if (!pairs.length) {
        this.host.toast("対称の相手が見つかりません");
        return;
      }
      symmetrizeUv(uv, pairs);
    }

    this.recordFrom(base, chart);
    this.host.commit(label, snapshot);
    this.rebuildGeometryOnly();
    this.rebuild();
    this.host.changed(label);
  }

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
      // メニューを出したら、その押しは選択にも移動にもしない
      openMarkingMenu: (x, y, edit) => {
        this.cancelPress();
        this.host.markingMenu(x, y, edit);
      },
      openTwoFingerMenu: (x, y) => {
        this.cancelPress();
        this.host.markingMenu(x, y, true);
      },
      openCameraMenu: (x, y) => {
        this.cancelPress();
        this.host.cameraMenu(x, y);
      },
      undo: () => this.host.undo(),
      redo: () => this.host.redo(),
      abort: () => {
        this.drag = null;
        this.gesture = null;
        this.manipDrag = null;
        this.marquee = null;
        this.host.marquee(null);
      },
      transformBegin: () => this.gestureBegin(),
      transformUpdate: (t) => this.gestureUpdate(t),
      transformEnd: () => this.gestureEnd(),
      // 2D はどこを触ってもツール。タンブルは無い
      freeDragTumbles: () => false,
      isOnMesh: () => true,
      zoomPivot: () => null,
      marqueeStart: () => {},
      tumble: () => {},
      tumblePivot: () => null,
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
    this.menuOpened = false;
    const add = this.host.shiftOn(e);
    const sub = this.host.ctrlOn(e);

    // マニピュレータが先。掴めたらそのまま動かす
    const hit = this.pick(p, object);

    // ダブルタップ: 単位ごとに広げる（3D の `select.ts` と同じ間合い）。
    // **マニピュレータより先に見る。** 1 本だけ選んだ直後はピボットがその真上に来るので、
    // 先にハンドルを拾ってしまうと 2 回目のタップが届かない
    const now = performance.now();
    const last = this.lastTap;
    const isDouble =
      last !== null &&
      now - last.t < DOUBLE_MS &&
      Math.hypot(p.x - last.x, p.y - last.y) < DOUBLE_PX &&
      last.unit === this.unit &&
      // 同じものを 2 回（3D と同じ規則）。隣を続けて選んだだけで広がらないように
      last.hit === hit;
    if (isDouble && hit >= 0 && last) {
      const before = last.before;
      this.lastTap = null;
      this.expandFrom(hit, add, before);
      return;
    }
    // 1 回目の選択より前の状態を控える。区間はここからの続きになる
    this.lastTap = hit >= 0 ? { t: now, x: p.x, y: p.y, unit: this.unit, hit, before: [...this.chosen] } : null;

    // マニピュレータ。掴めたらそのまま動かす
    const pivot = this.manipulatorPivot();
    if (pivot && !add && !sub) {
      const handle = this.view.pickManipulator(p, pivot, this.manipSizePx(), this.host.pivotEdit());
      if (handle >= 0) {
        this.beginManip(handle, p, pivot);
        return;
      }
    }

    // すでに選んでいるものの上を押したら、そのまま動かす
    if (hit >= 0 && this.chosen.has(hit) && !add && !sub) {
      this.beginDrag(p, e);
      return;
    }
    if (hit < 0) {
      // 何も無いところ。**押した時点では選択を解かない**（長押しでメニューを
      // 出したいのに解けてしまう）。矩形選択を始めて、離すときに決める
      this.marquee = { x0: p.x, y0: p.y, x1: p.x, y1: p.y, add, sub, moved: false };
      return;
    }
    if (sub) this.chosen.delete(hit);
    else {
      if (!add) this.chosen.clear();
      this.chosen.add(hit);
    }
    this.refreshHighlight();
    this.pushToView();
    this.beginDrag(p, e);
  }

  /**
   * ダブルタップで広げる（`20` の T4）。
   *
   * - エッジ: ループ。SHF なら、前に選んだ辺との間だけ（同じループ上のとき）
   * - 頂点: SHF なら前の点との頂点列、そうでなければ島の全頂点
   * - シェル: タップでもう島なので、島の全部（変わらない）
   */
  private expandFrom(hit: number, add: boolean, before: number[]): void {
    const t = this.view.uvTopology;
    if (!t) return;

    if (this.unit === "edge") {
      const loop = uvEdgeLoopFrom(t, hit);
      let picked = loop.edges;
      let label = "UV エッジループ";
      if (add && before.length) {
        // 直前に選んだ辺との間だけ。同じループに乗っていなければループ全部
        const arc = uvArcBetween(loop, before[before.length - 1], hit);
        if (arc) {
          picked = arc;
          label = "UV エッジの区間";
        }
      }
      this.applyExpanded(picked, add, before, label);
      return;
    }

    if (this.unit === "vertex") {
      if (add && before.length) {
        const path = uvVertexPath(t, before[before.length - 1], hit);
        if (path) {
          this.applyExpanded(path, add, before, "UV 頂点列");
          return;
        }
      }
      const chart = t.vertexChart[hit] ?? -1;
      this.applyExpanded(uvChartVertices(t, chart), add, before, "島の UV 頂点");
      return;
    }

    // シェルは島そのもの。ダブルタップでは何も広がらないので、そのまま選び直す
    this.applyExpanded([hit], add, before, "UV シェル");
  }

  /** 広げた結果を選択に入れる。1 回目のタップで入った分は取り消してから。 */
  private applyExpanded(items: number[], add: boolean, before: number[], label: string): void {
    this.chosen.clear();
    if (add) for (const i of before) this.chosen.add(i);
    for (const i of items) this.chosen.add(i);
    this.refreshHighlight();
    this.pushToView();
    this.host.changed(`${label} — ${items.length}`);
  }

  /* ---- 矩形選択 -------------------------------------------------------- */

  private updateMarquee(p: ScreenPoint): void {
    const m = this.marquee;
    if (!m) return;
    m.x1 = p.x;
    m.y1 = p.y;
    if (Math.abs(m.x1 - m.x0) > TOOL_MOVE || Math.abs(m.y1 - m.y0) > TOOL_MOVE) m.moved = true;
    this.host.marquee(m.moved ? { x0: m.x0, y0: m.y0, x1: m.x1, y1: m.y1 } : null);
  }

  /** 矩形の中にあるものを選ぶ。エッジは中点で見る（3D と同じ規則）。 */
  private applyMarquee(m: { x0: number; y0: number; x1: number; y1: number; add: boolean; sub: boolean }): void {
    const t = this.topologyOrNull();
    if (!t) return;
    const a = this.view.toUv({ x: Math.min(m.x0, m.x1), y: Math.max(m.y0, m.y1) });
    const b = this.view.toUv({ x: Math.max(m.x0, m.x1), y: Math.min(m.y0, m.y1) });
    const inside = (u: number, v: number) => u >= a.u && u <= b.u && v >= a.v && v <= b.v;
    if (!m.add && !m.sub) this.chosen.clear();
    const take = (i: number) => {
      if (m.sub) this.chosen.delete(i);
      else this.chosen.add(i);
    };

    if (this.unit === "vertex") {
      for (let v = 0; v < t.vertexUv.length / 2; v++) {
        if (inside(t.vertexUv[v * 2], t.vertexUv[v * 2 + 1])) take(v);
      }
    } else if (this.unit === "edge") {
      t.edges.forEach(([x, y], i) => {
        const u = (t.vertexUv[x * 2] + t.vertexUv[y * 2]) / 2;
        const v = (t.vertexUv[x * 2 + 1] + t.vertexUv[y * 2 + 1]) / 2;
        if (inside(u, v)) take(i);
      });
    } else {
      // シェルは、島のどれかの UV 頂点が入っていれば選ぶ
      const hit = new Set<number>();
      for (let v = 0; v < t.vertexUv.length / 2; v++) {
        if (inside(t.vertexUv[v * 2], t.vertexUv[v * 2 + 1])) hit.add(t.vertexChart[v]);
      }
      for (const ci of hit) take(ci);
    }
    this.refreshHighlight();
    this.pushToView();
  }

  private topologyOrNull(): UvTopology | null {
    return this.view.uvTopology;
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
    if (this.manipDrag) return this.updateManip(p);
    if (this.marquee) return this.updateMarquee(p);
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
    let du = (p.x - drag.start.x) * k;
    let dv = -(p.y - drag.start.y) * k;

    // スナップ。基準コーナー（押した点にいちばん近い）の行き先を寄せ、
    // 選択全体を同じ差だけ動かす（`17` の 7.4）
    const snap = this.host.uvSnap();
    if (snap && drag.base.size) {
      const anchor = this.anchorCorner(drag, p);
      if (anchor) {
        const wanted: [number, number] = [anchor[1][0] + du, anchor[1][1] + dv];
        const landed =
          snap.kind === "grid"
            ? ([Math.round(wanted[0] / snap.step) * snap.step, Math.round(wanted[1] / snap.step) * snap.step] as [
                number,
                number,
              ])
            : this.nearestUvVertex(wanted, drag.base);
        if (landed) {
          du = landed[0] - anchor[1][0];
          dv = landed[1] - anchor[1][1];
        }
      }
    }

    if (Math.abs(du) > 1e-9 || Math.abs(dv) > 1e-9) drag.moved = true;
    this.applyOffset(drag.base, du, dv);
    this.host.hint(
      (snap ? `スナップ ${snap.kind === "grid" ? "グリッド" : "UV 頂点"} · ` : "") +
        `移動 <kbd>${du.toFixed(3)}, ${dv.toFixed(3)}</kbd>`,
    );
  }

  /** 押した点にいちばん近い選択コーナー。スナップの基準にする。 */
  private anchorCorner(
    drag: { base: Map<CornerKey, [number, number]> },
    p: ScreenPoint,
  ): [CornerKey, [number, number]] | null {
    let best: [CornerKey, [number, number]] | null = null;
    let bestD = Infinity;
    for (const [key, uv] of drag.base) {
      const s = this.view.toScreen(uv[0], uv[1]);
      const d = Math.hypot(s.x - p.x, s.y - p.y);
      if (d < bestD) {
        bestD = d;
        best = [key, uv];
      }
    }
    return best;
  }

  /** 選んでいないコーナーのうち、画面で 40px 以内のいちばん近い UV。 */
  private nearestUvVertex(
    at: [number, number],
    exclude: Map<CornerKey, [number, number]>,
  ): [number, number] | null {
    const object = this.host.object();
    const t = this.view.uvTopology;
    if (!object || !t) return null;
    const uv = object.mesh.uvSets.get(UV_SET);
    if (!uv) return null;
    const target = this.view.toScreen(at[0], at[1]);
    let best: [number, number] | null = null;
    let bestD = 40;
    for (let v = 0; v < t.vertexCorners.length; v++) {
      const keys = t.vertexCorners[v] ?? [];
      if (!keys.length || keys.some((k) => exclude.has(k))) continue;
      const c = cornerIndex(object.mesh, keys[0]);
      if (c < 0) continue;
      const s = this.view.toScreen(uv[c * 2], uv[c * 2 + 1]);
      const d = Math.hypot(s.x - target.x, s.y - target.y);
      if (d < bestD) {
        bestD = d;
        best = [uv[c * 2], uv[c * 2 + 1]];
      }
    }
    return best;
  }

  private up(_p: ScreenPoint, _e: PointerEvent, _moved: boolean): void {
    if (this.manipDrag) {
      this.endManip();
      return;
    }
    const m = this.marquee;
    this.marquee = null;
    this.host.marquee(null);
    const drag = this.drag;
    this.drag = null;

    // 長押しでメニューを出したときは、選択も移動も起こさない
    if (this.menuOpened) {
      this.menuOpened = false;
      return;
    }
    if (m) {
      // 引いていれば矩形選択、その場で離したなら選択を解く
      if (m.moved) this.applyMarquee(m);
      else if (!m.add && !m.sub && this.chosen.size) {
        this.chosen.clear();
        this.refreshHighlight();
        this.pushToView();
      }
      return;
    }
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
    if (t.kind === "rotate") {
      // 手のひねりで島を回す（`26` の T1）。3D と同じ 5° 刻み。
      // 画面は y が下、UV は V が上なので、時計まわりは UV では負の向き
      const deg = Math.round((t.radians * 180) / Math.PI / 5) * 5;
      this.applyOffset(g.base, 0, 0, 1, (-deg * Math.PI) / 180);
      this.host.hint(`回転 <kbd>${deg >= 0 ? "+" : ""}${deg}°</kbd> · 指 3 本`);
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

/** UV の集まりの平均。基点の既定値。 */
function centerOf(base: Map<CornerKey, [number, number]>): { u: number; v: number } {
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
  return { u: cu, v: cv };
}

/** 直線化のために、主軸に沿って点を並べ替える。 */
function orderedForLine(uv: Float32Array, points: number[]): number[] {
  if (points.length < 3) return points;
  let cu = 0;
  let cv = 0;
  for (const v of points) {
    cu += uv[v * 2];
    cv += uv[v * 2 + 1];
  }
  cu /= points.length;
  cv /= points.length;
  let sxx = 0;
  let sxy = 0;
  let syy = 0;
  for (const v of points) {
    const x = uv[v * 2] - cu;
    const y = uv[v * 2 + 1] - cv;
    sxx += x * x;
    sxy += x * y;
    syy += y * y;
  }
  const theta = 0.5 * Math.atan2(2 * sxy, sxx - syy);
  const ax = Math.cos(theta);
  const ay = Math.sin(theta);
  return [...points].sort(
    (a, b) => (uv[a * 2] - cu) * ax + (uv[a * 2 + 1] - cv) * ay - ((uv[b * 2] - cu) * ax + (uv[b * 2 + 1] - cv) * ay),
  );
}

/** U の中央で左右に分け、V が近いものどうしを組にする。 */
function symmetryPairs(uv: Float32Array, points: number[]): Array<[number, number]> {
  let min = Infinity;
  let max = -Infinity;
  for (const v of points) {
    min = Math.min(min, uv[v * 2]);
    max = Math.max(max, uv[v * 2]);
  }
  const center = (min + max) / 2;
  const left = points.filter((v) => uv[v * 2] < center - 1e-9);
  const right = points.filter((v) => uv[v * 2] > center + 1e-9);
  const pairs: Array<[number, number]> = [];
  const used = new Set<number>();
  for (const a of left.sort((x, y) => x - y)) {
    let best = -1;
    let bestD = Infinity;
    for (const b of right) {
      if (used.has(b)) continue;
      const d = Math.hypot(center * 2 - uv[a * 2] - uv[b * 2], uv[a * 2 + 1] - uv[b * 2 + 1]);
      if (d < bestD) {
        bestD = d;
        best = b;
      }
    }
    if (best >= 0) {
      used.add(best);
      pairs.push([a, best]);
    }
  }
  return pairs;
}
