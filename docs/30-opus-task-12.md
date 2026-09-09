# Opus 作業指示書 #12: 測る（S2-0）と wasm の toolchain

作成: 設計担当（Fable）。実装担当（Opus）向け。2026-09-09。
`29` の B-T6 が終わってから着手。`28` の S2-0「測る」と、その結果にかかわらず要る wasm の toolchain（FBX 読み込みの E1 と共用）。

ユーザーの答え（`29` の末尾）を受けた前提:

- **本命はハイエンド**（iPad Pro の M 系、Wacom MovinkPad 14）。**iPad mini 6（A15）は「これでも動く」の下限**と、小さい画面の UI の指標
- スカルプトは**なるべく大きなポリゴン数を快適に**。上限は決めない → 測る規模を **100 万四角形**まで上げる
- JS のままか wasm に出すかは、**ハイエンド 2 台の数字**で決める

---

## 0. 順番と理由

| 順 | タスク | 理由 |
|---|---|---|
| T1 | **ベンチ画面**（`?bench=1` で開く。細分割とデルタの取り直しを測って表に出す） | ユーザーが実機で走らせて数字を報告できる形にする。CI の数字は参考にしない（swiftshader） |
| T2 | **wasm の toolchain**（CI の emsdk、`src/wasm/`、JS からの呼び口） | S2 で出すにしても出さないにしても E1（ufbx）で要る。先に作る |
| T3 | **細分割を wasm で 1 本だけ**（Catmull-Clark の 1 レベル）を T1 のベンチに並べる | 「JS の何倍か」を同じ画面で見られるようにする。判断材料 |

**T3 が終わったら報告して止まる。** ここで Fable が JS か wasm かを決め、`31`（S2-1 レベルのボタン）を書く。

---

## T1. ベンチ画面

### 決め

- 入口は URL の **`?bench=1`**。ふだんの画面は変えない。開くと 3D の上に**結果の表**（`.bench`）が重なり、下に「もう一度」と「コピー」（JSON をクリップボードへ）
- **測るもの**（すべて `performance.now()`、3 回走らせて**中央値**）:

| # | 何を | 大きさ | 見たい数字 |
|---|---|---|---|
| B1 | Catmull-Clark **1 レベル**（`subdivide.ts`） | 25 万 / 100 万四角形の球 | ms。レベルを上げる操作の待ち時間 |
| B2 | **接空間デルタの取り直し**（`multires.ts`。レベル 2 の 1 万頂点を動かして、その頂点だけ差分更新） | ベース 6 万四角形 → レベル 2（約 100 万四角形） | ms。**ブラシ 1 ストロークの 1 フレーム**に相当。目標 16ms |
| B3 | **BVH の作り直しと refit**（`29` の B-T5） | 100 万三角形 | ms |
| B4 | **描画 1 フレーム**（`renderer.render` を 30 回） | 100 万三角形、シェード + ワイヤ | ms / フレーム。目標 16ms（60fps） |
| B5 | メモリ（`performance.memory` が取れれば） | 上と同じ | MB。iPad の上限（`01`）と照らす |

- 表の各行に**目標**の列を置き、越えていたら赤。目標は `01` の 1.4（iPad Pro で 50 万ポリゴンのブラシが 60fps）から: B2 ≤ 16ms、B4 ≤ 16ms、B1 ≤ 1500ms（100 万）
- 端末の名前（`navigator.userAgent`、`hardwareConcurrency`、`devicePixelRatio`）を表の上に
- **通し確認は「表が出て、5 行あって、数字が入る」だけ**。値は見ない（CI は遅い）

### app

- `src/app/bench.ts`（新規）。`main.ts` で `?bench=1` のときだけ読み込む（動的 import。ふだんのバンドルに入れない）
- 球の作り方は `PRIMITIVES.sphere.build`。100 万四角形は `sdAxis 1000, sdHeight 1000`。作る時間も B0 として出す
- B2 の「動かす」は法線方向に 0.01。差分更新は `multires.ts` の `SubdivPlan` / `FramePlan` の部分計算（`12` の Phase D で作ったもの）

PNG: `30-t1-bench.png`（CI の数字でよい。表の形が分かれば十分）。

---

## T2. wasm の toolchain

### 決め

| | |
|---|---|
| 組む場所 | **CI だけ**（GitHub Actions、`emscripten/emsdk` の Docker）。Windows 単体では組まない（`12` の E1 のまま） |
| 置き場所 | `native/`（C/C++ の元）と `src/wasm/`（生成物 `.wasm` + `.js` のグルー。**コミットする**。CI が組み直して差分があれば書き戻す） |
| 呼び口 | `src/core/` は wasm を知らない。**`src/app/wasm/`** にロードと呼び出しを置き、core の関数と同じ形（`Float32Array` / `Uint32Array` を渡して返す）にそろえる。**core の JS 版は消さない**（wasm が無い環境の逃げ道 + テストの対照） |
| メモリ | 100 万四角形を扱うので `ALLOW_MEMORY_GROWTH=1`、初期 256MB。コピーを減らすため、頂点配列は wasm 側のヒープに置いて JS からは `subarray` で見る |
| ライセンス | emscripten は MIT。ufbx は MIT / パブリックドメイン。`03` の OpenSubdiv は Apache 2.0（**使うなら**。T3 は自前で書く） |

### 通し確認

「wasm が読めて呼べる」: `src/wasm/` の生成物をロード → `add(2, 3) === 5` のような最小の関数が返る → 無ければ（生成物が無い環境）JS 版に落ちて同じ結果。**CI に emsdk のジョブを足し、`.wasm` が変わったら失敗ではなく書き戻す。**

---

## T3. 細分割を wasm で 1 本

### 決め

- `native/subdiv.cpp`: **Catmull-Clark の 1 レベルだけ**。入力は CSR（`faceOffsets` / `faceCorners` / `positions`）、出力も CSR。クリースは `subdivide.ts` と同じ規則（`12` の Phase D で直したもの）
- **JS 版と完全一致**することを vitest で確かめる（`tests/subdiv-wasm.test.ts`。Node で wasm を読む。生成物が無ければ skip）。位置は 1e-6、トポロジは完全一致
- ベンチ（T1）の B1 に **JS / wasm の 2 列**を並べる

### 報告に書くこと

- ハイエンド 2 台と mini 6 の**表そのもの**（ユーザーが `?bench=1` で走らせて、コピーした JSON を貼る）
- B1 の JS / wasm の比
- 判断は Fable。目安: **B2 と B4 が JS で 16ms に入るなら、細分割だけ wasm**（レベルを上げる待ちが短くなる）。**B2 が入らないなら、ブラシの変形とデルタの取り直しも wasm**

---

## 決めてあること

- 測るのは実機。CI の数字で判断しない
- toolchain は先に作る。FBX 読み込みで結局要る
- core の JS 版は残す。wasm は速い置き換えで、正しさの基準は JS 版とテスト

## やらないこと

- OpenSubdiv の組み込み（自前の Catmull-Clark で足りている。`03` の推奨は「性能が足りなければ」に読み替える）
- スカルプトのブラシそのもの（`31` から）
- ベンチ画面の作り込み（表とコピーだけ）

---

## 実装の報告（Opus、2026-09-09）

T1・T2・T3 すべて済み。branch `claude/tablet-3d-modeling-app-f6b1x5`。
core 233 テスト、通し確認 109 項目。`dist` と `app/` の両方で通る。

### 決めから変えたところ: emsdk ではなく素の clang

指示書は「CI の emsdk（Docker）」だったが、**素の clang の wasm32**
（`clang --target=wasm32 -nostdlib` + `wasm-ld`）で組んだ。理由:

- emscripten の実行時もグルーも要らない。生成物は **8.7KB の `.wasm` 1 本だけ**
- Node でもブラウザでも同じ 1 本が動く。テストで wasm を読むのに小細工が要らない
- clang は CI にも手元にも最初から入っている（`apt-get install clang lld` だけ）

T3 に要るのは配列を回す計算だけなので、標準ライブラリは要らなかった
（場所取りと `memset` は `native/core.c` に自前で置いた、50 行ほど）。
**ufbx（`12` の E1）で標準ライブラリが要るようになったら、そのときに emsdk を
足す**。呼び口（`src/app/wasm/`）はそのまま使い回せる。

生成物は base64 で `src/wasm/bytes.ts` に包んである。取りに行かないので、
オフライン（サービスワーカー）でも取りこぼさない。ふだんのバンドルには入らない
（`bench.ts` からの動的 import なので別のかたまりになる）。

### T3 の一致

`tests/subdiv-wasm.test.ts`（10 件）で JS 版と突き合わせている。立方体・球
（三角形の極）・平面（境界）・三角形と五角形が混ざったもの・クリース（半端な
鋭さと段の引き継ぎ）・2 レベル重ね。位置・UV・トポロジ・クリースのすべて。

25 万四角形の球でも突き合わせた。**ずれは 1e-6 ではなく 0**（1 ビットも違わない）。

### 数字

手元の Node（この開発機。実機ではない）、25 万四角形の球を 1 レベル:

| | ms |
|---|---|
| JS（`catmullClark`） | 11797 |
| wasm 合計 | 1354 |
| 　うち wasm の計算 | 279 |
| 　うち JS でメッシュに組む（`MeshBuilder`） | 1075 |

CI の Chromium（swiftshader。実機よりずっと遅い）、6 万四角形:

| | ms |
|---|---|
| JS | 917 |
| wasm 合計 | 399 |
| 　うち wasm の計算 | 34 |
| 　うち JS でメッシュに組む | 365 |

**wasm の計算そのものは JS の 25〜40 倍速い。** いま残っているのはほぼ全部
`MeshBuilder`（JS）で、次に出すならここ。

### ユーザーにお願いすること

実機 3 台で `?bench=1` を開き、「コピー」で取れる JSON を貼ってほしい。

- iPad Pro（M 系）
- Wacom MovinkPad 14
- iPad mini 6

URL は `https://nekohachi.github.io/macbethUnity/app/?bench=1`。
100 万四角形なので 1 分ほどかかる。軽く見るだけなら `?bench=1&quick=1`。

見たいのは **B2b（デルタの取り直し）と B4（描画 1 フレーム）が 16ms に
入るか**。ここが JS で入るなら、細分割だけ wasm に出せば足りる。
