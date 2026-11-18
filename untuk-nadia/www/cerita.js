"use strict";

const BAB_SATU = (() => {
  const u = (siapa, teks, muka = 0) => ({ siapa, teks, muka });
  const rasa = (kunci, variasi) => ({ kunci, variasi });
  const pilih = (label, ke, kunci, nilai) => ({ label, ke, kunci, nilai });
  const dermaga = { bagian: 1, tempat: "Balikpapan", jam: "15.32", latar: "pelabuhan", tokoh: ["zubair"] };
  const teras = { bagian: 1, tempat: "Penajam", jam: "16.54", latar: "rumah", tokoh: ["zubair"] };
  const kapal = { bagian: 2, tempat: "Feri ke Balikpapan", jam: "17.46", latar: "kapal", tokoh: ["zubair"], kanal: "Panggilan Kakak" };
  const kamar = { bagian: 2, tempat: "Kamar Nadia", jam: "17.47", latar: "kamar", tokoh: [], kanal: "Nomor tak dikenal" };
  const depan = { bagian: 3, tempat: "Rumah di seberang teluk", jam: "2036", latar: "jendela", tokoh: ["zubair36", "nadia36"], kanal: "Tersambung · 10 tahun lagi" };
  const foto = { bagian: 4, tempat: "Kamera keluarga", jam: "2036", latar: "keluarga", tokoh: [], kanal: "Tersambung · 10 tahun lagi" };
  const meja = { bagian: 5, tempat: "Penajam", jam: "18.12", latar: "kamar", tokoh: ["zubair"], kanal: "Pesan suara Kakak" };
  const adegan = {
    tiket: { ...dermaga, baris: [
      u("zubair", "Nad, boleh minta tolong? Pegangin dua tiket ini bentar. Tangan Kakak lagi kalah lawan resleting tas kamu.", 1),
      u("batin", "Satu tarikan kecil, resletingnya nutup. Kak Zubair malah tepuk tangan buat dirinya sendiri. Aku selipkan satu tiket ke saku jaketnya."),
      u("zubair", "Eh, yang itu kok dilipet jadi perahu? Nanti pulangnya Kakak beneran harus naik yang sekecil itu?", 1)
    ], pilihan: [
      pilih("“Iya. Aku lipatin kapalnya, Kak.”", "perahu", "bekal", "perahu"),
      pilih("“Lihat belakang tiketnya dulu.”", "jendela", "bekal", "jendela")
    ] },
    perahu: { ...dermaga, baris: [
      u("nadia", "Itu buat nemenin Kakak nanti. Yang duduk deket jendela aku dulu, ya?", 1),
      u("zubair", "Siap, Kapten Nadia. Kalau bocor, yang aku telepon duluan kaptennya.", 1)
    ], lanjut: "pagar" },
    jendela: { ...dermaga, baris: [
      u("batin", "Kubalik perahu kertasnya. Di belakang tiket ada gambar jendela. Kepalaku di sebelah kiri, kepala Kakak di kanan."),
      u("zubair", "Itu yang rambutnya mirip sapu aku, ya? Bagus. Mirip waktu baru bangun.", 1),
      u("nadia", "Hush. Itu edisi terbatas. Simpan yang bener.", 1)
    ], lanjut: "pagar" },
    pagar: { ...teras, baris: [
      u("batin", "Kami turun di Penajam. Tasku masuk ke rumah. Kakak masih di pagar, muter-muterin kunci motor di jarinya."),
      u("zubair", "Nad, yang biasanya Kakak bilang sampai kos itu sekarang ganti apa, ya? Kamu udah di rumah."),
      u("nadia", "Ganti giliran. Kakak yang kabarin aku kalau udah sampai Balikpapan."),
      u("zubair", "Deal. Kakak yang ngabarin. Kamu yang boleh bawel kalau Kakak lupa.", 1)
    ], lanjut: "telepon" },
    telepon: { ...kapal, efek: "panggil", baris: [
      u("batin", "Aku baru mengeluarkan satu kaus dari tas ketika HP-ku berdering. Di layar, sebelah pipi Kakak kena matahari. Sebelahnya basah.", 2),
      u("zubair", "Nad, tadi Kakak geser duduk. Udah mau bilang sini, sebelah Kakak masih kosong. Baru inget kamu di Penajam.", 3),
      u("zubair", "Jadinya Kakak mewek di kapal. Mau sok keren, malah ada bapak di depan nawarin tisu.", 2),
      u("nadia", "Aku masih di sini, Kak. Coba lap dulu kameranya. Yang kelihatan sekarang malah sidik jari Kakak.", 1),
      u("batin", "Dia ketawa kecil. Lalu layarku berbunyi lagi. Ada panggilan masuk dengan tanggal hari ini… tapi tahunnya 2036.", 3)
    ], lanjut: "dering" },
    dering: { ...kamar, efek: "waktu", baris: [
      u("batin", "Foto peneleponnya mirip aku. Di belakang bahunya ada orang yang paling kuhafal cara senyumnya. Nama kontaknya cuma satu kata. Rumah.", 3)
    ], pilihan: [pilih("Angkat panggilan dari 2036", "salam")] },
    salam: { ...depan, baris: [
      u("nadia36", "Halo, Nad. Denger aku? Coba deketin sedikit. Ah, iya. Di sini juga kedengeran kipas kamarmu bunyi tek-tek.", 1),
      u("zubair36", "Dan ini Kakak, dari sepuluh tahun lagi. Bentar, Nad, kamu nutupin setengah muka Kakak pakai jempol.", 1),
      u("nadia36", "Nah, sekarang kelihatan. Aku nyimpen sesuatu dari sore kamu pulang ke Penajam. Coba lihat tanganku."),
      u("nadia36", rasa("bekal", {
        perahu: "Masih ada perahu kertasnya, Kapten. Lakbannya memang tiga lapis. Pernah ikut kecuci sama jaket Kakak, soalnya.",
        jendela: "Di balik tiketnya ada dua kepala di jendela. Rambut Kakak masih kayak sapu. Sudutnya pudar dikit gara-gara pernah ikut kecuci."
      }), 1),
      u("zubair36", "Kamu boleh tanya apa aja, sayang. Atau kamu mau kami duduk di sini dulu? Sore itu lumayan berat, ya.", 2)
    ], pilihan: [
      pilih("“Aku kangen. Duduk sini sebentar, ya?”", "kangen", "hati", "kangen"),
      pilih("“Aku capek dibilang harus semangat terus.”", "capek", "hati", "capek"),
      pilih("“Boleh bikin aku ketawa dulu, Kak?”", "tawa", "hati", "tawa")
    ] },
    kangen: { ...depan, baris: [
      u("nadia", "Aku kangen. Aneh, padahal tanganku masih bau minyak rambut Kakak.", 2),
      u("zubair36", "Sini, aku geser. Kameranya aku taruh di kursi sebelah. Kita duduk bareng selama satu kapal lewat, ya."),
      u("batin", "Mereka betulan diem. Kulihat kapal kecil lewat di belakang kepala mereka. Aku baru sadar bahuku sudah turun."),
      u("nadia36", "Aku inget kursi yang kosong itu, Nad. Malam ini kalau kangen lagi, bilang aja pengin ditemenin. Nggak harus ada cerita seru dulu.", 2)
    ], lanjut: "besok" },
    capek: { ...depan, baris: [
      u("nadia", "Hari ini orang-orang nyuruh aku semangat. Padahal ngeluarin satu kaus aja dari tas rasanya udah berat.", 2),
      u("nadia36", "Berarti satu kaus itu udah keluar. Bagianmu hari ini boleh selesai di situ, Nad. Sisanya masih bisa pakai tas jadi lemari sebentar.", 1),
      u("zubair36", "Mau aku kasih tahu sesuatu? Sampai sekarang kadang kami makan telur ceplok di depan koper yang belum dibongkar. Tetep rumah, kok."),
      u("batin", "Aku menengok tas di lantai. Untuk pertama kali sore itu, aku membiarkan resletingnya terbuka begitu aja.")
    ], lanjut: "besok" },
    tawa: { ...depan, baris: [
      u("nadia", "Kak, tolong bikin aku ketawa dulu. Kayaknya mukaku dari tadi begini terus.", 2),
      u("zubair36", "Oke. Hal paling gagah yang Kakak lakukan sepuluh tahun ini… ngaku ke istri kalau seblak level tiga itu kepedesan.", 3),
      u("nadia36", "Ngakunya di suapan pertama, nangisnya di suapan kedua. Yang pesen es teh aku.", 1),
      u("batin", "Aku ikut ketawa sampai ingusku mau keluar. Nadia di layar nyodorin tisu ke kamera. Kami diam sebentar, baru ketawa lagi.", 1)
    ], lanjut: "besok" },
    besok: { ...depan, baris: [
      u("zubair36", "Nad, aku inget kamu selalu nanyain Kakak udah makan apa belum. Sekarang boleh gantian? Kamu sendiri pengin diapain besok pagi?"),
      u("nadia36", "Pilih yang beneran kamu mau. Aku bakal nyimpen jawabanmu di sini.")
    ], pilihan: [
      pilih("“Telepon pas tehnya masih hangat.”", "teh", "janji", "teh"),
      pilih("“Temenin aku buka jendela pagi-pagi.”", "pagi", "janji", "pagi")
    ] },
    teh: { ...depan, baris: [
      u("zubair36", "Satu cangkir di Penajam, satu di Balikpapan. Mau ngobrol boleh. Mau sama-sama niup teh lima menit juga boleh."),
      u("nadia36", "Aku catet, ya. Tehnya jangan ditinggal sampai dingin gara-gara milih stiker.", 1)
    ], lanjut: "kejutan" },
    pagi: { ...depan, baris: [
      u("nadia36", "Besok buka gorden sedikit aja dulu. Kasih lihat aku warna langit di Penajam. Aku suka yang kamu potret miring-miring itu."),
      u("zubair36", "Nanti Kakak cari satu awan dari sisi Balikpapan juga. Kalau bentuknya kayak ayam, kita namain berdua.", 1)
    ], lanjut: "kejutan" },
    kejutan: { ...depan, baris: [
      u("nadia36", rasa("hati", {
        kangen: "Aku bakal inget kita pernah duduk bareng nunggu satu kapal lewat. Kalau besok kamu kangen, kursi di sebelah itu punyamu.",
        capek: "Kalau besok baru sanggup ngeluarin satu kaus lagi, ceritain warnanya ke Kakak. Kami pengin dengar hal-hal kecilmu juga.",
        tawa: "Kalau besok berat lagi, boleh minta satu cerita seblak lagi. Kakak punya sepuluh tahun bahan buat bikin kamu ketawa."
      }), 3),
      u("zubair36", "Ada yang nunggu giliran dari tadi. Kamera boleh Kakak mundurin sedikit?"),
      u("batin", "Dari luar gambar ada yang bisik, “Sekarang?” Terus suara lain protes, “Kakak duluan terus!” Aku mengangguk ke kamera.", 3)
    ], pilihan: [pilih("“Boleh, Kak. Aku pengin lihat.”", "keluarga")] },
    keluarga: { ...foto, efek: "buka", baris: [
      u("batin", "Dua kepala kecil muncul dari balik sofa. Seorang anak laki-laki mengangkat perahu kertas. Seorang anak perempuan memeluk gambar matahari ungu. Senyum mereka persis dua orang di belakangnya.", 3),
      u("nadia36", "Nad, kenalin. Dua anak kita. Si Kakak dari tadi latihan bilang halo. Adiknya malah pengin ngasih sesuatu lewat layar.", 1),
      u("putra", "Halo, Mama yang dulu! Ayah bilang Mama suka kapal. Aku bikin yang ada tempat duduknya buat Mama!"),
      u("putri", "Mama, nih matahalinya ada kaki. Bial dia bisa jalan ke tempat Mama kalo Mama kangen!"),
      u("zubair36", "Itu krayon ungu terakhir di rumah kita. Tadi dia simpen khusus buat gambar ini, Nad.", 1)
    ], pilihan: [
      pilih("“Mama simpan dua-duanya. Sini peluk!”", "peluk", "balas", "peluk"),
      pilih("“Senyum dulu. Mama mau simpan fotonya!”", "senyum", "balas", "foto")
    ] },
    peluk: { ...foto, baris: [
      u("putri", "Peluknya ke sini, Ma! Aku udah mepet, nih!"),
      u("batin", "Pipi kecilnya gepeng di kaca. Kakaknya ikut nempel dari kiri. Aku memeluk HP dan ternyata aku bisa ketawa sambil nangis.", 1)
    ], lanjut: "pamitan" },
    senyum: { ...foto, efek: "foto", baris: [
      u("putra", "Adek, kapalnya jangan nutupin hidung Ayah! Satu, dua… eh, Ayah malah kedip!"),
      u("batin", "Kusimpan gambar yang pertama. Ayahnya merem, anak perempuannya ngakak, kakaknya bangga sama kapal miringnya. Justru yang ini yang kumau.", 1)
    ], lanjut: "pamitan" },
    pamitan: { ...foto, baris: [
      u("zubair36", "Nadia, semangat buat besok, ya. Terima kasih udah angkat telepon sore ini. Kakak sayang kamu."),
      u("nadia36", "Kalau nanti lupa suara kami, buka surat ini lagi. Sekarang gantian, Nad. Pulanglah makan. Biar nasinya masih hangat.", 1),
      u("putra", "Dadah, Mama!"),
      u("putri", "Dadaaah! Matahalinya ikut dadah!")
    ], lanjut: "sampai" },
    sampai: { ...meja, efek: "pesan", baris: [
      u("batin", "Jam di HP kembali ke sore ini. Sebuah foto tertinggal di layar, lalu masuk pesan suara dari Kak Zubair yang masih pakai jaket kapal."),
      u("zubair", "Aku udah sampai Balikpapan, sayang. Tadi nangis, sekarang laper. Kamu mau kita makan bareng lewat telepon?", 1),
      u("nadia", rasa("janji", {
        teh: "Mau. Besok pagi telepon aku lagi ya, Kak. Pas tehnya masih hangat.",
        pagi: "Mau. Besok bangunin aku ya, Kak. Aku mau nunjukin langit dari jendela."
      }), 1)
    ], akhir: true }
  };
  function baca(id, indeks, pilihan = {}) {
    const asli = adegan[id].baris[indeks], v = asli.teks;
    const cabang = typeof v === "object" ? (Object.hasOwn(v.variasi, pilihan[v.kunci]) ? pilihan[v.kunci] : Object.keys(v.variasi)[0]) : "";
    const teks = cabang ? v.variasi[cabang] : v;
    const klip = asli.siapa === "batin" ? null : id + "-" + (indeks + 1) + (cabang ? "-" + cabang : "");
    return { siapa: asli.siapa, muka: asli.muka, teks, klip };
  }
  return { awal: "tiket", adegan, baca };
})();
if (typeof module !== "undefined" && module.exports) module.exports = BAB_SATU;
