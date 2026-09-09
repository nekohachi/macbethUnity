/**
 * 画面座標からメッシュの要素を拾う。
 *
 * 面はレイキャスト、頂点とエッジは画面に投影してから距離で判定する。
 * Maya と同じく、近ければ拾えるようにピクセル半径で許容する。
 */
import { Matrix3, Matrix4, Raycaster, Vector2, Vector3 } from "three";
import { edgeKey, raycastBvh, trianglesNear, type SceneObject } from "../../core/index.js";
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
/** ローカル空間へ持ち込んだレイ（`29` の B-T5）。毎回作らない。 */
const invMatrix = new Matrix4();
const rayOrigin = new Vector3();
const rayDir = new Vector3();
const scratchRight = new Vector3();
const scratchB = new Vector3();
const scratchProject = new Vector3();

/** 0 から n − 1 まで。候補を絞れないときに使う。 */
function* countUp(n: number): Iterable<number> {
  for (let i = 0; i < n; i++) yield i;
}

/** 面が「カメラを向いている」とみなす最小の余弦。真横の面を落とすためのもの。 */
const FACING_EPS = 1e-6;

const EMPTY_FACES = new Map<number, number[]>();

function sameStamp(a: number[], b: number[]): boolean {
  if (a.length !== b.length) return false;
  for (let i = 0; i < a.length; i++) if (a[i] !== b[i]) return false;
  return true;
}

export class Picker {
  /**
   * カメラベース選択（`21` の 2.1、Maya の Camera based selection）。
   * オンのとき、**カメラに向いている面**に属するものだけを拾う。
   * app から差し替える（`picking.ts` は状態を持たない）。
   */
  cameraBased: () => boolean = () => false;
  /**
   * 面がカメラを向いているかの控え。
   *
   * カメラかメッシュが動いたら作り直す。控えを持たないと矩形選択で
   * 面の数だけ計算し直すことになり、持ちっぱなしにするとカメラを回したあとに
   * 古い向きで選んでしまう（球を回しながら選ぶと合わなくなる）。
   */
  private facingCache: { view: ObjectView; front: Uint8Array; stamp: number[] } | null = null;
  /** 辺 → その辺を使っている面。エッジの判定に要る。 */
  private edgeFaceCache: { view: ObjectView; mesh: unknown; map: Map<string, number[]> } | null = null;

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
    const stamp = this.facingStamp(view);
    const cached = this.facingCache;
    if (cached?.view === view && sameStamp(cached.stamp, stamp)) return cached.front;
    const mesh = this.viewport.meshOf(view.object);
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
    this.facingCache = { view, front, stamp };
    return front;
  }

  /**
   * 控えが今も使えるかの目印。カメラとオブジェクトの姿勢、メッシュの大きさ、
   * それに頂点の一部を混ぜる（頂点を動かしただけでも向きは変わる）。
   */
  private facingStamp(view: ObjectView): number[] {
    view.group.updateMatrixWorld();
    const camera = this.viewport.camera;
    camera.updateMatrixWorld();
    const mesh = this.viewport.meshOf(view.object);
    const p = mesh.positions;
    const last = p.length - 3;
    return [
      ...camera.matrixWorld.elements,
      ...view.group.matrixWorld.elements,
      mesh.faceCount,
      mesh.vertexCount,
      p[0] ?? 0,
      p[1] ?? 0,
      p[2] ?? 0,
      p[last] ?? 0,
      p[last + 1] ?? 0,
      p[last + 2] ?? 0,
    ];
  }

  private edgeFaces(view: ObjectView): Map<string, number[]> {
    const mesh = this.viewport.meshOf(view.object);
    const cached = this.edgeFaceCache;
    if (cached?.view === view && cached.mesh === mesh) return cached.map;
    const map = mesh.edgeFaceMap();
    this.edgeFaceCache = { view, mesh, map };
    return map;
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

  // 分割しているときは「今入力を受けているペイン」の矩形で測る（`25` の T6）。
  // 分割していなければビューポート全体と同じ。
  private get width(): number {
    return this.viewport.paneRect(this.viewport.inputPane).w || 1;
  }
  private get height(): number {
    return this.viewport.paneRect(this.viewport.inputPane).h || 1;
  }

  /**
   * イベントの座標を**ペインの中の**ローカル座標にする。
   *
   * どのペインかはここで決まる（指を置いた場所）。ドラッグ中は
   * `viewport.inputLocked` が立っていて、隣のペインへはみ出しても入れ替わらない。
   */
  local(e: { clientX: number; clientY: number }): ScreenPoint {
    const r = this.container.getBoundingClientRect();
    const x = e.clientX - r.left;
    const y = e.clientY - r.top;
    if (!this.viewport.inputLocked) this.viewport.inputPane = this.viewport.paneAt(x, y);
    const pane = this.viewport.paneRect(this.viewport.inputPane);
    return { x: x - pane.x, y: y - pane.y };
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
    const p = this.viewport.meshOf(view.object).positions;
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
      // ロックしたものは選べない（`19` の 3.3 のアウトライナ）
      // 隔離（`27` の T3）で見えていないものも選べない
      .filter(
        (v) =>
          v.object.visible &&
          !v.object.locked &&
          !this.viewport.isolatedOut(v.object) &&
          (!exclude || v.object !== exclude),
      );

    // 三角形の木で当てる（`29` の B-T5）。総当たりだと 10 万三角形で目に見えて遅い。
    // 木はオブジェクトのローカル空間なので、レイのほうを持ち込む
    let best: SurfaceHit | null = null;
    for (const view of views) {
      view.group.updateMatrixWorld();
      const inv = invMatrix.copy(view.group.matrixWorld).invert();
      const o = rayOrigin.copy(raycaster.ray.origin).applyMatrix4(inv);
      const d = rayDir.copy(raycaster.ray.direction).transformDirection(inv);
      const mesh = this.viewport.meshOf(view.object);
      const hit = raycastBvh(this.viewport.bvhOf(view), mesh.positions, view.tri, [o.x, o.y, o.z], [d.x, d.y, d.z]);
      if (!hit) continue;
      const face = view.tri.triToFace[hit.tri] ?? 0;
      // カメラベース選択がオンなら、裏を向いた面は拾わない
      if (!this.faceVisible(view, face)) continue;
      // ローカルの当たった点をワールドへ戻して、他のオブジェクトと比べる
      const local = scratch.copy(o).addScaledVector(d, hit.t);
      const world = local.applyMatrix4(view.group.matrixWorld);
      const distance = world.distanceTo(raycaster.ray.origin);
      if (best && best.distance <= distance) continue;
      best = { object: view.object, view, face, point: world.clone(), distance };
    }
    return best;
  }

  /**
   * 半径 radius ピクセル以内で最も近い頂点。見つからなければ -1。
   * カメラベース選択がオンなら、隠れている頂点は飛ばして次に近いものを見る。
   */
  pickVertex(view: ObjectView, p: ScreenPoint, radius: number, exclude = -1): number {
    const faces = this.cameraBased() ? this.viewport.meshOf(view.object).vertexFaces() : EMPTY_FACES;
    let best = -1;
    let bestD = radius * radius;
    for (const i of this.vertexCandidates(view, p, radius)) {
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
  }

  /**
   * 半径の中に入りうる頂点だけを返す（`29` の B-T5）。
   *
   * まず面に当てて、当たった点のまわり **radius ピクセルぶんのワールド半径**に
   * 触れる三角形を木から拾い、その頂点だけを候補にする。10 万頂点でも
   * 数十個しか投影しない。**面に当たらなければ（メッシュの外を触った）全部返す**
   * — 縁の頂点やシルエットの外を拾えなくなるため。
   */
  private vertexCandidates(view: ObjectView, p: ScreenPoint, radius: number): Iterable<number> {
    const mesh = this.viewport.meshOf(view.object);
    // 小さいメッシュは総当たりのほうが速い（木を引く手間のほうが大きい）
    if (mesh.vertexCount < 4000) return countUp(mesh.vertexCount);
    const hit = this.pickSurface(p);
    if (!hit || hit.view !== view) return countUp(mesh.vertexCount);
    view.group.updateMatrixWorld();
    const local = scratch.copy(hit.point).applyMatrix4(invMatrix.copy(view.group.matrixWorld).invert());
    // 画面の radius ピクセルが、その点でどれだけのワールド距離にあたるか
    const world = this.pixelsToWorld(view, hit.point, radius);
    if (!(world > 0)) return countUp(mesh.vertexCount);
    const tris = trianglesNear(this.viewport.bvhOf(view), [local.x, local.y, local.z], world);
    if (!tris.length) return countUp(mesh.vertexCount);
    const out = new Set<number>();
    for (const t of tris) {
      out.add(view.tri.tri[t * 3]);
      out.add(view.tri.tri[t * 3 + 1]);
      out.add(view.tri.tri[t * 3 + 2]);
    }
    return out;
  }

  /**
   * その点で画面 `px` ピクセルが何ワールド単位にあたるか。
   * カメラの右方向へ 1 動かして、画面で何 px 動くかから割り出す。
   */
  private pixelsToWorld(view: ObjectView, world: Vector3, px: number): number {
    const camera = this.viewport.camera;
    const right = scratchRight.setFromMatrixColumn(camera.matrixWorld, 0);
    const a = this.projectWorld(world);
    const b = this.projectWorld(scratchB.copy(world).add(right));
    void view;
    const d = Math.hypot(b.x - a.x, b.y - a.y);
    return d > 1e-6 ? px / d : 0;
  }

  /** ワールドの点を画面座標へ。 */
  private projectWorld(world: Vector3): { x: number; y: number } {
    const v = scratchProject.copy(world).project(this.viewport.camera);
    return { x: ((v.x + 1) / 2) * this.width, y: ((-v.y + 1) / 2) * this.height };
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
  }

  /** 矩形の中に入っている頂点。矩形選択で使う。 */
  vertsInRect(view: ObjectView, x0: number, y0: number, x1: number, y1: number): number[] {
    const lo = { x: Math.min(x0, x1), y: Math.min(y0, y1) };
    const hi = { x: Math.max(x0, x1), y: Math.max(y0, y1) };
    const out: number[] = [];
    const faces = this.cameraBased() ? this.viewport.meshOf(view.object).vertexFaces() : EMPTY_FACES;
    const n = this.viewport.meshOf(view.object).vertexCount;
    for (let i = 0; i < n; i++) {
      const s = this.projectVertex(view, i);
      if (s.z > 1 || s.x < lo.x || s.x > hi.x || s.y < lo.y || s.y > hi.y) continue;
      if (!this.vertexVisible(view, i, faces)) continue;
      out.push(i);
    }
    return out;
  }

  /** 矩形選択で、そのエッジがカメラを向いているか。 */
  edgeVisible(view: ObjectView, a: number, b: number): boolean {
    if (!this.cameraBased()) return true;
    return this.edgeFacing(view, a, b);
  }
}
