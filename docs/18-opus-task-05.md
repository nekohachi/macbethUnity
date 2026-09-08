# Opus 作業指示書 #05: C1 フィードバック（UV 取り込み、メニュー、タップ保護、マニピュレータ、スライド、修飾、スナップ）

作成: 設計担当（Fable）。実装担当（Opus）向け。
設計は `17-c1-feedback-design.md`。**迷ったら 17 を読む。この文書は手順だけ。**
前提と作業の流れ（vitest → app → 通し確認に 1 項目 → `publish.sh` → push）は `13` の 0 章のまま。

`16` の C2 / C3 は**この指示書の後**。順番を入れ替えない。

---

## 0. 順番と理由

| 順 | タスク | 理由 |
|---|---|---|
| T1 | 修飾キーを 2 段階に | 小さく、T3 / T5 / T6 が前提にする |
| T2 | スナップを CTL から切り離してツール列へ | T1 で Ctrl の意味が変わるので同時に |
| T3 | タップ保護（ドラッグの遅延開始） | ペンの誤操作。T5 の入口もここを通る |
| T4 | マニピュレータのボタン、大きさ、ピボット編集 | 独立 |
| T5 | スライド | T1 と T3 の上に乗る |
| T6 | UV の取り込み（`base`） | core 中心。独立 |
| T7 | UV のメニュー、単位ごとのカット / ソー、UV のスナップ | T6 の後 |

各タスクで `docs/17` の合格条件を通す。**T7 が終わったら報告して止まる。** C2 はフィードバックの後。

---

## T1. 修飾キーを 2 段階に（`17` の 6 章）

- `state.ts`: `ModState = "off" | "on"`。`releaseLatches()` を消し、呼び出し（`finishTool` の 3 か所ほか）も消す
- `buildCluster` の `cycle` はトグルに
- `shell.css`: `.cmod[data-state="on"]` に今の `lock` の見た目。`latch` の規則を消す
- `hud.ts` のモード行にオンの修飾（`· SHF` `· CTL` `· ALT`）
- `syncModButtons` はそのまま（`data-state` の値が変わるだけ）

通し確認: SHF をタップ → 2 回連続で面を Shift 選択できる（1 回で消えない）→ もう一度タップで消える。

## T2. スナップのツール（`17` の 7 章）

- `state.ts`: `snapOn = false`、`SnapKind` に `"surface"`、`snapping` は `snapKeyHeld || snapOn`
- `app.ts`:
  - `snapPoint`: `"surface"` はピボットの画面位置で `picker.pickSurface`。自分のオブジェクトは常に除く（`Picker` に除外を渡す口が無ければ足す）
  - ツール列「変形」に `ICONS.snap`（磁石）のボタン。タップ = `snapOn` 切替、長押し = `snapMenu()`（北 グリッド X / 東 頂点 V / 南 カーブ / エッジ C / 西 サーフェス / 南西 オフ）。種類を選ぶと `snapOn = true`
  - `SNAP_LABEL` に `surface: "サーフェス"`、`edge` の表示名を「カーブ / エッジ」に
  - キーの X / V / C は今のまま
- `panels.ts`: segmented に「面」、文言の差し替え
- `hud.ts`: 既定のヒントを `17` の 8 章の文面に
- 通し確認: B6 の頂点スナップの項目を「CTL ラッチ」から「スナップボタン」に書き換える。サーフェスの項目を 1 つ足す

## T3. タップ保護（`17` の 3 章）

`app.ts` の `startTool` / `moveTool` / `finishTool` を次の形に。**`gestures.ts` は触らない**（`moved` の判定は今のまま渡ってくる。使うのは app 側の「生きたか」）。

```ts
private pendingDrag: {
  handle: number; point: ScreenPoint; t0: number; pointerType: string;
  shift: boolean; ctrl: boolean;
} | null = null;
```

- `startTool`: マウスは今のまま即 `beginDrag`。ペンと指はハンドルを `pendingDrag` に入れ、`manipulator.hot` だけ立てる。押し出しもスライドもここでは行わない
- `moveTool`: `pendingDrag` があれば、押した点からの距離 `d` と経過時間で判定。`d > TAP_MOVE || (d > TOOL_MOVE && now - t0 > TAP_DURATION)` なら **押した点を起点に** `beginDrag`（Shift なら押し出し、Shift + Ctrl ならスライド = T5）してから、今の点で `updateDrag`
- `finishTool`: `pendingDrag` が残っていたら（生きなかった）タップ扱い。`selector.click(p, e)` に渡す。`drag.label !== "押し出し"` の特例は消す
- しきい値は `gestures.ts` から export（`TAP_MOVE`、`TOOL_MOVE`、`TAP_DURATION`）して使う。新しい定数を作らない
- `uvMode.ts` の `beginDrag` も同じ形に（2D のドラッグ）

通し確認: `17` の 3.3 の 3 項目。ダブルタップは `pointerType: "pen"` で 2 回 `dispatchEvent`、2 回目を 6px ずらす。

## T4. マニピュレータのボタン（`17` の 4 章）

- `state.ts`: `manipSize = 1`（`localStorage` の `macbeth.manipSize` から読む）、`pivot: Vector3 | null`（ワールド。`select()` と `comp` の変更で null に）、`pivotEdit = false`
- `manipulator.ts`: `scaleAt` に `manipSize` を掛ける（`ManipulatorHost` に `manipSize()` を足す）。`pivotEdit` のときは移動の矢印と中心だけ、色は黄緑
- `app.ts`:
  - `pivotWorld()`: `state.pivot` があればそれを返す
  - `startTool`（T3 の生きた時点）: `pivotEdit` なら `state.pivot` を動かすドラッグ。メッシュは触らず、履歴も取らない。スナップは効く
  - `beginGestureTransform`: `pivotEdit` なら false
  - ツール列「変形」に `ICONS.pivot` のボタン。タップ = `pivotEdit` 切替（`aria-pressed`）。長押し = `manipulatorMenu()`（北 ピボットを移動 / 北東 選択の中心へ戻す / 東 大きく / 西 小さく / 南 初期設定に戻す）
  - キー: `d` / `Insert` で `pivotEdit`、`+` `=` で ×1.25、`-` で ÷1.25。0.5〜2.0 に丸める
  - HUD のモード行に「ピボット編集」
- `panels.ts`: 「表示」区画にスライダー「マニピュレータの大きさ」（0.5〜2.0、0.05）
- UV モードのツール列には出さない

通し確認: `17` の 4.4 の 2 項目。

## T5. スライド（`17` の 5 章）

### core

`src/core/slide.ts` に `slideRails` と `slideVertices`（`17` の 5.2 の署名）。`src/core/index.ts` から export。

vitest `tests/slide.test.ts`: S1（ループを t = 0.5 → 中点、t = 0 → 元）、S2（全部選択 → 動かない）。

### app

- `tools/transform.ts`: `DragState.kind` に `"slide"` を足す。`beginSlide(...)` で `base`（positions の複製）、`rails`、基準頂点、対称のペアを控える。`updateSlide(drag, object, p, toScreen)` で向きの選択と `t` を決めて `slideVertices` を呼ぶ
- `startTool`（T3 の生きた時点）: 移動のハンドル、コンポーネントモード、選択あり、**Shift + Ctrl** ならスライド。Shift だけなら押し出し（今のまま）
- 対称編集: 鏡側の頂点にも同じ `t` で、鏡側のレールを選ぶ（`mirrorPairs` で相手を取り、相手のレールは鏡映した向きで選ぶ）
- HUD: `スライド <kbd>0.35</kbd>`。履歴ラベル「スライド」

通し確認: `17` の 5.4 の項目。

## T6. UV の取り込み（`17` の 1 章）

### core

- `recipe.ts`: `UvRecipe.base: Float32Array | null`、`emptyRecipe()` は `base: null`、`cloneRecipe` は複製
- `recipeFromMesh(mesh): UvRecipe`（`17` の 1.2）
- `seamsFromUv(mesh, eps = 1e-6): Set<EdgeKey>`（`charts.ts` か新しい `seams.ts`）
- `recompute`: `"none"` は `base` を土台にする。`base` が null なら今までどおり `map1`（後方互換）
- `sewInBase(mesh, base, edges: Iterable<EdgeKey>): void`（両側のコーナー UV を中点へ）
- `reconcile`: `"none"` なら `base` を `map1` で取り直し、`manual` を空に、`seams` に `seamsFromUv` を足す。戻り値に `rebased: boolean`
- `io/mbz.ts`: `base` の読み書き（positions と同じ方法）。無ければ null

vitest: U10 / U11 / U12（`17` の 1.4）。既存の U1〜U9 は `emptyRecipe()` を使っているので変えない。

### app

- `enterUv`: `emptyRecipe()` → `recipeFromMesh(object.mesh)`。初回だけトースト「UV を取り込んだ · 島 n」
- `uvMode.unfold()`: `method` が `"none"` なら `"lscm"` に変えてから recompute（履歴ラベル「展開」）
- `uvMode.cutOrSew(false)`: `"none"` なら `sewInBase` も呼ぶ
- オプションパネルの「ソルバー」の初期表示を `method` に合わせる（無ければ足す: LSCM / 投影 / なし の segmented）
- `markTopologyChanged` の戻り値に `rebased` が付くので、トーストの文言に「UV の土台を取り直した」

通し確認: 立方体で UV モードに入る → 島 6、各島の境界箱が 0〜1 の正方形（±1e-4）。展開を押す前後で `map1` が変わらない（押す前）。

## T7. UV のメニューと単位ごとのカット / ソー、UV のスナップ（`17` の 2 章と 7.4）

- `uvSelectMenu`: 南東 カット、南西 ソー
- `uvEditMenu`: `17` の 2.2 の表。北 / 北東 / 東 は固定。C2 / C3 の項目は `todo()` のトースト
- `uvMode.cutOrSew(cut)`: `17` の 2.3 の単位ごとの意味。選択が空ならトースト
- UV のツール列に「スナップ」（T2 のボタンと同じ見た目。種類はグリッドと UV 頂点だけ）。`uvMode` のドラッグに寄せを足す（基準コーナーの行き先を寄せ、選択全体を同じ差で動かす）
- オプションパネル（UV）「スナップ」: 刻み 1/8・1/16・1/32

通し確認: 立方体で面を 1 つ選んで UV モード → 編集メニュー（シェル）のカット → 島 7。ソー → 島 6。UV グリッド 1/8 で島を 0.07 ずらす → 0.125 の倍数。

---

## 決めてあること（追加分）

`13` の 1 章、`14` の 5 章、`16` の 5 章に加えて、`17` の 9 章。

## やらないこと

`17` の 10 章。加えて:

- しきい値の変更、CSS の見た目の変更（ボタンの追加と `cmod` の状態名の変更は除く）
- `gestures.ts` の判定の変更（T3 は app 側で完結させる）
- C2 / C3 の中身（メニューの枠だけ）

## 報告

`13` の 4 章と同じ。**T7 の後に必ず一度止まる。** 落ちる合格条件があれば、緩める前に何が落ちたかを報告する。

---

## 実装の報告（Opus、2026-09-08）

T1〜T7 すべて済。core のテスト **147 件**、通し確認 **46 項目**。設計と変えたところと、判断が要った点だけ書く。

### 設計と変えたところ

- **スライドは `tools/transform.ts` ではなく `app.ts` に置いた。** 指示書は `DragState.kind` に `"slide"` を足す形だったが、レールの選択は画面の向きで決まる（`17` の 5.1）ので、`updateDrag` に画面の向きを持ち込むことになる。`transform.ts` は「軸とピボットだけを知る」層のままにしたかったので、ピボット編集（T4）と同じく app 側の独立したドラッグにした。core（`slide.ts`）の署名は指示書どおり
- **ピボットの移動はタップ保護を通さない。** メッシュも履歴も触らないので、掴み損ねても何も壊れない。待たせると「押した瞬間から動かない」感触になるため、その場で始める
- **`reconcile` の戻り値に `rebased` を足した。** 指示書どおりだが、`markTopologyChanged` の戻り値の型も変わるので、呼び出し側（ターゲットウェルドとベベルのトースト）に「UV の土台を取り直した」を足してある
- **シェル単位のカットは 3D の面選択を見る。** `17` の 2.3 は「選んだ面と選んでいない面の間の辺」だが、2D のシェル選択は島まるごとなので、それだけだと「中と外の境」が無く何も切れない。3D で面を選んでいればそれを使い、無ければ島ぜんぶを対象にする（ソーは島の中の切れ目を縫うので従来どおり効く）。**Maya でも UV のカットは面かエッジを選んで使うので、これで筋は通っている**
- **オプションパネルの UV 区画は「展開」と「スナップ」だけ**にして、モデリング側の区画は出さないようにした（UV モードで「押し出し距離」や「ミラー軸」が出ても使えないため）

### 判断が要った点

- **`method: "none"` の土台を `base` に分けたのは、二重乗せを止めるためだけではない。** C1 の実装は `map1`（= 前回の出力）を土台にしていたので、`recompute` を呼ぶたびに `manual` が積み上がっていた。島を 0.07 動かして展開を 3 回押すと 0.21 動く。U11 の 2 つめのテストがこれを見ている
- **タップ保護の起点は「押した点」。** 生きた点を起点にすると、指を離すまでのずれが残って選択が指からずれたままになる。押した点を起点にすると最初の 1 フレームで最大 12px 飛ぶが、指と一致するほうが操作としては正しい
- **`+` / `-` キーはマニピュレータの大きさに使った。** Maya と同じ割り当て。テンキーの `+` も同じキー名で来る
- **スナップの「サーフェス」は自分のオブジェクトを常に外す。** コンポーネントモードでも外す（自分の面に貼り付いて動かなくなるため）。`Picker.pickSurface` に除外の口を足した

### 通し確認に足した項目（6 つ）

| 項目 | 見ているもの |
|---|---|
| SHF は 2 段階で、使っても消えない | 面を 2 枚続けて足せる。HUD に SHF が出る |
| スナップボタンで頂点に乗る（CTL とは無関係） | ボタンで効く。CTL だけでは効かない |
| サーフェススナップで別オブジェクトの面に乗る | 板の平面（y = 2.4）にぴたりと乗る |
| ペンの軽いタップではマニピュレータが動かない | 6px の 2 連タップで頂点が 1e-6 も動かず、ダブルタップはシェル選択になる。SHF タップで押し出さない |
| マニピュレータの大きさとピボットの移動 | ×1.5625 → 初期化で ×1。ピボットだけ動いてメッシュは動かず、そのまわりで回る |
| SHF + CTL のドラッグでループがスライドする | 円柱の中央の輪が上へ。面数は変わらず、半径も変わらない |
| UV モードに入っても今の UV は変わらない | 立方体で島 6・切れ目 12 本・各島が 0〜1 の正方形。展開で LSCM に変わる |
| UV のカット / ソーと 1/8 グリッドスナップ | 板で 1 島 → カット 2 島 → ソー 1 島。島を引くと U が 1/8 の倍数に乗る |

### 次

C2（自動の切れ目）は `16` の 3 章のまま。この指示書の分をユーザーが触ってから。
