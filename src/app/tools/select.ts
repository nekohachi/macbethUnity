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
  type SceneObject,
} from "../../core/index.js";
import { mirrorMapOf } from "../levels.js";
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
  /**
   * 1 回目に拾ったコンポーネント。**同じものを 2 回**でなければダブルクリックにしない
   * （Maya と同じ）。細かいメッシュだと、隣を続けて選んだだけでシェル選択に化ける。
   */
  hit: number;
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
        const hit = this.pickOne(p, e, fresh);
        this.lastClick = {
          t: performance.now(),
          x: p.x,
          y: p.y,
          mode: this.state.compMode,
          objectId: o.id,
          hit,
          before: new Set(),
        };
      }
      return { changed: true, objectChanged: true };
    }
    const view = this.viewOf(o.id);
    if (!view) return NOTHING;

    const now = performance.now();
    const last = this.lastClick;
    const here = this.probe(p, view);
    const isDouble =
      last !== null &&
      now - last.t < DOUBLE_MS &&
      Math.hypot(p.x - last.x, p.y - last.y) < DOUBLE_PX &&
      last.mode === this.state.compMode &&
      last.objectId === o.id &&
      // 同じものを 2 回。隣を続けて選んだだけでシェルに化けないようにする
      here >= 0 &&
      last.hit === here;

    if (isDouble && last) {
      this.lastClick = null;
      return this.double(p, e, view, last.before);
    }

    const before = new Set(this.state.comp);
    if (!this.add(e) && !this.sub(e)) this.state.comp.clear();
    const hit = this.pickOne(p, e, view);
    this.lastClick = { t: now, x: p.x, y: p.y, mode: this.state.compMode, objectId: o.id, hit, before };
    return { changed: true, objectChanged: false };
  }

  /** その場所にあるコンポーネント。選択は変えない（ダブルクリックの判定に使う）。 */
  private probe(p: ScreenPoint, view: ObjectView): number {
    if (this.state.compMode === "vertex") return this.picker.pickVertex(view, p, VERTEX_RADIUS);
    if (this.state.compMode === "edge") return this.picker.pickEdge(view, p, EDGE_RADIUS).edge;
    if (this.state.compMode === "face") {
      const hit = this.picker.pickSurface(p);
      return hit && hit.object === view.object ? hit.face : -1;
    }
    return -1;
  }

  /** 一番近いコンポーネントを 1 つだけ足す / 引く。拾ったものを返す。 */
  private pickOne(p: ScreenPoint, e: PointerEvent, view: ObjectView): number {
    const sub = this.sub(e);
    const comp = this.state.comp;
    const hit = this.probe(p, view);
    if (hit >= 0) toggle(comp, hit, sub);
    return hit;
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
      // **足しているとき（SHF / CTL）はシェルに広げない。**
      // 細かいメッシュで面を続けて選ぶと、隣を叩いただけでダブルクリック扱いになり、
      // シェル全部が入ってしまう（球で面を選べないという指摘）。
      // 1 回目のタップで足した分はそのまま残す
      if (add || sub) return { changed: true, objectChanged: false };
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

  /**
   * 控えた選択から n 段ぶん広げ直す（`24` の T3 の「拡張」ゲージ）。
   * n が負なら狭める。毎回控えから計算し直すので、行って戻れば元に戻る。
   */
  growOrShrinkFrom(base: number[], n: number): SelectResult {
    const o = this.state.selected;
    if (!o || this.state.compMode === "object" || !base.length) {
      return { changed: false, objectChanged: false, message: "コンポーネントを選択してください" };
    }
    const comp = this.state.comp;
    comp.clear();
    for (const i of base) comp.add(i);
    for (let k = 0; k < Math.abs(n); k++) {
      if (!this.growOrShrink(n > 0).changed) break;
    }
    return {
      changed: true,
      objectChanged: false,
      message: n === 0 ? `選択 ${comp.size}` : `${n > 0 ? "拡張" : "縮小"} ${n > 0 ? "+" : ""}${n} — ${comp.size}`,
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

  /**
   * 選択を鏡へ写す（`47` の T3）。`state.comp` に X 対称の相手を足す。
   *
   * トポロジの操作（押し出し・ベベル・削除・接続・マージ…）は選択から始まるので、
   * **操作の前に選択を写す**と、操作ごとの分岐が要らない。
   * 対応表は `41` の `mirrorMapOf`（レベル 0）。相手が無ければ写さない。
   *
   *   頂点   `mirror[v]`
   *   エッジ 両端の鏡を `view.edges` から引く
   *   面     頂点の集合をソートした鍵で面を引く（表は 1 回作る。O(面)）
   *
   * @returns 足した数と、相手が見つからなかった数
   */
  mirrorSelection(o: SceneObject): { added: number; missing: number } {
    const comp = this.state.comp;
    const map = mirrorMapOf(o, 0, o.mesh);
    if (!map || !comp.size) return { added: 0, missing: comp.size };
    const mirror = map.mirror;
    let added = 0;
    let missing = 0;
    const put = (i: number, self: number): void => {
      if (i === self || comp.has(i)) return;
      comp.add(i);
      added++;
    };

    if (this.state.compMode === "vertex") {
      for (const v of [...comp]) {
        const m = mirror[v];
        if (m < 0) missing++;
        else put(m, v);
      }
    } else if (this.state.compMode === "edge") {
      const view = this.viewOf(o.id);
      if (!view) return { added: 0, missing: comp.size };
      const keyIdx = this.edgeIndex(view);
      for (const ei of [...comp]) {
        const e = view.edges[ei];
        if (!e) continue;
        const a = mirror[e[0]];
        const b = mirror[e[1]];
        const mi = a >= 0 && b >= 0 ? keyIdx.get(edgeKey(a, b)) : undefined;
        if (mi === undefined) missing++;
        else put(mi, ei);
      }
    } else if (this.state.compMode === "face") {
      const mesh = o.mesh;
      // 相手の面は「鏡の頂点に触る面」の中から探す（表は 1 回だけ作る）。
      // 面の頂点の鍵で全面の表を作ると、25 万面では文字列がそれだけ生まれる
      const around = mesh.vertexFaces();
      for (const f of [...comp]) {
        if (f >= mesh.faceCount) continue;
        const verts = mesh.faceVerts(f);
        const want = new Set<number>();
        for (const v of verts) {
          const m = mirror[v];
          if (m < 0) break;
          want.add(m);
        }
        let mf = -1;
        if (want.size === verts.length) {
          for (const cand of around.get([...want][0]) ?? []) {
            const cv = mesh.faceVerts(cand);
            if (cv.length === want.size && cv.every((v) => want.has(v))) {
              mf = cand;
              break;
            }
          }
        }
        if (mf < 0) missing++;
        else put(mf, f);
      }
    }
    return { added, missing };
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
