/**
 * マルチ解像度スタック。docs/03 の中核。
 *
 *   P(L) = Subdiv(P(L-1)) + T(L) · delta(L)
 *
 * ディテールを世界座標の差分ではなく **接空間のデルタ**で持つ。これが要点。
 * 世界座標で持つと、ローモデルを回したり曲げたりしたときにディテールが
 * 取り残されて剥がれる。接空間なら下の形が変われば基底も一緒に回るので、
 * ディテールは表面に張り付いたまま追従する。
 *
 * 接空間の基底は必ず **細分割で得た滑らかな面 S(L) から**作る（docs/03 の 3.2）。
 * ディテールを乗せたあとの P(L) から作ると、基底が自分自身に依存して定義が回る。
 *
 * 参照接線は「番号が最小の隣接頂点」へ向かうベクトルを法線に直交化したもの。
 * 隣接の並び順に依存しないので、同じメッシュなら必ず同じ基底になる。
 *
 * この実装は設計の正しさを確かめるためのもので、速さは問わない。
 * 差分更新と wasm 化は docs/12 の Phase D の判断のあと。
 */
import { Mesh } from "./mesh.js";
import { catmullClark } from "./subdivide.js";

/** 頂点ごとの接空間基底。9 × 頂点数（接線 t、従法線 b、法線 n の順）。 */
export type Frames = Float32Array;

/**
 * 滑らかな面から接空間の基底を作る。
 * 隣接が無い（孤立した）頂点は単位行列にする。
 */
export function buildFrames(smooth: Mesh): Frames {
  const n = smooth.vertexCount;
  const out = new Float32Array(n * 9);
  const normals = smooth.vertexNormals();
  const neighbors = smooth.vertexNeighbors();
  const p = smooth.positions;

  for (let v = 0; v < n; v++) {
    let nx = normals[v * 3];
    let ny = normals[v * 3 + 1];
    let nz = normals[v * 3 + 2];
    const nl = Math.hypot(nx, ny, nz);
    if (nl < 1e-12) {
      nx = 0;
      ny = 0;
      nz = 1;
    } else {
      nx /= nl;
      ny /= nl;
      nz /= nl;
    }

    // 参照接線は番号が最小の隣接へ。並び順に左右されないので再現する
    let ref = -1;
    for (const u of neighbors.get(v) ?? []) if (ref < 0 || u < ref) ref = u;

    let tx = 0;
    let ty = 0;
    let tz = 0;
    if (ref >= 0) {
      tx = p[ref * 3] - p[v * 3];
      ty = p[ref * 3 + 1] - p[v * 3 + 1];
      tz = p[ref * 3 + 2] - p[v * 3 + 2];
      // 法線成分を抜く
      const d = tx * nx + ty * ny + tz * nz;
      tx -= nx * d;
      ty -= ny * d;
      tz -= nz * d;
    }
    let tl = Math.hypot(tx, ty, tz);
    if (tl < 1e-12) {
      // 隣接が法線と平行だった場合の逃げ道。法線と直交する軸を選ぶ
      const ax = Math.abs(nx) < 0.9 ? 1 : 0;
      const ay = Math.abs(nx) < 0.9 ? 0 : 1;
      tx = ay * nz - 0 * ny;
      ty = 0 * nx - ax * nz;
      tz = ax * ny - ay * nx;
      tl = Math.hypot(tx, ty, tz) || 1;
    }
    tx /= tl;
    ty /= tl;
    tz /= tl;

    // 従法線は法線と接線の外積。3 本で右手系になる
    const bx = ny * tz - nz * ty;
    const by = nz * tx - nx * tz;
    const bz = nx * ty - ny * tx;

    const o = v * 9;
    out[o] = tx;
    out[o + 1] = ty;
    out[o + 2] = tz;
    out[o + 3] = bx;
    out[o + 4] = by;
    out[o + 5] = bz;
    out[o + 6] = nx;
    out[o + 7] = ny;
    out[o + 8] = nz;
  }
  return out;
}

/**
 * 滑らかな面と、そこへディテールを乗せた面から、接空間のデルタを取り出す。
 * delta = Tᵀ (P − S)。
 */
export function captureDeltas(smooth: Mesh, edited: Mesh): Float32Array {
  if (smooth.vertexCount !== edited.vertexCount) {
    throw new Error("デルタを取るには頂点数が一致している必要があります");
  }
  const frames = buildFrames(smooth);
  const n = smooth.vertexCount;
  const out = new Float32Array(n * 3);
  for (let v = 0; v < n; v++) {
    const dx = edited.positions[v * 3] - smooth.positions[v * 3];
    const dy = edited.positions[v * 3 + 1] - smooth.positions[v * 3 + 1];
    const dz = edited.positions[v * 3 + 2] - smooth.positions[v * 3 + 2];
    const o = v * 9;
    out[v * 3] = dx * frames[o] + dy * frames[o + 1] + dz * frames[o + 2];
    out[v * 3 + 1] = dx * frames[o + 3] + dy * frames[o + 4] + dz * frames[o + 5];
    out[v * 3 + 2] = dx * frames[o + 6] + dy * frames[o + 7] + dz * frames[o + 8];
  }
  return out;
}

/** 滑らかな面にデルタを乗せる。P = S + T · delta。 */
export function applyDeltas(smooth: Mesh, delta: Float32Array): Mesh {
  const out = smooth.clone();
  const frames = buildFrames(smooth);
  const n = smooth.vertexCount;
  for (let v = 0; v < n; v++) {
    const o = v * 9;
    const a = delta[v * 3] ?? 0;
    const b = delta[v * 3 + 1] ?? 0;
    const c = delta[v * 3 + 2] ?? 0;
    out.positions[v * 3] = smooth.positions[v * 3] + frames[o] * a + frames[o + 3] * b + frames[o + 6] * c;
    out.positions[v * 3 + 1] =
      smooth.positions[v * 3 + 1] + frames[o + 1] * a + frames[o + 4] * b + frames[o + 7] * c;
    out.positions[v * 3 + 2] =
      smooth.positions[v * 3 + 2] + frames[o + 2] * a + frames[o + 5] * b + frames[o + 8] * c;
  }
  return out;
}

/**
 * レベル 0 のメッシュと、レベルごとのデルタから各レベルを組み立てる。
 * 返るのは [レベル0, レベル1, ...]。deltas[i] はレベル i+1 のデルタ。
 * デルタが無いレベルは滑らかな面そのもの。
 */
export function evaluateLevels(base: Mesh, deltas: Array<Float32Array | null>): Mesh[] {
  const out: Mesh[] = [base];
  let current = base;
  for (let i = 0; i < deltas.length; i++) {
    const smooth = catmullClark(current);
    const d = deltas[i];
    current = d ? applyDeltas(smooth, d) : smooth;
    out.push(current);
  }
  return out;
}

/**
 * マルチ解像度スタック。
 *
 * ベースを編集したら evaluate をやり直すだけでディテールが追従する。
 * トポロジを変えたらデルタとの対応が消えるので、呼び出し側で捨てること
 * （docs/03 の 3.4。SceneObject.markTopologyChanged がその役目）。
 */
export class Multires {
  /** deltas[i] はレベル i+1 の接空間デルタ。 */
  readonly deltas: Array<Float32Array | null> = [];
  private cache: Mesh[] | null = null;

  constructor(private baseMesh: Mesh) {}

  get base(): Mesh {
    return this.baseMesh;
  }

  get levelCount(): number {
    return this.deltas.length;
  }

  /** レベルを 1 つ足す。まだディテールは無い。 */
  divide(): void {
    this.deltas.push(null);
    this.cache = null;
  }

  /** レベル 0 を差し替える。ローモデルを編集したときに呼ぶ。 */
  setBase(mesh: Mesh): void {
    this.baseMesh = mesh;
    this.cache = null;
  }

  /** 各レベルのメッシュ。 */
  levels(): Mesh[] {
    if (!this.cache) this.cache = evaluateLevels(this.baseMesh, this.deltas);
    return this.cache;
  }

  level(index: number): Mesh {
    const list = this.levels();
    return list[Math.max(0, Math.min(list.length - 1, index))];
  }

  /**
   * レベル L でスカルプトした結果を取り込む。
   * そのレベルの滑らかな面との差を接空間で記録するので、
   * 下のレベルを動かしてもディテールは表面に張り付いたまま追従する。
   */
  sculpt(level: number, edited: Mesh): void {
    if (level < 1 || level > this.deltas.length) throw new Error(`レベル ${level} はありません`);
    // そのレベルの「滑らかな面」= 一つ下のレベルを細分割したもの
    const below = this.level(level - 1);
    const smooth = catmullClark(below);
    this.deltas[level - 1] = captureDeltas(smooth, edited);
    this.cache = null;
  }

  /** 上位レベルを捨てる。トポロジを変える前に呼ぶ。 */
  dropAbove(level: number): void {
    this.deltas.length = Math.max(0, level);
    this.cache = null;
  }
}
