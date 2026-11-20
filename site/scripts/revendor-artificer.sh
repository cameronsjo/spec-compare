#!/usr/bin/env bash
# Re-vendor Artificer design-system text files into the SPA.
#
# Mirrors the text source files (CSS/JS/JSON) from the pinned package
#   node_modules/@cameronsjo/artificer/src/
# into site/public/artificer/. The package version is the single source of
# truth (site/package.json devDependency + package-lock.json) — bump there,
# `npm install`, and this script copies the new text files on the next
# pre{dev,build}. The generated text files are gitignored; the binary assets
# under assets/ (fonts, favicon, og-image) are tracked and NOT copied. A
# version can still change which fonts the CSS loads (0.28.0 swapped iA
# Writer Quattro for Bricolage Grotesque + Recursive), so after copying, the
# script fails if any url() asset the vendored CSS names is missing from
# public/artificer/, and prints the cp that fixes it. Ported from agentic-harnesses/scripts/revendor-artificer.sh;
# the only structural change is sourcing from node_modules instead of a gh
# pull, plus this app's site/scripts/ layout and the +artificer-tabs.js entry.
#
# Usage: scripts/revendor-artificer.sh   (wired to predev + prebuild)
set -euo pipefail

# site/ — this script lives at site/scripts/, so one level up is the app root.
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
SRC="${ROOT}/node_modules/@cameronsjo/artificer/src"
DEST="${ROOT}/public/artificer"

# Preflight: the pinned package supplies the source.
[ -d "$SRC" ] || {
  echo "error: ${SRC} not found — run 'npm install' to fetch the pinned @cameronsjo/artificer" >&2
  exit 1
}

FILES=(
  artificer.css
  artificer-whimsy.css
  artificer-whimsy.js
  artificer-theme.js
  artificer-icons.js
  artificer-focus.js
  artificer-tabs.js
  print.css
  tokens.json
)

# Smallest real source file is ~1.9 KB; a floor well under that rejects an
# empty/truncated copy. (A missing source file already fails the cp under -e.)
MIN_BYTES=200
tmp=""
trap 'rm -f "${tmp:-}"' EXIT

echo "Re-vendoring ${#FILES[@]} files from ${SRC} -> ${DEST}"
for f in "${FILES[@]}"; do
  tmp="$(mktemp)"
  cp "${SRC}/${f}" "$tmp"
  size=$(wc -c < "$tmp" | tr -d ' ')
  if (( size < MIN_BYTES )); then
    echo "  ! ${f}: copied ${size}b (< ${MIN_BYTES}b floor) — aborting" >&2
    exit 1
  fi
  mv "$tmp" "${DEST}/${f}"
  echo "  ok ${f} (${size} bytes)"
done

# Every relative url() asset the vendored CSS names must exist in DEST; the
# tracked binaries are not copied, so a version that changes them would
# otherwise fall back to system fonts with no error.
missing=0
while IFS= read -r asset; do
  [ -n "$asset" ] || continue
  if [ ! -f "${DEST}/${asset}" ]; then
    echo "  ! missing ${asset}, referenced by the vendored CSS — fix: cp '${SRC}/${asset}' '${DEST}/${asset}' && git add it" >&2
    missing=1
  fi
done < <(perl -ne 'while (/url\(\s*["\x27]?(?!data:|https?:|\/)([^"\x27)?#]+)/g) { print "$1\n" }' "${DEST}"/*.css | sort -u)
if (( missing )); then
  echo "error: vendored CSS references assets not in ${DEST}" >&2
  exit 1
fi

echo "Done. --art-version in new artificer.css:"
grep -m1 -- '--art-version' "${DEST}/artificer.css" || echo "  (token not found!)"
