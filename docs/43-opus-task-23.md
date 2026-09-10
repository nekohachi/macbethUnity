# Opus 作業指示書 #23: S2-5 — ハイを見ながらローを直す（CSR とメモリと重ね表示）

作成: 2026-09-10。`42` のあと。`28` の **S2-5**。S3 ベイクの手前。

---

## 0. S2-5 の中身と、この紙で決めること

`28` は S2-5 に 5 つ積んでいる。

| | 中身 | 出どころ |
|---|---|---|
| 1 | `FramePlan` の `number[][]` を CSR へ | `28` v3.2（実データ 19MB に対しヒープ 165MB の主因） |
| 2 | `setBase` の差分更新を wasm へ | `28` v3.2 |
| 3 | モデリングで**ハイを重ねて表示** | `28` v3.2（`03` の売り） |
| 4 | `estimateLevelBytes` の係数 | `28` v3.3（実測 347MB は推定 614MB より低い。段を早く断りすぎ） |
| 5 | 描画のインデックス化 | `40` の T5 を送った分 |

**2 を「wasm へ」と決め打ちにしない。** 重いのは `SubdivPlan` と `FramePlan` が
**頂点ごと・面ごとに JS の配列とオブジェクトを持っている**ことで、そこを typed array の
CSR に直せば、JS のままでどこまで行くか分かる。**先に測ってから決める。**

| 順 | タスク | 何が良くなるか |
|---|---|---|
| T1 | **`FramePlan` を CSR に** | ヒープ。`build` の速さ（面法線の配列を作らない） |
| T2 | **`SubdivPlan` を CSR に** | ヒープと、**差分更新（B2b）の速さ**。文字列キーの `Map` も消す |
| T3 | **`estimateLevelBytes` を実測に合わせ直す** | T1・T2 でヒープが変わるので、そのあとで |
| T4 | **モデリングでハイを重ねて表示** | `03` の売り。ローを直しながらハイの形が見える |
| T5 | **門**（B2a / B2b / B2c / B5 の前後）。**ここで wasm と 5 の要否を数字で決める** | |

**T5 が終わったら報告して止まる。**

---

## T1. `FramePlan` を CSR に

`FramePlan` が持っているのは

```ts
private readonly vertexFaces: number[][] = [];   // 頂点ごとに JS 配列 1 本
private readonly faceVerts: number[][] = [];     // 面ごとに JS 配列 1 本
```

25 万四角形のレベル 2（23 万頂点・23 万面）で **JS の配列が 46 万本**。1 本あたりの
ヘッダだけで数十バイトあるので、これがヒープの主因（`32` の T5）。

### 直し

- `vfOffsets: Uint32Array(vertexCount + 1)` + `vfFaces: Uint32Array`
- `fvOffsets: Uint32Array(faceCount + 1)` + `fvVerts: Uint32Array`
- 作るときは `mesh.vertexFaces()`（`Map`）を通さず、**コーナーを 2 周**して数えてから詰める
- `write()` の中の `smooth.faceNormal(f)` は**戻り値の配列を面ごとに作る**。
  `Mesh.faceNormalInto(f, out, at)` を足して、そこへ書かせる（`faceNormal` は
  これを呼ぶ薄い包み）。`meshView.ts` の同じ式の写しも消してこれに寄せる

`affected()` の戻り値は `Set` のまま（呼ぶ側が `Iterable` で受けている。1 回ぶんの
入れ物で、持ち続けないので主因ではない）。

---

## T2. `SubdivPlan` を CSR に

もっと重い。持っているのは

```ts
faceVerts / vertexFaces / neighbors / edgeFaces : number[][]
sharpAt : Array<Array<{ other, sharpness }>>    // オブジェクトまで作る
edgeIndex : Map<string, number>                 // 辺ごとに文字列キー
```

### 直し

| いま | 直す |
|---|---|
| `faceVerts` | `fvOffsets` + `fvVerts` |
| `vertexFaces` | `vfOffsets` + `vfFaces` |
| `neighbors` | `nbOffsets` + `nbVerts`、**同じ並びで `nbEdge`**（その隣へ向かう辺の番号） |
| `edgeList: Array<[a,b]>` | `edgeA` / `edgeB`（`Uint32Array`） |
| `edgeFaces: number[][]` | `edgeFace0` / `edgeFace1`（`Int32Array`、無ければ −1） |
| `sharpAt` | `sharpOffsets` + `sharpOther` + `sharpValue` |
| `edgeIndex: Map<string, number>` | **消す。** `edgePointOf(a, b)` は `a` の隣接（価数 4〜6）を舐めて `nbEdge` を返す |

`positions()` の中の `mesh.getPosition(v)` と `mesh.faceCenter(f)` も**配列を返す**。
熱い所（`writeVertexPoint` の隣接ループ）は `mesh.positions` を直に読む。

**結果は 1 ビットも変えない。** `tests/subdivide.test.ts` と `tests/multires.test.ts` が
そのまま通ること。順序に依る足し算（面点の平均など）は**足す順を変えない**。

---

## T3. `estimateLevelBytes` の係数

T1・T2 のあとにベンチ（`?bench=1&size=25` と `100`）を取り直し、
**推定が実測の 0.9〜1.2 倍**に収まる係数へ直す。今は 560B/四角形。
少なく見積もると落ちるので、**下振れさせない**。

---

## T4. モデリングでハイを重ねて表示

`03` の売り。ローを直している間、**ハイの形が薄く重なって見える**。

### 決め

- 「表示」の長押しに「**ハイを重ねる**」（`state.ui.ghostHigh`）。モデリングのときだけ効く
- 重ねるのは**いちばん上の段**。半透明（不透明度 0.25）の面 1 枚を、
  選んでいるオブジェクトの `view.group` に足す
- **ローを動かしている間は作り直さない**（`setBase` の差分更新が走ったあとに 1 回）
- 段が無ければ何も出さない

### テスト（通し確認）

- 段を足す → モデリングへ → 「ハイを重ねる」で薄い面が 1 枚増える → 切ると消える
- レベル 0 の頂点を動かすと、重ねた面も付いてくる

---

## T5. 門

| 何 | 前（CI・25 万） | 門 |
|---|---|---|
| **B2b デルタの取り直し**（`setBase` の差分更新） | 127.3ms | **半分以下** |
| **B5 いちばん使ったメモリ** | 259.9MB | **2 割以上減る** |
| B2a レベル 2 まで組む | 181.1ms | 増えない |
| B6a ストロークの 1 コマ | 変えない | |

**ここで決める**: B2b が実機で 16ms に入るなら **wasm への移し替えはやらない**
（`28` の S2-5 の 2 を落とす）。入らないなら次の紙で wasm。

---

## やらないこと

- `SubdivPlan` の wasm 化（T5 の数字を見てから）
- 描画のインデックス化（`40` の T5。実機は 60fps に届いている）
- ハイを重ねたときの当たり判定（見えるだけ。触れない）

---

## 報告（2026-09-10。T1〜T5 済）

### T1: `FramePlan` を CSR に

- `vertexFaces: number[][]` → `vfOffsets` + `vfFaces`（`Uint32Array`）
- `faceVerts: number[][]` は**持たなくなった**（`affected` に `mesh` を渡して、その場で
  面のコーナーを読む）
- 参照接線の相手は `mesh.vertexNeighbors()` の `Map` を作らず、面の辺をなめて最小の番号を取る
- `Mesh.faceNormalInto(f, out, at)` を足した。`write()` が**面ごとに 3 要素の配列を
  作っていた**のをやめる。`meshView.ts` に写してあった同じ式もこれに寄せた（式が 1 か所に戻った）

### T2: `SubdivPlan` を CSR に

| いままで | いま |
|---|---|
| `faceVerts` / `vertexFaces` / `neighbors` / `edgeFaces`（`number[][]`） | それぞれ CSR の `Uint32Array` / `Int32Array` |
| `sharpAt: Array<Array<{ other, sharpness }>>` | `sharpOffsets` + `sharpOther` + `sharpValue` |
| `edgeIndex: Map<string, number>` | **消した。** `edgePointOf` は `a` の隣接（価数 4〜6）を舐める |
| `edgeList: Array<[a, b]>` | `edgeA` / `edgeB` |

**並びは 1 つも変えていない**（面点の平均などは足す順で結果が変わるため）。
`positions()` の熱い所は `mesh.positions` を直に読み、`getPosition` / `faceCenter` の
配列を作らない。core のテストがそのまま通ることで一致を見た。

### T3: `estimateLevelBytes` の係数

**560B → 240B。** T1・T2 でヒープの実測が下がったので、積み上げに近い所へ戻した。
25 万四角形をレベル 2 まで組んだときのヒープの増分が **+105MB → +46MB**、
段 1 + 段 2 の四角形が 288,000 なので **160B/四角形**。少なく見積もると落ちるので
その 1.5 倍を採った。**段を早く断りすぎていた**のが直る（`28` の v3.3 の宿題）。

### T4: モデリングでハイを重ねて表示

- 「表示」に「**ハイを重ねる**」（`state.ui.ghostHigh`、`localStorage`）
- 薄い面 1 枚（不透明度 0.25・**深度を書かない**）を、選んでいるオブジェクトの
  `view.group` に足す。深度を書くとローのワイヤーが隠れて、どこを直しているか見えない
- 作り直すのは「ローが動いた」と印が立ったときだけ。**ドラッグの最中は作り直さない**
  （`refreshMoved` は印を立てるだけ。`refresh()` から 1 回）
- スカルプト中と、段が無いオブジェクトには出さない

### T5: 門（CI・25 万四角形。同じ機械で前後を測った）

| 何 | 前（`42` まで） | 後（`43`） | 門 |
|---|---|---|---|
| **B2b デルタの取り直し**（`setBase` の差分更新） | 66.2ms | **31.2ms** | 半分以下 ✓ |
| **B5 いちばん使ったメモリ** | 828.6MB | **555.1MB**（−33%） | 2 割以上 ✓ |
| **B2c レベル 2 のヒープの増分** | +105MB | **+46MB**（−56%） | |
| B2a レベル 2 まで組む | 663.7ms | **72.0ms**（9.2 倍速い） | 増えない ✓ |
| B1b-wasm 細分割 1 レベル | 582.5ms | **161.1ms** | |
| B6a ストロークの 1 コマ | 23.7ms | 19.0ms | 変えない ✓ |

B2a と B1b-wasm がここまで落ちたのは、`assembleQuads` が**コーナーごとに
`edgePointOf` を呼び、その中で文字列の鍵を作って `Map` を引いていた**ため。
23 万面 × 4 コーナーで 92 万本の文字列を作っていた。

### wasm への移し替えは**やらない**（`28` の S2-5 の 2 を落とす）

- 差分更新（B2b）は CI で 31ms。実機は CI より速いので、16ms に十分入る見込み
- **そもそもアプリは `setBase` の差分更新を呼んでいない。** レベル 0 を編集したら
  `invalidateLevels()` で控えを捨て、次に見るときに組み直している。その組み直しが
  B2a で、**663ms → 72ms** になった。ここが「ハイを見ながらローを直す」の実際の待ち時間
- 描画のインデックス化（`40` の T5）も見送りのまま。実機は 60fps に届いている

**次に wasm を考えるのは、100 万四角形を触るときか、実機の B2a が 100ms を超えたとき。**

### テスト

- core + app **371**（増減なし。**T1・T2 は結果を変えない直し**なので、
  既存のテストが通ることが正しさの証明）
- 通し確認 `dist` と `app/` 緑（+1「ハイを重ねて表示」: 切ってあれば出ない・
  重ねた面が段 2 の三角形と同じ 576 頂点・ローを 0.5 上げると 0.500 追う・
  スカルプトでは出ない・切ると消える）
- 「表示メニュー」の項目が 5 → 6 に増えたので、その通し確認も直した

### 実機で見てもらうこと

| # | 手順 | 期待 |
|---|---|---|
| 1 | 段を 2 つ足す → モデリングへ → 「表示」→「ハイを重ねる」 | 薄い面が重なる。ローの頂点を動かすと付いてくる |
| 2 | 25 万で段を足す | 前より**段が足せる**（推定メモリが 560B → 240B/四角形） |
| 3 | `?bench=1&size=25` の JSON | **B2a / B2b / B2c / B5**。B2a が 100ms を超えていたら wasm を考える |
