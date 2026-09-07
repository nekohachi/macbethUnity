/**
 * ベベルツール。マルチカットと同じく、ドラッグ中に結果を先に見せる。
 *
 * 幅は横方向のドラッグ量から決める。確定したあとも、オプションの幅と
 * セグメント数を動かせば作り直す（Maya のベベルノードの代わり）。
 * そのために「ベベル前のメッシュ」を確定後もしばらく持っておく。
 */
import { bevelEdges, type Mesh, type SceneObject } from "../../core/index.js";

/** 画面上でこれだけ動かすと、エッジの長さの半分ぶんの幅になる。 */
const PIXELS_FOR_HALF = 100;

export interface BevelSettings {
  width: number;
  segments: number;
}

export interface BevelSession {
  object: SceneObject;
  /** ベベルする前のメッシュ。作り直しの土台。 */
  source: Mesh;
  /** 対象のエッジ（source 上の頂点番号）。 */
  edges: Array<[number, number]>;
  /** 選択エッジの平均の長さ。ドラッグ量を幅に換算するのに使う。 */
  scale: number;
  /** ドラッグを始めた画面の x。 */
  startX: number;
}

export class BevelTool {
  private session: BevelSession | null = null;

  get active(): boolean {
    return this.session !== null;
  }

  /**
   * 対象を決めてセッションを始める。
   * エッジが選ばれていない、または対象が扱えない形なら null。
   */
  begin(object: SceneObject, edges: Array<[number, number]>, startX: number): BevelSession | null {
    if (!edges.length) return null;
    let total = 0;
    for (const [a, b] of edges) {
      const pa = object.mesh.getPosition(a);
      const pb = object.mesh.getPosition(b);
      total += Math.hypot(pa[0] - pb[0], pa[1] - pb[1], pa[2] - pb[2]);
    }
    const scale = total / edges.length || 1;
    this.session = { object, source: object.mesh.clone(), edges, scale, startX };
    return this.session;
  }

  /** ドラッグ量から幅を決める。エッジ長の 2% 〜 49% に収める。 */
  widthFromDrag(dx: number, scale: number): number {
    const raw = (dx / PIXELS_FOR_HALF) * scale * 0.5;
    return Math.max(scale * 0.02, Math.min(scale * 0.49, raw));
  }

  /**
   * 今の設定でベベルをかけ直す。土台は常にベベル前のメッシュなので、
   * 何度呼んでも二重にかからない。
   */
  apply(settings: BevelSettings): { faces: number } | null {
    const s = this.session;
    if (!s) return null;
    const r = bevelEdges(s.source, s.edges, settings.width, settings.segments);
    if (!r) return null;
    s.object.mesh = r.mesh;
    return { faces: r.newFaces };
  }

  /** 途中でやめる。メッシュを元に戻す。 */
  cancel(): void {
    const s = this.session;
    if (!s) return;
    s.object.mesh = s.source;
    this.session = null;
  }

  /** 確定して、作り直せる状態のまま保持する。 */
  keep(): BevelSession | null {
    return this.session;
  }

  end(): void {
    this.session = null;
  }
}
