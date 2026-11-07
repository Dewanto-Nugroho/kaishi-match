#!/usr/bin/env python3
"""Generator bank soal untuk "Cocokkan Kata / Kuis Kaishi".

Dua sumber:
  --sumber lokal  : membuat soal langsung dari data deck (tanpa AI, tanpa internet)
  --sumber ai     : meminta AI membuat soal (OpenAI-compatible), hasil divalidasi

Hasil ditulis ke soal.js. Skema AI mengikuti kesepakatan: inkremental, cadangan,
--dry-run, --ulang, --words, --range, --maks, --seed, --variant.

Contoh:
  generate-soal.cmd
  generate-soal.cmd --maks 600 --seed 7
  generate-soal.cmd --sumber ai --model deepseek-chat
  generate-soal.cmd --sumber ai --ulang --words 食べる,飲む
"""

import argparse
import json
import os
import random
import re
import sys
import time
import unicodedata
import urllib.error
import urllib.request

HERE = os.path.dirname(os.path.abspath(__file__))
DECK_JS = os.path.join(HERE, "deck.js")
OUT = os.path.join(HERE, "soal.js")
CACHE = os.path.join(HERE, "soal-cache.json")
AI_CONFIG = os.path.join(HERE, "ai-config.json")

LEVEL_NAMES = {5: "N5", 4: "N4", 3: "N3", 2: "N2", 1: "N1"}
# Level dihitung dari peringkat frekuensi di dalam deck (persentil), bukan tag JLPT resmi.
LEVEL_PERSEN = [0.40, 0.60, 0.78, 0.90]
PARTICLES = ["は", "が", "を", "に", "で", "へ", "と", "も", "の", "から", "まで", "より", "や"]
PSET = set(PARTICLES)
SLOT_ROLE = {
    "を": "menandai 「{prev}」 sebagai objek langsung dari kata kerja 「{next}」",
    "が": "menandai 「{prev}」 sebagai subjek kalimat",
    "は": "menandai 「{prev}」 sebagai topik kalimat",
    "に": "menandai 「{prev}」 sebagai keterangan waktu, tujuan, atau sasaran",
    "で": "menandai 「{prev}」 sebagai tempat berlangsungnya tindakan atau alat",
    "へ": "menandai arah gerak 「{prev}」 menuju 「{next}」",
    "から": "menandai 「{prev}」 sebagai titik awal",
    "まで": "menandai 「{prev}」 sebagai batas akhir",
}
KANJI = re.compile(r"[\u3400-\u4dbf\u4e00-\u9fff]")


def build_vocab(words):
    """Kosakata untuk memecah kalimat (greedy longest match)."""
    v = set()
    for w in words:
        for form in (w["w"], w["r"]):
            if 2 <= len(form) <= 7:
                v.add(form)
    return v


def segment(s, vocab, maxlen=7):
    toks, i = [], 0
    while i < len(s):
        for L in range(min(maxlen, len(s) - i), 0, -1):
            if s[i:i + L] in vocab:
                toks.append(s[i:i + L])
                i += L
                break
        else:
            toks.append(s[i])
            i += 1
    return toks


def chunks_of(s, vocab):
    """Gabungkan token menjadi potongan ala bunsetsu: kata + partikel."""
    toks = segment(s, vocab)
    chunks, cur = [], ""
    for t in toks:
        if t in PSET and cur:
            cur += t
            chunks.append(cur)
            cur = ""
        else:
            cur += t
    if cur:
        chunks.append(cur)
    return chunks, toks


def level_of(rank, cutoffs):
    """Peringkat frekuensi -> level 5 (=N5, paling umum) .. 1 (=N1, paling jarang)."""
    if rank is None:
        return 1
    for i, cut in enumerate(cutoffs):
        if rank <= cut:
            return 5 - i
    return 1


def level_cutoffs(words):
    ranks = sorted(w["f"] for w in words if w.get("f"))
    if not ranks:
        return [800, 1600, 3200, 6400]
    return [ranks[min(len(ranks) - 1, int(len(ranks) * p))] for p in LEVEL_PERSEN]


def load_deck():
    with open(DECK_JS, encoding="utf-8") as f:
        raw = f.read()
    deck = json.loads(raw[raw.index("{"): raw.rindex("}") + 1])
    cutoffs = level_cutoffs(deck["words"])
    words = []
    for i, w in enumerate(deck["words"]):
        words.append({
            "id": i,
            "w": w["w"],
            "r": w.get("r") or w["w"],
            "m": w.get("m") or "",
            "f": w.get("f"),
            "s": w.get("s") or "",
            "sm": w.get("sm") or "",
            "lv": level_of(w.get("f"), cutoffs),
        })
    return deck, words


def norm(s):
    return unicodedata.normalize("NFKC", s).strip()


def pick(pool, answer, count, rng, max_len=48, forbid_in=""):
    """Ambil `count` distraktor unik dari pool, tidak mirip jawaban."""
    candidates = [x for x in pool if x and x != answer]
    rng.shuffle(candidates)
    out = []
    for c in candidates:
        if len(out) >= count:
            break
        if c in out:
            continue
        if len(c) > max_len:
            continue
        if answer in c or c in answer:
            continue
        if forbid_in and c in forbid_in:
            continue
        out.append(c)
    return out


def mc(qtype, lv, prompt, options, answer, note, wid, rng, extra=None):
    if answer not in options or len(set(options)) != len(options) or len(options) != 4:
        return None
    idx = options.index(answer)
    order = options[:]
    rng.shuffle(order)
    item = {
        "t": qtype, "lv": lv, "q": prompt, "o": order,
        "a": order.index(answer), "n": note, "w": wid,
    }
    if extra:
        item.update(extra)
    return item


# ---------------------------------------------------------------- soal per kata

def soal_arti(word, pools, rng):
    opts = [word["m"]] + pick(pools["m"][word["lv"]], word["m"], 3, rng, max_len=90)
    return mc("arti", word["lv"], word["w"], opts, word["m"],
              "%s [%s] = %s" % (word["w"], word["r"], word["m"]), word["id"], rng)


def soal_kata(word, pools, rng):
    opts = [word["w"]] + pick(pools["w"][word["lv"]], word["w"], 3, rng, max_len=12)
    return mc("kata", word["lv"], word["m"], opts, word["w"],
              "%s [%s]" % (word["w"], word["r"]), word["id"], rng)


def soal_baca(word, pools, rng):
    if word["r"] == word["w"] or not KANJI.search(word["w"]):
        return None
    opts = [word["r"]] + pick(pools["r"][word["lv"]], word["r"], 3, rng, max_len=20)
    return mc("baca", word["lv"], word["w"], opts, word["r"],
              "%s dibaca %s — %s" % (word["w"], word["r"], word["m"]), word["id"], rng)


def soal_cloze(word, pools, rng):
    s = word["s"]
    if not s or word["w"] not in s or s.count(word["w"]) != 1:
        return None
    stem = s.replace(word["w"], "＿＿＿")
    opts = [word["w"]] + pick(pools["w"][word["lv"]], word["w"], 3, rng, max_len=12, forbid_in=s)
    x = "「%s」(%s) berarti %s. Kalimat lengkapnya: %s — %s." % (
        word["w"], word["r"], word["m"], s, word["sm"].rstrip("."))
    return mc("cloze", word["lv"], stem, opts, word["w"],
              "%s — %s" % (s, word["sm"]), word["id"], rng, {"sen": s, "x": x})


def soal_teks(word, pools, rng):
    s, sm = word["s"], word["sm"]
    if not s or not sm or len(s) < 6:
        return None
    opts = [sm] + pick(pools["sm"][word["lv"]], sm, 3, rng, max_len=90)
    return mc("teks", word["lv"], s, opts, sm,
              "%s = %s" % (s, sm), word["id"], rng, {"sen": s})


def soal_partikel(word, rng, vocab):
    s = word["s"]
    if not s or len(s) > 34:
        return None
    chunks, toks = chunks_of(s.rstrip("。！？!?"), vocab)
    # cari partikel yang berdiri sendiri setelah sebuah kata
    pos = 0
    target = None
    for i, t in enumerate(toks):
        if t in PSET and pos > 0 and t in ("を", "に", "で", "から", "まで", "へ", "が", "は"):
            target = (pos, t, i)
            if t in ("を", "に", "で", "から", "まで"):
                break
        pos += len(t)
    if not target:
        return None
    pos, mark, idx = target
    prev_tok = toks[idx - 1] if idx > 0 else ""
    next_tok = toks[idx + 1] if idx + 1 < len(toks) else ""
    stem = s[:pos] + "＿＿" + s[pos + len(mark):]
    others = [p for p in PARTICLES if p != mark and len(p) == len(mark)] or [p for p in PARTICLES if p != mark]
    opts = [mark] + pick(others, mark, 3, rng, max_len=4)
    if len(opts) < 4:
        return None

    # ambil potongan bermakna (bunsetsu) di sekitar celah, bukan potongan karakter
    acc = 0
    prev_chunk = next_chunk = ""
    for ci, ch in enumerate(chunks):
        if acc + len(ch) == pos + len(mark):
            prev_chunk = ch[:-len(mark)]
            if ci + 1 < len(chunks):
                next_chunk = chunks[ci + 1]
            break
        acc += len(ch)
    if not prev_chunk:
        before_raw = s[:pos]
        prev_chunk = before_raw[-4:]
        after_raw = s[pos + len(mark):]
        next_chunk = after_raw[:8]

    prev_txt = ("…" + prev_chunk[-8:]) if len(prev_chunk) > 8 else prev_chunk
    prev_txt = prev_txt.split("、")[-1]
    next_txt = (next_chunk[:8] + "…") if len(next_chunk) > 8 else next_chunk
    slot = SLOT_ROLE.get(mark, "menghubungkan 「{prev}」 dengan 「{next}」")
    slot_txt = slot.format(prev=prev_txt, next=next_txt)
    x = "Partikel 「%s」 %s. Kalimat lengkap: %s — %s." % (
        mark, slot_txt, s, word["sm"].rstrip("."))
    return mc("partikel", word["lv"], stem, opts, mark,
              "%s — %s" % (s, word["sm"]), word["id"], rng, {"sen": s, "x": x})


def soal_acak(word, rng, vocab):
    s = word["s"]
    if not s or len(s) < 8 or len(s) > 26:
        return None
    body = s.rstrip("。！？!?")
    chunks, _ = chunks_of(body, vocab)
    if not (2 <= len(chunks) <= 5):
        return None
    if any(len(c) > 10 for c in chunks):
        return None
    if "".join(chunks) != body:
        return None
    mixed = chunks[:]
    for _ in range(8):
        rng.shuffle(mixed)
        if mixed != chunks:
            break
    return {
        "t": "acak", "lv": word["lv"], "w": word["id"],
        "q": "Susun menjadi kalimat yang benar",
        "ch": mixed, "sa": s,
        "n": "%s — %s" % (s, word["sm"]),
        "x": "Urutan yang benar: %s. Kalimat: %s — %s." % (
            " / ".join(chunks), s, word["sm"].rstrip(".")),
    }


# ------------------------------------------------------------------- generator

def build_local(words, maks, seed, per_word, progress=None):
    rng = random.Random(seed)
    pools = {"m": {}, "w": {}, "r": {}, "sm": {}}
    for lv in range(1, 6):
        pools["m"][lv] = [x["m"] for x in words if x["lv"] == lv and x["m"]]
        pools["w"][lv] = [x["w"] for x in words if x["lv"] == lv]
        pools["r"][lv] = list({x["r"] for x in words if x["lv"] == lv and x["r"] != x["w"]})
        pools["sm"][lv] = [x["sm"] for x in words if x["lv"] == lv and x["sm"]]

    builders = [soal_arti, soal_kata, soal_baca, soal_cloze, soal_teks]
    vocab = build_vocab(words)
    out, seen = [], set()
    per_tipe = {}

    for i, word in enumerate(words):
        items = [fn(word, pools, rng) for fn in builders]
        items.append(soal_partikel(word, rng, vocab))
        items.append(soal_acak(word, rng, vocab))
        for item in items:
            if not item:
                continue
            key = (item["t"], item["q"], tuple(item.get("o", item.get("ch", []))))
            if key in seen:
                continue
            seen.add(key)
            out.append(item)
            per_tipe[item["t"]] = per_tipe.get(item["t"], 0) + 1
        if progress and (i + 1) % 300 == 0:
            progress(i + 1, len(words), len(out))

    # batasi jumlah per tipe + acak ringan agar bervariasi
    limited = []
    counter = {}
    rng.shuffle(out)
    for item in out:
        t = item["t"]
        if counter.get(t, 0) >= maks:
            continue
        counter[t] = counter.get(t, 0) + 1
        limited.append(item)
    limited.sort(key=lambda x: (x["lv"] * -1, x["t"]))
    return limited


# ----------------------------------------------------------------------- AI

def load_ai_config(args):
    cfg = {"base_url": "https://api.deepseek.com/v1", "model": "deepseek-chat", "api_key": ""}
    if os.path.exists(AI_CONFIG):
        with open(AI_CONFIG, encoding="utf-8") as f:
            cfg.update(json.load(f))
    if args.model:
        cfg["model"] = args.model
    if args.base_url:
        cfg["base_url"] = args.base_url
    key = cfg.get("api_key") or os.environ.get("AI_API_KEY") or os.environ.get("OPENAI_API_KEY") or ""
    if not key and os.path.exists(os.path.join(HERE, "api-key.txt")):
        with open(os.path.join(HERE, "api-key.txt"), encoding="utf-8") as f:
            key = f.read().strip()
    cfg["api_key"] = key
    return cfg


PROMPT = """Kamu penyusun soal bahasa Jepang untuk pembelajar Indonesia.
Untuk setiap kata berikut, buat soal pilihan ganda yang NATURAL dan tidak ambigu.

Data kata: nomor, kata, bacaan, arti, level JLPT, kalimat contoh, arti kalimat.
%s

Balas HANYA JSON valid dengan bentuk:
{"soal":[{"id":<nomor>,"tipe":"arti|kata|baca|cloze|partikel|bunyi","q":"...","o":["..","..","..",".."],"a":<indeks jawaban>,"n":"penjelasan singkat","x":"penjelasan tata bahasa"}]}

Aturan:
- Semua opsi memakai bahasa yang sama dengan jawaban; tepat 4 opsi, unik, tanpa duplikat.
- Distraktor harus salah tetapi masuk akal (kelas kata sama, kesulitan setara).
- Untuk "baca": prompt kata kanji, opsi berupa hiragana.
- Untuk "cloze": kalimat asli dengan kata target diganti ＿＿＿.
- Untuk "partikel": kalimat asli dengan satu partikel diganti ＿＿.
- "x" khusus soal tata bahasa (cloze/partikel): jelaskan dalam bahasa Indonesia peran partikel
  atau kata yang benar, dan mengapa partikel/kata lain yang dipilih tidak cocok di posisi itu.
- Penjelasan singkat dalam bahasa Indonesia, sebutkan arti/alasannya.
- Jangan mengarang kata di luar daftar."""


def call_ai(cfg, batch, timeout=120):
    words = "\n".join(
        "%d. %s [%s] = %s (%s) | contoh: %s = %s" % (
            w["id"], w["w"], w["r"], w["m"], LEVEL_NAMES[w["lv"]], w["s"], w["sm"])
        for w in batch
    )
    body = {
        "model": cfg["model"],
        "messages": [
            {"role": "system", "content": "Kamu asisten pembuat soal. Jawab hanya JSON."},
            {"role": "user", "content": PROMPT % words},
        ],
        "temperature": 0.7,
        "response_format": {"type": "json_object"},
    }
    req = urllib.request.Request(
        cfg["base_url"].rstrip("/") + "/chat/completions",
        data=json.dumps(body).encode("utf-8"),
        headers={"Content-Type": "application/json", "Authorization": "Bearer " + cfg["api_key"]},
    )
    with urllib.request.urlopen(req, timeout=timeout) as r:
        data = json.loads(r.read().decode("utf-8"))
    text = data["choices"][0]["message"]["content"]
    start, end = text.find("{"), text.rfind("}")
    return json.loads(text[start:end + 1])


def valid_ai_item(item, words_by_id, rng):
    try:
        wid = int(item["id"])
        word = words_by_id[wid]
        t = str(item["tipe"])
        if t not in ("arti", "kata", "baca", "cloze", "partikel", "bunyi"):
            return None
        opts = [norm(o) for o in item["o"]]
        ans = int(item["a"])
        if len(opts) != 4 or len(set(opts)) != 4 or not (0 <= ans < 4):
            return None
        if any(len(o) == 0 for o in opts):
            return None
        # validasi khusus: bacaan tidak boleh dipercaya dari AI
        if t == "baca" and opts[ans] != word["r"]:
            return None
        return {
            "t": t, "lv": word["lv"], "q": norm(item["q"]), "o": opts, "a": ans,
            "n": norm(item.get("n", "")), "x": norm(item.get("x", "")), "w": wid,
        }
    except Exception:
        return None


def build_ai(words, args):
    cfg = load_ai_config(args)
    if not cfg["api_key"]:
        print("! API key belum ada. Isi ai-config.json / api-key.txt / variabel AI_API_KEY.")
        return None
    cache = {}
    if os.path.exists(CACHE):
        with open(CACHE, encoding="utf-8") as f:
            cache = json.load(f)
    done = set() if args.ulang else {int(k) for k in cache if cache[k]}
    todo = [w for w in words if w["id"] not in done]
    if args.words:
        want = {norm(x) for x in args.words.split(",")}
        todo = [w for w in todo if w["w"] in want or str(w["id"]) in want]
    if args.range:
        lo, hi = args.range
        todo = [w for w in todo if lo <= w["id"] <= hi]
    if args.maks:
        todo = todo[: args.maks]

    rng = random.Random(args.seed)
    words_by_id = {w["id"]: w for w in words}
    print("Kata yang diproses: %d (sudah ada: %d)" % (len(todo), len(cache)))
    if args.dry_run:
        todo = todo[:5]

    batch_size = 12
    gagal = []
    for start in range(0, len(todo), batch_size):
        batch = todo[start:start + batch_size]
        try:
            res = call_ai(cfg, batch)
        except (urllib.error.URLError, TimeoutError, ValueError, KeyError) as exc:
            print("  ! batch %d gagal: %s" % (start // batch_size + 1, exc))
            gagal.extend(w["id"] for w in batch)
            continue
        items = [x for x in (valid_ai_item(it, words_by_id, rng) for it in res.get("soal", [])) if x]
        for w in batch:
            cache[str(w["id"])] = [x for x in items if x["w"] == w["id"]]
        print("  batch %d/%d -> %d soal" % (start // batch_size + 1, (len(todo) + batch_size - 1) // batch_size, len(items)))
        if args.dry_run:
            for x in items[:6]:
                print("   ", x["t"], x["q"], x["o"], x["a"])
            break
        time.sleep(0.4)

    if args.dry_run:
        return "dry-run"
    with open(CACHE, "w", encoding="utf-8") as f:
        json.dump(cache, f, ensure_ascii=False)
    soal = [q for k in cache for q in cache[k]]
    if gagal:
        with open(os.path.join(HERE, "soal-gagal.json"), "w", encoding="utf-8") as f:
            json.dump(gagal, f)
        print("Gagal untuk %d kata -> soal-gagal.json" % len(set(gagal)))
    return soal


# ---------------------------------------------------------------------- output

def write_out(soal, sumber):
    soal.sort(key=lambda x: (-x["lv"], x["t"]))
    per_level, per_tipe = {}, {}
    for s in soal:
        per_level[LEVEL_NAMES[s["lv"]]] = per_level.get(LEVEL_NAMES[s["lv"]], 0) + 1
        per_tipe[s["t"]] = per_tipe.get(s["t"], 0) + 1
    payload = {
        "meta": {
            "dibuat": int(time.time() * 1000),
            "sumber": sumber,
            "total": len(soal),
            "perLevel": per_level,
            "perTipe": per_tipe,
        },
        "soal": soal,
    }
    if os.path.exists(OUT):
        backup = os.path.join(HERE, "soal-%s.js" % time.strftime("%Y%m%d-%H%M%S"))
        with open(OUT, encoding="utf-8") as f:
            old = f.read()
        with open(backup, "w", encoding="utf-8") as f:
            f.write(old)
        print("Cadangan : %s" % os.path.basename(backup))
    with open(OUT, "w", encoding="utf-8") as f:
        f.write("window.KAISHI_SOAL = ")
        json.dump(payload, f, ensure_ascii=False, separators=(",", ":"))
        f.write(";\n")
    print("Ditulis  : soal.js (%.1f KB)" % (os.path.getsize(OUT) / 1024))
    print("Total    : %d soal" % len(soal))
    print("Per tipe : %s" % ", ".join("%s=%d" % kv for kv in sorted(per_tipe.items())))
    print("Per level: %s" % ", ".join("%s=%d" % kv for kv in sorted(per_level.items(), reverse=True)))


def main():
    try:
        sys.stdout.reconfigure(encoding="utf-8")
    except Exception:
        pass
    ap = argparse.ArgumentParser(description="Generator soal Kaishi")
    ap.add_argument("--sumber", choices=["lokal", "ai"], default="lokal")
    ap.add_argument("--maks", type=int, default=900, help="maksimal soal per tipe")
    ap.add_argument("--seed", type=int, default=1)
    ap.add_argument("--ulang", action="store_true", help="(AI) buat ulang kata yang sudah ada")
    ap.add_argument("--words", help="(AI) daftar kata dipisah koma")
    ap.add_argument("--range", type=int, nargs=2, metavar=("AWAL", "AKHIR"))
    ap.add_argument("--model")
    ap.add_argument("--base-url")
    ap.add_argument("--variant", default="")
    ap.add_argument("--dry-run", action="store_true")
    args = ap.parse_args()

    if not os.path.exists(DECK_JS):
        print("! deck.js tidak ditemukan.")
        return 1

    deck, words = load_deck()
    print("Deck  : %s (%d kata)" % (deck.get("deck", "Kaishi"), len(words)))

    if args.range:
        words = [w for w in words if args.range[0] <= w["id"] <= args.range[1]]

    if args.sumber == "lokal":
        def prog(done, total, n):
            print("  %d/%d kata, %d soal" % (done, total, n))
        soal = build_local(words, args.maks, args.seed, prog)
        if args.dry_run:
            for s in soal[:8]:
                if s["t"] == "acak":
                    print(" ", s["t"], s["ch"], "->", s["sa"])
                else:
                    print(" ", s["t"], s["q"], s.get("o"), s.get("a"), "|", s["n"][:60])
            return 0
        write_out(soal, "lokal")
    else:
        soal = build_ai(words, args)
        if soal is None:
            return 1
        if soal == "dry-run":
            return 0
        write_out(soal, "ai")
    return 0


if __name__ == "__main__":
    sys.exit(main())
