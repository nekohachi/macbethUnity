/**
 * マルチカット（エッジループ挿入）。
 *
 * ホバー中またはドラッグ中に、どこに線が入るかを黄色で先に見せる。
 * 離した位置で確定する。Shift を押している間は 50% に固定。
 * オプションでステップ % スナップ、エッジフロー（頂点法線による三次補間）。
 */
import { insertEdgeLoop, loopPreviewPoints } from "../../core/index.js";
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

    const t = this.snap(hit.t, shift);
    const [a, b] = view.edges[hit.edge];
    const pv = loopPreviewPoints(view.object.mesh, a, b, t, this.state.cut.edgeFlow);
    if (!pv) return null;

    this.preview = { edge: hit.edge, t, faceCount: pv.faceCount };

    const flat: number[] = [];
    for (const q of pv.points) flat.push(q[0], q[1], q[2]);
    const line = new Line(positionGeometry(flat), MAT.cutLine);
    applyTransform(line, view.object.transform).renderOrder = 5;
    this.group.add(line);

    // 起点をひとつ強調しておくと、どちら側から入るのかが分かる
    const first = pv.points[0];
    const dot = new Points(positionGeometry([first[0], first[1], first[2]]), MAT.cutPt);
    applyTransform(dot, view.object.transform).renderOrder = 5;
    this.group.add(dot);

    return (
      `エッジループ挿入 <kbd>${Math.round(t * 100)}%</kbd> · ${pv.faceCount} 面` +
      (this.state.cut.edgeFlow ? " · エッジフロー" : "") +
      " · <kbd>Shift</kbd> で 50%"
    );
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
    view.object.mesh = r.mesh;
    return { faceCount: r.faceCount };
  }
}
