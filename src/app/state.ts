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
/** スナップの行き先。Maya の X（グリッド）/ V（頂点）/ C（エッジ）に対応する。 */
export type SnapKind = "grid" | "vertex" | "edge";
/** 修飾キーのラッチ。off →（タップ）latch →（もう一度）lock。 */
export type ModState = "off" | "latch" | "lock";

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
   * 効くのは CTL ラッチ中、または X / V / C を押している間。
   */
  snap: { kind: SnapKind; step: number } = { kind: "grid", step: 0.5 };
  /** X / V / C を押している間だけ立つ。キーで一時的にスナップを効かせるため。 */
  snapKeyHeld = false;
  /** ミラーの軸。0 = X、1 = Y、2 = Z。 */
  mirrorAxis: 0 | 1 | 2 = 0;
  /** マルチカット。snapStep は % で 0 ならオフ。 */
  cut = { snapStep: 0, edgeFlow: false };
  /** ベベル。segments が 1 なら面取り、2 以上で丸め。 */
  bevel = { width: 0.1, segments: 1 };
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

  /** スナップが効いているか。CTL ラッチか、X / V / C を押している間。 */
  get snapping(): boolean {
    return this.snapKeyHeld || this.modOn("ctrl");
  }

  /** latch は 1 回使ったら解除する。lock は残す。 */
  releaseLatches(): boolean {
    let changed = false;
    for (const k of ["shift", "ctrl", "alt"] as const) {
      if (this.mods[k] === "latch") {
        this.mods[k] = "off";
        changed = true;
      }
    }
    return changed;
  }

  select(o: SceneObject | null): void {
    if (this.selected !== o) this.comp.clear();
    this.also.clear();
    this.selected = o;
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
