/**
 * 左レールの縦ゲージ。モードが変わると中身（意味）が置き換わる。
 * 役割は「強度」と「範囲 / サイズ」で固定。どのモードでも同じ位置に同じ役割がある。
 *
 * モデリングの第 2 ゲージだけは、ソフト選択を切っていると「拡張」になる
 * （`24` の T3）。拡張は相対値なので、**離すと中央へ戻るバネ式**で動かす。
 */
import { gaugeRatio, gaugeValue, type AppState } from "../state.js";
import { byId } from "./dom.js";

export class Gauge {
  private root: HTMLElement;
  private fill: HTMLElement;
  private knob: HTMLElement;
  private active = false;
  /** バネ式のとき、今引いている段数。離すと 0 に戻る。 */
  private step = 0;

  constructor(
    private state: AppState,
    id: string,
    private which: "g1" | "g2",
    private labelId: string,
    private valueId: string,
    private onInput: () => void,
    private onCommit: (which: "g1" | "g2") => void,
  ) {
    this.root = byId(id);
    this.fill = this.root.querySelector(".fill") as HTMLElement;
    this.knob = this.root.querySelector(".knob") as HTMLElement;
    this.attach();
    this.paint();
  }

  paint(): void {
    const d = this.state.gauge(this.which);
    byId(this.labelId).textContent = d.label;
    this.root.title = d.full;

    if (d.kind === "spring") {
      // 中央が 0。塗りは中央から上または下へ伸びる
      const t = 0.5 + (this.step / d.steps) * 0.5;
      const lo = Math.min(0.5, t);
      const hi = Math.max(0.5, t);
      this.fill.style.bottom = `${lo * 100}%`;
      this.fill.style.height = `${(hi - lo) * 100}%`;
      this.knob.style.bottom = `calc(${t * 100}% - 1px)`;
      byId(this.valueId).textContent = this.step > 0 ? `+${this.step}` : String(this.step);
      this.root.dataset.off = String(!d.enabled(this.state));
      this.root.dataset.spring = "true";
      return;
    }

    const v = d.get(this.state);
    const t = gaugeRatio(d, v);
    this.fill.style.bottom = "0";
    this.fill.style.height = `${t * 100}%`;
    this.knob.style.bottom = `calc(${t * 100}% - 1px)`;
    byId(this.valueId).textContent = d.format ? d.format(v) : v.toFixed(2);
    // 強度 0 は「効いていない」ので薄く見せる
    this.root.dataset.off = this.which === "g1" && v <= 0 ? "true" : "false";
    this.root.dataset.spring = "false";
  }

  /** 掴んだ位置（0 = 下端、1 = 上端）。 */
  private ratio(clientY: number): number {
    const r = this.root.getBoundingClientRect();
    return Math.max(0, Math.min(1, 1 - (clientY - r.top) / r.height));
  }

  private setFromY(clientY: number): void {
    const d = this.state.gauge(this.which);
    const t = this.ratio(clientY);
    if (d.kind === "spring") {
      if (!d.enabled(this.state)) return;
      const n = Math.round((t - 0.5) * 2 * d.steps);
      if (n === this.step) return;
      this.step = n;
      d.drag(this.state, n);
      this.paint();
      return;
    }
    // つまみの位置から値へ。筆の太さは 2 乗のカーブ（`41` の T2）
    const raw = gaugeValue(d, t);
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
      // 掴んだ指を追い続ける。合成した入力では捕まえられないことがある
      try {
        g.setPointerCapture(e.pointerId);
      } catch {
        /* 捕まえられなくても、その要素の上で動かす限りは届く */
      }
      const d = this.state.gauge(this.which);
      if (d.kind === "spring") {
        this.step = 0;
        d.begin(this.state);
      }
      this.setFromY(e.clientY);
    });
    g.addEventListener("pointermove", (e) => {
      if (this.active) this.setFromY(e.clientY);
    });
    for (const t of ["pointerup", "pointercancel"] as const) {
      g.addEventListener(t, () => {
        if (!this.active) return;
        this.active = false;
        const d = this.state.gauge(this.which);
        if (d.kind === "spring") {
          d.end(this.state);
          // バネなので中央へ戻す。選択はそのまま
          this.step = 0;
          this.paint();
        }
        this.onCommit(this.which);
      });
    }
  }
}
