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
  edgeKey,
  cornerIndex,
  measure,
  recompute,
  recordManual,
  sewInBase,
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
import { UvView, type UvTopology } from "./uvView.js";

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

  /** 2D の中身を作り直して、選択の色も塗り直す。 */
  rebuild(): void {
    const object = this.host.object();
    this.view.build(object, this.host.recipe());
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
    this.view.build(this.host.object(), this.host.recipe());
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
    const r = recompute(object.mesh, recipe);
    this.host.commit("展開", snapshot);
    this.rebuild();
    this.host.changed(
      `展開 — 島 ${r.charts.length} / 伸び ×${r.maxStretch.toFixed(2)}` +
        (wasImported ? "（LSCM に切り替えた）" : ""),
    );
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
    recompute(object.mesh, recipe);
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
    recompute(object.mesh, recipe);
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
    this.menuOpened = false;
    const add = this.host.shiftOn(e);
    const sub = this.host.ctrlOn(e);

    // マニピュレータが先。掴めたらそのまま動かす
    const pivot = this.manipulatorPivot();
    if (pivot && !add && !sub) {
      const handle = this.view.pickManipulator(p, pivot, this.manipSizePx(), this.host.pivotEdit());
      if (handle >= 0) {
        this.beginManip(handle, p, pivot);
        return;
      }
    }

    const hit = this.pick(p, object);

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
    this.host.syncToView(this.facesOfSelection());
    this.beginDrag(p, e);
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
    this.host.syncToView(this.facesOfSelection());
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
        this.host.syncToView([]);
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
