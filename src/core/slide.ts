/**
 * スライド。選んだ頂点を、選んでいない隣へ向かう辺（レール）に沿って滑らせる。
 *
 * エッジループを選べば Maya の Slide Edge（相対モード）と同じ動きになる。
 * どのレールを使うかは画面の向きで決まるので、それは app が選ぶ（core は
 * 画面を知らない）。ここは「どのレールがあるか」と「t だけ滑らせる」だけ。
 */
import type { Mesh } from "./mesh.js";

/**
 * 頂点ごとのレール先。選択に入っていない隣の頂点だけを候補にする。
 * 並びは頂点番号順（同じ入力から同じ結果が出るように）。
 */
export function slideRails(mesh: Mesh, verts: Iterable<number>): Map<number, number[]> {
  const chosen = new Set<number>(verts);
  const neighbors = mesh.vertexNeighbors();
  const rails = new Map<number, number[]>();
  for (const v of [...chosen].sort((a, b) => a - b)) {
    const list = (neighbors.get(v) ?? []).filter((n) => !chosen.has(n)).sort((a, b) => a - b);
    rails.set(v, list);
  }
  return rails;
}

/**
 * レールに沿って t だけ滑らせる。`base` はドラッグ開始時の位置の複製。
 * 何度呼んでも `base` からの計算なので、途中の値がずれて溜まることはない。
 *
 * t は 0〜0.99 に丸める。1 まで行くと隣に重なって面が潰れるため。
 */
export function slideVertices(mesh: Mesh, base: Float32Array, choice: Map<number, number>, t: number): void {
  const amount = Math.max(-0.99, Math.min(0.99, t));
  for (const [v, n] of choice) {
    if (n < 0) continue;
    const vx = base[v * 3];
    const vy = base[v * 3 + 1];
    const vz = base[v * 3 + 2];
    mesh.setPosition(
      v,
      vx + (base[n * 3] - vx) * amount,
      vy + (base[n * 3 + 1] - vy) * amount,
      vz + (base[n * 3 + 2] - vz) * amount,
    );
  }
}
