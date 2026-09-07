/**
 * 画面座標からメッシュの要素を拾う。
 *
 * 面はレイキャスト、頂点とエッジは画面に投影してから距離で判定する。
 * Maya と同じく、近ければ拾えるようにピクセル半径で許容する。
 */
import { Raycaster, Vector2, Vector3 } from "three";
import type { SceneObject } from "../../core/index.js";
import type { ObjectView } from "./meshView.js";
import type { Viewport } from "./viewport.js";

export interface ScreenPoint {
  x: number;
  y: number;
}

export interface Screened extends ScreenPoint {
  /** NDC の z。1 を超えていたら後ろ（カメラの外）。 */
  z: number;
}

export interface EdgeHit {
  /** ObjectView.edges のインデックス。見つからなければ -1。 */
  edge: number;
  /** エッジ上の位置（0〜1）。マルチカットの挿入位置に使う。 */
  t: number;
}

export interface SurfaceHit {
  object: SceneObject;
  view: ObjectView;
  /** 当たった面のインデックス。 */
  face: number;
  /** ワールド座標での交点。 */
  point: Vector3;
  distance: number;
}

const raycaster = new Raycaster();
const scratch = new Vector3();

export class Picker {
  constructor(
    private viewport: Viewport,
    private container: HTMLElement,
  ) {}

  private get width(): number {
    return this.container.clientWidth || 1;
  }
  private get height(): number {
    return this.container.clientHeight || 1;
  }

  /** イベントの座標をビューポート内のローカル座標にする。 */
  local(e: { clientX: number; clientY: number }): ScreenPoint {
    const r = this.container.getBoundingClientRect();
    return { x: e.clientX - r.left, y: e.clientY - r.top };
  }

  ndc(p: ScreenPoint): Vector2 {
    return new Vector2((p.x / this.width) * 2 - 1, -((p.y / this.height) * 2 - 1));
  }

  /** ローカル座標の点を画面座標へ投影する。 */
  project(view: ObjectView, x: number, y: number, z: number): Screened {
    view.group.updateMatrixWorld();
    const v = scratch.set(x, y, z).applyMatrix4(view.group.matrixWorld).project(this.viewport.camera);
    return { x: ((v.x + 1) / 2) * this.width, y: ((-v.y + 1) / 2) * this.height, z: v.z };
  }

  projectVertex(view: ObjectView, vi: number): Screened {
    const p = view.object.mesh.positions;
    return this.project(view, p[vi * 3], p[vi * 3 + 1], p[vi * 3 + 2]);
  }

  /** 面のレイキャスト。手前のものを 1 つ返す。 */
  pickSurface(p: ScreenPoint): SurfaceHit | null {
    raycaster.setFromCamera(this.ndc(p), this.viewport.camera);
    const views = this.viewport.allViews().filter((v) => v.object.visible);
    const hits = raycaster.intersectObjects(
      views.map((v) => v.surface),
      false,
    );
    const hit = hits[0];
    if (!hit) return null;
    const view = views.find((v) => v.surface === hit.object);
    if (!view) return null;
    // 三角形の番号から元の面へ戻す（三角形分割は面の順で並んでいる）
    const triIndex = hit.faceIndex ?? 0;
    const face = view.tri.triToFace[triIndex] ?? 0;
    return { object: view.object, view, face, point: hit.point.clone(), distance: hit.distance };
  }

  /** 半径 radius ピクセル以内で最も近い頂点。見つからなければ -1。 */
  pickVertex(view: ObjectView, p: ScreenPoint, radius: number): number {
    let best = -1;
    let bestD = radius * radius;
    const n = view.object.mesh.vertexCount;
    for (let i = 0; i < n; i++) {
      const s = this.projectVertex(view, i);
      if (s.z > 1) continue;
      const d = (s.x - p.x) ** 2 + (s.y - p.y) ** 2;
      if (d < bestD) {
        bestD = d;
        best = i;
      }
    }
    return best;
  }

  /** 半径 radius ピクセル以内で最も近いエッジと、その上の位置。 */
  pickEdge(view: ObjectView, p: ScreenPoint, radius: number): EdgeHit {
    let best = -1;
    let bestD = radius;
    let bestT = 0.5;
    for (let i = 0; i < view.edges.length; i++) {
      const [ia, ib] = view.edges[i];
      const a = this.projectVertex(view, ia);
      const b = this.projectVertex(view, ib);
      if (a.z > 1 && b.z > 1) continue;
      const dx = b.x - a.x;
      const dy = b.y - a.y;
      const len2 = dx * dx + dy * dy;
      const t = len2 ? Math.max(0, Math.min(1, ((p.x - a.x) * dx + (p.y - a.y) * dy) / len2)) : 0;
      const d = Math.hypot(a.x + dx * t - p.x, a.y + dy * t - p.y);
      if (d < bestD) {
        bestD = d;
        best = i;
        bestT = t;
      }
    }
    return { edge: best, t: bestT };
  }

  /** 矩形の中に入っている頂点。矩形選択で使う。 */
  vertsInRect(view: ObjectView, x0: number, y0: number, x1: number, y1: number): number[] {
    const lo = { x: Math.min(x0, x1), y: Math.min(y0, y1) };
    const hi = { x: Math.max(x0, x1), y: Math.max(y0, y1) };
    const out: number[] = [];
    const n = view.object.mesh.vertexCount;
    for (let i = 0; i < n; i++) {
      const s = this.projectVertex(view, i);
      if (s.z <= 1 && s.x >= lo.x && s.x <= hi.x && s.y >= lo.y && s.y <= hi.y) out.push(i);
    }
    return out;
  }
}
