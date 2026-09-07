import { defineConfig } from "vite";

// GitHub Pages はリポジトリ名のサブパスで配信されるため base を合わせる。
// ローカル開発では "/"、Actions では MACBETH_BASE を渡す。
const base = process.env.MACBETH_BASE ?? "/";

// 入口は app.html。ルートの index.html は移植が済むまで
// プロトタイプの単体ページ（prototype/make-pages.sh が生成）を置いておく。
export default defineConfig({
  base,
  build: {
    target: "es2022",
    outDir: "dist",
    sourcemap: true,
    rollupOptions: { input: { app: "app.html" } },
  },
  server: { open: "/app.html" },
});
