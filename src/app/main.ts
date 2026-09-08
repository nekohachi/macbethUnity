/** 起動。web/index.html から読み込まれる。 */
import "./styles/shell.css";
import { App } from "./app.js";

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
    void navigator.serviceWorker.register(`${import.meta.env.BASE_URL}sw.js`, {
      scope: import.meta.env.BASE_URL,
    });
  });
}

const app = new App();
void app.boot();

// デバッグ用。コンソールから状態を覗けるようにしておく。
Object.assign(window, { macbeth: app });
