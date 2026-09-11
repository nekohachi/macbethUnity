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
// 指 2 本・3 本で開くので、指と手のひらで隠れないだけの大きさが要る（実機の要望）
const RING_OUTER = 176;
const RING_INNER = 56;
/** 中心からこれ以内はキャンセル扱い。 */
const DEAD_RADIUS = 42;
/** これだけ動くまでは何も選ばない（寄せた輪での誤爆よけ）。 */
const MOVE_MIN = 14;
/** ボタンからこれだけ引いたら、長押しを待たずに輪を開く。 */
const OPEN_DRAG = 24;


interface Slice {
  path: SVGPathElement;
  icon: SVGGElement;
  item: RadialItem;
  index: number;
}

/** 輪の下に並べる一覧の 1 行。カメラのように数が決まらないものに使う。 */
interface Row {
  rect: SVGRectElement;
  label: SVGTextElement;
  item: RadialItem;
  top: number;
}

const ROW_WIDTH = 208;
const ROW_HEIGHT = 32;
/** 輪の下端から一覧までの間。 */
const ROW_GAP = 14;

let open: {
  host: HTMLElement;
  slices: Array<Slice | null>;
  rows: Row[];
  cx: number;
  cy: number;
  /** 押した点（`41` の T3）。**向きはここから測る。** */
  px: number;
  py: number;
  selected: number;
  /** 一覧の選択。方位とは排他。 */
  selectedRow: number;
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

/**
 * サークルメニューを開く。
 * `list` を渡すと輪の下に一覧を並べる（数が決まらないもの。カメラなど）。
 */
export function openRadial(
  menu: RadialMenu,
  clientX: number,
  clientY: number,
  list: RadialItem[] = [],
): void {
  closeRadial();
  // 一覧がある分だけ下の余白も見る
  const below = list.length ? ROW_GAP + list.length * ROW_HEIGHT : 0;
  // **横には寄せない**（`50` の直し）。輪を丸ごと画面へ入れようとして横へ寄せると、
  // 押した点と中心が 100px 近く離れ、「見えている区画」と「引いた向き」が食い違う。
  // 画面の端（ツール列）で押すのはまさにその場面で、目で見た所を押しても選べなかった。
  //
  // 中心は**押した点のまま**にして、画面から出そうな**文字だけ**を内側へ寄せる
  // （下の `clampText`）。こうすると 2 つの読み方が常に一致する。
  // 縦だけは一覧が画面に収まるよう寄せる（縦のずれは北と南の読みを変えない）。
  const edge = RING_OUTER + 12;
  const cx = clientX;
  const cy = Math.max(edge, Math.min(Math.max(edge, window.innerHeight - edge - below), clientY));
  /** 文字が画面から出ないよう、x を内側へ寄せる。返すのは寄せたぶん。 */
  const clampText = (t: SVGTextElement, x: number): number => {
    const half = (t.getComputedTextLength?.() ?? 0) / 2 + 6;
    const at = Math.max(half + 4, Math.min(window.innerWidth - half - 4, x));
    if (at !== x) t.setAttribute("x", String(at));
    return at - x;
  };

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
    g.setAttribute("transform", `translate(${tx - 12},${ty - 28}) scale(1)`);
    g.setAttribute("fill", "none");
    g.setAttribute("stroke", "#dfe5ea");
    g.setAttribute("stroke-width", "1.6");
    g.setAttribute("stroke-linecap", "round");
    g.setAttribute("stroke-linejoin", "round");
    g.innerHTML = item.icon ?? "";
    svg.appendChild(g);
    const label = text(null, tx, ty + 12, item.label);
    const sub = text("sub", tx, ty + 26, item.sub ?? "");
    svg.appendChild(label);
    svg.appendChild(sub);
    // 画面から出そうな文字は内側へ。アイコンも同じだけ動かして、離れないようにする
    const shift = clampText(label, tx);
    clampText(sub, tx);
    if (shift) g.setAttribute("transform", `translate(${tx - 12 + shift},${ty - 28}) scale(1)`);
    slices.push({ path, icon: g, item, index: i });
  }

  // 押した点と輪を細い線でつなぐ。「ここから引く」が見える（`41` の T3）
  if (Math.hypot(cx - clientX, cy - clientY) > 1) {
    const link = document.createElementNS(NS, "line");
    link.setAttribute("x1", String(clientX));
    link.setAttribute("y1", String(clientY));
    link.setAttribute("x2", String(cx));
    link.setAttribute("y2", String(cy));
    link.setAttribute("stroke", "#4f9fd1");
    link.setAttribute("stroke-width", "1");
    link.setAttribute("opacity", ".5");
    svg.appendChild(link);
    const dot = document.createElementNS(NS, "circle");
    dot.setAttribute("cx", String(clientX));
    dot.setAttribute("cy", String(clientY));
    dot.setAttribute("r", "4");
    dot.setAttribute("fill", "#4f9fd1");
    svg.appendChild(dot);
  }

  const hub = document.createElementNS(NS, "circle");
  hub.setAttribute("cx", String(cx));
  hub.setAttribute("cy", String(cy));
  hub.setAttribute("r", String(RING_INNER - 2));
  hub.setAttribute("fill", "#20242a");
  hub.setAttribute("stroke", "#3d454e");
  svg.appendChild(hub);
  svg.appendChild(text("sub", cx, cy + 4, "キャンセル"));

  // 輪の下の一覧
  const rows: Row[] = [];
  const listTop = cy + RING_OUTER + ROW_GAP;
  list.forEach((item, i) => {
    const top = listTop + i * ROW_HEIGHT;
    const rect = document.createElementNS(NS, "rect");
    rect.setAttribute("x", String(cx - ROW_WIDTH / 2));
    rect.setAttribute("y", String(top));
    rect.setAttribute("width", String(ROW_WIDTH));
    rect.setAttribute("height", String(ROW_HEIGHT));
    rect.setAttribute("fill", "#2c3238");
    rect.setAttribute("stroke", "#171a1e");
    svg.appendChild(rect);
    // `sub` があれば 2 段にする（段ごとの面数と推定メモリ。`32` の T3）
    const label = text(null, cx, top + ROW_HEIGHT / 2 + (item.sub ? -1 : 5), item.label);
    svg.appendChild(label);
    if (item.sub) svg.appendChild(text("sub", cx, top + ROW_HEIGHT / 2 + 12, item.sub));
    rows.push({ rect, label, item, top });
  });

  open = { host, slices, rows, cx, cy, px: clientX, py: clientY, selected: -1, selectedRow: -1 };
  window.addEventListener("pointermove", onMove);
  window.addEventListener("pointerup", onUp);
  window.addEventListener("pointercancel", onUp);
}

/** その向きの方位（北が 0）。区画が無ければ −1。 */
function sliceAt(dx: number, dy: number): number {
  // 北を 0 にして 45° ごとに割る。22.5° 足してから割ると境界が方位の真ん中に来る
  const deg = ((Math.atan2(dy, dx) * 180) / Math.PI + 90 + 360 + 22.5) % 360;
  const i = Math.floor(deg / 45);
  return open?.slices[i] ? i : -1;
}

/**
 * 指の位置から選ぶものを決める（`50` の直し）。
 *
 * 輪は画面に収まるよう寄せてあるので、**押した点と輪の中心が別の場所にある**。
 * 使い方は 2 つあって、どちらも成り立たせたい:
 *
 *   1. **見て選ぶ**: 出てきた輪の区画に指を乗せる（タブレットではこれが自然）
 *   2. **見ないで引く**: 押した点から方位へ振り抜く（`41` の T3。慣れた人の使い方）
 *
 * どちらで測るかは「**指がいま、輪と押した点のどちらに近いか**」で決める。
 * 輪に寄っていけば見て選ぶ側、押した点のまわりで振れば引く側になる。
 */
function onMove(e: PointerEvent): void {
  if (!open) return;
  const dx = e.clientX - open.px;
  const dy = e.clientY - open.py;
  const ax = e.clientX - open.cx;
  const ay = e.clientY - open.cy;
  const toPress = Math.hypot(dx, dy);
  const toRing = Math.hypot(ax, ay);
  // 押した点から輪の中心までの隔たり。画面の端で押したときだけ 0 より大きい
  const gap = Math.hypot(open.cx - open.px, open.cy - open.py);
  // **指が輪の帯の上に乗っていれば、見たままを選ぶ。**
  // 輪の外（短く振った・大きく振り抜いた）なら、押した点から引いた向きで選ぶ
  const onAnnulus = toRing >= (gap < 1 ? DEAD_RADIUS : RING_INNER) && toRing <= RING_OUTER;
  // 押した点から少しでも動くまでは何も選ばない。寄せた輪では、押した瞬間の指が
  // 既にどこかの区画の上に居るので、動いていないうちに当てると誤爆する（`41` の T3）
  const moved = toPress > MOVE_MIN;
  // 一覧は輪の下に描いてあるので、指を輪の分だけ平行移動した点で当てる
  const atY = e.clientY + (open.cy - open.py);

  // 一覧の上に居るならそちらが優先。方位の選択は外す
  let row = -1;
  if (moved && Math.abs(ax) <= ROW_WIDTH / 2) {
    // **見えている行に指が乗った**（寄せた輪でも、行を直に押せる）
    row = open.rows.findIndex((r) => e.clientY >= r.top && e.clientY < r.top + ROW_HEIGHT);
  }
  if (row < 0 && Math.abs(dx) <= ROW_WIDTH / 2) {
    row = open.rows.findIndex((r) => atY >= r.top && atY < r.top + ROW_HEIGHT);
  }
  if (row !== open.selectedRow) {
    open.rows.forEach((r, i) => r.rect.setAttribute("fill", i === row ? "#2f5f7d" : "#2c3238"));
    open.selectedRow = row;
    if (row >= 0) navigator.vibrate?.(6);
  }

  let sel = -1;
  if (row < 0 && moved) {
    const inner = gap < 1 ? DEAD_RADIUS : RING_INNER;
    if (onAnnulus) sel = sliceAt(ax, ay);
    // 輪の真ん中（ハブ）に指が乗っている = キャンセル。見たままの意味にする
    else if (toRing < inner) sel = -1;
    else if (toPress >= DEAD_RADIUS) sel = sliceAt(dx, dy);
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

function onUp(e?: PointerEvent): void {
  if (!open) return;
  const { selected, selectedRow, slices, rows } = open;
  closeRadial();
  // **`pointercancel` では決めない**（`41` の T4）。一覧のスクロールにさらわれた
  // ときなどに飛んでくるので、選んでいたものを実行すると誤爆になる
  if (e?.type === "pointercancel") return;
  if (selectedRow >= 0) rows[selectedRow]?.item.run();
  else if (selected >= 0) slices[selected]?.item.run();
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

/**
 * ボタンに長押しのサークルメニューを付ける。
 * PC は右クリックで即開き、タブレットは 200ms の長押し。
 * 動かさずに離したら tap を呼ぶ（ふつうのボタンとしても使える）。
 */
export function attachRadialButton(
  button: HTMLElement,
  menu: () => RadialMenu,
  tap?: () => void,
  list?: () => RadialItem[],
): void {
  let timer: ReturnType<typeof setTimeout> | null = null;
  let opened = false;
  let sx = 0;
  let sy = 0;
  let pid: number | null = null;

  const cancel = () => {
    if (timer !== null) clearTimeout(timer);
    timer = null;
  };

  // 押している間だけ window を見る。ツール列は描き直されるので、
  // ボタンより長生きする購読を残さない
  const listen = (on: boolean) => {
    const fn = on ? window.addEventListener : window.removeEventListener;
    fn("pointermove", onMove as EventListener);
    fn("pointerup", onUp as EventListener);
    fn("pointercancel", onUp as EventListener);
  };

  const onMove = (e: PointerEvent) => {
    if (e.pointerId !== pid) return;
    if (opened) return;
    // **動いても長押しを消さない**（`50` の直し）。ツール列のボタンは
    // `touch-action: none` でスクロールに使われないので、指のぶれで輪が
    // 出なくなるほうが痛い（実機の「段が足せない」）。
    // 大きく引いたら、200ms を待たずにその場で開く（Maya のマーキングメニュー）
    if (Math.hypot(e.clientX - sx, e.clientY - sy) > OPEN_DRAG) {
      cancel();
      opened = true;
      openRadial(menu(), sx, sy, list?.() ?? []);
      onMove(e);
    }
  };
  const onUp = (e: PointerEvent) => {
    if (e.pointerId !== pid) return;
    cancel();
    pid = null;
    listen(false);
    // サークルメニューを開いていたら、決定はそちらが受け取る
    if (!opened) tap?.();
    opened = false;
  };

  button.addEventListener("touchstart", (e) => e.preventDefault(), { passive: false });
  button.addEventListener("contextmenu", (e) => e.preventDefault());
  button.addEventListener("pointerdown", (e) => {
    e.preventDefault();
    pid = e.pointerId;
    sx = e.clientX;
    sy = e.clientY;
    opened = false;
    listen(true);
    if (e.pointerType === "mouse" && e.button === 2) {
      opened = true;
      openRadial(menu(), sx, sy, list?.() ?? []);
      return;
    }
    timer = setTimeout(() => {
      opened = true;
      openRadial(menu(), sx, sy, list?.() ?? []);
    }, 200);
  });
}
