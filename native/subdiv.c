/*
 * Catmull-Clark を 1 レベルだけ（`30` の T3）。
 *
 * **`src/core/subdivide.ts` と同じ式を同じ順序で通す。** 出力の頂点番号も面の
 * 並びも 1 つ違わず同じにする（`tests/subdiv-wasm.test.ts` が突き合わせる）。
 * ずれると差分更新やマルチ解像度が壊れるので、速さより一致を優先すること。
 *
 * 入出力は CSR。UV は JS 側で分ける（面ごとに線形なので、ここで持つ意味がない）。
 * クリースは入力で受け取り、鋭さ 0..1 に丸めてここで効かせる。段を減らす処理は
 * JS 側（出力メッシュを組むとき）。
 *
 * 番号の付け方は JS と同じ:
 *   頂点点 [0, V) → エッジ点 [V, V+E) → 面点 [V+E, V+E+F)
 * エッジの並びは「面を順に、コーナーを順に見て、初めて出たとき」。
 */
#include "wasm.h"

/** 空きを表す印。 */
#define EMPTY 0xFFFFFFFFu

/** mb_subdiv が返す見出し（u32 の並び）。 */
enum {
  H_OUT_VERTS = 0,
  H_EDGE_COUNT,
  H_EDGE_BASE,
  H_FACE_BASE,
  H_OUT_FACES,
  H_POSITIONS,
  H_QUADS,
  H_EDGE_LIST,
  H_OK,
  H_SIZE,
};

static u32 next_pow2(u32 v) {
  u32 p = 16;
  while (p < v && p < 0x40000000u) p <<= 1;
  return p;
}

/** 64 ビットの鍵を混ぜる（splitmix の混ぜ方）。 */
static u32 mix(u64 k) {
  k ^= k >> 33;
  k *= 0xff51afd7ed558ccdULL;
  k ^= k >> 33;
  k *= 0xc4ceb9fe1a85ec53ULL;
  k ^= k >> 33;
  return (u32)k;
}

/* 表を引くための、今回の呼び出し中だけ生きる置き場 */
static u32 *t_slot;   /* 表。エッジ番号か EMPTY */
static u32 t_mask;    /* 表の大きさ - 1 */
static u32 *t_edgeA;  /* エッジの小さい方の頂点 */
static u32 *t_edgeB;  /* 大きい方 */

/** (a, b) のエッジ番号を返す。無ければ EMPTY。 */
static u32 edge_find(u32 a, u32 b) {
  u32 lo = a < b ? a : b, hi = a < b ? b : a;
  u32 i = mix(((u64)lo << 32) | (u64)hi) & t_mask;
  for (;;) {
    u32 e = t_slot[i];
    if (e == EMPTY) return EMPTY;
    if (t_edgeA[e] == lo && t_edgeB[e] == hi) return e;
    i = (i + 1) & t_mask;
  }
}

/** (a, b) のエッジ番号。無ければ `*count` 番として足す。 */
static u32 edge_intern(u32 a, u32 b, u32 *count) {
  u32 lo = a < b ? a : b, hi = a < b ? b : a;
  u32 i = mix(((u64)lo << 32) | (u64)hi) & t_mask;
  for (;;) {
    u32 e = t_slot[i];
    if (e == EMPTY) {
      u32 n = (*count)++;
      t_edgeA[n] = lo;
      t_edgeB[n] = hi;
      t_slot[i] = n;
      return n;
    }
    if (t_edgeA[e] == lo && t_edgeB[e] == hi) return e;
    i = (i + 1) & t_mask;
  }
}

/**
 * 細分割する。ポインタはすべて wasm のヒープの中（`mb_alloc` で取ったもの）。
 *
 * creaseCount が 0 ならクリース無し。creasePairs は [a0,b0,a1,b1,…]、
 * creaseVals は同じ数の鋭さ（0 より大きい値。1 を超えたら 1 に丸める）。
 *
 * 返すのは見出し（u32 × H_SIZE）の場所。H_OK が 0 ならメモリが足りなかった。
 */
MB_EXPORT("mb_subdiv")
u32 mb_subdiv(u32 vertexCount, u32 faceCount, u32 faceOffsetsPtr, u32 faceCornersPtr, u32 positionsPtr,
              u32 creaseCount, u32 creasePairsPtr, u32 creaseValsPtr) {
  const u32 *faceOffsets = (const u32 *)faceOffsetsPtr;
  const u32 *faceCorners = (const u32 *)faceCornersPtr;
  const f32 *pos = (const f32 *)positionsPtr;

  u32 head = mb_alloc(H_SIZE * 4);
  if (!head) return MB_NULL;
  u32 *H = (u32 *)head;
  mb_memset(H, 0, H_SIZE * 4);

  const u32 cornerCount = faceCount ? faceOffsets[faceCount] : 0;

  /* --- エッジを見つける --------------------------------------------------- */
  u32 tableSize = next_pow2(cornerCount * 2 + 16);
  t_mask = tableSize - 1;
  t_slot = (u32 *)mb_alloc(tableSize * 4);
  t_edgeA = (u32 *)mb_alloc((cornerCount + 1) * 4);
  t_edgeB = (u32 *)mb_alloc((cornerCount + 1) * 4);
  u32 *edgeUses = (u32 *)mb_alloc((cornerCount + 1) * 4);  /* 接する面の数（重複も数える） */
  u32 *edgeFace = (u32 *)mb_alloc((cornerCount + 1) * 8);  /* 最初の 2 面だけ持つ */
  f32 *edgeSharp = (f32 *)mb_alloc((cornerCount + 1) * 4);
  if (!t_slot || !t_edgeA || !t_edgeB || !edgeUses || !edgeFace || !edgeSharp) return head;
  mb_memset(t_slot, 0xFF, tableSize * 4);
  mb_memset(edgeUses, 0, (cornerCount + 1) * 4);
  mb_memset(edgeSharp, 0, (cornerCount + 1) * 4);

  u32 edgeCount = 0;
  for (u32 f = 0; f < faceCount; f++) {
    u32 s = faceOffsets[f], n = faceOffsets[f + 1] - s;
    for (u32 i = 0; i < n; i++) {
      u32 a = faceCorners[s + i], b = faceCorners[s + ((i + 1) % n)];
      u32 e = edge_intern(a, b, &edgeCount);
      if (edgeUses[e] < 2) edgeFace[e * 2 + edgeUses[e]] = f;
      edgeUses[e]++;
    }
  }

  /* --- クリース ----------------------------------------------------------- */
  if (creaseCount) {
    const u32 *pairs = (const u32 *)creasePairsPtr;
    const f32 *vals = (const f32 *)creaseValsPtr;
    for (u32 i = 0; i < creaseCount; i++) {
      u32 e = edge_find(pairs[i * 2], pairs[i * 2 + 1]);
      if (e == EMPTY) continue;
      f32 v = vals[i];
      edgeSharp[e] = v > 1.0f ? 1.0f : (v < 0.0f ? 0.0f : v);
    }
  }

  const u32 edgeBase = vertexCount;
  const u32 faceBase = vertexCount + edgeCount;
  const u32 outCount = faceBase + faceCount;

  /* --- 頂点 → 面（CSR）。並びは面の番号順 -------------------------------- */
  u32 *vfOff = (u32 *)mb_alloc((vertexCount + 2) * 4);
  u32 *vfList = (u32 *)mb_alloc((cornerCount + 1) * 4);
  if (!vfOff || !vfList) return head;
  mb_memset(vfOff, 0, (vertexCount + 2) * 4);
  for (u32 i = 0; i < cornerCount; i++) vfOff[faceCorners[i] + 1]++;
  for (u32 v = 0; v < vertexCount; v++) vfOff[v + 1] += vfOff[v];
  {
    u32 *fill = (u32 *)mb_alloc((vertexCount + 1) * 4);
    if (!fill) return head;
    mb_memcpy(fill, vfOff, (vertexCount + 1) * 4);
    for (u32 f = 0; f < faceCount; f++) {
      for (u32 i = faceOffsets[f]; i < faceOffsets[f + 1]; i++) vfList[fill[faceCorners[i]]++] = f;
    }
  }

  /* --- 頂点 → 隣の頂点（CSR）。並びはエッジの番号順 ---------------------- */
  u32 *nbOff = (u32 *)mb_alloc((vertexCount + 2) * 4);
  u32 *nbList = (u32 *)mb_alloc((edgeCount * 2 + 1) * 4);
  if (!nbOff || !nbList) return head;
  mb_memset(nbOff, 0, (vertexCount + 2) * 4);
  for (u32 e = 0; e < edgeCount; e++) {
    nbOff[t_edgeA[e] + 1]++;
    if (t_edgeA[e] != t_edgeB[e]) nbOff[t_edgeB[e] + 1]++;
  }
  for (u32 v = 0; v < vertexCount; v++) nbOff[v + 1] += nbOff[v];
  {
    u32 *fill = (u32 *)mb_alloc((vertexCount + 1) * 4);
    if (!fill) return head;
    mb_memcpy(fill, nbOff, (vertexCount + 1) * 4);
    for (u32 e = 0; e < edgeCount; e++) {
      u32 a = t_edgeA[e], b = t_edgeB[e];
      nbList[fill[a]++] = b;
      if (a != b) nbList[fill[b]++] = a;
    }
  }

  /* --- 頂点 → 鋭い辺（CSR）。境界は鋭さ 1 とみなす ----------------------- */
  u32 *shOff = (u32 *)mb_alloc((vertexCount + 2) * 4);
  if (!shOff) return head;
  mb_memset(shOff, 0, (vertexCount + 2) * 4);
  u32 sharpTotal = 0;
  for (u32 e = 0; e < edgeCount; e++) {
    f32 s = edgeUses[e] == 1 ? 1.0f : edgeSharp[e];
    if (s <= 0.0f) continue;
    shOff[t_edgeA[e] + 1]++;
    shOff[t_edgeB[e] + 1]++;
    sharpTotal += 2;
  }
  for (u32 v = 0; v < vertexCount; v++) shOff[v + 1] += shOff[v];
  u32 *shOther = (u32 *)mb_alloc((sharpTotal + 1) * 4);
  f32 *shVal = (f32 *)mb_alloc((sharpTotal + 1) * 4);
  if (!shOther || !shVal) return head;
  {
    u32 *fill = (u32 *)mb_alloc((vertexCount + 1) * 4);
    if (!fill) return head;
    mb_memcpy(fill, shOff, (vertexCount + 1) * 4);
    for (u32 e = 0; e < edgeCount; e++) {
      f32 s = edgeUses[e] == 1 ? 1.0f : edgeSharp[e];
      if (s <= 0.0f) continue;
      u32 a = t_edgeA[e], b = t_edgeB[e];
      shOther[fill[a]] = b;
      shVal[fill[a]++] = s;
      shOther[fill[b]] = a;
      shVal[fill[b]++] = s;
    }
  }

  /* --- 位置 --------------------------------------------------------------- */
  f32 *out = (f32 *)mb_alloc(outCount * 12);
  f64 *fp = (f64 *)mb_alloc((faceCount + 1) * 24);
  if (!out || !fp) return head;

  /* 面点。JS と同じく、いちばん先に全部作る */
  for (u32 f = 0; f < faceCount; f++) {
    u32 s = faceOffsets[f], n = faceOffsets[f + 1] - s;
    f64 x = 0, y = 0, z = 0;
    for (u32 i = 0; i < n; i++) {
      u32 v = faceCorners[s + i];
      x += (f64)pos[v * 3];
      y += (f64)pos[v * 3 + 1];
      z += (f64)pos[v * 3 + 2];
    }
    fp[f * 3] = x / n;
    fp[f * 3 + 1] = y / n;
    fp[f * 3 + 2] = z / n;
    u32 w = (faceBase + f) * 3;
    out[w] = (f32)fp[f * 3];
    out[w + 1] = (f32)fp[f * 3 + 1];
    out[w + 2] = (f32)fp[f * 3 + 2];
  }

  /* エッジ点。内側は (2 頂点 + 2 面点) / 4、それ以外は中点 */
  for (u32 e = 0; e < edgeCount; e++) {
    u32 a = t_edgeA[e], b = t_edgeB[e];
    u32 w = (edgeBase + e) * 3;
    if (edgeUses[e] != 2) {
      for (u32 k = 0; k < 3; k++) out[w + k] = (f32)(((f64)pos[a * 3 + k] + (f64)pos[b * 3 + k]) / 2);
      continue;
    }
    u32 f0 = edgeFace[e * 2], f1 = edgeFace[e * 2 + 1];
    f64 sharp = (f64)edgeSharp[e];
    for (u32 k = 0; k < 3; k++) {
      f64 pa = (f64)pos[a * 3 + k], pb = (f64)pos[b * 3 + k];
      f64 mid = (pa + pb) / 2;
      f64 smooth = (pa + pb + fp[f0 * 3 + k] + fp[f1 * 3 + k]) / 4;
      out[w + k] = (f32)(smooth + (mid - smooth) * sharp);
    }
  }

  /* 頂点点 */
  for (u32 v = 0; v < vertexCount; v++) {
    f64 P[3] = {(f64)pos[v * 3], (f64)pos[v * 3 + 1], (f64)pos[v * 3 + 2]};
    u32 n = vfOff[v + 1] - vfOff[v];
    u32 nbn = nbOff[v + 1] - nbOff[v];
    u32 w = v * 3;

    f64 smooth[3];
    if (!n || !nbn) {
      smooth[0] = P[0];
      smooth[1] = P[1];
      smooth[2] = P[2];
    } else {
      f64 fx = 0, fy = 0, fz = 0;
      for (u32 i = vfOff[v]; i < vfOff[v + 1]; i++) {
        u32 f = vfList[i];
        fx += fp[f * 3];
        fy += fp[f * 3 + 1];
        fz += fp[f * 3 + 2];
      }
      fx /= n;
      fy /= n;
      fz /= n;
      f64 rx = 0, ry = 0, rz = 0;
      for (u32 i = nbOff[v]; i < nbOff[v + 1]; i++) {
        u32 u = nbList[i];
        rx += (P[0] + (f64)pos[u * 3]) / 2;
        ry += (P[1] + (f64)pos[u * 3 + 1]) / 2;
        rz += (P[2] + (f64)pos[u * 3 + 2]) / 2;
      }
      rx /= nbn;
      ry /= nbn;
      rz /= nbn;
      smooth[0] = (fx + 2 * rx + ((f64)n - 3) * P[0]) / n;
      smooth[1] = (fy + 2 * ry + ((f64)n - 3) * P[1]) / n;
      smooth[2] = (fz + 2 * rz + ((f64)n - 3) * P[2]) / n;
    }

    u32 sn = shOff[v + 1] - shOff[v];
    if (sn < 2) {
      out[w] = (f32)smooth[0];
      out[w + 1] = (f32)smooth[1];
      out[w + 2] = (f32)smooth[2];
      continue;
    }

    /* 折り目。鋭い辺が 2 本なら (m1 + m2 + 6P) / 8、3 本以上は角として固定 */
    f64 creased[3];
    if (sn >= 3) {
      creased[0] = P[0];
      creased[1] = P[1];
      creased[2] = P[2];
    } else {
      f64 sx = 0, sy = 0, sz = 0;
      for (u32 i = shOff[v]; i < shOff[v + 1]; i++) {
        u32 u = shOther[i];
        sx += (P[0] + (f64)pos[u * 3]) / 2;
        sy += (P[1] + (f64)pos[u * 3 + 1]) / 2;
        sz += (P[2] + (f64)pos[u * 3 + 2]) / 2;
      }
      creased[0] = (sx + 6 * P[0]) / 8;
      creased[1] = (sy + 6 * P[1]) / 8;
      creased[2] = (sz + 6 * P[2]) / 8;
    }

    f64 blend = 0;
    for (u32 i = shOff[v]; i < shOff[v + 1]; i++) blend += (f64)shVal[i];
    blend /= sn;
    if (blend > 1) blend = 1;
    for (u32 k = 0; k < 3; k++) out[w + k] = (f32)(smooth[k] + (creased[k] - smooth[k]) * blend);
  }

  /* --- 面（すべて四角形）。並びは JS の b.face の呼び順と同じ ------------- */
  u32 *quads = (u32 *)mb_alloc(cornerCount * 16);
  if (!quads) return head;
  u32 q = 0;
  for (u32 f = 0; f < faceCount; f++) {
    u32 s = faceOffsets[f], n = faceOffsets[f + 1] - s;
    for (u32 i = 0; i < n; i++) {
      u32 v = faceCorners[s + i];
      u32 vn = faceCorners[s + ((i + 1) % n)];
      u32 vp = faceCorners[s + ((i + n - 1) % n)];
      u32 e1 = edge_find(v, vn);
      u32 e2 = edge_find(vp, v);
      quads[q * 4] = v;
      quads[q * 4 + 1] = e1 == EMPTY ? EMPTY : edgeBase + e1;
      quads[q * 4 + 2] = faceBase + f;
      quads[q * 4 + 3] = e2 == EMPTY ? EMPTY : edgeBase + e2;
      q++;
    }
  }

  /* --- エッジ一覧（JS が段を減らしたクリースを配るのに使う）--------------- */
  u32 *edgeList = (u32 *)mb_alloc(edgeCount * 8 + 8);
  if (!edgeList) return head;
  for (u32 e = 0; e < edgeCount; e++) {
    edgeList[e * 2] = t_edgeA[e];
    edgeList[e * 2 + 1] = t_edgeB[e];
  }

  H[H_OUT_VERTS] = outCount;
  H[H_EDGE_COUNT] = edgeCount;
  H[H_EDGE_BASE] = edgeBase;
  H[H_FACE_BASE] = faceBase;
  H[H_OUT_FACES] = cornerCount;
  H[H_POSITIONS] = (u32)out;
  H[H_QUADS] = (u32)quads;
  H[H_EDGE_LIST] = (u32)edgeList;
  H[H_OK] = 1;
  return head;
}
