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

  /** `23` の T2: 歪みのヒートマップ。球を切れ目なしで開いて色を出す。 */
  "23-t2-heat": async () => {
    const app = window.macbeth;
    app.state.doc.objects.length = 0;
    const object = app.state.doc.addObject("sphere");
    app.viewport.syncAll();
    app.state.select(object);
    app.setMode("uv");
    await new Promise((r) => setTimeout(r, 60));
    app.uv.unfold();
    app.panelHostForTest().onUvHeatChange(true);
    app.uv.chosen.clear();
    app.uv.refreshHighlight();
    app.uv.view.frameUnit();
    app.viewport.frameSelected();
    await new Promise((r) => setTimeout(r, 120));
  },

  /** `23` の T3: カラーグリッドのチェッカー。2D の下地と 3D の表示の両方。 */
  "23-t3-checker": async () => {
    const app = window.macbeth;
    app.state.doc.objects.length = 0;
    const object = app.state.doc.addObject("cylinder");
    app.viewport.syncAll();
    app.state.select(object);
    app.setMode("uv");
    await new Promise((r) => setTimeout(r, 60));
    app.uv.autoUnwrap();
    const host = app.panelHostForTest();
    host.onCheckerChange("cells", 16);
    host.onCheckerChange("pattern", "colorGrid");
    app.setDisplay("checker");
    app.uv.chosen.clear();
    app.uv.refreshHighlight();
    app.uv.view.frameUnit();
    app.viewport.frameSelected();
    await new Promise((r) => setTimeout(r, 120));
  },

  /** `23` の T5: UV を保つ（オン）。中央の頂点を動かしたところ。 */
  "23-t5-preserve-on": async () => {
    const app = window.macbeth;
    const core = window.macbethCore;
    app.state.doc.objects.length = 0;
    const object = app.state.doc.addObject("plane");
    object.params.sdWidth = 3;
    object.params.sdHeight = 3;
    object.rebuild();
    app.viewport.syncAll();
    app.state.select(object);
    app.setDisplay("checker");
    app.panelHostForTest().onCheckerChange("cells", 8);
    app.setCompMode("vertex");
    app.setManip("move");
    app.viewport.setView("top");
    app.viewport.frameSelected();

    // 中央に近い頂点を 1 つ選んで、X 方向へ動かす
    let center = 0;
    let best = Infinity;
    for (let v = 0; v < object.mesh.vertexCount; v++) {
      const p = object.mesh.getPosition(v);
      const d = Math.hypot(p[0], p[2]);
      if (d < best) {
        best = d;
        center = v;
      }
    }
    app.state.comp.clear();
    app.state.comp.add(center);
    const positions = Float32Array.from(object.mesh.positions);
    const uv = Float32Array.from(object.mesh.uvSets.get("map1"));
    object.mesh.positions[center * 3] += 0.28;
    object.mesh.positions[center * 3 + 2] += 0.18;
    if (true) core.preserveUvs(object.mesh, { positions, uv }, [center]);
    app.viewport.rebuildObject(object);
    app.viewport.rebuildOverlay();
    app.refresh();
    await new Promise((r) => setTimeout(r, 120));
  },

  /** `23` の T5: UV を保つ（オフ）。中央の頂点を動かしたところ。 */
  "23-t5-preserve-off": async () => {
    const app = window.macbeth;
    const core = window.macbethCore;
    app.state.doc.objects.length = 0;
    const object = app.state.doc.addObject("plane");
    object.params.sdWidth = 3;
    object.params.sdHeight = 3;
    object.rebuild();
    app.viewport.syncAll();
    app.state.select(object);
    app.setDisplay("checker");
    app.panelHostForTest().onCheckerChange("cells", 8);
    app.setCompMode("vertex");
    app.setManip("move");
    app.viewport.setView("top");
    app.viewport.frameSelected();

    // 中央に近い頂点を 1 つ選んで、X 方向へ動かす
    let center = 0;
    let best = Infinity;
    for (let v = 0; v < object.mesh.vertexCount; v++) {
      const p = object.mesh.getPosition(v);
      const d = Math.hypot(p[0], p[2]);
      if (d < best) {
        best = d;
        center = v;
      }
    }
    app.state.comp.clear();
    app.state.comp.add(center);
    const positions = Float32Array.from(object.mesh.positions);
    const uv = Float32Array.from(object.mesh.uvSets.get("map1"));
    object.mesh.positions[center * 3] += 0.28;
    object.mesh.positions[center * 3 + 2] += 0.18;
    if (false) core.preserveUvs(object.mesh, { positions, uv }, [center]);
    app.viewport.rebuildObject(object);
    app.viewport.rebuildOverlay();
    app.refresh();
    await new Promise((r) => setTimeout(r, 120));
  },

  /** `24` の T1: アウトライナのドロワー。広い画面でもビューポートは全幅のまま。 */
  "24-t1-outliner": async () => {
    const app = window.macbeth;
    app.state.doc.objects.length = 0;
    for (const kind of ["cube", "sphere", "cylinder"]) app.state.doc.addObject(kind);
    app.state.doc.objects[0].transform.position = [-1.7, 0, 0];
    app.state.doc.objects[2].transform.position = [1.7, 0, 0];
    app.state.doc.objects[1].locked = true;
    app.viewport.syncAll();
    app.state.select(app.state.doc.objects[2]);
    app.state.selected = app.state.doc.objects[2];
    app.viewport.frameSelected();
    app.refresh();
    document.getElementById("btnPanels").click();
    await new Promise((r) => setTimeout(r, 250));
    // 1 行だけ開いてプロパティを見せる
    document.querySelector(".drawer .lyrow .more")?.click();
    await new Promise((r) => setTimeout(r, 120));
  },

  /** `24` の T2: アウトライナの長押しサークルメニュー。 */
  "24-t2-outliner-menu": async () => {
    const app = window.macbeth;
    app.state.doc.objects.length = 0;
    for (const kind of ["cube", "sphere", "cylinder"]) app.state.doc.addObject(kind);
    app.state.doc.objects[0].transform.position = [-1.7, 0, 0];
    app.state.doc.objects[2].transform.position = [1.7, 0, 0];
    app.viewport.syncAll();
    app.state.select(app.state.doc.objects[0]);
    app.state.also.add(app.state.doc.objects[1]);
    app.viewport.frameSelected();
    app.refresh();
    document.getElementById("btnPanels").click();
    await new Promise((r) => setTimeout(r, 250));
    const row = document.querySelectorAll(".drawer .lyrow")[2];
    const b = row.getBoundingClientRect();
    row.dispatchEvent(
      new PointerEvent("pointerdown", {
        pointerId: 3,
        pointerType: "touch",
        bubbles: true,
        clientX: b.x + b.width / 2,
        clientY: b.y + b.height / 2,
      }),
    );
    await new Promise((r) => setTimeout(r, 500));
  },

  /** `24` の T3: 強度 0 のとき第 2 ゲージは「拡張」。引くと選択が広がる。 */
  "24-t3-grow": async () => {
    const app = window.macbeth;
    app.state.doc.objects.length = 0;
    const object = app.state.doc.addObject("sphere");
    app.viewport.syncAll();
    app.state.select(object);
    app.setCompMode("face");
    app.state.soft.strength = 0;
    app.state.comp.clear();
    app.state.comp.add(60);
    app.viewport.frameSelected();
    app.refresh();
    await new Promise((r) => setTimeout(r, 60));
    // 「選択」のカットインを出して、拡張のスライダーも見せる
    const b = document.querySelector('#dockLeft .ibtn[data-group="select"]');
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
    await new Promise((r2) => setTimeout(r2, 120));
    // ゲージを 3 段ぶん引いたところ
    const g = document.getElementById("gauge2");
    const gr = g.getBoundingClientRect();
    const at = (t) => ({ clientX: gr.x + gr.width / 2, clientY: gr.y + gr.height * (1 - t) });
    g.dispatchEvent(new PointerEvent("pointerdown", { pointerId: 61, pointerType: "touch", bubbles: true, cancelable: true, ...at(0.5) }));
    g.dispatchEvent(new PointerEvent("pointermove", { pointerId: 61, pointerType: "touch", bubbles: true, ...at(0.69) }));
    await new Promise((r2) => setTimeout(r2, 120));
  },

  /** `24` の T4: 左利き。画面が左右鏡映しになる。 */
  "24-t4-left": async () => {
    const app = window.macbeth;
    app.state.doc.objects.length = 0;
    const object = app.state.doc.addObject("cylinder");
    app.viewport.syncAll();
    app.state.select(object);
    app.setCompMode("face");
    app.state.comp.clear();
    for (let f = 0; f < 6; f++) app.state.comp.add(f);
    app.viewport.frameSelected();
    app.refresh();
    document.getElementById("viewBtn").click();
    await new Promise((r) => setTimeout(r, 80));
    const items = [...document.querySelectorAll('.panel.floating[data-menu="view"] .chk')];
    items.find((b) => b.textContent.includes("左利き"))?.click();
    await new Promise((r) => setTimeout(r, 250));
    document.getElementById("viewBtn").click();
    // ツール列のカットインが左へ開くところも見せる
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
    await new Promise((r2) => setTimeout(r2, 150));
  },

  /** `24` の T5: UV 列の「UV オプション」と、細かさのスライダー。 */
  "24-t5-uvopts": async () => {
    const app = window.macbeth;
    app.state.doc.objects.length = 0;
    const object = app.state.doc.addObject("cylinder");
    app.viewport.syncAll();
    app.state.select(object);
    app.setMode("uv");
    await new Promise((r) => setTimeout(r, 120));
    app.uv.autoUnwrap();
    app.panelHostForTest().onCheckerChange("cellsPreview", 24);
    app.panelHostForTest().onCheckerChange("cells", 0);
    app.uv.chosen.clear();
    app.uv.refreshHighlight();
    app.uv.view.frameUnit();
    app.viewport.frameSelected();
    document.querySelector('#dockLeft .ibtn[data-group="uvopts"]').click();
    await new Promise((r) => setTimeout(r, 200));
  },

  /** `24` の T6: アトリビュートの転送（前）。左が元（分割 2）、右が先（分割 8）。 */
  "24-t6-transfer-before": async () => {
    const app = window.macbeth;
    app.state.doc.objects.length = 0;
    // 元は分割の粗い板、先は細かい板。UV の張り方だけを写す
    const source = app.state.doc.addObject("plane");
    source.params.sdW = 2;
    source.params.sdH = 2;
    source.rebuild();
    source.transform.position = [-1.2, 0, 0];
    const target = app.state.doc.addObject("plane");
    target.params.sdW = 8;
    target.params.sdH = 8;
    target.rebuild();
    target.transform.position = [1.2, 0, 0];
    // 先の UV を横に潰しておく（転送前は模様が伸びて見える）
    const tu = target.mesh.uvSets.get("map1");
    for (let i = 0; i < tu.length; i += 2) tu[i] *= 0.25;
    app.viewport.syncAll();
    app.setDisplay("checker");
    app.panelHostForTest().onCheckerChange("cellsPreview", 8);
    app.panelHostForTest().onCheckerChange("cells", 0);
    app.state.select(target);
    app.state.also.add(source);
    app.viewport.setView("top");
    app.viewport.frameSelected();
    app.viewport.cam.distance = 5;
    app.viewport.applyCamera();
    app.refresh();
    
    await new Promise((r) => setTimeout(r, 200));
  },

  /** `24` の T6: アトリビュートの転送（後）。左が元（分割 2）、右が先（分割 8）。 */
  "24-t6-transfer-after": async () => {
    const app = window.macbeth;
    app.state.doc.objects.length = 0;
    // 元は分割の粗い板、先は細かい板。UV の張り方だけを写す
    const source = app.state.doc.addObject("plane");
    source.params.sdW = 2;
    source.params.sdH = 2;
    source.rebuild();
    source.transform.position = [-1.2, 0, 0];
    const target = app.state.doc.addObject("plane");
    target.params.sdW = 8;
    target.params.sdH = 8;
    target.rebuild();
    target.transform.position = [1.2, 0, 0];
    // 先の UV を横に潰しておく（転送前は模様が伸びて見える）
    const tu = target.mesh.uvSets.get("map1");
    for (let i = 0; i < tu.length; i += 2) tu[i] *= 0.25;
    app.viewport.syncAll();
    app.setDisplay("checker");
    app.panelHostForTest().onCheckerChange("cellsPreview", 8);
    app.panelHostForTest().onCheckerChange("cells", 0);
    app.state.select(target);
    app.state.also.add(source);
    app.viewport.setView("top");
    app.viewport.frameSelected();
    app.viewport.cam.distance = 5;
    app.viewport.applyCamera();
    app.refresh();
    const host = app.panelHostForTest();
    // 2 つは離して置いてあるので、ローカル空間（それぞれの原点まわり）で写す
    host.onTransfer("space", "local");
    host.onTransfer("run");
    await new Promise((r) => setTimeout(r, 200));
  },

  /** `25` の T2: 3 本指 + ALT で Y だけ伸ばしたところ。 */
  "25-t2-axis-scale": async () => {
    const app = window.macbeth;
    app.state.doc.objects.length = 0;
    const object = app.state.doc.addObject("cube");
    app.viewport.syncAll();
    app.setCompMode("object");
    app.state.select(object);
    app.viewport.setView("persp");
    app.viewport.frameSelected();
    app.state.mods.alt = "on";
    app.refresh();
    await new Promise((r) => setTimeout(r, 80));

    const canvas = document.getElementById("gl");
    const r = canvas.getBoundingClientRect();
    const cx = r.x + r.width * 0.46;
    const cy = r.y + r.height * 0.55;
    const fire = (type, id, x, y) =>
      canvas.dispatchEvent(
        new PointerEvent(type, {
          pointerId: id,
          pointerType: "touch",
          isPrimary: id === 121,
          clientX: x,
          clientY: y,
          buttons: type === "pointerup" ? 0 : 1,
          bubbles: true,
          cancelable: true,
        }),
      );
    const p = [
      [cx, cy - 40],
      [cx, cy],
      [cx, cy + 40],
    ];
    p.forEach(([x, y], i) => fire("pointerdown", 121 + i, x, y));
    for (let step = 1; step <= 10; step++) {
      p.forEach(([x, y], i) => {
        const k = i === 0 ? -1 : i === 2 ? 1 : 0;
        fire("pointermove", 121 + i, x, y + k * step * 5);
      });
      await new Promise((r2) => setTimeout(r2, 8));
    }
    // 指は置いたまま撮る（ヒントに「スケール Y ×…」が出ている）
    await new Promise((r2) => setTimeout(r2, 150));
  },

  /** `25` の T3: アトリビュート欄がアウトライナの上に出る。 */
  "25-t3-attrs": async () => {
    const app = window.macbeth;
    app.state.doc.objects.length = 0;
    for (const kind of ["cube", "sphere", "cylinder"]) app.state.doc.addObject(kind);
    app.state.doc.objects[0].transform.position = [-1.7, 0, 0];
    app.state.doc.objects[2].transform.position = [1.7, 0, 0];
    app.viewport.syncAll();
    app.setCompMode("object");
    app.state.select(app.state.doc.objects[1]);
    app.state.doc.objects[1].transform.position = [0, 0.4, 0];
    app.viewport.frameSelected();
    app.viewport.cam.distance = 7;
    app.viewport.applyCamera();
    app.refresh();
    document.getElementById("btnPanels").click();
    await new Promise((r) => setTimeout(r, 300));
  },

  /** `25` の T4: 目を長押しして不透明度を下げたところ。手前の立方体ごしに球が見える。 */
  "25-t4-opacity": async () => {
    const app = window.macbeth;
    app.state.doc.objects.length = 0;
    const sphere = app.state.doc.addObject("sphere");
    const cube = app.state.doc.addObject("cube");
    cube.transform.position = [0.35, 0.25, 1.5];
    cube.transform.scale = [1.5, 1.5, 1.5];
    app.viewport.syncAll();
    app.setCompMode("object");
    app.state.select(cube);
    app.viewport.cam.target.set(0, 0.2, 0.4);
    app.viewport.cam.distance = 7.4;
    app.viewport.applyCamera();
    app.refresh();
    document.getElementById("btnPanels").click();
    await new Promise((r) => setTimeout(r, 300));

    // 本物の経路で長押し。指は離さないので、スライダーが出たまま写る
    const row = [...document.querySelectorAll(".drawer .lyrow")].find((r) => r.dataset.id === cube.id);
    const eye = row.querySelector(".eye");
    const b = eye.getBoundingClientRect();
    const x = b.x + b.width / 2;
    const y = b.y + b.height / 2;
    const ev = (type, cx) =>
      new PointerEvent(type, { pointerId: 61, pointerType: "touch", bubbles: true, cancelable: true, clientX: cx, clientY: y });
    eye.dispatchEvent(ev("pointerdown", x));
    await new Promise((r) => setTimeout(r, 480));
    window.dispatchEvent(ev("pointermove", x - 100));
    await new Promise((r) => setTimeout(r, 120));
  },

  /** `25` の T5: カメラをロックしたところ。HUD とツール列のアイコンに鍵。 */
  "25-t5-camlock": async () => {
    const app = window.macbeth;
    app.state.doc.objects.length = 0;
    const object = app.state.doc.addObject("cylinder");
    app.viewport.syncAll();
    app.setCompMode("object");
    app.state.select(object);
    app.viewport.frameSelected();
    app.viewport.cam.distance = 6.4;
    app.viewport.applyCamera();
    app.refresh();

    // カメラのカットインを開いてロックする（本物の経路）
    const b = document.querySelector('#dockLeft .ibtn[data-group="camera"]');
    const r = b.getBoundingClientRect();
    const at = { clientX: r.x + r.width / 2, clientY: r.y + r.height / 2 };
    for (const type of ["pointerdown", "pointerup"]) {
      const e = new PointerEvent(type, { pointerId: 7, pointerType: "mouse", bubbles: true, cancelable: true, ...at });
      (type === "pointerdown" ? b : window).dispatchEvent(e);
    }
    await new Promise((r2) => setTimeout(r2, 200));
    const cutin = document.querySelector('.cutin.wide[data-gauge="camera"]');
    [...cutin.querySelectorAll(".chk")].find((c) => c.textContent.includes("カメラをロック"))?.click();
    await new Promise((r2) => setTimeout(r2, 250));
  },

  /** `25` の T6: 4 分割。パース / 上 / 前 / 右。右下がアクティブ。 */
  "25-t6-quad": async () => {
    const app = window.macbeth;
    app.state.doc.objects.length = 0;
    const cube = app.state.doc.addObject("cube");
    const sphere = app.state.doc.addObject("sphere");
    sphere.transform.position = [1.9, 0.3, -0.6];
    sphere.params.radius = 0.7;
    sphere.rebuild();
    app.viewport.syncAll();
    app.setCompMode("object");
    app.state.select(cube);
    app.setLayoutForTest("quad");
    await new Promise((r) => setTimeout(r, 200));
    for (const p of app.viewport.panes) p.cam.distance = 6.2;
    app.viewport.applyCameraAll();

    // 右下（右ビュー）を触ってアクティブにし、そのペインだけワイヤーにする
    const pane3d = document.getElementById("pane3d");
    const pr = pane3d.getBoundingClientRect();
    const gl = document.getElementById("gl");
    const at = { clientX: pr.left + pr.width * 0.75, clientY: pr.top + pr.height * 0.8 };
    for (const type of ["pointerdown", "pointerup"]) {
      gl.dispatchEvent(new PointerEvent(type, { pointerId: 81, pointerType: "touch", bubbles: true, cancelable: true, ...at }));
    }
    await new Promise((r) => setTimeout(r, 150));
    app.setDisplay("wire");
    app.refresh();
    await new Promise((r) => setTimeout(r, 250));
  },

  /** `26` の T1: 3 本指のひねりで回転。指を離さずに撮るので札が出たまま。 */
  "26-t1-twist": async () => {
    const app = window.macbeth;
    app.state.doc.objects.length = 0;
    const object = app.state.doc.addObject("cube");
    app.viewport.syncAll();
    app.setCompMode("object");
    app.state.select(object);
    app.setView("front");
    app.viewport.frameSelected();
    app.viewport.cam.distance = 5.2;
    app.viewport.applyCamera();
    app.setDisplay("shadedWire");
    app.refresh();
    await new Promise((r) => setTimeout(r, 120));

    const pane = document.getElementById("pane3d").getBoundingClientRect();
    const center = { x: pane.left + pane.width / 2, y: pane.top + pane.height / 2 };
    const canvas = document.getElementById("gl");
    const fire = (type, id, x, y) =>
      canvas.dispatchEvent(
        new PointerEvent(type, {
          pointerId: id,
          pointerType: "touch",
          isPrimary: id === 121,
          clientX: x,
          clientY: y,
          buttons: type === "pointerup" ? 0 : 1,
          bubbles: true,
          cancelable: true,
        }),
      );
    const thumb = { x: center.x - 60, y: center.y + 60 };
    const pair = [
      { x: center.x + 52, y: center.y - 60 },
      { x: center.x + 68, y: center.y - 52 },
    ];
    const turn = (p, deg) => {
      const a = (deg * Math.PI) / 180;
      const dx = p.x - center.x;
      const dy = p.y - center.y;
      return { x: center.x + dx * Math.cos(a) - dy * Math.sin(a), y: center.y + dx * Math.sin(a) + dy * Math.cos(a) };
    };
    fire("pointerdown", 121, thumb.x, thumb.y);
    fire("pointerdown", 122, pair[0].x, pair[0].y);
    fire("pointerdown", 123, pair[1].x, pair[1].y);
    for (let step = 1; step <= 12; step++) {
      const deg = (48 / 12) * step;
      const a = turn(thumb, deg);
      const b = turn(pair[0], deg);
      const c = turn(pair[1], deg);
      fire("pointermove", 121, a.x, a.y);
      fire("pointermove", 122, b.x, b.y);
      fire("pointermove", 123, c.x, c.y);
      await new Promise((r) => setTimeout(r, 10));
    }
    // 指は離さない（札を出したまま撮る）
    await new Promise((r) => setTimeout(r, 200));
  },

  /** `26` の T3: ALT + ひねり。指を縦に並べると手前へ倒れる。 */
  "26-t3-alt-twist": async () => {
    const app = window.macbeth;
    app.state.doc.objects.length = 0;
    const object = app.state.doc.addObject("cube");
    app.viewport.syncAll();
    app.setCompMode("object");
    app.state.select(object);
    app.viewport.frameSelected();
    app.viewport.cam.distance = 6;
    app.viewport.applyCamera();
    app.setDisplay("shadedWire");
    // ALT のラッチを入れる（クラスターの ALT と同じ）
    app.state.mods.alt = "on";
    app.refresh();
    await new Promise((r) => setTimeout(r, 120));

    const pane = document.getElementById("pane3d").getBoundingClientRect();
    const center = { x: pane.left + pane.width / 2, y: pane.top + pane.height / 2 };
    const canvas = document.getElementById("gl");
    const fire = (type, id, x, y) =>
      canvas.dispatchEvent(
        new PointerEvent(type, {
          pointerId: id,
          pointerType: "touch",
          isPrimary: id === 141,
          clientX: x,
          clientY: y,
          buttons: type === "pointerup" ? 0 : 1,
          bubbles: true,
          cancelable: true,
        }),
      );
    // 指を縦に並べる（親指が下、対が上）
    const grip = [
      { x: center.x, y: center.y + 70 },
      { x: center.x - 8, y: center.y - 70 },
      { x: center.x + 8, y: center.y - 70 },
    ];
    const turn = (p, deg) => {
      const a = (deg * Math.PI) / 180;
      const dx = p.x - center.x;
      const dy = p.y - center.y;
      return { x: center.x + dx * Math.cos(a) - dy * Math.sin(a), y: center.y + dx * Math.sin(a) + dy * Math.cos(a) };
    };
    grip.forEach((p, i) => fire("pointerdown", 141 + i, p.x, p.y));
    for (let step = 1; step <= 12; step++) {
      grip.forEach((p, i) => {
        const t = turn(p, 4 * step);
        fire("pointermove", 141 + i, t.x, t.y);
      });
      await new Promise((r) => setTimeout(r, 10));
    }
    // 指は離さない（札を出したまま撮る）
    await new Promise((r) => setTimeout(r, 200));
  },

  /** `26` の T4: アトリビュート欄を一覧の下に置いたところ。 */
  "26-t4-attrs-bottom": async () => {
    const app = window.macbeth;
    app.state.doc.objects.length = 0;
    for (const kind of ["cube", "sphere", "cylinder"]) app.state.doc.addObject(kind);
    app.state.doc.objects[0].transform.position = [-1.7, 0, 0];
    app.state.doc.objects[2].transform.position = [1.7, 0, 0];
    app.viewport.syncAll();
    app.setCompMode("object");
    app.state.select(app.state.doc.objects[1]);
    app.viewport.frameSelected();
    app.viewport.cam.distance = 7;
    app.viewport.applyCamera();
    app.refresh();
    document.getElementById("btnPanels").click();
    await new Promise((r) => setTimeout(r, 300));

    // つまみを掴んでドロワーの下へ運ぶ（本物の経路）
    const grip = document.querySelector(".drawer .attrgrip");
    const g = grip.getBoundingClientRect();
    const r = document.querySelector(".drawer").getBoundingClientRect();
    const ev = (type, cy) =>
      new PointerEvent(type, {
        pointerId: 151,
        pointerType: "touch",
        bubbles: true,
        cancelable: true,
        clientX: g.x + 6,
        clientY: cy,
      });
    grip.dispatchEvent(ev("pointerdown", g.y + 8));
    window.dispatchEvent(ev("pointermove", r.bottom - 20));
    window.dispatchEvent(ev("pointerup", r.bottom - 20));
    await new Promise((r2) => setTimeout(r2, 300));
  },

  /** `27` の T2・T3: 4 分割の線を動かし、左上のペインだけ「選択したものだけ」。 */
  "27-panes": async () => {
    const app = window.macbeth;
    app.state.doc.objects.length = 0;
    const cube = app.state.doc.addObject("cube");
    const sphere = app.state.doc.addObject("sphere");
    sphere.transform.position = [2.2, 0.2, 0];
    app.viewport.syncAll();
    app.setCompMode("object");
    app.state.select(cube);
    app.setLayoutForTest("quad");
    await new Promise((r) => setTimeout(r, 200));
    // 分割線を動かす（左上を広く、下段を浅く）
    app.viewport.setSplit("x", 0.62);
    app.viewport.setSplit("y", 0.58);
    for (const p of app.viewport.panes) {
      p.cam.target.set(1.1, 0.2, 0);
      p.cam.distance = 7.5;
    }
    app.viewport.applyCameraAll();
    // 左上のペインだけ隔離する
    app.panelHostForTest().onIsolate();
    app.refresh();
    await new Promise((r) => setTimeout(r, 250));
  },

  /** `27` の T4: 透けたオブジェクトごしに中の形が見える。 */
  "27-t4-transparent": async () => {
    const app = window.macbeth;
    app.state.doc.objects.length = 0;
    const inner = app.state.doc.addObject("cube");
    inner.transform.scale = [0.55, 0.55, 0.55];
    const shell = app.state.doc.addObject("sphere");
    app.viewport.syncAll();
    app.setCompMode("object");
    app.state.select(shell);
    app.viewport.frameSelected();
    app.viewport.cam.distance = 4.6;
    app.viewport.applyCamera();
    app.setDisplay("shaded");
    const host = app.panelHostForTest();
    host.onOpacityInput(shell, 0.45);
    host.onOpacityCommit(shell);
    app.state.select(null);
    app.refresh();
    await new Promise((r) => setTimeout(r, 250));
  },

  /** `29` の A-T1: 修飾ボタンをツール列の横に、縦 1 列で。 */
  "29-t1-cluster-side": async () => {
    const app = window.macbeth;
    app.state.doc.objects.length = 0;
    const object = app.state.doc.addObject("cube");
    app.viewport.syncAll();
    app.setCompMode("object");
    app.state.select(object);
    app.viewport.frameSelected();
    app.refresh();
    // 表示のドロップダウンから「ツール列の横」を選ぶ（本物の経路）
    document.getElementById("viewBtn").click();
    await new Promise((r) => setTimeout(r, 200));
    document.querySelector('.panel.floating[data-menu="view"] [data-cluster="side"]')?.click();
    await new Promise((r) => setTimeout(r, 250));
  },

  /** `29` の A-T2: 縦持ち。回しても潰れないことの絵（SHOT_SIZE=744x1133 で撮る）。 */
  "29-t2-portrait": async () => {
    const app = window.macbeth;
    app.state.doc.objects.length = 0;
    const cube = app.state.doc.addObject("cube");
    const sphere = app.state.doc.addObject("sphere");
    sphere.transform.position = [1.9, 0, 0];
    app.viewport.syncAll();
    app.setCompMode("object");
    app.state.select(cube);
    app.viewport.frameSelected();
    app.viewport.cam.distance = 7.5;
    app.viewport.applyCamera();
    app.refresh();
    await new Promise((r) => setTimeout(r, 300));
  },

  /** `29` の B-T6: 10 万三角形の球をツイークしたところ。 */
  "29-t6-100k": async () => {
    const app = window.macbeth;
    app.state.doc.objects.length = 0;
    const o = app.state.doc.addObject("sphere");
    o.params.sdAxis = 320;
    o.params.sdHeight = 160;
    o.rebuild();
    app.viewport.syncAll();
    app.state.select(o);
    app.setCompMode("face");
    app.viewport.frameSelected();
    app.viewport.cam.distance = 3.4;
    app.viewport.applyCamera();
    app.setDisplay("shadedWire");
    app.viewport.cam.distance = 4.2;
    app.viewport.applyCamera();
    app.refresh();
    await new Promise((r) => setTimeout(r, 300));

    // 真ん中の面をつかんで引き出す（本物の経路）
    const pane = document.getElementById("pane3d").getBoundingClientRect();
    const gl = document.getElementById("gl");
    const cx = pane.left + pane.width / 2;
    const cy = pane.top + pane.height / 2;
    const ev = (type, x, y) =>
      new PointerEvent(type, { pointerId: 192, pointerType: "pen", bubbles: true, cancelable: true, clientX: x, clientY: y, buttons: type === "pointerup" ? 0 : 1 });
    gl.dispatchEvent(ev("pointerdown", cx, cy));
    gl.dispatchEvent(ev("pointerup", cx, cy));
    await new Promise((r) => setTimeout(r, 150));
    // ソフト選択を効かせて、動かしたところが分かるようにする
    app.state.soft.strength = 1;
    app.state.soft.radius = 1.1;
    gl.dispatchEvent(ev("pointerdown", cx, cy));
    for (let i = 1; i <= 20; i++) {
      gl.dispatchEvent(ev("pointermove", cx + i * 5, cy - i * 8));
      await new Promise((r) => setTimeout(r, 8));
    }
    gl.dispatchEvent(ev("pointerup", cx + 100, cy - 160));
    await new Promise((r) => setTimeout(r, 200));
    // 選択の緑を外す（10 万本だと形が見えなくなる）。ワイヤの細かさは残す
    app.setCompMode("object");
    app.state.select(null);
    app.state.soft.strength = 0;
    app.refresh();
    await new Promise((r) => setTimeout(r, 300));
  },

  /** `23` の T4: ブリッジの分割数 3。上下の縁の間に輪が 2 本入る。 */
  "23-t4-bridge": async () => {
    const app = window.macbeth;
    app.state.doc.objects.length = 0;
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
    app.state.lastEdit = "bridge";
    app.panelHostForTest().onBridgeSegmentsChange(3);
    app.setCompMode("edge");
    app.selectBoundary();
    app.doBridge();
    app.setCompMode("object");
    app.state.comp.clear();
    app.setDisplay("shadedWire");
    app.viewport.frameSelected();
    app.viewport.rebuildOverlay();
    app.refresh();
    await new Promise((r) => setTimeout(r, 120));
  },

  /** `23` の T6: 裏面を描かない + グリッドなし。 */
  "23-t6-display": async () => {
    const app = window.macbeth;
    app.state.doc.objects.length = 0;
    const object = app.state.doc.addObject("sphere");
    app.viewport.syncAll();
    app.state.select(object);
    // 手前の面をいくつか落として、裏面が見える状態にする
    app.setCompMode("face");
    app.state.comp.clear();
    for (let f = 0; f < object.mesh.faceCount; f++) {
      const c = object.mesh.faceCenter(f);
      if (c[2] > 0.3 && c[1] > -0.2 && c[1] < 0.6) app.state.comp.add(f);
    }
    app.doDeleteFaces();
    app.setCompMode("object");
    app.state.comp.clear();
    const host = app.panelHostForTest();
    host.onDisplayToggle("cullBack", true);
    host.onDisplayToggle("showGrid", false);
    app.viewport.frameSelected();
    app.viewport.rebuildOverlay();
    app.refresh();
    await new Promise((r) => setTimeout(r, 120));
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

  /** `33` の T3: 球に何本か彫って、筆の円が出ているところ。 */
  "33-t3-stroke": async () => {
    const app = window.macbeth;
    const core = window.macbethCore;
    app.state.doc.objects.length = 0;
    const ball = app.state.doc.addMesh(
      core.PRIMITIVES.sphere.build({ ...core.defaultParams("sphere"), sdAxis: 28, sdHeight: 20 }),
      "Head",
    );
    app.viewport.syncAll();
    app.state.select(ball);
    app.setMode("sculpt");
    await app.levelForTest("add");
    await app.levelForTest("add");
    app.viewport.frameSelected();
    app.setDisplay("shaded");
    app.refresh();
    await new Promise((r) => setTimeout(r, 200));

    const pane = document.getElementById("pane3d").getBoundingClientRect();
    const gl = document.getElementById("gl");
    const cx = pane.left + pane.width / 2;
    const cy = pane.top + pane.height / 2;
    const ev = (type, x, y) =>
      new PointerEvent(type, {
        pointerId: 88, pointerType: "pen", bubbles: true, cancelable: true,
        clientX: x, clientY: y, pressure: 0.9, buttons: type === "pointerup" ? 0 : 1,
      });
    // 3 本ほど彫る
    for (const dy of [-40, 0, 40]) {
      gl.dispatchEvent(ev("pointerdown", cx - 50, cy + dy));
      for (let i = 1; i <= 12; i++) gl.dispatchEvent(ev("pointermove", cx - 50 + i * 8, cy + dy));
      gl.dispatchEvent(ev("pointerup", cx + 46, cy + dy));
      await new Promise((r) => setTimeout(r, 30));
    }
    // 筆の円を出しておく
    gl.dispatchEvent(new PointerEvent("pointermove", { pointerId: 89, pointerType: "pen", bubbles: true, clientX: cx + 20, clientY: cy - 20 }));
    await new Promise((r) => setTimeout(r, 120));
  },

  /** `32` の T3: 段のボタンを長押しして、一覧（段ごとの面数と推定メモリ）を開いたところ。 */
  "32-t3-level": async () => {
    const app = window.macbeth;
    app.state.doc.objects.length = 0;
    const core = window.macbethCore;
    const o = app.state.doc.addMesh(
      core.PRIMITIVES.sphere.build({ ...core.defaultParams("sphere"), sdAxis: 16, sdHeight: 12 }),
      "Head",
    );
    app.viewport.syncAll();
    app.state.select(o);
    app.setMode("sculpt");
    await app.levelForTest("add");
    await app.levelForTest("add");
    app.viewport.frameSelected();
    app.setDisplay("shadedWire");
    app.refresh();
    // 段のボタンを長押しして一覧を開く
    const btn = document.querySelector('#dockLeft [data-group="level"]');
    const r = btn.getBoundingClientRect();
    const at = { clientX: r.left + r.width / 2, clientY: r.top + r.height / 2, pointerId: 1, isPrimary: true };
    btn.dispatchEvent(new PointerEvent("pointerdown", { ...at, bubbles: true }));
    await new Promise((done) => setTimeout(done, 700));
  },

  /** `30` の T1: ベンチ画面。数字は CI のものなので当てにしない（表の形だけ）。 */
  "30-t1-bench": async () => {
    // `?bench=1&quick=1` で開いている。表が埋まるまで待つ
    await new Promise((done) => {
      const tick = () => {
        if (document.querySelector(".bench[data-done='true']")) done();
        else setTimeout(tick, 100);
      };
      tick();
    });
  },
};

/** URL に足す問い合わせ（`?bench=1` など）。場面ごとに決める。 */
const QUERIES = { "30-t1-bench": "?bench=1&quick=1" };

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
// 画面の大きさは SHOT_SIZE=幅x高さ で変えられる
const [SW, SH] = (process.env.SHOT_SIZE ?? "1280x800").split("x").map(Number);
const page = await browser.newPage({ viewport: { width: SW, height: SH } });
await page.goto(`http://localhost:${PORT}${BASE}${ENTRY}${QUERIES[NAME] ?? ""}`, { waitUntil: "load" });
await page.waitForFunction(() => window.macbeth?.state.doc.objects.length > 0, null, { timeout: 5000 });

page.setDefaultTimeout(180000);
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
