/**
 * ポインタの割り振り。
 *
 * 指の本数で役割が分かれる:
 *   1 本 … ツール（メッシュの上）/ タンブル（外）
 *   2 本 … カメラ（パン / ズーム）
 *   3 本 … 選択そのものの変形（拡大縮小・回転・移動）
 *
 * しきい値は実機（iPad mini + Apple Pencil、Wacom MovinkPad 14）で
 * 確かめた値なので、変えるときは必ず実機で確かめ直すこと。
 *   - 指を置いた直後 5px はタンブルしない（置いたときのブレ）
 *   - 2 本指と 3 本指は、重心の移動と広がりの変化の合計が 10px を越えるまで何もしない
 *   - 複数指タップ = 120ms 以内に全部着地、どれも 12px 以内、300ms 以内に全部離れる
 *   - 長押しは 400ms
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
   * scale は倍率、angle はビュー軸まわりのラジアン、dx / dy は画面のピクセル。
   */
  transformUpdate(t: { scale: number; angle: number; dx: number; dy: number }): void;
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
  return { cx, cy, spread: spread / n, angles };
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
 * デッドゾーンの積算。重心の移動 + 広がりの変化 + 回転を弧長に直したもの。
 * 2 本指と 3 本指で同じ物差しを使うため、ここに一本化してある。
 *
 * 広がりは 2 倍して数える。2 本指のときに「指の間の距離の変化」と同じ物差しになり、
 * 実機で確かめた 10px という値がそのまま通じる。
 */
function clusterMotion(from: Cluster, to: Cluster): number {
  const spread = Math.abs(to.spread - from.spread) * 2;
  const turn = Math.abs(rotationSince(from, to)) * to.spread;
  return Math.hypot(to.cx - from.cx, to.cy - from.cy) + spread + turn;
}

interface Gesture {
  mode: GestureMode;
  live?: boolean;
  acc?: number;
  /** 3 本指の開始基準と、直前のフレーム（2 本指は last だけ使う）。 */
  basis?: Cluster;
  last?: Cluster;
  zoomOnly?: boolean;
  pivot?: Vector3;
  moved?: boolean;
  sx?: number;
  sy?: number;
}

const TUMBLE_DEADZONE = 5;
/** 複数指のカメラ操作 / 変形が確定する動き（px）。2 本指でも 3 本指でも同じ。 */
const CLUSTER_DEADZONE = 10;
const TAP_MOVE = 12;
const TAP_LAND_WINDOW = 120;
const TAP_DURATION = 300;
const DOUBLE_TAP_WINDOW = 400;
const HOLD_DELAY = 400;
const TOOL_MOVE = 3;

export class GestureRouter {
  private pointers = new Map<number, PointerRecord>();
  private gesture: Gesture | null = null;
  private holdTimer: ReturnType<typeof setTimeout> | null = null;
  private holdX = 0;
  private holdY = 0;
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
        // 3 本指ダブルタップ（やり直す）と両立する
        const c = clusterOf(this.pointers);
        this.gesture = { mode: "threefinger", live: false, acc: 0, basis: c, last: c };
        return;
      }
      if (this.pointers.size === 2) {
        const c = clusterOf(this.pointers);
        this.gesture = { mode: "twofinger", live: false, acc: 0, last: c };
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
        this.startHold(e.clientX, e.clientY, this.h.shiftOn(e));
        return;
      }
    }

    this.gesture = { mode: "tool", moved: false, sx: p.x, sy: p.y };
    if (e.pointerType !== "mouse") this.startHold(e.clientX, e.clientY, this.h.shiftOn(e));
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
    if (Math.hypot(e.clientX - this.holdX, e.clientY - this.holdY) > TAP_MOVE) this.cancelHold();
    if (Math.hypot(e.clientX - rec.x0, e.clientY - rec.y0) > TAP_MOVE) this.tap.moved = true;

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
      if (!g.live) {
        g.acc = (g.acc ?? 0) + clusterMotion(g.last ?? now, now);
        g.last = now;
        if (g.acc < CLUSTER_DEADZONE) return;
        // 選ぶものが無ければ変形しない。カメラにも化けさせない
        if (!this.h.transformBegin()) {
          this.gesture = { mode: "idle" };
          return;
        }
        g.live = true;
        // 変形として確定したので、タップ（やり直す）にはしない
        this.tap.moved = true;
        // 確定した時点を基準にし直して飛びを防ぐ
        g.basis = now;
        return;
      }
      const basis = g.basis ?? now;
      this.h.transformUpdate({
        scale: basis.spread > 1e-6 ? now.spread / basis.spread : 1,
        angle: rotationSince(basis, now),
        dx: now.cx - basis.cx,
        dy: now.cy - basis.cy,
      });
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

  private startHold(x: number, y: number, shift: boolean): void {
    this.holdX = x;
    this.holdY = y;
    this.cancelHold();
    this.holdTimer = setTimeout(() => {
      if (this.pointers.size !== 1) return;
      this.h.abort();
      this.gesture = null;
      // SHF ラッチ + 長押し = 編集メニュー
      this.h.openMarkingMenu(x, y, shift);
    }, HOLD_DELAY);
  }

  private cancelHold(): void {
    if (this.holdTimer !== null) clearTimeout(this.holdTimer);
    this.holdTimer = null;
  }
}
