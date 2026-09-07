/**
 * マーキングメニュー（8 方位固定のサークルメニュー）。
 *
 * Maya と同じで方位は固定。指を出した向きで候補が決まり、離した時点で決定する。
 * 中心へ戻して離せばキャンセル。方位が固定なので、慣れれば見ないで出せる。
 */

export const DIRECTIONS = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"] as const;
export type Direction = (typeof DIRECTIONS)[number];

export interface RadialItem {
  label: string;
  /** 英語名やショートカット。小さく併記する。 */
  sub?: string;
  /** 24×24 の SVG フラグメント（ui/icons.ts の値）。 */
  icon?: string;
  run(): void;
}

export type RadialMenu = Partial<Record<Direction, RadialItem>>;

const NS = "http://www.w3.org/2000/svg";
const RING_OUTER = 132;
const RING_INNER = 40;
/** 中心からこれ以内はキャンセル扱い。 */
const DEAD_RADIUS = 30;

interface Slice {
  path: SVGPathElement;
  icon: SVGGElement;
  item: RadialItem;
  index: number;
}

let open: {
  host: HTMLElement;
  slices: Array<Slice | null>;
  cx: number;
  cy: number;
  selected: number;
} | null = null;

function arcPath(cx: number, cy: number, r0: number, r1: number, a0: number, a1: number): string {
  const x0 = cx + Math.cos(a0) * r1;
  const y0 = cy + Math.sin(a0) * r1;
  const x1 = cx + Math.cos(a1) * r1;
  const y1 = cy + Math.sin(a1) * r1;
  const x2 = cx + Math.cos(a1) * r0;
  const y2 = cy + Math.sin(a1) * r0;
  const x3 = cx + Math.cos(a0) * r0;
  const y3 = cy + Math.sin(a0) * r0;
  return `M${x0},${y0}A${r1},${r1} 0 0 1 ${x1},${y1}L${x2},${y2}A${r0},${r0} 0 0 0 ${x3},${y3}Z`;
}

function text(cls: string | null, x: number, y: number, content: string): SVGTextElement {
  const t = document.createElementNS(NS, "text");
  if (cls) t.setAttribute("class", cls);
  t.setAttribute("x", String(x));
  t.setAttribute("y", String(y));
  t.setAttribute("text-anchor", "middle");
  t.textContent = content;
  return t;
}

export function openRadial(menu: RadialMenu, clientX: number, clientY: number): void {
  closeRadial();
  // 画面の端で切れないように中心を寄せる
  const cx = Math.max(RING_OUTER + 16, Math.min(window.innerWidth - RING_OUTER - 16, clientX));
  const cy = Math.max(RING_OUTER + 16, Math.min(window.innerHeight - RING_OUTER - 16, clientY));

  const host = document.createElement("div");
  host.className = "radial";
  host.addEventListener("touchstart", (e) => e.preventDefault(), { passive: false });
  host.addEventListener("touchmove", (e) => e.preventDefault(), { passive: false });
  const svg = document.createElementNS(NS, "svg");
  host.appendChild(svg);
  document.body.appendChild(host);

  const slices: Array<Slice | null> = [];
  for (let i = 0; i < 8; i++) {
    const item = menu[DIRECTIONS[i]];
    const a0 = ((i * 45 - 22.5 - 90) * Math.PI) / 180;
    const a1 = ((i * 45 + 22.5 - 90) * Math.PI) / 180;
    const path = document.createElementNS(NS, "path");
    path.setAttribute("d", arcPath(cx, cy, RING_INNER, RING_OUTER, a0, a1));
    path.setAttribute("fill", item ? "#2c3238" : "#23272c");
    path.setAttribute("stroke", "#171a1e");
    path.setAttribute("stroke-width", "1");
    path.setAttribute("opacity", item ? "1" : ".45");
    svg.appendChild(path);
    if (!item) {
      slices.push(null);
      continue;
    }
    const mid = (a0 + a1) / 2;
    const tr = (RING_INNER + RING_OUTER) / 2;
    const tx = cx + Math.cos(mid) * tr;
    const ty = cy + Math.sin(mid) * tr;

    const g = document.createElementNS(NS, "g");
    g.setAttribute("transform", `translate(${tx - 10},${ty - 23}) scale(0.84)`);
    g.setAttribute("fill", "none");
    g.setAttribute("stroke", "#dfe5ea");
    g.setAttribute("stroke-width", "1.6");
    g.setAttribute("stroke-linecap", "round");
    g.setAttribute("stroke-linejoin", "round");
    g.innerHTML = item.icon ?? "";
    svg.appendChild(g);
    svg.appendChild(text(null, tx, ty + 10, item.label));
    svg.appendChild(text("sub", tx, ty + 21, item.sub ?? ""));
    slices.push({ path, icon: g, item, index: i });
  }

  const hub = document.createElementNS(NS, "circle");
  hub.setAttribute("cx", String(cx));
  hub.setAttribute("cy", String(cy));
  hub.setAttribute("r", String(RING_INNER - 2));
  hub.setAttribute("fill", "#20242a");
  hub.setAttribute("stroke", "#3d454e");
  svg.appendChild(hub);
  svg.appendChild(text("sub", cx, cy + 4, "キャンセル"));

  open = { host, slices, cx, cy, selected: -1 };
  window.addEventListener("pointermove", onMove);
  window.addEventListener("pointerup", onUp);
  window.addEventListener("pointercancel", onUp);
}

function onMove(e: PointerEvent): void {
  if (!open) return;
  const dx = e.clientX - open.cx;
  const dy = e.clientY - open.cy;
  let sel = -1;
  if (Math.hypot(dx, dy) >= DEAD_RADIUS) {
    // 北を 0 にして 45° ごとに割る。22.5° 足してから割ると境界が方位の真ん中に来る
    const deg = ((Math.atan2(dy, dx) * 180) / Math.PI + 90 + 360 + 22.5) % 360;
    const i = Math.floor(deg / 45);
    if (open.slices[i]) sel = i;
  }
  if (sel === open.selected) return;
  for (const s of open.slices) {
    if (!s) continue;
    const on = s.index === sel;
    s.path.setAttribute("fill", on ? "#2f5f7d" : "#2c3238");
    s.path.setAttribute("stroke", on ? "#4f9fd1" : "#171a1e");
    s.icon.setAttribute("stroke", on ? "#ffffff" : "#dfe5ea");
  }
  open.selected = sel;
  if (sel >= 0) navigator.vibrate?.(6);
}

function onUp(): void {
  if (!open) return;
  const { selected, slices } = open;
  closeRadial();
  if (selected >= 0) slices[selected]?.item.run();
}

export function closeRadial(): void {
  if (!open) return;
  window.removeEventListener("pointermove", onMove);
  window.removeEventListener("pointerup", onUp);
  window.removeEventListener("pointercancel", onUp);
  open.host.remove();
  open = null;
}

export function isRadialOpen(): boolean {
  return open !== null;
}
