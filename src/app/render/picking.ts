/**
 * 画面座標からメッシュの要素を拾う。
 *
 * 面はレイキャスト、頂点とエッジは画面に投影してから距離で判定する。
 * Maya と同じく、近ければ拾えるようにピクセル半径で許容する。
 */
import { Matrix3, Raycaster, Vector2, Vector3 } from "three";
import { edgeKey, type SceneObject } from "../../core/index.js";
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

/** 面が「カメラを向いている」とみなす最小の余弦。真横の面を落とすためのもの。 */
const FACING_EPS = 1e-6;

export class Picker {
  /**
   * カメラベース選択（`21` の 2.1、Maya の Camera based selection）。
   * オンのとき、**カメラに向いている面**に属するものだけを拾う。
   * app から差し替える（`picking.ts` は状態を持たない）。
   */
  cameraBased: () => boolean = () => false;
  /** 面がカメラを向いているかの控え。1 回の呼び出しの間だけ持つ。 */
  private facingCache: { view: ObjectView; front: Uint8Array } | null = null;
  /** 辺 → その辺を使っている面。エッジの判定に要る。同じく 1 回ぶん。 */
  private edgeFaceCache: { view: ObjectView; map: Map<string, number[]> } | null = null;

  constructor(
    private viewport: Viewport,
    private container: HTMLElement,
  ) {}

  /**
   * 面ごとに「カメラを向いているか」を出す。
   *
   * レイを撃って遮蔽を見る方法も試したが、頂点 3000 点で 1 秒近くかかり、
   * 矩形選択には使えなかった。Maya の Camera based selection も
   * 「カメラを向いている面のコンポーネントだけ」なので、そちらに合わせている。
   */
  private frontFaces(view: ObjectView): Uint8Array {
    if (this.facingCache?.view === view) return this.facingCache.front;
    const mesh = view.object.mesh;
    view.group.updateMatrixWorld();
    const normalMatrix = new Matrix3().getNormalMatrix(view.group.matrixWorld);
    const normals = mesh.faceNormals();
    const front = new Uint8Array(mesh.faceCount);
    const camera = this.viewport.camera;
    const forward = new Vector3();
    camera.getWorldDirection(forward);
    const perspective = (camera as { isPerspectiveCamera?: boolean }).isPerspectiveCamera === true;
    const n = new Vector3();
    const c = new Vector3();
    for (let f = 0; f < mesh.faceCount; f++) {
      n.set(normals[f * 3], normals[f * 3 + 1], normals[f * 3 + 2]).applyMatrix3(normalMatrix);
      // 平行投影は視線が 1 本しかないので、面の位置は要らない
      let toEye: Vector3;
      if (perspective) {
        const center = mesh.faceCenter(f);
        c.set(center[0], center[1], center[2]).applyMatrix4(view.group.matrixWorld);
        toEye = c.subVectors(camera.position, c);
      } else {
        toEye = c.copy(forward).negate();
      }
      // 真横から見た面（内積がほぼ 0）は見えていない。丸め誤差で表になるのを避ける
      const cos = n.dot(toEye) / Math.max(1e-12, n.length() * toEye.length());
      front[f] = cos > FACING_EPS ? 1 : 0;
    }
    this.facingCache = { view, front };
    return front;
  }

  private edgeFaces(view: ObjectView): Map<string, number[]> {
    if (this.edgeFaceCache?.view === view) return this.edgeFaceCache.map;
    const map = view.object.mesh.edgeFaceMap();
    this.edgeFaceCache = { view, map };
    return map;
  }

  /** この呼び出しの間だけ控えを持つ。選択が終わったら捨てる。 */
  private withFacing<T>(run: () => T): T {
    this.facingCache = null;
    this.edgeFaceCache = null;
    try {
      return run();
    } finally {
      this.facingCache = null;
      this.edgeFaceCache = null;
    }
  }

  /**
   * エッジがカメラを向いているか。**その辺を使っている面**で見る。
   *
   * 端点のどちらかが見えていれば通す、では緩すぎる。立方体をパースで見ると
   * 裏の 3 本も端点が見えているので、12 本すべて拾ってしまう（見えるのは 9 本）。
   */
  private edgeFacing(view: ObjectView, a: number, b: number): boolean {
    if (!this.cameraBased()) return true;
    const front = this.frontFaces(view);
    const uses = this.edgeFaces(view).get(edgeKey(a, b));
    // どの面にも属さない辺（宙に浮いた辺）は隠せないので通す
    if (!uses?.length) return true;
    return uses.some((f) => front[f] === 1);
  }

  /** 面がカメラを向いているか。カメラベース選択がオフなら常に真。 */
  faceVisible(view: ObjectView, face: number): boolean {
    if (!this.cameraBased()) return true;
    return this.frontFaces(view)[face] === 1;
  }

  /** 頂点に、カメラを向いている面が 1 枚でもあるか。 */
  private vertexVisible(view: ObjectView, vi: number, faces: Map<number, number[]>): boolean {
    if (!this.cameraBased()) return true;
    const front = this.frontFaces(view);
    const around = faces.get(vi);
    // どの面にも属さない頂点（孤立点）は隠せないので通す
    if (!around?.length) return true;
    return around.some((f) => front[f] === 1);
  }

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

  /**
   * 面のレイキャスト。手前のものを 1 つ返す。
   * `exclude` を渡すとそのオブジェクトを外す（サーフェススナップで自分に当たり続けるのを避ける）。
   */
  pickSurface(p: ScreenPoint, exclude?: SceneObject | null): SurfaceHit | null {
    raycaster.setFromCamera(this.ndc(p), this.viewport.camera);
    const views = this.viewport
      .allViews()
      .filter((v) => v.object.visible && (!exclude || v.object !== exclude));
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

  /**
   * 半径 radius ピクセル以内で最も近い頂点。見つからなければ -1。
   * カメラベース選択がオンなら、隠れている頂点は飛ばして次に近いものを見る。
   */
  pickVertex(view: ObjectView, p: ScreenPoint, radius: number, exclude = -1): number {
    return this.withFacing(() => {
      const faces = this.cameraBased() ? view.object.mesh.vertexFaces() : new Map<number, number[]>();
      let best = -1;
      let bestD = radius * radius;
      const n = view.object.mesh.vertexCount;
      for (let i = 0; i < n; i++) {
        if (i === exclude) continue;
        const s = this.projectVertex(view, i);
        if (s.z > 1) continue;
        const d = (s.x - p.x) ** 2 + (s.y - p.y) ** 2;
        if (d >= bestD) continue;
        if (!this.vertexVisible(view, i, faces)) continue;
        bestD = d;
        best = i;
      }
      return best;
    });
  }

  /**
   * 指定した頂点を除いて、半径 radius ピクセル以内で最も近い頂点。
   * ターゲットウェルドで「掴んでいる頂点以外の相手」を探すのに使う。
   */
  pickVertexExcept(view: ObjectView, p: ScreenPoint, radius: number, exclude: number): number {
    return this.pickVertex(view, p, radius, exclude);
  }

  /**
   * 半径 radius ピクセル以内で最も近いエッジと、その上の位置。
   * カメラベース選択がオンなら、隠れているエッジは飛ばす（掴んだ点で判定する）。
   */
  pickEdge(view: ObjectView, p: ScreenPoint, radius: number): EdgeHit {
    return this.withFacing(() => {
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
        if (d >= bestD) continue;
        if (!this.edgeFacing(view, ia, ib)) continue;
        bestD = d;
        best = i;
        bestT = t;
      }
      return { edge: best, t: bestT };
    });
  }

  /** 矩形の中に入っている頂点。矩形選択で使う。 */
  vertsInRect(view: ObjectView, x0: number, y0: number, x1: number, y1: number): number[] {
    return this.withFacing(() => {
      const lo = { x: Math.min(x0, x1), y: Math.min(y0, y1) };
      const hi = { x: Math.max(x0, x1), y: Math.max(y0, y1) };
      const out: number[] = [];
      const faces = this.cameraBased() ? view.object.mesh.vertexFaces() : new Map<number, number[]>();
      const n = view.object.mesh.vertexCount;
      for (let i = 0; i < n; i++) {
        const s = this.projectVertex(view, i);
        if (s.z > 1 || s.x < lo.x || s.x > hi.x || s.y < lo.y || s.y > hi.y) continue;
        if (!this.vertexVisible(view, i, faces)) continue;
        out.push(i);
      }
      return out;
    });
  }

  /** 矩形選択で、そのエッジがカメラを向いているか。 */
  edgeVisible(view: ObjectView, a: number, b: number): boolean {
    if (!this.cameraBased()) return true;
    return this.edgeFacing(view, a, b);
  }
}
