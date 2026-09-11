/**
 * 頂点まわりの操作（`12` の B4）。
 *
 * - `mergeByDistance` … 近い頂点どうしをまとめて溶接する（Maya の Merge）
 * - `dissolveVertices` … 頂点を消して、囲んでいた面を 1 枚にする（Maya の Delete Vertex）
 * - `extrudeVertices` … 頂点を尖らせる（Maya の Extrude Vertex）
 *
 * 後ろ 2 つは「頂点のまわりの面が輪になっていること」が前提。
 * 境界や、面が繋がっていない頂点は触らずに飛ばす。
 */
import { Mesh, MeshBuilder, edgeKey, faceUvs } from "./mesh.js";
import { weldVertices } from "./topology.js";

interface Fan {
  face: number;
  prev: number;
  next: number;
}

/**
 * 頂点のまわりの面を、辺を共有する順に並べる。
 *
 * 面 f は必ず `… prev, v, next …` の並びで v を含む。巻き方向が揃っていれば、
 * 辺 (v, prev) の向こう側の面では v の次が prev になるので、それを辿れば一列に並ぶ。
 *
 * 一周して戻れば `closed`。境界（プリミティブの UV の切れ目もここに入る）では
 * 開いたまま並ぶ。面が 2 つ以上の塊に分かれているときだけ null。
 */
function umbrella(mesh: Mesh, v: number, faces: number[]): { cycle: Fan[]; closed: boolean } | null {
  if (!faces.length) return null;
  const byNext = new Map<number, Fan>();
  const byPrev = new Map<number, Fan>();
  const all: Fan[] = [];
  for (const f of faces) {
    const verts = mesh.faceVerts(f);
    const i = verts.indexOf(v);
    if (i < 0 || verts.length < 3) return null;
    const entry: Fan = {
      face: f,
      prev: verts[(i - 1 + verts.length) % verts.length],
      next: verts[(i + 1) % verts.length],
    };
    // 同じ頂点を 2 回通る面があると並べられない
    if (byNext.has(entry.next) || byPrev.has(entry.prev)) return null;
    byNext.set(entry.next, entry);
    byPrev.set(entry.prev, entry);
    all.push(entry);
  }

  // 開いた扇なら「次が無い面」が端。無ければ閉じているので、どこから始めてもよい
  const start = all.find((e) => !byPrev.has(e.next)) ?? all[0];
  const cycle = [start];
  let current = start;
  for (let step = 1; step < all.length; step++) {
    const before = byNext.get(current.prev);
    if (!before || before === start) return null; // 塊が分かれている
    cycle.push(before);
    current = before;
  }
  return { cycle, closed: byNext.get(current.prev) === start };
}

/** 面 f から v を抜いた並び（v の次から、v の手前まで）。 */
function withoutVertex(mesh: Mesh, f: number, v: number): number[] {
  const verts = mesh.faceVerts(f);
  const i = verts.indexOf(v);
  const out: number[] = [];
  for (let k = 1; k < verts.length; k++) out.push(verts[(i + k) % verts.length]);
  return out;
}

/** 位置と UV をそのまま写した組み立て器。面はこれから積む。 */
function copyVertices(mesh: Mesh): MeshBuilder {
  const b = new MeshBuilder({ weld: false });
  for (let v = 0; v < mesh.vertexCount; v++) {
    const p = mesh.getPosition(v);
    b.vertex(p[0], p[1], p[2]);
  }
  return b;
}

/** クリースを持ち越す（頂点番号が変わらない操作でだけ使える）。 */
function carryCreases(from: Mesh, to: Mesh): void {
  for (const [key, value] of from.crease) {
    const [a, b] = key.split("_").map(Number);
    if (a < to.vertexCount && b < to.vertexCount) to.setCrease(a, b, value);
  }
}

/**
 * 距離でまとめる。threshold 以内にある頂点どうしを 1 点に溶接する。
 * `verts` を渡すとその中だけ、渡さなければメッシュ全体が対象。
 */
export function mergeByDistance(
  mesh: Mesh,
  threshold: number,
  verts?: Iterable<number>,
): { mesh: Mesh; merged: number } | null {
  if (!(threshold > 0)) return null;
  const target = verts ? [...new Set(verts)] : Array.from({ length: mesh.vertexCount }, (_, i) => i);
  if (target.length < 2) return null;

  // 格子に配って、隣の升だけ見る。全対全にすると頂点数の 2 乗になる
  const cell = threshold;
  const buckets = new Map<string, number[]>();
  const keyOf = (x: number, y: number, z: number): string =>
    `${Math.floor(x / cell)},${Math.floor(y / cell)},${Math.floor(z / cell)}`;
  for (const v of target) {
    const p = mesh.getPosition(v);
    const key = keyOf(p[0], p[1], p[2]);
    const list = buckets.get(key);
    if (list) list.push(v);
    else buckets.set(key, [v]);
  }

  // union-find で「近い」を推移的にまとめる
  const parent = new Map<number, number>();
  const find = (a: number): number => {
    let root = a;
    while (parent.get(root) !== root) root = parent.get(root) ?? root;
    let cur = a;
    while (parent.get(cur) !== root) {
      const up = parent.get(cur) ?? root;
      parent.set(cur, root);
      cur = up;
    }
    return root;
  };
  for (const v of target) parent.set(v, v);

  const limit = threshold * threshold;
  for (const v of target) {
    const p = mesh.getPosition(v);
    const cx = Math.floor(p[0] / cell);
    const cy = Math.floor(p[1] / cell);
    const cz = Math.floor(p[2] / cell);
    for (let dx = -1; dx <= 1; dx++) {
      for (let dy = -1; dy <= 1; dy++) {
        for (let dz = -1; dz <= 1; dz++) {
          for (const u of buckets.get(`${cx + dx},${cy + dy},${cz + dz}`) ?? []) {
            if (u <= v) continue;
            const q = mesh.getPosition(u);
            const d = (p[0] - q[0]) ** 2 + (p[1] - q[1]) ** 2 + (p[2] - q[2]) ** 2;
            if (d > limit) continue;
            const ra = find(v);
            const rb = find(u);
            if (ra !== rb) parent.set(rb, ra);
          }
        }
      }
    }
  }

  const groups = new Map<number, number[]>();
  for (const v of target) {
    const root = find(v);
    const list = groups.get(root);
    if (list) list.push(v);
    else groups.set(root, [v]);
  }
  const merge = [...groups.values()].filter((g) => g.length > 1);
  if (!merge.length) return null;

  let merged = 0;
  for (const g of merge) merged += g.length - 1;
  return { mesh: weldVertices(mesh, merge), merged };
}

/**
 * 頂点を消して、囲んでいた面を 1 枚にまとめる（Maya の Delete Vertex）。
 * 消えた頂点は残るので、呼び出し側で `compact` を通すこと。
 */
export function dissolveVertices(
  mesh: Mesh,
  verts: Iterable<number>,
): { mesh: Mesh; removed: number } | null {
  let current = mesh;
  let removed = 0;
  for (const v of new Set(verts)) {
    const vf = current.vertexFaces();
    const faces = vf.get(v) ?? [];
    const fan = umbrella(current, v, faces);
    if (!fan) continue;

    // 面から v を抜いて繋ぐと、まわりを 1 周する輪になる。
    // 境界の頂点なら開いた道になるので、両端を結んで 1 枚の面にする
    const ring: number[] = [];
    for (const entry of fan.cycle) {
      for (const u of withoutVertex(current, entry.face, v)) {
        if (ring[ring.length - 1] !== u) ring.push(u);
      }
    }
    if (ring.length > 1 && ring[0] === ring[ring.length - 1]) ring.pop();
    if (ring.length < 3) continue;

    const drop = new Set(faces);
    const b = copyVertices(current);
    for (let f = 0; f < current.faceCount; f++) {
      if (drop.has(f)) continue;
      b.face(current.faceVerts(f), {
        uv: faceUvs(current, f) ?? undefined,
        polygroup: current.polygroup[f],
        materialId: current.materialId[f],
      });
    }
    b.face(ring, {
      polygroup: current.polygroup[fan.cycle[0].face],
      materialId: current.materialId[fan.cycle[0].face],
    });
    const next = b.build();
    carryCreases(current, next);
    current = next;
    removed++;
  }
  return removed ? { mesh: current, removed } : null;
}

/**
 * 頂点を尖らせる（Maya の Extrude Vertex）。
 *
 * まわりの辺の上に `width`（辺の長さに対する割合）で輪を作り、
 * 元の頂点を法線方向へ `length` だけ持ち上げて先端にする。
 * まわりの面は輪の 2 点を使うように広がり、開いた穴は先端への三角形で塞ぐ。
 */
export function extrudeVertices(
  mesh: Mesh,
  verts: Iterable<number>,
  length: number,
  width = 0.25,
): { mesh: Mesh; faces: number; tips: number[] } | null {
  const targets = [...new Set(verts)];
  if (!targets.length) return null;
  const w = Math.max(0.01, Math.min(0.9, width));

  const vf = mesh.vertexFaces();
  const normals = mesh.vertexNormals();
  const plan: Array<{
    v: number;
    cycle: Array<{ face: number; prev: number; next: number }>;
  }> = [];
  const touched = new Set<number>();
  for (const v of targets) {
    const fan = umbrella(mesh, v, vf.get(v) ?? []);
    // 開いた扇（境界や UV の切れ目）は、輪にならないので尖らせない
    if (!fan || !fan.closed) continue;
    // 隣り合う頂点を同時に尖らせると、同じ面を 2 回書き換えることになる
    if (fan.cycle.some((e) => touched.has(e.face))) continue;
    for (const e of fan.cycle) touched.add(e.face);
    plan.push({ v, cycle: fan.cycle });
  }
  if (!plan.length) return null;

  const b = copyVertices(mesh);
  /** 頂点 v から見た隣 u の上に置く新しい点。辺ごとに 1 つ。 */
  const onEdge = new Map<string, number>();
  const apex = new Map<number, number>();
  for (const { v, cycle } of plan) {
    const p = mesh.getPosition(v);
    for (const e of cycle) {
      const key = edgeKey(v, e.next);
      if (onEdge.has(key)) continue;
      const q = mesh.getPosition(e.next);
      onEdge.set(key, b.vertex(p[0] + (q[0] - p[0]) * w, p[1] + (q[1] - p[1]) * w, p[2] + (q[2] - p[2]) * w));
    }
    apex.set(
      v,
      b.vertex(
        p[0] + normals[v * 3] * length,
        p[1] + normals[v * 3 + 1] * length,
        p[2] + normals[v * 3 + 2] * length,
      ),
    );
  }

  /** UV を 2 点の間で取る。輪の点は辺の上にあるので線形でよい。 */
  const lerpUv = (a: number[], c: number[]): number[] => [a[0] + (c[0] - a[0]) * w, a[1] + (c[1] - a[1]) * w];

  const rewritten = new Map<number, { v: number; entry: { face: number; prev: number; next: number } }>();
  for (const { v, cycle } of plan) for (const entry of cycle) rewritten.set(entry.face, { v, entry });

  let made = 0;
  for (let f = 0; f < mesh.faceCount; f++) {
    const hit = rewritten.get(f);
    if (!hit) {
      b.face(mesh.faceVerts(f), {
        uv: faceUvs(mesh, f) ?? undefined,
        polygroup: mesh.polygroup[f],
        materialId: mesh.materialId[f],
      });
      continue;
    }
    // v を「辺 prev 側の点」「辺 next 側の点」の 2 つに置き換えて、穴を開ける
    const { v, entry } = hit;
    const verts = mesh.faceVerts(f);
    const i = verts.indexOf(v);
    const rp = onEdge.get(edgeKey(v, entry.prev))!;
    const rn = onEdge.get(edgeKey(v, entry.next))!;
    const out: number[] = [];
    const uvs = faceUvs(mesh, f);
    const rows = new Map<string, number[][]>();
    if (uvs) for (const [name] of uvs) rows.set(name, []);
    for (let k = 0; k < verts.length; k++) {
      const at = (i + k) % verts.length;
      if (at === i) {
        out.push(rp, rn);
        if (uvs) {
          for (const [name, source] of uvs) {
            const here = source[at] ?? [0, 0];
            const before = source[(at - 1 + verts.length) % verts.length] ?? here;
            const after = source[(at + 1) % verts.length] ?? here;
            rows.get(name)!.push(lerpUv(here, before), lerpUv(here, after));
          }
        }
        continue;
      }
      out.push(verts[at]);
      if (uvs) for (const [name, source] of uvs) rows.get(name)!.push(source[at] ?? [0, 0]);
    }
    if (b.face(out, { uv: uvs ? rows : undefined, polygroup: mesh.polygroup[f], materialId: mesh.materialId[f] }) >= 0) {
      made++;
    }
  }

  // 開いた穴を先端への三角形で塞ぐ
  for (const { v, cycle } of plan) {
    const tip = apex.get(v)!;
    for (const entry of cycle) {
      const rp = onEdge.get(edgeKey(v, entry.prev))!;
      const rn = onEdge.get(edgeKey(v, entry.next))!;
      // まわりの面は rp → rn の向きに通るので、蓋は逆向きに通す
      if (b.face([rn, rp, tip], { polygroup: mesh.polygroup[entry.face], materialId: mesh.materialId[entry.face] }) >= 0) {
        made++;
      }
    }
  }

  const out = b.build();
  carryCreases(mesh, out);
  // 先端の番号を返す。SHF ドラッグではこれを選択に置き換えて、そのまま引っぱる
  return { mesh: out, faces: made, tips: plan.map(({ v }) => apex.get(v)!) };
}

/**
 * **辺を 2 本しか持たない頂点を、面の角から外す**（`50`。Maya の Delete Edge/Vertex）。
 *
 * エッジを消した（`dissolveEdges`）あとは、その両端が「辺 2 本の通過点」として
 * 残る。形は変わらないが、面の角が 1 つ余分に残るので、次の細分割で不要な
 * 密度になる。Maya の Ctrl + Delete はここまで片づける。
 *
 * **面は残す。**（`dissolveVertices` はまわりの面を 1 枚に溶かすので、別のもの）
 * 角から外すだけなので、UV も残りの角のぶんをそのまま持ち越す。
 *
 * @returns 外せた頂点の数。1 つも外せなければ null
 */
export function removeCorners(mesh: Mesh, verts: Iterable<number>): { mesh: Mesh; removed: number } | null {
  // 辺 2 本の頂点だけが対象。隣の 2 点も控える（一直線かどうかを見る）
  const near = new Map<number, number[]>();
  for (const [a, b] of mesh.edges()) {
    (near.get(a) ?? near.set(a, []).get(a)!).push(b);
    (near.get(b) ?? near.set(b, []).get(b)!).push(a);
  }
  const ef = mesh.edgeFaceMap();
  const drop = new Set<number>();
  for (const v of new Set(verts)) {
    const ns = near.get(v) ?? [];
    if (ns.length !== 2) continue;
    // **形が変わるなら外さない。** 平面の角のような「辺 2 本だが本物の角」を
    // 外すと、そこだけ切り落とされてしまう。外してよいのは
    //   ・両側が内側の辺（面が 2 枚ずつ）＝ 辺を消した跡の通過点
    //   ・ほぼ一直線（角度が 160° 以上）＝ 外しても形が変わらない
    const inside = ns.every((u) => (ef.get(edgeKey(v, u)) ?? []).length >= 2);
    const p = mesh.getPosition(v);
    const a = mesh.getPosition(ns[0]);
    const b = mesh.getPosition(ns[1]);
    const ax = a[0] - p[0], ay = a[1] - p[1], az = a[2] - p[2];
    const bx = b[0] - p[0], by = b[1] - p[1], bz = b[2] - p[2];
    const la = Math.hypot(ax, ay, az) || 1;
    const lb = Math.hypot(bx, by, bz) || 1;
    const straight = (ax * bx + ay * by + az * bz) / (la * lb) < -0.94;
    if (inside || straight) drop.add(v);
  }
  if (!drop.size) return null;

  const b = copyVertices(mesh);
  for (let f = 0; f < mesh.faceCount; f++) {
    const source = mesh.faceVerts(f);
    const uvs = faceUvs(mesh, f);
    const out: number[] = [];
    const rows = new Map<string, number[][]>();
    if (uvs) for (const name of uvs.keys()) rows.set(name, []);
    for (let i = 0; i < source.length; i++) {
      if (drop.has(source[i])) continue;
      out.push(source[i]);
      if (uvs) for (const [name, src] of uvs) rows.get(name)!.push(src[i] ?? [0, 0]);
    }
    // 三角形より小さくなる面は、外さずにそのまま残す（潰れるより残るほうがまし）
    const keep = out.length >= 3 ? out : source;
    b.face(keep, {
      uv: uvs ? (out.length >= 3 ? rows : uvs) : undefined,
      polygroup: mesh.polygroup[f],
      materialId: mesh.materialId[f],
    });
  }
  const next = b.build();
  carryCreases(mesh, next);
  return { mesh: next, removed: drop.size };
}
