/**
 * 左レールの縦ゲージ。モードが変わると中身（意味）が置き換わる。
 * 役割は「強度」と「範囲 / サイズ」で固定。どのモードでも同じ位置に同じ役割がある。
 */
import type { AppState } from "../state.js";
import { byId } from "./dom.js";

export class Gauge {
  private root: HTMLElement;
  private fill: HTMLElement;
  private knob: HTMLElement;
  private active = false;

  constructor(
    private state: AppState,
    id: string,
    private which: "g1" | "g2",
    private labelId: string,
    private valueId: string,
    private onInput: () => void,
    private onCommit: () => void,
  ) {
    this.root = byId(id);
    this.fill = this.root.querySelector(".fill") as HTMLElement;
    this.knob = this.root.querySelector(".knob") as HTMLElement;
    this.attach();
    this.paint();
  }

  paint(): void {
    const d = this.state.gauge(this.which);
    const v = d.get(this.state);
    const t = (v - d.min) / (d.max - d.min);
    this.fill.style.height = `${t * 100}%`;
    this.knob.style.bottom = `calc(${t * 100}% - 1px)`;
    byId(this.labelId).textContent = d.label;
    this.root.title = d.full;
    byId(this.valueId).textContent = v.toFixed(2);
    // 強度 0 は「効いていない」ので薄く見せる
    this.root.dataset.off = this.which === "g1" && v <= 0 ? "true" : "false";
  }

  private setFromY(clientY: number): void {
    const d = this.state.gauge(this.which);
    const r = this.root.getBoundingClientRect();
    const t = Math.max(0, Math.min(1, 1 - (clientY - r.top) / r.height));
    const raw = d.min + t * (d.max - d.min);
    d.set(this.state, Math.round(raw / d.step) * d.step);
    this.paint();
    this.onInput();
  }

  private attach(): void {
    const g = this.root;
    g.addEventListener("touchstart", (e) => e.preventDefault(), { passive: false });
    g.addEventListener("pointerdown", (e) => {
      e.preventDefault();
      this.active = true;
      g.setPointerCapture(e.pointerId);
      this.setFromY(e.clientY);
    });
    g.addEventListener("pointermove", (e) => {
      if (this.active) this.setFromY(e.clientY);
    });
    for (const t of ["pointerup", "pointercancel"] as const) {
      g.addEventListener(t, () => {
        if (!this.active) return;
        this.active = false;
        this.onCommit();
      });
    }
  }
}
