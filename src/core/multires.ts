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
import { catmullClark, SubdivPlan } from "./subdivide.js";

/** 頂点ごとの接空間基底。9 × 頂点数（接線 t、従法線 b、法線 n の順）。 */
export type Frames = Float32Array;

/**
 * 接空間基底の下ごしらえ。**トポロジから決まるものだけ**を持つ。
 * 頂点が動いただけなら作り直さなくてよい。
 */
export class FramePlan {
  readonly vertexCount: number;
  /**
   * 頂点 → 接する面（CSR。`43` の T1）。
   *
   * 前は `number[][]` で、**頂点ごとに JS の配列を 1 本**持っていた。
   * 25 万四角形のレベル 2（23 万頂点）でそれが 23 万本あり、`SubdivPlan` の分と
   * 合わせてヒープの主因になっていた（`32` の T5。実データ 19MB に対し 165MB）。
   */
  private readonly vfOffsets: Uint32Array;
  private readonly vfFaces: Uint32Array;
  /** 参照接線の相手（番号が最小の隣接頂点）。無ければ -1。 */
  private readonly reference: Int32Array;
  private readonly scratch = new Float32Array(3);

  constructor(mesh: Mesh) {
    const n = (this.vertexCount = mesh.vertexCount);
    const corners = mesh.faceCorners;
    const offsets = mesh.faceOffsets;

    // 頂点 → 面。コーナーを 2 周する（数えてから詰める）
    this.vfOffsets = new Uint32Array(n + 1);
    for (let f = 0; f < mesh.faceCount; f++) {
      for (let i = offsets[f]; i < offsets[f + 1]; i++) this.vfOffsets[corners[i] + 1]++;
    }
    for (let v = 0; v < n; v++) this.vfOffsets[v + 1] += this.vfOffsets[v];
    this.vfFaces = new Uint32Array(this.vfOffsets[n]);
    const cursor = Uint32Array.from(this.vfOffsets.subarray(0, n));
    for (let f = 0; f < mesh.faceCount; f++) {
      for (let i = offsets[f]; i < offsets[f + 1]; i++) this.vfFaces[cursor[corners[i]]++] = f;
    }

    // 参照接線の相手。**面の辺をなめて最小の番号を取る**（`vertexNeighbors` の
    // `Map` を作らない。同じ結果になる）
    this.reference = new Int32Array(n).fill(-1);
    for (let f = 0; f < mesh.faceCount; f++) {
      const s = offsets[f];
      const count = offsets[f + 1] - s;
      for (let i = 0; i < count; i++) {
        const a = corners[s + i];
        const b = corners[s + ((i + 1) % count)];
        if (a === b) continue;
        if (this.reference[a] < 0 || b < this.reference[a]) this.reference[a] = b;
        if (this.reference[b] < 0 || a < this.reference[b]) this.reference[b] = a;
      }
    }
  }

  /**
   * 位置が変わった頂点から、基底が変わる頂点を出す。
   * 法線は接する面から、参照接線は隣接頂点から作るので、
   * 「動いた頂点と面を共有する頂点」まで広がる。
   */
  affected(moved: Iterable<number>, mesh: Mesh): Set<number> {
    const faces = new Set<number>();
    const out = new Set<number>();
    for (const v of moved) {
      if (v < 0 || v >= this.vertexCount) continue;
      out.add(v);
      for (let i = this.vfOffsets[v]; i < this.vfOffsets[v + 1]; i++) faces.add(this.vfFaces[i]);
    }
    for (const f of faces) {
      for (let i = mesh.faceOffsets[f]; i < mesh.faceOffsets[f + 1]; i++) out.add(mesh.faceCorners[i]);
    }
    return out;
  }

  /** 頂点 v の基底を out に書く。 */
  write(smooth: Mesh, v: number, out: Frames): void {
    const p = smooth.positions;

    // 法線は接する面の法線の和。全頂点まとめて作るときと同じ順序・同じ精度で足す
    const acc = this.scratch;
    let nx = 0;
    let ny = 0;
    let nz = 0;
    for (let i = this.vfOffsets[v]; i < this.vfOffsets[v + 1]; i++) {
      // **配列を返させない**（`43` の T1）。面の数だけ作ると効いてくる
      smooth.faceNormalInto(this.vfFaces[i], acc, 0);
      nx += acc[0];
      ny += acc[1];
      nz += acc[2];
    }
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
  for (let v = 0; v < n; v++) captureDeltaAt(smooth, edited, frames, v, out);
  return out;
}

/**
 * 頂点 1 つぶんのデルタを `out` に書く。delta = Tᵀ (P − S)。
 *
 * ストロークの 1 コマは触った頂点しか変えないので、全部取り直さずにこれを使う
 * （`33` の T2）。**式はここ 1 つだけ。** 全体版（`captureDeltas`）もこれを呼ぶ。
 */
export function captureDeltaAt(
  smooth: Mesh,
  edited: Mesh,
  frames: Frames,
  v: number,
  out: Float32Array,
): void {
  const dx = edited.positions[v * 3] - smooth.positions[v * 3];
  const dy = edited.positions[v * 3 + 1] - smooth.positions[v * 3 + 1];
  const dz = edited.positions[v * 3 + 2] - smooth.positions[v * 3 + 2];
  const o = v * 9;
  out[v * 3] = dx * frames[o] + dy * frames[o + 1] + dz * frames[o + 2];
  out[v * 3 + 1] = dx * frames[o + 3] + dy * frames[o + 4] + dz * frames[o + 5];
  out[v * 3 + 2] = dx * frames[o + 6] + dy * frames[o + 7] + dz * frames[o + 8];
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
export function evaluateLevels(
  base: Mesh,
  deltas: Array<Float32Array | null>,
  options: MultiresOptions = {},
): Mesh[] {
  const stack = new Multires(base, options);
  for (let i = 0; i < deltas.length; i++) {
    stack.divide();
    stack.deltas[i] = deltas[i];
  }
  return stack.levels();
}

/** レベル 1 つぶんの控え。トポロジが変わらないかぎり使い回す。 */
interface LevelCache {
  /**
   * 1 つ下のレベルから、このレベルへの細分割。**差分更新のときだけ要る**ので
   * 遅延で作る（`32` の T2）。作るのに 25 万四角形で数秒かかるため、
   * レベルを見せるだけなら払わない。
   */
  plan: SubdivPlan | null;
  /** `plan` を作った元。遅延で作るときに要る。 */
  below: Mesh;
  /** S(L)。ディテールを乗せる前の滑らかな面。 */
  smooth: Mesh;
  framePlan: FramePlan;
  /** デルタがあるときだけ持つ。 */
  frames: Frames | null;
  /** P(L)。ディテールを乗せたあと。 */
  mesh: Mesh;
}

/** `Multires` の作り方。 */
export interface MultiresOptions {
  /**
   * 1 レベルぶんの細分割。渡さなければ `catmullClark`（JS 版）。
   *
   * **core は wasm を知らない。** 速い実装を使いたい呼び出し側が、ここに
   * 同じ約束の関数を差す（`32` の T2）。差した関数は JS 版と 1 ビットも
   * 違わない結果を返すこと（`tests/subdiv-wasm.test.ts` がそれを守っている）。
   */
  subdivide?: (mesh: Mesh) => Mesh;
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
  private readonly subdivide: (mesh: Mesh) => Mesh;

  constructor(
    private baseMesh: Mesh,
    options: MultiresOptions = {},
  ) {
    this.subdivide = options.subdivide ?? ((m) => catmullClark(m));
  }

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
    this.propagate(0, base, moved);
  }

  /**
   * `from` 番目の段から上へ、動いた頂点の周りだけ伝えていく。
   *
   * `below` は `from` の 1 つ下の段のメッシュ、`changed` はそこで動いた頂点。
   * レベル 0 を動かしたとき（`from = 0`）も、レベル L で彫ったとき
   * （`from = L`）も同じ道を通る。
   */
  private propagate(from: number, below: Mesh, changed: Iterable<number>): void {
    const stack = this.stack;
    if (!stack) return;
    for (let i = from; i < stack.length; i++) {
      const level = stack[i];
      // 差分更新に入って初めて計画が要る。ここで作る（`32` の T2）
      level.below = below;
      const plan = this.planOf(level);
      const sub = plan.affected(changed);
      plan.positions(below, level.smooth.positions, sub);
      const delta = this.deltas[i];
      if (delta && level.frames) {
        // 基底は「面を共有する頂点」まで変わるので、そのぶん広げてから乗せ直す
        const wide = level.framePlan.affected(sub, level.smooth);
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

  /** 控えを作り直す。`plan` は作らない（差分更新のときに作る）。 */
  private rebuild(): LevelCache[] {
    const stack: LevelCache[] = [];
    let current = this.baseMesh;
    for (let i = 0; i < this.deltas.length; i++) {
      const smooth = this.subdivide(current);
      const framePlan = new FramePlan(smooth);
      const delta = this.deltas[i];
      const frames = delta ? framePlan.build(smooth) : null;
      const mesh = smooth.clone();
      if (delta && frames) writeDetail(mesh, smooth, frames, delta);
      stack.push({ plan: null, below: current, smooth, framePlan, frames, mesh });
      current = mesh;
    }
    this.stack = stack;
    return stack;
  }

  /** その段の細分割の計画。差分更新のときに初めて作る。 */
  private planOf(level: LevelCache): SubdivPlan {
    return (level.plan ??= new SubdivPlan(level.below));
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

  /**
   * レベル L を**その場で彫った**ぶんだけ取り込む（`33` の T2）。
   *
   * `level(L)` が返すメッシュの座標を**呼ぶ側がすでに書き換えている**前提で、
   * `verts` のデルタだけを取り直す。S(L) も接空間の基底も変わらないので
   * （動かしたのは P であって S ではない）、**控えは捨てない**。
   * これが 1 コマごとに呼べる道。`sculpt` は全部取り直して控えも捨てるので、
   * ストロークには使えない。
   *
   * L より上に段があれば、そこへ伝える。いちばん上なら何もしない。
   */
  sculptAt(level: number, verts: Iterable<number>): void {
    if (level < 1 || level > this.deltas.length) throw new Error(`レベル ${level} はありません`);
    const stack = this.ensure();
    const cache = stack[level - 1];
    const frames = (cache.frames ??= cache.framePlan.build(cache.smooth));
    const delta = (this.deltas[level - 1] ??= new Float32Array(cache.smooth.vertexCount * 3));
    let any = false;
    for (const v of verts) {
      if (v < 0 || v >= cache.smooth.vertexCount) continue;
      captureDeltaAt(cache.smooth, cache.mesh, frames, v, delta);
      any = true;
    }
    // 上の段へ。P(L) が変わったので、S(L+1) から作り直す
    if (any && level < stack.length) this.propagate(level, cache.mesh, verts);
  }

  /**
   * デルタを**外から書き換えたあと**、その頂点の形を作り直す（`33` の T3）。
   *
   * `sculptAt` の逆向き。履歴を戻す / やり直すときに使う（デルタを書き戻してから
   * これを呼ぶと、形がその通りになる）。上に段があれば伝える。
   */
  rebuildDetail(level: number, verts: Iterable<number>): void {
    if (level < 1 || level > this.deltas.length) return;
    const stack = this.ensure();
    const cache = stack[level - 1];
    const delta = this.deltas[level - 1];
    if (!delta) return;
    const frames = (cache.frames ??= cache.framePlan.build(cache.smooth));
    writeDetail(cache.mesh, cache.smooth, frames, delta, verts);
    if (level < stack.length) this.propagate(level, cache.mesh, verts);
  }

  /**
   * **ローをハイに合わせる**（`42` の T1）。いちばん上の形は 1 ミリも動かさない。
   *
   * スカルプトはレベル 0 を動かさない（`33`）ので、高い段で大きく形を変えると
   * その差がぜんぶデルタに乗る。ベイクの対応は光線なしで正確だが、
   * **変位の幅が広がってローのシルエットがハイに似ない**（`28` の v3.5）。
   *
   * 段 L の**頂点点**は段 L−1 の頂点と 1 対 1（Catmull-Clark の並びは
   * 頂点点 → エッジ点 → 面点）。だから
   *
   * ```
   * 下 ← 下 + (上の頂点点 − 細分割(下) の頂点点) × relax
   * ```
   *
   * を数回まわせば、細分割した結果が上にいちばん近づく下の形が出る。
   * これを**いちばん上から順に下ろす**と、レベル 0 までが上の形に沿う。
   * 行の和が 1 の作用素なので `relax < 2` なら縮む。
   *
   * **守るのはいちばん上の形だけ。** 途中の段は「上に近い滑らかな面」に置き直す
   * （そのためにデルタが小さくなる）。最後に上の形へ合わせ直すので、見た目は変わらない。
   *
   * 境界と折り目の規則は `subdivide` に任せる（頂点点の式をここに書き写すと、
   * 規則が 2 か所に分かれて必ずずれる）。
   *
   * @returns 残差（最後に残ったずれの最大）と、デルタの最大の長さの前後
   */
  fitBaseToDetail(iterations = 8, relax = 1.6): { residual: number; before: number; after: number } {
    const before = maxDeltaLength(this.deltas);
    const n = this.deltas.length;
    if (!n) return { residual: 0, before, after: before };

    // 段ごとの目当て。いちばん上（`fitted[n]`）だけが動かせない形
    const fitted: Mesh[] = [this.baseMesh, ...this.ensure().map((c) => c.mesh.clone())];
    let residual = 0;

    // 上から順に、1 つ下を「細分割すると上になる形」へ寄せる。
    //
    // **上の段ほど回す数を減らす**（1 回の細分割が 4 倍ずつ重くなるのに、
    // 途中の段は「上に近い滑らかな面」でしかないので、そこまで詰めなくてよい）
    for (let level = n; level >= 1; level--) {
      const target = fitted[level];
      const low = fitted[level - 1];
      const p = low.positions;
      const count = low.vertexCount;
      const rounds = Math.max(3, iterations >> (level - 1));
      for (let it = 0; it < rounds; it++) {
        const sub = this.subdivide(low);
        for (let v = 0; v < count; v++) {
          p[v * 3] += (target.positions[v * 3] - sub.positions[v * 3]) * relax;
          p[v * 3 + 1] += (target.positions[v * 3 + 1] - sub.positions[v * 3 + 1]) * relax;
          p[v * 3 + 2] += (target.positions[v * 3 + 2] - sub.positions[v * 3 + 2]) * relax;
        }
      }
    }

    // 目当てに合わせ直す。**下の段から順に**（下を決めてからでないと上の S(L) が決まらない）。
    // レベル 0 は `fitted[0] === this.baseMesh` をその場で書き換えてあるので、
    // 呼ぶ側が持っている `o.mesh` の参照とずれない。
    //
    // `sculpt` を段の数だけ呼ぶと、そのたびに控えを捨てて全段を組み直す
    // （25 万で 4 秒かかった）。ここは `rebuild` と同じ道を 1 回だけ歩いて、
    // 組みながらデルタを取る
    const stack: LevelCache[] = [];
    let below = this.baseMesh;
    for (let i = 0; i < n; i++) {
      const smooth = this.subdivide(below);
      const framePlan = new FramePlan(smooth);
      const frames = framePlan.build(smooth);
      const target = fitted[i + 1];
      this.deltas[i] = captureDeltas(smooth, target, frames);
      // 残差はいちばん下の段のぶんを返す（ローがハイにどれだけ沿ったか）
      if (i === 0) {
        residual = 0;
        for (let v = 0; v < this.baseMesh.vertexCount; v++) {
          const d = Math.hypot(
            target.positions[v * 3] - smooth.positions[v * 3],
            target.positions[v * 3 + 1] - smooth.positions[v * 3 + 1],
            target.positions[v * 3 + 2] - smooth.positions[v * 3 + 2],
          );
          if (d > residual) residual = d;
        }
      }
      const mesh = target.clone();
      stack.push({ plan: null, below, smooth, framePlan, frames, mesh });
      below = mesh;
    }
    this.stack = stack;
    return { residual, before, after: maxDeltaLength(this.deltas) };
  }

  /** 上位レベルを捨てる。トポロジを変える前に呼ぶ。 */
  dropAbove(level: number): void {
    this.deltas.length = Math.max(0, level);
    this.stack = null;
  }
}

/** デルタの長さの最大（`42` の T1 の報告に使う）。 */
function maxDeltaLength(deltas: Array<Float32Array | null>): number {
  let worst = 0;
  for (const d of deltas) {
    if (!d) continue;
    for (let i = 0; i < d.length; i += 3) {
      const len = Math.hypot(d[i], d[i + 1], d[i + 2]);
      if (len > worst) worst = len;
    }
  }
  return worst;
}

/**
 * レベル 1 つぶんの推定メモリ（バイト。`32` の T3、`03` の 3.3）。
 *
 * **`43` の T3 で 560B → 240B に下げた。** `FramePlan` と `SubdivPlan` の
 * `number[][]` と文字列キーの `Map` を CSR の typed array に直した（`43` の T1・T2）ので、
 * 積み上げに入っていなかったぶんが実際に消えた。
 *
 * CI・25 万四角形をレベル 2 まで組んだときのヒープの増分は **+105MB → +46MB**。
 * 段 1 + 段 2 の四角形は 288,000 なので **160B/四角形**。
 * ここは**少なく見積もると落ちる**ので、その 1.5 倍を採る（端末差と測りのぶれの余裕）。
 *
 * 四角形 1 つあたりの内訳の見当は:
 *   `Mesh`        座標 12B/頂点（頂点 ≈ 面数）+ コーナー 4B × 4 + UV 8B × 4 ≒ 68B
 *   滑らかな面    同じものをもう 1 枚（S(L)。デルタを乗せる前）        ≒ 68B
 *   デルタと基底  デルタ 12B/頂点 + 接空間の基底 36B/頂点              ≒ 48B
 *   描画          三角形の索引・法線・ワイヤの頂点                     ≒ 84B
 *   隣接の表      `FramePlan` と `SubdivPlan` の CSR（typed array）        ≒ 30B
 *
 * 最初は積み上げで 208B と置いたが、**ベンチの実測はその 2〜2.5 倍**だった
 * （`32` の T5）。積み上げに入れていなかった `FramePlan` と `SubdivPlan` の
 * `number[][]` が効いていたので、560B に上げてしのいでいた。
 * **`43` でそれを typed array に直した**ので、積み上げに近い所まで戻った。
 * 測り方を変えたら、ベンチの「レベル 2 までの推定メモリ」の行と照らして直すこと。
 *
 * **レベルを 1 つ上げると 4 倍になる。** ここを見せずに上げさせると落ちる。
 */
export function estimateLevelBytes(faceCount: number): number {
  return faceCount * 240;
}
