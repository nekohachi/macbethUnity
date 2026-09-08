/** ビューポート上の情報表示。統計、モード、操作のヒント。 */
import type { AppState } from "../state.js";
import { byId } from "./dom.js";

const COMP_NAME: Record<string, string> = {
  object: "オブジェクト",
  vertex: "頂点",
  edge: "エッジ",
  face: "フェース",
};

const DISPLAY_NAME: Record<string, string> = {
  wire: "WIRE",
  shaded: "SHADED",
  shadedWire: "SHADED+WIRE",
  smooth: "SMOOTH",
};

export class Hud {
  private toastTimer: ReturnType<typeof setTimeout> | null = null;

  constructor(private state: AppState) {}

  refreshStats(): void {
    const s = this.state.doc.stats();
    let edges = 0;
    for (const o of this.state.doc.objects) edges += o.mesh.stats().edges;
    byId("hudStats").innerHTML =
      `<i>Verts</i><span>${s.vertices}</span>` +
      `<i>Edges</i><span>${edges}</span>` +
      `<i>Faces</i><span>${s.faces}</span>` +
      `<i>Tris</i><span>${s.triangles}</span>`;

    const comp = COMP_NAME[this.state.compMode];
    const disp = DISPLAY_NAME[this.state.display];
    byId("hudMode").innerHTML =
      `${this.state.tool}${this.state.symX ? " · 対称X" : ""} · <b>${comp}</b>` +
      (this.state.comp.size ? ` · ${this.state.comp.size}` : "") +
      `<br>${disp} · ${this.state.viewName}${this.state.camOpts.ortho ? " · ORTHO" : ""}` +
      (this.state.selected ? ` · ${this.state.selected.name}` : "");
  }

  toast(message: string): void {
    byId("hudHint").innerHTML = message;
    if (this.toastTimer !== null) clearTimeout(this.toastTimer);
    this.toastTimer = setTimeout(() => this.defaultHint(), 2800);
  }

  defaultHint(): void {
    if (this.toastTimer !== null) clearTimeout(this.toastTimer);
    this.toastTimer = null;
    byId("hudHint").innerHTML =
      (this.state.fingerCam
        ? "指1本 <kbd>タンブル</kbd> · ペン <kbd>ツール</kbd>"
        : "指1本 メッシュ上 <kbd>ツール</kbd> / 外 <kbd>タンブル</kbd> · ペン <kbd>ツール</kbd>") +
      " · 指2本 <kbd>パン / ズーム</kbd>" +
      "<br><b>指3本 つまむ <kbd>選択を拡大縮小</kbd> · 上下 <kbd>Y へ移動</kbd> · 左右 <kbd>X / Z へ移動</kbd></b>" +
      "<br>長押し 指2本 <kbd>カメラ / 編集メニュー</kbd> 指3本 <kbd>カメラ</kbd> · ダブルタップ 指2本 <kbd>戻る</kbd> 指3本 <kbd>進む</kbd>" +
      "<br><kbd>F</kbd> + ドラッグ <kbd>矩形選択</kbd> · <kbd>F</kbd> + ピンチ <kbd>選択中心へズーム</kbd>" +
      "<br><kbd>CTL</kbd> または <kbd>X</kbd>/<kbd>V</kbd>/<kbd>C</kbd> <kbd>スナップ（グリッド / 頂点 / エッジ）</kbd>" +
      "<br>マウス <kbd>Alt+左 タンブル</kbd> <kbd>Alt+中 パン</kbd> <kbd>Alt+右 ズーム</kbd>";
  }

  setSaveNote(text: string): void {
    byId("saveNote").textContent = text;
  }
}
