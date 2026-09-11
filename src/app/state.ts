/**
 * アプリの状態。プロトタイプの `App` オブジェクトをここへ移した。
 *
 * core は状態を持たない純粋な関数とデータ構造なので、どのオブジェクトが
 * 選ばれていて、どのモードで、どのツールなのかは全部ここに集める。
 */
import { Document, type BrushKind, type CameraBookmark, type SampleSpace, type SceneObject } from "../core/index.js";
import type { CheckerPattern } from "./render/checker.js";
import { DEFAULT_SIZE_RATIO, radiusFor } from "./levels.js";

export type Mode = "model" | "uv" | "sculpt" | "material";
export type CompMode = "object" | "vertex" | "edge" | "face";
export type Display = "wire" | "shaded" | "shadedWire" | "smooth" | "checker" | "heat" | "poles" | "material";
export type Manip = "all" | "move" | "rotate" | "scale";
/** マニピュレータの軸の向き（`45` の T2）。Maya の「軸の向き」と同じ 4 つ。 */
export type ManipSpace = "object" | "local" | "world" | "normal";
/** 「編集」グループの中身（`21` の 2.3）。ツールとコマンドが混ざっている。 */
/**
 * 「編集」グループの中身。
 *
 * **ターゲットウェルドはここから外した**（`45` の T3）。溶接は頂点を 1 つ掴んで
 * 別の頂点の上で離せば常に効く＝マニピュレータのドラッグなので、
 * マージの仲間として「変形」の輪に移した。
 */
export type EditKind = "multicut" | "bevel" | "bridge" | "extrude" | "connect";
/**
 * スナップの行き先。Maya の X（グリッド）/ V（頂点）/ C（カーブ = ここではエッジ）。
 * サーフェスは Maya の Make Live にあたるもので、キーは無い（docs/17 の 7.3）。
 */
export type SnapKind = "grid" | "vertex" | "edge" | "surface";
/** UV 列の「カット / ソー」グループの中身（`24` の T5）。 */
export type UvCutKind = "cut" | "moveSew" | "sew";
/**
 * 修飾キーのラッチ。オンとオフの 2 段階だけ（docs/17 の 6 章）。
 * 一度使ったら消える中間の状態は置かない。消すのは自分でもう一度押したとき。
 *
 * **押している間だけ**効かせるのは別の印（`heldMod`。`47` の T1）。
 * 本物の Shift キーと同じで、離せば消える。ラッチ（ロック）はこの 2 段階のまま。
 */
export type ModState = "off" | "on";
/** 押している間だけ効く修飾（`47` の T1）。 */
export type ModName = "shift" | "ctrl" | "alt";

/** カメラの設定。ペインごとに持つ（`25` の T5・T6）。 */
export interface CamOpts {
  focal: number;
  near: number;
  far: number;
  ortho: boolean;
  /** ロック中はタンブル / パン / ズーム / フレーム / ビュー切り替えを受けない。 */
  locked: boolean;
}

/**
 * ペインのうち、state から見える分（`25` の T6）。
 * `viewport` の `Pane` はこれに three.js のカメラを足したもの。
 */
export interface PaneLike {
  camOpts: CamOpts;
  display: Display;
  viewName: string;
}

export function defaultCamOpts(): CamOpts {
  return { focal: 35, near: 0.05, far: 500, ortho: false, locked: false };
}

export function defaultPane(): PaneLike {
  return { camOpts: defaultCamOpts(), display: "shadedWire", viewName: "パース" };
}

export interface Mods {
  shift: ModState;
  ctrl: ModState;
  alt: ModState;
}

/** ふつうのゲージ。下から上へ min〜max の値を取る。 */
export interface AbsoluteGauge {
  kind: "absolute";
  label: string;
  full: string;
  min: number;
  max: number;
  step: number;
  /**
   * つまみの位置と値の対応（`41` の T2）。既定は線形。
   *
   * `"square"` は `値 = min + (max − min) × t²`。**下のほうに幅が出る。**
   * 筆の太さは 0.5%〜50% で、ふだん使うのは 5% 前後。線形だとゲージの下 1 割に
   * 全部が詰まって、指で選び分けられなかった（実機の声）。
   */
  curve?: "square";
  /** 値の見せ方（`41` の T2。筆の太さは「6.6%」と出す）。既定は小数 2 桁。 */
  format?(v: number): string;
  get(s: AppState): number;
  set(s: AppState, v: number): void;
}

/** つまみの位置（0〜1）から値。 */
export function gaugeValue(d: AbsoluteGauge, t: number): number {
  const shaped = d.curve === "square" ? t * t : t;
  return d.min + shaped * (d.max - d.min);
}

/** 値からつまみの位置（0〜1）。`gaugeValue` の逆。 */
export function gaugeRatio(d: AbsoluteGauge, v: number): number {
  const t = (v - d.min) / (d.max - d.min);
  const clamped = Math.max(0, Math.min(1, t));
  return d.curve === "square" ? Math.sqrt(clamped) : clamped;
}

/**
 * バネ式のゲージ（`24` の T3）。中央が 0 で、離すと中央へ戻る。
 * 絶対値ではなく「今の状態から何段」という相対値を扱うもの。
 */
export interface SpringGauge {
  kind: "spring";
  label: string;
  full: string;
  /** 端まで引いたときの段数。中央から上下に ±steps。 */
  steps: number;
  /** 効く状態か。false なら薄く見せて、触っても何もしない。 */
  enabled(s: AppState): boolean;
  /** 押した瞬間。今の状態を控える。 */
  begin(s: AppState): void;
  /** 引いている間。n は −steps〜+steps の整数。毎回控えから計算し直す。 */
  drag(s: AppState, n: number): void;
  /** 離したとき。控えを捨てる。 */
  end(s: AppState): void;
}

export type GaugeDef = AbsoluteGauge | SpringGauge;

export type { BrushKind };

/** ブラシの状態（`33` の T1）。種類は core と同じものを使う。 */
export interface BrushState {
  kind: BrushKind;
  /** 0〜1。 */
  strength: number;
  /**
   * ワールド単位。画面の px ではない。**`sizeRatio` からの派生値**（`41` の T2）。
   * 実際に彫るのはこちらを見る（`brushAt`、カーソル、`strokeFootprint`）。
   */
  radius: number;
  /**
   * 対象の大きさ（境界箱の対角）に対する筆の太さの割合（`41` の T2）。
   *
   * **ゲージが読み書きするのはこちら。** オブジェクトを選び直したら、割合は
   * そのままで `radius` を計算し直す。大きい模型でも小さい模型でも、
   * 同じつまみの位置で同じ「見た目の太さ」になる。
   */
  sizeRatio: number;
  /** 筆圧を半径に効かせる。 */
  pressureSize: boolean;
  /** 筆圧を強度に効かせる。 */
  pressureStrength: boolean;
  /**
   * 筆圧のカーブ（`38` の T4）。**効き = 筆圧 ^ pow。**
   *
   * 1 なら軽く触れただけで効き、大きいほど押し込まないと効かない。
   * 半径と強度で別に持つ（`05` の「それぞれ独立したカーブで」）。
   *
   * **曲線の編集 UI は作らない。** 点を打つ UI はタブレットで扱いにくく、
   * 数 1 つで足りる。既定は強度 2 / 半径 1 で、`33` の手触りのまま。
   */
  pressureSizePow: number;
  pressureStrengthPow: number;
  /**
   * 裏面マスク（`34`）。**既定でオン。**
   *
   * こちらに背を向けている頂点を触らない。ZBrush の既定はオフだが、
   * タブレットで薄い形を触るときに切り忘れて壊すほうが痛い。
   * これが無いと、ムーブで耳を引くと反対側の耳まで動く。
   */
  backfaceMask: boolean;
}

/**
 * 筆圧から、実際に使う半径と強度を出す（`33` の T1）。
 *
 * カーブの調整 UI は S2-4。いまは決め打ち。強度を 2 乗にしてあるのは、
 * 軽く触れたときに効きすぎないようにするため。
 */
export function brushAt(b: BrushState, pressure: number): { radius: number; strength: number } {
  const p = pressure > 0 ? Math.min(1, pressure) : 0.5;
  // カーブは数 1 つ（`38` の T4）。既定は半径 1 / 強度 2 で、`33` の手触りのまま
  const curve = (pow: number): number => (pow === 1 ? p : Math.pow(p, pow));
  return {
    radius: b.radius * (b.pressureSize ? 0.35 + 0.65 * curve(b.pressureSizePow) : 1),
    strength: b.strength * (b.pressureStrength ? curve(b.pressureStrengthPow) : 1),
  };
}

/** モードごとにゲージの意味が置き換わる。強度と範囲という役割は変えない（docs/09）。 */
export const GAUGES: Record<Mode, { g1: GaugeDef; g2: GaugeDef }> = {
  model: {
    g1: gauge("強度", "ソフト選択 強度", 0, 1, 0.01, "strength"),
    g2: gauge("範囲", "ソフト選択 範囲", 0.05, 6, 0.05, "radius"),
  },
  uv: {
    g1: gauge("強度", "ソフト選択 強度", 0, 1, 0.01, "strength"),
    g2: gauge("範囲", "ソフト選択 範囲", 0.05, 6, 0.05, "radius"),
  },
  sculpt: {
    g1: gauge("強度", "ブラシ強度", 0, 1, 0.01, "strength", "brush"),
    // 筆の太さは**対象の大きさに対する割合**（`41` の T2）。0.5%〜50%、2 乗のカーブ。
    // 既定の 6.6% はつまみの 35% あたりに来る
    g2: {
      kind: "absolute",
      label: "サイズ",
      full: "ブラシサイズ（対象の大きさに対する割合）",
      min: 0.005,
      max: 0.5,
      step: 0.001,
      curve: "square",
      format: (v) => `${(v * 100).toFixed(1)}%`,
      get: (s) => s.brush.sizeRatio,
      set: (s, v) => {
        s.brush.sizeRatio = v;
        s.brush.radius = radiusFor(s.selected, v);
      },
    },
  },
  material: {
    g1: gauge("不透明", "不透明度", 0, 1, 0.01, "strength", "brush"),
    g2: gauge("サイズ", "ブラシサイズ", 0.01, 10, 0.01, "radius", "brush"),
  },
};

/**
 * ふつうのゲージを 1 つ作る。
 *
 * `into` で**どこへ書くか**を選ぶ。モデリングと UV は `soft`（ソフト選択）、
 * スカルプトとマテリアルは `brush`（ブラシ）。**混ぜない**（`33` の T1）。
 *
 * **`s[into][key]` と書かないこと。** `AppState` を変数のキーで引くと、
 * その形が壊れて（V8 が辞書モードへ落として）**そこから先の全部が遅くなる**。
 * ゲージの `get` は `refresh()` のたびに走る＝ホバーのたびに走るので、
 * これをやったとき 10 万三角形のホバー 60 回が 529ms → 741ms になった。
 * 下のように枝で分けると 249ms（元より速い）。`29` の B-T6 の門が拾った。
 */
function gauge(
  label: string,
  full: string,
  min: number,
  max: number,
  step: number,
  key: "strength" | "radius",
  into: "soft" | "brush" = "soft",
): AbsoluteGauge {
  return {
    kind: "absolute",
    label,
    full,
    min,
    max,
    step,
    get: (s) => (into === "brush" ? s.brush[key] : s.soft[key]),
    set: (s, v) => {
      if (into === "brush") s.brush[key] = v;
      else s.soft[key] = v;
    },
  };
}

/**
 * 選択の拡張 / 縮小（Maya の Grow / Shrink）。ソフト選択を切っているときの
 * 第 2 ゲージ（`24` の T3）。中身は app が差し込む（選択の広げ方は state の
 * 仕事ではない）。
 */
export const GROW_GAUGE: SpringGauge = {
  kind: "spring",
  label: "拡張",
  full: "選択を拡張 / 縮小",
  steps: 8,
  enabled: (s) => s.compMode !== "object" && s.comp.size > 0,
  begin: (s) => s.growHooks?.begin(),
  drag: (s, n) => s.growHooks?.drag(n),
  end: (s) => s.growHooks?.end(),
};

export class AppState {
  doc = new Document();
  /** 選択中のオブジェクト。 */
  selected: SceneObject | null = null;
  /** 選択中のコンポーネント。compMode によって頂点 / エッジ / 面のインデックス。 */
  comp = new Set<number>();
  /**
   * オブジェクトモードで Shift を足して選んだ相手。`selected` は最後に選んだもの。
   * 結合のように複数を要る操作だけが見る。
   */
  also = new Set<SceneObject>();

  mode: Mode = "model";
  compMode: CompMode = "object";
  tool = "select";
  manip: Manip = "all";

  /**
   * 今つながっているペイン（`25` の T6）。分割していないときは 1 つだけ。
   * `viewport` が差し替える。表示・カメラ・ビュー名は**ペインごと**なので、
   * `state.display` などはここへの別名にしてある（呼び出し側は今までどおり）。
   */
  pane: PaneLike = defaultPane();
  /** 最後に触れたペインの表示（シェーディング）。ツール列の「シェード」が効く先。 */
  get display(): Display {
    return this.pane.display;
  }
  set display(v: Display) {
    this.pane.display = v;
  }

  /**
   * マニピュレータの見た目の大きさ（0.5〜2.0）。当たり判定の px は変えない。
   * `localStorage` に残す（docs/17 の 4.2）。
   */
  manipSize = 1;
  /**
   * マニピュレータの軸の向き（`45` の T2）。Maya の「軸の向き」。
   *
   * `object` オブジェクトの回転 / `local` 親の空間（**親がまだ無いので今は
   * `object` と同じ**）/ `world` ワールドの XYZ（既定）/ `normal` 選んだ
   * コンポーネントの平均法線。**移動・回転・スケールで共通の 1 つ**
   * （Maya は道具ごとに持つが、タブレットで 3 回選ばせるのは重い）。
   * `localStorage` に残す。
   */
  manipSpace: ManipSpace = "world";
  /**
   * ピボットを動かしている最中（Maya の D）。オンの間はメッシュではなく
   * ピボットだけが動く。
   */
  pivotEdit = false;
  /**
   * 選択の中心から動かしたピボット。null なら今までどおり選択の中心。
   * 選択が変わったら消える（セッション値。docs/17 の 4.3）。
   */
  pivotOverride: { x: number; y: number; z: number } | null = null;

  mods: Mods = { shift: "off", ctrl: "off", alt: "off" };
  /**
   * いま**押している**修飾ボタン（`47` の T1）。長押し中だけ立ち、離せば null。
   * ロック（`mods`）とは別。`modOn()` はどちらも見る。
   */
  heldMod: ModName | null = null;
  /**
   * X 対称（`45` の T1）。**アプリに 1 つ**。
   *
   * モデリングの頂点編集（`tools/transform.ts`）とスカルプトの筆（`stroke.ts`）が
   * 同じこれを見る。前は筆だけが別に `brush.symmetryX` を持っていて、
   * モデリングで入れてもスカルプトでは切れている（逆も）が起きていた。
   *
   * **既定はオフ**、`localStorage` に残す。知らずに反対側が動くほうが事故なので。
   * 相手は `41` の対応表（`levels.ts` の `mirrorMapOf`）。
   */
  symX = false;
  /** true = 指は常にカメラ。false（既定）= メッシュの上ならツール、外ならタンブル。 */
  fingerCam = false;

  soft = { strength: 0, radius: 1.0 };
  /**
   * ブラシ（`33` の T1）。**ソフト選択とは別に持つ。**
   *
   * ここを `soft` と共有していたせいで、スカルプトでブラシサイズを変えると
   * モデリングのソフト選択の範囲まで変わっていた。
   *
   * `radius` は**ワールド単位**（画面の px ではない）。カメラを寄せても効き方が
   * 変わらないほうが彫りやすい。オブジェクトを選んだときに、その大きさから
   * 決め直す（`app.fitBrushRadius`）。
   */
  brush: BrushState = {
    kind: "standard",
    // **実機で触って決めた値**（2026-09-09）。ZBrush の Z Intensity で言えば
    // 67 にあたる。0.25（ZBrush の既定）は控えめすぎるとのことだった
    strength: 0.67,
    radius: 0.4,
    sizeRatio: DEFAULT_SIZE_RATIO,
    backfaceMask: true,
    pressureSize: true,
    pressureSizePow: 1,
    pressureStrengthPow: 2,
    pressureStrength: true,
  };
  /**
   * ブラシごとの強さ（`51` の声。ZBrush と同じ「筆が自分の Z Intensity を覚える」）。
   *
   * ムーブだけは **1.0**。ZBrush の Move も既定が 100 で、**掴んだ所が指について
   * くる**のが手触りの要。0.67 のままだと指より 3 割遅れて、引いても形が付いて
   * こない（実機の「ムーブが使いにくい」）。
   * 彫る筆は今までどおり 0.67（`38` で実機を触って決めた値）。
   */
  brushStrength: Partial<Record<BrushKind, number>> = { move: 1 };

  /** その筆の強さ。覚えていなければ今の値のまま。 */
  strengthFor(kind: BrushKind): number {
    return this.brushStrength[kind] ?? this.brush.strength;
  }
  /**
   * いま記録しているスカルプトレイヤーの id（`42` の T3）。null なら素のデルタへ。
   * 段が違うレイヤーが選ばれていたら、`stroke.ts` が素のデルタへ落とす。
   */
  activeLayer: string | null = null;
  toolOpts = { extrudeDist: 0.35 };
  /** 頂点まわり。mergeDist は距離マージのしきい値、extrudeWidth は尖らせるときの根元の太さ。 */
  vertexOpts = { mergeDist: 0.05, extrudeWidth: 0.25 };
  /**
   * スナップ。kind が行き先の種類、step はグリッドの刻み。
   * 効くのはツール列のスナップがオンのとき、または X / V / C を押している間。
   * CTL とは無関係（docs/17 の 7.1）。
   */
  snap: { kind: SnapKind; step: number } = { kind: "grid", step: 0.5 };
  /** ツール列のスナップボタン。押している間だけのキーとは別に、ずっと効く。 */
  snapOn = false;
  /** X / V / C を押している間だけ立つ。キーで一時的にスナップを効かせるため。 */
  snapKeyHeld = false;
  /** UV モードのスナップ。種類はグリッドと UV 頂点だけ（docs/17 の 7.4）。 */
  uvSnap: { kind: "grid" | "vertex"; step: number } = { kind: "grid", step: 1 / 8 };
  /** ミラーの軸。0 = X、1 = Y、2 = Z。 */
  mirrorAxis: 0 | 1 | 2 = 0;
  /** マルチカット。snapStep は % で 0 ならオフ。 */
  cut = { snapStep: 0, edgeFlow: false };
  /**
   * 移動で UV を保つ（Maya の Preserve UVs。`23` の T5）。既定はオン。
   * 効くのはコンポーネントの移動だけ。`localStorage` に残す。
   */
  preserveUvs = true;
  /** ブリッジの分割数（`23` の T4）。1 なら 1 段。 */
  bridgeSegments = 1;
  /** ベベル。segments が 1 なら面取り、2 以上で丸め。 */
  bevel = { width: 0.1, segments: 1 };
  /**
   * カメラベース選択（Maya の Camera based selection、`21` の 2.1）。
   * オンのとき、カメラから見えているものだけを選ぶ。裏側は拾わない。
   */
  cameraBased = false;
  /** 回転の刻み（度）。0 ならなめらか（`21` の 2.2）。 */
  rotateStep = 0;
  /** スケールのドラッグで 0 を跨がせない（`21` の 2.2）。 */
  preventNegativeScale = true;
  /** 「編集」グループで最後に使ったもの。ボタンのアイコンとタップの中身になる。 */
  lastEdit: EditKind = "multicut";
  /**
   * UV 列の「カット / ソー」グループで最後に使ったもの（`24` の T5）。
   * ボタンのアイコンとタップの中身になる。`localStorage` に残す。
   */
  lastUvCut: UvCutKind = "cut";
  /** 「追加」グループで最後に追加した種類。 */
  lastPrimitive = "cube";
  /**
   * 次に追加するときのプリミティブのパラメータ。何も選んでいないときに
   * 「追加」のカットインで触るのはこちら（`21` の 2.7）。
   */
  primitiveDefaults: Record<string, Record<string, number>> = {};
  /**
   * 歪みを色で見る（`23` の T2）。2D の島に色が乗り、3D の表示が `heat` になる。
   * `localStorage` に残す。
   */
  uvHeat = false;
  /** ヒートマップに入る前の 3D の表示。オフにしたときここへ戻す。 */
  displayBeforeHeat: Display | null = null;
  /**
   * チェッカーの細かさと模様（`23` の T3）。2D の下地と 3D の表示で共通。
   * `localStorage` に残す。
   */
  checker: { cells: number; pattern: CheckerPattern } = { cells: 8, pattern: "checker" };
  /**
   * アトリビュートの転送（`24` の T6）。何を写すかと、どの空間で対応を取るか。
   * `localStorage` に残す。
   */
  transfer: { positions: boolean; uvs: boolean; space: SampleSpace } = {
    positions: false,
    uvs: true,
    space: "world",
  };
  /**
   * 画面まわりの好み（`24` の T4）。上段の「表示」から触る。
   * `localStorage` に残す。
   */
  ui = {
    hints: true,
    stats: true,
    leftHanded: false,
    /**
     * 修飾ボタン（F / SHF / CTL / ALT）の置き場所（`29` の A-T1）。
     * `corner` = 左下の角（既定）、`side` = ツール列の横の縦の中央。
     * タブレットによって握り方が違うので、上段の「表示」から選べる。
     */
    clusterPos: "corner" as "corner" | "side",
    /**
     * 指はカメラだけ（`36` の T5。`04` の 4.1 の「ペンのみツール」）。
     *
     * 立てると指は模型の上でもタンブルになる。Pencil で彫っているとき、
     * 添えた指が模型に触れて彫ってしまうのを防ぐ。
     *
     * **既定はオフ。** ZBrush for iPad も Nomad も既定は「指でも彫れる」で、
     * ペンを持っていない人（Android の指だけ）が最初に触って何も彫れないほうが困る。
     * ペンはこの旗を見ない（ペンは常にツール）。
     */
    fingerCamera: false,
    /**
     * ハイを重ねて見せる（`43` の T4。`03` の売り）。
     *
     * モデリングでローを直している間、いちばん上の段の形が薄く重なる。
     * スカルプト中は出さない（そこではハイそのものを見ている）。
     */
    ghostHigh: false,
  };
  /** 裏面を描かない（`23` の T6）。既定はオフ（両面）。モデリング用。 */
  cullBack = false;
  /**
   * スカルプトで裏面を描かない（`40` の T4）。既定はオン。
   * 裏面を描くだけで 1 フレームが 1.5 倍になるので、彫るときは切る。
   * 薄い板を彫る人のために切り替えは残す。
   */
  sculptCullBack = true;
  /** いまのモードで効く「裏面を描かない」。描画側はこちらを見る。 */
  get cullBackNow(): boolean {
    return this.mode === "sculpt" ? this.sculptCullBack : this.cullBack;
  }
  /** スカルプトに入る前の表示（`40` の T4）。戻すときここへ戻す。 */
  displayBeforeSculpt: Display | null = null;
  /** 床のグリッドを出す（`23` の T6）。既定はオン。 */
  showGrid = true;
  /** Maya の既定と同じ 30°。 */
  smoothAngle = 30;
  /**
   * カメラの設定。`locked` はタンブル / パン / ズーム / フレーム / ビュー切り替えを
   * 受けなくする（`25` の T5）。作業中の都合なので `.mbz` には入れない。
   */
  /** 最後に触れたペインのカメラ設定。 */
  get camOpts(): CamOpts {
    return this.pane.camOpts;
  }
  set camOpts(v: CamOpts) {
    this.pane.camOpts = v;
  }
  /** 今のビューの名前。HUD に出す。標準ビュー名か、控えたカメラの名前。 */
  get viewName(): string {
    return this.pane.viewName;
  }
  set viewName(v: string) {
    this.pane.viewName = v;
  }
  /** 名前を付けて控えたカメラは `doc.cameraBookmarks`。`.mbz` に一緒に保存される。 */
  get cameras(): CameraBookmark[] {
    return this.doc.cameraBookmarks;
  }

  /**
   * 「拡張」ゲージの中身。app が差し込む（`24` の T3）。
   * begin で今の選択を控え、drag で控えから n 段ぶん広げ直す。
   */
  growHooks: { begin(): void; drag(n: number): void; end(): void } | null = null;

  /**
   * そのゲージの意味。モデリングの第 2 ゲージだけは、
   * **ソフト選択を切っていると「拡張」になる**（`24` の T3）。
   * 範囲は効いているときにしか意味が無く、切っている間は死んだ場所だった。
   */
  gauge(which: "g1" | "g2"): GaugeDef {
    if (which === "g2" && this.mode === "model" && this.soft.strength <= 0) return GROW_GAUGE;
    return GAUGES[this.mode][which];
  }

  modOn(name: keyof Mods): boolean {
    return this.mods[name] !== "off" || this.heldMod === name;
  }

  /** スナップが効いているか。ツール列のボタンか、X / V / C を押している間。 */
  get snapping(): boolean {
    return this.snapKeyHeld || this.snapOn;
  }

  /** オンになっている修飾の名前。HUD に出して消し忘れに気づけるようにする。 */
  activeMods(): string[] {
    const out: string[] = [];
    // 押している間だけのものは「↓」を添える（離せば消えるので、消し忘れではない）
    const tag = (name: ModName, label: string): void => {
      if (this.mods[name] !== "off") out.push(label);
      else if (this.heldMod === name) out.push(`${label}↓`);
    };
    tag("shift", "SHF");
    tag("ctrl", "CTL");
    tag("alt", "ALT");
    return out;
  }

  /**
   * そのオブジェクトを今どの段で見せるか（`32` の T2）。
   *
   * **モデリングは常にレベル 0。**（`03` の 3.4。ローモデルを編集する側）
   * スカルプトでは `activeLevel`。`activeLevel` 自体は書き換えないので、
   * モードを行き来しても見ていた段は覚えている。
   */
  shownLevel(o: SceneObject): number {
    return this.mode === "sculpt" ? o.activeLevel : 0;
  }

  select(o: SceneObject | null): void {
    if (this.selected !== o) this.comp.clear();
    this.also.clear();
    this.selected = o;
    // ピボットは選択について回るものなので、選び直したら中心へ戻す
    this.pivotOverride = null;
  }

  /** 選んでいるオブジェクトすべて（最後に選んだものが先頭）。 */
  selectedObjects(): SceneObject[] {
    if (!this.selected) return [];
    return [this.selected, ...[...this.also].filter((o) => o !== this.selected)];
  }

  /** オブジェクトモードで Shift を足したとき。すでに入っていれば外す。 */
  addObject(o: SceneObject): void {
    if (!this.selected) {
      this.selected = o;
      return;
    }
    if (o === this.selected) return;
    if (this.also.has(o)) this.also.delete(o);
    else this.also.add(o);
  }
}
