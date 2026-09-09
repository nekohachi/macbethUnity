/**
 * ポインタの割り振り。
 *
 * 指の本数で役割が分かれる:
 *   1 本 … ツール（メッシュの上）/ タンブル（外）
 *   2 本 … カメラ（パン / ズーム）
 *   3 本 … 選択そのものの操作。つまむ = 拡大縮小、スワイプ = 軸に沿った平行移動
 *          （どちらか一方に決まり、途中で入れ替わらない。回転はしない）
 *
 * しきい値は実機（iPad mini + Apple Pencil、Wacom MovinkPad 14）で
 * 確かめた値なので、変えるときは必ず実機で確かめ直すこと。
 *   - 指を置いた直後 5px はタンブルしない（置いたときのブレ）
 *   - 2 本指は、重心の移動と広がりの変化の合計が 10px を越えるまで何もしない
 *   - 3 本指は、つまみ量と重心の移動を同じ 10px の物差しで見て、大きい方に決める
 *   - 複数指タップ = 120ms 以内に全部着地、どれも 12px 以内、300ms 以内に全部離れる
 *   - 長押しは 400ms。指 1 本ならマーキングメニュー、2 本ならカメラ / 編集、**3 本ならカメラ**
 * カメラ操作は「動いた時点」で確定し、タップは「動いていないこと」が条件なので
 * 両者は排他になる。
 */
import type { Vector3 } from "three";
import type { ScreenPoint } from "../render/picking.js";

export interface GestureHandlers {
  /** ツールの押下・移動・解放。ローカル座標で渡す。 */
  toolDown(p: ScreenPoint, e: PointerEvent): void;
  toolMove(p: ScreenPoint, e: PointerEvent): void;
  toolUp(p: ScreenPoint, e: PointerEvent, moved: boolean): void;
  /** ボタンを押していないときの移動。マルチカットの予測線に使う。 */
  hover(p: ScreenPoint, e: PointerEvent): void;
  hoverLeave(): void;
  /** マーキングメニューを開く。edit なら Shift 側（編集メニュー）。 */
  openMarkingMenu(clientX: number, clientY: number, edit: boolean): void;
  /**
   * 指 2 本の長押しで開くサークルメニュー。
   * 何も選んでいなければカメラ、選んでいれば編集（アプリ側で決める）。
   */
  openTwoFingerMenu(clientX: number, clientY: number): void;
  /** 指 3 本の長押しで開くサークルメニュー。いつでもカメラ。 */
  openCameraMenu(clientX: number, clientY: number): void;
  undo(): void;
  redo(): void;
  /** 進行中の操作（矩形選択、ドラッグ、予測線）を確定させずに片付ける。 */
  abort(): void;

  /**
   * 3 本指の変形を始める。選んでいるものが無ければ false を返す。
   * false のときは何もしない（カメラには化けさせない）。
   */
  transformBegin(): boolean;
  /**
   * 3 本指の変形。値は開始時点からの累積で渡す（差分の積み上げではない）。
   * つまむかスワイプかは始まった時点で決まり、途中で入れ替わらない。
   */
  transformUpdate(t: GestureDelta): void;
  transformEnd(): void;

  /**
   * 指を置いた場所がツールの対象か。true = ツール、false = タンブル（Nomad 方式）。
   * マニピュレータのハンドルも対象に含める（指で直接つかめるように）。
   */
  isOnMesh(p: ScreenPoint, e: PointerEvent): boolean;
  /** F を押しながらのピンチで中心を固定する点。 */
  zoomPivot(): Vector3 | null;

  /** 矩形選択の開始。更新と確定はツール側（toolMove / toolUp）が担う。 */
  marqueeStart(p: ScreenPoint): void;

  tumble(dx: number, dy: number): void;
  pan(dx: number, dy: number): void;
  dolly(factor: number): void;
  dollyAbout(pivot: Vector3, factor: number): void;

  shiftOn(e: PointerEvent): boolean;
  altOn(e: PointerEvent): boolean;
}

/**
 * 3 本指のジェスチャが何をしているか。始まった時点で決まって、そのまま最後まで変わらない。
 * `pixels` は開始時点からの画面上の移動量（符号つき）。
 */
export type GestureDelta =
  | { kind: "scale"; scale: number; axis: "vertical" | "horizontal" }
  | { kind: "swipe"; axis: "vertical" | "horizontal"; pixels: number }
  /**
   * 手のひねり（`26` の T1）。**画面の時計まわりが正**（ラジアン、刻む前の生の値）。
   * `axis` は指の並び（ALT + ひねりが使う）。
   */
  | {
      kind: "rotate";
      radians: number;
      axis: "vertical" | "horizontal";
      /** 指の重心（画面座標）。角度の札をここに出す。 */
      at: { x: number; y: number };
    };

interface PointerRecord {
  x: number;
  y: number;
  x0: number;
  y0: number;
  type: string;
}

type GestureMode = "idle" | "tumble" | "pan" | "dolly" | "twofinger" | "threefinger" | "tool" | "marking";

/**
 * 指の群れの重心・広がり・角度。2 本でも 3 本でも同じ式で出す。
 * 2 本のときの広がりは指間距離の半分なので、倍率で使うぶんには同じ意味になる。
 */
interface Cluster {
  cx: number;
  cy: number;
  /** 重心からの平均距離。 */
  spread: number;
  /** ポインタ ID → 重心まわりの角度（ラジアン）。回転量はこれとの差の平均で出す。 */
  angles: Map<number, number>;
  /**
   * つまんでいる向き（`25` の T2）。いちばん離れた 2 本を結ぶ線の傾きで決める。
   * 45° で縦横に倒す。ALT + つまみの軸スケールが使う。
   */
  axis: "vertical" | "horizontal";
}

function clusterOf(pointers: Map<number, PointerRecord>): Cluster {
  let cx = 0;
  let cy = 0;
  for (const p of pointers.values()) {
    cx += p.x;
    cy += p.y;
  }
  const n = pointers.size || 1;
  cx /= n;
  cy /= n;
  let spread = 0;
  const angles = new Map<number, number>();
  for (const [id, p] of pointers) {
    spread += Math.hypot(p.x - cx, p.y - cy);
    angles.set(id, Math.atan2(p.y - cy, p.x - cx));
  }
  // つまんでいる向き。いちばん離れた 2 本の並びで決める（`25` の T2）
  let axis: "vertical" | "horizontal" = "horizontal";
  const list = [...pointers.values()];
  let far = -1;
  for (let i = 0; i < list.length; i++) {
    for (let j = i + 1; j < list.length; j++) {
      const dx = list[j].x - list[i].x;
      const dy = list[j].y - list[i].y;
      const d = dx * dx + dy * dy;
      if (d > far) {
        far = d;
        axis = Math.abs(dy) >= Math.abs(dx) ? "vertical" : "horizontal";
      }
    }
  }
  return { cx, cy, spread: spread / n, angles, axis };
}

/**
 * 3 本指のてこ（`26` の T1）。**親指と、残り 2 本の中点**を結ぶ 1 本。
 *
 * 指ごとの角度差の平均（`rotationSince`）では測らない。親指と残り 2 本のあいだに
 * 空間があるので重心は 2 本のほうへ寄り、その 2 本は重心に近すぎて角度が暴れる。
 * 1 本のてことして見ると、手首のひねりがそのまま角度になる。
 */
interface Lever {
  /** てこの角度。画面は y が下向きなので、増える向き = **画面の時計まわり**。 */
  angle: number;
  /** 親指 → 対の中点の距離。 */
  length: number;
  /** 対の 2 本のあいだの距離。 */
  span: number;
}

/**
 * 3 本のうち「親指」。他の指からいちばん離れているものを選ぶ
 * （各指について「他までの最短距離」を出し、それが最大のもの）。
 * 開始時に 1 回決めて、以後は変えない。
 */
function thumbOf(pointers: Map<number, PointerRecord>): number {
  let best = -1;
  let bestGap = -1;
  for (const [id, p] of pointers) {
    let near = Infinity;
    for (const [other, q] of pointers) {
      if (other === id) continue;
      near = Math.min(near, Math.hypot(q.x - p.x, q.y - p.y));
    }
    if (near > bestGap) {
      bestGap = near;
      best = id;
    }
  }
  return best;
}

function leverOf(pointers: Map<number, PointerRecord>, thumb: number): Lever | null {
  const t = pointers.get(thumb);
  if (!t) return null;
  const rest = [...pointers].filter(([id]) => id !== thumb).map(([, p]) => p);
  if (rest.length !== 2) return null;
  const mx = (rest[0].x + rest[1].x) / 2;
  const my = (rest[0].y + rest[1].y) / 2;
  return {
    angle: Math.atan2(my - t.y, mx - t.x),
    length: Math.hypot(mx - t.x, my - t.y),
    span: Math.hypot(rest[1].x - rest[0].x, rest[1].y - rest[0].y),
  };
}

/** 角度の差を [-π, π] に畳む。 */
function angleDelta(from: number, to: number): number {
  let d = to - from;
  while (d > Math.PI) d -= Math.PI * 2;
  while (d < -Math.PI) d += Math.PI * 2;
  return d;
}

/** 開始時点からの回転量。指ごとの角度差を [-π, π] に畳んで平均する。 */
function rotationSince(basis: Cluster, now: Cluster): number {
  let sum = 0;
  let count = 0;
  for (const [id, a] of now.angles) {
    const b = basis.angles.get(id);
    if (b === undefined) continue;
    let d = a - b;
    while (d > Math.PI) d -= Math.PI * 2;
    while (d < -Math.PI) d += Math.PI * 2;
    sum += d;
    count++;
  }
  return count ? sum / count : 0;
}

/**
 * 広がりの変化。つまむ量そのもの。
 *
 * 2 倍して数えるのは、2 本指のときに「指の間の距離の変化」と同じ物差しになり、
 * 実機で確かめた 10px という値がそのまま通じるため。
 * 3 本指はスケールしかしないので、デッドゾーンにはこれだけを使う。
 */
function spreadMotion(from: Cluster, to: Cluster): number {
  return Math.abs(to.spread - from.spread) * 2;
}

/**
 * デッドゾーンの積算。重心の移動 + 広がりの変化 + 回転を弧長に直したもの。
 * 2 本指のカメラ操作（パンもズームも起こりうる）で使う。
 */
function clusterMotion(from: Cluster, to: Cluster): number {
  const turn = Math.abs(rotationSince(from, to)) * to.spread;
  return Math.hypot(to.cx - from.cx, to.cy - from.cy) + spreadMotion(from, to) + turn;
}

interface Gesture {
  mode: GestureMode;
  live?: boolean;
  acc?: number;
  /** 3 本指の開始基準と、直前のフレーム（2 本指は last だけ使う）。 */
  basis?: Cluster;
  last?: Cluster;
  /** そのフレームで動いた指。全員そろってから測るために使う（3 本指）。 */
  fresh?: Set<number>;
  /** 3 本指で確定した中身。一度決まったら変えない（誤操作防止）。 */
  delta?:
    | { kind: "scale"; axis: "vertical" | "horizontal" }
    | { kind: "swipe"; axis: "vertical" | "horizontal" }
    | { kind: "rotate"; axis: "vertical" | "horizontal" };
  /** 親指のポインタ ID と、開始時のてこ（`26` の T1）。 */
  thumb?: number;
  basisLever?: Lever | null;
  zoomOnly?: boolean;
  pivot?: Vector3;
  moved?: boolean;
  sx?: number;
  sy?: number;
}

const TUMBLE_DEADZONE = 5;
/**
 * ひねりと認める最小の角度（度。`26` の T1）。刻み 1 つ分。
 * これ未満なら、曲がっただけのスワイプとして扱う。
 */
const TWIST_MIN_DEG = 5;
/**
 * 親指と残り 2 本のあいだに要る「空間」（対の間隔の何倍か）。
 * ユーザーの言う「親指と 2 本のあいだに空間が生まれる」を判定にしたもの。
 * 3 本が均等に開いているとき（パンのつもりで広げた手）はひねりに入らない。
 * **実機で確かめる値**（中指 + 薬指はくっつくので、実際は 2 以上になるはず。
 * きつすぎるなら 1.2 まで下げてよい）。
 */
const TWIST_GAP = 1.4;
/** 複数指のカメラ操作 / 変形が確定する動き（px）。2 本指でも 3 本指でも同じ。 */
const CLUSTER_DEADZONE = 10;
/** タップと見なせる動きの上限（px）。これを越えたら長押しもタップも消える。 */
export const TAP_MOVE = 12;
const TAP_LAND_WINDOW = 120;
/** タップと見なせる長さ（ms）。 */
export const TAP_DURATION = 300;
const DOUBLE_TAP_WINDOW = 400;
const HOLD_DELAY = 400;
/** ツールのドラッグが「動いた」と見なす量（px）。 */
export const TOOL_MOVE = 3;

export class GestureRouter {
  private pointers = new Map<number, PointerRecord>();
  private gesture: Gesture | null = null;
  private holdTimer: ReturnType<typeof setTimeout> | null = null;
  /** 複数指ダブルタップの計測。 */
  private tap = { t0: 0, maxN: 0, moved: false, stagger: false, lastN: 0, lastT: 0 };

  /** F ボタンを押している間 true。外（UI 側）から更新する。 */
  fHeld = false;
  /** F を押しながら別の操作をしたか。離したときにフレームしないための印。 */
  fChord = false;
  /** true = 指は常にカメラ。 */
  fingerCam = false;

  constructor(
    private canvas: HTMLCanvasElement,
    private local: (e: { clientX: number; clientY: number }) => ScreenPoint,
    private h: GestureHandlers,
  ) {}

  attach(): void {
    const c = this.canvas;
    c.addEventListener("contextmenu", (e) => e.preventDefault());
    // iOS の長押しコールアウト・選択・拡大は touchstart を抑止しないと止まらない。
    // canvas はポインタイベントだけで動くので click 抑止の副作用がない。
    c.addEventListener("touchstart", (e) => e.preventDefault(), { passive: false });
    c.addEventListener("touchmove", (e) => e.preventDefault(), { passive: false });

    c.addEventListener("pointerdown", (e) => this.down(e));
    c.addEventListener("pointermove", (e) => this.move(e));
    c.addEventListener("pointerup", (e) => this.up(e));
    c.addEventListener("pointercancel", (e) => this.cancelled(e));
    c.addEventListener("pointerleave", () => {
      if (!this.pointers.size) this.h.hoverLeave();
    });
    c.addEventListener(
      "wheel",
      (e) => {
        e.preventDefault();
        this.h.dolly(1 + Math.sign(e.deltaY) * 0.09);
      },
      { passive: false },
    );
  }

  /** 押されている指の数（ペンとマウスは数えない）。 */
  private touchCount(): number {
    let n = 0;
    for (const p of this.pointers.values()) if (p.type === "touch") n++;
    return n;
  }

  private down(e: PointerEvent): void {
    // Safari は条件によって投げる。捕捉できなくても操作自体は続けられる
    try {
      this.canvas.setPointerCapture(e.pointerId);
    } catch {
      /* 捕捉できないだけなので続ける */
    }
    this.pointers.set(e.pointerId, {
      x: e.clientX,
      y: e.clientY,
      x0: e.clientX,
      y0: e.clientY,
      type: e.pointerType,
    });
    this.tapDown(e);

    if (this.pointers.size >= 2) {
      // 3 本指の変形中に指が増えたら、そこで確定させる
      if (this.gesture?.mode === "threefinger" && this.gesture.live) this.h.transformEnd();
      this.h.abort();
      this.cancelHold();
      if (this.pointers.size === 3 && this.touchCount() === 3) {
        // 3 本指は選択の変形。デッドゾーンを越えるまでは何も起こさないので、
        // 3 本指ダブルタップ（やり直す）とも長押しとも両立する
        const c = clusterOf(this.pointers);
        const thumb = thumbOf(this.pointers);
        this.gesture = {
          mode: "threefinger",
          live: false,
          acc: 0,
          basis: c,
          last: c,
          // 親指は置いた時点で決めて、以後は変えない（`26` の T1）
          thumb,
          basisLever: leverOf(this.pointers, thumb),
        };
        // 指 3 本の長押し = カメラ。選択の有無に関わらずいつでも出せる
        this.startHold(3, () => this.h.openCameraMenu(c.cx, c.cy));
        return;
      }
      if (this.pointers.size === 2) {
        const c = clusterOf(this.pointers);
        this.gesture = { mode: "twofinger", live: false, acc: 0, last: c };
        // 指 2 本の長押し = カメラ / 編集のサークルメニュー。中心は 2 本の真ん中
        if (this.touchCount() === 2) {
          this.startHold(2, () => this.h.openTwoFingerMenu(c.cx, c.cy));
        }
        // F を押しながらのピンチ: 選択の中心を画面上で固定したままズーム
        if (this.fHeld) {
          this.fChord = true;
          this.gesture.zoomOnly = true;
          this.gesture.pivot = this.h.zoomPivot() ?? undefined;
        }
      } else {
        // 3 本以上はカメラにしない（3 本ダブルタップ = やり直す）
        this.gesture = { mode: "idle" };
      }
      return;
    }

    const p = this.local(e);
    // F を押しながらのドラッグ = 矩形選択（指でもペンでも。ヒットテストは無視）
    if (this.fHeld) {
      this.fChord = true;
      this.gesture = { mode: "tool", moved: false, sx: p.x, sy: p.y };
      this.h.marqueeStart(p);
      return;
    }

    if (e.pointerType === "mouse") {
      if (this.h.altOn(e)) {
        this.gesture = { mode: e.button === 0 ? "tumble" : e.button === 1 ? "pan" : "dolly" };
        return;
      }
      // 右クリック = マーキングメニュー、Shift + 右クリック = 編集メニュー（Maya と同じ）
      if (e.button === 2) {
        this.h.openMarkingMenu(e.clientX, e.clientY, this.h.shiftOn(e));
        this.gesture = { mode: "marking" };
        return;
      }
      if (e.button === 1) {
        this.gesture = { mode: "pan" };
        return;
      }
    }

    if (e.pointerType === "touch") {
      const onMesh = !this.fingerCam && this.h.isOnMesh(p, e);
      if (!onMesh) {
        this.gesture = { mode: "tumble", live: false, acc: 0 };
        this.startMarkingHold(e);
        return;
      }
    }

    this.gesture = { mode: "tool", moved: false, sx: p.x, sy: p.y };
    if (e.pointerType !== "mouse") this.startMarkingHold(e);
    this.h.toolDown(p, e);
  }

  private move(e: PointerEvent): void {
    const rec = this.pointers.get(e.pointerId);
    if (!rec) {
      // ボタンを押していないときの移動はホバー
      if (e.buttons === 0 && !this.pointers.size) this.h.hover(this.local(e), e);
      return;
    }
    const px = rec.x;
    const py = rec.y;
    rec.x = e.clientX;
    rec.y = e.clientY;
    // 長押しは「指がその場に留まっていること」が条件。
    // 起点は指ごとの着地点で見る（2 本指のときは真ん中との距離では測れない）
    if (Math.hypot(e.clientX - rec.x0, e.clientY - rec.y0) > TAP_MOVE) {
      this.tap.moved = true;
      this.cancelHold();
    }

    const g = this.gesture;
    if (!g) return;

    if (g.mode === "tumble") {
      // 指を置いた直後のブレでは回さない（マウスは即時）
      if (!g.live && e.pointerType === "touch") {
        g.acc = (g.acc ?? 0) + Math.hypot(e.clientX - px, e.clientY - py);
        if (g.acc < TUMBLE_DEADZONE) return;
        g.live = true;
      }
      this.h.tumble(e.clientX - px, e.clientY - py);
      return;
    }
    if (g.mode === "pan") return this.h.pan(e.clientX - px, e.clientY - py);
    if (g.mode === "dolly") return this.h.dolly(1 + (e.clientX - px + (e.clientY - py)) * 0.006);

    if (g.mode === "twofinger") {
      if (this.pointers.size < 2) return;
      const now = clusterOf(this.pointers);
      const last = g.last ?? now;
      if (!g.live) {
        g.acc = (g.acc ?? 0) + clusterMotion(last, now);
        g.last = now;
        if (g.acc < CLUSTER_DEADZONE) return;
        // 確定した時点を基準にし直して飛びを防ぐ
        g.live = true;
        this.tap.moved = true;
        // つまむだけだと指ごとの移動が小さく、長押しが生き残ることがある。
        // カメラが動き出した時点で長押しは無し
        this.cancelHold();
        return;
      }
      const factor = last.spread > 1e-6 && now.spread > 1e-6 ? last.spread / now.spread : 1;
      if (g.zoomOnly && g.pivot) {
        this.h.dollyAbout(g.pivot, factor);
      } else {
        this.h.dolly(factor);
        this.h.pan(now.cx - last.cx, now.cy - last.cy);
      }
      g.last = now;
      return;
    }

    if (g.mode === "threefinger") {
      if (this.pointers.size !== 3) return;
      const now = clusterOf(this.pointers);
      const basis = g.basis ?? now;
      if (!g.live) {
        // 指ごとに別々の pointermove が来るので、全員が動いてから測る。
        // 1 本だけ動いた途中の姿で測ると、まっすぐ滑らせただけでも広がりが揺れて拾ってしまう
        const fresh = (g.fresh ??= new Set());
        fresh.add(e.pointerId);
        if (fresh.size < this.pointers.size) return;
        fresh.clear();
        g.last = now;

        // つまみ・スワイプ・ひねりを同じ物差しで測って、いちばん大きいものに決める。
        // 開始時からの量なので、揺れが溜まって暴発することはない
        const pinch = spreadMotion(basis, now);
        const dx = now.cx - basis.cx;
        const dy = now.cy - basis.cy;
        const swipe = Math.hypot(dx, dy);

        // ひねりは「親指 → 対の中点」のてこで測る（`26` の T1）。
        // 対の中点が描く弧の長さを、つまみやスワイプと同じ px の物差しにする
        const lever = g.thumb !== undefined ? leverOf(this.pointers, g.thumb) : null;
        const base = g.basisLever;
        const twisted = lever && base ? angleDelta(base.angle, lever.angle) : 0;
        // 親指と対のあいだに空間があること。3 本が均等に開いた手はひねりに入らない
        const roomy = !!lever && lever.length >= TWIST_GAP * lever.span;
        const enough = Math.abs(twisted) >= (TWIST_MIN_DEG * Math.PI) / 180;
        const turn = lever && roomy && enough ? Math.abs(twisted) * (lever.length / 2) : 0;

        if (pinch < CLUSTER_DEADZONE && swipe < CLUSTER_DEADZONE && turn < CLUSTER_DEADZONE) return;

        // 選ぶものが無ければ変形しない。カメラにも化けさせない
        if (!this.h.transformBegin()) {
          this.gesture = { mode: "idle" };
          return;
        }
        g.live = true;
        // 変形として確定したので、タップ（やり直す）にも長押し（カメラ）にもしない
        this.tap.moved = true;
        this.cancelHold();
        // ここで中身を 1 つに決める。以後は入れ替わらない
        g.delta =
          turn >= pinch && turn >= swipe
            ? { kind: "rotate", axis: now.axis }
            : pinch >= swipe
              ? // つまむ向きは確定した時点で決めて、以後は変えない（`25` の T2）
                { kind: "scale", axis: now.axis }
              : { kind: "swipe", axis: Math.abs(dy) >= Math.abs(dx) ? "vertical" : "horizontal" };
        // 確定した時点を基準にし直して飛びを防ぐ
        g.basis = now;
        if (g.thumb !== undefined) g.basisLever = leverOf(this.pointers, g.thumb);
        return;
      }

      const kind = g.delta ?? { kind: "scale" as const, axis: now.axis };
      if (kind.kind === "rotate") {
        const lever = g.thumb !== undefined ? leverOf(this.pointers, g.thumb) : null;
        if (!lever || !g.basisLever) return;
        this.h.transformUpdate({
          kind: "rotate",
          radians: angleDelta(g.basisLever.angle, lever.angle),
          axis: kind.axis,
          at: { x: now.cx, y: now.cy },
        });
      } else if (kind.kind === "scale") {
        this.h.transformUpdate({
          kind: "scale",
          scale: basis.spread > 1e-6 ? now.spread / basis.spread : 1,
          axis: kind.axis,
        });
      } else {
        this.h.transformUpdate({
          kind: "swipe",
          axis: kind.axis,
          pixels: kind.axis === "vertical" ? now.cy - basis.cy : now.cx - basis.cx,
        });
      }
      return;
    }

    if (g.mode === "tool") {
      const p = this.local(e);
      if (Math.abs(p.x - (g.sx ?? 0)) > TOOL_MOVE || Math.abs(p.y - (g.sy ?? 0)) > TOOL_MOVE) g.moved = true;
      this.h.toolMove(p, e);
    }
  }

  private up(e: PointerEvent): void {
    this.cancelHold();
    const g = this.gesture;
    // 3 本指の変形は、指が 1 本でも離れた時点で確定する
    if (g?.mode === "threefinger" && g.live) this.h.transformEnd();
    const wasTool = g?.mode === "tool";
    const moved = wasTool && !!g?.moved;
    this.pointers.delete(e.pointerId);
    if (wasTool) this.h.toolUp(this.local(e), e, moved);
    if (this.pointers.size === 0) {
      this.gesture = null;
      this.tapUp(e);
    } else {
      // 指が減っても残った指でカメラを動かさない（離す途中の誤動作防止）
      this.gesture = { mode: "idle" };
    }
  }

  private cancelled(e: PointerEvent): void {
    if (this.gesture?.mode === "threefinger" && this.gesture.live) this.h.transformEnd();
    this.pointers.delete(e.pointerId);
    this.cancelHold();
    this.h.abort();
    if (!this.pointers.size) {
      this.gesture = null;
      this.tap.lastN = 0;
    } else {
      this.gesture = { mode: "idle" };
    }
  }

  /* ---- 複数指ダブルタップ: 2 本 = 戻る / 3 本 = 進む ------------------- */

  private tapDown(e: PointerEvent): void {
    if (e.pointerType !== "touch") return;
    const now = performance.now();
    const n = this.touchCount();
    if (n === 1) {
      this.tap.t0 = now;
      this.tap.maxN = 1;
      this.tap.moved = false;
      this.tap.stagger = false;
    } else {
      this.tap.maxN = Math.max(this.tap.maxN, n);
      if (now - this.tap.t0 > TAP_LAND_WINDOW) this.tap.stagger = true;
    }
  }

  private tapUp(e: PointerEvent): void {
    if (e.pointerType !== "touch") return;
    const now = performance.now();
    const isTap =
      !this.tap.moved && !this.tap.stagger && now - this.tap.t0 < TAP_DURATION && this.tap.maxN >= 2;
    if (!isTap) {
      this.tap.lastN = 0;
      return;
    }
    if (this.tap.lastN === this.tap.maxN && now - this.tap.lastT < DOUBLE_TAP_WINDOW) {
      this.tap.lastN = 0;
      if (this.tap.maxN === 2) this.h.undo();
      else this.h.redo();
      navigator.vibrate?.(8);
    } else {
      this.tap.lastN = this.tap.maxN;
      this.tap.lastT = now;
    }
  }

  /* ---- 長押し --------------------------------------------------------- */

  /**
   * 長押しの見張り。`fingers` 本のまま HOLD_DELAY 続いたら run を呼ぶ。
   * どれか 1 本でも TAP_MOVE を越えて動いたら move() で取り消される。
   */
  /** 指 1 本の長押し。SHF ラッチが立っていれば編集メニュー側を開く。 */
  private startMarkingHold(e: PointerEvent): void {
    const shift = this.h.shiftOn(e);
    const { clientX, clientY } = e;
    this.startHold(1, () => this.h.openMarkingMenu(clientX, clientY, shift));
  }

  private startHold(fingers: number, run: () => void): void {
    this.cancelHold();
    this.holdTimer = setTimeout(() => {
      if (this.pointers.size !== fingers) return;
      this.h.abort();
      this.gesture = null;
      run();
    }, HOLD_DELAY);
  }

  private cancelHold(): void {
    if (this.holdTimer !== null) clearTimeout(this.holdTimer);
    this.holdTimer = null;
  }
}
