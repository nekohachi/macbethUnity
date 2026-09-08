# Opus 作業指示書 #07: モードのドロップダウン、歪みのヒートマップ、チェッカー、UV を保つ移動

作成: 設計担当（Fable）。実装担当（Opus）向け。2026-09-09。
`20` は T1〜T9 完了（`22-morning-checklist.md`）。ここからは **`22` の 3 章「次にできること」** と、ユーザーの新しい指示 1 つ。
前提と作業の流れ（vitest → app → 通し確認 → PNG → `publish.sh` → push）は `13` の 0 章と `20` の 0 章のまま。

---

## 0. 順番と理由

| 順 | タスク | 理由 |
|---|---|---|
| T1 | モードの切替をドロップダウンに | ユーザー指示。小さい。画面上のものはサークルメニューより一覧のほうが合う |
| T2 | 歪みのヒートマップ（C4 の 1 つ目） | 展開の良し悪しが目で分かる。`distortion.ts` は三角形ごとの値をもう持っている |
| T3 | チェッカーの細かさと模様 | 2D の下地と 3D の「チェッカー」表示で共有。ヒートマップと同じ場所に置く |
| T4 | ブリッジの分割数 | core が受ければ終わり。`21` で「後で」にしたもの |
| T5 | 移動で UV を保つ（Preserve UVs） | 展開したあとに頂点を直しても模様がずれない。Maya の移動ツールの標準 |
| T6 | 3D の表示オプション（裏面を描かない・グリッド） | `21` の 2.5 で書いてまだ無いもの。小さい |

**T3 が終わったら push して報告。T6 が終わったら報告して止まる。** 各タスクで通し確認を 1 つ足し、画面の PNG を `docs/img/23-<task>.png` に置く（`npm run shot`）。

---

## T1. モードの切替をドロップダウンに

### 決め

- 上段の「モデリング ▼」ボタンは **タップで一覧が下に開く**（今のファイルメニューと同じ `.panel.floating` + `.act`）。長押しのサークルメニュー（`modeMenu`）は**やめる**
- 一覧は 4 行: モデリング / UV / スカルプト / マテリアル。今のモードに `aria-pressed="true"`（ファイルメニューの `.act` に押された見た目が無ければ `.act[aria-pressed="true"]` を `shell.css` に足す。背景 `--accent-dim`）
- 行の右に小さく英語名（Modeling / UV Editor / Sculpt / Material）。`MODE_LABELS` に `en` を足すか、`modeMenu` の `sub` を流用
- 選ぶと閉じて `setMode`。外を触っても閉じる（`closePopup` の仕組みそのまま）
- キー（もしあれば）とマーキングメニューの「オブジェクト」（UV → モデリング）は今のまま

### app

- `app.ts`: `bindTopBar` の `attachRadialButton(byId("modeBtn"), …)` を `click → this.openModeMenu(button)` に。`openModeMenu` は `openFileMenu` を写して作る。`modeMenu()` は消す（使うところが無くなる）
- `web/index.html`: `modeBtn` の `title` を「タップでモードを選ぶ」に

### 通し確認（1 項目）

「モードはドロップダウンで切り替える」: `#modeBtn` をクリック → `.panel.floating .act` が 4 つ、「モデリング」が押されている → 「UV」をクリック → `state.mode === "uv"`、`#modeLabel` が「UV」、一覧が閉じている。既存の「未実装のモードは予定表が出て…」は `setMode` を直接呼んでいるので変えない。

---

## T2. 歪みのヒートマップ（`12` の C4、`15` の 3.1）

### 見せ方

- 三角形ごとの **σ1 / σ2**（`Distortion.perTriangle`）を色にする。1.0 = 歪みなし
- 色: **1.0 → 灰（島の今の色）、1.2 → 緑、1.5 → 黄、2.0 以上 → 赤**。線形補間。1.0 のところは今の見た目と同じにして、歪んだところだけ色が乗るようにする
- **2D**: 島の塗り（`UvView` の面）に頂点色で乗せる。選択の色（オレンジ）は今までどおり上に乗る
- **3D**: シェーディングに **「ヒートマップ」** を足す（`Display` に `"heat"`。`shadingMenu` の北東。キーは `9`）。`checker` と同じ作りで、面ごとの色を頂点色にした `MeshBasicMaterial`（`vertexColors: true`）
- **入口**: UV モードの「展開」の長押しに **「歪みを色で」（トグル、南西）** と、展開のカットインに同じチェックボックス。オンにすると 2D に色が乗り、3D の表示を `heat` にする。オフで 3D は元の表示に戻す（`state.displayBeforeHeat` に控える）
- HUD の「伸び ×1.14」は今のまま

### core

`core/uv/distortion.ts` に足す:

```ts
/** 島ごとの三角形の歪みを、面ごとの値（面の三角形の最大）にならす。長さは faceCount。歪みが無い面は 1。 */
export function distortionPerFace(mesh: Mesh, charts: Chart[], distortion: Distortion[]): Float32Array;
```

`chartMesh` の三角形の順は「`chart.faces` の順で、面ごとに扇（`tri.push(local[0], local[i], local[i+1])`）」なので、面 f の三角形数は `faceSize(f) − 2`。それを順に読んで最大を取る。`recompute` の結果（`charts`, `distortion`）から作れるので、`RecomputeResult` に **`perFace: Float32Array`** を足して `recompute` の最後で作る（呼び出し側で組み立てさせない）。

色は core に置かない（app の仕事）。`app/uv/heat.ts` に `heatColor(stretch: number): [r, g, b]` を 1 つ。

### app

- `uvMode.ts`: `recompute` を呼んでいるところ（`unfold` / `autoUnwrap` / `repack` / `cutOrSew` / `moveAndSew` / `setMethod` / `rebuildGeometryOnly`）で `perFace` を控える → `view.build` / `refreshHighlight` で色を渡す。`UvView.build` に `heat: Float32Array | null` を足す
- `uvView.ts`: 面の `BufferGeometry` に `color` 属性。オフなら属性を外すのではなく全部 1.0 の色（灰）にする（ジオメトリの作り直しを避ける）
- `viewport.ts`: `applyDisplay` で `d === "heat"` のとき `view.heat ??= heatMaterial()`、ジオメトリに `color` 属性を積む。`perFace` はオブジェクトの `SceneObject.uvHeat: Float32Array | null` に置く（`recompute` のたびに更新。`.mbz` には入れない）
- `state.ts`: `Display` に `"heat"`。`uvHeat: boolean`（`localStorage` に残す）

### vitest（U27）

- 立方体を全部切って展開 → `perFace` が全部 1.0 ± 1e-3
- 閉じた筒（切れ目なし）→ `perFace` の最大が 1.05 より大きい（U2 と同じ根拠）
- `perFace.length === mesh.faceCount`

### 通し確認（1 項目）

「歪みが色で見える」: 球 → UV モード → 切れ目なしで「展開」→ 「歪みを色で」をオン → 2D の面ジオメトリに `color` 属性があり、赤に寄った頂点（r > 0.6）が 1 つ以上 → 3D の `display === "heat"` → オフで元の表示に戻る。**PNG を付ける。**

---

## T3. チェッカーの細かさと模様

### 決め

| 項目 | 選べるもの | 既定 |
|---|---|---|
| 細かさ | 4 / 8 / 16 / 32 / 64（1 辺のマス数） | 8（今と同じ） |
| 模様 | **市松**（今のもの）/ **カラーグリッド**（Blender の UV グリッドのように、大きなマスごとに色相が変わり、マスの中に細い線） | 市松 |

- 2D の下地（`UvView` の `checkerTexture`）と 3D の「チェッカー」表示（`materials.ts` の `checkerMaterial`）で **同じ 1 つの関数**からテクスチャを作る。今は 2 か所に別々の市松がある → `app/render/checker.ts` に `checkerTexture(cells, pattern)` を 1 つにまとめ、両方がそれを使う
- カラーグリッドは 8 色（色相を 45° ずつ）を `cells / 8` マスごとに切り替え、マスの境に 1px の暗い線。数字は入れない（文字はズームで読めないことが多い）
- 置き場所: UV モードの「展開」のカットインに **「チェッカー」区画**（細かさの segmented、模様の segmented）。3D の「表示」のカットインにも同じ区画（チェッカー表示のときだけ）
- `state.checker = { cells, pattern }`。`localStorage` に残す。変えたら 2D の下地と、`display === "checker"` のオブジェクトを作り直す（テクスチャの `dispose`）

### 通し確認（1 項目）

「チェッカーの細かさと模様を変えられる」: 展開のカットインで 32 を選ぶ → `state.checker.cells === 32`、2D の下地テクスチャが作り直されている（`UvView` に `checkerCellsForTest()` があるならそれ）→ 「カラーグリッド」→ 3D をチェッカー表示にして、マテリアルの `map` が新しいテクスチャ。**PNG を付ける（カラーグリッド、両方表示）。ここまでで push して報告。**

---

## T4. ブリッジの分割数

### core

`core/bridge.ts` の `bridgeEdges(mesh, edges, segments = 1)`。`segments ≥ 2` なら、2 つのエッジ列の間に **`segments − 1` 本の中間の輪**を等間隔（線形補間）で入れて、四角形を `segments` 段にする。頂点の対応は今のまま（最近傍 + 向き）。UV は両端の UV を線形補間。

### app

- 「編集」グループのブリッジのオプション（`bridgeSection`）に **分割数**のスライダー（1〜16）。`state.bridgeSegments`（既定 1）
- `doBridge` が `state.bridgeSegments` を渡す。既存の通し確認「境界の 2 列をブリッジできる」は 1 のまま通る

### vitest（`tests/bridge.test.ts` に 1 件）

4 本ずつの 2 列を `segments: 3` で繋ぐ → 面が 4 × 3 = 12 枚増える。中間の頂点は両端の 1/3・2/3 の位置。

### 通し確認（既存に 1 項目追加）

「ブリッジの分割数」: 分割 3 で 4 → 16 面（既存の 4 → 8 の隣に）。

---

## T5. 移動で UV を保つ（Preserve UVs。Maya の移動ツールのオプション）

### 何をするか

展開したあとに 3D で頂点を動かすと、今は UV が動かないので**模様が頂点についていって伸びる**。Maya の「UV を保つ」がオンなら、頂点を動かしても**模様はその場に残る**（UV のほうを動かす）。

### 決め

- 「変形」のオプション（`manipulatorSection`、移動 / ユニバーサルのとき）に **「UV を保つ」**（トグル、既定オン）。`state.preserveUvs`。`localStorage` に残す
- 効くのは**コンポーネントの移動**（頂点 / エッジ / 面のドラッグ、3 本指の平行移動、スライド）。オブジェクトの移動と回転・スケールには効かない（UV は変わらないので）
- 動かしている最中も効かせる（ドラッグごとに計算。動かす頂点 × まわりの面 なので軽い）
- UV レシピ（`SceneObject.uv`）があるときは、動かし終わった時点で **差分として記録する**（`recordManual` と同じ経路。指紋は変わらないので島に残る）。レシピが無いときは `map1` を直に書く

### core

`core/uv/preserve.ts`:

```ts
/**
 * 動かした頂点の UV を、動かす前の面の UV の張り方から決め直す。
 * 面ごとに「動かす前の (v, 次, 前) の三角形」でアフィン写像を作り、
 * 動かしたあとの位置をその面の元の平面に落として写す。
 * 元の多角形の外へ出ても外挿する（Maya と同じで、外へ引いても切れない）。
 */
export function preserveUvs(
  mesh: Mesh,
  before: { positions: Float64Array; uv: Float32Array },
  moved: Iterable<number>,
): void;   // mesh.uvSets["map1"] をその場で書き換える
```

手順（頂点 v、面 f ごと）:
1. `before` の f の頂点列から、v の前後の頂点 `p`（prev）と `n`（next）を取る
2. 元の位置 `v0, p0, n0` と元の UV `uv_v, uv_p, uv_n`（f の中のそれぞれのコーナー）でアフィン写像を作る。`v0` を原点、`p0 − v0`、`n0 − v0` を 2 本の基底にして、新しい位置 `v1` を **元の面の法線で平面に落として**その基底で分解 → 係数 `(a, b)` → `uv = uv_v + a (uv_p − uv_v) + b (uv_n − uv_v)`
3. `p` や `n` も動いている場合は、それぞれの元の位置を使う（before から取るので自然にそうなる）
4. 基底が退化している（`p0, n0` が `v0` と一直線）なら、その面のコーナーは触らない

### app

- `app.ts` の `beginDrag` 系（`startTool` の pending → `beginToolDrag`、3 本指の `gestureBegin`、スライドの `beginSlide`）で、コンポーネント移動なら **`before = { positions: copy, uv: copy }`** を控える
- `updateDrag` / `applyGestureTransform` / `updateSlide` のあと、`state.preserveUvs && kind === "move"` なら `preserveUvs(o.mesh, before, movedVerts)` → `viewport.rebuildObject(o)` は今までどおり
- 終わったら（`finishTool`）レシピがあれば `recordManual` に差分を積む。`uv?.rebuild()` で 2D にも反映

### vitest（U28）

- 平面 1 枚（四角、UV 0〜1）の頂点 1 つを面内で少し動かす → その頂点の UV が、動かした量に比例して動く（1 × 1 の平面で 0.1 動かしたら UV も 0.1）
- 面の外へ引いても外挿される（UV が 1 を超える）
- 面の法線方向に動かしても UV は変わらない（平面に落とすので）

### 通し確認（1 項目）

「頂点を動かしても模様が残る」: 平面（分割 2 × 2）→ チェッカー表示 → 中央の頂点を X に動かす → その頂点の UV の U が動く（オフなら動かない）。**PNG を付ける（オン / オフの 2 枚）。**

---

## T6. 3D の表示オプション

「表示」グループのカットイン（`displaySection`）に足す:

| 項目 | 何をするか |
|---|---|
| 裏面を描かない | `MAT.surf` などの `side` を `FrontSide` に（既定は今のまま `DoubleSide`）。`state.cullBack`。ワイヤと選択の重ね描きは変えない |
| グリッド | 床のグリッド（`viewport.grid`）の表示 / 非表示。`state.showGrid`（既定オン） |

どちらも `localStorage`。通し確認（1 項目）: チェックを切ると `grid.visible === false`、裏面を切るとマテリアルの `side === FrontSide`。

---

## 決めてあること（追加分）

- ヒートマップの色は σ1 / σ2 だけ。縮尺（テクセル密度）は色にしない（`19` の決めどおり、それはパッキングの話）
- チェッカーのテクスチャは 1 か所（`app/render/checker.ts`）。2D と 3D で別々に持たない
- 「UV を保つ」はコンポーネントの**移動**だけ。回転・スケールは後で（Maya も移動ツールのオプション）
- ブリッジの中間の輪は線形補間。曲げ（スムース）は後で

## やらないこと

- ABF++ / SLIM、切れ目の提案（C4 の残り。ヒートマップで歪みが見えてから）
- FBX / USD（`12` の E1 / E3 / E4。CI に emsdk が要る）
- スカルプト / マテリアルの中身（次の設計文書）
- ドロップダウンのアニメーション、タブ化。まず一覧で

## 報告

T3 のあとと T6 のあとの 2 回。各回: 変えたファイル、core と通し確認の件数、PNG、設計と変えたところ、判断が要った点。
