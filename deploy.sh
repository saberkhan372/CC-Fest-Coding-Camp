#!/usr/bin/env bash
# Sync shared root files from source → docs, then commit and push.
# Run: ./deploy.sh
# Or with a custom message: ./deploy.sh "your commit message"

set -e

SRC="cc-fest-coding-camp-pages"
DST="docs"

echo "Syncing $SRC → $DST ..."
for f in "$SRC"/*.css "$SRC"/*.js "$SRC"/*.html; do
  [ -f "$f" ] || continue
  cp "$f" "$DST/$(basename "$f")"
  echo "  copied $(basename "$f")"
done

if git diff --quiet -- "$DST"; then
  echo "Nothing changed in $DST — already up to date."
  exit 0
fi

MSG="${1:-Sync docs with source}"
git add "$DST"/*.css "$DST"/*.js "$DST"/*.html
git commit -m "$MSG"
git push origin main
echo "Done. Pushed to origin/main."
