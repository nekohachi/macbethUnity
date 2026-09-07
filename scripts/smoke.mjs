/**
 * ビルドしたシェルを実際のブラウザで動かして確かめる。
 *
 * ここまで 3D の描画は一度も自動で確認できていなかった（CDN が使えなかったため）。
 * three.js を npm で持つようにしたので、ヘッドレス Chromium で描画から
 * 選択・取り消しまで通しで見られる。
 *
 *   npm run build && npm run smoke          # dist/（ベースは /）
 *   npm run smoke app                       # app/（ベースは /macbethUnity/app/）
 *
 * 配信のベースは入口の HTML に書かれた資材のパスから読み取るので、
 * どちらのビルドでもそのまま動く。画面の写真は SHOT=path で保存先を変えられる。
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
  ".svg": "image/svg+xml",
  ".webmanifest": "application/manifest+json",
};

// この環境には Chromium が先に入っていて、playwright の同梱版とは版が違う。
// あればそれを使い、無ければ playwright が入れたものに任せる（CI はこちら）。
const CHROME = process.env.CHROME_PATH || "/opt/pw-browsers/chromium-1194/chrome-linux/chrome";
const launchOptions = {
  args: ["--use-gl=swiftshader", "--enable-unsafe-swiftshader"],
  ...(existsSync(CHROME) ? { executablePath: CHROME } : {}),
};

// 入口の名前と配信のベースを、ビルドされたものから読み取る。
// vite の base を変えても確認手順を書き換えずに済むようにするため。
const ENTRY = existsSync(join(DIST, "app.html")) ? "app.html" : "index.html";
const entryHtml = await readFile(join(DIST, ENTRY), "utf8");
const BASE = entryHtml.match(/(?:src|href)="(\/.*?\/)assets\//)?.[1] ?? "/";

const server = createServer(async (req, res) => {
  let path = req.url.split("?")[0];
  // ベース付きで要求されたぶんを剥がして、ビルド先の実ファイルに対応させる
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
console.log(`${DIST}/ を ${BASE} で配信して確かめます\n`);

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

await page.goto(`http://localhost:${PORT}${BASE}${ENTRY}`, { waitUntil: "load" });
await page.waitForFunction(() => window.macbeth?.state.doc.objects.length > 0, null, { timeout: 5000 });

// 画面の座標はキャンバスの矩形からの比率で出す。
// パネルの有無で幅が変わっても手順が壊れないようにするため。
const rect = await page.evaluate(() => {
  const r = document.getElementById("gl").getBoundingClientRect();
  return { x: r.x, y: r.y, w: r.width, h: r.height };
});
const at = (fx, fy) => ({ x: Math.round(rect.x + rect.w * fx), y: Math.round(rect.y + rect.h * fy) });
/** 立方体の手前の面のあたり。 */
const ON_MESH = at(0.46, 0.6);
/** 何もない所。 */
const EMPTY = at(0.15, 0.23);
/** 面を選んだときに出る +Y のハンドル。メッシュの外側にある。 */
const ON_HANDLE = at(0.45, 0.34);

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
await page.mouse.click(ON_MESH.x, ON_MESH.y);
s = await state();
check("フェースをクリックして選択", s.compMode === "face" && s.comp === 1, `comp=${s.comp}`);

/* 4. ダブルクリックでシェル全体（立方体なら 6 面） */
// 直前のクリックと繋がってダブル判定にならないよう、判定窓（380ms）を空ける
await page.waitForTimeout(500);
await page.mouse.dblclick(ON_MESH.x, ON_MESH.y);
s = await state();
check("ダブルクリックでシェル選択", s.comp === 6, `comp=${s.comp}`);

/* 5. マニピュレータで動かせる（オブジェクトモードで中心をつかんでドラッグ） */
await page.keyboard.press("F8");
await page.mouse.click(ON_MESH.x, ON_MESH.y);
const before = await page.evaluate(() => window.macbeth.state.selected.transform.position.slice());
// 立方体の面をつかんで引っぱる（オブジェクトモードなので中心ハンドルか面つかみ）
await page.mouse.move(ON_MESH.x, ON_MESH.y);
await page.mouse.down();
await page.mouse.move(ON_MESH.x + 100, ON_MESH.y, { steps: 8 });
await page.mouse.up();
const after = await page.evaluate(() => window.macbeth.state.selected.transform.position.slice());
const moved = before.some((v, i) => Math.abs(v - after[i]) > 1e-4);
check("マニピュレータで移動できる", moved, `${before.map((n) => n.toFixed(2))} → ${after.map((n) => n.toFixed(2))}`);

/* 6. 移動も取り消せる */
await page.keyboard.press("Control+z");
const undone = await page.evaluate(() => window.macbeth.state.selected.transform.position.slice());
check(
  "移動を取り消せる",
  undone.every((v, i) => Math.abs(v - before[i]) < 1e-6),
  undone.map((n) => n.toFixed(2)).join(","),
);

/* 7. 指でもマニピュレータをつかめる（メッシュの外にあるハンドルを触る） */
await page.waitForTimeout(500);
// Y の矢印の先はメッシュの外にある。ここを指で触ってもタンブルにならないこと。
// まず何も選んでいない状態でその点を叩き、メッシュに当たらないことを確かめる
const ARROW = ON_HANDLE;
await page.keyboard.press("F8");
await page.mouse.click(EMPTY.x, EMPTY.y); // 何もない所 → 選択解除
await page.mouse.click(ARROW.x, ARROW.y);
const offMesh = await page.evaluate(() => window.macbeth.state.selected === null);
// 選び直してマニピュレータを出す。何も選んでいない状態の 1 回目は
// オブジェクトが選ばれるだけなので、間を空けてもう一度叩いて面を選ぶ
await page.keyboard.press("F11");
await page.mouse.click(ON_MESH.x, ON_MESH.y);
await page.waitForTimeout(500);
await page.mouse.click(ON_MESH.x, ON_MESH.y);
const ready = await page.evaluate(() => window.macbeth.state.comp.size);
const touchMoved = await page.evaluate(async (a) => {
  const canvas = document.getElementById("gl");
  const before = Array.from(window.macbeth.state.selected.mesh.positions);
  const fire = (type, x, y) =>
    canvas.dispatchEvent(
      new PointerEvent(type, {
        pointerId: 99,
        pointerType: "touch",
        isPrimary: true,
        clientX: x,
        clientY: y,
        buttons: type === "pointerup" ? 0 : 1,
        bubbles: true,
        cancelable: true,
      }),
    );
  fire("pointerdown", a.x, a.y);
  for (let i = 1; i <= 8; i++) fire("pointermove", a.x, a.y - i * 8);
  fire("pointerup", a.x, a.y - 64);
  await new Promise((r) => setTimeout(r, 50));
  const after = Array.from(window.macbeth.state.selected.mesh.positions);
  return before.some((v, i) => Math.abs(v - after[i]) > 1e-4);
}, ARROW);
check(
  "指でマニピュレータをつかめる",
  offMesh && ready === 1 && touchMoved,
  !offMesh ? "判定点がメッシュ上にある" : ready !== 1 ? `面が選べていない (comp=${ready})` : "",
);
await page.keyboard.press("Control+z");

/* 8. マルチカットで面が増える（予測線 → 確定） */
await page.keyboard.press("Control+z"); // 選択状態を整える
await page.click("#dockLeft .ibtn[title^='マルチカット']");
const facesBefore = await page.evaluate(() => window.macbeth.state.selected.mesh.faceCount);
await page.mouse.move(at(0.4, 0.62).x, at(0.4, 0.62).y); // エッジの近くへホバー
const previewed = await page.evaluate(() => document.getElementById("hudHint").innerHTML.includes("エッジループ挿入"));
await page.mouse.move(ON_MESH.x, ON_MESH.y);
await page.mouse.down();
await page.mouse.up();
const facesAfter = await page.evaluate(() => window.macbeth.state.selected.mesh.faceCount);
check("マルチカットで切れる", facesAfter > facesBefore, `${facesBefore} → ${facesAfter}面 / 予測線 ${previewed ? "あり" : "なし"}`);
await page.keyboard.press("Control+z");
await page.click("#dockLeft .ibtn[title^='選択・変形']");

/* 9. プリミティブを足すと 2 つになる */
await page.click("#dockLeft .ibtn[title^='スフィア']");
s = await state();
check("プリミティブを追加", s.objects === 2, s.names.join(","));

/* 10. 取り消しで 1 つに戻る */
await page.keyboard.press("Control+z");
s = await state();
check("取り消しで元に戻る", s.objects === 1, s.names.join(","));

/* 11. やり直しでまた 2 つ */
await page.keyboard.press("Control+Shift+z");
s = await state();
check("やり直しで戻る", s.objects === 2, s.names.join(","));

/* 12. 自動保存が IndexedDB に入る */
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

/* 13. 右のパネルが出て、プリミティブのパラメータが効く */
await page.mouse.click(EMPTY.x, EMPTY.y); // 選択解除
await page.keyboard.press("F8");
await page.mouse.click(ON_MESH.x, ON_MESH.y); // オブジェクトを選ぶ
const outliner = await page.evaluate(() => document.querySelectorAll("#dockRightBottom .olrow").length);
const sliders = await page.evaluate(() => document.querySelectorAll("#dockRightTop .slider").length);
check("アウトライナとオプションが出る", outliner >= 1 && sliders >= 1, `行 ${outliner} / スライダー ${sliders}`);

/* 14. 例外が出ていない */
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
