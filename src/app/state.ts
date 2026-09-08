/**
 * アプリの状態。プロトタイプの `App` オブジェクトをここへ移した。
 *
 * core は状態を持たない純粋な関数とデータ構造なので、どのオブジェクトが
 * 選ばれていて、どのモードで、どのツールなのかは全部ここに集める。
 */
import { Document, type SceneObject } from "../core/index.js";

export type Mode = "model" | "uv" | "sculpt" | "material";
export type CompMode = "object" | "vertex" | "edge" | "face";
export type Display = "wire" | "shaded" | "shadedWire" | "smooth";
export type Manip = "all" | "move" | "rotate" | "scale";
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

/** 名前を付けて控えたカメラ。視点そのものを丸ごと持つ。 */
export interface SavedCamera {
  name: string;
  theta: number;
  phi: number;
  distance: number;
  target: [number, number, number];
  focal: number;
  ortho: boolean;
}

export class AppState {
  doc = new Document();
  /** 選択中のオブジェクト。 */
  selected: SceneObject | null = null;
  /** 選択中のコンポーネント。compMode によって頂点 / エッジ / 面のインデックス。 */
  comp = new Set<number>();

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
  /** マルチカット。snapStep は % で 0 ならオフ。 */
  cut = { snapStep: 0, edgeFlow: false };
  /** ベベル。segments が 1 なら面取り、2 以上で丸め。 */
  bevel = { width: 0.1, segments: 1 };
  /** Maya の既定と同じ 30°。 */
  smoothAngle = 30;
  camOpts = { focal: 35, near: 0.05, far: 500, ortho: false };
  /** 今のビューの名前。HUD に出す。標準ビュー名か、控えたカメラの名前。 */
  viewName = "パース";
  /**
   * 名前を付けて控えたカメラ（Maya の camera1、camera2 …）。
   * 今のところ画面の状態なので、開き直すと消える。`.mbz` へ入れるのは配布フェーズ。
   */
  cameras: SavedCamera[] = [];

  gauge(which: "g1" | "g2"): GaugeDef {
    return GAUGES[this.mode][which];
  }

  modOn(name: keyof Mods): boolean {
    return this.mods[name] !== "off";
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
    this.selected = o;
  }
}
