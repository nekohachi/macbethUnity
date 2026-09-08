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
 * `setBase(mesh, movedVertices)` に動いた頂点を渡すと**差分更新**になる。
 * 上のレベルほど頂点数が 4 倍ずつ増えるので、ローモデルを 1 頂点動かすたびに
 * 全体を計算し直していては触れない（docs/08 の V6）。
 */
import { Mesh } from "./mesh.js";
import { SubdivPlan } from "./subdivide.js";

/** 頂点ごとの接空間基底。9 × 頂点数（接線 t、従法線 b、法線 n の順）。 */
export type Frames = Float32Array;

/**
 * 接空間基底の下ごしらえ。**トポロジから決まるものだけ**を持つ。
 * 頂点が動いただけなら作り直さなくてよい。
 */
export class FramePlan {
  readonly vertexCount: number;
  private readonly vertexFaces: number[][] = [];
  private readonly faceVerts: number[][] = [];
  /** 参照接線の相手（番号が最小の隣接頂点）。無ければ -1。 */
  private readonly reference: Int32Array;
  private readonly scratch = new Float32Array(3);

  constructor(mesh: Mesh) {
    this.vertexCount = mesh.vertexCount;
    for (let f = 0; f < mesh.faceCount; f++) this.faceVerts.push(mesh.faceVerts(f));
    const vf = mesh.vertexFaces();
    const nb = mesh.vertexNeighbors();
    this.reference = new Int32Array(this.vertexCount).fill(-1);
    for (let v = 0; v < this.vertexCount; v++) {
      this.vertexFaces.push(vf.get(v) ?? []);
      let ref = -1;
      for (const u of nb.get(v) ?? []) if (ref < 0 || u < ref) ref = u;
      this.reference[v] = ref;
    }
  }

  /**
   * 位置が変わった頂点から、基底が変わる頂点を出す。
   * 法線は接する面から、参照接線は隣接頂点から作るので、
   * 「動いた頂点と面を共有する頂点」まで広がる。
   */
  affected(moved: Iterable<number>): Set<number> {
    const faces = new Set<number>();
    const out = new Set<number>();
    for (const v of moved) {
      if (v < 0 || v >= this.vertexCount) continue;
      out.add(v);
      for (const f of this.vertexFaces[v]) faces.add(f);
    }
    for (const f of faces) for (const v of this.faceVerts[f]) out.add(v);
    return out;
  }

  /** 頂点 v の基底を out に書く。 */
  write(smooth: Mesh, v: number, out: Frames): void {
    const p = smooth.positions;

    // 法線は接する面の法線の和。全頂点まとめて作るときと同じ順序・同じ精度で足す
    const acc = this.scratch;
    acc[0] = 0;
    acc[1] = 0;
    acc[2] = 0;
    for (const f of this.vertexFaces[v]) {
      const fn = smooth.faceNormal(f);
      acc[0] += fn[0];
      acc[1] += fn[1];
      acc[2] += fn[2];
    }
    let nx = acc[0];
    let ny = acc[1];
    let nz = acc[2];
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
    const ref = this.reference[v];
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
      tx = ay * nz;
      ty = -ax * nz;
      tz = ax * ny - ay * nx;
      tl = Math.hypot(tx, ty, tz) || 1;
    }
    tx /= tl;
    ty /= tl;
    tz /= tl;

    // 従法線は法線と接線の外積。3 本で右手系になる
    const o = v * 9;
    out[o] = tx;
    out[o + 1] = ty;
    out[o + 2] = tz;
    out[o + 3] = ny * tz - nz * ty;
    out[o + 4] = nz * tx - nx * tz;
    out[o + 5] = nx * ty - ny * tx;
    out[o + 6] = nx;
    out[o + 7] = ny;
    out[o + 8] = nz;
  }

  /** 全頂点の基底。 */
  build(smooth: Mesh): Frames {
    const out = new Float32Array(this.vertexCount * 9);
    for (let v = 0; v < this.vertexCount; v++) this.write(smooth, v, out);
    return out;
  }
}

/**
 * 滑らかな面から接空間の基底を作る。
 * 隣接が無い（孤立した）頂点は法線を +Z にする。
 */
export function buildFrames(smooth: Mesh): Frames {
  return new FramePlan(smooth).build(smooth);
}

/**
 * 滑らかな面と、そこへディテールを乗せた面から、接空間のデルタを取り出す。
 * delta = Tᵀ (P − S)。
 */
export function captureDeltas(smooth: Mesh, edited: Mesh, frames = buildFrames(smooth)): Float32Array {
  if (smooth.vertexCount !== edited.vertexCount) {
    throw new Error("デルタを取るには頂点数が一致している必要があります");
  }
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

/**
 * 滑らかな面にデルタを乗せて target に書く。P = S + T · delta。
 * subset を渡すとその頂点だけ書き直す。
 */
function writeDetail(
  target: Mesh,
  smooth: Mesh,
  frames: Frames,
  delta: Float32Array,
  subset?: Iterable<number>,
): void {
  const one = (v: number): void => {
    const o = v * 9;
    const a = delta[v * 3] ?? 0;
    const b = delta[v * 3 + 1] ?? 0;
    const c = delta[v * 3 + 2] ?? 0;
    target.positions[v * 3] = smooth.positions[v * 3] + frames[o] * a + frames[o + 3] * b + frames[o + 6] * c;
    target.positions[v * 3 + 1] =
      smooth.positions[v * 3 + 1] + frames[o + 1] * a + frames[o + 4] * b + frames[o + 7] * c;
    target.positions[v * 3 + 2] =
      smooth.positions[v * 3 + 2] + frames[o + 2] * a + frames[o + 5] * b + frames[o + 8] * c;
  };
  if (subset) {
    for (const v of subset) one(v);
    return;
  }
  for (let v = 0; v < smooth.vertexCount; v++) one(v);
}

/** 滑らかな面にデルタを乗せる。P = S + T · delta。 */
export function applyDeltas(smooth: Mesh, delta: Float32Array): Mesh {
  const out = smooth.clone();
  writeDetail(out, smooth, buildFrames(smooth), delta);
  return out;
}

/**
 * レベル 0 のメッシュと、レベルごとのデルタから各レベルを組み立てる。
 * 返るのは [レベル0, レベル1, ...]。deltas[i] はレベル i+1 のデルタ。
 * デルタが無いレベルは滑らかな面そのもの。
 */
export function evaluateLevels(base: Mesh, deltas: Array<Float32Array | null>): Mesh[] {
  const stack = new Multires(base);
  for (let i = 0; i < deltas.length; i++) {
    stack.divide();
    stack.deltas[i] = deltas[i];
  }
  return stack.levels();
}

/** レベル 1 つぶんの控え。トポロジが変わらないかぎり使い回す。 */
interface LevelCache {
  /** 1 つ下のレベルから、このレベルへの細分割。 */
  plan: SubdivPlan;
  /** S(L)。ディテールを乗せる前の滑らかな面。 */
  smooth: Mesh;
  framePlan: FramePlan;
  /** デルタがあるときだけ持つ。 */
  frames: Frames | null;
  /** P(L)。ディテールを乗せたあと。 */
  mesh: Mesh;
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
  private stack: LevelCache[] | null = null;

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
    this.stack = null;
  }

  /**
   * レベル 0 を差し替える。ローモデルを編集したときに呼ぶ。
   *
   * `movedVertices` に動いた頂点を渡すと、その周りだけを計算し直す（差分更新）。
   * トポロジが変わっているときは渡さないこと。頂点数か面数が変わっていれば
   * 差分更新は使えないので、渡されていても全体を作り直す。
   */
  setBase(mesh: Mesh, movedVertices?: Iterable<number>): void {
    const sameShape =
      mesh.vertexCount === this.baseMesh.vertexCount && mesh.faceCount === this.baseMesh.faceCount;
    this.baseMesh = mesh;
    if (!movedVertices || !this.stack || !sameShape) {
      this.stack = null;
      return;
    }
    this.updateFrom(mesh, movedVertices);
  }

  /** 動いた頂点の周りだけ、上のレベルへ順に伝えていく。 */
  private updateFrom(base: Mesh, moved: Iterable<number>): void {
    const stack = this.stack;
    if (!stack) return;
    let below = base;
    let changed: Iterable<number> = moved;
    for (let i = 0; i < stack.length; i++) {
      const level = stack[i];
      const sub = level.plan.affected(changed);
      level.plan.positions(below, level.smooth.positions, sub);
      const delta = this.deltas[i];
      if (delta && level.frames) {
        // 基底は「面を共有する頂点」まで変わるので、そのぶん広げてから乗せ直す
        const wide = level.framePlan.affected(sub);
        for (const v of wide) level.framePlan.write(level.smooth, v, level.frames);
        writeDetail(level.mesh, level.smooth, level.frames, delta, wide);
        changed = wide;
      } else {
        for (const v of sub) {
          level.mesh.positions[v * 3] = level.smooth.positions[v * 3];
          level.mesh.positions[v * 3 + 1] = level.smooth.positions[v * 3 + 1];
          level.mesh.positions[v * 3 + 2] = level.smooth.positions[v * 3 + 2];
        }
        changed = sub;
      }
      below = level.mesh;
    }
  }

  /** 控えを作り直す。 */
  private rebuild(): LevelCache[] {
    const stack: LevelCache[] = [];
    let current = this.baseMesh;
    for (let i = 0; i < this.deltas.length; i++) {
      const plan = new SubdivPlan(current);
      const smooth = plan.build(current);
      const framePlan = new FramePlan(smooth);
      const delta = this.deltas[i];
      const frames = delta ? framePlan.build(smooth) : null;
      const mesh = smooth.clone();
      if (delta && frames) writeDetail(mesh, smooth, frames, delta);
      stack.push({ plan, smooth, framePlan, frames, mesh });
      current = mesh;
    }
    this.stack = stack;
    return stack;
  }

  private ensure(): LevelCache[] {
    return this.stack ?? this.rebuild();
  }

  /** 各レベルのメッシュ。 */
  levels(): Mesh[] {
    return [this.baseMesh, ...this.ensure().map((l) => l.mesh)];
  }

  level(index: number): Mesh {
    const list = this.levels();
    return list[Math.max(0, Math.min(list.length - 1, index))];
  }

  /** レベル L の滑らかな面 S(L)。ディテールを乗せる前のもの。 */
  smoothLevel(level: number): Mesh {
    if (level < 1 || level > this.deltas.length) throw new Error(`レベル ${level} はありません`);
    return this.ensure()[level - 1].smooth;
  }

  /**
   * レベル L でスカルプトした結果を取り込む。
   * そのレベルの滑らかな面との差を接空間で記録するので、
   * 下のレベルを動かしてもディテールは表面に張り付いたまま追従する。
   */
  sculpt(level: number, edited: Mesh): void {
    if (level < 1 || level > this.deltas.length) throw new Error(`レベル ${level} はありません`);
    const cache = this.ensure()[level - 1];
    const frames = cache.frames ?? cache.framePlan.build(cache.smooth);
    this.deltas[level - 1] = captureDeltas(cache.smooth, edited, frames);
    this.stack = null;
  }

  /** 上位レベルを捨てる。トポロジを変える前に呼ぶ。 */
  dropAbove(level: number): void {
    this.deltas.length = Math.max(0, level);
    this.stack = null;
  }
}
