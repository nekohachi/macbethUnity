/**
 * 報告用の画面を撮る（`20` の「実装の報告に画面の絵を付ける」）。
 *
 *   npm run build && node scripts/shot.mjs <name> [dist]
 *
 * `name` は `scenes` の名前。撮ったものは `docs/img/<name>.png` に置く。
 * 通し確認（`smoke.mjs`）と同じ配信のしかたを使う。
 */
import { chromium } from "playwright";
import { createServer } from "node:http";
import { existsSync, mkdirSync } from "node:fs";
import { readFile } from "node:fs/promises";
import { extname, join } from "node:path";

const NAME = process.argv[2];
const DIST = process.argv[3] ?? "dist";
const PORT = 4174;
const TYPES = {
  ".html": "text/html",
  ".js": "text/javascript",
  ".css": "text/css",
  ".map": "application/json",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".webmanifest": "application/manifest+json",
};

/** 撮りたい場面。ブラウザの中で走らせる（引数なし、非同期）。 */
const scenes = {
  /** T2: 立方体を切って開くと、島がまっすぐ立つ。 */
  "20-t2-upright": async () => {
    const app = window.macbeth;
    const object = app.state.doc.objects[0];
    app.state.select(object);
    app.setMode("uv");
    app.setCompMode("face");
    app.state.comp.clear();
    for (let f = 0; f < object.mesh.faceCount; f += 2) app.state.comp.add(f);
    app.pushSelectionToUvForTest();
    app.uv.cutOrSew(true);
    app.uv.unfold();
    app.uv.chosen.clear();
    app.uv.refreshHighlight();
    app.uv.view.frameUnit();
  },
  /** T8: ツール列のグループと、変形のカットイン。 */
  "20-t8-toolgroups": async () => {
    const app = window.macbeth;
    app.state.select(app.state.doc.objects[0]);
    app.setCompMode("face");
    app.setManip("rotate");
    app.refresh();
    // 「変形」をタップしてオプションを出す
    const b = document.querySelector('#dockLeft .ibtn[data-group="xform"]');
    const r = b.getBoundingClientRect();
    for (const type of ["pointerdown", "pointerup"]) {
      const e = new PointerEvent(type, {
        pointerId: 5,
        pointerType: "mouse",
        bubbles: true,
        cancelable: true,
        clientX: r.x + r.width / 2,
        clientY: r.y + r.height / 2,
      });
      (type === "pointerdown" ? b : window).dispatchEvent(e);
    }
  },

  /** T3: 球の自動 UV。島どうしが離れている。 */
  "20-t3-margin": async () => {
    const app = window.macbeth;
    app.state.doc.objects.length = 0;
    const object = app.state.doc.addObject("sphere");
    app.viewport.syncAll();
    app.state.select(object);
    app.setMode("uv");
    app.uv.autoUnwrap();
    app.uv.chosen.clear();
    app.uv.refreshHighlight();
    app.uv.view.frameUnit();
  },
};

const scene = scenes[NAME];
if (!scene) {
  console.error(`場面が見つかりません: ${NAME}\n使えるもの: ${Object.keys(scenes).join(", ")}`);
  process.exit(1);
}

const ENTRY = "index.html";
const entryHtml = await readFile(join(DIST, ENTRY), "utf8");
const BASE = entryHtml.match(/(?:src|href)="(\/.*?\/)assets\//)?.[1] ?? "/";

const server = createServer(async (req, res) => {
  let path = req.url.split("?")[0];
  if (BASE !== "/" && path.startsWith(BASE)) path = `/${path.slice(BASE.length)}`;
  if (path === "/" || path === "") path = `/${ENTRY}`;
  try {
    const data = await readFile(join(DIST, path));
    res.writeHead(200, { "content-type": TYPES[extname(path)] ?? "application/octet-stream" });
    res.end(data);
  } catch {
    res.writeHead(404).end("not found");
  }
});
await new Promise((resolve) => server.listen(PORT, resolve));

const CHROME = process.env.CHROME_PATH || "/opt/pw-browsers/chromium-1194/chrome-linux/chrome";
const browser = await chromium.launch({
  args: ["--use-gl=swiftshader", "--enable-unsafe-swiftshader"],
  ...(existsSync(CHROME) ? { executablePath: CHROME } : {}),
});
const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
await page.goto(`http://localhost:${PORT}${BASE}${ENTRY}`, { waitUntil: "load" });
await page.waitForFunction(() => window.macbeth?.state.doc.objects.length > 0, null, { timeout: 5000 });

await page.evaluate(scene);
// 「両方」の表示にして、2D と 3D の両方が写るようにする
if (NAME.startsWith("20-t2") || NAME.startsWith("20-t3")) {
  await page.evaluate(() => {
    document.querySelector('#uvSwitch [data-split="both"]')?.click();
  });
}
await page.waitForTimeout(400);

mkdirSync("docs/img", { recursive: true });
const out = `docs/img/${NAME}.png`;
await page.screenshot({ path: out });
console.log(`撮りました: ${out}`);
await browser.close();
server.close();
