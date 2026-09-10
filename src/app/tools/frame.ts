/**
 * マニピュレータの向き（`45` の T2）。
 *
 * 前は `AXES`（ワールドの X Y Z）が**描画・当たり・ドラッグの 3 か所に直に**
 * 入っていた。オブジェクトを回しても矢印はワールドのままで、しかも
 * オブジェクトのスケールは `transform.scale[軸]` に掛かるので、
 * **絵はワールド軸・効くのはオブジェクト軸**とずれていた。
 *
 * ここで「枠」（3 本の直交した単位ベクトル）を作り、3 か所へ同じものを渡す。
 * `AXES` を読むのは `worldFrame()` だけになる。
 *
 * Maya の移動ツールの「軸の向き」と同じ 4 つ:
 *   ワールド     X Y Z（既定）
 *   オブジェクト オブジェクトの回転を掛けた X Y Z
 *   ローカル     親の空間。**親がまだ無いのでオブジェクトと同じ**（`19` の 4）
 *   法線         選んだコンポーネントの平均法線 N と、それに直交する U V
 */
import { Matrix4, Vector3 } from "three";
import { AXES } from "../render/manipulator.js";

/** 3 本の軸と、その名前（HUD に出す）。軸は単位ベクトルで、右手系。 */
export interface Frame {
  axes: [Vector3, Vector3, Vector3];
  labels: [string, string, string];
}

const XYZ: [string, string, string] = ["X", "Y", "Z"];

export function worldFrame(): Frame {
  return { axes: [AXES[0].clone(), AXES[1].clone(), AXES[2].clone()], labels: [...XYZ] };
}

/**
 * オブジェクトの向き。**回転だけ**を取り出す（スケールは剥がす）。
 *
 * 行列の列をそのまま使うと、スケールが入っているオブジェクトで軸の長さが
 * 変わり、矢印の伸びと当たりがずれる。負のスケールで裏返っている軸は
 * そのまま（見た目が形に合うほうが分かりやすい）。
 */
export function objectFrame(matrixWorld: Matrix4): Frame {
  const axes = [0, 1, 2].map((a) => {
    const v = new Vector3().setFromMatrixColumn(matrixWorld, a);
    const len = v.length();
    return len > 1e-9 ? v.divideScalar(len) : AXES[a].clone();
  }) as [Vector3, Vector3, Vector3];
  return { axes, labels: [...XYZ] };
}

/**
 * 面・エッジ・頂点の向き（Maya の Normal）。**並びは [U, V, N]**。
 *
 * 赤 = U、緑 = V、青 = N。マニピュレータの色は軸の番号で決まるので、
 * 法線を 3 本目に置くと「青い矢印が面から立つ」形になる（Maya と同じ）。
 *
 * @param n      平均法線（長さは問わない）
 * @param hintU  U に使いたい向き（エッジを 1 本選んでいればその向き）。無ければ null
 * @param fallback U を決められないときに借りる枠
 */
export function normalFrame(n: Vector3, hintU: Vector3 | null, fallback: Frame): Frame {
  const N = n.clone();
  if (N.lengthSq() < 1e-18) return fallback;
  N.normalize();

  let U = hintU ? hintU.clone() : null;
  if (U && U.lengthSq() < 1e-18) U = null;
  if (!U) {
    // 法線とほぼ平行な軸を借りると、直交化で潰れる。別の軸へ逃がす
    const first = fallback.axes[0];
    U = Math.abs(first.dot(N)) > 0.9 ? fallback.axes[2].clone() : first.clone();
  }
  U.addScaledVector(N, -U.dot(N));
  if (U.lengthSq() < 1e-18) {
    // それでも潰れたら、法線に直交する軸を機械的に選ぶ
    U = Math.abs(N.x) < 0.9 ? new Vector3(1, 0, 0) : new Vector3(0, 0, 1);
    U.addScaledVector(N, -U.dot(N));
  }
  U.normalize();
  const V = new Vector3().crossVectors(N, U);
  return { axes: [U, V, N], labels: ["U", "V", "N"] };
}
