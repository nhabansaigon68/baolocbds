#!/bin/bash
set -e

if [ "$#" -ne 2 ]; then
  echo "Usage: ./scripts/optimize-content-image.sh <source> <destination>"
  exit 1
fi

SOURCE="$1"
DEST="$2"
TMP="/tmp/baoloc-image-$$.jpg"

if [ ! -f "$SOURCE" ]; then
  echo "ERROR: source file not found: $SOURCE"
  exit 1
fi

mkdir -p "$(dirname "$DEST")"

# Resize: cạnh dài tối đa 1200px, không upscale.
cp "$SOURCE" "$TMP"
sips -Z 1200 "$TMP" --out "$TMP.resized.jpg" >/dev/null

# JPEG web optimization.
sips -s format jpeg -s formatOptions 60 \
  "$TMP.resized.jpg" \
  --out "$DEST" >/dev/null

rm -f "$TMP" "$TMP.resized.jpg"

echo "PASS: optimized $DEST"
sips -g pixelWidth -g pixelHeight "$DEST"
ls -lh "$DEST"
