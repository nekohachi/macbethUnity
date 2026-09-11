/**
 * core — プラットフォーム非依存のジオメトリとドキュメント。
 *
 * ここから DOM、Three.js、ブラウザ API を参照してはいけない（docs/02、docs/09）。
 * v1.5 でこの層を C++ → wasm に差し替えるときの境界になる。
 */
export * from "./mesh.js";
export * from "./primitives.js";
export * from "./topology.js";
export * from "./bevel.js";
export * from "./bridge.js";
export * from "./vertexOps.js";
export * from "./connect.js";
export * from "./slide.js";
export * from "./objectOps.js";
export * from "./transfer.js";
export * from "./bvh.js";
export * from "./uv/index.js";
export * from "./selection.js";
export * from "./subdivide.js";
export * from "./stamps.js";
export * from "./sculpt.js";
export * from "./symmetry.js";
export * from "./reproject.js";
export * from "./mask.js";
export * from "./multires.js";
export * from "./bake.js";
export * from "./document.js";
export * from "./io/obj.js";
export * from "./io/gltf.js";
export * from "./io/binary.js";
export * from "./io/mbz.js";
export * from "./io/hash.js";
export * from "./io/zip.js";
