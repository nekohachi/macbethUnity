/**
 * チェッカーのテクスチャ（`23` の T3）。
 *
 * 2D の下地（`uv/uvView.ts`）と 3D の「チェッカー」表示（`materials.ts`）で
 * 同じものを使う。前は 2 か所に別々の市松があって、細かさを変えても
 * 片方しか変わらなかった。
 */
import { CanvasTexture, NearestFilter, RepeatWrapping } from "three";

/** 市松 = 今までのもの。カラーグリッド = Blender の UV グリッドに近いもの。 */
export type CheckerPattern = "checker" | "colorGrid";

export interface CheckerOptions {
  /** 1 辺のマス数。4 / 8 / 16 / 32 / 64。 */
  cells: number;
  pattern: CheckerPattern;
  /**
   * 明るさ。`light` は 3D のマテリアル、`dark` は 2D の下地
   * （2D は島を目立たせたいので暗い）。
   */
  tone?: "light" | "dark";
  /** 左下のマスを橙にして向きを示す（3D 側だけ）。 */
  mark?: boolean;
}

/** カラーグリッドの色相。45° ずつ 8 色。 */
const HUES = 8;

export function checkerTexture(options: CheckerOptions): CanvasTexture {
  const cells = Math.max(1, Math.round(options.cells));
  const tone = options.tone ?? "light";
  const size = Math.min(1024, Math.max(256, cells * 16));
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d")!;
  const step = size / cells;

  if (options.pattern === "colorGrid") drawColorGrid(ctx, cells, step, size, tone);
  else drawChecker(ctx, cells, step, tone);

  if (options.mark) {
    ctx.fillStyle = "#e0723c";
    ctx.fillRect(0, size - step, step, step);
  }

  const texture = new CanvasTexture(canvas);
  texture.wrapS = RepeatWrapping;
  texture.wrapT = RepeatWrapping;
  // 拡大しても境目をはっきり見せる（歪みを見るための下地なので）
  texture.magFilter = NearestFilter;
  return texture;
}

function drawChecker(
  ctx: CanvasRenderingContext2D,
  cells: number,
  step: number,
  tone: "light" | "dark",
): void {
  const [a, b] = tone === "dark" ? ["#333a42", "#282e35"] : ["#d7dde3", "#7d8891"];
  for (let y = 0; y < cells; y++) {
    for (let x = 0; x < cells; x++) {
      ctx.fillStyle = (x + y) % 2 === 0 ? a : b;
      ctx.fillRect(x * step, y * step, step, step);
    }
  }
}

/**
 * 大きなマスごとに色相が変わり、その中は細い線で割ってある。
 * 数字は入れない（ズームすると読めないことが多いので）。
 */
function drawColorGrid(
  ctx: CanvasRenderingContext2D,
  cells: number,
  step: number,
  size: number,
  tone: "light" | "dark",
): void {
  const block = Math.max(1, Math.round(cells / HUES));
  const light = tone === "dark" ? 0.26 : 0.58;
  for (let y = 0; y < cells; y++) {
    for (let x = 0; x < cells; x++) {
      const bx = Math.floor(x / block);
      const by = Math.floor(y / block);
      const hue = (((bx + by * 3) % HUES) * 360) / HUES;
      // 同じ色の中でも市松に少し明暗をつけて、マスの数が数えられるようにする
      const l = light + ((x + y) % 2 === 0 ? 0.06 : -0.06);
      ctx.fillStyle = hsl(hue, tone === "dark" ? 0.42 : 0.5, l);
      ctx.fillRect(x * step, y * step, step, step);
    }
  }
  // マスの境の細い線
  ctx.strokeStyle = tone === "dark" ? "rgba(0,0,0,.55)" : "rgba(20,26,31,.45)";
  ctx.lineWidth = 1;
  for (let i = 0; i <= cells; i++) {
    const at = Math.round(i * step) + 0.5;
    ctx.beginPath();
    ctx.moveTo(at, 0);
    ctx.lineTo(at, size);
    ctx.moveTo(0, at);
    ctx.lineTo(size, at);
    ctx.stroke();
  }
}

function hsl(h: number, s: number, l: number): string {
  return `hsl(${h.toFixed(0)} ${(s * 100).toFixed(0)}% ${(Math.max(0, Math.min(1, l)) * 100).toFixed(0)}%)`;
}
