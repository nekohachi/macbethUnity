/**
 * 選択。Maya の挙動に合わせてある。
 *
 * - シングルクリック / タップ: 一番近いものを 1 つ。Shift で追加、Ctrl で除外
 * - ドラッグ: 矩形選択
 * - ダブルクリック: エッジ = ループ、フェース / 頂点 = シェル
 * - Shift + ダブルクリック: 選択済みのものと結ぶ（部分ループ、部分リング、フェースループ、頂点列）
 */
import {
  arcBetween,
  boundaryEdges,
  chainVertices,
  edgeKey,
  edgeLoopFrom,
  edgeRingFrom,
  growFaces,
  growVertices,
  shellFaces,
  shellVertices,
  shrinkFaces,
  shrinkVertices,
  type Edge,
} from "../../core/index.js";
import type { ObjectView } from "../render/meshView.js";
import type { Picker, ScreenPoint } from "../render/picking.js";
import type { AppState } from "../state.js";

/** 拾える距離（ピクセル）。ペンでも指でも同じ値で足りている。 */
const VERTEX_RADIUS = 22;
const EDGE_RADIUS = 16;
const DOUBLE_MS = 380;
const DOUBLE_PX = 14;
/** これより小さい矩形はクリックとして扱う。 */
const MARQUEE_MIN = 4;

/** Ctrl のときは除外、そうでなければ追加。 */
function toggle(set: Set<number>, index: number, remove: boolean): void {
  if (remove) set.delete(index);
  else set.add(index);
}

export interface SelectResult {
  /** 選択が変わったか。 */
  changed: boolean;
  /** オブジェクトの選択が変わったか（描画の作り直しが要る）。 */
  objectChanged: boolean;
  /** 画面に出すメッセージ。 */
  message?: string;
}

const NOTHING: SelectResult = { changed: false, objectChanged: false };

interface ClickRecord {
  t: number;
  x: number;
  y: number;
  mode: string;
  objectId: string;
  /** ダブルクリック時に「1 回目の前の状態」に戻すため。 */
  before: Set<number>;
}

export class Selector {
  private lastClick: ClickRecord | null = null;

  constructor(
    private state: AppState,
    private picker: Picker,
    private viewOf: (id: string) => ObjectView | undefined,
  ) {}

  private add(e: PointerEvent): boolean {
    return this.state.modOn("shift") || e.shiftKey;
  }
  private sub(e: PointerEvent): boolean {
    return this.state.modOn("ctrl") || e.ctrlKey || e.metaKey;
  }

  /** クリック / タップの選択。 */
  click(p: ScreenPoint, e: PointerEvent): SelectResult {
    if (this.state.compMode === "object") {
      const hit = this.picker.pickSurface(p);
      const next = hit?.object ?? null;
      // Shift を足すと選択に加える（外すときはもう一度）。結合のように複数要る操作のため
      if (next && this.add(e)) {
        this.state.addObject(next);
        this.lastClick = null;
        return { changed: true, objectChanged: true };
      }
      const changed = next !== this.state.selected || this.state.also.size > 0;
      this.state.select(next);
      this.lastClick = null;
      return { changed, objectChanged: changed };
    }

    let o = this.state.selected;
    if (!o) {
      // まだ何も選んでいなければオブジェクトを拾い、続けてコンポーネントも拾う。
      // Maya は 1 回で選べるので、ここで 2 回叩かせない。
      const hit = this.picker.pickSurface(p);
      if (!hit) return NOTHING;
      this.state.select(hit.object);
      o = hit.object;
      const fresh = this.viewOf(o.id);
      if (fresh) {
        this.pickOne(p, e, fresh);
        this.lastClick = {
          t: performance.now(),
          x: p.x,
          y: p.y,
          mode: this.state.compMode,
          objectId: o.id,
          before: new Set(),
        };
      }
      return { changed: true, objectChanged: true };
    }
    const view = this.viewOf(o.id);
    if (!view) return NOTHING;

    const now = performance.now();
    const last = this.lastClick;
    const isDouble =
      last !== null &&
      now - last.t < DOUBLE_MS &&
      Math.hypot(p.x - last.x, p.y - last.y) < DOUBLE_PX &&
      last.mode === this.state.compMode &&
      last.objectId === o.id;

    if (isDouble && last) {
      this.lastClick = null;
      return this.double(p, e, view, last.before);
    }

    const before = new Set(this.state.comp);
    if (!this.add(e) && !this.sub(e)) this.state.comp.clear();
    this.pickOne(p, e, view);
    this.lastClick = { t: now, x: p.x, y: p.y, mode: this.state.compMode, objectId: o.id, before };
    return { changed: true, objectChanged: false };
  }

  /** 一番近いコンポーネントを 1 つだけ足す / 引く。 */
  private pickOne(p: ScreenPoint, e: PointerEvent, view: ObjectView): void {
    const sub = this.sub(e);
    const comp = this.state.comp;
    if (this.state.compMode === "vertex") {
      const v = this.picker.pickVertex(view, p, VERTEX_RADIUS);
      if (v >= 0) toggle(comp, v, sub);
    } else if (this.state.compMode === "edge") {
      const r = this.picker.pickEdge(view, p, EDGE_RADIUS);
      if (r.edge >= 0) toggle(comp, r.edge, sub);
    } else if (this.state.compMode === "face") {
      const hit = this.picker.pickSurface(p);
      if (hit && hit.object === view.object) toggle(comp, hit.face, sub);
    }
  }

  /* ---- ダブルクリック -------------------------------------------------- */

  private edgeIndex(view: ObjectView): Map<string, number> {
    const m = new Map<string, number>();
    view.edges.forEach((e, i) => m.set(edgeKey(e[0], e[1]), i));
    return m;
  }

  private double(p: ScreenPoint, e: PointerEvent, view: ObjectView, before: Set<number>): SelectResult {
    const o = view.object;
    const mesh = o.mesh;
    const add = this.add(e);
    const sub = this.sub(e);
    const keyIdx = this.edgeIndex(view);
    const toIndices = (edges: Edge[]): number[] =>
      edges.map((ed) => keyIdx.get(edgeKey(ed[0], ed[1]))).filter((i): i is number => i !== undefined);

    const apply = (items: number[], label: string): SelectResult => {
      // ダブルクリックの 1 回目で入った選択は取り消してから広げる
      if (!add && !sub) this.state.comp.clear();
      else this.state.comp = new Set(before);
      for (const i of items) toggle(this.state.comp, i, sub);
      return { changed: true, objectChanged: false, message: `${label} — ${items.length}` };
    };

    if (this.state.compMode === "edge") {
      const r = this.picker.pickEdge(view, p, EDGE_RADIUS);
      if (r.edge < 0) return NOTHING;
      const [a, b] = view.edges[r.edge];

      if (add && before.size) {
        // 既に選ばれているエッジとの間だけを選ぶ。同じループなら区間、
        // 平行に離れていればリングの区間（ユーザー要望の「離れたエッジリング」）
        const anchor = [...before][before.size - 1];
        const anchorEdge = view.edges[anchor];
        if (anchorEdge) {
          const k1 = edgeKey(anchorEdge[0], anchorEdge[1]);
          const k2 = edgeKey(a, b);
          const loop = edgeLoopFrom(mesh, anchorEdge[0], anchorEdge[1]);
          const inLoop = arcBetween(loop, k1, k2);
          if (inLoop) return apply(toIndices(inLoop), "部分エッジループ");
          const ring = edgeRingFrom(mesh, anchorEdge[0], anchorEdge[1]);
          const inRing = arcBetween(ring, k1, k2);
          if (inRing) return apply(toIndices(inRing), "部分エッジリング");
        }
      }
      return apply(toIndices(edgeLoopFrom(mesh, a, b).edges), "エッジループ");
    }

    if (this.state.compMode === "face") {
      const hit = this.picker.pickSurface(p);
      if (!hit || hit.object !== o) return NOTHING;
      return apply(shellFaces(mesh, hit.face), "シェル");
    }

    if (this.state.compMode === "vertex") {
      const v = this.picker.pickVertex(view, p, VERTEX_RADIUS);
      if (v < 0) return NOTHING;
      if (add && before.size) {
        // 2 点を結ぶ頂点列。間にあるエッジループの頂点を拾う
        const anchor = [...before][before.size - 1];
        const edge = view.edges.find(([x, y]) => x === anchor || y === anchor);
        if (edge) {
          const chain = edgeLoopFrom(mesh, edge[0], edge[1]);
          const verts = chainVertices(chain);
          const i1 = verts.indexOf(anchor);
          const i2 = verts.indexOf(v);
          if (i1 >= 0 && i2 >= 0) {
            const [lo, hi] = i1 < i2 ? [i1, i2] : [i2, i1];
            return apply(verts.slice(lo, hi + 1), "頂点列");
          }
        }
      }
      const faces = mesh.vertexFaces().get(v);
      if (!faces?.length) return NOTHING;
      return apply(shellVertices(mesh, faces[0]), "シェル");
    }

    return NOTHING;
  }

  /* ---- 矩形選択 -------------------------------------------------------- */

  /** 矩形の中身を選ぶ。小さすぎればクリック扱いにする。 */
  marquee(x0: number, y0: number, x1: number, y1: number, p: ScreenPoint, e: PointerEvent): SelectResult {
    const lo = { x: Math.min(x0, x1), y: Math.min(y0, y1) };
    const hi = { x: Math.max(x0, x1), y: Math.max(y0, y1) };
    if (hi.x - lo.x < MARQUEE_MIN && hi.y - lo.y < MARQUEE_MIN) return this.click(p, e);

    const inside = (s: { x: number; y: number; z: number }) =>
      s.z <= 1 && s.x >= lo.x && s.x <= hi.x && s.y >= lo.y && s.y <= hi.y;

    if (this.state.compMode === "object") {
      let found = null;
      for (const o of this.state.doc.objects) {
        const view = this.viewOf(o.id);
        if (!view) continue;
        if (this.picker.vertsInRect(view, lo.x, lo.y, hi.x, hi.y).length) {
          found = o;
          break;
        }
      }
      const changed = found !== this.state.selected;
      this.state.select(found);
      return { changed, objectChanged: changed };
    }

    const o = this.state.selected;
    const view = o ? this.viewOf(o.id) : undefined;
    if (!o || !view) return NOTHING;
    const sub = this.sub(e);
    if (!this.add(e) && !sub) this.state.comp.clear();
    const comp = this.state.comp;

    // カメラベース選択がオンなら、隠れているものは入れない（`21` の 2.1）
    if (this.state.compMode === "vertex") {
      for (const v of this.picker.vertsInRect(view, lo.x, lo.y, hi.x, hi.y)) toggle(comp, v, sub);
    } else if (this.state.compMode === "edge") {
      // エッジは中点で判定する（Maya と同じ）
      view.edges.forEach((ed, ei) => {
        const p0 = o.mesh.getPosition(ed[0]);
        const p1 = o.mesh.getPosition(ed[1]);
        const s = this.picker.project(view, (p0[0] + p1[0]) / 2, (p0[1] + p1[1]) / 2, (p0[2] + p1[2]) / 2);
        if (inside(s) && this.picker.edgeVisible(view, ed[0], ed[1])) toggle(comp, ei, sub);
      });
    } else if (this.state.compMode === "face") {
      for (let f = 0; f < o.mesh.faceCount; f++) {
        const c = o.mesh.faceCenter(f);
        const s = this.picker.project(view, c[0], c[1], c[2]);
        if (inside(s) && this.picker.faceVisible(view, f)) toggle(comp, f, sub);
      }
    }
    return { changed: true, objectChanged: false };
  }

  /**
   * 選択を 1 段広げる / 狭める。Maya の Grow / Shrink。
   * エッジは頂点を経由する（両端が含まれるエッジを取る）。
   */
  growOrShrink(grow: boolean): SelectResult {
    const o = this.state.selected;
    if (!o || this.state.compMode === "object" || !this.state.comp.size) {
      return { changed: false, objectChanged: false, message: "コンポーネントを選択してください" };
    }
    const mesh = o.mesh;
    const comp = this.state.comp;

    if (this.state.compMode === "vertex") {
      const next = grow ? growVertices(mesh, comp) : shrinkVertices(mesh, comp);
      comp.clear();
      for (const v of next) comp.add(v);
    } else if (this.state.compMode === "face") {
      const next = grow ? growFaces(mesh, comp) : shrinkFaces(mesh, comp);
      comp.clear();
      for (const f of next) comp.add(f);
    } else {
      const view = this.viewOf(o.id);
      if (!view) return NOTHING;
      // エッジは端点の集合で広げ、両端が入っているエッジを取り直す
      const verts = new Set<number>();
      for (const ei of comp) {
        const e = view.edges[ei];
        if (e) {
          verts.add(e[0]);
          verts.add(e[1]);
        }
      }
      const next = new Set(grow ? growVertices(mesh, verts) : shrinkVertices(mesh, verts));
      comp.clear();
      view.edges.forEach(([a, b], i) => {
        if (next.has(a) && next.has(b)) comp.add(i);
      });
    }
    return {
      changed: true,
      objectChanged: false,
      message: `${grow ? "選択を拡張" : "選択を縮小"} — ${comp.size}`,
    };
  }

  /** 境界（面を 1 枚しか持たないエッジ）を選ぶ。 */
  selectBoundary(): SelectResult {
    const o = this.state.selected;
    if (!o) return { changed: false, objectChanged: false, message: "オブジェクトを選択してください" };
    const view = this.viewOf(o.id);
    if (!view) return NOTHING;
    const keys = new Set(boundaryEdges(o.mesh).map(([a, b]) => edgeKey(a, b)));
    if (!keys.size) {
      return { changed: false, objectChanged: false, message: "境界エッジがありません（閉じたメッシュです）" };
    }
    this.state.compMode = "edge";
    this.state.comp.clear();
    view.edges.forEach(([a, b], i) => {
      if (keys.has(edgeKey(a, b))) this.state.comp.add(i);
    });
    this.lastClick = null;
    return { changed: true, objectChanged: false, message: `境界エッジ — ${this.state.comp.size}` };
  }

  /** コンポーネント選択に含まれる頂点。変形の対象を求めるのに使う。 */
  selectedVertices(): number[] {
    const o = this.state.selected;
    if (!o) return [];
    const view = this.viewOf(o.id);
    const s = new Set<number>();
    if (this.state.compMode === "vertex") {
      for (const v of this.state.comp) s.add(v);
    } else if (this.state.compMode === "edge" && view) {
      for (const ei of this.state.comp) {
        const e = view.edges[ei];
        if (e) {
          s.add(e[0]);
          s.add(e[1]);
        }
      }
    } else if (this.state.compMode === "face") {
      for (const f of this.state.comp) for (const v of o.mesh.faceVerts(f)) s.add(v);
    } else {
      for (let v = 0; v < o.mesh.vertexCount; v++) s.add(v);
    }
    return [...s];
  }

  reset(): void {
    this.lastClick = null;
  }
}
