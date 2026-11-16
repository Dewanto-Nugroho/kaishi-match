# Kredit & lisensi data

## Deck

- **Kaishi 1.5k** — dibuat oleh **donkuri** (<https://github.com/donkuri/Kaishi>).
- Versi bahasa Indonesia ("RenRen Version") adalah terjemahan pihak ketiga dari deck tersebut.
- Data kata, bacaan, arti, dan kalimat contoh di `deck.js` berasal dari deck itu.

## Audio

Berkas audio **tidak disertakan** di repo ini karena hak ciptanya milik sumber aslinya:

- Audio kata: **NHK 日本語発音アクセント新辞典** (sebagaimana tertera pada nama berkas di deck).
- Audio kalimat: **JLPT Tango N5 / N4**.

Audio dapat dibuat sendiri dari berkas `.apkg` Kaishi yang Anda unduh, dengan:

```bat
ekstrak-media.cmd
```

## Ilustrasi

Deck asli memakai ilustrasi dari **Irasutoya** (<https://www.irasutoya.com/>). Gambar tidak
disertakan pada aplikasi ini.

## Kode aplikasi

Kode di repo ini (`index.html`, `kuis.html`, `stats.js`, skrip Python) ditulis untuk
memakai data deck di atas. Silakan tentukan lisensi kode sesuai keinginan Anda
(mis. MIT) dengan menambahkan berkas `LICENSE`.

## Catatan

Jika Anda ingin menyertakan `media/` di repo publik, periksa dulu apakah lisensi
sumber audio tersebut mengizinkannya. Cara yang aman: biarkan pengguna lain
menjalankan `ekstrak-media.cmd` dengan berkas deck milik mereka sendiri.

## Soal JLPT & Kamus Bahasa Indonesia

- **Bank Soal Latihan JLPT N5–N1** (`jlpt.html`, `jlpt-data-n*.js`):
  bersumber dari proyek komunitas [astraJLPT-Editorial](https://github.com/astraJLPT/astraJLPT-Editorial)
  (arsip soal JLPT tahun 2009–2026).
- **Kamus & Pembahasan Bahasa Indonesia**:
  disusun menggunakan [JIDict (Philia Space)](https://github.com/philiaspaceai/JIDict-yomitan)
  oleh Utawnyan & Demonkzz (lisensi **CC BY-NC 4.0**), bersama data leksikal dasar
  **JMdict** & **KANJIDIC2** dari **EDRDG** (*Electronic Dictionary Research and Development Group*).
