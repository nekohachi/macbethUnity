/**
 * 移動で UV を保つ（Maya の Preserve UVs。`23` の T5）。
 *
 * 展開したあとに 3D で頂点を動かすと、ふつうは UV が動かないので
 * **模様が頂点についていって伸びる**。これをオンにすると、頂点を動かしても
 * 模様はその場に残る（UV のほうを動かす）。
 *
 * 面ごとに「動かす前の (v, 次, 前) の三角形」でアフィン写像を作り、
 * 動かしたあとの位置をその面の**元の平面に落として**写す。
 * 元の多角形の外へ出ても外挿する（Maya と同じで、外へ引いても切れない）。
 */
import type { Mesh } from "../mesh.js";
import { buildCharts, cornerKey, type CornerKey } from "./charts.js";
import { UV_SET, cornerIndex, recordManual, type UvRecipe } from "./recipe.js";

export interface PreserveBefore {
  /** 動かす前の頂点座標（`mesh.positions` の控え）。 */
  positions: Float32Array;
  /** 動かす前の UV（`mesh.uvSets.get("map1")` の控え。コーナーごと）。 */
  uv: Float32Array;
}

/**
 * 動かした頂点の UV を、動かす前の面の UV の張り方から決め直す。
 * `mesh.uvSets` の `map1` をその場で書き換える。UV が無ければ何もしない。
 */
export function preserveUvs(mesh: Mesh, before: PreserveBefore, moved: Iterable<number>): void {
  const uv = mesh.uvSets.get(UV_SET);
  if (!uv || uv.length !== before.uv.length) return;
  const vertexFaces = mesh.vertexFaces();

  for (const v of moved) {
    if (v < 0 || v >= mesh.vertexCount) continue;
    // 動いていないなら触らない（丸め誤差で UV がずれるのを避ける）
    const dx = mesh.positions[v * 3] - before.positions[v * 3];
    const dy = mesh.positions[v * 3 + 1] - before.positions[v * 3 + 1];
    const dz = mesh.positions[v * 3 + 2] - before.positions[v * 3 + 2];
    if (Math.abs(dx) < 1e-12 && Math.abs(dy) < 1e-12 && Math.abs(dz) < 1e-12) continue;

    for (const f of vertexFaces.get(v) ?? []) {
      const n = mesh.faceSize(f);
      if (n < 3) continue;
      const start = mesh.faceOffsets[f];
      let at = -1;
      for (let i = 0; i < n; i++) {
        if (mesh.faceCorners[start + i] === v) {
          at = i;
          break;
        }
      }
      if (at < 0) continue;
      const nextAt = (at + 1) % n;
      const prevAt = (at + n - 1) % n;
      const nextV = mesh.faceCorners[start + nextAt];
      const prevV = mesh.faceCorners[start + prevAt];

      // 元の位置での 2 本の基底
      const e1 = sub(before.positions, nextV, v);
      const e2 = sub(before.positions, prevV, v);
      const nx = e1[1] * e2[2] - e1[2] * e2[1];
      const ny = e1[2] * e2[0] - e1[0] * e2[2];
      const nz = e1[0] * e2[1] - e1[1] * e2[0];
      const area = Math.hypot(nx, ny, nz);
      // 一直線に並んでいる（潰れた）コーナーは触らない
      if (!(area > 1e-12)) continue;

      // 新しい位置を、元の面の平面に落とす
      let px = mesh.positions[v * 3] - before.positions[v * 3];
      let py = mesh.positions[v * 3 + 1] - before.positions[v * 3 + 1];
      let pz = mesh.positions[v * 3 + 2] - before.positions[v * 3 + 2];
      const un = [nx / area, ny / area, nz / area] as const;
      const along = px * un[0] + py * un[1] + pz * un[2];
      px -= un[0] * along;
      py -= un[1] * along;
      pz -= un[2] * along;

      // d = a·e1 + b·e2 を、面内の内積で解く
      const g11 = dot(e1, e1);
      const g12 = dot(e1, e2);
      const g22 = dot(e2, e2);
      const d1 = px * e1[0] + py * e1[1] + pz * e1[2];
      const d2 = px * e2[0] + py * e2[1] + pz * e2[2];
      const det = g11 * g22 - g12 * g12;
      if (!(Math.abs(det) > 1e-18)) continue;
      const a = (d2 * -g12 + d1 * g22) / det;
      const b = (d1 * -g12 + d2 * g11) / det;

      // 同じ係数で UV 側を動かす
      const cv = start + at;
      const cn = start + nextAt;
      const cp = start + prevAt;
      const u0 = before.uv[cv * 2];
      const v0 = before.uv[cv * 2 + 1];
      uv[cv * 2] = u0 + a * (before.uv[cn * 2] - u0) + b * (before.uv[cp * 2] - u0);
      uv[cv * 2 + 1] = v0 + a * (before.uv[cn * 2 + 1] - v0) + b * (before.uv[cp * 2 + 1] - v0);
    }
  }
}

function sub(p: Float32Array, a: number, b: number): [number, number, number] {
  return [p[a * 3] - p[b * 3], p[a * 3 + 1] - p[b * 3 + 1], p[a * 3 + 2] - p[b * 3 + 2]];
}

function dot(a: readonly [number, number, number], b: readonly [number, number, number]): number {
  return a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
}

/**
 * `preserveUvs` で動いた UV を、島ごとの差分としてレシピに記録する（`23` の T5）。
 *
 * 手で 2D を動かしたときと同じ経路（`recordManual`）なので、
 * 開き直しても残る。切れ目は変えていないので島の指紋も変わらない。
 * 記録したコーナーの数を返す。
 */
export function recordPreserved(mesh: Mesh, recipe: UvRecipe, beforeUv: Float32Array): number {
  const uv = mesh.uvSets.get(UV_SET);
  if (!uv || uv.length !== beforeUv.length) return 0;
  let total = 0;
  for (const chart of buildCharts(mesh, recipe.seams)) {
    const deltas = new Map<CornerKey, [number, number]>();
    for (const f of chart.faces) {
      const n = mesh.faceSize(f);
      for (let i = 0; i < n; i++) {
        const key = cornerKey(f, i);
        const at = cornerIndex(mesh, key);
        if (at < 0) continue;
        const du = uv[at * 2] - beforeUv[at * 2];
        const dv = uv[at * 2 + 1] - beforeUv[at * 2 + 1];
        if (Math.abs(du) < 1e-9 && Math.abs(dv) < 1e-9) continue;
        deltas.set(key, [du, dv]);
      }
    }
    if (deltas.size) {
      recordManual(recipe, chart.fingerprint, deltas);
      total += deltas.size;
    }
  }
  return total;
}
