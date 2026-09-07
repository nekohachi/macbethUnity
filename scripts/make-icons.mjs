/**
 * public/icon.svg から PWA 用の PNG を作る。
 * iOS のホーム画面は SVG を受け付けないので PNG が要る。
 *   node scripts/make-icons.mjs
 */
import { chromium } from "playwright";
import { readFile, writeFile } from "node:fs/promises";

const CHROME = process.env.CHROME_PATH ?? "/opt/pw-browsers/chromium-1194/chrome-linux/chrome";
const SIZES = [
  { size: 192, file: "public/icon-192.png" },
  { size: 512, file: "public/icon-512.png" },
  { size: 180, file: "public/apple-touch-icon.png" },
];

const svg = await readFile("public/icon.svg", "utf8");
const browser = await chromium.launch({ executablePath: CHROME });
for (const { size, file } of SIZES) {
  const page = await browser.newPage({ viewport: { width: size, height: size }, deviceScaleFactor: 1 });
  await page.setContent(
    `<style>html,body{margin:0;padding:0}svg{display:block;width:${size}px;height:${size}px}</style>${svg}`,
  );
  await writeFile(file, await page.screenshot({ omitBackground: false }));
  await page.close();
  console.log(`${file} (${size}px)`);
}
await browser.close();
