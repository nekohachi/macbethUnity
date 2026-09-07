/**
 * ポインタの割り振り。プロトタイプの入力部をそのまま移した。
 *
 * しきい値は実機（iPad mini + Apple Pencil、Wacom MovinkPad 14）で
 * 確かめた値なので、変えるときは必ず実機で確かめ直すこと。
 *   - 指を置いた直後 5px はタンブルしない（置いたときのブレ）
 *   - 2 本指は中心移動と指間距離の変化の合計が 10px を越えるまでカメラを動かさない
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

type GestureMode = "idle" | "tumble" | "pan" | "dolly" | "twofinger" | "tool" | "marking";

interface Gesture {
  mode: GestureMode;
  live?: boolean;
  acc?: number;
  /** 2 本指の指間距離と中心。 */
  d?: number;
  cx?: number;
  cy?: number;
  zoomOnly?: boolean;
  pivot?: Vector3;
  moved?: boolean;
  sx?: number;
  sy?: number;
}

const TUMBLE_DEADZONE = 5;
const TWOFINGER_DEADZONE = 10;
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
      this.h.abort();
      this.cancelHold();
      if (this.pointers.size === 2) {
        const a = [...this.pointers.values()];
        this.gesture = {
          mode: "twofinger",
          live: false,
          acc: 0,
          d: Math.hypot(a[0].x - a[1].x, a[0].y - a[1].y),
          cx: (a[0].x + a[1].x) / 2,
          cy: (a[0].y + a[1].y) / 2,
        };
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
      const a = [...this.pointers.values()];
      if (a.length < 2) return;
      const nd = Math.hypot(a[0].x - a[1].x, a[0].y - a[1].y);
      const ncx = (a[0].x + a[1].x) / 2;
      const ncy = (a[0].y + a[1].y) / 2;
      if (!g.live) {
        g.acc = (g.acc ?? 0) + Math.hypot(ncx - (g.cx ?? 0), ncy - (g.cy ?? 0)) + Math.abs(nd - (g.d ?? 0));
        if (g.acc < TWOFINGER_DEADZONE) return;
        // 確定した時点を基準にし直して飛びを防ぐ
        g.live = true;
        this.tap.moved = true;
        g.d = nd;
        g.cx = ncx;
        g.cy = ncy;
        return;
      }
      if (g.zoomOnly && g.pivot) {
        if ((g.d ?? 0) > 0 && nd > 0) this.h.dollyAbout(g.pivot, (g.d ?? 1) / nd);
      } else {
        if ((g.d ?? 0) > 0 && nd > 0) this.h.dolly((g.d ?? 1) / nd);
        this.h.pan(ncx - (g.cx ?? 0), ncy - (g.cy ?? 0));
      }
      g.d = nd;
      g.cx = ncx;
      g.cy = ncy;
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
