/**
 * Catmull-Clark 1 レベルを wasm で（`30` の T3）。
 *
 * wasm がやるのは**形だけ**（トポロジと座標）。UV とクリースの引き継ぎは
 * JS のまま（面ごとに線形なので wasm に出す意味がない）。出力の頂点番号と
 * 面の並びは `src/core/subdivide.ts` と 1 つ違わず同じ。
 *
 * 読めなければ `null` を返す。呼ぶ側は `catmullClark` に落ちる。
 */
import { assembleQuads, edgeKey, type Mesh } from "../../core/index.js";
import { loadWasm, type WasmModule } from "./module.js";

/** wasm が返した形。すべて JS 側へ写し取ったもの。 */
export interface SubdivGeometry {
  /** 出力の頂点数（頂点点 + エッジ点 + 面点）。 */
  outCount: number;
  /** 出力でエッジ点が始まる番号。 */
  edgeBase: number;
  /** 出力で面点が始まる番号。 */
  faceBase: number;
  /** 3 × outCount。 */
  positions: Float32Array;
  /** 4 × コーナー数。入力のコーナーの並び順。 */
  quads: Uint32Array;
  /** 2 × エッジ数。[小, 大] の組。並びがエッジ点の並び。 */
  edgeList: Uint32Array;
}

/** 見出しの並び（`native/subdiv.c` の enum と合わせる）。 */
const H_OUT_VERTS = 0,
  H_EDGE_BASE = 2,
  H_FACE_BASE = 3,
  H_OUT_FACES = 4,
  H_POSITIONS = 5,
  H_QUADS = 6,
  H_EDGE_LIST = 7,
  H_OK = 8,
  H_SIZE = 9;

/** クリースを [a0,b0,a1,b1,…] と鋭さの組にほどく。 */
function creaseArrays(mesh: Mesh): { pairs: Uint32Array; vals: Float32Array } {
  const n = mesh.crease.size;
  const pairs = new Uint32Array(n * 2);
  const vals = new Float32Array(n);
  let i = 0;
  for (const [key, value] of mesh.crease) {
    const s = key.indexOf("_");
    pairs[i * 2] = Number(key.slice(0, s));
    pairs[i * 2 + 1] = Number(key.slice(s + 1));
    vals[i] = value;
    i++;
  }
  return { pairs, vals };
}

/**
 * 形だけを出す。メモリが足りなければ `null`。
 *
 * `mod.reset()` から始めるので、**前の呼び出しで返った配列はここでは使えない**
 * （返す前に JS 側へ写しているので、この関数の戻り値は安全）。
 */
export function subdivGeometry(mod: WasmModule, mesh: Mesh): SubdivGeometry | null {
  mod.reset();
  const { pairs, vals } = creaseArrays(mesh);

  // 先に全部取る。取り終わってから窓を作る（伸びると窓が外れるため）
  const pOffsets = mod.put(mesh.faceOffsets);
  const pCorners = mod.put(mesh.faceCorners);
  const pPositions = mod.put(mesh.positions);
  const pPairs = mod.put(pairs);
  const pVals = mod.put(vals);
  if (!pOffsets || !pCorners || !pPositions || !pPairs || !pVals) return null;

  const head = mod.exports.mb_subdiv(
    mesh.vertexCount,
    mesh.faceCount,
    pOffsets,
    pCorners,
    pPositions,
    vals.length,
    pPairs,
    pVals,
  );
  if (!head) return null;
  const H = mod.u32(head, H_SIZE);
  if (!H[H_OK]) return null;

  const outCount = H[H_OUT_VERTS];
  const faces = H[H_OUT_FACES];
  const edgeCount = H[H_FACE_BASE] - H[H_EDGE_BASE];
  // slice で JS 側へ写す。ヒープはこのあと使い回されるため
  return {
    outCount,
    edgeBase: H[H_EDGE_BASE],
    faceBase: H[H_FACE_BASE],
    positions: mod.f32(H[H_POSITIONS], outCount * 3).slice(),
    quads: mod.u32(H[H_QUADS], faces * 4).slice(),
    edgeList: mod.u32(H[H_EDGE_LIST], edgeCount * 2).slice(),
  };
}

/**
 * wasm が出した形に、UV とクリースを載せてメッシュにする。
 *
 * 組み立ては core の `assembleQuads` に任せる（`32` の T1）。JS 版の細分割と
 * 同じ 1 本を通るので、`tests/subdiv-wasm.test.ts` の一致テストが両方を守る。
 * ここでやるのは、エッジ点の引き当て（クリースの引き継ぎ用）だけ。
 */
export function buildFromGeometry(mesh: Mesh, g: SubdivGeometry): Mesh {
  // クリースがあるときだけ引き当ての表を作る。100 万四角形では
  // 文字列キーの表そのものが重いので、要らないなら作らない
  let at: Map<string, number> | null = null;
  const edgePointOf = (a: number, b: number): number => {
    if (!at) {
      at = new Map();
      for (let e = 0; e < g.edgeList.length / 2; e++) {
        at.set(edgeKey(g.edgeList[e * 2], g.edgeList[e * 2 + 1]), g.edgeBase + e);
      }
    }
    return at.get(edgeKey(a, b)) ?? -1;
  };
  return assembleQuads(mesh, g.positions, g.quads, edgePointOf);
}

/** wasm で 1 レベル細分割する。使えなければ `null`（呼ぶ側が JS 版へ落ちる）。 */
export async function catmullClarkWasm(mesh: Mesh): Promise<Mesh | null> {
  const mod = await loadWasm();
  if (!mod) return null;
  const g = subdivGeometry(mod, mesh);
  return g ? buildFromGeometry(mesh, g) : null;
}
