/**
 * ベンチ画面（`30` の T1）。`?bench=1` で開くと出る。
 *
 * **JS のままで行けるか、wasm に出すか**を実機の数字で決めるためのもの
 * （`28` の S2-0）。ふだんの画面には何も足さない。CI の数字は参考にしない
 * （swiftshader なので実機よりずっと遅い）。
 *
 * 走らせ方:
 *   https://…/app/?bench=1          本番の大きさ（100 万四角形）
 *   https://…/app/?bench=1&quick=1  小さめ（通し確認と、手元で形を見るとき）
 *
 * 結果は表に出て、「コピー」で JSON がクリップボードへ入る。
 */
import { PRIMITIVES, buildBvh, catmullClark, defaultParams, refitBvh, Multires, type Mesh } from "../core/index.js";
import type { App } from "./app.js";
import { el } from "./ui/dom.js";

/** 1 行分の結果。 */
interface Row {
  key: string;
  label: string;
  /** 測った値（ms、または MB）。 */
  value: number;
  unit: string;
  /** 目標。これを越えたら赤。無ければ目標なし。 */
  target?: number;
  note: string;
}

/** 3 回走らせて中央値を取る。1 回目は JIT が温まっていないので当てにならない。 */
function median(times: number[]): number {
  const s = [...times].sort((a, b) => a - b);
  return s[(s.length / 2) | 0];
}

function timeIt(runs: number, fn: () => void): number {
  const out: number[] = [];
  for (let i = 0; i < runs; i++) {
    const t = performance.now();
    fn();
    out.push(performance.now() - t);
  }
  return median(out);
}

/** 待たせて画面を描かせる（長い計算の合間に表を更新するため）。 */
const breathe = (): Promise<void> => new Promise((r) => setTimeout(r, 0));

function sphere(axis: number, height: number): Mesh {
  return PRIMITIVES.sphere.build({ ...defaultParams("sphere"), sdAxis: axis, sdHeight: height });
}

export async function runBench(app: App, quick: boolean): Promise<void> {
  const panel = el("div", "bench");
  const head = el("div", "bench-head");
  head.innerHTML =
    `<b>ベンチ</b> <span>${quick ? "小さめ" : "本番の大きさ"}</span><br>` +
    `<i>${navigator.userAgent}</i><br>` +
    `<i>コア ${navigator.hardwareConcurrency ?? "?"} · 画素比 ${window.devicePixelRatio}</i>`;
  panel.appendChild(head);
  const body = el("div", "bench-body");
  panel.appendChild(body);
  const foot = el("div", "bench-foot");
  panel.appendChild(foot);
  document.body.appendChild(panel);

  const rows: Row[] = [];
  const paint = (status = "") => {
    body.textContent = "";
    for (const r of rows) {
      const line = el("div", "bench-row");
      if (r.target !== undefined && r.value > r.target) line.dataset.over = "true";
      line.appendChild(el("i", undefined, r.label));
      line.appendChild(el("b", undefined, `${r.value.toFixed(1)} ${r.unit}`));
      line.appendChild(el("span", undefined, r.target !== undefined ? `目標 ${r.target}${r.unit}` : r.note));
      body.appendChild(line);
    }
    if (status) body.appendChild(el("div", "bench-status", status));
  };
  const add = async (r: Row) => {
    rows.push(r);
    paint();
    await breathe();
  };
  paint("測っています…");
  await breathe();

  // 大きさ。100 万四角形は sdAxis 1000 × sdHeight 1000
  const big = quick ? { axis: 250, height: 250 } : { axis: 1000, height: 1000 };
  const mid = quick ? { axis: 125, height: 125 } : { axis: 500, height: 500 };
  const baseSize = quick ? { axis: 60, height: 60 } : { axis: 240, height: 240 };

  /* B0 — メッシュを作る */
  let heavy!: Mesh;
  const b0 = timeIt(1, () => {
    heavy = sphere(big.axis, big.height);
  });
  const quads = heavy.faceCount;
  await add({
    key: "B0",
    label: `メッシュを作る（${(quads / 10000).toFixed(0)} 万四角形）`,
    value: b0,
    unit: "ms",
    note: `頂点 ${heavy.vertexCount}`,
  });

  /* B1 — Catmull-Clark 1 レベル */
  const midMesh = sphere(mid.axis, mid.height);
  const b1mid = timeIt(3, () => void catmullClark(midMesh));
  await add({
    key: "B1a",
    label: `細分割 1 レベル（${(midMesh.faceCount / 10000).toFixed(0)} 万四角形）`,
    value: b1mid,
    unit: "ms",
    note: "レベルを 1 つ上げる待ち時間",
  });
  const b1big = timeIt(1, () => void catmullClark(heavy));
  await add({
    key: "B1b",
    label: `細分割 1 レベル（${(quads / 10000).toFixed(0)} 万四角形）`,
    value: b1big,
    unit: "ms",
    target: 1500,
    note: "",
  });

  /* B2 — 接空間デルタの取り直し（動いた頂点のぶんだけ） */
  const base = sphere(baseSize.axis, baseSize.height);
  const multi = new Multires(base);
  multi.divide();
  multi.divide();
  const b2build = timeIt(1, () => void multi.levels());
  const top = multi.level(2);
  await add({
    key: "B2a",
    label: `レベル 2 まで組む（${(top.faceCount / 10000).toFixed(0)} 万四角形）`,
    value: b2build,
    unit: "ms",
    note: `ベース ${base.faceCount} 面`,
  });

  // ベースの頂点を 1 万個動かして、その周りだけ上へ伝える（ストロークの 1 コマ）
  const movedCount = Math.min(10000, (base.vertexCount / 2) | 0);
  const moved: number[] = [];
  for (let i = 0; i < movedCount; i++) moved.push(i);
  const b2 = timeIt(3, () => {
    for (const v of moved) {
      const p = base.getPosition(v);
      const len = Math.hypot(p[0], p[1], p[2]) || 1;
      base.setPosition(v, p[0] + (p[0] / len) * 0.01, p[1] + (p[1] / len) * 0.01, p[2] + (p[2] / len) * 0.01);
    }
    multi.setBase(base, moved);
  });
  await add({
    key: "B2b",
    label: `デルタの取り直し（${movedCount} 頂点）`,
    value: b2,
    unit: "ms",
    target: 16,
    note: "",
  });

  /* B3 — BVH */
  const tris = heavy.triangulate();
  let bvh = buildBvh(heavy.positions, tris);
  const b3build = timeIt(1, () => {
    bvh = buildBvh(heavy.positions, tris);
  });
  await add({
    key: "B3a",
    label: `BVH を作る（${((tris.tri.length / 3 / 10000) | 0)} 万三角形）`,
    value: b3build,
    unit: "ms",
    note: "トポロジを変えたときだけ",
  });
  const b3refit = timeIt(3, () => refitBvh(bvh, heavy.positions, tris));
  await add({ key: "B3b", label: "BVH を取り直す（全部）", value: b3refit, unit: "ms", note: "座標だけ変えたとき" });

  /* B4 — 描画 1 フレーム */
  app.state.doc.objects.length = 0;
  const shown = app.state.doc.addMesh(heavy, "bench");
  app.viewport.syncAll();
  app.state.select(shown);
  app.viewport.frameSelected();
  app.setDisplay("shadedWire");
  app.refresh();
  await breathe();
  const vp = app.viewport;
  const b4 = timeIt(30, () => vp.renderer.render(vp.scene, vp.camera));
  await add({
    key: "B4",
    label: `描画 1 フレーム（${((tris.tri.length / 3 / 10000) | 0)} 万三角形）`,
    value: b4,
    unit: "ms",
    target: 16,
    note: "",
  });

  /* B5 — メモリ */
  const mem = (performance as { memory?: { usedJSHeapSize: number } }).memory;
  await add({
    key: "B5",
    label: "使っているメモリ",
    value: mem ? mem.usedJSHeapSize / 1048576 : 0,
    unit: "MB",
    note: mem ? "" : "この端末では取れない",
  });

  paint("終わりました");

  const again = el("button", "act", "もう一度");
  again.addEventListener("click", () => {
    panel.remove();
    void runBench(app, quick);
  });
  const copy = el("button", "act", "コピー");
  const json = () =>
    JSON.stringify(
      {
        agent: navigator.userAgent,
        cores: navigator.hardwareConcurrency ?? null,
        dpr: window.devicePixelRatio,
        quick,
        rows: rows.map((r) => ({ key: r.key, label: r.label, value: +r.value.toFixed(2), unit: r.unit, target: r.target })),
      },
      null,
      1,
    );
  copy.addEventListener("click", () => {
    void navigator.clipboard?.writeText(json()).then(
      () => (copy.textContent = "コピーしました"),
      () => (copy.textContent = "コピーできませんでした"),
    );
  });
  const close = el("button", "act", "閉じる");
  close.addEventListener("click", () => panel.remove());
  foot.append(again, copy, close);
  // 通し確認から読むため
  panel.dataset.done = "true";
  Object.assign(window, { macbethBench: json });
}
