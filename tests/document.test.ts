/**
 * シーンの保存と読み直し（`11` の `.mbz`）。
 *
 * ここで見るのは「往復しても状態が残るか」。表示 / ロックのような
 * レイヤーの状態は UI だけのものに見えるが、保存に入っていないと
 * ファイルを開き直したとたんに消える。
 */
import { describe, expect, it } from "vitest";
import { Document } from "../src/core/document.js";
import { packMbz, unpackMbz } from "../src/core/io/mbz.js";

describe("D1. .mbz の往復", () => {
  it("表示とロックが残る", () => {
    const doc = new Document();
    const a = doc.addObject("cube");
    const b = doc.addObject("sphere");
    a.locked = true;
    b.visible = false;
    b.name = "かくれんぼ";

    const { document: back } = unpackMbz(packMbz(doc));
    expect(back.objects.length).toBe(2);
    expect(back.objects[0].locked).toBe(true);
    expect(back.objects[0].visible).toBe(true);
    expect(back.objects[1].locked).toBe(false);
    expect(back.objects[1].visible).toBe(false);
    expect(back.objects[1].name).toBe("かくれんぼ");
  });

  it("古い保存物（ロックが無いもの）はロックなしで読める", () => {
    const doc = new Document();
    doc.addObject("cube");
    const { document: back } = unpackMbz(packMbz(doc));
    expect(back.objects[0].locked).toBe(false);
  });
});
