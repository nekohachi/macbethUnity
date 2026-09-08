import { defineConfig } from "vite";

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
  server: { open: "/" },
});
