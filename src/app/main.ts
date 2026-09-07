/**
 * アプリの入口。まだシェルの移植前なので、core が動くことの確認だけを表示する。
 *
 * 次の作業（docs/10 の 1 の続き）: プロトタイプの描画・入力・UI を
 * app/ 配下のモジュールとしてここへ移す。core は既に切り離してある。
 */
import { Document, PRIMITIVE_ORDER, PRIMITIVES, defaultParams, catmullClark } from "../core/index.js";

const doc = new Document();
const cube = doc.addObject("cube");
cube.params.sdW = cube.params.sdH = cube.params.sdD = 2;
cube.rebuild();

const rows = PRIMITIVE_ORDER.map((id) => {
  const s = PRIMITIVES[id].build(defaultParams(id)).stats();
  return `<tr><td>${PRIMITIVES[id].label}</td><td>${s.vertices}</td><td>${s.edges}</td><td>${s.faces}</td></tr>`;
}).join("");
const smoothed = catmullClark(cube.mesh).stats();

document.body.innerHTML = `
<style>
  body{margin:0;background:#20242a;color:#d3d9df;font:13px/1.6 "IBM Plex Sans",system-ui,sans-serif;padding:28px}
  h1{font-size:18px;margin:0 0 4px}
  p{color:#8a939d;margin:0 0 18px}
  table{border-collapse:collapse;font-variant-numeric:tabular-nums}
  th,td{border:1px solid #2c3238;padding:5px 12px;text-align:right}
  th:first-child,td:first-child{text-align:left}
  a{color:#4f9fd1}
</style>
<h1>macbeth core</h1>
<p>ジオメトリコアの土台。UI の移植はこれから（docs/10）。</p>
<table>
  <tr><th>プリミティブ</th><th>頂点</th><th>エッジ</th><th>面</th></tr>
  ${rows}
</table>
<p style="margin-top:18px">2 分割キューブをスムース: ${smoothed.vertices} 頂点 / ${smoothed.faces} 面</p>
<p><a href="prototype/">操作感プロトタイプを開く</a></p>
`;
