#!/bin/sh
# prototype/modeling-ui-prototype.html（アーティファクト用・doctype なし）から
# ルートの index.html（GitHub Pages / 直開き用・単体ページ）を生成する。編集後に実行すること。
# 新しいシェルの移植が済んだら、index.html は Vite のビルド成果に置き換わる。
cd "$(dirname "$0")/.." && python3 - <<'PY'
s=open('prototype/modeling-ui-prototype.html',encoding='utf-8').read()
wrap=('<!doctype html>\n<html lang="ja">\n<head>\n<meta charset="utf-8">\n'
      '<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover, user-scalable=no">\n'
      '<meta name="apple-mobile-web-app-capable" content="yes">\n'
      '<meta name="mobile-web-app-capable" content="yes">\n'
      '<style>html,body{margin:0}img{max-width:100%}[hidden]{display:none!important}</style>\n'
      '</head>\n<body>\n'+s+'\n</body>\n</html>\n')
open('index.html','w',encoding='utf-8').write(wrap)
print("index.html regenerated")
PY
