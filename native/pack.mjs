/**
 * `src/wasm/macbeth.wasm` を TypeScript に包む（`30` の T2）。
 *
 * base64 で抱えるので、**取りに行く処理が要らない**。ブラウザでも Node でも
 * 同じ 1 本が動き、オフライン（サービスワーカー）でも取りこぼさない。
 * 呼び口は動的 import なので、ふだんのバンドルには入らない。
 *
 *   node native/pack.mjs
 */
import { readFileSync, writeFileSync } from "node:fs";

const bytes = readFileSync("src/wasm/macbeth.wasm");
const b64 = bytes.toString("base64");

// 1 行が長すぎると差分が読めないので折る
const lines = [];
for (let i = 0; i < b64.length; i += 96) lines.push(`  "${b64.slice(i, i + 96)}",`);

const out = `/**
 * **自動生成。手で触らないこと。** \`native/build.sh\` が書き出す。
 *
 * ${bytes.length} バイトの wasm を base64 で抱えている。元は \`native/*.c\`。
 */

/** base64 の断片。つないでから復号する。 */
const CHUNKS = [
${lines.join("\n")}
];

/** wasm の中身を取り出す。 */
export function wasmBuffer(): ArrayBuffer {
  const b64 = CHUNKS.join("");
  // Node にもブラウザにもある atob を使う（Node 16 以降）
  const raw = atob(b64);
  const buffer = new ArrayBuffer(raw.length);
  const out = new Uint8Array(buffer);
  for (let i = 0; i < raw.length; i++) out[i] = raw.charCodeAt(i);
  return buffer;
}

/** 生の wasm の大きさ（バイト）。 */
export const WASM_BYTE_LENGTH = ${bytes.length};
`;

writeFileSync("src/wasm/bytes.ts", out);
console.log(`包みました: src/wasm/bytes.ts（${bytes.length} バイト → base64 ${b64.length} 文字）`);
