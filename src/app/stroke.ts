/**
 * ストロークを回す（`33` の T3）。
 *
 * `src/core/sculpt.ts` が形を、`Multires.sculptAt` が段への取り込みを、
 * `History` が差分を持つ。ここはその 3 つと入力・描画をつなぐだけ。
 *
 * 1 コマの流れ:
 *   レイ → 当たり点 → 範囲の頂点 → 動かす → デルタを取り直す → 部分描画
 * どれもメッシュ全体を触らないので、重さは**筆の太さ**で決まる。
 */
import { applyStroke, strokeFootprint, type Mesh, type SceneObject, type StrokeInput } from "../core/index.js";
import type { Viewport } from "./render/viewport.js";
import type { Picker, ScreenPoint } from "./render/picking.js";
import type { History } from "./history.js";
import { levelsOf } from "./levels.js";
import { brushAt, type AppState } from "./state.js";
import { Vector3 } from "three";

/** ストロークの最中に持っておくもの。 */
interface Live {
  object: SceneObject;
  level: number;
  /** 前のコマの当たり点（オブジェクト空間）。間を埋めるのに使う。 */
  last: [number, number, number];
  /** 1 本のあいだに触った頂点。離すときに描画を作り直す範囲。 */
  touched: Set<number>;
  /** 何コマ当てたか。0 なら履歴に積まない。 */
  hits: number;
}

const scratch = new Vector3();

export class StrokeDriver {
  private live: Live | null = null;

  constructor(
    private state: AppState,
    private viewport: Viewport,
    private picker: Picker,
    private history: History,
  ) {}

  /** ストロークの最中か。カメラ操作と取り合わないための問い合わせ。 */
  get active(): boolean {
    return this.live !== null;
  }

  /** いま彫れる状態か（スカルプトモードで、段が 1 つ以上あって、選択がある）。 */
  canSculpt(): boolean {
    const o = this.state.selected;
    return this.state.mode === "sculpt" && !!o && o.activeLevel > 0 && !o.locked;
  }

  /**
   * 画面の点から、選んでいるオブジェクトの当たり点（オブジェクト空間）を出す。
   * 当たらなければ null。カーソルの円にも使う。
   */
  hitLocal(p: ScreenPoint): [number, number, number] | null {
    const o = this.state.selected;
    if (!o) return null;
    const hit = this.picker.pickSurface(p);
    if (!hit || hit.object !== o) return null;
    const view = this.viewport.viewOf(o);
    if (!view) return null;
    view.group.updateMatrixWorld();
    const local = scratch.copy(hit.point).applyMatrix4(view.group.matrixWorld.clone().invert());
    return [local.x, local.y, local.z];
  }

  /** 押した。当たらなければ何も始めない（カメラにも化けさせない）。 */
  begin(p: ScreenPoint, pressure: number): boolean {
    if (!this.canSculpt()) return false;
    const o = this.state.selected!;
    const at = this.hitLocal(p);
    if (!at) return false;
    this.live = { object: o, level: o.activeLevel, last: at, touched: new Set(), hits: 0 };
    this.history.beginSculpt(o, o.activeLevel);
    this.stamp(at, pressure, null);
    return true;
  }

  /**
   * 動かした。前の点から遠ければ**間を埋める**（速く動かすと飛び飛びになるため）。
   * 刻みは半径の 1/4。
   */
  move(p: ScreenPoint, pressure: number): void {
    const live = this.live;
    if (!live) return;
    const at = this.hitLocal(p);
    if (!at) return;
    const { radius } = brushAt(this.state.brush, pressure);
    const step = Math.max(radius * 0.25, 1e-4);
    const dx = at[0] - live.last[0];
    const dy = at[1] - live.last[1];
    const dz = at[2] - live.last[2];
    const dist = Math.hypot(dx, dy, dz);
    const steps = Math.min(32, Math.max(1, Math.ceil(dist / step)));
    for (let i = 1; i <= steps; i++) {
      const t = i / steps;
      const point: [number, number, number] = [
        live.last[0] + dx * t,
        live.last[1] + dy * t,
        live.last[2] + dz * t,
      ];
      // Move は「指の動き」そのものを使う。刻んだぶんだけ配る
      const delta: [number, number, number] = [dx / steps, dy / steps, dz / steps];
      this.stamp(point, pressure, delta);
    }
    live.last = at;
  }

  /** 離した。動かしていれば履歴に積み、法線を作り直す。 */
  end(): void {
    const live = this.live;
    this.live = null;
    if (!live) return;
    if (!live.hits) {
      this.history.abortPending();
      return;
    }
    // 動かしている間は法線が古い。ここで正しくする（`29` の B-T6 と同じ形）
    this.viewport.refreshPositions(live.object);
    this.history.commitPending(`${BRUSH_LABEL[this.state.brush.kind]}で彫った`);
  }

  /** 途中でやめる（指が増えた、モードが変わった）。 */
  abort(): void {
    if (!this.live) return;
    this.live = null;
    this.history.abortPending();
  }

  /** ブラシを 1 回当てる。対称が入っていれば鏡映側にも当てる（`33` の T4）。 */
  private stamp(point: [number, number, number], pressure: number, move: [number, number, number] | null): void {
    const live = this.live;
    if (!live) return;
    const b = this.state.brush;
    const { radius, strength } = brushAt(b, pressure);
    if (strength <= 0 || radius <= 0) return;

    const input: StrokeInput = {
      kind: b.kind,
      point,
      move: move ?? undefined,
      radius,
      strength,
      invert: b.invert,
    };
    let any = this.hit(live, input);
    if (b.symmetryX) {
      // ローカル X = 0 で鏡映。頂点の対応表は作らないので、
      // トポロジが左右対称でなくても効く
      const mirrored: StrokeInput = {
        ...input,
        point: [-point[0], point[1], point[2]],
        move: move ? [-move[0], move[1], move[2]] : undefined,
      };
      any = this.hit(live, mirrored) || any;
    }
    if (any) live.hits++;
  }

  /** 1 回ぶん。触った頂点を控えてから動かす（控えは「動かす前」の値）。 */
  private hit(live: Live, input: StrokeInput): boolean {
    const o = live.object;
    const view = this.viewport.viewOf(o);
    if (!view) return false;
    const mesh: Mesh = this.viewport.meshOf(o);
    const bvh = this.viewport.bvhOf(view);
    const fp = strokeFootprint(mesh, bvh, view.tri.tri, input.point, input.radius);
    if (!fp.verts.length) return false;

    const stack = levelsOf(o);
    const delta = stack.deltas[live.level - 1];
    // 動かす前のデルタを控える。同じ頂点を何度なぞっても最初の値が残る
    if (delta) this.history.trackSculpt(fp.verts, delta);

    const moved = applyStroke(mesh, fp, view.tri.tri, input);
    if (!moved.length) return false;
    stack.sculptAt(live.level, moved);
    for (const v of moved) live.touched.add(v);
    // 法線は据え置きで、動いた頂点だけ書き換える
    this.viewport.refreshMoved(o, moved);
    return true;
  }
}

const BRUSH_LABEL: Record<string, string> = {
  standard: "スタンダード",
  move: "ムーブ",
  smooth: "スムース",
};

/**
 * 彫れなかったときの言い訳（`33` の T3）。**なぜ効かないのかを必ず出す。**
 * 黙って何も起きないのが、この手の道具でいちばん困る。
 */
export function strokeHint(state: AppState): string {
  const o = state.selected;
  if (!o) return "オブジェクトを選んでください";
  if (o.locked) return "ロックされています（アウトライナで外せます）";
  if (o.activeLevel === 0) {
    return o.multires.length ? "段を上げてから彫ってください" : "段を足してから彫ってください（段のボタンを長押し）";
  }
  return "モデルの上をなぞってください";
}
