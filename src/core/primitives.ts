/**
 * プリミティブ。パラメータ名と既定値は Maya に合わせている。
 * すべて原点に生成される（Maya と同じ）。
 */
import { Mesh, MeshBuilder } from "./mesh.js";

export interface ParamSpec {
  key: string;
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  /** 種類の選択（正多面体）。値は選択肢の添字。 */
  choices?: string[];
}

export type PrimitiveParams = Record<string, number>;

export interface PrimitiveDef {
  id: string;
  label: string;
  en: string;
  params: ParamSpec[];
  build(p: PrimitiveParams): Mesh;
}

/** UV 付きの四角形グリッドを張る補助。u, v は 0..1 でパラメータ化される。 */
function quadGrid(
  b: MeshBuilder,
  nu: number,
  nv: number,
  point: (u: number, v: number) => [number, number, number],
  uvAt: (u: number, v: number) => [number, number] = (u, v) => [u, v],
  flip = false,
): void {
  for (let i = 0; i < nu; i++) {
    for (let j = 0; j < nv; j++) {
      const corners: Array<[number, number]> = flip
        ? [
            [i, j],
            [i, j + 1],
            [i + 1, j + 1],
            [i + 1, j],
          ]
        : [
            [i, j],
            [i + 1, j],
            [i + 1, j + 1],
            [i, j + 1],
          ];
      const verts: number[] = [];
      const uvRows: number[][] = [];
      for (const [ci, cj] of corners) {
        const u = ci / nu;
        const v = cj / nv;
        const p = point(u, v);
        verts.push(b.vertex(p[0], p[1], p[2]));
        uvRows.push(uvAt(u, v));
      }
      b.face(verts, { uv: new Map([["map1", uvRows]]) });
    }
  }
}

/**
 * 円盤のキャップ。dir > 0 で +法線側。
 *
 * UV は Maya と同じで、円をそのまま円のまま置く。`uvCenter` と `uvRadius` で
 * 置き場所を決める（円柱なら 0〜1 の上半分に 2 つ並べる。docs/19）。
 */
function cap(
  b: MeshBuilder,
  radius: number,
  y: number,
  sides: number,
  rings: number,
  dir: number,
  uvCenter: [number, number] = [0.5, 0.5],
  uvRadius = 0.5,
): void {
  if (rings <= 0) return;
  for (let j = 0; j < rings; j++) {
    for (let i = 0; i < sides; i++) {
      const corners: Array<[number, number]> = [
        [i, j],
        [i + 1, j],
        [i + 1, j + 1],
        [i, j + 1],
      ];
      const verts: number[] = [];
      const uvRows: number[][] = [];
      for (const [ci, cj] of corners) {
        const a = (ci / sides) * Math.PI * 2;
        const r = radius * (1 - cj / rings);
        verts.push(b.vertex(r * Math.cos(a), y, r * Math.sin(a)));
        const t = (r / radius) * uvRadius;
        uvRows.push([uvCenter[0] + Math.cos(a) * t, uvCenter[1] + Math.sin(a) * t]);
      }
      if (dir > 0) {
        verts.reverse();
        uvRows.reverse();
      }
      b.face(verts, { uv: new Map([["map1", uvRows]]) });
    }
  }
}

/**
 * 立方体の UV は Maya と同じ展開図（十字の net）にする。
 *
 *        [上]
 *  [前][右][後][左]
 *        [下]
 *
 * 横 4 マス × 縦 3 マス。隣り合う面は UV でも辺を共有するので、
 * 切れ目は 12 本のうち 7 本だけになり、島は 1 つ（Maya と同じ見え方）。
 */
const CUBE_CELL = 1 / 4;
const CUBE_V0 = (1 - CUBE_CELL * 3) / 2;

/** 展開図の 1 マス（col 列 row 行）へ収める uvAt。 */
function cubeCell(col: number, row: number): (u: number, v: number) => [number, number] {
  const u0 = col * CUBE_CELL;
  const v0 = CUBE_V0 + row * CUBE_CELL;
  return (u, v) => [u0 + u * CUBE_CELL, v0 + v * CUBE_CELL];
}

/**
 * 平らな面を、格子の 1 マスに収まるよう平面投影する。
 * 面の法線を軸にした 2D の座標系を作り、境界箱でマスへ合わせる。
 */
function planarCell(
  pts: Array<[number, number, number] | number[]>,
  col: number,
  row: number,
  cols: number,
  rows: number,
  margin: number,
): number[][] {
  // 面の法線（最初の 3 点から）
  const [a, b0, c] = pts;
  const e1 = [b0[0] - a[0], b0[1] - a[1], b0[2] - a[2]];
  const e2 = [c[0] - a[0], c[1] - a[1], c[2] - a[2]];
  const n = [e1[1] * e2[2] - e1[2] * e2[1], e1[2] * e2[0] - e1[0] * e2[2], e1[0] * e2[1] - e1[1] * e2[0]];
  const nl = Math.hypot(n[0], n[1], n[2]) || 1;
  const nn = [n[0] / nl, n[1] / nl, n[2] / nl];
  // 法線と重ならない軸から接線を作る
  const up = Math.abs(nn[1]) < 0.9 ? [0, 1, 0] : [1, 0, 0];
  const t1 = [up[1] * nn[2] - up[2] * nn[1], up[2] * nn[0] - up[0] * nn[2], up[0] * nn[1] - up[1] * nn[0]];
  const t1l = Math.hypot(t1[0], t1[1], t1[2]) || 1;
  const tu = [t1[0] / t1l, t1[1] / t1l, t1[2] / t1l];
  const tv = [nn[1] * tu[2] - nn[2] * tu[1], nn[2] * tu[0] - nn[0] * tu[2], nn[0] * tu[1] - nn[1] * tu[0]];

  const flat = pts.map((p) => [
    p[0] * tu[0] + p[1] * tu[1] + p[2] * tu[2],
    p[0] * tv[0] + p[1] * tv[1] + p[2] * tv[2],
  ]);
  let minU = Infinity;
  let minV = Infinity;
  let maxU = -Infinity;
  let maxV = -Infinity;
  for (const [u, v] of flat) {
    minU = Math.min(minU, u);
    maxU = Math.max(maxU, u);
    minV = Math.min(minV, v);
    maxV = Math.max(maxV, v);
  }
  // 縦横の比を保ったままマスへ収める
  const span = Math.max(maxU - minU, maxV - minV, 1e-9);
  const cw = 1 / cols;
  const ch = 1 / rows;
  const scale = (Math.min(cw, ch) - margin * 2) / span;
  const u0 = col * cw + (cw - (maxU - minU) * scale) / 2;
  const v0 = row * ch + (ch - (maxV - minV) * scale) / 2;
  return flat.map(([u, v]) => [u0 + (u - minU) * scale, v0 + (v - minV) * scale]);
}

export const PRIMITIVES: Record<string, PrimitiveDef> = {
  cube: {
    id: "cube",
    label: "キューブ",
    en: "Cube",
    params: [
      { key: "width", label: "幅", value: 1, min: 0.05, max: 6, step: 0.05 },
      { key: "height", label: "高さ", value: 1, min: 0.05, max: 6, step: 0.05 },
      { key: "depth", label: "奥行き", value: 1, min: 0.05, max: 6, step: 0.05 },
      { key: "sdW", label: "分割数 幅", value: 1, min: 1, max: 12, step: 1 },
      { key: "sdH", label: "分割数 高さ", value: 1, min: 1, max: 12, step: 1 },
      { key: "sdD", label: "分割数 奥行き", value: 1, min: 1, max: 12, step: 1 },
    ],
    build(p) {
      const b = new MeshBuilder();
      const hw = p.width / 2,
        hh = p.height / 2,
        hd = p.depth / 2;
      const grid = (
        origin: [number, number, number],
        du: [number, number, number],
        dv: [number, number, number],
        nu: number,
        nv: number,
        uvAt: (u: number, v: number) => [number, number],
      ) =>
        quadGrid(
          b,
          nu,
          nv,
          (u, v) => [
            origin[0] + du[0] * u + dv[0] * v,
            origin[1] + du[1] * u + dv[1] * v,
            origin[2] + du[2] * u + dv[2] * v,
          ],
          uvAt,
        );
      // 展開図の並びは 前 → 右 → 後 → 左（+Y のまわりを一周する順）。
      // この順なら隣り合う面の UV がそのまま繋がる
      grid([-hw, -hh, hd], [p.width, 0, 0], [0, p.height, 0], p.sdW, p.sdH, cubeCell(0, 1));
      grid([hw, -hh, -hd], [-p.width, 0, 0], [0, p.height, 0], p.sdW, p.sdH, cubeCell(2, 1));
      grid([hw, -hh, hd], [0, 0, -p.depth], [0, p.height, 0], p.sdD, p.sdH, cubeCell(1, 1));
      grid([-hw, -hh, -hd], [0, 0, p.depth], [0, p.height, 0], p.sdD, p.sdH, cubeCell(3, 1));
      // 上は前の上に、下は前の下に付く。どちらも共有する辺で UV が繋がる向き
      grid([-hw, hh, hd], [p.width, 0, 0], [0, 0, -p.depth], p.sdW, p.sdD, cubeCell(0, 2));
      grid([-hw, -hh, -hd], [p.width, 0, 0], [0, 0, p.depth], p.sdW, p.sdD, cubeCell(0, 0));
      return b.build();
    },
  },

  sphere: {
    id: "sphere",
    label: "スフィア",
    en: "Sphere",
    params: [
      { key: "radius", label: "半径", value: 1, min: 0.05, max: 4, step: 0.05 },
      { key: "sdAxis", label: "分割数 軸", value: 20, min: 3, max: 64, step: 1 },
      { key: "sdHeight", label: "分割数 高さ", value: 12, min: 2, max: 64, step: 1 },
    ],
    build(p) {
      const b = new MeshBuilder();
      quadGrid(
        b,
        p.sdAxis,
        p.sdHeight,
        (u, v) => {
          const a = u * Math.PI * 2;
          const t = v * Math.PI;
          return [p.radius * Math.sin(t) * Math.cos(a), p.radius * Math.cos(t), p.radius * Math.sin(t) * Math.sin(a)];
        },
        (u, v) => [u, 1 - v],
      );
      return b.build();
    },
  },

  cylinder: {
    id: "cylinder",
    label: "シリンダー",
    en: "Cylinder",
    params: [
      { key: "radius", label: "半径", value: 0.6, min: 0.05, max: 3, step: 0.05 },
      { key: "height", label: "高さ", value: 2, min: 0.05, max: 6, step: 0.05 },
      { key: "sdAxis", label: "分割数 軸", value: 16, min: 3, max: 64, step: 1 },
      { key: "sdHeight", label: "分割数 高さ", value: 1, min: 1, max: 24, step: 1 },
      { key: "sdCaps", label: "分割数 キャップ", value: 1, min: 0, max: 8, step: 1 },
    ],
    build(p) {
      const b = new MeshBuilder();
      const h = p.height / 2;
      // 角度 × 高さのパラメータ化では既定の巻き方が内向きになるので反転する
      // UV は Maya と同じ置き方: 側面は下半分いっぱい、フタは上半分に 2 つ並べる
      quadGrid(
        b,
        p.sdAxis,
        p.sdHeight,
        (u, v) => {
          const a = u * Math.PI * 2;
          return [p.radius * Math.cos(a), -h + v * p.height, p.radius * Math.sin(a)];
        },
        (u, v) => [u, v * 0.5],
        true,
      );
      cap(b, p.radius, h, p.sdAxis, p.sdCaps, 1, [0.75, 0.75], 0.25);
      cap(b, p.radius, -h, p.sdAxis, p.sdCaps, -1, [0.25, 0.75], 0.25);
      return b.build();
    },
  },

  cone: {
    id: "cone",
    label: "コーン",
    en: "Cone",
    params: [
      { key: "radius", label: "半径", value: 0.7, min: 0.05, max: 3, step: 0.05 },
      { key: "height", label: "高さ", value: 2, min: 0.05, max: 6, step: 0.05 },
      { key: "sdAxis", label: "分割数 軸", value: 16, min: 3, max: 64, step: 1 },
      { key: "sdHeight", label: "分割数 高さ", value: 1, min: 1, max: 24, step: 1 },
      { key: "sdCap", label: "分割数 キャップ", value: 1, min: 0, max: 8, step: 1 },
    ],
    build(p) {
      const b = new MeshBuilder();
      const h = p.height / 2;
      quadGrid(
        b,
        p.sdAxis,
        p.sdHeight,
        (u, v) => {
          const a = u * Math.PI * 2;
          return [p.radius * (1 - v) * Math.cos(a), -h + v * p.height, p.radius * (1 - v) * Math.sin(a)];
        },
        // 側面は下半分、フタは上半分の真ん中（Maya と同じ）
        (u, v) => [u, v * 0.5],
        true,
      );
      cap(b, p.radius, -h, p.sdAxis, p.sdCap, -1, [0.5, 0.75], 0.25);
      return b.build();
    },
  },

  torus: {
    id: "torus",
    label: "トーラス",
    en: "Torus",
    params: [
      { key: "radius", label: "半径", value: 1, min: 0.1, max: 4, step: 0.05 },
      { key: "section", label: "断面半径", value: 0.32, min: 0.02, max: 2, step: 0.02 },
      { key: "twist", label: "ツイスト", value: 0, min: 0, max: 360, step: 5 },
      { key: "sdAxis", label: "分割数 軸", value: 24, min: 3, max: 80, step: 1 },
      { key: "sdHeight", label: "分割数 断面", value: 12, min: 3, max: 48, step: 1 },
    ],
    build(p) {
      const b = new MeshBuilder();
      const twist = (p.twist * Math.PI) / 180;
      quadGrid(
        b,
        p.sdAxis,
        p.sdHeight,
        (u, v) => {
          const a = u * Math.PI * 2;
          const t = v * Math.PI * 2 + twist * u;
          const r = p.radius + p.section * Math.cos(t);
          return [r * Math.cos(a), p.section * Math.sin(t), r * Math.sin(a)];
        },
        (u, v) => [u, v],
        true,
      );
      return b.build();
    },
  },

  plane: {
    id: "plane",
    label: "プレーン",
    en: "Plane",
    params: [
      { key: "width", label: "幅", value: 2, min: 0.05, max: 10, step: 0.05 },
      { key: "height", label: "奥行き", value: 2, min: 0.05, max: 10, step: 0.05 },
      { key: "sdW", label: "分割数 幅", value: 4, min: 1, max: 40, step: 1 },
      { key: "sdH", label: "分割数 奥行き", value: 4, min: 1, max: 40, step: 1 },
    ],
    build(p) {
      const b = new MeshBuilder();
      quadGrid(
        b,
        p.sdW,
        p.sdH,
        (u, v) => [-p.width / 2 + u * p.width, 0, -p.height / 2 + v * p.height],
        (u, v) => [u, v],
        true,
      );
      return b.build();
    },
  },

  disk: {
    id: "disk",
    label: "ディスク",
    en: "Disk",
    params: [
      { key: "radius", label: "半径", value: 1, min: 0.05, max: 4, step: 0.05 },
      { key: "sides", label: "サイド数", value: 16, min: 3, max: 64, step: 1 },
      { key: "sdCaps", label: "分割数", value: 1, min: 1, max: 10, step: 1 },
    ],
    build(p) {
      const b = new MeshBuilder();
      // 円盤は 0〜1 いっぱいの円（Maya と同じ）
      cap(b, p.radius, 0, p.sides, p.sdCaps, 1, [0.5, 0.5], 0.5);
      return b.build();
    },
  },

  platonic: {
    id: "platonic",
    label: "正多面体",
    en: "Platonic",
    params: [
      {
        key: "kind",
        label: "種類",
        value: 4,
        min: 0,
        max: 4,
        step: 1,
        choices: ["正四面体", "正六面体", "正八面体", "正十二面体", "正二十面体"],
      },
      { key: "radius", label: "半径", value: 1, min: 0.05, max: 4, step: 0.05 },
    ],
    build(p) {
      const phi = (1 + Math.sqrt(5)) / 2;
      const iv = 1 / phi;
      const kind = Math.round(p.kind);
      let verts: number[][];
      let faces: number[][];
      if (kind === 0) {
        verts = [
          [1, 1, 1],
          [1, -1, -1],
          [-1, 1, -1],
          [-1, -1, 1],
        ];
        faces = [
          [0, 1, 2],
          [0, 3, 1],
          [0, 2, 3],
          [1, 3, 2],
        ];
      } else if (kind === 1) {
        verts = [
          [1, 1, 1],
          [1, 1, -1],
          [1, -1, 1],
          [1, -1, -1],
          [-1, 1, 1],
          [-1, 1, -1],
          [-1, -1, 1],
          [-1, -1, -1],
        ];
        faces = [
          [0, 1, 3, 2],
          [4, 6, 7, 5],
          [0, 4, 5, 1],
          [2, 3, 7, 6],
          [0, 2, 6, 4],
          [1, 5, 7, 3],
        ];
      } else if (kind === 2) {
        verts = [
          [1, 0, 0],
          [-1, 0, 0],
          [0, 1, 0],
          [0, -1, 0],
          [0, 0, 1],
          [0, 0, -1],
        ];
        faces = [
          [0, 2, 4],
          [2, 1, 4],
          [1, 3, 4],
          [3, 0, 4],
          [2, 0, 5],
          [1, 2, 5],
          [3, 1, 5],
          [0, 3, 5],
        ];
      } else if (kind === 3) {
        verts = [
          [1, 1, 1],
          [1, 1, -1],
          [1, -1, 1],
          [1, -1, -1],
          [-1, 1, 1],
          [-1, 1, -1],
          [-1, -1, 1],
          [-1, -1, -1],
          [0, iv, phi],
          [0, iv, -phi],
          [0, -iv, phi],
          [0, -iv, -phi],
          [iv, phi, 0],
          [iv, -phi, 0],
          [-iv, phi, 0],
          [-iv, -phi, 0],
          [phi, 0, iv],
          [phi, 0, -iv],
          [-phi, 0, iv],
          [-phi, 0, -iv],
        ];
        faces = [
          [0, 8, 10, 2, 16],
          [0, 16, 17, 1, 12],
          [0, 12, 14, 4, 8],
          [8, 4, 18, 6, 10],
          [10, 6, 15, 13, 2],
          [2, 13, 3, 17, 16],
          [17, 3, 11, 9, 1],
          [1, 9, 5, 14, 12],
          [14, 5, 19, 18, 4],
          [18, 19, 7, 15, 6],
          [15, 7, 11, 3, 13],
          [9, 11, 7, 19, 5],
        ];
      } else {
        verts = [
          [-1, phi, 0],
          [1, phi, 0],
          [-1, -phi, 0],
          [1, -phi, 0],
          [0, -1, phi],
          [0, 1, phi],
          [0, -1, -phi],
          [0, 1, -phi],
          [phi, 0, -1],
          [phi, 0, 1],
          [-phi, 0, -1],
          [-phi, 0, 1],
        ];
        faces = [
          [0, 11, 5],
          [0, 5, 1],
          [0, 1, 7],
          [0, 7, 10],
          [0, 10, 11],
          [1, 5, 9],
          [5, 11, 4],
          [11, 10, 2],
          [10, 7, 6],
          [7, 1, 8],
          [3, 9, 4],
          [3, 4, 2],
          [3, 2, 6],
          [3, 6, 8],
          [3, 8, 9],
          [4, 9, 5],
          [2, 4, 11],
          [6, 2, 10],
          [8, 6, 7],
          [9, 8, 1],
        ];
      }
      const b = new MeshBuilder({ weld: false });
      for (const v of verts) {
        const len = Math.hypot(v[0], v[1], v[2]);
        b.vertex((v[0] / len) * p.radius, (v[1] / len) * p.radius, (v[2] / len) * p.radius);
      }
      for (const f of faces) b.face(f);
      const mesh = b.build();
      // 外向きになるよう面の向きを揃える（原点から見て法線が外を向く）
      const flipped: number[][] = [];
      for (let f = 0; f < mesh.faceCount; f++) {
        const c = mesh.faceCenter(f);
        const n = mesh.faceNormal(f);
        const verts2 = mesh.faceVerts(f);
        flipped.push(c[0] * n[0] + c[1] * n[1] + c[2] * n[2] < 0 ? verts2.reverse() : verts2);
      }
      const b2 = new MeshBuilder({ weld: false });
      for (let v = 0; v < mesh.vertexCount; v++) {
        const pt = mesh.getPosition(v);
        b2.vertex(pt[0], pt[1], pt[2]);
      }
      // UV は面ごとの平面投影を格子に並べる（Maya の正多面体も面ごとに分かれている）。
      // 曲がった面が無いので、これで歪みはゼロになる
      const cols = Math.ceil(Math.sqrt(flipped.length));
      const rows = Math.ceil(flipped.length / cols);
      const margin = 0.02;
      flipped.forEach((face, index) => {
        const pts = face.map((v) => mesh.getPosition(v));
        const uvRows = planarCell(pts, index % cols, Math.floor(index / cols), cols, rows, margin);
        b2.face(face, { uv: new Map([["map1", uvRows]]) });
      });
      return b2.build();
    },
  },
};

export const PRIMITIVE_ORDER = ["cube", "sphere", "cylinder", "cone", "torus", "plane", "disk", "platonic"];

/** 定義から既定パラメータを作る。 */
export function defaultParams(id: string): PrimitiveParams {
  const def = PRIMITIVES[id];
  const out: PrimitiveParams = {};
  if (!def) return out;
  for (const p of def.params) out[p.key] = p.value;
  return out;
}
