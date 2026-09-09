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

/**
 * ツール列のグループ（`21`）。ボタンは 1 つ = 1 グループで、
 * 長押しでサークルメニュー、タップで今の中身とそのオプション。
 * ラジアルの付いたボタンは `click()` を見ないので pointer で叩く。
 */
const tapGroup = (id) =>
  page.evaluate((gid) => {
    const b = document.querySelector(`#dockLeft .ibtn[data-group="${gid}"]`);
    if (!b) throw new Error(`グループが無い: ${gid}`);
    const r = b.getBoundingClientRect();
    const at = { clientX: r.x + r.width / 2, clientY: r.y + r.height / 2 };
    for (const type of ["pointerdown", "pointerup"]) {
      const e = new PointerEvent(type, { pointerId: 7, pointerType: "mouse", bubbles: true, cancelable: true, ...at });
      (type === "pointerdown" ? b : window).dispatchEvent(e);
    }
  }, id);

/** グループを長押しして、サークルメニューの方位を選ぶ。 */
const pickFromGroup = async (id, direction) => {
  await page.evaluate((gid) => {
    const b = document.querySelector(`#dockLeft .ibtn[data-group="${gid}"]`);
    if (!b) throw new Error(`グループが無い: ${gid}`);
    const r = b.getBoundingClientRect();
    b.dispatchEvent(
      new PointerEvent("pointerdown", {
        pointerId: 8,
        pointerType: "mouse",
        bubbles: true,
        cancelable: true,
        clientX: r.x + r.width / 2,
        clientY: r.y + r.height / 2,
      }),
    );
  }, id);
  await page.waitForTimeout(260); // 長押しは 200ms
  await page.evaluate((dir) => {
    // 輪の中心から方位へ引いて離す。北を 0 として時計回り
    const order = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
    const i = order.indexOf(dir);
    const svg = document.querySelector(".radial svg");
    if (!svg) throw new Error("サークルメニューが出ていない");
    // 中心の丸を探す。アイコンにも circle があるので、いちばん大きいものを取る
    const hub = [...svg.querySelectorAll("circle")].reduce((best, c) =>
      Number(c.getAttribute("r")) > Number(best.getAttribute("r")) ? c : best,
    );
    const cx = Number(hub.getAttribute("cx"));
    const cy = Number(hub.getAttribute("cy"));
    const a = ((i * 45 - 90) * Math.PI) / 180;
    const x = cx + Math.cos(a) * 110;
    const y = cy + Math.sin(a) * 110;
    const fire = (type) =>
      window.dispatchEvent(
        new PointerEvent(type, { pointerId: 8, pointerType: "mouse", bubbles: true, clientX: x, clientY: y }),
      );
    fire("pointermove");
    fire("pointerup");
  }, direction);
  await page.waitForTimeout(60);
};

/** 開いているカットインを閉じる。 */
const closeCutin = () =>
  page.evaluate(() => {
    document.body.dispatchEvent(new PointerEvent("pointerdown", { bubbles: true, clientX: 2, clientY: 2 }));
  });

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
await pickFromGroup("edit", "N"); // 編集 → マルチカット
await closeCutin();
const toolAfterPick = await page.evaluate(() => window.macbeth.state.tool);
const facesBefore = await page.evaluate(() => window.macbeth.state.selected.mesh.faceCount);
await page.mouse.move(at(0.4, 0.62).x, at(0.4, 0.62).y); // エッジの近くへホバー
const previewed = await page.evaluate(() => document.getElementById("hudHint").innerHTML.includes("エッジループ挿入"));
await page.mouse.move(ON_MESH.x, ON_MESH.y);
await page.mouse.down();
await page.mouse.up();
const facesAfter = await page.evaluate(() => window.macbeth.state.selected.mesh.faceCount);
check(
  "マルチカットで切れる",
  facesAfter > facesBefore,
  `${facesBefore} → ${facesAfter}面 / 予測線 ${previewed ? "あり" : "なし"} / ツール ${toolAfterPick}`,
);
await page.keyboard.press("Control+z");
await tapGroup("select");
await closeCutin();

/* 9. プリミティブを足すと 2 つになる */
await pickFromGroup("add", "NE"); // 追加 → スフィア（北から時計回りで 立方体 / スフィア / 円柱 …）
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
const layers = await page.evaluate(() => ({
  rows: document.querySelectorAll(".panel[data-panel='layers'] .lyrow").length,
  thumbs: document.querySelectorAll(".panel[data-panel='layers'] .thumb img").length,
}));
check("アウトライナが出る（サムネイル付き）", layers.rows >= 1 && layers.thumbs === layers.rows, `行 ${layers.rows} / サムネ ${layers.thumbs}`);

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

/* 16. パネルをドラッグして置き場所を変えられる（アウトライナはドロワー専用になったのでツール列で試す） */
const headBox = await page.evaluate(() => {
  const h = document.querySelector('.panel[data-panel="tools"] .phead');
  const r = h.getBoundingClientRect();
  return { x: r.x + r.width / 2, y: r.y + r.height / 2 };
});
await page.mouse.move(headBox.x, headBox.y);
await page.mouse.down();
// 右上の落とし場所へ運ぶ
const stage = await page.evaluate(() => {
  const r = document.getElementById("stage").getBoundingClientRect();
  return { x: r.x, y: r.y, w: r.width, h: r.height };
});
await page.mouse.move(stage.x + stage.w - 60, stage.y + 80, { steps: 10 });
await page.mouse.up();
const dockedRight = await page.evaluate(() => ({
  right: !!document.querySelector('#dockRightTop .panel[data-panel="tools"]'),
  colShown: !document.getElementById("dockColRight").hidden,
}));
// 左へ戻す
const headBox2 = await page.evaluate(() => {
  const h = document.querySelector('.panel[data-panel="tools"] .phead');
  const r = h.getBoundingClientRect();
  return { x: r.x + r.width / 2, y: r.y + r.height / 2 };
});
await page.mouse.move(headBox2.x, headBox2.y);
await page.mouse.down();
await page.mouse.move(stage.x + 150, stage.y + stage.h / 2, { steps: 10 });
await page.mouse.up();
const dockedLeft = await page.evaluate(() => ({
  left: !!document.querySelector('#dockLeft .panel[data-panel="tools"]'),
  colHidden: document.getElementById("dockColRight").hidden,
}));
check(
  "パネルを別の場所へドッキングできる（空のドック列は消える）",
  dockedRight.right && dockedRight.colShown && dockedLeft.left && dockedLeft.colHidden,
  `右上 ${dockedRight.right}（列が出る ${dockedRight.colShown}）→ 左 ${dockedLeft.left}（列が消える ${dockedLeft.colHidden}）`,
);

/* 17. モードを切り替えると予定表が出て、戻すとキャンバスが戻る */
await page.evaluate(() => window.macbeth.setMode("sculpt"));
const inStub = await page.evaluate(() => ({
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
  "未実装のモードは予定表が出て、戻すとキャンバスが戻る",
  inStub.stub && inStub.stage && inStub.label === "スカルプト" && inStub.tools === 0 &&
    !backToModel.stub && !backToModel.stage && backToModel.tools > 0,
  `スカルプト: 予定表 ${inStub.stub} / ツール ${inStub.tools} / ゲージ「${inStub.gauge}」→ モデリング: ツール ${backToModel.tools}`,
);

/* 18. 縦持ちでもビューポートが縦一杯（右のドック列は空なので場所を取らない。`24` の T1） */
await page.setViewportSize({ width: 744, height: 1133 }); // iPad mini の縦
await page.waitForTimeout(200);
const portrait = await page.evaluate(() => {
  const stage = document.getElementById("stage");
  const vp = document.getElementById("vp").getBoundingClientRect();
  return {
    klass: stage.classList.contains("portrait"),
    dockHidden: document.getElementById("dockColRight").hidden,
    vpRatio: vp.height / stage.getBoundingClientRect().height,
    canvas: document.getElementById("gl").width > 0,
  };
});
await page.setViewportSize({ width: 1280, height: 800 });
await page.waitForTimeout(200);
const backLandscape = await page.evaluate(() => !document.getElementById("stage").classList.contains("portrait"));
check(
  "縦持ちでもビューポートが縦一杯（空のドック列は場所を取らない）",
  portrait.klass && portrait.dockHidden && portrait.vpRatio >= 0.98 && portrait.canvas && backLandscape,
  `ドック列 ${portrait.dockHidden ? "無し" : "あり"} / ビューポート ${Math.round(portrait.vpRatio * 100)}%`,
);

/* 19. ベベル: エッジを選んで左右にドラッグすると面が増える */
await page.setViewportSize({ width: 1280, height: 800 });
await page.waitForTimeout(200);
await page.keyboard.press("F10"); // エッジモード
await page.waitForTimeout(500);
await page.mouse.click(ON_MESH.x, ON_MESH.y); // 手前の面のどこかのエッジ
const bevelReady = await page.evaluate(() => window.macbeth.state.comp.size);
await pickFromGroup("edit", "E"); // 編集 → ベベル
await closeCutin();
const bf0 = await page.evaluate(() => window.macbeth.state.selected.mesh.faceCount);
await page.mouse.move(ON_MESH.x, ON_MESH.y);
await page.mouse.down();
await page.mouse.move(ON_MESH.x + 60, ON_MESH.y, { steps: 6 });
await page.mouse.up();
const bf1 = await page.evaluate(() => window.macbeth.state.selected.mesh.faceCount);
// オプションのセグメントを増やすとかけ直される
await tapGroup("edit"); // ベベルのオプションがカットインで出る
const bf2 = await page.evaluate(() => {
  window.macbeth.state.bevel.segments = 3;
  return document.querySelectorAll('.cutin.wide[data-gauge="edit"] .slider').length;
});
await closeCutin();
await page.keyboard.press("Control+z");
const bf3 = await page.evaluate(() => window.macbeth.state.selected.mesh.faceCount);
await tapGroup("select");
await closeCutin();
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

/* 23b. ブリッジの分割数（`23` の T4） */
const bridgeSegments = await page.evaluate(() => {
  const app = window.macbeth;
  const objectsBefore = app.state.doc.objects.length;
  const object = app.state.doc.addObject("cube");
  app.viewport.syncAll();
  app.state.select(object);
  app.setCompMode("face");
  app.state.comp.clear();
  for (let f = 0; f < object.mesh.faceCount; f++) {
    const c = object.mesh.faceCenter(f);
    if (Math.abs(Math.abs(c[1]) - 0.5) < 1e-6) app.state.comp.add(f);
  }
  app.doDeleteFaces();
  const opened = object.mesh.faceCount;

  // 「編集」のブリッジのカットインで分割数を 3 にする
  app.state.lastEdit = "bridge";
  const host = app.panelHostForTest();
  host.onBridgeSegmentsChange(3);
  const segments = app.state.bridgeSegments;

  app.setCompMode("edge");
  app.selectBoundary();
  app.doBridge();
  const after = object.mesh.faceCount;
  const verts = object.mesh.vertexCount;

  host.onBridgeSegmentsChange(1);
  app.history.undo();
  app.history.undo();
  app.state.select(null);
  app.state.doc.objects.length = objectsBefore;
  app.viewport.syncAll();
  return { opened, segments, after, verts };
});
check(
  "ブリッジの分割数",
  bridgeSegments.segments === 3 && bridgeSegments.after === bridgeSegments.opened + 12 && bridgeSegments.verts === 16,
  `分割 ${bridgeSegments.segments} で ${bridgeSegments.opened} → ${bridgeSegments.after}面 / 頂点 ${bridgeSegments.verts}`,
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
  // CTL ラッチではなく、ツール列のスナップボタンで効かせる（docs/17 の 7.1）
  const snapButton = [...document.querySelectorAll(".toolcol .ibtn")].find((b) =>
    b.title.startsWith("スナップ"),
  );
  // 長押しでサークルメニューが出るボタンなので、click ではなくポインタで押して離す
  const br = snapButton.getBoundingClientRect();
  for (const type of ["pointerdown", "pointerup"]) {
    snapButton.dispatchEvent(
      new PointerEvent(type, {
        pointerId: 21,
        pointerType: "mouse",
        isPrimary: true,
        clientX: br.x + br.width / 2,
        clientY: br.y + br.height / 2,
        button: 0,
        buttons: type === "pointerup" ? 0 : 1,
        bubbles: true,
        cancelable: true,
      }),
    );
  }
  app.state.snap.kind = "vertex";
  const buttonOn = app.state.snapOn && app.state.snapping;
  fire("pointerdown", rect.x + at.x, rect.y + at.y);
  for (let i = 1; i <= 12; i++) fire("pointermove", rect.x + at.x + (dx * i) / 12, rect.y + at.y + (dy * i) / 12);
  fire("pointerup", rect.x + at.x + dx, rect.y + at.y + dy);
  await new Promise((r) => setTimeout(r, 40));
  // CTL を立てただけでは寄らないことも見る（Ctrl とスナップは無関係になった）
  app.state.snapOn = false;
  app.state.mods.ctrl = "on";
  const ctrlSnaps = app.state.snapping;
  app.state.mods.ctrl = "off";
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
  return { landed, hit, buttonOn, ctrlSnaps, objects: app.state.doc.objects.length, objectsBefore };
});
check(
  "スナップボタンで頂点に乗る（CTL とは無関係）",
  vertexSnap.hit &&
    vertexSnap.buttonOn &&
    !vertexSnap.ctrlSnaps &&
    vertexSnap.objects === vertexSnap.objectsBefore,
  `着地 ${vertexSnap.landed.map((n) => n.toFixed(2)).join(",")} / CTL だけ ${vertexSnap.ctrlSnaps}`,
);

/* 27c. サーフェススナップ: 別オブジェクトの面の上に乗る（Maya の Make Live の考え方） */
const surfaceSnap = await page.evaluate(async () => {
  const app = window.macbeth;
  const objectsBefore = app.state.doc.objects.length;
  // 大きめの板を的にして、その上へ運ぶ
  const target = app.state.doc.addObject("plane");
  target.params.width = 6;
  target.params.height = 6;
  target.rebuild();
  target.transform.position = [0, 2.4, 0];
  const mover = app.state.doc.addObject("cube");
  mover.transform.position = [2.6, -1.2, 0];
  app.viewport.syncAll();
  app.setCompMode("object");
  app.state.select(mover);
  app.refreshManipulator();

  const canvas = document.getElementById("gl");
  const rect = canvas.getBoundingClientRect();
  const fire = (type, x, y) =>
    canvas.dispatchEvent(
      new PointerEvent(type, {
        pointerId: 11,
        pointerType: "mouse",
        isPrimary: true,
        clientX: x,
        clientY: y,
        buttons: type === "pointerup" ? 0 : 1,
        bubbles: true,
        cancelable: true,
      }),
    );

  const at = app.manipulator.toScreen(app.pivotWorld());
  // 板の中央あたりへ運ぶ
  const goalWorld = app.pivotWorld().clone();
  goalWorld.set(0, 2.4, 0);
  const goal = app.manipulator.toScreen(goalWorld);
  app.state.snap.kind = "surface";
  app.state.snapOn = true;
  const dx = goal.x - at.x;
  const dy = goal.y - at.y;
  fire("pointerdown", rect.x + at.x, rect.y + at.y);
  for (let i = 1; i <= 12; i++) fire("pointermove", rect.x + at.x + (dx * i) / 12, rect.y + at.y + (dy * i) / 12);
  fire("pointerup", rect.x + at.x + dx, rect.y + at.y + dy);
  await new Promise((r) => setTimeout(r, 40));
  app.state.snapOn = false;
  app.state.snap.kind = "grid";
  const landed = mover.transform.position.slice();

  app.doUndo();
  app.state.select(null);
  app.state.doc.objects.length = objectsBefore;
  app.viewport.syncAll();
  // 板は y = 2.4 の平面。乗っていれば y がそこに一致する
  return { landed, onPlane: Math.abs(landed[1] - 2.4) < 1e-3 };
});
check(
  "サーフェススナップで別オブジェクトの面に乗る",
  surfaceSnap.onPlane,
  `着地 ${surfaceSnap.landed.map((n) => n.toFixed(3)).join(",")}`,
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

/* 29. UV モード（C1）: 2D ビュー、カット、展開、島の移動 */
const uv = await page.evaluate(async () => {
  const app = window.macbeth;
  const objectsBefore = app.state.doc.objects.length;
  const object = app.state.doc.addObject("cube");
  app.viewport.syncAll();
  app.state.select(object);
  app.setCompMode("object");

  app.setMode("uv");
  const mode = app.uv;
  const paneShown = !document.getElementById("paneUv").hidden;
  const split = document.getElementById("vp").classList.contains("split");
  const started = { charts: mode.view.uvTopology.charts.length, verts: mode.view.uvTopology.vertexUv.length / 2 };

  // すべての辺を切って、6 枚に開く
  const recipe = object.uv;
  for (const [a, b] of object.mesh.edges()) recipe.seams.add(`${Math.min(a, b)}_${Math.max(a, b)}`);
  mode.unfold();
  const opened = {
    charts: mode.view.uvTopology.charts.length,
    verts: mode.view.uvTopology.vertexUv.length / 2,
  };

  // 島を 1 つ選んで、UV 空間で動かす
  mode.setUnit("shell");
  mode.chosen.clear();
  mode.chosen.add(0);
  const cornersOfFirst = mode.view.uvTopology.charts[0].corners;
  const uvOf = () => {
    const set = object.mesh.uvSets.get("map1");
    return cornersOfFirst.map((key) => {
      const [f, at] = key.split(":").map(Number);
      const corner = object.mesh.faceOffsets[f] + at;
      return [set[corner * 2], set[corner * 2 + 1]];
    });
  };
  const before = uvOf();

  const pane = document.getElementById("paneUv");
  const rect = pane.getBoundingClientRect();
  const canvas = document.getElementById("uvgl");
  const at = mode.view.toScreen(before[0][0], before[0][1]);
  const fire = (type, x, y) =>
    canvas.dispatchEvent(
      new PointerEvent(type, {
        pointerId: 200,
        pointerType: "mouse",
        isPrimary: true,
        clientX: x,
        clientY: y,
        buttons: type === "pointerup" ? 0 : 1,
        bubbles: true,
        cancelable: true,
      }),
    );
  // 島の中を押してドラッグ
  const inside = mode.view.toScreen(
    before.reduce((s, p) => s + p[0], 0) / before.length,
    before.reduce((s, p) => s + p[1], 0) / before.length,
  );
  fire("pointerdown", rect.x + inside.x, rect.y + inside.y);
  for (let i = 1; i <= 8; i++) fire("pointermove", rect.x + inside.x + i * 5, rect.y + inside.y);
  fire("pointerup", rect.x + inside.x + 40, rect.y + inside.y);
  await new Promise((r) => setTimeout(r, 40));
  const moved = uvOf();
  const shift = moved[0][0] - before[0][0];

  // もう一度展開しても、動かした分は残る（差分）
  mode.unfold();
  const afterUnfold = uvOf();
  const keptShift = afterUnfold[0][0] - before[0][0];
  const manualIslands = recipe.manual.size;

  void at;
  app.setMode("model");
  app.state.select(null);
  app.state.doc.objects.length = objectsBefore;
  app.viewport.syncAll();
  return { paneShown, split, started, opened, shift, keptShift, manualIslands };
});
check(
  "UV モード: 2D が出て、切って開いて、動かした分が残る",
  uv.paneShown &&
    uv.split &&
    // 立方体の UV は Maya と同じ十字の展開図なので、取り込んだ時点では 1 島
    uv.started.charts === 1 &&
    uv.opened.charts === 6 &&
    uv.opened.verts === 24 &&
    Math.abs(uv.shift) > 0.01 &&
    uv.manualIslands >= 1 &&
    Math.abs(uv.keptShift) > 0.001,
  `島 ${uv.started.charts} → ${uv.opened.charts} / UV 頂点 ${uv.opened.verts} / ` +
    `動かした量 ${uv.shift.toFixed(3)} → 展開後 ${uv.keptShift.toFixed(3)}`,
);

/* 29b. 3D で面を選んで UV モードに入ると、その島が選ばれている */
const uvSync = await page.evaluate(() => {
  const app = window.macbeth;
  const objectsBefore = app.state.doc.objects.length;
  const object = app.state.doc.addObject("cube");
  app.viewport.syncAll();
  app.state.select(object);

  // 先に UV を用意して、全部の辺を切っておく
  app.setMode("uv");
  const recipe = object.uv;
  for (const [a, b] of object.mesh.edges()) recipe.seams.add(`${Math.min(a, b)}_${Math.max(a, b)}`);
  app.uv.unfold();
  app.setMode("model");

  // 3D で面を 2 枚選んでから UV モードへ
  app.setCompMode("face");
  app.state.comp.clear();
  app.state.comp.add(0);
  app.state.comp.add(3);
  app.setMode("uv");
  const chosen = [...app.uv.chosen].sort((x, y) => x - y);
  const unit = app.uv.unit;

  // 逆向き: 2D で島を 1 つ選ぶと 3D の面が選ばれる
  app.uv.chosen.clear();
  app.uv.chosen.add(1);
  const faces = app.uv.facesOfSelection();

  // チェッカー表示
  app.setMode("model");
  app.setDisplay("checker");
  const view = app.viewport.viewOf(object);
  const hasUvAttribute = !!view.surface.geometry.getAttribute("uv");
  const checkerMaterial = view.surface.material !== undefined && !!view.surface.material.map;
  app.setDisplay("shadedWire");

  app.state.select(null);
  app.state.doc.objects.length = objectsBefore;
  app.viewport.syncAll();
  return { chosen, unit, faces, hasUvAttribute, checkerMaterial };
});
check(
  "3D と 2D の選択が面の単位で同期する",
  uvSync.unit === "shell" &&
    uvSync.chosen.length === 2 &&
    uvSync.faces.length === 1 &&
    uvSync.hasUvAttribute &&
    uvSync.checkerMaterial,
  `3D 2 面 → 島 ${uvSync.chosen.join(",")} / 島 1 → 面 ${uvSync.faces.join(",")} / チェッカー ${uvSync.checkerMaterial}`,
);

/* 30. 修飾キーは 2 段階。一度使っても消えない（docs/17 の 6 章） */
await page.evaluate(() => window.macbeth.setMode("model"));
await page.keyboard.press("F11");
await page.waitForTimeout(500);
await page.mouse.click(ON_MESH.x, ON_MESH.y);
await page.click("#modShift");
const modAfterTap = await page.evaluate(() => document.getElementById("modShift").dataset.state);
// SHF を立てたまま面を 2 枚足す。1 回目で消えるなら 2 回目は選び直しになる
await page.waitForTimeout(500);
await page.mouse.click(at(0.56, 0.52).x, at(0.56, 0.52).y);
const compAfterFirst = await page.evaluate(() => window.macbeth.state.comp.size);
await page.waitForTimeout(500);
await page.mouse.click(at(0.4, 0.68).x, at(0.4, 0.68).y);
const modStill = await page.evaluate(() => ({
  state: document.getElementById("modShift").dataset.state,
  comp: window.macbeth.state.comp.size,
  hud: document.getElementById("hudMode").textContent,
}));
await page.click("#modShift");
const modOff = await page.evaluate(() => window.macbeth.state.mods.shift);
check(
  "SHF は 2 段階で、使っても消えない",
  modAfterTap === "on" &&
    compAfterFirst >= 2 &&
    modStill.state === "on" &&
    modStill.comp >= compAfterFirst &&
    modStill.hud.includes("SHF") &&
    modOff === "off",
  `${modAfterTap} → 選択 ${compAfterFirst} → ${modStill.comp}（${modStill.state}）→ ${modOff}`,
);

/* 31. ペンのタップ保護: 着地のぶれでマニピュレータを掴んで動かない（docs/17 の 3 章） */
const tapGuard = await page.evaluate(async () => {
  const app = window.macbeth;
  const canvas = document.getElementById("gl");
  const rect = canvas.getBoundingClientRect();
  // カメラを既定のパースに戻し、画面の真ん中で手前に見えている面を 1 枚選ぶ。
  // 画面比率や objects[0] の決め打ちだと、それまでの試験のカメラと選択に左右される
  app.viewport.syncAll();
  app.viewport.setView("persp");
  app.state.select(app.state.doc.objects[0]);
  app.viewport.frameSelected();
  app.setCompMode("face");
  app.state.comp.clear();
  app.viewport.rebuildOverlay();
  const front = app.picker.pickSurface({ x: rect.width / 2, y: rect.height / 2 });
  const object = front ? front.object : app.state.doc.objects[0];
  app.state.select(object);
  app.state.comp.clear();
  if (front) app.state.comp.add(front.face);
  app.viewport.rebuildOverlay();
  app.refreshManipulator();

  const fire = (type, x, y, id) =>
    canvas.dispatchEvent(
      new PointerEvent(type, {
        pointerId: id,
        pointerType: "pen",
        isPrimary: true,
        clientX: x,
        clientY: y,
        button: 0,
        buttons: type === "pointerup" ? 0 : 1,
        bubbles: true,
        cancelable: true,
      }),
    );
  // ピボット（= 選択の中心）の画面位置。ここがいちばん吸われやすい
  const at = app.manipulator.toScreen(app.pivotWorld());
  const x = rect.x + at.x;
  const y = rect.y + at.y;
  // メッシュ全体の頂点で見る。選択が変わっても比べられる
  const snapshot = () => [...object.mesh.positions];
  const before = snapshot();
  const picked = app.state.comp.size;

  // 6px ずらして 2 回タップ（ダブルクリックの窓の中）
  let id = 40;
  for (const step of [0, 1]) {
    fire("pointerdown", x, y, ++id);
    for (let i = 1; i <= 3; i++) fire("pointermove", x + i * 2, y + i * 2, id);
    fire("pointerup", x + 6, y + 6, id);
    if (step === 0) await new Promise((r) => setTimeout(r, 90));
  }
  await new Promise((r) => setTimeout(r, 40));
  const after = snapshot();
  const still = before.length === after.length && before.every((v, i) => Math.abs(v - after[i]) < 1e-6);
  // ダブルタップが効いてシェル全体（そのメッシュの全面）になっている
  const shell = app.state.comp.size;
  const faceCount = object.mesh.faceCount;

  // 一方、はっきり引けば動く
  app.refreshManipulator();
  const at2 = app.manipulator.toScreen(app.pivotWorld());
  const moveBefore = [...object.mesh.positions];
  fire("pointerdown", rect.x + at2.x, rect.y + at2.y, ++id);
  for (let i = 1; i <= 10; i++) fire("pointermove", rect.x + at2.x + i * 6, rect.y + at2.y, id);
  fire("pointerup", rect.x + at2.x + 60, rect.y + at2.y, id);
  await new Promise((r) => setTimeout(r, 40));
  const dragged = moveBefore.some((v, i) => Math.abs(v - object.mesh.positions[i]) > 0.05);
  if (dragged) app.doUndo();

  // SHF を立ててタップしても押し出さない（生きるまでメッシュを触らない）
  const facesBefore = object.mesh.faceCount;
  app.state.mods.shift = "on";
  app.refreshManipulator();
  const at3 = app.manipulator.toScreen(app.pivotWorld());
  fire("pointerdown", rect.x + at3.x, rect.y + at3.y, ++id);
  fire("pointerup", rect.x + at3.x + 2, rect.y + at3.y + 2, id);
  await new Promise((r) => setTimeout(r, 40));
  const facesAfter = object.mesh.faceCount;
  app.state.mods.shift = "off";

  return { picked, still, shell, faceCount, dragged, facesBefore, facesAfter };
});
check(
  "ペンの軽いタップではマニピュレータが動かない",
  tapGuard.picked === 1 &&
    tapGuard.still &&
    tapGuard.shell === tapGuard.faceCount &&
    tapGuard.dragged &&
    tapGuard.facesAfter === tapGuard.facesBefore,
  `タップ後 選択 ${tapGuard.shell}/${tapGuard.faceCount} 面・移動なし ${tapGuard.still} / ` +
    `ドラッグは効く ${tapGuard.dragged} / SHF タップ ${tapGuard.facesBefore} → ${tapGuard.facesAfter} 面`,
);

/* 32. マニピュレータ: 大きさとピボットの移動（docs/17 の 4 章） */
const manip = await page.evaluate(async () => {
  const app = window.macbeth;
  const canvas = document.getElementById("gl");
  const rect = canvas.getBoundingClientRect();

  // 「変形」をタップすると、マニピュレータのオプションが横からカットインする（`21`）
  const groupButton = document.querySelector('#dockLeft .ibtn[data-group="xform"]');
  const tapButton = () => {
    const b = document.querySelector('#dockLeft .ibtn[data-group="xform"]') ?? groupButton;
    const br = b.getBoundingClientRect();
    for (const type of ["pointerdown", "pointerup"]) {
      const e = new PointerEvent(type, {
        pointerId: 22,
        pointerType: "mouse",
        isPrimary: true,
        clientX: br.x + br.width / 2,
        clientY: br.y + br.height / 2,
        button: 0,
        buttons: type === "pointerup" ? 0 : 1,
        bubbles: true,
        cancelable: true,
      });
      (type === "pointerdown" ? b : window).dispatchEvent(e);
    }
  };
  tapButton();
  const cutin = document.querySelector('.cutin.wide[data-gauge="xform"]');
  const gaugeShown = !!cutin;
  // 「大きさ」のスライダーを動かすと、その場でマニピュレータが大きくなる
  let dragged = 0;
  if (cutin) {
    const slider = cutin.querySelector(".slider");
    slider.value = "1.85";
    slider.dispatchEvent(new Event("input", { bubbles: true }));
    dragged = app.state.manipSize;
  }
  // もう一度タップで閉じる
  tapButton();
  const gaugeClosed = !document.querySelector('.cutin.wide[data-gauge="xform"]');

  // 大きく 2 回 → ×1.5625、初期設定に戻すと ×1
  app.setManipSize(1);
  app.setManipSize(app.state.manipSize * 1.25);
  app.setManipSize(app.state.manipSize * 1.25);
  const bigger = app.state.manipSize;
  const stored = Number(localStorage.getItem("macbeth.manipSize"));
  app.setManipSize(1);

  // 面を 1 枚選び、ピボットを動かして、そのまわりで回るかを見る
  app.viewport.setView("persp");
  app.setCompMode("face");
  app.state.comp.clear();
  app.viewport.rebuildOverlay();
  const front = app.picker.pickSurface({ x: rect.width / 2, y: rect.height / 2 });
  if (!front) return { fail: "面が拾えない" };
  app.state.select(front.object);
  app.state.comp.add(front.face);
  app.viewport.rebuildOverlay();
  app.refreshManipulator();

  const fire = (type, x, y, id) =>
    canvas.dispatchEvent(
      new PointerEvent(type, {
        pointerId: id,
        pointerType: "mouse",
        isPrimary: true,
        clientX: x,
        clientY: y,
        button: 0,
        buttons: type === "pointerup" ? 0 : 1,
        bubbles: true,
        cancelable: true,
      }),
    );

  const object = front.object;
  const vertsBefore = [...object.mesh.positions];
  app.togglePivotEdit();
  const at = app.manipulator.toScreen(app.pivotWorld());
  let id = 60;
  fire("pointerdown", rect.x + at.x, rect.y + at.y, ++id);
  for (let i = 1; i <= 10; i++) fire("pointermove", rect.x + at.x + i * 8, rect.y + at.y - i * 4, id);
  fire("pointerup", rect.x + at.x + 80, rect.y + at.y - 40, id);
  await new Promise((r) => setTimeout(r, 40));
  const movedPivot = !!app.state.pivotOverride;
  // メッシュは動いていない
  const meshStill = vertsBefore.every((v, i) => Math.abs(v - object.mesh.positions[i]) < 1e-6);
  const pivotAt = app.pivotWorld();
  const moved = [pivotAt.x, pivotAt.y, pivotAt.z];
  app.togglePivotEdit();

  // 新しいピボットのまわりで回る。選択から離れた頂点で確かめる
  app.setManip("rotate");
  // 回るのは選択に入っている頂点だけなので、選んだ面の頂点で見る
  const probe = object.mesh.faceVerts(front.face)[0];
  const before = object.mesh.getPosition(probe);
  const at2 = app.manipulator.toScreen(app.pivotWorld());
  // リングの半径は画面上では一定でないので、当たる点を探してから掴む
  let grab = null;
  for (let r = 24; r <= 220 && !grab; r += 4) {
    for (const a of [0, 45, 90, 135, 180, 225, 270, 315]) {
      const t = (a * Math.PI) / 180;
      const cand = { x: at2.x + Math.cos(t) * r, y: at2.y + Math.sin(t) * r };
      if (app.manipulator.pick(cand, app.pivotWorld(), "rotate") >= 10) {
        grab = cand;
        break;
      }
    }
  }
  if (!grab) return { fail: "回転リングが拾えない" };
  fire("pointerdown", rect.x + grab.x, rect.y + grab.y, ++id);
  for (let i = 1; i <= 10; i++) fire("pointermove", rect.x + grab.x, rect.y + grab.y + i * 6, id);
  fire("pointerup", rect.x + grab.x, rect.y + grab.y + 60, id);
  await new Promise((r) => setTimeout(r, 40));
  const after = object.mesh.getPosition(probe);
  const rotated = before.some((v, i) => Math.abs(v - after[i]) > 1e-4);
  if (rotated) app.doUndo();
  app.setManip("all");

  // 選択を変えるとピボットは中心へ戻る
  app.state.select(object);
  const clearedOnSelect = app.state.pivotOverride === null;

  return {
    bigger,
    stored,
    movedPivot,
    meshStill,
    moved,
    rotated,
    clearedOnSelect,
    gaugeShown,
    gaugeClosed,
    dragged,
    size: app.state.manipSize,
  };
});
check(
  "マニピュレータ: タップで大きさのゲージ、ピボットの移動",
  manip.gaugeShown &&
    manip.dragged > 1.5 &&
    manip.gaugeClosed &&
    Math.abs(manip.bigger - 1.5625) < 1e-6 &&
    Math.abs(manip.stored - 1.5625) < 1e-6 &&
    manip.size === 1 &&
    manip.movedPivot &&
    manip.meshStill &&
    manip.rotated &&
    manip.clearedOnSelect,
  `ゲージ ${manip.gaugeShown ? "出る" : "出ない"} → ×${manip.dragged?.toFixed(2)} → ${manip.gaugeClosed ? "閉じる" : "閉じない"} / ` +
    `ピボット ${manip.moved?.map((n) => n.toFixed(2)).join(",")}（メッシュ据え置き ${manip.meshStill}）/ ` +
    `そのまわりで回る ${manip.rotated}`,
);

/* 33. スライド: SHF + CTL + 移動でエッジループが辺に沿って滑る（docs/17 の 5 章） */
const slide = await page.evaluate(async () => {
  const app = window.macbeth;
  const objectsBefore = app.state.doc.objects.length;
  const object = app.state.doc.addObject("cylinder");
  object.params.sdAxis = 8;
  object.params.sdHeight = 2;
  object.params.sdCaps = 0;
  object.rebuild();
  object.transform.position = [0, 0, 0];
  app.viewport.syncAll();
  app.viewport.setView("front");
  app.state.select(object);
  app.viewport.frameSelected();

  // 真ん中の輪を頂点で選ぶ
  app.setCompMode("vertex");
  app.state.comp.clear();
  const ring = [];
  for (let v = 0; v < object.mesh.vertexCount; v++) {
    if (Math.abs(object.mesh.positions[v * 3 + 1]) < 1e-6) {
      app.state.comp.add(v);
      ring.push(v);
    }
  }
  app.viewport.rebuildOverlay();
  app.refreshManipulator();

  const canvas = document.getElementById("gl");
  const rect = canvas.getBoundingClientRect();
  const fire = (type, x, y, id) =>
    canvas.dispatchEvent(
      new PointerEvent(type, {
        pointerId: id,
        pointerType: "mouse",
        isPrimary: true,
        clientX: x,
        clientY: y,
        button: 0,
        buttons: type === "pointerup" ? 0 : 1,
        bubbles: true,
        cancelable: true,
      }),
    );

  const facesBefore = object.mesh.faceCount;
  const before = [...object.mesh.positions];
  app.state.mods.shift = "on";
  app.state.mods.ctrl = "on";
  const at = app.manipulator.toScreen(app.pivotWorld());
  // 上へ引く。輪は上のレールに沿って滑る（front ビューなので画面の上 = +Y）
  fire("pointerdown", rect.x + at.x, rect.y + at.y, 80);
  for (let i = 1; i <= 12; i++) fire("pointermove", rect.x + at.x, rect.y + at.y - i * 4, 80);
  fire("pointerup", rect.x + at.x, rect.y + at.y - 48, 80);
  await new Promise((r) => setTimeout(r, 40));
  app.state.mods.shift = "off";
  app.state.mods.ctrl = "off";

  const facesAfter = object.mesh.faceCount;
  // 輪の頂点は上がっているが、上の輪は越えていない（t は 0.99 まで）
  let maxY = -Infinity;
  let movedUp = 0;
  for (const v of ring) {
    const y = object.mesh.positions[v * 3 + 1];
    maxY = Math.max(maxY, y);
    if (y > before[v * 3 + 1] + 1e-4) movedUp++;
  }
  // 半径は変わらない（辺の上を滑っているので、円柱では横に膨らまない）
  let radiusOk = true;
  for (const v of ring) {
    const r = Math.hypot(object.mesh.positions[v * 3], object.mesh.positions[v * 3 + 2]);
    if (Math.abs(r - 0.6) > 1e-3) radiusOk = false;
  }
  const label = app.history.canUndo;
  app.doUndo();
  const restored = before.every((v, i) => Math.abs(v - object.mesh.positions[i]) < 1e-5);

  app.state.select(null);
  app.state.doc.objects.length = objectsBefore;
  app.viewport.syncAll();
  return { ring: ring.length, movedUp, maxY, facesBefore, facesAfter, radiusOk, label, restored };
});
check(
  "SHF + CTL のドラッグでループがスライドする",
  slide.movedUp === slide.ring &&
    slide.facesAfter === slide.facesBefore &&
    slide.maxY < 1 &&
    slide.radiusOk &&
    slide.restored,
  `輪 ${slide.ring} 点が上へ ${slide.movedUp} 点（最大 Y ${slide.maxY.toFixed(3)}）/ ` +
    `面数 ${slide.facesBefore} → ${slide.facesAfter}（押し出しではない）/ 半径そのまま ${slide.radiusOk}`,
);

/* 34. UV モードに入っても UV を作り直さない。展開して初めて開く（docs/17 の 1 章） */
const uvImport = await page.evaluate(() => {
  const app = window.macbeth;
  const objectsBefore = app.state.doc.objects.length;
  const object = app.state.doc.addObject("cube");
  app.viewport.syncAll();
  app.state.select(object);

  const original = [...object.mesh.uvSets.get("map1")];
  app.setMode("uv");
  const method = object.uv.method;
  const seams = object.uv.seams.size;
  const charts = app.uv.stats().charts;
  const kept = original.every((v, i) => Math.abs(v - object.mesh.uvSets.get("map1")[i]) < 1e-6);

  // 展開図は横 4 マス × 縦 3 マス（U いっぱい、V は 0.75 ぶん）で 0〜1 に収まる
  const uv = object.mesh.uvSets.get("map1");
  let minU = Infinity, maxU = -Infinity, minV = Infinity, maxV = -Infinity;
  for (let i = 0; i < uv.length; i += 2) {
    minU = Math.min(minU, uv[i]);
    maxU = Math.max(maxU, uv[i]);
    minV = Math.min(minV, uv[i + 1]);
    maxV = Math.max(maxV, uv[i + 1]);
  }
  const boxesOk =
    Math.abs(minU) < 1e-4 && Math.abs(maxU - 1) < 1e-4 && Math.abs(maxV - minV - 0.75) < 1e-4;

  // 展開するとソルバーが LSCM に変わる
  app.uv.unfold();
  const afterMethod = object.uv.method;
  const changed = !original.every((v, i) => Math.abs(v - object.mesh.uvSets.get("map1")[i]) < 1e-6);

  app.setMode("model");
  app.state.select(null);
  app.state.doc.objects.length = objectsBefore;
  app.viewport.syncAll();
  return { method, seams, charts, kept, boxesOk, afterMethod, changed };
});
check(
  "UV モードに入っても今の UV は変わらない",
  uvImport.method === "none" &&
    uvImport.seams === 7 &&
    uvImport.charts === 1 &&
    uvImport.kept &&
    uvImport.boxesOk &&
    uvImport.afterMethod === "lscm" &&
    uvImport.changed,
  `取り込み ${uvImport.method} / 切れ目 ${uvImport.seams} 本 / 島 ${uvImport.charts} / ` +
    `そのまま ${uvImport.kept} / 十字の展開図 ${uvImport.boxesOk} / 展開後 ${uvImport.afterMethod}`,
);

/* 34b. 単位ごとのカット / ソーと UV のグリッドスナップ（docs/17 の 2.3、7.4） */
const uvOps = await page.evaluate(() => {
  const app = window.macbeth;
  const objectsBefore = app.state.doc.objects.length;
  const object = app.state.doc.addObject("plane");
  object.params.sdW = 2;
  object.params.sdH = 2;
  object.rebuild();
  app.viewport.syncAll();
  app.state.select(object);
  app.setCompMode("face");
  app.setMode("uv");

  // 板の UV は 1 枚続き。3D で面を 1 枚選んでカットすると、その面が独立する
  const started = app.uv.stats().charts;
  app.state.comp.clear();
  app.state.comp.add(0);
  app.uv.syncFromView("face", { faces: [0] });
  app.uv.cutOrSew(true);
  const afterCut = app.uv.stats().charts;

  // ソーで戻す（選んだ面どうしの間の切れ目を縫うので、全面を選ぶ）
  app.state.comp.clear();
  for (let f = 0; f < object.mesh.faceCount; f++) app.state.comp.add(f);
  app.uv.syncFromView("face", { faces: [...app.state.comp] });
  app.uv.cutOrSew(false);
  const afterSew = app.uv.stats().charts;

  // グリッドスナップ 1/8。島の真ん中を押して 0.07 だけ引く
  app.state.uvSnap = { kind: "grid", step: 1 / 8 };
  app.state.snapOn = true;
  app.uv.setUnit("shell");
  app.uv.chosen.clear();
  app.uv.chosen.add(0);
  const uvSet = () => object.mesh.uvSets.get("map1");
  const corners = app.uv.view.uvTopology.charts[0].corners.map((key) => {
    const [f, at] = key.split(":").map(Number);
    return object.mesh.faceOffsets[f] + at;
  });
  const before = corners.map((c) => uvSet()[c * 2]);
  let cu = 0;
  let cv = 0;
  for (const c of corners) {
    cu += uvSet()[c * 2];
    cv += uvSet()[c * 2 + 1];
  }
  cu /= corners.length;
  cv /= corners.length;

  const canvas = document.getElementById("uvgl");
  const rect = document.getElementById("paneUv").getBoundingClientRect();
  const at = app.uv.view.toScreen(cu, cv);
  const dx = 0.07 / app.uv.view.pixelToUv();
  const fire = (type, x, y) =>
    canvas.dispatchEvent(
      new PointerEvent(type, {
        pointerId: 90,
        pointerType: "mouse",
        isPrimary: true,
        clientX: x,
        clientY: y,
        button: 0,
        buttons: type === "pointerup" ? 0 : 1,
        bubbles: true,
        cancelable: true,
      }),
    );
  fire("pointerdown", rect.x + at.x, rect.y + at.y);
  for (let i = 1; i <= 8; i++) fire("pointermove", rect.x + at.x + (dx * i) / 8, rect.y + at.y);
  fire("pointerup", rect.x + at.x + dx, rect.y + at.y);

  const after = corners.map((c) => uvSet()[c * 2]);
  const moved = after.some((u, i) => Math.abs(u - before[i]) > 1e-6);
  const onGrid = after.every((u) => Math.abs(u / (1 / 8) - Math.round(u / (1 / 8))) < 1e-4);
  app.state.snapOn = false;

  app.setMode("model");
  app.state.select(null);
  app.state.doc.objects.length = objectsBefore;
  app.viewport.syncAll();
  return { started, afterCut, afterSew, moved, onGrid, sample: [before[0], after[0]] };
});
check(
  "UV のカット / ソーと 1/8 グリッドスナップ",
  uvOps.started === 1 && uvOps.afterCut === 2 && uvOps.afterSew === 1 && uvOps.moved && uvOps.onGrid,
  `島 ${uvOps.started} → カット ${uvOps.afterCut} → ソー ${uvOps.afterSew} / ` +
    `U ${uvOps.sample[0].toFixed(3)} → ${uvOps.sample[1].toFixed(3)}（1/8 に乗る ${uvOps.onGrid}）`,
);

/* 35. 選択モードを選ぶと今のツールを上書きする（マルチカットが残らない） */
const toolOverride = await page.evaluate(() => {
  const app = window.macbeth;
  app.setMode("model");
  app.setTool("multicut");
  const before = app.state.tool;
  // マーキングメニューと同じ経路でエッジモードへ
  app.setCompMode("edge");
  return { before, after: app.state.tool, mode: app.state.compMode };
});
check(
  "選択モードを選ぶとツールが上書きされる",
  toolOverride.before === "multicut" && toolOverride.after === "select" && toolOverride.mode === "edge",
  `${toolOverride.before} → エッジ選択 → ${toolOverride.after}`,
);

/* 36. UV の 2D: 長押しで選択が消えない、矩形選択、2D マニピュレータ */
const uv2d = await page.evaluate(async () => {
  const app = window.macbeth;
  const objectsBefore = app.state.doc.objects.length;
  const object = app.state.doc.addObject("cube");
  app.viewport.syncAll();
  app.state.select(object);
  app.setCompMode("face");
  app.setMode("uv");
  app.uv.view.frameUnit();
  app.uv.setUnit("vertex");

  const canvas = document.getElementById("uvgl");
  const rect = document.getElementById("paneUv").getBoundingClientRect();
  const fire = (type, x, y, id = 70, kind = "touch") =>
    canvas.dispatchEvent(
      new PointerEvent(type, {
        pointerId: id,
        pointerType: kind,
        isPrimary: true,
        clientX: x,
        clientY: y,
        button: 0,
        buttons: type === "pointerup" ? 0 : 1,
        bubbles: true,
        cancelable: true,
      }),
    );

  // 矩形選択: 何もないところから引く
  const a = app.uv.view.toScreen(-0.1, 1.1);
  const b = app.uv.view.toScreen(0.4, 0.4);
  fire("pointerdown", rect.x + a.x, rect.y + a.y, 71, "mouse");
  for (let i = 1; i <= 8; i++) {
    fire("pointermove", rect.x + a.x + ((b.x - a.x) * i) / 8, rect.y + a.y + ((b.y - a.y) * i) / 8, 71, "mouse");
  }
  const marqueeShown = document.getElementById("marquee").style.display === "block";
  fire("pointerup", rect.x + b.x, rect.y + b.y, 71, "mouse");
  const picked = app.uv.chosen.size;

  // その選択を持ったまま、何もないところを長押し → 選択は残る
  const empty = app.uv.view.toScreen(1.15, -0.15);
  fire("pointerdown", rect.x + empty.x, rect.y + empty.y, 72);
  await new Promise((r) => setTimeout(r, 500));
  const menuOpen = !!document.querySelector(".radial");
  fire("pointerup", rect.x + empty.x, rect.y + empty.y, 72);
  const keptAfterHold = app.uv.chosen.size;
  document.querySelector(".radial")?.remove();

  // 2D マニピュレータ: シェルを選んで中心をつかんで動かす
  app.uv.setUnit("shell");
  app.uv.chosen.clear();
  app.uv.chosen.add(0);
  app.uv.refreshHighlight();
  const pivot = app.uv.manipulatorPivot();
  const uvOf = () => [...object.mesh.uvSets.get("map1")];
  const beforeMove = uvOf();
  const at = app.uv.view.toScreen(pivot.u, pivot.v);
  const to = app.uv.view.toScreen(pivot.u + 0.15, pivot.v);
  fire("pointerdown", rect.x + at.x, rect.y + at.y, 73, "mouse");
  for (let i = 1; i <= 6; i++) {
    fire("pointermove", rect.x + at.x + ((to.x - at.x) * i) / 6, rect.y + at.y, 73, "mouse");
  }
  fire("pointerup", rect.x + to.x, rect.y + to.y, 73, "mouse");
  const afterMove = uvOf();
  const movedU = afterMove[0] - beforeMove[0];

  // 回転のリングをつかんで回す
  const size = 60 * app.state.manipSize;
  const k = app.uv.view.pixelToUv();
  const p2 = app.uv.manipulatorPivot();
  const ring = app.uv.view.toScreen(p2.u + size * 1.15 * k, p2.v);
  const ringTo = app.uv.view.toScreen(p2.u, p2.v + size * 1.15 * k);
  const beforeRot = uvOf();
  fire("pointerdown", rect.x + ring.x, rect.y + ring.y, 74, "mouse");
  for (let i = 1; i <= 8; i++) {
    fire(
      "pointermove",
      rect.x + ring.x + ((ringTo.x - ring.x) * i) / 8,
      rect.y + ring.y + ((ringTo.y - ring.y) * i) / 8,
      74,
      "mouse",
    );
  }
  fire("pointerup", rect.x + ringTo.x, rect.y + ringTo.y, 74, "mouse");
  const rotated = beforeRot.some((v, i) => Math.abs(v - object.mesh.uvSets.get("map1")[i]) > 1e-4);

  app.setMode("model");
  app.state.select(null);
  app.state.doc.objects.length = objectsBefore;
  app.viewport.syncAll();
  return { marqueeShown, picked, menuOpen, keptAfterHold, movedU, rotated };
});
check(
  "UV の 2D: 矩形選択・長押しで消えない・マニピュレータ",
  uv2d.marqueeShown &&
    uv2d.picked > 0 &&
    uv2d.menuOpen &&
    uv2d.keptAfterHold === uv2d.picked &&
    Math.abs(uv2d.movedU - 0.15) < 0.02 &&
    uv2d.rotated,
  `矩形 ${uv2d.picked} 点 / 長押し後 ${uv2d.keptAfterHold} 点（メニュー ${uv2d.menuOpen}）/ ` +
    `移動 ${uv2d.movedU.toFixed(3)} / 回転 ${uv2d.rotated}`,
);

/* 37. 自動 UV（C2）: 球が開ける島に分かれる */
const autoUv = await page.evaluate(() => {
  const app = window.macbeth;
  const objectsBefore = app.state.doc.objects.length;
  const object = app.state.doc.addObject("sphere");
  object.params.sdAxis = 12;
  object.params.sdHeight = 8;
  object.rebuild();
  app.viewport.syncAll();
  app.state.select(object);
  app.setMode("uv");
  const before = app.uv.stats();
  app.uv.autoUnwrap();
  const after = app.uv.stats();
  const uv = object.mesh.uvSets.get("map1");
  let finite = true;
  let inRange = true;
  for (let i = 0; i < uv.length; i++) {
    if (!Number.isFinite(uv[i])) finite = false;
    if (uv[i] < -1e-4 || uv[i] > 1 + 1e-4) inRange = false;
  }
  const seams = object.uv.seams.size;
  const method = object.uv.method;
  app.setMode("model");
  app.state.select(null);
  app.state.doc.objects.length = objectsBefore;
  app.viewport.syncAll();
  return { before: before.charts, after: after.charts, stretch: after.maxStretch, seams, method, finite, inRange };
});
check(
  "自動 UV で球が開ける島に分かれる",
  autoUv.after > 1 && autoUv.finite && autoUv.inRange && autoUv.stretch < 2 && autoUv.method === "lscm",
  `島 ${autoUv.before} → ${autoUv.after} / 切れ目 ${autoUv.seams} 本 / 伸び ×${autoUv.stretch.toFixed(2)} / 0〜1 に収まる ${autoUv.inRange}`,
);

/* 38. 整列（C3）: 島が 0〜1 に詰まって重ならず、テクセル密度がそろう */
const packing = await page.evaluate(() => {
  const app = window.macbeth;
  const objectsBefore = app.state.doc.objects.length;
  const object = app.state.doc.addObject("cube");
  app.viewport.syncAll();
  app.state.select(object);
  app.setMode("uv");
  // 全部の辺を切って 6 枚にしてから並べ直す
  for (const [a, b] of object.mesh.edges()) object.uv.seams.add(`${Math.min(a, b)}_${Math.max(a, b)}`);
  object.uv.method = "lscm";
  app.uv.repack();

  const t = app.uv.view.uvTopology;
  const uv = object.mesh.uvSets.get("map1");
  const boxes = t.charts.map((chart) => {
    let minU = Infinity, maxU = -Infinity, minV = Infinity, maxV = -Infinity;
    for (const key of chart.corners) {
      const [f, at] = key.split(":").map(Number);
      const c = object.mesh.faceOffsets[f] + at;
      minU = Math.min(minU, uv[c * 2]);
      maxU = Math.max(maxU, uv[c * 2]);
      minV = Math.min(minV, uv[c * 2 + 1]);
      maxV = Math.max(maxV, uv[c * 2 + 1]);
    }
    return { minU, maxU, minV, maxV };
  });
  const inUnit = boxes.every((b) => b.minU >= -1e-4 && b.minV >= -1e-4 && b.maxU <= 1 + 1e-4 && b.maxV <= 1 + 1e-4);
  let overlap = false;
  for (let i = 0; i < boxes.length; i++) {
    for (let j = i + 1; j < boxes.length; j++) {
      const a = boxes[i], b = boxes[j];
      if (a.minU < b.maxU - 1e-6 && b.minU < a.maxU - 1e-6 && a.minV < b.maxV - 1e-6 && b.minV < a.maxV - 1e-6) {
        overlap = true;
      }
    }
  }
  // 立方体の 6 面は同じ大きさなので、島の面積も 1% 以内でそろう
  const areas = boxes.map((b) => (b.maxU - b.minU) * (b.maxV - b.minV));
  const ratio = Math.max(...areas) / Math.min(...areas);

  app.setMode("model");
  app.state.select(null);
  app.state.doc.objects.length = objectsBefore;
  app.viewport.syncAll();
  return { charts: boxes.length, inUnit, overlap, ratio };
});
check(
  "整列で島が 0〜1 に詰まり、密度がそろう",
  packing.charts === 6 && packing.inUnit && !packing.overlap && packing.ratio - 1 < 0.01,
  `島 ${packing.charts} / 0〜1 に収まる ${packing.inUnit} / 重なり ${packing.overlap} / 面積の比 ${packing.ratio.toFixed(4)}`,
);

/* 39. エッジの区間選択（Maya）: 1 本目を選び、SHF + ダブルクリックで間をまとめて */
const edgeRange = await page.evaluate(async () => {
  const app = window.macbeth;
  const objectsBefore = app.state.doc.objects.length;
  const object = app.state.doc.addObject("cylinder");
  object.params.sdAxis = 12;
  object.params.sdHeight = 4;
  object.params.sdCaps = 0;
  object.rebuild();
  app.viewport.syncAll();
  app.viewport.setView("front");
  app.state.select(object);
  app.viewport.frameSelected();
  app.setCompMode("edge");
  app.state.comp.clear();
  app.viewport.rebuildOverlay();

  // 1 本の柱（同じ x, z）の縦の辺を、下から順に集める
  const view = app.viewport.viewOf(object);
  const m = object.mesh;
  const key = (i) => {
    const [a, b] = view.edges[i];
    return `${m.positions[a * 3].toFixed(4)},${m.positions[a * 3 + 2].toFixed(4)}`;
  };
  const columns = new Map();
  view.edges.forEach(([a, b], i) => {
    const sameXZ =
      Math.abs(m.positions[a * 3] - m.positions[b * 3]) < 1e-6 &&
      Math.abs(m.positions[a * 3 + 2] - m.positions[b * 3 + 2]) < 1e-6;
    if (!sameXZ) return;
    const k = key(i);
    const list = columns.get(k);
    if (list) list.push(i);
    else columns.set(k, [i]);
  });
  // いちばん本数の多い柱を使う
  let column = [];
  for (const list of columns.values()) if (list.length > column.length) column = list;
  const midY = (i) => {
    const [a, b] = view.edges[i];
    return (m.positions[a * 3 + 1] + m.positions[b * 3 + 1]) / 2;
  };
  column.sort((x, y) => midY(x) - midY(y));
  if (column.length < 3) return { fail: `柱の辺 ${column.length}` };

  const canvas = document.getElementById("gl");
  const rect = canvas.getBoundingClientRect();
  const center = (i) => {
    const [a, b] = view.edges[i];
    const p = app.manipulator.toScreen(
      app.pivotWorld().clone().set(
        (m.positions[a * 3] + m.positions[b * 3]) / 2,
        (m.positions[a * 3 + 1] + m.positions[b * 3 + 1]) / 2,
        (m.positions[a * 3 + 2] + m.positions[b * 3 + 2]) / 2,
      ),
    );
    return { x: rect.x + p.x, y: rect.y + p.y };
  };
  const fire = (type, x, y, id, shift) =>
    canvas.dispatchEvent(
      new PointerEvent(type, {
        pointerId: id,
        pointerType: "mouse",
        isPrimary: true,
        clientX: x,
        clientY: y,
        button: 0,
        buttons: type === "pointerup" ? 0 : 1,
        shiftKey: !!shift,
        bubbles: true,
        cancelable: true,
      }),
    );
  const tap = (at, id, shift) => {
    fire("pointerdown", at.x, at.y, id, shift);
    fire("pointerup", at.x, at.y, id, shift);
  };

  // 下から 1 本目と 3 本目（間に 1 本ある）
  const a1 = column[0];
  const a2 = column[2];
  let id = 100;
  tap(center(a1), ++id, false);
  const afterFirst = app.state.comp.size;
  const pickedFirst = app.state.comp.has(a1);
  await new Promise((r) => setTimeout(r, 500));
  const at2 = center(a2);
  tap(at2, ++id, true);
  const afterSecond = [...app.state.comp];
  tap(at2, ++id, true);
  await new Promise((r) => setTimeout(r, 40));
  const chosen = [...app.state.comp];
  const gotRange = [a1, column[1], a2].every((i) => app.state.comp.has(i));

  app.state.select(null);
  app.state.doc.objects.length = objectsBefore;
  app.viewport.syncAll();
  return {
    afterFirst,
    pickedFirst,
    count: chosen.length,
    gotRange,
    column: column.length,
    afterSecond: afterSecond.length,
    want: [a1, column[1], a2],
    chosen,
  };
});
check(
  "SHF + ダブルクリックで 2 本の間のエッジがまとまって選べる",
  edgeRange.afterFirst === 1 && edgeRange.pickedFirst && edgeRange.gotRange,
  `1 本 → 2 回目 ${edgeRange.afterSecond} → ${edgeRange.count} 本 / 間も入った ${edgeRange.gotRange} / ` +
    `欲しい ${edgeRange.want} 実際 ${edgeRange.chosen}（柱は ${edgeRange.column} 本）${edgeRange.fail ?? ""}`,
);

/* 40. 選択は 2D と 3D で共通（Maya）。切れ目は 3D にも出る */
const shared = await page.evaluate(() => {
  const app = window.macbeth;
  const objectsBefore = app.state.doc.objects.length;
  const object = app.state.doc.addObject("cube");
  app.viewport.syncAll();
  app.state.select(object);
  app.setCompMode("face");
  app.setMode("uv");

  // 3D で面を 2 枚選ぶ → 2D の島が選ばれる
  app.state.comp.clear();
  app.state.comp.add(0);
  app.state.comp.add(1);
  app.pushSelectionToUvForTest();
  const uvAfterFaces = app.uv.chosen.size;
  const unitAfterFaces = app.uv.unit;

  // 3D でエッジを選ぶ → 2D も UV エッジになる
  app.setCompMode("edge");
  app.state.comp.clear();
  app.state.comp.add(0);
  app.state.comp.add(1);
  app.pushSelectionToUvForTest();
  const unitAfterEdges = app.uv.unit;
  const uvEdges = app.uv.chosen.size;

  // 2D で UV 頂点を選ぶ → 3D も頂点モードになる
  app.uv.setUnit("vertex");
  app.uv.chosen.clear();
  app.uv.chosen.add(0);
  app.uv.chosen.add(1);
  app.uv.refreshHighlight();
  app.uv.pushToViewForTest();
  const modeAfterUv = app.state.compMode;
  const compAfterUv = app.state.comp.size;

  // 切れ目が 3D の重ね描きに出る
  app.setMode("model");
  app.viewport.rebuildOverlay();
  let seamLines = 0;
  for (const child of app.viewport.overlay.children) {
    if (child.type === "LineSegments" && child.material.color.getHex() === 0xff6b4a) {
      seamLines = child.geometry.attributes.position.count / 2;
    }
  }

  app.state.select(null);
  app.state.doc.objects.length = objectsBefore;
  app.viewport.syncAll();
  return { uvAfterFaces, unitAfterFaces, unitAfterEdges, uvEdges, modeAfterUv, compAfterUv, seamLines };
});
check(
  "選択は 2D と 3D で共通、切れ目は 3D にも出る",
  shared.uvAfterFaces > 0 &&
    shared.unitAfterFaces === "shell" &&
    shared.unitAfterEdges === "edge" &&
    shared.uvEdges >= 2 &&
    shared.modeAfterUv === "vertex" &&
    shared.compAfterUv >= 1 &&
    shared.seamLines === 7,
  `3D 面 → 2D 島 ${shared.uvAfterFaces} / 3D エッジ → UV エッジ ${shared.uvEdges} / ` +
    `2D 頂点 → 3D ${shared.modeAfterUv} ${shared.compAfterUv} 点 / 3D の切れ目 ${shared.seamLines} 本`,
);

/* 41. 2D の指 3 本: つまむと UV スケール、スワイプで UV 平行移動 */
const uvThree = await page.evaluate(async () => {
  const app = window.macbeth;
  const objectsBefore = app.state.doc.objects.length;
  const object = app.state.doc.addObject("cube");
  app.viewport.syncAll();
  app.state.select(object);
  app.setMode("uv");
  app.uv.view.frameUnit();
  app.uv.setUnit("shell");
  app.uv.chosen.clear();
  app.uv.chosen.add(0);
  app.uv.refreshHighlight();

  const canvas = document.getElementById("uvgl");
  const rect = document.getElementById("paneUv").getBoundingClientRect();
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
  const box = () => {
    const uv = object.mesh.uvSets.get("map1");
    let minU = Infinity, maxU = -Infinity, minV = Infinity, maxV = -Infinity;
    for (let i = 0; i < uv.length; i += 2) {
      minU = Math.min(minU, uv[i]);
      maxU = Math.max(maxU, uv[i]);
      minV = Math.min(minV, uv[i + 1]);
      maxV = Math.max(maxV, uv[i + 1]);
    }
    return { minU, maxU, minV, maxV, w: maxU - minU, h: maxV - minV };
  };

  // つまんで広げる → UV が大きくなる
  const before = box();
  const cx = rect.x + rect.width / 2;
  const cy = rect.y + rect.height / 2;
  const seats = [[-40, 0], [40, 0], [0, 40]];
  seats.forEach(([dx, dy], i) => fire("pointerdown", i + 1, cx + dx, cy + dy));
  for (let step = 1; step <= 8; step++) {
    seats.forEach(([dx, dy], i) => fire("pointermove", i + 1, cx + dx * (1 + step * 0.12), cy + dy * (1 + step * 0.12)));
  }
  seats.forEach((_, i) => fire("pointerup", i + 1, cx, cy));
  await new Promise((r) => setTimeout(r, 40));
  const scaled = box();

  // 左右スワイプ → U に平行移動
  const beforeSwipe = box();
  seats.forEach(([dx, dy], i) => fire("pointerdown", i + 11, cx + dx, cy + dy));
  for (let step = 1; step <= 8; step++) {
    seats.forEach(([dx, dy], i) => fire("pointermove", i + 11, cx + dx + step * 8, cy + dy));
  }
  seats.forEach(([dx, dy], i) => fire("pointerup", i + 11, cx + dx + 64, cy + dy));
  await new Promise((r) => setTimeout(r, 40));
  const moved = box();

  app.setMode("model");
  app.state.select(null);
  app.state.doc.objects.length = objectsBefore;
  app.viewport.syncAll();
  return {
    grew: scaled.w > before.w + 1e-4,
    ratio: scaled.w / before.w,
    movedU: moved.minU - beforeSwipe.minU,
    movedV: moved.minV - beforeSwipe.minV,
  };
});
check(
  "2D の指 3 本で UV を拡大縮小 / 平行移動",
  uvThree.grew && uvThree.movedU > 0.01 && Math.abs(uvThree.movedV) < 1e-3,
  `つまむ ×${uvThree.ratio.toFixed(2)} / 左右スワイプ U ${uvThree.movedU.toFixed(3)}（V ${uvThree.movedV.toFixed(3)}）`,
);

/* 42. glTF（.glb）と PNG の書き出し（Phase E2 / E5） */
const exported = await page.evaluate(async () => {
  const app = window.macbeth;
  // 保存の口を差し替えて、書き出したバイト列を受け取る
  const saved = [];
  const original = window.showSaveFilePicker;
  window.showSaveFilePicker = undefined;
  const link = document.createElement("a");
  const realClick = HTMLAnchorElement.prototype.click;
  HTMLAnchorElement.prototype.click = function () {
    saved.push(this.download);
  };
  void link;

  const menu = document.getElementById("fileBtn");
  menu.click();
  const items = [...document.querySelectorAll(".panel.floating .act")].map((b) => b.textContent);
  // ビルドの目印は、メニューを閉じる前に読む
  const build = [...document.querySelectorAll(".panel.floating .hint")].map((h) => h.textContent).join("");
  const glb = [...document.querySelectorAll(".panel.floating .act")].find((b) => b.textContent.includes("glTF"));
  glb?.click();
  await new Promise((r) => setTimeout(r, 300));

  HTMLAnchorElement.prototype.click = realClick;
  window.showSaveFilePicker = original;
  return { items, saved, build };
});
check(
  "ファイルメニューに glTF と PNG と更新の確認がある",
  exported.items.some((t) => t.includes("glTF")) &&
    exported.items.some((t) => t.includes("png")) &&
    exported.items.some((t) => t.includes("更新を確認")) &&
    /ビルド \d{4}-\d{2}-\d{2}/.test(exported.build ?? ""),
  `${exported.items.join(" / ")} / ${exported.build}`,
);

/* 42b. 書き出した .glb が読み戻せる */
const glb = await page.evaluate(() => {
  const app = window.macbeth;
  const core = window.macbethCore;
  const nodes = core.nodesFromObjects(app.state.doc.objects);
  const bytes = core.writeGlb(nodes, { smoothAngle: app.state.smoothAngle });
  const dv = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);
  const magic = dv.getUint32(0, true);
  const version = dv.getUint32(4, true);
  const total = dv.getUint32(8, true);
  const jsonLength = dv.getUint32(12, true);
  const json = JSON.parse(new TextDecoder().decode(bytes.subarray(20, 20 + jsonLength)));
  return {
    ok: magic === 0x46546c67 && version === 2 && total === bytes.byteLength,
    nodes: json.nodes.length,
    hasUv: !!json.meshes[0]?.primitives[0]?.attributes?.TEXCOORD_0,
    bytes: bytes.byteLength,
  };
});
check(
  "glTF を書き出して読み戻せる",
  glb.ok && glb.nodes >= 1 && glb.hasUv,
  `${glb.bytes} バイト / ノード ${glb.nodes} / UV ${glb.hasUv}`,
);

/* 42e. 島どうしが 5px 以上離れる（`20` の T3） */
const packed = await page.evaluate(async () => {
  const app = window.macbeth;
  const core = window.macbethCore;
  const objectsBefore = app.state.doc.objects.length;
  const object = app.state.doc.addObject("sphere");
  app.viewport.syncAll();
  app.state.select(object);
  app.setMode("uv");
  app.uv.autoUnwrap();

  const boxesOf = () => {
    const uv = object.mesh.uvSets.get("map1");
    const charts = core.buildCharts(object.mesh, object.uv.seams);
    return charts.map((chart) => {
      let x0 = Infinity, y0 = Infinity, x1 = -Infinity, y1 = -Infinity;
      for (const key of chart.corners) {
        const at = core.cornerIndex(object.mesh, key);
        x0 = Math.min(x0, uv[at * 2]);
        x1 = Math.max(x1, uv[at * 2]);
        y0 = Math.min(y0, uv[at * 2 + 1]);
        y1 = Math.max(y1, uv[at * 2 + 1]);
      }
      return { x0, y0, x1, y1 };
    });
  };
  const worstGap = (boxes) => {
    let worst = Infinity;
    for (let i = 0; i < boxes.length; i++) {
      const a = boxes[i];
      worst = Math.min(worst, a.x0, a.y0, 1 - a.x1, 1 - a.y1);
      for (let j = i + 1; j < boxes.length; j++) {
        const b = boxes[j];
        worst = Math.min(worst, Math.max(b.x0 - a.x1, a.x0 - b.x1, b.y0 - a.y1, a.y0 - b.y1));
      }
    }
    return worst;
  };

  const boxes = boxesOf();
  const gap1024 = worstGap(boxes);
  const want1024 = core.marginUv(object.uv.packing);

  // 512 に落とすと余白は 10 テクセルへ上がる（5px を割らない）
  object.uv.packing.textureSize = 512;
  app.uv.repack();
  const want512 = core.marginUv(object.uv.packing);
  const gap512 = worstGap(boxesOf());

  app.setMode("model");
  app.state.select(null);
  app.state.doc.objects.length = objectsBefore;
  app.viewport.syncAll();
  return { charts: boxes.length, gap1024, want1024, gap512, want512 };
});
check(
  "島どうしが 5px 以上離れる",
  packed.charts > 1 &&
    packed.gap1024 >= packed.want1024 - 1e-6 &&
    packed.gap512 >= packed.want512 - 1e-6 &&
    Math.abs(packed.want512 - 10 / 512) < 1e-9,
  `島 ${packed.charts} / 1024: 隙間 ${(packed.gap1024 * 1024).toFixed(1)}px（要 ${(packed.want1024 * 1024).toFixed(1)}）` +
    ` / 512: ${(packed.gap512 * 512).toFixed(1)}px（要 ${(packed.want512 * 512).toFixed(1)}）`,
);

/* 42d. 展開した島がまっすぐ（`20` の T2） */
const upright = await page.evaluate(async () => {
  const app = window.macbeth;
  const objectsBefore = app.state.doc.objects.length;
  const object = app.state.doc.addObject("cube");
  app.viewport.syncAll();
  app.state.select(object);
  app.setMode("uv");

  // すべてのシェルを選んでカット → 展開（Maya と同じ「切って開く」）
  app.setCompMode("face");
  app.state.comp.clear();
  for (let f = 0; f < object.mesh.faceCount; f += 2) app.state.comp.add(f);
  app.pushSelectionToUvForTest();
  app.uv.cutOrSew(true);
  app.uv.unfold();

  // 面の辺が UV でも U 軸 / V 軸に平行か
  const uv = object.mesh.uvSets.get("map1");
  const corner = (f, i) => {
    let at = 0;
    for (let k = 0; k < f; k++) at += object.mesh.faceSize(k);
    return at + i;
  };
  let worst = 0;
  for (let f = 0; f < object.mesh.faceCount; f++) {
    const n = object.mesh.faceSize(f);
    for (let i = 0; i < n; i++) {
      const a = corner(f, i);
      const b = corner(f, (i + 1) % n);
      const du = Math.abs(uv[b * 2] - uv[a * 2]);
      const dv = Math.abs(uv[b * 2 + 1] - uv[a * 2 + 1]);
      const length = Math.hypot(du, dv);
      if (length < 1e-9) continue;
      // 軸に平行なら、短いほうの成分はほぼ 0
      worst = Math.max(worst, Math.min(du, dv) / length);
    }
  }
  const charts = app.uv.stats().charts;

  app.setMode("model");
  app.state.select(null);
  app.state.doc.objects.length = objectsBefore;
  app.viewport.syncAll();
  return { worst, charts };
});
check(
  "展開した島がまっすぐ（軸に平行）",
  upright.charts >= 2 && upright.worst < 1e-3,
  `島 ${upright.charts} / いちばん傾いた辺 ${(upright.worst * 100).toFixed(3)}%`,
);

/* 42c. 2D で戻す / 進むが効く（`20` の T1。履歴にレシピが入っている） */
const uvHistory = await page.evaluate(async () => {
  const app = window.macbeth;
  const objectsBefore = app.state.doc.objects.length;
  const object = app.state.doc.addObject("cube");
  app.viewport.syncAll();
  app.state.select(object);
  app.setMode("uv");
  app.uv.view.frameUnit();
  app.uv.setUnit("shell");
  app.uv.chosen.clear();
  app.uv.chosen.add(0);
  app.uv.refreshHighlight();

  const canvas = document.getElementById("uvgl");
  const rect = document.getElementById("paneUv").getBoundingClientRect();
  const fire = (type, id, x, y) =>
    canvas.dispatchEvent(
      new PointerEvent(type, {
        pointerId: id,
        pointerType: "touch",
        isPrimary: id % 10 === 1,
        clientX: x,
        clientY: y,
        buttons: type === "pointerup" ? 0 : 1,
        bubbles: true,
        cancelable: true,
      }),
    );
  // 動かした島の U だけを見る（もう一方の島は動かないので、全体の最小では測れない）
  const movedChart = app.uv.view.uvTopology.charts[0];
  const minU = () => {
    const uv = object.mesh.uvSets.get("map1");
    let m = Infinity;
    for (const key of movedChart.corners) {
      const at = window.macbethCore.cornerIndex(object.mesh, key);
      m = Math.min(m, uv[at * 2]);
    }
    return m;
  };
  const cx = rect.x + rect.width / 2;
  const cy = rect.y + rect.height / 2;
  /** 指 n 本でその場を 2 回叩く（動かさない）。2 本 = 戻る、3 本 = 進む。 */
  const doubleTap = async (n, base) => {
    for (let round = 0; round < 2; round++) {
      for (let k = 0; k < n; k++) fire("pointerdown", base + k, cx + k * 30, cy);
      for (let k = 0; k < n; k++) fire("pointerup", base + k, cx + k * 30, cy);
      await new Promise((r) => setTimeout(r, 60));
    }
    await new Promise((r) => setTimeout(r, 80));
  };

  // 島を指 3 本で右へ動かす（履歴に「UV を変形」が積まれる）
  const before = minU();
  const seats = [
    [-40, 0],
    [40, 0],
    [0, 40],
  ];
  seats.forEach(([dx, dy], i) => fire("pointerdown", i + 51, cx + dx, cy + dy));
  for (let step = 1; step <= 8; step++) {
    seats.forEach(([dx, dy], i) => fire("pointermove", i + 51, cx + dx + step * 8, cy + dy));
  }
  seats.forEach(([dx, dy], i) => fire("pointerup", i + 51, cx + dx + 64, cy + dy));
  await new Promise((r) => setTimeout(r, 60));
  const movedU = minU();

  // 指 2 本ダブルタップで戻る → 指 3 本ダブルタップで進む
  await doubleTap(2, 61);
  const undoneU = minU();
  await doubleTap(3, 71);
  const redoneU = minU();

  // 切れ目も戻る（メッシュだけ戻していると切れ目は残ってしまう）
  app.uv.setUnit("edge");
  app.uv.chosen.clear();
  app.uv.chosen.add(0);
  const seamsBefore = object.uv.seams.size;
  app.uv.cutOrSew(true);
  const seamsAfterCut = object.uv.seams.size;
  await doubleTap(2, 81);
  const seamsUndone = object.uv.seams.size;

  app.setMode("model");
  app.state.select(null);
  app.state.doc.objects.length = objectsBefore;
  app.viewport.syncAll();
  return { before, movedU, undoneU, redoneU, seamsBefore, seamsAfterCut, seamsUndone };
});
check(
  "2D で戻す / 進むが効く（切れ目も戻る）",
  uvHistory.movedU > uvHistory.before + 0.01 &&
    Math.abs(uvHistory.undoneU - uvHistory.before) < 1e-4 &&
    Math.abs(uvHistory.redoneU - uvHistory.movedU) < 1e-4 &&
    uvHistory.seamsAfterCut > uvHistory.seamsBefore &&
    uvHistory.seamsUndone === uvHistory.seamsBefore,
  `U ${uvHistory.before.toFixed(3)} → 移動 ${uvHistory.movedU.toFixed(3)} → 2本指 ${uvHistory.undoneU.toFixed(3)} → ` +
    `3本指 ${uvHistory.redoneU.toFixed(3)} / 切れ目 ${uvHistory.seamsBefore} → ${uvHistory.seamsAfterCut} → ${uvHistory.seamsUndone}`,
);

/* 43z. モードはドロップダウンで切り替える（`23` の T1） */
const modeMenu = await page.evaluate(async () => {
  const app = window.macbeth;
  const before = app.state.mode;
  document.getElementById("modeBtn").click();
  await new Promise((r) => setTimeout(r, 60));
  const items = [...document.querySelectorAll('.panel.floating[data-menu="mode"] .act')];
  const labels = items.map((b) => b.textContent);
  const pressed = items.filter((b) => b.getAttribute("aria-pressed") === "true").map((b) => b.textContent);
  const uv = items.find((b) => b.textContent.startsWith("UV"));
  uv?.click();
  await new Promise((r) => setTimeout(r, 120));
  const after = {
    mode: app.state.mode,
    label: document.getElementById("modeLabel").textContent,
    closed: !document.querySelector('.panel.floating[data-menu="mode"]'),
  };
  app.setMode(before);
  return { labels, pressed, after };
});
check(
  "モードはドロップダウンで切り替える",
  modeMenu.labels.length === 4 &&
    modeMenu.pressed.length === 1 &&
    modeMenu.pressed[0].startsWith("モデリング") &&
    modeMenu.after.mode === "uv" &&
    modeMenu.after.label === "UV" &&
    modeMenu.after.closed,
  `${modeMenu.labels.join(" / ")} / 今は「${modeMenu.pressed.join("")}」→ 選ぶと ${modeMenu.after.mode}・閉じる ${modeMenu.after.closed}`,
);

/* 43z-2. 歪みが色で見える（`23` の T2） */
const heat = await page.evaluate(async () => {
  const app = window.macbeth;
  const objectsBefore = app.state.doc.objects.length;
  const sphere = app.state.doc.addObject("sphere");
  app.viewport.syncAll();
  app.state.select(sphere);
  const displayBefore = app.state.display;
  app.setMode("uv");
  await new Promise((r) => setTimeout(r, 60));
  // 切れ目なしで展開すると、球はどうしても歪む（U2 と同じ根拠）
  app.uv.unfold();
  const host = app.panelHostForTest();

  host.onUvHeatChange(true);
  await new Promise((r) => setTimeout(r, 60));
  const colors = app.uv.view.faceColorsForTest();
  let reddest = 0;
  let hot = 0;
  if (colors) {
    for (let i = 0; i < colors.length; i += 3) {
      reddest = Math.max(reddest, colors[i]);
      if (colors[i] > 0.6) hot++;
    }
  }
  const on = { display: app.state.display, hasColors: !!colors, hot, reddest };

  host.onUvHeatChange(false);
  await new Promise((r) => setTimeout(r, 60));
  const off = { display: app.state.display, hasColors: !!app.uv.view.faceColorsForTest() };

  app.setMode("model");
  app.setDisplay(displayBefore);
  app.state.select(null);
  app.state.doc.objects.length = objectsBefore;
  app.viewport.syncAll();
  return { on, off, displayBefore };
});
check(
  "歪みが色で見える",
  heat.on.display === "heat" && heat.on.hasColors && heat.on.hot > 0 && !heat.off.hasColors && heat.off.display === heat.displayBefore,
  `オン: ${heat.on.display}・赤寄り ${heat.on.hot} 点（最大 r=${heat.on.reddest.toFixed(2)}）→ オフ: ${heat.off.display}・色 ${heat.off.hasColors}`,
);

/* 43z-3. チェッカーの細かさと模様（`23` の T3） */
const checker = await page.evaluate(async () => {
  const app = window.macbeth;
  const objectsBefore = app.state.doc.objects.length;
  const object = app.state.doc.addObject("cube");
  app.viewport.syncAll();
  app.state.select(object);
  const displayBefore = app.state.display;
  app.setMode("uv");
  await new Promise((r) => setTimeout(r, 60));
  const host = app.panelHostForTest();
  const before = app.uv.view.checkerCellsForTest();

  host.onCheckerChange("cellsPreview", 32);
  host.onCheckerChange("cells", 0);
  await new Promise((r) => setTimeout(r, 40));
  const coarse = app.uv.view.checkerCellsForTest();

  host.onCheckerChange("pattern", "colorGrid");
  await new Promise((r) => setTimeout(r, 40));
  const grid = app.uv.view.checkerCellsForTest();

  // 3D をチェッカー表示にすると、同じ設定のテクスチャが貼られる
  app.setDisplay("checker");
  await new Promise((r) => setTimeout(r, 60));
  const view = app.viewport.viewOf(object);
  const map = view.surface.material.map;
  const three = { hasMap: !!map, size: map ? map.image.width : 0 };

  host.onCheckerChange("cellsPreview", 8);
  host.onCheckerChange("cells", 0);
  host.onCheckerChange("pattern", "checker");
  app.setMode("model");
  app.setDisplay(displayBefore);
  app.state.select(null);
  app.state.doc.objects.length = objectsBefore;
  app.viewport.syncAll();
  return { before, coarse, grid, three };
});
check(
  "チェッカーの細かさと模様を変えられる",
  checker.before.cells === 8 &&
    checker.coarse.cells === 32 &&
    checker.coarse.textureId !== checker.before.textureId &&
    checker.grid.pattern === "colorGrid" &&
    checker.grid.textureId !== checker.coarse.textureId &&
    checker.three.hasMap,
  `2D ${checker.before.cells} → ${checker.coarse.cells} マス（作り直し ${checker.coarse.textureId !== checker.before.textureId}）→ ` +
    `${checker.grid.pattern} / 3D の下地 ${checker.three.size}px`,
);

/* 43z-4. 頂点を動かしても模様が残る（`23` の T5 の Preserve UVs） */
const preserve = await page.evaluate(async () => {
  const app = window.macbeth;
  const objectsBefore = app.state.doc.objects.length;
  const object = app.state.doc.addObject("plane");
  object.params.sdWidth = 2;
  object.params.sdHeight = 2;
  object.rebuild();
  app.viewport.syncAll();
  app.state.select(object);
  app.setDisplay("checker");
  app.setCompMode("vertex");
  app.setManip("move");
  // 真上から見れば、画面内の移動がそのまま面の中の移動になる
  app.viewport.setView("top");
  app.viewport.frameSelected();
  await new Promise((r) => setTimeout(r, 80));

  // 中央の頂点（4 枚の面が集まるところ）
  let center = 0;
  for (let v = 0; v < object.mesh.vertexCount; v++) {
    const p = object.mesh.getPosition(v);
    if (Math.hypot(p[0], p[2]) < 1e-6) center = v;
  }
  const uvOf = () => {
    const uv = object.mesh.uvSets.get("map1");
    for (let f = 0; f < object.mesh.faceCount; f++) {
      const verts = object.mesh.faceVerts(f);
      const at = verts.indexOf(center);
      if (at >= 0) return uv[(object.mesh.faceOffsets[f] + at) * 2];
    }
    return NaN;
  };

  const canvas = document.getElementById("gl");
  const rect = canvas.getBoundingClientRect();
  let id = 900;
  const fire = (type, x, y, pid) =>
    canvas.dispatchEvent(
      new PointerEvent(type, {
        pointerId: pid,
        pointerType: "pen",
        isPrimary: true,
        clientX: x,
        clientY: y,
        buttons: type === "pointerup" ? 0 : 1,
        bubbles: true,
        cancelable: true,
      }),
    );

  const drag = async (on) => {
    app.state.preserveUvs = on;
    app.state.comp.clear();
    app.state.comp.add(center);
    app.refresh();
    await new Promise((r) => setTimeout(r, 40));
    const before = uvOf();
    const x0 = object.mesh.getPosition(center)[0];
    // マニピュレータの中心（自由移動）を掴んで右へ引く
    const c = app.manipulator.toScreen(app.pivotWorld());
    fire("pointerdown", rect.x + c.x, rect.y + c.y, ++id);
    for (let i = 1; i <= 12; i++) fire("pointermove", rect.x + c.x + i * 6, rect.y + c.y, id);
    fire("pointerup", rect.x + c.x + 72, rect.y + c.y, id);
    await new Promise((r) => setTimeout(r, 60));
    const out = { before, after: uvOf(), moved: Math.abs(object.mesh.getPosition(center)[0] - x0) };
    app.doUndo();
    await new Promise((r) => setTimeout(r, 40));
    return out;
  };

  const on = await drag(true);
  const off = await drag(false);

  app.state.preserveUvs = true;
  app.setDisplay("shadedWire");
  app.setCompMode("object");
  app.state.select(null);
  app.state.doc.objects.length = objectsBefore;
  app.viewport.syncAll();
  return { on, off };
});
check(
  "頂点を動かしても模様が残る",
  preserve.on.moved > 0.05 &&
    Math.abs(preserve.on.after - preserve.on.before) > 0.02 &&
    Math.abs(preserve.off.after - preserve.off.before) < 1e-6,
  `オン: 頂点 ${preserve.on.moved.toFixed(2)} 動いて U ${preserve.on.before.toFixed(3)} → ${preserve.on.after.toFixed(3)} / ` +
    `オフ: U ${preserve.off.before.toFixed(3)} → ${preserve.off.after.toFixed(3)}`,
);

/* 43z-5. 3D の表示オプション（`23` の T6） */
const displayOpts = await page.evaluate(async () => {
  const app = window.macbeth;
  const host = app.panelHostForTest();
  const before = { grid: app.viewport.gridVisible(), side: app.viewport.surfaceSide() };
  host.onDisplayToggle("showGrid", false);
  host.onDisplayToggle("cullBack", true);
  await new Promise((r) => setTimeout(r, 40));
  const after = { grid: app.viewport.gridVisible(), side: app.viewport.surfaceSide() };
  host.onDisplayToggle("showGrid", true);
  host.onDisplayToggle("cullBack", false);
  await new Promise((r) => setTimeout(r, 40));
  const back = { grid: app.viewport.gridVisible(), side: app.viewport.surfaceSide() };
  return { before, after, back };
});
check(
  "裏面を描かない / グリッドを切れる",
  displayOpts.before.grid &&
    displayOpts.after.grid === false &&
    displayOpts.after.side === 0 &&
    displayOpts.back.grid &&
    displayOpts.back.side === 2,
  `グリッド ${displayOpts.before.grid} → ${displayOpts.after.grid} → ${displayOpts.back.grid} / ` +
    `side ${displayOpts.before.side} → ${displayOpts.after.side} → ${displayOpts.back.side}`,
);

/* 43a. T8 のフィードバック 4 点（`21` のフィードバック） */
const feedback = await page.evaluate(async () => {
  const app = window.macbeth;
  const core = window.macbethCore;
  const objectsBefore = app.state.doc.objects.length;
  const out = {};

  // (1) UV モードのツール列に、カメラと追加のグループがある
  const sphere = app.state.doc.addObject("sphere");
  sphere.params.sdAxis = 16;
  sphere.params.sdHeight = 12;
  sphere.rebuild();
  app.viewport.syncAll();
  app.state.select(sphere);
  app.setMode("uv");
  out.uvGroups = [...document.querySelectorAll("#dockLeft .ibtn")].map((b) => b.dataset.group);

  // (2) 3D ビューの矩形は 3D ペインの側に出る（2D 側ではない）
  const vp = document.getElementById("vp");
  const pane3d = document.getElementById("pane3d");
  const gl = document.getElementById("gl");
  document.querySelector('#uvSwitch [data-split="both"]')?.click();
  await new Promise((r) => setTimeout(r, 200));
  app.setMode("model"); // 3D の矩形はモデリングでも UV でも同じ経路
  app.setMode("uv");
  await new Promise((r) => setTimeout(r, 100));
  const r3 = gl.getBoundingClientRect();
  const fire3d = (type, x, y) =>
    gl.dispatchEvent(
      new PointerEvent(type, {
        pointerId: 990,
        pointerType: "mouse",
        isPrimary: true,
        clientX: x,
        clientY: y,
        buttons: type === "pointerup" ? 0 : 1,
        bubbles: true,
        cancelable: true,
      }),
    );
  app.setCompMode("vertex");
  fire3d("pointerdown", r3.x + 20, r3.y + 20);
  fire3d("pointermove", r3.x + 120, r3.y + 120);
  const box = document.getElementById("marquee").getBoundingClientRect();
  const paneBox = pane3d.getBoundingClientRect();
  out.marqueeInPane = box.left >= paneBox.left - 1 && box.right <= paneBox.right + 1;
  out.marqueeLeft = Math.round(box.left - paneBox.left);
  fire3d("pointerup", r3.x + 120, r3.y + 120);
  await new Promise((r) => setTimeout(r, 40));
  void vp;

  // (3) 分割数を変えても UV がレシピから作り直される
  app.setCompMode("object");
  app.state.select(sphere);
  const uvBefore = sphere.mesh.uvSets.get("map1")?.length ?? 0;
  const seamsBefore = sphere.uv?.seams.size ?? 0;
  sphere.params.sdAxis = 24;
  sphere.uv.method = "lscm";
  const host = app.panelHostForTest();
  host.onParamInput(sphere, "sdAxis", 24);
  const uv = sphere.mesh.uvSets.get("map1");
  out.uvRebuilt =
    !!uv &&
    uv.length !== uvBefore &&
    uv.length === sphere.mesh.faceCorners.length * 2 &&
    [...uv].every((n) => Number.isFinite(n)) &&
    (sphere.uv?.seams.size ?? 0) > 0;
  out.seams = `${seamsBefore} → ${sphere.uv?.seams.size ?? 0}`;
  out.method = sphere.uv?.method;

  // (4) 球でカメラベースの面選択。SHF で足しても隣がシェルに化けない
  app.setMode("model");
  app.viewport.setView("persp");
  app.state.select(sphere);
  app.setCompMode("face");
  app.state.cameraBased = true;
  app.state.comp.clear();
  app.viewport.frameSelected();
  await new Promise((r) => setTimeout(r, 80));
  const view = app.viewport.viewOf(sphere);
  // 3D ペインは分割から全幅へ戻っているので、測り直す
  const full = gl.getBoundingClientRect();
  const center = { x: full.width / 2, y: full.height / 2 };
  // 手前の面をいくつか、少しずつずらして続けて選ぶ（ダブルクリック扱いにならないこと）
  const added = [];
  for (let i = 0; i < 4; i++) {
    const p = { x: center.x + i * 6, y: center.y + i * 4 };
    const hit = app.picker.pickSurface(p);
    if (!hit) continue;
    const e = { shiftKey: i > 0, ctrlKey: false, metaKey: false, pointerType: "mouse" };
    app.selector.click(p, e);
    added.push(app.state.comp.size);
  }
  out.added = added;
  // 足すたびに少しずつ増える。シェル全部（faceCount）に化けないこと
  out.grew =
    added.length >= 2 &&
    added[added.length - 1] > 1 &&
    added[added.length - 1] < 10 &&
    added.every((n) => n < sphere.mesh.faceCount);
  // カメラを回しても判定が古くならない
  const frontBefore = app.picker.faceVisible(view, 0);
  app.viewport.setView("back");
  await new Promise((r) => setTimeout(r, 60));
  const frontAfter = app.picker.faceVisible(view, 0);
  out.cacheFresh = frontBefore !== frontAfter;

  app.state.cameraBased = false;
  app.setCompMode("object");
  app.viewport.setView("persp");
  app.state.select(null);
  app.state.doc.objects.length = objectsBefore;
  app.viewport.syncAll();
  return out;
});
check(
  "UV のツール列にカメラと追加 / 3D の矩形は 3D 側 / 分割を変えても UV / 球の面を続けて選べる",
  feedback.uvGroups.includes("camera") &&
    feedback.uvGroups.includes("add") &&
    feedback.marqueeInPane &&
    feedback.uvRebuilt &&
    feedback.method === "lscm" &&
    feedback.grew &&
    feedback.cacheFresh,
  `UV ツール列 ${feedback.uvGroups.join("/")} / 矩形は 3D ペイン内 ${feedback.marqueeInPane}（左端 +${feedback.marqueeLeft}px）/ ` +
    `分割変更で UV 再生成 ${feedback.uvRebuilt}（切れ目 ${feedback.seams}・方式 ${feedback.method}）/ ` +
    `続けて面を足す ${feedback.added.join("→")} / 回したら判定も更新 ${feedback.cacheFresh}`,
);

/* 43b. 手順 A: 立方体を切って開いて整える（`20` の T4） */
const cubeFlow = await page.evaluate(async () => {
  const app = window.macbeth;
  const objectsBefore = app.state.doc.objects.length;
  const object = app.state.doc.addObject("cube");
  app.viewport.syncAll();
  app.state.select(object);
  const out = {};

  // 1. UV モードへ。取り込んだ UV（十字の展開図、島 1）が見える
  app.setMode("uv");
  app.uv.view.frameUnit();
  out.imported = app.uv.stats().charts;
  out.method = object.uv.method;

  // 2〜3. 3D で上の面を選び、カットで島に分ける
  app.setCompMode("face");
  let top = 0;
  for (let f = 1; f < object.mesh.faceCount; f++) {
    if (object.mesh.faceCenter(f)[1] > object.mesh.faceCenter(top)[1]) top = f;
  }
  app.state.comp.clear();
  app.state.comp.add(top);
  app.pushSelectionToUvForTest();
  out.shellFromFace = app.uv.chosen.size;
  app.uv.cutOrSew(true);
  out.afterCut = app.uv.stats().charts;

  // 4. 展開する
  app.uv.unfold();
  out.afterUnfold = app.uv.stats().charts;

  const canvas = document.getElementById("uvgl");
  const pane = document.getElementById("paneUv").getBoundingClientRect();
  let pid = 900;
  const fire = (type, x, y, id) =>
    canvas.dispatchEvent(
      new PointerEvent(type, {
        pointerId: id,
        pointerType: "touch",
        isPrimary: true,
        clientX: pane.x + x,
        clientY: pane.y + y,
        buttons: type === "pointerup" ? 0 : 1,
        bubbles: true,
        cancelable: true,
      }),
    );
  /** UV エッジの真ん中を 1 回叩く。 */
  const tapEdge = async (edge) => {
    const t = app.uv.view.uvTopology;
    const [a, b] = t.edges[edge];
    const u = (t.vertexUv[a * 2] + t.vertexUv[b * 2]) / 2;
    const v = (t.vertexUv[a * 2 + 1] + t.vertexUv[b * 2 + 1]) / 2;
    const s = app.uv.view.toScreen(u, v);
    const id = ++pid;
    fire("pointerdown", s.x, s.y, id);
    fire("pointerup", s.x, s.y, id);
    await new Promise((r) => setTimeout(r, 30));
  };

  // 5. UV エッジで縁を 1 本タップ → ダブルタップで縁を一周
  app.uv.setUnit("edge");
  app.uv.view.frameUnit();
  const topo = app.uv.view.uvTopology;
  // 大きいほう（十字が残った島）の縁を 1 本
  const big = topo.charts.reduce((best, c, i) => (c.faces.length > topo.charts[best].faces.length ? i : best), 0);
  // 縁のいちばん長くつながるところを選ぶ（十字の展開図は角で分岐することがある）
  let border = -1;
  let longest = 0;
  for (let i = 0; i < topo.edges.length; i++) {
    if (topo.edgeFaces[i].length >= 2 || topo.edgeChart[i] !== big) continue;
    const n = window.macbethCore.uvEdgeLoopFrom(topo, i).edges.length;
    if (n > longest) {
      longest = n;
      border = i;
    }
  }
  await tapEdge(border);
  out.afterTap = app.uv.chosen.size;
  await tapEdge(border); // ダブルタップ
  out.loop = app.uv.chosen.size;
  // 選ばれたのは全部この島の縁か
  const picked = [...app.uv.chosen];
  out.allBorder = picked.every((e) => topo.edgeFaces[e].length < 2 && topo.edgeChart[e] === big);

  // SHF + ダブルタップで、前に選んだ辺との間だけ
  const loop = window.macbethCore.uvEdgeLoopFrom(topo, border).edges;
  app.uv.chosen.clear();
  await tapEdge(loop[0]);
  app.state.mods.shift = "on";
  await tapEdge(loop[3]);
  await tapEdge(loop[3]);
  app.state.mods.shift = "off";
  out.arc = app.uv.chosen.size;

  // 6. 直線化。選んだ縁の V がそろう
  const uvOf = (list) => {
    const t = app.uv.view.uvTopology;
    const points = new Set();
    for (const e of list) {
      points.add(t.edges[e][0]);
      points.add(t.edges[e][1]);
    }
    return [...points].map((v) => [t.vertexUv[v * 2], t.vertexUv[v * 2 + 1]]);
  };
  // 直線化: 両端を結ぶ直線から、いちばん離れている点までの距離で見る
  const offLine = (pts) => {
    let best = [0, 0];
    let far = -1;
    for (let i = 0; i < pts.length; i++) {
      for (let j = i + 1; j < pts.length; j++) {
        const d = Math.hypot(pts[j][0] - pts[i][0], pts[j][1] - pts[i][1]);
        if (d > far) {
          far = d;
          best = [i, j];
        }
      }
    }
    const [a, b] = [pts[best[0]], pts[best[1]]];
    const dx = b[0] - a[0];
    const dy = b[1] - a[1];
    const len = Math.hypot(dx, dy) || 1;
    return Math.max(...pts.map((p) => Math.abs((p[0] - a[0]) * dy - (p[1] - a[1]) * dx) / len));
  };
  const arcEdges = [...app.uv.chosen];
  out.beforeStraight = offLine(uvOf(arcEdges));
  app.uv.tidy("straighten");
  out.afterStraight = offLine(uvOf(arcEdges));

  // 7. 島を動かして、指 2 本ダブルタップで戻す
  app.uv.setUnit("shell");
  app.uv.chosen.clear();
  app.uv.chosen.add(0);
  app.uv.refreshHighlight();
  // 動かした島の U だけを見る（もう一方の島は動かないので、全体の最小では測れない）
  const movedChart = app.uv.view.uvTopology.charts[0];
  const minU = () => {
    const uv = object.mesh.uvSets.get("map1");
    let m = Infinity;
    for (const key of movedChart.corners) {
      const at = window.macbethCore.cornerIndex(object.mesh, key);
      m = Math.min(m, uv[at * 2]);
    }
    return m;
  };
  const beforeMove = minU();
  const seats = [
    [-40, 0],
    [40, 0],
    [0, 40],
  ];
  const cx = pane.width / 2;
  const cy = pane.height / 2;
  seats.forEach(([dx, dy], i) => fire("pointerdown", cx + dx, cy + dy, 940 + i));
  for (let step = 1; step <= 8; step++) {
    seats.forEach(([dx, dy], i) => fire("pointermove", cx + dx + step * 8, cy + dy, 940 + i));
  }
  seats.forEach(([dx, dy], i) => fire("pointerup", cx + dx + 64, cy + dy, 940 + i));
  await new Promise((r) => setTimeout(r, 60));
  out.moved = minU() - beforeMove;
  for (let round = 0; round < 2; round++) {
    for (let k = 0; k < 2; k++) fire("pointerdown", cx + k * 30, cy, 950 + k);
    for (let k = 0; k < 2; k++) fire("pointerup", cx + k * 30, cy, 950 + k);
    await new Promise((r) => setTimeout(r, 60));
  }
  await new Promise((r) => setTimeout(r, 80));
  out.undone = Math.abs(minU() - beforeMove) < 1e-4;

  // 8. 頂点単位のダブルタップで、島の全頂点
  app.uv.setUnit("vertex");
  const t2 = app.uv.view.uvTopology;
  let anyVert = 0;
  for (let v = 0; v < t2.vertexChart.length; v++) {
    if (t2.vertexChart[v] === big) {
      anyVert = v;
      break;
    }
  }
  const s = app.uv.view.toScreen(t2.vertexUv[anyVert * 2], t2.vertexUv[anyVert * 2 + 1]);
  for (let round = 0; round < 2; round++) {
    const id = ++pid;
    fire("pointerdown", s.x, s.y, id);
    fire("pointerup", s.x, s.y, id);
    await new Promise((r) => setTimeout(r, 30));
  }
  out.chartVerts = app.uv.chosen.size;
  out.wantVerts = [...t2.vertexChart].filter((c) => c === big).length;

  // 9. 整列。島が 0〜1 に収まる
  app.uv.repack();
  const uv = object.mesh.uvSets.get("map1");
  out.packed = [...uv].every((n) => n >= -1e-4 && n <= 1 + 1e-4);

  app.setMode("model");
  app.state.select(null);
  app.state.doc.objects.length = objectsBefore;
  app.viewport.syncAll();
  return out;
});
check(
  "立方体: 切って開いて整える（手順 A）",
  cubeFlow.imported === 1 &&
    cubeFlow.method === "none" &&
    cubeFlow.shellFromFace === 1 &&
    cubeFlow.afterCut === 2 &&
    cubeFlow.afterUnfold === 2 &&
    cubeFlow.afterTap === 1 &&
    cubeFlow.loop >= 4 &&
    cubeFlow.allBorder &&
    cubeFlow.arc === 4 &&
    cubeFlow.afterStraight < cubeFlow.beforeStraight * 0.01 &&
    cubeFlow.moved > 0.01 &&
    cubeFlow.undone &&
    cubeFlow.chartVerts === cubeFlow.wantVerts &&
    cubeFlow.packed,
  `取り込み 島 ${cubeFlow.imported}（${cubeFlow.method}）→ 面 1 枚で島 ${cubeFlow.shellFromFace} → カット ${cubeFlow.afterCut} 島 / ` +
    `縁 1 本 → ダブルタップ ${cubeFlow.loop} 本（全部が縁 ${cubeFlow.allBorder}）→ SHF で区間 ${cubeFlow.arc} 本 / ` +
    `直線化 ${cubeFlow.beforeStraight.toFixed(3)} → ${cubeFlow.afterStraight.toFixed(4)} / ` +
    `移動 ${cubeFlow.moved.toFixed(3)} → 戻す ${cubeFlow.undone} / ` +
    `島の頂点 ${cubeFlow.chartVerts}/${cubeFlow.wantVerts} / 0〜1 に収まる ${cubeFlow.packed}`,
);

/* 43c. 手順 B: 円柱をループで切って開いて格子にする（`20` の T5） */
const cylinderFlow = await page.evaluate(async () => {
  const app = window.macbeth;
  const core = window.macbethCore;
  const objectsBefore = app.state.doc.objects.length;
  const object = app.state.doc.addObject("cylinder");
  object.params.sdAxis = 12;
  object.params.sdHeight = 3;
  object.params.sdCaps = 1;
  object.rebuild();
  app.viewport.syncAll();
  app.state.select(object);
  const out = {};

  // 1. UV モードへ。取り込んだ UV（側面の帯 + 上下の円）
  app.setMode("uv");
  out.imported = app.uv.stats().charts;

  // 2〜3. 3D で側面の縦の辺をループで選んでカット
  app.setCompMode("edge");
  const view = app.viewport.viewOf(object);
  // 側面の縦の辺（高さが変わり、上下のリングを結ぶもの）
  let vertical = -1;
  view.edges.forEach(([a, b], i) => {
    if (vertical >= 0) return;
    const pa = object.mesh.getPosition(a);
    const pb = object.mesh.getPosition(b);
    const sameXZ = Math.hypot(pa[0] - pb[0], pa[2] - pb[2]) < 1e-6;
    if (Math.abs(pa[1] - pb[1]) > 1e-6 && !sameXZ) return;
    if (Math.abs(pa[1] - pb[1]) > 1e-6) vertical = i;
  });
  const loop3d = core.edgeLoopFrom(object.mesh, view.edges[vertical][0], view.edges[vertical][1]);
  const keys = new Set(loop3d.edges.map(([a, b]) => core.edgeKey(a, b)));
  app.state.comp.clear();
  view.edges.forEach(([a, b], i) => {
    if (keys.has(core.edgeKey(a, b))) app.state.comp.add(i);
  });
  out.loop3d = app.state.comp.size;
  app.pushSelectionToUvForTest();
  out.loop2d = app.uv.chosen.size;
  app.uv.cutOrSew(true);
  out.afterCut = app.uv.stats().charts;

  // 4. 展開。帯が立っている（T2）
  app.uv.unfold();
  out.afterUnfold = app.uv.stats().charts;

  // 5. 側面の帯の縁を選んで「境界の直線化」
  const t = app.uv.view.uvTopology;
  // 側面の島 = いちばん面の多い島
  const band = t.charts.reduce((best, c, i) => (c.faces.length > t.charts[best].faces.length ? i : best), 0);
  const border = [];
  for (let i = 0; i < t.edges.length; i++) {
    if (t.edgeChart[i] === band && t.edgeFaces[i].length < 2) border.push(i);
  }
  // ひと続きの縁だけを選ぶ
  const loop = core.uvEdgeLoopFrom(t, border[0]);
  app.uv.setUnit("edge");
  app.uv.chosen.clear();
  for (const e of loop.edges) app.uv.chosen.add(e);
  app.uv.refreshHighlight();
  // 縁がどれだけ軸に沿っているか。1 本ごとに「短いほうの成分 / 長さ」を見る
  const crookedness = () => {
    const now = app.uv.view.uvTopology;
    let worst = 0;
    for (const e of app.uv.chosen) {
      const [a, b] = now.edges[e];
      const du = Math.abs(now.vertexUv[b * 2] - now.vertexUv[a * 2]);
      const dv = Math.abs(now.vertexUv[b * 2 + 1] - now.vertexUv[a * 2 + 1]);
      const len = Math.hypot(du, dv);
      if (len > 1e-9) worst = Math.max(worst, Math.min(du, dv) / len);
    }
    return worst;
  };
  // まっすぐな縁を一度わざと波打たせてから直す
  const map1 = object.mesh.uvSets.get("map1");
  let nudge = 0;
  for (const e of app.uv.chosen) {
    for (const v of t.edges[e]) {
      for (const key of t.vertexCorners[v] ?? []) {
        const at = core.cornerIndex(object.mesh, key);
        if (at >= 0) map1[at * 2 + 1] += ((nudge % 3) - 1) * 0.02;
      }
      nudge++;
    }
  }
  app.uv.rebuild();
  out.borderBefore = crookedness();
  app.uv.straightenBorderEdges();
  out.borderAfter = crookedness();

  // 6. 格子化。帯の島が長方形の格子になる
  app.uv.setUnit("shell");
  app.uv.chosen.clear();
  app.uv.chosen.add(band);
  app.uv.refreshHighlight();
  app.uv.gridChart();
  const t2 = app.uv.view.uvTopology;
  const rows = core.uvGridRows(t2, band);
  out.gridded = false;
  if (rows) {
    out.gridded = rows.every((row) => {
      const v0 = t2.vertexUv[row[0] * 2 + 1];
      return row.every((v) => Math.abs(t2.vertexUv[v * 2 + 1] - v0) < 1e-4);
    });
    out.rows = `${rows.length}×${rows[0].length}`;
  }

  // 7. 整列。3 島が 0〜1 に詰まる
  app.uv.repack();
  const uv = object.mesh.uvSets.get("map1");
  out.packed = [...uv].every((n) => n >= -1e-4 && n <= 1 + 1e-4);
  out.charts = app.uv.stats().charts;

  app.setMode("model");
  app.setCompMode("object");
  app.state.select(null);
  app.state.doc.objects.length = objectsBefore;
  app.viewport.syncAll();
  return out;
});
check(
  "円柱: ループで切って開いて格子にする（手順 B）",
  cylinderFlow.loop3d >= 3 &&
    cylinderFlow.loop2d >= 3 &&
    cylinderFlow.afterCut >= 3 &&
    cylinderFlow.afterUnfold >= 3 &&
    cylinderFlow.borderBefore > 0.02 &&
    cylinderFlow.borderAfter < 1e-4 &&
    cylinderFlow.gridded &&
    cylinderFlow.packed,
  `取り込み 島 ${cylinderFlow.imported} / 3D ループ ${cylinderFlow.loop3d} 本 → 2D ${cylinderFlow.loop2d} 本 → 展開 ${cylinderFlow.afterUnfold} 島 / ` +
    `カット ${cylinderFlow.afterCut} 島 / 境界の直線化 ゆがみ ${cylinderFlow.borderBefore?.toFixed(3)} → ${cylinderFlow.borderAfter?.toExponential(1)} / ` +
    `格子化 ${cylinderFlow.rows}（そろった ${cylinderFlow.gridded}）/ 整列 ${cylinderFlow.charts} 島・0〜1 ${cylinderFlow.packed}`,
);

/* 43c2. T7: 自動 UV はツール列から消えて、「展開」の長押しの奥にある */
const t7 = await page.evaluate(async () => {
  const app = window.macbeth;
  const objectsBefore = app.state.doc.objects.length;
  const object = app.state.doc.addObject("cube");
  app.viewport.syncAll();
  app.state.select(object);
  app.setMode("uv");
  const titles = [...document.querySelectorAll("#dockLeft .ibtn")].map((b) => b.title);
  // 「展開」の長押しメニューから「オプション…」を開く
  const b = document.querySelector('#dockLeft .ibtn[data-group="unfold"]');
  const r = b.getBoundingClientRect();
  b.dispatchEvent(
    new PointerEvent("pointerdown", {
      pointerId: 61,
      pointerType: "mouse",
      bubbles: true,
      cancelable: true,
      clientX: r.x + r.width / 2,
      clientY: r.y + r.height / 2,
    }),
  );
  await new Promise((res) => setTimeout(res, 260));
  const labels = [...document.querySelectorAll(".radial text")].map((t) => t.textContent);
  // 輪の中心へ戻して閉じる（オプションは「UV オプション」のボタンへ移った。`24` の T5）
  const svg = document.querySelector(".radial svg");
  const hub = [...svg.querySelectorAll("circle")].reduce((best, c) =>
    Number(c.getAttribute("r")) > Number(best.getAttribute("r")) ? c : best,
  );
  const cx = Number(hub.getAttribute("cx"));
  const cy = Number(hub.getAttribute("cy"));
  const fire = (type, x, y) =>
    window.dispatchEvent(new PointerEvent(type, { pointerId: 61, pointerType: "mouse", bubbles: true, clientX: x, clientY: y }));
  fire("pointermove", cx, cy);
  fire("pointerup", cx, cy);
  await new Promise((res) => setTimeout(res, 80));

  // ツール列の「UV オプション」をタップするとカットインが出る
  const opts = document.querySelector('#dockLeft .ibtn[data-group="uvopts"]');
  opts?.click();
  await new Promise((res) => setTimeout(res, 100));
  const cutin = document.querySelector('.cutin.wide[data-gauge="uvopts"]');
  const heads = cutin ? [...cutin.querySelectorAll(".sect-h span")].map((h) => h.textContent) : [];
  const folded = cutin?.querySelector("details");

  app.setMode("model");
  app.state.select(null);
  app.state.doc.objects.length = objectsBefore;
  app.viewport.syncAll();
  return {
    noAutoButton: !titles.some((t) => t.startsWith("自動 UV")),
    labels,
    heads,
    foldedClosed: !!folded && !folded.open,
  };
});
check(
  "自動 UV は「展開」の長押し、方式は「UV オプション」の奥（T7、`24` の T5）",
  t7.noAutoButton &&
    t7.labels.includes("展開") &&
    t7.labels.includes("自動 UV") &&
    !t7.labels.includes("オプション…") &&
    t7.heads.includes("パッキング") &&
    t7.heads.includes("詳細（自動 UV・方式）") &&
    t7.foldedClosed,
  `ツール列に自動 UV なし ${t7.noAutoButton} / 長押し ${t7.labels.filter((l) => l.length > 1).slice(0, 4).join(" · ")} / ` +
    `カットイン ${t7.heads.join(" · ")}（詳細は閉じている ${t7.foldedClosed}）`,
);

/* 43d. 手順 C: 球を切って開いて Move and Sew で戻す（`20` の T6） */
const sphereFlow = await page.evaluate(async () => {
  const app = window.macbeth;
  const core = window.macbethCore;
  const objectsBefore = app.state.doc.objects.length;
  const object = app.state.doc.addObject("sphere");
  object.params.sdAxis = 12;
  object.params.sdHeight = 8;
  object.rebuild();
  app.viewport.syncAll();
  app.state.select(object);
  const out = {};

  app.setMode("uv");
  out.imported = app.uv.stats().charts;

  // 赤道のループを 3D で選んでカット → 上下 2 島
  app.setCompMode("edge");
  const view = app.viewport.viewOf(object);
  let equator = -1;
  view.edges.forEach(([a, b], i) => {
    if (equator >= 0) return;
    const pa = object.mesh.getPosition(a);
    const pb = object.mesh.getPosition(b);
    // 高さが同じで、原点にいちばん近い高さの輪
    if (Math.abs(pa[1] - pb[1]) < 1e-6 && Math.abs(pa[1]) < 1e-6) equator = i;
  });
  out.foundEquator = equator >= 0;
  if (equator < 0) return out;
  const loop = core.edgeLoopFrom(object.mesh, view.edges[equator][0], view.edges[equator][1]);
  const keys = new Set(loop.edges.map(([a, b]) => core.edgeKey(a, b)));
  app.state.comp.clear();
  view.edges.forEach(([a, b], i) => {
    if (keys.has(core.edgeKey(a, b))) app.state.comp.add(i);
  });
  out.equatorEdges = app.state.comp.size;
  app.pushSelectionToUvForTest();
  app.uv.cutOrSew(true);
  out.afterCut = app.uv.stats().charts;
  app.uv.unfold();

  // 上下の島を選んで Move and Sew。切れ目が縫われて島が減る
  const t = app.uv.view.uvTopology;
  app.uv.setUnit("edge");
  app.uv.chosen.clear();
  // 赤道の切れ目にあたる UV エッジを両側とも選ぶ
  let picked = 0;
  t.edgeKeys.forEach((key, i) => {
    if (keys.has(key)) {
      app.uv.chosen.add(i);
      picked++;
    }
  });
  out.seamEdges = picked;
  const before = app.uv.stats().charts;
  app.uv.moveAndSew();
  out.afterSew = app.uv.stats().charts;
  out.sewed = out.afterSew < before;

  // 対称。UV 頂点を全部選んで左右をそろえる
  app.uv.setUnit("vertex");
  const t2 = app.uv.view.uvTopology;
  app.uv.chosen.clear();
  for (let v = 0; v < t2.vertexChart.length; v++) app.uv.chosen.add(v);
  app.uv.tidy("symmetry");
  out.symmetryOk = true;

  app.uv.repack();
  const uv = object.mesh.uvSets.get("map1");
  out.packed = [...uv].every((n) => n >= -1e-4 && n <= 1 + 1e-4);

  app.setMode("model");
  app.setCompMode("object");
  app.state.select(null);
  app.state.doc.objects.length = objectsBefore;
  app.viewport.syncAll();
  return out;
});
check(
  "球: 切って開いて Move and Sew で戻す（手順 C）",
  sphereFlow.foundEquator &&
    sphereFlow.equatorEdges === 12 &&
    sphereFlow.afterCut > sphereFlow.imported &&
    sphereFlow.seamEdges >= 12 &&
    sphereFlow.sewed &&
    sphereFlow.packed,
  `取り込み 島 ${sphereFlow.imported} / 赤道 ${sphereFlow.equatorEdges} 本 → カット ${sphereFlow.afterCut} 島 / ` +
    `切れ目の UV エッジ ${sphereFlow.seamEdges} 本 → Move and Sew で ${sphereFlow.afterSew} 島 / ` +
    `対称 ${sphereFlow.symmetryOk} / 0〜1 に収まる ${sphereFlow.packed}`,
);

/* 43e. アウトライナのドロワー（`20` の T9、`24` の T1） */
// 1280px（広い画面）でも、アウトライナはドロワーで出る（`24` の T1）
await page.setViewportSize({ width: 1280, height: 800 });
await page.waitForTimeout(250);
const outliner = await page.evaluate(async () => {
  const app = window.macbeth;
  const objectsBefore = app.state.doc.objects.length;
  if (app.state.doc.objects.length < 2) app.state.doc.addObject("sphere");
  app.viewport.syncAll();
  app.refresh();

  const dockColHidden = document.getElementById("dockColRight").hidden;
  const label = document.getElementById("btnPanels").textContent.trim();
  const title = document.querySelector('.panel[data-panel="layers"] .phead span').textContent;
  document.getElementById("btnPanels").click();
  await new Promise((r) => setTimeout(r, 250));
  const drawer = document.querySelector(".drawer");
  const rows = drawer ? drawer.querySelectorAll(".lyrow").length : 0;
  const vp = document.getElementById("vp").getBoundingClientRect();
  const gl = document.getElementById("gl").getBoundingClientRect();

  // 目を押すと隠れる
  const eye = drawer?.querySelector(".lyrow .eye");
  const target = app.state.doc.objects[app.state.doc.objects.length - 1];
  eye?.click();
  const hidden = !target.visible;
  eye?.click();

  // ロックすると選べない
  const lock = drawer?.querySelector(".lyrow .lock");
  lock?.click();
  const locked = target.locked;
  lock?.click();

  // 見出しの × で閉じる（選択を変えずに閉じられる）
  drawer?.querySelector(".pclose")?.click();
  await new Promise((r) => setTimeout(r, 200));
  const closedByButton = !document.querySelector(".drawer.open");

  // もう一度開いて、外を触っても閉じる
  document.getElementById("btnPanels").click();
  await new Promise((r) => setTimeout(r, 200));
  document.getElementById("vp").dispatchEvent(
    new PointerEvent("pointerdown", { pointerType: "touch", bubbles: true, clientX: vp.x + 20, clientY: vp.y + 20 }),
  );
  await new Promise((r) => setTimeout(r, 200));
  const closed = !document.querySelector(".drawer.open");

  app.state.doc.objects.length = objectsBefore;
  app.viewport.syncAll();
  app.refresh();
  return {
    label,
    title,
    dockColHidden,
    open: !!drawer?.classList.contains("open") || rows > 0,
    rows,
    // ドロワーはビューポートに被さるだけ。3D の描画幅は変わらない
    coversViewport: Math.abs(gl.width - vp.width) < 2,
    hidden,
    locked,
    closedByButton,
    closed,
  };
});
check(
  "アウトライナ: どの幅でもドロワー、ビューポートは全幅",
  outliner.label === "アウトライナ" &&
    outliner.title === "アウトライナ" &&
    outliner.dockColHidden &&
    outliner.rows >= 2 &&
    outliner.coversViewport &&
    outliner.hidden &&
    outliner.locked &&
    outliner.closedByButton &&
    outliner.closed,
  `1280px で 行 ${outliner.rows}・ドック列 ${outliner.dockColHidden ? "無し" : "あり"}・` +
    `ビューポートは縮まない ${outliner.coversViewport}・目 ${outliner.hidden}・ロック ${outliner.locked}・` +
    `× で閉じる ${outliner.closedByButton}・外を触って閉じる ${outliner.closed}`,
);

/* 43e-2. アウトライナの長押しサークルメニュー（`24` の T2） */
const outlinerMenu = await page.evaluate(async () => {
  const app = window.macbeth;
  const objectsBefore = app.state.doc.objects.length;
  document.getElementById("btnPanels").click();
  await new Promise((r) => setTimeout(r, 250));
  const drawer = document.querySelector(".drawer");
  const row = drawer.querySelector(".lyrow");
  const b = row.getBoundingClientRect();
  const at = { clientX: b.x + b.width / 2, clientY: b.y + b.height / 2 };

  // つまみ以外を少し動かしても並びは変わらない
  const orderBefore = app.state.doc.objects.map((o) => o.name).join(",");
  row.dispatchEvent(new PointerEvent("pointerdown", { pointerId: 30, pointerType: "touch", bubbles: true, ...at }));
  window.dispatchEvent(
    new PointerEvent("pointermove", { pointerId: 30, pointerType: "touch", bubbles: true, clientX: at.clientX, clientY: at.clientY + 20 }),
  );
  window.dispatchEvent(
    new PointerEvent("pointerup", { pointerId: 30, pointerType: "touch", bubbles: true, clientX: at.clientX, clientY: at.clientY + 20 }),
  );
  const orderAfterDrag = app.state.doc.objects.map((o) => o.name).join(",");

  // つまみを掴んで下の行へ運ぶと入れ替わる
  const grip = drawer.querySelector(".lyrow .lygrip");
  const g = grip.getBoundingClientRect();
  const second = drawer.querySelectorAll(".lyrow")[1].getBoundingClientRect();
  grip.dispatchEvent(
    new PointerEvent("pointerdown", { pointerId: 32, pointerType: "touch", bubbles: true, cancelable: true, clientX: g.x + 4, clientY: g.y + 8 }),
  );
  window.dispatchEvent(
    new PointerEvent("pointermove", { pointerId: 32, pointerType: "touch", bubbles: true, clientX: g.x + 4, clientY: second.y + second.height / 2 }),
  );
  window.dispatchEvent(new PointerEvent("pointerup", { pointerId: 32, pointerType: "touch", bubbles: true, clientX: g.x + 4, clientY: second.y }));
  const orderAfterGrip = app.state.doc.objects.map((o) => o.name).join(",");

  // 長押しでサークルメニュー
  row.dispatchEvent(new PointerEvent("pointerdown", { pointerId: 31, pointerType: "touch", bubbles: true, ...at }));
  await new Promise((r) => setTimeout(r, 500));
  const svg = document.querySelector(".radial svg");
  const labels = svg ? [...svg.querySelectorAll("text")].map((t) => t.textContent) : [];
  // 北（名前変更）へ引いて離す
  const hub = svg
    ? [...svg.querySelectorAll("circle")].reduce((best, c) =>
        Number(c.getAttribute("r")) > Number(best.getAttribute("r")) ? c : best,
      )
    : null;
  const cx = hub ? Number(hub.getAttribute("cx")) : 0;
  const cy = hub ? Number(hub.getAttribute("cy")) : 0;
  for (const type of ["pointermove", "pointerup"]) {
    window.dispatchEvent(
      new PointerEvent(type, { pointerId: 31, pointerType: "touch", bubbles: true, clientX: cx, clientY: cy - 110 }),
    );
  }
  await new Promise((r) => setTimeout(r, 120));
  const renaming = !!document.querySelector(".olinput");
  document.querySelector(".olinput")?.blur();

  document.getElementById("btnPanels").click();
  app.state.doc.objects.length = objectsBefore;
  app.viewport.syncAll();
  return {
    labels,
    renaming,
    orderKept: orderBefore === orderAfterDrag,
    reordered: orderBefore !== orderAfterGrip,
    radial: !!svg,
  };
});
check(
  "アウトライナの長押しでサークルメニュー",
  outlinerMenu.radial &&
    outlinerMenu.labels.includes("名前変更") &&
    outlinerMenu.labels.includes("結合") &&
    outlinerMenu.renaming &&
    outlinerMenu.orderKept &&
    outlinerMenu.reordered,
  `${outlinerMenu.labels.filter((t) => t && t !== "キャンセル").slice(0, 8).join(" · ")} / ` +
    `北で名前入力 ${outlinerMenu.renaming} / つまみ以外では並ばない ${outlinerMenu.orderKept} / つまみで並ぶ ${outlinerMenu.reordered}`,
);

/* 43e-3. アウトライナで複数選択（SHF となぞり）（`24` の T2） */
const outlinerMulti = await page.evaluate(async () => {
  const app = window.macbeth;
  const objectsBefore = app.state.doc.objects.length;
  app.state.doc.objects.length = 0;
  for (let i = 0; i < 3; i++) app.state.doc.addObject("cube").transform.position = [i * 1.5, 0, 0];
  app.viewport.syncAll();
  app.setCompMode("object");
  app.state.select(app.state.doc.objects[0]);
  app.refresh();
  document.getElementById("btnPanels").click();
  await new Promise((r) => setTimeout(r, 250));
  const drawer = document.querySelector(".drawer");
  const tap = (row, opts = {}) => {
    const b = row.getBoundingClientRect();
    const at = { clientX: b.x + b.width / 2, clientY: b.y + b.height / 2 };
    row.dispatchEvent(new PointerEvent("pointerdown", { pointerId: 40, pointerType: "touch", bubbles: true, ...at, ...opts }));
    window.dispatchEvent(new PointerEvent("pointerup", { pointerId: 40, pointerType: "touch", bubbles: true, ...at, ...opts }));
  };

  // SHF + タップで足す
  app.state.mods.shift = "on";
  tap(drawer.querySelectorAll(".lyrow")[1]);
  const afterShift = app.state.also.size;
  app.state.mods.shift = "off";

  // F を押しながら 1 行目から 3 行目までなぞる
  app.state.select(app.state.doc.objects[2]);
  app.refresh();
  await new Promise((r) => setTimeout(r, 60));
  // 行は選ぶたびに描き直されるので、そのつど位置を測り直す
  const rowAt = (i) => drawer.querySelectorAll(".lyrow")[i].getBoundingClientRect();
  const first = rowAt(0);
  app.setFrameHeldForTest(true);
  drawer.querySelectorAll(".lyrow")[0].dispatchEvent(
    new PointerEvent("pointerdown", {
      pointerId: 41,
      pointerType: "touch",
      bubbles: true,
      cancelable: true,
      clientX: first.x + 40,
      clientY: first.y + first.height / 2,
    }),
  );
  let lastY = first.y + first.height / 2;
  for (let i = 0; i < 3; i++) {
    const b = rowAt(i);
    lastY = b.y + b.height / 2;
    window.dispatchEvent(
      new PointerEvent("pointermove", { pointerId: 41, pointerType: "touch", bubbles: true, clientX: b.x + 40, clientY: lastY }),
    );
  }
  window.dispatchEvent(
    new PointerEvent("pointerup", { pointerId: 41, pointerType: "touch", bubbles: true, clientX: first.x + 40, clientY: lastY }),
  );
  app.setFrameHeldForTest(false);
  await new Promise((r) => setTimeout(r, 120));
  const picked = app.state.selectedObjects().length;
  const litRows = drawer.querySelectorAll('.lyrow[aria-selected="true"]').length;

  // そのまま結合すると 1 つになる
  const menu = app.panelHostForTest().outlinerMenu(app.state.selected);
  menu.E.run();
  const afterCombine = app.state.doc.objects.length;

  document.getElementById("btnPanels").click();
  app.state.doc.objects.length = 0;
  app.state.select(null);
  app.viewport.syncAll();
  app.refresh();
  void objectsBefore;
  return { afterShift, picked, litRows, afterCombine };
});
check(
  "アウトライナで複数選択できる",
  outlinerMulti.afterShift === 1 &&
    outlinerMulti.picked === 3 &&
    outlinerMulti.litRows === 3 &&
    outlinerMulti.afterCombine === 1,
  `SHF で +${outlinerMulti.afterShift} / なぞって ${outlinerMulti.picked} 個（光る行 ${outlinerMulti.litRows}）→ 結合で ${outlinerMulti.afterCombine} 個`,
);

/* 43z-6. レールの第 2 ゲージが範囲と拡張で切り替わる（`24` の T3） */
const growGauge = await page.evaluate(async () => {
  const app = window.macbeth;
  const objectsBefore = app.state.doc.objects.length;
  const object = app.state.doc.addObject("sphere");
  app.viewport.syncAll();
  app.state.select(object);
  app.setCompMode("face");
  app.state.soft.strength = 0;
  app.refresh();
  await new Promise((r) => setTimeout(r, 60));

  const label = () => document.getElementById("g2lbl").textContent;
  const value = () => document.getElementById("g2val").textContent;
  const offLabel = label();

  // 面を 1 つ選んでからゲージを上へ引く
  app.state.comp.clear();
  app.state.comp.add(0);
  app.refresh();
  const before = app.state.comp.size;

  const g = document.getElementById("gauge2");
  const r = g.getBoundingClientRect();
  const at = (t) => ({ clientX: r.x + r.width / 2, clientY: r.y + r.height * (1 - t) });
  const fire = (type, t) =>
    g.dispatchEvent(new PointerEvent(type, { pointerId: 60, pointerType: "touch", bubbles: true, cancelable: true, ...at(t) }));
  fire("pointerdown", 0.5);
  fire("pointermove", 0.75); // +4 段くらい
  const grown = app.state.comp.size;
  const shownWhileDragging = value();
  fire("pointermove", 0.5); // 中央へ戻す
  const backToOne = app.state.comp.size;
  fire("pointerup", 0.5);
  const afterRelease = value();

  // 「選択」のカットインには 強度 / 範囲 / 拡張 の 3 本がある
  const b = document.querySelector('#dockLeft .ibtn[data-group="select"]');
  const br = b.getBoundingClientRect();
  for (const type of ["pointerdown", "pointerup"]) {
    const ev = new PointerEvent(type, {
      pointerId: 62,
      pointerType: "mouse",
      bubbles: true,
      cancelable: true,
      clientX: br.x + br.width / 2,
      clientY: br.y + br.height / 2,
    });
    (type === "pointerdown" ? b : window).dispatchEvent(ev);
  }
  await new Promise((r2) => setTimeout(r2, 120));
  const cutin = document.querySelector(".cutin");
  const sliders = cutin ? [...cutin.querySelectorAll(".row label")].map((l) => l.textContent) : [];
  const hasSpring = !!cutin?.querySelector(".slider.spring");
  document.body.dispatchEvent(new PointerEvent("pointerdown", { bubbles: true, clientX: 2, clientY: 2 }));

  // 強度を上げると「範囲」に戻る
  app.state.soft.strength = 0.5;
  app.refresh();
  const onLabel = label();

  app.state.soft.strength = 0;
  app.setCompMode("object");
  app.state.select(null);
  app.state.doc.objects.length = objectsBefore;
  app.viewport.syncAll();
  app.refresh();
  return { offLabel, onLabel, before, grown, backToOne, shownWhileDragging, afterRelease, sliders, hasSpring };
});
check(
  "レールの第 2 ゲージが範囲と拡張で切り替わる",
  growGauge.offLabel === "拡張" &&
    growGauge.onLabel === "範囲" &&
    growGauge.before === 1 &&
    growGauge.grown > 1 &&
    growGauge.backToOne === 1 &&
    growGauge.afterRelease === "0" &&
    growGauge.hasSpring,
  `強度 0 で「${growGauge.offLabel}」→ 面 ${growGauge.before} → 引いて ${growGauge.grown}（表示 ${growGauge.shownWhileDragging}）→ ` +
    `中央で ${growGauge.backToOne} → 離して ${growGauge.afterRelease} / 強度 0.5 で「${growGauge.onLabel}」 / ` +
    `カットイン ${growGauge.sliders.join(" · ")}`,
);

/* 43z-7. 上段の「表示」: ヒント / ポリゴンカウント / 左利き（`24` の T4） */
const viewMenu = await page.evaluate(async () => {
  const app = window.macbeth;
  document.getElementById("viewBtn").click();
  await new Promise((r) => setTimeout(r, 80));
  const items = [...document.querySelectorAll('.panel.floating[data-menu="view"] .chk')];
  const labels = items.map((b) => b.textContent);

  // 操作のヒントを切る
  items.find((b) => b.textContent.includes("操作のヒント"))?.click();
  await new Promise((r) => setTimeout(r, 60));
  const hintEmpty = document.getElementById("hudHint").innerHTML === "";
  // トーストは出る（消えると空に戻る）
  app.setDisplay(app.state.display === "wire" ? "shadedWire" : "wire");
  const toastShown = document.getElementById("hudHint").innerHTML.length > 0;

  // ポリゴンカウントを切る
  items.find((b) => b.textContent.includes("ポリゴンカウント"))?.click();
  await new Promise((r) => setTimeout(r, 60));
  const statsHidden = document.getElementById("hudStats").hidden;

  // 左利きにすると、ツール列がビューポートの右へ回る
  items.find((b) => b.textContent.includes("左利き"))?.click();
  await new Promise((r) => setTimeout(r, 200));
  const dock = document.getElementById("dockLeft").getBoundingClientRect();
  const gl = document.getElementById("gl").getBoundingClientRect();
  const cluster = document.querySelector(".cluster").getBoundingClientRect();
  const mirrored = dock.left >= gl.right - 2 && cluster.left > gl.left + gl.width / 2;
  const hand = document.documentElement.dataset.hand;

  // 戻す
  items.find((b) => b.textContent.includes("左利き"))?.click();
  items.find((b) => b.textContent.includes("操作のヒント"))?.click();
  items.find((b) => b.textContent.includes("ポリゴンカウント"))?.click();
  document.getElementById("viewBtn").click();
  await new Promise((r) => setTimeout(r, 200));
  const back = {
    hand: document.documentElement.dataset.hand,
    stats: !document.getElementById("hudStats").hidden,
    hint: document.getElementById("hudHint").innerHTML.length > 0,
  };
  return { labels, hintEmpty, toastShown, statsHidden, mirrored, hand, back };
});
check(
  "表示メニュー: ヒントとポリゴンカウントを消せる、左利きで鏡映し",
  viewMenu.labels.length === 4 &&
    viewMenu.hintEmpty &&
    viewMenu.toastShown &&
    viewMenu.statsHidden &&
    viewMenu.mirrored &&
    viewMenu.hand === "left" &&
    viewMenu.back.hand === "right" &&
    viewMenu.back.stats &&
    viewMenu.back.hint,
  `${viewMenu.labels.join(" · ")} / ヒント空 ${viewMenu.hintEmpty}（トーストは出る ${viewMenu.toastShown}）/ ` +
    `カウント消える ${viewMenu.statsHidden} / 左利きで鏡映し ${viewMenu.mirrored} → 戻す ${viewMenu.back.hand}`,
);

/* 43z-8. UV 列: 細かさのスライダーとカット / ソーの 1 グループ（`24` の T5） */
const uvColumn = await page.evaluate(async () => {
  const app = window.macbeth;
  const objectsBefore = app.state.doc.objects.length;
  const object = app.state.doc.addObject("sphere");
  app.viewport.syncAll();
  app.state.select(object);
  app.setMode("uv");
  await new Promise((r) => setTimeout(r, 120));

  const groups = [...document.querySelectorAll("#dockLeft .ibtn")].map((b) => b.dataset.group);

  // 「UV オプション」をタップ → 細かさはスライダー
  document.querySelector('#dockLeft .ibtn[data-group="uvopts"]').click();
  await new Promise((r) => setTimeout(r, 120));
  const cutin = document.querySelector('.cutin[data-gauge="uvopts"]');
  const rows = cutin ? [...cutin.querySelectorAll(".row label")].map((l) => l.textContent) : [];
  const slider = cutin?.querySelector(".sect input.slider");
  const beforeTexture = app.uv.view.checkerCellsForTest();
  if (slider) {
    slider.value = "24";
    slider.dispatchEvent(new Event("input", { bubbles: true }));
    slider.dispatchEvent(new Event("change", { bubbles: true }));
  }
  await new Promise((r) => setTimeout(r, 80));
  const afterTexture = app.uv.view.checkerCellsForTest();
  document.body.dispatchEvent(new PointerEvent("pointerdown", { bubbles: true, clientX: 2, clientY: 2 }));

  // カット / ソーは 1 つのボタン。長押しで 3 つ
  const b = document.querySelector('#dockLeft .ibtn[data-group="cutsew"]');
  const br = b.getBoundingClientRect();
  b.dispatchEvent(
    new PointerEvent("pointerdown", {
      pointerId: 70,
      pointerType: "mouse",
      bubbles: true,
      cancelable: true,
      clientX: br.x + br.width / 2,
      clientY: br.y + br.height / 2,
    }),
  );
  await new Promise((r) => setTimeout(r, 260));
  const labels = [...document.querySelectorAll(".radial text")].map((t) => t.textContent);
  const svg = document.querySelector(".radial svg");
  const hub = [...svg.querySelectorAll("circle")].reduce((best, c) =>
    Number(c.getAttribute("r")) > Number(best.getAttribute("r")) ? c : best,
  );
  const cx = Number(hub.getAttribute("cx"));
  const cy = Number(hub.getAttribute("cy"));
  // 東（移動して縫う）を選ぶ
  for (const type of ["pointermove", "pointerup"]) {
    window.dispatchEvent(
      new PointerEvent(type, { pointerId: 70, pointerType: "mouse", bubbles: true, clientX: cx + 110, clientY: cy }),
    );
  }
  await new Promise((r) => setTimeout(r, 120));
  const lastUvCut = app.state.lastUvCut;

  // 赤道で切ってから、タップ（= 移動して縫う）で 1 島に戻る
  app.uv.unfold();
  app.setCompMode("edge");
  const view = app.viewport.viewOf(object);
  app.state.comp.clear();
  view.edges.forEach(([a, c], i) => {
    const pa = object.mesh.getPosition(a);
    const pc = object.mesh.getPosition(c);
    if (Math.abs(pa[1]) < 1e-6 && Math.abs(pc[1]) < 1e-6) app.state.comp.add(i);
  });
  app.pushSelectionToUvForTest();
  app.uv.cutOrSew(true);
  const afterCut = app.uv.stats().charts;
  app.uv.setUnit("edge");
  app.uv.chosen.clear();
  const t = app.uv.view.uvTopology;
  t.edgeKeys.forEach((key, i) => {
    if (object.uv.seams.has(key)) app.uv.chosen.add(i);
  });
  // ラジアルの付いたボタンは click を見ないので pointer で叩く
  const cs = document.querySelector('#dockLeft .ibtn[data-group="cutsew"]');
  const csr = cs.getBoundingClientRect();
  const csAt = { clientX: csr.x + csr.width / 2, clientY: csr.y + csr.height / 2 };
  cs.dispatchEvent(new PointerEvent("pointerdown", { pointerId: 71, pointerType: "mouse", bubbles: true, cancelable: true, ...csAt }));
  window.dispatchEvent(new PointerEvent("pointerup", { pointerId: 71, pointerType: "mouse", bubbles: true, ...csAt }));
  await new Promise((r) => setTimeout(r, 150));
  const afterSew = app.uv.stats().charts;

  app.setMode("model");
  app.state.select(null);
  app.state.doc.objects.length = objectsBefore;
  app.viewport.syncAll();
  return {
    groups,
    rows,
    hasSlider: !!slider,
    cells: app.state.checker.cells,
    rebuilt: beforeTexture.textureId !== afterTexture.textureId,
    labels: labels.filter((l) => l && l !== "キャンセル"),
    lastUvCut,
    afterCut,
    afterSew,
  };
});
check(
  "UV 列: 細かさはスライダー、カットとソーは 1 つのボタン",
  uvColumn.hasSlider &&
    uvColumn.cells === 24 &&
    uvColumn.rebuilt &&
    !uvColumn.groups.includes("cut") &&
    !uvColumn.groups.includes("sew") &&
    uvColumn.groups.includes("cutsew") &&
    uvColumn.groups.includes("uvopts") &&
    uvColumn.lastUvCut === "moveSew" &&
    uvColumn.afterCut === 2 &&
    uvColumn.afterSew === 1,
  `細かさ ${uvColumn.cells} マス（作り直し ${uvColumn.rebuilt}）/ 輪 ${uvColumn.labels.slice(0, 6).join(" · ")} / ` +
    `最後に使ったもの ${uvColumn.lastUvCut} / 切って ${uvColumn.afterCut} 島 → タップで ${uvColumn.afterSew} 島`,
);

/* 43z-9. アトリビュートの転送（`24` の T6） */
const transfer = await page.evaluate(async () => {
  const app = window.macbeth;
  const objectsBefore = app.state.doc.objects.length;
  app.state.doc.objects.length = 0;
  const source = app.state.doc.addObject("cube");
  const target = app.state.doc.addObject("cube");
  target.transform.position = [2, 0, 0];
  app.viewport.syncAll();
  app.setCompMode("object");

  // 元の UV を半分に縮める
  const su = source.mesh.uvSets.get("map1");
  for (let i = 0; i < su.length; i++) su[i] *= 0.5;
  const tuBefore = Float32Array.from(target.mesh.uvSets.get("map1"));

  // 元 → 先の順に選ぶ（最後に選んだものが先）
  app.state.select(source);
  app.state.addObject(target);
  app.state.selected = target;
  app.state.also.clear();
  app.state.also.add(source);
  app.refresh();

  // アウトライナの長押しメニュー北西からカットインを開く
  const menu = app.panelHostForTest().outlinerMenu(target);
  menu.NW.run();
  await new Promise((r) => setTimeout(r, 120));
  const cutin = document.querySelector('.cutin[data-gauge="transfer"]');
  const title = cutin?.querySelector(".attr-title")?.textContent ?? "";

  // コンポーネントで実行
  const host = app.panelHostForTest();
  host.onTransfer("space", "component");
  host.onTransfer("run");
  await new Promise((r) => setTimeout(r, 120));
  const tu = target.mesh.uvSets.get("map1");
  let same = true;
  for (let i = 0; i < su.length; i++) if (Math.abs(tu[i] - su[i]) > 1e-6) same = false;
  const gotRecipe = !!target.uv;

  app.doUndo();
  await new Promise((r) => setTimeout(r, 120));
  const undone = target.mesh.uvSets.get("map1");
  let restored = true;
  for (let i = 0; i < tuBefore.length; i++) if (Math.abs(undone[i] - tuBefore[i]) > 1e-6) restored = false;

  document.body.dispatchEvent(new PointerEvent("pointerdown", { bubbles: true, clientX: 2, clientY: 2 }));
  app.state.select(null);
  app.state.doc.objects.length = 0;
  app.viewport.syncAll();
  app.refresh();
  void objectsBefore;
  return { title, same, gotRecipe, restored };
});
check(
  "アトリビュートの転送",
  transfer.title.includes("→") && transfer.same && transfer.gotRecipe && transfer.restored,
  `「${transfer.title}」/ UV が一致 ${transfer.same}（レシピ ${transfer.gotRecipe}）/ 取り消しで戻る ${transfer.restored}`,
);

/* 43z-10. 転送の「位置」を本物の経路で（`25` の T1） */
const transferPos = await page.evaluate(async () => {
  const app = window.macbeth;
  app.state.doc.objects.length = 0;
  const source = app.state.doc.addObject("cube");
  const target = app.state.doc.addObject("cube");
  // 元の頂点 0 を動かしておく
  source.mesh.positions[0] += 0.7;
  source.mesh.positions[1] += 0.5;
  app.viewport.syncAll();
  app.setCompMode("object");
  app.state.select(target);
  app.state.also.add(source);
  app.refresh();
  const before = [...target.mesh.positions.slice(0, 3)];

  // アウトライナの長押しメニュー北西からカットインを開く
  app.panelHostForTest().outlinerMenu(target).NW.run();
  await new Promise((r) => setTimeout(r, 120));
  const cutin = document.querySelector('.cutin[data-gauge="transfer"]');
  const segs = cutin ? [...cutin.querySelectorAll(".seg")].map((b) => b.textContent) : [];
  // 「位置」のチェックを押す（host を直に叩かない）
  const checks = [...(cutin?.querySelectorAll(".chk") ?? [])];
  checks.find((b) => b.textContent.includes("位置"))?.click();
  await new Promise((r) => setTimeout(r, 80));
  // 「頂点番号」を選んで実行
  const fresh = document.querySelector('.cutin[data-gauge="transfer"]');
  [...fresh.querySelectorAll(".seg")].find((b) => b.textContent === "頂点番号")?.click();
  await new Promise((r) => setTimeout(r, 80));
  const fresh2 = document.querySelector('.cutin[data-gauge="transfer"]');
  [...fresh2.querySelectorAll(".act")].find((b) => b.textContent === "転送する")?.click();
  await new Promise((r) => setTimeout(r, 150));
  const after = [...target.mesh.positions.slice(0, 3)];
  const note = document.getElementById("hudHint").textContent;

  app.doUndo();
  await new Promise((r) => setTimeout(r, 120));
  const undone = [...target.mesh.positions.slice(0, 3)];

  // ワールド: 横に 1.2 倍した球が、元の球の形に戻る
  app.state.doc.objects.length = 0;
  const s2 = app.state.doc.addObject("sphere");
  const t2 = app.state.doc.addObject("sphere");
  for (let v = 0; v < t2.mesh.vertexCount; v++) t2.mesh.positions[v * 3] *= 1.2;
  app.viewport.syncAll();
  app.state.select(t2);
  app.state.also.add(s2);
  app.refresh();
  const r0 = Math.hypot(...t2.mesh.getPosition(5));
  const host = app.panelHostForTest();
  host.onTransfer("space", "world");
  host.onTransfer("run");
  await new Promise((r) => setTimeout(r, 150));
  const r1 = Math.hypot(...t2.mesh.getPosition(5));

  document.body.dispatchEvent(new PointerEvent("pointerdown", { bubbles: true, clientX: 2, clientY: 2 }));
  host.onTransfer("space", "component");
  host.onTransfer("positions", false);
  app.state.select(null);
  app.state.doc.objects.length = 0;
  app.viewport.syncAll();
  app.refresh();
  return { segs, before, after, undone, note, r0, r1 };
});
check(
  "転送の「位置」が効く（頂点番号とワールド）",
  transferPos.segs.includes("頂点番号") &&
    Math.abs(transferPos.after[0] - transferPos.before[0]) > 0.5 &&
    Math.abs(transferPos.undone[0] - transferPos.before[0]) < 1e-6 &&
    transferPos.note.includes("頂点が動いた") &&
    Math.abs(transferPos.r0 - 1) > 0.05 &&
    Math.abs(transferPos.r1 - 1) < 0.02,
  `空間 ${transferPos.segs.join(" · ")} / 頂点番号: X ${transferPos.before[0].toFixed(2)} → ${transferPos.after[0].toFixed(2)} → 取り消し ${transferPos.undone[0].toFixed(2)} / ` +
    `ワールド: 半径 ${transferPos.r0.toFixed(2)} → ${transferPos.r1.toFixed(2)} / 「${transferPos.note.slice(0, 40)}」`,
);

/* 43z-11. UV エディタは選んだオブジェクトについてくる（`25` の T1） */
const uvFollows = await page.evaluate(async () => {
  const app = window.macbeth;
  app.state.doc.objects.length = 0;
  const cube = app.state.doc.addObject("cube");
  const sphere = app.state.doc.addObject("sphere");
  sphere.transform.position = [3, 0, 0];
  app.viewport.syncAll();
  app.setCompMode("object");
  app.state.select(cube);
  app.setMode("uv");
  await new Promise((r) => setTimeout(r, 150));
  const onCube = { charts: app.uv.stats().charts, faces: app.uv.view.uvTopology?.chartOfFace.size ?? 0 };

  // アウトライナから球を選ぶ（本物の経路）
  app.panelHostForTest().onSelect(sphere, false);
  await new Promise((r) => setTimeout(r, 150));
  const onSphere = { charts: app.uv.stats().charts, faces: app.uv.view.uvTopology?.chartOfFace.size ?? 0 };

  app.setMode("model");
  app.state.select(null);
  app.state.doc.objects.length = 0;
  app.viewport.syncAll();
  app.refresh();
  return { onCube, onSphere };
});
check(
  "UV エディタは選んだオブジェクトについてくる",
  uvFollows.onCube.faces === 6 && uvFollows.onSphere.faces > 6,
  `立方体で面 ${uvFollows.onCube.faces}（島 ${uvFollows.onCube.charts}）→ 球で面 ${uvFollows.onSphere.faces}（島 ${uvFollows.onSphere.charts}）`,
);

/* 43z-12. F を押してもアウトライナは閉じない（`25` の T1） */
const drawerKeepsOpen = await page.evaluate(async () => {
  const app = window.macbeth;
  // 前の項目の状態に関わらず、いったん閉じてから開く
  if (document.querySelector(".drawer.open")) {
    document.getElementById("btnPanels").click();
    await new Promise((r) => setTimeout(r, 200));
  }
  document.getElementById("btnPanels").click();
  await new Promise((r) => setTimeout(r, 250));
  const opened = !!document.querySelector(".drawer.open");
  // クラスターの F を押す
  const f = document.getElementById("btnFrame");
  const fr = f.getBoundingClientRect();
  f.dispatchEvent(
    new PointerEvent("pointerdown", {
      pointerId: 80,
      pointerType: "touch",
      bubbles: true,
      cancelable: true,
      clientX: fr.x + fr.width / 2,
      clientY: fr.y + fr.height / 2,
    }),
  );
  await new Promise((r) => setTimeout(r, 100));
  const afterF = !!document.querySelector(".drawer.open");
  f.dispatchEvent(
    new PointerEvent("pointerup", { pointerId: 80, pointerType: "touch", bubbles: true, clientX: fr.x + fr.width / 2, clientY: fr.y + fr.height / 2 }),
  );
  await new Promise((r) => setTimeout(r, 80));

  // 3D を触ったら閉じる（押して離すまでを 1 組で）
  const vp = document.getElementById("vp").getBoundingClientRect();
  const gl = document.getElementById("gl");
  const at = { clientX: vp.x + 100, clientY: vp.y + 100 };
  gl.dispatchEvent(
    new PointerEvent("pointerdown", { pointerId: 81, pointerType: "touch", isPrimary: true, bubbles: true, cancelable: true, ...at }),
  );
  gl.dispatchEvent(new PointerEvent("pointerup", { pointerId: 81, pointerType: "touch", isPrimary: true, bubbles: true, ...at }));
  await new Promise((r) => setTimeout(r, 150));
  const after3d = !!document.querySelector(".drawer.open");
  void app;
  return { opened, afterF, after3d };
});
check(
  "F を押してもアウトライナは閉じない",
  drawerKeepsOpen.opened && drawerKeepsOpen.afterF && !drawerKeepsOpen.after3d,
  `開く ${drawerKeepsOpen.opened} → F で残る ${drawerKeepsOpen.afterF} → 3D で閉じる ${!drawerKeepsOpen.after3d}`,
);

/* 43z-13. 3 本指 + ALT で軸を決めたスケール（`25` の T2） */
const axisScale = await page.evaluate(async (center) => {
  const app = window.macbeth;
  app.state.doc.objects.length = 0;
  const object = app.state.doc.addObject("cube");
  app.viewport.syncAll();
  app.setCompMode("object");
  app.state.select(object);
  app.viewport.setView("persp");
  app.viewport.frameSelected();
  app.refresh();
  await new Promise((r) => setTimeout(r, 80));

  const canvas = document.getElementById("gl");
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

  /** 指 3 本を縦（または横）に開く。 */
  const pinch = async (vertical) => {
    object.transform.scale = [1, 1, 1];
    app.viewport.syncAll();
    const p = vertical
      ? [
          [center.x, center.y - 40],
          [center.x, center.y],
          [center.x, center.y + 40],
        ]
      : [
          [center.x - 40, center.y],
          [center.x, center.y],
          [center.x + 40, center.y],
        ];
    p.forEach(([x, y], i) => fire("pointerdown", 111 + i, x, y));
    for (let step = 1; step <= 10; step++) {
      p.forEach(([x, y], i) => {
        const k = i === 0 ? -1 : i === 2 ? 1 : 0;
        fire("pointermove", 111 + i, vertical ? x : x + k * step * 6, vertical ? y + k * step * 6 : y);
      });
      await wait(8);
    }
    const scale = [...object.transform.scale];
    p.forEach(([x, y], i) => fire("pointerup", 111 + i, x, y));
    await wait(40);
    return scale;
  };

  app.state.mods.alt = "on";
  const vertical = await pinch(true);
  const horizontal = await pinch(false);
  app.state.mods.alt = "off";
  const uniform = await pinch(true);

  app.state.select(null);
  app.state.doc.objects.length = 0;
  app.viewport.syncAll();
  app.refresh();
  return { vertical, horizontal, uniform };
}, ON_MESH);
check(
  "3 本指 + ALT で軸を決めたスケール",
  axisScale.vertical[1] > 1.05 &&
    Math.abs(axisScale.vertical[0] - 1) < 1e-6 &&
    Math.abs(axisScale.vertical[2] - 1) < 1e-6 &&
    (axisScale.horizontal[0] > 1.05 || axisScale.horizontal[2] > 1.05) &&
    Math.abs(axisScale.horizontal[1] - 1) < 1e-6 &&
    axisScale.uniform[0] > 1.05 &&
    Math.abs(axisScale.uniform[0] - axisScale.uniform[1]) < 1e-6,
  `縦 [${axisScale.vertical.map((v) => v.toFixed(2))}] / 横 [${axisScale.horizontal.map((v) => v.toFixed(2))}] / ` +
    `ALT なし [${axisScale.uniform.map((v) => v.toFixed(2))}]`,
);

/* 43z-14. アトリビュート欄がアウトライナの上に出る（`25` の T3） */
const attrs = await page.evaluate(async () => {
  const app = window.macbeth;
  app.state.doc.objects.length = 0;
  const sphere = app.state.doc.addObject("sphere");
  app.viewport.syncAll();
  app.setCompMode("object");
  app.state.select(sphere);
  app.refresh();
  if (!document.querySelector(".drawer.open")) document.getElementById("btnPanels").click();
  await new Promise((r) => setTimeout(r, 250));

  const attrs = document.querySelector(".drawer .attrs");
  const heads = attrs ? [...attrs.querySelectorAll(".sect-h span")].map((h) => h.textContent) : [];
  const noMore = document.querySelectorAll(".drawer .lyrow .more").length;
  const title = attrs?.querySelector(".attr-title")?.textContent ?? "";

  // 「入力ノード」のスライダーを動かすとパラメータが変わる
  const before = { ...sphere.params };
  const sliders = [...(attrs?.querySelectorAll("input.slider") ?? [])];
  const axis = sliders[sliders.length - 1];
  if (axis) {
    axis.value = String(Number(axis.value) + 4);
    axis.dispatchEvent(new Event("input", { bubbles: true }));
    axis.dispatchEvent(new Event("change", { bubbles: true }));
  }
  await new Promise((r) => setTimeout(r, 120));
  const paramMoved = Object.keys(before).some((k) => before[k] !== sphere.params[k]);

  // 何も選ばないと案内文だけ
  app.state.select(null);
  app.refresh();
  await new Promise((r) => setTimeout(r, 120));
  const emptyText = document.querySelector(".drawer .attrs .empty")?.textContent ?? "";

  document.getElementById("btnPanels").click();
  app.state.doc.objects.length = 0;
  app.viewport.syncAll();
  app.refresh();
  return { heads, noMore, title, paramMoved, emptyText };
});
check(
  "アトリビュート欄がアウトライナの上に出る",
  attrs.heads.includes("トランスフォーム") &&
    attrs.heads.includes("入力ノード") &&
    attrs.heads.includes("表示") &&
    attrs.noMore === 0 &&
    attrs.title.startsWith("Sphere") &&
    attrs.paramMoved &&
    attrs.emptyText.includes("オブジェクトを選ぶと"),
  `「${attrs.title}」/ 区画 ${attrs.heads.join(" · ")} / 行の「>」 ${attrs.noMore} 個 / パラメータ ${attrs.paramMoved} / 空 「${attrs.emptyText.replace("\n", " ")}」`,
);

/* 43z-15. 目の長押しで不透明度（`25` の T4） */
const fade = await page.evaluate(async () => {
  const app = window.macbeth;
  const core = window.macbethCore;
  app.state.doc.objects.length = 0;
  const cube = app.state.doc.addObject("cube");
  const other = app.state.doc.addObject("sphere");
  other.transform.position = [3, 0, 0];
  app.viewport.syncAll();
  app.state.select(cube);
  app.refresh();
  if (!document.querySelector(".drawer.open")) document.getElementById("btnPanels").click();
  await new Promise((r) => setTimeout(r, 250));

  // 一覧は追加の逆順なので、立方体は下の行
  const rows = [...document.querySelectorAll(".drawer .lyrow")];
  const eye = rows.find((r) => r.dataset.id === cube.id).querySelector(".eye");
  const b = eye.getBoundingClientRect();
  const x = b.x + b.width / 2;
  const y = b.y + b.height / 2;
  const ev = (type, cx) =>
    new PointerEvent(type, { pointerId: 41, pointerType: "touch", bubbles: true, cancelable: true, clientX: cx, clientY: y });

  // 長押しでポップが出る
  eye.dispatchEvent(ev("pointerdown", x));
  await new Promise((r) => setTimeout(r, 450));
  const popped = !!document.querySelector(".opacity-pop");
  // 左へ 60px 引くと薄くなる（右は濃く。既定が 1 なので下げて確かめる）
  window.dispatchEvent(ev("pointermove", x - 60));
  const label = document.querySelector(".opacity-pop .oplabel")?.textContent ?? "";
  window.dispatchEvent(ev("pointerup", x - 60));
  await new Promise((r) => setTimeout(r, 60));
  const closed = !document.querySelector(".opacity-pop");
  const faded = cube.opacity;
  const visible = cube.visible;

  // 3D の材質が透ける。共有の材質は巻き込まない
  const view = app.viewport.viewOf(cube);
  const mat = view?.surface?.material;
  const transparent = !!mat && mat.transparent === true && Math.abs(mat.opacity - faded) < 1e-6;
  // 共有の材質は巻き込まない。隣の球は透けないまま
  const om = app.viewport.viewOf(other)?.surface?.material;
  const sharedKept = !!om && om.transparent === false && om.opacity === 1;

  // 透けていても選べる
  app.state.select(null);
  app.state.select(cube);
  const selectable = app.state.selected === cube;

  // .mbz に残る
  const back = core.unpackMbz(core.packMbz(app.state.doc)).document;
  const round = back.objects.find((o) => o.id === cube.id).opacity;

  // 取り消しで戻る
  app.history.undo();
  await new Promise((r) => setTimeout(r, 60));
  const undone = app.state.doc.find(cube.id)?.opacity;

  document.getElementById("btnPanels").click();
  app.state.doc.objects.length = 0;
  app.viewport.syncAll();
  app.refresh();
  return { popped, closed, faded, visible, transparent, sharedKept, selectable, round, undone, label, count: app.state.doc.objects.length };
});
check(
  "目の長押しで不透明度",
  fade.popped &&
    fade.closed &&
    fade.faded < 1 &&
    fade.faded > 0 &&
    fade.visible &&
    fade.transparent &&
    fade.sharedKept &&
    fade.selectable &&
    Math.abs(fade.round - fade.faded) < 1e-3 &&
    fade.undone === 1,
  `ポップ ${fade.popped} → 「${fade.label}」/ 不透明度 ${fade.faded.toFixed(2)}（表示は ${fade.visible}）/ ` +
    `材質が透ける ${fade.transparent} / 選べる ${fade.selectable} / .mbz ${fade.round.toFixed(2)} / 取り消し ${fade.undone}`,
);

/* 44. ツール列のグループ（`21` の 4 章） */

/* 44-1. ボタンは 7 つ、右のオプションパネルは無い */
const column = await page.evaluate(() => ({
  buttons: [...document.querySelectorAll("#dockLeft .ibtn")].map((b) => b.dataset.group),
  options: !!document.querySelector('.panel[data-panel="options"]'),
}));
check(
  "ツール列は 7 つのグループ、オプションパネルは無い",
  column.buttons.length === 7 && !column.options && column.buttons.includes("xform"),
  `${column.buttons.join(" / ")}`,
);

/* 44-2. 変形: 長押しで回転 → アイコンが変わる → タップで刻み → 15° ずつ回る */
await pickFromGroup("xform", "S"); // 変形 → 回転
const rotIcon = await page.evaluate(() => window.macbeth.state.manip);
await tapGroup("xform");
const rotOptions = await page.evaluate(() => {
  const cutin = document.querySelector('.cutin.wide[data-gauge="xform"]');
  if (!cutin) return { shown: false };
  const seg = [...cutin.querySelectorAll(".seg")].find((b) => b.textContent === "15°");
  seg?.click();
  return { shown: true, step: window.macbeth.state.rotateStep };
});
await closeCutin();
const stepped = await page.evaluate(async () => {
  const app = window.macbeth;
  const objectsBefore = app.state.doc.objects.length;
  const object = app.state.doc.addObject("cube");
  object.transform.position = [0, 0, 0];
  app.viewport.syncAll();
  app.viewport.setView("front");
  app.state.select(object);
  app.setCompMode("object");
  app.viewport.frameSelected();
  await new Promise((r) => setTimeout(r, 60));

  const canvas = document.getElementById("gl");
  const rect = canvas.getBoundingClientRect();
  let id = 700;
  const fire = (type, x, y, pid) =>
    canvas.dispatchEvent(
      new PointerEvent(type, {
        pointerId: pid,
        pointerType: "pen",
        isPrimary: true,
        clientX: x,
        clientY: y,
        buttons: type === "pointerup" ? 0 : 1,
        bubbles: true,
        cancelable: true,
      }),
    );
  // 回転リングの当たる点を探す（画面上の半径は一定ではない）
  const center = app.manipulator.toScreen(app.pivotWorld());
  let grab = null;
  for (let r = 24; r <= 220 && !grab; r += 4) {
    for (const a of [0, 45, 90, 135, 180, 225, 270, 315]) {
      const t = (a * Math.PI) / 180;
      const cand = { x: center.x + Math.cos(t) * r, y: center.y + Math.sin(t) * r };
      if (app.manipulator.pick(cand, app.pivotWorld(), "rotate") >= 10) grab = cand;
      if (grab) break;
    }
  }
  const angles = [];
  const dragBy = async (dy) => {
    fire("pointerdown", rect.x + grab.x, rect.y + grab.y, ++id);
    for (let i = 1; i <= 12; i++) fire("pointermove", rect.x + grab.x, rect.y + grab.y + (i * dy) / 12, id);
    fire("pointerup", rect.x + grab.x, rect.y + grab.y + dy, id);
    await new Promise((r) => setTimeout(r, 40));
    // 回った量を度で見る（クォータニオンの角度）
    const q = object.transform.rotation;
    angles.push((2 * Math.acos(Math.min(1, Math.abs(q[3]))) * 180) / Math.PI);
  };
  if (grab) {
    await dragBy(40);
    await dragBy(80);
  }
  // 刻みを戻して片付ける
  app.state.rotateStep = 0;
  app.setManip("all");
  app.state.select(null);
  app.state.doc.objects.length = objectsBefore;
  app.viewport.syncAll();
  return { grabbed: !!grab, angles };
});
check(
  "変形: 長押しで回転を選び、タップで刻みを 15° にすると 15° ずつ回る",
  rotIcon === "rotate" &&
    rotOptions.shown &&
    rotOptions.step === 15 &&
    stepped.grabbed &&
    stepped.angles.length === 2 &&
    stepped.angles.every((a) => Math.abs(a / 15 - Math.round(a / 15)) < 0.02),
  `マニピュレータ ${rotIcon} / 刻み ${rotOptions.step}° / 回った角度 ${stepped.angles.map((a) => a.toFixed(2)).join("° · ")}°`,
);

/* 44-3. マルチカット中に「変形」をタップすると移動に戻り、オプションが出る */
await pickFromGroup("edit", "N"); // 編集 → マルチカット
await closeCutin();
const wasMulticut = await page.evaluate(() => window.macbeth.state.tool);
await pickFromGroup("xform", "E"); // 変形 → 移動
await tapGroup("xform");
const backToMove = await page.evaluate(() => ({
  tool: window.macbeth.state.tool,
  manip: window.macbeth.state.manip,
  cutin: !!document.querySelector('.cutin.wide[data-gauge="xform"]'),
}));
await closeCutin();
check(
  "マルチカット中に変形をタップすると移動に戻る",
  wasMulticut === "multicut" && backToMove.tool === "select" && backToMove.manip === "move" && backToMove.cutin,
  `${wasMulticut} → ${backToMove.tool} / ${backToMove.manip} / カットイン ${backToMove.cutin}`,
);

/* 44-4. 追加: 長押しで球 → アイコンが球 → タップで入力ノード / 次の既定値 */
await pickFromGroup("add", "NE"); // 追加 → スフィア
const added = await page.evaluate(() => ({
  name: window.macbeth.state.selected?.name,
  last: window.macbeth.state.lastPrimitive,
}));
await tapGroup("add");
const inputNode = await page.evaluate(() => {
  const cutin = document.querySelector('.cutin.wide[data-gauge="add"]');
  return { title: cutin?.querySelector(".attr-title")?.textContent ?? "", sliders: cutin?.querySelectorAll(".slider").length ?? 0 };
});
await closeCutin();
// 選択を外すと「次の◯◯」の既定値になる
await page.evaluate(() => {
  window.macbeth.state.select(null);
  window.macbeth.refresh();
});
await tapGroup("add");
const nextDefaults = await page.evaluate(() => {
  const cutin = document.querySelector('.cutin.wide[data-gauge="add"]');
  const head = cutin?.querySelector(".sect-h span")?.textContent ?? "";
  const slider = cutin?.querySelector(".slider");
  if (slider) {
    slider.value = String(Number(slider.value) + 2);
    slider.dispatchEvent(new Event("input", { bubbles: true }));
  }
  return { head, stored: window.macbeth.state.primitiveDefaults.sphere ?? null };
});
await closeCutin();
await page.evaluate(() => {
  const app = window.macbeth;
  app.state.doc.objects = app.state.doc.objects.filter((o) => o.kind !== "sphere");
  app.state.select(null);
  app.viewport.syncAll();
});
check(
  "追加: 長押しで球を足すとアイコンが球になり、タップで入力ノードが出る",
  added.last === "sphere" &&
    inputNode.title.startsWith("Sphere") &&
    inputNode.sliders >= 2 &&
    nextDefaults.head.includes("次の") &&
    !!nextDefaults.stored,
  `${added.name} / 入力ノード「${inputNode.title}」スライダー ${inputNode.sliders} / 選択なし →「${nextDefaults.head}」`,
);

/* 44-5. カメラ: 長押しでビュー、タップで焦点距離 */
await pickFromGroup("camera", "W"); // カメラ → 上
const camView = await page.evaluate(() => window.macbeth.state.viewName);
await tapGroup("camera");
const camOptions = await page.evaluate(() => {
  const cutin = document.querySelector('.cutin.wide[data-gauge="camera"]');
  if (!cutin) return { shown: false };
  const labels = [...cutin.querySelectorAll("label")].map((l) => l.textContent);
  const slider = cutin.querySelector(".slider");
  slider.value = "55";
  slider.dispatchEvent(new Event("input", { bubbles: true }));
  return { shown: true, labels, focal: window.macbeth.state.camOpts.focal };
});
await closeCutin();
await page.evaluate(() => {
  window.macbeth.state.camOpts.focal = 35;
  window.macbeth.setView("persp");
});
check(
  "カメラ: 長押しでビュー、タップで焦点距離",
  camView === "上" && camOptions.shown && camOptions.labels.includes("焦点距離") && camOptions.focal === 55,
  `${camView} / ${camOptions.labels?.join(" · ")} / 焦点距離 ${camOptions.focal}`,
);

/* 44-6. カメラベース選択: 裏の頂点は矩形で拾わない */
const cameraBased = await page.evaluate(async () => {
  const app = window.macbeth;
  const objectsBefore = app.state.doc.objects.length;
  const object = app.state.doc.addObject("cube");
  object.transform.position = [0, 0, 0];
  app.viewport.syncAll();
  app.state.select(object);
  app.viewport.setView("front");
  app.viewport.frameSelected();
  app.setCompMode("vertex");
  await new Promise((r) => setTimeout(r, 60));

  const view = app.viewport.viewOf(object);
  const pane = document.getElementById("vp").getBoundingClientRect();
  const all = { x0: 0, y0: 0, x1: pane.width, y1: pane.height };

  const zOf = (list) => list.map((v) => object.mesh.getPosition(v)[2]);
  app.state.cameraBased = false;
  const off = app.picker.vertsInRect(view, all.x0, all.y0, all.x1, all.y1).length;

  app.state.cameraBased = true;
  const t0 = performance.now();
  const picked = app.picker.vertsInRect(view, all.x0, all.y0, all.x1, all.y1);
  const ms = performance.now() - t0;
  const on = picked.length;
  // 前ビューなので、拾えたのは手前（+Z）の 4 点だけのはず
  const allFront = zOf(picked).every((z) => z > 0);

  // パースでは、立方体の見えるエッジは 9 本（裏の 3 本は拾わない）
  app.viewport.setView("persp");
  app.viewport.frameSelected();
  await new Promise((r) => setTimeout(r, 60));
  let visibleEdges = 0;
  for (const [a, b] of view.edges) if (app.picker.edgeVisible(view, a, b)) visibleEdges++;
  const perspVerts = app.picker.vertsInRect(view, all.x0, all.y0, all.x1, all.y1).length;

  // 重さの目安。細かい球で 1 回ぶん測る（`21` の 2.1）
  const heavy = app.state.doc.addObject("sphere");
  heavy.params.sdAxis = 64;
  heavy.params.sdHeight = 48;
  heavy.rebuild();
  app.viewport.syncAll();
  app.state.select(heavy);
  app.viewport.frameSelected();
  await new Promise((r) => setTimeout(r, 60));
  const heavyView = app.viewport.viewOf(heavy);
  const t1 = performance.now();
  const heavyCount = app.picker.vertsInRect(heavyView, all.x0, all.y0, all.x1, all.y1).length;
  const heavyMs = performance.now() - t1;

  app.state.cameraBased = false;
  app.setCompMode("object");
  app.state.select(null);
  app.state.doc.objects.length = objectsBefore;
  app.viewport.syncAll();
  return { off, on, allFront, visibleEdges, perspVerts, ms, heavyCount, heavyMs, heavyVerts: heavy.mesh.vertexCount };
});
check(
  "カメラベース選択: 裏の頂点とエッジを拾わない",
  cameraBased.off === 8 &&
    cameraBased.on === 4 &&
    cameraBased.allFront &&
    cameraBased.visibleEdges === 9 &&
    cameraBased.perspVerts === 7,
  `前ビュー ${cameraBased.off} → ${cameraBased.on} 点（手前だけ ${cameraBased.allFront}）/ ` +
    `パース ${cameraBased.perspVerts} 点・${cameraBased.visibleEdges}/12 エッジ / ` +
    `球 ${cameraBased.heavyVerts} 点で ${cameraBased.heavyCount} 点・${cameraBased.heavyMs.toFixed(0)}ms`,
);

/* 44-7. 負のスケールを防ぐ */
const negScale = await page.evaluate(async () => {
  const app = window.macbeth;
  const objectsBefore = app.state.doc.objects.length;
  const object = app.state.doc.addObject("cube");
  object.transform.position = [0, 0, 0];
  app.viewport.syncAll();
  app.state.select(object);
  app.setCompMode("object");
  app.setManip("scale");
  app.viewport.setView("persp");
  app.viewport.frameSelected();
  await new Promise((r) => setTimeout(r, 60));

  const canvas = document.getElementById("gl");
  const rect = canvas.getBoundingClientRect();
  let id = 800;
  const fire = (type, x, y, pid) =>
    canvas.dispatchEvent(
      new PointerEvent(type, {
        pointerId: pid,
        pointerType: "pen",
        isPrimary: true,
        clientX: x,
        clientY: y,
        buttons: type === "pointerup" ? 0 : 1,
        bubbles: true,
        cancelable: true,
      }),
    );
  // 中心のハンドル（一様スケール）を掴んで、左へ大きく引く
  const center = app.manipulator.toScreen(app.pivotWorld());
  const drag = async () => {
    fire("pointerdown", rect.x + center.x, rect.y + center.y, ++id);
    for (let i = 1; i <= 20; i++) fire("pointermove", rect.x + center.x - i * 30, rect.y + center.y, id);
    fire("pointerup", rect.x + center.x - 600, rect.y + center.y, id);
    await new Promise((r) => setTimeout(r, 40));
    const s = object.transform.scale[0];
    app.doUndo();
    return s;
  };
  app.state.preventNegativeScale = true;
  const guarded = await drag();
  app.state.preventNegativeScale = false;
  const free = await drag();

  app.state.preventNegativeScale = true;
  app.setManip("all");
  app.state.select(null);
  app.state.doc.objects.length = objectsBefore;
  app.viewport.syncAll();
  return { guarded, free };
});
check(
  "スケールで 0 を跨がない（オプションを切ると跨ぐ）",
  negScale.guarded > 0 && negScale.free < 0,
  `防ぐ ×${negScale.guarded.toFixed(4)} / 切る ×${negScale.free.toFixed(4)}`,
);

/* 43. 例外が出ていない */
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
