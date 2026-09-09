/**
 * ベンチ画面（`30` の T1）。`?bench=1` で開くと出る。
 *
 * **JS のままで行けるか、wasm に出すか**を実機の数字で決めるためのもの
 * （`28` の S2-0）。ふだんの画面には何も足さない。CI の数字は参考にしない
 * （swiftshader なので実機よりずっと遅い）。
 *
 * 走らせ方:
 *   https://…/app/?bench=1          本番の大きさ（100 万四角形）
 *   https://…/app/?bench=1&size=25  25 万四角形（小さい端末はこちら）
 *   https://…/app/?bench=1&quick=1  ごく小さい（通し確認と、手元で形を見るとき）
 *
 * 結果は表に出て、「コピー」で JSON がクリップボードへ入る。下のボタンで
 * 大きさを選び直せる。**100 万四角形は計算の途中で 1GB を大きく越える**ので、
 * iPad mini のような端末では途中でタブが落ちる。落ちたら小さい方で測る。
 */
import {
  PRIMITIVES,
  buildBvh,
  catmullClark,
  defaultParams,
  estimateLevelBytes,
  applyStroke,
  strokeFootprint,
  refitBvh,
  Multires,
  type Mesh,
} from "../core/index.js";
import type { App } from "./app.js";
import { el } from "./ui/dom.js";
import { buildFromGeometry, loadWasm, subdivGeometry, type WasmModule } from "./wasm/index.js";
import { fitBrushRadius, levelsOf } from "./levels.js";

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

/** 面の数の見せ方。1 万に満たないと「0 万」になってしまうので、そこは実数で。 */
function faces(n: number): string {
  return n >= 10000 ? `${(n / 10000).toFixed(0)} 万四角形` : `${n} 四角形`;
}

function sphere(axis: number, height: number): Mesh {
  return PRIMITIVES.sphere.build({ ...defaultParams("sphere"), sdAxis: axis, sdHeight: height });
}

/**
 * メッシュが実際に抱えている typed array の合計（バイト）。
 *
 * `performance.memory` と違って**どの端末でも正確**。JS の入れ物の分は入って
 * いないので、`estimateLevelBytes` の見積もりはこれより大きくなるのが正しい。
 */
function meshBytes(mesh: Mesh): number {
  let total = mesh.positions.byteLength + mesh.faceOffsets.byteLength + mesh.faceCorners.byteLength;
  total += mesh.polygroup.byteLength + mesh.materialId.byteLength;
  for (const uv of mesh.uvSets.values()) total += uv.byteLength;
  return total;
}

/** いま使っている JS ヒープ（MB）。取れない端末（Safari）では 0。 */
function heapMb(): number {
  const m = (performance as { memory?: { usedJSHeapSize: number } }).memory;
  return m ? m.usedJSHeapSize / 1048576 : 0;
}

/** 選べる大きさ（万四角形）。 */
const SIZES = [25, 50, 100];

export async function runBench(app: App, quick: boolean, size?: number): Promise<void> {
  // quick はごく小さい（通し確認用）。size が来ればそれ、来なければ 100 万
  const man = quick ? 6 : (size ?? 100);

  const panel = el("div", "bench");
  const head = el("div", "bench-head");
  head.innerHTML =
    `<b>ベンチ</b> <span>${quick ? "ごく小さい" : `${man} 万四角形`}</span><br>` +
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
  // いちばん高かったときのヒープ。落ちる端末の目安になるので行ごとに見る
  let peak = 0;
  const add = async (r: Row) => {
    rows.push(r);
    peak = Math.max(peak, heapMb());
    paint();
    await breathe();
  };
  paint("測っています…");
  await breathe();
  // 1 行でも落ちたら、そこで止まらずに何が起きたかを表に出す。
  // 実機で B6 と B5 の行が丸ごと消えて、原因が分からなかったため
  try {

    // 大きさ。N 万四角形の球は sdAxis = sdHeight = √(N × 10000)
    const axis = Math.round(Math.sqrt(man * 10000));
    const big = { axis, height: axis };
    const mid = { axis: axis >> 1, height: axis >> 1 };
    const baseSize = { axis: Math.round(axis * 0.24), height: Math.round(axis * 0.24) };

    /* B0 — メッシュを作る */
    let heavy!: Mesh;
    const b0 = timeIt(1, () => {
      heavy = sphere(big.axis, big.height);
    });
    const quads = heavy.faceCount;
    await add({
      key: "B0",
      label: `メッシュを作る（${faces(quads)}）`,
      value: b0,
      unit: "ms",
      note: `頂点 ${heavy.vertexCount}`,
    });

    /* B1 — Catmull-Clark 1 レベル。JS と wasm を並べる（`30` の T3） */
    const wasm: WasmModule | null = await loadWasm();
    // 通し確認から「読めて呼べる」を見るため（`30` の T2）
    Object.assign(window, {
      macbethWasm: wasm ? { add: (a: number, b: number) => wasm.exports.mb_add(a, b), bytes: wasm.byteLength } : null,
    });
    const midMesh = sphere(mid.axis, mid.height);
    const midFaces = faces(midMesh.faceCount);
    const bigFaces = faces(quads);

    const b1mid = timeIt(3, () => void catmullClark(midMesh));
    await add({
      key: "B1a",
      label: `細分割 1 レベル JS（${midFaces}）`,
      value: b1mid,
      unit: "ms",
      note: "レベルを 1 つ上げる待ち時間",
    });
    if (wasm) {
      const w = timeIt(3, () => void buildFromGeometry(midMesh, subdivGeometry(wasm, midMesh)!));
      await add({
        key: "B1a-wasm",
        label: `細分割 1 レベル wasm（${midFaces}）`,
        value: w,
        unit: "ms",
        note: `JS の ${(b1mid / Math.max(w, 0.001)).toFixed(1)} 倍`,
      });
    }

    const b1big = timeIt(1, () => void catmullClark(heavy));
    await add({
      key: "B1b",
      label: `細分割 1 レベル JS（${bigFaces}）`,
      value: b1big,
      unit: "ms",
      target: 1500,
      note: "",
    });
    if (wasm) {
      // 形だけと、メッシュに組むところを分けて出す。組む側は JS のままなので、
      // ここが大きければ次は MeshBuilder を出す番になる
      let g = subdivGeometry(wasm, heavy)!;
      const wGeom = timeIt(1, () => {
        g = subdivGeometry(wasm, heavy)!;
      });
      const wBuild = timeIt(1, () => void buildFromGeometry(heavy, g));
      await add({
        key: "B1b-wasm",
        label: `細分割 1 レベル wasm（${bigFaces}）`,
        value: wGeom + wBuild,
        unit: "ms",
        target: 1500,
        note: "",
      });
      await add({
        key: "B1b-wasm-geom",
        label: "　うち wasm の計算",
        value: wGeom,
        unit: "ms",
        note: `JS 全体の ${(b1big / Math.max(wGeom + wBuild, 0.001)).toFixed(1)} 倍`,
      });
      await add({
        key: "B1b-wasm-build",
        label: "　うち JS でメッシュに組む",
        value: wBuild,
        unit: "ms",
        note: `wasm が使ったヒープ ${(wasm.used() / 1048576).toFixed(0)} MB`,
      });
    } else {
      await add({ key: "B1b-wasm", label: "細分割 1 レベル wasm", value: 0, unit: "ms", note: "wasm が読めない" });
    }

    /* B2 — 接空間デルタの取り直し（動いた頂点のぶんだけ） */
    // 段のボタンが実際に通る道で測る（`32` の T5）。wasm があればそれで組む
    const base = sphere(baseSize.axis, baseSize.height);
    const multi = new Multires(base, wasm ? { subdivide: (m) => buildFromGeometry(m, subdivGeometry(wasm, m)!) } : {});
    multi.divide();
    multi.divide();
    const heapBefore = heapMb();
    const b2build = timeIt(1, () => void multi.levels());
    const heapAfter = heapMb();
    const top = multi.level(2);
    await add({
      key: "B2a",
      label: `レベル 2 まで組む（${faces(top.faceCount)}）`,
      value: b2build,
      unit: "ms",
      note: `ベース ${base.faceCount} 面 · ${wasm ? "wasm" : "js"}`,
    });

    // 推定と実測を並べる。ずれていたら estimateLevelBytes の係数を直す（`32` の T5）
    //
    // ヒープの差だけを見ると、組んでいる間に前の行のゴミが掃除されて**負になる**
    // （実機で「実測は取れない」と出た）。Safari はそもそも数字を出さない。
    // なので **typed array の実サイズ**（どの端末でも正確に数えられる）を主に出し、
    // ヒープの差は取れたときだけ添える。
    const guess = estimateLevelBytes(multi.level(1).faceCount) + estimateLevelBytes(top.faceCount);
    const held = meshBytes(multi.level(1)) + meshBytes(top);
    const heapDelta = heapAfter - heapBefore;
    const parts = [`実データ ${(held / 1048576).toFixed(0)} MB（推定はその ${(guess / held).toFixed(1)} 倍）`];
    if (heapDelta > 0) parts.push(`ヒープ +${heapDelta.toFixed(0)} MB`);
    await add({
      key: "B2c",
      label: "レベル 2 までの推定メモリ",
      value: guess / 1048576,
      unit: "MB",
      note: parts.join(" · "),
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
    const triCount = (tris.tri.length / 3) | 0;
    const triMan = triCount >= 10000 ? `${(triCount / 10000) | 0} 万三角形` : `${triCount} 三角形`;
    let bvh = buildBvh(heavy.positions, tris);
    const b3build = timeIt(1, () => {
      bvh = buildBvh(heavy.positions, tris);
    });
    await add({
      key: "B3a",
      label: `BVH を作る（${triMan}）`,
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

    // `renderer.render` は GL に命令を積むだけで返る。そのまま測ると 0.3ms のような
    // 意味のない数字が出るので、**GPU が描き終わるのを待ってから**測る。
    // readPixels は積んだ命令を流し切ってから返るので、これで待てる
    const gl = vp.renderer.getContext();
    const px = new Uint8Array(4);
    const drawAndWait = () => {
      vp.renderer.render(vp.scene, vp.camera);
      gl.readPixels(0, 0, 1, 1, gl.RGBA, gl.UNSIGNED_BYTE, px);
    };
    for (let i = 0; i < 3; i++) drawAndWait(); // 温める
    const b4gpu = timeIt(10, drawAndWait);
    await add({
      key: "B4a",
      label: `描画 1 フレーム・GPU まで待つ（${triMan}）`,
      value: b4gpu,
      unit: "ms",
      target: 16,
      note: "",
    });

    // 実際に画面が動くときの間隔。60fps なら 16.7ms で頭打ちになる
    const gaps: number[] = [];
    await new Promise<void>((done) => {
      let last = performance.now();
      let n = 0;
      const tick = () => {
        vp.renderer.render(vp.scene, vp.camera);
        const now = performance.now();
        if (n > 5) gaps.push(now - last); // 最初の数コマは捨てる
        last = now;
        if (++n < 45) requestAnimationFrame(tick);
        else done();
      };
      requestAnimationFrame(tick);
    });
    await add({
      key: "B4b",
      label: "コマの間隔（実際に動かしたとき）",
      value: gaps.length ? median(gaps) : 0,
      unit: "ms",
      note: "60fps なら 16.7ms で頭打ち",
    });

    /* B6 — ストロークの 1 コマ（`33` の T5）。**ここが 16ms に入るかで決まる** */
    //
    // いちばん上の段で彫るのと、1 つ下で彫るのを分ける。下で彫ると上の段へ
    // 伝えるぶんだけ重くなるはずで、この 2 つは桁で違う見込み。
    app.state.doc.objects.length = 0;
    const sculpted = app.state.doc.addMesh(base.clone(), "bench-sculpt");
    sculpted.multires = multi.deltas.map((d, i) => ({
      level: i + 1,
      delta: d ? d.slice() : new Float32Array(multi.level(i + 1).vertexCount * 3),
    }));
    sculpted.activeLevel = 2;
    app.state.select(sculpted);
    app.setMode("sculpt");
    app.viewport.syncAll();
    app.viewport.frameSelected();
    app.refresh();
    await breathe();

    const stack = levelsOf(sculpted);
    const brushRadius = fitBrushRadius(sculpted);
    const strokeAt = (level: number): { ms: number; verts: number } => {
      sculpted.activeLevel = level;
      app.viewport.rebuildObject(sculpted);
      const view = app.viewport.viewOf(sculpted)!;
      const target = app.viewport.meshOf(sculpted);
      // てっぺんのあたりを 1 回なでる。
      //
      // **Math.max(...配列) を使わないこと。** 100 万四角形のレベル 2 では
      // 頂点が 92 万個あり、引数に展開するとスタックが溢れてベンチごと落ちる
      // （実機で B6 と B5 の行が丸ごと出なかった原因）。
      let topY = -Infinity;
      for (let i = 1; i < target.positions.length; i += 3) {
        if (target.positions[i] > topY) topY = target.positions[i];
      }
      const point: [number, number, number] = [0, topY, 0];
      let touched = 0;
      const ms = timeIt(5, () => {
        const fp = strokeFootprint(target, app.viewport.bvhOf(view), view.tri.tri, point, brushRadius);
        const moved = applyStroke(target, fp, view.tri.tri, {
          kind: "standard",
          point,
          radius: brushRadius,
          strength: 0.5,
          invert: false,
        });
        touched = moved.length;
        stack.sculptAt(level, moved);
        app.viewport.refreshMoved(sculpted, moved);
      });
      return { ms, verts: touched };
    };

    const topStroke = strokeAt(2);
    await add({
      key: "B6a",
      label: `ストロークの 1 コマ・いちばん上の段（${faces(multi.level(2).faceCount)}）`,
      value: topStroke.ms,
      unit: "ms",
      target: 16,
      note: "",
    });
    const below = strokeAt(1);
    await add({
      key: "B6b",
      label: "ストロークの 1 コマ・1 つ下の段（上へ伝える）",
      value: below.ms,
      unit: "ms",
      target: 16,
      note: `触った頂点 上 ${topStroke.verts} / 下 ${below.verts}`,
    });

    /* B5 — メモリ */
    const now = heapMb();
    peak = Math.max(peak, now);
    await add({
      key: "B5",
      label: "いちばん使ったメモリ",
      value: peak,
      unit: "MB",
      note: now ? `終わった時点で ${now.toFixed(0)} MB` : "この端末では取れない",
    });

  } catch (err) {
    await add({
      key: "error",
      label: "途中で落ちました",
      value: rows.length,
      unit: " 行目まで",
      note: err instanceof Error ? `${err.name}: ${err.message}` : String(err),
    });
  }
  paint("終わりました");

  const again = el("button", "act", "もう一度");
  again.addEventListener("click", () => {
    panel.remove();
    void runBench(app, quick, man);
  });
  // 大きさを選び直す。100 万で落ちる端末は小さい方で測る
  const sizeButtons = SIZES.map((n) => {
    const b = el("button", "act", `${n} 万`);
    if (!quick && n === man) b.dataset.on = "true";
    b.addEventListener("click", () => {
      panel.remove();
      void runBench(app, false, n);
    });
    return b;
  });
  const copy = el("button", "act", "コピー");
  const json = () =>
    JSON.stringify(
      {
        agent: navigator.userAgent,
        cores: navigator.hardwareConcurrency ?? null,
        dpr: window.devicePixelRatio,
        quick,
        man,
        rows: rows.map((r) => ({ key: r.key, label: r.label, value: +r.value.toFixed(2), unit: r.unit, target: r.target, note: r.note || undefined })),
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
  foot.append(again, ...sizeButtons, copy, close);
  // 通し確認から読むため
  panel.dataset.done = "true";
  Object.assign(window, { macbethBench: json });
}
