/** ビューポート上の情報表示。統計、モード、操作のヒント。 */
import type { AppState, Display } from "../state.js";
import { asMb, estimateBytes, levelCount, usingWasm } from "../levels.js";
import { byId } from "./dom.js";

const COMP_NAME: Record<string, string> = {
  object: "オブジェクト",
  vertex: "頂点",
  edge: "エッジ",
  face: "フェース",
};

// `Record<Display, string>` にしておくと、表示を足したときにここの
// 書き忘れをコンパイラが見つける（`poles` を足したとき HUD が undefined になった）
const DISPLAY_NAME: Record<Display, string> = {
  wire: "WIRE",
  shaded: "SHADED",
  shadedWire: "SHADED+WIRE",
  smooth: "SMOOTH",
  checker: "CHECKER",
  heat: "HEAT",
  poles: "POLES",
};

export class Hud {
  private toastTimer: ReturnType<typeof setTimeout> | null = null;

  constructor(private state: AppState) {}

  /** UV モードのときに出す情報。島の数と歪み。 */
  uvNote: { charts: number; maxStretch: number; unit: string } | null = null;

  /**
   * ポリゴンカウントの控え（`29` の B-T6）。
   *
   * 数を出すにはエッジを数え直す必要があり、10 万三角形で 1 回 40ms かかる。
   * ドラッグの最中は毎フレーム呼ばれるので、**トポロジが変わっていなければ
   * 前の数をそのまま使う**。座標が動いても数は変わらない。
   */
  private statsCache: { key: string; html: string } | null = null;

  /**
   * スカルプトのときだけ出す「今の段 / 全段 · 推定メモリ · wasm か JS か」
   * （`32` の T3、`03` の 3.3）。**レベルを 1 つ上げるとメモリが 4 倍になる**ので、
   * 上げる前に見えるところへ出しておく。
   */
  private levelRow(): string {
    const o = this.state.selected;
    if (this.state.mode !== "sculpt" || !o) return "";
    const top = levelCount(o);
    const how = usingWasm() ? "wasm" : "js";
    return `<i>Level</i><span>${o.activeLevel}/${top} · ${asMb(estimateBytes(o))} · ${how}</span>`;
  }

  /** 数が変わりうるか。オブジェクトの数と、いま見せている各メッシュの大きさだけ見る。 */
  private statsKey(): string {
    let key = "";
    for (const o of this.state.doc.objects) {
      const m = o.shown(this.state.shownLevel(o));
      key += `${o.id}@${this.state.shownLevel(o)}:${m.vertexCount}/${m.cornerCount}/${m.faceCount};`;
    }
    return key;
  }

  refreshStats(): void {
    // ポリゴンカウントは上段の「表示」で消せる（`24` の T4）
    byId("hudStats").hidden = !this.state.ui.stats;
    const key = this.statsKey();
    if (this.statsCache?.key !== key) {
      // 段を上げていればその段の数を出す（`32` の T3）
      let vertices = 0;
      let faces = 0;
      let triangles = 0;
      let edges = 0;
      for (const o of this.state.doc.objects) {
        const st = o.shown(this.state.shownLevel(o)).stats();
        vertices += st.vertices;
        faces += st.faces;
        triangles += st.triangles;
        edges += st.edges;
      }
      this.statsCache = {
        key,
        html:
          `<i>Verts</i><span>${vertices}</span>` +
          `<i>Edges</i><span>${edges}</span>` +
          `<i>Faces</i><span>${faces}</span>` +
          `<i>Tris</i><span>${triangles}</span>` +
          this.levelRow(),
      };
    }
    byId("hudStats").innerHTML = this.statsCache.html;

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
      `${this.state.tool}${this.state.symX ? " · 対称X" : ""}` +
      (this.state.pivotEdit ? " · <b>ピボット編集</b>" : "") +
      ` · <b>${comp}</b>` +
      (this.state.comp.size ? ` · ${this.state.comp.size}` : "") +
      modNote +
      // ロック中は名前の横に鍵。視点が動かない理由がここで分かる（`25` の T5）
      `<br>${disp} · ${this.state.viewName}${this.state.camOpts.locked ? " 🔒" : ""}` +
      `${this.state.camOpts.ortho ? " · ORTHO" : ""}` +
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
    // 操作のヒントは上段の「表示」で消せる（`24` の T4）。
    // 消していてもトーストは出て、消えたあとは空になる
    if (!this.state.ui.hints) {
      byId("hudHint").innerHTML = "";
      return;
    }
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
