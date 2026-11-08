#!/usr/bin/env python3
"""Pasang kunci API ke ai-config.json tanpa perlu mengedit JSON manual.

Jalankan:  pasang-kunci.cmd   (atau python pasang-kunci.py)
"""

import json
import os
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
CFG = os.path.join(HERE, "ai-config.json")
CONTOH = os.path.join(HERE, "ai-config.contoh.json")

CONTOH_GEMINI = {
    "provider": "gemini",
    "base_url": "https://generativelanguage.googleapis.com/v1beta",
    "model": "gemini-3.5-flash",
}


def main():
    try:
        sys.stdout.reconfigure(encoding="utf-8")
    except Exception:
        pass

    cfg = {}
    if os.path.exists(CFG):
        try:
            with open(CFG, encoding="utf-8") as f:
                cfg = json.load(f)
        except (OSError, ValueError):
            cfg = {}
    if not cfg.get("provider"):
        cfg.update(CONTOH_GEMINI)

    print()
    print("  Memasang kunci API untuk teks bacaan")
    print("  ------------------------------------")
    print("  Penyedia : %s" % cfg.get("provider"))
    print("  Model    : %s" % cfg.get("model"))
    print()
    print("  Kunci gratis (Gemini): https://aistudio.google.com/apikey")
    print("  - login dengan akun Google")
    print("  - klik 'Create API key' lalu salin (bentuknya AIza...)")
    print()

    key = input("  Tempel kunci API di sini: ").strip()
    if not key:
        print("\n  Dibatalkan — kunci kosong.")
        return 1
    if len(key) < 20 or " " in key:
        print("\n  ! Kunci terlihat tidak valid. Salin ulang tanpa spasi.")
        return 1

    cfg["api_key"] = key
    cfg.pop("_petunjuk", None)
    with open(CFG, "w", encoding="utf-8") as f:
        json.dump(cfg, f, ensure_ascii=False, indent=2)
        f.write("\n")

    print("\n  Tersimpan di: %s" % CFG)
    print("  Langkah berikutnya:")
    print("    1. tutup jendela jalankan-server.cmd (kalau sedang terbuka)")
    print("    2. jalankan lagi jalankan-server.cmd")
    print("    3. buka teks.html -> 'Buat teks' -> Sumber: AI -> Buat")
    return 0


if __name__ == "__main__":
    sys.exit(main())
