# Opus 作業指示書 #13: JS か wasm かの判断と、S2-1 レベルのボタン + スタンプ

作成: 設計担当（Fable）。実装担当（Opus）向け。2026-09-09。
`30` の実測（MovinkPad 14）を受けたもの。`28` v3.1 の **S2-1**。

---

## 0. 判断（`30` の数字から）

MovinkPad 14 の表（`30` の末尾）で決める。iPad Pro は無い。mini 6 は 100 万で落ちたので、下限の確認は 25 万で改めて取る。

| 対象 | 数字 | 決め |
|---|---|---|
| 細分割（レベルを 1 つ上げる） | JS 16.9s → wasm 2.6s（100 万）。うち wasm の計算 0.7s、**JS の `MeshBuilder` が 1.9s** | **wasm で確定**（済）。残りの 1.9s は `MeshBuilder` を通さずに直に組んで消す（下の T1） |
| デルタの取り直し（ブラシ 1 コマ） | **150ms。目標 16ms の 9 倍** | **wasm**。`30` の目安そのまま。ただしブラシと一緒に S2-2 でやる（下の 4 章） |
| BVH | 作る 1.4s（トポロジ変更時だけ）、取り直す 64ms（全部。1 コマは部分 refit） | **JS のまま** |
| 描画 1 フレーム | 0.3ms は測れていなかった（直した） | **測り直し待ち**。この指示書の間に取る |
| メモリ | **2.2GB**（100 万） | 原因は `MeshBuilder` の `number[]`。T1 で消える見込み。**予算の仕組み（`03` の 3.3）を T3 で入れる** |
| メッシュを作る（B0） | 4.0s（100 万のプリミティブ） | 放置。100 万のプリミティブは使い道が無い。スカルプトのベースは数万 |

一言でいうと: **細分割は wasm、ブラシも wasm、その前に JS の組み立てを直す。** `MeshBuilder` は「何が来るか分からない入力を溶接しながら組む」ための道具で、細分割の出力（全部四角形、番号は決まっている、潰れた面は出ない）に使う理由が無い。ここを直すと B1 の残り・B2a・メモリが一度に片付く。

### 順番と理由

| 順 | タスク | 理由 |
|---|---|---|
| T1 | **細分割の出力を直に組む**（`MeshBuilder` を通さない） | 速さとメモリの両方でいちばん大きい。レベルのボタンがこれ無しでは 8 秒待つ |
| T2 | **`Multires` に細分割の差し込み口**と、`SceneObject` に生きたスタック | wasm を core に知らせずに使う。レベル表示の土台 |
| T3 | **レベルのボタン**（ツール列。タップで上へ、長押しで一覧・足す・捨てる・焼く）と**メモリ予算** | S2-1 の本体 |
| T4 | **スタンプ**（トポロジ / レベル 0 の形 / ハイの形 / UV の指紋） | `31` の 2。S3 のベイクが「古い」を知るための土台。安い |
| T5 | **門**: ベンチと通し確認 | 100 万で B1b-wasm ≤ 1500ms、メモリ ≤ 1GB を CI と実機で見る |

**T5 が終わったら報告して止まる。** その報告に MovinkPad の再測（描画の行）と mini の 25 万の表を添える。次は S2-2（ブラシ 3 つ + デルタの取り直しを wasm）。

---

## T1. 細分割の出力を直に組む

### 今

`src/app/wasm/subdiv.ts` の `buildFromGeometry` と `src/core/subdivide.ts` の `SubdivPlan.build` は、どちらも `MeshBuilder` に 1 面ずつ `face()` している。100 万四角形 → 400 万四角形で、コーナー 1600 万個を `number[]` に積むので、時間（1.9s）もメモリ（GB）もここで消える。

### 決め

- **core に `assembleQuads()` を 1 つ置く**（`src/core/subdivide.ts`）。入力は「出力頂点の座標（`Float32Array`）」「四角形の頂点番号（`Uint32Array`、4 × 面数）」「元のメッシュ」。出力は `Mesh`。**typed array を直に埋めて `new Mesh()` する。** `MeshBuilder` は呼ばない
  - `faceOffsets` = 0, 4, 8, …（`Uint32Array`）
  - `faceCorners` = 四角形の配列そのまま
  - UV: 元の UV セットごとに `Float32Array(2 × 4 × 面数)` を用意し、コーナー順に埋める。式は今の `buildFromGeometry` と同じ（頂点の UV / 隣との中点 / 面の平均 / 前との中点）
  - `polygroup` / `materialId`: 元の面の値を 4 つに複製
  - クリースと `cornerSharp` の引き継ぎ: 今の `buildFromGeometry` の後半をそのまま移す
- **`SubdivPlan.build` もこれを使う**（JS 版の細分割）。四角形の配列は `plan` が持っている `faceVerts` と `edgePointOf` から作る。JS と wasm で「組み立て」が 1 本になり、`tests/subdiv-wasm.test.ts` の一致テストが両方を守る
- `MeshBuilder.face()` が潰れた面を捨てる挙動は、細分割の出力では起きない（入力の面が 3 頂点以上で重複なしなら、出力の 4 つは必ず別番号）。**vitest でそれを言葉どおり確かめる**: 三角形・五角形・境界・クリース付きで `assembleQuads` と `MeshBuilder` 経由が完全一致
- `buildFromGeometry` は `assembleQuads` の薄い皮になる（残しても消してもよい）

### テスト（`tests/subdivide.test.ts` に追加、`tests/subdiv-wasm.test.ts` は変更なしで通ること）

- 立方体 / 球（極の三角形）/ 平面（境界）/ 五角形混じり / クリース付きで、`assembleQuads` の結果が「`MeshBuilder` で組んだもの」と頂点・面・UV・クリースすべて一致
- 25 万四角形で `catmullClark` の時間が T1 の前後でどれだけ変わったかを報告に書く（テストにはしない）

### 見込み

手元の Node で 25 万: JS 全体 11.8s のうち `MeshBuilder` が 7〜8s。wasm 経路 1.35s のうち 1.07s。**どちらも数百 ms に落ちるはず。** メモリは `number[]` が消えるので typed array の実サイズ（400 万四角形で 300MB 前後）に近づく。

---

## T2. `Multires` に細分割の差し込み口、`SceneObject` に生きたスタック

### 今

`src/core/multires.ts` の `Multires.rebuild()` は `new SubdivPlan(current)` → `plan.build(current)` を呼ぶ。`SubdivPlan` のコンストラクタは文字列キーの Map でトポロジを引くので、25 万で 3.8s かかる（`30` の手元計測）。app は `Multires` をまだ使っていない（`o.multires` はデルタの入れ物だけ）。

### 決め

- **`Multires` のコンストラクタにオプション** `{ subdivide?: (mesh: Mesh) => Mesh }`。あれば `rebuild()` の全体組み立てにそれを使う。無ければ今までどおり `SubdivPlan`。**core は wasm を知らない**（関数を受け取るだけ）
  - `LevelCache.plan`（`SubdivPlan`）は `updateFrom`（差分更新）が使う。**S2-1 では差分更新を呼ばない**ので、`plan` は**遅延**にする（初めて `setBase(mesh, moved)` が来たときに作る）。全体組み立てのたびに 3.8s 払わないため
  - `FramePlan` / `frames` も同じく、デルタがあるレベルだけ作る（今もそう）
- **`SceneObject` に実行時のスタック** `stack: Multires | null`（**`.mbz` にも履歴にも入れない**。`multires`（デルタ）から作り直せる）。作るのは app の `levelsOf(o)`（`src/app/levels.ts`、新規）で、wasm があれば `subdivide` に wasm を差す
  - `o.multires`（デルタの配列）が真、`o.stack` は控え。**`o.stack.deltas` と `o.multires` を同じ配列にしない**（履歴が `multires.slice()` で控えるので、ずれる）。`levelsOf` は `o.multires` の中身から `stack.deltas` を埋め直す。合わなくなったら（長さか参照が違う）作り直す
  - 捨てるとき: `markTopologyChanged()`（済。`multires = []` にする）と履歴の復元で `o.stack = null`。**`SceneObject.invalidateLevels()` を 1 つ置き、両方から呼ぶ**
- **表示するメッシュ**: `SceneObject.shown(): Mesh` を足す。`activeLevel === 0` なら `mesh`、それ以外は `stack.level(activeLevel)`（stack が無ければ `mesh`）。**描画は `o.mesh` ではなく `o.shown()` を読む**（`viewport.ts` 564 / 722〜756、`meshView.ts` 238〜248）。ピッキング（BVH）も `shown()` の三角形で作る
- **モデリングモードは常にレベル 0**（`03` の 3.4 の「ローモデルを編集する」側）。モードを model にしたら `activeLevel` は 0 として表示し、sculpt に戻ったら覚えていたレベルへ。`SceneObject.activeLevel` 自体は書き換えない（**`state.shownLevel(o)`** のような読み口で、モードを見て決める）
  - モデリングでレベル 0 を動かしたあと sculpt に戻ったら `stack.setBase(o.mesh)`（全体作り直し）。**差分更新（動いた頂点だけ）は S2-2**。ここでは全体でよい
  - ハイを重ねて見ながらローを編集する（`03` の売り）は S2-2 の差分更新が入ってから

### テスト（`tests/multires.test.ts` に追加）

- `subdivide` に JS の `catmullClark` を差しても、差さなくても、`levels()` が完全一致
- `subdivide` に「わざと 1 頂点ずらす関数」を差すと、そのぶんだけ結果が変わる（差し込み口が本当に使われている確認）
- `plan` が遅延であること: `divide()` → `levels()` の後に `setBase(mesh, [3])` を呼んでも、V6 の差分更新テストと同じ値になる

---

## T3. レベルのボタンとメモリ予算

### 決め: スカルプトモードの入口

- `setMode("sculpt")` で**予定表（`STUBS.sculpt`）をやめて 3D を出す**。モデリングと同じビューポート。選択はオブジェクトだけ（タップでオブジェクト、コンポーネントは無し）。ブラシは無い（S2-2）
- ゲージ（`GAUGES.sculpt` の強度 / サイズ）はそのまま出すが、**S2-2 まで効かない**ので薄く（`SpringGauge.enabled` と同じ見せ方）
- ツール列（`toolColumn()` に `sculpt` の枝）:

| 順 | グループ | 中身 |
|---|---|---|
| 1 | **レベル** | 下の「レベルのボタン」 |
| 区切り | | |
| 2 | シェード | モデリングと同じ `display` |
| 3 | カメラ | 同じ |
| 4 | 分割 | 同じ |

### 決め: レベルのボタン（`21` の作法。タップ = 主動作、長押し = 一覧）

| 操作 | 動き |
|---|---|
| アイコン | 段の絵。**バッジに今のレベル**（`0` … `N`）。ある段の数はアイコンの段数（最大 4 段。それ以上は同じ） |
| **タップ** | **1 つ上へ**。いちばん上なら toast「いちばん上です。長押しで足す」。**足すのはタップでは起きない**（重い操作を指の滑りで起こさない） |
| **長押し**（`attachRadialButton`） | 8 方位に `N` … `0` の直接ジャンプ（ある段だけ）と、**足す** / **上を捨てる** / **下に焼く**。`radialList`（カメラの保存一覧と同じ）に段ごとの「頂点数 · 推定 MB」を出す |
| 足す | `stack.divide()` して新しい段へ移る。**メモリ予算を越えるならブロック**して toast「推定 xxx MB。予算 yyy MB を越えます」。項目自体を薄くして、押しても足さない |
| 上を捨てる | `dropAbove(activeLevel)`（`03` の Delete Higher）。履歴に `full` で入る |
| 下に焼く | `03` の Delete Lower。`o.mesh = stack.level(k).clone()`、`o.multires` は k より上だけを残して番号を詰める。**上のデルタはそのまま有効**（レベル k の形が同じなら S(k+1) 以上は変わらない）。`o.uv` はレベル 0 のトポロジに紐づくので `reconcile` を通す（`markTopologyChanged` と同じ扱い。`parametric = false`）。履歴に `full` |
| モデリングへ切り替え | 表示はレベル 0 に。トポロジを変えると上位レベルが捨てられる（既存の toast「上位レベル N とレイヤー M を破棄」）。**変える前に聞く 3 択（`03` の 3.4）は S2-4 の再投影と一緒に**。今は捨てるだけ |

- レベルの上げ下げは**履歴に入れない**（見ているものが変わるだけ。カメラと同じ）。足す / 捨てる / 焼くは入れる
- ホバーの絵は不要。カットイン（オプション）も無し。**表とボタンだけ**

### 決め: メモリ予算（`03` の 3.3、`01` の 1.4）

- **推定**: レベル L の四角形数 F(L) = F(0) × 4^L。1 段ぶんのメモリは `Mesh`（座標 12B/頂点 + コーナー 4B + UV 8B/コーナー）+ 滑らかな面（同じ）+ デルタ（12B/頂点）+ 描画（三角形 24B + 法線 12B/頂点 + ワイヤ 8B/エッジ）。**式は `src/core/multires.ts` に `estimateLevelBytes(faceCount)` として置き、T5 のベンチで実測と照らして係数を直す**。最初は 1 四角形あたり **160B** から始める
- **予算**: Safari（iOS / iPadOS。`navigator.userAgent` に `Safari` があって `Chrome` が無い）は **1.0GB**、それ以外は **2.5GB**。`?budget=` で上書きできる（通し確認用）。`01` の表（iPad Pro 3.0GB / mini 1.2GB）から余裕を見た値
- **合計 = 今あるレベル全部 + 足すレベル**。越えたら足せない。表示の切り替えは常にできる（既にあるものを見せるだけ）
- HUD に `Verts / Edges / Faces / Tris` の下へ **`Level 2/3 · 推定 420 MB`** を 1 行（sculpt のときだけ）

### app

- `src/app/levels.ts`（新規）: `levelsOf(o)`（スタックを作る / 直す）、`goLevel(o, n)`、`addLevel(o)`（予算の確認込み）、`dropAbove(o)`、`burnDown(o)`、`estimateBytes(o, levels)`、`budgetBytes()`。`app.ts` を太らせない
- wasm の読み込み: sculpt に入ったとき（`setMode("sculpt")`）に `loadWasm()` を始める。読めていなければ JS の `catmullClark` で組む（遅いが動く）。**どちらで組んだかを HUD の行に `wasm` / `js` で出す**（実機で確かめるため）
- `viewport.rebuildObject(o)` はレベルを切り替えたときに呼ぶ（`shown()` が変わる）。頂点数が変わるので `refreshPositions` ではだめ

### 通し確認（3 項目）

1. 「スカルプトに入るとレベルのボタンが出て、足すと 1 になる」: 立方体を選んで sculpt → ツール列に `level` グループ → 長押しで「足す」→ バッジ `1`、`shown()` の面数が 24、HUD に `Level 1/1` と推定 MB → タップで「いちばん上です」の toast → 長押しで `0` → 面数 6
2. 「予算を越えると足せない」: `?budget=1`（1MB）で開き、球（数千面）を sculpt → 「足す」が薄く、押しても段が増えず toast に「予算」の字
3. 「モデリングでトポロジを変えると上位レベルが消える」: レベル 2 まで足した立方体を model に戻す → 表示がレベル 0（面数 6）→ 押し出し → 既存の toast に「上位レベル 2」→ sculpt に戻ってもバッジ `0`

PNG: `32-t3-level.png`（長押しの一覧が開いた絵。段ごとの MB が見えること）。

---

## T4. スタンプ（`31` の 2）

### 決め

- **core に純粋関数**（`src/core/stamps.ts`、新規）。`SceneObject` を受けて指紋を返す。**保存しない**（作り直せる。`.mbz` は変えない）

| 段 | 指紋 | 元 |
|---|---|---|
| `topology` | `topologyHash(mesh)`（済。`io/hash.ts`） | 面の構成 |
| `base` | レベル 0 の `positions` のハッシュ | 頂点座標 |
| `high` | `multires` のデルタを段ごとにハッシュしてつないだもの。デルタが無ければ `""` | ハイの形 |
| `uv` | `map1` のハッシュ + `UvRecipe` の指紋（`recipe.ts` の `chartFingerprint` の並び。無ければ `""`） | UV |

- ハッシュは `io/hash.ts` の `fnv1a`（32 ビット）にそろえる。Float32Array は `Uint32Array` の窓で読んで 1 要素ずつ混ぜる。**100 万頂点で 10ms 台**なら十分
- **`Stamps` 型**: `{ topology, base, high, uv }`。**「古い」の判定は使う側**（S3 のベイクが「作ったときの指紋」を持って比べる）。ここでは指紋を出すだけ
- app 側の控え: `src/app/stamps.ts` に `stampsOf(o)`。**履歴の世代（`History` に `revision` を足す。commit / undo / redo のたびに +1。段数ではなく世代なのは、取り消して戻ると段数は同じでも形が違うため）と `o.id` で控える**。すべての編集は履歴を通るので、世代が同じなら指紋も同じ。sculpt でレベルを切り替えただけでは変わらない

### テスト（`tests/stamps.test.ts`、新規）

- 頂点を 1 つ動かす → `base` だけ変わる（`topology` / `high` / `uv` は同じ）
- 押し出し → `topology` と `base` が変わる
- レベルを足してデルタを入れる（`Multires.sculpt`）→ `high` だけ変わる
- UV を切って開き直す → `uv` だけ変わる
- 同じ操作を 2 回して同じ形なら同じ指紋（決定的であること）

### 通し確認

なし（core のテストで足りる）。

---

## T5. 門: ベンチと通し確認

- ベンチ（`30` の T1）に **「レベル 0 → 2 の待ち」**（B2a を `levelsOf` 経由に置き換える。実際にボタンが呼ぶ道）と **「推定 MB と実測 MB」**の 2 列を出し、係数を直す
- CI（swiftshader）で B1b-wasm（100 万）の「JS で組む」が **T1 の前の 1/3 以下**になっていること
- 通し確認は T3 の 3 項目 + 既存すべて。**smoke の総数を報告に書く**

### 実機で取ってもらうもの（報告に貼る）

- MovinkPad 14、100 万: 描画の 2 行（B4a / B4b）と、T1 の後の B1b-wasm / B2a / B5
- iPad mini 6、**25 万**（`?size=25`）: 表全部。落ちたら 25 万でも落ちたと書く
- どちらも HUD の `wasm` / `js` の字（wasm が実機で読めていること）

---

## 4. S2-2 に回すもの（ここでは触らない）

- **デルタの取り直しとブラシの変形を wasm へ**。やり方は決めてある: 細分割の計画（トポロジの表。`SubdivPlan` と `FramePlan` にあたるもの）を **wasm 側に常駐**させ、`affected(moved)` と `positions(subset)` を wasm の関数で呼ぶ。そのために `native/core.c` の場所取りを「呼び出しごとに戻す」から「計画ごとの区画」に変える。S2-1 の `Multires` の差し込み口（T2）はそのまま使う
- ブラシ 3 つ（Standard / Move / Smooth）と筆圧（`28` の S2-2）
- 描画 1 フレームが 16ms を越えていたら、そのときにインデックスの 16 ビット化と法線の量子化を見る
- モデリングでハイを重ねて見せる（差分更新が要る）

---

## 決めてあること

- `src/core/` は wasm を知らない。関数を受け取るだけ
- `o.mesh` は常にレベル 0。表示は `o.shown()`。`.mbz` の形は変えない（`stack` も `stamps` も入れない）
- モデリングモードは常にレベル 0 を見せて、レベル 0 を編集する
- 足す / 捨てる / 焼くは履歴に入る。上げ下げは入らない
- メモリ予算は Safari 1.0GB、それ以外 2.5GB。式の係数は実測で直す

## やらないこと

- ブラシ、マスク、レイヤー（S2-2 以降）
- トポロジ変更前の 3 択（S2-4 の再投影と一緒に）
- `MeshBuilder` そのものの高速化（プリミティブ生成には残す。細分割で使わなくなるだけ）
- OpenSubdiv
