/**
 * アプリ本体。状態・描画・入力・保存をつなぐ。
 *
 * プロトタイプ（prototype/modeling-ui-prototype.html）からの移植途中。
 * 移植が済んだ順に、ここへ機能が増えていく。docs/10 の土台フェーズ。
 */
import { Euler, Matrix4, Plane, Quaternion, Raycaster, Vector3 } from "three";
import {
  PRIMITIVES,
  PRIMITIVE_ORDER,
  UV_SET,
  bridgeEdges,
  defaultParams,
  cloneTransform,
  combineMeshes,
  rebuildRecipeFor,
  recipeFromMesh,
  transferAttributes,
  transformPoint,
  type SampleSpace,
  recompute,
  type CameraBookmark,
  connectEdges,
  connectVertices,
  duplicateFaces,
  extractFaces,
  mirrorMesh,
  separateShells,
  dissolveVertices,
  extrudeVertices,
  mergeByDistance,
  collapseFaces,
  compact,
  deleteFaces,
  dissolveEdges,
  extrudeEdges,
  extrudeFaces,
  preserveUvs,
  recordPreserved,
  slideRails,
  slideVertices,
  type PreserveBefore,
  weldVertices,
  parseObj,
  subdivide,
  estimateLevelBytes,
  reconcile,
  nodesFromObjects,
  writeGlb,
  writeObj,
  type Mesh,
  type SceneObject,
} from "../core/index.js";
import {
  GestureRouter,
  TAP_DURATION,
  TAP_MOVE,
  TOOL_MOVE,
  type GestureDelta,
  type GestureHandlers,
} from "./input/gestures.js";
import { Picker, type ScreenPoint } from "./render/picking.js";
import { asMb, canAddLevel, estimateBytes, facesAt, fitBrushRadius, levelCount, levelsOf, warmUpLevels } from "./levels.js";
import { forgetStamps, stampsFor } from "./stamps.js";
import { STANDARD_VIEWS, Viewport, type LayoutKind, type ViewName } from "./render/viewport.js";
import {
  AXES,
  HANDLE_GESTURE,
  HANDLE_TWEAK,
  Manipulator,
  TOUCH_TOLERANCE,
  handleKind,
  rayAxisT,
} from "./render/manipulator.js";
import {
  AppState,
  type CompMode,
  type Display,
  type EditKind,
  type Manip,
  type Mode,
  type SnapKind,
  type UvCutKind,
} from "./state.js";
import { History } from "./history.js";
import { Autosave } from "./storage/autosave.js";
import { openFile, saveAs, saveMethodLabel } from "./storage/files.js";
import { BevelTool } from "./tools/bevel.js";
import { MultiCut } from "./tools/multicut.js";
import { Preselect } from "./tools/preselect.js";
import { Selector } from "./tools/select.js";
import { mirrorPairs, softWeights } from "./tools/softSelect.js";
import {
  applyGestureTransform,
  tiltAbout,
  beginDrag,
  updateDrag,
  type DragState,
  type DragTarget,
} from "./tools/transform.js";
import { applyTransform } from "./render/meshView.js";
import { Docking, type Zone } from "./ui/docking.js";
import { Layout } from "./ui/layout.js";
import { byId, el } from "./ui/dom.js";
import { Gauge } from "./ui/gauges.js";
import { Hud } from "./ui/hud.js";
import {
  bevelSection,
  bridgeSection,
  cameraSection,
  connectSection,
  displaySections,
  extrudeSection,
  manipulatorSection,
  mirrorSection,
  multicutSection,
  panelShell,
  primitiveSection,
  renderLayers,
  attributeSection,
  renameInOutliner,
  selectSection,
  snapSection,
  softSelectSection,
  transferSection,
  transformSection,
  uvSnapSection,
  uvUnfoldSection,
  vertexSection,
  type OptionsState,
  type PanelHost,
} from "./ui/panels.js";
import { STUBS, buildStub } from "./ui/stubs.js";
import type { CheckerPattern } from "./render/checker.js";
import { measureFaceHeat } from "./uv/heat.js";
import { UvMode, type UvSplit, type UvUnit } from "./uv/uvMode.js";
import { ICONS, iconSvg } from "./ui/icons.js";
import {
  DIRECTIONS,
  attachRadialButton,
  closeRadial,
  openRadial,
  type RadialItem,
  type RadialMenu,
} from "./ui/radial.js";

const COMP_MODES: Array<{ id: CompMode; label: string; key: string }> = [
  { id: "object", label: "オブジェクト", key: "F8" },
  { id: "vertex", label: "頂点", key: "F9" },
  { id: "edge", label: "エッジ", key: "F10" },
  { id: "face", label: "フェース", key: "F11" },
];

/** スナップの行き先の名前。HUD とオプションで使う。 */
/** マニピュレータの大きさの上下限と 1 段の倍率（Maya の + / − と同じ感覚）。 */
const MANIP_SIZE_MIN = 0.5;
const MANIP_SIZE_MAX = 2;
const MANIP_SIZE_STEP = 1.25;

function readManipSize(): number {
  const raw = Number(localStorage.getItem("macbeth.manipSize"));
  if (!Number.isFinite(raw) || raw <= 0) return 1;
  return Math.min(MANIP_SIZE_MAX, Math.max(MANIP_SIZE_MIN, raw));
}

const SNAP_LABEL: Record<SnapKind, string> = {
  grid: "グリッド",
  vertex: "頂点",
  edge: "カーブ / エッジ",
  surface: "サーフェス",
};

const DISPLAY_KEYS: Record<string, Display> = {
  "4": "wire",
  "5": "shaded",
  "6": "shadedWire",
  "7": "smooth",
  "8": "checker",
  "9": "heat",
};

const MODE_LABELS: Record<Mode, string> = {
  model: "モデリング",
  uv: "UV",
  sculpt: "スカルプト",
  material: "マテリアル",
};

/** モードの並びと英語名。ドロップダウンに出す（`23` の T1）。 */
const MODE_ORDER: Array<{ id: Mode; en: string; icon: string }> = [
  { id: "model", en: "Modeling", icon: ICONS.mModel },
  { id: "uv", en: "UV Editor", icon: ICONS.mUV },
  { id: "sculpt", en: "Sculpt", icon: ICONS.mSculpt },
  { id: "material", en: "Material", icon: ICONS.mMaterial },
];

const COMP_ICONS: Record<CompMode, string> = {
  object: ICONS.vObj,
  vertex: ICONS.vVert,
  edge: ICONS.vEdge,
  face: ICONS.vFace,
};

/** ツール列の 1 項目。モードごとの定義をこの並びで持つ。 */
/**
 * ツール列の 1 項目（`21`）。ボタンは 1 つ = 1 グループ。
 *
 * - **長押し** … `radial` のサークルメニューで中身を選ぶ
 * - **タップ** … `onTap` で今の中身を有効にし、`options` があれば横にカットイン
 * - **アイコン** … `icon()` は今の中身のもの。中身が変わると切り替わる
 */
type ToolEntry =
  | { kind: "label"; text: string }
  | { kind: "separator" }
  | {
      kind: "button";
      /** グループの名前。ボタンを描き直したあとに探し直すのに使う。 */
      id: string;
      /** 固定のアイコンか、今の中身から決めるもの。 */
      icon: string | (() => string);
      title: string;
      /** 押されている状態を tool / compMode と照合して出す。 */
      tool?: string;
      compMode?: CompMode;
      /** ツールでもコンポーネントモードでもない、独自のオン / オフ（スナップなど）。 */
      pressed?: () => boolean;
      /** アイコンの隅に出す小さな印（カメラのロックなど。`25` の T5）。 */
      badge?: () => string;
      /** 長押しのサークルメニュー。 */
      radial?: () => RadialMenu;
      /** 輪の下に並べる一覧（カメラの控え）。 */
      radialList?: () => RadialItem[];
      /** タップで出すカットインの中身。無ければ出さない。 */
      options?: () => HTMLElement[];
      onTap: (button: HTMLElement) => void;
    };

/** 「変形」グループのアイコン。今のマニピュレータで切り替わる。 */
const MANIP_ICONS: Record<Manip, string> = {
  all: ICONS.xform,
  move: ICONS.move,
  rotate: ICONS.rotate,
  scale: ICONS.scale,
};

/** 「編集」グループの中身（`21` の 2.3）。 */
const EDIT_ICONS: Record<EditKind, string> = {
  multicut: ICONS.multicut,
  bevel: ICONS.scale,
  bridge: ICONS.vEdge,
  extrude: ICONS.extrude,
  connect: ICONS.vMulti,
  weld: ICONS.vVert,
};

const EDIT_LABELS: Record<EditKind, string> = {
  multicut: "マルチカット",
  bevel: "ベベル",
  bridge: "ブリッジ",
  extrude: "押し出し",
  connect: "接続",
  weld: "ターゲットウェルド",
};

/** スナップの行き先ごとのアイコン。 */
const SNAP_ICONS: Record<SnapKind, string> = {
  grid: ICONS.snap,
  vertex: ICONS.vVert,
  edge: ICONS.vEdge,
  surface: ICONS.vFace,
};

/** シェーディングごとのアイコン。 */
/** 3 本指のひねりの刻み（度。`26` の T1）。マニピュレータの刻みとは別。 */
const TWIST_STEP_DEG = 5;

/**
 * その頂点たちに触る面の、すべてのコーナー番号（`29` の B-T4）。
 * Preserve UVs で書き換わるのはこの範囲なので、履歴の差分もここだけ控える。
 */
function cornersAround(mesh: Mesh, verts: Iterable<number>): number[] {
  const faces = mesh.vertexFaces();
  const seen = new Set<number>();
  const out: number[] = [];
  for (const v of verts) {
    for (const f of faces.get(v) ?? []) {
      if (seen.has(f)) continue;
      seen.add(f);
      for (let i = mesh.faceOffsets[f]; i < mesh.faceOffsets[f + 1]; i++) out.push(i);
    }
  }
  return out;
}

/** 分割のアイコンと名前（`25` の T6）。 */
const LAYOUT_ICONS: Record<LayoutKind, string> = {
  single: ICONS.layout1,
  cols: ICONS.layoutCols,
  rows: ICONS.layoutRows,
  quad: ICONS.layoutQuad,
};

const LAYOUT_LABEL: Record<LayoutKind, string> = {
  single: "1 画面",
  cols: "2 画面（左右）",
  rows: "2 画面（上下）",
  quad: "4 画面",
};

const DISPLAY_ICONS: Record<Display, string> = {
  wire: ICONS.wire,
  shaded: ICONS.shaded,
  shadedWire: ICONS.shadedWire,
  smooth: ICONS.smooth,
  checker: ICONS.mUV,
  heat: ICONS.heat,
};

/** カット / ソーのグループのアイコン（`24` の T5）。 */
const UV_CUT_ICONS: Record<UvCutKind, string> = {
  cut: ICONS.multicut,
  moveSew: ICONS.vEdge,
  sew: ICONS.vVert,
};

const PRIMITIVE_ICONS: Record<string, string> = {
  cube: ICONS.pCube,
  sphere: ICONS.pSphere,
  cylinder: ICONS.pCylinder,
  cone: ICONS.pCone,
  torus: ICONS.pTorus,
  plane: ICONS.pPlane,
  disk: ICONS.pDisk,
  platonic: ICONS.pPlatonic,
};

export class App {
  readonly state = new AppState();
  readonly history = new History(this.state);
  /** ベンチ画面（`30` の T1）と通し確認から触る。 */
  readonly viewport: Viewport;
  private picker: Picker;
  private selector: Selector;
  private autosave = new Autosave(this.state);
  private hud = new Hud(this.state);
  private gauges: Gauge[] = [];
  private marqueeEl = byId("marquee");
  private marquee: { x0: number; y0: number; x1: number; y1: number } | null = null;
  private popup: HTMLElement | null = null;
  /** ポップアップを出したボタン。外を押したときの判定から除く。 */
  private popupAnchor: HTMLElement | null = null;
  /** 2D ↔ 3D の選択を写している最中。行ったり来たりを止める。 */
  private syncingSelection = false;
  private router: GestureRouter;
  private manipulator: Manipulator;
  private multicut: MultiCut;
  private preselect: Preselect;
  private bevel = new BevelTool();
  /** ターゲットウェルドの相手。ドラッグ中に近づいた頂点。 */
  private weldTarget: number | null = null;
  /** 3 本指の変形。ジェスチャ中だけ生きている。 */
  private gestureDrag: DragState | null = null;
  /** UV モード。最初に入ったときに作る。 */
  uv: UvMode | null = null;
  /** 2D に今出ているオブジェクト。選択が変わったら入れ替える（`25` の T1）。 */
  private uvObject: SceneObject | null = null;
  /** 通し確認からオプションの操作を叩くための入口。 */
  /** 通し確認からピッキングを直に確かめる。 */
  pickerForTest(): Picker {
    return this.picker;
  }

  /** 通し確認から利き手を切り替える（本物の経路は「表示」の「左利き」）。 */
  applyHandForTest(): void {
    this.applyHand();
  }

  /** 通し確認から分割を変える（本物の経路は「分割」ボタン）。 */
  setLayoutForTest(kind: LayoutKind): void {
    this.setLayout(kind);
  }

  /**
   * 通し確認から段を操作する（本物の経路は「段」ボタンのタップと長押し）。
   * `32` の T3。
   */
  runEditForTest(kind: EditKind): void {
    this.activateEdit(kind, true);
  }

  /**
   * ブラシの半径を、選んでいるオブジェクトの大きさに合わせる（`33` の T1）。
   *
   * 半径はワールド単位なので、初期値をオブジェクトから決めないと、小さい像では
   * 全体が一撃で動き、大きい像では何も起きない。**一度合わせたら覚える**ので、
   * 同じオブジェクトでは呼び直さない（ユーザーが決めた値を消さないため）。
   */
  private fitBrushToSelection(): void {
    const o = this.state.selected;
    if (!o || this.brushFittedFor === o.id) return;
    this.brushFittedFor = o.id;
    this.state.brush.radius = fitBrushRadius(o);
    for (const g of this.gauges) g.paint();
  }

  /** ブラシの半径を合わせ済みのオブジェクト。 */
  private brushFittedFor: string | null = null;

  /** 通し確認から指紋を見る（`32` の T4。S3 のベイクが使う入口）。 */
  stampsForTest(): { topology: string; base: string; high: string; uv: string } | null {
    const o = this.state.selected;
    return o ? stampsFor(this.history, o) : null;
  }

  async levelForTest(what: "add" | "up" | "down" | "dropAbove" | "burn"): Promise<void> {
    if (what === "add") await this.addLevel();
    else if (what === "up") await this.goLevel((this.state.selected?.activeLevel ?? 0) + 1);
    else if (what === "down") await this.goLevel((this.state.selected?.activeLevel ?? 0) - 1);
    else if (what === "dropAbove") this.dropAboveLevel();
    else this.burnDownLevel();
  }

  panelHostForTest(): PanelHost {
    return this.panelHost();
  }

  /** 通し確認からクラスターの F の押下を真似るための入口（`24` の T2）。 */
  setFrameHeldForTest(on: boolean): void {
    this.fHeld = on;
    if (!on) this.fChord = false;
  }

  /** 通し確認から選択の同期を叩くための入口。 */
  pushSelectionToUvForTest(): void {
    this.pushSelectionToUv();
  }
  private uvSplit: UvSplit = "both";
  /** 3 本指のジェスチャ中に固定しておくカメラ由来の値。 */
  private gestureView: {
    pixelToWorld: number;
    horizontal: Vector3;
    /** ひねりの軸（`26` の T1）。視線にいちばん近いワールド軸。開始時に決めて固定。 */
    viewAxis: { name: string; dir: Vector3 };
  } | null = null;
  /** 3 本指のひねりの角度を出す小さな札（`26` の T1）。 */
  private twistPop: HTMLElement | null = null;
  /** 3 本指の変形を履歴に積むときの名前。中身が決まった時点で変わる。 */
  private gestureLabel = "変形";
  private gestureMoved = false;
  /** ベベル確定後、オプションで作り直すための控え。 */
  private bevelSnapshot: ReturnType<History["snapshot"]> | null = null;
  private docking: Docking;
  private layout: Layout;
  /** パネルの置き場所。移したら覚えて、次に開いたときに戻す。 */
  private zones: Record<string, Zone> = { tools: "left" };
  private toolPanelBody: HTMLElement | null = null;
  private outlinerBody: HTMLElement | null = null;
  /** アトリビュート欄で開いている区画（`25` の T3）。 */
  /** アトリビュート欄の置き場所（`26` の T4）。`localStorage` に残す。 */
  private attrDock: "top" | "bottom" = "top";
  /** サムネイルの控え。開いたときに作って、形が変わるまで使い回す。 */
  private thumbs = new Map<string, { url: string; stamp: string }>();
  /** アウトライナのドロワー。 */
  private drawer: HTMLElement | null = null;
  private layersPanel: HTMLElement | null = null;
  /** スライダーを触り始めたときの状態。離したときに履歴へ積む。 */
  private paramSnapshot: ReturnType<History["snapshot"]> | null = null;
  /** スライダーを指で掴んでいる最中か。掴んでいる間はパネルを描き直さない。 */
  private sliderDrag = false;
  /** 不透明度を引いている間の控え（`25` の T4）。離したときに履歴へ積む。 */
  private opacitySnapshot: ReturnType<History["snapshot"]> | null = null;
  /** 「拡張」ゲージを引き始めたときの選択（`24` の T3）。 */
  private growBase: number[] | null = null;
  private drag: DragState | null = null;
  /**
   * ペンと指で掴んだが、まだ動きが確かでないもの（docs/17 の 3 章）。
   * ここに居る間はメッシュもピボットも触らないので、離せばただのタップになる。
   */
  private pendingDrag: {
    handle: number;
    point: ScreenPoint;
    t0: number;
    shift: boolean;
    ctrl: boolean;
  } | null = null;
  /** スライド中の控え（SHF + CTL + 移動）。 */
  private slideDrag: {
    base: Float32Array;
    rails: Map<number, number[]>;
    railScreen: Map<number, ScreenPoint[]>;
    anchor: number;
    start: ScreenPoint;
    mirror: Array<[number, number]>;
  } | null = null;
  /** ピボットだけを動かしているときの控え（Maya の D）。 */
  private pivotDrag: {
    axis: number;
    origin: Vector3;
    plane: Plane;
    planeStart: Vector3 | null;
    t0: number;
  } | null = null;
  /** ドラッグ開始前のスナップショット。動いたときだけ履歴に積む。 */
  private dragSnapshot: ReturnType<History["snapshot"]> | null = null;
  /**
   * UV を保つ（`23` の T5）。コンポーネントの移動の間だけ生きている。
   * 動かす前の座標と UV を控えて、動かすたびに UV を貼り直す。
   */
  private preserve: { object: SceneObject; before: PreserveBefore; verts: number[] } | null = null;
  private raycaster = new Raycaster();

  constructor() {
    const vp = byId("pane3d");
    const canvas = byId<HTMLCanvasElement>("gl");
    this.viewport = new Viewport(vp, canvas, this.state);
    this.picker = new Picker(this.viewport, vp);
    // カメラベース選択（`21` の 2.1）。picking は状態を持たないので、ここから覗かせる
    this.picker.cameraBased = () => this.state.cameraBased;
    this.selector = new Selector(this.state, this.picker, (id) => {
      const o = this.state.doc.find(id);
      return o ? this.viewport.viewOf(o) : undefined;
    });

    this.multicut = new MultiCut(this.state, this.picker, this.viewport.preview);
    this.preselect = new Preselect(this.state, this.picker, this.viewport.preselect);

    // ソフト選択の影響範囲をオーバーレイに出すため、重みの求め方を渡しておく
    // 切れ目は 3D にも出す（どこで切れているか分かるように）
    this.viewport.seamProvider = () => this.state.selected?.uv?.seams ?? null;
    this.viewport.softWeightsProvider = () => {
      const o = this.state.selected;
      if (!o) return new Map();
      return softWeights(o.mesh, this.selector.selectedVertices(), {
        strength: this.state.soft.strength,
        radius: this.state.soft.radius,
        enabled: true,
      }).weights;
    };

    this.manipulator = new Manipulator({
      // 座標はペインの中のもの（`25` の T6）。分割していなければ今までと同じ
      toScreen: (v) => {
        const p = v.clone().project(this.viewport.camera);
        const rect = this.viewport.paneRect(this.viewport.inputPane);
        return {
          x: ((p.x + 1) / 2) * (rect.w || 1),
          y: ((-p.y + 1) / 2) * (rect.h || 1),
          z: p.z,
        };
      },
      camera: () => this.viewport.camera,
      orthoDistance: () => (this.state.camOpts.ortho ? this.viewport.cam.distance : null),
      manipSize: () => this.state.manipSize,
      pivotEdit: () => this.state.pivotEdit,
    });
    this.state.manipSize = readManipSize();
    this.viewport.manip.add(this.manipulator.group);

    this.history.onChange = () => {
      this.updateHistoryButtons();
      this.autosave.schedule();
    };
    this.autosave.onSaved = (at) =>
      this.hud.setSaveNote(`自動保存 ${new Date(at).toLocaleTimeString("ja-JP", { timeStyle: "short" })}`);
    this.autosave.onError = (m) => this.hud.toast(m);
    // 自動保存にも分割と各ペインのカメラを載せる（`25` の T6）
    this.autosave.beforeSave = () => {
      this.state.doc.layout = this.viewport.saveLayout();
    };

    // 触ったペインがアクティブになる（`25` の T6）。ルータより先に受けたいので
    // キャプチャで拾う。指を離すまでは入力のペインを固定する
    canvas.addEventListener(
      "pointerdown",
      (e) => {
        const was = this.viewport.active;
        this.viewport.inputLocked = false;
        this.viewport.setActive(this.viewport.paneAtClient(e.clientX, e.clientY));
        this.viewport.inputLocked = true;
        // ペインが変わったら、シェードのアイコンと HUD をそのペインのものにする
        if (was !== this.viewport.active) {
          this.renderToolColumn();
          this.hud.refreshStats();
          this.viewport.applyDisplayAll();
        }
      },
      true,
    );
    for (const type of ["pointerup", "pointercancel"] as const) {
      canvas.addEventListener(type, () => {
        this.viewport.inputLocked = false;
      });
    }

    this.router = new GestureRouter(canvas, (e) => this.picker.local(e), this.gestureHandlers());
    this.router.attach();
    this.docking = new Docking(byId("stage"), {
      onZoneChange: (key, zone) => {
        this.zones[key] = zone;
        localStorage.setItem("macbeth.panelZones", JSON.stringify(this.zones));
      },
      onMessage: (text) => this.hud.toast(text),
      onLayoutChange: () => {
        this.syncDockCol();
        this.layout?.apply();
        this.viewport.resize();
      },
    });
    try {
      const saved = localStorage.getItem("macbeth.panelZones");
      if (saved) this.zones = { ...this.zones, ...(JSON.parse(saved) as Record<string, Zone>) };
    } catch {
      /* 保存が壊れていても既定の配置で始める */
    }
    this.restoreSettings();
    this.buildToolDock();
    this.buildPanels();
    this.layout = new Layout(byId("stage"), byId("dockColRight"), () => {
      this.placeLayers();
      this.viewport.resize();
    });
    this.placeLayers();
    this.buildGauges();
    this.buildCluster();
    this.bindKeyboard();
    this.bindTopBar();

    // 「拡張」ゲージ（`24` の T3）。控えた選択から段数ぶん広げ直す
    this.state.growHooks = {
      begin: () => {
        this.growBase = [...this.state.comp];
      },
      drag: (n) => {
        if (!this.growBase) return;
        const r = this.selector.growOrShrinkFrom(this.growBase, n);
        if (!r.changed) return;
        this.viewport.applyDisplayAll();
        this.viewport.rebuildOverlay();
        this.refreshManipulator();
        this.hud.refreshStats();
        this.pushSelectionToUv();
      },
      end: () => {
        this.growBase = null;
      },
    };

    // スライダーを掴んでいる間はパネルを描き直さない（`refresh` が見る）
    document.addEventListener(
      "pointerdown",
      (e) => {
        if ((e.target as HTMLElement | null)?.classList?.contains("slider")) this.sliderDrag = true;
      },
      true,
    );
    for (const t of ["pointerup", "pointercancel"] as const) {
      window.addEventListener(t, () => {
        this.sliderDrag = false;
      });
    }

    this.watchSize();
    this.viewport.resize();
    this.viewport.start();
  }

  /** 起動。前回の続きがあれば復元し、無ければ立方体を 1 つ置く。 */
  async boot(): Promise<void> {
    const restored = await this.autosave.restore();
    if (!restored) this.state.doc.addObject("cube");
    this.state.select(this.state.doc.objects[0] ?? null);
    // 前回の分割とペインごとのカメラを戻す（`25` の T6）
    if (restored && this.state.doc.layout) this.viewport.restoreLayout(this.state.doc.layout);
    this.viewport.syncAll();
    // 前回の表示の設定を反映する（`23` の T6、`24` の T4、`29` の A-T1）
    this.applyHand();
    this.applyClusterPos();
    this.viewport.setGridVisible(this.state.showGrid);
    this.viewport.applyCulling();
    // 起動時の画角はプロトタイプと同じ既定値のまま。F を押せば選択に寄る
    this.refresh();
    this.hud.defaultHint();
    if (restored) this.hud.toast("前回の続きを復元しました");
    else this.hud.setSaveNote(saveMethodLabel());
  }

  /* ---- 入力の割り振り -------------------------------------------------- */

  private gestureHandlers(): GestureHandlers {
    return {
      toolDown: (p, e) => this.startTool(p, e),
      toolMove: (p, e) => this.moveTool(p, e),
      toolUp: (p, e, moved) => this.finishTool(p, e, moved),
      hover: (p, e) => {
        this.updateCutPreview(p, e);
        this.updatePreselect(p, e);
      },
      hoverLeave: () => {
        this.multicut.clear();
        this.preselect.clear();
        this.weldTarget = null;
        this.gestureDrag = null;
        this.gestureView = null;
        this.gestureMoved = false;
        if (this.bevel.active) {
          this.bevel.cancel();
          this.bevelSnapshot = null;
        }
      },
      openMarkingMenu: (x, y, edit) => this.openMarkingMenu(x, y, edit),
      openTwoFingerMenu: (x, y) => this.openTwoFingerMenu(x, y),
      openCameraMenu: (x, y) => {
        this.closePopup();
        openRadial(this.cameraMenu(), x, y, this.savedCameraItems());
      },
      undo: () => this.doUndo(),
      redo: () => this.doRedo(),
      abort: () => {
        this.endMarquee();
        this.drag = null;
        this.pendingDrag = null;
        this.pivotDrag = null;
        this.slideDrag = null;
        this.dragSnapshot = null;
        this.manipulator.hot = -1;
        this.multicut.clear();
        this.preselect.clear();
        this.weldTarget = null;
        this.gestureDrag = null;
        this.gestureView = null;
        this.gestureMoved = false;
        if (this.bevel.active) {
          this.bevel.cancel();
          this.bevelSnapshot = null;
        }
      },
      // 指で置いた場所がツールの対象か。マニピュレータのハンドルは
      // メッシュの外にはみ出すので、面のヒットだけで判定すると指でつかめない
      isOnMesh: (p, e) => {
        const tol = this.tolerance(e);
        if (this.state.selected && this.manipulator.pick(p, this.pivotWorld(), this.state.manip, tol) >= 0) {
          return true;
        }
        return this.hitSelectedComponent(p, tol) || !!this.picker.pickSurface(p);
      },
      zoomPivot: () => this.pivotWorld(),
      marqueeStart: (p) => this.startMarquee(p),
      tumble: (dx, dy) => this.viewport.tumble(dx, dy),
      pan: (dx, dy) => this.viewport.pan(dx, dy),
      dolly: (f) => this.viewport.dolly(f),
      dollyAbout: (pivot, f) => this.viewport.dollyAbout(pivot, f),
      transformBegin: () => this.beginGestureTransform(),
      transformUpdate: (t) => this.updateGestureTransform(t),
      transformEnd: () => this.endGestureTransform(),
      shiftOn: (e) => this.state.modOn("shift") || e.shiftKey,
      altOn: (e) => this.state.modOn("alt") || e.altKey,
    };
  }

  /* ---- 3 本指の変形 ------------------------------------------------------ */

  /** クォータニオンを XYZ のオイラー角（度）にする。数値入力の往復に使う。 */
  private eulerOf(q: [number, number, number, number]): [number, number, number] {
    const e = new Euler().setFromQuaternion(new Quaternion(q[0], q[1], q[2], q[3]), "XYZ");
    const deg = 180 / Math.PI;
    return [e.x * deg, e.y * deg, e.z * deg];
  }

  /** 画面 1px が、その点で何ワールド単位にあたるか。 */
  private pixelToWorldAt(pivot: Vector3): number {
    const right = new Vector3().setFromMatrixColumn(this.viewport.camera.matrix, 0);
    const a = this.manipulator.toScreen(pivot);
    const b = this.manipulator.toScreen(pivot.clone().add(right));
    const d = Math.hypot(b.x - a.x, b.y - a.y);
    return d > 1e-6 ? 1 / d : 0.01;
  }

  /**
   * 画面の右方向に一番近いワールド軸（X か Z）。左右スワイプの行き先。
   * 今見ているカメラの向きで決まるので、ジェスチャ中は固定する。
   */
  private screenRightAxis(): Vector3 {
    const right = new Vector3().setFromMatrixColumn(this.viewport.camera.matrix, 0);
    return Math.abs(right.x) >= Math.abs(right.z)
      ? new Vector3(Math.sign(right.x) || 1, 0, 0)
      : new Vector3(0, 0, Math.sign(right.z) || 1);
  }

  /**
   * 視線にいちばん近いワールド軸（`26` の T1）。ひねりの回転軸になる。
   *
   * カメラの向きと X / Y / Z の内積の絶対値がいちばん大きいものを 1 本選ぶ。
   * 前ビューなら Z、上ビューなら Y。**必ずワールド軸で、自由軸は返さない。**
   */
  private screenDepthAxis(): { name: string; dir: Vector3 } {
    const forward = new Vector3();
    this.viewport.camera.getWorldDirection(forward);
    const axes: Array<{ name: string; dir: Vector3 }> = [
      { name: "X", dir: new Vector3(1, 0, 0) },
      { name: "Y", dir: new Vector3(0, 1, 0) },
      { name: "Z", dir: new Vector3(0, 0, 1) },
    ];
    let best = axes[2];
    let dot = -1;
    for (const a of axes) {
      const d = Math.abs(forward.dot(a.dir));
      if (d > dot) {
        dot = d;
        best = a;
      }
    }
    return best;
  }

  /**
   * 3 本指で選択を動かし始める。選ぶものが無ければ false。
   * カメラには化けさせないので、呼び出し側はそのまま何もしない。
   */
  private beginGestureTransform(): boolean {
    // ピボット編集中はメッシュを動かさない（3 本指も同じ）
    if (this.state.tool !== "select" || this.state.pivotEdit) return false;
    const o = this.state.selected;
    const pivot = this.pivotWorld();
    if (!o || !pivot) return false;
    const target = this.captureTarget();
    if (!target) return false;

    const pivotScreen = this.manipulator.toScreen(pivot);
    this.beginDragHistory(o, target);
    this.gestureDrag = beginDrag({
      handle: HANDLE_GESTURE,
      pivot,
      target,
      point: pivotScreen,
      pivotScreen,
      ray: this.ray(pivotScreen),
      cameraPosition: this.cameraPosition(),
      label: "変形",
    });
    // カメラの向きはジェスチャ中固定。途中で軸や縮尺が変わらないようにする
    this.gestureView = {
      pixelToWorld: this.pixelToWorldAt(pivot),
      horizontal: this.screenRightAxis(),
      viewAxis: this.screenDepthAxis(),
    };
    this.gestureMoved = false;
    this.gestureLabel = "変形";
    this.beginPreserve(o, this.movedVerts(target));
    return true;
  }

  private updateGestureTransform(t: GestureDelta): void {
    const drag = this.gestureDrag;
    const view = this.gestureView;
    const o = this.state.selected;
    if (!drag || !view || !o) return;

    let note: string;
    if (t.kind === "rotate") {
      // 軸はワールドの 1 本だけ（`26` の T1）。ALT なら画面の面に沿った軸へ
      const axis = this.twistAxis(t.axis);
      // 5° 刻み。手のひねりをそのまま当てるとモデルが微妙に傾く
      const stepped = Math.round((t.radians * 180) / Math.PI / TWIST_STEP_DEG) * TWIST_STEP_DEG;
      // 画面で時計まわりにひねったら、画面でも時計まわりに回るように符号を返す。
      // 軸がカメラの手前を向いていれば右ねじは反時計まわりに見えるので逆にする
      const toward = axis.dir.dot(new Vector3().subVectors(this.cameraPosition(), drag.pivot)) > 0;
      const angle = ((stepped * Math.PI) / 180) * (toward ? -1 : 1);
      applyGestureTransform(drag, o, { rotate: { axis: axis.dir, angle } });
      this.preserve = null;
      this.gestureLabel = "回転";
      const signed = `${stepped >= 0 ? "+" : ""}${stepped}°`;
      // 今の傾き（その軸まわりの絶対角）も出す。コンポーネントには「今の傾き」が
      // 無いので、そのときは動かした量だけ（`27` の T1）
      const tilt =
        drag.target.kind === "object"
          ? tiltAbout(new Quaternion(...o.transform.rotation), axis.dir) * (toward ? -1 : 1)
          : null;
      this.showTwist(axis.name, signed, tilt, t.at);
      note =
        tilt === null
          ? `回転 <kbd>${axis.name} ${signed}</kbd>`
          : `回転 <kbd>${axis.name} ${Math.round(tilt)}°</kbd> <kbd>${signed}</kbd>`;
    } else if (t.kind === "scale") {
      // ALT を押しながらなら、つまんだ向きの軸だけ伸ばす（`25` の T2）
      const axis = this.state.modOn("alt") ? this.gestureScaleAxis(t.axis) : null;
      applyGestureTransform(drag, o, {
        scale: axis
          ? ([axis.x ? t.scale : 1, axis.y ? t.scale : 1, axis.z ? t.scale : 1] as [number, number, number])
          : t.scale,
      });
      // つまんだ時点で「移動」ではなくなるので、UV を保つのはここでやめる
      this.preserve = null;
      note = `スケール ${axis ? `<kbd>${axis.name}</kbd> ` : ""}<kbd>×${t.scale.toFixed(2)}</kbd>`;
    } else if (t.axis === "vertical") {
      // 画面の上がプラス Y
      const amount = -t.pixels * view.pixelToWorld;
      applyGestureTransform(drag, o, { move: new Vector3(0, amount, 0) });
      note = `移動 <kbd>Y ${amount >= 0 ? "+" : ""}${amount.toFixed(2)}</kbd>`;
    } else {
      const amount = t.pixels * view.pixelToWorld;
      const axis = view.horizontal;
      applyGestureTransform(drag, o, { move: axis.clone().multiplyScalar(amount) });
      const name = axis.x !== 0 ? "X" : "Z";
      const signed = amount * (axis.x !== 0 ? axis.x : axis.z);
      note = `移動 <kbd>${name} ${signed >= 0 ? "+" : ""}${signed.toFixed(2)}</kbd>`;
    }
    this.gestureMoved = true;
    this.applyPreserve();

    if (drag.target.kind === "object") {
      const objectView = this.viewport.viewOf(o);
      if (objectView) {
        applyTransform(objectView.group, o.transform);
        objectView.group.updateMatrixWorld();
      }
    } else {
      // ドラッグ中は動いた頂点だけ書き換える（`29` の B-T6）。
      // 法線は離したときに直す
      this.viewport.refreshMoved(o, this.movedVerts(drag.target));
    }
    this.viewport.rebuildOverlay();
    this.refreshManipulator();
    this.hud.refreshStats();
    byId("hudHint").innerHTML = `${note} · 指 3 本`;
  }

  /**
   * ひねりの軸（`26` の T1・T3）。
   *
   * ALT なしは**視線にいちばん近いワールド軸**（画面の面の中で回る）。
   * ALT ありは**画面の面に沿った軸**にして、手前 / 奥へ倒す。どちらの軸かは
   * ALT + つまみと同じ規則（指の並びが縦なら画面の横に沿った軸、横なら Y）。
   */
  private twistAxis(axis: "vertical" | "horizontal"): { name: string; dir: Vector3 } {
    const view = this.gestureView;
    if (!this.state.modOn("alt")) return view?.viewAxis ?? this.screenDepthAxis();
    if (axis === "horizontal") return { name: "Y", dir: new Vector3(0, 1, 0) };
    const right = view?.horizontal ?? this.screenRightAxis();
    return right.x !== 0
      ? { name: "X", dir: new Vector3(1, 0, 0) }
      : { name: "Z", dir: new Vector3(0, 0, 1) };
  }

  /**
   * ひねりの角度を出す札。指の重心の上に置く（`26` の T1、`27` の T1）。
   *
   * 出すのは 2 つ。**今その軸で何度傾いているか**（`tilt`）と、
   * **この操作で何度動かしたか**（`angle`）。コンポーネントには前者が無いので、
   * `tilt` が null なら動かした量だけを大きく出す。
   */
  private showTwist(axis: string, angle: string, tilt: number | null, at: { x: number; y: number }): void {
    if (!this.twistPop) {
      this.twistPop = el("div", "twist-pop");
      document.body.appendChild(this.twistPop);
    }
    this.twistPop.innerHTML =
      tilt === null
        ? `<i>${axis}</i><b>${angle}</b>`
        : `<i>${axis}</i><b>${Math.round(tilt)}°</b><s>${angle}</s>`;
    this.twistPop.style.left = `${at.x}px`;
    this.twistPop.style.top = `${Math.max(6, at.y - 56)}px`;
  }

  private hideTwist(): void {
    this.twistPop?.remove();
    this.twistPop = null;
  }

  /**
   * ALT + つまみの軸（`25` の T2）。
   * 縦につまめば Y、横につまめば**カメラから見て横のワールド軸**（X か Z）。
   */
  private gestureScaleAxis(axis: "vertical" | "horizontal"): { name: string; x: boolean; y: boolean; z: boolean } {
    if (axis === "vertical") return { name: "Y", x: false, y: true, z: false };
    const right = this.gestureView?.horizontal ?? this.screenRightAxis();
    return right.x !== 0
      ? { name: "X", x: true, y: false, z: false }
      : { name: "Z", x: false, y: false, z: true };
  }

  private endGestureTransform(): void {
    const moved = this.gestureMoved;
    const label = this.gestureLabel;
    this.gestureDrag = null;
    this.gestureView = null;
    this.gestureMoved = false;
    this.gestureLabel = "変形";
    this.hideTwist();
    // 動かしている間は法線を据え置いていたので、離したところで作り直す（`29` の B-T6）
    if (moved && this.state.selected) this.viewport.refreshPositions(this.state.selected);
    this.commitPreserve();
    if (moved) this.commitDragHistory(label);
    else {
      this.history.abortPending();
      this.dragSnapshot = null;
    }
    this.refresh();
    this.hud.defaultHint();
  }

  /* ---- ツールの押下・移動・解放 ---------------------------------------- */

  private ray(p: ScreenPoint) {
    this.raycaster.setFromCamera(this.picker.ndc(p), this.viewport.camera);
    return this.raycaster.ray;
  }

  private cameraPosition(): Vector3 {
    return this.viewport.camera.position;
  }

  /** ペンとマウスは 1.0、指は当たりが粗いので広げる。 */
  private tolerance(e: PointerEvent): number {
    return e.pointerType === "touch" ? TOUCH_TOLERANCE : 1;
  }

  /** 選択中のコンポーネントを直接つかんだか（Maya のツイークに相当）。 */
  private hitSelectedComponent(p: ScreenPoint, tolerance = 1): boolean {
    const o = this.state.selected;
    const view = o ? this.viewport.viewOf(o) : undefined;
    if (!o || !view || !this.state.comp.size) return false;
    if (this.state.compMode === "face") {
      const hit = this.picker.pickSurface(p);
      return !!hit && hit.object === o && this.state.comp.has(hit.face);
    }
    if (this.state.compMode === "vertex") {
      const v = this.picker.pickVertex(view, p, 22 * tolerance);
      return v >= 0 && this.state.comp.has(v);
    }
    if (this.state.compMode === "edge") {
      const r = this.picker.pickEdge(view, p, 16 * tolerance);
      return r.edge >= 0 && this.state.comp.has(r.edge);
    }
    return false;
  }

  /* ---- UV を保つ（`23` の T5） ----------------------------------------- */

  /**
   * コンポーネントの移動の前に、座標と UV を控える。
   * オブジェクトの移動と回転・スケールでは UV は変わらないので何もしない。
   */
  private beginPreserve(o: SceneObject, verts: Iterable<number>): void {
    this.preserve = null;
    if (!this.state.preserveUvs || this.state.compMode === "object") return;
    const uv = o.mesh.uvSets.get(UV_SET);
    if (!uv) return;
    this.preserve = {
      object: o,
      before: { positions: Float32Array.from(o.mesh.positions), uv: Float32Array.from(uv) },
      verts: [...verts],
    };
  }

  /** ドラッグ中の 1 コマ分。動かした頂点の UV を貼り直す。 */
  private applyPreserve(): void {
    const p = this.preserve;
    if (!p) return;
    preserveUvs(p.object.mesh, p.before, p.verts);
  }

  /**
   * 動かし終わり。レシピがあれば差分として記録する（開き直しても残る）。
   * レシピが無ければ `map1` を直に書いたままにする。
   */
  private commitPreserve(): void {
    const p = this.preserve;
    this.preserve = null;
    if (!p) return;
    const recipe = p.object.uv;
    if (recipe) recordPreserved(p.object.mesh, recipe, p.before.uv);
    if (this.state.mode === "uv") this.uv?.rebuild();
  }

  /**
   * ドラッグの控えを取る（`29` の B-T4）。
   *
   * 座標だけ / トランスフォームだけで済むなら**差分**、済まないなら全複製。
   * 差分で済まないのは、UV のレシピに差分が記録される場合（Preserve UVs が
   * オンで、そのオブジェクトがレシピを持っているとき）。レシピは差分に入らない。
   */
  private beginDragHistory(o: SceneObject, target: DragTarget): void {
    this.dragSnapshot = null;
    this.history.abortPending();
    if (target.kind === "object") {
      this.history.beginTransform(o);
      return;
    }
    const verts = this.movedVerts(target);
    const uv = o.mesh.uvSets.get(UV_SET);
    const preserving = this.state.preserveUvs && !!uv;
    if (preserving && o.uv) {
      // レシピへ差分が記録される。差分では戻せないので全複製
      this.dragSnapshot = this.history.snapshot();
      return;
    }
    this.history.beginPositions(o, verts, preserving ? cornersAround(o.mesh, verts) : undefined);
  }

  /**
   * ドラッグの控えを積む。差分なら何も動いていなければ積まない。
   * 積んだかどうかを返す。
   */
  private commitDragHistory(label: string): boolean {
    if (this.dragSnapshot) {
      this.history.commit(label, this.dragSnapshot);
      this.dragSnapshot = null;
      return true;
    }
    return this.history.commitPending(label);
  }

  /** ドラッグ対象の頂点（対称編集の相手も含む）。 */
  private movedVerts(target: DragTarget | null): number[] {
    if (!target || target.kind !== "component") return this.selector.selectedVertices();
    const out = new Set<number>(target.verts);
    for (const [a, b] of target.mirror) {
      out.add(a);
      out.add(b);
    }
    return [...out];
  }

  /** ドラッグ開始時に動かす対象を控える。ソフト選択と対称編集もここで決める。 */
  private captureTarget(): DragTarget | null {
    const o = this.state.selected;
    if (!o) return null;
    const view = this.viewport.viewOf(o);
    if (!view) return null;
    view.group.updateMatrixWorld();

    if (this.state.compMode === "object") {
      return { kind: "object", transform: cloneTransform(o.transform) };
    }

    const seeds = this.selector.selectedVertices();
    if (!seeds.length) return null;
    const soft = softWeights(o.mesh, seeds, {
      strength: this.state.soft.strength,
      radius: this.state.soft.radius,
      enabled: true,
    });
    if (soft.skipped) this.hud.toast("範囲が広すぎるのでソフト選択を省きました");

    const verts: number[] = [];
    const weights: number[] = [];
    const world: Vector3[] = [];
    for (const [v, w] of soft.weights) {
      const p = o.mesh.getPosition(v);
      verts.push(v);
      weights.push(w);
      world.push(new Vector3(p[0], p[1], p[2]).applyMatrix4(view.group.matrixWorld));
    }
    return {
      kind: "component",
      verts,
      weights,
      world,
      inverse: new Matrix4().copy(view.group.matrixWorld).invert(),
      mirror: this.state.symX ? mirrorPairs(o.mesh, verts) : [],
    };
  }

  /**
   * ホバーで拾えるものを薄く光らせる。ペンとマウスだけ（指はホバーが無い）。
   * マルチカット中は予測線が主役なので出さない。
   */
  private updatePreselect(p: ScreenPoint, e: PointerEvent): void {
    if (e.pointerType === "touch" || this.state.tool === "multicut") {
      this.preselect.clear();
      return;
    }
    const o = this.state.selected;
    this.preselect.update(p, o ? this.viewport.viewOf(o) : undefined);
  }

  /** マルチカットの予測線を引き直す。 */
  private updateCutPreview(p: ScreenPoint, e: PointerEvent): void {
    if (this.state.tool !== "multicut") return;
    const o = this.state.selected;
    const hint = this.multicut.update(
      p,
      o ? this.viewport.viewOf(o) : undefined,
      this.state.modOn("shift") || e.shiftKey,
    );
    if (hint) byId("hudHint").innerHTML = hint;
  }

  private startTool(p: ScreenPoint, e: PointerEvent): void {
    // マルチカットは押している間ずっと予測線、離した位置で確定する
    if (this.state.tool === "multicut") {
      this.updateCutPreview(p, e);
      return;
    }
    if (this.state.tool === "bevel") {
      this.startBevel(p);
      return;
    }
    const o = this.state.selected;
    const pivot = this.pivotWorld();
    const tol = this.tolerance(e);
    let handle = o ? this.manipulator.pick(p, pivot, this.state.manip, tol) : -1;
    // ハンドルを外しても、選択中のコンポーネントの上ならつかんだ扱いにする
    if (handle < 0 && o && this.state.compMode !== "object" && this.hitSelectedComponent(p, tol)) {
      handle = HANDLE_TWEAK;
    }
    if (handle < 0 || !o || !pivot) {
      this.startMarquee(p);
      return;
    }

    // ピボット編集はメッシュを触らないので、待たせずにその場で始めてよい。
    // 掴み損ねても何も壊れない（履歴にも積まない）
    if (this.state.pivotEdit) {
      this.beginPivotDrag(handle, p, pivot);
      return;
    }

    // ペンと指は、着地のぶれでマニピュレータを掴んでしまう（ダブルクリックの
    // 2 回目がそれ）。動きが確かになるまでドラッグを始めない。マウスは即時
    if (e.pointerType !== "mouse") {
      this.pendingDrag = {
        handle,
        point: p,
        t0: performance.now(),
        shift: this.state.modOn("shift") || e.shiftKey,
        ctrl: this.state.modOn("ctrl") || e.ctrlKey || e.metaKey,
      };
      this.manipulator.hot = handle;
      this.refreshManipulator();
      return;
    }

    this.beginToolDrag(handle, p, this.state.modOn("shift") || e.shiftKey, this.state.modOn("ctrl") || e.ctrlKey || e.metaKey);
  }

  /**
   * ドラッグを実際に始める。押した点を起点にするので、生きるまでに動いた分は
   * 最初の 1 フレームで追いつく（ずれは最大 12px）。
   */
  private beginToolDrag(handle: number, p: ScreenPoint, shift: boolean, ctrl: boolean): void {
    const o = this.state.selected;
    const pivot = this.pivotWorld();
    if (!o || !pivot) {
      this.startMarquee(p);
      return;
    }

    let label = { move: "移動", rotate: "回転", scale: "スケール" }[handleKind(handle) ?? "move"];

    // SHF + CTL + 移動 = スライド（docs/17 の 5 章）。
    // スライドは自前の控えを持つので、履歴は今までどおり全複製（`29` の B-T4）
    if (
      handleKind(handle) === "move" &&
      this.state.compMode !== "object" &&
      this.state.comp.size &&
      shift &&
      ctrl
    ) {
      const snapshot = this.history.snapshot();
      if (this.beginSlide(o, p)) {
        this.dragSnapshot = snapshot;
        this.manipulator.hot = handle;
        this.refreshManipulator();
        return;
      }
    }

    // Shift + 移動 = 押し出してから移動（Maya と同じ）。
    // 生きた時点で行うので、Shift + タップでは押し出さない。
    // トポロジが変わるので、押し出すなら控えは**押し出す前の全複製**
    let extrudeSnapshot: ReturnType<History["snapshot"]> | null = null;
    if (handleKind(handle) === "move" && this.state.compMode !== "object" && this.state.comp.size && shift && !ctrl) {
      const snapshot = this.history.snapshot();
      if (this.extrudeForDrag(o)) {
        label = "押し出し";
        extrudeSnapshot = snapshot;
      }
    }

    const target = this.captureTarget();
    if (!target) {
      this.startMarquee(p);
      return;
    }

    // 座標だけで済むなら差分、済まないなら全複製
    if (extrudeSnapshot) {
      this.history.abortPending();
      this.dragSnapshot = extrudeSnapshot;
    } else {
      this.beginDragHistory(o, target);
    }
    this.drag = beginDrag({
      handle,
      pivot: this.pivotWorld() ?? pivot,
      target,
      point: p,
      pivotScreen: this.manipulator.toScreen(this.pivotWorld() ?? pivot),
      ray: this.ray(p),
      cameraPosition: this.cameraPosition(),
      label,
    });
    // UV を保つのは移動だけ（回転とスケールでは UV は変わらない）
    if (this.drag.kind === "move") this.beginPreserve(o, this.movedVerts(target));
    this.manipulator.hot = handle;
    this.refreshManipulator();
  }

  /* ---- スライド（SHF + CTL + 移動） ------------------------------------ */

  /**
   * スライドを始める。選んだ頂点が、選んでいない隣へ向かう辺（レール）に
   * 沿って滑る。どのレールを使うかは画面の向きで決めるので、レールの画面上の
   * 向きをここで控えておく（core は画面を知らない）。
   */
  private beginSlide(o: SceneObject, p: ScreenPoint): boolean {
    const verts = this.selector.selectedVertices();
    if (!verts.length) return false;
    const view = this.viewport.viewOf(o);
    if (!view) return false;
    view.group.updateMatrixWorld();

    const rails = slideRails(o.mesh, verts);
    // レールが 1 本も無ければ滑らせようがない
    if (![...rails.values()].some((list) => list.length)) {
      this.hud.toast("スライドできる辺がありません（まわりが全部選ばれています）");
      return false;
    }

    const screenOf = (v: number): ScreenPoint => {
      const q = o.mesh.getPosition(v);
      return this.manipulator.toScreen(
        new Vector3(q[0], q[1], q[2]).applyMatrix4(view.group.matrixWorld),
      );
    };
    const screen = new Map<number, ScreenPoint>();
    for (const v of verts) screen.set(v, screenOf(v));
    const railScreen = new Map<number, ScreenPoint[]>();
    for (const [v, list] of rails) {
      const from = screen.get(v)!;
      railScreen.set(
        v,
        list.map((n) => {
          const s = screenOf(n);
          return { x: s.x - from.x, y: s.y - from.y };
        }),
      );
    }

    // 押した点にいちばん近い頂点が基準。滑る量はこの 1 点で決めて全体に配る
    let anchor = verts[0];
    let best = Infinity;
    for (const v of verts) {
      const s = screen.get(v)!;
      const d = Math.hypot(s.x - p.x, s.y - p.y);
      if (d < best) {
        best = d;
        anchor = v;
      }
    }

    const mirror = this.state.symX ? mirrorPairs(o.mesh, verts) : [];
    this.slideDrag = {
      base: Float32Array.from(o.mesh.positions),
      rails,
      railScreen,
      anchor,
      start: p,
      mirror,
    };
    // スライドもコンポーネントの移動なので UV を保つ（`23` の T5）
    this.beginPreserve(o, [...verts, ...mirror.flatMap(([a, b]) => [a, b])]);
    return true;
  }

  private updateSlide(o: SceneObject, p: ScreenPoint): void {
    const s = this.slideDrag;
    if (!s) return;
    const dx = p.x - s.start.x;
    const dy = p.y - s.start.y;
    const len = Math.hypot(dx, dy);
    if (len < 1e-6) return;

    // 頂点ごとに、引いた向きといちばん揃うレールを選ぶ
    const choice = new Map<number, number>();
    for (const [v, list] of s.rails) {
      const dirs = s.railScreen.get(v) ?? [];
      let pick = -1;
      let bestDot = 0;
      for (let i = 0; i < list.length; i++) {
        const d = dirs[i];
        const norm = Math.hypot(d.x, d.y);
        if (norm < 1e-6) continue;
        const dot = (d.x * dx + d.y * dy) / (norm * len);
        if (dot > bestDot) {
          bestDot = dot;
          pick = i;
        }
      }
      if (pick >= 0) choice.set(v, list[pick]);
    }
    if (!choice.size) return;

    // 量は基準頂点のレールへの射影。0〜0.99（隣に重なると面が潰れる）
    const anchorRail = choice.get(s.anchor);
    let t = 0;
    if (anchorRail !== undefined) {
      const i = (s.rails.get(s.anchor) ?? []).indexOf(anchorRail);
      const d = (s.railScreen.get(s.anchor) ?? [])[i];
      const norm2 = d ? d.x * d.x + d.y * d.y : 0;
      if (norm2 > 1e-9) t = (dx * d.x + dy * d.y) / norm2;
    } else {
      // 基準にレールが無いときは、選べた中のどれかで代用する
      const [v, n] = [...choice][0];
      const i = (s.rails.get(v) ?? []).indexOf(n);
      const d = (s.railScreen.get(v) ?? [])[i];
      const norm2 = d ? d.x * d.x + d.y * d.y : 0;
      if (norm2 > 1e-9) t = (dx * d.x + dy * d.y) / norm2;
    }
    t = Math.max(0, Math.min(0.99, t));

    // 対称編集。鏡側は「相手の X を反転した先」に当たるレールを使う
    if (s.mirror.length) {
      const neighbors = o.mesh.vertexNeighbors();
      for (const [v, m] of s.mirror) {
        const target = choice.get(v);
        if (target === undefined) continue;
        const want = [-s.base[target * 3], s.base[target * 3 + 1], s.base[target * 3 + 2]];
        let hit = -1;
        for (const n of neighbors.get(m) ?? []) {
          if (
            Math.abs(s.base[n * 3] - want[0]) < 1e-4 &&
            Math.abs(s.base[n * 3 + 1] - want[1]) < 1e-4 &&
            Math.abs(s.base[n * 3 + 2] - want[2]) < 1e-4
          ) {
            hit = n;
            break;
          }
        }
        if (hit >= 0) choice.set(m, hit);
      }
    }

    slideVertices(o.mesh, s.base, choice, t);
    this.applyPreserve();
    this.viewport.refreshPositions(o);
    this.viewport.rebuildOverlay();
    this.refreshManipulator();
    byId("hudHint").innerHTML = `スライド <kbd>${t.toFixed(2)}</kbd>`;
  }

  /* ---- ピボットの移動（Maya の D） ------------------------------------- */

  /**
   * ピボットだけを動かすドラッグ。メッシュもトランスフォームも触らないので
   * 履歴には積まない。スナップは効く（V で頂点へ寄せるのが Maya の常套手段）。
   */
  private beginPivotDrag(handle: number, p: ScreenPoint, pivot: Vector3): void {
    const axis = handle < 3 ? handle : -1;
    const plane = new Plane().setFromNormalAndCoplanarPoint(
      new Vector3().subVectors(this.cameraPosition(), pivot).normalize(),
      pivot,
    );
    let planeStart: Vector3 | null = null;
    if (axis < 0) {
      const hit = new Vector3();
      if (this.ray(p).intersectPlane(plane, hit)) planeStart = hit;
    }
    this.pivotDrag = {
      axis,
      origin: pivot.clone(),
      plane,
      planeStart,
      t0: axis >= 0 ? rayAxisT(this.ray(p), pivot, AXES[axis]) : 0,
    };
    this.manipulator.hot = handle;
    this.refreshManipulator();
  }

  private updatePivotDrag(p: ScreenPoint): void {
    const d = this.pivotDrag;
    if (!d) return;
    const ray = this.ray(p);
    let next: Vector3;
    if (d.axis >= 0) {
      const t = rayAxisT(ray, d.origin, AXES[d.axis]);
      next = d.origin.clone().addScaledVector(AXES[d.axis], t - d.t0);
    } else {
      const hit = new Vector3();
      if (!ray.intersectPlane(d.plane, hit) || !d.planeStart) return;
      next = d.origin.clone().add(hit.sub(d.planeStart));
    }
    if (this.state.snapping) {
      const snapped = this.snapPoint(next);
      if (snapped) {
        // 軸ドラッグ中は軸の上に留める（メッシュの移動と同じ規則）
        next =
          d.axis >= 0
            ? d.origin
                .clone()
                .addScaledVector(AXES[d.axis], snapped.clone().sub(d.origin).dot(AXES[d.axis]))
            : snapped.clone();
      }
      this.showSnapTarget();
    }
    this.state.pivotOverride = { x: next.x, y: next.y, z: next.z };
    this.refreshManipulator();
    if (!this.state.snapping) {
      byId("hudHint").innerHTML =
        `ピボット <kbd>${next.x.toFixed(2)}, ${next.y.toFixed(2)}, ${next.z.toFixed(2)}</kbd>`;
    }
  }

  /** ピボット編集の入切。Maya の D / Insert。 */
  private togglePivotEdit(): void {
    this.state.pivotEdit = !this.state.pivotEdit;
    this.manipulator.hot = -1;
    this.syncToggleButtons();
    this.refreshManipulator();
    this.uv?.refreshManipulator();
    this.refresh();
    this.hud.toast(
      this.state.pivotEdit ? "ピボット編集: オン（もう一度 D で終了）" : "ピボット編集: オフ",
    );
  }

  /** ピボットを選択の中心へ戻す。 */
  private resetPivot(): void {
    this.state.pivotOverride = null;
    this.refreshManipulator();
    this.uv?.resetPivot();
    this.hud.toast("ピボットを選択の中心へ");
  }

  private setManipSize(size: number): void {
    this.state.manipSize = Math.min(MANIP_SIZE_MAX, Math.max(MANIP_SIZE_MIN, size));
    localStorage.setItem("macbeth.manipSize", String(this.state.manipSize));
    this.refreshManipulator();
    this.uv?.refreshManipulator();
    this.refresh();
    this.hud.toast(`マニピュレータの大きさ ×${this.state.manipSize.toFixed(2)}`);
  }

  /** マニピュレータのサークルメニュー（ツール列の長押し）。 */
  private manipulatorMenu(): RadialMenu {
    return {
      N: { label: "ユニバーサル", sub: "All  T", icon: ICONS.xform, run: () => this.setManip("all") },
      NE: {
        label: this.state.pivotEdit ? "ピボットの移動を終える" : "ピボットを移動",
        sub: "Pivot  D",
        icon: ICONS.pivot,
        run: () => this.togglePivotEdit(),
      },
      E: { label: "移動", sub: "Move  W", icon: ICONS.move, run: () => this.setManip("move") },
      SE: { label: "ピボットを戻す", sub: "Center", icon: ICONS.vObj, run: () => this.resetPivot() },
      S: { label: "回転", sub: "Rotate  E", icon: ICONS.rotate, run: () => this.setManip("rotate") },
      SW: {
        label: "距離でマージ",
        sub: "Merge",
        icon: ICONS.vVert,
        run: () => this.doMergeByDistance(),
      },
      W: { label: "スケール", sub: "Scale  R", icon: ICONS.scale, run: () => this.setManip("scale") },
      NW: {
        label: "初期設定に戻す",
        sub: "Reset",
        icon: ICONS.xform,
        run: () => {
          this.state.pivotEdit = false;
          this.state.pivotOverride = null;
          this.uv?.resetPivot();
          this.setManip("all");
          this.setManipSize(1);
          this.syncToggleButtons();
          this.hud.toast("マニピュレータを初期設定に戻した");
        },
      },
    };
  }

  /** Shift ドラッグの押し出し。面とエッジに対応。頂点はそのまま移動する。 */
  private extrudeForDrag(o: SceneObject): boolean {
    if (this.state.compMode === "face") {
      const r = extrudeFaces(o.mesh, this.state.comp, 0);
      if (!r) return false;
      o.mesh = r.mesh;
      o.markTopologyChanged();
      this.viewport.rebuildObject(o);
      this.viewport.rebuildOverlay();
      return true;
    }
    if (this.state.compMode === "edge") {
      const view = this.viewport.viewOf(o);
      if (!view) return false;
      const edges = [...this.state.comp].map((i) => view.edges[i]).filter(Boolean);
      const r = extrudeEdges(o.mesh, edges, 0);
      if (!r) return false;
      o.mesh = r.mesh;
      o.markTopologyChanged();
      this.viewport.rebuildObject(o);
      const next = this.viewport.viewOf(o);
      if (next) {
        // 押し出しでできた新しいエッジを選択に置き換える
        const keys = new Set(r.newEdges.map(([a, b]) => `${Math.min(a, b)}_${Math.max(a, b)}`));
        this.state.comp.clear();
        next.edges.forEach(([a, b], i) => {
          if (keys.has(`${Math.min(a, b)}_${Math.max(a, b)}`)) this.state.comp.add(i);
        });
      }
      this.viewport.rebuildOverlay();
      return true;
    }
    // 頂点: 長さ 0 で尖らせて、できた先端をそのままドラッグで引っぱる
    const r = extrudeVertices(o.mesh, this.state.comp, 0, this.state.vertexOpts.extrudeWidth);
    if (!r) {
      this.hud.toast("押し出せる頂点がありません（まわりの面が輪になっている必要があります）");
      return false;
    }
    o.mesh = r.mesh;
    o.markTopologyChanged();
    this.viewport.rebuildObject(o);
    this.state.comp.clear();
    for (const tip of r.tips) this.state.comp.add(tip);
    this.viewport.rebuildOverlay();
    return true;
  }

  private moveTool(p: ScreenPoint, e: PointerEvent): void {
    if (this.state.tool === "multicut") return this.updateCutPreview(p, e);
    if (this.state.tool === "bevel") return this.dragBevel(p);
    if (this.marquee) return this.updateMarquee(p);
    if (this.pivotDrag) return this.updatePivotDrag(p);
    if (this.slideDrag) {
      const o = this.state.selected;
      if (o) this.updateSlide(o, p);
      return;
    }
    // 待たせているドラッグがあれば、生かすかどうかをここで決める
    if (this.pendingDrag) {
      const pend = this.pendingDrag;
      const d = Math.hypot(p.x - pend.point.x, p.y - pend.point.y);
      const held = performance.now() - pend.t0;
      if (d <= TAP_MOVE && !(d > TOOL_MOVE && held > TAP_DURATION)) return;
      this.pendingDrag = null;
      this.beginToolDrag(pend.handle, pend.point, pend.shift, pend.ctrl);
      // スライドに化けた場合は、そのまま今の点まで滑らせる
      if (this.slideDrag) {
        const o = this.state.selected;
        if (o) this.updateSlide(o, p);
        return;
      }
    }
    const drag = this.drag;
    const o = this.state.selected;
    if (!drag || !o) return;
    void e;
    const snapping = this.state.snapping && drag.kind === "move";
    updateDrag(drag, o, p, this.ray(p), this.cameraPosition(), {
      snap: snapping ? (w) => this.snapPoint(w) : undefined,
      rotateStep: this.state.rotateStep,
      preventNegativeScale: this.state.preventNegativeScale,
    });
    if (snapping) this.showSnapTarget();
    else this.updateWeldTarget(p, e, o);
    this.applyPreserve();
    if (drag.target.kind === "object") {
      const view = this.viewport.viewOf(o);
      if (view) {
        applyTransform(view.group, o.transform);
        view.group.updateMatrixWorld();
      }
    } else {
      this.viewport.refreshMoved(o, this.movedVerts(this.drag?.target ?? null));
    }
    this.viewport.rebuildOverlay();
    this.refreshManipulator();
    this.hud.refreshStats();
  }

  /* ---- スナップ -------------------------------------------------------- */

  /** 直前に決めた寄せ先。ドラッグ中の表示に使う。 */
  private snapHit: Vector3 | null = null;

  /**
   * 寄せ先を返す。効かなければ null。
   * グリッドは刻みで丸め、頂点とエッジは画面上で近いものを探す（近すぎる相手が無ければ寄せない）。
   */
  private snapPoint(world: Vector3): Vector3 | null {
    const kind = this.state.snap.kind;
    if (kind === "grid") {
      const step = Math.max(1e-4, this.state.snap.step);
      const hit = new Vector3(
        Math.round(world.x / step) * step,
        Math.round(world.y / step) * step,
        Math.round(world.z / step) * step,
      );
      this.snapHit = hit;
      return hit;
    }

    // サーフェスは Maya の Make Live と同じ考え方。行き先の画面位置からレイを撃って、
    // 当たった面の上に乗せる。自分のオブジェクトは常に外す（自分の面に貼り付くため）
    if (kind === "surface") {
      const at = this.manipulator.toScreen(world);
      const hit = this.picker.pickSurface(at, this.state.selected);
      this.snapHit = hit ? hit.point.clone() : null;
      return this.snapHit;
    }

    // 画面上の距離で探す。ワールドの距離だとカメラの寄り引きで効き方が変わる
    const at = this.manipulator.toScreen(world);
    const limit = 40;
    let best: Vector3 | null = null;
    let bestDistance = limit;
    const consider = (candidate: Vector3): void => {
      const s = this.manipulator.toScreen(candidate);
      const d = Math.hypot(s.x - at.x, s.y - at.y);
      if (d < bestDistance) {
        bestDistance = d;
        best = candidate;
      }
    };

    const moving = this.state.selected;
    // オブジェクトごと動かしているときは、自分の頂点も一緒に動くので寄せ先にならない。
    // コンポーネントモードでは、動かしている当人だけを外す（残りは寄せ先になる）
    const skipWhole = this.state.compMode === "object";
    const movingVerts = this.state.compMode === "vertex" ? this.state.comp : null;
    for (const o of this.state.doc.objects) {
      if (skipWhole && o === moving) continue;
      const view = this.viewport.viewOf(o);
      if (!view) continue;
      const m = o.mesh;
      const toWorld = (v: number): Vector3 =>
        new Vector3(m.positions[v * 3], m.positions[v * 3 + 1], m.positions[v * 3 + 2]).applyMatrix4(
          view.group.matrixWorld,
        );
      if (kind === "vertex") {
        for (let v = 0; v < m.vertexCount; v++) {
          // 動かしている当人には寄せない
          if (o === moving && movingVerts?.has(v)) continue;
          consider(toWorld(v));
        }
      } else {
        for (const [a, b] of view.edges) {
          if (o === moving && movingVerts?.has(a) && movingVerts.has(b)) continue;
          // 辺の上で world に一番近い点
          const pa = toWorld(a);
          const pb = toWorld(b);
          const ab = pb.clone().sub(pa);
          const len2 = ab.lengthSq();
          const t = len2 > 1e-12 ? Math.max(0, Math.min(1, world.clone().sub(pa).dot(ab) / len2)) : 0;
          consider(pa.clone().addScaledVector(ab, t));
        }
      }
    }
    this.snapHit = best;
    return best;
  }

  /** 寄せ先を光らせる。 */
  private showSnapTarget(): void {
    const hit = this.snapHit;
    this.preselect.clear();
    if (!hit) {
      byId("hudHint").innerHTML = `スナップ <kbd>${SNAP_LABEL[this.state.snap.kind]}</kbd> · near なし`;
      return;
    }
    this.preselect.showWorldPoint(hit.x, hit.y, hit.z);
    byId("hudHint").innerHTML =
      `スナップ <kbd>${SNAP_LABEL[this.state.snap.kind]}</kbd> · ` +
      `<kbd>${hit.x.toFixed(2)}, ${hit.y.toFixed(2)}, ${hit.z.toFixed(2)}</kbd>`;
  }

  /**
   * ターゲットウェルド。頂点を 1 つだけ掴んで動かしている間、
   * 近づいた別の頂点を光らせる。離すとそこへ溶接する。
   */
  private updateWeldTarget(p: ScreenPoint, e: PointerEvent, o: SceneObject): void {
    this.weldTarget = null;
    this.preselect.clear();
    if (this.state.compMode !== "vertex" || this.state.comp.size !== 1) return;
    const view = this.viewport.viewOf(o);
    if (!view) return;
    const moving = [...this.state.comp][0];
    const radius = 22 * this.tolerance(e);
    const hit = this.picker.pickVertexExcept(view, p, radius, moving);
    if (hit < 0) return;
    this.weldTarget = hit;
    this.preselect.showVertex(view, hit);
    byId("hudHint").innerHTML = "離すと <kbd>この頂点へ溶接</kbd> します";
  }

  private applyTargetWeld(o: SceneObject, moving: number, target: number): void {
    o.mesh = compact(weldVertices(o.mesh, [[moving, target]]));
    const dropped = o.markTopologyChanged();
    this.state.comp.clear();
    this.viewport.rebuildObject(o);
    this.viewport.rebuildOverlay();
    this.refresh();
    let note = "ターゲットウェルド";
    if (dropped.droppedLevels || dropped.droppedLayers) {
      note += ` · 上位レベル ${dropped.droppedLevels} とレイヤー ${dropped.droppedLayers} を破棄`;
    }
    if (dropped.rebased) note += " · UV の土台を取り直した";
    this.hud.toast(note);
  }

  private finishTool(p: ScreenPoint, e: PointerEvent, moved: boolean): void {
    if (this.state.tool === "multicut") {
      this.doMultiCut();
      return;
    }
    if (this.state.tool === "bevel") {
      this.endBevel(moved);
      return;
    }
    // スライド。動かしていれば履歴に積む
    if (this.slideDrag) {
      const s = this.slideDrag;
      this.slideDrag = null;
      this.manipulator.hot = -1;
      const o = this.state.selected;
      const changed =
        !!o && s.base.some((v, i) => Math.abs(v - o.mesh.positions[i]) > 1e-6);
      this.commitPreserve();
      if (changed && this.dragSnapshot) {
        this.history.commit("スライド", this.dragSnapshot);
        this.hud.toast("スライド");
      }
      this.dragSnapshot = null;
      this.refreshManipulator();
      this.refresh();
      return;
    }
    // ピボットの移動。履歴には積まない（メッシュは変わっていない）
    if (this.pivotDrag) {
      this.pivotDrag = null;
      this.manipulator.hot = -1;
      this.preselect.clear();
      this.refreshManipulator();
      this.hud.defaultHint();
      return;
    }
    // 生きないまま離した = タップ。何も変えていないので選択として扱う
    if (this.pendingDrag) {
      this.pendingDrag = null;
      this.manipulator.hot = -1;
      this.refreshManipulator();
      this.applySelectResult(this.selector.click(p, e));
      return;
    }
    const m = this.marquee;
    if (m) {
      this.endMarquee();
      const r = this.selector.marquee(m.x0, m.y0, m.x1, m.y1, p, e);
      this.applySelectResult(r);
    } else if (this.drag) {
      const drag = this.drag;
      this.drag = null;
      this.manipulator.hot = -1;
      this.preselect.clear();
      // 法線を作り直す（動かしている間は据え置いていた。`29` の B-T6）
      if (moved && this.state.selected) this.viewport.refreshPositions(this.state.selected);
      this.commitPreserve();
      // 動かさずに離したなら、何も変えていないので選択として扱う。
      // マニピュレータの中心は選択の中心に出るので、これがないと
      // 選び直しやダブルクリックがハンドルに吸われてしまう。
      // ペンと指は生きた時点で既に動いているので、ここに来るのはマウスだけ
      if (!moved) {
        this.dragSnapshot = null;
        this.history.abortPending();
        this.applySelectResult(this.selector.click(p, e));
      } else {
        const target = this.weldTarget;
        const moving = this.state.compMode === "vertex" ? [...this.state.comp][0] : undefined;
        if (target !== null && moving !== undefined && this.state.selected) {
          // ウェルドはトポロジが変わる。差分では戻せないので全複製に切り替える
          const snap = this.dragSnapshot ?? this.history.upgradeToFull();
          this.dragSnapshot = null;
          this.applyTargetWeld(this.state.selected, moving, target);
          if (snap) this.history.commit("ターゲットウェルド", snap);
        } else if (this.commitDragHistory(drag.label)) {
          this.hud.toast(drag.label);
        }
      }
      this.refresh();
    } else if (!moved) {
      this.applySelectResult(this.selector.click(p, e));
    }
  }

  /* ---- ベベル ---------------------------------------------------------- */

  /** 選択中のエッジを source 上の番号で取り出す。 */
  private selectedEdgePairs(o: SceneObject): Array<[number, number]> {
    const view = this.viewport.viewOf(o);
    if (!view) return [];
    return [...this.state.comp].map((i) => view.edges[i]).filter(Boolean);
  }

  private startBevel(p: ScreenPoint): void {
    const o = this.state.selected;
    if (!o || this.state.compMode !== "edge" || !this.state.comp.size) {
      this.hud.toast("エッジモードでエッジを選択してから、左右にドラッグしてください");
      return;
    }
    const edges = this.selectedEdgePairs(o);
    const snapshot = this.history.snapshot();
    if (!this.bevel.begin(o, edges, p.x)) return;
    this.bevelSnapshot = snapshot;
  }

  private dragBevel(p: ScreenPoint): void {
    const session = this.bevel.keep();
    const o = this.state.selected;
    if (!session || !o) return;
    this.state.bevel.width = this.bevel.widthFromDrag(p.x - session.startX, session.scale);
    const r = this.bevel.apply(this.state.bevel);
    if (!r) {
      this.hud.toast("この形はまだベベルできません（四角形と閉じたエッジのみ）");
      return;
    }
    this.viewport.rebuildObject(o);
    this.viewport.rebuildOverlay();
    this.hud.refreshStats();
    byId("hudHint").innerHTML =
      `ベベル <kbd>幅 ${this.state.bevel.width.toFixed(3)}</kbd> · ` +
      `<kbd>${this.state.bevel.segments} 分割</kbd> · ${r.faces} 面`;
  }

  private endBevel(moved: boolean): void {
    const session = this.bevel.keep();
    const o = this.state.selected;
    if (!session || !o) return;
    if (!moved) {
      // 動かさずに離した = 何も変えていない
      this.bevel.cancel();
      this.bevel.end();
      this.bevelSnapshot = null;
      this.viewport.rebuildObject(o);
      this.refresh();
      return;
    }
    const dropped = o.markTopologyChanged();
    this.state.comp.clear();
    if (this.bevelSnapshot) this.history.commit("ベベル", this.bevelSnapshot);
    this.bevelSnapshot = null;
    this.viewport.rebuildObject(o);
    this.viewport.rebuildOverlay();
    this.refresh();
    let note = `ベベル — 幅 ${this.state.bevel.width.toFixed(3)} · ${this.state.bevel.segments} 分割`;
    if (dropped.droppedLevels || dropped.droppedLayers) {
      note += ` · 上位レベル ${dropped.droppedLevels} とレイヤー ${dropped.droppedLayers} を破棄`;
    }
    this.hud.toast(`${note}（オプションで作り直せます）`);
  }

  /** オプションの幅 / セグメントを動かしたとき、確定したベベルをかけ直す。 */
  private redoBevel(): void {
    const o = this.state.selected;
    if (!o || !this.bevel.active) return;
    if (!this.bevel.apply(this.state.bevel)) return;
    this.viewport.rebuildObject(o);
    this.viewport.rebuildOverlay();
    this.hud.refreshStats();
  }

  /** 予測どおりに切る。 */
  private doMultiCut(): void {
    const o = this.state.selected;
    if (!o) return;
    const snapshot = this.history.snapshot();
    const r = this.multicut.commit(this.viewport.viewOf(o));
    if (!r) return;
    o.markTopologyChanged();
    this.state.comp.clear();
    this.history.commit("エッジループ挿入", snapshot);
    this.viewport.rebuildObject(o);
    this.viewport.rebuildOverlay();
    this.refresh();
    this.hud.toast(`エッジループを挿入しました — ${r.faceCount} 面`);
  }

  /**
   * 頂点の画面位置。確認スクリプトが座標を組み立てるのに使う。
   * 内部の投影と同じ経路を通すので、テストのためだけの計算を持たずに済む。
   */
  screenOfVertex(index: number): ScreenPoint | null {
    const o = this.state.selected;
    const view = o ? this.viewport.viewOf(o) : undefined;
    if (!view || index >= view.object.mesh.vertexCount) return null;
    const s = this.picker.projectVertex(view, index);
    return { x: s.x, y: s.y };
  }

  /** マニピュレータを今の選択に合わせる。 */
  private refreshManipulator(): void {
    if (this.state.tool !== "select") {
      this.manipulator.clear();
      return;
    }
    const signature = [
      this.state.compMode,
      this.state.selected?.id ?? "-",
      this.state.comp.size,
      this.state.tool,
    ].join(",");
    this.manipulator.rebuild(this.pivotWorld(), this.state.manip, signature);
  }

  setTool(tool: string): void {
    if (this.state.tool === tool) return;
    if (this.bevel.active) {
      this.bevel.end();
      this.bevelSnapshot = null;
    }
    this.state.tool = tool;
    this.multicut.clear();
    this.preselect.clear();
    this.manipulator.clear();
    this.refresh();
    for (const b of document.querySelectorAll<HTMLElement>("[data-tool]")) {
      b.setAttribute("aria-pressed", String(b.dataset.tool === tool));
    }
    this.renderToolColumn();
    this.hud.toast(tool === "multicut" ? "マルチカット" : "選択・変形");
    this.hud.defaultHint();
  }

  setDisplay(display: Display): void {
    // ヒートマップは「歪みを色で」と同じもの。どちらから入れても状態は 1 つ（`23` の T2）
    if (display === "heat" && this.state.display !== "heat") this.state.displayBeforeHeat = this.state.display;
    this.state.uvHeat = display === "heat";
    this.remember("uvHeat", this.state.uvHeat);
    if (display === "heat") {
      for (const o of this.state.doc.objects) {
        if (!o.uvHeat || o.uvHeat.length !== o.mesh.faceCount) o.uvHeat = measureFaceHeat(o);
      }
    }
    this.state.display = display;
    this.renderToolColumn();
    // 「シェード」はすべてハードエッジなので、法線を作り直す必要がある
    this.viewport.syncAll();
    this.refresh();
    this.hud.toast(
      {
        wire: "ワイヤーフレーム",
        shaded: "シェード",
        shadedWire: "シェード + ワイヤー",
        smooth: "スムースシェード",
        checker: "チェッカー（UV の確認）",
        heat: "ヒートマップ（UV の歪み）",
      }[display],
    );
    this.uv?.rebuild();
  }

  /**
   * チェッカーの細かさと模様（`23` の T3）。2D の下地と 3D のチェッカー表示は
   * 同じ設定から作るので、どちらから触っても両方が変わる。
   */
  private setChecker(key: "cells" | "cellsPreview" | "pattern", value: number | string): void {
    // 引いている間は数を控えるだけ。テクスチャの作り直しは離してから（`24` の T5）
    if (key === "cellsPreview") {
      this.state.checker.cells = Math.max(2, Math.min(64, Math.round(Number(value))));
      return;
    }
    if (key === "pattern") this.state.checker.pattern = value as CheckerPattern;
    this.remember(`checker.${key}`, key === "cells" ? String(this.state.checker.cells) : String(value));
    this.uv?.view.setChecker(this.state.checker.cells, this.state.checker.pattern);
    this.viewport.refreshChecker();
    this.hud.toast(
      key === "cells"
        ? `チェッカー ${this.state.checker.cells} マス`
        : this.state.checker.pattern === "colorGrid"
          ? "カラーグリッド"
          : "市松",
    );
    this.reopenUvOrDisplayOptions();
  }

  /**
   * 開いているカットインを開き直して、チェックやスライダーを今の値に合わせる。
   * 同じ区画が UV の「UV オプション」と 3D の「シェード」の両方にあるため。
   */
  private reopenUvOrDisplayOptions(): void {
    const at = this.popup?.dataset.gauge;
    if (at === "uvopts" || at === "unfold") this.openGroupOptions(at, () => this.uvUnfoldOptions());
    else this.reopenToolOptions("display");
  }

  /** 「歪みを色で」のトグル。3D の表示も一緒に切り替える（`23` の T2）。 */
  private toggleUvHeat(on: boolean): void {
    if (on) this.setDisplay("heat");
    else if (this.state.display === "heat") this.setDisplay(this.state.displayBeforeHeat ?? "shadedWire");
    else {
      this.state.uvHeat = false;
      this.remember("uvHeat", false);
      this.uv?.rebuild();
    }
    // 開いているカットインのチェックを合わせる（UV と 3D の両方に置いてある）
    this.reopenUvOrDisplayOptions();
  }

  setManip(manip: Manip): void {
    this.state.manip = manip;
    this.manipulator.clear();
    this.renderToolColumn();
    this.refreshManipulator();
    this.hud.toast(`マニピュレータ: ${{ all: "ユニバーサル", move: "移動", rotate: "回転", scale: "スケール" }[manip]}`);
  }

  private applySelectResult(r: { changed: boolean; objectChanged: boolean; message?: string }): void {
    if (!r.changed) return;
    if (r.objectChanged) this.viewport.applyDisplayAll();
    this.viewport.rebuildOverlay();
    this.refresh();
    // 別のオブジェクトを選んだなら、2D の中身も入れ替える（`25` の T1）
    this.afterSelectionChange();
    this.pushSelectionToUv();
    if (r.message) this.hud.toast(r.message);
  }

  /**
   * 3D の選択を 2D へ渡す。UV モードのときだけ。
   * 選択は 2D と 3D で共通にする（Maya と同じ。ユーザー要望）。
   */
  private pushSelectionToUv(): void {
    if (this.state.mode !== "uv" || !this.uv || this.syncingSelection) return;
    this.syncingSelection = true;
    const o = this.state.selected;
    const view = o ? this.viewport.viewOf(o) : undefined;
    const edges: string[] = [];
    if (this.state.compMode === "edge" && view) {
      for (const i of this.state.comp) {
        const e = view.edges[i];
        if (e) edges.push(`${Math.min(e[0], e[1])}_${Math.max(e[0], e[1])}`);
      }
    }
    this.uv.syncFromView(this.state.compMode, {
      verts: this.state.compMode === "vertex" ? [...this.state.comp] : [],
      edges,
      faces: this.state.compMode === "face" ? [...this.state.comp] : [],
    });
    this.hud.uvNote = this.uv.stats();
    this.hud.refreshStats();
    this.syncingSelection = false;
  }

  /* ---- 矩形選択 -------------------------------------------------------- */

  private startMarquee(p: ScreenPoint): void {
    this.marquee = { x0: p.x, y0: p.y, x1: p.x, y1: p.y };
    this.marqueeEl.style.display = "block";
    this.updateMarquee(p);
  }

  private updateMarquee(p: ScreenPoint): void {
    const m = this.marquee;
    if (!m) return;
    m.x1 = p.x;
    m.y1 = p.y;
    // 座標は 3D ペインの中のもの。枠は #vp に置いてあるので、ペインの位置ぶんずらす
    // （UV モードの分割表示だと、ずらさないと 2D 側に枠が出る）
    const pane = byId("pane3d");
    // 分割しているときは、そのペインの位置ぶんもずらす（`25` の T6）
    const split = this.viewport.paneRect(this.viewport.inputPane);
    const dx = pane.offsetLeft + split.x;
    const dy = pane.offsetTop + split.y;
    this.marqueeEl.style.left = `${Math.min(m.x0, m.x1) + dx}px`;
    this.marqueeEl.style.top = `${Math.min(m.y0, m.y1) + dy}px`;
    this.marqueeEl.style.width = `${Math.abs(m.x1 - m.x0)}px`;
    this.marqueeEl.style.height = `${Math.abs(m.y1 - m.y0)}px`;
  }

  private endMarquee(): void {
    this.marquee = null;
    this.marqueeEl.style.display = "none";
  }

  /** 選択の中心（ワールド）。Maya と同じで、オブジェクトなら原点、コンポーネントなら境界箱の中心。 */
  private pivotWorld(): Vector3 | null {
    const o = this.state.selected;
    if (!o) return null;
    const view = this.viewport.viewOf(o);
    if (!view) return null;
    // 手で動かしたピボットがあればそれ。選択を変えると消える
    const over = this.state.pivotOverride;
    if (over) return new Vector3(over.x, over.y, over.z);
    view.group.updateMatrixWorld();
    if (this.state.compMode === "object" || !this.state.comp.size) {
      return new Vector3().setFromMatrixPosition(view.group.matrixWorld);
    }
    const verts = this.selector.selectedVertices();
    if (!verts.length) return null;
    const min = new Vector3(Infinity, Infinity, Infinity);
    const max = new Vector3(-Infinity, -Infinity, -Infinity);
    for (const v of verts) {
      const p = o.mesh.getPosition(v);
      const w = new Vector3(p[0], p[1], p[2]).applyMatrix4(view.group.matrixWorld);
      min.min(w);
      max.max(w);
    }
    return min.add(max).multiplyScalar(0.5);
  }

  /* ---- マーキングメニュー ---------------------------------------------- */

  /**
   * 右クリック（PC）/ ビューポート長押し（タブレット）で開く。
   * 通常は選択モードの切り替え。Shift 側は編集メニュー（移植は順次）。
   * 配置は Maya のポリゴン用マーキングメニューと同じ 8 方位。
   */
  private openMarkingMenu(x: number, y: number, edit: boolean): void {
    this.closePopup();
    openRadial(edit ? this.editMenu() : this.selectModeMenu(), x, y);
  }

  /**
   * 指 2 本の長押し。
   * 何も選んでいなければカメラ、選んでいれば編集メニュー（ユーザー要望）。
   */
  private openTwoFingerMenu(x: number, y: number): void {
    this.closePopup();
    if (this.state.selected) {
      openRadial(this.editMenu(), x, y);
      return;
    }
    openRadial(this.cameraMenu(), x, y, this.savedCameraItems());
  }

  /** カメラのサークルメニュー。並びは Maya のビュー切り替えに合わせる。 */
  private cameraMenu(): RadialMenu {
    const go = (name: ViewName): RadialItem => ({
      label: STANDARD_VIEWS[name].label,
      sub: STANDARD_VIEWS[name].sub,
      icon: ICONS.camera,
      run: () => this.setView(name),
    });
    return {
      N: go("persp"),
      NE: { label: "新規カメラ", sub: "New Camera", icon: ICONS.camera, run: () => this.addCamera() },
      E: go("right"),
      SE: go("bottom"),
      S: go("front"),
      SW: go("back"),
      W: go("top"),
      NW: go("left"),
    };
  }

  /** 控えたカメラ。輪の下に一覧で並べる。 */
  private savedCameraItems(): RadialItem[] {
    return this.state.cameras.map((c) => ({ label: c.name, run: () => this.recallCamera(c) }));
  }

  private setView(name: ViewName): void {
    // ロック中は視点も名前も変えない（`25` の T5）
    if (this.state.camOpts.locked) {
      this.hud.toast("カメラがロックされています（カメラのオプションで外せます）");
      return;
    }
    this.viewport.setView(name);
    this.state.viewName = STANDARD_VIEWS[name].label;
    this.refresh();
    this.hud.toast(`${STANDARD_VIEWS[name].label}ビュー`);
  }

  /** 今の視点に名前を付けて控える（Maya の camera1、camera2 …）。 */
  private addCamera(): void {
    const cam = this.viewport.cam;
    const saved: CameraBookmark = {
      name: `camera${this.state.cameras.length + 1}`,
      theta: cam.theta,
      phi: cam.phi,
      distance: cam.distance,
      target: [cam.target.x, cam.target.y, cam.target.z],
      focal: this.state.camOpts.focal,
      ortho: this.state.camOpts.ortho,
    };
    this.state.cameras.push(saved);
    this.state.viewName = saved.name;
    this.refresh();
    this.hud.toast(`${saved.name} を控えました`);
  }

  private recallCamera(c: CameraBookmark): void {
    if (this.state.camOpts.locked) {
      this.hud.toast("カメラがロックされています（カメラのオプションで外せます）");
      return;
    }
    const cam = this.viewport.cam;
    cam.theta = c.theta;
    cam.phi = c.phi;
    cam.distance = c.distance;
    cam.target.set(c.target[0], c.target[1], c.target[2]);
    if (c.focal !== undefined) this.state.camOpts.focal = c.focal;
    if (c.ortho !== undefined) this.state.camOpts.ortho = c.ortho;
    this.viewport.applyCamera();
    this.state.viewName = c.name;
    this.refresh();
    this.hud.toast(`${c.name} に切り替えました`);
  }

  /** マニピュレータの種類。長押しで出す。 */
  /**
   * モードの切替（`23` の T1）。
   *
   * 画面の上にあるボタンなので、サークルメニューではなく下に開く一覧にする。
   * 指を出す向きを覚えるより、並んだものから選ぶほうが速い場所。
   */
  private openModeMenu(anchor: HTMLElement): void {
    // 出ているときにもう一度押したら閉じる
    if (this.popup?.dataset.menu === "mode") {
      this.closePopup();
      return;
    }
    this.closePopup();
    const r = anchor.getBoundingClientRect();
    const pop = el("div", "panel floating");
    pop.dataset.menu = "mode";
    pop.style.left = `${r.left}px`;
    pop.style.top = `${r.bottom + 2}px`;
    const body = el("div", "pbody");
    for (const m of MODE_ORDER) {
      const b = el("button", "act mode");
      b.setAttribute("aria-pressed", String(this.state.mode === m.id));
      b.innerHTML = iconSvg(m.icon);
      b.appendChild(el("span", undefined, MODE_LABELS[m.id]));
      b.appendChild(el("span", "en", m.en));
      b.addEventListener("click", () => {
        this.closePopup();
        this.setMode(m.id);
      });
      body.appendChild(b);
    }
    pop.appendChild(body);
    document.body.appendChild(pop);
    this.popup = pop;
    this.popupAnchor = anchor;
  }

  /**
   * モードを切り替える。モデリング以外はまだ予定表を出すだけ。
   * ツール列とゲージの中身はモードの定義から描き直す。
   */
  setMode(mode: Mode): void {
    if (this.state.mode === mode) return;
    this.state.mode = mode;
    byId("modeLabel").textContent = MODE_LABELS[mode];
    this.closePopup();
    this.multicut.clear();
    this.preselect.clear();

    // 予定表は stage と入れ替える。3D の描画ループは止めない（戻ったとき即座に出る）
    const stub = byId("modeStub");
    stub.textContent = "";
    // スカルプトは 3D を出す（`32` の T3）。予定表はもう出さない
    const def = mode === "sculpt" ? null : STUBS[mode];
    if (mode === "uv") this.enterUv();
    else this.leaveUv();
    if (mode === "sculpt") {
      // 細分割に使う wasm を読み始める。読めなくても JS で動く
      void warmUpLevels();
      // 段の上げ下げはオブジェクト単位。コンポーネント選択は持ち込まない
      this.setCompMode("object");
      this.fitBrushToSelection();
    }
    // モードで見せる段が変わる（スカルプトは activeLevel、それ以外は 0）
    for (const o of this.state.doc.objects) {
      if (o.activeLevel > 0) this.viewport.rebuildObject(o);
    }
    if (def) {
      stub.appendChild(buildStub(def));
      stub.hidden = false;
      byId("stage").hidden = true;
    } else {
      stub.hidden = true;
      byId("stage").hidden = false;
      this.viewport.resize();
    }

    this.renderToolColumn();
    this.refresh();
    this.hud.toast(MODE_LABELS[mode]);
  }

  /**
   * UV モードのツール列（`21` の 3 章）。
   * 選択とマニピュレータとスナップはグループ、毎回使うものはコマンドのまま。
   */
  private uvToolColumn(): ToolEntry[] {
    const uv = this.uv;
    if (!uv) return [];
    const UNIT_ICONS: Record<UvUnit, string> = {
      vertex: ICONS.vVert,
      edge: ICONS.vEdge,
      shell: ICONS.vFace,
    };
    const cmd = (id: string, icon: string, title: string, run: () => void): ToolEntry => ({
      kind: "button",
      id,
      icon,
      title,
      onTap: run,
    });
    return [
      { kind: "label", text: "選択" },
      {
        kind: "button",
        id: "select",
        icon: () => UNIT_ICONS[uv.unit],
        title: "UV の選択（長押しで 頂点 / エッジ / シェル）",
        radial: () => ({
          E: { label: "UV 頂点", sub: "Vertex", icon: ICONS.vVert, run: () => this.setUvUnit("vertex") },
          S: { label: "UV エッジ", sub: "Edge", icon: ICONS.vEdge, run: () => this.setUvUnit("edge") },
          W: { label: "UV シェル", sub: "Shell", icon: ICONS.vFace, run: () => this.setUvUnit("shell") },
        }),
        options: () => [selectSection(this.optionsState(), this.panelHost())],
        onTap: () => {},
      },
      {
        kind: "button",
        id: "xform",
        icon: () => (this.state.pivotEdit ? ICONS.pivot : MANIP_ICONS[this.state.manip]),
        title: "変形（長押しで マニピュレータ / ピボット）",
        pressed: () => this.state.pivotEdit,
        radial: () => this.manipulatorMenu(),
        options: () => this.xformOptions(),
        onTap: () => {},
      },
      {
        kind: "button",
        id: "snap",
        icon: () => (this.state.uvSnap.kind === "vertex" ? ICONS.vVert : ICONS.snap),
        title: "スナップ（タップでオン / オフ · 長押しで種類）",
        pressed: () => this.state.snapOn,
        radial: () => this.uvSnapMenu(),
        onTap: () => this.toggleSnap(),
      },
      { kind: "separator" },
      { kind: "label", text: "UV" },
      {
        kind: "button",
        id: "unfold",
        icon: ICONS.smooth,
        title: "展開（タップで開き直す · 長押しで自動 UV と方式）",
        radial: () => ({
          N: { label: "展開", sub: "Unfold", icon: ICONS.smooth, run: () => uv.unfold() },
          E: { label: "自動 UV", sub: "Auto", icon: ICONS.mUV, run: () => uv.autoUnwrap() },
          S: { label: "整列", sub: "Layout", icon: ICONS.vMulti, run: () => uv.repack() },
          SW: {
            label: "歪みを色で",
            sub: "Heat  9",
            icon: ICONS.heat,
            run: () => this.toggleUvHeat(!this.state.uvHeat),
          },
        }),
        onTap: () => uv.unfold(),
      },
      {
        kind: "button",
        id: "cutsew",
        icon: () => UV_CUT_ICONS[this.state.lastUvCut],
        title: "カット / ソー（タップで最後に使ったもの · 長押しで選ぶ）",
        radial: () => ({
          N: { label: "カット", sub: "Cut", icon: ICONS.multicut, run: () => this.doUvCut("cut") },
          E: { label: "移動して縫う", sub: "Move and Sew", icon: ICONS.vEdge, run: () => this.doUvCut("moveSew") },
          S: { label: "その場で縫う", sub: "Sew", icon: ICONS.vVert, run: () => this.doUvCut("sew") },
        }),
        // オプションを持たない、毎回使うコマンドなのでタップは実行（`21` の 1.1 の例外）
        onTap: () => this.doUvCut(this.state.lastUvCut),
      },
      { kind: "separator" },
      cmd("frame", ICONS.frame, "選択にフレーム", () => uv.frame()),
      cmd("uvopts", ICONS.options, "UV のオプション（歪み / チェッカー / パッキング / スナップ）", () =>
        this.openGroupOptions("uvopts", () => this.uvUnfoldOptions()),
      ),
      // 3D ビューも出ているので、カメラと追加はモデリングと同じものを置く
      { kind: "separator" },
      { kind: "label", text: "3D" },
      {
        kind: "button",
        id: "camera",
        icon: ICONS.camera,
        title: "カメラ（長押しでビューの切り替え · タップで設定）",
        pressed: () => this.state.camOpts.ortho,
        badge: () => (this.state.camOpts.locked ? "🔒" : ""),
        radial: () => this.cameraMenu(),
        radialList: () => this.savedCameraItems(),
        options: () => [cameraSection(this.optionsState(), this.panelHost())],
        onTap: () => {},
      },
      {
        kind: "button",
        id: "add",
        icon: () => PRIMITIVE_ICONS[this.primitiveIconKind()] ?? ICONS.prim,
        title: "追加（長押しでプリミティブを選ぶ · タップで入力ノード）",
        radial: () => this.primitiveMenu(),
        options: () => [primitiveSection(this.optionsState(), this.panelHost())],
        onTap: () => {},
      },
    ];
  }

  /**
   * カット / ソー（`24` の T5）。最後に使ったものがボタンのアイコンになる。
   * 頂点単位のときは「移動して縫う」も「その場で縫う」と同じ動き。
   */
  private doUvCut(kind: UvCutKind): void {
    const uv = this.uv;
    if (!uv) return;
    this.state.lastUvCut = kind;
    this.remember("lastUvCut", kind);
    this.renderToolColumn();
    if (kind === "cut") uv.cutOrSew(true);
    else if (kind === "sew" || uv.unit === "vertex") uv.cutOrSew(false);
    else uv.moveAndSew();
  }

  private setUvUnit(unit: UvUnit): void {
    this.uv?.setUnit(unit);
    this.renderToolColumn();
  }

  private uvUnfoldOptions(): HTMLElement[] {
    const state = this.optionsState();
    if (!state.uv) return [];
    const host = this.panelHost();
    return [...uvUnfoldSection(state.uv, host, state), uvSnapSection(state.uv, state, host)];
  }

  /* ---- UV モード -------------------------------------------------------- */

  /** UV モードへ入る。初回はここで 2D ビューを作る。 */
  private enterUv(): void {
    // UV モードの 3D 側は 1 画面にする（2D と並ぶので、これ以上は割らない。`25` の T6）
    if (this.viewport.layout !== "single") {
      this.viewport.setLayout("single");
      this.viewport.applyDisplayAll();
      this.renderToolColumn();
    }
    const object = this.state.selected;
    if (!this.uv) {
      this.uv = new UvMode(byId("paneUv"), byId<HTMLCanvasElement>("uvgl"), {
        object: () => this.state.selected,
        recipe: () => this.state.selected?.uv ?? null,
        changed: (note) => {
          const o = this.state.selected;
          if (o) this.viewport.rebuildObject(o);
          this.viewport.rebuildOverlay();
          this.hud.uvNote = this.uv?.stats() ?? null;
          this.refresh();
          if (note) this.hud.toast(note);
        },
        snapshot: () => this.history.snapshot(),
        commit: (label, snapshot) => this.history.commit(label, snapshot as ReturnType<History["snapshot"]>),
        syncToView: (selection) => {
          // 2D の選択を 3D へ。単位も合わせる（Maya と同じで選択は共通）
          if (this.syncingSelection) return;
          this.syncingSelection = true;
          const o = this.state.selected;
          this.state.compMode = selection.mode;
          this.state.comp.clear();
          if (selection.mode === "vertex") {
            for (const v of selection.verts) this.state.comp.add(v);
          } else if (selection.mode === "edge") {
            // エッジは「頂点の組」で来るので、ビューの並びに直す
            const view = o ? this.viewport.viewOf(o) : undefined;
            const want = new Set(selection.edges);
            view?.edges.forEach(([a, b], i) => {
              if (want.has(`${Math.min(a, b)}_${Math.max(a, b)}`)) this.state.comp.add(i);
            });
          } else {
            for (const f of selection.faces) this.state.comp.add(f);
          }
          this.viewport.applyDisplayAll();
          this.viewport.rebuildOverlay();
          this.refreshManipulator();
          this.hud.refreshStats();
          this.syncCompModeButtons();
          this.syncingSelection = false;
        },
        markingMenu: (x, y, edit) => {
          this.closePopup();
          openRadial(edit ? this.uvEditMenu() : this.uvSelectMenu(), x, y);
        },
        cameraMenu: (x, y) => {
          this.closePopup();
          openRadial(
            {
              N: { label: "0〜1 にフレーム", sub: "Unit", icon: ICONS.frame, run: () => this.uv?.view.frameUnit() },
              S: { label: "選択にフレーム", sub: "Frame  F", icon: ICONS.frame, run: () => this.uv?.frame() },
            },
            x,
            y,
          );
        },
        hint: (html) => {
          byId("hudHint").innerHTML = html;
        },
        toast: (text) => this.hud.toast(text),
        undo: () => this.doUndo(),
        redo: () => this.doRedo(),
        shiftOn: (e) => this.state.modOn("shift") || e.shiftKey,
        ctrlOn: (e) => this.state.modOn("ctrl") || e.ctrlKey || e.metaKey,
        marquee: (rect) => {
          // 枠は #vp の中に置いてあるので、2D ペインのぶんだけずらす
          if (!rect) {
            this.marqueeEl.style.display = "none";
            return;
          }
          const pane = byId("paneUv");
          const dx = pane.offsetLeft;
          const dy = pane.offsetTop;
          this.marqueeEl.style.display = "block";
          this.marqueeEl.style.left = `${Math.min(rect.x0, rect.x1) + dx}px`;
          this.marqueeEl.style.top = `${Math.min(rect.y0, rect.y1) + dy}px`;
          this.marqueeEl.style.width = `${Math.abs(rect.x1 - rect.x0)}px`;
          this.marqueeEl.style.height = `${Math.abs(rect.y1 - rect.y0)}px`;
        },
        uvSnap: () => (this.state.snapping ? this.state.uvSnap : null),
        selectedFaces: () => (this.state.compMode === "face" ? [...this.state.comp] : []),
        manipSize: () => this.state.manipSize,
        pivotEdit: () => this.state.pivotEdit,
        smoothAngle: () => this.state.smoothAngle,
        heatOn: () => this.state.uvHeat,
      });
      this.uv.view.setChecker(this.state.checker.cells, this.state.checker.pattern);
      this.buildUvSwitch();
    }
    // レシピが無ければ、今ある UV をそのまま取り込む（`17` の 1 章）。
    // ここで開き直すとプリミティブの UV が消えてしまう
    let imported: number | null = null;
    if (object && !object.uv) {
      object.uv = recipeFromMesh(object.mesh);
      imported = recompute(object.mesh, object.uv).charts.length;
      this.viewport.rebuildObject(object);
    }
    byId("paneUv").hidden = false;
    byId("uvSwitch").hidden = false;
    this.applyUvSplit();
    this.uv.start();
    this.uvObject = object;
    this.uv.rebuild();
    this.hud.uvNote = this.uv.stats();
    // 3D で面を選んでいたら、その島を選んでおく
    this.pushSelectionToUv();
    if (imported !== null) {
      this.hud.toast(
        `今の UV を取り込んだ — 島 ${imported}（「展開」を押すまで開き直しません）`,
      );
    }
  }

  /**
   * 選んでいるものが変わったあとの後始末（`25` の T1）。
   *
   * UV モードなら、**2D の中身も新しい対象に入れ替える**。今までは
   * UV モードに入ったときのオブジェクトを出したままだった。
   */
  private afterSelectionChange(): void {
    if (this.state.mode !== "uv" || !this.uv) return;
    const object = this.state.selected;
    if (object === this.uvObject) return;
    this.uvObject = object;
    // レシピが無ければ、今ある UV をそのまま取り込む（`17` の 1 章）
    if (object && !object.uv) {
      object.uv = recipeFromMesh(object.mesh);
      recompute(object.mesh, object.uv);
      this.viewport.rebuildObject(object);
    }
    // 前の対象で選んでいた島は、新しい対象では意味が無い
    this.uv.chosen.clear();
    this.uv.rebuild();
    this.hud.uvNote = this.uv.stats();
    this.hud.refreshStats();
  }

  private leaveUv(): void {
    this.hud.uvNote = null;
    if (!this.uv) return;
    this.uv.stop();
    byId("paneUv").hidden = true;
    byId("uvSwitch").hidden = true;
    byId("vp").classList.remove("split", "uvonly");
    this.viewport.resize();
  }

  /** 2D / 両方 / 3D の切替。 */
  private buildUvSwitch(): void {
    const host = byId("uvSwitch");
    host.textContent = "";
    for (const [key, label] of [
      ["uv", "2D"],
      ["both", "両方"],
      ["view", "3D"],
    ] as const) {
      const b = el("button") as HTMLButtonElement;
      b.textContent = label;
      b.dataset.split = key;
      b.addEventListener("click", () => {
        this.uvSplit = key;
        this.applyUvSplit();
      });
      host.appendChild(b);
    }
  }

  private applyUvSplit(): void {
    const vp = byId("vp");
    vp.classList.toggle("split", this.uvSplit === "both");
    vp.classList.toggle("uvonly", this.uvSplit === "uv");
    byId("paneUv").hidden = this.uvSplit === "view";
    for (const b of byId("uvSwitch").querySelectorAll("button")) {
      b.setAttribute("aria-pressed", String((b as HTMLElement).dataset.split === this.uvSplit));
    }
    // レイアウトが変わったので両方に伝える
    requestAnimationFrame(() => {
      this.viewport.resize();
      this.uv?.resize();
    });
  }

  /** UV の選択モード。マーキングメニュー（`15` の 6.2）。 */
  private uvSelectMenu(): RadialMenu {
    const go = (unit: UvUnit) => () => this.uv?.setUnit(unit);
    const uv = this.uv;
    return {
      N: { label: "UV エッジ", sub: "UV Edge", icon: ICONS.vEdge, run: go("edge") },
      NE: { label: "オブジェクト", sub: "Object", icon: ICONS.vObj, run: () => this.setMode("model") },
      E: { label: "UV シェル", sub: "Shell", icon: ICONS.vFace, run: go("shell") },
      // 選択メニューからもカット / ソーに届くようにする（`17` の 2.1）
      SE: { label: "カット", sub: "Cut", icon: ICONS.multicut, run: () => uv?.cutOrSew(true) },
      S: { label: "面（3D と同期）", sub: "Face", icon: ICONS.vFace, run: go("shell") },
      SW: {
        label: "移動して縫う",
        sub: "Move and Sew",
        icon: ICONS.vEdge,
        run: () => (uv?.unit === "vertex" ? uv?.cutOrSew(false) : uv?.moveAndSew()),
      },
      W: { label: "UV 頂点", sub: "UV Vertex", icon: ICONS.vVert, run: go("vertex") },
    };
  }

  /**
   * UV の編集メニュー。単位ごとに中身が変わる（`17` の 2.2）。
   * 北 / 北東 / 東 は「展開 / カット / ソー」で固定する。指が位置を覚えられるように。
   */
  private uvEditMenu(): RadialMenu {
    const uv = this.uv;
    if (!uv) return {};
    const head: RadialMenu = {
      N: { label: "展開", sub: "Unfold", icon: ICONS.smooth, run: () => uv.unfold() },
      NE: { label: "カット", sub: "Cut", icon: ICONS.multicut, run: () => uv.cutOrSew(true) },
      E: {
        label: uv.unit === "vertex" ? "ソー" : "移動して縫う",
        sub: uv.unit === "vertex" ? "Sew" : "Move and Sew",
        icon: ICONS.vEdge,
        run: () => (uv.unit === "vertex" ? uv.cutOrSew(false) : uv.moveAndSew()),
      },
    };
    if (uv.unit === "edge") {
      return {
        ...head,
        SE: { label: "整列", sub: "Layout", icon: ICONS.vMulti, run: () => uv.repack() },
        S: { label: "直線化", sub: "Straighten", icon: ICONS.vEdge, run: () => uv.tidy("straighten") },
        SW: {
          label: "境界の直線化",
          sub: "Straighten Border",
          icon: ICONS.vEdge,
          run: () => uv.straightenBorderEdges(),
        },
        W: { label: "整列 V", sub: "Align V", icon: ICONS.vMulti, run: () => uv.tidy("alignV") },
        NW: { label: "マージ", sub: "Merge", icon: ICONS.vVert, run: () => uv.tidy("merge") },
      };
    }
    if (uv.unit === "vertex") {
      return {
        ...head,
        SE: { label: "ピン", sub: "Pin", icon: ICONS.vVert, run: () => uv.pinOrUnpin(true) },
        S: { label: "ピン解除", sub: "Unpin", icon: ICONS.vVert, run: () => uv.pinOrUnpin(false) },
        SW: { label: "整列 U", sub: "Align U", icon: ICONS.vMulti, run: () => uv.tidy("alignU") },
        W: { label: "整列 V", sub: "Align V", icon: ICONS.vMulti, run: () => uv.tidy("alignV") },
        NW: { label: "対称", sub: "Symmetry", icon: ICONS.sym, run: () => uv.tidy("symmetry") },
      };
    }
    return {
      ...head,
      // 自動 UV は「展開」の長押しへ移した（`20` の T7）。ここは整えるものだけ
      SE: { label: "90° 回転", sub: "Rotate", icon: ICONS.rotate, run: () => uv.transformSelection("rotate90") },
      S: { label: "整列", sub: "Layout", icon: ICONS.vMulti, run: () => uv.repack() },
      SW: { label: "格子化", sub: "Gridding", icon: ICONS.wire, run: () => uv.gridChart() },
      W: { label: "反転 U", sub: "Flip U", icon: ICONS.sym, run: () => uv.transformSelection("flipU") },
      NW: { label: "反転 V", sub: "Flip V", icon: ICONS.sym, run: () => uv.transformSelection("flipV") },
    };
  }

  /** スナップのオン / オフ。種類はそのまま。 */
  private toggleSnap(): void {
    this.state.snapOn = !this.state.snapOn;
    this.syncToggleButtons();
    this.refresh();
    this.hud.toast(
      this.state.snapOn ? `スナップ オン: ${SNAP_LABEL[this.state.snap.kind]}` : "スナップ オフ",
    );
  }

  /** 種類を選ぶ。選んだらスナップも立てる（選んだのに効かないと分かりにくい）。 */
  private setSnapKind(kind: SnapKind): void {
    this.state.snap.kind = kind;
    this.state.snapOn = true;
    this.renderToolColumn();
    this.syncToggleButtons();
    this.refresh();
    this.hud.toast(`スナップ: ${SNAP_LABEL[kind]}`);
  }

  private snapMenu(): RadialMenu {
    return {
      N: { label: "グリッド", sub: "Grid  X", icon: ICONS.wire, run: () => this.setSnapKind("grid") },
      E: { label: "頂点", sub: "Point  V", icon: ICONS.vVert, run: () => this.setSnapKind("vertex") },
      S: { label: "カーブ / エッジ", sub: "Curve  C", icon: ICONS.vEdge, run: () => this.setSnapKind("edge") },
      W: { label: "サーフェス", sub: "Surface", icon: ICONS.vFace, run: () => this.setSnapKind("surface") },
      SE: {
        label: "オプション…",
        sub: "Options",
        icon: ICONS.snap,
        run: () => this.openGroupOptions("snap", () => [snapSection(this.optionsState(), this.panelHost())]),
      },
      SW: {
        label: "オフ",
        sub: "Off",
        icon: ICONS.snap,
        run: () => {
          this.state.snapOn = false;
          this.syncToggleButtons();
          this.refresh();
          this.hud.toast("スナップ オフ");
        },
      },
    };
  }

  /** UV のスナップ。行き先はグリッドと UV 頂点だけ（`17` の 7.4）。 */
  private uvSnapMenu(): RadialMenu {
    const grid = (step: number, label: string): RadialItem => ({
      label,
      sub: "Grid",
      icon: ICONS.wire,
      run: () => {
        this.state.uvSnap = { kind: "grid", step };
        this.state.snapOn = true;
        this.syncToggleButtons();
        this.refresh();
        this.hud.toast(`UV スナップ: グリッド ${label}`);
      },
    });
    return {
      N: grid(1 / 8, "1/8"),
      NE: grid(1 / 16, "1/16"),
      E: grid(1 / 32, "1/32"),
      S: {
        label: "UV 頂点",
        sub: "UV Point",
        icon: ICONS.vVert,
        run: () => {
          this.state.uvSnap = { ...this.state.uvSnap, kind: "vertex" };
          this.state.snapOn = true;
          this.syncToggleButtons();
          this.refresh();
          this.hud.toast("UV スナップ: UV 頂点");
        },
      },
      SW: {
        label: "オフ",
        sub: "Off",
        icon: ICONS.snap,
        run: () => {
          this.state.snapOn = false;
          this.syncToggleButtons();
          this.refresh();
          this.hud.toast("スナップ オフ");
        },
      },
    };
  }

  private shadingMenu(): RadialMenu {
    return {
      N: { label: "ワイヤーフレーム", sub: "4", icon: ICONS.wire, run: () => this.setDisplay("wire") },
      E: { label: "シェード", sub: "5", icon: ICONS.shaded, run: () => this.setDisplay("shaded") },
      S: { label: "シェード + ワイヤー", sub: "6", icon: ICONS.shadedWire, run: () => this.setDisplay("shadedWire") },
      W: { label: "スムースシェード", sub: "7", icon: ICONS.smooth, run: () => this.setDisplay("smooth") },
      NW: { label: "チェッカー", sub: "8", icon: ICONS.mUV, run: () => this.setDisplay("checker") },
      NE: { label: "ヒートマップ", sub: "9", icon: ICONS.heat, run: () => this.setDisplay("heat") },
    };
  }

  /**
   * ビューポートの分割（`25` の T6）。1 / 2（左右）/ 2（上下）/ 4。
   * 3 分割は入れない（レイアウトが別物になるうえ、ほとんど使われない）。
   */
  private layoutMenu(): RadialMenu {
    const go = (kind: LayoutKind, label: string, sub: string, icon: string) => ({
      label,
      sub,
      icon,
      run: () => this.setLayout(kind),
    });
    return {
      N: go("single", "1 画面", "Single", ICONS.layout1),
      E: go("cols", "2 画面（左右）", "Two Columns", ICONS.layoutCols),
      S: go("quad", "4 画面", "Four", ICONS.layoutQuad),
      W: go("rows", "2 画面（上下）", "Two Rows", ICONS.layoutRows),
    };
  }

  /** タップで 1 → 2 → 4 → 1 と回す。縦持ちの「2」は上下にする。 */
  private cycleLayout(): void {
    // 縦持ちなら「2」は上下（横に割ると細長くなりすぎる）
    const two: LayoutKind = byId("stage").classList.contains("portrait") ? "rows" : "cols";
    const next: LayoutKind =
      this.viewport.layout === "single" ? two : this.viewport.layout === "quad" ? "single" : "quad";
    this.setLayout(next);
  }

  private setLayout(kind: LayoutKind): void {
    if (this.state.mode === "uv" && kind !== "single") {
      this.hud.toast("UV モードの 3D は 1 画面です");
      return;
    }
    this.viewport.setLayout(kind);
    this.viewport.applyDisplayAll();
    this.viewport.rebuildOverlay();
    this.renderToolColumn();
    this.refresh();
    this.hud.toast(`${LAYOUT_LABEL[kind]}`);
  }

  private selectModeMenu(): RadialMenu {
    const todo = (name: string) => () => this.hud.toast(`${name} は未実装です`);
    return {
      N: { label: "エッジ", sub: "Edge", icon: ICONS.vEdge, run: () => this.setCompMode("edge") },
      NE: { label: "オブジェクト モード", sub: "Object", icon: ICONS.vObj, run: () => this.setCompMode("object") },
      // 東は空き。UV は選択モードではなく独立した UV モードにする
      SE: { label: "マルチ", sub: "Multi", icon: ICONS.vMulti, run: todo("マルチコンポーネント選択") },
      S: { label: "フェース", sub: "Face", icon: ICONS.vFace, run: () => this.setCompMode("face") },
      SW: { label: "頂点フェース", sub: "Vertex Face", icon: ICONS.vVertFace, run: todo("頂点フェース選択") },
      W: { label: "頂点", sub: "Vertex", icon: ICONS.vVert, run: () => this.setCompMode("vertex") },
      // CTL ラッチ中は縮小になる（Maya の Grow / Shrink）
      NW: this.state.modOn("ctrl")
        ? { label: "選択を縮小", sub: "Shrink  <", icon: ICONS.vMulti, run: () => this.growOrShrink(false) }
        : { label: "選択を拡張", sub: "Grow  >", icon: ICONS.vMulti, run: () => this.growOrShrink(true) },
    };
  }

  /** 編集メニュー。選択モードごとに中身が変わる。移植が済んだものから実装に差し替える。 */
  private editMenu(): RadialMenu {
    const todo = (name: string) => () => this.hud.toast(`${name} は未実装です`);
    if (this.state.compMode === "face") {
      return {
        N: { label: "押し出し", sub: "Extrude", icon: ICONS.extrude, run: () => this.doExtrudeFaces() },
        NE: { label: "ベベル", sub: "Bevel", icon: ICONS.scale, run: todo("ベベル") },
        E: { label: "ブリッジ", sub: "Bridge", icon: ICONS.vEdge, run: todo("ブリッジ") },
        SE: { label: "複製", sub: "Duplicate", icon: ICONS.dup, run: () => this.doDuplicateFaces() },
        S: { label: "削除", sub: "Delete", icon: ICONS.del, run: () => this.doDeleteFaces() },
        SW: { label: "コラプス", sub: "Collapse", icon: ICONS.vVert, run: () => this.doCollapseFaces() },
        W: { label: "スムース", sub: "Smooth", icon: ICONS.smooth, run: () => this.doSmooth() },
        NW: { label: "抽出", sub: "Extract", icon: ICONS.vFace, run: () => this.doExtractFaces() },
      };
    }
    if (this.state.compMode === "edge") {
      return {
        N: { label: "押し出し", sub: "Extrude", icon: ICONS.extrude, run: () => this.doExtrudeEdgesMenu() },
        NE: { label: "ベベル", sub: "Bevel", icon: ICONS.scale, run: () => this.setTool("bevel") },
        E: { label: "ブリッジ", sub: "Bridge", icon: ICONS.vEdge, run: () => this.doBridge() },
        SE: {
          label: "エッジループ挿入",
          sub: "Insert Loop",
          icon: ICONS.multicut,
          run: () => this.setTool("multicut"),
        },
        S: { label: "削除", sub: "Delete", icon: ICONS.del, run: () => this.doDeleteEdges() },
        SW: { label: "スピン", sub: "Spin", icon: ICONS.rotate, run: todo("スピンエッジ") },
        W: { label: "接続", sub: "Connect", icon: ICONS.vMulti, run: () => this.doConnectEdges() },
        NW: { label: "境界を選択", sub: "Boundary", icon: ICONS.vEdge, run: () => this.selectBoundary() },
      };
    }
    if (this.state.compMode === "vertex") {
      return {
        N: { label: "距離でマージ", sub: "Merge", icon: ICONS.vVert, run: () => this.doMergeByDistance() },
        NE: { label: "中心にマージ", sub: "To Center", icon: ICONS.vObj, run: () => this.doMergeVertices() },
        E: { label: "面取り", sub: "Chamfer", icon: ICONS.scale, run: todo("面取り") },
        SE: { label: "接続", sub: "Connect", icon: ICONS.vMulti, run: () => this.doConnectVertices() },
        S: { label: "削除", sub: "Delete", icon: ICONS.del, run: () => this.doDissolveVertices() },
        SW: { label: "平均化", sub: "Average", icon: ICONS.smooth, run: todo("平均化") },
        W: { label: "分離", sub: "Detach", icon: ICONS.vVertFace, run: todo("分離") },
        NW: { label: "押し出し", sub: "Extrude", icon: ICONS.extrude, run: () => this.doExtrudeVertices() },
      };
    }
    return {
      N: { label: "スムース", sub: "Smooth", icon: ICONS.smooth, run: () => this.doSmooth() },
      NE: { label: "中心にピボット", sub: "Center Pivot", icon: ICONS.vObj, run: () => this.doCenterPivot() },
      E: { label: "分離", sub: "Separate", icon: ICONS.vVertFace, run: () => this.doSeparate() },
      SE: { label: "複製", sub: "Duplicate", icon: ICONS.dup, run: () => this.doDuplicate() },
      S: { label: "削除", sub: "Delete", icon: ICONS.del, run: () => this.doDelete() },
      SW: { label: "ミラー", sub: "Mirror", icon: ICONS.sym, run: () => this.doMirror() },
      // ブーリアンはまだ計画に無いので、Maya で隣り合う「結合」を置く
      W: { label: "結合", sub: "Combine", icon: ICONS.prim, run: () => this.doCombine() },
      NW: { label: "フリーズ", sub: "Freeze", icon: ICONS.vObj, run: () => this.doFreeze() },
    };
  }

  private growOrShrink(grow: boolean): void {
    this.applySelectResult(this.selector.growOrShrink(grow));
  }

  private selectBoundary(): void {
    const r = this.selector.selectBoundary();
    if (r.changed) this.syncCompModeButtons();
    this.applySelectResult(r);
    if (!r.changed && r.message) this.hud.toast(r.message);
  }

  /* ---- 編集 ------------------------------------------------------------ */

  /** スムース（Catmull-Clark）。ディバイドの土台。 */
  private doSmooth(): void {
    const o = this.state.selected;
    if (!o) return void this.hud.toast("オブジェクトを選択してください");
    this.history.push("スムース");
    o.mesh = subdivide(o.mesh, 1);
    o.markTopologyChanged();
    this.state.comp.clear();
    this.viewport.rebuildObject(o);
    this.viewport.rebuildOverlay();
    this.refresh();
    this.hud.toast(`スムース — ${o.mesh.faceCount} 面`);
  }

  /**
   * トポロジを変える操作の共通処理。
   * パラメトリックなら通常メッシュに落とし、上位レベルも破棄する（docs/03）。
   */
  private applyTopologyChange(
    o: SceneObject,
    label: string,
    change: () => boolean,
    message: (o: SceneObject) => string,
  ): void {
    const snapshot = this.history.snapshot();
    if (!change()) return;
    const dropped = o.markTopologyChanged();
    this.state.comp.clear();
    this.history.commit(label, snapshot);
    this.viewport.rebuildObject(o);
    this.viewport.rebuildOverlay();
    this.refresh();
    let note = message(o);
    if (dropped.droppedLevels || dropped.droppedLayers) {
      note += ` · 上位レベル ${dropped.droppedLevels} とレイヤー ${dropped.droppedLayers} を破棄`;
    }
    if (dropped.rebased) note += " · UV の土台を取り直した";
    this.hud.toast(note);
  }

  /** 対象を確かめる。合っていなければ理由を出して null。 */
  private requireComponents(mode: CompMode, least = 1): SceneObject | null {
    const o = this.state.selected;
    const name = { object: "オブジェクト", vertex: "頂点", edge: "エッジ", face: "フェース" }[mode];
    if (!o || this.state.compMode !== mode || this.state.comp.size < least) {
      this.hud.toast(`${name}モードで${least > 1 ? `${least} つ以上` : ""}選択してから実行してください`);
      return null;
    }
    return o;
  }

  private doExtrudeFaces(): void {
    const o = this.requireComponents("face");
    if (!o) return;
    let count = 0;
    this.applyTopologyChange(
      o,
      "押し出し",
      () => {
        const r = extrudeFaces(o.mesh, this.state.comp, this.state.toolOpts.extrudeDist);
        if (!r) return false;
        o.mesh = r.mesh;
        count = r.faceCount;
        return true;
      },
      () => `面を押し出し — ${count} 面`,
    );
  }

  private doExtrudeEdgesMenu(): void {
    const o = this.requireComponents("edge");
    if (!o) return;
    const view = this.viewport.viewOf(o);
    if (!view) return;
    const edges = [...this.state.comp].map((i) => view.edges[i]).filter(Boolean);
    let count = 0;
    this.applyTopologyChange(
      o,
      "エッジを押し出し",
      () => {
        const r = extrudeEdges(o.mesh, edges, this.state.toolOpts.extrudeDist);
        if (!r) return false;
        o.mesh = r.mesh;
        count = r.faceCount;
        return true;
      },
      () => `エッジを押し出し — ${count} 面`,
    );
  }

  private doDeleteFaces(): void {
    const o = this.requireComponents("face");
    if (!o) return;
    let removed = 0;
    this.applyTopologyChange(
      o,
      "面を削除",
      () => {
        const r = deleteFaces(o.mesh, this.state.comp);
        if (!r) return false;
        // 使われなくなった頂点はここで詰める
        o.mesh = compact(r.mesh);
        removed = r.removed;
        return true;
      },
      () => `${removed} 面を削除`,
    );
  }

  private doCollapseFaces(): void {
    const o = this.requireComponents("face");
    if (!o) return;
    this.applyTopologyChange(
      o,
      "コラプス",
      () => {
        const m = collapseFaces(o.mesh, this.state.comp);
        if (!m) return false;
        o.mesh = compact(m);
        return true;
      },
      () => "フェースをコラプス",
    );
  }

  private doMergeVertices(): void {
    const o = this.requireComponents("vertex", 2);
    if (!o) return;
    this.applyTopologyChange(
      o,
      "頂点をマージ",
      () => {
        o.mesh = compact(weldVertices(o.mesh, [[...this.state.comp]]));
        return true;
      },
      () => "頂点をマージ",
    );
  }

  /** 距離でマージ。選択が 2 つ以上なら選択の中だけ、1 つ以下ならメッシュ全体。 */
  private doMergeByDistance(): void {
    const o = this.state.selected;
    if (!o || this.state.compMode !== "vertex") {
      this.hud.toast("頂点モードで実行してください");
      return;
    }
    const threshold = this.state.vertexOpts.mergeDist;
    const scope = this.state.comp.size >= 2 ? [...this.state.comp] : undefined;
    const r = mergeByDistance(o.mesh, threshold, scope);
    if (!r) {
      this.hud.toast(`${threshold.toFixed(3)} 以内に重なる頂点がありません`);
      return;
    }
    this.applyTopologyChange(
      o,
      "距離でマージ",
      () => {
        o.mesh = compact(r.mesh);
        return true;
      },
      () => `${r.merged} 頂点をマージ（${threshold.toFixed(3)} 以内）`,
    );
  }

  /** 頂点を消して、囲んでいた面を 1 枚にする。 */
  private doDissolveVertices(): void {
    const o = this.requireComponents("vertex");
    if (!o) return;
    const r = dissolveVertices(o.mesh, this.state.comp);
    if (!r) {
      this.hud.toast("消せる頂点がありません（面が繋がっていない頂点です）");
      return;
    }
    this.applyTopologyChange(
      o,
      "頂点を削除",
      () => {
        o.mesh = compact(r.mesh);
        return true;
      },
      () => `${r.removed} 頂点を削除`,
    );
  }

  /** 頂点を尖らせる。距離はオプションの押し出し距離、太さは頂点オプション。 */
  private doExtrudeVertices(): void {
    const o = this.requireComponents("vertex");
    if (!o) return;
    const r = extrudeVertices(
      o.mesh,
      this.state.comp,
      this.state.toolOpts.extrudeDist,
      this.state.vertexOpts.extrudeWidth,
    );
    if (!r) {
      this.hud.toast("押し出せる頂点がありません（まわりの面が輪になっている必要があります）");
      return;
    }
    this.applyTopologyChange(
      o,
      "頂点を押し出し",
      () => {
        o.mesh = r.mesh;
        return true;
      },
      () => `頂点を押し出し — ${r.faces} 面`,
    );
  }

  private doDeleteEdges(): void {
    const o = this.requireComponents("edge");
    if (!o) return;
    const view = this.viewport.viewOf(o);
    if (!view) return;
    const edges = [...this.state.comp].map((i) => view.edges[i]).filter(Boolean);
    let merged = 0;
    const r = dissolveEdges(o.mesh, edges);
    if (!r) {
      this.hud.toast("結合できるエッジがありません（境界エッジは削除できません）");
      return;
    }
    this.applyTopologyChange(
      o,
      "エッジを削除",
      () => {
        o.mesh = r.mesh;
        merged = r.merged;
        return true;
      },
      () => `エッジを削除 — ${merged} 面を結合`,
    );
  }

  /**
   * ブリッジ。境界エッジの 2 列を面で繋ぐ。
   * 繋げない選び方（本数違い、枝分かれ、境界でない）のときは理由を出して何もしない。
   */
  private doBridge(): void {
    const o = this.requireComponents("edge", 2);
    if (!o) return;
    const view = this.viewport.viewOf(o);
    if (!view) return;
    const edges = [...this.state.comp].map((i) => view.edges[i]).filter(Boolean);
    const r = bridgeEdges(o.mesh, edges, this.state.bridgeSegments);
    if (!r) {
      this.hud.toast("ブリッジできません（境界エッジの 2 列を同じ本数だけ選んでください）");
      return;
    }
    this.applyTopologyChange(
      o,
      "ブリッジ",
      () => {
        o.mesh = r.mesh;
        return true;
      },
      () => `ブリッジ — ${r.faces} 面`,
    );
  }

  /* ---- アトリビュートの転送（`24` の T6） ------------------------------ */

  /**
   * 転送の元。SHF で足したものが 1 つだけのときに決まる。
   * 先は `state.selected`（最後に選んだもの）。Maya と同じ「先に元、最後に先」。
   */
  private transferSource(): SceneObject | null {
    if (!this.state.selected || this.state.also.size !== 1) return null;
    const source = [...this.state.also][0];
    return source === this.state.selected ? null : source;
  }

  /** 転送のカットインを開く（アウトライナの長押しメニューから）。 */
  private openTransferOptions(): void {
    const anchor = this.toolPanelBody?.querySelector<HTMLElement>('[data-group="select"]');
    if (!anchor) return;
    this.openToolOptions(anchor, "transfer", () => [transferSection(this.optionsState(), this.panelHost())]);
  }

  /** 元 → 先を入れ替える。 */
  private swapTransfer(): void {
    const source = this.transferSource();
    const target = this.state.selected;
    if (!source || !target) return;
    this.state.select(source);
    this.state.also.add(target);
    this.viewport.applyDisplayAll();
    this.refresh();
  }

  /** 実行。位置と UV を写して履歴に積む。 */
  private runTransfer(): void {
    const source = this.transferSource();
    const target = this.state.selected;
    if (!source || !target) {
      this.hud.toast("元を 1 つ選んでください（SHF + タップで足す）");
      return;
    }
    const opts = this.state.transfer;
    if (!opts.positions && !opts.uvs) {
      this.hud.toast("位置か UV のどちらかを選んでください");
      return;
    }
    // 上位レベルやスカルプトレイヤーは対応関係が壊れるので、先に捨ててもらう
    if (target.multires.length || target.sculptLayers.length) {
      this.hud.toast("先のマルチレゾを捨ててから実行してください");
      return;
    }
    const r = transferAttributes(
      { mesh: source.mesh, transform: source.transform },
      { mesh: target.mesh, transform: target.transform },
      opts,
    );
    if (!r) {
      this.hud.toast("トポロジが違います（頂点番号は分割が同じときだけ）");
      return;
    }
    const snapshot = this.history.snapshot();
    // 何が実際に変わったかを数える。「効かない」と見えるときの多くは
    // 「同じ値が入っただけ」なので、動いた数を出せば自分で気づける（`25` の T1）
    let movedVerts = 0;
    if (r.positions) {
      const before = target.mesh.positions;
      for (let v = 0; v < target.mesh.vertexCount; v++) {
        const d = Math.hypot(
          r.positions[v * 3] - before[v * 3],
          r.positions[v * 3 + 1] - before[v * 3 + 1],
          r.positions[v * 3 + 2] - before[v * 3 + 2],
        );
        if (d > 1e-6) movedVerts++;
      }
      target.mesh.positions.set(r.positions);
    }
    let movedUv = 0;
    if (r.uv) {
      const before = target.mesh.uvSets.get(UV_SET);
      if (before) {
        for (let i = 0; i < r.uv.length; i += 2) {
          if (Math.abs(r.uv[i] - before[i]) > 1e-6 || Math.abs(r.uv[i + 1] - before[i + 1]) > 1e-6) movedUv++;
        }
      } else {
        movedUv = r.uv.length / 2;
      }
      target.mesh.uvSets.set(UV_SET, r.uv);
      // 切れ目は写した UV から取り直す（元のレシピは先のトポロジに合わない）
      target.uv = recipeFromMesh(target.mesh);
      target.uvHeat = null;
    }
    this.history.commit("アトリビュートの転送", snapshot);
    this.viewport.rebuildObject(target);
    this.viewport.rebuildOverlay();
    this.uv?.rebuild();
    this.refresh();
    // 離れて置いてあるものをワールドで写すと、いちばん近い点が全部「縁」になる。
    // 気づきにくいので、重なっていないときだけ言い添える
    const apart = opts.space === "world" && !this.overlapsInWorld(source, target);
    const parts: string[] = [];
    if (opts.positions) {
      parts.push(
        movedVerts ? `位置 ${movedVerts} / ${target.mesh.vertexCount} 頂点が動いた` : "位置は変わりませんでした（元と同じ形です）",
      );
    }
    if (opts.uvs) {
      const corners = target.mesh.faceOffsets[target.mesh.faceCount];
      parts.push(r.uv ? (movedUv ? `UV ${movedUv} / ${corners} コーナーが動いた` : "UV は変わりませんでした") : "元に UV がありません");
    }
    this.hud.toast(
      `転送 — ${parts.join(" · ")}` + (apart ? "（2 つが重なっていません。ローカルのほうが合うかもしれません）" : ""),
    );
  }

  /** 2 つのワールドの箱が重なっているか。転送の言い添えに使う。 */
  private overlapsInWorld(a: SceneObject, b: SceneObject): boolean {
    const box = (o: SceneObject): [number[], number[]] => {
      const lo = [Infinity, Infinity, Infinity];
      const hi = [-Infinity, -Infinity, -Infinity];
      for (let v = 0; v < o.mesh.vertexCount; v++) {
        const p = o.mesh.getPosition(v);
        const w = transformPoint(o.transform, p[0], p[1], p[2]);
        for (let k = 0; k < 3; k++) {
          if (w[k] < lo[k]) lo[k] = w[k];
          if (w[k] > hi[k]) hi[k] = w[k];
        }
      }
      return [lo, hi];
    };
    const [alo, ahi] = box(a);
    const [blo, bhi] = box(b);
    for (let k = 0; k < 3; k++) if (ahi[k] < blo[k] || bhi[k] < alo[k]) return false;
    return true;
  }

  /** 選んだ頂点どうしを結んで面を分ける。 */
  private doConnectVertices(): void {
    const o = this.requireComponents("vertex", 2);
    if (!o) return;
    const r = connectVertices(o.mesh, this.state.comp);
    if (!r) {
      this.hud.toast("結べる組がありません（同じ面にあり、隣り合っていない 2 点を選んでください）");
      return;
    }
    this.applyTopologyChange(
      o,
      "接続",
      () => {
        o.mesh = r.mesh;
        return true;
      },
      () => `接続 — ${r.edges} 本のエッジ`,
    );
  }

  /** 選んだエッジの中点どうしを結ぶ。 */
  private doConnectEdges(): void {
    const o = this.requireComponents("edge", 2);
    if (!o) return;
    const view = this.viewport.viewOf(o);
    if (!view) return;
    const edges = [...this.state.comp].map((i) => view.edges[i]).filter(Boolean);
    const r = connectEdges(o.mesh, edges);
    if (!r) {
      this.hud.toast("結べる組がありません（同じ面に来るエッジを 2 本以上選んでください）");
      return;
    }
    this.applyTopologyChange(
      o,
      "接続",
      () => {
        o.mesh = r.mesh;
        return true;
      },
      () => `接続 — ${r.edges} 本のエッジ`,
    );
  }

  /* ---- まとまりの操作（B7） -------------------------------------------- */

  /** 選んだ面を、その場に切り離した写しとして足す。 */
  private doDuplicateFaces(): void {
    const o = this.requireComponents("face");
    if (!o) return;
    const r = duplicateFaces(o.mesh, this.state.comp);
    if (!r) return;
    let made = 0;
    this.applyTopologyChange(
      o,
      "フェースの複製",
      () => {
        o.mesh = r.mesh;
        made = r.faces.length;
        return true;
      },
      () => `${made} 面を複製`,
    );
    // 写しを選び直す。そのまま動かせるように
    this.state.comp.clear();
    for (const f of r.faces) this.state.comp.add(f);
    this.viewport.rebuildOverlay();
    this.refresh();
  }

  /** 選んだ面を抜き出して、別のオブジェクトにする。 */
  private doExtractFaces(): void {
    const o = this.requireComponents("face");
    if (!o) return;
    const r = extractFaces(o.mesh, this.state.comp);
    if (!r) {
      this.hud.toast("抽出できません（全部を選ぶと残りが無くなります）");
      return;
    }
    const snapshot = this.history.snapshot();
    o.mesh = r.mesh;
    o.markTopologyChanged();
    const made = this.state.doc.addMesh(r.extracted, `${o.name}_extract`);
    made.transform = cloneTransform(o.transform);
    this.history.commit("フェースの抽出", snapshot);
    this.state.comp.clear();
    this.viewport.syncAll();
    this.state.select(made);
    this.setCompMode("object");
    this.refresh();
    this.hud.toast(`${r.count} 面を ${made.name} へ抽出`);
  }

  /** 繋がっていない塊ごとに、別のオブジェクトへ分ける。 */
  private doSeparate(): void {
    const o = this.state.selected;
    if (!o) return void this.hud.toast("オブジェクトを選択してください");
    const parts = separateShells(o.mesh);
    if (!parts) {
      this.hud.toast("分けられません（繋がった 1 つの塊です）");
      return;
    }
    const snapshot = this.history.snapshot();
    const at = this.state.doc.objects.indexOf(o);
    this.state.doc.objects.splice(at, 1);
    let first: SceneObject | null = null;
    parts.forEach((mesh, i) => {
      const made = this.state.doc.addMesh(mesh, `${o.name}_${i + 1}`);
      made.transform = cloneTransform(o.transform);
      if (!first) first = made;
    });
    this.history.commit("分離", snapshot);
    this.viewport.syncAll();
    this.state.select(first);
    this.refresh();
    this.hud.toast(`${parts.length} 個に分離`);
  }

  /** 選んでいるオブジェクトを 1 つにまとめる。座標は焼き込む。 */
  private doCombine(): void {
    const list = this.state.selectedObjects();
    if (list.length < 2) {
      this.hud.toast("オブジェクトモードで SHF を足して 2 つ以上選んでください");
      return;
    }
    const mesh = combineMeshes(list.map((o) => ({ mesh: o.mesh, transform: o.transform })));
    if (!mesh) return;
    const snapshot = this.history.snapshot();
    for (const o of list) {
      const at = this.state.doc.objects.indexOf(o);
      if (at >= 0) this.state.doc.objects.splice(at, 1);
    }
    const made = this.state.doc.addMesh(mesh, list[0].name);
    this.history.commit("結合", snapshot);
    this.viewport.syncAll();
    this.state.select(made);
    this.refresh();
    this.hud.toast(`${list.length} 個を結合`);
  }

  /** 軸で鏡映して繋ぐ。軸はオプションパネルで選ぶ。 */
  private doMirror(): void {
    const o = this.state.selected;
    if (!o) return void this.hud.toast("オブジェクトを選択してください");
    const axis = this.state.mirrorAxis;
    const r = mirrorMesh(o.mesh, axis, this.state.vertexOpts.mergeDist);
    if (!r) return;
    this.applyTopologyChange(
      o,
      "ミラー",
      () => {
        o.mesh = r.mesh;
        return true;
      },
      () => `ミラー ${"XYZ"[axis]} — ${r.welded} 頂点を溶接`,
    );
  }

  /** ピボットをメッシュの中心へ。座標はそのままで、原点だけ動かす。 */
  private doCenterPivot(): void {
    const o = this.state.selected;
    if (!o) return;
    this.history.push("中心にピボット");
    const c = o.mesh.boundsCenter();
    for (let v = 0; v < o.mesh.vertexCount; v++) {
      const p = o.mesh.getPosition(v);
      o.mesh.setPosition(v, p[0] - c[0], p[1] - c[1], p[2] - c[2]);
    }
    // 見た目が動かないよう、引いたぶんをトランスフォームへ戻す
    o.transform.position = [
      o.transform.position[0] + c[0] * o.transform.scale[0],
      o.transform.position[1] + c[1] * o.transform.scale[1],
      o.transform.position[2] + c[2] * o.transform.scale[2],
    ];
    o.parametric = false;
    this.viewport.rebuildObject(o);
    this.viewport.rebuildOverlay();
    this.refresh();
    this.hud.toast("ピボットを中心へ");
  }

  /** トランスフォームを頂点に焼き込んで、位置と回転とスケールを初期値に戻す。 */
  private doFreeze(): void {
    const o = this.state.selected;
    if (!o) return;
    const view = this.viewport.viewOf(o);
    if (!view) return;
    this.history.push("フリーズ");
    view.group.updateMatrixWorld();
    const m = view.group.matrixWorld;
    for (let v = 0; v < o.mesh.vertexCount; v++) {
      const p = o.mesh.getPosition(v);
      const w = new Vector3(p[0], p[1], p[2]).applyMatrix4(m);
      o.mesh.setPosition(v, w.x, w.y, w.z);
    }
    o.transform = { position: [0, 0, 0], rotation: [0, 0, 0, 1], scale: [1, 1, 1] };
    o.parametric = false;
    this.viewport.rebuildObject(o);
    this.viewport.rebuildOverlay();
    this.refresh();
    this.hud.toast("トランスフォームをフリーズ");
  }

  private doDuplicate(): void {
    const o = this.state.selected;
    if (!o) return;
    this.history.push("複製");
    const copy = this.state.doc.addMesh(o.mesh.clone(), `${o.name}_copy`);
    copy.transform = cloneTransform(o.transform);
    this.state.select(copy);
    this.viewport.syncAll();
    this.refresh();
    this.hud.toast(`${copy.name} を複製しました`);
  }

  private doDelete(): void {
    const o = this.state.selected;
    if (!o) return;
    this.history.push("削除");
    this.state.doc.remove(o);
    this.state.select(null);
    this.viewport.syncAll();
    this.refresh();
    this.hud.toast(`${o.name} を削除しました`);
  }

  /* ---- 履歴 ------------------------------------------------------------ */

  private doUndo(): void {
    const label = this.history.undo();
    if (!label) return;
    this.afterHistory();
    this.hud.toast(`元に戻す: ${label}`);
  }

  private doRedo(): void {
    const label = this.history.redo();
    if (!label) return;
    this.afterHistory();
    this.hud.toast(`やり直す: ${label}`);
  }

  /** 履歴を動かしたあとの立て直し。選択モードも戻るのでボタンも合わせる。 */
  private afterHistory(): void {
    this.viewport.syncAll();
    this.selector.reset();
    this.syncCompModeButtons();
    // UV モードなら 2D も作り直す。レシピが戻っているので切れ目と島も戻る（`19` の 1.3）
    if (this.state.mode === "uv" && this.uv) {
      // 取り消しで別のオブジェクトに戻ることもある（`25` の T1）
      this.afterSelectionChange();
      this.uv.rebuild();
      this.pushSelectionToUv();
    }
    this.refresh();
  }

  private syncCompModeButtons(): void {
    for (const b of document.querySelectorAll<HTMLElement>("[data-comp-mode]")) {
      b.setAttribute("aria-pressed", String(b.dataset.compMode === this.state.compMode));
    }
  }

  /** スナップのように自前でオン / オフを持つツールボタンを描き直す。 */
  private syncToggleButtons(): void {
    this.renderToolColumn();
  }

  private updateHistoryButtons(): void {
    byId<HTMLButtonElement>("btnUndo").disabled = !this.history.canUndo;
    byId<HTMLButtonElement>("btnRedo").disabled = !this.history.canRedo;
  }

  /* ---- ツール列 -------------------------------------------------------- */

  /**
   * ツール列の中身。モードごとに定義を持たせておき、ここから描く。
   * UV モードなどを足すときは、この関数に枝を増やすだけで済む。
   */
  private toolColumn(): ToolEntry[] {
    if (this.state.mode === "uv") return this.uvToolColumn();
    if (this.state.mode === "sculpt") return this.sculptToolColumn();
    if (this.state.mode !== "model") return [];
    return this.modelToolColumn();
  }

  private modelToolColumn(): ToolEntry[] {
    return [
      { kind: "label", text: "選択" },
      {
        kind: "button",
        id: "select",
        icon: () => COMP_ICONS[this.state.compMode],
        title: "選択（長押しで オブジェクト / 頂点 / エッジ / フェース）",
        pressed: () => this.state.tool === "select",
        radial: () => this.selectGroupMenu(),
        options: () => this.selectOptions(),
        onTap: () => this.setTool("select"),
      },
      {
        kind: "button",
        id: "xform",
        icon: () => (this.state.pivotEdit ? ICONS.pivot : MANIP_ICONS[this.state.manip]),
        title: "変形（長押しで ユニバーサル / 移動 / 回転 / スケール / ピボット）",
        pressed: () => this.state.pivotEdit,
        radial: () => this.manipulatorMenu(),
        options: () => this.xformOptions(),
        onTap: () => this.setTool("select"),
      },
      {
        kind: "button",
        id: "edit",
        icon: () => EDIT_ICONS[this.state.lastEdit],
        title: "編集（長押しで マルチカット / ベベル / ブリッジ / 押し出し / 接続 / ウェルド）",
        pressed: () => this.state.tool === "multicut" || this.state.tool === "bevel",
        radial: () => this.editGroupMenu(),
        options: () => this.editOptions(),
        onTap: () => this.activateEdit(this.state.lastEdit),
      },
      {
        kind: "button",
        id: "snap",
        icon: () => SNAP_ICONS[this.state.snap.kind],
        title: "スナップ（タップでオン / オフ · 長押しで種類とオプション）",
        pressed: () => this.state.snapOn,
        radial: () => this.snapMenu(),
        onTap: () => this.toggleSnap(),
      },
      { kind: "separator" },
      // 上段の「表示」（画面の好み）と混ざらないように「シェーディング」（`24` の T4）
      { kind: "label", text: "シェード" },
      {
        kind: "button",
        id: "display",
        icon: () => DISPLAY_ICONS[this.state.display],
        title: "シェーディング（長押しで切り替え。4–8）",
        radial: () => this.shadingMenu(),
        options: () => displaySections(this.optionsState(), this.panelHost()),
        onTap: () => {},
      },
      {
        kind: "button",
        id: "camera",
        icon: ICONS.camera,
        title: "カメラ（長押しでビューの切り替え · タップで設定）",
        pressed: () => this.state.camOpts.ortho,
        badge: () => (this.state.camOpts.locked ? "🔒" : ""),
        radial: () => this.cameraMenu(),
        radialList: () => this.savedCameraItems(),
        options: () => [cameraSection(this.optionsState(), this.panelHost())],
        onTap: () => {},
      },
      {
        kind: "button",
        id: "layout",
        icon: () => LAYOUT_ICONS[this.viewport.layout],
        title: "分割（タップで 1 → 2 → 4 · 長押しで選ぶ）",
        pressed: () => this.viewport.layout !== "single",
        radial: () => this.layoutMenu(),
        onTap: () => this.cycleLayout(),
      },
      { kind: "separator" },
      { kind: "label", text: "追加" },
      {
        kind: "button",
        id: "add",
        icon: () => PRIMITIVE_ICONS[this.primitiveIconKind()] ?? ICONS.prim,
        title: "追加（長押しでプリミティブを選ぶ · タップで入力ノード）",
        radial: () => this.primitiveMenu(),
        options: () => [primitiveSection(this.optionsState(), this.panelHost())],
        onTap: () => {},
      },
    ];
  }

  /**
   * スカルプトのツール列（`32` の T3）。いまは段（レベル）だけ。
   * ブラシは S2-2 から。シェード・カメラ・分割はモデリングと同じものを使い回す。
   */
  private sculptToolColumn(): ToolEntry[] {
    const model = this.modelToolColumn();
    const shared = model.filter((e) => e.kind === "button" && ["display", "camera", "layout"].includes(e.id));
    return [
      { kind: "label", text: "段" },
      {
        kind: "button",
        id: "level",
        icon: ICONS.layers,
        title: "サブディビジョンレベル（タップで 1 つ上へ · 長押しで選ぶ / 足す / 捨てる）",
        badge: () => String(this.state.selected?.activeLevel ?? 0),
        pressed: () => (this.state.selected?.activeLevel ?? 0) > 0,
        radial: () => this.levelMenu(),
        radialList: () => this.levelItems(),
        onTap: () => this.stepLevel(1),
      },
      { kind: "separator" },
      { kind: "label", text: "シェード" },
      ...shared,
    ];
  }

  /* ---- 段（サブディビジョンレベル）。`32` の T3 -------------------------- */

  /** 長押しの 8 方位。段のジャンプと、足す / 捨てる / 焼く。 */
  private levelMenu(): RadialMenu {
    const o = this.state.selected;
    if (!o) return { N: { label: "オブジェクトを選んでください", run: () => {} } };
    const top = levelCount(o);
    const add = canAddLevel(o);
    const menu: RadialMenu = {
      N: {
        label: add.ok ? "段を足す" : `足せません（${asMb(add.want)}）`,
        sub: add.ok ? `→ レベル ${top + 1}・${asMb(add.want)}` : `予算 ${asMb(add.budget)}`,
        icon: ICONS.dup,
        run: () => void this.addLevel(),
      },
    };
    if (top > 0) {
      menu.S = {
        label: "上の段を捨てる",
        sub: `レベル ${o.activeLevel} より上`,
        icon: ICONS.del,
        run: () => this.dropAboveLevel(),
      };
      menu.E = { label: "1 つ上へ", sub: `レベル ${Math.min(o.activeLevel + 1, top)}`, run: () => this.stepLevel(1) };
      menu.W = { label: "1 つ下へ", sub: `レベル ${Math.max(o.activeLevel - 1, 0)}`, run: () => this.stepLevel(-1) };
    }
    if (o.activeLevel > 0) {
      menu.SE = {
        label: "下の段に焼く",
        sub: `レベル ${o.activeLevel} を新しいレベル 0 に`,
        run: () => this.burnDownLevel(),
      };
    }
    return menu;
  }

  /** 長押しの一覧。段ごとの四角形数と推定メモリ（`03` の 3.3）。 */
  private levelItems(): RadialItem[] {
    const o = this.state.selected;
    if (!o) return [];
    const out: RadialItem[] = [];
    for (let l = 0; l <= levelCount(o); l++) {
      out.push({
        label: `レベル ${l}${l === o.activeLevel ? "（今）" : ""}`,
        sub: `${facesAt(o, l).toLocaleString()} 面 · ${asMb(l === 0 ? 0 : estimateLevelBytes(facesAt(o, l)))}`,
        run: () => void this.goLevel(l),
      });
    }
    return out;
  }

  /** 段を 1 つ上げ下げする。上限では足さずに知らせるだけ（指の滑りで重い操作を起こさない）。 */
  private stepLevel(by: number): void {
    const o = this.state.selected;
    if (!o) {
      this.hud.toast("オブジェクトを選んでください");
      return;
    }
    const top = levelCount(o);
    const next = o.activeLevel + by;
    if (next > top) {
      this.hud.toast(top === 0 ? "段がありません。長押しで足せます" : "いちばん上です。長押しで足せます");
      return;
    }
    if (next < 0) {
      this.hud.toast("いちばん下です");
      return;
    }
    void this.goLevel(next);
  }

  /** 見せる段を変える。履歴には入れない（見ているものが変わるだけ。カメラと同じ）。 */
  private async goLevel(level: number): Promise<void> {
    const o = this.state.selected;
    if (!o) return;
    // 組むのは wasm が読めてから。初回のタップだけ JS になるのを避ける
    await warmUpLevels();
    o.activeLevel = Math.max(0, Math.min(level, levelCount(o)));
    if (o.activeLevel > 0) levelsOf(o);
    this.viewport.rebuildObject(o);
    this.viewport.rebuildOverlay();
    // バッジ（今の段）はツール列にあるので、描き直さないと古いままになる
    this.renderToolColumn();
    this.refresh();
  }

  /** 段を 1 つ足す。予算を越えるならブロックする（`03` の 3.3）。 */
  private async addLevel(): Promise<void> {
    const o = this.state.selected;
    if (!o) {
      this.hud.toast("オブジェクトを選んでください");
      return;
    }
    await warmUpLevels();
    const check = canAddLevel(o);
    if (!check.ok) {
      this.hud.toast(`推定 ${asMb(check.want)}。予算 ${asMb(check.budget)} を越えます`);
      return;
    }
    const snapshot = this.history.snapshot();
    const stack = levelsOf(o);
    stack.divide();
    o.multires = [...o.multires, { level: o.multires.length + 1, delta: new Float32Array(0) }];
    o.activeLevel = o.multires.length;
    // デルタはまだ無い。空の Float32Array は「ディテール無し」の印として持たない
    o.multires[o.multires.length - 1].delta = new Float32Array(stack.level(o.activeLevel).vertexCount * 3);
    this.history.commit(`レベル ${o.activeLevel} を足した`, snapshot);
    this.viewport.rebuildObject(o);
    this.renderToolColumn();
    this.refresh();
    this.hud.toast(`レベル ${o.activeLevel}・${facesAt(o, o.activeLevel).toLocaleString()} 面・${asMb(estimateBytes(o))}`);
  }

  /** 今の段より上を捨てる（`03` の Delete Higher）。 */
  private dropAboveLevel(): void {
    const o = this.state.selected;
    if (!o || !levelCount(o)) return;
    const keep = o.activeLevel;
    const dropped = levelCount(o) - keep;
    if (!dropped) {
      this.hud.toast("上に段がありません");
      return;
    }
    const snapshot = this.history.snapshot();
    o.multires = o.multires.filter((m) => m.level <= keep);
    o.invalidateLevels();
    o.activeLevel = keep;
    this.history.commit(`レベル ${keep} より上を捨てた`, snapshot);
    this.viewport.rebuildObject(o);
    this.renderToolColumn();
    this.refresh();
    this.hud.toast(`${dropped} 段を捨てました`);
  }

  /**
   * 今の段を新しいレベル 0 にする（`03` の Delete Lower）。
   *
   * レベル 0 のトポロジが変わるので、UV は `markTopologyChanged` と同じ扱いで
   * 取り直す。上の段のデルタは、その段の滑らかな面が変わらないのでそのまま効く。
   */
  private burnDownLevel(): void {
    const o = this.state.selected;
    if (!o || o.activeLevel === 0) return;
    const at = o.activeLevel;
    const snapshot = this.history.snapshot();
    o.mesh = levelsOf(o).level(at).clone();
    o.parametric = false;
    o.multires = o.multires.filter((m) => m.level > at).map((m) => ({ level: m.level - at, delta: m.delta }));
    o.sculptLayers = o.sculptLayers.filter((l) => l.level > at).map((l) => ({ ...l, level: l.level - at }));
    o.invalidateLevels();
    o.activeLevel = 0;
    if (o.uv) reconcile(o.uv, o.mesh);
    this.state.comp.clear();
    this.history.commit(`レベル ${at} を新しいレベル 0 にした`, snapshot);
    this.viewport.rebuildObject(o);
    this.viewport.rebuildOverlay();
    this.renderToolColumn();
    this.refresh();
    this.hud.toast(`レベル ${at} を焼き込みました（${o.mesh.faceCount.toLocaleString()} 面）`);
  }

  /** 「追加」のアイコンに出す種類。選択がパラメトリックならそれ、無ければ最後に足したもの。 */
  private primitiveIconKind(): string {
    const o = this.state.selected;
    if (o?.parametric && PRIMITIVES[o.kind]) return o.kind;
    return this.state.lastPrimitive;
  }

  /* ---- グループのサークルメニュー（`21` の 2 章） ------------------------ */

  private selectGroupMenu(): RadialMenu {
    return {
      N: { label: "オブジェクト", sub: "Object  F8", icon: ICONS.vObj, run: () => this.setCompMode("object") },
      E: { label: "頂点", sub: "Vertex  F9", icon: ICONS.vVert, run: () => this.setCompMode("vertex") },
      S: { label: "エッジ", sub: "Edge  F10", icon: ICONS.vEdge, run: () => this.setCompMode("edge") },
      W: { label: "フェース", sub: "Face  F11", icon: ICONS.vFace, run: () => this.setCompMode("face") },
      NW: this.state.modOn("ctrl")
        ? { label: "選択を縮小", sub: "Shrink  <", icon: ICONS.vMulti, run: () => this.growOrShrink(false) }
        : { label: "選択を拡張", sub: "Grow  >", icon: ICONS.vMulti, run: () => this.growOrShrink(true) },
    };
  }

  private editGroupMenu(): RadialMenu {
    const item = (kind: EditKind, sub: string): RadialItem => ({
      label: EDIT_LABELS[kind],
      sub,
      icon: EDIT_ICONS[kind],
      run: () => this.activateEdit(kind, true),
    });
    return {
      N: item("multicut", "Multi Cut"),
      E: item("bevel", "Bevel"),
      S: item("bridge", "Bridge"),
      W: item("extrude", "Extrude"),
      NW: item("connect", "Connect"),
      SW: item("weld", "Target Weld"),
    };
  }

  private primitiveMenu(): RadialMenu {
    const menu: RadialMenu = {};
    PRIMITIVE_ORDER.forEach((id, i) => {
      const def = PRIMITIVES[id];
      if (!def || i >= DIRECTIONS.length) return;
      menu[DIRECTIONS[i]] = {
        label: def.label,
        sub: def.en,
        icon: PRIMITIVE_ICONS[id] ?? ICONS.prim,
        run: () => this.addPrimitive(id),
      };
    });
    return menu;
  }

  /**
   * 「編集」の中身を有効にする。ツールならそれになり、コマンドなら
   * `run` が真のときだけ実行する（タップはオプションを出すだけ。`21` の 2.3）。
   */
  private activateEdit(kind: EditKind, run = false): void {
    this.state.lastEdit = kind;
    if (kind === "multicut" || kind === "bevel") {
      this.setTool(kind);
      return;
    }
    this.setTool("select");
    if (!run) {
      this.renderToolColumn();
      return;
    }
    if (kind === "bridge") this.doBridge();
    else if (kind === "extrude") this.doExtrudeForMode();
    else if (kind === "connect") this.doConnectForMode();
    else this.hud.toast("頂点を掴んで、別の頂点の近くで離すと溶接します");
    this.renderToolColumn();
  }

  /** 今の選択モードに合う押し出し。 */
  private doExtrudeForMode(): void {
    if (this.state.compMode === "face") this.doExtrudeFaces();
    else if (this.state.compMode === "edge") this.doExtrudeEdgesMenu();
    else if (this.state.compMode === "vertex") this.doExtrudeVertices();
    else this.hud.toast("面・エッジ・頂点を選んでください");
  }

  /** 今の選択モードに合う接続。 */
  private doConnectForMode(): void {
    if (this.state.compMode === "edge") this.doConnectEdges();
    else if (this.state.compMode === "vertex") this.doConnectVertices();
    else this.hud.toast("エッジか頂点を選んでください");
  }

  /* ---- グループのオプション（カットインの中身） ------------------------- */

  private selectOptions(): HTMLElement[] {
    const state = this.optionsState();
    const host = this.panelHost();
    const out = [selectSection(state, host)];
    if (this.state.compMode !== "object") out.push(softSelectSection(state, host));
    if (this.state.compMode === "vertex") out.push(vertexSection(state, host));
    if (this.state.compMode === "object") out.push(mirrorSection(state, host));
    return out;
  }

  private xformOptions(): HTMLElement[] {
    const state = this.optionsState();
    const host = this.panelHost();
    const out = [manipulatorSection(state, host)];
    // マージがこのグループに入っているので、頂点モードならその距離もここで触れる
    if (this.state.compMode === "vertex") out.push(vertexSection(state, host));
    const t = transformSection(state, host);
    if (t) out.push(t);
    return out;
  }

  private editOptions(): HTMLElement[] {
    const state = this.optionsState();
    const host = this.panelHost();
    switch (this.state.lastEdit) {
      case "multicut":
        return [multicutSection(state, host)];
      case "bevel":
        return [bevelSection(state, host)];
      case "bridge":
        return [bridgeSection(state, host)];
      case "connect":
        return [connectSection()];
      case "extrude":
        return [extrudeSection(state, host)];
      default:
        return [vertexSection(state, host)];
    }
  }

  private buildToolDock(): void {
    byId("dockLeft").textContent = "";
    const { panel, body } = panelShell("tools", "ツール");
    this.toolPanelBody = body;
    this.renderToolColumn();
    this.docking.attach(panel);
    this.docking.place(panel, this.zones.tools ?? "left");
  }

  /** ツール列を今のモードで描き直す。 */
  private renderToolColumn(): void {
    const body = this.toolPanelBody;
    if (!body) return;
    body.textContent = "";
    const col = el("div", "toolcol");
    for (const entry of this.toolColumn()) {
      if (entry.kind === "label") {
        col.appendChild(el("div", "minilbl", entry.text));
        continue;
      }
      if (entry.kind === "separator") {
        col.appendChild(el("div", "tool-sep"));
        continue;
      }
      const b = el("button", "ibtn");
      b.dataset.group = entry.id;
      b.innerHTML = iconSvg(typeof entry.icon === "function" ? entry.icon() : entry.icon);
      const badge = entry.badge?.();
      if (badge) b.appendChild(el("i", "badge", badge));
      b.title = entry.title;
      if (entry.tool) {
        b.dataset.tool = entry.tool;
        b.setAttribute("aria-pressed", String(this.state.tool === entry.tool));
      }
      if (entry.compMode) {
        b.dataset.compMode = entry.compMode;
        b.setAttribute("aria-pressed", String(this.state.compMode === entry.compMode));
      }
      if (entry.pressed) {
        b.dataset.toggle = "1";
        b.setAttribute("aria-pressed", String(entry.pressed()));
      }
      // タップは「今の中身を有効にする」と「オプションを出す」を同時に行う（`21` の 1.1）
      const tap = (): void => {
        const open = entry.options && this.popup?.dataset.gauge === entry.id;
        entry.onTap(b);
        if (!entry.options) return;
        if (open) {
          this.closePopup();
          return;
        }
        // onTap がツール列を描き直していることがあるので、ボタンを探し直す
        const anchor = this.toolPanelBody?.querySelector<HTMLElement>(`[data-group="${entry.id}"]`) ?? b;
        this.openToolOptions(anchor, entry.id, entry.options);
      };
      if (entry.radial) {
        b.dataset.radial = "1";
        attachRadialButton(b, entry.radial, tap, entry.radialList);
      } else {
        b.addEventListener("click", tap);
      }
      col.appendChild(b);
    }
    body.appendChild(col);
  }

  /* ---- 右のパネル ------------------------------------------------------ */

  /**
   * グループのオプションをボタンの横にカットインで出す（`21` の 1.1）。
   * 同じグループをもう一度タップすると閉じる（呼び出し側で見ている）。
   */
  private openToolOptions(anchor: HTMLElement, id: string, build: () => HTMLElement[]): void {
    this.closePopup();
    const sections = build();
    if (!sections.length) return;
    const r = anchor.getBoundingClientRect();
    const pop = el("div", "cutin wide");
    pop.dataset.gauge = id;
    // 左利きではツール列が右にあるので、カットインは左へ開く（`24` の T4）
    if (this.state.ui.leftHanded) pop.style.left = `${Math.max(8, r.left - 8 - 236)}px`;
    else pop.style.left = `${r.right + 8}px`;
    // ボタンの高さを中心に置いて、画面からはみ出さないところまで戻す
    pop.style.top = `${Math.max(8, Math.min(window.innerHeight - 120, r.top))}px`;
    pop.style.maxHeight = `${window.innerHeight - Math.max(8, r.top) - 16}px`;
    for (const s of sections) pop.appendChild(s);
    document.body.appendChild(pop);
    this.popup = pop;
    this.popupAnchor = anchor;
  }

  /** 長押しメニューの「オプション…」から、そのグループのカットインを開く。 */
  private openGroupOptions(id: string, build: () => HTMLElement[]): void {
    const anchor = this.toolPanelBody?.querySelector<HTMLElement>(`[data-group="${id}"]`);
    if (!anchor) return;
    this.openToolOptions(anchor, id, build);
  }

  /** カットインの中身に渡す今の状態。旧オプションパネルの引数をそのまま持ってきたもの。 */
  private optionsState(): OptionsState {
    const kind = this.primitiveIconKind();
    return {
      tool: this.state.tool,
      selected: this.state.selected,
      soft: this.state.soft,
      canGrow: this.state.compMode !== "object" && this.state.comp.size > 0,
      alsoCount: this.state.also.size,
      attrDock: this.attrDock,
      isolate: !!this.viewport.pane.isolate,
      cut: this.state.cut,
      bevel: this.state.bevel,
      bevelActive: this.bevel.active,
      extrudeDist: this.state.toolOpts.extrudeDist,
      bridgeSegments: this.state.bridgeSegments,
      vertex: this.state.vertexOpts,
      snap: { ...this.state.snap, active: this.state.snapping },
      mirrorAxis: this.state.mirrorAxis,
      rotationEuler: this.state.selected
        ? this.eulerOf(this.state.selected.transform.rotation as [number, number, number, number])
        : [0, 0, 0],
      smoothAngle: this.state.smoothAngle,
      compMode: this.state.compMode,
      manipSize: this.state.manipSize,
      manip: this.state.manip,
      pivotEdit: this.state.pivotEdit,
      rotateStep: this.state.rotateStep,
      preventNegativeScale: this.state.preventNegativeScale,
      cameraBased: this.state.cameraBased,
      preserveUvs: this.state.preserveUvs,
      uvHeat: this.state.uvHeat,
      checker: this.state.checker,
      display: this.state.display,
      cullBack: this.state.cullBack,
      showGrid: this.state.showGrid,
      transfer: {
        ...this.state.transfer,
        source: this.transferSource()?.name ?? null,
        target: this.transferSource() ? (this.state.selected?.name ?? null) : null,
      },
      cam: this.state.camOpts,
      nextPrimitive: kind,
      nextPrimitiveParams: this.state.primitiveDefaults[kind] ?? defaultParams(kind),
      uv:
        this.state.mode === "uv" && this.state.selected?.uv
          ? {
              method: this.state.selected.uv.method,
              snapKind: this.state.uvSnap.kind,
              snapStep: this.state.uvSnap.step,
              auto: { ...this.state.selected.uv.autoSeamParams },
              packing: { ...this.state.selected.uv.packing },
            }
          : null,
    };
  }

  /**
   * アウトライナ（`19` の 3.3、`24` の T1）。
   *
   * **画面の広さに関わらず右から被さるドロワー**にする。ドッキングだと
   * その分ビューポートが狭くなるので、広い画面でも被せるほうを取った。
   */
  private buildPanels(): void {
    const panel = panelShell("layers", "アウトライナ");
    this.layersPanel = panel.panel;
    this.outlinerBody = panel.body;
    // ドロワーは外を触っても閉じるが、それだと選択も動いてしまう。
    // 見出しに閉じるボタンを置いて、選択を変えずに閉じられるようにする
    const close = el("button", "pclose", "×");
    close.title = "閉じる（Esc）";
    close.addEventListener("click", () => this.closeLayers());
    panel.panel.querySelector(".phead")?.appendChild(close);
    // ドロワー専用なので掴み手（ドッキング）は付けない。掴めるとドックへ
    // 落ちてしまい、ドロワーから消える
    this.placeLayers();
    this.renderPanels();
    this.bindLayerSwipe();
    this.syncDockCol();
    this.viewport.resize();
  }

  /**
   * 右のドック列は、中にパネルが無ければ消す（`24` の T1）。
   * アウトライナがドロワーへ移ったので、ふだんは空でビューポートが全幅になる。
   * ツール列をここへ運んだときだけ出る。
   */
  private syncDockCol(): void {
    const col = byId("dockColRight");
    col.hidden = !col.querySelector(".panel");
  }

  /** ドロワーを作って中に入れる。ドッキングはしない（`24` の T1）。 */
  private placeLayers(): void {
    const panel = this.layersPanel;
    if (!panel) return;
    if (!this.drawer) {
      this.drawer = el("div", "drawer");
      byId("vp").appendChild(this.drawer);
    }
    if (panel.parentElement !== this.drawer) this.drawer.appendChild(panel);
    panel.classList.remove("floating");
    this.syncLayersButton();
  }

  /** アウトライナの開閉。 */
  private toggleLayers(): void {
    this.drawer?.classList.toggle("open");
    // 開いたときだけサムネイルを描き直す（`19` の 3.4）
    if (this.drawer?.classList.contains("open")) this.renderPanels();
    this.syncLayersButton();
  }

  /** 開いていれば閉じる（外を触ったとき、Esc）。 */
  private closeLayers(): void {
    if (!this.drawer?.classList.contains("open")) return;
    this.drawer.classList.remove("open");
    this.syncLayersButton();
  }

  private syncLayersButton(): void {
    byId("btnPanels").setAttribute("aria-pressed", String(!!this.drawer?.classList.contains("open")));
  }

  /** 右端から左へのスワイプでアウトライナを出す（指だけ。既存の操作は邪魔しない）。 */
  private bindLayerSwipe(): void {
    const vp = byId("vp");
    let from: { x: number; y: number; id: number } | null = null;
    vp.addEventListener("pointerdown", (e) => {
      const r = vp.getBoundingClientRect();
      // 右利きは右端から左へ、左利きは左端から右へ（`24` の T4）
      const nearEdge = this.state.ui.leftHanded ? e.clientX < r.left + 24 : e.clientX > r.right - 24;
      from = e.pointerType === "touch" && nearEdge ? { x: e.clientX, y: e.clientY, id: e.pointerId } : null;
    });
    vp.addEventListener("pointermove", (e) => {
      if (!from || e.pointerId !== from.id) return;
      const pulled = this.state.ui.leftHanded ? e.clientX - from.x : from.x - e.clientX;
      if (pulled > 40 && Math.abs(e.clientY - from.y) < 60) {
        from = null;
        if (!this.drawer?.classList.contains("open")) this.toggleLayers();
      }
    });
    for (const t of ["pointerup", "pointercancel"] as const) vp.addEventListener(t, () => (from = null));
    // 外を触ったら閉じる。ただし**クラスターとレールは「外」と数えない**
    // （F を押しながらアウトライナをなぞりたい。`25` の T1）
    vp.addEventListener("pointerdown", (e) => {
      if (!this.drawer?.classList.contains("open")) return;
      const target = e.target as HTMLElement | null;
      if (this.drawer.contains(target)) return;
      if (target?.closest(".cluster, .rail, .uvswitch")) return;
      this.closeLayers();
    });
  }

  private panelHost(): PanelHost {
    return {
      onParamInput: (o, key, value) => {
        this.paramSnapshot ??= this.history.snapshot();
        o.params[key] = value;
        o.rebuild();
        // 分割数を変えても UV はレシピから作り直す（頂点の番号が変わるので、
        // 切れ目は新しいメッシュの UV から取り直す）
        if (o.uv) {
          o.uv = rebuildRecipeFor(o.uv, o.mesh);
          recompute(o.mesh, o.uv);
          this.uv?.rebuild();
        }
        this.viewport.rebuildObject(o);
        this.viewport.rebuildOverlay();
        this.hud.refreshStats();
        this.refreshManipulator();
      },
      onParamCommit: (_o, label) => {
        if (!this.paramSnapshot) return;
        this.history.commit(label, this.paramSnapshot);
        this.paramSnapshot = null;
      },
      onGrow: (phase, n) => {
        const hooks = this.state.growHooks;
        if (!hooks) return;
        if (phase === "begin") hooks.begin();
        else if (phase === "drag") hooks.drag(n);
        else hooks.end();
      },
      onSoftChange: (which, value) => {
        this.state.soft[which] = value;
        this.viewport.rebuildOverlay();
        this.refresh();
      },
      onExtrudeDistChange: (value) => {
        this.state.toolOpts.extrudeDist = value;
      },
      onVertexOptChange: (key, value) => {
        this.state.vertexOpts[key] = value;
      },
      onMirrorAxisChange: (axis) => {
        this.state.mirrorAxis = axis;
        this.refresh();
      },
      onTransformInput: (object, field, axis, value) => {
        this.history.push("数値入力");
        const t = cloneTransform(object.transform);
        if (field === "rotation") {
          // 度で受け取り、変えた成分だけ差し替えてクォータニオンへ戻す
          const deg = this.eulerOf(t.rotation);
          deg[axis] = value;
          const rad = deg.map((d) => (d * Math.PI) / 180);
          const q = new Quaternion().setFromEuler(new Euler(rad[0], rad[1], rad[2], "XYZ"));
          t.rotation = [q.x, q.y, q.z, q.w];
        } else {
          const v = [...t[field]] as [number, number, number];
          v[axis] = value;
          t[field] = v;
        }
        object.transform = t;
        const view = this.viewport.viewOf(object);
        if (view) {
          applyTransform(view.group, object.transform);
          view.group.updateMatrixWorld();
        }
        this.viewport.rebuildOverlay();
        this.refresh();
      },
      onSnapChange: (key, value) => {
        // パネルで種類を選ぶのも「使うつもり」なので、サークルメニューと同じく立てる
        if (key === "kind") this.setSnapKind(value as SnapKind);
        else {
          this.state.snap.step = value as number;
          this.refresh();
        }
      },
      onBridgeSegmentsChange: (value) => {
        this.state.bridgeSegments = value;
        this.remember("bridgeSegments", value);
      },
      onBevelChange: (key, value) => {
        if (key === "segments") this.state.bevel.segments = value;
        else this.state.bevel.width = value;
        this.redoBevel();
      },
      onCutChange: (key, value) => {
        if (key === "edgeFlow") this.state.cut.edgeFlow = value as boolean;
        else this.state.cut.snapStep = value as number;
      },
      onSmoothAngleChange: (value) => {
        this.state.smoothAngle = value;
        for (const o of this.state.doc.objects) this.viewport.rebuildObject(o);
      },
      onManipSizeChange: (value) => this.setManipSize(value),
      onUvMethodChange: (method) => {
        this.uv?.setMethod(method);
        this.refresh();
      },
      onUvAutoChange: (key, value) => {
        const recipe = this.state.selected?.uv;
        if (!recipe) return;
        if (key === "angle") recipe.autoSeamParams.angle = value as number;
        else recipe.autoSeamParams[key] = value as boolean;
      },
      onUvAutoRun: () => this.uv?.autoUnwrap(),
      onUvPackingChange: (key, value) => {
        const recipe = this.state.selected?.uv;
        if (!recipe) return;
        if (key === "allowRotate") recipe.packing.allowRotate = value as boolean;
        else recipe.packing[key] = value as number;
        this.uv?.repack();
        this.refresh();
      },
      onUvSnapChange: (key, value) => {
        if (key === "kind") this.state.uvSnap.kind = value as "grid" | "vertex";
        else this.state.uvSnap.step = value as number;
        this.state.snapOn = true;
        this.syncToggleButtons();
        this.refresh();
      },
      onPreserveUvsChange: (on) => {
        this.state.preserveUvs = on;
        this.remember("preserveUvs", on);
        this.hud.toast(on ? "UV を保つ: オン" : "UV を保つ: オフ");
      },
      onUvHeatChange: (on) => this.toggleUvHeat(on),
      onCheckerChange: (key, value) => this.setChecker(key, value),
      onTransfer: (key, value) => {
        if (key === "run") this.runTransfer();
        else if (key === "swap") this.swapTransfer();
        else if (key === "space") this.state.transfer.space = value as SampleSpace;
        else this.state.transfer[key] = !!value;
        this.remember("transfer", JSON.stringify(this.state.transfer));
        // 実行と入れ替えのあとも、カットインを今の状態で開き直す
        if (this.popup?.dataset.gauge === "transfer") this.openTransferOptions();
      },
      onDisplayToggle: (key, on) => {
        if (key === "cullBack") {
          this.state.cullBack = on;
          this.viewport.applyCulling();
        } else {
          this.state.showGrid = on;
          this.viewport.setGridVisible(on);
        }
        this.remember(key, on);
        this.hud.toast(
          key === "cullBack" ? (on ? "裏面を描かない" : "両面を描く") : on ? "グリッド: オン" : "グリッド: オフ",
        );
      },
      onCameraBasedChange: (on) => {
        this.state.cameraBased = on;
        this.remember("cameraBased", on);
        this.hud.toast(on ? "カメラベース選択: オン" : "カメラベース選択: オフ");
      },
      onRotateStepChange: (deg) => {
        this.state.rotateStep = deg;
        this.remember("rotateStep", deg);
        this.reopenToolOptions("xform");
      },
      onPreventNegativeScaleChange: (on) => {
        this.state.preventNegativeScale = on;
        this.remember("preventNegativeScale", on);
      },
      onPivotEditToggle: () => {
        this.togglePivotEdit();
        this.reopenToolOptions("xform");
      },
      onCamOptChange: (key, value) => {
        this.state.camOpts[key] = value;
        this.viewport.applyCamera();
        this.refreshManipulator();
      },
      onCamOrthoChange: (on) => {
        this.state.camOpts.ortho = on;
        this.viewport.applyCamera();
        this.refresh();
      },
      onIsolate: () => {
        const ids = [this.state.selected, ...this.state.also]
          .filter((o): o is SceneObject => !!o)
          .map((o) => o.id);
        if (!this.viewport.pane.isolate && !ids.length) {
          this.hud.toast("先にオブジェクトを選んでください");
          return;
        }
        const on = this.viewport.toggleIsolate(ids);
        this.reopenToolOptions("display");
        this.hud.toast(on ? `選択した ${ids.length} 個だけを表示（このペイン）` : "全部を表示に戻した");
      },
      onCamLockChange: (on) => {
        this.state.camOpts.locked = on;
        // アイコンの隅の鍵は列を描き直さないと出ない
        this.renderToolColumn();
        this.refresh();
        this.hud.toast(on ? "カメラをロックしました（視点は動きません）" : "カメラのロックを外しました");
      },
      onCamReset: () => {
        // ロックは初期設定に戻すの対象にしない（外したいならチェックを外す）
        this.state.camOpts = { focal: 35, near: 0.05, far: 500, ortho: false, locked: this.state.camOpts.locked };
        this.setView("persp");
        this.refreshManipulator();
        this.reopenToolOptions("camera");
        this.hud.toast("カメラを初期設定に戻した");
      },
      onDefaultParamChange: (kind, key, value) => {
        const params = (this.state.primitiveDefaults[kind] ??= defaultParams(kind));
        params[key] = value;
      },
      onSelect: (o, additive) => {
        // SHF を足したときは 3D の Shift + クリックと同じ扱い（`24` の T2）
        if (additive) this.state.addObject(o);
        else this.state.select(o);
        this.viewport.applyDisplayAll();
        this.viewport.rebuildOverlay();
        this.refresh();
        this.afterSelectionChange();
      },
      onSelectRange: (ids) => {
        const byId = new Map(this.state.doc.objects.map((o) => [o.id, o]));
        const list = ids.map((id) => byId.get(id)).filter((o): o is SceneObject => !!o && !o.locked);
        if (!list.length) return;
        // 指が今いる行（並びの最後）が「最後に選んだもの」になる
        const last = list[list.length - 1];
        this.state.select(last);
        for (const o of list) if (o !== last) this.state.also.add(o);
        // なぞったので、F を離してもフレームはしない
        this.fChord = true;
        this.viewport.applyDisplayAll();
        this.viewport.rebuildOverlay();
        this.refresh();
        this.afterSelectionChange();
      },
      frameHeld: () => this.fHeld,
      shiftHeld: (e) => this.state.modOn("shift") || e.shiftKey,
      onRenamePrompt: (o) => {
        if (this.outlinerBody) renameInOutliner(this.outlinerBody, o, this.panelHost());
      },
      onAttrDock: (side) => {
        if (this.attrDock === side) return;
        this.attrDock = side;
        this.remember("attrDock", side);
        this.renderPanels();
      },
      onOpacityInput: (o, value) => {
        this.opacitySnapshot ??= this.history.snapshot();
        o.opacity = Math.max(0, Math.min(1, value));
        this.viewport.applyDisplayAll();
      },
      onOpacityCommit: (o) => {
        if (!this.opacitySnapshot) return;
        this.history.commit("不透明度", this.opacitySnapshot);
        this.opacitySnapshot = null;
        this.renderPanels();
        void o;
      },
      onRename: (o, name) => {
        this.history.push("名前変更");
        o.name = name;
        this.refresh();
      },
      onVisible: (o, visible) => {
        this.history.push(visible ? "表示" : "非表示");
        o.visible = visible;
        this.viewport.syncAll();
        this.refresh();
      },
      onLock: (o, locked) => {
        this.history.push(locked ? "ロック" : "ロック解除");
        o.locked = locked;
        // ロックしたものは選べないので、選択から外す
        if (locked && this.state.selected === o) this.state.select(null);
        this.viewport.applyDisplayAll();
        this.refresh();
      },
      onReorder: (from, to) => {
        // 一覧は上が手前（追加の逆順）なので、番号を戻してから入れ替える
        const n = this.state.doc.objects.length;
        const a = n - 1 - from;
        const b = n - 1 - to;
        if (a === b || a < 0 || b < 0 || a >= n || b >= n) return;
        const [moved] = this.state.doc.objects.splice(a, 1);
        this.state.doc.objects.splice(b, 0, moved);
        this.renderPanels();
      },
      onLayersChanged: () => this.renderPanels(),
      thumbnail: (o) => this.thumbnailOf(o),
      outlinerMenu: (o) => {
        // 選んでいないものを押したときだけ、まずそれを選ぶ。
        // すでに選択に入っていれば触らない（複数選んで結合したいので）
        if (o !== this.state.selected && !this.state.also.has(o)) {
          this.state.select(o);
          this.viewport.applyDisplayAll();
          this.viewport.rebuildOverlay();
          this.refresh();
          this.afterSelectionChange();
        }
        return {
          N: {
            label: "名前変更",
            sub: "Rename",
            icon: ICONS.rename,
            run: () => {
              if (this.outlinerBody) renameInOutliner(this.outlinerBody, o, this.panelHost());
            },
          },
          NE: { label: "複製", sub: "Duplicate", icon: ICONS.dup, run: () => this.doDuplicate() },
          E: { label: "結合", sub: "Combine", icon: ICONS.prim, run: () => this.doCombine() },
          SE: { label: "分離", sub: "Separate", icon: ICONS.vVertFace, run: () => this.doSeparate() },
          S: { label: "削除", sub: "Delete", icon: ICONS.del, run: () => this.doDelete() },
          SW: {
            label: "フレーム",
            sub: "Frame",
            icon: ICONS.frame,
            run: () => this.viewport.frameSelected(),
          },
          W: { label: "中心にピボット", sub: "Center Pivot", icon: ICONS.vObj, run: () => this.doCenterPivot() },
          NW: {
            label: "アトリビュートの転送…",
            sub: "Transfer",
            icon: ICONS.options,
            run: () => this.openTransferOptions(),
          },
        };
      },
    };
  }

  private renderPanels(): void {
    const body = this.outlinerBody;
    if (!body) return;
    const host = this.panelHost();
    body.textContent = "";
    // 選んでいるものの値を、いつも同じ場所に（`25` の T3）。
    // 一覧の上か下かはつまみで選べる（`26` の T4）
    const attrs = attributeSection(this.optionsState(), host);
    const list = el("div", "lylist");
    if (this.attrDock === "top") body.append(attrs, list);
    else body.append(list, attrs);
    renderLayers(list, this.state.doc.objects, this.state.selected, host, this.state.also);
  }

  /** 開いているカットインを、中身を作り直して開き直す（トグルを押したときなど）。 */
  private reopenToolOptions(id: string): void {
    if (this.popup?.dataset.gauge !== id) return;
    const anchor = this.popupAnchor;
    const entry = this.toolColumn().find((e) => e.kind === "button" && e.id === id);
    if (!anchor || !entry || entry.kind !== "button" || !entry.options) return;
    this.renderToolColumn();
    const fresh = this.toolPanelBody?.querySelector<HTMLElement>(`[data-group="${id}"]`) ?? anchor;
    this.openToolOptions(fresh, id, entry.options);
  }

  /**
   * アウトライナのサムネイル。形が変わっていなければ前のものを使い回す
   * （毎回描くと、行を開くたびにオブジェクトの数だけ描画が走る）。
   */
  private thumbnailOf(o: SceneObject): string {
    const stamp = `${o.mesh.vertexCount}_${o.mesh.faceCount}_${o.kind}_${o.transform.scale.join(",")}`;
    const cached = this.thumbs.get(o.id);
    if (cached && cached.stamp === stamp) return cached.url;
    const url = this.viewport.thumbnail(o);
    if (url) this.thumbs.set(o.id, { url, stamp });
    return url;
  }

  /** 前に触った設定を戻す（`21` の 3 章）。壊れていても既定で始める。 */
  private restoreSettings(): void {
    const read = (key: string): string | null => {
      try {
        return localStorage.getItem(`macbeth.${key}`);
      } catch {
        return null;
      }
    };
    this.state.cameraBased = read("cameraBased") === "true";
    this.state.preventNegativeScale = read("preventNegativeScale") !== "false";
    this.state.preserveUvs = read("preserveUvs") !== "false";
    const step = Number(read("rotateStep"));
    if (Number.isFinite(step) && step >= 0) this.state.rotateStep = step;
    try {
      const ui = JSON.parse(read("ui") ?? "null") as Partial<AppState["ui"]> | null;
      if (ui) this.state.ui = { ...this.state.ui, ...ui };
    } catch {
      /* 保存が壊れていても既定で始める */
    }
    try {
      const tr = JSON.parse(read("transfer") ?? "null") as Partial<AppState["transfer"]> | null;
      if (tr) this.state.transfer = { ...this.state.transfer, ...tr };
    } catch {
      /* 保存が壊れていても既定で始める */
    }
    if (read("attrDock") === "bottom") this.attrDock = "bottom";
    this.state.cullBack = read("cullBack") === "true";
    this.state.showGrid = read("showGrid") !== "false";
    const segs = Number(read("bridgeSegments"));
    if (Number.isFinite(segs) && segs >= 1 && segs <= 16) this.state.bridgeSegments = Math.round(segs);
    const cells = Number(read("checker.cells"));
    if (Number.isFinite(cells) && cells >= 2 && cells <= 64) this.state.checker.cells = Math.round(cells);
    const pattern = read("checker.pattern");
    if (pattern === "checker" || pattern === "colorGrid") this.state.checker.pattern = pattern;
    this.state.uvHeat = read("uvHeat") === "true";
    if (this.state.uvHeat) this.state.display = "heat";
    const uvCut = read("lastUvCut");
    if (uvCut === "cut" || uvCut === "moveSew" || uvCut === "sew") this.state.lastUvCut = uvCut;
    const kind = read("lastPrimitive");
    if (kind && PRIMITIVES[kind]) this.state.lastPrimitive = kind;
  }

  /** 触った設定を次に開いたときのために残す。 */
  private remember(key: string, value: string | number | boolean): void {
    try {
      localStorage.setItem(`macbeth.${key}`, String(value));
    } catch {
      /* 保存できなくても動作には影響しない */
    }
  }

  private addPrimitive(kind: string): void {
    this.history.push(`${PRIMITIVES[kind].label} を追加`);
    const o = this.state.doc.addObject(kind);
    // 「追加」のカットインで触った既定値で作る（`21` の 2.7）
    const defaults = this.state.primitiveDefaults[kind];
    if (defaults) {
      o.params = { ...defaults };
      o.rebuild();
    }
    this.state.lastPrimitive = kind;
    this.remember("lastPrimitive", kind);
    this.state.select(o);
    this.viewport.syncAll();
    this.renderToolColumn();
    this.refresh();
    this.hud.toast(`${o.name} を追加しました`);
  }

  /**
   * 選択モードを変える。
   *
   * **選んだものが今のツールを上書きする**（ユーザー要望）。マルチカット中に
   * マーキングメニューで「エッジ」を選んだら、マルチカットは終わって選択に戻る。
   * マーキングメニューもツール列のボタンもここを通る。
   */
  setCompMode(mode: CompMode): void {
    if (this.state.tool !== "select") this.setTool("select");
    if (this.state.compMode === mode) return;
    this.state.compMode = mode;
    this.state.comp.clear();
    this.selector.reset();
    this.viewport.applyDisplayAll();
    this.viewport.rebuildOverlay();
    this.refresh();
    this.syncCompModeButtons();
    this.pushSelectionToUv();
    this.hud.toast(COMP_MODES.find((m) => m.id === mode)?.label ?? mode);
  }

  /* ---- ゲージと修飾キー ------------------------------------------------ */

  private buildGauges(): void {
    const onInput = () => {
      this.viewport.rebuildOverlay();
      // 強度が 0 を跨ぐと第 2 ゲージの意味が変わる（`24` の T3）
      for (const g of this.gauges) g.paint();
    };
    const onCommit = (which: "g1" | "g2") => {
      const d = this.state.gauge(which);
      if (d.kind === "spring" && !d.enabled(this.state)) this.hud.toast("コンポーネントを選んでください");
      this.refresh();
    };
    this.gauges = [
      new Gauge(this.state, "gauge1", "g1", "g1lbl", "g1val", onInput, onCommit),
      new Gauge(this.state, "gauge2", "g2", "g2lbl", "g2val", onInput, onCommit),
    ];
  }

  private buildCluster(): void {
    // オンとオフの 2 段階だけ。使っても消えないので、消すのはもう一度押したとき
    const cycle = (name: "shift" | "ctrl" | "alt") => {
      this.state.mods[name] = this.state.mods[name] === "off" ? "on" : "off";
      this.syncModButtons();
      this.hud.refreshStats();
    };
    byId("modShift").addEventListener("click", () => cycle("shift"));
    byId("modCtrl").addEventListener("click", () => cycle("ctrl"));
    byId("modAlt").addEventListener("click", () => cycle("alt"));

    // F は押しっぱなしで効く修飾。タップならフレーム
    const f = byId("btnFrame");
    f.addEventListener("touchstart", (e) => e.preventDefault(), { passive: false });
    f.addEventListener("pointerdown", (e) => {
      // 押している指を追い続ける。合成した入力では捕まえられないことがある
      try {
        f.setPointerCapture(e.pointerId);
      } catch {
        /* 捕まえられなくても、離した合図は届く */
      }
      this.fHeld = true;
    });
    for (const t of ["pointerup", "pointercancel"] as const) {
      f.addEventListener(t, () => {
        if (!this.fHeld) return;
        this.fHeld = false;
        if (!this.fChord) this.viewport.frameSelected();
        this.fChord = false;
      });
    }
  }

  /** F の押下状態は GestureRouter が持つ（矩形選択とピンチの分岐に使う）。 */
  private get fHeld(): boolean {
    return this.router.fHeld;
  }
  private set fHeld(v: boolean) {
    this.router.fHeld = v;
  }
  private get fChord(): boolean {
    return this.router.fChord;
  }
  private set fChord(v: boolean) {
    this.router.fChord = v;
  }

  private syncModButtons(): void {
    for (const [name, id] of [
      ["shift", "modShift"],
      ["ctrl", "modCtrl"],
      ["alt", "modAlt"],
    ] as const) {
      byId(id).dataset.state = this.state.mods[name];
    }
  }

  /* ---- キーボード ------------------------------------------------------ */

  private bindKeyboard(): void {
    window.addEventListener("keydown", (e) => {
      const target = e.target as HTMLElement | null;
      if (target && (target.tagName === "INPUT" || target.tagName === "TEXTAREA")) return;

      // Esc は開いているものを閉じる（PC 用。`24` の T1）
      if (e.key === "Escape") {
        this.closePopup();
        this.closeLayers();
        return;
      }
      const mode = COMP_MODES.find((m) => m.key === e.key);
      if (mode) {
        e.preventDefault();
        this.setCompMode(mode.id);
        return;
      }
      const display = DISPLAY_KEYS[e.key];
      if (display) {
        this.setDisplay(display);
        return;
      }
      if (e.key === "f" || e.key === "F") {
        this.viewport.frameSelected();
        return;
      }
      // Maya と同じ割り当て。Q はツール解除の位置だが、ここではユニバーサルに戻す
      const manip = { q: "all", t: "all", w: "move", e: "rotate", r: "scale" }[e.key.toLowerCase()];
      if (manip && !e.ctrlKey && !e.metaKey) {
        this.setManip(manip as Manip);
        return;
      }
      if (e.key === ">" || e.key === "." ) {
        this.growOrShrink(true);
        return;
      }
      if (e.key === "<" || e.key === ",") {
        this.growOrShrink(false);
        return;
      }
      // Maya と同じ。押している間だけスナップが効く（X = グリッド、V = 頂点、C = エッジ）
      const snapKey = { x: "grid", v: "vertex", c: "edge" }[e.key.toLowerCase()];
      if (snapKey && !e.ctrlKey && !e.metaKey) {
        this.state.snap.kind = snapKey as SnapKind;
        if (!this.state.snapKeyHeld) {
          this.state.snapKeyHeld = true;
          this.hud.toast(`スナップ: ${SNAP_LABEL[this.state.snap.kind]}（押している間）`);
          this.refresh();
        }
        return;
      }
      // ピボットの移動。Maya の D（Insert でも同じ）
      if ((e.key === "d" || e.key === "D" || e.key === "Insert") && !e.ctrlKey && !e.metaKey) {
        e.preventDefault();
        this.togglePivotEdit();
        return;
      }
      // マニピュレータの大きさ。Maya と同じ + / −
      if (e.key === "+" || e.key === "=") {
        this.setManipSize(this.state.manipSize * MANIP_SIZE_STEP);
        return;
      }
      if (e.key === "-" || e.key === "_") {
        this.setManipSize(this.state.manipSize / MANIP_SIZE_STEP);
        return;
      }
      // 対称編集は S。X は Maya に合わせてグリッドスナップに譲った
      if (e.key === "s" || e.key === "S") {
        this.state.symX = !this.state.symX;
        this.refresh();
        this.hud.toast(`対称編集 X: ${this.state.symX ? "オン" : "オフ"}`);
        return;
      }
      if ((e.ctrlKey || e.metaKey) && (e.key === "z" || e.key === "Z")) {
        e.preventDefault();
        if (e.shiftKey) this.doRedo();
        else this.doUndo();
        return;
      }
      if ((e.ctrlKey || e.metaKey) && (e.key === "y" || e.key === "Y")) {
        e.preventDefault();
        this.doRedo();
      }
    });

    window.addEventListener("keyup", (e) => {
      if (!this.state.snapKeyHeld) return;
      if (!["x", "v", "c"].includes(e.key.toLowerCase())) return;
      this.state.snapKeyHeld = false;
      this.preselect.clear();
      this.refresh();
      this.hud.defaultHint();
    });
  }

  /* ---- ヘッダ ---------------------------------------------------------- */

  private bindTopBar(): void {
    byId("btnUndo").addEventListener("click", () => this.doUndo());
    byId("btnRedo").addEventListener("click", () => this.doRedo());
    byId("btnPanels").addEventListener("click", () => this.toggleLayers());
    // モード切替。タップで下に一覧が開く（`23` の T1）
    byId("modeBtn").addEventListener("click", (e) => this.openModeMenu(e.currentTarget as HTMLElement));
    byId("fileBtn").addEventListener("click", (e) => this.openFileMenu(e.currentTarget as HTMLElement));
    // 画面の好み（`24` の T4）
    byId("viewBtn").addEventListener("click", (e) => this.openViewMenu(e.currentTarget as HTMLElement));
    document.addEventListener("pointerdown", (e) => {
      if (!this.popup) return;
      const target = e.target as Node;
      // 出したボタン自身は除く。そこを押したときは「もう一度押して閉じる」に任せる
      if (this.popup.contains(target) || this.popupAnchor?.contains(target)) return;
      this.closePopup();
    });
  }

  private closePopup(): void {
    this.popup?.remove();
    this.popup = null;
    this.popupAnchor = null;
    closeRadial();
  }

  /**
   * 上段の「表示」（`24` の T4）。画面の好みだけを集めたところ。
   * シェーディング（ツール列の「表示」グループ）とは別もの。
   */
  private openViewMenu(anchor: HTMLElement): void {
    if (this.popup?.dataset.menu === "view") {
      this.closePopup();
      return;
    }
    this.closePopup();
    const r = anchor.getBoundingClientRect();
    const pop = el("div", "panel floating");
    pop.dataset.menu = "view";
    pop.style.left = `${r.left}px`;
    pop.style.top = `${r.bottom + 2}px`;
    const body = el("div", "pbody");
    const item = (label: string, on: boolean, toggle: (v: boolean) => void) => {
      const b = el("button", "act chk");
      b.setAttribute("aria-pressed", String(on));
      b.appendChild(el("i"));
      b.appendChild(el("span", undefined, label));
      b.addEventListener("click", () => {
        const next = b.getAttribute("aria-pressed") !== "true";
        b.setAttribute("aria-pressed", String(next));
        toggle(next);
      });
      body.appendChild(b);
    };
    item("操作のヒント", this.state.ui.hints, (v) => {
      this.state.ui.hints = v;
      this.rememberUi();
      this.hud.defaultHint();
    });
    item("ポリゴンカウント", this.state.ui.stats, (v) => {
      this.state.ui.stats = v;
      this.rememberUi();
      this.hud.refreshStats();
    });
    // グリッドは「表示」グループのカットインと同じ状態（`23` の T6）
    item("グリッド", this.state.showGrid, (v) => {
      this.state.showGrid = v;
      this.remember("showGrid", v);
      this.viewport.setGridVisible(v);
    });
    item("左利き", this.state.ui.leftHanded, (v) => {
      this.state.ui.leftHanded = v;
      this.rememberUi();
      this.applyHand();
    });

    // 修飾ボタンの置き場所（`29` の A-T1）。握り方は端末で違うので選べるようにする
    body.appendChild(el("div", "minilbl", "修飾ボタン"));
    const seg = el("div", "segmented");
    for (const [key, label] of [
      ["corner", "左下"],
      ["side", "ツール列の横"],
    ] as const) {
      const b = el("button", "act", label);
      b.setAttribute("aria-pressed", String(this.state.ui.clusterPos === key));
      b.dataset.cluster = key;
      b.addEventListener("click", () => {
        this.state.ui.clusterPos = key;
        this.rememberUi();
        this.applyClusterPos();
        for (const other of seg.querySelectorAll("button")) {
          other.setAttribute("aria-pressed", String(other === b));
        }
      });
      seg.appendChild(b);
    }
    body.appendChild(seg);

    pop.appendChild(body);
    document.body.appendChild(pop);
    this.popup = pop;
    this.popupAnchor = anchor;
  }

  /**
   * 画面の大きさの変化を拾う（`29` の A-T2）。
   *
   * iOS（特にホーム画面から開いた standalone）は、回転のときの `resize` が
   * **寸法の確定より先に**来ることがある。そこで読んだ `clientWidth` は古く、
   * canvas の裏の大きさだけ前の向きのまま残るので「潰れた」ように見える。
   * 最後の 1 発が来ないこともある。
   *
   * そこで寸法の出どころを `ResizeObserver`（レイアウト確定後に呼ばれる）にして、
   * `window` の `resize` と `visualViewport` は保険にする。向きが変わったあとは
   * 350ms 置いてもう 1 回通す。
   */
  private watchSize(): void {
    const sync = () => {
      this.viewport.resize();
      this.uv?.resize();
    };
    new ResizeObserver(sync).observe(byId("pane3d"));
    new ResizeObserver(sync).observe(byId("paneUv"));
    window.addEventListener("resize", sync);
    window.visualViewport?.addEventListener("resize", sync);
    const late = () => {
      sync();
      setTimeout(() => {
        this.layout?.apply();
        sync();
      }, 350);
    };
    window.addEventListener("orientationchange", late);
    window.screen?.orientation?.addEventListener?.("change", late);
  }

  /** 左利きなら画面を左右鏡映しにする（`24` の T4）。中身は `shell.css`。 */
  private applyHand(): void {
    document.documentElement.dataset.hand = this.state.ui.leftHanded ? "left" : "right";
    this.viewport.resize();
    this.uv?.resize();
  }

  /** 修飾ボタンの置き場所（`29` の A-T1）。中身は `shell.css`。 */
  private applyClusterPos(): void {
    byId("vp").dataset.cluster = this.state.ui.clusterPos;
  }

  private rememberUi(): void {
    this.remember("ui", JSON.stringify(this.state.ui));
  }

  private openFileMenu(anchor: HTMLElement): void {
    this.closePopup();
    const r = anchor.getBoundingClientRect();
    const pop = el("div", "panel floating");
    pop.style.left = `${r.left}px`;
    pop.style.top = `${r.bottom + 2}px`;
    const body = el("div", "pbody");
    const item = (label: string, run: () => void | Promise<void>) => {
      const b = el("button", "act", label);
      b.addEventListener("click", () => {
        this.closePopup();
        void run();
      });
      body.appendChild(b);
    };
    item("新規シーン", () => this.newScene());
    item("プロジェクトを開く (.mbz)", () => this.openProject());
    item("プロジェクトを保存 (.mbz)", () => this.saveProject());
    item("OBJ を読み込む", () => this.importObj());
    item("OBJ を書き出す", () => this.exportObj());
    item("glTF を書き出す (.glb)", () => this.exportGlb());
    item("画面を画像で保存 (.png)", () => this.exportPng());
    item("更新を確認して開き直す", () => this.checkForUpdate());
    // 今開いているものがいつのビルドか。ホーム画面から開いたときの確認用
    body.appendChild(el("div", "hint", `ビルド ${__BUILD__}`));
    pop.appendChild(body);
    document.body.appendChild(pop);
    this.popup = pop;
  }

  /**
   * 新しいビルドが出ていないか見て、あれば開き直す。
   *
   * ふだんは開き直すだけで新しくなる（サービスワーカーは入口の HTML を
   * ネットワークから先に取る）。ホーム画面から開いたアプリは閉じないことがあるので、
   * ここから手で確かめられるようにしておく。
   */
  private async checkForUpdate(): Promise<void> {
    this.hud.toast("更新を確認しています…");
    try {
      const reg = await navigator.serviceWorker?.getRegistration();
      await reg?.update();
    } catch {
      /* サービスワーカーが無い環境（開発中）でも、下の再読み込みは効く */
    }
    location.reload();
  }

  /* ---- ファイル -------------------------------------------------------- */

  private async newScene(): Promise<void> {
    this.history.push("新規シーン");
    this.state.doc.objects.length = 0;
    this.state.select(null);
    this.state.doc.addObject("cube");
    this.state.select(this.state.doc.objects[0]);
    this.viewport.syncAll();
    this.refresh();
    await this.autosave.saveNow();
  }

  private async saveProject(): Promise<void> {
    const { packMbz } = await import("../core/index.js");
    // 分割と各ペインのカメラも一緒に残す（`25` の T6）
    this.state.doc.layout = this.viewport.saveLayout();
    const bytes = packMbz(this.state.doc, { appVersion: "0.1.0" });
    const name = `${this.state.doc.objects[0]?.name ?? "scene"}.mbz`;
    const r = await saveAs(bytes, name);
    this.hud.toast(r.saved ? `${name} を保存しました` : "保存を取り消しました");
  }

  private async openProject(): Promise<void> {
    const file = await openFile(".mbz");
    if (!file) return;
    try {
      const { unpackMbz } = await import("../core/index.js");
      const { document: doc } = unpackMbz(file.bytes);
      this.state.doc = doc;
      this.state.select(doc.objects[0] ?? null);
      this.history.clear();
      // 別のファイルなので、指紋の控えは持ち越さない（`32` の T4）
      forgetStamps();
      this.viewport.restoreLayout(doc.layout);
      this.viewport.syncAll();
      this.viewport.frameSelected();
      this.refresh();
      this.hud.toast(`${file.name} を開きました`);
    } catch (err) {
      this.hud.toast(err instanceof Error ? err.message : "読み込めませんでした");
    }
  }

  private async importObj(): Promise<void> {
    const file = await openFile(".obj,text/plain");
    if (!file) return;
    try {
      const parsed = parseObj(file.text);
      if (!parsed.length) return void this.hud.toast("面が見つかりませんでした");
      this.history.push("OBJ 読み込み");
      let last: SceneObject | null = null;
      for (const g of parsed) last = this.state.doc.addMesh(g.mesh, g.name);
      this.state.select(last);
      this.viewport.syncAll();
      this.viewport.frameSelected();
      this.refresh();
      this.hud.toast(`${file.name} を読み込みました`);
    } catch (err) {
      this.hud.toast(err instanceof Error ? err.message : "読み込めませんでした");
    }
  }

  private async exportObj(): Promise<void> {
    const targets = this.state.selected ? [this.state.selected] : this.state.doc.objects;
    if (!targets.length) return void this.hud.toast("書き出すものがありません");
    const text = writeObj(targets.map((o) => ({ mesh: o.mesh, name: o.name })));
    const name = `${targets[0].name}.obj`;
    const r = await saveAs(text, name);
    this.hud.toast(r.saved ? `${name} を書き出しました` : "書き出しを取り消しました");
  }

  /**
   * glTF（.glb）で書き出す。Substance Painter への渡しはこれ（`12` の E2）。
   * 出すのはシーン全部（選択があってもシーンごと出す。テクスチャ作業では
   * まわりのオブジェクトも要るため）。
   */
  private async exportGlb(): Promise<void> {
    const nodes = nodesFromObjects(this.state.doc.objects);
    if (!nodes.length) return void this.hud.toast("書き出すものがありません");
    const bytes = writeGlb(nodes, { smoothAngle: this.state.smoothAngle, generator: "macbeth" });
    const name = `${this.state.doc.objects[0]?.name ?? "scene"}.glb`;
    const r = await saveAs(bytes, name);
    this.hud.toast(
      r.saved ? `${name} を書き出しました — ${nodes.length} オブジェクト` : "書き出しを取り消しました",
    );
  }

  /** 今の 3D ビューを PNG で保存する（`12` の E5）。 */
  private async exportPng(): Promise<void> {
    // 保存の直前に 1 枚描く。requestAnimationFrame の谷間だと空になるため
    this.viewport.renderer.render(this.viewport.scene, this.viewport.camera);
    const canvas = byId<HTMLCanvasElement>("gl");
    const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob((b) => resolve(b), "image/png"));
    if (!blob) return void this.hud.toast("画像を作れませんでした");
    const bytes = new Uint8Array(await blob.arrayBuffer());
    const name = `${this.state.doc.objects[0]?.name ?? "macbeth"}.png`;
    const r = await saveAs(bytes, name);
    this.hud.toast(r.saved ? `${name} を保存しました` : "保存を取り消しました");
  }

  /* ---- 更新 ------------------------------------------------------------ */

  refresh(): void {
    // ジオメトリが変わっている可能性があるので、ホバーの表示は消す。
    // 次にポインタが動いた時点で出し直される
    this.preselect.clear();
    if (this.state.mode === "sculpt") {
      // 選び直したら半径を合わせ直す（同じものなら何もしない）
      this.fitBrushToSelection();
      // ALT を押している間だけ反転（`33` の T1）
      this.state.brush.invert = this.state.modOn("alt");
    }
    this.viewport.applyDisplayAll();
    this.refreshManipulator();
    this.hud.refreshStats();
    for (const g of this.gauges) g.paint();
    this.updateHistoryButtons();
    // スライダーを触っている最中に描き直すと掴んでいる指が外れる。
    // 判定は「指が乗っているか」で見る（履歴の控えで見ると、離した合図を
    // 取りこぼしたときにパネルが二度と描き直されなくなる）
    if (!this.sliderDrag) this.renderPanels();
  }
}
