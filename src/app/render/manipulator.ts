/**
 * ユニバーサルマニピュレータ。移動・回転・スケールを 1 つにまとめてある。
 *
 * 選択したらすぐ動かせるように、ツールを持ち替えずに済ませるのが狙い。
 * 単独モード（移動だけ、など）は長押しのマーキングメニューで選ぶ。
 *
 * ピボットは Maya と同じ:
 *   オブジェクトモード = トランスフォームの原点
 *   コンポーネントモード = 選択のバウンディングボックス中心
 */
import {
  BoxGeometry,
  BufferGeometry,
  ConeGeometry,
  Float32BufferAttribute,
  Group,
  Line,
  LineBasicMaterial,
  Mesh as ThreeMesh,
  MeshBasicMaterial,
  Quaternion,
  Ray,
  SphereGeometry,
  Vector3,
  type Camera,
} from "three";
import type { Manip } from "../state.js";
import { AXIS_COLORS } from "./materials.js";
import { disposeObject3D } from "./meshView.js";
import type { ScreenPoint } from "./picking.js";

export const AXES = [new Vector3(1, 0, 0), new Vector3(0, 1, 0), new Vector3(0, 0, 1)];

/**
 * ハンドルの番号。
 *   0–2   軸移動 XYZ        3  自由移動（中心）
 *   10–12 軸回転 XYZ        13 ビュー軸回転
 *   20–22 軸スケール XYZ    23 均等スケール（中心）
 *   30    選択コンポーネントの直接ドラッグ（ツイーク）
 */
export const HANDLE_FREE_MOVE = 3;
export const HANDLE_VIEW_ROTATE = 13;
export const HANDLE_UNIFORM_SCALE = 23;
export const HANDLE_TWEAK = 30;
/** マニピュレータではなく 3 本指のジェスチャによる変形。 */
export const HANDLE_GESTURE = 40;

export type HandleKind = "move" | "rotate" | "scale" | null;

export function handleKind(h: number): HandleKind {
  if (h < 0) return null;
  if (h === HANDLE_TWEAK || h < 10) return "move";
  if (h < 20) return "rotate";
  return "scale";
}

/** 指で操作するときの判定の広さ。ペン・マウスの 1.0 に対しての倍率。 */
export const TOUCH_TOLERANCE = 1.8;

const HOT = 0xffe680;
const CENTER = 0xe2c860;
/** ピボット編集中の色。黄緑。ふだんの軸色と間違えないように。 */
const PIVOT = 0x9ade4a;

interface Layout {
  move: boolean;
  rotate: boolean;
  scale: boolean;
  /** 中心からの距離の倍率。全部出すときは重ならないようずらす。 */
  arrow: number;
  ring: number;
  cube: number;
}

function layoutFor(manip: Manip): Layout {
  const all = manip === "all";
  return {
    move: all || manip === "move",
    rotate: all || manip === "rotate",
    scale: all || manip === "scale",
    arrow: 1.0,
    ring: all ? 0.68 : 1.0,
    cube: all ? 1.3 : 1.0,
  };
}

function ringLine(center: Vector3, axis: Vector3, radius: number, color: number, segments = 64): Line {
  const q = new Quaternion().setFromUnitVectors(new Vector3(0, 0, 1), axis.clone().normalize());
  const pts: number[] = [];
  for (let i = 0; i <= segments; i++) {
    const a = (i / segments) * Math.PI * 2;
    const v = new Vector3(Math.cos(a) * radius, Math.sin(a) * radius, 0).applyQuaternion(q).add(center);
    pts.push(v.x, v.y, v.z);
  }
  const g = new BufferGeometry();
  g.setAttribute("position", new Float32BufferAttribute(pts, 3));
  const line = new Line(g, new LineBasicMaterial({ color }));
  line.renderOrder = 6;
  return line;
}

function segmentDistance(p: ScreenPoint, a: ScreenPoint, b: ScreenPoint): number {
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const len2 = dx * dx + dy * dy;
  const t = len2 ? Math.max(0, Math.min(1, ((p.x - a.x) * dx + (p.y - a.y) * dy) / len2)) : 0;
  return Math.hypot(a.x + dx * t - p.x, a.y + dy * t - p.y);
}

export interface ManipulatorHost {
  /** ワールド座標を画面座標へ。 */
  toScreen(v: Vector3): ScreenPoint & { z: number };
  /** そのときのカメラ。透視と平行を切り替えるので、都度もらう。 */
  camera(): Camera;
  /** 平行投影のときは距離で大きさを決められないので、カメラの距離を使う。透視なら null。 */
  orthoDistance(): number | null;
  /** 見た目の大きさの倍率（0.5〜2.0）。当たり判定の px は変えない。 */
  manipSize(): number;
  /** ピボットを動かしている最中か。見た目を変える（Maya の D）。 */
  pivotEdit(): boolean;
}

export class Manipulator {
  readonly group = new Group();
  /** 今光っているハンドル。 */
  hot = -1;
  /** 同じ見た目なら作り直さないための署名。 */
  private signature = "";

  constructor(private host: ManipulatorHost) {}

  /** ワールド座標を画面座標へ。ドラッグ開始時の基準に使う。 */
  toScreen(v: Vector3): ScreenPoint & { z: number } {
    return this.host.toScreen(v);
  }

  /** 画面上での大きさが一定になるようにする係数。ユーザーの倍率もここで掛ける。 */
  scaleAt(center: Vector3): number {
    const ortho = this.host.orthoDistance();
    const base = ortho !== null ? ortho * 0.09 : this.host.camera().position.distanceTo(center) * 0.15;
    return base * this.host.manipSize();
  }

  clear(): void {
    for (const c of this.group.children.slice()) {
      this.group.remove(c);
      disposeObject3D(c);
    }
    this.signature = "";
  }

  /** 中心が null なら消す。中身が変わっていなければ何もしない。 */
  rebuild(center: Vector3 | null, manip: Manip, extraSignature: string): void {
    if (!center) {
      if (this.signature) this.clear();
      return;
    }
    const s = this.scaleAt(center);
    // ピボット編集中は移動だけを出す。動かす先はピボットであってメッシュではない
    const pivotEdit = this.host.pivotEdit();
    const sig = [
      manip,
      this.hot,
      extraSignature,
      pivotEdit ? "pivot" : "",
      center.x.toFixed(3),
      center.y.toFixed(3),
      center.z.toFixed(3),
      s.toFixed(3),
    ].join("|");
    if (sig === this.signature) return;
    this.clear();
    this.signature = sig;

    const L = pivotEdit ? layoutFor("move") : layoutFor(manip);
    const axisColor = (a: number): number => (pivotEdit ? PIVOT : AXIS_COLORS[a]);
    const isHot = (id: number) => this.hot === id;

    for (let a = 0; a < 3; a++) {
      const axis = AXES[a];
      if (L.move || L.scale) {
        const end = axis
          .clone()
          .multiplyScalar((L.scale ? L.cube : L.arrow) * s)
          .add(center);
        const color = isHot(a) || isHot(20 + a) ? HOT : axisColor(a);
        const g = new BufferGeometry();
        g.setAttribute(
          "position",
          new Float32BufferAttribute([center.x, center.y, center.z, end.x, end.y, end.z], 3),
        );
        const line = new Line(g, new LineBasicMaterial({ color }));
        line.renderOrder = 6;
        this.group.add(line);
      }
      if (L.move) {
        const cone = new ThreeMesh(
          new ConeGeometry(s * 0.075, s * 0.22, 10),
          new MeshBasicMaterial({ color: isHot(a) ? HOT : axisColor(a) }),
        );
        cone.quaternion.setFromUnitVectors(new Vector3(0, 1, 0), axis);
        cone.position.copy(axis.clone().multiplyScalar(L.arrow * s).add(center));
        cone.renderOrder = 6;
        this.group.add(cone);
      }
      if (L.scale) {
        const cube = new ThreeMesh(
          new BoxGeometry(s * 0.12, s * 0.12, s * 0.12),
          new MeshBasicMaterial({ color: isHot(20 + a) ? HOT : axisColor(a) }),
        );
        cube.position.copy(axis.clone().multiplyScalar(L.cube * s).add(center));
        cube.renderOrder = 6;
        this.group.add(cube);
      }
      if (L.rotate) {
        this.group.add(ringLine(center, axis, L.ring * s, isHot(10 + a) ? HOT : axisColor(a)));
      }
    }

    // 回転単独のときだけ、画面に正対したリングを足す（Maya と同じ）
    if (manip === "rotate" && !pivotEdit) {
      const viewAxis = new Vector3().subVectors(this.host.camera().position, center).normalize();
      this.group.add(
        ringLine(center, viewAxis, s * 1.18, isHot(HANDLE_VIEW_ROTATE) ? HOT : 0xb9c3cb),
      );
    }

    const center3d =
      manip === "scale" && !pivotEdit
        ? new ThreeMesh(
            new BoxGeometry(s * 0.14, s * 0.14, s * 0.14),
            new MeshBasicMaterial({ color: isHot(HANDLE_UNIFORM_SCALE) ? HOT : CENTER }),
          )
        : new ThreeMesh(
            new SphereGeometry(s * 0.085, 12, 10),
            new MeshBasicMaterial({
              color: isHot(HANDLE_FREE_MOVE) || isHot(HANDLE_TWEAK) ? HOT : pivotEdit ? PIVOT : CENTER,
            }),
          );
    center3d.position.copy(center);
    center3d.renderOrder = 6;
    this.group.add(center3d);
  }

  /**
   * 画面の点からハンドルを拾う。
   * 重なりが多い順に判定を狭くする: 中心 > スケールの箱 > 移動の矢印 > 回転のリング。
   *
   * tolerance は判定の広さの倍率。指はペンより当たりが粗いので、
   * 呼ぶ側が TOUCH_TOLERANCE を渡して広げる。
   */
  pick(p: ScreenPoint, center: Vector3 | null, manip: Manip, tolerance = 1): number {
    if (!center) return -1;
    // ピボット編集中は移動しか出していないので、拾えるのも移動だけ
    const pivotEdit = this.host.pivotEdit();
    const kind: Manip = pivotEdit ? "move" : manip;
    const s = this.scaleAt(center);
    const sc = this.host.toScreen(center);
    if (Math.hypot(sc.x - p.x, sc.y - p.y) < 16 * tolerance) {
      return kind === "scale" ? HANDLE_UNIFORM_SCALE : HANDLE_FREE_MOVE;
    }

    const L = layoutFor(kind);
    let best = -1;
    let bestD = Infinity;
    const consider = (id: number, d: number, threshold: number) => {
      if (d < threshold && d < bestD) {
        bestD = d;
        best = id;
      }
    };

    for (let a = 0; a < 3; a++) {
      const axis = AXES[a];
      if (L.scale) {
        const cs = this.host.toScreen(axis.clone().multiplyScalar(L.cube * s).add(center));
        consider(20 + a, Math.hypot(cs.x - p.x, cs.y - p.y), 16 * tolerance);
      }
      if (L.move) {
        // 中心付近は自由移動に譲るので、矢印は 0.3 から先だけ判定する
        const p0 = this.host.toScreen(axis.clone().multiplyScalar(0.3 * s).add(center));
        const p1 = this.host.toScreen(axis.clone().multiplyScalar(L.arrow * s).add(center));
        consider(a, segmentDistance(p, p0, p1), 14 * tolerance);
      }
    }
    if (best >= 0) return best;

    if (L.rotate) {
      for (let a = 0; a < 3; a++) {
        consider(10 + a, this.ringDistance(p, center, AXES[a], L.ring * s), 12 * tolerance);
      }
      if (kind === "rotate") {
        const viewAxis = new Vector3().subVectors(this.host.camera().position, center).normalize();
        consider(HANDLE_VIEW_ROTATE, this.ringDistance(p, center, viewAxis, s * 1.18), 12 * tolerance);
      }
    }
    return best;
  }

  private ringDistance(p: ScreenPoint, center: Vector3, axis: Vector3, radius: number): number {
    const q = new Quaternion().setFromUnitVectors(new Vector3(0, 0, 1), axis.clone().normalize());
    let d = Infinity;
    for (let i = 0; i < 64; i++) {
      const a = (i / 64) * Math.PI * 2;
      const v = new Vector3(Math.cos(a) * radius, Math.sin(a) * radius, 0).applyQuaternion(q).add(center);
      const s = this.host.toScreen(v);
      d = Math.min(d, Math.hypot(s.x - p.x, s.y - p.y));
    }
    return d;
  }
}

/**
 * レイと軸の最接近点を、軸上の位置 t として返す。
 * 軸ドラッグでどれだけ動いたかを求めるのに使う。
 */
export function rayAxisT(ray: Ray, origin: Vector3, dir: Vector3): number {
  const w0 = new Vector3().subVectors(origin, ray.origin);
  const a = dir.dot(dir);
  const b = dir.dot(ray.direction);
  const c = ray.direction.dot(ray.direction);
  const d = dir.dot(w0);
  const e = ray.direction.dot(w0);
  const den = a * c - b * b;
  // レイと軸が平行なときは動かさない
  if (Math.abs(den) < 1e-9) return 0;
  return (b * e - c * d) / den;
}
