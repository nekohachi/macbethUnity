/**
 * 接続（Maya の Connect）。`12` の B5。
 *
 * 選んだ点の間に辺を通して、面を分ける。
 * - `connectVertices` … 同じ面に居る選択頂点どうしを結ぶ
 * - `connectEdges` … 選んだエッジの中点を作り、その中点どうしを結ぶ
 *
 * 面の中に選択が 3 つ以上あれば、分けたそれぞれの中でさらに繰り返す。
 * 隣り合う 2 点（すでに辺で繋がっている）は結ばない。三角形が潰れるため。
 */
import { Mesh, MeshBuilder, edgeKey, faceUvs } from "./mesh.js";

/** 分けたあとの 1 枚。UV は面ごとのコーナー単位で持ち回る。 */
interface Piece {
  verts: number[];
  uv: Map<string, number[][]> | null;
}

/**
 * 面を、選択頂点どうしを結ぶ線で分ける。
 * 分けられなければ 1 枚のまま返る。
 */
function splitFace(piece: Piece, chosen: Set<number>): Piece[] {
  const { verts, uv } = piece;
  const n = verts.length;
  const marks: number[] = [];
  for (let i = 0; i < n; i++) if (chosen.has(verts[i])) marks.push(i);
  if (marks.length < 2 || n < 4) return [piece];

  for (let a = 0; a < marks.length; a++) {
    for (let c = a + 1; c < marks.length; c++) {
      const i = marks[a];
      const j = marks[c];
      const near = j - i;
      const far = n - near;
      // 隣り合っていると片側が 2 頂点になって潰れる
      if (near < 2 || far < 2) continue;

      const cut = <T>(rows: T[]): [T[], T[]] => [
        rows.slice(i, j + 1),
        [...rows.slice(j), ...rows.slice(0, i + 1)],
      ];
      const [va, vb] = cut(verts);
      let ua: Map<string, number[][]> | null = null;
      let ub: Map<string, number[][]> | null = null;
      if (uv) {
        ua = new Map();
        ub = new Map();
        for (const [name, rows] of uv) {
          const [ra, rb] = cut(rows);
          ua.set(name, ra);
          ub.set(name, rb);
        }
      }
      // 分けた側でもまだ結べる組が残っていることがある
      return [...splitFace({ verts: va, uv: ua }, chosen), ...splitFace({ verts: vb, uv: ub }, chosen)];
    }
  }
  return [piece];
}

/** 面を分けて組み立て直す。分けられた枚数を返す。 */
function rebuild(mesh: Mesh, chosen: Set<number>, extra: (b: MeshBuilder) => void): { mesh: Mesh; edges: number } | null {
  const b = new MeshBuilder({ weld: false });
  for (let v = 0; v < mesh.vertexCount; v++) {
    const p = mesh.getPosition(v);
    b.vertex(p[0], p[1], p[2]);
  }
  extra(b);

  let added = 0;
  for (let f = 0; f < mesh.faceCount; f++) {
    const pieces = splitFace({ verts: mesh.faceVerts(f), uv: faceUvs(mesh, f) }, chosen);
    added += pieces.length - 1;
    for (const piece of pieces) {
      b.face(piece.verts, {
        uv: piece.uv ?? undefined,
        polygroup: mesh.polygroup[f],
        materialId: mesh.materialId[f],
      });
    }
  }
  if (!added) return null;

  const out = b.build();
  for (const [key, value] of mesh.crease) {
    const [a, c] = key.split("_").map(Number);
    if (a < out.vertexCount && c < out.vertexCount) out.setCrease(a, c, value);
  }
  return { mesh: out, edges: added };
}

/**
 * 選んだ頂点どうしを結ぶ。同じ面に 2 つ以上あるところだけが分かれる。
 * 結べる組が 1 つも無ければ null。
 */
export function connectVertices(mesh: Mesh, verts: Iterable<number>): { mesh: Mesh; edges: number } | null {
  const chosen = new Set(verts);
  if (chosen.size < 2) return null;
  return rebuild(mesh, chosen, () => {});
}

/**
 * 選んだエッジの中点どうしを結ぶ。
 * まず各エッジの中点を作って面に差し込み、その中点を選択として結ぶ。
 */
export function connectEdges(
  mesh: Mesh,
  edges: Array<[number, number]>,
): { mesh: Mesh; edges: number } | null {
  const wanted = new Set(edges.map(([a, b]) => edgeKey(a, b)));
  if (wanted.size < 2) return null;

  // 中点は辺ごとに 1 つ。両側の面で同じ点を使う
  const midpoint = new Map<string, number>();
  const positions: number[] = [];
  let next = mesh.vertexCount;
  for (const key of wanted) {
    const [a, b] = key.split("_").map(Number);
    if (a >= mesh.vertexCount || b >= mesh.vertexCount) continue;
    const p = mesh.getPosition(a);
    const q = mesh.getPosition(b);
    positions.push((p[0] + q[0]) / 2, (p[1] + q[1]) / 2, (p[2] + q[2]) / 2);
    midpoint.set(key, next++);
  }
  if (midpoint.size < 2) return null;

  // 中点を差し込んだ面に組み替える
  const b = new MeshBuilder({ weld: false });
  for (let v = 0; v < mesh.vertexCount; v++) {
    const p = mesh.getPosition(v);
    b.vertex(p[0], p[1], p[2]);
  }
  for (let i = 0; i < positions.length; i += 3) b.vertex(positions[i], positions[i + 1], positions[i + 2]);

  for (let f = 0; f < mesh.faceCount; f++) {
    const verts = mesh.faceVerts(f);
    const uvs = faceUvs(mesh, f);
    const out: number[] = [];
    const rows = new Map<string, number[][]>();
    if (uvs) for (const [name] of uvs) rows.set(name, []);
    for (let i = 0; i < verts.length; i++) {
      const a = verts[i];
      const c = verts[(i + 1) % verts.length];
      out.push(a);
      if (uvs) for (const [name, source] of uvs) rows.get(name)!.push(source[i] ?? [0, 0]);
      const mid = midpoint.get(edgeKey(a, c));
      if (mid === undefined) continue;
      out.push(mid);
      if (uvs) {
        for (const [name, source] of uvs) {
          const here = source[i] ?? [0, 0];
          const there = source[(i + 1) % verts.length] ?? here;
          rows.get(name)!.push([(here[0] + there[0]) / 2, (here[1] + there[1]) / 2]);
        }
      }
    }
    b.face(out, { uv: uvs ? rows : undefined, polygroup: mesh.polygroup[f], materialId: mesh.materialId[f] });
  }

  const split = b.build();
  for (const [key, value] of mesh.crease) {
    const [a, c] = key.split("_").map(Number);
    if (a < split.vertexCount && c < split.vertexCount) split.setCrease(a, c, value);
  }
  return connectVertices(split, midpoint.values());
}
