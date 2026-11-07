#!/usr/bin/env python3
"""Sinkronkan progres belajar dari aplikasi Anki ke aplikasi "Cocokkan Kata".

Skrip ini membaca koleksi Anki (collection.anki2) hanya-baca, mencocokkan catatan
lewat GUID, lalu menulis berkas `progress.js` di folder yang sama.

Jalankan:  python sinkron-anki.py          (atau klik dua kali sinkron-anki.cmd)
"""

import glob
import json
import os
import shutil
import sqlite3
import sys
import tempfile
import time
import unicodedata

HERE = os.path.dirname(os.path.abspath(__file__))
DECK_JS = os.path.join(HERE, "deck.js")
OUT_JS = os.path.join(HERE, "progress.js")


def uni(a, b):
    """Collation 'unicase' versi sederhana (Anki memakai ini pada beberapa kolom)."""
    x = unicodedata.normalize("NFD", a).casefold()
    y = unicodedata.normalize("NFD", b).casefold()
    return (x > y) - (x < y)


def find_collections():
    """Cari semua collection.anki2 milik profil Anki di komputer ini."""
    roots = []
    appdata = os.environ.get("APPDATA")
    if appdata:
        roots.append(os.path.join(appdata, "Anki2"))
    home = os.path.expanduser("~")
    roots.append(os.path.join(home, ".local", "share", "Anki2"))
    roots.append(os.path.join(home, "Library", "Application Support", "Anki2"))

    found = []
    for root in roots:
        if not os.path.isdir(root):
            continue
        for path in glob.glob(os.path.join(root, "*", "collection.anki2")):
            found.append(path)
    found.sort(key=lambda p: os.path.getmtime(p), reverse=True)
    return found


def load_guids():
    with open(DECK_JS, encoding="utf-8") as f:
        raw = f.read()
    start = raw.index("{")
    end = raw.rindex("}")
    deck = json.loads(raw[start:end + 1])
    guids = {}
    for idx, word in enumerate(deck["words"]):
        if word.get("g"):
            guids[word["g"]] = idx
    return deck, guids


def anki_running():
    try:
        if os.name == "nt":
            import subprocess
            out = subprocess.run(
                ["tasklist", "/FI", "IMAGENAME eq anki.exe"],
                capture_output=True, text=True, timeout=10,
            ).stdout.lower()
            return "anki.exe" in out
        import subprocess
        out = subprocess.run(["pgrep", "-x", "anki"], capture_output=True, timeout=10)
        return out.returncode == 0
    except Exception:
        return False


def read_progress(collection, guids):
    # Salin dulu ke berkas sementara di folder ini supaya koleksi Anki tidak tersentuh.
    copy = os.path.join(HERE, ".anki-copy-%d.anki2" % os.getpid())
    shutil.copy2(collection, copy)
    extra = []
    # ikutkan berkas WAL bila ada (Anki kadang memakainya)
    for suffix in ("-wal", "-shm"):
        src = collection + suffix
        if os.path.exists(src):
            try:
                shutil.copy2(src, copy + suffix)
                extra.append(copy + suffix)
            except OSError:
                pass

    try:
        con = sqlite3.connect(copy)
        con.create_collation("unicase", uni)
        con.execute("PRAGMA query_only = ON")

        deck_names = dict(con.execute("select id, name from decks"))

        rows = con.execute(
            """
            select n.guid, k.id, k.type, k.queue, k.ivl, k.reps, k.lapses, k.due,
                   k.did, k.odid, c.crt
            from cards k
            join notes n on n.id = k.nid
            join col c on c.id = 1
            """
        ).fetchall()

        last_review = {}
        try:
            for cid, ts in con.execute("select cid, max(id) from revlog group by cid"):
                last_review[cid] = ts
        except sqlite3.Error:
            pass

        cards = {}
        deck_titles = {}
        for guid, cid, ctype, queue, ivl, reps, lapses, due, did, odid, crt in rows:
            if guid not in guids:
                continue
            deck_id = odid or did
            deck_titles[deck_id] = deck_names.get(deck_id, str(deck_id))
            next_due = None
            if queue in (2, 3) and due:
                next_due = int(crt * 1000 + due * 86400000)
            cards[str(guids[guid])] = [
                int(ctype), int(queue), int(ivl), int(reps), int(lapses),
                last_review.get(cid), next_due, int(deck_id),
            ]

        con.close()
        return cards, deck_titles
    finally:
        for path in [copy] + extra:
            try:
                os.remove(path)
            except OSError:
                pass


def main():
    if not os.path.exists(DECK_JS):
        print("! Berkas deck.js tidak ditemukan di folder ini.")
        print("  Letakkan skrip ini di folder yang sama dengan index.html dan deck.js.")
        return 1

    deck, guids = load_guids()
    print("Deck  : %s" % deck.get("deck", "Kaishi 1.5k"))
    print("Kata  : %d entri" % len(deck["words"]))

    collections = find_collections()
    if not collections:
        print("\n! Tidak ada collection.anki2 yang ditemukan.")
        print("  Pastikan Anki sudah pernah dibuka minimal sekali di komputer ini.")
        return 1

    print("\nProfil Anki yang ditemukan:")
    for i, path in enumerate(collections):
        print("  [%d] %s  (%.1f MB, diubah %s)" % (
            i, path, os.path.getsize(path) / 1048576,
            time.strftime("%Y-%m-%d %H:%M", time.localtime(os.path.getmtime(path))),
        ))

    best = None
    for path in collections:
        try:
            cards, titles = read_progress(path, guids)
        except sqlite3.Error as exc:
            print("  ! gagal membaca %s: %s" % (path, exc))
            continue
        if cards:
            best = (path, cards, titles)
            break

    if best is None:
        print("\n! Tidak ada catatan Kaishi yang cocok di koleksi Anki mana pun.")
        print("  Impor dulu berkas .apkg Kaishi ke Anki, lalu jalankan skrip ini lagi.")
        return 1

    path, cards, titles = best
    if anki_running():
        print("\n  Catatan: Anki sedang terbuka. Data dibaca dari salinan, jadi perubahan")
        print("  beberapa menit terakhir bisa belum ikut. Tutup Anki untuk hasil paling akurat.")

    learned = sum(1 for v in cards.values() if v[3] > 0)
    mature = sum(1 for v in cards.values() if v[1] == 2 and v[2] >= 21)
    payload = {
        "generatedAt": int(time.time() * 1000),
        "source": path,
        "decks": titles,
        "total": len(deck["words"]),
        "matched": len(cards),
        "learned": learned,
        "mature": mature,
        "cards": cards,
    }

    with open(OUT_JS, "w", encoding="utf-8") as f:
        f.write("window.KAISHI_PROGRESS = ")
        json.dump(payload, f, ensure_ascii=False, separators=(",", ":"))
        f.write(";\n")

    print("\nSelesai.")
    print("  Sumber        : %s" % path)
    print("  Kata cocok    : %d dari %d" % (len(cards), len(deck["words"])))
    print("  Sudah diulang : %d" % learned)
    print("  Matang        : %d" % mature)
    print("  Ditulis       : %s" % OUT_JS)
    print("\nBuka index.html (muat ulang halaman), lalu pakai filter 'Sudah dipelajari'.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
