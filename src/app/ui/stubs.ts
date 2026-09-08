/**
 * まだ作っていないモードの予定表。
 *
 * 空白を見せるより、そのモードで何をやるつもりかを出しておく。
 * プロトタイプにあったものをそのまま移した。実装が済んだモードから消していく。
 */
import { el } from "./dom.js";

export interface StubItem {
  /** 機能の名前。 */
  label: string;
  /** 何をするか。 */
  detail: string;
  /** 実現手段や時期。右端に小さく出る。 */
  note: string;
}

export interface StubDef {
  kicker: string;
  title: string;
  body: string;
  items: StubItem[];
}

const item = (label: string, detail: string, note: string): StubItem => ({ label, detail, note });

export const STUBS: Record<string, StubDef> = {
  sculpt: {
    kicker: "未実装 — v1.5 の中核",
    title: "スカルプト",
    body:
      "モデリングモードで作ったローモデルを、クリースとディバイドでハイメッシュ化します。" +
      "ディバイドスライダーを下げてモデリングに戻り頂点を編集すると、ハイメッシュのディテールを保ったまま" +
      "ローモデルを調整できます。左のゲージはそのまま「ブラシ強度」と「ブラシサイズ」に置き換わります。",
    items: [
      item("ブラシ", "Standard / Clay / Move / Smooth / Pinch / Inflate / Flatten / Trim / Polish", "11 種"),
      item("サブディビジョン", "接空間デルタによるマルチ解像度スタック", "docs/03"),
      item("マスキング", "ペン描画、キャビティ、ポリグループ、裏面マスク", "自前実装"),
      item("対称", "X / Y / Z 軸対称と放射状対称", "自前実装"),
      item("レイヤー", "レベルごとのデルタバッファと強度スライダー", "v1.5"),
    ],
  },
  material: {
    kicker: "未実装 — v2.0 予定",
    title: "マテリアル",
    body:
      "2D ビュー（UV 空間）と 3D ビューを同時に表示し、両方で同期してペイントします。" +
      "Substance のファイル形式は非公開のため直接は読めません。" +
      "書き出したテクスチャセットを命名規則で自動認識する方式で対応します。" +
      "左のゲージは「不透明度」と「ブラシサイズ」に置き換わります。",
    items: [
      item("チャンネル", "BaseColor / Roughness / Metallic / Normal / Height / AO / Emissive", "7 種"),
      item("レイヤー", "塗り、ペイント、マスク、フォルダ、ブレンドモード", "自前実装"),
      item("ベイク", "法線、AO、カーブチャ、厚み、ポジション、ID", "2K 既定"),
      item("読み込み", "テクスチャセット（PNG / TGA / EXR）と MaterialX", ".sbsar 不可"),
      item("書き出し", "テクスチャセット、glTF、MaterialX", "自前実装"),
    ],
  },
};

/** 予定表の DOM を作る。 */
export function buildStub(def: StubDef): HTMLElement {
  const wrap = el("div", "stub");
  const inner = el("div", "stub-in");
  inner.appendChild(el("div", "kicker", def.kicker));
  inner.appendChild(el("h2", undefined, def.title));
  inner.appendChild(el("p", undefined, def.body));
  const list = el("ul");
  for (const it of def.items) {
    const li = el("li");
    li.appendChild(el("b", undefined, it.label));
    li.appendChild(el("span", undefined, it.detail));
    li.appendChild(el("em", undefined, it.note));
    list.appendChild(li);
  }
  inner.appendChild(list);
  wrap.appendChild(inner);
  return wrap;
}
