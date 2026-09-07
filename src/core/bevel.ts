/**
 * ベベル（面取り / 丸め）。四角形メッシュ向け。
 *
 * 考え方は「面の角を後退させて、空いた隙間を埋める」。
 *
 * 面 f のコーナー v（前が p、次が n）について、そこに接する 2 本のエッジが
 * ベベル対象かどうかで後退のしかたが決まる:
 *
 *   両方   … 角を落とす。1 点（2 方向へ同時に後退した交点）
 *   前だけ … 前のエッジが帯に置き換わる。次のエッジ上へ w だけ寄った 1 点
 *   次だけ … 同様に、前のエッジ上へ w だけ寄った 1 点
 *   どちらでもない（ただし v 自体は影響を受ける）
 *          … 2 点。前後それぞれのエッジ上へ w だけ寄る。隣の面と辺を共有するため
 *
 * 最後の場合を 1 点にすると、隣の面と共有する辺の端点が食い違って隙間が開く。
 * ここが実装で一番間違えやすい所なので、テストで面数と閉じ具合を見ている。
 *
 * 隙間の埋めかたは 2 つ:
 *   帯（strip）  … ベベルしたエッジごとに、両隣の面の後退点をつなぐ
 *   角（corner） … 頂点のまわりに残る穴。3 本以上が集まるときだけ実際に開く
 */
import { Mesh, MeshBuilder, edgeKey, faceUvs } from "./mesh.js";

export interface BevelResult {
  mesh: Mesh;
  /** 新しくできた面の数（帯 + 角）。 */
  newFaces: number;
}

type Vec3 = [number, number, number];

function sub(a: Vec3, b: Vec3): Vec3 {
  return [a[0] - b[0], a[1] - b[1], a[2] - b[2]];
}
function unit(v: Vec3): Vec3 {
  const L = Math.hypot(v[0], v[1], v[2]) || 1;
  return [v[0] / L, v[1] / L, v[2] / L];
}
function cross(a: Vec3, b: Vec3): Vec3 {
  return [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
}
function dot(a: Vec3, b: Vec3): number {
  return a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
}

/** UV の作り方。base のコーナーから、他のコーナーへ t だけ寄せる。 */
interface UvRecipe {
  base: number;
  toward: Array<{ corner: number; t: number }>;
}

/** 後退してできた 1 点。 */
interface Retracted {
  index: number;
  uv: UvRecipe;
}

/**
 * 選んだエッジをベベルする。
 *
 * width は元のエッジから新しいエッジまでの距離を、隣のエッジ上で測ったもの。
 * segments が 2 以上なら帯を分割して、元の角を制御点とする二次ベジエに乗せる（丸め）。
 *
 * 次の場合は変形せずに null を返す（壊れたメッシュを返さない）:
 *   - 面を 2 つ持たないエッジ（境界エッジ）が混ざっている
 *   - ベベルするエッジに接する面に四角形でないものがある
 *   - 影響を受ける頂点のまわりの面が一周していない
 */
export function bevelEdges(
  mesh: Mesh,
  edges: Array<[number, number]>,
  width: number,
  segments = 1,
): BevelResult | null {
  const seg = Math.max(1, Math.round(segments));
  if (!(width > 0)) return null;

  const bevel = new Set<string>();
  for (const [a, b] of edges) if (a !== b) bevel.add(edgeKey(a, b));
  if (!bevel.size) return null;

  const ef = mesh.edgeFaceMap();

  // 検証と、影響を受ける頂点の洗い出し
  const affected = new Set<number>();
  for (const key of bevel) {
    const faces = ef.get(key);
    if (!faces || faces.length !== 2) return null; // 境界エッジ、または非多様体
    for (const f of faces) if (mesh.faceSize(f) !== 4) return null; // 四角形限定
    const [a, b] = key.split("_").map(Number);
    affected.add(a);
    affected.add(b);
  }

  const b = new MeshBuilder({ weld: true });
  // 元の頂点はそのまま入れておく。影響を受けない所はこれをそのまま使う
  const keepIndex: number[] = [];
  for (let v = 0; v < mesh.vertexCount; v++) {
    const p = mesh.getPosition(v);
    keepIndex.push(b.vertex(p[0], p[1], p[2]));
  }

  /** (面, 頂点, 相手の頂点) → 後退点。帯と角がここを参照する。 */
  const retracted = new Map<string, Retracted>();
  const rkey = (f: number, v: number, other: number) => `${f}|${v}|${other}`;

  /** 面ごとの、新しいコーナーの並び。 */
  const newFaceCorners = new Map<number, Array<{ index: number; uv: UvRecipe }>>();

  const pos = (v: number): Vec3 => mesh.getPosition(v) as Vec3;

  for (let f = 0; f < mesh.faceCount; f++) {
    const verts = mesh.faceVerts(f);
    const out: Array<{ index: number; uv: UvRecipe }> = [];

    for (let i = 0; i < verts.length; i++) {
      const v = verts[i];
      const p = verts[(i - 1 + verts.length) % verts.length];
      const n = verts[(i + 1) % verts.length];
      const ip = (i - 1 + verts.length) % verts.length;
      const inx = (i + 1) % verts.length;

      if (!affected.has(v)) {
        const entry = { index: keepIndex[v], uv: { base: i, toward: [] } };
        out.push(entry);
        continue;
      }

      const P = pos(v);
      const towardP = unit(sub(pos(p), P));
      const towardN = unit(sub(pos(n), P));
      const lenP = Math.hypot(...sub(pos(p), P)) || 1;
      const lenN = Math.hypot(...sub(pos(n), P)) || 1;
      // 幅がエッジ長を越えると裏返るので、手前で止める
      const wP = Math.min(width, lenP * 0.49);
      const wN = Math.min(width, lenN * 0.49);

      const prevBeveled = bevel.has(edgeKey(p, v));
      const nextBeveled = bevel.has(edgeKey(v, n));

      const make = (offset: Vec3, uv: UvRecipe): Retracted => ({
        index: b.vertex(P[0] + offset[0], P[1] + offset[1], P[2] + offset[2]),
        uv,
      });

      if (prevBeveled && nextBeveled) {
        // 角を落とす。2 方向へ同時に後退した点
        const r = make(
          [towardP[0] * wP + towardN[0] * wN, towardP[1] * wP + towardN[1] * wN, towardP[2] * wP + towardN[2] * wN],
          { base: i, toward: [{ corner: ip, t: wP / lenP }, { corner: inx, t: wN / lenN }] },
        );
        out.push({ index: r.index, uv: r.uv });
        retracted.set(rkey(f, v, p), r);
        retracted.set(rkey(f, v, n), r);
      } else if (prevBeveled) {
        // 前のエッジが帯になる。次のエッジ上へ寄る
        const r = make([towardN[0] * wN, towardN[1] * wN, towardN[2] * wN], {
          base: i,
          toward: [{ corner: inx, t: wN / lenN }],
        });
        out.push({ index: r.index, uv: r.uv });
        retracted.set(rkey(f, v, p), r);
        retracted.set(rkey(f, v, n), r);
      } else if (nextBeveled) {
        const r = make([towardP[0] * wP, towardP[1] * wP, towardP[2] * wP], {
          base: i,
          toward: [{ corner: ip, t: wP / lenP }],
        });
        out.push({ index: r.index, uv: r.uv });
        retracted.set(rkey(f, v, p), r);
        retracted.set(rkey(f, v, n), r);
      } else {
        // どちらのエッジもベベルしないが、頂点自体は削られる。
        // 隣の面と辺の端点を合わせるため、前後それぞれに 1 点ずつ要る
        const rp = make([towardP[0] * wP, towardP[1] * wP, towardP[2] * wP], {
          base: i,
          toward: [{ corner: ip, t: wP / lenP }],
        });
        const rn = make([towardN[0] * wN, towardN[1] * wN, towardN[2] * wN], {
          base: i,
          toward: [{ corner: inx, t: wN / lenN }],
        });
        out.push({ index: rp.index, uv: rp.uv }, { index: rn.index, uv: rn.uv });
        retracted.set(rkey(f, v, p), rp);
        retracted.set(rkey(f, v, n), rn);
      }
    }
    newFaceCorners.set(f, out);
  }

  // 元の面を作り直す
  for (let f = 0; f < mesh.faceCount; f++) {
    const out = newFaceCorners.get(f)!;
    const rows = faceUvs(mesh, f);
    b.face(
      out.map((c) => c.index),
      {
        uv: rows ? buildUv(rows, out.map((c) => c.uv)) : undefined,
        polygroup: mesh.polygroup[f],
        materialId: mesh.materialId[f],
      },
    );
  }

  let newFaces = 0;

  /**
   * 帯の断面。ベベルしたエッジの端 v について、面 f1 側から f2 側までの点の列。
   * segments が 1 なら 2 点、2 以上なら元の角を制御点とする二次ベジエで刻む。
   */
  const rings = new Map<string, number[]>();
  const ringKey = (key: string, v: number) => `${key}|${v}`;

  for (const key of bevel) {
    const [a, bb] = key.split("_").map(Number);
    const [f1, f2] = ef.get(key)!;
    for (const v of [a, bb]) {
      const other = v === a ? bb : a;
      const r1 = retracted.get(rkey(f1, v, other));
      const r2 = retracted.get(rkey(f2, v, other));
      if (!r1 || !r2) return null;
      const ring: number[] = [];
      const P = pos(v);
      const A = posOf(b, r1.index);
      const B = posOf(b, r2.index);
      for (let k = 0; k <= seg; k++) {
        const t = k / seg;
        if (k === 0) ring.push(r1.index);
        else if (k === seg) ring.push(r2.index);
        else {
          // 二次ベジエ。制御点は元の角なので、断面が角の側へ膨らむ
          const s = 1 - t;
          const x = s * s * A[0] + 2 * t * s * P[0] + t * t * B[0];
          const y = s * s * A[1] + 2 * t * s * P[1] + t * t * B[1];
          const z = s * s * A[2] + 2 * t * s * P[2] + t * t * B[2];
          ring.push(b.vertex(x, y, z));
        }
      }
      rings.set(ringKey(key, v), ring);
    }

    // 帯の面。隣の面と辺の向きが逆になるように張る。
    // f1 が a→b の向きに巡回しているなら f1 側の新しい辺は A1→B1 なので、
    // 帯は B1→A1 の向きで始める（逆なら反対）。
    const ra = rings.get(ringKey(key, a))!;
    const rb = rings.get(ringKey(key, bb))!;
    const group = mesh.polygroup[f1] ?? 0;
    const material = mesh.materialId[f1] ?? 0;
    const f1Verts = mesh.faceVerts(f1);
    const ia = f1Verts.indexOf(a);
    const f1GoesAtoB = ia >= 0 && f1Verts[(ia + 1) % f1Verts.length] === bb;
    for (let k = 0; k < seg; k++) {
      const quad = f1GoesAtoB
        ? [rb[k], ra[k], ra[k + 1], rb[k + 1]]
        : [ra[k], rb[k], rb[k + 1], ra[k + 1]];
      if (b.face(quad, { polygroup: group, materialId: material }) >= 0) newFaces++;
    }
  }

  // 角の穴を埋める
  for (const v of affected) {
    const ring = cornerRing(mesh, v, ef, bevel, retracted, rings, rkey, ringKey);
    if (ring === null) return null;
    if (ring.length < 3) continue; // 2 点以下なら穴は開いていない
    const ordered = orientRing(b, ring, mesh, v);
    if (b.face(ordered) >= 0) newFaces++;
  }

  const out = b.build();
  // ベベルしたエッジのクリースは幾何で丸めたので捨てる。それ以外は持ち越す
  for (const [key, value] of mesh.crease) {
    if (bevel.has(key)) continue;
    const [a, bb] = key.split("_").map(Number);
    const ia = keepIndex[a];
    const ib = keepIndex[bb];
    if (ia !== undefined && ib !== undefined && !affected.has(a) && !affected.has(bb)) {
      out.setCrease(ia, ib, value);
    }
  }
  return { mesh: out, newFaces };
}

/** MeshBuilder に積んだ座標を読む。ベジエの端点に要る。 */
function posOf(b: MeshBuilder, index: number): Vec3 {
  const p = b.positionAt(index);
  return [p[0], p[1], p[2]];
}

/** UV の作り方から、面の UV 行を組み立てる。 */
function buildUv(rows: Map<string, number[][]>, recipes: UvRecipe[]): Map<string, number[][]> {
  const out = new Map<string, number[][]>();
  for (const [name, list] of rows) {
    const made: number[][] = [];
    for (const r of recipes) {
      const base = list[r.base] ?? [0, 0];
      let u = base[0];
      let vv = base[1];
      for (const t of r.toward) {
        const target = list[t.corner] ?? base;
        u += (target[0] - base[0]) * t.t;
        vv += (target[1] - base[1]) * t.t;
      }
      made.push([u, vv]);
    }
    out.set(name, made);
  }
  return out;
}

/**
 * 頂点 v のまわりの穴の輪郭。面を回転順にたどり、
 * 面が 2 点出したならその 2 点、ベベルしたエッジをまたぐときは帯の断面を挟む。
 * 一周できなければ null（境界にある頂点など）。
 */
function cornerRing(
  mesh: Mesh,
  v: number,
  ef: Map<string, number[]>,
  bevel: Set<string>,
  retracted: Map<string, { index: number }>,
  rings: Map<string, number[]>,
  rkey: (f: number, v: number, other: number) => string,
  ringKey: (key: string, v: number) => string,
): number[] | null {
  // v のまわりの面と、その面で v が接する 2 つの相手
  const around = new Map<number, [number, number]>();
  for (const f of mesh.vertexFaces().get(v) ?? []) {
    const verts = mesh.faceVerts(f);
    const i = verts.indexOf(v);
    if (i < 0) return null;
    around.set(f, [verts[(i - 1 + verts.length) % verts.length], verts[(i + 1) % verts.length]]);
  }
  if (!around.size) return null;

  const start = [...around.keys()][0];
  const walk: Array<{ face: number; from: number; to: number }> = [];
  let face = start;
  let entry = around.get(start)![0];
  for (let guard = 0; guard <= around.size; guard++) {
    const pair = around.get(face);
    if (!pair) return null;
    const exit = pair[0] === entry ? pair[1] : pair[0];
    walk.push({ face, from: entry, to: exit });
    const next = (ef.get(edgeKey(v, exit)) ?? []).find((g) => g !== face);
    if (next === undefined) return null; // 一周していない
    if (next === start && exit === around.get(start)![0]) break;
    face = next;
    entry = exit;
    if (walk.length > around.size) return null;
  }
  if (walk.length !== around.size) return null;

  const out: number[] = [];
  for (const step of walk) {
    const a = retracted.get(rkey(step.face, v, step.from));
    const c = retracted.get(rkey(step.face, v, step.to));
    if (!a || !c) return null;
    push(out, a.index);
    if (c.index !== a.index) push(out, c.index);
    // 出ていくエッジがベベル対象なら、その帯の断面をまたぐ
    const key = edgeKey(v, step.to);
    if (bevel.has(key)) {
      const ring = rings.get(ringKey(key, v));
      if (!ring) return null;
      const faces = ef.get(key)!;
      const path = faces[0] === step.face ? ring : [...ring].reverse();
      for (const idx of path) push(out, idx);
    }
  }
  // 先頭と末尾が同じなら閉じている
  if (out.length > 1 && out[0] === out[out.length - 1]) out.pop();
  return out;
}

function push(list: number[], index: number): void {
  if (list.length && list[list.length - 1] === index) return;
  list.push(index);
}

/** 角の面を外向きに揃える。元の頂点法線と見比べて、逆なら裏返す。 */
function orientRing(b: MeshBuilder, ring: number[], mesh: Mesh, v: number): number[] {
  const normals = mesh.vertexNormals();
  const want: Vec3 = [normals[v * 3], normals[v * 3 + 1], normals[v * 3 + 2]];
  // ニュートン法ではなく、単純に三角形の外積の和で向きを見る
  const p0 = posOf(b, ring[0]);
  let nx = 0;
  let ny = 0;
  let nz = 0;
  for (let i = 1; i + 1 < ring.length; i++) {
    const c = cross(sub(posOf(b, ring[i]), p0), sub(posOf(b, ring[i + 1]), p0));
    nx += c[0];
    ny += c[1];
    nz += c[2];
  }
  return dot([nx, ny, nz], want) < 0 ? [...ring].reverse() : ring;
}
