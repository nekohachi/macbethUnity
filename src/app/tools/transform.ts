/**
 * マニピュレータのドラッグ。移動・回転・スケールを 1 つの状態機械で扱う。
 *
 * 押した時点で対象の座標をワールドで控え、動くたびにそこからの差分を当て直す。
 * 積み上げないので、行ったり来たりしてもずれない。
 *
 * ソフト選択と対称編集は重みと組として控えに入っているので、
 * 移動・回転・スケールのどれでも同じように効く。
 */
import { Matrix4, Plane, Quaternion, Ray, Vector3 } from "three";
import { cloneTransform, type SceneObject, type Transform } from "../../core/index.js";
import { handleKind, rayAxisT, type HandleKind } from "../render/manipulator.js";
import { worldFrame, type Frame } from "./frame.js";
import type { ScreenPoint } from "../render/picking.js";

/** ドラッグ開始時に控えるもの。 */
interface ObjectTarget {
  kind: "object";
  transform: Transform;
}

interface ComponentTarget {
  kind: "component";
  verts: number[];
  weights: number[];
  /** ドラッグ開始時のワールド座標。 */
  world: Vector3[];
  /** ワールド → ローカル。書き戻すときに使う。 */
  inverse: Matrix4;
  /** 対称編集の相手（動かす頂点 → 鏡映で追従する頂点）。 */
  mirror: Array<[number, number]>;
  /**
   * 中心線に留める頂点（`45` の T1）。x を 0 のままにする。
   *
   * 留めないと中心線の頂点だけが相手なしに動いて、左右が割れる。
   * 対応表（`41`）の `mirror[v] === v` がこれ。
   */
  pinX: number[];
}

export type DragTarget = ObjectTarget | ComponentTarget;

export interface DragState {
  kind: Exclude<HandleKind, null>;
  /** 履歴に残す名前。押し出しに化けることがある。 */
  label: string;
  handle: number;
  /** 軸ドラッグなら 0–2、自由ドラッグなら -1。 */
  axis: number;
  pivot: Vector3;
  target: DragTarget;
  /** 押した位置（ビューポート内）とピボットの画面座標。 */
  start: ScreenPoint;
  pivotScreen: ScreenPoint;
  /** 軸上の初期位置。 */
  t0: number;
  /** ピボットから見た初期角度。回転に使う。 */
  a0: number;
  /** カメラに正対する平面。自由移動の投影先。 */
  plane: Plane;
  /** 自由移動の開始点（平面上）。 */
  planeStart: Vector3 | null;
  /**
   * 軸の向き（`45` の T2）。**押した時点で固定する。**
   * 動かしている最中に法線が変わっても矢印が回らないように（Maya と同じ）。
   */
  frame: Frame;
}

export function beginDrag(options: {
  handle: number;
  pivot: Vector3;
  target: DragTarget;
  point: ScreenPoint;
  pivotScreen: ScreenPoint;
  ray: Ray;
  cameraPosition: Vector3;
  label: string;
  /** 軸の向き（`45` の T2）。渡さなければワールド。 */
  frame?: Frame;
}): DragState {
  const { handle, pivot, ray } = options;
  const frame = options.frame ?? worldFrame();
  const kind = handleKind(handle) ?? "move";
  // 30（直接ドラッグ）と中心ハンドルは軸なし
  const axis = handle !== 30 && handle % 10 < 3 ? handle % 10 : -1;
  const plane = new Plane().setFromNormalAndCoplanarPoint(
    new Vector3().subVectors(options.cameraPosition, pivot).normalize(),
    pivot,
  );
  let planeStart: Vector3 | null = null;
  if (axis < 0) {
    const hit = new Vector3();
    if (ray.intersectPlane(plane, hit)) planeStart = hit;
  }
  return {
    kind,
    label: options.label,
    handle,
    axis,
    pivot: pivot.clone(),
    target: options.target,
    start: options.point,
    pivotScreen: options.pivotScreen,
    t0: axis >= 0 ? rayAxisT(ray, pivot, frame.axes[axis]) : 0,
    a0: Math.atan2(options.point.y - options.pivotScreen.y, options.point.x - options.pivotScreen.x),
    plane,
    planeStart,
    frame,
  };
}

/**
 * ドラッグ中の 1 フレーム。オブジェクトかメッシュを直接書き換える。
 *
 * `snap` を渡すと、移動のときだけ「ピボットの行き先」を通して寄せ先を決める。
 * null が返れば寄せない。軸ドラッグ中は軸の上に留まるよう、寄せた先を軸へ落とし直す。
 */
export interface DragOptions {
  /** 移動の寄せ先（スナップ）。null が返れば寄せない。 */
  snap?: (world: Vector3) => Vector3 | null;
  /** 回転の刻み（度）。0 でなめらか（`21` の 2.2）。 */
  rotateStep?: number;
  /** スケールで 0 を跨がせない（`21` の 2.2）。 */
  preventNegativeScale?: boolean;
}

/** 裏返さないときの下限。0 ちょうどだと面が潰れるので、ごく小さい値で止める。 */
const SCALE_FLOOR = 0.001;

export function updateDrag(
  drag: DragState,
  object: SceneObject,
  point: ScreenPoint,
  ray: Ray,
  cameraPosition: Vector3,
  options: DragOptions = {},
): void {
  const snap = options.snap;
  if (drag.kind === "move") {
    let delta: Vector3;
    if (drag.axis < 0) {
      const hit = new Vector3();
      if (!drag.planeStart || !ray.intersectPlane(drag.plane, hit)) return;
      delta = new Vector3().subVectors(hit, drag.planeStart);
    } else {
      const axis = drag.frame.axes[drag.axis];
      delta = axis.clone().multiplyScalar(rayAxisT(ray, drag.pivot, axis) - drag.t0);
    }
    if (snap) {
      const landed = snap(drag.pivot.clone().add(delta));
      if (landed) {
        const wanted = landed.sub(drag.pivot);
        // 軸ドラッグなら、その軸の成分だけを取る（軸から外れない）
        const axis = drag.axis < 0 ? null : drag.frame.axes[drag.axis];
        delta = axis ? axis.clone().multiplyScalar(wanted.dot(axis)) : wanted;
      }
    }
    apply(drag, object, (w, weight) => w.clone().addScaledVector(delta, weight), { position: delta });
    return;
  }

  if (drag.kind === "rotate") {
    let angle = Math.atan2(point.y - drag.pivotScreen.y, point.x - drag.pivotScreen.x) - drag.a0;
    // 刻みが決まっていれば、その角度に丸める（Maya のスナップ回転）
    const step = options.rotateStep ?? 0;
    if (step > 0) {
      const rad = (step * Math.PI) / 180;
      angle = Math.round(angle / rad) * rad;
    }
    const axis =
      drag.axis < 0
        ? new Vector3().subVectors(cameraPosition, drag.pivot).normalize()
        : drag.frame.axes[drag.axis].clone();
    // 軸が奥を向いているときは、画面での回し方向と一致するよう符号を返す
    if (drag.axis >= 0 && axis.dot(new Vector3().subVectors(cameraPosition, drag.pivot)) < 0) angle = -angle;
    apply(
      drag,
      object,
      (w, weight) => {
        const q = new Quaternion().setFromAxisAngle(axis, -angle * weight);
        return w.clone().sub(drag.pivot).applyQuaternion(q).add(drag.pivot);
      },
      { rotation: new Quaternion().setFromAxisAngle(axis, -angle) },
    );
    return;
  }

  // 「負のスケールを防ぐ」がオフなら 0 を跨いで裏返せる
  const floor = options.preventNegativeScale === false ? -Infinity : SCALE_FLOOR;
  let factor: Vector3;
  if (drag.axis < 0) {
    factor = new Vector3(1, 1, 1).multiplyScalar(Math.max(floor, 1 + (point.x - drag.start.x) * 0.008));
  } else {
    const t = rayAxisT(ray, drag.pivot, drag.frame.axes[drag.axis]);
    const k = Math.max(floor, 1 + ((t - drag.t0) / Math.max(1e-4, Math.abs(drag.t0))) * 0.6);
    factor = new Vector3(1, 1, 1);
    factor.setComponent(drag.axis, k);
  }
  // **枠の軸に沿って伸ばす**（`45` の T2）。成分ごとに掛けるのは、枠が
  // ワールドのときにしか合っていなかった
  const axis = drag.axis < 0 ? null : drag.frame.axes[drag.axis];
  const k = drag.axis < 0 ? 0 : factor.getComponent(drag.axis) - 1;
  apply(
    drag,
    object,
    (w, weight) => {
      const r = w.clone().sub(drag.pivot);
      if (axis) r.addScaledVector(axis, r.dot(axis) * k * weight);
      else r.multiplyScalar(1 + (factor.x - 1) * weight);
      return r.add(drag.pivot);
    },
    { scale: factor },
  );
}

/**
 * 3 本指の変形。マニピュレータを触らずに、選択そのものを動かす。
 *
 * できるのは 2 つだけ。**ピボット（選択の中心）を動かさない拡大縮小**と、
 * **1 本の軸に沿った平行移動**。どちらか一方しか渡ってこない（呼び出し側で決まる）。
 * 回転と、画面に沿った自由な移動は扱わない — それはマニピュレータの仕事で、
 * 指がずれたときに形が流れてしまうため。
 *
 * 開始時点の控えに毎回当て直すので、行ったり来たりしてもずれない。
 * ソフト選択の重みと対称編集は、コンポーネントの控えにそのまま入っている。
 */
/**
 * クォータニオンのうち、その軸まわりの回転（度。`27` の T1）。
 *
 * スイング・ツイスト分解。軸に平行な成分だけを取り出して角度に直す。
 * 「今この軸で何度傾いているか」を出すのに使う。返すのは −180〜180。
 */
export function tiltAbout(q: Quaternion, axis: Vector3): number {
  const v = new Vector3(q.x, q.y, q.z);
  const along = axis.clone().multiplyScalar(v.dot(axis));
  const len = Math.hypot(along.x, along.y, along.z);
  // 軸に垂直な 180° 回転だと成分が消える。そこは 0 とする
  if (len < 1e-9 && Math.abs(q.w) < 1e-9) return 0;
  const sign = along.dot(axis) < 0 ? -1 : 1;
  const deg = (2 * Math.atan2(len, Math.abs(q.w)) * 180) / Math.PI;
  const signed = deg * sign * (q.w < 0 ? -1 : 1);
  return ((((signed + 180) % 360) + 360) % 360) - 180;
}

export function applyGestureTransform(
  drag: DragState,
  object: SceneObject,
  t: {
    scale?: number | [number, number, number];
    move?: Vector3;
    /** ひねりの回転（`26` の T1）。右ねじの向きで `angle` ラジアン回す。 */
    rotate?: { axis: Vector3; angle: number };
  },
): void {
  // 裏返らないように下限を置く。軸ごとの倍率にも同じ下限（`25` の T2）
  const raw = t.scale ?? 1;
  const s =
    typeof raw === "number"
      ? new Vector3(Math.max(0.02, raw), Math.max(0.02, raw), Math.max(0.02, raw))
      : new Vector3(Math.max(0.02, raw[0]), Math.max(0.02, raw[1]), Math.max(0.02, raw[2]));
  const move = t.move ?? new Vector3();
  const spin = t.rotate ?? null;
  const pivot = drag.pivot;
  const target = drag.target;

  /** ピボットからの距離を成分ごとに伸ばし、回して、軸に沿って動かす。 */
  const place = (p: Vector3, weight = 1): Vector3 => {
    const r = p.clone().sub(pivot).multiply(s);
    // 回転はソフト選択の重みを角度に掛ける（座標を混ぜると弧が内側に落ちる）
    if (spin) r.applyQuaternion(new Quaternion().setFromAxisAngle(spin.axis, spin.angle * weight));
    return r.add(pivot).add(move);
  };

  if (target.kind === "object") {
    const t0 = target.transform;
    // 原点もピボットの周りで伸び縮み・回転する（マニピュレータと同じ扱い）
    const moved = place(new Vector3(t0.position[0], t0.position[1], t0.position[2]));
    const turned = spin
      ? new Quaternion()
          .setFromAxisAngle(spin.axis, spin.angle)
          .multiply(new Quaternion(t0.rotation[0], t0.rotation[1], t0.rotation[2], t0.rotation[3]))
      : null;
    object.transform = {
      position: [moved.x, moved.y, moved.z],
      rotation: turned ? [turned.x, turned.y, turned.z, turned.w] : [...t0.rotation],
      scale: [t0.scale[0] * s.x, t0.scale[1] * s.y, t0.scale[2] * s.z],
    };
    return;
  }

  for (let i = 0; i < target.verts.length; i++) {
    const start = target.world[i];
    const weight = target.weights[i];
    // 重みで元の位置と変形後の間を取る（ソフト選択）。回転は角度そのものに重みが乗る
    const moved = spin ? place(start, weight) : start.clone().lerp(place(start), weight);
    const w = moved.applyMatrix4(target.inverse);
    object.mesh.setPosition(target.verts[i], w.x, w.y, w.z);
  }
  mirrorBack(object, target);
}

/**
 * 控えた開始状態に差分を当てる。
 * オブジェクトはトランスフォームを、コンポーネントは頂点座標を書き換える。
 */
function apply(
  drag: DragState,
  object: SceneObject,
  moveWorld: (world: Vector3, weight: number) => Vector3,
  objectDelta: { position?: Vector3; rotation?: Quaternion; scale?: Vector3 },
): void {
  const target = drag.target;

  if (target.kind === "object") {
    const t0 = target.transform;
    const next = cloneTransform(t0);
    const origin = new Vector3(t0.position[0], t0.position[1], t0.position[2]);

    if (objectDelta.position) {
      const p = origin.clone().add(objectDelta.position);
      next.position = [p.x, p.y, p.z];
    }
    if (objectDelta.rotation) {
      const q = objectDelta.rotation
        .clone()
        .multiply(new Quaternion(t0.rotation[0], t0.rotation[1], t0.rotation[2], t0.rotation[3]));
      next.rotation = [q.x, q.y, q.z, q.w];
      // ピボットを中心に回すので、原点もピボットの周りを回る
      const p = origin.clone().sub(drag.pivot).applyQuaternion(objectDelta.rotation).add(drag.pivot);
      next.position = [p.x, p.y, p.z];
    }
    if (objectDelta.scale) {
      const s = objectDelta.scale;
      next.scale = [t0.scale[0] * s.x, t0.scale[1] * s.y, t0.scale[2] * s.z];
      const p = origin.clone().sub(drag.pivot);
      p.set(p.x * s.x, p.y * s.y, p.z * s.z);
      p.add(drag.pivot);
      next.position = [p.x, p.y, p.z];
    }
    object.transform = next;
    return;
  }

  for (let i = 0; i < target.verts.length; i++) {
    const w = moveWorld(target.world[i], target.weights[i]).applyMatrix4(target.inverse);
    object.mesh.setPosition(target.verts[i], w.x, w.y, w.z);
  }
  mirrorBack(object, target);
}

/**
 * 対称編集の後始末（`45` の T1）。相手側をローカル X で鏡映した位置に置き、
 * 中心線の頂点は x を 0 に留める。
 */
function mirrorBack(object: SceneObject, target: ComponentTarget): void {
  for (const [from, to] of target.mirror) {
    const p = object.mesh.getPosition(from);
    object.mesh.setPosition(to, -p[0], p[1], p[2]);
  }
  for (const v of target.pinX) {
    const p = object.mesh.getPosition(v);
    object.mesh.setPosition(v, 0, p[1], p[2]);
  }
}
