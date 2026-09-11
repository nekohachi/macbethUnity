/**
 * ZIP を書く（`48` の T1）。**無圧縮（store）だけ。**
 *
 * 中身は PNG で、もう縮んでいる。deflate を持ち込んでもバイトはほとんど減らず、
 * タブレットでは圧縮そのものが重い。2K の絵 7 枚で 30MB ほど。
 *
 * 出す形は ZIP の最小構成:
 *   ローカルヘッダ + 中身 …（ファイルの数だけ）… + 中央ディレクトリ + EOCD
 *
 * 名前は **UTF-8**（オブジェクト名に日本語が入る）。汎用フラグの bit 11 を立てて
 * 「名前は UTF-8」と申告する。日付は 0 で置く（再現できる出力になるほうが嬉しい）。
 * ZIP64 は作らない（4GB を超える書き出しは当分来ない）。
 */

/** ZIP に入れる 1 つ。`name` はフォルダを含んでよい（`/` 区切り）。 */
export interface ZipEntry {
  name: string;
  data: Uint8Array;
}

/** CRC-32 の表。最初に使うときだけ作る。 */
let CRC_TABLE: Uint32Array | null = null;

function crcTable(): Uint32Array {
  if (CRC_TABLE) return CRC_TABLE;
  const table = new Uint32Array(256);
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    table[n] = c >>> 0;
  }
  CRC_TABLE = table;
  return table;
}

/** ZIP と PNG が使う CRC-32。 */
export function crc32(data: Uint8Array): number {
  const table = crcTable();
  let c = 0xffffffff;
  for (let i = 0; i < data.length; i++) c = table[(c ^ data[i]) & 0xff] ^ (c >>> 8);
  return (c ^ 0xffffffff) >>> 0;
}

/** 無圧縮の ZIP を 1 つ作る。並びは渡した順のまま。 */
export function zipStore(entries: ZipEntry[]): Uint8Array {
  const encoder = new TextEncoder();
  const names = entries.map((e) => encoder.encode(e.name));
  const crcs = entries.map((e) => crc32(e.data));

  let size = 0;
  for (let i = 0; i < entries.length; i++) {
    size += 30 + names[i].byteLength + entries[i].data.byteLength; // ローカルヘッダ + 名前 + 中身
    size += 46 + names[i].byteLength; // 中央ディレクトリ
  }
  size += 22; // EOCD

  const out = new Uint8Array(size);
  const dv = new DataView(out.buffer);
  let at = 0;
  const offsets: number[] = [];

  for (let i = 0; i < entries.length; i++) {
    const name = names[i];
    const data = entries[i].data;
    offsets.push(at);
    dv.setUint32(at, 0x04034b50, true); // ローカルヘッダの署名
    dv.setUint16(at + 4, 20, true); // 展開に要る版（2.0）
    dv.setUint16(at + 6, 0x0800, true); // bit 11 = 名前は UTF-8
    dv.setUint16(at + 8, 0, true); // 0 = 無圧縮
    dv.setUint16(at + 10, 0, true); // 時刻
    dv.setUint16(at + 12, 0, true); // 日付
    dv.setUint32(at + 14, crcs[i], true);
    dv.setUint32(at + 18, data.byteLength, true); // 縮めた後
    dv.setUint32(at + 22, data.byteLength, true); // 元の大きさ
    dv.setUint16(at + 26, name.byteLength, true);
    dv.setUint16(at + 28, 0, true); // 追加欄なし
    at += 30;
    out.set(name, at);
    at += name.byteLength;
    out.set(data, at);
    at += data.byteLength;
  }

  const dirAt = at;
  for (let i = 0; i < entries.length; i++) {
    const name = names[i];
    const data = entries[i].data;
    dv.setUint32(at, 0x02014b50, true); // 中央ディレクトリの署名
    dv.setUint16(at + 4, 20, true); // 作った版
    dv.setUint16(at + 6, 20, true); // 展開に要る版
    dv.setUint16(at + 8, 0x0800, true);
    dv.setUint16(at + 10, 0, true);
    dv.setUint16(at + 12, 0, true);
    dv.setUint16(at + 14, 0, true);
    dv.setUint32(at + 16, crcs[i], true);
    dv.setUint32(at + 20, data.byteLength, true);
    dv.setUint32(at + 24, data.byteLength, true);
    dv.setUint16(at + 28, name.byteLength, true);
    dv.setUint16(at + 30, 0, true); // 追加欄
    dv.setUint16(at + 32, 0, true); // 注釈
    dv.setUint16(at + 34, 0, true); // ディスク番号
    dv.setUint16(at + 36, 0, true); // 内部属性
    dv.setUint32(at + 38, 0, true); // 外部属性
    dv.setUint32(at + 42, offsets[i], true); // ローカルヘッダの位置
    at += 46;
    out.set(name, at);
    at += name.byteLength;
  }

  dv.setUint32(at, 0x06054b50, true); // EOCD の署名
  dv.setUint16(at + 4, 0, true); // このディスク
  dv.setUint16(at + 6, 0, true); // 中央ディレクトリのあるディスク
  dv.setUint16(at + 8, entries.length, true); // このディスクの中の数
  dv.setUint16(at + 10, entries.length, true); // 全部の数
  dv.setUint32(at + 12, at - dirAt, true); // 中央ディレクトリの大きさ
  dv.setUint32(at + 16, dirAt, true); // 中央ディレクトリの位置
  dv.setUint16(at + 20, 0, true); // 注釈
  return out;
}
