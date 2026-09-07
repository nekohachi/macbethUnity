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

/* 3. 何も選んでいない状態から 1 タップで面が選べる（Maya と同じ手数） */
await page.keyboard.press("F11");
await page.mouse.click(ON_MESH.x, ON_MESH.y);
s = await state();
check("1 タップでフェースを選択", s.compMode === "face" && s.comp === 1, `comp=${s.comp}`);

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

/* 7b. 選択の拡張と縮小 */
await page.keyboard.press("Control+z");
await page.waitForTimeout(500);
await page.mouse.click(ON_MESH.x, ON_MESH.y);
const g0 = await page.evaluate(() => window.macbeth.state.comp.size);
await page.keyboard.press(">");
const g1 = await page.evaluate(() => window.macbeth.state.comp.size);
await page.keyboard.press("<");
const g2 = await page.evaluate(() => window.macbeth.state.comp.size);
check("選択を拡張 / 縮小できる", g1 > g0 && g2 < g1, `${g0} → ${g1} → ${g2}`);

/* 7c. 取り消しても選択が残る */
await page.keyboard.press("F11");
await page.waitForTimeout(500);
await page.mouse.click(ON_MESH.x, ON_MESH.y);
const keptBefore = await page.evaluate(() => window.macbeth.state.comp.size);
// 追加前の状態を積んでから足し、戻す。戻したあとオブジェクト数も元どおりになる
await page.evaluate(() => window.macbeth.history.push("テスト用"));
await page.evaluate(() => window.macbeth.state.doc.addObject("plane"));
await page.keyboard.press("Control+z");
const keptAfter = await page.evaluate(() => ({
  comp: window.macbeth.state.comp.size,
  mode: window.macbeth.state.compMode,
}));
const objectsAfter = await page.evaluate(() => window.macbeth.state.doc.objects.length);
check(
  "取り消しても選択が残る",
  keptAfter.comp === keptBefore && keptAfter.mode === "face" && objectsAfter === 1,
  `${keptBefore} → ${keptAfter.comp} (${keptAfter.mode}) / オブジェクト ${objectsAfter}`,
);

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

/* 14. 編集メニューの操作が効く（面の押し出しと削除） */
await page.keyboard.press("F11");
await page.mouse.click(ON_MESH.x, ON_MESH.y);
await page.waitForTimeout(450);
const f0 = await page.evaluate(() => window.macbeth.state.selected.mesh.faceCount);
// Shift + 右クリックで編集メニュー → 北（押し出し）
await page.mouse.move(ON_MESH.x, ON_MESH.y);
await page.keyboard.down("Shift");
await page.mouse.down({ button: "right" });
await page.mouse.move(ON_MESH.x, ON_MESH.y - 90, { steps: 5 });
await page.mouse.up({ button: "right" });
await page.keyboard.up("Shift");
const f1 = await page.evaluate(() => window.macbeth.state.selected.mesh.faceCount);
check("編集メニューから押し出せる", f1 > f0, `${f0} → ${f1}面`);

/* 15. シェーディングを切り替えられる */
await page.keyboard.press("4");
const wire = await page.evaluate(() => window.macbeth.state.display);
await page.keyboard.press("6");
const back = await page.evaluate(() => window.macbeth.state.display);
check("シェーディングを切り替えられる", wire === "wire" && back === "shadedWire", `${wire} → ${back}`);

/* 16. パネルをドラッグして置き場所を変えられる */
const headBox = await page.evaluate(() => {
  const h = document.querySelector('.panel[data-panel="outliner"] .phead');
  const r = h.getBoundingClientRect();
  return { x: r.x + r.width / 2, y: r.y + r.height / 2 };
});
await page.mouse.move(headBox.x, headBox.y);
await page.mouse.down();
// 左の落とし場所へ運ぶ
const stage = await page.evaluate(() => {
  const r = document.getElementById("stage").getBoundingClientRect();
  return { x: r.x, y: r.y, h: r.height };
});
await page.mouse.move(stage.x + 150, stage.y + stage.h / 2, { steps: 10 });
await page.mouse.up();
const dockedLeft = await page.evaluate(
  () => !!document.querySelector('#dockLeft .panel[data-panel="outliner"]'),
);
check("パネルを別の場所へドッキングできる", dockedLeft);

/* 17. モードを切り替えると予定表が出て、戻すとキャンバスが戻る */
await page.evaluate(() => window.macbeth.setMode("uv"));
const inUv = await page.evaluate(() => ({
  stub: !document.getElementById("modeStub").hidden,
  stage: document.getElementById("stage").hidden,
  label: document.getElementById("modeLabel").textContent,
  tools: document.querySelectorAll("#dockLeft .ibtn").length,
  gauge: document.getElementById("g1lbl").textContent,
}));
await page.evaluate(() => window.macbeth.setMode("model"));
const backToModel = await page.evaluate(() => ({
  stub: !document.getElementById("modeStub").hidden,
  stage: document.getElementById("stage").hidden,
  tools: document.querySelectorAll("#dockLeft .ibtn").length,
}));
check(
  "モードを切り替えられる",
  inUv.stub && inUv.stage && inUv.label === "UV" && inUv.tools === 0 &&
    !backToModel.stub && !backToModel.stage && backToModel.tools > 0,
  `UV: 予定表 ${inUv.stub} / ツール ${inUv.tools} / ゲージ「${inUv.gauge}」→ モデリング: ツール ${backToModel.tools}`,
);

/* 18. 縦持ちで右のドックがビューポートの下に来る */
await page.setViewportSize({ width: 744, height: 1133 }); // iPad mini の縦
await page.waitForTimeout(200);
const portrait = await page.evaluate(() => {
  const stage = document.getElementById("stage");
  const vp = document.getElementById("vp").getBoundingClientRect();
  const dock = document.getElementById("dockColRight").getBoundingClientRect();
  return {
    klass: stage.classList.contains("portrait"),
    below: dock.top >= vp.bottom - 2,
    vpRatio: vp.height / stage.getBoundingClientRect().height,
    canvas: document.getElementById("gl").width > 0,
  };
});
await page.setViewportSize({ width: 1280, height: 800 });
await page.waitForTimeout(200);
const backLandscape = await page.evaluate(() => !document.getElementById("stage").classList.contains("portrait"));
check(
  "縦持ちで右のドックが下に来る",
  portrait.klass && portrait.below && portrait.vpRatio >= 0.55 && portrait.canvas && backLandscape,
  `下に配置 ${portrait.below} / ビューポート ${Math.round(portrait.vpRatio * 100)}%`,
);

/* 19. ベベル: エッジを選んで左右にドラッグすると面が増える */
await page.setViewportSize({ width: 1280, height: 800 });
await page.waitForTimeout(200);
await page.keyboard.press("F10"); // エッジモード
await page.waitForTimeout(500);
await page.mouse.click(ON_MESH.x, ON_MESH.y); // 手前の面のどこかのエッジ
const bevelReady = await page.evaluate(() => window.macbeth.state.comp.size);
await page.click("#dockLeft .ibtn[title^='ベベル']");
const bf0 = await page.evaluate(() => window.macbeth.state.selected.mesh.faceCount);
await page.mouse.move(ON_MESH.x, ON_MESH.y);
await page.mouse.down();
await page.mouse.move(ON_MESH.x + 60, ON_MESH.y, { steps: 6 });
await page.mouse.up();
const bf1 = await page.evaluate(() => window.macbeth.state.selected.mesh.faceCount);
// オプションのセグメントを増やすとかけ直される
const bf2 = await page.evaluate(() => {
  window.macbeth.state.bevel.segments = 3;
  const sliders = document.querySelectorAll("#dockRightTop .slider");
  return sliders.length;
});
await page.keyboard.press("Control+z");
const bf3 = await page.evaluate(() => window.macbeth.state.selected.mesh.faceCount);
await page.click("#dockLeft .ibtn[title^='選択・変形']");
check(
  "ベベルできる",
  bevelReady >= 1 && bf1 > bf0 && bf3 === bf0,
  `選択 ${bevelReady} / ${bf0} → ${bf1}面 → 取り消し ${bf3}面 / スライダー ${bf2}`,
);

/* 20. ターゲットウェルド: 頂点を隣の頂点まで運ぶと溶接される */
await page.keyboard.press("F9"); // 頂点モード
await page.waitForTimeout(500);
const weld = await page.evaluate(() => {
  const app = window.macbeth;
  const o = app.state.selected;
  app.state.comp.clear();
  app.state.comp.add(0);
  app.refresh();
  return { verts: o.mesh.vertexCount };
});
// 頂点 0 の画面位置から、頂点 1 の画面位置へ運ぶ
const path = await page.evaluate(() => {
  const app = window.macbeth;
  const o = app.state.selected;
  const r = document.getElementById("gl").getBoundingClientRect();
  const cam = app.viewportForTest ? null : null;
  void cam;
  return { rect: { x: r.x, y: r.y } };
});
void path;
const screenOf = (i) =>
  page.evaluate((idx) => {
    const app = window.macbeth;
    const s = app.screenOfVertex(idx);
    const r = document.getElementById("gl").getBoundingClientRect();
    return s ? { x: r.x + s.x, y: r.y + s.y } : null;
  }, i);
const from = await screenOf(0);
const to = await screenOf(1);
let weldOk = false;
if (from && to) {
  await page.mouse.move(from.x, from.y);
  await page.mouse.down();
  await page.mouse.move(to.x, to.y, { steps: 10 });
  await page.mouse.up();
  const after = await page.evaluate(() => window.macbeth.state.selected.mesh.vertexCount);
  weldOk = after === weld.verts - 1;
  await page.keyboard.press("Control+z");
}
check("ターゲットウェルドできる", weldOk, `頂点 ${weld.verts} → ${weldOk ? weld.verts - 1 : "変化なし"}`);

/* 21. 例外が出ていない */
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
