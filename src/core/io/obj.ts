/**
 * OBJ の読み書き。
 *
 * docs/11 のとおり、ポリグループ（g）と UV を通す。ZBrush はポリグループを
 * g タグで受け取るので、ここを落とすと ZBrush との往復が壊れる。
 * n-gon と負のインデックスにも対応する。
 */
import { Mesh, MeshBuilder } from "../mesh.js";

export interface ObjObject {
  name: string;
  mesh: Mesh;
}

export function parseObj(text: string): ObjObject[] {
  const positions: number[][] = [];
  const uvs: number[][] = [];
  const results: ObjObject[] = [];

  let builder: MeshBuilder | null = null;
  let name = "mesh";
  let vertexMap = new Map<number, number>();
  let hasUv = false;
  let group = 0;
  const groupNames = new Map<string, number>();

  const flush = () => {
    if (builder && builder.faceCount > 0) results.push({ name, mesh: builder.build() });
    builder = null;
    vertexMap = new Map();
    hasUv = false;
  };
  const ensure = () => {
    if (!builder) builder = new MeshBuilder({ weld: false });
    return builder;
  };

  for (const rawLine of text.split(/\r?\n/)) {
    const line = rawLine.trim();
    if (!line || line.startsWith("#")) continue;
    const parts = line.split(/\s+/);
    const tag = parts[0];

    if (tag === "v") {
      positions.push([Number(parts[1]), Number(parts[2]), Number(parts[3])]);
    } else if (tag === "vt") {
      uvs.push([Number(parts[1]), Number(parts[2] ?? 0)]);
    } else if (tag === "o") {
      flush();
      name = parts.slice(1).join("_") || "mesh";
    } else if (tag === "g") {
      // g はポリグループとして扱う。ZBrush との往復で意味を持つ。
      const key = parts.slice(1).join("_") || "default";
      let id = groupNames.get(key);
      if (id === undefined) {
        id = groupNames.size;
        groupNames.set(key, id);
      }
      group = id;
      // オブジェクト名がまだ既定なら、最初の g を名前に使う
      if (name === "mesh" && !builder) name = key;
    } else if (tag === "f") {
      const b = ensure();
      const verts: number[] = [];
      const uvRows: number[][] = [];
      for (let i = 1; i < parts.length; i++) {
        const tokens = parts[i].split("/");
        let vi = parseInt(tokens[0], 10);
        if (!Number.isFinite(vi)) continue;
        if (vi < 0) vi = positions.length + vi + 1;
        let local = vertexMap.get(vi);
        if (local === undefined) {
          const p = positions[vi - 1];
          if (!p) continue;
          local = b.vertex(p[0], p[1], p[2]);
          vertexMap.set(vi, local);
        }
        if (verts.includes(local)) continue;
        verts.push(local);

        let ti = tokens[1] ? parseInt(tokens[1], 10) : NaN;
        if (Number.isFinite(ti)) {
          if (ti < 0) ti = uvs.length + ti + 1;
          const t = uvs[ti - 1];
          if (t) {
            uvRows.push(t);
            hasUv = true;
          } else uvRows.push([0, 0]);
        } else uvRows.push([0, 0]);
      }
      if (verts.length >= 3) {
        b.face(verts, {
          uv: hasUv ? new Map([["map1", uvRows]]) : undefined,
          polygroup: group,
        });
      }
    }
  }
  flush();
  return results;
}

export interface ObjExportObject {
  name: string;
  mesh: Mesh;
  /** ワールドへ変換する関数。無ければローカル座標のまま書き出す。 */
  toWorld?: (x: number, y: number, z: number) => [number, number, number];
}

export function writeObj(objects: ObjExportObject[]): string {
  const lines: string[] = ["# macbeth"];
  let vertexBase = 1;
  let uvBase = 1;

  for (const item of objects) {
    const { mesh } = item;
    lines.push(`o ${item.name.replace(/\s+/g, "_")}`);
    for (let v = 0; v < mesh.vertexCount; v++) {
      const p = mesh.getPosition(v);
      const w = item.toWorld ? item.toWorld(p[0], p[1], p[2]) : p;
      lines.push(`v ${w[0].toFixed(6)} ${w[1].toFixed(6)} ${w[2].toFixed(6)}`);
    }

    const uv = mesh.uvSets.get("map1") ?? mesh.uvSets.values().next().value ?? null;
    if (uv) {
      for (let i = 0; i < mesh.cornerCount; i++) {
        lines.push(`vt ${uv[i * 2].toFixed(6)} ${uv[i * 2 + 1].toFixed(6)}`);
      }
    }

    // ポリグループごとにまとめて g を出す。ZBrush はこれをポリグループとして読む。
    const byGroup = new Map<number, number[]>();
    for (let f = 0; f < mesh.faceCount; f++) {
      const g = mesh.polygroup[f];
      const list = byGroup.get(g);
      if (list) list.push(f);
      else byGroup.set(g, [f]);
    }
    const single = byGroup.size <= 1;
    for (const [g, faces] of byGroup) {
      if (!single) lines.push(`g group${g}`);
      for (const f of faces) {
        const parts: string[] = [];
        for (let i = mesh.faceOffsets[f]; i < mesh.faceOffsets[f + 1]; i++) {
          const v = mesh.faceCorners[i] + vertexBase;
          parts.push(uv ? `${v}/${i + uvBase}` : `${v}`);
        }
        lines.push(`f ${parts.join(" ")}`);
      }
    }

    vertexBase += mesh.vertexCount;
    if (uv) uvBase += mesh.cornerCount;
  }
  return lines.join("\n") + "\n";
}
