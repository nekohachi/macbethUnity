/**
 * 履歴の差分化（`29` の B-T4）。
 *
 * 見るのは 3 つ。差分で戻ってやり直せること、トポロジを変えたものは
 * 今までどおり全複製で戻ること、そして**大きなメッシュを複製しないこと**。
 * ここが崩れるとスカルプトの規模で成り立たない。
 */
import { describe, expect, it } from "vitest";
import { AppState } from "../src/app/state.js";
import { History } from "../src/app/history.js";
import { extrudeFaces } from "../src/core/index.js";

/** 立方体 1 つのシーンと履歴。 */
function scene(kind = "cube") {
  const state = new AppState();
  const o = state.doc.addObject(kind);
  state.selected = o;
  const history = new History(state);
  return { state, o, history };
}

describe("履歴の差分化", () => {
  it("座標の差分で戻ってやり直せる", () => {
    const { o, history } = scene();
    const before = Float32Array.from(o.mesh.positions);

    history.beginPositions(o, [0, 1, 2]);
    for (const v of [0, 1, 2]) o.mesh.setPosition(v, v + 0.5, v + 0.25, v - 0.75);
    expect(history.commitPending("移動")).toBe(true);
    expect(history.lastEntry()?.kind).toBe("positions");
    const after = Float32Array.from(o.mesh.positions);

    history.undo();
    expect([...o.mesh.positions]).toEqual([...before]);
    history.redo();
    expect([...o.mesh.positions]).toEqual([...after]);
  });

  it("動いていなければ積まない", () => {
    const { o, history } = scene();
    history.beginPositions(o, [0, 1]);
    expect(history.commitPending("移動")).toBe(false);
    expect(history.canUndo).toBe(false);
  });

  it("トランスフォームの差分", () => {
    const { o, history } = scene();
    history.beginTransform(o);
    o.transform.position = [1, 2, 3];
    expect(history.commitPending("移動")).toBe(true);
    expect(history.lastEntry()?.kind).toBe("transform");
    history.undo();
    expect(o.transform.position).toEqual([0, 0, 0]);
    history.redo();
    expect(o.transform.position).toEqual([1, 2, 3]);
  });

  it("トポロジを変えたものは全複製で戻る", () => {
    const { o, history } = scene();
    const faces = o.mesh.faceCount;
    const verts = o.mesh.vertexCount;

    history.commit("押し出し", history.snapshot());
    o.mesh = extrudeFaces(o.mesh, [0], 0.4)!.mesh;
    expect(o.mesh.faceCount).toBeGreaterThan(faces);
    expect(history.lastEntry()?.kind).toBe("full");

    history.undo();
    expect(o.mesh.faceCount).toBe(faces);
    expect(o.mesh.vertexCount).toBe(verts);
    history.redo();
    expect(o.mesh.faceCount).toBeGreaterThan(faces);
  });

  it("差分に切り替えたものを全複製へ格上げできる（ウェルドの経路）", () => {
    const { o, history } = scene();
    const before = Float32Array.from(o.mesh.positions);
    history.beginPositions(o, [0]);
    o.mesh.setPosition(0, 5, 5, 5);

    // 途中でトポロジが変わると分かったので全複製に切り替える。
    // 控えは「動かす前」の姿で、今のメッシュは「動かした後」のまま
    const snap = history.upgradeToFull();
    expect(snap).not.toBeNull();
    expect(o.mesh.getPosition(0)).toEqual([5, 5, 5]);

    o.mesh = extrudeFaces(o.mesh, [0], 0.3)!.mesh;
    history.commit("ターゲットウェルド", snap!);
    history.undo();
    // 動かす前まで戻る（座標もトポロジも）
    expect([...o.mesh.positions]).toEqual([...before]);
  });

  it("大きなメッシュでも差分は小さいまま", () => {
    const { o, history } = scene("sphere");
    // 4 万四角形ほど。全複製なら 1 段で 1MB を越える
    o.params.sdAxis = 200;
    o.params.sdHeight = 200;
    o.rebuild();
    const buffer = o.mesh.positions.buffer;
    expect(o.mesh.vertexCount).toBeGreaterThan(30000);

    for (let step = 0; step < 40; step++) {
      history.beginPositions(o, [step]);
      o.mesh.setPosition(step, 3 + step * 0.01, 4, 5);
      expect(history.commitPending("移動")).toBe(true);
    }
    // 座標の入れ物は同じまま（複製していない）
    expect(o.mesh.positions.buffer).toBe(buffer);
    // 1 段は数十バイト。40 段でも 1MB には遠い
    expect(history.lastEntry()!.bytes).toBeLessThan(256);
  });

  it("全複製の段は大きい（比較のため）", () => {
    const { o, history } = scene("sphere");
    o.params.sdAxis = 200;
    o.params.sdHeight = 200;
    o.rebuild();
    history.commit("押し出し", history.snapshot());
    // 差分の 1000 倍以上あることを確かめる（ここを差分にした意味）
    expect(history.lastEntry()!.bytes).toBeGreaterThan(256 * 1000);
  });
});
