/**
 * ソフト選択。選んだ頂点の周りを減衰させながら一緒に動かす。
 *
 * 左レールのゲージ 1（強度）とゲージ 2（範囲）がそのままここに効く。
 * 減衰はスムーズステップ。Maya の既定のカーブに近い。
 */
import type { Mesh } from "../../core/index.js";

/** 総当たりの上限。これを越えたらソフト選択を諦めて選択ぶんだけ動かす。 */
const BRUTE_FORCE_LIMIT = 400_000;

export interface SoftWeights {
  /** 頂点番号 → 重み（0〜1）。選択そのものは 1。 */
  weights: Map<number, number>;
  /** 範囲が広すぎて諦めたか。UI で知らせるのに使う。 */
  skipped: boolean;
}

/**
 * seeds（選択されている頂点）からの距離で重みを作る。
 * strength が 0 かオブジェクトモードなら、選択ぶんだけを 1 で返す。
 */
export function softWeights(
  mesh: Mesh,
  seeds: number[],
  options: { strength: number; radius: number; enabled: boolean },
): SoftWeights {
  const weights = new Map<number, number>();
  for (const v of seeds) weights.set(v, 1);
  if (!options.enabled || options.strength <= 0 || !seeds.length) return { weights, skipped: false };

  const n = mesh.vertexCount;
  // 素朴な総当たり。重いときは切る（C++ カーネルに移す段階で BVH にする。docs/02）
  if (n * seeds.length > BRUTE_FORCE_LIMIT) return { weights, skipped: true };

  const p = mesh.positions;
  const { radius, strength } = options;
  for (let i = 0; i < n; i++) {
    if (weights.get(i) === 1) continue;
    let best = Infinity;
    for (const a of seeds) {
      const d = Math.hypot(p[i * 3] - p[a * 3], p[i * 3 + 1] - p[a * 3 + 1], p[i * 3 + 2] - p[a * 3 + 2]);
      if (d < best) best = d;
    }
    if (best < radius) {
      const t = 1 - best / radius;
      weights.set(i, strength * (t * t * (3 - 2 * t)));
    }
  }
  return { weights, skipped: false };
}
