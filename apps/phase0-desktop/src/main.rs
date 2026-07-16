//! ネイティブ(デスクトップ)用ランチャー。
//! 実体は lib.rs の `run()`。WASM ビルドではこの bin は使われず、
//! JS の `init()` から `run()` が呼ばれる。

fn main() {
    phase0_desktop::run();
}
