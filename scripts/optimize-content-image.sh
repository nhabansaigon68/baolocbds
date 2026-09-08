#!/bin/bash
set -e

if [ "$#" -ne 2 ]; then
  echo "Usage: ./scripts/optimize-content-image.sh <source> <destination.webp>"
  exit 1
fi

SOURCE="$1"
DEST="$2"
PYTHON=".venv-image/bin/python"

if [ ! -f "$SOURCE" ]; then
  echo "ERROR: source file not found: $SOURCE"
  exit 1
fi

if [ ! -x "$PYTHON" ]; then
  echo "ERROR: image virtual environment not found."
  echo "Run: python3 -m venv .venv-image && source .venv-image/bin/activate && python -m pip install pillow"
  exit 1
fi

case "$DEST" in
  *.webp) ;;
  *)
    echo "ERROR: destination must end with .webp"
    exit 1
    ;;
esac

mkdir -p "$(dirname "$DEST")"

"$PYTHON" - "$SOURCE" "$DEST" <<'PYCODE'
from pathlib import Path
from PIL import Image, ImageOps
import sys

source = Path(sys.argv[1])
dest = Path(sys.argv[2])

MAX_SIDE = 1200
QUALITY = 78

with Image.open(source) as img:
    img = ImageOps.exif_transpose(img)

    if img.mode not in ("RGB", "RGBA"):
        img = img.convert("RGB")

    width, height = img.size
    longest = max(width, height)

    if longest > MAX_SIDE:
        scale = MAX_SIDE / longest
        new_size = (
            round(width * scale),
            round(height * scale),
        )
        img = img.resize(new_size, Image.Resampling.LANCZOS)

    img.save(
        dest,
        format="WEBP",
        quality=QUALITY,
        method=6,
    )

print(f"PASS: optimized {dest}")
print(f"dimensions: {img.size[0]}x{img.size[1]}")
print(f"size: {dest.stat().st_size // 1024} KB")
PYCODE
