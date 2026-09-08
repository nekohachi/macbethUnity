/** 起動。web/index.html から読み込まれる。 */
import "./styles/shell.css";
import { App } from "./app.js";
import * as core from "../core/index.js";

// iOS / Android の長押しメニューとテキスト選択を止める。canvas 側は
// GestureRouter が touchstart を抑止しているので、ここは画面全体の分。
document.addEventListener("contextmenu", (e) => e.preventDefault());
document.addEventListener("selectstart", (e) => {
  const t = e.target as HTMLElement | null;
  if (t && t.tagName !== "INPUT" && t.tagName !== "TEXTAREA") e.preventDefault();
});

// オフラインで開けるようにする。開発中は登録しない（更新が回りくどくなるため）
if (import.meta.env.PROD && "serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    void navigator.serviceWorker
      .register(`${import.meta.env.BASE_URL}sw.js`, {
        scope: import.meta.env.BASE_URL,
        // sw.js 自体を HTTP の控えから読ませない。ここを既定にすると、
        // サービスワーカーを直したとき最大 24 時間古いものが動き続ける
        updateViaCache: "none",
      })
      // ホーム画面から開いたアプリは長く生きるので、起動のたびに確かめる
      .then((reg) => reg.update())
      .catch(() => {
        /* 登録できなくてもアプリは動く（オフラインにならないだけ） */
      });
  });
}

const app = new App();
void app.boot();

// デバッグ用。コンソールから状態を覗けるようにしておく。
// core も出しておく（通し確認から書き出しを直に叩くため）
Object.assign(window, { macbeth: app, macbethCore: core });
