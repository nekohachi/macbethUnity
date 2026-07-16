#!/usr/bin/env bash
# Phase 0 を WASM にビルドして web/pkg を生成する。
# 生成物(web/ ディレクトリ)を任意の静的サーバで配信し、iPhone の Safari で開く。
#
# 前提:
#   rustup target add wasm32-unknown-unknown
#   cargo install wasm-bindgen-cli --version 0.2.92   # Cargo.toml の wasm-bindgen と一致させる
set -euo pipefail

CRATE_DIR="$(cd "$(dirname "$0")" && pwd)"
ROOT_DIR="$(cd "$CRATE_DIR/../.." && pwd)"
OUT_DIR="$CRATE_DIR/web/pkg"

echo "==> wasm ビルド(release)"
cargo build --release --target wasm32-unknown-unknown -p phase0-desktop --lib

echo "==> wasm-bindgen で JS グルーを生成"
wasm-bindgen \
  --target web \
  --no-typescript \
  --out-dir "$OUT_DIR" \
  "$ROOT_DIR/target/wasm32-unknown-unknown/release/phase0_desktop.wasm"

echo "==> 完了: $OUT_DIR"
echo ""
echo "配信例(同一 Wi-Fi の iPhone から開く):"
echo "  cd \"$CRATE_DIR/web\" && python3 -m http.server 8000"
echo "  → iPhone の Safari で  http://<PCのIP>:8000/  を開く"
