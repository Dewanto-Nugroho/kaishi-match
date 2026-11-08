# Cocokkan Kata — Kaishi 1.5k (versi lokal)

Aplikasi latihan bahasa Jepang dari deck **Kaishi 1.5k (versi Indonesia)**:

- **Cocokkan Kata** — cocokkan kata Jepang dengan artinya, dengan audio dari deck,
  timer 30 detik per ronde, filter status Anki, dan sistem poin.
- **Kuis N5–N1** — 6.300 soal (arti, bacaan, isi rumpang, partikel, susun kalimat,
  bacaan kalimat), lengkap dengan pembahasan tata bahasa dan furigana setelah dijawab.

Tanpa server web, tanpa database, tanpa akun. Cukup buka `index.html`.

## Kenapa aplikasi ini dibuat

Anki memang bagus untuk menjadwalkan ulangan, tetapi **kartu yang sudah dipelajari tetap
perlu dipakai** agar tidak pudar. Setelah sebuah kata lolos dari tahap belajar, jarak
ulangannya makin panjang (1 hari → 3 hari → 7 hari → …). Kalau kata itu tidak pernah
muncul di antara jadwal tersebut, ingatan bisa melemah, kartu yang tadinya *muda* tidak
kunjung menjadi *matang*, bahkan bisa turun kembali ke tahap belajar.

Aplikasi ini dibuat sebagai **latihan tambahan di sela jadwal Anki**, dengan tujuan:

1. **Kata yang sudah dipelajari selalu ter-review** — aplikasi membaca status asli dari
   Anki (baru / muda / matang, dan kapan terakhir diulang), lalu bisa menampilkan hanya
   kata yang baru dipelajari (≤ 1 hari / ≤ 3 hari) atau yang masih muda (interval < 21 hari).
2. **Diperkuat dari berbagai sisi**, bukan hanya arti: audio asli dari deck, kalimat
   contoh, furigana, soal bacaan, soal tata bahasa (partikel, isi rumpang, susun kalimat).
3. **Lebih cepat menjadi *mature*** — makin sering sebuah kata dipakai dalam konteks
   berbeda, makin kuat ingatannya, sehingga ulangan berikutnya di Anki terasa mudah dan
   intervalnya naik lebih cepat.

Singkatnya: Anki mengatur **kapan** kata diulang; aplikasi ini menjaga **seberapa kuat**
kata itu melekat di antara jadwal-jadwal tersebut.

## Cara menjalankan

1. Buka folder ini.
2. Klik dua kali **`index.html`** (Chrome, Edge, atau Firefox).
   Tidak perlu internet, tidak perlu instalasi apa pun.

Opsional — mulai cepat tanpa memilih dulu: buka `index.html?n=20` (20 kata acak, langsung main).

> **Audio belum ada?** Berkas audio tidak disertakan di repo ini (hak cipta sumber
> aslinya). Buat sendiri dari berkas `.apkg` yang Anda punya: taruh `.apkg` di folder
> ini, jalankan **`ekstrak-media.cmd`**, lalu buka aplikasinya. Lihat `KREDIT.md`.

> Jika audio tidak berbunyi padahal folder `media/` ada, jalankan lewat server lokal:
> `python -m http.server 8080` di folder ini, lalu buka `http://localhost:8080`.

## Membuka dari HP (Wi-Fi yang sama)

1. Klik dua kali **`jalankan-server.cmd`** di komputer. Akan muncul dua alamat, contohnya:
   ```
   Di komputer ini : http://127.0.0.1:8080/
   Dari HP         : http://192.168.1.4:8080/
   ```
2. Sambungkan HP ke **Wi-Fi yang sama** dengan komputer.
3. Buka alamat **"Dari HP"** di browser ponsel (Chrome/Safari).
4. Bermain seperti biasa — suara kata ikut terkirim lewat Wi-Fi.

Catatan:

- Jika muncul jendela **Windows Firewall**, pilih **Allow access** (Jaringan privat).
  Kalau halaman tidak terbuka, izinkan Python di *Windows Security → Firewall & network
  protection → Allow an app through firewall*, atau jalankan sekali di PowerShell (as admin):
  `netsh advfirewall firewall add rule name="Cocokkan Kata" dir=in action=allow protocol=TCP localport=8080`
- Server hanya aktif selama jendela perintah terbuka. Tutup jendelanya (atau Ctrl+C) untuk berhenti.
- Port otomatis pindah (8080 → 8081 → …) bila 8080 sedang dipakai; pakai alamat yang tercetak.
- Halaman ini HTTP biasa di jaringan lokal — jangan dibuka ke internet publik.
- Setelah HP terhubung, bisa ditambahkan ke layar utama (*Add to Home Screen*) agar seperti aplikasi.
- Ingin hanya bisa dibuka dari komputer sendiri? `python server.py --localhost`.

## Cara bermain

1. **Pilih kata** di layar pertama:
   - ketik di kolom pencarian untuk menyaring (kata, bacaan, arti, atau kalimat contoh);
   - kelompok **Semua kata**: semua kata, 20/50/100 acak, 200 tersering, hanya kanji, hanya kana;
   - kelompok **Dari kata yang sudah dipelajari** (muncul setelah sinkron Anki) memakai dua dropdown:
     **Kategori** (semua dipelajari / baru dipelajari ≤3 hari / masih muda / matang / pernah lupa /
     belum dipelajari) dan **Jumlah** (semua, 20, 50, 100, 200 acak) → klik **Pilih**;
   - atau centang manual satu per satu / "Pilih semua yang tampil";
   - atur **kata per ronde** (4–10 pasang), lalu klik **Mulai**.
2. Di layar permainan, klik kata Jepang → **suara kata diputar**. Lalu klik arti yang cocok.
   - **timer hitung mundur 30 detik per ronde**; kalau habis, ronde langsung pindah dan
     kata yang belum tercocokkan dicatat sebagai terlewat (masuk "perlu diulang");
   - **bacaan (hiragana) disembunyikan** selama menjawab — jadi benar-benar menguji ingatan;
   - cocok → kedua kartu terkunci hijau, bacaan tetap tidak muncul;
   - salah → kartu bergetar merah, dihitung sebagai kesalahan, masuk daftar "perlu diulang",
     dan **bacaan kata yang salah itu muncul** (tetap terlihat sampai ronde selesai);
   - klik kata yang sudah cocok untuk memutar ulang suaranya.
3. Setelah semua kata selesai, muncul ringkasan: waktu, jumlah cocok, jumlah salah, dan
   daftar seluruh kata beserta kalimat contohnya. Tersedia **Ulangi sesi**,
   **Ulangi yang salah**, dan **Pilih kata lain**.

## Menyambungkan ke Anki (lihat kata yang sudah dipelajari)

Aplikasi bisa membaca progres belajar langsung dari data Anki di komputer ini.

1. Pastikan deck **Kaishi 1.5k Indonesian - RenRen Version** sudah diimpor ke Anki.
2. Klik dua kali **`sinkron-anki.cmd`** (atau jalankan `python sinkron-anki.py`
   di folder ini). Skrip hanya membaca database Anki, tidak mengubah apa pun.
3. Muat ulang `index.html`. Sekarang setiap kata punya label status dan tersedia filter Anki.

Setelah belajar di Anki, jalankan sinkron lagi lalu muat ulang halaman.

Label status yang dipakai:

| Label | Arti |
|---|---|
| `baru` | kartu belum pernah dibuka di Anki |
| `belajar` | sedang di tahap belajar/ulang (learning) |
| `muda` | sudah lewat masa belajar, interval < 21 hari |
| `matang` | sudah kuat, interval ≥ 21 hari |
| `ditunda` | kartu di-suspend |

Filter di layar pilih kata (dropdown **Kategori** + **Jumlah**):

| Kategori | Isi |
|---|---|
| **Semua dipelajari** | pernah diulang minimal sekali |
| **Baru dipelajari (< 1 hari)** | terakhir diulang dalam 24 jam terakhir |
| **Baru dipelajari (≤ 3 hari)** | terakhir diulang dalam 3 hari terakhir |
| **Masih muda** | sudah lewat tahap belajar, interval < 21 hari |
| **Matang** | interval ≥ 21 hari |
| **Pernah lupa** | pernah gagal (lapses > 0) |
| **Belum dipelajari** | belum pernah diulang |

**Jumlah** menentukan berapa kata acak yang diambil dari kategori itu (semua, 20, 50, 100, 200).

> Skrip ini mencari `collection.anki2` di `%APPDATA%\Anki2\<profil>\` (Windows),
> `~/.local/share/Anki2` (Linux), atau `~/Library/Application Support/Anki2` (macOS),
> lalu mencocokkan catatan lewat GUID. Bila Anki sedang terbuka, data dibaca dari
> salinan sehingga beberapa menit terakhir bisa belum ikut — tutup Anki untuk hasil
> paling akurat.

## Kuis N5–N1 (soal pilihan ganda, bacaan, susun kalimat)

Buka **`kuis.html`** (atau klik "Kuis N5–N1" di halaman Cocokkan Kata).

- **Level**: N5, N4, N3, N2, N1 — bisa dipilih lebih dari satu.
- **Jenis soal** (masing-masing bisa dinyalakan/dimatikan):
  - *Arti kata* — tampil kata Jepang, pilih arti Indonesia
  - *Kata dari arti* — tampil arti, pilih kata Jepang
  - *Bacaan* — tampil kanji, pilih hiragana
  - *Isi rumpang* — kalimat asli dengan kata target dihilangkan
  - *Partikel* — kalimat asli dengan satu partikel dihilangkan
  - *Bacaan kalimat* — baca kalimat Jepang, pilih artinya
  - *Susun kalimat* — ketuk potongan kata sesuai urutan
- **Jumlah soal** 10/20/30/50, **urutan** acak atau bertingkat level.
- Ada **pembahasan** tiap soal, **ulangi yang salah**, dan tombol 🔊 untuk soal arti.
- **Furigana (hiragana di atas kanji) muncul setelah soal dijawab** — pada kata di soal,
  pilihan jawaban berkanji, dan potongan kalimat. Sebelum dijawab tetap tersembunyi
  supaya tidak membocorkan jawaban. Bacaan hanya ditempel di kanjinya
  (mis. 持**も**ってくる), bukan di seluruh kata.
- **Soal tata bahasa (partikel, isi rumpang, susun kalimat) menjelaskan kenapa jawabanmu salah**:
  peran partikel yang kamu pilih, arti kata yang salah, atau posisi potongan kalimat yang keliru,
  plus kalimat lengkapnya. Soal arti kata sengaja tanpa penjelasan tambahan.

> **Catatan level:** deck ini tidak punya tag JLPT. Level dihitung dari peringkat
> frekuensi kata di dalam deck (N5 = 40% kata paling umum, N1 = 10% paling jarang),
> jadi ini perkiraan kesulitan, bukan sertifikasi JLPT resmi.

## Baca — teks bacaan dari kosakata deck

Buka **`teks.html`** (atau tombol **Baca ›** di halaman lain).

- Teks ditulis memakai **kosakata deck Kaishi**, jadi setiap kanji punya furigana dari data deck.
- **Furigana bisa dinyalakan/dimatikan** kapan saja (tombol `ふ Furigana: ON/OFF`).
- Kata yang bisa diklik → muncul bacaan, arti, level JLPT, dan tombol **🔊 Suara** (audio deck).
- Garis bawah kata berwarna menurut level (N5 hijau → N1 merah), dan ada **sebaran level**
  teks (mis. N5 62% · N4 4% · N2 31%).
- **Terjemahan** Indonesia per teks bisa dibuka/tutup.
- **Daftar kosakata** semua kata dalam teks + arti.
- Setelah membaca ada **3 pertanyaan pemahaman** dengan pembahasan; jawaban benar memberi poin.

Teks bawaan ada di **`teks-bank.js`** (kurasi manual, 5 teks). Untuk menambah teks baru:

```bat
generate-teks.cmd                        :: susun dari kalimat deck (tanpa AI)
generate-teks.cmd --sumber ai --jumlah 5 :: minta AI menulis artikel (butuh API key)
```

Hasilnya ditulis ke `teks.js` dan otomatis muncul di daftar bersama teks kurasi.

### Pilih kata berdasarkan progres Anki

Generator bisa memilih kosakata menurut status belajar Anda di Anki
(memakai `progress.js` — jalankan `sinkron-anki.cmd` dulu):

```bat
generate-teks.cmd --kata dipelajari            :: hanya kata yang sudah pernah diulang
generate-teks.cmd --kata belum                 :: hanya kata yang belum pernah diulang
generate-teks.cmd --kata campur --rasio 70     :: 70% kata lama + 30% kata baru
generate-teks.cmd --kata campur --rasio 30     :: 30% kata lama + 70% kata baru
```

Contoh keluaran:

```
Kosakata : campur — 126 kata sudah dipelajari + 54 kata baru (total 180)
```

Bisa dikombinasikan dengan filter lain, misalnya
`generate-teks.cmd --sumber ai --kata campur --rasio 60 --level 4 --jumlah 5`.

## Membuat / memperbarui soal

Soal disimpan di **`soal.js`** (±1,5 MB, 6.300 soal). Untuk membuat ulang:

```bat
generate-soal.cmd                    :: buat dari data deck (tanpa AI, cepat, gratis)
generate-soal.cmd --maks 400         :: batasi 400 soal per jenis
generate-soal.cmd --seed 7           :: variasi susunan/distraktor
generate-soal.cmd --sumber ai        :: minta AI (lihat di bawah)
```

Saat menulis ulang, `soal.js` lama otomatis dicadangkan menjadi `soal-YYYYMMDD-HHMMSS.js`.

### Memakai AI (opsional, sesuai skema A)

1. Salin `ai-config.contoh.json` → `ai-config.json`, isi `base_url`, `model`, `api_key`
   (atau taruh kunci di `api-key.txt` / variabel `AI_API_KEY`).
   Bisa memakai DeepSeek, OpenAI, OpenRouter (termasuk model `:free`), Groq,
   atau model lokal seperti Ollama di `http://localhost:11434/v1`.
2. Jalankan:
   ```bat
   generate-soal.cmd --sumber ai
   generate-soal.cmd --sumber ai --range 0 99
   generate-soal.cmd --sumber ai --ulang --words 食べる,飲む
   generate-soal.cmd --sumber ai --dry-run
   ```
3. Hasil disimpan bertahap (`soal-cache.json`), jadi kalau terputus cukup jalankan
   lagi — kata yang sudah selesai tidak dikirim ulang (hemat token).

Validasi otomatis: opsi harus 4 dan unik, jawaban harus ada di opsi, dan **bacaan
selalu diambil dari data deck**, bukan dari jawaban AI.

## Poin, level, dan waktu belajar

Kedua halaman punya tombol **★ poin** di kanan atas. Klik untuk melihat progres:
level, poin hari ini, waktu hari ini, streak, total waktu, kata & sesi hari ini,
grafik 7 hari terakhir, dan 12 pencapaian.

**Cara mendapat poin** (dirancang supaya adil, tidak bisa "di-farm"):

| Aksi | Poin |
|---|---|
| Cocokkan: satu pasangan benar | 10 (jadi **15** kalau kata itu belum pernah dipelajari di Anki) |
| Cocokkan: ronde selesai tepat waktu | +15 |
| Kuis: jawaban benar | 8–14 tergantung jenis soal (susun kalimat & tata bahasa lebih besar) |
| Bonus level soal | N5 ×1,0 · N4 ×1,05 · N3 ×1,1 · N2 ×1,2 · N1 ×1,35 |
| Sesi selesai | +20 sampai +80 sesuai akurasi |
| Hari berturut-turut (streak) | +10 × hari, maksimal +50 per hari |

**Batas keadilan:** satu kata hanya memberi poin **3× per hari** (nilai turun: 100%,
60%, 35%), dan total poin dibatasi **3.000 per hari**. Jawaban salah tidak mengurangi
poin — hanya tidak menambah.

**Level:** butuh 100 poin untuk level 2, 300 untuk level 3, 600 untuk level 4, dan
seterusnya (rumus 50·L·(L+1) kumulatif).

**Waktu belajar** dihitung otomatis: hanya saat tab **terlihat** dan ada aktivitas
(klik/ketik/scroll) dalam 90 detik terakhir, jadi waktu saat aplikasi ditinggal
menganggur tidak ikut dihitung. Data disimpan di `localStorage` peramban — satu
perangkat, dan bisa direset dari halaman ini bila perlu.

## Isi folder

| Berkas | Keterangan |
|---|---|
| `index.html` | seluruh tampilan + logika permainan (tanpa dependensi) |
| `deck.js` | data 1.488 kata hasil ekstraksi deck (kata, bacaan, arti, frekuensi, kalimat, ID audio, GUID) |
| `media/` | 1.487 berkas mp3 audio kata, diambil dari dalam `.apkg` |
| `sinkron-anki.py` | pembaca database Anki → menghasilkan `progress.js` |
| `sinkron-anki.cmd` | pembungkus untuk klik dua kali di Windows |
| `server.py` | server lokal agar bisa dibuka dari HP lewat Wi-Fi |
| `jalankan-server.cmd` | pembungkus untuk klik dua kali di Windows |
| `stats.js` | sistem poin, level, pencapaian, dan pelacakan waktu (dipakai kedua halaman) |
| `kuis.html` | halaman kuis N5–N1 |
| `soal.js` | bank soal hasil generator (6.300 soal) |
| `generate-soal.py` / `.cmd` | pembuat soal (lokal atau lewat AI) |
| `teks.html` | pembaca teks: furigana on/off, arti per kata, sebaran level, soal pemahaman |
| `teks-bank.js` | teks bacaan kurasi (5 teks) yang selalu tersedia |
| `generate-teks.py` / `.cmd` | pembuat teks bacaan (lokal atau lewat AI) → `teks.js` |
| `progress.js` | hasil sinkronisasi (dibuat otomatis; boleh dihapus kapan saja) |
| `ekstrak-media.py` / `.cmd` | mengambil audio dari berkas `.apkg` milik Anda → folder `media/` |
| `KREDIT.md` | sumber deck, audio, ilustrasi, dan catatan lisensi |

## Memasang di GitHub / GitHub Pages

Repo ini siap diunggah. Yang **tidak** ikut ter-commit (lihat `.gitignore`):
`media/` (audio, hak cipta), `progress.js` (data pribadi), `ai-config.json` /
`api-key.txt` (kunci API), dan cadangan `soal-*.js`.

Untuk GitHub Pages: **Settings → Pages → Deploy from branch → `main` / root**.
Audio tidak akan ada di sana sampai `media/` ikut diunggah — dan itu berarti
mengunggah ulang audio milik pihak lain, jadi pikirkan dulu lisensinya.

## Catatan tentang data

- Deck asli berisi 1.501 catatan. Saat diekstrak:
  - kartu "Welcome" dibuang;
  - 12 baris duplikat (kata + bacaan + arti sama persis) dibuang → **1.488 kata**.
- **Perbaikan arti:** deck asli menyalin satu arti untuk kata yang punya dua bacaan,
  sehingga beberapa arti tertukar. Untuk 12 pasang homograf, artinya dikoreksi manual
  agar sesuai bacaan, misalnya `辛い [からい] = pedas` (aslinya tertulis "berat; menyusahkan"),
  `下 [した] = di bawah` vs `下 [もと] = di bawah (bimbingan)`, `時 [とき] = waktu` vs `時 [じ] = jam`.
- Arti kalimat pada beberapa pasangan duplikat di deck asli juga tertukar. Di aplikasi ini
  arti kalimat hanya ditampilkan di layar ringkasan, dan bisa saja masih mengikuti teks deck.
- Pitch accent tidak dipakai karena di deck asli pun tersembunyi (blok template dikomentari).
