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
import {
  applyStroke,
  grabWeights,
  maskIsEmpty,
  paintMask,
  strokeFootprint,
  type BrushKind,
  type Footprint,
  type MaskInput,
  type Mesh,
  type MirrorMap,
  type SceneObject,
  type SculptLayer,
  type StrokeInput,
} from "../core/index.js";
import type { Viewport } from "./render/viewport.js";
import type { Picker, ScreenPoint } from "./render/picking.js";
import type { History } from "./history.js";
import { baseDelta, layerById, levelsOf, mirrorMapOf } from "./levels.js";
import { brushAt, type AppState } from "./state.js";
import { Matrix4, Plane, Raycaster, Vector3 } from "three";

/** ストロークの最中に持っておくもの。 */
interface Live {
  object: SceneObject;
  level: number;
  /**
   * このストロークの役割（`34` の T3）。**押した瞬間に決めて、離すまで変えない。**
   *
   * 途中で CTL を切っても、そのストロークはマスクのまま。役割が入れ替わると
   * 履歴の 1 段に彫りと塗りが混ざってしまう。
   */
  role: "sculpt" | "mask";
  /** このストロークで使うブラシ（Shift のときは強制的にスムース）。 */
  kind: BrushKind;
  /** 消す（CTL + ALT）。マスクのときだけ見る。 */
  erase: boolean;
  /**
   * ALT で反転（`39` の T1）。**押した瞬間に読む。** 前は `state.brush.invert` を
   * `refresh()` でしか書いていなかったので、ALT のボタンをタップしてから彫っても
   * 反転しなかった。
   */
  invert: boolean;
  /** ムーブの掴み（`39` の T5）。ムーブ以外は null。 */
  grab: Grab | null;
  /**
   * 彫った分を書き込む先のレイヤー（`42` の T3）。素のデルタへ書くなら null。
   * **押した瞬間に決める**（途中でレイヤーを切り替えても、この 1 本は同じ所へ）。
   */
  layer: SculptLayer | null;
  /**
   * X 対称の対応表（`41` の T1）。対称が切ってあるか、対にならないメッシュなら null。
   * **押した瞬間に決めて、離すまで変えない。**
   */
  mirror: MirrorMap | null;
  /**
   * どちら側を「押した側」とするか（+1 / −1）。押した点の x の符号。
   * この側の座標を相手へ写すので、左右が浮動小数の丸めまで一致する。
   */
  primarySign: 1 | -1;
  /**
   * 視線の向き（オブジェクト空間、カメラから面へ）。裏面マスクに使う。
   * **押したときに 1 回作る**（ストロークの間はカメラが動かない）。
   */
  viewDir: [number, number, number] | null;
  /** 前のコマの当たり点（オブジェクト空間）。間を埋めるのに使う。 */
  last: [number, number, number];
  /** 1 本のあいだに触った頂点。離すときに描画を作り直す範囲。 */
  touched: Set<number>;
  /** 何コマ当てたか。0 なら履歴に積まない。 */
  hits: number;
  /** まだ段と描画に反映していない頂点。1 イベントぶんためて一度に流す。 */
  pending: Set<number>;
  /**
   * 次の 1 打ちまでに、あとどれだけ進んだかの繰り越し（`33` の直し）。
   *
   * **打つ間隔はペンの進んだ距離で決める。** イベントが何回来たかで決めると、
   * ゆっくり動かすほど濃くなって、同じ線を引いても結果が変わってしまう。
   */
  carry: number;
  /** 法線を直したあと、何コマ飛ばすか（`40` の T3 の予算）。 */
  normalDebt: number;
  /** 法線を飛ばしたコマがあった。離すときに触った頂点の周りをまとめて直す。 */
  skippedNormals: boolean;
}

/**
 * ムーブの掴み（`39` の T5。ZBrush の Move）。
 *
 * - **押した瞬間の頂点と重みを最後まで掴む。** 毎回範囲を取り直すと、引いている
 *   途中で範囲が滑って別の頂点を掴み直す
 * - **画面に平行な平面の上で引く。** 表面の当たり点を追うと、指の下の面を滑って
 *   模型の外へ引き出せない（シルエットの外に出た瞬間に当たりが消えて止まる）
 * - **ALT なら法線に沿って出し入れ。** 押した点の範囲の平均法線 1 本。
 *   引いた向きを法線の画面上の向きに射影した長さだけ動かす
 */
interface Grab {
  fp: Footprint;
  weights: Float32Array;
  /** 対称の鏡映側。対称を切っていれば null。 */
  mirror: { fp: Footprint; weights: Float32Array } | null;
  /** 押した点（オブジェクト空間）。`applyStroke` の `point` に渡す（重みは使わない） */
  origin: [number, number, number];
  radius: number;
  strength: number;
  /** 画面に平行な平面（ワールド）。押した点を通る */
  plane: Plane;
  /** 前のコマの平面上の点（ワールド） */
  lastWorld: Vector3;
  /** ALT のとき: 法線（ワールド、正規化）。それ以外は null */
  normalWorld: Vector3 | null;
  /** ALT のとき: 法線の画面上の向き（px、正規化） */
  screenDir: [number, number];
  /** ALT のとき: 前のコマの画面の点 */
  lastScreen: ScreenPoint;
  /** 1px がワールドで何単位か（押した点の奥行きで） */
  worldPerPx: number;
}

const scratch = new Vector3();
const dirScratch = new Vector3();
const grabHit = new Vector3();
const grabTmp = new Vector3();
const grabInv = new Matrix4();
const grabRay = new Raycaster();

/**
 * 打つ間隔（筆の半径に対する割合）。ZBrush の Stroke → Spacing にあたる。
 * 狭いほど濃く、なめらかになる。
 */
const DAB_SPACING = 0.25;

/**
 * 引いている間に法線へ使ってよい 1 コマあたりの時間（`40` の T3）。
 * これを越えたぶんだけ次のコマを飛ばす（4ms かかれば 1 コマ、8ms なら 2 コマ）。
 */
const NORMAL_BUDGET_MS = 3;

/** 1 回の動きで打つ上限。カメラが飛んだときの暴発よけ。 */
const MAX_DABS = 24;

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
  begin(p: ScreenPoint, pressure: number, mods?: { ctrl?: boolean; shift?: boolean; alt?: boolean }): boolean {
    if (!this.canSculpt()) return false;
    const o = this.state.selected!;
    const at = this.hitLocal(p);
    if (!at) return false;

    // **役割は押した瞬間に決める**（`34` の T3）
    const ctrl = mods?.ctrl ?? this.state.modOn("ctrl");
    const shift = mods?.shift ?? this.state.modOn("shift");
    const alt = mods?.alt ?? this.state.modOn("alt");
    const role: "sculpt" | "mask" = ctrl ? "mask" : "sculpt";
    // Shift はこのストロークだけスムース。ブラシの種類そのものは変えない
    const kind: BrushKind = role === "mask" ? this.state.brush.kind : shift ? "smooth" : this.state.brush.kind;

    this.live = {
      object: o,
      level: o.activeLevel,
      role,
      kind,
      erase: role === "mask" && alt,
      invert: role === "sculpt" && alt,
      grab: null,
      layer: role === "sculpt" ? this.recordingLayer(o) : null,
      mirror: this.state.brush.symmetryX ? mirrorMapOf(o, o.activeLevel, this.viewport.meshOf(o)) : null,
      primarySign: at[0] < 0 ? -1 : 1,
      viewDir: role === "sculpt" && this.state.brush.backfaceMask ? this.viewDirOf(o) : null,
      last: at,
      touched: new Set(),
      pending: new Set(),
      hits: 0,
      carry: 0,
      normalDebt: 0,
      skippedNormals: false,
    };
    if (role === "mask") this.history.beginMask(o, o.activeLevel);
    else this.history.beginSculpt(o, o.activeLevel, this.live.layer?.id);
    if (role === "sculpt" && kind === "move") {
      // 押した瞬間の頂点を掴む（`39` の T5）。動かすのは `move()` から
      this.live.grab = this.beginGrab(this.live, p, at, pressure, alt);
      return true;
    }
    this.stamp(at, pressure, null);
    this.flush(this.live);
    return true;
  }

  /** ムーブの掴みを作る（`39` の T5）。 */
  private beginGrab(live: Live, p: ScreenPoint, at: [number, number, number], pressure: number, alt: boolean): Grab | null {
    const o = live.object;
    const view = this.viewport.viewOf(o);
    if (!view) return null;
    const mesh = this.viewport.meshOf(o);
    const bvh = this.viewport.bvhOf(view);
    const { radius, strength } = brushAt(this.state.brush, pressure);
    const base: StrokeInput = {
      kind: "move",
      point: at,
      radius,
      strength,
      invert: false,
      mask: this.maskFor(live),
      viewDir: live.viewDir ?? undefined,
    };
    const fp = strokeFootprint(mesh, bvh, view.tri, at, radius);
    const g = grabWeights(mesh, fp, view.tri, base);
    let mirror: Grab["mirror"] = null;
    if (this.state.brush.symmetryX) {
      const mp: [number, number, number] = [-at[0], at[1], at[2]];
      const mfp = strokeFootprint(mesh, bvh, view.tri, mp, radius);
      // 中心線は避けない（`41` の T1）。左右は `flush` の写しで厳密に合わせる
      mirror = { fp: mfp, weights: grabWeights(mesh, mfp, view.tri, { ...base, point: mp }).weights };
    }

    view.group.updateMatrixWorld();
    const camera = this.viewport.camera;
    camera.updateMatrixWorld();
    const world = grabHit.set(at[0], at[1], at[2]).applyMatrix4(view.group.matrixWorld).clone();
    // カメラの前方（-Z）を法線にした平面。透視でも平行投影でも同じ式でよい
    const fwd = dirScratch.setFromMatrixColumn(camera.matrixWorld, 2).negate();
    const plane = new Plane().setFromNormalAndCoplanarPoint(fwd, world);
    // 1px がワールドでどれだけか（押した点の奥行き）。ALT の量に使う
    const a = this.planeHit(p, plane);
    const b = this.planeHit({ x: p.x + 1, y: p.y }, plane);
    const worldPerPx = a && b ? a.distanceTo(b) : 0;

    let normalWorld: Vector3 | null = null;
    let screenDir: [number, number] = [0, -1];
    if (alt && g.normal) {
      normalWorld = new Vector3(g.normal[0], g.normal[1], g.normal[2]).transformDirection(view.group.matrixWorld);
      // 法線の画面上の向き。画面にほぼ垂直なら「上 = 出す」
      const s0 = this.picker.project(view, at[0], at[1], at[2]);
      const tip = grabTmp.copy(world).addScaledVector(normalWorld, worldPerPx * 100);
      const local = tip.applyMatrix4(grabInv.copy(view.group.matrixWorld).invert());
      const s1 = this.picker.project(view, local.x, local.y, local.z);
      const dx = s1.x - s0.x;
      const dy = s1.y - s0.y;
      const len = Math.hypot(dx, dy);
      if (len >= 20) screenDir = [dx / len, dy / len];
    }
    return {
      fp,
      weights: g.weights,
      mirror,
      origin: at,
      radius,
      strength,
      plane,
      lastWorld: world,
      normalWorld,
      screenDir,
      lastScreen: p,
      worldPerPx,
    };
  }

  /** 画面の点から、その平面との交点（ワールド）。 */
  private planeHit(p: ScreenPoint, plane: Plane): Vector3 | null {
    grabRay.setFromCamera(this.picker.ndc(p), this.viewport.camera);
    const hit = new Vector3();
    return grabRay.ray.intersectPlane(plane, hit) ? hit : null;
  }

  /** ムーブの 1 コマ（`39` の T5）。指の差分を掴んだ頂点に渡す。 */
  private moveGrab(live: Live, grab: Grab, p: ScreenPoint): void {
    const view = this.viewport.viewOf(live.object);
    if (!view) return;
    let delta: Vector3;
    if (grab.normalWorld) {
      // 法線に沿う。引いた分を法線の画面上の向きに射影した長さ
      const px = (p.x - grab.lastScreen.x) * grab.screenDir[0] + (p.y - grab.lastScreen.y) * grab.screenDir[1];
      grab.lastScreen = p;
      if (px === 0) return;
      delta = grabTmp.copy(grab.normalWorld).multiplyScalar(px * grab.worldPerPx);
    } else {
      const at = this.planeHit(p, grab.plane);
      if (!at) return;
      delta = grabTmp.subVectors(at, grab.lastWorld);
      grab.lastWorld.copy(at);
      if (delta.lengthSq() === 0) return;
    }
    // ワールドの差分をオブジェクト空間へ（向きだけでなく大きさも直す）
    view.group.updateMatrixWorld();
    grabInv.copy(view.group.matrixWorld).invert();
    const o0 = scratch.copy(grab.lastWorld).applyMatrix4(grabInv);
    const o1 = grabHit.copy(grab.lastWorld).add(delta).applyMatrix4(grabInv);
    const move: [number, number, number] = [o1.x - o0.x, o1.y - o0.y, o1.z - o0.z];
    const input: StrokeInput = {
      kind: "move",
      point: grab.origin,
      move,
      radius: grab.radius,
      strength: grab.strength,
      invert: false,
      grab: grab.weights,
    };
    let any = this.hit(live, input, grab.fp);
    if (grab.mirror) {
      any =
        this.hit(
          live,
          { ...input, point: [-grab.origin[0], grab.origin[1], grab.origin[2]], move: [-move[0], move[1], move[2]], grab: grab.mirror.weights },
          grab.mirror.fp,
        ) || any;
    }
    if (any) live.hits++;
    this.flush(live);
  }

  /**
   * いま記録しているレイヤー（`42` の T3）。
   *
   * 選ばれていても**段が違う**か**重みが 0**なら素のデルタへ書く
   * （重み 0 のレイヤーへ書くと、書いた分が見た目に出ないうえ 0 で割ることになる）。
   */
  private recordingLayer(o: SceneObject): SculptLayer | null {
    const layer = layerById(o, this.state.activeLayer);
    if (!layer || layer.level !== o.activeLevel || layer.weight === 0 || !layer.visible) return null;
    return layer;
  }

  /**
   * 視線の向きをオブジェクト空間で出す（裏面マスク用。`34` の T3）。
   *
   * **向きだけ**なので平行移動は掛けない。`transformDirection` が正規化する。
   * 平行投影ではカメラの向きがそのまま視線、透視でもストロークの範囲では
   * ほぼ変わらないので、押したときに 1 回作れば足りる。
   */
  private viewDirOf(o: SceneObject): [number, number, number] | null {
    const view = this.viewport.viewOf(o);
    if (!view) return null;
    view.group.updateMatrixWorld();
    const camera = this.viewport.camera;
    camera.updateMatrixWorld();
    // カメラの前方は -Z（three の決まり）
    const d = dirScratch.setFromMatrixColumn(camera.matrixWorld, 2).negate();
    d.transformDirection(view.group.matrixWorld.clone().invert());
    return [d.x, d.y, d.z];
  }

  /**
   * 動かした。**進んだ距離で打つ**（ZBrush と同じ）。
   *
   * 前は「イベントが来るたびに最低 1 回」当てていた。すると同じ線でも、
   * ゆっくり動かす（イベントが多い）ほど濃くなり、速く動かすと薄くなる。
   * 手の速さで結果が変わるので「強さがちょうどよいか分からない」ことになる。
   *
   * いまは半径の 1/4 進むごとに 1 回。イベントが何回来ても、同じ道を引けば
   * 同じ結果になる。
   *
   * ムーブだけは別（積み上げではなく掴んで動かすものなので、指の動きを
   * そのまま渡す）。
   */
  move(p: ScreenPoint, pressure: number): void {
    const live = this.live;
    if (!live) return;
    // ムーブだけ別扱い（`33` の T3、`39` の T5）。**`live.kind` で見る**。Shift の一時
    // スムース中はムーブではないし、マスクを塗るときも距離で刻む。
    // 表面の当たりは要らない（画面平面で引くので、模型の外に出ても続く）
    if (live.role === "sculpt" && live.kind === "move") {
      if (live.grab) this.moveGrab(live, live.grab, p);
      return;
    }
    const at = this.hitLocal(p);
    if (!at) return;
    const dx = at[0] - live.last[0];
    const dy = at[1] - live.last[1];
    const dz = at[2] - live.last[2];
    const dist = Math.hypot(dx, dy, dz);
    if (dist <= 0) return;

    const { radius } = brushAt(this.state.brush, pressure);
    const spacing = Math.max(radius * DAB_SPACING, 1e-5);
    const total = live.carry + dist;
    // 上限を置く。カメラが飛んだときなどに何百回も当てないため
    const dabs = Math.min(MAX_DABS, Math.floor(total / spacing));
    for (let k = 1; k <= dabs; k++) {
      const along = k * spacing - live.carry;
      const t = along / dist;
      this.stamp([live.last[0] + dx * t, live.last[1] + dy * t, live.last[2] + dz * t], pressure, null);
    }
    live.carry = dabs >= MAX_DABS ? 0 : total - dabs * spacing;
    this.flush(live);
    live.last = at;
  }

  /** 離した。動かしていれば履歴に積み、法線を作り直す。 */
  end(): void {
    const live = this.live;
    this.live = null;
    if (!live) return;
    // ためたぶんを取りこぼさない（ふつうは `move` で流れているが、
    // 押してすぐ離したときはここが最後の機会）
    this.flush(live);
    if (!live.hits) {
      this.history.abortPending();
      return;
    }
    if (live.role === "mask") {
      // 全部 0 に消したなら持たない（`34` の 1 章）
      const o = live.object;
      if (o.mask && maskIsEmpty(o.mask.values)) {
        o.mask = null;
        this.viewport.refreshMaskAll(o);
      }
      this.history.commitPending(live.erase ? "マスクを消した" : "マスクを描いた");
      return;
    }
    // 法線は `flush` のたびに直している（`40` の T3）。ここで丸ごと作り直しは
    // **しない**（前は `refreshPositions` で 25 万四角形 764ms。離すたびに止まっていた）。
    // 念のため触った頂点の周りをもう一度だけ通す（コマ飛ばしをしたときの取りこぼし）
    if (live.skippedNormals) this.viewport.refreshNormals(live.object, live.touched);
    this.history.commitPending(`${BRUSH_LABEL[live.kind]}で彫った`);
  }

  /** 途中でやめる（指が増えた、モードが変わった）。 */
  abort(): void {
    const live = this.live;
    if (!live) return;
    this.live = null;
    // やめても座標は戻さない（前からそう）。**段のデルタだけ置いていくと
    // 座標と食い違う**ので、ここでも流してからやめる
    this.flush(live);
    this.history.abortPending();
  }

  /**
   * ブラシを 1 回当てる。対称が入っていれば鏡映側にも当てる（`33` の T4）。
   * マスクを塗るときも同じ道を通る（`34` の T3）。
   */
  private stamp(point: [number, number, number], pressure: number, move: [number, number, number] | null): void {
    const live = this.live;
    if (!live) return;
    const b = this.state.brush;
    const { radius, strength } = brushAt(b, pressure);
    if (strength <= 0 || radius <= 0) return;

    if (live.role === "mask") {
      const input: MaskInput = { point, radius, strength, erase: live.erase };
      let any = this.paint(live, input);
      if (b.symmetryX) {
        // **中心線を避けない**（`41` の T1）。2 つの筆はどちらも中心線に届くので、
        // そこだけ 1 回にすると濃さが半分になって筋が出る
        any = this.paint(live, { ...input, point: [-point[0], point[1], point[2]] }) || any;
      }
      if (any) live.hits++;
      return;
    }

    const input: StrokeInput = {
      kind: live.kind,
      point,
      move: move ?? undefined,
      radius,
      strength,
      invert: live.invert,
      mask: this.maskFor(live),
      viewDir: live.viewDir ?? undefined,
    };
    let any = this.hit(live, input);
    if (b.symmetryX) {
      // ローカル X = 0 で鏡映。**中心線を避けない**（`41` の T1）。
      // 中心線の隣の頂点は 2 つの筆の両方から減衰ぶんを受けるのに、中心線だけ
      // 1 回にすると、そこだけ半分になって溝（継ぎ目）になっていた。
      //
      // 左右をぴったり合わせるのはこの 2 度打ちではなく、`flush` の写し。
      // 2 度打ちは**対応表に載らない頂点**（左右非対称なトポロジ）のために残す
      const mirrored: StrokeInput = {
        ...input,
        point: [-point[0], point[1], point[2]],
        move: move ? [-move[0], move[1], move[2]] : undefined,
      };
      any = this.hit(live, mirrored) || any;
    }
    if (any) live.hits++;
  }

  /**
   * 彫るときに見るマスク。**段が合っているときだけ**渡す。
   *
   * 段が違うマスクを渡すと頂点の番号がずれて、見当違いの所が固くなる。
   * `goLevel` が移しているので、ふつうは合っている（`34` の T2）。
   */
  private maskFor(live: Live): Float32Array | undefined {
    const m = live.object.mask;
    return m && m.level === live.level ? m.values : undefined;
  }

  /**
   * マスクを 1 打ちぶん塗る（`34` の T3）。
   *
   * 彫るほうと同じで、**値を書き換えるだけ**。色の書き換えは `flush` に回す。
   */
  private paint(live: Live, input: MaskInput): boolean {
    const o = live.object;
    const view = this.viewport.viewOf(o);
    if (!view) return false;
    const mesh: Mesh = this.viewport.meshOf(o);
    const bvh = this.viewport.bvhOf(view);
    const fp = strokeFootprint(mesh, bvh, view.tri, input.point, input.radius);
    if (!fp.verts.length) return false;

    // 無ければここで作る。**段はストロークを始めた段**
    if (!o.mask || o.mask.level !== live.level || o.mask.values.length !== mesh.vertexCount) {
      o.mask = { level: live.level, values: new Float32Array(mesh.vertexCount) };
    }
    // 塗る前の値を控える。同じ所を何度なぞっても最初の値が残る
    this.history.trackMask(fp.verts, o.mask.values);

    const changed = paintMask(mesh, fp, o.mask.values, input);
    if (!changed.length) return false;
    for (const v of changed) {
      live.touched.add(v);
      live.pending.add(v);
    }
    return true;
  }

  /**
   * 1 打ちぶん。触った頂点を控えてから動かす（控えは「動かす前」の値）。
   *
   * **座標を書き換えるだけ**にして、段への取り込みと描画は `flush` に回す。
   * 1 回のイベントで何打ちも当たるので（半径の 1/4 ごと）、打つたびに
   * デルタの取り直しと頂点バッファの書き換えをしていると、同じ頂点を
   * 何度も往復することになる。
   */
  private hit(live: Live, input: StrokeInput, grabbed?: Footprint): boolean {
    const o = live.object;
    const view = this.viewport.viewOf(o);
    if (!view) return false;
    const mesh: Mesh = this.viewport.meshOf(o);
    const bvh = this.viewport.bvhOf(view);
    // 掴んでいるなら範囲は押した瞬間のもの（`39` の T5）
    const fp = grabbed ?? strokeFootprint(mesh, bvh, view.tri, input.point, input.radius);
    if (!fp.verts.length) return false;

    // 動かす前のデルタを控える。同じ頂点を何度なぞっても最初の値が残る。
    // **書き込む先**（レイヤーか素のデルタ）を控えること。合成のほうを控えると、
    // 戻したときに `base + Σ レイヤー` と食い違う（`42` の T3）
    const delta = live.layer ? live.layer.delta : baseDelta(o, live.level);
    if (delta) this.history.trackSculpt(fp.verts, delta);

    const moved = applyStroke(mesh, fp, view.tri, input);
    if (!moved.length) return false;
    for (const v of moved) {
      live.touched.add(v);
      live.pending.add(v);
    }
    return true;
  }

  /**
   * 対称のとき、**押した側の座標を相手へ写す**（`41` の T1）。
   *
   * 鏡映した点でもう 1 回当てるだけでは、2 回目が 1 回目の動かしたあとの面から
   * 法線と平面を取るので、中心線の近くで左右がずれる。ここで写せば、差は
   * 浮動小数の丸めだけになる。
   *
   * 相手の居ない頂点（左右非対称なトポロジ）は素通り。2 度打ちのぶんだけ動く。
   */
  private mirrorPending(live: Live): void {
    const map = live.mirror;
    if (!map) return;
    const o = live.object;
    const mesh: Mesh = this.viewport.meshOf(o);
    const { mirror, side } = map;
    if (mirror.length !== mesh.vertexCount) return;

    // 写す先。**先に集めてから書く**（`pending` を回しながら足すと、足した分を
    // もう一度見に行くことになる）
    const targets: number[] = [];
    const sources: number[] = [];
    for (const v of live.pending) {
      const m = mirror[v];
      if (m < 0 || m === v) continue;
      if (side[v] !== live.primarySign) continue;
      sources.push(v);
      targets.push(m);
    }

    if (live.role === "mask") {
      const values = live.object.mask?.values;
      if (!values || values.length !== mesh.vertexCount) return;
      // 書き換える前の値を控える（2 度打ちの範囲から外れていることがある）
      this.history.trackMask(targets, values);
      for (let i = 0; i < targets.length; i++) values[targets[i]] = values[sources[i]];
      for (const m of targets) {
        live.touched.add(m);
        live.pending.add(m);
      }
      return;
    }

    const delta = levelsOf(o).deltas[live.level - 1];
    if (delta) this.history.trackSculpt(targets, delta);
    const p = mesh.positions;
    for (let i = 0; i < targets.length; i++) {
      const v = sources[i];
      const m = targets[i];
      p[m * 3] = -p[v * 3];
      p[m * 3 + 1] = p[v * 3 + 1];
      p[m * 3 + 2] = p[v * 3 + 2];
      live.touched.add(m);
      live.pending.add(m);
    }
    // 中心線の頂点は、2 つの筆から同じだけ受けているので x は 0 のはず。
    // 丸めで浮くぶんをここで落とす（ここが浮くと、次の段でその筋だけ非対称になる）
    for (const v of live.pending) {
      if (mirror[v] === v) p[v * 3] = 0;
    }
  }

  /**
   * ここまでに動かした頂点を、段と描画に 1 度だけ反映する。
   *
   * 打つたびにやらず、**1 イベントにまとめる**。太い筆ほど効く。
   * CI・25 万四角形・既定の筆（半径 0.23）で 1 打ち 16.3ms のうち、
   * ここが 10.5ms（デルタ 0.9 + 描画と木 9.6）。残る 5.9ms が打つたびの分。
   * 1 イベントで 3 打ち当たれば 49ms → 28ms になる。
   *
   * **代わりに、同じイベントの中では木（BVH）の箱が少し古い。**
   * `refreshMoved` が箱を取り直すのを後ろに回すため。1 打ちで動く量は
   * 半径の 1/16 なので葉の箱に対して十分小さく、拾い落としは出ない。
   */
  private flush(live: Live): void {
    if (!live.pending.size) return;
    // 対称は「押した側を相手へ写す」で厳密にする（`41` の T1）。**段へ入れる前に。**
    this.mirrorPending(live);
    const verts = Uint32Array.from(live.pending);
    live.pending.clear();
    if (live.role === "mask") {
      // 形は動いていないので、色だけ書き換える
      this.viewport.refreshMask(live.object, verts);
      return;
    }
    // レイヤーがあれば、`sculptAt` が書くのは**合成のほう**。彫った分だけを
    // 書き込む先へ切り分ける（`42` の T3）
    const stack = levelsOf(live.object);
    const combined = stack.deltas[live.level - 1];
    const target = live.layer ? live.layer.delta : baseDelta(live.object, live.level);
    const split = !!combined && !!target && combined !== target;
    let prev: Float32Array | null = null;
    if (split && combined) {
      prev = new Float32Array(verts.length * 3);
      for (let i = 0; i < verts.length; i++) {
        const v = verts[i];
        prev[i * 3] = combined[v * 3];
        prev[i * 3 + 1] = combined[v * 3 + 1];
        prev[i * 3 + 2] = combined[v * 3 + 2];
      }
    }
    stack.sculptAt(live.level, verts);
    if (split && combined && target && prev) {
      const w = live.layer ? live.layer.weight : 1;
      for (let i = 0; i < verts.length; i++) {
        const v = verts[i];
        if (v * 3 + 2 >= target.length) continue;
        target[v * 3] += (combined[v * 3] - prev[i * 3]) / w;
        target[v * 3 + 1] += (combined[v * 3 + 1] - prev[i * 3 + 1]) / w;
        target[v * 3 + 2] += (combined[v * 3 + 2] - prev[i * 3 + 2]) / w;
      }
    }
    // 動いた頂点だけ書き換える
    this.viewport.refreshMoved(live.object, verts);
    // 法線も動いた頂点の周りだけ直す（`40` の T3）。陰影が引いている間に付いてくる。
    //
    // **予算つき。** 太い筆では 1 コマで 1 万頂点を越え、法線だけで彫るのと同じだけ
    // かかる（CI・25 万で 17ms）。かかった時間ぶんだけ次のコマを飛ばして、
    // 平均で `NORMAL_BUDGET_MS` に収める。飛ばした分は離すときにまとめて直す
    if (live.normalDebt > 0) {
      live.normalDebt--;
      live.skippedNormals = true;
      return;
    }
    const t0 = performance.now();
    this.viewport.refreshNormals(live.object, verts);
    const took = performance.now() - t0;
    live.normalDebt = Math.min(8, Math.floor(took / NORMAL_BUDGET_MS));
  }
}

/**
 * 履歴に出すブラシの名前（`38` の T3 で 11 種類に）。
 *
 * `Record<BrushKind, string>` にしておくと、種類を足したときに
 * 書き忘れをコンパイラが見つける（`35` の HUD で `undefined` が出た教訓）。
 */
const BRUSH_LABEL: Record<BrushKind, string> = {
  standard: "スタンダード",
  move: "ムーブ",
  smooth: "スムース",
  clay: "クレイ",
  claybuildup: "クレイビルドアップ",
  inflate: "インフレート",
  pinch: "ピンチ",
  flatten: "フラット",
  trim: "トリム",
  damien: "ダミアン",
  polish: "ポリッシュ",
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
    // マスクも段が要る。レベル 0 はモデリングと同じ道なので、v1.5 では描かせない
    return o.multires.length ? "段を上げてから彫ってください" : "段を足してから彫ってください（段のボタンを長押し）";
  }
  // いま押したらどうなるかを言う（`34` の T3）
  if (state.modOn("ctrl")) {
    return state.modOn("alt") ? "マスクを消しています（ALT を切ると描く）" : "マスクを描いています（ALT で消す）";
  }
  if (state.modOn("shift")) return "スムース（SHF のあいだだけ）";
  return "モデルの上をなぞってください";
}
