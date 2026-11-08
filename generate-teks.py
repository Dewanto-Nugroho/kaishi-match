#!/usr/bin/env python3
"""Generator teks bacaan (reading) dari kosakata deck Kaishi.

Dua sumber:
  --sumber ai    : minta AI menulis artikel pendek memakai kosakata deck (butuh API key)
  --sumber lokal : menyusun bacaan dari kalimat-kalimat asli deck (tanpa AI)

Hasil ditulis ke teks.js, dibaca oleh teks.html.

Contoh:
  generate-teks.cmd
  generate-teks.cmd --sumber ai --jumlah 5 --level 4
  generate-teks.cmd --sumber ai --dry-run
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
PROGRESS_JS = os.path.join(HERE, "progress.js")
OUT = os.path.join(HERE, "teks.js")
AI_CONFIG = os.path.join(HERE, "ai-config.json")
CACHE = os.path.join(HERE, "teks-cache.json")

LEVEL_NAMES = {5: "N5", 4: "N4", 3: "N3", 2: "N2", 1: "N1"}
LEVEL_PERSEN = [0.40, 0.60, 0.78, 0.90]
PARTICLES = ["は", "が", "を", "に", "で", "へ", "と", "も", "の", "から", "まで", "より", "や"]
PSET = set(PARTICLES)
KANJI = re.compile(r"[\u3400-\u4dbf\u4e00-\u9fff]")


# ------------------------------------------------------------------ util
def nk(s):
    return unicodedata.normalize("NFKC", s or "").strip()


def level_of(rank, cutoffs):
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


def build_vocab(words):
    v = set()
    for w in words:
        for form in (w["w"], w["r"]):
            if 2 <= len(form) <= 7:
                v.add(form)
    return v


# ------------------------------------------------------- filter progres Anki
def load_progress():
    """Baca progress.js (hasil sinkron-anki) -> {word_id: reps>0}."""
    if not os.path.exists(PROGRESS_JS):
        return None
    try:
        with open(PROGRESS_JS, encoding="utf-8") as f:
            raw = f.read()
        data = json.loads(raw[raw.index("{"): raw.rindex("}") + 1])
        cards = data.get("cards") or {}
        return {int(k): (v[3] > 0) for k, v in cards.items()}
    except (ValueError, KeyError, IndexError, OSError):
        return None


def split_by_progress(words, studied, rng, mode, ratio, size=60):
    """Bagi kosakata menurut progres belajar & ambil sampel sesuai mode."""
    if not studied or mode == "semua":
        return words, {"mode": "semua", "lama": sum(1 for w in words if studied and studied.get(w["id"])),
                       "baru": sum(1 for w in words if studied and not studied.get(w["id"]))}

    learned = [w for w in words if studied.get(w["id"])]
    fresh = [w for w in words if not studied.get(w["id"])]

    if mode == "dipelajari":
        return learned, {"mode": "dipelajari", "lama": len(learned), "baru": 0}
    if mode == "belum":
        return fresh, {"mode": "belum", "lama": 0, "baru": len(fresh)}

    # campur: sebagian besar kata yang sudah dipelajari + sisanya kata baru
    n_old = int(round(size * ratio / 100))
    n_new = size - n_old
    ambil_lama = rng.sample(learned, min(n_old, len(learned))) if learned else []
    ambil_baru = rng.sample(fresh, min(n_new, len(fresh))) if fresh else []
    return ambil_lama + ambil_baru, {
        "mode": "campur", "lama": len(ambil_lama), "baru": len(ambil_baru),
        "total_lama": len(learned), "total_baru": len(fresh),
    }


def describe_pool(info, n):
    m = info.get("mode")
    if m == "dipelajari":
        return "hanya kata yang SUDAH dipelajari (%d kata)" % n
    if m == "belum":
        return "hanya kata yang BELUM dipelajari (%d kata)" % n
    if m == "campur":
        return "campur — %d kata sudah dipelajari + %d kata baru (total %d)" % (
            info.get("lama", 0), info.get("baru", 0), n)
    return "semua kata (%d)" % n



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


# ------------------------------------------------------------------ level mix
def sebaran(text, by_form, cutoffs_words):
    """Persentase kata per level di dalam sebuah teks."""
    counts = {5: 0, 4: 0, 3: 0, 2: 0, 1: 0}
    total = 0
    for tok in segment(text, cutoffs_words["vocab"]):
        w = by_form.get(tok)
        if not w:
            continue
        counts[w["lv"]] += 1
        total += 1
    if not total:
        return {}
    out = {}
    for lv in (5, 4, 3, 2, 1):
        pct = round(counts[lv] / total * 100)
        if pct:
            out[lv] = pct
    return out


# ------------------------------------------------------------------ lokal
def teks_lokal(words, jumlah, rng, vocab_map, npar=3):
    """Susun bacaan pendek dari kalimat asli deck yang bertema sama."""
    # indeks kata -> entri, dan hitung kata yang sering muncul di banyak kalimat
    by_sentence = [w for w in words if w["s"] and len(w["s"]) >= 8]
    freq = {}
    for w in by_sentence:
        for tok in segment(w["s"], set(vocab_map.keys())):
            if tok in vocab_map and len(tok) >= 2:
                freq[tok] = freq.get(tok, 0) + 1
    seeds = [k for k, v in sorted(freq.items(), key=lambda x: -x[1]) if v >= 4]
    rng.shuffle(seeds)
    seeds.sort(key=lambda k: 0 if KANJI.search(k) else 1)   # utamakan kata berkanji

    used_seed = set()
    out = []
    for seed in seeds:
        if len(out) >= jumlah:
            break
        if seed in used_seed:
            continue
        used_seed.add(seed)
        picked = [w for w in by_sentence if seed in w["s"]][:6]
        if len(picked) < 3:
            continue
        picked = picked[:5]
        rng.shuffle(picked)

        # bagi kalimat ke beberapa paragraf
        n = max(1, min(npar, len(picked)))
        paragraf = []
        for i in range(n):
            bagian = picked[i::n]
            if bagian:
                paragraf.append("".join(w["s"] for w in bagian))
        judul = "%s について" % seed
        arti = " ".join(w["sm"] for w in picked if w["sm"])
        kata_ids = []
        for w in picked:
            if w["id"] not in kata_ids:
                kata_ids.append(w["id"])

        soal = []
        # 1) arti sebuah kata di dalam teks
        target = rng.choice([w for w in picked if KANJI.search(w["w"])] or picked)
        opsi = [target["m"]] + [x["m"] for x in rng.sample(words, 3) if x["m"] != target["m"]][:3]
        if len(opsi) == 4:
            idx = 0
            rng.shuffle(opsi)
            soal.append({
                "q": "「%s」はどういう意味ですか。" % target["w"],
                "o": opsi, "a": opsi.index(target["m"]),
                "n": "%s（%s）= %s" % (target["w"], target["r"], target["m"]),
            })
        # 2) arti salah satu kalimat
        kal = rng.choice(picked)
        opsi2 = [kal["sm"]] + [x["sm"] for x in rng.sample(words, 3) if x["sm"] and x["sm"] != kal["sm"]][:3]
        if len(opsi2) == 4:
            rng.shuffle(opsi2)
            soal.append({
                "q": "「%s」の意味はどれですか。" % kal["s"],
                "o": opsi2, "a": opsi2.index(kal["sm"]),
                "n": "%s — %s" % (kal["s"], kal["sm"]),
            })
        # 3) isi rumpang di kalimat
        celah = rng.choice([w for w in picked if w["w"] in w["s"]])
        opsi3 = [celah["w"]] + [x["w"] for x in rng.sample(words, 3) if x["w"] != celah["w"] and x["w"] not in celah["s"]][:3]
        if len(opsi3) == 4:
            rng.shuffle(opsi3)
            soal.append({
                "q": celah["s"].replace(celah["w"], "＿＿＿", 1),
                "o": opsi3, "a": opsi3.index(celah["w"]),
                "n": "%s — %s" % (celah["s"], celah["sm"]),
            })

        text_all = "".join(paragraf)
        out.append({
            "judul": judul,
            "level": max(w["lv"] for w in picked),
            "paragraf": paragraf,
            "arti": arti,
            "kata": kata_ids,
            "sebaran": sebaran(text_all, {w["w"]: w for w in words}, {"vocab": vocab_map}),
            "soal": soal,
            "sumber": "lokal",
        })
    return out


# ------------------------------------------------------------------ AI
PROMPT = """Kamu penulis materi bacaan bahasa Jepang untuk pembelajar Indonesia.

Tulis SATU teks bacaan pendek: tepat %d paragraf, masing-masing 2-3 kalimat
(total sekitar %d-%d kalimat). Tema bebas yang ringan (seperti artikel kecil:
kehidupan sehari-hari, sekolah, makanan, cuaca, kebiasaan).

WAJIB memakai kosakata dari daftar berikut (boleh bentuk infleksi/okurigana, boleh partikel
dan kata bantu apa pun):

%s

Ketentuan:
- Semua kata kanji yang muncul harus berasal dari daftar di atas.
- Kalimat pendek dan natural, level kira-kira %s.
- Sertakan 3 pertanyaan pemahaman isi bacaan, masing-masing 4 pilihan.
- Pertanyaan dalam bahasa Jepang, pilihan boleh bahasa Jepang atau Indonesia (konsisten).
- Jangan menulis furigana; cukup kanji biasa.

Balas HANYA JSON:
{"judul":"...","paragraf":["...","..."],"arti":"terjemahan Indonesia dari seluruh teks",
 "soal":[{"q":"...","o":["..","..","..",".."],"a":0,"n":"penjelasan singkat"}]}"""


def detect_provider(cfg):
    p = (cfg.get("provider") or "").strip().lower()
    if p in ("openai", "anthropic", "gemini"):
        return p
    url = (cfg.get("base_url") or "").lower()
    if "anthropic.com" in url:
        return "anthropic"
    if "generativelanguage.googleapis.com" in url:
        return "gemini"
    return "openai"   # DeepSeek, OpenAI, OpenRouter, Groq, Ollama, LM Studio, dll.


def parse_json(text):
    s = text[text.find("{"): text.rfind("}") + 1]
    return json.loads(s)


def call_openai(cfg, prompt, timeout):
    body = {
        "model": cfg["model"],
        "messages": [
            {"role": "system", "content": "Kamu penulis materi bacaan. Jawab hanya JSON."},
            {"role": "user", "content": prompt},
        ],
        "temperature": 0.8,
        "response_format": {"type": "json_object"},
    }
    req = urllib.request.Request(
        cfg["base_url"].rstrip("/") + "/chat/completions",
        data=json.dumps(body).encode("utf-8"),
        headers={"Content-Type": "application/json", "Authorization": "Bearer " + cfg["api_key"]},
    )
    with urllib.request.urlopen(req, timeout=timeout) as r:
        data = json.loads(r.read().decode("utf-8"))
    return parse_json(data["choices"][0]["message"]["content"])


def call_anthropic(cfg, prompt, timeout):
    base = (cfg.get("base_url") or "https://api.anthropic.com").rstrip("/")
    if base.endswith("/v1"):
        base = base[:-3]
    body = {
        "model": cfg["model"],
        "max_tokens": 2500,
        "system": "Kamu penulis materi bacaan. Jawab hanya JSON.",
        "messages": [{"role": "user", "content": prompt}],
    }
    req = urllib.request.Request(
        base + "/v1/messages",
        data=json.dumps(body).encode("utf-8"),
        headers={
            "Content-Type": "application/json",
            "x-api-key": cfg["api_key"],
            "anthropic-version": "2023-06-01",
        },
    )
    with urllib.request.urlopen(req, timeout=timeout) as r:
        data = json.loads(r.read().decode("utf-8"))
    text = "".join(b.get("text", "") for b in data.get("content", []))
    return parse_json(text)


def call_gemini(cfg, prompt, timeout):
    base = (cfg.get("base_url") or "https://generativelanguage.googleapis.com/v1beta").rstrip("/")
    url = "%s/models/%s:generateContent?key=%s" % (base, cfg["model"], cfg["api_key"])
    body = {
        "contents": [{"parts": [{"text": "Kamu penulis materi bacaan. Jawab hanya JSON.\n\n" + prompt}]}],
        "generationConfig": {"temperature": 0.8, "responseMimeType": "application/json"},
    }
    req = urllib.request.Request(
        url, data=json.dumps(body).encode("utf-8"),
        headers={"Content-Type": "application/json"},
    )
    with urllib.request.urlopen(req, timeout=timeout) as r:
        data = json.loads(r.read().decode("utf-8"))
    text = data["candidates"][0]["content"]["parts"][0]["text"]
    return parse_json(text)


def load_ai_config(args):
    cfg = {"provider": "openai", "base_url": "https://api.deepseek.com/v1",
           "model": "deepseek-chat", "api_key": ""}
    if os.path.exists(AI_CONFIG):
        with open(AI_CONFIG, encoding="utf-8-sig") as f:
            cfg.update(json.load(f))
    if getattr(args, "provider", None):
        cfg["provider"] = args.provider
    if args.model:
        cfg["model"] = args.model
    if args.base_url:
        cfg["base_url"] = args.base_url
    key = cfg.get("api_key") or os.environ.get("AI_API_KEY") or ""
    if not key and os.path.exists(os.path.join(HERE, "api-key.txt")):
        with open(os.path.join(HERE, "api-key.txt"), encoding="utf-8") as f:
            key = f.read().strip()
    cfg["api_key"] = key
    return cfg


def call_ai(cfg, vocab_block, level_name, paragraf=3, timeout=180):
    prompt = PROMPT % (paragraf, paragraf * 2, paragraf * 3, vocab_block, level_name)
    provider = detect_provider(cfg)
    if provider == "anthropic":
        return call_anthropic(cfg, prompt, timeout)
    if provider == "gemini":
        return call_gemini(cfg, prompt, timeout)
    return call_openai(cfg, prompt, timeout)


def valid_teks(raw, words):
    judul = nk(raw.get("judul", ""))[:60]
    par = [nk(p) for p in raw.get("paragraf", []) if nk(p)]
    if not judul or not par:
        return None
    if sum(len(p) for p in par) > 900:
        par = par[:6]
    arti = nk(raw.get("arti", ""))
    soal = []
    for s in raw.get("soal", [])[:5]:
        try:
            o = [nk(x) for x in s["o"]]
            a = int(s["a"])
        except (KeyError, TypeError, ValueError):
            continue
        if len(o) != 4 or len(set(o)) != 4 or not (0 <= a < 4):
            continue
        q = nk(s.get("q", ""))
        if not q:
            continue
        soal.append({"q": q, "o": o, "a": a, "n": nk(s.get("n", ""))})
    if not soal:
        return None
    by_form = {}
    for w in words:
        by_form.setdefault(w["w"], w)
    vocab = build_vocab(words)
    text_all = "".join(par)
    return {
        "judul": judul,
        "level": 3,
        "paragraf": par,
        "arti": arti,
        "kata": [],
        "sebaran": sebaran(text_all, by_form, {"vocab": vocab}),
        "soal": soal,
        "sumber": "ai",
    }


def generate_ai(words, args):
    cfg = load_ai_config(args)
    if not cfg["api_key"]:
        print("! API key belum ada. Isi ai-config.json / api-key.txt / variabel AI_API_KEY.")
        return None
    print("Provider : %s (%s)" % (detect_provider(cfg), cfg.get("model")))

    cache = {}
    if os.path.exists(CACHE):
        with open(CACHE, encoding="utf-8") as f:
            cache = json.load(f)
    have = cache.get("teks", [])

    rng = random.Random(args.seed)
    hasil = [] if args.ulang else list(have)
    perlu = max(1, args.jumlah - len(hasil))

    # filter level + progres Anki
    base = [w for w in words if w["lv"] >= args.level]
    if len(base) < 40:
        base = words
    studied = load_progress()
    if args.kata != "semua" and studied is None:
        print("! progress.js belum ada — jalankan sinkron-anki.cmd dulu.")
        print("  Untuk sementara memakai semua kata.")
        args.kata = "semua"
    pool_all, info = split_by_progress(
        base, studied, rng, args.kata, args.rasio,
        size=min(len(base), 60 * max(1, args.jumlah)))
    print("Kosakata : %s" % describe_pool(info, len(pool_all)))
    if len(pool_all) < 20:
        print("! kata yang memenuhi syarat terlalu sedikit (%d)." % len(pool_all))
        print("  Coba --kata semua, kurangi --level, atau sinkronkan ulang Anki.")
        return None

    for n in range(perlu):
        sampel = rng.sample(pool_all, min(60, len(pool_all)))
        blok = "\n".join("- %s（%s）= %s" % (w["w"], w["r"], w["m"]) for w in sampel)
        print("  menulis teks %d/%d (level %s, %d kata)..." % (n + 1, perlu, LEVEL_NAMES[args.level], len(sampel)))
        try:
            raw = call_ai(cfg, blok, LEVEL_NAMES[args.level], args.paragraf)
        except (urllib.error.URLError, TimeoutError, ValueError, KeyError) as exc:
            print("  ! gagal: %s" % exc)
            continue
        item = valid_teks(raw, words)
        if not item:
            print("  ! hasil tidak valid, dilewati")
            continue
        item["level"] = args.level
        hasil.append(item)
        if args.dry_run:
            print(json.dumps(item, ensure_ascii=False, indent=1)[:1200])
            return "dry-run"
        time.sleep(0.5)

    with open(CACHE, "w", encoding="utf-8") as f:
        json.dump({"teks": hasil}, f, ensure_ascii=False)
    return hasil


# ------------------------------------------------------------------ output
def write_out(teks, words, sumber):
    lv_map = {w["w"]: w["lv"] for w in words}
    payload = {
        "meta": {
            "dibuat": int(time.time() * 1000),
            "sumber": sumber,
            "total": len(teks),
            "lv": lv_map,
        },
        "teks": teks,
    }
    if os.path.exists(OUT):
        backup = os.path.join(HERE, "teks-%s.js" % time.strftime("%Y%m%d-%H%M%S"))
        with open(OUT, encoding="utf-8") as f:
            old = f.read()
        with open(backup, "w", encoding="utf-8") as f:
            f.write(old)
        print("Cadangan : %s" % os.path.basename(backup))
    with open(OUT, "w", encoding="utf-8") as f:
        f.write("window.KAISHI_TEKS = ")
        json.dump(payload, f, ensure_ascii=False, separators=(",", ":"))
        f.write(";\n")
    print("Ditulis  : teks.js (%.1f KB)" % (os.path.getsize(OUT) / 1024))
    print("Total    : %d teks, %d soal" % (len(teks), sum(len(t["soal"]) for t in teks)))
    for t in teks[:5]:
        print("  - [%s] %s (%d paragraf, %d soal)" % (
            LEVEL_NAMES.get(t["level"], "?"), t["judul"], len(t["paragraf"]), len(t["soal"])))


def main():
    try:
        sys.stdout.reconfigure(encoding="utf-8")
    except Exception:
        pass
    ap = argparse.ArgumentParser(description="Generator teks bacaan dari deck Kaishi")
    ap.add_argument("--sumber", choices=["lokal", "ai"], default="lokal")
    ap.add_argument("--jumlah", type=int, default=8)
    ap.add_argument("--level", type=int, default=4, help="4=N4, 3=N3, 5=N5 (untuk AI)")
    ap.add_argument("--kata", choices=["semua", "dipelajari", "belum", "campur"], default="semua",
                    help="pilih kosakata berdasarkan progres Anki (progress.js)")
    ap.add_argument("--rasio", type=int, default=70,
                    help="persentase kata yang sudah dipelajari saat --kata campur (default 70)")
    ap.add_argument("--seed", type=int, default=1)
    ap.add_argument("--ulang", action="store_true")
    ap.add_argument("--provider", choices=["openai", "anthropic", "gemini"],
                    help="penyedia AI (default: terdeteksi dari base_url)")
    ap.add_argument("--paragraf", type=int, default=3,
                    help="jumlah paragraf teks yang diminta dari AI (default 3)")
    ap.add_argument("--model")
    ap.add_argument("--base-url")
    ap.add_argument("--dry-run", action="store_true")
    args = ap.parse_args()

    if not os.path.exists(DECK_JS):
        print("! deck.js tidak ditemukan.")
        return 1

    deck, words = load_deck()
    print("Deck  : %s (%d kata)" % (deck.get("deck", "Kaishi"), len(words)))

    if args.sumber == "lokal":
        rng = random.Random(args.seed)
        studied = load_progress()
        if args.kata != "semua" and studied is None:
            print("! progress.js belum ada — jalankan sinkron-anki.cmd dulu.")
            print("  Untuk sementara memakai semua kata.")
            args.kata = "semua"
        pool, info = split_by_progress(
            words, studied, rng, args.kata, args.rasio,
            size=min(len(words), 60 * max(3, args.jumlah)))
        print("Kosakata : %s" % describe_pool(info, len(pool)))

        vocab_map = {w["w"]: w for w in pool}
        vocab = build_vocab(pool)
        for k in list(vocab_map.keys()):
            if 2 <= len(k) <= 7:
                vocab.add(k)
        teks = teks_lokal(pool, args.jumlah, rng, {v: vocab_map[v] for v in vocab if v in vocab_map},
                          args.paragraf)
        if not teks:
            print("! tidak ada kalimat yang bisa disusun.")
            return 1
        write_out(teks, words, "lokal")
    else:
        teks = generate_ai(words, args)
        if teks is None:
            return 1
        if teks == "dry-run":
            return 0
        if not teks:
            print("! tidak ada teks yang berhasil dibuat.")
            return 1
        write_out(teks, words, "ai")
    return 0


if __name__ == "__main__":
    sys.exit(main())
