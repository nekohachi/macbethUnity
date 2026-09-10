/**
 * 右側のパネル。オプション（上）とアウトライナ（下）。
 *
 * オプションの中身は Maya と同じで、選択中のツールとオブジェクトによって
 * 入れ替わる。パラメトリックなプリミティブならそのパラメータが出る。
 */
import { PRIMITIVES } from "../../core/index.js";
import type { BakeMap, SceneObject } from "../../core/index.js";
import { el } from "./dom.js";
import { ICONS, iconSvg } from "./icons.js";
import { openRadial, type RadialMenu } from "./radial.js";
import type { ManipSpace } from "../state.js";

export interface PanelHost {
  /** スライダーを動かしている最中（履歴には積まない）。 */
  onParamInput(object: SceneObject, key: string, value: number): void;
  /** 離したとき。ここで履歴に積む。 */
  onParamCommit(object: SceneObject, label: string): void;
  onSoftChange(which: "strength" | "radius", value: number): void;
  /** 選択の拡張 / 縮小（`24` の T3）。バネ式なので begin → drag → end で呼ぶ。 */
  onGrow(phase: "begin" | "drag" | "end", n: number): void;
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
  /** 筆圧の効き方（`38` の T4）。 */
  onBrushChange(key: "pressureSize" | "pressureStrength", value: boolean): void;
  /* スカルプトレイヤー（`42` の T3） */
  onLayerAdd(): void;
  /** 記録先を選ぶ。`null` なら素のデルタ（レイヤーを使わない）。 */
  onLayerRecord(id: string | null): void;
  onLayerVisible(id: string, on: boolean): void;
  /** `commit` が偽ならスライダーを動かしている最中（履歴に積まない）。 */
  onLayerWeight(id: string, value: number, commit: boolean): void;
  onLayerDelete(id: string): void;
  /** 見えているレイヤーを素のデルタへ足し込んで 1 枚にする。 */
  onLayerMerge(): void;
  onBrushPowChange(key: "pressureSizePow" | "pressureStrengthPow", value: number): void;
  onSmoothAngleChange(value: number): void;
  onManipSizeChange(value: number): void;
  /** ベイク（`46` の T4）。 */
  onBakeSizeChange(size: number): void;
  onBakeMapChange(kind: BakeMap, on: boolean): void;
  onBakeSamplesChange(n: number): void;
  /** マニピュレータの軸の向き（`45` の T2）。 */
  onManipSpaceChange(space: ManipSpace): void;
  onUvMethodChange(method: "lscm" | "projection" | "none"): void;
  onUvSnapChange(key: "kind" | "step", value: string | number): void;
  onUvAutoChange(key: "angle" | "useHardEdges" | "useCreases" | "usePolygroups" | "symmetric", value: number | boolean): void;
  onUvAutoRun(): void;
  onUvPackingChange(key: "marginTexels" | "textureSize" | "allowRotate", value: number | boolean): void;
  /** カメラベース選択（`21` の 2.1）。 */
  onCameraBasedChange(on: boolean): void;
  /** 歪みを色で見る（`23` の T2）。 */
  onUvHeatChange(on: boolean): void;
  /**
   * チェッカーの細かさと模様（`23` の T3、`24` の T5）。
   * `cellsPreview` は数字だけ動かす（スライダーを引いている間）。
   * `cells` は控えた数でテクスチャを作り直す（離したとき）。
   */
  onCheckerChange(key: "cells" | "cellsPreview" | "pattern", value: number | string): void;
  /** 3D の表示（`23` の T6）。裏面を描かない / グリッド。 */
  onDisplayToggle(key: "cullBack" | "showGrid", on: boolean): void;
  /** 今のペインで選択したものだけ見せる（`27` の T3）。 */
  onIsolate(): void;
  /** アトリビュートの転送（`24` の T6）。 */
  onTransfer(key: "positions" | "uvs" | "space" | "swap" | "run", value?: boolean | string): void;
  /** 回転の刻み（度。0 でなし）。 */
  onRotateStepChange(deg: number): void;
  onPreventNegativeScaleChange(on: boolean): void;
  /** 移動で UV を保つ（`23` の T5）。 */
  onPreserveUvsChange(on: boolean): void;
  onPivotEditToggle(): void;
  onCamOptChange(key: "focal" | "near" | "far", value: number): void;
  onCamOrthoChange(on: boolean): void;
  /** カメラのロック（`25` の T5）。ロック中は視点が動かない。 */
  onCamLockChange(on: boolean): void;
  /** カメラを既定の設定へ戻す。 */
  onCamReset(): void;
  /** 「次に追加するプリミティブ」のパラメータ（`21` の 2.7）。 */
  onDefaultParamChange(kind: string, key: string, value: number): void;
  /** 行をタップ。`additive` は SHF（3D の Shift + クリックと同じ）。 */
  onSelect(object: SceneObject, additive?: boolean): void;
  onRename(object: SceneObject, name: string): void;
  /** アトリビュート欄の見出しをダブルタップ。行の入力を開く（`25` の T3）。 */
  onRenamePrompt(object: SceneObject): void;
  /** アトリビュート欄の置き場所（`26` の T4）。一覧の上か下か。 */
  onAttrDock(side: "top" | "bottom"): void;
  /** 不透明度（`25` の T4）。引いている間と、離したとき。 */
  onOpacityInput(object: SceneObject, value: number): void;
  onOpacityCommit(object: SceneObject): void;
  /** 行の長押しで出すサークルメニューの中身（`24` の T2）。 */
  outlinerMenu(object: SceneObject): RadialMenu;
  /** F を押しながらなぞったときの範囲選択。id の並びで、最後の 1 つが `selected` になる。 */
  onSelectRange(ids: string[]): void;
  /** クラスターの F を押している最中か（3D の矩形選択と同じ状態）。 */
  frameHeld(): boolean;
  /** SHF が効いているか（クラスターのラッチ、またはキーボード）。 */
  shiftHeld(e: PointerEvent): boolean;
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
    /** 行に付ける目印。他所から値をそろえたいときに使う（`25` の T4 の不透明度）。 */
    key?: string;
    format?: (v: number) => string;
    onInput: (v: number) => void;
    onCommit?: () => void;
  },
): void {
  const row = el("div", "row");
  if (options.key) row.dataset.param = options.key;
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

/** つまみの点 6 つ。アウトライナの行とアトリビュート欄で使い回す。 */
function gripDots(): string {
  return (
    '<svg viewBox="0 0 8 12" fill="currentColor" width="8" height="12">' +
    [
      [2, 2],
      [6, 2],
      [2, 6],
      [6, 6],
      [2, 10],
      [6, 10],
    ]
      .map(([cx, cy]) => `<circle cx="${cx}" cy="${cy}" r="1"/>`)
      .join("") +
    "</svg>"
  );
}

function checkbox(
  parent: HTMLElement,
  label: string,
  on: boolean,
  toggle: (v: boolean) => void,
): HTMLElement {
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
  return b;
}

export interface OptionsState {
  tool: string;
  selected: SceneObject | null;
  soft: { strength: number; radius: number };
  /** 拡張が効く状態か（コンポーネントを選んでいる）。 */
  canGrow: boolean;
  /** SHF で足した数（アトリビュート欄の見出しに出す）。 */
  alsoCount: number;
  /** アトリビュート欄の置き場所（`26` の T4）。 */
  attrDock: "top" | "bottom";
  /** 今のペインが「選択したものだけ」になっているか（`27` の T3）。 */
  isolate: boolean;
  cut: { snapStep: number; edgeFlow: boolean };
  /** その段のスカルプトレイヤー（`42` の T3）。 */
  layers: Array<{ id: string; name: string; weight: number; visible: boolean }>;
  /** 記録しているレイヤー（`null` なら素のデルタ）。 */
  activeLayer: string | null;
  /** レイヤーを使える状態か（スカルプトで段が 1 つ以上）。 */
  canLayer: boolean;
  /** いま見ている段。見出しに出す。 */
  activeLevel: number;
  /** ブラシの筆圧まわり（`38` の T4）。 */
  brush: {
    pressureSize: boolean;
    pressureStrength: boolean;
    pressureSizePow: number;
    pressureStrengthPow: number;
  };
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
  /** マニピュレータの軸の向き（`45` の T2）。 */
  manipSpace: ManipSpace;
  /** 焼き方（`46` の T4）。選んでいるオブジェクトのもの、無ければ既定。 */
  bake: { size: number; maps: readonly BakeMap[]; aoSamples: number };
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
  /** アトリビュートの転送（`24` の T6）。source / target は名前（決まらなければ null）。 */
  transfer: { positions: boolean; uvs: boolean; space: string; source: string | null; target: string | null };
  cam: { focal: number; near: number; far: number; ortho: boolean; locked: boolean };
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

  // 軸の向き（`45` の T2）。Maya の並びのまま。移動・回転・スケールで共通
  {
    const row = el("div", "row");
    row.appendChild(el("label", undefined, "種類"));
    const group = el("div", "segmented");
    for (const [space, text] of [
      ["object", "オブジェクト"],
      ["local", "ローカル"],
      ["world", "ワールド"],
      ["normal", "法線"],
    ] as const) {
      const b = el("button", "seg") as HTMLButtonElement;
      b.textContent = text;
      b.dataset.space = space;
      b.setAttribute("aria-pressed", String(state.manipSpace === space));
      b.addEventListener("click", () => host.onManipSpaceChange(space));
      group.appendChild(b);
    }
    row.appendChild(group);
    s.appendChild(row);
    s.appendChild(
      el(
        "div",
        "hint",
        "軸の向きです。ローカルは親の空間ですが、いまは親が無いのでオブジェクトと同じです。\n" +
          "法線は面・エッジ・頂点を選んだときの向き（青が法線）です。",
      ),
    );
  }

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

/**
 * 筆のカットイン（`38` の T4）。筆圧の効き方だけ。
 *
 * カーブは**数 1 つ**（`効き = 筆圧 ^ pow`）。点を打つ曲線の編集 UI は
 * タブレットで扱いにくいので作らない（`05` は「カーブで調整可能に」だが、
 * 数 1 つで足りる）。
 */
/**
 * ベイク（`46` の T4）。大きさと、焼く絵と、AO の本数。
 *
 * 大きさは `44` では長押しの輪に置いていたが、絵が 7 枚になって方位が足りない。
 */
export function bakeSection(state: OptionsState, host: PanelHost): HTMLElement {
  const s = section("ベイク", "BAKE");
  const bake = state.bake;

  const sizeRow = el("div", "row");
  sizeRow.appendChild(el("label", undefined, "大きさ"));
  const sizes = el("div", "segmented");
  for (const size of [1024, 2048, 4096]) {
    const b = el("button", "seg") as HTMLButtonElement;
    b.textContent = `${size / 1024}K`;
    b.dataset.size = String(size);
    b.setAttribute("aria-pressed", String(bake.size === size));
    b.addEventListener("click", () => host.onBakeSizeChange(size));
    sizes.appendChild(b);
  }
  sizeRow.appendChild(sizes);
  s.appendChild(sizeRow);

  s.appendChild(el("div", "minilbl", "焼く絵"));
  for (const [kind, label] of [
    ["normal", "法線"],
    ["height", "高さ"],
    ["curvature", "曲率"],
    ["position", "位置"],
    ["id", "ID"],
    ["ao", "AO（光線）"],
    ["thickness", "厚み（光線）"],
  ] as const) {
    const on = bake.maps.includes(kind);
    const row = checkbox(s, label, on, (v) => host.onBakeMapChange(kind, v));
    row.dataset.map = kind;
    // 法線と高さは土台なので外せない
    if (kind === "normal" || kind === "height") (row as HTMLButtonElement).disabled = true;
  }

  const aoRow = el("div", "row");
  aoRow.appendChild(el("label", undefined, "AO の本数"));
  const samples = el("div", "segmented");
  for (const n of [4, 8, 16, 32]) {
    const b = el("button", "seg") as HTMLButtonElement;
    b.textContent = String(n);
    b.setAttribute("aria-pressed", String(bake.aoSamples === n));
    b.addEventListener("click", () => host.onBakeSamplesChange(n));
    samples.appendChild(b);
  }
  aoRow.appendChild(samples);
  s.appendChild(aoRow);

  s.appendChild(
    el(
      "div",
      "hint",
      "AO と 厚みだけ光線を飛ばします（ハイの頂点ごと）。\n" +
        "本数を増やすほどなめらかになり、そのぶん遅くなります。\n" +
        "2K の法線 + 高さで 200MB ほど使います。4K はその 4 倍です。",
    ),
  );
  return s;
}

export function brushSection(state: OptionsState, host: PanelHost): HTMLElement {
  const s = section("筆圧", "PRESSURE");
  const b = state.brush;
  checkbox(s, "サイズに効かせる", b.pressureSize, (v) => host.onBrushChange("pressureSize", v));
  paramRow(s, {
    label: "サイズのカーブ",
    value: b.pressureSizePow,
    min: 0.25,
    max: 4,
    step: 0.25,
    format: (v) => (v === 1 ? "そのまま" : v < 1 ? `軽め ${v.toFixed(2)}` : `重め ${v.toFixed(2)}`),
    onInput: (v) => host.onBrushPowChange("pressureSizePow", v),
  });
  checkbox(s, "強さに効かせる", b.pressureStrength, (v) => host.onBrushChange("pressureStrength", v));
  paramRow(s, {
    label: "強さのカーブ",
    value: b.pressureStrengthPow,
    min: 0.25,
    max: 4,
    step: 0.25,
    format: (v) => (v === 1 ? "そのまま" : v < 1 ? `軽め ${v.toFixed(2)}` : `重め ${v.toFixed(2)}`),
    onInput: (v) => host.onBrushPowChange("pressureStrengthPow", v),
  });
  s.appendChild(
    el(
      "div",
      "hint",
      "効き = 筆圧 ^ カーブ。1 なら軽く触れただけで効き、\n大きいほど押し込まないと効きません。",
    ),
  );
  return s;
}

/**
 * スカルプトレイヤー（`42` の T3）。
 *
 * その段の効いている形は `素のデルタ + Σ(見えているレイヤー × 重み)`。
 * 「記録中」の 1 枚に彫った分が入る。素のデルタ（`—`）を選べば今までどおり。
 */
export function layerSection(state: OptionsState, host: PanelHost): HTMLElement {
  const s = section("スカルプトレイヤー", "LAYERS");
  if (!state.canLayer) {
    s.appendChild(el("div", "hint", "段を足すと使えます（段のボタンを長押し）。"));
    return s;
  }
  s.appendChild(el("div", "hint", `レベル ${state.activeLevel} のレイヤー`));

  /** 記録先の 1 行。押すとそこへ彫るようになる。 */
  const recordRow = (id: string | null, label: string) => {
    const b = el("button", "chk");
    b.dataset.layer = id ?? "base";
    b.setAttribute("aria-pressed", String(state.activeLayer === id));
    b.appendChild(el("i"));
    b.appendChild(el("span", undefined, label));
    b.addEventListener("click", () => host.onLayerRecord(id));
    return b;
  };

  const baseRow = el("div", "lyr");
  baseRow.appendChild(recordRow(null, "素のデルタ（レイヤーを使わない）"));
  s.appendChild(baseRow);

  for (const l of state.layers) {
    const row = el("div", "lyr");
    row.dataset.id = l.id;
    const head = el("div", "lyr-h");
    const eye = el("button", "chk eye");
    eye.setAttribute("aria-pressed", String(l.visible));
    eye.appendChild(el("i"));
    eye.appendChild(el("span", undefined, l.name));
    eye.addEventListener("click", () => host.onLayerVisible(l.id, !l.visible));
    head.appendChild(eye);
    const del = el("button", "act", "削除");
    del.addEventListener("click", () => host.onLayerDelete(l.id));
    head.appendChild(del);
    row.appendChild(head);
    row.appendChild(recordRow(l.id, "ここへ記録"));
    paramRow(row, {
      label: "重み",
      value: l.weight,
      min: 0,
      max: 2,
      step: 0.05,
      key: `layer:${l.id}`,
      format: (v) => v.toFixed(2),
      onInput: (v) => host.onLayerWeight(l.id, v, false),
      onCommit: () => host.onLayerWeight(l.id, l.weight, true),
    });
    s.appendChild(row);
  }

  const foot = el("div", "lyr-foot");
  const add = el("button", "act", "レイヤーを足す");
  add.addEventListener("click", () => host.onLayerAdd());
  foot.appendChild(add);
  if (state.layers.length) {
    const merge = el("button", "act", "統合");
    merge.addEventListener("click", () => host.onLayerMerge());
    foot.appendChild(merge);
  }
  s.appendChild(foot);
  s.appendChild(el("div", "hint", "効いている形 = 素のデルタ + Σ(見えているレイヤー × 重み)。\n重み 0 のレイヤーには記録しません。"));
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
    el(
      "div",
      "hint",
      "対称の長押しの「ミラー」で使う軸です（半分から丸ごと作る）。\n" +
        "境目の頂点は「マージ距離」で溶接します。\n" +
        "ボタンの入り切りで効く対称編集は X だけです。",
    ),
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

/**
 * バネ式の横スライダー（`24` の T3）。中央が 0 で、離すと中央へ戻る。
 * レールの「拡張」ゲージと同じもの。カットインからも触れるように置く。
 */
function springRow(
  parent: HTMLElement,
  options: {
    label: string;
    steps: number;
    enabled: boolean;
    begin(): void;
    drag(n: number): void;
    end(): void;
  },
): void {
  const row = el("div", "row");
  row.appendChild(el("label", undefined, options.label));
  const num = el("input", "num") as HTMLInputElement;
  num.type = "text";
  num.readOnly = true;
  num.value = "0";
  row.appendChild(num);

  const slider = el("input", "slider spring") as HTMLInputElement;
  slider.type = "range";
  slider.min = String(-options.steps);
  slider.max = String(options.steps);
  slider.step = "1";
  slider.value = "0";
  slider.disabled = !options.enabled;
  const reset = () => {
    slider.value = "0";
    num.value = "0";
  };
  slider.addEventListener("pointerdown", () => options.begin());
  slider.addEventListener("input", () => {
    const n = Number(slider.value);
    num.value = n > 0 ? `+${n}` : String(n);
    options.drag(n);
  });
  for (const t of ["pointerup", "pointercancel", "change"] as const) {
    slider.addEventListener(t, () => {
      options.end();
      reset();
    });
  }
  row.appendChild(slider);
  parent.appendChild(row);
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
  // 拡張はレールの第 2 ゲージと同じもの。強度が 0 のときはレールにも出る
  springRow(s, {
    label: "拡張",
    steps: 8,
    enabled: state.canGrow,
    begin: () => host.onGrow("begin", 0),
    drag: (n) => host.onGrow("drag", n),
    end: () => host.onGrow("end", 0),
  });
  s.appendChild(
    el(
      "div",
      "hint",
      "強度が 0 のときは、左レールの 2 本目が「拡張」になります。\n離すと中央へ戻ります（選択はそのまま）。",
    ),
  );
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
  // 細かさはスライダー（`24` の T5）。作り直しは離したときだけ（重いので）
  paramRow(s, {
    label: "細かさ",
    value: state.checker.cells,
    min: 2,
    max: 64,
    step: 1,
    format: (v) => `${Math.round(v)} マス`,
    onInput: (v) => host.onCheckerChange("cellsPreview", Math.round(v)),
    onCommit: () => host.onCheckerChange("cells", 0),
  });
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
  const s = section("シェーディング", "SHADING");
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
  // このペインで選択だけを見せる（Maya の Isolate Select。`27` の T3）
  checkbox(s, "選択したものだけ", state.isolate, () => host.onIsolate());
  // グリッドは上段の「表示」にも同じものがある（`24` の T4）
  checkbox(s, "グリッド", state.showGrid, (v) => host.onDisplayToggle("showGrid", v));
  checkbox(s, "歪みを色で（ヒートマップ）", state.uvHeat, (v) => host.onUvHeatChange(v));
  s.appendChild(
    el(
      "div",
      "hint",
      "長押しで ワイヤ / シェード / シェード + ワイヤ / スムース を選べます（4〜7）。\n「選択したものだけ」は今のペインにだけ効きます。分割していれば隣は元のまま。",
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

/**
 * アトリビュートの転送（`24` の T6）。元 → 先と、何を写すか。
 * 元は「SHF で足したもの」、先は「最後に選んだもの」（Maya と同じ順）。
 */
export function transferSection(state: OptionsState, host: PanelHost): HTMLElement {
  const s = section("アトリビュートの転送", "TRANSFER");
  const t = state.transfer;
  const head = el("div", "row");
  if (t.source && t.target) {
    head.appendChild(el("div", "attr-title", `${t.source} → ${t.target}`));
    const swap = el("button", "act", "⇄");
    swap.title = "元と先を入れ替える";
    swap.addEventListener("click", () => host.onTransfer("swap"));
    head.appendChild(swap);
  } else {
    head.appendChild(el("div", "hint", "元を 1 つ選んでください（SHF + タップで足す）"));
  }
  s.appendChild(head);

  checkbox(s, "位置", t.positions, (v) => host.onTransfer("positions", v));
  s.appendChild(el("div", "hint", "先の頂点を、元の面のいちばん近い点へ動かします。"));
  checkbox(s, "UV", t.uvs, (v) => host.onTransfer("uvs", v));

  const row = el("div", "row");
  row.appendChild(el("label", undefined, "空間"));
  const group = el("div", "segmented");
  for (const [key, label] of [
    // 「コンポーネント」では何のことか伝わらなかったので「頂点番号」に（`25` の T1）
    ["component", "頂点番号"],
    ["world", "ワールド"],
    ["local", "ローカル"],
  ] as const) {
    const b = el("button", "seg") as HTMLButtonElement;
    b.textContent = label;
    b.setAttribute("aria-pressed", String(t.space === key));
    b.addEventListener("click", () => host.onTransfer("space", key));
    group.appendChild(b);
  }
  row.appendChild(group);
  s.appendChild(row);

  const run = el("button", "act", "転送する") as HTMLButtonElement;
  run.disabled = !t.source || !t.target;
  run.addEventListener("click", () => host.onTransfer("run"));
  s.appendChild(run);
  s.appendChild(
    el(
      "div",
      "hint",
      "頂点番号は、番号でそのまま写します（分割が同じときだけ）。\nワールドは、先の頂点ごとに元の面のいちばん近い点から取ります。\n離して置いてあるものはローカルのほうが合います。",
    ),
  );
  return s;
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
  checkbox(s, "カメラをロック", state.cam.locked, (v) => host.onCamLockChange(v));
  s.appendChild(
    el("div", "hint", "ロック中はタンブル・パン・ズーム・フレーム・ビューの切り替えを受けません。\n選択とマニピュレータは今までどおり使えます。"),
  );
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
/**
 * アウトライナの上に出す「今の選択の値」（`25` の T3。Maya のチャンネルボックス）。
 *
 * 行の「>」で開く形をやめて、**いつも同じ場所に、選んでいるものの値**を出す。
 * 折りたたみの開閉は `opened` に覚える（呼び出し側が `localStorage` に残す）。
 */
export function attributeSection(state: OptionsState, host: PanelHost): HTMLElement {
  const wrap = el("div", "attrs");
  wrap.dataset.dock = state.attrDock;
  // つまみは選択の有無に関わらず出す（空でも置き場所は変えられる）
  const head = el("div", "attr-head");
  const grip = el("button", "attrgrip");
  grip.title = "ドラッグで一覧の上 / 下へ";
  grip.innerHTML = gripDots();
  attachAttrDock(grip, host);
  head.appendChild(grip);

  const o = state.selected;
  if (!o) {
    wrap.appendChild(head);
    wrap.appendChild(el("div", "empty", "オブジェクトを選ぶと、\nここに値が出ます"));
    return wrap;
  }

  const name = el("div", "attr-title", o.name);
  if (state.alsoCount) name.appendChild(el("span", undefined, `+${state.alsoCount}`));
  head.appendChild(name);
  head.addEventListener("dblclick", () => host.onRenamePrompt(o));
  wrap.appendChild(head);

  /**
   * 区画（`26` の T4）。折りたたまない。
   * 開け閉めを覚えるより、いつも同じ場所に同じ順で出ているほうが速い。
   */
  const fold = (_key: string, title: string, badge: string): HTMLElement => {
    const s = section(title, badge);
    wrap.appendChild(s);
    return s;
  };

  // トランスフォーム（移動 / 回転 / スケール）
  const t = fold("xform", "トランスフォーム", "TRANSFORM");
  const ts = section("", "");
  ts.firstElementChild?.remove();
  tripleRow(ts, "移動", o.transform.position as [number, number, number], 3, (axis, v) =>
    host.onTransformInput(o, "position", axis, v),
  );
  tripleRow(ts, "回転", state.rotationEuler, 1, (axis, v) => host.onTransformInput(o, "rotation", axis, v));
  tripleRow(ts, "スケール", o.transform.scale as [number, number, number], 3, (axis, v) =>
    host.onTransformInput(o, "scale", axis, v),
  );
  t.appendChild(ts);

  // 表示（不透明度・表示・ロック）
  const d = fold("show", "表示", "DISPLAY");
  const ds = el("div", "sect");
  paramRow(ds, {
    label: "不透明度",
    key: "opacity",
    value: o.opacity,
    min: 0,
    max: 1,
    step: 0.01,
    onInput: (v) => host.onOpacityInput(o, v),
    onCommit: () => host.onOpacityCommit(o),
  });
  checkbox(ds, "表示", o.visible, (v) => host.onVisible(o, v));
  checkbox(ds, "ロック", o.locked, (v) => host.onLock(o, v));
  d.appendChild(ds);

  // 入力ノード（パラメトリックのときだけ）
  if (o.parametric && PRIMITIVES[o.kind]) {
    const p = fold("input", "入力ノード", PRIMITIVES[o.kind].en.toUpperCase());
    const ps = el("div", "sect");
    for (const spec of PRIMITIVES[o.kind].params) {
      paramRow(ps, {
        label: spec.label,
        value: o.params[spec.key] ?? spec.value,
        min: spec.min,
        max: spec.max,
        step: spec.step,
        onInput: (v) => host.onParamInput(o, spec.key, v),
        onCommit: () => host.onParamCommit(o, `${spec.label} を変更`),
      });
    }
    p.appendChild(ps);
  }

  // メッシュの情報。区画にせず 1 行のヒントにする（`26` の T4）
  const stats = o.mesh.stats();
  wrap.appendChild(el("div", "hint attr-stats", `頂点 ${stats.vertices} · エッジ ${stats.edges} · 面 ${stats.faces}`));

  return wrap;
}

export function renderLayers(
  body: HTMLElement,
  objects: SceneObject[],
  selected: SceneObject | null,
  host: PanelHost,
  also: Set<SceneObject> = new Set(),
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
    // SHF で足したものも選択として光らせる。最後に選んだものだけ濃く（`24` の T2）
    row.setAttribute("aria-selected", String(o === selected || also.has(o)));
    if (o === selected) row.dataset.primary = "true";
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
    eye.title = o.visible ? "隠す（長押しで不透明度）" : "表示する（長押しで不透明度）";
    eye.innerHTML = iconSvg(o.visible ? ICONS.eye : ICONS.eyeOff);
    // 不透明度のぶんだけ薄くする。0 でも目は開いたままで、「非表示」と見分けがつく
    eye.style.opacity = String(0.4 + 0.6 * o.opacity);
    attachEyeOpacity(eye, o, host, o === selected);
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

    // 並び替えのつまみ。長押しはメニューに使うので、入れ替えはここからだけ（`24` の T2）
    const grip = el("button", "lygrip");
    grip.title = "ドラッグで並び替え";
    grip.innerHTML = gripDots();
    attachOutlinerGrip(grip, row, host);
    row.appendChild(grip);

    attachOutlinerRow(row, o, host);
    wrap.appendChild(row);
    body.appendChild(wrap);
  }
}

/**
 * アトリビュート欄のつまみ（`26` の T4）。
 *
 * 掴んで上下に運ぶと、欄が一覧の**上か下か**に移る。判定は「離した位置が
 * ドロワーの縦の中央より上か下か」。運んでいる間は欄を薄くして、落ちる側に
 * 線を出す（`.dropline`）。
 *
 * 欄は描き直しで入れ替わるので、掴んだ要素ではなく**ドロワーの矩形**で見る。
 */
function attachAttrDock(grip: HTMLElement, host: PanelHost): void {
  let pid: number | null = null;
  let drawer: HTMLElement | null = null;
  let attrs: HTMLElement | null = null;
  let line: HTMLElement | null = null;

  const listen = (on: boolean) => {
    const fn = on ? window.addEventListener : window.removeEventListener;
    fn("pointermove", onMove as EventListener);
    fn("pointerup", onUp as EventListener);
    fn("pointercancel", onUp as EventListener);
  };
  const sideAt = (clientY: number): "top" | "bottom" => {
    const r = drawer?.getBoundingClientRect();
    return !r || clientY < r.top + r.height / 2 ? "top" : "bottom";
  };
  const paint = (side: "top" | "bottom") => {
    if (!drawer) return;
    if (!line) {
      line = el("div", "dropline");
      drawer.appendChild(line);
    }
    line.dataset.side = side;
  };
  const onMove = (e: PointerEvent) => {
    if (e.pointerId !== pid) return;
    paint(sideAt(e.clientY));
  };
  const onUp = (e: PointerEvent) => {
    if (e.pointerId !== pid) return;
    pid = null;
    listen(false);
    attrs?.classList.remove("moving");
    line?.remove();
    line = null;
    host.onAttrDock(sideAt(e.clientY));
  };

  grip.addEventListener("pointerdown", (e) => {
    e.stopPropagation();
    e.preventDefault();
    pid = e.pointerId;
    drawer = grip.closest(".drawer");
    attrs = grip.closest(".attrs");
    attrs?.classList.add("moving");
    listen(true);
    paint(sideAt(e.clientY));
  });
}

/**
 * 目のアイコン（`25` の T4）。
 *
 * - タップ = 表示 / 非表示（今までどおり）
 * - **長押し（420ms）** = 行の上に横スライダーが出る。**指を離さずに左右**で不透明度。
 *   離すと閉じて履歴に 1 段
 *
 * スライダーは `document.body` に置く。行は描き直しで入れ替わるが、
 * ポップと購読はそれに巻き込まれない（つまみの並び替えと同じ考え方）。
 */
function attachEyeOpacity(eye: HTMLElement, o: SceneObject, host: PanelHost, primary: boolean): void {
  const HOLD_MS = HOLD_MS_ROW;
  const MOVE_PX = MOVE_PX_ROW;
  /** 端から端まで動かすのに要る距離。指 1 本ぶんの往復で 0〜1 になる。 */
  const SPAN_PX = 160;
  let timer: ReturnType<typeof setTimeout> | null = null;
  let pid: number | null = null;
  let sx = 0;
  let sy = 0;
  let base = 1;
  let pop: HTMLElement | null = null;
  let fill: HTMLElement | null = null;
  let label: HTMLElement | null = null;
  /** ポップを出した。離しても表示 / 非表示は切り替えない。 */
  let suppressClick = false;

  const listen = (on: boolean) => {
    const fn = on ? window.addEventListener : window.removeEventListener;
    fn("pointermove", onMove as EventListener);
    fn("pointerup", onUp as EventListener);
    fn("pointercancel", onUp as EventListener);
  };

  const show = (value: number) => {
    if (fill) fill.style.width = `${(value * 100).toFixed(1)}%`;
    if (label) label.textContent = `不透明度 ${Math.round(value * 100)}%`;
    eye.style.opacity = String(0.4 + 0.6 * value);
    pop?.setAttribute("data-value", value.toFixed(3));
    // アトリビュート欄が同じオブジェクトを出しているなら、そちらの数字も一緒に動かす
    if (!primary) return;
    const row = document.querySelector<HTMLElement>('.attrs .row[data-param="opacity"]');
    const num = row?.querySelector<HTMLInputElement>("input.num");
    const slider = row?.querySelector<HTMLInputElement>("input.slider");
    if (num) num.value = value.toFixed(2);
    if (slider) slider.value = String(value);
  };

  const open = () => {
    suppressClick = true;
    base = o.opacity;
    pop = el("div", "opacity-pop");
    label = el("div", "oplabel");
    const bar = el("div", "opbar");
    fill = el("div", "opfill");
    bar.appendChild(fill);
    pop.append(label, bar);
    document.body.appendChild(pop);
    // 行の上に出す。画面の外へはみ出さないよう左右だけ寄せる
    const r = eye.getBoundingClientRect();
    const w = 168;
    const left = Math.max(6, Math.min(window.innerWidth - w - 6, r.left + r.width / 2 - w / 2));
    pop.style.width = `${w}px`;
    pop.style.left = `${left}px`;
    pop.style.top = `${Math.max(6, r.top - 46)}px`;
    show(base);
  };

  const close = () => {
    pop?.remove();
    pop = fill = label = null;
  };

  const onMove = (e: PointerEvent) => {
    if (e.pointerId !== pid) return;
    if (pop) {
      const v = Math.max(0, Math.min(1, base + (e.clientX - sx) / SPAN_PX));
      host.onOpacityInput(o, v);
      show(v);
      return;
    }
    if (Math.hypot(e.clientX - sx, e.clientY - sy) > MOVE_PX && timer !== null) {
      clearTimeout(timer);
      timer = null;
    }
  };

  const onUp = (e: PointerEvent) => {
    if (e.pointerId !== pid) return;
    if (timer !== null) clearTimeout(timer);
    timer = null;
    pid = null;
    listen(false);
    if (pop) {
      close();
      host.onOpacityCommit(o);
    }
  };

  eye.addEventListener("contextmenu", (e) => e.preventDefault());
  // 長押しを待っている間と、スライダーを出している間はスクロールに渡さない
  // （`41` の T4。渡すと `pointercancel` が飛んできて途中で切れる）
  eye.addEventListener(
    "touchmove",
    (e) => {
      if (timer !== null || pop) e.preventDefault();
    },
    { passive: false },
  );
  eye.addEventListener("pointerdown", (e) => {
    // 行の選択・長押しメニューには渡さない
    e.stopPropagation();
    pid = e.pointerId;
    sx = e.clientX;
    sy = e.clientY;
    suppressClick = false;
    listen(true);
    timer = setTimeout(open, HOLD_MS);
  });
  eye.addEventListener("click", (e) => {
    e.stopPropagation();
    // 長押しで不透明度を触ったあとの離しは、表示 / 非表示にしない
    if (suppressClick) {
      suppressClick = false;
      return;
    }
    host.onVisible(o, !o.visible);
  });
}

/**
 * アウトライナの行の操作（`19` の 3.3、`24` の T2）。
 *
 * - タップ = 選択（SHF で足す / 外す）
 * - ダブルタップ = 名前の変更
 * - **長押し = その場にサークルメニュー**。指を離さずに方位へ引いて選べる
 * - **F を押しながらなぞる** = その間の行をまとめて選ぶ
 * - 縦のドラッグは一覧のスクロール（`touch-action: pan-y`）
 *
 * 並び替えは右端のつまみ（`attachOutlinerGrip`）に分けてある。前は長押しが
 * 並び替え待ちを兼ねていて、指が数 px 動くだけでメニューまで届かなかった。
 */
function attachOutlinerRow(row: HTMLElement, o: SceneObject, host: PanelHost): void {
  const HOLD_MS = HOLD_MS_ROW;
  const MOVE_PX = MOVE_PX_ROW;
  let timer: ReturnType<typeof setTimeout> | null = null;
  let sx = 0;
  let sy = 0;
  let pid: number | null = null;
  /** サークルメニューを出した。離しても選択はしない。 */
  let opened = false;
  /** F を押しながらのなぞり。 */
  let sweeping = false;
  let lastTap = 0;
  /** 一覧の入れ物。行と違って描き直しても残る。 */
  let listEl: HTMLElement | null = null;

  const cancel = () => {
    if (timer !== null) clearTimeout(timer);
    timer = null;
  };
  const listen = (on: boolean) => {
    const fn = on ? window.addEventListener : window.removeEventListener;
    fn("pointermove", onMove as EventListener);
    fn("pointerup", onUp as EventListener);
    fn("pointercancel", onUp as EventListener);
  };

  /**
   * 押し始めた行から、今指がある行までをまとめて選ぶ。
   *
   * 選ぶたびに一覧は描き直されて行の要素は入れ替わるので、
   * 掴んだ要素ではなく**一覧そのもの**と id を頼りに引き直す。
   */
  const sweepTo = (clientY: number): void => {
    const rows = rowsOf(listEl);
    if (!rows.length) return;
    const from = rows.findIndex((r) => r.dataset.id === o.id);
    if (from < 0) return;
    let to = rows.findIndex((r) => {
      const b = r.getBoundingClientRect();
      return clientY >= b.top && clientY <= b.bottom;
    });
    if (to < 0) to = clientY < rows[0].getBoundingClientRect().top ? 0 : rows.length - 1;
    const span = from <= to ? rows.slice(from, to + 1) : rows.slice(to, from + 1).reverse();
    // 最後の 1 つが `selected` になるので、指が今いる行を最後に置く
    host.onSelectRange(span.map((r) => r.dataset.id ?? "").filter(Boolean));
  };

  const onMove = (e: PointerEvent) => {
    if (e.pointerId !== pid) return;
    if (sweeping) {
      sweepTo(e.clientY);
      return;
    }
    if (Math.hypot(e.clientX - sx, e.clientY - sy) > MOVE_PX) cancel();
  };
  const onUp = (e: PointerEvent) => {
    if (e.pointerId !== pid) return;
    cancel();
    pid = null;
    listen(false);
    row.classList.remove("sweeping");
    const wasSweeping = sweeping;
    sweeping = false;
    // サークルメニューを開いていたら、決定はそちらが受け取る
    if (opened || wasSweeping) {
      opened = false;
      return;
    }
    // 動かして離したならスクロールだったので、選択は変えない
    if (Math.hypot(e.clientX - sx, e.clientY - sy) > MOVE_PX) return;
    const now = performance.now();
    if (now - lastTap < 400) {
      lastTap = 0;
      startRename(row, o, host);
      return;
    }
    lastTap = now;
    host.onSelect(o, host.shiftHeld(e));
  };

  row.addEventListener("contextmenu", (e) => e.preventDefault());
  // **長押しを待っている間と、輪が出ている間はスクロールに渡さない**（`41` の T4）。
  //
  // 一覧は `touch-action: pan-y` なので、輪を出したあとに指を動かすとブラウザが
  // 縦スクロールを始め、`pointercancel` が飛んで輪がその場（中心 = キャンセル）で
  // 閉じていた。実機の「長押しがキャンセル誤爆する」はこれ。
  //
  // 止められるのは**スクロールが始まる前**だけなので、待っている間から止める。
  // 待ちが `MOVE_PX` で消えたら止めるのもやめるので、指を滑らせればスクロールになる
  row.addEventListener(
    "touchmove",
    (e) => {
      if (timer !== null || opened || sweeping) e.preventDefault();
    },
    { passive: false },
  );
  row.addEventListener("pointerdown", (e) => {
    // つまみ・目・ロック・「>」の上なら、行の操作は始めない
    if ((e.target as HTMLElement).closest("button")) return;
    pid = e.pointerId;
    sx = e.clientX;
    sy = e.clientY;
    opened = false;
    sweeping = false;
    listEl = row.closest(".pbody");
    listen(true);
    if (host.frameHeld()) {
      // F を押しながら = なぞって範囲選択。スクロールに取られないように止める
      e.preventDefault();
      sweeping = true;
      row.classList.add("sweeping");
      sweepTo(e.clientY);
      return;
    }
    if (e.pointerType === "mouse" && e.button === 2) {
      opened = true;
      openRadial(host.outlinerMenu(o), e.clientX, e.clientY);
      return;
    }
    timer = setTimeout(() => {
      opened = true;
      openRadial(host.outlinerMenu(o), sx, sy);
    }, HOLD_MS);
  });
}

/**
 * アウトライナの行を長押しと見なすまで（`41` の T4）。
 *
 * 420ms は長すぎて、待っている間に指が 12px 動いて消えることが多かった。
 * ツール列の 200ms と、名前の変更に使うダブルタップの 400ms の間に置く。
 */
const HOLD_MS_ROW = 320;
/** その間に動いてよい距離。タブレットの指は 12px では足りなかった。 */
const MOVE_PX_ROW = 20;

/** 一覧の中の行を、上から順に。 */
function rowsOf(list: HTMLElement | null): HTMLElement[] {
  return list ? [...list.querySelectorAll<HTMLElement>(".lyrow")] : [];
}

/**
 * 並び替えのつまみ。掴んで上下に動かすと行が入れ替わる（`24` の T2）。
 *
 * 入れ替えるたびに一覧は描き直されるので、掴んだ要素は途中で無くなる。
 * 追いかけるのは id で、購読は `window` に置く。
 */
function attachOutlinerGrip(grip: HTMLElement, row: HTMLElement, host: PanelHost): void {
  let pid: number | null = null;
  let listEl: HTMLElement | null = null;
  const id = row.dataset.id ?? "";

  const listen = (on: boolean) => {
    const fn = on ? window.addEventListener : window.removeEventListener;
    fn("pointermove", onMove as EventListener);
    fn("pointerup", onUp as EventListener);
    fn("pointercancel", onUp as EventListener);
  };
  const onMove = (e: PointerEvent) => {
    if (e.pointerId !== pid) return;
    const rows = rowsOf(listEl);
    const from = rows.findIndex((r) => r.dataset.id === id);
    const over = rows.findIndex((r) => {
      const b = r.getBoundingClientRect();
      return e.clientY >= b.top && e.clientY <= b.bottom;
    });
    if (from >= 0 && over >= 0 && over !== from) host.onReorder(from, over);
  };
  const onUp = (e: PointerEvent) => {
    if (e.pointerId !== pid) return;
    pid = null;
    listen(false);
    for (const r of rowsOf(listEl)) r.classList.remove("dragging");
  };

  grip.addEventListener("touchstart", (e) => e.preventDefault(), { passive: false });
  grip.addEventListener("pointerdown", (e) => {
    e.preventDefault();
    e.stopPropagation();
    pid = e.pointerId;
    listEl = row.closest(".pbody");
    listen(true);
    row.classList.add("dragging");
  });
}

/**
 * その行の名前を入力に変える（サークルメニューの「名前変更」から。`24` の T2）。
 * 行が出ていなければ何もしない。
 */
export function renameInOutliner(body: HTMLElement, object: SceneObject, host: PanelHost): void {
  const row = body.querySelector<HTMLElement>(`.lyrow[data-id="${CSS.escape(object.id)}"]`);
  if (row) startRename(row, object, host);
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
