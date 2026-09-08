/**
 * アプリの状態。プロトタイプの `App` オブジェクトをここへ移した。
 *
 * core は状態を持たない純粋な関数とデータ構造なので、どのオブジェクトが
 * 選ばれていて、どのモードで、どのツールなのかは全部ここに集める。
 */
import { Document, type CameraBookmark, type SceneObject } from "../core/index.js";

export type Mode = "model" | "uv" | "sculpt" | "material";
export type CompMode = "object" | "vertex" | "edge" | "face";
export type Display = "wire" | "shaded" | "shadedWire" | "smooth" | "checker";
export type Manip = "all" | "move" | "rotate" | "scale";
/** 「編集」グループの中身（`21` の 2.3）。ツールとコマンドが混ざっている。 */
export type EditKind = "multicut" | "bevel" | "bridge" | "extrude" | "connect" | "weld";
/**
 * スナップの行き先。Maya の X（グリッド）/ V（頂点）/ C（カーブ = ここではエッジ）。
 * サーフェスは Maya の Make Live にあたるもので、キーは無い（docs/17 の 7.3）。
 */
export type SnapKind = "grid" | "vertex" | "edge" | "surface";
/**
 * 修飾キーのラッチ。オンとオフの 2 段階だけ（docs/17 の 6 章）。
 * 一度使ったら消える中間の状態は置かない。消すのは自分でもう一度押したとき。
 */
export type ModState = "off" | "on";

export interface Mods {
  shift: ModState;
  ctrl: ModState;
  alt: ModState;
}

export interface GaugeDef {
  label: string;
  full: string;
  min: number;
  max: number;
  step: number;
  get(s: AppState): number;
  set(s: AppState, v: number): void;
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
    g1: gauge("強度", "ブラシ強度", 0, 1, 0.01, "strength"),
    g2: gauge("サイズ", "ブラシサイズ", 0.05, 6, 0.05, "radius"),
  },
  material: {
    g1: gauge("不透明", "不透明度", 0, 1, 0.01, "strength"),
    g2: gauge("サイズ", "ブラシサイズ", 0.05, 6, 0.05, "radius"),
  },
};

function gauge(
  label: string,
  full: string,
  min: number,
  max: number,
  step: number,
  key: "strength" | "radius",
): GaugeDef {
  return {
    label,
    full,
    min,
    max,
    step,
    get: (s) => s.soft[key],
    set: (s, v) => {
      s.soft[key] = v;
    },
  };
}

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
  display: Display = "shadedWire";

  /**
   * マニピュレータの見た目の大きさ（0.5〜2.0）。当たり判定の px は変えない。
   * `localStorage` に残す（docs/17 の 4.2）。
   */
  manipSize = 1;
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
  /** 対称編集（ローカル X）。 */
  symX = false;
  /** true = 指は常にカメラ。false（既定）= メッシュの上ならツール、外ならタンブル。 */
  fingerCam = false;
  panelsHidden = false;

  soft = { strength: 0, radius: 1.0 };
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
  /** 「追加」グループで最後に追加した種類。 */
  lastPrimitive = "cube";
  /**
   * 次に追加するときのプリミティブのパラメータ。何も選んでいないときに
   * 「追加」のカットインで触るのはこちら（`21` の 2.7）。
   */
  primitiveDefaults: Record<string, Record<string, number>> = {};
  /** Maya の既定と同じ 30°。 */
  smoothAngle = 30;
  camOpts = { focal: 35, near: 0.05, far: 500, ortho: false };
  /** 今のビューの名前。HUD に出す。標準ビュー名か、控えたカメラの名前。 */
  viewName = "パース";
  /** 名前を付けて控えたカメラは `doc.cameraBookmarks`。`.mbz` に一緒に保存される。 */
  get cameras(): CameraBookmark[] {
    return this.doc.cameraBookmarks;
  }

  gauge(which: "g1" | "g2"): GaugeDef {
    return GAUGES[this.mode][which];
  }

  modOn(name: keyof Mods): boolean {
    return this.mods[name] !== "off";
  }

  /** スナップが効いているか。ツール列のボタンか、X / V / C を押している間。 */
  get snapping(): boolean {
    return this.snapKeyHeld || this.snapOn;
  }

  /** オンになっている修飾の名前。HUD に出して消し忘れに気づけるようにする。 */
  activeMods(): string[] {
    const out: string[] = [];
    if (this.mods.shift !== "off") out.push("SHF");
    if (this.mods.ctrl !== "off") out.push("CTL");
    if (this.mods.alt !== "off") out.push("ALT");
    return out;
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
