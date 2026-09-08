/**
 * 画面のかたち。縦持ちと横持ちの切り替えと、右パネルの幅（縦持ちでは高さ）の変更。
 *
 * 縦持ちの判定は幅と高さの比だけ。端末の向きの API は当てにならない
 * （分割表示や外部ディスプレイで嘘をつく）。
 */

const MIN = 180;
const MAX = 420;
const STORE_KEY = "macbeth.dockSize";

export class Layout {
  private grip: HTMLElement;
  /** 横持ちの幅と縦持ちの高さは別々に覚える。 */
  private sizes = { landscape: 236, portrait: 240 };
  private portrait = false;
  private wide = false;

  constructor(
    private stage: HTMLElement,
    private dockCol: HTMLElement,
    private onChange: () => void,
  ) {
    try {
      const saved = localStorage.getItem(STORE_KEY);
      if (saved) this.sizes = { ...this.sizes, ...(JSON.parse(saved) as typeof this.sizes) };
    } catch {
      /* 保存が壊れていても既定値で始める */
    }
    this.grip = document.createElement("div");
    this.grip.className = "dockgrip";
    this.stage.appendChild(this.grip);
    this.attachGrip();
    this.apply();
    window.addEventListener("resize", () => this.apply());
  }

  /** 今のかたちに合わせる。向きが変わったらクラスとつまみの位置を入れ替える。 */
  apply(): void {
    const r = this.stage.getBoundingClientRect();
    const portrait = r.height > r.width;
    const wide = r.width >= 1200;
    const changed = portrait !== this.portrait || wide !== this.wide;
    this.portrait = portrait;
    this.wide = wide;
    this.stage.classList.toggle("portrait", portrait);
    this.setSize(this.size);
    this.grip.classList.toggle("vertical", !portrait);
    this.grip.classList.toggle("horizontal", portrait);
    this.placeGrip();
    if (changed) this.onChange();
  }

  private get size(): number {
    return this.portrait ? this.sizes.portrait : this.sizes.landscape;
  }

  private setSize(px: number): void {
    const v = Math.max(MIN, Math.min(MAX, px));
    if (this.portrait) this.sizes.portrait = v;
    else this.sizes.landscape = v;
    this.stage.style.setProperty("--dockw", `${v}px`);
    this.placeGrip();
  }

  /** つまみをドック列の境目に置く。 */
  private placeGrip(): void {
    // ドック列が空（パネルを全部よそへ移した）ならつまみも隠す
    const empty = !this.dockCol.querySelector(".panel");
    this.grip.hidden = empty;
    if (empty) return;
    const s = this.stage.getBoundingClientRect();
    const d = this.dockCol.getBoundingClientRect();
    if (this.portrait) {
      this.grip.style.top = `${d.top - s.top - 3}px`;
      this.grip.style.left = "";
    } else {
      this.grip.style.left = `${d.left - s.left - 3}px`;
      this.grip.style.top = "";
    }
  }

  private attachGrip(): void {
    let active = false;
    this.grip.addEventListener("touchstart", (e) => e.preventDefault(), { passive: false });
    this.grip.addEventListener("pointerdown", (e) => {
      e.preventDefault();
      active = true;
      this.grip.classList.add("active");
      this.grip.setPointerCapture(e.pointerId);
    });
    this.grip.addEventListener("pointermove", (e) => {
      if (!active) return;
      const s = this.stage.getBoundingClientRect();
      // 右（縦持ちなら下）からの距離が、そのままドック列の大きさになる
      this.setSize(this.portrait ? s.bottom - e.clientY : s.right - e.clientX);
      this.onChange();
    });
    for (const t of ["pointerup", "pointercancel"] as const) {
      this.grip.addEventListener(t, () => {
        if (!active) return;
        active = false;
        this.grip.classList.remove("active");
        try {
          localStorage.setItem(STORE_KEY, JSON.stringify(this.sizes));
        } catch {
          /* 保存できなくても動作には影響しない */
        }
        this.onChange();
      });
    }
  }

  /**
   * 広い画面か（`19` の 3.3）。広ければレイヤーはドッキングのまま、
   * 狭ければ右から出るドロワーにする。
   */
  get isWide(): boolean {
    return this.stage.getBoundingClientRect().width >= 1200;
  }

  get isPortrait(): boolean {
    return this.portrait;
  }
}
