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
  checker: "CHECKER",
};

export class Hud {
  private toastTimer: ReturnType<typeof setTimeout> | null = null;

  constructor(private state: AppState) {}

  /** UV モードのときに出す情報。島の数と歪み。 */
  uvNote: { charts: number; maxStretch: number; unit: string } | null = null;

  refreshStats(): void {
    const s = this.state.doc.stats();
    let edges = 0;
    for (const o of this.state.doc.objects) edges += o.mesh.stats().edges;
    byId("hudStats").innerHTML =
      `<i>Verts</i><span>${s.vertices}</span>` +
      `<i>Edges</i><span>${edges}</span>` +
      `<i>Faces</i><span>${s.faces}</span>` +
      `<i>Tris</i><span>${s.triangles}</span>`;

    // オンにしたままの修飾は消し忘れやすいので、常に見えるところへ出す
    const mods = this.state.activeMods();
    const modNote = mods.length ? ` · <b>${mods.join(" ")}</b>` : "";

    if (this.state.mode === "uv" && this.uvNote) {
      const n = this.uvNote;
      byId("hudMode").innerHTML =
        `UV · <b>${n.unit}</b>${modNote}<br>島 ${n.charts} · 伸び ×${n.maxStretch.toFixed(2)}` +
        (this.state.selected ? ` · ${this.state.selected.name}` : "");
      return;
    }
    const comp = COMP_NAME[this.state.compMode];
    const disp = DISPLAY_NAME[this.state.display];
    byId("hudMode").innerHTML =
      `${this.state.tool}${this.state.symX ? " · 対称X" : ""} · <b>${comp}</b>` +
      (this.state.comp.size ? ` · ${this.state.comp.size}` : "") +
      modNote +
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
      "<br>長押し 指1本 <kbd>マーキング</kbd> 指2本 <kbd>カメラ / 編集</kbd> 指3本 <kbd>カメラ</kbd> · ダブルタップ 指2本 <kbd>戻る</kbd> 指3本 <kbd>進む</kbd>" +
      "<br><kbd>SHF</kbd> + 移動 <kbd>押し出し</kbd> · <kbd>SHF</kbd> + <kbd>CTL</kbd> + 移動 <kbd>スライド</kbd> · " +
      "<kbd>D</kbd> <kbd>ピボット</kbd> · <kbd>+</kbd>/<kbd>-</kbd> <kbd>マニピュレータの大きさ</kbd>" +
      "<br>スナップ <kbd>ツール列</kbd> または <kbd>X</kbd>/<kbd>V</kbd>/<kbd>C</kbd> を押している間 · " +
      "<kbd>F</kbd> <kbd>矩形 / フレーム</kbd>" +
      "<br>マウス <kbd>Alt+左 タンブル</kbd> <kbd>Alt+中 パン</kbd> <kbd>Alt+右 ズーム</kbd>";
  }

  setSaveNote(text: string): void {
    byId("saveNote").textContent = text;
  }
}
