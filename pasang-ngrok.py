#!/usr/bin/env python3
"""Pasang Authtoken dan Static Domain Ngrok tanpa perlu mengedit JSON manual.

Jalankan:  pasang-ngrok.cmd   (atau python pasang-ngrok.py)
"""

import json
import os
import subprocess
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
CFG = os.path.join(HERE, "ngrok-config.json")
NGROK_BIN = os.path.join(HERE, "ngrok.exe")


def normalize_domain(d):
    d = (d or "").strip()
    if d.startswith("https://"):
        d = d[8:]
    elif d.startswith("http://"):
        d = d[7:]
    return d.rstrip("/")


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

    print()
    print("  ================================================================")
    print("    Pengaturan Ngrok (Akses Online Kaishi dari Mana Saja)")
    print("  ================================================================")
    print("  1. Daftar / Login gratis di : https://dashboard.ngrok.com/signup")
    print("  2. Ambil Authtoken Anda di  : https://dashboard.ngrok.com/get-started/your-authtoken")
    print("  3. Ambil Static Domain di   : https://dashboard.ngrok.com/domains")
    print("  ================================================================")
    print()

    curr_token = cfg.get("authtoken", "")
    curr_dom = cfg.get("domain", "")

    if curr_token:
        prompt_token = "  Tempel Authtoken [Enter = gunakan token lama]: "
    else:
        prompt_token = "  Tempel Authtoken di sini: "

    token = input(prompt_token).strip()
    if not token and curr_token:
        token = curr_token
    elif not token:
        print("\n  ! Authtoken tidak boleh kosong.")
        return 1

    if curr_dom:
        prompt_dom = f"  Tempel Static Domain [Enter = '{curr_dom}']: "
    else:
        prompt_dom = "  Tempel Static Domain (contoh: xxxx.ngrok-free.app): "

    domain = input(prompt_dom).strip()
    if not domain and curr_dom:
        domain = curr_dom
    elif not domain:
        print("\n  ! Static domain tidak boleh kosong.")
        return 1

    domain = normalize_domain(domain)

    cfg["authtoken"] = token
    cfg["domain"] = domain
    cfg.pop("_petunjuk", None)

    with open(CFG, "w", encoding="utf-8") as f:
        json.dump(cfg, f, ensure_ascii=False, indent=2)
        f.write("\n")

    # Set juga ke ngrok config lokal jika ngrok.exe tersedia
    if os.path.exists(NGROK_BIN):
        try:
            subprocess.run([NGROK_BIN, "config", "add-authtoken", token], capture_output=True, text=True, timeout=15)
        except Exception:
            pass

    print()
    print("  ✓ Pengaturan tersimpan di: %s" % CFG)
    print("  Domain Publik Anda       : https://%s/" % domain)
    print()
    print("  Langkah berikutnya:")
    print("    Klik dua kali 'jalankan-online.cmd' untuk menyalakan server.")
    print()
    return 0


if __name__ == "__main__":
    sys.exit(main())
