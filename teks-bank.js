/* Bacaan contoh (kurasi manual) — memakai kosakata deck Kaishi.
   Skema sama dengan keluaran generate-teks.py. */
window.KAISHI_TEKS_BANK = {
  sumber: "kurasi",
  teks: [
    {
      judul: "私の一日",
      level: 5,
      paragraf: [
        "朝、私は六時に起きます。顔を洗って、パンを食べます。それから、学校へ行きます。",
        "学校で日本語を勉強します。先生の話を聞いて、ノートに書きます。",
        "夜、家族と食事をします。寝る前に、少し本を読みます。"
      ],
      arti: "Pagi hari, saya bangun pukul enam. Saya mencuci muka lalu makan roti. Setelah itu, saya pergi ke sekolah. Di sekolah saya belajar bahasa Jepang. Saya mendengarkan penjelasan guru lalu menulisnya di buku catatan. Malam hari, saya makan bersama keluarga. Sebelum tidur, saya membaca buku sebentar.",
      soal: [
        { q: "私は朝、何を食べますか。", o: ["パン", "肉", "魚", "ごはん"], a: 0, n: "「パンを食べます」= makan roti." },
        { q: "寝る前に何をしますか。", o: ["本を読みます", "日本語を勉強します", "家族と話します", "学校へ行きます"], a: 0, n: "「寝る前に、少し本を読みます」= sebelum tidur membaca buku." },
        { q: "この人は夜、だれと食事をしますか。", o: ["家族", "先生", "学生", "一人で"], a: 0, n: "「家族と食事をします」= makan bersama keluarga." }
      ]
    },
    {
      judul: "学校の教室",
      level: 5,
      paragraf: [
        "私の学校には、大きい教室があります。教室には、机と椅子があります。",
        "先生は日本語で話します。学生は、よく質問をします。",
        "授業の後で、私は学生と話します。学校は、とても楽しいです。"
      ],
      arti: "Di sekolah saya ada kelas yang besar. Di dalam kelas ada meja dan kursi. Guru berbicara dalam bahasa Jepang. Para siswa sering bertanya. Setelah pelajaran, saya berbicara dengan siswa lain. Sekolah sangat menyenangkan.",
      soal: [
        { q: "教室に何がありますか。", o: ["机と椅子", "パンと水", "本と花", "先生だけ"], a: 0, n: "「教室には、机と椅子があります」= di kelas ada meja dan kursi." },
        { q: "先生は何で話しますか。", o: ["日本語", "英語", "インドネシア語", "中国語"], a: 0, n: "「先生は日本語で話します」= guru berbicara dalam bahasa Jepang." },
        { q: "授業の後で、私は何をしますか。", o: ["学生と話します", "家へ帰ります", "本を読みます", "寝ます"], a: 0, n: "「授業の後で、私は学生と話します」= setelah pelajaran, berbicara dengan siswa." }
      ]
    },
    {
      judul: "雨の日",
      level: 4,
      paragraf: [
        "今日は朝から雨が降っています。空は暗くて、少し寒いです。",
        "私は家で本を読みます。雨の音は静かです。",
        "夜は、家族と料理を作ります。雨の日も、私は好きです。"
      ],
      arti: "Hari ini hujan turun sejak pagi. Langit gelap dan agak dingin. Saya membaca buku di rumah. Suara hujan tenang. Malam hari, saya memasak bersama keluarga. Hari hujan pun saya suka.",
      soal: [
        { q: "今日の天気はどうですか。", o: ["雨です", "雪です", "晴れです", "風が強いです"], a: 0, n: "「朝から雨が降っています」= hujan sejak pagi." },
        { q: "私は家で何をしますか。", o: ["本を読みます", "料理を作ります", "学校へ行きます", "寝ます"], a: 0, n: "「私は家で本を読みます」= di rumah membaca buku." },
        { q: "夜、だれと料理を作りますか。", o: ["家族", "先生", "学生", "一人で"], a: 0, n: "「家族と料理を作ります」= memasak bersama keluarga." }
      ]
    },
    {
      judul: "買い物",
      level: 4,
      paragraf: [
        "昨日、母と店へ行きました。店には、いろいろな物がありました。",
        "私は新しい本を買いました。母は、赤い花を買いました。",
        "買い物の後で、私たちはお茶を飲みました。とても楽しい一日でした。"
      ],
      arti: "Kemarin saya pergi ke toko bersama ibu. Di toko ada berbagai macam barang. Saya membeli buku baru. Ibu membeli bunga merah. Setelah berbelanja, kami minum teh. Hari yang sangat menyenangkan.",
      soal: [
        { q: "私は何を買いましたか。", o: ["新しい本", "赤い花", "お茶", "パン"], a: 0, n: "「私は新しい本を買いました」= membeli buku baru." },
        { q: "母は何を買いましたか。", o: ["赤い花", "新しい本", "お茶", "肉"], a: 0, n: "「母は、赤い花を買いました」= ibu membeli bunga merah." },
        { q: "買い物の後で何をしましたか。", o: ["お茶を飲みました", "本を読みました", "家へ帰りました", "寝ました"], a: 0, n: "「私たちはお茶を飲みました」= minum teh." }
      ]
    },
    {
      judul: "山と海",
      level: 4,
      paragraf: [
        "日本には、高い山がたくさんあります。夏は、海で遊ぶ人が多いです。",
        "冬は、雪が降って、とても寒いです。",
        "私は、山を歩くのが好きです。でも、海も好きです。"
      ],
      arti: "Di Jepang ada banyak gunung tinggi. Pada musim panas, banyak orang bermain di laut. Pada musim dingin, salju turun dan sangat dingin. Saya suka berjalan di gunung. Tetapi, laut juga saya suka.",
      soal: [
        { q: "夏、人はどこで遊びますか。", o: ["海", "山", "学校", "店"], a: 0, n: "「夏は、海で遊ぶ人が多いです」= musim panas banyak orang bermain di laut." },
        { q: "冬はどうですか。", o: ["雪が降って寒いです", "雨が降って暑いです", "花が咲きます", "風が強いです"], a: 0, n: "「冬は、雪が降って、とても寒いです」= musim dingin turun salju dan sangat dingin." },
        { q: "私は何が好きですか。", o: ["山を歩くこと", "海で泳ぐこと", "雪を見ること", "本を読むこと"], a: 0, n: "「私は、山を歩くのが好きです」= suka berjalan di gunung." }
      ]
    }
  ]
};
