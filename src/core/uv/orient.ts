/**
 * 島の向きを決める（`19` の 1.1、`20` の T2）。
 *
 * LSCM は形しか決めない。位置と向きと大きさは固定した 2 点で決まるので、
 * 自動で選んだ 2 点の並び次第で島が斜めに出てくる。立方体の面なら対角に近い
 * 2 点が選ばれて 45° 傾く。解いたあとに島ごと回して立てる。
 *
 * 基準は 3D のワールド Y。それが面にほとんど乗らない島（天面・底面）は
 * ワールド X を +U に向ける。Maya の Unfold3D が元の向きを保つのと同じ見え方になる。
 */
import { triangleFrame } from "./distortion.js";

/** 基準の軸が面に乗っているとみなす最小の長さ（軸と法線のなす角の sin）。 */
const AXIS_MIN = 0.2;

const AXIS_Y: [number, number, number] = [0, 1, 0];
const AXIS_X: [number, number, number] = [1, 0, 0];

/**
 * 島を「3D の上が +V」を向くように回す（その場で書き換える）。
 * 天面・底面のように上が乗らない島は「3D の X が +U」を向く。
 */
export function uprightChart(positions: Float64Array, tri: Uint32Array, uv: Float64Array): void {
  const triangles = tri.length / 3;
  if (!triangles) return;

  // 1. 島ごとに基準の軸を 1 つ決める。面積の重み付きで多数決
  let areaWithUp = 0;
  let areaTotal = 0;
  for (let t = 0; t < triangles; t++) {
    const frame = triangleFrame(positions, tri, t, uv);
    if (!frame) continue;
    areaTotal += frame.area;
    if (inPlaneLength(AXIS_Y, frame.normal) >= AXIS_MIN) areaWithUp += frame.area;
  }
  if (!(areaTotal > 0)) return;
  const useUp = areaWithUp * 2 >= areaTotal;
  const axis = useUp ? AXIS_Y : AXIS_X;

  // 2〜3. 基準の向きを UV に写し、UV の面積で重み付けして足す。
  // 向きだけが要るので、写した先は単位ベクトルに直してから足す
  let su = 0;
  let sv = 0;
  for (let t = 0; t < triangles; t++) {
    const frame = triangleFrame(positions, tri, t, uv);
    if (!frame) continue;
    const inPlane = projectOnPlane(axis, frame.normal);
    const length = Math.hypot(inPlane[0], inPlane[1], inPlane[2]);
    if (length < AXIS_MIN) continue;
    // 面内の座標へ（単位ベクトルとして）
    const x = dot(inPlane, frame.ex) / length;
    const y = dot(inPlane, frame.ey) / length;
    const [j00, j01, j10, j11] = frame.j;
    const u = j00 * x + j01 * y;
    const v = j10 * x + j11 * y;
    const mapped = Math.hypot(u, v);
    if (mapped < 1e-12) continue;
    su += (u / mapped) * frame.uvArea;
    sv += (v / mapped) * frame.uvArea;
  }
  if (Math.hypot(su, sv) < 1e-12) return;

  // 4. 島の中心を軸に回す。(su, sv) が +V を向く角は atan2(su, sv)。
  // X 基準の島は +U に向けたいので、そこからさらに 90° 戻す
  let angle = Math.atan2(su, sv);
  if (!useUp) angle -= Math.PI / 2;
  if (Math.abs(angle) < 1e-9) return;
  rotateAbout(uv, angle);

  // 5. 裏返っている島はそのまま。裏返りは固定点の選び方の話で、ここでは扱わない
}

/** 軸を面に落とした長さ（0〜1）。1 なら軸が面に完全に乗っている。 */
function inPlaneLength(axis: [number, number, number], normal: [number, number, number]): number {
  const p = projectOnPlane(axis, normal);
  return Math.hypot(p[0], p[1], p[2]);
}

/** 軸から法線成分を抜く。 */
function projectOnPlane(
  axis: [number, number, number],
  normal: [number, number, number],
): [number, number, number] {
  const d = dot(axis, normal);
  return [axis[0] - normal[0] * d, axis[1] - normal[1] * d, axis[2] - normal[2] * d];
}

function dot(a: [number, number, number], b: [number, number, number]): number {
  return a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
}

/** UV 全体を重心のまわりに回す。 */
function rotateAbout(uv: Float64Array, angle: number): void {
  const count = uv.length / 2;
  if (!count) return;
  let cu = 0;
  let cv = 0;
  for (let i = 0; i < count; i++) {
    cu += uv[i * 2];
    cv += uv[i * 2 + 1];
  }
  cu /= count;
  cv /= count;
  const cos = Math.cos(angle);
  const sin = Math.sin(angle);
  for (let i = 0; i < count; i++) {
    const u = uv[i * 2] - cu;
    const v = uv[i * 2 + 1] - cv;
    uv[i * 2] = cu + u * cos - v * sin;
    uv[i * 2 + 1] = cv + u * sin + v * cos;
  }
}
