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
import type { Mesh, SceneObject, Transform } from "../../core/index.js";
import { heatColor } from "../uv/heat.js";
import { MAT } from "./materials.js";

/**
 * スムージング角度で法線を分ける（Maya のソフト / ハードエッジに相当）。
 * 角度 0 ならすべてハード。三角形ごとに頂点を複製した非インデックス形式で返す。
 */
export function surfaceGeometry(
  mesh: Mesh,
  tri: { tri: Uint32Array; triToFace: Uint32Array },
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
  tri: { tri: Uint32Array; triToFace: Uint32Array },
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
  wire: LineSegments;
  points: Points;
  tri: { tri: Uint32Array; triToFace: Uint32Array };
  edges: Array<[number, number]>;
}

export function buildObjectView(o: SceneObject, smoothAngle: number): ObjectView {
  const group = new Group();
  applyTransform(group, o.transform);

  const tri = o.mesh.triangulate();
  const edges = o.mesh.edges();

  const surface = new ThreeMesh(surfaceGeometry(o.mesh, tri, smoothAngle), MAT.surf);
  surface.userData.objectId = o.id;
  group.add(surface);

  const wire = new LineSegments(wireGeometry(o.mesh, edges), MAT.wire);
  group.add(wire);

  const points = new Points(positionGeometry(o.mesh.positions), MAT.vert);
  group.add(points);

  group.updateMatrixWorld();
  return { object: o, group, surface, wire, points, tri, edges };
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
