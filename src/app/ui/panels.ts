/**
 * 右側のパネル。オプション（上）とアウトライナ（下）。
 *
 * オプションの中身は Maya と同じで、選択中のツールとオブジェクトによって
 * 入れ替わる。パラメトリックなプリミティブならそのパラメータが出る。
 */
import { PRIMITIVES } from "../../core/index.js";
import type { SceneObject } from "../../core/index.js";
import { el } from "./dom.js";

export interface PanelHost {
  /** スライダーを動かしている最中（履歴には積まない）。 */
  onParamInput(object: SceneObject, key: string, value: number): void;
  /** 離したとき。ここで履歴に積む。 */
  onParamCommit(object: SceneObject, label: string): void;
  onSoftChange(which: "strength" | "radius", value: number): void;
  onExtrudeDistChange(value: number): void;
  onBevelChange(key: "width" | "segments", value: number): void;
  onCutChange(key: "snapStep" | "edgeFlow", value: number | boolean): void;
  onSmoothAngleChange(value: number): void;
  onSelect(object: SceneObject): void;
  onRename(object: SceneObject, name: string): void;
  onOutlinerMenu(object: SceneObject, x: number, y: number): void;
}

export function panelShell(key: string, title: string): { panel: HTMLElement; body: HTMLElement } {
  const panel = el("div", "panel");
  panel.dataset.panel = key;
  const head = el("div", "phead");
  head.appendChild(el("span", undefined, title));
  const body = el("div", "pbody");
  panel.append(head, body);
  return { panel, body };
}

function section(title: string, badge?: string): HTMLElement {
  const s = el("div", "sect");
  const h = el("div", "sect-h");
  h.appendChild(el("span", undefined, title));
  if (badge) h.appendChild(el("b", undefined, badge));
  s.appendChild(h);
  return s;
}

/** ラベル + 数値 + スライダーの 1 行。 */
function paramRow(
  parent: HTMLElement,
  options: {
    label: string;
    value: number;
    min: number;
    max: number;
    step: number;
    format?: (v: number) => string;
    onInput: (v: number) => void;
    onCommit?: () => void;
  },
): void {
  const row = el("div", "row");
  row.appendChild(el("label", undefined, options.label));
  const num = el("input", "num") as HTMLInputElement;
  num.type = "text";
  num.readOnly = true;
  const show = (v: number) => {
    num.value = options.format ? options.format(v) : v.toFixed(options.step < 1 ? 2 : 0);
  };
  show(options.value);
  row.appendChild(num);

  const slider = el("input", "slider") as HTMLInputElement;
  slider.type = "range";
  slider.min = String(options.min);
  slider.max = String(options.max);
  slider.step = String(options.step);
  slider.value = String(options.value);
  slider.addEventListener("input", () => {
    const v = Number(slider.value);
    show(v);
    options.onInput(v);
  });
  for (const t of ["change", "pointerup"] as const) {
    slider.addEventListener(t, () => options.onCommit?.());
  }
  row.appendChild(slider);
  parent.appendChild(row);
}

function checkbox(parent: HTMLElement, label: string, on: boolean, toggle: (v: boolean) => void): void {
  const b = el("button", "chk");
  b.setAttribute("aria-pressed", String(on));
  b.appendChild(el("i"));
  b.appendChild(el("span", undefined, label));
  b.addEventListener("click", () => {
    const next = b.getAttribute("aria-pressed") !== "true";
    b.setAttribute("aria-pressed", String(next));
    toggle(next);
  });
  parent.appendChild(b);
}

export interface OptionsState {
  tool: string;
  selected: SceneObject | null;
  soft: { strength: number; radius: number };
  cut: { snapStep: number; edgeFlow: boolean };
  bevel: { width: number; segments: number };
  /** ベベルを確定した直後か。作り直せる間だけ出す。 */
  bevelActive: boolean;
  extrudeDist: number;
  smoothAngle: number;
  compMode: string;
}

/** オプションパネルを描き直す。 */
export function renderOptions(body: HTMLElement, state: OptionsState, host: PanelHost): void {
  body.textContent = "";
  const o = state.selected;

  if (state.tool === "multicut") {
    const s = section("マルチカット", "MULTI CUT");
    paramRow(s, {
      label: "ステップ % スナップ",
      value: state.cut.snapStep,
      min: 0,
      max: 50,
      step: 5,
      format: (v) => (v ? `${Math.round(v)}%` : "オフ"),
      onInput: (v) => host.onCutChange("snapStep", v),
    });
    checkbox(s, "エッジフロー", state.cut.edgeFlow, (v) => host.onCutChange("edgeFlow", v));
    s.appendChild(
      el(
        "div",
        "hint",
        "ホバーで入る位置を先に見せます。Shift で 50% に固定。\nエッジフローは頂点法線による三次補間で、ループをサーフェスに沿わせます。",
      ),
    );
    body.appendChild(s);
  }

  if (state.tool === "bevel" || state.bevelActive) {
    const s = section("ベベル", "BEVEL");
    paramRow(s, {
      label: "幅",
      value: state.bevel.width,
      min: 0.005,
      max: 2,
      step: 0.005,
      format: (v) => v.toFixed(3),
      onInput: (v) => host.onBevelChange("width", v),
    });
    paramRow(s, {
      label: "セグメント",
      value: state.bevel.segments,
      min: 1,
      max: 8,
      step: 1,
      onInput: (v) => host.onBevelChange("segments", v),
    });
    s.appendChild(
      el(
        "div",
        "hint",
        state.bevelActive
          ? "確定したあとでも、ここを動かすとかけ直します。\n別の操作をすると確定します。"
          : "エッジを選んで左右にドラッグすると幅が決まります。\nセグメント 1 で面取り、2 以上で丸めになります。",
      ),
    );
    body.appendChild(s);
  }

  // 押し出しは面とエッジのメニューから使う。距離をここで決める
  if (state.compMode === "face" || state.compMode === "edge") {
    const s = section("押し出し", "EXTRUDE");
    paramRow(s, {
      label: "距離",
      value: state.extrudeDist,
      min: 0.05,
      max: 3,
      step: 0.05,
      onInput: (v) => host.onExtrudeDistChange(v),
    });
    s.appendChild(
      el("div", "hint", "編集メニューの「押し出し」で使う距離です。\nSHF を押しながらドラッグする場合は距離ではなく動かした量になります。"),
    );
    body.appendChild(s);
  }

  if (state.compMode !== "object") {
    const s = section("ソフト選択", "SOFT SELECT");
    paramRow(s, {
      label: "強度",
      value: state.soft.strength,
      min: 0,
      max: 1,
      step: 0.01,
      onInput: (v) => host.onSoftChange("strength", v),
    });
    paramRow(s, {
      label: "範囲",
      value: state.soft.radius,
      min: 0.05,
      max: 6,
      step: 0.05,
      onInput: (v) => host.onSoftChange("radius", v),
    });
    body.appendChild(s);
  }

  if (o) {
    const def = PRIMITIVES[o.kind];
    if (o.parametric && def) {
      const s = section("入力ノード", def.en.toUpperCase());
      const title = el("div", "attr-title", o.name);
      title.appendChild(el("span", undefined, def.en));
      s.appendChild(title);
      for (const spec of def.params) {
        paramRow(s, {
          label: spec.label,
          value: o.params[spec.key] ?? spec.value,
          min: spec.min,
          max: spec.max,
          step: spec.step,
          onInput: (v) => host.onParamInput(o, spec.key, v),
          onCommit: () => host.onParamCommit(o, `${spec.label} を変更`),
        });
      }
      s.appendChild(
        el("div", "hint", "パラメトリックなので、値を変えると作り直されます。\n編集すると通常のメッシュになります。"),
      );
      body.appendChild(s);
    } else {
      const s = section("メッシュ", "MESH");
      const stats = o.mesh.stats();
      s.appendChild(el("div", "attr-title", o.name));
      s.appendChild(
        el("div", "hint", `頂点 ${stats.vertices} · エッジ ${stats.edges} · 面 ${stats.faces}`),
      );
      body.appendChild(s);
    }
  }

  const s = section("表示", "DISPLAY");
  paramRow(s, {
    label: "スムージング角度",
    value: state.smoothAngle,
    min: 0,
    max: 180,
    step: 1,
    format: (v) => `${Math.round(v)}°`,
    onInput: (v) => host.onSmoothAngleChange(v),
  });
  body.appendChild(s);

  if (!body.children.length) body.appendChild(el("div", "empty", "選択すると内容が出ます"));
}

/** アウトライナを描き直す。 */
export function renderOutliner(
  body: HTMLElement,
  objects: SceneObject[],
  selected: SceneObject | null,
  host: PanelHost,
): void {
  body.textContent = "";
  if (!objects.length) {
    body.appendChild(el("div", "empty", "オブジェクトがありません\nツール列から追加してください"));
    return;
  }
  for (const o of objects) {
    const row = el("button", "olrow");
    row.setAttribute("aria-selected", String(o === selected));
    row.appendChild(el("i", "dot"));
    row.appendChild(el("span", "nm", o.name));
    row.appendChild(el("span", "ty", o.parametric ? o.kind : "mesh"));
    attachOutlinerRow(row, o, host);
    body.appendChild(row);
  }
}

/** 行の操作: タップで選択、ダブルタップで名前変更、長押しでサークルメニュー。 */
function attachOutlinerRow(row: HTMLElement, o: SceneObject, host: PanelHost): void {
  let timer: ReturnType<typeof setTimeout> | null = null;
  let sx = 0;
  let sy = 0;
  let opened = false;
  let lastTap = 0;

  row.addEventListener("touchstart", (e) => e.preventDefault(), { passive: false });
  row.addEventListener("contextmenu", (e) => e.preventDefault());
  row.addEventListener("pointerdown", (e) => {
    sx = e.clientX;
    sy = e.clientY;
    opened = false;
    if (e.pointerType === "mouse" && e.button === 2) {
      opened = true;
      host.onOutlinerMenu(o, e.clientX, e.clientY);
      return;
    }
    timer = setTimeout(() => {
      opened = true;
      host.onOutlinerMenu(o, sx, sy);
    }, 420);
  });
  const stop = () => {
    if (timer !== null) clearTimeout(timer);
    timer = null;
  };
  row.addEventListener("pointermove", (e) => {
    if (Math.hypot(e.clientX - sx, e.clientY - sy) > 12) stop();
  });
  row.addEventListener("pointerup", () => {
    stop();
    if (opened) return;
    const now = performance.now();
    if (now - lastTap < 400) {
      lastTap = 0;
      startRename(row, o, host);
      return;
    }
    lastTap = now;
    host.onSelect(o);
  });
  row.addEventListener("pointercancel", stop);
}

function startRename(row: HTMLElement, o: SceneObject, host: PanelHost): void {
  const name = row.querySelector(".nm");
  if (!name) return;
  const input = el("input", "olinput") as HTMLInputElement;
  input.value = o.name;
  name.replaceWith(input);
  input.focus();
  input.select();
  let done = false;
  const commit = (save: boolean) => {
    if (done) return;
    done = true;
    if (save && input.value.trim()) host.onRename(o, input.value.trim());
    const span = el("span", "nm", o.name);
    input.replaceWith(span);
  };
  input.addEventListener("blur", () => commit(true));
  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") commit(true);
    if (e.key === "Escape") commit(false);
  });
}
