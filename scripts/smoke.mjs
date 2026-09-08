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

// 配信のベースを、ビルドされたものから読み取る。
// vite の base を変えても確認手順を書き換えずに済むようにするため。
const ENTRY = "index.html";
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

/* 21. 3 本指のピンチで選択を拡大縮小できる（マニピュレータを触らない） */
await page.keyboard.press("F8"); // オブジェクトモード
await page.waitForTimeout(500);
await page.mouse.click(ON_MESH.x, ON_MESH.y);
const pinch = await page.evaluate(async (center) => {
  const canvas = document.getElementById("gl");
  const app = window.macbeth;
  const before = app.state.selected.transform.scale.slice();
  const fire = (type, id, x, y) =>
    canvas.dispatchEvent(
      new PointerEvent(type, {
        pointerId: id,
        pointerType: "touch",
        isPrimary: id === 1,
        clientX: x,
        clientY: y,
        buttons: type === "pointerup" ? 0 : 1,
        bubbles: true,
        cancelable: true,
      }),
    );
  // 重心のまわりに 3 本置いて、外へ広げる
  const at = (k, r) => ({
    x: center.x + Math.cos((k / 3) * Math.PI * 2) * r,
    y: center.y + Math.sin((k / 3) * Math.PI * 2) * r,
  });
  for (let k = 0; k < 3; k++) {
    const p = at(k, 60);
    fire("pointerdown", k + 1, p.x, p.y);
  }
  for (let step = 1; step <= 10; step++) {
    const r = 60 + step * 6;
    for (let k = 0; k < 3; k++) {
      const p = at(k, r);
      fire("pointermove", k + 1, p.x, p.y);
    }
  }
  const during = app.state.selected.transform.scale.slice();
  for (let k = 0; k < 3; k++) {
    const p = at(k, 120);
    fire("pointerup", k + 1, p.x, p.y);
  }
  await new Promise((r) => setTimeout(r, 50));
  return { before, during, after: app.state.selected.transform.scale.slice() };
}, ON_MESH);
const grew = pinch.after[0] > pinch.before[0] * 1.2;
await page.keyboard.press("Control+z");
const undoneScale = await page.evaluate(() => window.macbeth.state.selected.transform.scale.slice());
check(
  "3 本指のピンチで選択を拡大できる",
  grew && Math.abs(undoneScale[0] - pinch.before[0]) < 1e-6,
  `${pinch.before[0].toFixed(2)} → ${pinch.after[0].toFixed(2)} → 取り消し ${undoneScale[0].toFixed(2)}`,
);

/* 21b. 面を選んだ状態でも 3 本指で拡大できる（要望の本体） */
await page.keyboard.press("F11");
await page.waitForTimeout(500);
await page.mouse.click(ON_MESH.x, ON_MESH.y);
const facePinch = await page.evaluate(async (center) => {
  const canvas = document.getElementById("gl");
  const app = window.macbeth;
  const comp = app.state.comp.size;
  const before = Array.from(app.state.selected.mesh.positions);
  const fire = (type, id, x, y) =>
    canvas.dispatchEvent(
      new PointerEvent(type, {
        pointerId: id,
        pointerType: "touch",
        isPrimary: id === 21,
        clientX: x,
        clientY: y,
        buttons: type === "pointerup" ? 0 : 1,
        bubbles: true,
        cancelable: true,
      }),
    );
  const at = (k, r) => ({
    x: center.x + Math.cos((k / 3) * Math.PI * 2) * r,
    y: center.y + Math.sin((k / 3) * Math.PI * 2) * r,
  });
  for (let k = 0; k < 3; k++) {
    const p = at(k, 50);
    fire("pointerdown", k + 21, p.x, p.y);
  }
  for (let step = 1; step <= 10; step++) {
    for (let k = 0; k < 3; k++) {
      const p = at(k, 50 + step * 7);
      fire("pointermove", k + 21, p.x, p.y);
    }
  }
  for (let k = 0; k < 3; k++) {
    const p = at(k, 120);
    fire("pointerup", k + 21, p.x, p.y);
  }
  await new Promise((r) => setTimeout(r, 50));
  const after = Array.from(app.state.selected.mesh.positions);
  let moved = 0;
  for (let i = 0; i < before.length; i++) if (Math.abs(before[i] - after[i]) > 1e-4) moved++;
  return { comp, moved, total: before.length / 3 };
}, ON_MESH);
await page.keyboard.press("Control+z");
check(
  "面を選んで 3 本指で拡大できる",
  facePinch.comp === 1 && facePinch.moved > 0,
  `選択 ${facePinch.comp} 面 / 動いた成分 ${facePinch.moved}`,
);

/* 21c. 3 本指の上下スワイプ = Y に沿った平行移動、左右 = X か Z */
await page.keyboard.press("F8");
await page.waitForTimeout(500);
await page.mouse.click(ON_MESH.x, ON_MESH.y);
const swipe = await page.evaluate(async (center) => {
  const canvas = document.getElementById("gl");
  const app = window.macbeth;
  const fire = (type, id, x, y) =>
    canvas.dispatchEvent(
      new PointerEvent(type, {
        pointerId: id,
        pointerType: "touch",
        isPrimary: id === 51,
        clientX: x,
        clientY: y,
        buttons: type === "pointerup" ? 0 : 1,
        bubbles: true,
        cancelable: true,
      }),
    );
  const at = (k, r) => ({
    x: center.x + Math.cos((k / 3) * Math.PI * 2) * r,
    y: center.y + Math.sin((k / 3) * Math.PI * 2) * r,
  });
  /** 3 本の間隔を変えずに、まとめて (dx, dy) だけ運ぶ。 */
  const drag = async (base, dx, dy) => {
    for (let k = 0; k < 3; k++) {
      const p = at(k, 60);
      fire("pointerdown", k + base, p.x, p.y);
    }
    for (let step = 1; step <= 12; step++) {
      for (let k = 0; k < 3; k++) {
        const p = at(k, 60);
        fire("pointermove", k + base, p.x + (dx * step) / 12, p.y + (dy * step) / 12);
      }
    }
    for (let k = 0; k < 3; k++) {
      const p = at(k, 60);
      fire("pointerup", k + base, p.x + dx, p.y + dy);
    }
    await new Promise((r) => setTimeout(r, 60));
  };

  const start = app.state.selected.transform.position.slice();
  const scale0 = app.state.selected.transform.scale[0];
  await drag(51, 0, -120); // 上へ
  const up = app.state.selected.transform.position.slice();
  const scaleAfterSwipe = app.state.selected.transform.scale[0];
  app.doUndo();

  await drag(61, 140, 0); // 右へ
  const right = app.state.selected.transform.position.slice();
  app.doUndo();
  return { start, up, right, scale0, scaleAfterSwipe };
}, ON_MESH);
const upDelta = swipe.up.map((v, i) => v - swipe.start[i]);
const rightDelta = swipe.right.map((v, i) => v - swipe.start[i]);
check(
  "3 本指の上下スワイプは Y、左右は X か Z に沿って動く",
  upDelta[1] > 0.2 &&
    Math.abs(upDelta[0]) < 1e-6 &&
    Math.abs(upDelta[2]) < 1e-6 &&
    Math.abs(swipe.scaleAfterSwipe - swipe.scale0) < 1e-6 &&
    Math.abs(rightDelta[1]) < 1e-6 &&
    (Math.abs(rightDelta[0]) > 0.2) !== (Math.abs(rightDelta[2]) > 0.2),
  `上 ${upDelta.map((n) => n.toFixed(2)).join(",")} / 右 ${rightDelta.map((n) => n.toFixed(2)).join(",")}`,
);

/* 21d. つまんでも選択の中心は動かない（基点は選択の中心） */
await page.keyboard.press("F11");
await page.waitForTimeout(500);
// 何も選んでいない状態の 1 回目はオブジェクトが選ばれるだけ。間を空けてもう一度
await page.mouse.click(ON_MESH.x, ON_MESH.y);
await page.waitForTimeout(500);
await page.mouse.click(ON_MESH.x, ON_MESH.y);
const pivotHeld = await page.evaluate(async (center) => {
  const canvas = document.getElementById("gl");
  const app = window.macbeth;
  const mesh = app.state.selected.mesh;
  /** 選んだ面の頂点の境界箱の中心（＝ピボット）と、その広がり。 */
  const measure = () => {
    const mn = [Infinity, Infinity, Infinity];
    const mx = [-Infinity, -Infinity, -Infinity];
    for (const f of app.state.comp) {
      for (const v of mesh.faceVerts(f)) {
        for (let k = 0; k < 3; k++) {
          const x = mesh.positions[v * 3 + k];
          if (x < mn[k]) mn[k] = x;
          if (x > mx[k]) mx[k] = x;
        }
      }
    }
    return {
      center: mn.map((v, k) => (v + mx[k]) / 2),
      size: Math.hypot(mx[0] - mn[0], mx[1] - mn[1], mx[2] - mn[2]),
    };
  };
  const before = measure();
  const fire = (type, id, x, y) =>
    canvas.dispatchEvent(
      new PointerEvent(type, {
        pointerId: id,
        pointerType: "touch",
        isPrimary: id === 61,
        clientX: x,
        clientY: y,
        buttons: type === "pointerup" ? 0 : 1,
        bubbles: true,
        cancelable: true,
      }),
    );
  // 中心をずらした所でつまむ。基点が指ではなく選択の中心であることを見る
  const at = (k, r) => ({
    x: center.x + 70 + Math.cos((k / 3) * Math.PI * 2) * r,
    y: center.y - 40 + Math.sin((k / 3) * Math.PI * 2) * r,
  });
  for (let k = 0; k < 3; k++) {
    const p = at(k, 50);
    fire("pointerdown", k + 61, p.x, p.y);
  }
  for (let step = 1; step <= 10; step++) {
    for (let k = 0; k < 3; k++) {
      const p = at(k, 50 + step * 7);
      fire("pointermove", k + 61, p.x, p.y);
    }
  }
  for (let k = 0; k < 3; k++) {
    const p = at(k, 120);
    fire("pointerup", k + 61, p.x, p.y);
  }
  await new Promise((r) => setTimeout(r, 60));
  const after = measure();
  return {
    before,
    after,
    comp: app.state.comp.size,
  };
}, ON_MESH);
await page.keyboard.press("Control+z");
check(
  "つまんでも選択の中心は動かない",
  pivotHeld.comp === 1 &&
    pivotHeld.after.size > pivotHeld.before.size * 1.1 &&
    pivotHeld.before.center.every((v, i) => Math.abs(v - pivotHeld.after.center[i]) < 1e-4),
  `中心 ${pivotHeld.before.center.map((n) => n.toFixed(3)).join(",")} → ` +
    `${pivotHeld.after.center.map((n) => n.toFixed(3)).join(",")} / 広がり ` +
    `${pivotHeld.before.size.toFixed(3)} → ${pivotHeld.after.size.toFixed(3)}`,
);

/* 22. 3 本指ダブルタップ（やり直す）は変形と排他 */
await page.keyboard.press("F8");
await page.waitForTimeout(500);
await page.mouse.click(ON_MESH.x, ON_MESH.y);
const exclusive = await page.evaluate(async (center) => {
  const canvas = document.getElementById("gl");
  const app = window.macbeth;
  const fire = (type, id, x, y) =>
    canvas.dispatchEvent(
      new PointerEvent(type, {
        pointerId: id,
        pointerType: "touch",
        isPrimary: id === 31,
        clientX: x,
        clientY: y,
        buttons: type === "pointerup" ? 0 : 1,
        bubbles: true,
        cancelable: true,
      }),
    );
  const at = (k, r) => ({
    x: center.x + Math.cos((k / 3) * Math.PI * 2) * r,
    y: center.y + Math.sin((k / 3) * Math.PI * 2) * r,
  });

  // まず 3 本指で拡大して、取り消す。やり直せる状態を作る
  const base = app.state.selected.transform.scale[0];
  for (let k = 0; k < 3; k++) {
    const p = at(k, 50);
    fire("pointerdown", k + 31, p.x, p.y);
  }
  for (let step = 1; step <= 10; step++) {
    for (let k = 0; k < 3; k++) {
      const p = at(k, 50 + step * 7);
      fire("pointermove", k + 31, p.x, p.y);
    }
  }
  for (let k = 0; k < 3; k++) fire("pointerup", k + 31, at(k, 120).x, at(k, 120).y);
  await new Promise((r) => setTimeout(r, 50));
  const scaled = app.state.selected.transform.scale[0];

  app.history.undo();
  const undone = app.state.selected.transform.scale[0];

  // 動かさずに 3 本指で 2 回叩く。変形ではなくやり直しになるはず
  for (let round = 0; round < 2; round++) {
    for (let k = 0; k < 3; k++) fire("pointerdown", k + 41, center.x + k * 30, center.y);
    for (let k = 0; k < 3; k++) fire("pointerup", k + 41, center.x + k * 30, center.y);
    await new Promise((r) => setTimeout(r, 60));
  }
  await new Promise((r) => setTimeout(r, 80));
  return { base, scaled, undone, redone: app.state.selected.transform.scale[0] };
}, ON_MESH);
check(
  "3 本指ダブルタップは変形にならず、やり直しになる",
  exclusive.scaled > exclusive.base * 1.2 &&
    Math.abs(exclusive.undone - exclusive.base) < 1e-6 &&
    Math.abs(exclusive.redone - exclusive.scaled) < 1e-6,
  `拡大 ${exclusive.scaled.toFixed(2)} → 取り消し ${exclusive.undone.toFixed(2)} → 3本指2回 ${exclusive.redone.toFixed(2)}`,
);
await page.keyboard.press("Control+z");

/* 23. ブリッジ（境界の 2 列を面で繋ぐ） */
const bridged = await page.evaluate(() => {
  const app = window.macbeth;
  // 触っていない立方体を 1 つ足して、そこで試す
  const objectsBefore = app.state.doc.objects.length;
  const object = app.state.doc.addObject("cube");
  app.viewport.syncAll();
  app.state.select(object);
  app.setCompMode("face");

  // 上面と下面を落として、縁を 2 つ作る
  app.state.comp.clear();
  for (let f = 0; f < object.mesh.faceCount; f++) {
    const c = object.mesh.faceCenter(f);
    if (Math.abs(Math.abs(c[1]) - 0.5) < 1e-6) app.state.comp.add(f);
  }
  const holes = app.state.comp.size;
  app.doDeleteFaces();
  const opened = object.mesh.faceCount;

  // 境界を選んでブリッジ
  app.setCompMode("edge");
  app.selectBoundary();
  const picked = app.state.comp.size;
  app.doBridge();
  const after = object.mesh.faceCount;

  app.history.undo(); // ブリッジ
  const undone = object.mesh.faceCount;
  app.history.undo(); // 面の削除

  // 後始末。足した立方体を外す（履歴の巻き戻しでは戻らない）
  app.state.select(null);
  app.state.doc.objects.length = objectsBefore;
  app.viewport.syncAll();
  return { holes, opened, picked, after, undone, objectsBefore, objects: app.state.doc.objects.length };
});
check(
  "境界の 2 列をブリッジできる",
  bridged.holes === 2 &&
    bridged.opened === 4 &&
    bridged.picked === 8 &&
    bridged.after === 8 &&
    bridged.undone === 4 &&
    bridged.objects === bridged.objectsBefore,
  `選択 ${bridged.picked} エッジ / ${bridged.opened} → ${bridged.after}面 → 取り消し ${bridged.undone}面`,
);

/* 24. 指 2 本の長押しでカメラメニュー、選択があれば編集メニュー */
await page.keyboard.press("F8");
await page.waitForTimeout(500);
await page.mouse.click(EMPTY.x, EMPTY.y); // 選択を解除
const camMenu = await page.evaluate(async (center) => {
  const canvas = document.getElementById("gl");
  const app = window.macbeth;
  const fire = (type, id, x, y) =>
    canvas.dispatchEvent(
      new PointerEvent(type, {
        pointerId: id,
        pointerType: "touch",
        isPrimary: id === 71,
        clientX: x,
        clientY: y,
        buttons: type === "pointerup" ? 0 : 1,
        bubbles: true,
        cancelable: true,
      }),
    );
  const wait = (ms) => new Promise((r) => setTimeout(r, ms));

  // 2 本置いて、動かさずに 400ms 待つ
  fire("pointerdown", 71, center.x - 40, center.y);
  fire("pointerdown", 72, center.x + 40, center.y);
  await wait(520);
  const labels = [...document.querySelectorAll(".radial text")].map((t) => t.textContent);
  const opened = labels.length > 0;
  const selected = app.state.selected;

  // 西（上ビュー）へ運んで離す。輪の中心は 2 本の真ん中
  const cx = center.x;
  const cy = center.y;
  window.dispatchEvent(new PointerEvent("pointermove", { clientX: cx - 90, clientY: cy, bubbles: true }));
  await wait(20);
  window.dispatchEvent(new PointerEvent("pointerup", { clientX: cx - 90, clientY: cy, bubbles: true }));
  fire("pointerup", 71, center.x - 40, center.y);
  fire("pointerup", 72, center.x + 40, center.y);
  await wait(60);
  return {
    opened,
    labels,
    hadSelection: !!selected,
    ortho: app.state.camOpts.ortho,
    viewName: app.state.viewName,
  };
}, ON_MESH);
check(
  "指 2 本の長押しでカメラメニューが出て、上ビューに切り替わる",
  camMenu.opened &&
    !camMenu.hadSelection &&
    camMenu.labels.includes("パース") &&
    camMenu.labels.includes("新規カメラ") &&
    camMenu.ortho === true &&
    camMenu.viewName === "上",
  `${camMenu.labels.filter((t) => t.length > 1).slice(0, 4).join(" / ")} → ${camMenu.viewName}`,
);

/* 24b. 選択があるときは編集メニューになる */
await page.keyboard.press("F11");
await page.waitForTimeout(500);
await page.mouse.click(ON_MESH.x, ON_MESH.y);
const editMenu = await page.evaluate(async (center) => {
  const canvas = document.getElementById("gl");
  const app = window.macbeth;
  const fire = (type, id, x, y) =>
    canvas.dispatchEvent(
      new PointerEvent(type, {
        pointerId: id,
        pointerType: "touch",
        isPrimary: id === 81,
        clientX: x,
        clientY: y,
        buttons: type === "pointerup" ? 0 : 1,
        bubbles: true,
        cancelable: true,
      }),
    );
  const wait = (ms) => new Promise((r) => setTimeout(r, ms));
  const hadSelection = !!app.state.selected;
  fire("pointerdown", 81, center.x - 40, center.y);
  fire("pointerdown", 82, center.x + 40, center.y);
  await wait(520);
  const labels = [...document.querySelectorAll(".radial text")].map((t) => t.textContent);
  // 中心で離してキャンセル
  window.dispatchEvent(new PointerEvent("pointerup", { clientX: center.x, clientY: center.y, bubbles: true }));
  fire("pointerup", 81, center.x - 40, center.y);
  fire("pointerup", 82, center.x + 40, center.y);
  await wait(60);
  return { hadSelection, labels, faces: app.state.selected?.mesh.faceCount ?? 0 };
}, ON_MESH);
check(
  "選択があるときは指 2 本の長押しで編集メニュー",
  editMenu.hadSelection && editMenu.labels.includes("押し出し") && editMenu.labels.includes("ブリッジ"),
  editMenu.labels.filter((t) => t.length > 1).slice(0, 4).join(" / "),
);

/* 24b2. 新規カメラを控えて、一覧から呼び戻せる */
await page.keyboard.press("F8");
await page.waitForTimeout(500);
await page.mouse.click(EMPTY.x, EMPTY.y);
const savedCam = await page.evaluate(async (center) => {
  const canvas = document.getElementById("gl");
  const app = window.macbeth;
  const fire = (type, id, x, y) =>
    canvas.dispatchEvent(
      new PointerEvent(type, {
        pointerId: id,
        pointerType: "touch",
        isPrimary: id === 101,
        clientX: x,
        clientY: y,
        buttons: type === "pointerup" ? 0 : 1,
        bubbles: true,
        cancelable: true,
      }),
    );
  const wait = (ms) => new Promise((r) => setTimeout(r, ms));

  // 今の視点（上ビューのまま）を控える
  app.setView("front");
  app.addCamera();
  const names = app.state.cameras.map((c) => c.name);
  // 別のビューへ移してから、一覧で呼び戻す
  app.setView("top");
  const moved = app.state.viewName;

  fire("pointerdown", 101, center.x - 40, center.y);
  fire("pointerdown", 102, center.x + 40, center.y);
  await wait(520);
  const rows = [...document.querySelectorAll(".radial rect")];
  const box = rows[0]?.getBoundingClientRect();
  const listed = rows.length;
  if (box) {
    const rx = box.x + box.width / 2;
    const ry = box.y + box.height / 2;
    window.dispatchEvent(new PointerEvent("pointermove", { clientX: rx, clientY: ry, bubbles: true }));
    await wait(20);
    window.dispatchEvent(new PointerEvent("pointerup", { clientX: rx, clientY: ry, bubbles: true }));
  }
  fire("pointerup", 101, center.x - 40, center.y);
  fire("pointerup", 102, center.x + 40, center.y);
  await wait(60);
  return { names, listed, moved, back: app.state.viewName, ortho: app.state.camOpts.ortho };
}, ON_MESH);
check(
  "新規カメラを控えて一覧から呼び戻せる",
  savedCam.names.length === 1 &&
    savedCam.names[0] === "camera1" &&
    savedCam.listed === 1 &&
    savedCam.moved === "上" &&
    savedCam.back === "camera1",
  `${savedCam.names.join(",")} / 一覧 ${savedCam.listed} 行 / ${savedCam.moved} → ${savedCam.back}`,
);

/* 24c. 動かしてしまったら長押しにしない（カメラ操作と排他） */
const noMenu = await page.evaluate(async (center) => {
  const canvas = document.getElementById("gl");
  const fire = (type, id, x, y) =>
    canvas.dispatchEvent(
      new PointerEvent(type, {
        pointerId: id,
        pointerType: "touch",
        isPrimary: id === 91,
        clientX: x,
        clientY: y,
        buttons: type === "pointerup" ? 0 : 1,
        bubbles: true,
        cancelable: true,
      }),
    );
  const wait = (ms) => new Promise((r) => setTimeout(r, ms));
  fire("pointerdown", 91, center.x - 40, center.y);
  fire("pointerdown", 92, center.x + 40, center.y);
  // つまむ（カメラのズーム）。長押しの時間は過ぎても輪は出ないはず
  for (let step = 1; step <= 8; step++) {
    fire("pointermove", 91, center.x - 40 - step * 5, center.y);
    fire("pointermove", 92, center.x + 40 + step * 5, center.y);
  }
  await wait(520);
  const opened = document.querySelectorAll(".radial").length;
  fire("pointerup", 91, center.x - 80, center.y);
  fire("pointerup", 92, center.x + 80, center.y);
  await wait(40);
  return opened;
}, ON_MESH);
check("つまんだときは長押しメニューを出さない", noMenu === 0, `輪 ${noMenu} 個`);

/* 24d. 指 3 本の長押しは、選択があってもカメラ */
await page.keyboard.press("F11");
await page.waitForTimeout(500);
await page.mouse.click(ON_MESH.x, ON_MESH.y);
await page.waitForTimeout(500);
await page.mouse.click(ON_MESH.x, ON_MESH.y);
const camHold = await page.evaluate(async (center) => {
  const canvas = document.getElementById("gl");
  const app = window.macbeth;
  const fire = (type, id, x, y) =>
    canvas.dispatchEvent(
      new PointerEvent(type, {
        pointerId: id,
        pointerType: "touch",
        isPrimary: id === 111,
        clientX: x,
        clientY: y,
        buttons: type === "pointerup" ? 0 : 1,
        bubbles: true,
        cancelable: true,
      }),
    );
  const wait = (ms) => new Promise((r) => setTimeout(r, ms));
  const at = (k, r) => ({
    x: center.x + Math.cos((k / 3) * Math.PI * 2) * r,
    y: center.y + Math.sin((k / 3) * Math.PI * 2) * r,
  });
  const comp = app.state.comp.size;
  const start = app.state.selected.mesh.positions.slice();

  for (let k = 0; k < 3; k++) {
    const p = at(k, 55);
    fire("pointerdown", k + 111, p.x, p.y);
  }
  await wait(520);
  const labels = [...document.querySelectorAll(".radial text")].map((t) => t.textContent);
  // 南（前ビュー）へ運んで離す
  window.dispatchEvent(
    new PointerEvent("pointermove", { clientX: center.x, clientY: center.y + 100, bubbles: true }),
  );
  await wait(20);
  window.dispatchEvent(
    new PointerEvent("pointerup", { clientX: center.x, clientY: center.y + 100, bubbles: true }),
  );
  for (let k = 0; k < 3; k++) {
    const p = at(k, 55);
    fire("pointerup", k + 111, p.x, p.y);
  }
  await wait(60);
  let moved = 0;
  const now = app.state.selected.mesh.positions;
  for (let i = 0; i < start.length; i++) if (Math.abs(start[i] - now[i]) > 1e-5) moved++;
  return { comp, labels, moved, viewName: app.state.viewName };
}, ON_MESH);
check(
  "指 3 本の長押しは選択があってもカメラ",
  camHold.comp === 1 &&
    camHold.labels.includes("パース") &&
    camHold.viewName === "前" &&
    camHold.moved === 0,
  `選択 ${camHold.comp} / ${camHold.viewName} / 動いた成分 ${camHold.moved}`,
);
await page.evaluate(() => window.macbeth.setView("persp"));

/* 25. 頂点の操作（距離マージ・削除・押し出し） */
const vertexOps = await page.evaluate(() => {
  const app = window.macbeth;
  const objectsBefore = app.state.doc.objects.length;
  const object = app.state.doc.addObject("cube");
  app.viewport.syncAll();
  app.state.select(object);
  app.setCompMode("vertex");

  // 押し出し: 角 1 つを尖らせる
  app.state.comp.clear();
  app.state.comp.add(0);
  const before = { verts: object.mesh.vertexCount, faces: object.mesh.faceCount };
  app.doExtrudeVertices();
  const spike = { verts: object.mesh.vertexCount, faces: object.mesh.faceCount };
  app.history.undo();

  // 削除: 角 1 つを消して、まわりの 3 枚を 1 枚にする
  app.state.comp.clear();
  app.state.comp.add(0);
  app.doDissolveVertices();
  const dissolved = { verts: object.mesh.vertexCount, faces: object.mesh.faceCount };
  app.history.undo();

  // 距離マージ: 頂点 1 を頂点 0 のすぐ隣へ寄せてからまとめる
  const p = object.mesh.getPosition(0);
  object.mesh.setPosition(1, p[0] + 0.01, p[1], p[2]);
  app.state.vertexOpts.mergeDist = 0.05;
  app.state.comp.clear();
  app.doMergeByDistance();
  const merged = object.mesh.vertexCount;
  app.history.undo();

  // 後始末。足した立方体を外す（履歴の巻き戻しでは戻らない）
  app.state.select(null);
  app.state.doc.objects.length = objectsBefore;
  app.viewport.syncAll();

  return { before, spike, dissolved, merged, objectsBefore, objects: app.state.doc.objects.length };
});
check(
  "頂点を尖らせる / 消す / 距離でまとめる",
  vertexOps.before.verts === 8 &&
    vertexOps.spike.verts === 12 &&
    vertexOps.spike.faces === 9 &&
    vertexOps.dissolved.verts === 7 &&
    vertexOps.dissolved.faces === 4 &&
    vertexOps.merged === 7 &&
    vertexOps.objects === vertexOps.objectsBefore,
  `押し出し ${vertexOps.before.verts}→${vertexOps.spike.verts}点 ${vertexOps.spike.faces}面 / ` +
    `削除 ${vertexOps.dissolved.verts}点 ${vertexOps.dissolved.faces}面 / マージ ${vertexOps.merged}点 / ` +
    `オブジェクト ${vertexOps.objectsBefore} → ${vertexOps.objects}`,
);

/* 26. 接続（頂点どうし / エッジの中点どうし） */
const connect = await page.evaluate(() => {
  const app = window.macbeth;
  const objectsBefore = app.state.doc.objects.length;
  const object = app.state.doc.addObject("cube");
  app.viewport.syncAll();
  app.state.select(object);

  // 頂点: 面 0 の対角を結ぶ
  app.setCompMode("vertex");
  const verts = object.mesh.faceVerts(0);
  app.state.comp.clear();
  app.state.comp.add(verts[0]);
  app.state.comp.add(verts[2]);
  const beforeFaces = object.mesh.faceCount;
  app.doConnectVertices();
  const afterVerts = { faces: object.mesh.faceCount, points: object.mesh.vertexCount };
  app.doUndo();

  // エッジ: 面 0 の向かい合う 2 辺の中点を結ぶ
  app.setCompMode("edge");
  const view = app.viewport.viewOf(object);
  const want = [
    `${Math.min(verts[0], verts[1])}_${Math.max(verts[0], verts[1])}`,
    `${Math.min(verts[2], verts[3])}_${Math.max(verts[2], verts[3])}`,
  ];
  app.state.comp.clear();
  view.edges.forEach(([a, b], i) => {
    if (want.includes(`${Math.min(a, b)}_${Math.max(a, b)}`)) app.state.comp.add(i);
  });
  const picked = app.state.comp.size;
  app.doConnectEdges();
  const afterEdges = { faces: object.mesh.faceCount, points: object.mesh.vertexCount };
  app.doUndo();

  app.state.select(null);
  app.state.doc.objects.length = objectsBefore;
  app.viewport.syncAll();
  return { beforeFaces, afterVerts, picked, afterEdges };
});
check(
  "頂点どうし / エッジの中点どうしを接続できる",
  connect.beforeFaces === 6 &&
    connect.afterVerts.faces === 7 &&
    connect.afterVerts.points === 8 &&
    connect.picked === 2 &&
    connect.afterEdges.faces === 7 &&
    connect.afterEdges.points === 10,
  `頂点 ${connect.beforeFaces}→${connect.afterVerts.faces}面 / ` +
    `エッジ ${connect.picked}本 → ${connect.afterEdges.faces}面 ${connect.afterEdges.points}点`,
);

/* 27. スナップ（グリッド / 頂点） */
await page.keyboard.press("F8");
await page.waitForTimeout(500);
await page.mouse.click(ON_MESH.x, ON_MESH.y);
const snap = await page.evaluate(async () => {
  const app = window.macbeth;
  const object = app.state.selected;
  const start = object.transform.position.slice();

  /** マニピュレータの中心をつかんで運ぶ。 */
  const dragCenter = async (dx, dy) => {
    const canvas = document.getElementById("gl");
    const pivot = app.pivotWorld();
    const at = app.manipulator.toScreen(pivot);
    const rect = canvas.getBoundingClientRect();
    const from = { x: rect.x + at.x, y: rect.y + at.y };
    const fire = (type, x, y) =>
      canvas.dispatchEvent(
        new PointerEvent(type, {
          pointerId: 7,
          pointerType: "mouse",
          isPrimary: true,
          clientX: x,
          clientY: y,
          buttons: type === "pointerup" ? 0 : 1,
          bubbles: true,
          cancelable: true,
        }),
      );
    fire("pointerdown", from.x, from.y);
    for (let i = 1; i <= 10; i++) fire("pointermove", from.x + (dx * i) / 10, from.y + (dy * i) / 10);
    fire("pointerup", from.x + dx, from.y + dy);
    await new Promise((r) => setTimeout(r, 30));
  };

  // スナップ無しで運ぶ。刻みには乗らないはず
  await dragCenter(220, 0);
  const free = object.transform.position.slice();
  app.doUndo();

  // グリッドスナップ（刻み 0.5）を効かせて同じ距離だけ運ぶ
  app.state.snap.kind = "grid";
  app.state.snap.step = 0.5;
  app.state.snapKeyHeld = true;
  await dragCenter(220, 0);
  const grid = object.transform.position.slice();
  app.state.snapKeyHeld = false;
  app.doUndo();

  return { start, free, grid };
});
const onGrid = snap.grid.every((v) => Math.abs(v / 0.5 - Math.round(v / 0.5)) < 1e-6);
const offGrid = snap.free.some((v) => Math.abs(v / 0.5 - Math.round(v / 0.5)) > 1e-6);
check(
  "グリッドスナップで刻みに乗る",
  offGrid && onGrid && Math.abs(snap.grid[0] - snap.start[0]) > 0.4,
  `素 ${snap.free.map((n) => n.toFixed(3)).join(",")} → 刻み ${snap.grid.map((n) => n.toFixed(2)).join(",")}`,
);

/* 27b. 頂点スナップ: 別のオブジェクトの頂点にぴたりと乗る */
const vertexSnap = await page.evaluate(async () => {
  const app = window.macbeth;
  const objectsBefore = app.state.doc.objects.length;
  // 離れた所に的の立方体を置く
  const target = app.state.doc.addObject("cube");
  target.transform = { ...target.transform, position: [2.4, 0.7, 0] };
  const mover = app.state.doc.addObject("cube");
  app.viewport.syncAll();
  app.state.select(mover);
  app.setCompMode("object");

  // マニピュレータの中心を的の方向へ運ぶ
  const canvas = document.getElementById("gl");
  const rect = canvas.getBoundingClientRect();
  const at = app.manipulator.toScreen(app.pivotWorld());
  const fire = (type, x, y) =>
    canvas.dispatchEvent(
      new PointerEvent(type, {
        pointerId: 9,
        pointerType: "mouse",
        isPrimary: true,
        clientX: x,
        clientY: y,
        buttons: type === "pointerup" ? 0 : 1,
        bubbles: true,
        cancelable: true,
      }),
    );
  // 的の頂点 0 の画面位置まで運ぶ。そこまで来れば寄せ先が決まる
  const tm = target.mesh;
  // three の Vector3 が要るので、既にあるものを借りて置き換える
  const goalWorld = app.pivotWorld().clone();
  goalWorld.set(
    tm.positions[0] + target.transform.position[0],
    tm.positions[1] + target.transform.position[1],
    tm.positions[2] + target.transform.position[2],
  );
  const goal = app.manipulator.toScreen(goalWorld);
  const dx = goal.x - at.x;
  const dy = goal.y - at.y;
  app.state.snap.kind = "vertex";
  app.state.snapKeyHeld = true;
  fire("pointerdown", rect.x + at.x, rect.y + at.y);
  for (let i = 1; i <= 12; i++) fire("pointermove", rect.x + at.x + (dx * i) / 12, rect.y + at.y + (dy * i) / 12);
  fire("pointerup", rect.x + at.x + dx, rect.y + at.y + dy);
  await new Promise((r) => setTimeout(r, 40));
  app.state.snapKeyHeld = false;
  const landed = mover.transform.position.slice();

  // 的の頂点のワールド座標を集めて、その中に一致するものがあるか
  const view = app.viewport.viewOf(target);
  view.group.updateMatrixWorld();
  let hit = false;
  const m = target.mesh;
  for (let v = 0; v < m.vertexCount && !hit; v++) {
    const p = [m.positions[v * 3], m.positions[v * 3 + 1], m.positions[v * 3 + 2]];
    const w = [
      p[0] + target.transform.position[0],
      p[1] + target.transform.position[1],
      p[2] + target.transform.position[2],
    ];
    hit = w.every((c, i) => Math.abs(c - landed[i]) < 1e-4);
  }

  app.doUndo();
  app.state.select(null);
  app.state.doc.objects.length = objectsBefore;
  app.viewport.syncAll();
  return { landed, hit, objects: app.state.doc.objects.length, objectsBefore };
});
check(
  "頂点スナップで別オブジェクトの頂点に乗る",
  vertexSnap.hit && vertexSnap.objects === vertexSnap.objectsBefore,
  `着地 ${vertexSnap.landed.map((n) => n.toFixed(2)).join(",")}`,
);

/* 28. まとまりの操作（複製 / 抽出 / 結合 / 分離 / ミラー） */
const groupOps = await page.evaluate(() => {
  const app = window.macbeth;
  const objectsBefore = app.state.doc.objects.length;
  const object = app.state.doc.addObject("cube");
  app.viewport.syncAll();
  app.state.select(object);

  // 面の複製: 写しが選ばれた状態で残る
  app.setCompMode("face");
  app.state.comp.clear();
  app.state.comp.add(0);
  app.doDuplicateFaces();
  const dup = { faces: object.mesh.faceCount, comp: app.state.comp.size };
  app.doUndo();

  // 面の抽出: 別オブジェクトになる
  app.setCompMode("face");
  app.state.comp.clear();
  app.state.comp.add(0);
  app.state.comp.add(1);
  const countBefore = app.state.doc.objects.length;
  app.doExtractFaces();
  const extract = {
    objects: app.state.doc.objects.length - countBefore,
    left: object.mesh.faceCount,
    taken: app.state.selected.mesh.faceCount,
  };
  app.doUndo();

  // ミラー: X で折り返す
  app.state.select(object);
  app.setCompMode("object");
  app.state.mirrorAxis = 0;
  const beforeMirror = object.mesh.faceCount;
  app.doMirror();
  const mirror = object.mesh.faceCount;
  app.doUndo();

  // 結合 → 分離: 2 つを 1 つにして、また 2 つに戻す
  const other = app.state.doc.addObject("cube");
  other.transform = { ...other.transform, position: [3, 0, 0] };
  app.viewport.syncAll();
  app.state.select(object);
  app.state.addObject(other);
  const picked = app.state.selectedObjects().length;
  app.doCombine();
  const combined = {
    objects: app.state.doc.objects.length,
    faces: app.state.selected.mesh.faceCount,
  };
  app.doSeparate();
  const separated = app.state.doc.objects.length;

  // 数値入力
  const target = app.state.selected;
  app.panelHost().onTransformInput(target, "position", 1, 1.25);
  const typed = target.transform.position[1];

  app.state.select(null);
  app.state.doc.objects.length = objectsBefore;
  app.viewport.syncAll();
  return { dup, extract, beforeMirror, mirror, picked, combined, separated, typed, objectsBefore };
});
check(
  "複製 / 抽出 / ミラー / 結合 / 分離 / 数値入力",
  groupOps.dup.faces === 7 &&
    groupOps.dup.comp === 1 &&
    groupOps.extract.objects === 1 &&
    groupOps.extract.left === 4 &&
    groupOps.extract.taken === 2 &&
    groupOps.mirror === groupOps.beforeMirror * 2 &&
    groupOps.picked === 2 &&
    groupOps.combined.faces === 12 &&
    groupOps.separated === groupOps.combined.objects + 1 &&
    Math.abs(groupOps.typed - 1.25) < 1e-6,
  `複製 ${groupOps.dup.faces}面 / 抽出 ${groupOps.extract.left}+${groupOps.extract.taken} / ` +
    `ミラー ${groupOps.beforeMirror}→${groupOps.mirror}面 / 結合 ${groupOps.combined.faces}面 → 分離 / Y=${groupOps.typed}`,
);

/* 29. 例外が出ていない */
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
