#!/usr/bin/env bash
#
# wasm を組む（`30` の T2）。
#
#   native/build.sh
#
# 出るもの（どちらもコミットする。CI が組み直して食い違ったら書き戻す）:
#   src/wasm/macbeth.wasm  生の wasm
#   src/wasm/bytes.ts      それを base64 で抱えた読み込み口
#
# 使うのは **素の clang の wasm32**（emscripten ではない）。標準ライブラリを
# 使わないので、要るもの（場所取り・memset）は `native/core.c` にある。
# emscripten のグルーも実行時も要らないぶん、生成物が小さく、Node でも
# ブラウザでも同じ 1 本が動く。ufbx（`12` の E1）を足すときに標準ライブラリが
# 要るなら、そのときに emsdk を足す。
set -euo pipefail

cd "$(dirname "$0")/.."
CC="${CC:-clang}"

if ! command -v "$CC" >/dev/null; then
  echo "clang が見つかりません（CC で場所を渡せます）" >&2
  exit 1
fi

mkdir -p src/wasm

"$CC" --target=wasm32 -nostdlib -O3 -flto -mbulk-memory \
  -Wall -Wextra -Werror \
  -fno-builtin \
  -Wl,--no-entry \
  -Wl,--export-memory \
  -Wl,--initial-memory=16777216 \
  -Wl,--max-memory=2147483648 \
  -Wl,--lto-O3 \
  -Wl,--strip-all \
  -o src/wasm/macbeth.wasm \
  native/core.c native/subdiv.c

node native/pack.mjs

echo "組みました: $(wc -c < src/wasm/macbeth.wasm) バイト"
