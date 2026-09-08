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
  /** T4: 手順 A。立方体を切って開き、縁のループを選んだところ。 */
  "20-t4-cubeflow": async () => {
    const app = window.macbeth;
    const object = app.state.doc.objects[0];
    app.state.select(object);
    app.setMode("uv");
    app.setCompMode("face");
    let top = 0;
    for (let f = 1; f < object.mesh.faceCount; f++) {
      if (object.mesh.faceCenter(f)[1] > object.mesh.faceCenter(top)[1]) top = f;
    }
    app.state.comp.clear();
    app.state.comp.add(top);
    app.pushSelectionToUvForTest();
    app.uv.cutOrSew(true);
    app.uv.unfold();
    app.uv.setUnit("edge");
    app.uv.view.frameUnit();
    // いちばん長くつながる縁を選んでおく（ダブルタップで選べるもの）
    const t = app.uv.view.uvTopology;
    let best = -1;
    let longest = 0;
    for (let i = 0; i < t.edges.length; i++) {
      if (t.edgeFaces[i].length >= 2) continue;
      const n = window.macbethCore.uvEdgeLoopFrom(t, i).edges.length;
      if (n > longest) {
        longest = n;
        best = i;
      }
    }
    app.uv.chosen.clear();
    for (const e of window.macbethCore.uvEdgeLoopFrom(t, best).edges) app.uv.chosen.add(e);
    app.uv.refreshHighlight();
  },

  /** T5: 手順 B。円柱を縦に切って開き、帯を格子にしたところ。 */
  "20-t5-cylinder": async () => {
    const app = window.macbeth;
    const core = window.macbethCore;
    app.state.doc.objects.length = 0;
    const object = app.state.doc.addObject("cylinder");
    object.params.sdAxis = 12;
    object.params.sdHeight = 3;
    object.rebuild();
    app.viewport.syncAll();
    app.state.select(object);
    app.setMode("uv");
    app.setCompMode("edge");
    const view = app.viewport.viewOf(object);
    let vertical = -1;
    view.edges.forEach(([a, b], i) => {
      if (vertical >= 0) return;
      const pa = object.mesh.getPosition(a);
      const pb = object.mesh.getPosition(b);
      if (Math.abs(pa[1] - pb[1]) > 1e-6 && Math.hypot(pa[0] - pb[0], pa[2] - pb[2]) < 1e-6) vertical = i;
    });
    const loop3d = core.edgeLoopFrom(object.mesh, view.edges[vertical][0], view.edges[vertical][1]);
    const keys = new Set(loop3d.edges.map(([a, b]) => core.edgeKey(a, b)));
    app.state.comp.clear();
    view.edges.forEach(([a, b], i) => {
      if (keys.has(core.edgeKey(a, b))) app.state.comp.add(i);
    });
    app.pushSelectionToUvForTest();
    app.uv.cutOrSew(true);
    app.uv.unfold();
    const t = app.uv.view.uvTopology;
    const band = t.charts.reduce((best, c, i) => (c.faces.length > t.charts[best].faces.length ? i : best), 0);
    app.uv.setUnit("shell");
    app.uv.chosen.clear();
    app.uv.chosen.add(band);
    app.uv.gridChart();
    app.uv.repack();
    app.uv.view.frameUnit();
  },

  /** T9: レイヤーのドロワー（狭い画面）。 */
  "20-t9-layers": async () => {
    const app = window.macbeth;
    app.state.doc.objects.length = 0;
    for (const kind of ["cube", "sphere", "cylinder"]) app.state.doc.addObject(kind);
    app.state.doc.objects[0].transform.position = [-1.6, 0, 0];
    app.state.doc.objects[2].transform.position = [1.6, 0, 0];
    app.state.doc.objects[1].locked = true;
    app.viewport.syncAll();
    app.state.select(app.state.doc.objects[2]);
    app.viewport.frameSelected();
    app.refresh();
    document.getElementById("btnPanels").click();
    await new Promise((r) => setTimeout(r, 250));
    // 1 行だけ開いてプロパティを見せる
    const more = document.querySelector(".drawer .lyrow .more");
    more?.click();
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
// 画面の大きさは SHOT_SIZE=幅x高さ で変えられる（レイヤーのドロワーは狭い画面のもの）
const [SW, SH] = (process.env.SHOT_SIZE ?? "1280x800").split("x").map(Number);
const page = await browser.newPage({ viewport: { width: SW, height: SH } });
await page.goto(`http://localhost:${PORT}${BASE}${ENTRY}`, { waitUntil: "load" });
await page.waitForFunction(() => window.macbeth?.state.doc.objects.length > 0, null, { timeout: 5000 });

await page.evaluate(scene);
// 「両方」の表示にして、2D と 3D の両方が写るようにする
if (NAME.startsWith("20-t2") || NAME.startsWith("20-t3") || NAME.startsWith("20-t4") || NAME.startsWith("20-t5")) {
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
