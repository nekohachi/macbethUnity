# Opus 作業指示書 #04: UV モード（C1 → C2 → C3）

作成: 設計担当（Fable）。実装担当（Opus）向け。
設計は `15-uv-design.md`。**迷ったら 15 を読む。この文書は手順だけ。**
前提と作業の流れ（vitest → app → 通し確認に 1 項目 → `publish.sh` → push）は `13` の 0 章のまま。

---

## 0. Phase B の結果

B1〜B7 すべて済。core のテスト 122 件、通し確認 37 項目。ユーザーの実機確認: 3 本指の操作、長押しメニュー、B4〜B7 まで問題なし。**しきい値は変えない。**

UV モードの合図はこの指示書で出す。

---

## 1. 置き場所

```
src/core/uv/
  recipe.ts      UvRecipe の型、recompute、reconcile、島の指紋
  charts.ts      切れ目で島に分ける。境界、三角形分割（解くときだけ）
  lscm.ts        LSCM。疎行列 + 共役勾配法
  projection.ts  平面投影
  distortion.ts  伸びと角度差の評価
  autoSeams.ts   経験則の切れ目（C2）
  pack.ts        テクセル密度そろえと棚詰め（C3）
  ops.ts         直線化、整列、反転、回転、格子化、マージ、分離、対称（C3）
src/app/uv/
  uvView.ts      2D ビュー（OrthographicCamera、チェッカー、島の描画、選択の色）
  uvSelect.ts    UV 頂点 / エッジ / シェルの選択と 3D との同期
  uvTools.ts     ツイーク、マニピュレータ、カット / ソー / ピン
tests/uv.test.ts   U1〜U9
```

`SceneObject` に `uv: UvRecipe | null` を足す。`markTopologyChanged()` の中で `reconcile` を呼ぶ。`.mbz` の書き出し / 読み込みに recipe を足す（`io/mbz.ts`。無ければ null）。

---

## 2. タスク C1: 切れ目を引いて開く

### core

```ts
// recipe.ts
export type EdgeKey = string;                 // mesh.ts の edgeKey と同じ "a_b"
export type CornerKey = string;               // "face:index"
export interface UvRecipe {
  seams: Set<EdgeKey>;
  pins: Map<CornerKey, [number, number]>;
  method: "lscm" | "projection" | "none";
  packing: { margin: number; allowRotate: boolean; texelDensity: number | null };
  manual: Map<string, Map<CornerKey, [number, number]>>;   // 島の指紋 → コーナーの差分
  autoSeamParams: { angle: number; useHardEdges: boolean; useCreases: boolean; usePolygroups: boolean; symmetric: boolean };
}
export function emptyRecipe(): UvRecipe;
export function chartFingerprint(faces: number[], seamsOnBoundary: EdgeKey[]): string;   // 面の集合と切れ目の集合のハッシュ。並び順に依存しない
export function recompute(mesh: Mesh, recipe: UvRecipe, options?: { skipPack?: boolean }): { charts: Chart[]; distortion: Distortion };  // mesh.uvSets["map1"] を書く
export function reconcile(recipe: UvRecipe, mesh: Mesh): { droppedSeams: number; droppedIslands: number };
export function recordManual(recipe: UvRecipe, chart: Chart, deltas: Map<CornerKey, [number, number]>): void;

// charts.ts
export interface Chart { faces: number[]; corners: CornerKey[]; boundarySeams: EdgeKey[]; fingerprint: string }
export function buildCharts(mesh: Mesh, seams: Set<EdgeKey>): Chart[];
export function chartTriangles(mesh: Mesh, chart: Chart): { tri: Uint32Array; cornerOfLocal: number[] };  // 島の頂点を 0.. に詰め直す。切れ目で頂点は分かれる

// lscm.ts
export function lscm(positions: Float32Array, tri: Uint32Array, pins: Map<number, [number, number]>): Float32Array;  // 2 × 頂点数
export function conjugateGradient(...)  // 正規方程式。相対残差 1e-6 か 2000 反復

// projection.ts
export function projectChart(positions: Float32Array, tri: Uint32Array): Float32Array;

// distortion.ts
export interface Distortion { maxStretch: number; meanAngleError: number; perFace: Float32Array }
export function measure(mesh: Mesh, chart: Chart, uv: Float32Array): Distortion;
```

要点:

- **切れ目で頂点が分かれる。** 島の中で同じ 3D 頂点でも、切れ目を挟めば別の UV 頂点。`chartTriangles` は「面のコーナー → 島内の UV 頂点番号」の対応を作る。切れ目でない辺を共有するコーナーは同じ UV 頂点にまとめる
- LSCM のピンは島内の UV 頂点番号で受ける。ピンが 2 つ未満なら最も離れた 2 頂点を (0,0)、(1,0) に
- n-gon は扇で三角形分割して解き、結果はコーナーに書く
- `recompute` は `options.skipPack` が無ければ C3 の pack を呼ぶ。C1 の時点では pack は「島を横に並べるだけ」の仮実装でよい（C3 で置き換える）
- **決定的に。** Map / Set の走査順に結果が依存しないよう、面番号・頂点番号でソートしてから処理する

### app

- **2D ビュー。** `uvView.ts`。OrthographicCamera で 0〜1 を映す。チェッカー（8×8）と枠、外側にグレーの格子。島は `mesh.uvSets["map1"]` から三角形を張って描く（面の色は 3D と同じ材質の平板版）。選択の色は 3D と同じ（オレンジ）
- **レイアウト。** `layout.ts` に UV モードの分割を足す。横持ちは左右、縦持ちは上下。境目のドラッグ。上段に「2D / 両方 / 3D」
- **選択。** `uvSelect.ts`。UV 頂点 / UV エッジ / UV シェル。同じ位置に重なった UV 頂点は 1 つとして扱う。マーキングメニューの中身は `15` の 6.2。3D ↔ 2D の同期は面単位
- **ツール。** ツイーク（1 本指ドラッグ → 差分を `manual` へ）、マニピュレータ（3D と同じものを 2D に置く。移動 / 回転 / スケールの結果も `manual`）、カット / ソー / ピン（編集メニュー）、展開（recompute）
- **3 本指。** つまむ = スケール、上下 = V、左右 = U。3D の `applyGestureTransform` と同じ形で 2D 版を書く。閾値は同じ
- **チェッカー表示**を 3D の表示切替に足す（モデリングモードでも使える）
- HUD に歪みの数値（最大伸び、平均角度差）を出す
- 履歴: recipe の変更も `History` のスナップショットに入れる（`SceneObject.uv` を深く複製）

### 通し確認に足す（C1）

- UV モードに入ると 2D ビューが出て、立方体の島が描かれている（三角形の数 > 0）
- 立方体で 7 本の切れ目をカットして展開 → 島が 6 つ、各島の伸びが 1.00±0.01
- 島を 1 つドラッグで動かす → その島の UV だけ動く。展開をもう一度押しても動かした分が残る（差分）
- 3D で面を選んで UV モードに入る → その島が選ばれている

### 報告

**C1 が終わった時点で報告する。ユーザーが触って操作感を決める。** C2 に進むのはフィードバックの後。

**実装時の報告（Opus）:**

- **固定する 2 点は (0,0) と (1,0) にして、大きさは後で面積比でそろえた**（`normalizeScale`）。設計どおり 3D の距離で固定すると、開いたときに離れる 2 点を無理に近づけることになって島全体が縮む。筒で伸びが 1.31 になったのがそれ。面積を合わせる形にすると、展開できる面（立方体の展開図、円筒）は伸びが 1.00 になる
- **U1 の「立方体に十字の切れ目 7 本」は 1 つの島になる**（6 枚ではない）。面のつながりの全域木が 5 本残り、切れ目が 7 本。テストは「7 本 → 1 島・伸び 1.00」と「全部の辺を切る → 6 島・伸び 1.00」の 2 本にした
- **2D のマニピュレータは置いていない。** 移動は島を直接ドラッグ、拡大縮小は指 3 本のつまみ、回転は編集メニューの 90° 回転で届く。任意角の回転だけが手つかず。ここは触っていただいた上で判断したい
- 3D の面に UV を貼れるようにした（`surfaceGeometry` に uv 属性）。表示切替の「チェッカー」（キーは `8`）で歪みと継ぎ目が見える
- UV の予定表（`STUBS.uv`）は消した

---

**ユーザーのフィードバック（2026-09-08）:** 7 点。設計は `17-c1-feedback-design.md`、作業は `18-opus-task-05.md`。**C2 は 18 の後。** 18 で `recipeFromMesh` と `base` が入るので、C2 の「自動 UV」は `seams` を作り直して `method` を `"lscm"` にし、`manual` を捨てて recompute する形になる（`"none"` からの移行を含む）。

## 3. タスク C2: 自動の切れ目

```ts
// autoSeams.ts
export function autoSeams(mesh: Mesh, params: UvRecipe["autoSeamParams"], smoothAngle: number): Set<EdgeKey>;
```

`15` の 4 章のとおり。順に:

1. 角度（二面角 > angle）、ハードエッジ（`smoothAngle` で判定。3D の表示と同じ規則）、クリース、ポリグループ境界を切れ目に
2. できた島のうち大きすぎるもの（面数 > 全体 / 3、または法線のばらつき > 120°）を、法線の最も離れた 2 面から育てて分ける
3. 閉じた島（切れ目が輪にならない）に必ず 1 本通す。球は極から極へ 1 本
4. 対称なら X で鏡映して和を取る

編集メニュー（シェル）「自動 UV」: `autoSeams` → `manual` を全部捨てる → recompute。オプションパネルに角度と 4 つのチェック。

通し確認: 球のプリミティブで「自動 UV」→ すべての島が開けている（NaN 無し）、最大伸び < 2.0。

---

## 4. タスク C3: パッキングと便利機能

```ts
// pack.ts
export function equalizeTexelDensity(charts: Chart[], uvs: Float32Array[], areas3d: number[], target: number | null): void;
export function shelfPack(boxes: Array<{ w: number; h: number }>, margin: number, allowRotate: boolean): Array<{ x: number; y: number; rotated: boolean; scale: number }>;

// ops.ts（すべて UV 空間の純粋な関数。結果との差を manual に入れるのは app）
export function straightenBorder(...)   // 島の境界を軸に沿わせる（Maya の Straighten UV Border）
export function straightenEdges(...)    // 選んだエッジ列を直線に（AriUVRatio の考え方: 直線化してから比率を合わせる）
export function alignU / alignV(...)    // 平均 / 最小 / 最大
export function flipU / flipV / rotate90(...)
export function gridding(...)           // 四角形の帯を格子に（AriUVGridding の考え方: 帯の並びを取って、行と列に等間隔で置く）
export function mergeUvs / splitUvs(...)
export function symmetrizeUv(...)       // 対称 X の相手へ写す
```

編集メニューの中身は `15` の 6.3。オプションは `15` の 6.5。

通し確認: 「整列」で全島が 0〜1 の中に入り、境界箱が重ならない。「テクセル密度をそろえる」で島ごとの面積比が 1% 以内。

---

## 5. 決めてあること（追加分）

`13` の 1 章、`14` の 5 章に加えて:

| 項目 | 決め |
|---|---|
| UV は recipe から再計算。手の編集は差分 | `15` の 2 章 |
| 自動 UV は即採用 | ユーザー決定 |
| 差分は島単位。切れ目が変わった島だけ捨てる | ユーザー決定 |
| ソルバーは LSCM。`unwrapChart` に差し替え口 | ユーザー決定 |
| 参考は Maya の UV エディタと AriUV 系 MEL の**機能の考え方**。コードは見ない | `01` |
| 2D のジェスチャは 3D と同じ。しきい値も同じ | `12` |
| xatlas は E の後 | `12` |

## 6. やらないこと

- 機械学習の切れ目予測
- UDIM
- UV セットの複数編集（切替の口だけ。`map1` だけで動く）
- ABF++ / SLIM（C4）
- しきい値の変更、CSS の見た目の変更

## 7. 報告

`13` の 4 章と同じ。**C1 の後に必ず一度止まる。** C2、C3 はその後のフィードバックを受けてから。U1〜U9 で落ちるものがあれば、合格条件を緩める前に何が落ちたかを報告する。
