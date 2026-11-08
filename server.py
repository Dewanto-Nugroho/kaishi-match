#!/usr/bin/env python3
"""Server lokal untuk membuka "Cocokkan Kata" dari HP lewat Wi-Fi.

Jalankan:  python server.py            -> bisa dibuka dari HP di jaringan yang sama
           python server.py --localhost -> hanya dari komputer ini

Tekan Ctrl+C untuk berhenti.
"""

import argparse
import html
import http.server
import json
import os
import socket
import socketserver
import subprocess
import sys
import threading
import webbrowser

HERE = os.path.dirname(os.path.abspath(__file__))
START_PORT = 8080


def run_generate_teks(payload):
    """Jalankan generate-teks.py --sumber ai dari permintaan halaman web."""
    script = os.path.join(HERE, "generate-teks.py")
    if not os.path.exists(script):
        return {"ok": False, "error": "generate-teks.py tidak ditemukan"}
    if not (os.path.exists(os.path.join(HERE, "ai-config.json"))
            or os.path.exists(os.path.join(HERE, "api-key.txt"))
            or os.environ.get("AI_API_KEY")):
        return {"ok": False, "error": "ai-config.json / API key belum ada"}

    def num(v, default, lo, hi):
        try:
            v = int(v)
        except (TypeError, ValueError):
            return default
        return max(lo, min(hi, v))

    args = [
        sys.executable, script, "--sumber", "ai",
        "--jumlah", str(num(payload.get("jumlah"), 3, 1, 10)),
        "--kata", str(payload.get("kata") or "semua"),
        "--rasio", str(num(payload.get("rasio"), 70, 10, 90)),
        "--level", str(num(payload.get("level"), 4, 1, 5)),
        "--paragraf", str(num(payload.get("paragraf"), 3, 1, 6)),
    ]
    try:
        p = subprocess.run(args, cwd=HERE, capture_output=True, text=True, timeout=600)
    except subprocess.TimeoutExpired:
        return {"ok": False, "error": "timeout menunggu AI"}
    except OSError as exc:
        return {"ok": False, "error": "gagal menjalankan python: %s" % exc}
    if p.returncode != 0:
        msg = (p.stderr or p.stdout or "").strip().splitlines()
        return {"ok": False, "error": msg[-1][:300] if msg else "gagal"}
    return {"ok": True, "log": (p.stdout or "").strip()[-600:]}


def lan_ips():
    """Semua alamat IPv4 lokal yang mungkin dipakai HP."""
    found = set()
    try:
        for info in socket.getaddrinfo(socket.gethostname(), None, socket.AF_INET):
            found.add(info[4][0])
    except OSError:
        pass
    try:
        s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
        s.connect(("8.8.8.8", 80))
        found.add(s.getsockname()[0])
        s.close()
    except OSError:
        pass
    # buang loopback & alamat APIPA (169.254.x.x)
    return sorted(a for a in found if not a.startswith("127.") and not a.startswith("169.254."))


class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=HERE, **kwargs)

    def end_headers(self):
        # jangan sampai HP memakai cache lama setelah deck/progress diubah
        self.send_header("Cache-Control", "no-store, must-revalidate")
        super().end_headers()

    def log_message(self, fmt, *args):
        msg = fmt % args
        if " 200 " in msg or " 304 " in msg:
            return  # terlalu ramai untuk audio; hanya tampilkan yang gagal
        sys.stderr.write("  %s - %s\n" % (self.address_string(), msg))

    def do_POST(self):
        if self.path.split("?")[0] != "/api/teks":
            self.send_error(404)
            return
        try:
            length = int(self.headers.get("Content-Length", 0))
            payload = json.loads(self.rfile.read(length) or b"{}")
        except (ValueError, TypeError):
            payload = {}
        try:
            result = run_generate_teks(payload)
        except Exception as exc:  # jangan sampai server mati
            result = {"ok": False, "error": str(exc)[:300]}
        body = json.dumps(result, ensure_ascii=False).encode("utf-8")
        self.send_response(200 if result.get("ok") else 500)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Content-Length", str(len(body)))
        self.end_headers()
        self.wfile.write(body)


class Server(socketserver.ThreadingTCPServer):
    daemon_threads = True
    allow_reuse_address = True


def bind(host, port, tries=12):
    last = None
    for p in range(port, port + tries):
        try:
            return Server((host, p), Handler), p
        except OSError as exc:
            last = exc
    raise SystemExit("Tidak bisa membuka port %d-%d: %s" % (port, port + tries - 1, last))


def main():
    ap = argparse.ArgumentParser(description="Server lokal untuk Cocokkan Kata")
    ap.add_argument("--port", type=int, default=START_PORT)
    ap.add_argument("--localhost", action="store_true", help="hanya bisa diakses dari komputer ini")
    ap.add_argument("--no-browser", action="store_true", help="jangan buka browser otomatis")
    args = ap.parse_args()

    if not os.path.exists(os.path.join(HERE, "index.html")):
        print("! index.html tidak ditemukan di folder ini.")
        return 1

    host = "127.0.0.1" if args.localhost else "0.0.0.0"
    httpd, port = bind(host, args.port)

    local_url = "http://127.0.0.1:%d/" % port
    ips = [] if args.localhost else lan_ips()

    print()
    print("  Cocokkan Kata — server lokal")
    print("  ---------------------------------------------")
    print("  Di komputer ini : %s" % local_url)
    if ips:
        for ip in ips:
            print("  Dari HP         : http://%s:%d/" % (ip, port))
        print()
        print("  Pastikan HP dan komputer tersambung ke Wi-Fi yang sama,")
        print("  lalu buka alamat 'Dari HP' di browser ponsel.")
        print("  Jika halaman tidak terbuka, izinkan Python pada Windows Firewall")
        print("  (Settings > Network & Internet > Windows Firewall > Allow an app).")
    else:
        print("  (mode lokal: hanya bisa dibuka dari komputer ini)")
    print()
    print("  Tekan Ctrl+C untuk berhenti.")
    print()

    if not args.no_browser:
        threading.Timer(0.6, lambda: webbrowser.open(local_url)).start()

    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("\n  Server dihentikan.")
    finally:
        httpd.server_close()
    return 0


if __name__ == "__main__":
    sys.exit(main())
