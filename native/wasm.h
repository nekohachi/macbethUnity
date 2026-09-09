/*
 * wasm 側の土台（`30` の T2）。
 *
 * 標準ライブラリを使わない（`-nostdlib`）ので、要るものはここに置く。
 * malloc/free は無く、**積み上げ式の場所取り**（bump allocator）だけ。
 * 1 回の呼び出しで取って、次の呼び出しの頭で `mb_reset` でまとめて戻す。
 * 細分割のように「入れて、出して、終わり」の使い方にはこれで足りる。
 */
#ifndef MACBETH_WASM_H
#define MACBETH_WASM_H

typedef unsigned char u8;
typedef unsigned int u32;
typedef int i32;
typedef unsigned long long u64;
typedef float f32;
typedef double f64;

#define MB_EXPORT(name) __attribute__((export_name(name)))
#define MB_NULL 0u

/** リンカが置く、静的な領域の終わり。ここから先が自由に使える。 */
extern u8 __heap_base;

/** wasm のページは 64KiB。 */
#define MB_PAGE 65536u

/** 場所取りを最初に戻す。次の計算の頭で必ず呼ぶ。 */
MB_EXPORT("mb_reset") void mb_reset(void);

/** `size` バイト取る。16 バイト境界にそろえる。足りなければメモリを伸ばす。 */
MB_EXPORT("mb_alloc") u32 mb_alloc(u32 size);

/** いま取ってある量（バイト）。ベンチで見る。 */
MB_EXPORT("mb_used") u32 mb_used(void);

/** 読めて呼べることの確かめ（`30` T2 の通し確認）。 */
MB_EXPORT("mb_add") i32 mb_add(i32 a, i32 b);

void *mb_memset(void *dst, int value, u32 size);
void *mb_memcpy(void *dst, const void *src, u32 size);

#endif
