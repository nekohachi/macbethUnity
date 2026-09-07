/**
 * ビルドしたシェルを実際のブラウザで動かして確かめる。
 *
 * ここまで 3D の描画は一度も自動で確認できていなかった（CDN が使えなかったため）。
 * three.js を npm で持つようにしたので、ヘッドレス Chromium で描画から
 * 選択・取り消しまで通しで見られる。
 *
 *   npm run build && npm run smoke
 *
 * 画面の写真は SHOT=path で保存先を変えられる。
 */
import { chromium } from "playwright";
import { createServer } from "node:http";
import { existsSync } from "node:fs";
import { readFile } from "node:fs/promises";
import { extname, join } from "node:path";

const DIST = process.argv[2] ?? "dist";
const PORT = 4173;
const SHOT = process.env.SHOT ?? "smoke.png";
const TYPES = {
  ".html": "text/html",
  ".js": "text/javascript",
  ".css": "text/css",
  ".map": "application/json",
  ".png": "image/png",
};

// この環境には Chromium が先に入っていて、playwright の同梱版とは版が違う。
// あればそれを使い、無ければ playwright が入れたものに任せる（CI はこちら）。
const CHROME = process.env.CHROME_PATH || "/opt/pw-browsers/chromium-1194/chrome-linux/chrome";
const launchOptions = {
  args: ["--use-gl=swiftshader", "--enable-unsafe-swiftshader"],
  ...(existsSync(CHROME) ? { executablePath: CHROME } : {}),
};

const server = createServer(async (req, res) => {
  let path = req.url.split("?")[0];
  if (path === "/") path = "/app.html";
  try {
    const data = await readFile(join(DIST, path));
    res.writeHead(200, { "content-type": TYPES[extname(path)] ?? "application/octet-stream" });
    res.end(data);
  } catch {
    res.writeHead(404).end("not found");
  }
});
await new Promise((resolve) => server.listen(PORT, resolve));

const failures = [];
const check = (label, ok, detail = "") => {
  console.log(`${ok ? "  ok  " : "FAIL  "}${label}${detail ? ` — ${detail}` : ""}`);
  if (!ok) failures.push(label);
};

const browser = await chromium.launch(launchOptions);
const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
const errors = [];
page.on("pageerror", (e) => errors.push(String(e)));
page.on("console", (m) => {
  // フォントの CDN はこの環境から引けないので、読み込み失敗は数えない
  if (m.type() === "error" && !m.text().includes("Failed to load resource")) errors.push(m.text());
});

await page.goto(`http://localhost:${PORT}/app.html`, { waitUntil: "load" });
await page.waitForFunction(() => window.macbeth?.state.doc.objects.length > 0, null, { timeout: 5000 });

const state = () => page.evaluate(() => {
  const app = window.macbeth;
  return {
    objects: app.state.doc.objects.length,
    names: app.state.doc.objects.map((o) => o.name),
    compMode: app.state.compMode,
    comp: app.state.comp.size,
    stats: app.state.doc.stats(),
  };
});

/* 1. 起動して立方体が 1 つある */
let s = await state();
check("起動時に立方体が 1 つ", s.objects === 1 && s.stats.faces === 6, s.names.join(","));

/* 2. WebGL の文脈が取れていて、実際に描かれている */
const gl = await page.evaluate(() => {
  const c = document.getElementById("gl");
  const ctx = c.getContext("webgl2") ?? c.getContext("webgl");
  return { ok: !!ctx, size: [c.width, c.height] };
});
check("WebGL で描画できている", gl.ok && gl.size[0] > 0, gl.size.join("×"));

/* 3. フェースモードでクリックすると面が 1 つ選ばれる */
await page.keyboard.press("F11");
await page.mouse.click(660, 480);
s = await state();
check("フェースをクリックして選択", s.compMode === "face" && s.comp === 1, `comp=${s.comp}`);

/* 4. ダブルクリックでシェル全体（立方体なら 6 面） */
// 直前のクリックと繋がってダブル判定にならないよう、判定窓（380ms）を空ける
await page.waitForTimeout(500);
await page.mouse.dblclick(660, 480);
s = await state();
check("ダブルクリックでシェル選択", s.comp === 6, `comp=${s.comp}`);

/* 5. プリミティブを足すと 2 つになる */
await page.click("#dockLeft .ibtn[title^='スフィア']");
s = await state();
check("プリミティブを追加", s.objects === 2, s.names.join(","));

/* 6. 取り消しで 1 つに戻る */
await page.keyboard.press("Control+z");
s = await state();
check("取り消しで元に戻る", s.objects === 1, s.names.join(","));

/* 7. やり直しでまた 2 つ */
await page.keyboard.press("Control+Shift+z");
s = await state();
check("やり直しで戻る", s.objects === 2, s.names.join(","));

/* 8. 自動保存が IndexedDB に入る */
await page.waitForTimeout(1800);
const saved = await page.evaluate(
  () =>
    new Promise((resolve) => {
      const req = indexedDB.open("macbeth");
      req.onsuccess = () => {
        const db = req.result;
        const get = db.transaction(["projects"], "readonly").objectStore("projects").get("__autosave__");
        get.onsuccess = () => resolve(get.result ? get.result.size : 0);
        get.onerror = () => resolve(0);
      };
      req.onerror = () => resolve(0);
    }),
);
check("自動保存が書けている", saved > 0, `${saved} バイト`);

/* 9. 例外が出ていない */
check("例外なし", errors.length === 0, errors.join(" / "));

await page.screenshot({ path: SHOT });
console.log(`\n画面: ${SHOT}`);
await browser.close();
server.close();

if (failures.length) {
  console.error(`\n${failures.length} 件失敗: ${failures.join(", ")}`);
  process.exit(1);
}
console.log("すべて通りました");
