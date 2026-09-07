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
import { AXES, handleKind, rayAxisT, type HandleKind } from "../render/manipulator.js";
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
}): DragState {
  const { handle, pivot, ray } = options;
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
    t0: axis >= 0 ? rayAxisT(ray, pivot, AXES[axis]) : 0,
    a0: Math.atan2(options.point.y - options.pivotScreen.y, options.point.x - options.pivotScreen.x),
    plane,
    planeStart,
  };
}

/** ドラッグ中の 1 フレーム。オブジェクトかメッシュを直接書き換える。 */
export function updateDrag(
  drag: DragState,
  object: SceneObject,
  point: ScreenPoint,
  ray: Ray,
  cameraPosition: Vector3,
): void {
  if (drag.kind === "move") {
    let delta: Vector3;
    if (drag.axis < 0) {
      const hit = new Vector3();
      if (!drag.planeStart || !ray.intersectPlane(drag.plane, hit)) return;
      delta = new Vector3().subVectors(hit, drag.planeStart);
    } else {
      const axis = AXES[drag.axis];
      delta = axis.clone().multiplyScalar(rayAxisT(ray, drag.pivot, axis) - drag.t0);
    }
    apply(drag, object, (w, weight) => w.clone().addScaledVector(delta, weight), { position: delta });
    return;
  }

  if (drag.kind === "rotate") {
    let angle = Math.atan2(point.y - drag.pivotScreen.y, point.x - drag.pivotScreen.x) - drag.a0;
    const axis =
      drag.axis < 0
        ? new Vector3().subVectors(cameraPosition, drag.pivot).normalize()
        : AXES[drag.axis].clone();
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

  let factor: Vector3;
  if (drag.axis < 0) {
    factor = new Vector3(1, 1, 1).multiplyScalar(Math.max(0.02, 1 + (point.x - drag.start.x) * 0.008));
  } else {
    const t = rayAxisT(ray, drag.pivot, AXES[drag.axis]);
    const k = Math.max(0.02, 1 + ((t - drag.t0) / Math.max(1e-4, Math.abs(drag.t0))) * 0.6);
    factor = new Vector3(1, 1, 1);
    factor.setComponent(drag.axis, k);
  }
  apply(
    drag,
    object,
    (w, weight) => {
      const r = w.clone().sub(drag.pivot);
      r.set(
        r.x * (1 + (factor.x - 1) * weight),
        r.y * (1 + (factor.y - 1) * weight),
        r.z * (1 + (factor.z - 1) * weight),
      );
      return r.add(drag.pivot);
    },
    { scale: factor },
  );
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
  // 対称編集: 相手側をローカル X で鏡映した位置に置く
  for (const [from, to] of target.mirror) {
    const p = object.mesh.getPosition(from);
    object.mesh.setPosition(to, -p[0], p[1], p[2]);
  }
}
