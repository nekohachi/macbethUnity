/**
 * ZIP の書き出し（`48` の T1）。
 *
 * 見るのは 5 つ。署名、数、中身がそのまま入っていること、
 * 日本語の名前が UTF-8 で入ること、空でも壊れないこと。
 */
import { describe, expect, it } from "vitest";
import { crc32, zipStore } from "../src/core/io/zip.js";

const bytes = (...v: number[]) => Uint8Array.from(v);
const u32 = (z: Uint8Array, at: number) => new DataView(z.buffer, z.byteOffset, z.byteLength).getUint32(at, true);
const u16 = (z: Uint8Array, at: number) => new DataView(z.buffer, z.byteOffset, z.byteLength).getUint16(at, true);

/** EOCD を読んで、中央ディレクトリの位置と数を返す。 */
function eocd(z: Uint8Array): { count: number; dirAt: number; dirSize: number } {
  const at = z.byteLength - 22;
  expect(u32(z, at)).toBe(0x06054b50);
  return { count: u16(z, at + 8), dirAt: u32(z, at + 16), dirSize: u32(z, at + 12) };
}

/** ローカルヘッダを 1 つ読む。 */
function local(z: Uint8Array, at: number): { name: string; crc: number; size: number; data: Uint8Array; next: number; utf8: boolean } {
  expect(u32(z, at)).toBe(0x04034b50);
  const flags = u16(z, at + 6);
  const crc = u32(z, at + 14);
  const size = u32(z, at + 22);
  const nameLen = u16(z, at + 26);
  const extra = u16(z, at + 28);
  const name = new TextDecoder().decode(z.subarray(at + 30, at + 30 + nameLen));
  const start = at + 30 + nameLen + extra;
  return { name, crc, size, data: z.subarray(start, start + size), next: start + size, utf8: (flags & 0x0800) !== 0 };
}

describe("Z1. ZIP の容器（`48` の T1）", () => {
  it("署名が前後にあり、無圧縮で入る", () => {
    const z = zipStore([{ name: "a.txt", data: bytes(1, 2, 3) }]);
    expect(u32(z, 0)).toBe(0x04034b50);
    expect(u16(z, 8)).toBe(0); // 0 = 無圧縮
    expect(eocd(z).count).toBe(1);
  });

  it("入れた数だけ並び、中身がそのまま取り出せる", () => {
    const files = [
      { name: "Head.glb", data: bytes(0x67, 0x6c, 0x54, 0x46) },
      { name: "Head_normal.png", data: Uint8Array.from({ length: 500 }, (_, i) => i % 256) },
      { name: "Head_ao.png", data: bytes(9, 9, 9) },
    ];
    const z = zipStore(files);
    const { count, dirAt, dirSize } = eocd(z);
    expect(count).toBe(3);
    expect(dirAt + dirSize).toBe(z.byteLength - 22);

    let at = 0;
    for (const want of files) {
      const got = local(z, at);
      expect(got.name).toBe(want.name);
      expect(got.size).toBe(want.data.byteLength);
      expect([...got.data]).toEqual([...want.data]);
      expect(got.crc).toBe(crc32(want.data));
      at = got.next;
    }
    expect(at).toBe(dirAt);
  });

  it("日本語の名前は UTF-8 で入り、フラグが立つ", () => {
    const z = zipStore([{ name: "頭_normal.png", data: bytes(7) }]);
    const got = local(z, 0);
    expect(got.name).toBe("頭_normal.png");
    expect(got.utf8).toBe(true);
  });

  it("空でも EOCD だけの正しい ZIP になる", () => {
    const z = zipStore([]);
    expect(z.byteLength).toBe(22);
    const { count, dirAt, dirSize } = eocd(z);
    expect(count).toBe(0);
    expect(dirAt).toBe(0);
    expect(dirSize).toBe(0);
  });

  it("CRC-32 は知られている値と合う", () => {
    // "123456789" の CRC-32 は 0xCBF43926（よく使われる検査値）
    expect(crc32(new TextEncoder().encode("123456789"))).toBe(0xcbf43926);
    expect(crc32(new Uint8Array(0))).toBe(0);
  });
});
