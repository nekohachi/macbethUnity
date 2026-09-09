/* 土台の実装。`wasm.h` の説明を見ること。 */
#include "wasm.h"

static u32 g_top = 0;

static u32 heap_start(void) {
  u32 base = (u32)(&__heap_base);
  return (base + 15u) & ~15u;
}

void mb_reset(void) { g_top = heap_start(); }

u32 mb_alloc(u32 size) {
  if (g_top == 0) g_top = heap_start();
  u32 at = (g_top + 15u) & ~15u;
  u32 end = at + ((size + 15u) & ~15u);
  // いま持っているページ数（1 ページ 64KiB）
  u32 have = (u32)__builtin_wasm_memory_size(0) * MB_PAGE;
  if (end > have) {
    u32 need = (end - have + MB_PAGE - 1u) / MB_PAGE;
    // 伸ばすときは少し多めに取る。細切れに伸ばすと遅い
    u32 grow = need + (need >> 1) + 16u;
    if (__builtin_wasm_memory_grow(0, (int)grow) < 0) {
      if (__builtin_wasm_memory_grow(0, (int)need) < 0) return MB_NULL; // 伸ばせない
    }
  }
  g_top = end;
  return at;
}

u32 mb_used(void) { return g_top == 0 ? 0u : g_top - heap_start(); }

i32 mb_add(i32 a, i32 b) { return a + b; }

/*
 * clang が配列の初期化などで memset / memcpy を呼ぶことがある。標準ライブラリが
 * 無いので自前で置く。名前は素のもの（リンカが探すのはこの名前）。
 */
void *memset(void *dst, int value, unsigned int size) {
  u8 *p = (u8 *)dst;
  for (u32 i = 0; i < size; i++) p[i] = (u8)value;
  return dst;
}

void *memcpy(void *dst, const void *src, unsigned int size) {
  u8 *d = (u8 *)dst;
  const u8 *s = (const u8 *)src;
  for (u32 i = 0; i < size; i++) d[i] = s[i];
  return dst;
}

void *mb_memset(void *dst, int value, u32 size) { return memset(dst, value, size); }
void *mb_memcpy(void *dst, const void *src, u32 size) { return memcpy(dst, src, size); }
