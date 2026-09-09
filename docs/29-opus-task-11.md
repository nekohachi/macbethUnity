# Opus 作業指示書 #11: 実機の指摘 3 つと、スカルプトの前に払う借金

作成: 設計担当（Fable）。実装担当（Opus）向け。2026-09-09。
`27` まで完了（core 210 件、通し確認 101 件）。ユーザーが iPad mini と MovinkPad で `25`〜`27` を通した結果、**入れた操作はどれも問題なし**（ひねりの定数はそのまま）。代わりに画面まわりの指摘が 3 つ出た。この指示書はその 3 つ（A）と、`28` の S1「スカルプトの前に払う借金」（B）。
前提と作業の流れ（vitest → app → 通し確認 → PNG → `publish.sh` → push）は `13` の 0 章と `20` の 0 章のまま。

---

## 0. 順番と理由

| 順 | タスク | 理由 |
|---|---|---|
| A-T1 | 修飾ボタン（F / SHF / CTL / ALT）を**縦に並べ**、置き場所を「表示」から選べるように。少し透かす | ユーザー指摘。タブレットによっては左下が触りにくい |
| A-T2 | **画面を回すと潰れる**（特に iPad mini）を直す | ユーザー指摘。実害がいちばん大きい |
| A-T3 | iPad で**上段のボタン**（モデリング / アウトライナ）が触りにくい | ユーザー指摘。iPad の表示と被っている |
| B-T4 | 履歴の**差分化** | `28` の S1。スカルプトの規模で全メッシュ複製は成り立たない |
| B-T5 | ピッキングの **BVH** | 同上。毎回全頂点を投影しない |
| B-T6 | **10 万三角形の門**（通し確認） | S1 の門。T4・T5 の効きをここで見る |

**A-T3 が終わったら push して報告。B-T6 が終わったら報告して止まる。** 各タスクで通し確認を 1 つ以上足し、PNG を `docs/img/29-<task>.png` に置く。

---

## A-T1. 修飾ボタンを縦に並べ、置き場所を選べるように

### ユーザーの要望

> コントロール / シフト / オルト / F ボタン。左下と、ツールバーの隣の真ん中に、縦に並ぶように。表示タブから選べるように。縦をデフォルトでいい。順番は F・SHF・CTL・ALT。タブレットによっては触りにくい場所に表示されるから。ボタンは若干透明度を下げてもいい。

### 決め

| | |
|---|---|
| 並び | **縦 1 列**。上から **F / SHF / CTL / ALT**。今の 2×2（SHF F / CTL ALT）はやめる。`web/index.html` のボタンの順も入れ替える |
| 置き場所 | 2 つから選ぶ。**「左下」**（今と同じ角。既定）と **「ツール列の横」**（ツール列のすぐ右、**縦の中央**）。左利き（`24` の T4）では鏡映しで、右下 / ツール列のすぐ左 |
| 選び方 | 上段の「表示」ドロップダウンに **「修飾ボタン」の行**（`.segmented` で 左下 / ツール列の横）。`state.ui.clusterPos: "corner" \| "side"`。`rememberUi()` で `localStorage` に残る |
| 透かし | ボタンの地の不透明度を **0.9 → 0.7**（`.cmod` / `.cframe` の `rgba(37,42,48,.7)`）。押している状態（`on` / `held`）は今のまま不透明。文字の色は変えない（薄くしすぎると読めない） |
| ヒントの避け方 | `.hud-hint` は今 `left:150px` で 2×2 の角を避けている。縦 1 列なら幅 66px なので **`left:90px`**。「ツール列の横」なら角は空くので **`left:12px`** |

「ツール列の横」は、`.vp` の中の絶対配置で `left:8px; top:50%; transform:translateY(-50%)`。`.vp` はツール列の右隣にあるので、これでツール列のすぐ横になる。分割（`25` の T6）の枠より手前（`z-index` は今の 8 のまま。枠は 4）。

### app

- `web/index.html`: `.cluster` の中を F → SHF → CTL → ALT の順に
- `styles/shell.css`: `.cluster` を `display:flex; flex-direction:column; gap:6px`。`.vp[data-cluster="side"] .cluster{...}`、左利きの鏡映し、`.hud-hint` の `left`
- `app.ts` の `openViewMenu`: 「修飾ボタン」の行。`state.ui.clusterPos`（`ui` に足す。`rememberUi` / `restoreSettings`）。`applyHand()` の隣に `applyClusterPos()`（`.vp` の `data-cluster` を当てる）

### 通し確認（1 項目）

「修飾ボタンは縦に並び、置き場所を表示から選べる」: `.cluster` の 4 つのボタンの `getBoundingClientRect()` が **上から F / SHF / CTL / ALT の順**で、x が同じ → 「表示」を開いて「ツール列の横」を押す → `.vp` の `data-cluster === "side"` → `.cluster` の縦の中心が `#vp` の縦の中心 ±4px、左端が `#vp` の左端から 20px 以内 → `localStorage` の `macbeth.ui` に `clusterPos` が `"side"` → 左利きにすると右端が `#vp` の右端から 20px 以内 → 戻す（左利きも戻す）。

PNG: `29-t1-cluster-side.png`（ツール列の横に縦 1 列）。

---

## A-T2. 画面を回すと潰れる

### ユーザーの要望

> タブレットの画面を回転させると表示がバグる。潰れたようになる。特に iPad mini。

### 見立て

今は `window` の `resize` だけで `layout.apply()`（縦持ちのクラス）と `viewport.resize()`（canvas の大きさ）を動かしている。iOS の Safari は**回転の `resize` が寸法の確定より先に来る**ことがあり、そのときに読んだ `clientWidth / clientHeight` が古い。canvas の裏の大きさが古いまま CSS だけ新しい大きさになるので「潰れた」ように見える。2 回目の `resize` が来ないこともある（iOS の既知の挙動）。`.stage.portrait` のグリッドへの切り替えも同じ 1 発の中でやっているので、そちらも古い寸法で決まりうる。

### 決め

- **寸法の出どころを `ResizeObserver` にする。** `#stage` を見て `layout.apply()`、`#pane3d` を見て `viewport.resize()`、`#paneUv` を見て `uv.resize()`。`ResizeObserver` はレイアウト確定後に呼ばれるので寸法が古くならない。`window` の `resize` は残すが**保険**扱い
- `orientationchange`（と `screen.orientation` の `change`）のあと、**350ms 後にもう 1 回**全部を通す。iOS で最後の 1 発が来ないときの保険
- `Viewport.resize()` は **0×0 のときは何もしない**（`#pane3d` が `display:none` の UV 専用表示のとき）。`applyCameraAll` と枠の描き直しは今のまま
- 縦持ちの判定（`Layout.apply` の `portrait`）は `#stage` の矩形のまま。ドック列が空でも壊れないのは `24` の T1 で見ている

### 通し確認（1 項目）

「画面を回しても潰れない」: `page.setViewportSize` で **1133×744 → 744×1133 → 1133×744** と回す。各段で 300ms 待って:

- canvas の `width / height` が `#pane3d` の `clientWidth / clientHeight × devicePixelRatio`（±1px）
- `.stage.portrait` が縦持ちのときだけ付いている
- `#pane3d` の矩形が `#vp` の矩形と同じ（1 画面のとき）
- `.cluster` の矩形が `#vp` の中に収まっている
- 4 分割にして回しても、4 つの `paneRect` が container を隙間なく埋める（幅の和 = `clientWidth`、高さの和 = `clientHeight`）→ 1 画面に戻す

PNG: `29-t2-portrait.png`（`SHOT_SIZE=744x1133` で縦持ち。潰れていない絵）。

---

## A-T3. iPad で上段のボタンが触りにくい

### ユーザーの要望

> iPad はアウトライナータブとモデリングタブが触りにくい。おそらく iPad デフォルトの表示項目と被ってる。

### 見立て

`web/index.html` は `viewport-fit=cover` と `apple-mobile-web-app-status-bar-style=black-translucent`。ホーム画面から開くと **iPad のステータスバー（時計・電池）がページの上に重なる**が、上段（`.topbar`）には `env(safe-area-inset-top)` の余白が無い。上段の高さは 30px ほどしかないので、**上半分がステータスバーの下**に入る。触るとステータスバー側（上へスクロール）が取る。Safari で開いたときも、上端の数 px はアドレスバーの操作に取られる。さらに iPadOS は**画面の上中央にマルチタスクの「…」**を出す。今はそこがスペーサー（`.topspacer`）なので当たっていないが、これからも**上中央には押すものを置かない**。

### 決め

- `.topbar{padding-top:env(safe-area-inset-top, 0px)}`。左右も `env(safe-area-inset-left / right)`（iPad には無いが害も無い）
- 上段のボタンは **高さ 40px 以上**（`.topbar > *{min-height:40px}`）。今は文字の高さで 30px ほど。Apple の目安は 44pt だが、密度を保つため 40
- **上中央 120px は空けたまま**（スペーサー）。`.topbar` にコメントで理由を書く
- ドロワー（アウトライナ）の閉じる「×」も同じ上段にあるので、そちらも 40px

### 通し確認（1 項目）

「上段のボタンは 40px 以上、上中央は空いている」: `.topbar` の直下の要素の高さがすべて **40 以上** → `#modeBtn` と `#btnPanels` の高さが 40 以上 → 上段の**横の中央 ±60px** に `button` が無い（`document.elementFromPoint(centerX, topbarCenterY)` が `.topspacer`）。`env()` は headless では 0 なので、余白そのものは実機で見る。

PNG: 不要（T2 の縦持ちの絵に上段が写る）。

---

## B-T4. 履歴の差分化

### 今

`History.snapshot()` は**操作のたびに全オブジェクトのメッシュを複製**する（上限 40 段）。ツイークで頂点 1 つ動かしても、シーン全体のコピーが 1 つ増える。10 万頂点のメッシュで 40 段なら 40 × 10 万 × 3 × 4 バイト = 48MB。スカルプトの 100 万頂点では 480MB で成り立たない。

### 決め

履歴の段に**種類**を持たせる。

| 種類 | 持つもの | 使う操作 |
|---|---|---|
| `full` | 今の `Snapshot`（全複製） | トポロジを変えるもの（押し出し・ベベル・削除・結合…）、オブジェクトの追加 / 削除、UV のレシピの変更、プリミティブのパラメータ、名前・表示・ロック・不透明度 |
| `positions` | **1 オブジェクトの動いた頂点だけ**: `{ ref, verts: Uint32Array, before: Float32Array, after: Float32Array, transformBefore, transformAfter, 選択 }` | ツイーク、マニピュレータのドラッグ、3 本指の変形（つまみ / スワイプ / ひねり）、ソフト選択つき、対称つき。**のちのスカルプトのストロークもこれ** |
| `transform` | `{ ref, before, after }` のトランスフォームだけ | オブジェクトモードのドラッグと 3 本指（メッシュは触らない） |

- API: `history.beginPositions(o, verts)` で `before` を控え（`captureTarget()` が既に動かす頂点の一覧を持っているので、そこから）、`history.commitPositions(label)` で `after` を読んで積む。`snapshot()` / `commit()` は残す（`full` 用）
- **やり直し**は `after` を当てるだけ。スナップショットを取り直さない
- **移動で UV を保つ（`23` の T5）がオンのとき**は UV も変わる。`positions` に `uvBefore / uvAfter`（変わったコーナーだけ）を足す。面倒なら**そのときだけ `full`** にしてよい（報告に書く）
- 対称編集の相手側の頂点も `verts` に入る（`target.mirror` から）
- 上限は 40 段のまま。`positions` の段は小さいので実質もっと積める
- **段の種類と大きさを通し確認から読めるように** `history.lastEntry(): { kind, bytes }`

### テスト（vitest。`tests/history.test.ts` を新設）

`History` は core と `AppState` の型しか見ないので、vitest から直に使える。

1. `positions` で 3 頂点を動かして戻す → 座標が完全に戻る（`toEqual`）→ やり直す → 動かした後に戻る
2. `full` の段（押し出し）は今までどおり戻る（トポロジが戻る）
3. **複製しないことの確認**: 10 万頂点のメッシュで `positions` を 40 段積んでも、`mesh.positions` の `buffer` が同じもののまま（`toBe`）で、段の `bytes` の合計が 1MB 未満

### 通し確認（1 項目）

「ドラッグの履歴は動いた頂点だけを持つ」: 4 万四角形の球（`sdAxis 200, sdHeight 200`）→ 頂点を 1 つツイーク → `history.lastEntry().kind === "positions"`、`bytes < 4096` → 取り消しで座標が元に戻る → 押し出し → `kind === "full"` → 取り消し。

---

## B-T5. ピッキングの BVH

### 今

`pickSurface` は three.js の `Raycaster.intersectObjects`（全三角形を総当たり）。頂点 / エッジのピック（`pickVertex` / `pickEdge`）は**毎回全頂点を画面に投影**する。ホバーのプリセレクションは `pointermove` のたびに走るので、10 万頂点で 1 回 5ms を越えるとペンが引っかかる。

### 決め

- **`src/core/bvh.ts`**（core。three を見ない）。三角形の境界箱の木。`buildBvh(positions, tri)`、`raycastBvh(bvh, positions, tri, origin, dir) → { t, tri } | null`（Möller–Trumbore、両面）、`refitBvh(bvh, positions, tri)`（木の形はそのまま境界箱だけ取り直す。座標だけ変わったとき用）、`trianglesNear(bvh, positions, tri, point, radius) → number[]`（球に触れる三角形）
- 分け方: **最長軸の中央値で 2 分**、葉は 8 三角形以下。深さの上限 32
- `ObjectView.bvh` を初めて要るときに作る。`refreshPositions` では **`refit`**、`rebuildObject`（トポロジが変わった）では作り直し
- `Picker.pickSurface`: 各 view について、レイを**オブジェクトのローカル空間**に移してから `raycastBvh`。`t` はワールドに戻して比べる。返す `SurfaceHit` の形は変えない。ロック / 非表示 / 隔離（`27` の T3）の除外も今のまま
- `Picker.pickVertex` / `pickEdge`: まず `pickSurface` で当たった点を取り、**画面の半径をワールドの半径に直して** `trianglesNear` で候補の三角形を集め、**その頂点だけ**を投影する。当たらなければ（メッシュの外を触った）今までどおり全頂点（縁の頂点を拾うため）。**カメラベース選択（`21` の 2.1）の裏面の除外は今のまま**
- 矩形選択は今までどおり全頂点（1 回きりなので構わない）

### テスト（vitest。`tests/bvh.test.ts` を新設）

1. 球（`sdAxis 48`）に外から 200 本の乱数レイ → BVH の当たりが**総当たりと同じ三角形**（`t` が 1e-6 以内）
2. 頂点を動かして `refit` → 動かした先に当たる
3. `trianglesNear` の結果が、総当たり（球と三角形の境界箱の交差）と同じ集合
4. 空のメッシュで `null`

### 通し確認（T6 に含める）

---

## B-T6. 10 万三角形の門

### 決め

S1 の門。**10 万三角形を読み込んで、今と同じ速さで触れること。** 数字は CI の Chromium（swiftshader、遅い）で取るので、緩めに置く。実機はこれより速い。

### 通し確認（1 項目）

「10 万三角形でも軽い」: 球（`sdAxis 320, sdHeight 160` ≈ 10 万三角形）を 1 つ:

| 測るもの | 上限（CI） |
|---|---|
| `pickSurface` を 200 回 | 合計 400ms |
| ホバー（`pointermove` を 60 回、頂点モード） | 合計 600ms |
| ツイーク（`pointerdown` → `pointermove` 30 回 → `pointerup`） | 合計 900ms、履歴の段は `positions` で `bytes < 8192` |
| `frameSelected` | 60ms |
| 取り消し → やり直し | 合計 60ms |

上限は**通ったら実測の 1.5 倍に締める**（報告に実測を書く）。

PNG: `29-t6-100k.png`（10 万三角形の球をツイークしたところ。HUD のポリゴンカウントが写る）。

---

## 決めてあること（追加分）

- 修飾ボタンは縦 1 列、上から F / SHF / CTL / ALT。置き場所は 左下 / ツール列の横 の 2 つだけ
- 寸法の出どころは `ResizeObserver`。`window` の `resize` は保険
- 上段は safe-area の余白 + 40px。上中央には押すものを置かない
- 履歴は `full` / `positions` / `transform` の 3 種類。スカルプトのストロークは `positions`
- BVH は core に置き、JS のまま。wasm に出すときはそのまま移す

## やらないこと

- 修飾ボタンの自由配置（ドラッグで好きな場所へ）。2 択で足りる
- 矩形選択の BVH 化（1 回きり）
- 履歴の圧縮やディスクへの退避

## 報告

A-T3 のあとと B-T6 のあとの 2 回。各回: 変えたファイル、core と通し確認の件数、PNG、設計と変えたところ、判断が要った点。**T6 は実測の数字を必ず書く**（CI の値）。

---

## 次（`28` の S2 に入る前に、ユーザーへの質問）

S2-0（測る）の前に決めておきたいこと。答えは `30` の指示書に書く。

1. iPad は **Safari で開いている**か、**ホーム画面に追加して**開いているか。T2・T3 の直し方が少し変わる（ホーム画面ならステータスバーの重なり、Safari ならアドレスバー）
2. 最初にスカルプトしたいものと、その重さ。**頭 1 つで 50 万三角形**くらいか、**全身で 200 万**か。S1 の門（10 万）と S2-0 の測り方（何万四角形をレベル何まで）がこれで決まる
3. 測る端末。**iPad mini の世代（チップ）**と、**Android の機種**。JS のままか wasm に出すかを、この 2 台の数字で決める

---

## ユーザーの回答（2026-09-09）と、それによる変更

| 質問 | 回答 |
|---|---|
| 1. Safari か、ホーム画面か | **ホーム画面に追加したときにバグる**（standalone） |
| 2. スカルプトの重さ | **なるべく大きなポリゴン数を快適に**。上限は決めない |
| 3. 端末 | iPad mini 6 と Wacom MovinkPad 14。**mini は本命ではなく「小さい画面でどこまで快適な UI にできるか」の指標。** 本命は iPad Pro や MovinkPad 14 のハイエンド |

### A-T2 / A-T3 への追記（standalone が確定した）

- 見立てどおり **ホーム画面（standalone）の話**。`navigator.standalone === true` か `matchMedia("(display-mode: standalone)")` で分かる。通し確認では取れないので、**実機で見る項目**として報告に書く
- **A-T3**: standalone ではステータスバーが `black-translucent` でページの上に重なる。`env(safe-area-inset-top)` は iPad で 20〜24px になるはず。**もし 0 のままなら**（iPadOS の版によってある）、standalone のときだけ `padding-top: 24px` を明示する保険を入れる。`default`（不透明のステータスバー）に変える手もあるが、全画面の暗い見た目を保ちたいので **translucent + 余白**でいく
- **A-T2**: standalone は Safari よりさらに回転の `resize` が来ないことがある。`ResizeObserver` に加えて **`visualViewport` の `resize`** も引き金にする。`100dvh` は standalone では `100vh` と同じ（ブラウザの chrome が無い）ので、そこは問題にならない
- 実機で見る項目（報告に 2 行）: (1) ホーム画面から開いて回したとき潰れないか、(2) 上段のボタンが指で押せるか（ステータスバーの下に入っていないか）

### B と `28` の S2 への影響

- **本命はハイエンド。** JS のままか wasm に出すかは、**iPad Pro（M 系）と MovinkPad 14 の数字**で決める。mini 6（A15）は「これでも動く」の下限として見る
- 「なるべく大きく」なので、S2-0 の測り方を **100 万四角形**まで上げる（`30` に書く）。S1 の門（B-T6 の 10 万三角形）は**モデリングの門**なのでそのまま
- 小さい画面の指標として mini を使う、という位置づけなので、**UI の密度の判断は mini で、性能の判断はハイエンドで**。指示書にも分けて書く
