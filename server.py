#!/usr/bin/env python3
"""Server lokal untuk membuka "Cocokkan Kata" dari HP lewat Wi-Fi.

Jalankan:  python server.py            -> bisa dibuka dari HP di jaringan yang sama
           python server.py --localhost -> hanya dari komputer ini

Tekan Ctrl+C untuk berhenti.
"""

import argparse
import html
import http.server
import os
import socket
import socketserver
import sys
import threading
import webbrowser

HERE = os.path.dirname(os.path.abspath(__file__))
START_PORT = 8080


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
