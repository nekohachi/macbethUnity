/**
 * パネルのドッキング。見出しをつかんで好きな場所へ移せる。
 *
 * 置き場所は左・右上・右下の 3 つと、どこにも落とさなければ浮いたまま。
 * 既定は左（ツール）と右上（オプション）、右下（アウトライナ）。
 */
import { el } from "./dom.js";

export type Zone = "left" | "rightTop" | "rightBottom" | "float";

export interface DockedPanel {
  key: string;
  zone: Zone;
}

interface DropZone {
  el: HTMLElement;
  zone: Exclude<Zone, "float">;
  name: string;
}

export interface DockingHost {
  /** 落とした先を覚えておく。次に開いたときに復元するため。 */
  onZoneChange(key: string, zone: Zone): void;
  onMessage(text: string): void;
  /** ドックの幅が変わったのでビューポートを測り直す。 */
  onLayoutChange(): void;
}

export class Docking {
  private drag: {
    panel: HTMLElement;
    key: string;
    dx: number;
    dy: number;
    zones: DropZone[];
    hot: DropZone | null;
  } | null = null;

  constructor(
    private stage: HTMLElement,
    private host: DockingHost,
  ) {}

  /** 見出しに掴み手を付ける。 */
  attach(panel: HTMLElement): void {
    const head = panel.querySelector(".phead");
    if (!head) return;
    const grip = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    grip.setAttribute("class", "grip");
    grip.setAttribute("viewBox", "0 0 8 12");
    grip.setAttribute("fill", "currentColor");
    for (const [cx, cy] of [
      [2, 2],
      [6, 2],
      [2, 6],
      [6, 6],
      [2, 10],
      [6, 10],
    ]) {
      const c = document.createElementNS("http://www.w3.org/2000/svg", "circle");
      c.setAttribute("cx", String(cx));
      c.setAttribute("cy", String(cy));
      c.setAttribute("r", "1");
      grip.appendChild(c);
    }
    head.insertBefore(grip, head.firstChild);
    head.addEventListener("touchstart", (e) => e.preventDefault(), { passive: false });
    head.addEventListener("pointerdown", (e) => this.start(e as PointerEvent, panel));
  }

  /** 置き場所へ入れる。float なら stage に浮かせる。 */
  place(panel: HTMLElement, zone: Zone): void {
    if (zone === "float") {
      panel.classList.add("floating");
      panel.style.left = "320px";
      panel.style.top = "90px";
      this.stage.appendChild(panel);
    } else {
      panel.classList.remove("floating");
      panel.style.left = "";
      panel.style.top = "";
      this.stage.querySelector(`[data-zone="${zone}"]`)?.appendChild(panel);
    }
    this.updateDockWidths();
  }

  /** ツール列が入っているドックだけ細くする。Safari で幅が潰れるのを避けるため JS で付ける。 */
  private updateDockWidths(): void {
    for (const dock of this.stage.querySelectorAll<HTMLElement>(".dock")) {
      dock.classList.toggle("narrow", !!dock.querySelector('.panel[data-panel="tools"]'));
    }
  }

  private start(e: PointerEvent, panel: HTMLElement): void {
    e.preventDefault();
    const r = panel.getBoundingClientRect();
    this.drag = {
      panel,
      key: panel.dataset.panel ?? "",
      dx: e.clientX - r.left,
      dy: e.clientY - r.top,
      zones: [],
      hot: null,
    };
    this.showDropZones();
    panel.classList.add("floating");
    this.stage.appendChild(panel);
    this.move(e);
    window.addEventListener("pointermove", this.move);
    window.addEventListener("pointerup", this.end);
    window.addEventListener("pointercancel", this.end);
  }

  private move = (e: PointerEvent): void => {
    const d = this.drag;
    if (!d) return;
    const sr = this.stage.getBoundingClientRect();
    d.panel.style.left = `${e.clientX - sr.left - d.dx}px`;
    d.panel.style.top = `${e.clientY - sr.top - d.dy}px`;
    let hot: DropZone | null = null;
    for (const z of d.zones) {
      const r = z.el.getBoundingClientRect();
      const inside = e.clientX >= r.left && e.clientX <= r.right && e.clientY >= r.top && e.clientY <= r.bottom;
      z.el.classList.toggle("hot", inside);
      if (inside) hot = z;
    }
    d.hot = hot;
  };

  private end = (): void => {
    window.removeEventListener("pointermove", this.move);
    window.removeEventListener("pointerup", this.end);
    window.removeEventListener("pointercancel", this.end);
    const d = this.drag;
    if (!d) return;
    if (d.hot) {
      this.place(d.panel, d.hot.zone);
      this.host.onZoneChange(d.key, d.hot.zone);
      this.host.onMessage(`${d.panel.querySelector(".phead span")?.textContent ?? ""}を${d.hot.name}にドッキング`);
    } else {
      this.host.onZoneChange(d.key, "float");
    }
    this.hideDropZones();
    this.drag = null;
    this.updateDockWidths();
    // ドックの幅が変わったあとに測り直す
    setTimeout(() => this.host.onLayoutChange(), 0);
  };

  private showDropZones(): void {
    const d = this.drag;
    if (!d) return;
    const sr = this.stage.getBoundingClientRect();
    const specs: Array<{ zone: Exclude<Zone, "float">; name: string; x: number; y: number; w: number; h: number }> = [
      { zone: "left", name: "左", x: 64, y: 0, w: 200, h: sr.height },
      { zone: "rightTop", name: "右上", x: sr.width - 236, y: 0, w: 236, h: sr.height * 0.62 },
      { zone: "rightBottom", name: "右下", x: sr.width - 236, y: sr.height * 0.62, w: 236, h: sr.height * 0.38 },
    ];
    for (const spec of specs) {
      const z = el("div", "dropz");
      z.style.left = `${spec.x}px`;
      z.style.top = `${spec.y}px`;
      z.style.width = `${spec.w}px`;
      z.style.height = `${spec.h}px`;
      z.appendChild(el("span", undefined, spec.name));
      this.stage.appendChild(z);
      d.zones.push({ el: z, zone: spec.zone, name: spec.name });
    }
  }

  private hideDropZones(): void {
    for (const z of this.stage.querySelectorAll(".dropz")) z.remove();
  }
}
