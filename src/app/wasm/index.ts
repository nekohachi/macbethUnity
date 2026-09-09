/**
 * wasm の入口（`30` の T2）。
 *
 * `src/core/` からは決して参照しない。core の JS 版が正しさの基準で、
 * ここは速い置き換え。読めなければ null が返り、呼ぶ側が JS 版に落ちる。
 */
export { loadWasm, forgetWasmForTest, WasmModule, type WasmExports } from "./module.js";
export { catmullClarkWasm, subdivGeometry, buildFromGeometry, type SubdivGeometry } from "./subdiv.js";
