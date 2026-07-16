# macbethUnity

iOS / Android 向けお絵描きアプリ。

- **書き味**: CLIP STUDIO PAINT / SAI 級(低遅延・手ぶれ補正・筆圧)
- **画像加工**: Photoshop 的なフィルタ・色調補正
- **UI**: Procreate 的なミニマル UI

全体設計は [docs/DESIGN.md](docs/DESIGN.md) を参照。

## 構成

| パス | 内容 |
|---|---|
| `docs/DESIGN.md` | 全体設計ドキュメント(アーキテクチャ、ロードマップ) |
| `crates/brush-core` | ブラシエンジンコア(Rust、GPU/OS 非依存、将来 iOS/Android と共有) |
| `apps/phase0-desktop` | Phase 0: 書き味検証用デスクトップアプリ(wgpu + winit) |

## ビルド

```sh
# コアエンジンのテスト
cargo test -p brush-core

# 書き味検証アプリの実行(GPU のあるデスクトップ環境で)
cargo run --release -p phase0-desktop
```

詳細は [apps/phase0-desktop/README.md](apps/phase0-desktop/README.md) を参照。
