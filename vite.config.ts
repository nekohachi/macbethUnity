import { execSync } from "node:child_process";
import { defineConfig } from "vite";

/**
 * ビルドの目印。「今開いているのは新しいものか」をアプリの中で確かめられるように、
 * 日時と commit を焼き込む（ファイルメニューの下に出る）。
 */
function buildStamp(): string {
  const now = new Date();
  const pad = (n: number) => String(n).padStart(2, "0");
  const time = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())} ${pad(now.getHours())}:${pad(now.getMinutes())}`;
  let sha = "";
  try {
    sha = execSync("git rev-parse --short HEAD", { encoding: "utf8" }).trim();
  } catch {
    /* git が無いところでビルドしても困らないようにする */
  }
  return sha ? `${time} · ${sha}` : time;
}

// GitHub Pages はリポジトリ名のサブパスで配信されるため base を合わせる。
// ローカル開発では "/"、Actions では MACBETH_BASE を渡す。
const base = process.env.MACBETH_BASE ?? "/";

// 入口は web/index.html。root を web/ に置いているのは、リポジトリ直下の
// index.html を「app/ への転送ページ」として空けておくため（ブランチ配信の
// ルートが 404 にならないようにする）。公開 URL は /macbethUnity/app/ のまま。
export default defineConfig({
  root: "web",
  base,
  publicDir: "../public",
  build: {
    target: "es2022",
    outDir: "../dist",
    emptyOutDir: true,
    sourcemap: true,
  },
  define: { __BUILD__: JSON.stringify(buildStamp()) },
  server: { open: "/" },
});
