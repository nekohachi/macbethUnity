/**
 * 指紋（スタンプ。`31` の 2、`32` の T4）。
 *
 * 各段が**入力の指紋**を持つ。ベイクやマテリアルの控えは「作ったときの指紋」を
 * 覚えていて、今の指紋と違えば**古い**と分かる。これがあると「タブを切り替える
 * たびに手でリベイク」が要らなくなる（`31` の 3）。
 *
 * ここは**指紋を出すだけ**。古いかどうかの判定は使う側（S3 のベイク）。
 *
 * 保存しない。いつでも作り直せるので `.mbz` は変えない。
 */
import type { SceneObject } from "./document.js";
import { fnv1a, topologyHash } from "./io/hash.js";

/** 段ごとの指紋。 */
export interface Stamps {
  /** 面の構成。トポロジを変えると変わる。 */
  topology: string;
  /** レベル 0 の頂点座標。ローモデルを動かすと変わる。 */
  base: string;
  /** ハイの形（レベルごとのデルタ）。段が無ければ空。 */
  high: string;
  /** UV（`map1` と `UvRecipe` の切れ目・島）。UV が無ければ空。 */
  uv: string;
}

const SEED = 0x811c9dc5;

/** Float32Array をバイトではなくビット列として混ぜる。同じ値なら常に同じ。 */
function hashF32(hash: number, data: Float32Array): number {
  const bits = new Uint32Array(data.buffer, data.byteOffset, data.length);
  let h = fnv1a(hash, data.length);
  for (let i = 0; i < bits.length; i++) h = fnv1a(h, bits[i]);
  return h;
}

/** 文字列を混ぜる。 */
function hashText(hash: number, text: string): number {
  let h = fnv1a(hash, text.length);
  for (let i = 0; i < text.length; i++) h = fnv1a(h, text.charCodeAt(i));
  return h;
}

const hex = (h: number): string => (h >>> 0).toString(16).padStart(8, "0");

/** レベル 0 の形の指紋。 */
export function baseStamp(o: SceneObject): string {
  return hex(hashF32(SEED, o.mesh.positions));
}

/** ハイの形の指紋。段ごとのデルタを順に混ぜる。段が無ければ空。 */
export function highStamp(o: SceneObject): string {
  if (!o.multires.length) return "";
  let h = SEED;
  // 段の順に。並びが違えば別の指紋になってよい（実際に別の形なので）
  for (const level of [...o.multires].sort((a, b) => a.level - b.level)) {
    h = fnv1a(h, level.level);
    h = hashF32(h, level.delta);
  }
  return hex(h);
}

/**
 * UV の指紋。`map1` と、レシピの切れ目・やり方・手の差分の島。
 *
 * 座標そのもの（`map1`）を入れるのは、レシピを変えずに手で動かした場合も
 * 拾うため。レシピ側を入れるのは、同じ `map1` でも次の再計算で変わるものが
 * あるため（切れ目を足しただけでまだ開いていない、など）。
 */
export function uvStamp(o: SceneObject): string {
  const map1 = o.mesh.uvSets.get("map1");
  if (!map1 && !o.uv) return "";
  let h = SEED;
  if (map1) h = hashF32(h, map1);
  if (o.uv) {
    h = hashText(h, o.uv.method);
    // 集合と表は並びが決まらないので、並べてから混ぜる
    for (const seam of [...o.uv.seams].sort()) h = hashText(h, seam);
    for (const key of [...o.uv.manual.keys()].sort()) h = hashText(h, key);
    for (const [corner, uv] of [...o.uv.pins].sort((a, b) => (a[0] < b[0] ? -1 : 1))) {
      h = hashText(h, corner);
      h = hashF32(h, new Float32Array(uv));
    }
  }
  return hex(h);
}

/** その時点の指紋ひとそろい。 */
export function stampsOf(o: SceneObject): Stamps {
  return { topology: topologyHash(o.mesh), base: baseStamp(o), high: highStamp(o), uv: uvStamp(o) };
}

/** 2 つの指紋で変わった段の名前。空なら古くない。 */
export function changedStamps(before: Stamps, after: Stamps): Array<keyof Stamps> {
  const out: Array<keyof Stamps> = [];
  for (const key of ["topology", "base", "high", "uv"] as const) {
    if (before[key] !== after[key]) out.push(key);
  }
  return out;
}
