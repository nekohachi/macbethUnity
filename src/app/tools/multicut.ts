/**
 * マルチカット（エッジループ挿入）。
 *
 * ホバー中またはドラッグ中に、どこに線が入るかを黄色で先に見せる。
 * 離した位置で確定する。Shift を押している間は 50% に固定。
 * オプションでステップ % スナップ、エッジフロー（頂点法線による三次補間）。
 */
import { insertEdgeLoop, loopPreviewPoints } from "../../core/index.js";
import { mirrorMapOf } from "../levels.js";
import { MAT } from "../render/materials.js";
import { applyTransform, disposeObject3D, positionGeometry } from "../render/meshView.js";
import type { ObjectView } from "../render/meshView.js";
import type { Picker, ScreenPoint } from "../render/picking.js";
import { Line, Points, type Group } from "three";
import type { AppState } from "../state.js";

/** エッジを拾う距離。ペンでも指でも同じ値で足りている。 */
const EDGE_RADIUS = 30;

export interface CutPreview {
  /** ObjectView.edges のインデックス。 */
  edge: number;
  /** エッジ上の位置（0〜1）。 */
  t: number;
  /** 入る面の数。 */
  faceCount: number;
  /**
   * 鏡の辺（`47` の T3）。X 対称がオンで、相手の辺が別に存在するときだけ。
   * 確定のときに**まだ辺として残っていれば**同じ `t` でもう 1 回切る
   * （1 回目のループが中心線をまたいで既に割っていれば残っていない）。
   */
  mirror: [number, number] | null;
}

export class MultiCut {
  private preview: CutPreview | null = null;

  constructor(
    private state: AppState,
    private picker: Picker,
    /** 予測線を入れる場所。 */
    private group: Group,
  ) {}

  get current(): CutPreview | null {
    return this.preview;
  }

  /** Shift で 50% 固定、オプションのステップ % でスナップ。 */
  private snap(t: number, shift: boolean): number {
    if (shift) return 0.5;
    const step = this.state.cut.snapStep;
    if (step > 0) {
      const s = step / 100;
      t = Math.round(t / s) * s;
    }
    return Math.max(0.02, Math.min(0.98, t));
  }

  clear(): void {
    for (const c of this.group.children.slice()) {
      this.group.remove(c);
      disposeObject3D(c);
    }
    this.preview = null;
  }

  /**
   * 予測線を引き直す。拾えなければ消して null を返す。
   * 戻り値は画面下に出すヒント文。
   */
  update(p: ScreenPoint, view: ObjectView | undefined, shift: boolean): string | null {
    this.clear();
    if (!view) return null;
    const hit = this.picker.pickEdge(view, p, EDGE_RADIUS);
    if (hit.edge < 0) return null;
    return this.show(view, hit.edge, this.snap(hit.t, shift));
  }

  /** 辺 `edge`（`view.edges` の番号）を `t` で切る予測線を出す。拾い方とは別（通し確認も使う）。 */
  show(view: ObjectView, edge: number, t: number): string | null {
    this.clear();
    const [a, b] = view.edges[edge];
    const mesh = view.object.mesh;
    const pv = loopPreviewPoints(mesh, a, b, t, this.state.cut.edgeFlow);
    if (!pv) return null;

    // 鏡の辺（`47` の T3）。同じループが既に通る辺（中心線をまたぐループ）なら別には出さない
    const mirror = this.mirrorEdge(view.object, a, b);
    const mv = mirror ? loopPreviewPoints(mesh, mirror[0], mirror[1], t, this.state.cut.edgeFlow) : null;
    // **1 回目のループが鏡の辺を既に割るなら、2 本は引かない**（中心線をまたぐループ）。
    // 見るのは鏡側の**起点**（`points[0]` = その辺の上の分割点）だけでよい。
    // 同じループなら、1 回目の歩きも対称な位置で同じ辺を割っているので、そこに点が来る
    const start = mv?.points[0];
    const twice =
      !!start && !pv.points.some((r) => Math.hypot(start[0] - r[0], start[1] - r[1], start[2] - r[2]) < 1e-9);
    this.preview = { edge, t, faceCount: pv.faceCount + (twice && mv ? mv.faceCount : 0), mirror: twice ? mirror : null };

    const draw = (points: Array<[number, number, number]>, first: boolean): void => {
      const flat: number[] = [];
      for (const q of points) flat.push(q[0], q[1], q[2]);
      const line = new Line(positionGeometry(flat), MAT.cutLine);
      applyTransform(line, view.object.transform).renderOrder = 5;
      this.group.add(line);
      if (!first) return;
      // 起点をひとつ強調しておくと、どちら側から入るのかが分かる
      const p0 = points[0];
      const dot = new Points(positionGeometry([p0[0], p0[1], p0[2]]), MAT.cutPt);
      applyTransform(dot, view.object.transform).renderOrder = 5;
      this.group.add(dot);
    };
    draw(pv.points, true);
    if (twice && mv) draw(mv.points, false);

    return (
      `エッジループ挿入 <kbd>${Math.round(t * 100)}%</kbd> · ${this.preview.faceCount} 面` +
      (twice ? " · 鏡側にも" : "") +
      (this.state.cut.edgeFlow ? " · エッジフロー" : "") +
      " · <kbd>Shift</kbd> で 50%"
    );
  }

  /** X 対称がオンなら、辺 (a, b) の鏡の辺。無ければ null（相手が無い・自分自身）。 */
  private mirrorEdge(o: ObjectView["object"], a: number, b: number): [number, number] | null {
    if (!this.state.symX) return null;
    const map = mirrorMapOf(o, 0, o.mesh);
    if (!map) return null;
    const ma = map.mirror[a];
    const mb = map.mirror[b];
    if (ma < 0 || mb < 0) return null;
    if ((ma === a && mb === b) || (ma === b && mb === a)) return null;
    return [ma, mb];
  }

  /**
   * 予測どおりに実際に切る。切れたら新しいメッシュを返す。
   * トポロジが変わるので、呼ぶ側で markTopologyChanged すること。
   */
  commit(view: ObjectView | undefined): { faceCount: number } | null {
    const cut = this.preview;
    if (!cut || !view) return null;
    const [a, b] = view.edges[cut.edge];
    const r = insertEdgeLoop(view.object.mesh, a, b, cut.t, this.state.cut.edgeFlow);
    this.clear();
    if (!r) return null;
    let mesh = r.mesh;
    let faceCount = r.faceCount;
    // 鏡の辺がまだ残っていれば、同じ t でもう 1 回（`47` の T3）。
    // `insertEdgeLoop` は頂点の番号を保つので、鏡の辺の番号はそのまま引ける。
    // 1 回目のループが既にその辺を割っていれば、辺として無いので null が返る
    if (cut.mirror) {
      const r2 = insertEdgeLoop(mesh, cut.mirror[0], cut.mirror[1], cut.t, this.state.cut.edgeFlow);
      if (r2) {
        mesh = r2.mesh;
        faceCount += r2.faceCount;
      }
    }
    view.object.mesh = mesh;
    return { faceCount };
  }
}
