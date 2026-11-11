#!/usr/bin/env python3
"""Server Online Kaishi 1.5k menggunakan Ngrok.

Menjalankan server lokal sekaligus membuka terowongan (tunnel) Ngrok dengan domain tetap,
sehingga web Kaishi bisa diakses dari HP via internet seluler atau jaringan mana pun.

Jalankan:  jalankan-online.cmd   (atau python server_online.py)
"""

import io
import json
import os
import re
import signal
import subprocess
import sys
import threading
import time
import urllib.request
import zipfile

HERE = os.path.dirname(os.path.abspath(__file__))
NGROK_BIN = os.path.join(HERE, "ngrok.exe")
NGROK_YML = os.path.join(HERE, "ngrok.yml")
CFG_FILE = os.path.join(HERE, "ngrok-config.json")
START_PORT = 8080
NGROK_ZIP_URL = "https://bin.equinox.io/c/bNyj1mQVY4c/ngrok-v3-stable-windows-amd64.zip"

# Impor server lokal yang sudah ada
try:
    from server import bind, Handler, Server
except ImportError:
    print("! Gagal memuat server.py. Pastikan server_online.py berada di folder kaishi-match.")
    sys.exit(1)


def ensure_ngrok_bin():
    """Pastikan ngrok.exe tersedia. Jika belum ada, download otomatis."""
    if os.path.exists(NGROK_BIN):
        return True

    print("  ngrok.exe belum ditemukan.")
    print("  Mengunduh ngrok.exe dari server resmi...", end="", flush=True)
    try:
        req = urllib.request.Request(
            NGROK_ZIP_URL,
            headers={"User-Agent": "Kaishi-Online-Setup/1.0"}
        )
        with urllib.request.urlopen(req, timeout=60) as res:
            zip_data = res.read()
        with zipfile.ZipFile(io.BytesIO(zip_data)) as z:
            z.extract("ngrok.exe", HERE)
        print(" Selesai!")
        return True
    except Exception as e:
        print("\n  ! Gagal mengunduh ngrok.exe otomatis: %s" % e)
        print("  Silakan unduh manual dari https://ngrok.com/download lalu letakkan ngrok.exe di folder ini.")
        return False


def load_config():
    """Baca ngrok-config.json. Jika belum ada, minta input dari pengguna."""
    cfg = {}
    if os.path.exists(CFG_FILE):
        try:
            with open(CFG_FILE, encoding="utf-8-sig") as f:
                cfg = json.load(f)
        except (OSError, ValueError):
            cfg = {}

    token = (cfg.get("authtoken") or "").strip()
    domain = (cfg.get("domain") or "").strip()

    if token and domain:
        return token, domain

    # Jalankan wizard konfigurasi
    import pasang_ngrok
    if pasang_ngrok.main() != 0:
        return None, None

    if os.path.exists(CFG_FILE):
        try:
            with open(CFG_FILE, encoding="utf-8-sig") as f:
                cfg = json.load(f)
                return (cfg.get("authtoken") or "").strip(), (cfg.get("domain") or "").strip()
        except Exception:
            pass
    return None, None


def main():
    try:
        sys.stdout.reconfigure(encoding="utf-8", line_buffering=True)
    except Exception:
        pass

    print()
    print("  ================================================================")
    print("    Kaishi 1.5k — Menyiapkan Akses Online (Ngrok)")
    print("  ================================================================")

    if not ensure_ngrok_bin():
        input("\n  Tekan Enter untuk keluar...")
        return 1

    token, domain = load_config()
    if not token or not domain:
        print("\n  ! Konfigurasi Ngrok belum lengkap.")
        input("\n  Tekan Enter untuk keluar...")
        return 1

    # Bersihkan format domain
    if domain.startswith("https://"):
        domain = domain[8:]
    elif domain.startswith("http://"):
        domain = domain[7:]
    domain = domain.rstrip("/")

    # Nyalakan server HTTP lokal pada 127.0.0.1
    try:
        httpd, port = bind("127.0.0.1", START_PORT)
    except Exception as e:
        print("! Gagal menyalakan server lokal: %s" % e)
        return 1

    server_thread = threading.Thread(target=httpd.serve_forever, daemon=True)
    server_thread.start()

    # Jalankan ngrok
    full_url = "https://%s" % domain
    cmd = [
        NGROK_BIN,
        "http",
        str(port),
        "--url",
        full_url,
        "--authtoken",
        token,
        "--log=stdout",
        "--log-format=logfmt",
    ]
    if os.path.exists(NGROK_YML):
        cmd.extend(["--config", NGROK_YML])

    try:
        proc = subprocess.Popen(
            cmd,
            stdout=subprocess.PIPE,
            stderr=subprocess.STDOUT,
            text=True,
            encoding="utf-8",
            errors="replace",
            bufsize=1,
        )
    except Exception as e:
        print("! Gagal menjalankan ngrok: %s" % e)
        httpd.shutdown()
        return 1

    connected = threading.Event()
    error_msg = []
    stop_event = threading.Event()
    actual_url = [full_url]

    def monitor_ngrok():
        while not stop_event.is_set():
            line = proc.stdout.readline()
            if not line:
                break
            line_str = line.strip()
            if "started tunnel" in line_str or "url=https://" in line_str:
                m_url = re.search(r'url=(https://[^\s]+)', line_str)
                if m_url:
                    actual_url[0] = m_url.group(1).rstrip("/")
                connected.set()
            elif "lvl=eror" in line_str or "lvl=crit" in line_str:
                m = re.search(r'err="([^"]+)"', line_str)
                if m:
                    error_msg.append(m.group(1).replace("\\n", "\n  "))
                else:
                    error_msg.append(line_str)
            elif "ERR_NGROK_" in line_str:
                error_msg.append(line_str)

    t_mon = threading.Thread(target=monitor_ngrok, daemon=True)
    t_mon.start()

    # Tunggu koneksi terhubung maksimal 8 detik
    is_ready = connected.wait(timeout=6.0)

    # Periksa apakah proses mati mendadak
    if proc.poll() is not None or (not is_ready and error_msg):
        print()
        print("  ! Gagal menghubungkan Ngrok:")
        if error_msg:
            print("  --------------------------------------------------------------")
            for err in error_msg[:4]:
                print("  " + err)
            print("  --------------------------------------------------------------")
            print("  Petunjuk:")
            print("  - Pastikan Authtoken valid di: https://dashboard.ngrok.com/get-started/your-authtoken")
            print("  - Pastikan Static Domain terdaftar di: https://dashboard.ngrok.com/domains")
            print("  - Jalankan 'pasang-ngrok.cmd' jika ingin memperbarui konfigurasi.")
        else:
            print("  Ngrok berhenti dengan kode: %s" % proc.poll())
        proc.terminate()
        httpd.shutdown()
        input("\n  Tekan Enter untuk keluar...")
        return 1

    # Tampilan banner aktif
    display_url = actual_url[0]
    print()
    print("  ================================================================")
    print("    Kaishi 1.5k — ONLINE AKTIF")
    print("  ================================================================")
    print("  Di Komputer ini : http://127.0.0.1:%d/" % port)
    print("  AKSES DARI HP   : %s/" % display_url)
    print("  ================================================================")
    print("  * HP bisa menggunakan paket data 4G/5G atau Wi-Fi mana saja.")
    print("  * Saat pertama kali dibuka di HP, jika muncul konfirmasi Ngrok,")
    print("    cukup ketuk tombol biru [Visit Site].")
    print("  * PC harus tetap menyala dan jendela ini jangan ditutup.")
    print("  ----------------------------------------------------------------")
    print("  Tekan Ctrl+C untuk berhenti.")
    print()

    def clean_exit(*_):
        stop_event.set()
        print("\n\n  Menghentikan server & terowongan Ngrok...")
        try:
            proc.terminate()
            proc.wait(timeout=3)
        except Exception:
            try:
                proc.kill()
            except Exception:
                pass
        try:
            httpd.shutdown()
            httpd.server_close()
        except Exception:
            pass
        print("  Server berhasil dihentikan. Sampai jumpa!")
        sys.exit(0)

    signal.signal(signal.SIGINT, clean_exit)
    signal.signal(signal.SIGTERM, clean_exit)

    try:
        while proc.poll() is None:
            time.sleep(1)
        # Jika proc keluar sendiri
        if not stop_event.is_set():
            print("\n  ! Ngrok terputus.")
            clean_exit()
    except KeyboardInterrupt:
        clean_exit()

    return 0


if __name__ == "__main__":
    sys.exit(main())
