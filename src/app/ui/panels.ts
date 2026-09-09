/**
 * 右側のパネル。オプション（上）とアウトライナ（下）。
 *
 * オプションの中身は Maya と同じで、選択中のツールとオブジェクトによって
 * 入れ替わる。パラメトリックなプリミティブならそのパラメータが出る。
 */
import { PRIMITIVES } from "../../core/index.js";
import type { SceneObject } from "../../core/index.js";
import { el } from "./dom.js";
import { ICONS, iconSvg } from "./icons.js";

export interface PanelHost {
  /** スライダーを動かしている最中（履歴には積まない）。 */
  onParamInput(object: SceneObject, key: string, value: number): void;
  /** 離したとき。ここで履歴に積む。 */
  onParamCommit(object: SceneObject, label: string): void;
  onSoftChange(which: "strength" | "radius", value: number): void;
  onExtrudeDistChange(value: number): void;
  onVertexOptChange(key: "mergeDist" | "extrudeWidth", value: number): void;
  onSnapChange(key: "kind" | "step", value: string | number): void;
  onMirrorAxisChange(axis: 0 | 1 | 2): void;
  /** 数値入力。トランスフォームの 1 成分を直に書き換える。 */
  onTransformInput(object: SceneObject, field: "position" | "rotation" | "scale", axis: number, value: number): void;
  onBevelChange(key: "width" | "segments", value: number): void;
  /** ブリッジの分割数（`23` の T4）。 */
  onBridgeSegmentsChange(value: number): void;
  onCutChange(key: "snapStep" | "edgeFlow", value: number | boolean): void;
  onSmoothAngleChange(value: number): void;
  onManipSizeChange(value: number): void;
  onUvMethodChange(method: "lscm" | "projection" | "none"): void;
  onUvSnapChange(key: "kind" | "step", value: string | number): void;
  onUvAutoChange(key: "angle" | "useHardEdges" | "useCreases" | "usePolygroups" | "symmetric", value: number | boolean): void;
  onUvAutoRun(): void;
  onUvPackingChange(key: "marginTexels" | "textureSize" | "allowRotate", value: number | boolean): void;
  /** カメラベース選択（`21` の 2.1）。 */
  onCameraBasedChange(on: boolean): void;
  /** 歪みを色で見る（`23` の T2）。 */
  onUvHeatChange(on: boolean): void;
  /** チェッカーの細かさと模様（`23` の T3）。 */
  onCheckerChange(key: "cells" | "pattern", value: number | string): void;
  /** 3D の表示（`23` の T6）。裏面を描かない / グリッド。 */
  onDisplayToggle(key: "cullBack" | "showGrid", on: boolean): void;
  /** 回転の刻み（度。0 でなし）。 */
  onRotateStepChange(deg: number): void;
  onPreventNegativeScaleChange(on: boolean): void;
  /** 移動で UV を保つ（`23` の T5）。 */
  onPreserveUvsChange(on: boolean): void;
  onPivotEditToggle(): void;
  onCamOptChange(key: "focal" | "near" | "far", value: number): void;
  onCamOrthoChange(on: boolean): void;
  /** カメラを既定の設定へ戻す。 */
  onCamReset(): void;
  /** 「次に追加するプリミティブ」のパラメータ（`21` の 2.7）。 */
  onDefaultParamChange(kind: string, key: string, value: number): void;
  onSelect(object: SceneObject): void;
  onRename(object: SceneObject, name: string): void;
  onOutlinerMenu(object: SceneObject, x: number, y: number): void;
  /** アウトライナ（`19` の 3.3、`24` の T1）。 */
  onVisible(object: SceneObject, visible: boolean): void;
  onLock(object: SceneObject, locked: boolean): void;
  onReorder(from: number, to: number): void;
  /** 行を開いた / 閉じたので描き直す。 */
  onLayersChanged(): void;
  /** その行のサムネイル（data URL）。作れなければ空文字。 */
  thumbnail(object: SceneObject): string;
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

/**
 * 折りたためる区画。奥へ下げたいもの（自動 UV・方式）に使う（`20` の T7）。
 * 中身は `<details>` なので、開いた状態はブラウザが覚える。
 */
function foldedSection(title: string, badge?: string): { wrap: HTMLElement; body: HTMLElement } {
  const wrap = el("div", "sect fold");
  const details = document.createElement("details");
  const summary = document.createElement("summary");
  summary.className = "sect-h";
  summary.appendChild(el("span", undefined, title));
  if (badge) summary.appendChild(el("b", undefined, badge));
  details.appendChild(summary);
  const body = el("div");
  details.appendChild(body);
  wrap.appendChild(details);
  return { wrap, body };
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
  /** ブリッジの分割数（`23` の T4）。 */
  bridgeSegments: number;
  vertex: { mergeDist: number; extrudeWidth: number };
  snap: { kind: string; step: number; active: boolean };
  mirrorAxis: 0 | 1 | 2;
  /** 選択オブジェクトの回転を度で表したもの。three と同じ順序で app が出す。 */
  rotationEuler: [number, number, number];
  smoothAngle: number;
  compMode: string;
  /** マニピュレータの見た目の大きさ（0.5〜2.0）。 */
  manipSize: number;
  /** 今のマニピュレータ（`21` の 2.2）。 */
  manip: "all" | "move" | "rotate" | "scale";
  pivotEdit: boolean;
  rotateStep: number;
  preventNegativeScale: boolean;
  /** 移動で UV を保つ（`23` の T5）。 */
  preserveUvs: boolean;
  cameraBased: boolean;
  /** 歪みを色で見ているか（`23` の T2）。 */
  uvHeat: boolean;
  /** チェッカーの細かさと模様（`23` の T3）。 */
  checker: { cells: number; pattern: string };
  /** 今の 3D の表示。チェッカーのときだけ「表示」に模様の区画を出す。 */
  display: string;
  /** 裏面を描かない / 床のグリッド（`23` の T6）。 */
  cullBack: boolean;
  showGrid: boolean;
  cam: { focal: number; near: number; far: number; ortho: boolean };
  /** 次に追加するプリミティブの種類と、その既定値（`21` の 2.7）。 */
  nextPrimitive: string;
  nextPrimitiveParams: Record<string, number>;
  /** UV モードのときだけ。ソルバー、自動の切れ目、スナップ。 */
  uv: {
    method: "lscm" | "projection" | "none";
    snapKind: "grid" | "vertex";
    snapStep: number;
    auto: {
      angle: number;
      useHardEdges: boolean;
      useCreases: boolean;
      usePolygroups: boolean;
      symmetric: boolean;
    };
    packing: { marginTexels: number; textureSize: number; allowRotate: boolean };
  } | null;
}

/**
 * パッキングの区画（`19` の 1.2）。余白はテクセルで持つ。
 * `20` の T8 でツールのカットインへ移すので、1 つの関数に分けてある。
 */
export function packingSection(
  state: NonNullable<OptionsState["uv"]>,
  host: PanelHost,
): HTMLElement {
  const s = section("パッキング", "PACK");
  paramRow(s, {
    label: "余白",
    value: state.packing.marginTexels,
    min: 2,
    max: 64,
    step: 1,
    format: (v) => `${Math.round(v)} tx`,
    onInput: (v) => host.onUvPackingChange("marginTexels", Math.round(v)),
  });

  const row = el("div", "row");
  const group = el("div", "segmented");
  for (const size of [512, 1024, 2048, 4096]) {
    const b = el("button", "seg") as HTMLButtonElement;
    b.textContent = String(size);
    b.setAttribute("aria-pressed", String(state.packing.textureSize === size));
    b.addEventListener("click", () => host.onUvPackingChange("textureSize", size));
    group.appendChild(b);
  }
  row.appendChild(group);
  s.appendChild(row);

  checkbox(s, "90° 回転を許す", state.packing.allowRotate, (v) => host.onUvPackingChange("allowRotate", v));
  s.appendChild(
    el(
      "div",
      "hint",
      "余白はテクスチャのテクセルで持ちます。どの大きさでも最低 5px は空きます。\n90° 回転は島の向き（上が +V）を崩すので、既定は切ってあります。",
    ),
  );
  return s;
}

/** オプションパネルを描き直す。 */
/** 数値をそのまま打ち込む 3 つ組。Maya のチャンネルボックスにあたる。 */
function tripleRow(
  parent: HTMLElement,
  label: string,
  values: [number, number, number],
  digits: number,
  onSet: (axis: number, value: number) => void,
): void {
  const row = el("div", "row triple");
  row.appendChild(el("label", undefined, label));
  for (let axis = 0; axis < 3; axis++) {
    const num = el("input", "num") as HTMLInputElement;
    num.type = "text";
    num.inputMode = "decimal";
    num.value = values[axis].toFixed(digits);
    num.addEventListener("change", () => {
      const v = Number(num.value);
      if (Number.isFinite(v)) onSet(axis, v);
      else num.value = values[axis].toFixed(digits);
    });
    row.appendChild(num);
  }
  parent.appendChild(row);
}

/* ---- 区画ごとの組み立て（`21` の 3 章） ---------------------------------
 *
 * どれも「区画を 1 つ作って返す」だけ。ツール列のカットイン（`openToolOptions`）が
 * グループごとに必要なものを選んで並べる。右のオプションパネルは無くなった。
 */

/** トランスフォームの数値入力。選択が無ければ null。 */
export function transformSection(state: OptionsState, host: PanelHost): HTMLElement | null {
  const o = state.selected;
  if (!o) return null;
  const s = section("トランスフォーム", "TRANSFORM");
  tripleRow(s, "移動", o.transform.position as [number, number, number], 3, (axis, v) =>
    host.onTransformInput(o, "position", axis, v),
  );
  tripleRow(s, "回転", state.rotationEuler, 1, (axis, v) => host.onTransformInput(o, "rotation", axis, v));
  tripleRow(s, "スケール", o.transform.scale as [number, number, number], 3, (axis, v) =>
    host.onTransformInput(o, "scale", axis, v),
  );
  s.appendChild(el("div", "hint", "回転は度で入れます。数値を打って Enter で確定します。"));
  return s;
}

/** マニピュレータ。大きさのゲージは呼び出し側（app）が足す。 */
export function manipulatorSection(state: OptionsState, host: PanelHost): HTMLElement {
  const label = { all: "ユニバーサル", move: "移動", rotate: "回転", scale: "スケール" }[state.manip];
  const s = section(label, "MANIPULATOR");
  paramRow(s, {
    label: "大きさ",
    value: state.manipSize,
    min: 0.5,
    max: 2,
    step: 0.05,
    format: (v) => `×${v.toFixed(2)}`,
    onInput: (v) => host.onManipSizeChange(v),
  });
  checkbox(s, "ピボットを移動（D）", state.pivotEdit, () => host.onPivotEditToggle());

  if (state.manip === "rotate" || state.manip === "all") {
    const row = el("div", "row");
    row.appendChild(el("label", undefined, "刻み"));
    const group = el("div", "segmented");
    for (const [deg, text] of [
      [0, "なし"],
      [5, "5°"],
      [15, "15°"],
      [45, "45°"],
      [90, "90°"],
    ] as const) {
      const b = el("button", "seg") as HTMLButtonElement;
      b.textContent = text;
      b.setAttribute("aria-pressed", String(state.rotateStep === deg));
      b.addEventListener("click", () => host.onRotateStepChange(deg));
      group.appendChild(b);
    }
    row.appendChild(group);
    s.appendChild(row);
  }

  if (state.manip === "scale" || state.manip === "all") {
    checkbox(s, "負のスケールを防ぐ", state.preventNegativeScale, (v) => host.onPreventNegativeScaleChange(v));
  }

  if (state.manip === "move" || state.manip === "all") {
    checkbox(s, "UV を保つ", state.preserveUvs, (v) => host.onPreserveUvsChange(v));
    s.appendChild(
      el("div", "hint", "頂点を動かしても模様がその場に残ります（Maya の Preserve UVs）。\n効くのはコンポーネントの移動だけです。"),
    );
  }

  s.appendChild(
    el(
      "div",
      "hint",
      "長押しで 移動 / 回転 / スケール を切り替えます。\nピボットの移動中は、メッシュではなくピボットだけが動きます。",
    ),
  );
  return s;
}

/** 選択のオプション。カメラベース選択（`21` の 2.1）。 */
export function selectSection(state: OptionsState, host: PanelHost): HTMLElement {
  const s = section("選択", "SELECT");
  checkbox(s, "カメラベース選択", state.cameraBased, (v) => host.onCameraBasedChange(v));
  s.appendChild(
    el(
      "div",
      "hint",
      "オンにすると、カメラから見えているものだけを選びます。\n裏側の頂点やエッジは、タップでも矩形でも拾いません。",
    ),
  );
  return s;
}

export function multicutSection(state: OptionsState, host: PanelHost): HTMLElement {
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
  return s;
}

export function bevelSection(state: OptionsState, host: PanelHost): HTMLElement {
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
  return s;
}

export function extrudeSection(state: OptionsState, host: PanelHost): HTMLElement {
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
    el(
      "div",
      "hint",
      "編集メニューの「押し出し」で使う距離です。\nSHF を押しながらドラッグする場合は距離ではなく動かした量になります。",
    ),
  );
  return s;
}

export function bridgeSection(state: OptionsState, host: PanelHost): HTMLElement {
  const s = section("ブリッジ", "BRIDGE");
  paramRow(s, {
    label: "分割数",
    value: state.bridgeSegments,
    min: 1,
    max: 16,
    step: 1,
    format: (v) => String(Math.round(v)),
    onInput: (v) => host.onBridgeSegmentsChange(Math.round(v)),
  });
  s.appendChild(
    el(
      "div",
      "hint",
      "境界のエッジ列を 2 つ選んで実行します。数が同じでないと繋げません。\n分割数を上げると、間に等間隔の輪が入ります。",
    ),
  );
  return s;
}

export function connectSection(): HTMLElement {
  const s = section("コネクト", "CONNECT");
  s.appendChild(
    el("div", "hint", "同じ面にある頂点どうしを結んで面を分けます。\nエッジを選んだときは中点を作ってから結びます。"),
  );
  return s;
}

export function snapSection(state: OptionsState, host: PanelHost): HTMLElement {
  const s = section(`スナップ${state.snap.active ? "（効いています）" : ""}`, "SNAP");
  const row = el("div", "row");
  const group = el("div", "segmented");
  for (const [key, label] of [
    ["grid", "グリッド  X"],
    ["vertex", "頂点  V"],
    ["edge", "カーブ  C"],
    ["surface", "面"],
  ] as const) {
    const b = el("button", "seg") as HTMLButtonElement;
    b.textContent = label;
    b.setAttribute("aria-pressed", String(state.snap.kind === key));
    b.addEventListener("click", () => host.onSnapChange("kind", key));
    group.appendChild(b);
  }
  row.appendChild(group);
  s.appendChild(row);
  paramRow(s, {
    label: "グリッドの刻み",
    value: state.snap.step,
    min: 0.05,
    max: 2,
    step: 0.05,
    onInput: (v) => host.onSnapChange("step", v),
  });
  s.appendChild(
    el(
      "div",
      "hint",
      "ツール列のスナップがオンのとき、または X / V / C を押している間だけ効きます。\n移動のときだけ働き、寄せ先は緑で光ります。",
    ),
  );
  return s;
}

export function mirrorSection(state: OptionsState, host: PanelHost): HTMLElement {
  const s = section("ミラー", "MIRROR");
  const row = el("div", "row");
  const group = el("div", "segmented");
  for (const [axis, label] of [
    [0, "X"],
    [1, "Y"],
    [2, "Z"],
  ] as const) {
    const b = el("button", "seg") as HTMLButtonElement;
    b.textContent = label;
    b.setAttribute("aria-pressed", String(state.mirrorAxis === axis));
    b.addEventListener("click", () => host.onMirrorAxisChange(axis));
    group.appendChild(b);
  }
  row.appendChild(group);
  s.appendChild(row);
  s.appendChild(
    el("div", "hint", "編集メニュー（オブジェクト）の「ミラー」で使う軸です。\n境目の頂点は「マージ距離」で溶接します。"),
  );
  return s;
}

export function vertexSection(state: OptionsState, host: PanelHost): HTMLElement {
  const s = section("頂点", "VERTEX");
  paramRow(s, {
    label: "マージ距離",
    value: state.vertex.mergeDist,
    min: 0.001,
    max: 0.5,
    step: 0.001,
    format: (v) => v.toFixed(3),
    onInput: (v) => host.onVertexOptChange("mergeDist", v),
  });
  paramRow(s, {
    label: "押し出しの太さ",
    value: state.vertex.extrudeWidth,
    min: 0.05,
    max: 0.6,
    step: 0.01,
    onInput: (v) => host.onVertexOptChange("extrudeWidth", v),
  });
  s.appendChild(
    el(
      "div",
      "hint",
      "マージ距離は「距離でマージ」で使うしきい値です。\n押し出しの太さは、尖らせたときの根元の広がり（辺の長さに対する割合）です。",
    ),
  );
  return s;
}

export function softSelectSection(state: OptionsState, host: PanelHost): HTMLElement {
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
  return s;
}

/**
 * プリミティブの入力ノード（`21` の 2.7）。
 *
 * 選んでいるオブジェクトがパラメトリックならそれを、そうでなければ
 * 「次に追加する種類」の既定値を触る。見出しでどちらか分かるようにする。
 */
export function primitiveSection(state: OptionsState, host: PanelHost): HTMLElement {
  const o = state.selected;
  if (o && o.parametric && PRIMITIVES[o.kind]) {
    const def = PRIMITIVES[o.kind];
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
    return s;
  }

  // 選択がパラメトリックでないときは「次に追加するもの」の既定値
  const kind = state.nextPrimitive;
  const def = PRIMITIVES[kind];
  const s = section(`次の${def?.label ?? kind}`, (def?.en ?? kind).toUpperCase());
  if (!def) return s;
  for (const spec of def.params) {
    paramRow(s, {
      label: spec.label,
      value: state.nextPrimitiveParams[spec.key] ?? spec.value,
      min: spec.min,
      max: spec.max,
      step: spec.step,
      onInput: (v) => host.onDefaultParamChange(kind, spec.key, v),
    });
  }
  s.appendChild(el("div", "hint", "長押しのメニューから追加すると、この値で作られます。"));

  if (o) {
    const stats = o.mesh.stats();
    s.appendChild(el("div", "attr-title", o.name));
    s.appendChild(el("div", "hint", `頂点 ${stats.vertices} · エッジ ${stats.edges} · 面 ${stats.faces}`));
  }
  return s;
}

/** 段違いのボタン列。押されているものに `aria-pressed`。 */
function segmented(
  parent: HTMLElement,
  label: string,
  items: Array<{ label: string; on: boolean; run: () => void }>,
): void {
  const row = el("div", "row");
  if (label) row.appendChild(el("label", undefined, label));
  const group = el("div", "segmented");
  for (const item of items) {
    const b = el("button", "seg") as HTMLButtonElement;
    b.textContent = item.label;
    b.setAttribute("aria-pressed", String(item.on));
    b.addEventListener("click", item.run);
    group.appendChild(b);
  }
  row.appendChild(group);
  parent.appendChild(row);
}

/**
 * チェッカーの細かさと模様（`23` の T3）。2D の下地と 3D の表示で同じものを使うので、
 * UV の「展開」と 3D の「表示」の両方に同じ区画を置く。
 */
export function checkerSection(state: OptionsState, host: PanelHost): HTMLElement {
  const s = section("チェッカー", "CHECKER");
  segmented(
    s,
    "細かさ",
    [4, 8, 16, 32, 64].map((n) => ({
      label: String(n),
      on: state.checker.cells === n,
      run: () => host.onCheckerChange("cells", n),
    })),
  );
  segmented(
    s,
    "模様",
    [
      { key: "checker", label: "市松" },
      { key: "colorGrid", label: "カラーグリッド" },
    ].map((p) => ({
      label: p.label,
      on: state.checker.pattern === p.key,
      run: () => host.onCheckerChange("pattern", p.key),
    })),
  );
  s.appendChild(el("div", "hint", "2D の下地と 3D のチェッカー表示で同じ模様を使います。"));
  return s;
}

export function displaySection(state: OptionsState, host: PanelHost): HTMLElement {
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
  checkbox(s, "裏面を描かない", state.cullBack, (v) => host.onDisplayToggle("cullBack", v));
  checkbox(s, "グリッド", state.showGrid, (v) => host.onDisplayToggle("showGrid", v));
  checkbox(s, "歪みを色で（ヒートマップ）", state.uvHeat, (v) => host.onUvHeatChange(v));
  s.appendChild(
    el(
      "div",
      "hint",
      "長押しで ワイヤ / シェード / シェード + ワイヤ / スムース を選べます（4〜7）。\nヒートマップは 9。1.0 は歪みなし、緑 → 黄 → 赤 の順に歪んでいます。",
    ),
  );
  return s;
}

/** 「表示」のカットインの中身。チェッカー表示のときだけ模様の区画が付く。 */
export function displaySections(state: OptionsState, host: PanelHost): HTMLElement[] {
  const out = [displaySection(state, host)];
  if (state.display === "checker") out.push(checkerSection(state, host));
  return out;
}

/** カメラ。`openCameraPopup` の中身をここへ移した。 */
export function cameraSection(state: OptionsState, host: PanelHost): HTMLElement {
  const s = section("カメラ", "CAMERA");
  const aov = el("div", "hint");
  const updateAov = (focal: number) => {
    // 35mm アカデミーのフィルムゲート幅 24mm から画角を出す
    const deg = (2 * Math.atan(24 / (2 * focal)) * 180) / Math.PI;
    aov.textContent = `アングル オブ ビュー  ${deg.toFixed(2)}°\nフィルム ゲート  35mm アカデミー`;
  };
  const row = (label: string, key: "focal" | "near" | "far", min: number, max: number, step: number) => {
    paramRow(s, {
      label,
      value: state.cam[key],
      min,
      max,
      step,
      format: (v) => String(step < 1 ? Number(v.toFixed(2)) : Math.round(v)),
      onInput: (v) => {
        host.onCamOptChange(key, v);
        if (key === "focal") updateAov(v);
      },
    });
  };
  row("焦点距離", "focal", 10, 200, 1);
  row("ニア クリップ", "near", 0.01, 1, 0.01);
  row("ファー クリップ", "far", 50, 2000, 10);
  updateAov(state.cam.focal);
  s.appendChild(aov);
  checkbox(s, "平行投影", state.cam.ortho, (v) => host.onCamOrthoChange(v));
  const reset = el("button", "act", "初期設定に戻す");
  reset.addEventListener("click", () => host.onCamReset());
  s.appendChild(reset);
  s.appendChild(el("div", "hint", "焦点距離 35mm・ニア 0.05・ファー 500・パースに戻します。"));
  return s;
}

/** UV の展開まわり（方式 / 自動 UV / パッキング）。`20` の T7 で「展開」の長押しへ。 */
export function uvUnfoldSection(
  uv: NonNullable<OptionsState["uv"]>,
  host: PanelHost,
  state?: OptionsState,
): HTMLElement[] {
  const heatOn = state?.uvHeat ?? false;
  const heat = section("歪み", "DISTORTION");
  checkbox(heat, "歪みを色で", heatOn, (v) => host.onUvHeatChange(v));
  heat.appendChild(
    el("div", "hint", "面ごとの伸び（σ1 / σ2）を色にします。\n1.0 は歪みなし。緑 → 黄 → 赤 の順に歪んでいます。3D も一緒に変わります。"),
  );
  const out: HTMLElement[] = [heat];
  if (state) out.push(checkerSection(state, host));
  out.push(packingSection(uv, host));

  // 方式と自動 UV は既定の入口ではないので、折りたたんで奥に置く（`20` の T7）
  const folded = foldedSection("詳細（自動 UV・方式）", "ADVANCED");
  out.push(folded.wrap);

  const s = section("展開", "UNFOLD");
  const row = el("div", "row");
  const group = el("div", "segmented");
  for (const [key, label] of [
    ["none", "取り込んだまま"],
    ["lscm", "LSCM"],
    ["projection", "投影"],
  ] as const) {
    const b = el("button", "seg") as HTMLButtonElement;
    b.textContent = label;
    b.setAttribute("aria-pressed", String(uv.method === key));
    b.addEventListener("click", () => host.onUvMethodChange(key));
    group.appendChild(b);
  }
  row.appendChild(group);
  s.appendChild(row);
  s.appendChild(
    el(
      "div",
      "hint",
      "「取り込んだまま」はメッシュが持っている UV をそのまま見せます。\n「展開」を押すと LSCM に切り替わります。",
    ),
  );
  folded.body.appendChild(s);

  const auto = section("自動 UV", "AUTO");
  paramRow(auto, {
    label: "角度",
    value: uv.auto.angle,
    min: 10,
    max: 180,
    step: 1,
    format: (v) => `${Math.round(v)}°`,
    onInput: (v) => host.onUvAutoChange("angle", v),
  });
  checkbox(auto, "ハードエッジ", uv.auto.useHardEdges, (v) => host.onUvAutoChange("useHardEdges", v));
  checkbox(auto, "クリース", uv.auto.useCreases, (v) => host.onUvAutoChange("useCreases", v));
  checkbox(auto, "ポリグループ", uv.auto.usePolygroups, (v) => host.onUvAutoChange("usePolygroups", v));
  checkbox(auto, "対称 X", uv.auto.symmetric, (v) => host.onUvAutoChange("symmetric", v));
  const run = el("button", "act", "自動 UV を実行");
  run.addEventListener("click", () => host.onUvAutoRun());
  auto.appendChild(run);
  auto.appendChild(
    el(
      "div",
      "hint",
      "角度・ハードエッジ・クリース・ポリグループで切れ目を置き、\n大きすぎる島と閉じた island を割ってから開きます。手で動かした分は捨てます。",
    ),
  );
  folded.body.appendChild(auto);
  return out;
}

/** UV のスナップ。 */
export function uvSnapSection(uv: NonNullable<OptionsState["uv"]>, state: OptionsState, host: PanelHost): HTMLElement {
  const sn = section(`UV スナップ${state.snap.active ? "（効いています）" : ""}`, "SNAP");
  const srow = el("div", "row");
  const sgroup = el("div", "segmented");
  for (const [key, label, step] of [
    ["grid", "1/8", 1 / 8],
    ["grid", "1/16", 1 / 16],
    ["grid", "1/32", 1 / 32],
    ["vertex", "UV 頂点", 0],
  ] as const) {
    const b = el("button", "seg") as HTMLButtonElement;
    b.textContent = label;
    const on =
      key === "vertex" ? uv.snapKind === "vertex" : uv.snapKind === "grid" && Math.abs(uv.snapStep - step) < 1e-9;
    b.setAttribute("aria-pressed", String(on));
    b.addEventListener("click", () => {
      host.onUvSnapChange("kind", key);
      if (key === "grid") host.onUvSnapChange("step", step);
    });
    sgroup.appendChild(b);
  }
  srow.appendChild(sgroup);
  sn.appendChild(srow);
  return sn;
}

/** アウトライナを描き直す。 */
export function renderLayers(
  body: HTMLElement,
  objects: SceneObject[],
  selected: SceneObject | null,
  host: PanelHost,
  opened: Set<string>,
): void {
  body.textContent = "";
  if (!objects.length) {
    body.appendChild(el("div", "empty", "オブジェクトがありません\nツール列から追加してください"));
    return;
  }
  // Procreate と同じで上が手前。一覧は追加の逆順で出す
  for (let i = objects.length - 1; i >= 0; i--) {
    const o = objects[i];
    const wrap = el("div", "lyitem");
    const row = el("div", "lyrow");
    row.setAttribute("aria-selected", String(o === selected));
    row.dataset.id = o.id;

    const thumb = el("div", "thumb");
    const url = host.thumbnail(o);
    if (url) {
      const img = el("img") as HTMLImageElement;
      img.src = url;
      img.alt = "";
      thumb.appendChild(img);
    }
    row.appendChild(thumb);

    const name = el("div", "nm");
    name.appendChild(el("span", undefined, o.name));
    name.appendChild(el("span", "ty", o.parametric ? o.kind : "mesh"));
    row.appendChild(name);

    const eye = el("button", "eye");
    eye.setAttribute("aria-pressed", String(o.visible));
    eye.title = o.visible ? "隠す" : "表示する";
    eye.innerHTML = iconSvg(o.visible ? ICONS.eye : ICONS.eyeOff);
    eye.addEventListener("pointerdown", (e) => e.stopPropagation());
    eye.addEventListener("click", (e) => {
      e.stopPropagation();
      host.onVisible(o, !o.visible);
    });
    row.appendChild(eye);

    const lock = el("button", "lock");
    lock.setAttribute("aria-pressed", String(o.locked));
    lock.title = o.locked ? "ロックを外す" : "ロックする";
    lock.innerHTML = iconSvg(o.locked ? ICONS.lock : ICONS.lockOpen);
    lock.addEventListener("pointerdown", (e) => e.stopPropagation());
    lock.addEventListener("click", (e) => {
      e.stopPropagation();
      host.onLock(o, !o.locked);
    });
    row.appendChild(lock);

    const more = el("button", "more", opened.has(o.id) ? "▾" : "▸");
    more.title = "プロパティ";
    more.addEventListener("pointerdown", (e) => e.stopPropagation());
    more.addEventListener("click", (e) => {
      e.stopPropagation();
      if (opened.has(o.id)) opened.delete(o.id);
      else opened.add(o.id);
      host.onLayersChanged();
    });
    row.appendChild(more);

    attachOutlinerRow(row, o, host);
    wrap.appendChild(row);

    if (opened.has(o.id)) {
      const props = el("div", "lyprops");
      const t = transformSectionFor(o, host);
      if (t) props.appendChild(t);
      const stats = o.mesh.stats();
      props.appendChild(el("div", "hint", `頂点 ${stats.vertices} · エッジ ${stats.edges} · 面 ${stats.faces}`));
      wrap.appendChild(props);
    }
    body.appendChild(wrap);
  }
}

/** アウトライナの行を開いたときのトランスフォーム。数値だけ（`21` の 2.7 でパラメータは「追加」へ）。 */
function transformSectionFor(o: SceneObject, host: PanelHost): HTMLElement | null {
  const s = section("トランスフォーム", "TRANSFORM");
  tripleRow(s, "移動", o.transform.position as [number, number, number], 3, (axis, v) =>
    host.onTransformInput(o, "position", axis, v),
  );
  tripleRow(s, "スケール", o.transform.scale as [number, number, number], 3, (axis, v) =>
    host.onTransformInput(o, "scale", axis, v),
  );
  return s;
}

/**
 * アウトライナの行の操作（`19` の 3.3）。
 * タップで選択、ダブルタップで改名、長押しでメニュー、長押しのままドラッグで並び替え。
 */
function attachOutlinerRow(row: HTMLElement, o: SceneObject, host: PanelHost): void {
  let timer: ReturnType<typeof setTimeout> | null = null;
  let sx = 0;
  let sy = 0;
  let opened = false;
  let lastTap = 0;
  /** 長押しが成立して、並び替えを待っている状態。 */
  let holding = false;

  row.addEventListener("touchstart", (e) => e.preventDefault(), { passive: false });
  row.addEventListener("contextmenu", (e) => e.preventDefault());
  row.addEventListener("pointerdown", (e) => {
    sx = e.clientX;
    sy = e.clientY;
    opened = false;
    holding = false;
    if (e.pointerType === "mouse" && e.button === 2) {
      opened = true;
      host.onOutlinerMenu(o, e.clientX, e.clientY);
      return;
    }
    timer = setTimeout(() => {
      // まず並び替えを待つ。動かさずに離したらメニュー
      holding = true;
      row.classList.add("dragging");
    }, 420);
  });
  const stop = () => {
    if (timer !== null) clearTimeout(timer);
    timer = null;
  };
  row.addEventListener("pointermove", (e) => {
    if (!holding) {
      if (Math.hypot(e.clientX - sx, e.clientY - sy) > 12) stop();
      return;
    }
    // 掴んだまま上下に動かすと入れ替わる
    const list = row.parentElement?.parentElement;
    if (!list) return;
    const rows = [...list.querySelectorAll<HTMLElement>(".lyrow")];
    const from = rows.indexOf(row);
    const over = rows.findIndex((r) => {
      const b = r.getBoundingClientRect();
      return e.clientY >= b.top && e.clientY <= b.bottom;
    });
    if (over >= 0 && over !== from) {
      opened = true;
      host.onReorder(from, over);
    }
  });
  row.addEventListener("pointerup", (e) => {
    const wasHolding = holding;
    stop();
    row.classList.remove("dragging");
    holding = false;
    if (opened) return;
    if (wasHolding) {
      host.onOutlinerMenu(o, e.clientX, e.clientY);
      return;
    }
    const now = performance.now();
    if (now - lastTap < 400) {
      lastTap = 0;
      startRename(row, o, host);
      return;
    }
    lastTap = now;
    host.onSelect(o);
  });
  row.addEventListener("pointercancel", () => {
    stop();
    row.classList.remove("dragging");
    holding = false;
  });
}

function startRename(row: HTMLElement, o: SceneObject, host: PanelHost): void {
  const name = row.querySelector(".nm span");
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
