#!/usr/bin/env sh
# ビルドしたシェルを app/ に置く。
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
# ディレクトリの URL で開けるように、入口の名前を index.html にする
mv app/app.html app/index.html
# 入口の名前が変わるので、ホーム画面から開いたときの起動先も合わせる
sed -i 's#"start_url": "./app.html"#"start_url": "./"#' app/manifest.webmanifest

echo "app/ を更新しました → ${REPO_PATH}"
