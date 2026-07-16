# iPhone / iPad で書き味を試す(WASM + Safari)

Phase 0 の検証アプリを WebAssembly にビルドして、iPhone や iPad の Safari で開いて
指 / Apple Pencil で描けるようにしたものです。**Mac も Xcode も要りません。**

> これは「まず自分の端末で触感を掴む」ための簡易確認です。真の低遅延・Apple Pencil の
> 実筆圧・120Hz・予測入力を評価するには、ネイティブ iOS ビルド(要 Mac)が必要です。
> 詳細は [docs/DESIGN.md](../../../docs/DESIGN.md) を参照。

## 動作要件

- **iOS / iPadOS 18 以降の Safari を推奨**(WebGPU が既定で有効)
- それ以前でも WebGL2 フォールバックで動く可能性があります(未対応時はエラー表示)

## 一番かんたんな方法: GitHub Pages

このリポジトリには**ビルド済みの `web/pkg` を同梱**しているので、静的配信するだけで動きます。

1. リポジトリの Settings → Pages で、このブランチの `/apps/phase0-desktop/web` を公開
   (または `web/` の中身を Pages 用リポジトリ/ブランチに置く)
2. 発行された URL を **iPhone の Safari** で開く
3. 指または Apple Pencil で描く

## PC から同一 Wi-Fi の iPhone へ配信する方法

PC と iPhone が同じ Wi-Fi にいれば、PC でローカルサーバを立てて iPhone から開けます。

```sh
cd apps/phase0-desktop/web
python3 -m http.server 8000
```

iPhone の Safari で `http://<PCのIPアドレス>:8000/` を開く
(PC の IP は macOS/Linux なら `ipconfig getifaddr en0` や `hostname -I` で確認)。

## 使い方

- 画面を指 or Apple Pencil でなぞると描画されます
- Apple Pencil の筆圧はそのまま反映されます(Safari の Pointer Events 経由)
- 指の場合は筆圧が取れないため、**速度に応じた筆圧シミュレーション**(ゆっくり=太く、
  速く=細く)が自動で働きます
- キーボード接続時は `-`/`=` サイズ、`[`/`]` 硬さ、`,`/`.` 補正、`1`〜`3` 色、`C` クリア、
  `P` 筆圧sim切替(iPhone 単体では操作パネルが無いので Phase 1 で追加予定)

## 作り直す(コードを変更したとき)

`web/pkg` は生成物です。ソースを変えたら再生成します。

```sh
# 初回のみ
rustup target add wasm32-unknown-unknown
cargo install wasm-bindgen-cli --version 0.2.92   # Cargo.toml の wasm-bindgen と一致

# ビルド(web/pkg を再生成)
./apps/phase0-desktop/build-web.sh
```

## うまく動かないとき

- 画面が真っ黒/エラー表示 → iOS 18 以降か確認。設定 → Safari → 詳細 →
  Feature Flags で WebGPU が有効か確認(古い iOS)
- 描くと画面がスクロールしてしまう → ページを一度リロード(`touch-action: none` を
  効かせるため、ホーム画面に追加してフルスクリーンで開くとより安定します)
