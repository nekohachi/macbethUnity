#!/usr/bin/env sh
# ビルドしたアプリを app/ に置く。入口は web/index.html。
# リポジトリ直下の index.html は app/ への転送ページなので、ここでは触らない。
#
# Pages の Source が「Deploy from a branch」のままでも見られるようにするための
# 手動公開。Source を「GitHub Actions」に切り替えたらこの手順は要らなくなり、
# .github/workflows/pages.yml が push のたびに出してくれる。
#
#   sh scripts/publish.sh
#   → https://<user>.github.io/<repo>/app/
set -e
cd "$(dirname "$0")/.."

REPO_PATH="${MACBETH_PAGES_PATH:-/macbethUnity/app/}"

MACBETH_BASE="$REPO_PATH" npm run build

rm -rf app
mkdir -p app
cp -r dist/. app/
# ソースマップはリポジトリに置かない（3MB 以上あり、公開版では使わない）
find app -name '*.map' -delete
# プロトタイプ（操作感の検証用・単体ページ）も一緒に置いておく
mkdir -p app/prototype
{
  printf '%s\n' '<!doctype html>' '<html lang="ja">' '<head>' '<meta charset="utf-8">' \
    '<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover, user-scalable=no">' \
    '<meta name="apple-mobile-web-app-capable" content="yes">' \
    '<meta name="mobile-web-app-capable" content="yes">' \
    '<style>html,body{margin:0}img{max-width:100%}[hidden]{display:none!important}</style>' \
    '</head>' '<body>'
  cat prototype/modeling-ui-prototype.html
  printf '%s\n' '</body>' '</html>'
} > app/prototype/index.html

echo "app/ を更新しました → ${REPO_PATH}"
