/**
 * wasm の読み込みと呼び口（`30` の T2）。
 *
 * **`src/core/` はここを知らない。** core の JS 版が正しさの基準で、wasm は
 * 速い置き換え。読めなければ `null` を返し、呼ぶ側は JS 版に落ちる
 * （`02` と `09` の層の決め。`12` の E1 で ufbx を足すときも同じ入口を使う）。
 *
 * 中身は base64 で抱えているので、取りに行かない。オフラインでも動く。
 */
import { wasmBuffer, WASM_BYTE_LENGTH } from "../../wasm/bytes.js";

/** wasm が出している関数。 */
export interface WasmExports {
  memory: WebAssembly.Memory;
  mb_reset(): void;
  mb_alloc(size: number): number;
  mb_used(): number;
  mb_add(a: number, b: number): number;
  mb_subdiv(
    vertexCount: number,
    faceCount: number,
    faceOffsets: number,
    faceCorners: number,
    positions: number,
    creaseCount: number,
    creasePairs: number,
    creaseVals: number,
  ): number;
}

/** 読み込んだ wasm。ヒープに配列を置く手当ても付ける。 */
export class WasmModule {
  constructor(readonly exports: WasmExports) {}

  /** 生の wasm の大きさ（バイト）。ベンチの表に出す。 */
  get byteLength(): number {
    return WASM_BYTE_LENGTH;
  }

  /** 場所取りを最初に戻す。計算の頭で必ず呼ぶ。 */
  reset(): void {
    this.exports.mb_reset();
  }

  /**
   * `bytes` 取って、その場所を返す。0 なら取れなかった。
   *
   * メモリが伸びると `memory.buffer` が別物になるので、**取った直後に
   * 作った TypedArray は次の `alloc` をまたいで使ってはいけない**。
   * 見るのはすべて取り終わってから（`view` を使う）。
   */
  alloc(bytes: number): number {
    return this.exports.mb_alloc(bytes);
  }

  /** いまのヒープを見る窓。`alloc` のあとに取り直すこと。 */
  u32(at: number, count: number): Uint32Array {
    return new Uint32Array(this.exports.memory.buffer, at, count);
  }
  f32(at: number, count: number): Float32Array {
    return new Float32Array(this.exports.memory.buffer, at, count);
  }

  /** JS の配列をヒープへ写して、その場所を返す。 */
  put(src: Uint32Array | Float32Array): number {
    const at = this.alloc(src.byteLength || 4);
    if (!at) return 0;
    if (src instanceof Uint32Array) this.u32(at, src.length).set(src);
    else this.f32(at, src.length).set(src);
    return at;
  }

  /** いま取ってある量（バイト）。 */
  used(): number {
    return this.exports.mb_used();
  }
}

let pending: Promise<WasmModule | null> | null = null;

/**
 * wasm を読む。2 回目からは同じものを返す。読めなければ `null`。
 *
 * 失敗しても投げない。wasm が使えない環境（古い WebView、無効化された設定）
 * でもアプリは動くべきなので、呼ぶ側が JS 版に落ちられるようにする。
 */
export function loadWasm(): Promise<WasmModule | null> {
  if (pending) return pending;
  pending = (async () => {
    try {
      if (typeof WebAssembly === "undefined") return null;
      const { instance } = await WebAssembly.instantiate(wasmBuffer(), {});
      const ex = instance.exports as unknown as WasmExports;
      if (typeof ex.mb_subdiv !== "function" || typeof ex.mb_alloc !== "function") return null;
      const mod = new WasmModule(ex);
      // 読めて呼べることの確かめ（`30` T2 の通し確認と同じ）
      if (mod.exports.mb_add(2, 3) !== 5) return null;
      mod.reset();
      return mod;
    } catch {
      return null;
    }
  })();
  return pending;
}

/** テストのために読み直せるようにする。 */
export function forgetWasmForTest(): void {
  pending = null;
}
