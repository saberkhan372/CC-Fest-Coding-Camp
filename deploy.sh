#!/usr/bin/env bash
# Sync source pages to docs, then commit and push.
# Run: ./deploy.sh
# Or with a custom message: ./deploy.sh "your commit message"

set -e

SRC="cc-fest-coding-camp-pages"
DST="docs"

echo "Regenerating catalog data ..."
node scripts/generate-catalog-data.mjs

echo "Stamping homepage card metadata ..."
node scripts/stamp-index-card-metadata.mjs

echo "Stamping page descriptions ..."
node scripts/stamp-page-descriptions.mjs

echo "Stamping static fallbacks ..."
node scripts/stamp-static-fallbacks.mjs

echo "Stamping starter renderer cache keys ..."
node scripts/stamp-starter-renderer-cache.mjs

echo "Stamping branded topbars ..."
node scripts/stamp-brand-topbars.mjs

echo "Stamping branded topbar cache keys ..."
node scripts/stamp-brand-cache-keys.mjs

echo "Stamping projector-view loader ..."
node scripts/stamp-projector.mjs

echo "Stamping concept-bridge layout loader ..."
node scripts/stamp-bridge-layout.mjs

echo "Syncing root assets from $SRC to $DST ..."
for f in "$SRC"/*.css "$SRC"/*.js "$SRC"/*.html; do
  [ -f "$f" ] || continue
  cp "$f" "$DST/$(basename "$f")"
  echo "  copied $(basename "$f")"
done

for dir in tools concept-bridges sessions; do
  if [ -d "$SRC/$dir" ]; then
    echo "Syncing $dir/ ..."
    mkdir -p "$DST/$dir"
    if command -v rsync >/dev/null 2>&1; then
      rsync -a --delete "$SRC/$dir/" "$DST/$dir/"
    else
      rm -rf "$DST/$dir"
      mkdir -p "$DST/$dir"
      cp -R "$SRC/$dir/." "$DST/$dir/"
    fi
  fi
done

if [ -z "$(git status --porcelain -- "$SRC" "$DST" scripts deploy.sh)" ]; then
  echo "Nothing changed in $SRC, $DST, scripts, or deploy.sh - already up to date."
  exit 0
fi

MSG="${1:-Sync docs with source}"
git add "$SRC" "$DST" scripts deploy.sh
git commit -m "$MSG"
git push origin main
echo "Done. Pushed to origin/main."
