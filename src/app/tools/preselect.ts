/**
 * プリセレクション。ペンやマウスを乗せたときに、押したら何が拾えるかを薄く示す。
 *
 * 指にはホバーが無いので出さない。細かい頂点を狙うときに効く。
 * 選択そのものより暗い色にして、選択済みのオレンジと見分けられるようにする。
 */
import { LineSegments, Mesh as ThreeMesh, Points, type Group } from "three";
import {
  LineBasicMaterial,
  MeshBasicMaterial,
  PointsMaterial,
  DoubleSide,
} from "three";
import { applyTransform, disposeObject3D, positionGeometry } from "../render/meshView.js";
import type { ObjectView } from "../render/meshView.js";
import type { Picker, ScreenPoint } from "../render/picking.js";
import type { AppState } from "../state.js";

const VERTEX_RADIUS = 22;
const EDGE_RADIUS = 16;

/** 選択の色より暗く、薄く。 */
const MAT = {
  vert: new PointsMaterial({ color: 0xffc46b, size: 9, sizeAttenuation: false, transparent: true, opacity: 0.75 }),
  edge: new LineBasicMaterial({ color: 0xffc46b, transparent: true, opacity: 0.8 }),
  /** ターゲットウェルドの相手。溶接するので選択より強い色にする。 */
  weld: new PointsMaterial({ color: 0x6cf07a, size: 14, sizeAttenuation: false }),
  /** スナップ先。ウェルドと同じ緑で、少し小さく。 */
  snap: new PointsMaterial({ color: 0x6cf07a, size: 11, sizeAttenuation: false }),
  face: new MeshBasicMaterial({
    color: 0xffc46b,
    transparent: true,
    opacity: 0.22,
    side: DoubleSide,
    depthWrite: false,
  }),
};

export class Preselect {
  /** 今光らせているもの。同じなら描き直さない。 */
  private current = "";

  constructor(
    private state: AppState,
    private picker: Picker,
    private group: Group,
  ) {}

  clear(): void {
    if (!this.current) return;
    for (const c of this.group.children.slice()) {
      this.group.remove(c);
      disposeObject3D(c);
    }
    this.current = "";
  }

  /** 指定した頂点を光らせる。ターゲットウェルドの相手を示すのに使う。 */
  showVertex(view: ObjectView, v: number): void {
    if (this.setKey(`w${v}`)) return;
    const m = view.object.mesh;
    const pt = new Points(
      positionGeometry([m.positions[v * 3], m.positions[v * 3 + 1], m.positions[v * 3 + 2]]),
      MAT.weld,
    );
    this.add(pt, view);
  }

  /** ワールド座標の 1 点を光らせる。スナップ先を示すのに使う。 */
  showWorldPoint(x: number, y: number, z: number): void {
    const key = `s${x.toFixed(4)},${y.toFixed(4)},${z.toFixed(4)}`;
    if (this.setKey(key)) return;
    const pt = new Points(positionGeometry([x, y, z]), MAT.snap);
    pt.renderOrder = 3;
    this.group.add(pt);
  }

  update(p: ScreenPoint, view: ObjectView | undefined): void {
    if (!view || this.state.compMode === "object") return this.clear();
    const o = view.object;
    const m = o.mesh;

    if (this.state.compMode === "vertex") {
      const v = this.picker.pickVertex(view, p, VERTEX_RADIUS);
      if (v < 0) return this.clear();
      if (this.setKey(`v${v}`)) return;
      const pt = new Points(
        positionGeometry([m.positions[v * 3], m.positions[v * 3 + 1], m.positions[v * 3 + 2]]),
        MAT.vert,
      );
      this.add(pt, view);
      return;
    }

    if (this.state.compMode === "edge") {
      const hit = this.picker.pickEdge(view, p, EDGE_RADIUS);
      if (hit.edge < 0) return this.clear();
      if (this.setKey(`e${hit.edge}`)) return;
      const [a, b] = view.edges[hit.edge];
      const ls = new LineSegments(
        positionGeometry([
          m.positions[a * 3],
          m.positions[a * 3 + 1],
          m.positions[a * 3 + 2],
          m.positions[b * 3],
          m.positions[b * 3 + 1],
          m.positions[b * 3 + 2],
        ]),
        MAT.edge,
      );
      this.add(ls, view);
      return;
    }

    const hit = this.picker.pickSurface(p);
    if (!hit || hit.object !== o) return this.clear();
    if (this.setKey(`f${hit.face}`)) return;
    const verts = m.faceVerts(hit.face);
    const flat: number[] = [];
    const idx: number[] = [];
    for (const v of verts) flat.push(m.positions[v * 3], m.positions[v * 3 + 1], m.positions[v * 3 + 2]);
    for (let i = 1; i < verts.length - 1; i++) idx.push(0, i, i + 1);
    const g = positionGeometry(flat);
    g.setIndex(idx);
    this.add(new ThreeMesh(g, MAT.face), view);
  }

  /** 同じものを指しているなら true（描き直さない）。 */
  private setKey(key: string): boolean {
    if (this.current === key) return true;
    this.clear();
    this.current = key;
    return false;
  }

  private add(node: Points | LineSegments | ThreeMesh, view: ObjectView): void {
    applyTransform(node, view.object.transform).renderOrder = 3;
    this.group.add(node);
  }
}
