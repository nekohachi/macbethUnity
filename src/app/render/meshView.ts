/**
 * core の Mesh を Three.js のオブジェクトに変換する層。
 *
 * ここが core と描画の境界。core 側は Three.js を一切知らないので、
 * 変換は必ずここを通す（docs/02、docs/09）。
 */
import {
  BufferGeometry,
  Float32BufferAttribute,
  Group,
  LineSegments,
  Mesh as ThreeMesh,
  Object3D,
  type MeshBasicMaterial,
  type MeshPhongMaterial,
  Points,
  Quaternion,
  Vector3,
} from "three";
import type { Bvh, Mesh, SceneObject, Transform, Triangulation } from "../../core/index.js";
import { heatColor } from "../uv/heat.js";
import { MAT } from "./materials.js";

/**
 * スムージング角度で法線を分ける（Maya のソフト / ハードエッジに相当）。
 * 角度 0 ならすべてハード。三角形ごとに頂点を複製した非インデックス形式で返す。
 */
export function surfaceGeometry(
  mesh: Mesh,
  tri: Triangulation,
  angleDeg: number,
): BufferGeometry {
  const fn = mesh.faceNormals();
  const vertFaces = mesh.vertexFaces();
  const cosA = Math.cos((angleDeg * Math.PI) / 180) - 1e-4;
  const count = tri.tri.length;
  const pos = new Float32Array(count * 3);
  const nor = new Float32Array(count * 3);

  for (let k = 0; k < count; k += 3) {
    const fi = tri.triToFace[k / 3];
    const bx = fn[fi * 3],
      by = fn[fi * 3 + 1],
      bz = fn[fi * 3 + 2];
    for (let j = 0; j < 3; j++) {
      const v = tri.tri[k + j];
      const o = (k + j) * 3;
      pos[o] = mesh.positions[v * 3];
      pos[o + 1] = mesh.positions[v * 3 + 1];
      pos[o + 2] = mesh.positions[v * 3 + 2];
      let nx = 0,
        ny = 0,
        nz = 0;
      for (const g of vertFaces.get(v) ?? []) {
        const mx = fn[g * 3],
          my = fn[g * 3 + 1],
          mz = fn[g * 3 + 2];
        if (mx * bx + my * by + mz * bz >= cosA) {
          nx += mx;
          ny += my;
          nz += mz;
        }
      }
      const L = Math.hypot(nx, ny, nz) || 1;
      nor[o] = nx / L;
      nor[o + 1] = ny / L;
      nor[o + 2] = nz / L;
    }
  }

  const g = new BufferGeometry();
  g.setAttribute("position", new Float32BufferAttribute(pos, 3));
  g.setAttribute("normal", new Float32BufferAttribute(nor, 3));

  // UV。チェッカー表示で使う。三角形分割は面ごとの扇なので、
  // 面が変わるたびに数え直せばコーナーの位置が分かる
  const set = mesh.uvSets.get("map1");
  if (set) {
    const uv = new Float32Array(count * 2);
    let face = -1;
    let step = 0;
    for (let k = 0; k < count; k += 3) {
      const fi = tri.triToFace[k / 3];
      if (fi !== face) {
        face = fi;
        step = 0;
      }
      const corners = [0, step + 1, step + 2];
      for (let j = 0; j < 3; j++) {
        const at = mesh.faceOffsets[fi] + corners[j];
        uv[(k + j) * 2] = set[at * 2] ?? 0;
        uv[(k + j) * 2 + 1] = set[at * 2 + 1] ?? 0;
      }
      step++;
    }
    g.setAttribute("uv", new Float32BufferAttribute(uv, 2));
  }
  return g;
}

/**
 * 面ごとの歪みを、三角形の頂点色に広げる（`23` の T2）。
 * `surfaceGeometry` は三角形ごとに頂点を複製した非インデックス形式なので、
 * 面の中はすべて同じ色になる。歪みが無ければ島と同じ色。
 */
export function heatColors(
  tri: Triangulation,
  heat: Float32Array | null,
): Float32Array {
  const count = tri.tri.length;
  const col = new Float32Array(count * 3);
  for (let k = 0; k < count; k += 3) {
    const f = tri.triToFace[k / 3];
    const c = heatColor(heat?.[f] ?? 1);
    for (let j = 0; j < 3; j++) {
      const o = (k + j) * 3;
      col[o] = c[0];
      col[o + 1] = c[1];
      col[o + 2] = c[2];
    }
  }
  return col;
}

/**
 * マスクを頂点色にする（`34` の T3）。
 *
 * マスクの材質は `MAT.surf` の複製に `vertexColors` を立てたものなので、
 * ここの色は**素の色に掛かる**。0 なら 1 倍で素のまま、1 なら 0.35 倍で暗くなる。
 * ZBrush と同じ「マスクした所が暗い」見た目。
 */
export function maskColorAt(mask: number): number {
  return 1 - 0.65 * mask;
}

/** マスクぜんぶを頂点色にする。コーナーごとに 3 つ組で返す。 */
export function maskColors(tri: Triangulation, values: Float32Array | null): Float32Array {
  const count = tri.tri.length;
  const col = new Float32Array(count * 3);
  for (let k = 0; k < count; k++) {
    const v = tri.tri[k];
    const g = maskColorAt(values && v < values.length ? values[v] : 0);
    col[k * 3] = g;
    col[k * 3 + 1] = g;
    col[k * 3 + 2] = g;
  }
  return col;
}

/**
 * 極（価数の違う頂点）の色（`35` の T2）。
 *
 * **三角形や n 角形を混ぜると、その痕が「価数 4 でない頂点」として残る。**
 * Catmull-Clark を何段かけても消えない。そこは曲面が C¹ 止まりなので、
 * 強く押すと引きつれや細かい波が出る。**彫る前にどこが荒れるか見せる**ための表示。
 *
 * 価数は**その頂点に触る面の数**で数える（`vertexFaces` は陰影付けで既に
 * 作っているので、新しい隣接表を作らない）。
 *
 * **境界の頂点は素の色にする。** 境界では面の数が 1 つ少なく出るので、
 * そのまま色を付けると平面のふちが全部「異常」に見えて読めなくなる。
 */
export function valenceColors(mesh: Mesh, tri: Triangulation): Float32Array {
  const faces = mesh.vertexFaces();
  // 境界の頂点。辺に触る面が 1 つしかない辺の両端
  const onBoundary = new Set<number>();
  {
    // 文字列の鍵は 100 万面で重いので、数値 1 つにまとめる
    const span = mesh.vertexCount;
    const count = new Map<number, number>();
    const ends = new Map<number, number>();
    for (let f = 0; f < mesh.faceCount; f++) {
      const vs = mesh.faceVerts(f);
      for (let i = 0; i < vs.length; i++) {
        const a = vs[i];
        const b = vs[(i + 1) % vs.length];
        const k = a < b ? a * span + b : b * span + a;
        count.set(k, (count.get(k) ?? 0) + 1);
        ends.set(k, a < b ? a : b);
      }
    }
    for (const [k, n] of count) {
      if (n !== 1) continue;
      const lo = ends.get(k)!;
      onBoundary.add(lo);
      onBoundary.add(k - lo * span);
    }
  }

  const NORMAL: [number, number, number] = [0.62, 0.65, 0.68];
  const TRI: [number, number, number] = [0.95, 0.45, 0.25];
  const NGON: [number, number, number] = [0.35, 0.55, 0.95];
  const colorOf = (v: number): [number, number, number] => {
    if (onBoundary.has(v)) return NORMAL;
    const n = faces.get(v)?.length ?? 0;
    if (n === 4) return NORMAL;
    return n < 4 ? TRI : NGON;
  };

  const count = tri.tri.length;
  const col = new Float32Array(count * 3);
  for (let k = 0; k < count; k++) {
    const c = colorOf(tri.tri[k]);
    col[k * 3] = c[0];
    col[k * 3 + 1] = c[1];
    col[k * 3 + 2] = c[2];
  }
  return col;
}

/** ワイヤフレーム用の線分。edges の順番は選択インデックスと一致させる。 */
export function wireGeometry(mesh: Mesh, edges: Array<[number, number]>): BufferGeometry {
  const p = new Float32Array(edges.length * 6);
  for (let i = 0; i < edges.length; i++) {
    const [a, b] = edges[i];
    p[i * 6] = mesh.positions[a * 3];
    p[i * 6 + 1] = mesh.positions[a * 3 + 1];
    p[i * 6 + 2] = mesh.positions[a * 3 + 2];
    p[i * 6 + 3] = mesh.positions[b * 3];
    p[i * 6 + 4] = mesh.positions[b * 3 + 1];
    p[i * 6 + 5] = mesh.positions[b * 3 + 2];
  }
  const g = new BufferGeometry();
  g.setAttribute("position", new Float32BufferAttribute(p, 3));
  return g;
}

/** 平坦な座標配列から position 属性だけの BufferGeometry を作る。点にも線にも使う。 */
export function positionGeometry(positions: ArrayLike<number>): BufferGeometry {
  const g = new BufferGeometry();
  g.setAttribute("position", new Float32BufferAttribute(Float32Array.from(positions), 3));
  return g;
}

/** オブジェクトのトランスフォームを Three.js のノードへ写す。 */
export function applyTransform<T extends Object3D>(node: T, t: Transform): T {
  node.position.set(t.position[0], t.position[1], t.position[2]);
  node.quaternion.set(t.rotation[0], t.rotation[1], t.rotation[2], t.rotation[3]);
  node.scale.set(t.scale[0], t.scale[1], t.scale[2]);
  return node;
}

export function transformFrom(node: Object3D): Transform {
  const p = node.position,
    q = node.quaternion,
    s = node.scale;
  return { position: [p.x, p.y, p.z], rotation: [q.x, q.y, q.z, q.w], scale: [s.x, s.y, s.z] };
}

/** SceneObject 1 つ分の描画資源。ピッキングにも使うので三角形とエッジを持っておく。 */
export interface ObjectView {
  object: SceneObject;
  group: Group;
  surface: ThreeMesh;
  /** チェッカー表示の材質。初めて使うときに作る。 */
  checker?: MeshPhongMaterial;
  /** ヒートマップ表示の材質。初めて使うときに作る。 */
  heat?: MeshBasicMaterial;
  /** 極（価数）表示の材質。初めて使うときに作る（`35` の T2）。 */
  poles?: MeshBasicMaterial;
  /** マスク表示の材質（`34` の T3）。`MAT.surf` の複製に頂点色を立てたもの。 */
  masked?: MeshPhongMaterial;
  /**
   * いま `color` 属性に入っているものの種類（`34` の T3）。
   *
   * ヒート・極・マスクが**同じ `color` 属性を取り合う**ので、違う種類が
   * 入ったまま部分更新すると、マスクの上に価数の色が残る。
   */
  colorKind?: "heat" | "poles" | "mask";
  /** 極の色を作ったときのトポロジ。変わっていなければ作り直さない。 */
  polesStamp?: string;
  /** 不透明度が 1 未満のときの材質（`25` の T4）。共有の `MAT.surf` を複製して使う。 */
  faded?: MeshPhongMaterial;
  /**
   * 透けているときの裏面の描き足し（`27` の T4）。表面より先に描いて、
   * 裏の面が手前に出てしまうのを防ぐ。ジオメトリは `surface` と同じものを指す。
   */
  back?: ThreeMesh;
  backMaterial?: MeshPhongMaterial | MeshBasicMaterial;
  /** `backMaterial` の元になった表の材質。変わったら作り直す目印。 */
  backSource?: MeshPhongMaterial | MeshBasicMaterial;
  wire: LineSegments;
  points: Points;
  tri: Triangulation;
  edges: Array<[number, number]>;
  /**
   * 三角形の境界箱の木（`29` の B-T5）。初めて要るときに作る。
   * 座標だけ変わったら `refitBvh`、トポロジが変わったら作り直す。
   */
  bvh?: Bvh;
  /** 頂点 → 描画バッファの位置（`29` の B-T6）。動いた分だけ書き換えるのに使う。 */
  slots?: VertexSlots;
}

/**
 * 頂点から、描画バッファのどこを書けばよいかの表（`29` の B-T6）。
 *
 * 面のジオメトリは三角形ごとに頂点を複製した非インデックス形式なので、
 * 1 つの頂点が何か所にも現れる。ドラッグのたびに全部作り直すと 10 万三角形で
 * 80ms かかるが、この表があれば動いた頂点の分だけ書けば済む。
 * CSR（offsets + 中身）で持つ。トポロジが変わると view ごと作り直される。
 */
export interface VertexSlots {
  /** 面のジオメトリ。`surfaceOffsets[v]`〜`[v+1]` が `surfaceSlots` の範囲。 */
  surfaceOffsets: Uint32Array;
  surfaceSlots: Uint32Array;
  /** ワイヤのジオメトリ。同じ形。 */
  wireOffsets: Uint32Array;
  wireSlots: Uint32Array;
}

/** 頂点 → バッファの位置の表を作る。O(コーナー数)。ドラッグの初めに 1 回だけ。 */
export function buildVertexSlots(
  vertexCount: number,
  tri: { tri: Uint32Array },
  edges: Array<[number, number]>,
): VertexSlots {
  const csr = (count: number, at: (i: number) => number): [Uint32Array, Uint32Array] => {
    const offsets = new Uint32Array(vertexCount + 1);
    for (let i = 0; i < count; i++) offsets[at(i) + 1]++;
    for (let v = 0; v < vertexCount; v++) offsets[v + 1] += offsets[v];
    const slots = new Uint32Array(count);
    const cursor = Uint32Array.from(offsets.subarray(0, vertexCount));
    for (let i = 0; i < count; i++) slots[cursor[at(i)]++] = i;
    return [offsets, slots];
  };
  const [surfaceOffsets, surfaceSlots] = csr(tri.tri.length, (i) => tri.tri[i]);
  // ワイヤは 1 本につき 2 点。i 番目の点は edges[i >> 1] の a か b
  const [wireOffsets, wireSlots] = csr(edges.length * 2, (i) => edges[i >> 1][i & 1]);
  return { surfaceOffsets, surfaceSlots, wireOffsets, wireSlots };
}

/**
 * 見せるメッシュから描画用の一式を作る。
 *
 * `mesh` は `o.mesh`（レベル 0）とはかぎらない。スカルプトで段を上げていれば
 * `o.shown(level)`（`32` の T2）。**ここから先は `o.mesh` を読まないこと。**
 */
export function buildObjectView(o: SceneObject, smoothAngle: number, mesh: Mesh = o.mesh): ObjectView {
  const group = new Group();
  applyTransform(group, o.transform);

  const tri = mesh.triangulate();
  const edges = mesh.edges();

  const surface = new ThreeMesh(surfaceGeometry(mesh, tri, smoothAngle), MAT.surf);
  surface.userData.objectId = o.id;
  group.add(surface);

  const wire = new LineSegments(wireGeometry(mesh, edges), MAT.wire);
  group.add(wire);

  const points = new Points(positionGeometry(mesh.positions), MAT.vert);
  group.add(points);

  group.updateMatrixWorld();
  return { object: o, group, surface, wire, points, tri, edges };
}

/**
 * その ObjectView だけが持っている材質を捨てる（`25` の T4）。
 * `MAT.surf` などの共有分は触らない。`disposeObject3D` はジオメトリしか見ないので、
 * 作り直しのたびに複製が積み上がらないよう、view を捨てるときに合わせて呼ぶ。
 */
export function disposeViewMaterials(view: ObjectView): void {
  view.checker?.dispose();
  view.heat?.dispose();
  view.poles?.dispose();
  view.masked?.dispose();
  view.faded?.dispose();
  view.backMaterial?.dispose();
  view.checker = view.heat = view.poles = view.faded = view.masked = undefined;
  view.polesStamp = view.colorKind = undefined;
  view.backMaterial = view.backSource = view.back = undefined;
}

export function disposeObject3D(node: Object3D): void {
  node.traverse((c) => {
    const g = (c as Partial<ThreeMesh>).geometry;
    if (g) g.dispose();
  });
}

/** 三角形の重心を求める補助。ピッキングの前後で使う。 */
export const scratchVec = new Vector3();
export const scratchQuat = new Quaternion();
