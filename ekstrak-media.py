#!/usr/bin/env python3
"""Ekstrak audio kata dari berkas .apkg Kaishi ke folder media/.

Aplikasi ini tidak menyertakan berkas audio karena hak ciptanya milik
sumber aslinya (NHK, JLPT Tango, dll). Skrip ini membangunnya sendiri dari
berkas deck yang Anda miliki.

Cara pakai:
    python ekstrak-media.py                     (cari .apkg di folder ini / folder induk)
    python ekstrak-media.py "D:\\path\\deck.apkg"
    python ekstrak-media.py --out media_test    (tujuan lain)

Hasil: media/m<indeks>.mp3 sesuai yang dirujuk deck.js.
"""

import argparse
import glob
import json
import os
import sys
import zipfile

HERE = os.path.dirname(os.path.abspath(__file__))
DECK_JS = os.path.join(HERE, "deck.js")

try:
    from compression import zstd  # Python 3.14+
except ImportError:  # pragma: no cover
    try:
        import zstandard as zstd  # pip install zstandard
    except ImportError:
        zstd = None


def is_zstd(data):
    return len(data) >= 4 and data[:4] == b"\x28\xb5\x2f\xfd"


def decompress(data):
    if not is_zstd(data):
        return data
    if zstd is None:
        raise SystemExit(
            "Berkas ini memakai kompresi zstd. Python Anda belum mendukungnya.\n"
            "  - Pakai Python 3.14+, atau\n"
            "  - pip install zstandard"
        )
    if hasattr(zstd, "decompress"):
        return zstd.decompress(data)
    return zstd.ZstdDecompressor().decompress(data)


def find_apkg(explicit=None):
    if explicit:
        return explicit if os.path.exists(explicit) else None
    for pattern in (os.path.join(HERE, "*.apkg"), os.path.join(os.path.dirname(HERE), "*.apkg")):
        hits = glob.glob(pattern)
        if hits:
            return hits[0]
    return None


def load_indexes():
    with open(DECK_JS, encoding="utf-8") as f:
        raw = f.read()
    deck = json.loads(raw[raw.index("{"): raw.rindex("}") + 1])
    idx = sorted({w["a"] for w in deck["words"] if w.get("a") is not None})
    return deck, idx


def main():
    try:
        sys.stdout.reconfigure(encoding="utf-8")
    except Exception:
        pass

    ap = argparse.ArgumentParser(description="Ekstrak audio dari .apkg ke media/")
    ap.add_argument("apkg", nargs="?", help="lokasi berkas .apkg")
    ap.add_argument("--out", default="media", help="folder tujuan (default: media)")
    args = ap.parse_args()

    if not os.path.exists(DECK_JS):
        print("! deck.js tidak ditemukan. Jalankan skrip ini di folder aplikasi.")
        return 1

    deck, indexes = load_indexes()
    print("Deck   : %s" % deck.get("deck", "Kaishi"))
    print("Audio  : %d berkas dirujuk deck.js" % len(indexes))

    apkg = find_apkg(args.apkg)
    if not apkg:
        print("\n! Berkas .apkg tidak ditemukan.")
        print("  Taruh berkas 'Kaishi ... .apkg' di folder ini (atau folder induknya),")
        print("  atau jalankan: python ekstrak-media.py \"D:\\path\\ke\\deck.apkg\"")
        return 1
    print("Sumber : %s (%.1f MB)" % (apkg, os.path.getsize(apkg) / 1048576))

    out_dir = args.out if os.path.isabs(args.out) else os.path.join(HERE, args.out)
    os.makedirs(out_dir, exist_ok=True)

    written = 0
    total = 0
    missing = []
    with zipfile.ZipFile(apkg) as zf:
        names = set(zf.namelist())
        for i, idx in enumerate(indexes):
            entry = str(idx)
            if entry not in names:
                missing.append(idx)
                continue
            data = decompress(zf.read(entry))
            dst = os.path.join(out_dir, "m%d.mp3" % idx)
            with open(dst, "wb") as f:
                f.write(data)
            written += 1
            total += len(data)
            if (i + 1) % 300 == 0:
                print("  %d/%d berkas..." % (i + 1, len(indexes)))

    print("\nSelesai.")
    print("  Ditulis : %d berkas (%.1f MB)" % (written, total / 1048576))
    if missing:
        print("  Tidak ada di .apkg: %d (%s...)" % (len(missing), missing[:5]))
    print("  Folder  : %s" % out_dir)
    print("\nBuka index.html — audio kata akan berbunyi saat kata diklik.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
