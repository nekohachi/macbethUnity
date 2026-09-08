/**
 * パッキング（`15` の 5 章、`16` の C3）。
 *
 * 島を 0〜1 に詰める。順番は「テクセル密度をそろえる → 高い順に棚へ並べる」。
 * 棚詰め（shelf packing）は単純だが、島が数十のうちは十分に詰まる。
 */

export interface PackBox {
  w: number;
  h: number;
}

export interface PackPlacement {
  x: number;
  y: number;
  /** 90° 回して置いたか。 */
  rotated: boolean;
  /** 全体を 0〜1 に収めるためにかけた倍率（全部同じ）。 */
  scale: number;
}

/**
 * 棚詰め。高い順に並べて、横に置けなくなったら次の段へ。
 * 最後に全体を 0〜1 へ収める倍率を返す（島どうしの比は変えない）。
 *
 * `allowRotate` なら、縦長の島は寝かせて詰める。
 */
export function shelfPack(boxes: PackBox[], margin: number, allowRotate: boolean): PackPlacement[] {
  const n = boxes.length;
  const out: PackPlacement[] = boxes.map(() => ({ x: 0, y: 0, rotated: false, scale: 1 }));
  if (!n) return out;

  // 置く向きを先に決める（横長のほうが棚に収まりやすい）
  const item = boxes.map((b, i) => {
    const rotated = allowRotate && b.h > b.w;
    return {
      i,
      w: Math.max(1e-6, rotated ? b.h : b.w),
      h: Math.max(1e-6, rotated ? b.w : b.h),
      rotated,
    };
  });
  // 高い順。同じ高さなら幅の広い順、それも同じなら元の並び（決定的に）
  const order = [...item].sort((a, b) => b.h - a.h || b.w - a.w || a.i - b.i);

  // 棚の幅は「いちばん広い島」と「面積の平方根」の大きいほうを目安にする
  let area = 0;
  for (const it of item) area += (it.w + margin) * (it.h + margin);
  const widest = Math.max(...item.map((it) => it.w));
  const shelfWidth = Math.max(widest, Math.sqrt(area) * 1.05);

  let cursorX = 0;
  let cursorY = 0;
  let shelfHeight = 0;
  let usedWidth = 0;
  for (const it of order) {
    if (cursorX > 0 && cursorX + it.w > shelfWidth) {
      cursorY += shelfHeight + margin;
      cursorX = 0;
      shelfHeight = 0;
    }
    out[it.i] = { x: cursorX, y: cursorY, rotated: it.rotated, scale: 1 };
    cursorX += it.w + margin;
    usedWidth = Math.max(usedWidth, cursorX - margin);
    shelfHeight = Math.max(shelfHeight, it.h);
  }
  const usedHeight = cursorY + shelfHeight;

  // 0〜1 に収める。余白は両端に均等に残す
  const scale = Math.min(
    (1 - margin * 2) / Math.max(1e-6, usedWidth),
    (1 - margin * 2) / Math.max(1e-6, usedHeight),
  );
  for (const p of out) {
    p.x = p.x * scale + margin;
    p.y = p.y * scale + margin;
    p.scale = scale;
  }
  return out;
}

/**
 * テクセル密度をそろえる。島ごとに「3D の面積 / UV の面積」の平方根で割り、
 * どの島も同じ縮尺になるようにする。
 *
 * `target` が null なら、いちばん面積の大きい島に合わせる。
 * `uvs` は島ごとの UV（その場で書き換える）。
 */
export function equalizeTexelDensity(
  uvs: Float64Array[],
  tris: Uint32Array[],
  areas3d: number[],
  target: number | null,
): void {
  const density: number[] = [];
  for (let i = 0; i < uvs.length; i++) {
    const uvArea = polygonArea(uvs[i], tris[i]);
    const a3 = Math.max(1e-12, areas3d[i]);
    density.push(uvArea > 1e-12 ? Math.sqrt(uvArea / a3) : 1);
  }
  // 目標。指定が無ければ、いちばん 3D 面積の大きい島の密度に合わせる
  let goal = target;
  if (goal === null) {
    let biggest = 0;
    for (let i = 1; i < areas3d.length; i++) if (areas3d[i] > areas3d[biggest]) biggest = i;
    goal = density[biggest] ?? 1;
  }
  if (!(goal > 1e-12)) return;

  for (let i = 0; i < uvs.length; i++) {
    const factor = goal / Math.max(1e-12, density[i]);
    if (Math.abs(factor - 1) < 1e-9) continue;
    const uv = uvs[i];
    // 島の中心を動かさずに拡大縮小する
    let cu = 0;
    let cv = 0;
    const count = uv.length / 2;
    for (let v = 0; v < count; v++) {
      cu += uv[v * 2];
      cv += uv[v * 2 + 1];
    }
    cu /= Math.max(1, count);
    cv /= Math.max(1, count);
    for (let v = 0; v < count; v++) {
      uv[v * 2] = cu + (uv[v * 2] - cu) * factor;
      uv[v * 2 + 1] = cv + (uv[v * 2 + 1] - cv) * factor;
    }
  }
}

/** 三角形の集まりの面積（UV 空間）。 */
export function polygonArea(uv: Float64Array, tri: Uint32Array): number {
  let sum = 0;
  for (let t = 0; t < tri.length; t += 3) {
    const a = tri[t];
    const b = tri[t + 1];
    const c = tri[t + 2];
    sum += Math.abs(
      (uv[b * 2] - uv[a * 2]) * (uv[c * 2 + 1] - uv[a * 2 + 1]) -
        (uv[c * 2] - uv[a * 2]) * (uv[b * 2 + 1] - uv[a * 2 + 1]),
    );
  }
  return sum / 2;
}

/** 3D の三角形の面積。 */
export function surfaceArea(positions: Float64Array, tri: Uint32Array): number {
  let sum = 0;
  for (let t = 0; t < tri.length; t += 3) {
    const a = tri[t];
    const b = tri[t + 1];
    const c = tri[t + 2];
    const ux = positions[b * 3] - positions[a * 3];
    const uy = positions[b * 3 + 1] - positions[a * 3 + 1];
    const uz = positions[b * 3 + 2] - positions[a * 3 + 2];
    const vx = positions[c * 3] - positions[a * 3];
    const vy = positions[c * 3 + 1] - positions[a * 3 + 1];
    const vz = positions[c * 3 + 2] - positions[a * 3 + 2];
    sum += Math.hypot(uy * vz - uz * vy, uz * vx - ux * vz, ux * vy - uy * vx);
  }
  return sum / 2;
}
