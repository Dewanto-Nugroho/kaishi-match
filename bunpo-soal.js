/* Bank Soal Fokus Per Materi untuk halaman Bunpo (Tata Bahasa) */
window.KAISHI_BUNPO_SOAL = {
  "te_konjugasi": {
    title: "Konjugasi Bentuk ~て (Golongan 1, 2, 3)",
    category: "Bentuk ~て",
    questions: [
      {
        q: "Ubahlah kata kerja Golongan 1 <ruby>待<rt>ま</rt></ruby>つ (menunggu) ke dalam <b>Bentuk ~て</b> yang benar:",
        speech: "待って",
        opts: ["待いて (maite)", "待って (matte)", "待んで (mande)", "待して (mashite)"],
        a: 1,
        exp: "Kata kerja Golongan 1 berakhiran <b>う, つ, る</b> berubah menjadi <b>〜って (-tte)</b>. Maka 待つ (matsu) menjadi <b>待って (matte)</b>."
      },
      {
        q: "Ubahlah kata kerja <ruby>飲<rt>の</rt></ruby>む (minum) dan <ruby>遊<rt>あそ</rt></ruby>ぶ (bermain) ke dalam <b>Bentuk ~て</b>:",
        speech: "飲んで、遊んで",
        opts: ["飲って、遊って", "飲いて、遊いて", "飲んで、遊んで", "飲して、遊して"],
        a: 2,
        exp: "Kata kerja Golongan 1 berakhiran <b>む, ぶ, ぬ</b> berubah menjadi <b>〜んで (-nde)</b>. Maka 飲む ➔ <b>飲んで (nonde)</b> dan 遊ぶ ➔ <b>遊んで (asonde)</b>."
      },
      {
        q: "Manakah perubahan <b>Bentuk ~て</b> yang benar untuk kata kerja pengecualian <ruby>行<rt>い</rt></ruby>く (pergi)?",
        speech: "行って",
        opts: ["行いて (iite)", "行って (itte)", "行んで (inde)", "行て (ite)"],
        a: 1,
        exp: "Meskipun berakhiran く (yang normalnya menjadi 〜いて seperti 書く ➔ 書いて), kata kerja <b>行く (iku) adalah pengecualian khusus</b> yang berubah menjadi <b>行って (itte)</b>."
      },
      {
        q: "Kata kerja <ruby>帰<rt>かえ</rt></ruby>る (pulang) dan <ruby>走<rt>はし</rt></ruby>る (berlari) termasuk kata jebakan Golongan 1. Bagaimana <b>Bentuk ~て</b> keduanya?",
        speech: "帰って、走って",
        opts: ["帰て、走て", "帰って、走って", "帰んで、走んで", "帰いて、走いて"],
        a: 1,
        exp: "Walaupun berbunyi akhir <i>-eru/-iru</i>, <b>帰る (kaeru)</b> dan <b>走る (hashiru)</b> adalah kata kerja <b>Golongan 1</b>, sehingga mengikuti rumus る ➔ って menjadi <b>帰って (kaette)</b> dan <b>走って (hashitte)</b>."
      },
      {
        q: "Bagaimana perubahan <b>Bentuk ~て</b> untuk kata kerja Golongan 2 <ruby>食<rt>た</rt></ruby>べる (makan) dan Golongan 3 <ruby>来<rt>く</rt></ruby>る (datang)?",
        speech: "食べて、来て",
        opts: ["食って、来って", "食べて、来て (kite)", "食べて、来いて (kuite)", "食んで、来んで"],
        a: 1,
        exp: "Golongan 2 cukup hapus る + て: 食べる ➔ <b>食べて (tabete)</b>. Golongan 3 tidak beraturan: 来る (kuru) ➔ <b>来て (kite)</b>."
      },
      {
        q: "Bagaimana bentuk penghubung (~て) dari kata sifat-i <ruby>安<rt>やす</rt></ruby>い (murah) dan いい (bagus)?",
        speech: "安くて、よくて",
        opts: ["安いで、いいで", "安くて、よくて", "安って、いって", "安くて、いいくて"],
        a: 1,
        exp: "Kata sifat -i diubah dengan mengganti い menjadi <b>〜くて</b> (安い ➔ <b>安くて</b>). Khusus kata sifat <b>いい (bagus)</b> kembali ke bentuk dasarnya よい sehingga menjadi <b>よくて (yokute)</b>."
      }
    ]
  },

  "te_kudasai": {
    title: "Pola 〜てください (Tolong / Silakan)",
    category: "Bentuk ~て",
    questions: [
      {
        q: "Lengkapi kalimat permohonan sopan berikut:<br><span class=\"jp\">ここに<ruby>名前<rt>なまえ</rt></ruby>を（　　）ください。</span><br><small>(Tolong tulis nama di sini.)</small>",
        speech: "ここに名前を書いてください。",
        opts: ["書く (kaku)", "書いて (kaite)", "書きます (kakimasu)", "書いた (kaita)"],
        a: 1,
        exp: "Pola meminta tolong menggunakan <b>Kata Kerja Bentuk ~て + ください</b>. Kata kerja 書く (kaku - menulis) berakhiran く sehingga berubah menjadi <b>書いて (kaite)</b>."
      },
      {
        q: "Bagaimana cara mengatakan <i>\"Tolong tunggu sebentar\"</i> menggunakan kata kerja <ruby>待<rt>ま</rt></ruby>つ (matsu)?",
        speech: "ちょっと待ってください。",
        opts: ["ちょっと待つください。", "ちょっと待ってください。", "ちょっと待いてください。", "ちょっと待ちください。"],
        a: 1,
        exp: "待つ (matsu) berakhiran つ, berubah ke bentuk ~て menjadi <b>待って (matte)</b> + ください ➔ <b>ちょっと待ってください</b>."
      },
      {
        q: "<span class=\"jp\">すみません、そのペンを（　　）ください。</span><br><small>(Maaf, tolong pinjamkan pulpen itu. — dari kata 貸す / kasu)</small>",
        speech: "すみません、そのペンを貸してください。",
        opts: ["貸して (kashite)", "貸いて (kaite)", "貸って (katte)", "貸んで (kande)"],
        a: 0,
        exp: "Kata kerja 貸す (kasu - meminjamkan) berakhiran <b>す</b>, sehingga bentuk ~て-nya adalah <b>貸して (kashite)</b> + ください."
      },
      {
        q: "<span class=\"jp\">どうぞたくさん（　　）ください。</span><br><small>(Silakan makan yang banyak. — dari kata 食べる / taberu)</small>",
        speech: "どうぞたくさん食べてください。",
        opts: ["食って", "食べて", "食べりて", "食べんで"],
        a: 1,
        exp: "食べる (taberu) adalah kata kerja Golongan 2 (Ichidan). Hapus る lalu tambah て menjadi <b>食べて (tabete)</b> + ください."
      },
      {
        q: "Apa arti dari kalimat berikut?<br><span class=\"jp\">ゆっくり<ruby>話<rt>はな</rt></ruby>してください。</span>",
        speech: "ゆっくり話してください。",
        opts: ["Dilarang berbicara pelan-pelan.", "Bolehkah saya berbicara pelan-pelan?", "Tolong berbicara dengan pelan-pelan.", "Saya sedang berbicara pelan-pelan."],
        a: 2,
        exp: "ゆっくり (pelan-pelan) + 話して (bentuk ~て dari 話す: berbicara) + ください (tolong) = <b>Tolong berbicara dengan pelan-pelan</b>."
      }
    ]
  },

  "te_imasu": {
    title: "Pola 〜ています (Sedang / Status Keadaan)",
    category: "Bentuk ~て",
    questions: [
      {
        q: "Lengkapi kalimat untuk menyatakan aksi yang <b>sedang berlangsung</b>:<br><span class=\"jp\"><ruby>今<rt>いま</rt></ruby>、<ruby>音楽<rt>おんがく</rt></ruby>を（　　）。</span><br><small>(Sekarang saya sedang mendengarkan musik. — dari 聞く / kiku)</small>",
        speech: "今、音楽を聞いています。",
        opts: ["聞くいます", "聞いています", "聞いてください", "聞いてもいいです"],
        a: 1,
        exp: "Untuk menyatakan kegiatan yang sedang berlangsung sekarang (今), gunakan <b>Bentuk ~て + います</b>. 聞く (kiku) ➔ 聞いて + います = <b>聞いています</b>."
      },
      {
        q: "Bagaimana mengatakan <i>\"Saya tinggal di Jakarta\"</i> dengan kata kerja <ruby>住<rt>す</rt></ruby>む (sumu)?",
        speech: "ジャカルタに住んでいます。",
        opts: ["ジャカルタに住んでいます。", "ジャカルタに住みます。", "ジャカルタに住ってください。", "ジャカルタに住いています。"],
        a: 0,
        exp: "Untuk menyatakan status tempat tinggal yang menetap saat ini, bahasa Jepang menggunakan pola <b>〜ています</b>. 住む (sumu) berakhiran む ➔ <b>住んで (sunde) + います</b>."
      },
      {
        q: "<span class=\"jp\"><ruby>兄<rt>あに</rt></ruby>はもう<ruby>結婚<rt>けっこん</rt></ruby>（　　）。</span><br><small>(Kakak laki-laki saya sudah menikah [statusnya sekarang menikah].)</small>",
        speech: "兄はもう結婚しています。",
        opts: ["すっています", "しています", "してあります", "してしまいます"],
        a: 1,
        exp: "結婚する (menikah) dalam bentuk status yang masih berlaku menggunakan <b>結婚しています (kekkon shite imasu)</b>."
      },
      {
        q: "Manakah kalimat yang benar untuk menanyakan <i>\"Sekarang sedang melakukan apa?\"</i>",
        speech: "今、何をしていますか。",
        opts: ["今、何をしてからですか。", "今、何をしていますか。", "今、何をしてくださいか。", "今、何をしてはいけませんか。"],
        a: 1,
        exp: "する (melakukan) ➔ して + いますか = <b>何をしていますか</b> (Sedang melakukan apa?)."
      },
      {
        q: "<span class=\"jp\"><ruby>外<rt>そと</rt></ruby>は<ruby>雨<rt>あめ</rt></ruby>が（　　）います。</span><br><small>(Di luar sedang turun hujan. — dari kata 降る / furu [Golongan 1])</small>",
        speech: "外は雨が降っています。",
        opts: ["降りて", "降って", "降んで", "降して"],
        a: 1,
        exp: "降る (furu - turun hujan) adalah kata kerja Golongan 1 berakhiran る, sehingga bentuk ~て-nya adalah <b>降って (futte)</b> + います."
      }
    ]
  },

  "te_mo_ii": {
    title: "Pola 〜てもいいですか (Meminta Izin)",
    category: "Bentuk ~て",
    questions: [
      {
        q: "Bagaimana cara meminta izin: <i>\"Bolehkah saya membuka jendela?\"</i> (<ruby>窓<rt>まど</rt></ruby>を<ruby>開<rt>あ</rt></ruby>ける — mado o akeru)",
        speech: "窓を開けてもいいですか。",
        opts: ["窓を開けてください。", "窓を開けてもいいですか。", "窓を開けてはいけません。", "窓を開けていますか。"],
        a: 1,
        exp: "Pola meminta izin adalah <b>Bentuk ~て + もいいですか</b>. 開ける (Golongan 2) ➔ <b>開けてもいいですか</b>."
      },
      {
        q: "<span class=\"jp\">この<ruby>辞書<rt>じしょ</rt></ruby>を（　　）もいいですか。</span><br><small>(Bolehkah saya memakai kamus ini? — dari kata 使う / tsukau)</small>",
        speech: "この辞書を使ってもいいですか。",
        opts: ["使うて", "使って", "使いて", "使んで"],
        a: 1,
        exp: "使う (tsukau - memakai) berakhiran う (Golongan 1) sehingga berubah menjadi <b>使って (tsukatte)</b> + もいいですか."
      },
      {
        q: "<span class=\"jp\">もう<ruby>家<rt>いえ</rt></ruby>へ（　　）もいいですか。</span><br><small>(Bolehkah saya pulang ke rumah sekarang? — dari kata 帰る / kaeru)</small>",
        speech: "もう家へ帰ってもいいですか。",
        opts: ["帰て", "帰って", "帰りて", "帰んで"],
        a: 1,
        exp: "帰る (kaeru - pulang) adalah kata kerja Golongan 1 (kata jebakan), sehingga bentuk ~て-nya adalah <b>帰って (kaette)</b> + もいいですか."
      },
      {
        q: "Jika seseorang bertanya: <span class=\"jp\">ここに<ruby>座<rt>すわ</rt></ruby>ってもいいですか。</span> (Bolehkah duduk di sini?), manakah jawaban yang berarti <i>\"Ya, silakan (boleh)\"</i>?",
        speech: "ええ、いいですよ。どうぞ。",
        opts: ["いいえ、座ってください。", "ええ、いいですよ。どうぞ。", "はい、座ってはいけません。", "いいえ、座っています。"],
        a: 1,
        exp: "Untuk memberi izin terhadap pertanyaan 〜てもいいですか, jawabannya adalah <b>ええ、いいですよ (Ya, boleh)</b> atau どうぞ (Silakan)."
      },
      {
        q: "Apa arti kalimat: <span class=\"jp\">テレビを<ruby>消<rt>け</rt></ruby>してもいいですか。</span>",
        speech: "テレビを消してもいいですか。",
        opts: ["Tolong matikan TV.", "Dilarang mematikan TV.", "Bolehkah saya mematikan TV?", "Apakah TV sedang mati?"],
        a: 2,
        exp: "消す (kesu - mematikan) ➔ 消して + もいいですか = <b>Bolehkah saya mematikan TV?</b>"
      }
    ]
  },

  "te_wa_ikemasen": {
    title: "Pola 〜てはいけません (Larangan / Tidak Boleh)",
    category: "Bentuk ~て",
    questions: [
      {
        q: "Lengkapi kalimat larangan berikut:<br><span class=\"jp\">ここでタバコを（　　）はいけません。</span><br><small>(Dilarang merokok di sini. — dari kata 吸う / suu)</small>",
        speech: "ここでタバコを吸ってはいけません。",
        opts: ["吸うて", "吸って", "吸いて", "吸んで"],
        a: 1,
        exp: "Pola larangan menggunakan <b>Bentuk ~て + はいけません</b>. Kata kerja 吸う (suu) berakhiran う sehingga berubah menjadi <b>吸って (sutte)</b>."
      },
      {
        q: "Bagaimana cara mengatakan <i>\"Tidak boleh mengambil foto di museum\"</i> (<ruby>写真<rt>しゃしん</rt></ruby>を<ruby>撮<rt>と</rt></ruby>る — shashin o toru)?",
        speech: "美術館で写真を撮ってはいけません。",
        opts: [
          "美術館で写真を撮ってもいいです。",
          "美術館で写真を撮ってはいけません。",
          "美術館で写真を撮ってください。",
          "美術館で写真を撮っています。"
        ],
        a: 1,
        exp: "撮る (toru - mengambil foto) ➔ 撮って + <b>はいけません (dilarang / tidak boleh)</b>."
      },
      {
        q: "<span class=\"jp\"><ruby>図書館<rt>としょかん</rt></ruby>の<ruby>中<rt>なか</rt></ruby>で<ruby>大<rt>おお</rt></ruby>きい<ruby>声<rt>こえ</rt></ruby>で（　　）はいけません。</span><br><small>(Di dalam perpustakaan tidak boleh berbicara dengan suara keras. — 話す / hanasu)</small>",
        speech: "図書館の中で大きい声で話してはいけません。",
        opts: ["話して", "話いて", "話って", "話んで"],
        a: 0,
        exp: "話す (hanasu) berakhiran す ➔ <b>話して (hanashite)</b> + はいけません."
      },
      {
        q: "<span class=\"jp\">この<ruby>川<rt>かわ</rt></ruby>は<ruby>危<rt>あぶ</rt></ruby>ないですから、（　　）はいけません。</span><br><small>(Karena sungai ini berbahaya, dilarang berenang. — 泳ぐ / oyogu)</small>",
        speech: "この川は危ないですから、泳いではいけません。",
        opts: ["泳いて", "泳いで", "泳って", "泳んで"],
        a: 1,
        exp: "泳ぐ (oyogu - berenang) berakhiran <b>ぐ</b>, sehingga bentuk ~て-nya adalah <b>泳いで (oyoide)</b> + はいけません."
      },
      {
        q: "Manakah kalimat yang berarti <i>\"Tidak boleh masuk ke ruangan ini\"</i> (<ruby>入<rt>はい</rt></ruby>る — hairu)?",
        speech: "この部屋に入ってはいけません。",
        opts: [
          "この部屋に入てはいけません。",
          "この部屋に入ってはいけません。",
          "この部屋に入んではいけません。",
          "この部屋に入ってもいいです。"
        ],
        a: 1,
        exp: "入る (hairu - masuk) adalah kata kerja Golongan 1 berakhiran る, sehingga berubah menjadi <b>入って (haitte)</b> + はいけません."
      }
    ]
  },

  "te_kara": {
    title: "Pola 〜てから (Setelah Melakukan...)",
    category: "Bentuk ~て",
    questions: [
      {
        q: "Lengkapi kalimat urutan waktu berikut:<br><span class=\"jp\"><ruby>手<rt>て</rt></ruby>を（　　）、ご飯を<ruby>食<rt>た</rt></ruby>べます。</span><br><small>(Setelah mencuci tangan, makan nasi. — 洗う / arau)</small>",
        speech: "手を洗ってから、ご飯を食べます。",
        opts: ["洗うから", "洗ってから", "洗いてから", "洗んでから"],
        a: 1,
        exp: "Pola <i>\"Setelah melakukan A, lalu B\"</i> menggunakan <b>Kata Kerja Bentuk ~て + から</b>. 洗う (arau) ➔ <b>洗ってから (aratte kara)</b>."
      },
      {
        q: "<span class=\"jp\"><ruby>宿題<rt>しゅくだい</rt></ruby>を（　　）、ゲームをします。</span><br><small>(Setelah mengerjakan PR, bermain game. — する / suru)</small>",
        speech: "宿題をしてから、ゲームをします。",
        opts: ["してから", "すってから", "しってから", "してからに"],
        a: 0,
        exp: "する (melakukan/mengerjakan) berubah ke bentuk ~て menjadi <b>して</b> + から ➔ <b>してから</b>."
      },
      {
        q: "Apa perbedaan penting antara <span class=\"jp\">「〜てから」</span> dan <span class=\"jp\">「〜から」</span> biasa?",
        speech: "食べてから行きます。",
        opts: [
          "〜てから artinya 'karena', sedangkan 〜から artinya 'setelah'",
          "Kata Kerja Bentuk ~て + から berarti 'Setelah melakukan', sedangkan Kalimat + から berarti 'Karena / alasan'",
          "Keduanya sama-sama berarti 'tetapi'",
          "〜てから hanya untuk kata benda"
        ],
        a: 1,
        exp: "Jika <b>から</b> menempel langsung pada <b>Bentuk ~て (食べてから)</b> artinya <b>'Setelah makan'</b>. Jika menempel pada bentuk kamus/masu/desu (忙しいから) artinya <b>'Karena sibuk'</b>."
      },
      {
        q: "<span class=\"jp\">シャワーを（　　）から、<ruby>寝<rt>ね</rt></ruby>ます。</span><br><small>(Setelah mandi shower, saya tidur. — 浴びる / abiru [Golongan 2])</small>",
        speech: "シャワーを浴びてから、寝ます。",
        opts: ["浴びって", "浴びて", "浴びんで", "浴びいて"],
        a: 1,
        exp: "浴びる (abiru) adalah kata kerja Golongan 2 (-iru), sehingga cukup hapus る dan tambah て menjadi <b>浴びてから</b>."
      },
      {
        q: "Terjemahkan kalimat berikut:<br><span class=\"jp\"><ruby>日本<rt>にほん</rt></ruby>へ<ruby>来<rt>き</rt></ruby>てから、<ruby>日本語<rt>にほんご</rt></ruby>を<ruby>勉強<rt>べんきょう</rt></ruby>しました。</span>",
        speech: "日本へ来てから、日本語を勉強しました。",
        opts: [
          "Sebelum datang ke Jepang, saya belajar bahasa Jepang.",
          "Setelah datang ke Jepang, saya mulai belajar bahasa Jepang.",
          "Karena datang ke Jepang, saya tidak belajar bahasa Jepang.",
          "Tolong datang ke Jepang dan belajar bahasa Jepang."
        ],
        a: 1,
        exp: "来てから (kite kara = setelah datang) + 日本語を勉強しました (belajar bahasa Jepang)."
      }
    ]
  },

  "te_urutan": {
    title: "Pola 〜て、〜て (Urutan Kejadian & Kata Sifat)",
    category: "Bentuk ~て",
    questions: [
      {
        q: "Lengkapi kalimat urutan kegiatan berikut:<br><span class=\"jp\"><ruby>朝<rt>あさ</rt></ruby>6<ruby>時<rt>じ</rt></ruby>に（　　）、朝ごはんを<ruby>食<rt>た</rt></ruby>べました。</span><br><small>(Pagi bangun jam 6, lalu makan sarapan. — 起きる / okiru)</small>",
        speech: "朝六時に起きて、朝ごはんを食べました。",
        opts: ["起きるて", "起きて", "起きって", "起きたて"],
        a: 1,
        exp: "Untuk menyambung urutan kegiatan, kata kerja pertama diubah ke <b>Bentuk ~て</b>: 起きる (Golongan 2) ➔ <b>起きて (okite)</b>."
      },
      {
        q: "Pada kalimat berurutan <span class=\"jp\">「デパートへ<ruby>行<rt>い</rt></ruby>って、<ruby>服<rt>ふく</rt></ruby>を<ruby>買<rt>か</rt></ruby>いました」</span>, bagian manakah yang menentukan bahwa kejadian itu terjadi di masa lampau?",
        speech: "デパートへ行って、服を買いました。",
        opts: ["Kata pertama (行って)", "Kata kerja paling akhir (買いました)", "Kata benda デパート", "Partikel へ"],
        a: 1,
        exp: "Dalam rangkaian kalimat dengan bentuk ~て, <b>tenses (waktu lampau/sekarang) ditentukan oleh kata kerja paling akhir</b> (買いました = lampau)."
      },
      {
        q: "Bagaimana cara menggabungkan dua kata sifat-i:<br><span class=\"jp\">この<ruby>店<rt>みせ</rt></ruby>は<ruby>安<rt>やす</rt></ruby>い（murah）+ おいしい（enak）です。</span>",
        speech: "この店は安くて、おいしいです。",
        opts: ["安いと、おいしいです", "安くて、おいしいです", "安いで、おいしいです", "安って、おいしいです"],
        a: 1,
        exp: "Untuk menyambung kata sifat -i (dan), akhiran <b>い</b> diubah menjadi <b>〜くて</b>: 安い ➔ <b>安くて (yasukute)</b>."
      },
      {
        q: "Bagaimana menggabungkan kata sifat-na berikut:<br><span class=\"jp\">この<ruby>町<rt>まち</rt></ruby>は<ruby>静<rt>しず</rt></ruby>か（tenang）+ きれい（bersih）です。</span>",
        speech: "この町は静かで、きれいです。",
        opts: ["静かくて、きれいです", "静かで、きれいです", "静かって、きれいです", "静かに、きれいです"],
        a: 1,
        exp: "Untuk kata sifat -na dan kata benda, tambahkan <b>で (-de)</b> untuk menyambung kalimat: 静か ➔ <b>静かで (shizuka de)</b>."
      },
      {
        q: "<span class=\"jp\"><ruby>図書館<rt>としょかん</rt></ruby>で<ruby>本<rt>ほん</rt></ruby>を（　　）、<ruby>家<rt>いえ</rt></ruby>へ<ruby>帰<rt>かえ</rt></ruby>りました。</span><br><small>(Meminjam buku di perpustakaan, lalu pulang ke rumah. — 借りる / kariru [Golongan 2])</small>",
        speech: "図書館で本を借りて、家へ帰りました。",
        opts: ["借りって", "借りて", "借んで", "借いて"],
        a: 1,
        exp: "借りる (kariru - meminjam) adalah kata kerja Golongan 2 (-iru), sehingga bentuk ~て-nya adalah <b>借りて (karite)</b>."
      }
    ]
  },

  "te_mimasu_shimau": {
    title: "Pola 〜てみます (Mencoba) & 〜てしまいます (Tuntas/Menyesal)",
    category: "Bentuk ~て",
    questions: [
      {
        q: "Bagaimana cara mengatakan <i>\"Saya ingin mencoba memakai sepatu ini\"</i> (<ruby>靴<rt>くつ</rt></ruby>を<ruby>履<rt>は</rt></ruby>く — kutsu o haku)?",
        speech: "この靴を履いてみます。",
        opts: ["この靴を履いてみます。", "この靴を履いてしまいます。", "この靴を履いてはいけません。", "この靴を履くみます。"],
        a: 0,
        exp: "Untuk menyatakan 'mencoba melakukan sesuatu', gunakan <b>Bentuk ~て + みます</b>. 履く (haku) ➔ 履いて + みます = <b>履いてみます</b>."
      },
      {
        q: "<span class=\"jp\"><ruby>電車<rt>でんしゃ</rt></ruby>に<ruby>傘<rt>かさ</rt></ruby>を<ruby>忘<rt>わす</rt></ruby>れて（　　）。</span><br><small>(Aduh, payung saya tidak sengaja tertinggal di kereta.)</small>",
        speech: "電車に傘を忘れてしまいました。",
        opts: ["みました", "しまいました", "ください", "もいいです"],
        a: 1,
        exp: "Untuk menyatakan ketidaksengajaan atau penyesalan ('aduh, terlanjur lupa/ketinggalan'), gunakan <b>Bentuk ~て + しまいました</b>."
      },
      {
        q: "<span class=\"jp\">おいしいですから、<ruby>食<rt>た</rt></ruby>べて（　　）ください。</span><br><small>(Karena enak, silakan coba makan!)</small>",
        speech: "おいしいですから、食べてみてください。",
        opts: ["みて", "しまって", "いって", "きて"],
        a: 0,
        exp: "食べてみる (mencoba makan) digabung dengan ください menjadi <b>食べてみてください (Silakan coba makan)</b>."
      },
      {
        q: "Selain menyatakan penyesalan, apa arti lain dari pola <span class=\"jp\">〜てしまいました</span> dalam kalimat:<br><span class=\"jp\">この<ruby>本<rt>ほん</rt></ruby>を<ruby>全部<rt>ぜんぶ</rt></ruby><ruby>読<rt>よ</rt></ruby>んでしまいました。</span>",
        speech: "この本を全部読んでしまいました。",
        opts: [
          "Mencoba membaca buku ini sedikit.",
          "Sudah selesai membaca seluruh buku ini sampai tuntas.",
          "Dilarang membaca buku ini.",
          "Sedang membaca buku ini."
        ],
        a: 1,
        exp: "〜てしまいました bersama keterangan 全部 (semua) menyatakan bahwa suatu tindakan <b>telah diselesaikan sampai tuntas/habis</b>."
      },
      {
        q: "<span class=\"jp\">わからないことは<ruby>先生<rt>せんせい</rt></ruby>に（　　）みます。</span><br><small>(Hal yang tidak dimengerti, saya akan coba tanyakan ke guru. — 聞く / kiku)</small>",
        speech: "わからないことは先生に聞いてみます。",
        opts: ["聞いて", "聞って", "聞んで", "聞く"],
        a: 0,
        exp: "聞く (kiku - bertanya/mendengar) berakhiran く ➔ <b>聞いて (kiite)</b> + みます."
      }
    ]
  },

  "part_wa": {
    title: "Partikel は (wa — Topik Kalimat)",
    category: "Partikel",
    questions: [
      {
        q: "<span class=\"jp\"><ruby>私<rt>わたし</rt></ruby>（　）インドネシア<ruby>人<rt>じん</rt></ruby>です。</span><br><small>(Saya adalah orang Indonesia.)</small>",
        speech: "私はインドネシア人です。",
        opts: ["は", "を", "に", "で"],
        a: 0,
        exp: "Partikel <b>は (dibaca 'wa')</b> digunakan untuk menandai topik utama kalimat (Saya)."
      },
      {
        q: "Bagaimana cara membaca huruf <span class=\"jp\">「は」</span> ketika berfungsi sebagai partikel penanda topik?",
        speech: "わたしはがくせいです。",
        opts: ["Dibaca 'ha'", "Dibaca 'wa'", "Dibaca 'o'", "Dibaca 'e'"],
        a: 1,
        exp: "Huruf hiragana は dibaca <b>'wa'</b> khusus ketika berperan sebagai partikel penanda topik."
      },
      {
        q: "<span class=\"jp\"><ruby>今日<rt>きょう</rt></ruby>（　）いい<ruby>天気<rt>てんき</rt></ruby>ですね。</span><br><small>(Hari ini cuacanya bagus ya.)</small>",
        speech: "今日はいい天気ですね。",
        opts: ["を", "は", "へ", "と"],
        a: 1,
        exp: "今日 (hari ini) dijadikan topik pembicaraan kalimat, sehingga ditandai dengan partikel <b>は</b>."
      },
      {
        q: "<span class=\"jp\">この<ruby>本<rt>ほん</rt></ruby>（　）おもしろいです。</span><br><small>(Buku ini menarik.)</small>",
        speech: "この本はおもしろいです。",
        opts: ["は", "を", "に", "へ"],
        a: 0,
        exp: "Menjelaskan sifat dari topik 'buku ini' (この本) menggunakan partikel topik <b>は</b>."
      },
      {
        q: "Di manakah letak penekanan informasi penting dalam kalimat berpola <span class=\"jp\">「A は B です」</span>?",
        speech: "田中さんは先生です。",
        opts: ["Pada bagian sebelum は (A)", "Pada bagian keterangan setelah は (B)", "Tidak ada informasi penting", "Hanya untuk kalimat tanya"],
        a: 1,
        exp: "Partikel <b>は</b> memperkenalkan topik A, dan meletakkan fokus informasi utama pada penjelasan <b>B (setelah は)</b>."
      }
    ]
  },

  "part_ga": {
    title: "Partikel が (ga — Subjek, Keberadaan & Kesukaan)",
    category: "Partikel",
    questions: [
      {
        q: "<span class=\"jp\"><ruby>私<rt>わたし</rt></ruby>は<ruby>日本語<rt>にほんご</rt></ruby>（　）<ruby>好<rt>す</rt></ruby>きです。</span><br><small>(Saya suka bahasa Jepang.)</small>",
        speech: "私は日本語が好きです。",
        opts: ["を", "が", "に", "で"],
        a: 1,
        exp: "Kata sifat kesukaan (<b>好き / suki</b> dan 嫌い / kirai) selalu menandai objek yang disukainya dengan partikel <b>が</b> (bukan を)."
      },
      {
        q: "<span class=\"jp\">あそこに<ruby>猫<rt>ねこ</rt></ruby>（　）います。</span><br><small>(Di sana ada kucing.)</small>",
        speech: "あそこに猫がいます。",
        opts: ["を", "が", "へ", "で"],
        a: 1,
        exp: "Kata kerja keberadaan <b>います</b> (makhluk hidup) dan <b>あります</b> (benda mati) menggunakan partikel <b>が</b> untuk menandai benda/makhluk yang ada."
      },
      {
        q: "<span class=\"jp\">マリアさんは歌（　）<ruby>上手<rt>じょうず</rt></ruby>です。</span><br><small>(Maria pintar/mahir menyanyi.)</small>",
        speech: "マリアさんは歌が上手です。",
        opts: ["を", "が", "に", "と"],
        a: 1,
        exp: "Kata sifat kemahiran (<b>上手 / jouzu</b>, 下手 / heta, できる / bisa) wajib menggunakan partikel <b>が</b>."
      },
      {
        q: "<span class=\"jp\">（<ruby>誰<rt>だれ</rt></ruby>）が<ruby>来<rt>き</rt></ruby>ましたか。— <ruby>田中<rt>たなか</rt></ruby>さん（　）<ruby>来<rt>き</rt></ruby>ました。</span><br><small>(Siapa yang datang? — Tanaka yang datang.)</small>",
        speech: "田中さんが来ました。",
        opts: ["は", "が", "を", "に"],
        a: 1,
        exp: "Kata tanya subjek (誰が / 何が) dan kalimat jawabannya wajib menggunakan partikel <b>が</b> karena fokusnya terletak pada siapa pelakunya."
      },
      {
        q: "<span class=\"jp\"><ruby>新<rt>あたら</rt></ruby>しいパソコン（　）<ruby>欲<rt>ほ</rt></ruby>しいです。</span><br><small>(Saya menginginkan laptop baru.)</small>",
        speech: "新しいパソコンが欲しいです。",
        opts: ["を", "が", "に", "で"],
        a: 1,
        exp: "Kata sifat keinginan <b>欲しい (hoshii - ingin memiliki)</b> selalu berpasangan dengan partikel <b>が</b>."
      }
    ]
  },

  "part_o": {
    title: "Partikel を (o — Objek Penderita & Lintasan)",
    category: "Partikel",
    questions: [
      {
        q: "<span class=\"jp\"><ruby>毎朝<rt>まいあさ</rt></ruby>、パン（　）<ruby>食<rt>た</rt></ruby>べます。</span><br><small>(Setiap pagi saya makan roti.)</small>",
        speech: "毎朝、パンを食べます。",
        opts: ["は", "が", "を", "に"],
        a: 2,
        exp: "Partikel <b>を (dibaca 'o')</b> menandai objek langsung yang dikenai tindakan kata kerja transitif (食べる = makan roti)."
      },
      {
        q: "<span class=\"jp\"><ruby>夜<rt>よる</rt></ruby>、コーヒー（　）<ruby>飲<rt>の</rt></ruby>みます。</span><br><small>(Malam hari minum kopi.)</small>",
        speech: "夜、コーヒーを飲みます。",
        opts: ["で", "に", "を", "へ"],
        a: 2,
        exp: "コーヒー (kopi) adalah objek yang diminum (飲みます), sehingga menggunakan partikel <b>を</b>."
      },
      {
        q: "<span class=\"jp\"><ruby>公園<rt>こうえん</rt></ruby>（　）<ruby>散歩<rt>さんぽ</rt></ruby>します。</span><br><small>(Berjalan-jalan melintasi taman.)</small>",
        speech: "公園を散歩します。",
        opts: ["に", "を", "へ", "と"],
        a: 1,
        exp: "Untuk kata kerja gerak melintasi suatu area (散歩する jalan-jalan, 歩く berjalan, 渡る menyeberang), area yang dilewati ditandai dengan partikel <b>を</b>."
      },
      {
        q: "<span class=\"jp\"><ruby>毎朝<rt>まいあさ</rt></ruby>7<ruby>時<rt>じ</rt></ruby>に<ruby>家<rt>いえ</rt></ruby>（　）<ruby>出<rt>で</rt></ruby>ます。</span><br><small>(Setiap pagi jam 7 keluar/berangkat dari rumah.)</small>",
        speech: "毎朝七時に家を出ます。",
        opts: ["に", "で", "を", "へ"],
        a: 2,
        exp: "Kata kerja 出る (keluar) dan 降りる (turun kendaraan) menggunakan partikel <b>を</b> untuk menandai titik tempat yang ditinggalkan (家を出ます / バスを降ります)."
      },
      {
        q: "<span class=\"jp\"><ruby>日本語<rt>にほんご</rt></ruby>（　）<ruby>勉強<rt>べんきょう</rt></ruby>しています。</span><br><small>(Sedang belajar bahasa Jepang.)</small>",
        speech: "日本語を勉強しています。",
        opts: ["に", "で", "を", "へ"],
        a: 2,
        exp: "日本語 adalah objek langsung dari kata kerja 勉強する (mempelajari), sehingga menggunakan <b>を</b>."
      }
    ]
  },

  "part_ni": {
    title: "Partikel に (ni — Waktu, Tujuan, Lokasi Diam, Penerima)",
    category: "Partikel",
    questions: [
      {
        q: "<span class=\"jp\"><ruby>毎朝<rt>まいあさ</rt></ruby>、6<ruby>時<rt>じ</rt></ruby>（　）<ruby>起<rt>お</rt></ruby>きます。</span><br><small>(Setiap pagi bangun pada jam 6.)</small>",
        speech: "毎朝、六時に起きます。",
        opts: ["で", "に", "を", "へ"],
        a: 1,
        exp: "Keterangan waktu spesifik yang memiliki angka/nama hari/tanggal (jam 6, hari Senin, tanggal 5) ditandai dengan partikel <b>に</b>."
      },
      {
        q: "<span class=\"jp\"><ruby>机<rt>つくえ</rt></ruby>の<ruby>上<rt>うえ</rt></ruby>（　）<ruby>本<rt>ほん</rt></ruby>があります。</span><br><small>(Di atas meja ada buku.)</small>",
        speech: "机の上に本があります。",
        opts: ["で", "に", "を", "と"],
        a: 1,
        exp: "Lokasi keberadaan benda/makhluk (dengan あります / います) ditandai dengan partikel <b>に</b>."
      },
      {
        q: "<span class=\"jp\"><ruby>母<rt>はは</rt></ruby>（　）<ruby>花<rt>はな</rt></ruby>をあげました。</span><br><small>(Memberikan bunga kepada ibu.)</small>",
        speech: "母に花をあげました。",
        opts: ["を", "で", "に", "の"],
        a: 2,
        exp: "Penerima suatu tindakan (memberi <i>kepada</i> ibu, bertanya <i>kepada</i> guru) ditandai dengan partikel <b>に</b>."
      },
      {
        q: "<span class=\"jp\"><ruby>明日<rt>あした</rt></ruby>、<ruby>病院<rt>びょういん</rt></ruby>（　）<ruby>行<rt>い</rt></ruby>きます。</span><br><small>(Besok pergi ke rumah sakit.)</small>",
        speech: "明日、病院に行きます。",
        opts: ["で", "を", "に", "と"],
        a: 2,
        exp: "Titik tujuan dari kata kerja perpindahan (行く, 来る, 帰る) ditandai dengan partikel <b>に</b> (atau へ)."
      },
      {
        q: "Manakah keterangan waktu yang <b>TIDAK</b> menggunakan partikel に?",
        speech: "今日、勉強します。",
        opts: ["7時に (pada jam 7)", "日曜日に (pada hari Minggu)", "今日 / 明日 (hari ini / besok)", "3月に (pada bulan Maret)"],
        a: 2,
        exp: "Waktu relatif yang tidak berupa angka/nama kalender tetap (seperti <b>今日 hari ini, 明日 besok, 昨日 kemarin, 毎日 setiap hari</b>) <b>tidak memakai に</b>."
      }
    ]
  },

  "part_de": {
    title: "Partikel で (de — Tempat Aksi, Sarana & Sebab)",
    category: "Partikel",
    questions: [
      {
        q: "<span class=\"jp\">レストラン（　）<ruby>昼<rt>ひる</rt></ruby>ごはんを<ruby>食<rt>た</rt></ruby>べました。</span><br><small>(Makan siang di restoran.)</small>",
        speech: "レストランで昼ごはんを食べました。",
        opts: ["に", "で", "を", "へ"],
        a: 1,
        exp: "Tempat berlangsungnya suatu kegiatan/aksi aktif (makan, belajar, bekerja) ditandai dengan partikel <b>で</b>."
      },
      {
        q: "<span class=\"jp\"><ruby>毎日<rt>まいにち</rt></ruby>、<ruby>電車<rt>でんしゃ</rt></ruby>（　）<ruby>会社<rt>かいしゃ</rt></ruby>へ<ruby>行<rt>い</rt></ruby>きます。</span><br><small>(Setiap hari pergi ke kantor dengan naik kereta.)</small>",
        speech: "毎日、電車で会社へ行きます。",
        opts: ["に", "を", "で", "と"],
        a: 2,
        exp: "Alat transportasi, sarana, atau perkakas yang digunakan ditandai dengan partikel <b>で</b> (電車で = dengan kereta)."
      },
      {
        q: "<span class=\"jp\">はし（　）ラーメンを<ruby>食<rt>た</rt></ruby>べます。</span><br><small>(Makan ramen menggunakan sumpit.)</small>",
        speech: "はしでラーメンを食べます。",
        opts: ["を", "に", "で", "と"],
        a: 2,
        exp: "Alat/perkakas untuk melakukan sesuatu (dengan sumpit, dengan pulpen, dengan bahasa Jepang) menggunakan partikel <b>で</b>."
      },
      {
        q: "<span class=\"jp\">これ、<ruby>全部<rt>ぜんぶ</rt></ruby>（　）500<ruby>円<rt>えん</rt></ruby>です。</span><br><small>(Ini semuanya total 500 yen.)</small>",
        speech: "これ、全部で五百円です。",
        opts: ["に", "で", "を", "가"],
        a: 1,
        exp: "Untuk menyatakan batasan jumlah atau total keseluruhan (全部で = semuanya total; 一人で = seorang diri), gunakan partikel <b>で</b>."
      },
      {
        q: "<span class=\"jp\"><ruby>日本語<rt>にほんご</rt></ruby>（　）レポートを<ruby>書<rt>か</rt></ruby>きました。</span><br><small>(Menulis laporan dalam/dengan bahasa Jepang.)</small>",
        speech: "日本語でレポートを書きました。",
        opts: ["に", "で", "を", "へ"],
        a: 1,
        exp: "Bahasa yang dipakai sebagai sarana komunikasi/menulis ditandai dengan partikel <b>で</b>."
      }
    ]
  },

  "part_e": {
    title: "Partikel へ (e — Arah Gerak)",
    category: "Partikel",
    questions: [
      {
        q: "<span class=\"jp\"><ruby>来月<rt>らいげつ</rt></ruby>、<ruby>日本<rt>にほん</rt></ruby>（　）<ruby>行<rt>い</rt></ruby>きます。</span><br><small>(Bulan depan pergi menuju Jepang.)</small>",
        speech: "来月、日本へ行きます。",
        opts: ["で", "を", "へ", "と"],
        a: 2,
        exp: "Partikel <b>へ (dibaca 'e')</b> menunjukkan arah tujuan dari kata kerja perpindahan (行く, 来る, 帰る)."
      },
      {
        q: "Bagaimana cara membaca huruf hiragana <span class=\"jp\">「へ」</span> saat berfungsi sebagai partikel arah?",
        speech: "学校へ行きます。",
        opts: ["Dibaca 'he'", "Dibaca 'e'", "Dibaca 'wa'", "Dibaca 'o'"],
        a: 1,
        exp: "Saat menjadi partikel penunjuk arah, huruf へ selalu dibaca <b>'e'</b> (bukan 'he')."
      },
      {
        q: "<span class=\"jp\">もう<ruby>遅<rt>おそ</rt></ruby>いですから、<ruby>家<rt>いえ</rt></ruby>（　）<ruby>帰<rt>かえ</rt></ruby>ります。</span><br><small>(Karena sudah malam, saya pulang ke rumah.)</small>",
        speech: "もう遅いですから、家へ帰ります。",
        opts: ["で", "を", "へ", "と"],
        a: 2,
        exp: "Kata kerja perpindahan 帰ります (pulang) menggunakan partikel arah <b>へ</b> (atau に)."
      },
      {
        q: "Kata kerja manakah di bawah ini yang <b>COCOK</b> dipasangkan dengan partikel へ?",
        speech: "東京へ来ます。",
        opts: ["食べる (makan)", "寝る (tidur)", "来る (datang)", "読む (membaca)"],
        a: 2,
        exp: "Partikel へ hanya digunakan bersama kata kerja perpindahan tempat seperti <b>行く (pergi), 来る (datang), 帰る (pulang)</b>."
      },
      {
        q: "<span class=\"jp\">こちら（　）どうぞ。</span><br><small>(Silakan ke sebelah sini.)</small>",
        speech: "こちらへどうぞ。",
        opts: ["を", "で", "へ", "が"],
        a: 2,
        exp: "Ungkapan mempersilakan arah <b>こちらへどうぞ</b> menggunakan partikel arah <b>へ</b>."
      }
    ]
  },

  "part_to": {
    title: "Partikel と (to — Dan, Bersama, Kutipan)",
    category: "Partikel",
    questions: [
      {
        q: "<span class=\"jp\">パン（　）たまごを<ruby>買<rt>か</rt></ruby>いました。</span><br><small>(Membeli roti dan telur.)</small>",
        speech: "パンとたまごを買いました。",
        opts: ["に", "で", "と", "へ"],
        a: 2,
        exp: "Partikel <b>と</b> digunakan untuk menghubungkan kata benda secara lengkap ('dan')."
      },
      {
        q: "<span class=\"jp\"><ruby>昨日<rt>きのう</rt></ruby>、<ruby>友達<rt>ともだち</rt></ruby>（　）<ruby>映画<rt>えいが</rt></ruby>を<ruby>見<rt>み</rt></ruby>ました。</span><br><small>(Kemarin menonton film bersama teman.)</small>",
        speech: "昨日、友達と映画を見ました。",
        opts: ["を", "と", "で", "へ"],
        a: 1,
        exp: "Untuk menyatakan bersama siapa melakukan suatu kegiatan ('bersama teman'), gunakan partikel <b>と</b>."
      },
      {
        q: "<span class=\"jp\"><ruby>明日<rt>あした</rt></ruby>は<ruby>雨<rt>あめ</rt></ruby>だ（　）<ruby>思<rt>おも</rt></ruby>います。</span><br><small>(Saya pikir besok akan hujan.)</small>",
        speech: "明日は雨だと思います。",
        opts: ["を", "に", "と", "で"],
        a: 2,
        exp: "Sebelum kata kerja pikiran/kutipan seperti <b>思います (berpikir bahwa)</b> atau <b>言います (berkata bahwa)</b>, gunakan partikel <b>と</b>."
      },
      {
        q: "<span class=\"jp\"><ruby>日曜<rt>にちよう</rt></ruby>と<ruby>月曜<rt>げつよう</rt></ruby>は<ruby>休<rt>やす</rt></ruby>みです。</span><br>Apa fungsi partikel と pada kalimat di atas?",
        speech: "日曜と月曜は休みです。",
        opts: [
          "Menunjukkan lokasi",
          "Menyebutkan daftar lengkap (Minggu dan Senin)",
          "Menyatakan alat transportasi",
          "Menyatakan perbandingan"
        ],
        a: 1,
        exp: "Partikel <b>と</b> menyebutkan seluruh anggota daftar secara tuntas (Minggu dan Senin)."
      },
      {
        q: "<span class=\"jp\"><ruby>家族<rt>かぞく</rt></ruby>（　）<ruby>日本<rt>にほん</rt></ruby>へ<ruby>行<rt>い</rt></ruby>きました。</span><br><small>(Pergi ke Jepang bersama keluarga.)</small>",
        speech: "家族と日本へ行きました。",
        opts: ["を", "と", "に", "の"],
        a: 1,
        exp: "家族と = bersama keluarga."
      }
    ]
  },

  "part_mo": {
    title: "Partikel も (mo — Juga / Pun)",
    category: "Partikel",
    questions: [
      {
        q: "<span class=\"jp\">A: <ruby>私<rt>わたし</rt></ruby>は<ruby>学生<rt>がくせい</rt></ruby>です。<br>B: <ruby>私<rt>わたし</rt></ruby>（　）<ruby>学生<rt>がくせい</rt></ruby>です。</span><br><small>(Saya juga mahasiswa.)</small>",
        speech: "私も学生です。",
        opts: ["は", "も", "と", "に"],
        a: 1,
        exp: "Partikel <b>も (mo)</b> berarti <b>'juga'</b> dan menggantikan partikel は."
      },
      {
        q: "<span class=\"jp\">パンを<ruby>食<rt>た</rt></ruby>べました。ケーキ（　）<ruby>食<rt>た</rt></ruby>べました。</span><br><small>(Saya makan roti. Kue pun/juga saya makan.)</small>",
        speech: "パンを食べました。ケーキも食べました。",
        opts: ["を", "も", "で", "へ"],
        a: 1,
        exp: "Partikel <b>も</b> juga menggantikan partikel objek を ketika menyatakan 'objek ini juga'."
      },
      {
        q: "<span class=\"jp\"><ruby>昨日<rt>きのう</rt></ruby>はどこへ（　）<ruby>行<rt>い</rt></ruby>きませんでした。</span><br><small>(Kemarin saya tidak pergi ke mana pun.)</small>",
        speech: "昨日はどこへも行きませんでした。",
        opts: ["か", "も", "に", "と"],
        a: 1,
        exp: "Kata tanya + <b>も</b> + Kata kerja negatif berarti <b>'sama sekali tidak ... (ke mana pun / siapa pun / apa pun)'</b>."
      },
      {
        q: "<span class=\"jp\"><ruby>兄<rt>あに</rt></ruby>はサッカーが<ruby>好<rt>す</rt></ruby>きです。<ruby>弟<rt>おとうと</rt></ruby>（　）サッカーが<ruby>好<rt>す</rt></ruby>きです。</span>",
        speech: "弟もサッカーが好きです。",
        opts: ["は", "も", "を", "で"],
        a: 1,
        exp: "Karena keduanya memiliki predikat yang sama (suka sepak bola), subjek kedua menggunakan <b>も (juga)</b>."
      },
      {
        q: "<span class=\"jp\"><ruby>部屋<rt>へや</rt></ruby>に<ruby>誰<rt>だれ</rt></ruby>（　）いません。</span><br><small>(Di kamar tidak ada siapa pun.)</small>",
        speech: "部屋に誰もいません。",
        opts: ["が", "は", "も", "を"],
        a: 2,
        exp: "誰 (siapa) + <b>も</b> + いません (negatif) = <b>Tidak ada siapa pun</b>."
      }
    ]
  },

  "part_kara_made": {
    title: "Partikel から & まで (Dari & Sampai)",
    category: "Partikel",
    questions: [
      {
        q: "<span class=\"jp\"><ruby>銀行<rt>ぎんこう</rt></ruby>は9<ruby>時<rt>じ</rt></ruby>（　）3<ruby>時<rt>じ</rt></ruby>（　）です。</span><br><small>(Bank buka dari jam 9 sampai jam 3.)</small>",
        speech: "銀行は九時から三時までです。",
        opts: ["に / で", "から / まで", "まで / から", "と / や"],
        a: 1,
        exp: "Titik awal menggunakan <b>から (dari)</b> dan titik akhir menggunakan <b>まで (sampai)</b>."
      },
      {
        q: "<span class=\"jp\">ジャカルタ（　）<ruby>来<rt>き</rt></ruby>ました。</span><br><small>(Saya berasal / datang dari Jakarta.)</small>",
        speech: "ジャカルタから来ました。",
        opts: ["まで", "から", "で", "を"],
        a: 1,
        exp: "Menyatakan tempat asal ('dari Jakarta') menggunakan partikel <b>から</b>."
      },
      {
        q: "<span class=\"jp\"><ruby>家<rt>いえ</rt></ruby>から<ruby>駅<rt>えき</rt></ruby>（　）<ruby>歩<rt>ある</rt></ruby>いて10<ruby>分<rt>ぷん</rt></ruby>かかります。</span><br><small>(Dari rumah sampai stasiun memakan waktu 10 menit jalan kaki.)</small>",
        speech: "家から駅まで歩いて十分かかります。",
        opts: ["から", "まで", "で", "を"],
        a: 1,
        exp: "Pasangan 家から (dari rumah) adalah 駅<b>まで</b> (sampai stasiun)."
      },
      {
        q: "<span class=\"jp\"><ruby>今日<rt>きょう</rt></ruby>は<ruby>忙<rt>いそが</rt></ruby>しいです（　）、<ruby>行<rt>い</rt></ruby>きません。</span><br><small>(Karena hari ini sibuk, saya tidak pergi.)</small>",
        speech: "今日は忙しいですから、行きません。",
        opts: ["まで", "から", "より", "とも"],
        a: 1,
        exp: "Jika diletakkan setelah kalimat/predikat (忙しいです<b>から</b>), partikel <b>から</b> berarti <b>'karena' (alasan)</b>."
      },
      {
        q: "<span class=\"jp\"><ruby>月曜日<rt>げつようび</rt></ruby>から<ruby>金曜日<rt>きんようび</rt></ruby>まで<ruby>働<rt>はたら</rt></ruby>きます。</span><br>Apa arti kalimat di atas?",
        speech: "月曜日から金曜日まで働きます。",
        opts: [
          "Hanya bekerja pada hari Senin dan Jumat.",
          "Bekerja dari hari Senin sampai hari Jumat.",
          "Libur dari hari Senin sampai hari Jumat.",
          "Bekerja pada hari Senin atau Jumat."
        ],
        a: 1,
        exp: "月曜日から (dari Senin) + 金曜日まで (sampai Jumat) + 働きます (bekerja)."
      }
    ]
  },

  "part_yori": {
    title: "Partikel より (yori — Perbandingan 'Daripada')",
    category: "Partikel",
    questions: [
      {
        q: "<span class=\"jp\"><ruby>飛行機<rt>ひこうき</rt></ruby>は<ruby>電車<rt>でんしゃ</rt></ruby>（　）<ruby>速<rt>はや</rt></ruby>いです。</span><br><small>(Pesawat lebih cepat daripada kereta.)</small>",
        speech: "飛行機は電車より速いです。",
        opts: ["から", "まで", "より", "ほど"],
        a: 2,
        exp: "Partikel <b>より (yori)</b> berarti <b>'daripada'</b> untuk membandingkan dua hal."
      },
      {
        q: "<span class=\"jp\"><ruby>日本<rt>にほん</rt></ruby>はインドネシアより<ruby>涼<rt>すず</rt></ruby>しいです。</span><br>Manakah yang lebih sejuk menurut kalimat di atas?",
        speech: "日本はインドネシアより涼しいです。",
        opts: ["Indonesia lebih sejuk", "Jepang lebih sejuk daripada Indonesia", "Sama sejuknya", "Keduanya panas"],
        a: 1,
        exp: "Pola <b>A は B より [Sifat]</b> berarti <b>A lebih [Sifat] daripada B</b>. Jadi Jepang lebih sejuk daripada Indonesia."
      },
      {
        q: "<span class=\"jp\"><ruby>今日<rt>きょう</rt></ruby>は<ruby>昨日<rt>きのう</rt></ruby>（　）<ruby>暑<rt>あつ</rt></ruby>いです。</span><br><small>(Hari ini lebih panas daripada kemarin.)</small>",
        speech: "今日は昨日より暑いです。",
        opts: ["から", "まで", "より", "と"],
        a: 2,
        exp: "昨日より = daripada kemarin."
      },
      {
        q: "Bagaimana mengatakan <i>\"Daging lebih mahal daripada ikan\"</i> (<ruby>肉<rt>にく</rt></ruby> = daging, <ruby>魚<rt>さかな</rt></ruby> = ikan, <ruby>高<rt>たか</rt></ruby>い = mahal)?",
        speech: "肉は魚より高いです。",
        opts: ["魚は肉より高いです。", "肉は魚より高いです。", "肉より魚は高いです。", "肉と魚より高いです。"],
        a: 1,
        exp: "Daging (肉は) + daripada ikan (魚より) + mahal (高いです) ➔ <b>肉は魚より高いです</b>."
      },
      {
        q: "<span class=\"jp\">バスはタクシー（　）<ruby>安<rt>やす</rt></ruby>いです。</span><br><small>(Bus lebih murah daripada taksi.)</small>",
        speech: "バスはタクシーより安いです。",
        opts: ["より", "から", "まで", "で"],
        a: 0,
        exp: "タクシーより = daripada taksi."
      }
    ]
  },

  "part_no": {
    title: "Partikel の (no — Kepemilikan & Penghubung)",
    category: "Partikel",
    questions: [
      {
        q: "<span class=\"jp\">これは<ruby>私<rt>わたし</rt></ruby>（　）かばんです。</span><br><small>(Ini adalah tas milik saya.)</small>",
        speech: "これは私のかばんです。",
        opts: ["は", "の", "を", "に"],
        a: 1,
        exp: "Partikel <b>の</b> menghubungkan pemilik (私) dengan benda yang dimiliki (かばん): <b>私のかばん (tas saya)</b>."
      },
      {
        q: "Bagaimana menerjemahkan <i>\"Buku bahasa Jepang\"</i> ke dalam bahasa Jepang? (<ruby>日本語<rt>にほんご</rt></ruby> = bahasa Jepang, <ruby>本<rt>ほん</rt></ruby> = buku)",
        speech: "日本語の本",
        opts: ["本の日本語", "日本語の本", "日本語は本", "日本語を本"],
        a: 1,
        exp: "Dalam bahasa Jepang, kata penjelas diletakkan di depan kata utama dan dihubungkan dengan <b>の</b>: <b>日本語の本 (buku bahasa Jepang)</b>."
      },
      {
        q: "<span class=\"jp\">A: これは<ruby>誰<rt>だれ</rt></ruby>の傘ですか。<br>B: <ruby>田中<rt>たなか</rt></ruby>さん（　）です。</span><br><small>(A: Ini payung siapa? B: Punya Tanaka.)</small>",
        speech: "田中さんのです。",
        opts: ["は", "を", "の", "に"],
        a: 2,
        exp: "<b>田中さんのです</b> adalah singkatan dari 田中さんの傘です (payung milik Tanaka), di mana の menggantikan kata benda yang sudah disebut."
      },
      {
        q: "<span class=\"jp\"><ruby>机<rt>つくえ</rt></ruby>（　）<ruby>上<rt>うえ</rt></ruby>に<ruby>時計<rt>とけい</rt></ruby>があります。</span><br><small>(Di atas meja ada jam.)</small>",
        speech: "机の上に時計があります。",
        opts: ["に", "で", "の", "を"],
        a: 2,
        exp: "Antara kata benda tempat (机 meja) dan posisi (上 atas) dihubungkan dengan partikel <b>の</b>: <b>机の上 (atas meja)</b>."
      },
      {
        q: "<span class=\"jp\"><ruby>赤<rt>あか</rt></ruby>い（　）をください。</span><br><small>(Tolong berikan yang warna merah.)</small>",
        speech: "赤いのをください。",
        opts: ["の", "を", "に", "で"],
        a: 0,
        exp: "Setelah kata sifat -i (赤い), partikel <b>の</b> berfungsi sebagai kata ganti benda ('<b>yang</b> merah')."
      }
    ]
  },

  "part_ya": {
    title: "Partikel や (ya — Daftar Contoh Terbuka)",
    category: "Partikel",
    questions: [
      {
        q: "<span class=\"jp\">スーパーでりんご（　）バナナなどを<ruby>買<rt>か</rt></ruby>いました。</span><br><small>(Di supermarket membeli apel, pisang, dan lain-lain.)</small>",
        speech: "スーパーでりんごやバナナなどを買いました。",
        opts: ["を", "や", "に", "へ"],
        a: 1,
        exp: "Partikel <b>や</b> digunakan untuk menyebutkan beberapa contoh benda (tidak semuanya), dan sangat sering berpasangan dengan <b>など (dan lain-lain)</b>."
      },
      {
        q: "<span class=\"jp\">かばんの<ruby>中<rt>なか</rt></ruby>にペンやノート（　）があります。</span><br><small>(Di dalam tas ada pulpen, buku catatan, dan sebagainya.)</small>",
        speech: "かばんの中にペンやノートなどがあります。",
        opts: ["より", "など", "まで", "から"],
        a: 1,
        exp: "Pasangan alami dari partikel <b>や</b> adalah <b>など (nado - dan lain-lain)</b>."
      },
      {
        q: "Apa arti dari kalimat <span class=\"jp\">「<ruby>休日<rt>きゅうじつ</rt></ruby>は<ruby>掃除<rt>そうじ</rt></ruby>や<ruby>洗濯<rt>せんたく</rt></ruby>をします」</span>?",
        speech: "休日は掃除や洗濯をします。",
        opts: [
          "Saat hari libur saya hanya bersih-bersih dan mencuci baju saja, tidak melakukan hal lain.",
          "Saat hari libur saya melakukan bersih-bersih, mencuci baju, dan kegiatan semacamnya.",
          "Saat hari libur saya tidak bersih-bersih maupun mencuci.",
          "Saya lebih suka bersih-bersih daripada mencuci."
        ],
        a: 1,
        exp: "Karena menggunakan <b>や</b>, artinya bersih-bersih dan mencuci baju adalah contoh kegiatan yang dilakukan (masih ada kegiatan lain)."
      },
      {
        q: "<span class=\"jp\"><ruby>教室<rt>きょうしつ</rt></ruby>に<ruby>机<rt>つくえ</rt></ruby>（　）いすがあります。</span><br><small>(Di kelas ada meja, kursi, [dan benda lainnya].)</small>",
        speech: "教室に机やいすがあります。",
        opts: ["を", "や", "で", "へ"],
        a: 1,
        exp: "Menghubungkan contoh kata benda menggunakan partikel <b>や</b>."
      },
      {
        q: "Partikel や hanya boleh digunakan untuk menghubungkan jenis kata apa?",
        speech: "本や雑誌を読みます。",
        opts: ["Kata Kerja", "Kata Benda (Meishi)", "Kata Sifat -i", "Akhir kalimat"],
        a: 1,
        exp: "Sama seperti と, partikel <b>や</b> hanya digunakan di antara <b>Kata Benda</b>."
      }
    ]
  },

  "part_ka": {
    title: "Partikel か (ka — Kalimat Tanya & 'Atau')",
    category: "Partikel",
    questions: [
      {
        q: "<span class=\"jp\">お<ruby>名前<rt>なまえ</rt></ruby>は<ruby>何<rt>なん</rt></ruby>です（　）。</span><br><small>(Siapa nama Anda?)</small>",
        speech: "お名前は何ですか。",
        opts: ["ね", "よ", "か", "の"],
        a: 2,
        exp: "Partikel <b>か</b> di akhir kalimat mengubah kalimat berita menjadi <b>kalimat tanya (?)</b>."
      },
      {
        q: "<span class=\"jp\"><ruby>毎朝<rt>まいあさ</rt></ruby>、パン（　）ご飯を<ruby>食<rt>た</rt></ruby>べます。</span><br><small>(Setiap pagi saya makan roti ATAU nasi.)</small>",
        speech: "毎朝、パンかご飯を食べます。",
        opts: ["と", "や", "か", "も"],
        a: 2,
        exp: "Jika diletakkan di antara dua kata benda (A か B), partikel <b>か</b> berarti <b>'atau'</b>."
      },
      {
        q: "<span class=\"jp\">コーヒー（　）<ruby>紅茶<rt>こうちゃ</rt></ruby>、どちらがいいですか。</span><br><small>(Kopi atau teh hitam, mana yang Anda sukai?)</small>",
        speech: "コーヒーか紅茶、どちらがいいですか。",
        opts: ["か", "を", "に", "で"],
        a: 0,
        exp: "コーヒー<b>か</b>紅茶 = kopi <b>atau</b> teh hitam."
      },
      {
        q: "<span class=\"jp\">これは<ruby>日本語<rt>にほんご</rt></ruby>の<ruby>本<rt>ほん</rt></ruby>です（　）。</span><br><small>(Apakah ini buku bahasa Jepang?)</small>",
        speech: "これは日本語の本ですか。",
        opts: ["か", "を", "で", "と"],
        a: 0,
        exp: "Menambahkan <b>か</b> di akhir kalimat sopan (〜ます/〜です) membentuk pertanyaan."
      },
      {
        q: "<span class=\"jp\"><ruby>土曜日<rt>どようび</rt></ruby>（　）<ruby>日曜日<rt>にちようび</rt></ruby>に<ruby>買<rt>か</rt></ruby>い<ruby>物<rt>もの</rt></ruby>に<ruby>行<rt>い</rt></ruby>きます。</span><br><small>(Pergi berbelanja pada hari Sabtu atau Minggu.)</small>",
        speech: "土曜日か日曜日に買い物に行きます。",
        opts: ["か", "を", "へ", "より"],
        a: 0,
        exp: "土曜日<b>か</b>日曜日 = hari Sabtu <b>atau</b> Minggu."
      }
    ]
  },

  "part_ne_yo": {
    title: "Partikel ね & よ (Akhiran Konfirmasi vs Penekanan)",
    category: "Partikel",
    questions: [
      {
        q: "<span class=\"jp\"><ruby>今日<rt>きょう</rt></ruby>はほんとうに<ruby>暑<rt>あつ</rt></ruby>いです（　）。</span><br><small>(Hari ini benar-benar panas, ya kan? — meminta persetujuan lawan bicara)</small>",
        speech: "今日はほんとうに暑いですね。",
        opts: ["よ", "ね", "か", "を"],
        a: 1,
        exp: "Ketika pembicara dan lawan bicara sama-sama merasakan hal tersebut dan ingin meminta konfirmasi/persetujuan ('...ya kan?'), gunakan <b>ね (ne)</b>."
      },
      {
        q: "<span class=\"jp\">このラーメンはとてもおいしいです（　）！</span><br><small>(Ramen ini enak banget lho! — memberi tahu informasi baru kepada teman)</small>",
        speech: "このラーメンはとてもおいしいですよ。",
        opts: ["ね", "よ", "か", "と"],
        a: 1,
        exp: "Ketika memberi tahu informasi baru yang belum diketahui lawan bicara atau memberi penekanan ('...lho!'), gunakan <b>よ (yo)</b>."
      },
      {
        q: "<span class=\"jp\">A: すみません、<ruby>明日<rt>あした</rt></ruby>はテストですか。<br>B: いいえ、<ruby>明日<rt>あした</rt></ruby>は<ruby>休<rt>やす</rt></ruby>みです（　）。</span><br><small>(Bukan, besok itu libur lho!)</small>",
        speech: "いいえ、明日は休みですよ。",
        opts: ["ね", "よ", "か", "や"],
        a: 1,
        exp: "Karena B mengoreksi dan memberi informasi baru kepada A bahwa besok libur, digunakan partikel <b>よ</b>."
      },
      {
        q: "<span class=\"jp\">あの<ruby>映画<rt>えいが</rt></ruby>はおもしろかったです（　）。</span><br><small>(Film tadi seru banget ya [kita baru saja menontonnya bersama].)</small>",
        speech: "あの映画はおもしろかったですね。",
        opts: ["よ", "ね", "か", "に"],
        a: 1,
        exp: "Karena keduanya baru menonton film itu bersama-sama dan berbagi kesan yang sama, gunakan <b>ね</b>."
      },
      {
        q: "<span class=\"jp\">あ、<ruby>財布<rt>さいふ</rt></ruby>が<ruby>落<rt>お</rt></ruby>ちました（　）！</span><br><small>(Eh, dompet Anda jatuh lho!)</small>",
        speech: "あ、財布が落ちましたよ。",
        opts: ["ね", "よ", "か", "も"],
        a: 1,
        exp: "Memberi peringatan/tahu kepada orang lain tentang sesuatu yang belum ia sadari menggunakan <b>よ</b>."
      }
    ]
  },

  "comp_wa_ga": {
    title: "Komparasi: は (wa) vs が (ga)",
    category: "Komparasi & Tips",
    questions: [
      {
        q: "Pilihlah partikel yang tepat untuk pertanyaan & jawaban ini:<br><span class=\"jp\">Q: <ruby>誰<rt>だれ</rt></ruby>（ ① ）<ruby>来<rt>き</rt></ruby>ましたか。<br>A: <ruby>佐藤<rt>さとう</rt></ruby>さん（ ② ）<ruby>来<rt>き</rt></ruby>ました。</span>",
        speech: "誰が来ましたか。佐藤さんが来ました。",
        opts: ["① は / ② は", "① が / ② が", "① は / ② が", "① が / ② は"],
        a: 1,
        exp: "Kata tanya yang berada di posisi subjek (誰 / 何 / どれ) <b>wajib diikuti が</b>, dan jawabannya juga <b>wajib diikuti が</b> karena fokus informasinya ada pada subjek di depan."
      },
      {
        q: "<span class=\"jp\"><ruby>私<rt>わたし</rt></ruby>（ ① ）<ruby>寿司<rt>すし</rt></ruby>（ ② ）<ruby>好<rt>す</rt></ruby>きです。</span><br><small>(Saya suka sushi.)</small>",
        speech: "私は寿司が好きです。",
        opts: ["① は / ② を", "① は / ② が", "① が / ② は", "① が / ② を"],
        a: 1,
        exp: "Topik utamanya adalah 'Saya' (<b>私は</b>), sedangkan objek dari kata sifat 好き (suka) wajib menggunakan <b>が</b> (<b>寿司が好きです</b>)."
      },
      {
        q: "<span class=\"jp\"><ruby>象<rt>ぞう</rt></ruby>（ ① ）<ruby>鼻<rt>はな</rt></ruby>（ ② ）<ruby>長<rt>なが</rt></ruby>いです。</span><br><small>(Gajah itu belalainya panjang.)</small>",
        speech: "象は鼻が長いです。",
        opts: ["① は / ② は", "① は / ② が", "① が / ② は", "① の / ② を"],
        a: 1,
        exp: "Pola klasik bahasa Jepang <b>「Topik は Bagian/Sifat が Kata Sifat」</b>: Gajah sebagai topik besar ditandai <b>は</b>, dan bagian tubuhnya (belalai) ditandai <b>が</b>."
      },
      {
        q: "Ketika kita ingin memperkenalkan diri <i>\"Adapun saya adalah mahasiswa\"</i> (fokus informasi baru ada pada kata 'mahasiswa' di belakang), partikel mana yang dipakai?",
        speech: "私は学生です。",
        opts: ["私が学生です。", "私は学生です。", "私を学生です。", "私に学生です。"],
        a: 1,
        exp: "Partikel <b>は</b> meletakkan tekanan informasi pada bagian <b>setelahnya (学生です)</b>."
      },
      {
        q: "<span class=\"jp\">あそこにコンビニ（ ① ）あります。そのコンビニ（ ② ）24<ruby>時間<rt>じかん</rt></ruby>あいています。</span>",
        speech: "あそこにコンビニがあります。そのコンビニは二十四時間あいています。",
        opts: ["① は / ② が", "① が / ② は", "① を / ② は", "① に / ② で"],
        a: 1,
        exp: "Kalimat pertama memperkenalkan keberadaan benda baru dengan あります ➔ pakai <b>が (コンビニがあります)</b>. Kalimat kedua membahas minimarket yang sudah disebut tadi sebagai topik ➔ pakai <b>は (そのコンビニは)</b>."
      }
    ]
  },

  "comp_ni_de": {
    title: "Komparasi Lokasi: に (ni) vs で (de)",
    category: "Komparasi & Tips",
    questions: [
      {
        q: "Bandingkan kedua kalimat ini dan pilih partikel yang tepat:<br>① <span class=\"jp\"><ruby>部屋<rt>へや</rt></ruby>（　）います。</span> (Ada di kamar)<br>② <span class=\"jp\"><ruby>部屋<rt>へや</rt></ruby>（　）<ruby>勉強<rt>べんきょう</rt></ruby>します。</span> (Belajar di kamar)",
        speech: "部屋にいます。部屋で勉強します。",
        opts: ["① で / ② に", "① に / ② で", "① に / ② に", "① で / ② で"],
        a: 1,
        exp: "<b>に</b> digunakan untuk lokasi keberadaan/diam (います = ada), sedangkan <b>で</b> digunakan untuk lokasi tempat terjadinya aksi/kegiatan (勉強します = belajar)."
      },
      {
        q: "<span class=\"jp\"><ruby>図書館<rt>としょかん</rt></ruby>（ ① ）<ruby>本<rt>ほん</rt></ruby>があります。<ruby>図書館<rt>としょかん</rt></ruby>（ ② ）<ruby>本<rt>ほん</rt></ruby>を<ruby>読<rt>よ</rt></ruby>みます。</span>",
        speech: "図書館に本があります。図書館で本を読みます。",
        opts: ["① に / ② で", "① で / ② に", "① を / ② で", "① に / ② を"],
        a: 0,
        exp: "Ada buku di perpustakaan (keberadaan diam ➔ <b>に</b>). Membaca buku di perpustakaan (aktivitas ➔ <b>で</b>)."
      },
      {
        q: "<span class=\"jp\">ジャカルタ（ ① ）<ruby>住<rt>す</rt></ruby>んでいます。ジャカルタ（ ② ）<ruby>働<rt>はたら</rt></ruby>いています。</span><br><small>(Tinggal di Jakarta. Bekerja di Jakarta.)</small>",
        speech: "ジャカルタに住んでいます。ジャカルタで働いています。",
        opts: ["① で / ② に", "① に / ② で", "① に / ② に", "① へ / ② に"],
        a: 1,
        exp: "Kata kerja <b>住む (tinggal)</b> selalu memakai <b>に</b> karena menyatakan titik keberadaan menetap, sedangkan <b>働く (bekerja)</b> adalah aktivitas sehingga memakai <b>で</b>."
      },
      {
        q: "<span class=\"jp\">きのう、どこ（　）パーティーがありましたか。</span><br><small>(Kemarin pesta diadakan di mana?)</small>",
        speech: "きのう、どこでパーティーがありましたか。",
        opts: ["に", "で", "を", "へ"],
        a: 1,
        exp: "Pengecualian penting! Jika <b>あります</b> berarti <b>'diadakan suatu acara/peristiwa'</b> (seperti パーティー pesta, 試験 ujian, 会議 rapat), lokasi acaranya menggunakan <b>で</b> (bukan に)!"
      },
      {
        q: "<span class=\"jp\">あそこのいす（　）<ruby>座<rt>すわ</rt></ruby>ってください。</span><br><small>(Silakan duduk di kursi sebelah sana.)</small>",
        speech: "あそこのいすに座ってください。",
        opts: ["で", "に", "を", "と"],
        a: 1,
        exp: "Kata kerja <b>座る (duduk)</b>, 乗る (naik kendaraan), dan 入る (masuk) menggunakan partikel <b>に</b> karena menandai titik sasaran tempat tubuh menempel/berada."
      }
    ]
  },

  "comp_ni_e_to_ya": {
    title: "Komparasi: に vs へ & と vs や",
    category: "Komparasi & Tips",
    questions: [
      {
        q: "Manakah pernyataan yang tepat mengenai perbedaan <span class=\"jp\">「と」</span> dan <span class=\"jp\">「や」</span> saat menyebutkan daftar benda?",
        speech: "ペンとノート。ペンやノートなど。",
        opts: [
          "と menyebutkan sebagian contoh, sedangkan や menyebutkan daftar lengkap",
          "と menyebutkan daftar lengkap/tertutup, sedangkan や menyebutkan sebagian contoh (daftar terbuka)",
          "と hanya untuk hewan, や untuk benda mati",
          "Tidak ada perbedaan sama sekali"
        ],
        a: 1,
        exp: "<b>と</b> berarti hanya benda-benda itu saja (daftar tertutup), sedangkan <b>や</b> berarti antara lain benda-benda itu dan masih ada yang lain (daftar terbuka)."
      },
      {
        q: "<span class=\"jp\">かばんの<ruby>中<rt>なか</rt></ruby>に<ruby>財布<rt>さいふ</rt></ruby>（　）スマホ（　）などがあります。</span><br><small>(Di dalam tas ada dompet, smartphone, dan lain-lain.)</small>",
        speech: "かばんの中に財布やスマホなどがあります。",
        opts: ["と / と", "や / ∅", "に / で", "を / が"],
        a: 1,
        exp: "Karena terdapat kata <b>など (dan lain-lain)</b> di belakang, partikel penghubung di antara contoh benda adalah <b>や</b> (財布<b>や</b>スマホなど)."
      },
      {
        q: "Dalam kalimat mana partikel <span class=\"jp\">「に」</span> <b>TIDAK BISA</b> digantikan dengan partikel <span class=\"jp\">「へ」</span>?",
        speech: "友達に本をあげます。",
        opts: [
          "明日、東京（に/へ）行きます。",
          "来週、国（に/へ）帰ります。",
          "友達（に）本をあげます。",
          "日本（に/へ）来ました。"
        ],
        a: 2,
        exp: "Partikel <b>へ</b> hanya bisa menggantikan に untuk menyatakan <b>arah perpindahan tempat</b> (行く, 来る, 帰る). Untuk menyatakan penerima (友達に本をあげます = memberi buku kepada teman) atau waktu (7時に), tidak bisa diganti へ."
      },
      {
        q: "Apa perbedaan nuansa halus antara <span class=\"jp\">「<ruby>京都<rt>きょうと</rt></ruby>に<ruby>行<rt>い</rt></ruby>く」</span> dan <span class=\"jp\">「<ruby>京都<rt>きょうと</rt></ruby>へ<ruby>行<rt>い</rt></ruby>く」</span>?",
        speech: "京都に行きます。京都へ行きます。",
        opts: [
          "に menekankan titik tujuan akhir, sedangkan へ menekankan arah keberangkatan menuju tempat itu",
          "に untuk masa lalu, へ untuk masa depan",
          "に untuk naik pesawat, へ untuk jalan kaki",
          "に sopan, へ kasar"
        ],
        a: 0,
        exp: "<b>に</b> berfokus pada <i>titik destinasi akhirnya</i>, sedangkan <b>へ</b> berfokus pada <i>arah gerak menuju ke sana</i>."
      },
      {
        q: "Jika di atas meja <b>hanya ada</b> 1 pulpen dan 1 penghapus (tidak ada benda lain), kalimat mana yang paling tepat?",
        speech: "机の上にペンと消しゴムがあります。",
        opts: [
          "机の上にペンや消しゴムなどがあります。",
          "机の上にペンと消しゴムがあります。",
          "机の上にペンか消しゴムがあります。",
          "机の上にペンより消しゴムがあります。"
        ],
        a: 1,
        exp: "Karena daftarnya lengkap/tuntas (hanya 2 benda itu saja), gunakan partikel <b>と</b>."
      }
    ]
  }
};
