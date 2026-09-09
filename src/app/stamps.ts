/**
 * 指紋の控え（`32` の T4）。
 *
 * core の `stampsOf` はメッシュ全体を舐めるので、100 万頂点だと 10ms 台かかる。
 * 毎フレーム呼ばれても困らないように、**履歴の世代**で控える。
 *
 * すべての編集は履歴を通る（`29` の B-T4 で差分も履歴に乗るようにした）ので、
 * 世代が同じなら形も同じ。スカルプトで段を切り替えただけでは世代は動かないが、
 * そのとき形は変わっていないので、指紋も変わらなくて正しい。
 */
import { stampsOf, type SceneObject, type Stamps } from "../core/index.js";
import type { History } from "./history.js";

const cache = new Map<string, { revision: number; stamps: Stamps }>();

/** その時点の指紋。同じ世代なら計算し直さない。 */
export function stampsFor(history: History, o: SceneObject): Stamps {
  const hit = cache.get(o.id);
  if (hit && hit.revision === history.revision) return hit.stamps;
  const stamps = stampsOf(o);
  cache.set(o.id, { revision: history.revision, stamps });
  return stamps;
}

/** 控えを捨てる。ファイルを開き直したときなど。 */
export function forgetStamps(): void {
  cache.clear();
}
