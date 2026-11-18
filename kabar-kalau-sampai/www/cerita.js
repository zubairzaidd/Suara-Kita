"use strict";

const BAB_SATU = (() => {
  // Nama, ekspresi 0–3, dan kalimat. Baris kedua atlas milik tokoh tahun 2036.
  const aku = (teks, muka = 0) => ({ siapa: "batin", muka, teks });
  const n = (teks, muka = 0) => ({ siapa: "nadia", muka, teks });
  const z = (teks, muka = 0) => ({ siapa: "zubair", muka, teks });
  const vn = (teks, muka = 2) => ({ siapa: "rekaman", muka, teks });
  const zm = (teks, muka = 0) => ({ siapa: "zubair36", muka, teks });
  const nm = (teks, muka = 0) => ({ siapa: "nadia36", muka, teks });
  const chat = (teks, muka = 0) => ({ siapa: "pesan", muka, teks });
  const opsi = (label, ke, kunci, nilai) => ({ label, ke, kunci, nilai });
  const namaKapal = (pilihan) => pilihan.tiket === "lambat" ? "Si Lambat" : "Si Nekat";
  const dermaga = { babak: 1, lokasi: "Balikpapan · Dermaga feri", jam: "15.32", latar: "pelabuhan", bidik: "zubair" };
  const feri = { babak: 1, lokasi: "Feri menuju Penajam", jam: "16.08", latar: "kapal", bidik: "zubair" };
  const rumah = { babak: 2, lokasi: "Penajam · Teras rumah", jam: "16.54", latar: "rumah", bidik: "zubair" };
  const kamar = { babak: 3, lokasi: "Penajam · Kamarku", jam: "17.43", latar: "kamar", bidik: "kosong" };
  const layar = { babak: 3, lokasi: "Di layar HP Nadia", jam: "17.46", latar: "kapal", bidik: "zubair", kanal: "Panggilan video" };
  const masa = { babak: 4, lokasi: "Di layar HP Nadia", jam: "17.47", latar: "kapal", bidik: "berdua", kanal: "Sinyal terputus-putus" };

  return {
    awal: "loket",
    adegan: {
      loket: { ...dermaga, baris: [
        aku("Resleting tasku seret lagi. Kak Zubair menjepit ujungnya pakai gigi. Di belakang kami, antrean penumpang ke Penajam sudah maju tiga orang."),
        n("Kak, kalau giginya ikut kebawa pulang gimana?", 1),
        z("Ya udah, besok Kakak nyebrang lagi buat ngambil.", 1),
        aku("Aku ketawa duluan. Besok. Enak banget cara dia ngomongnya. Padahal sore ini barang-barangku sudah pindah dari kos Balikpapan ke satu tas kotak-kotak.", 2),
        aku("Di kapal, dia menyisakan kursi sebelah jendela buatku. Dari tiket bekas, kulipat sebuah perahu kecil. Bagian bawahnya miring."),
        z("Kasih nama, Nad. Biar kalau tenggelam kita tahu siapa yang mesti dipanggil.", 1)
      ], pilihan: [
        opsi("Tulis “Si Lambat” di lambungnya", "lambat", "tiket", "lambat"),
        opsi("Tulis “Si Nekat” di lambungnya", "nekat", "tiket", "nekat")
      ] },
      lambat: { ...feri, baris: [
        n("Si Lambat. Biar dia lama sampainya. Aku masih enak duduk di sini."),
        z("Boleh. Tapi kaptennya udah pengin pipis dari dermaga.", 1),
        aku("Dia tetap duduk sampai aku selesai menulis. Huruf terakhirnya goyang karena aku ketawa.", 1)
      ], lanjut: "teras" },
      nekat: { ...feri, baris: [
        n("Si Nekat. Kayak siapa tuh yang bilang kuat makan seblak level tiga?", 1),
        z("Jangan bawa-bawa riwayat kesehatan kapten ke urusan pelayaran, Nad.", 1),
        aku("Dia ketawa sampai pulpenku meleset. Ada ekor panjang di huruf T. Kubiarkan saja.", 1)
      ], lanjut: "teras" },
      teras: { ...rumah, baris: [
        aku("Di Penajam, sandal jepit lamaku masih di bawah bangku teras. Ibu masuk duluan membawakan tasku. Aku dan Kakak berdiri agak kelamaan di depan pintu."),
        aku("Kuselipkan perahu tiket itu ke saku jaketnya. Separuh ujung kertasnya menyembul."),
        n("Yang ini ikut Kakak balik ke Balikpapan, ya. Aku bagian ngecek dia sampai."),
        z("Kabar kalau sampai, gitu?"),
        n("Iya. Walaupun aku ketiduran. Walaupun cuma satu kata."),
        aku("Waktu dia sudah di pagar, mulutku baru sempat bilang hati-hati. Dia menoleh seolah dengar. Setelah itu aku cuma bisa lihat belokan gang.", 2)
      ], lanjut: "menunggu" },
      menunggu: { ...kamar, baris: [
        aku("Aku baru mengeluarkan satu baju dari tas waktu HP-ku bergetar. Ada pesan suara dari Kakak. Dua belas detik."),
        aku("Biasanya kalau pamit, dia kirim stiker kucing acung jempol. Kupelankan kipas angin, lalu kudekatkan HP ke telinga.", 2)
      ], pilihan: [opsi("Buka transkrip pesan suara · 0:12", "suara")] },
      suara: { ...kamar, kanal: "Pesan suara · transkrip", baris: [
        vn("Nad, Kakak udah di kapal balik. Tadi dapat kursi kita. Yang deket jendela.", 0),
        aku("Empat detik berikutnya cuma bunyi mesin. Lalu kudengar dia menarik napas dua kali. Aku kenal bunyi yang kedua.", 2),
        vn("Refleks Kakak geser buat ngasih kamu tempat. Terus malah bilang ‘sini, Nad’ ke kursi kosong. … Kakak nangis, Nad.", 3),
        aku("Jempolku sudah mengetik ‘jangan nangis’. Kuhapus dua kata itu. Kalau tadi aku di sebelahnya, aku juga nggak akan bilang begitu.", 2)
      ], pilihan: [
        opsi("Telepon dan temani dia dengar ombak", "ombak", "temani", "ombak"),
        opsi("Telepon dan tanya apa yang dia kangenin", "cerita", "temani", "cerita")
      ] },
      ombak: { ...layar, baris: [
        n("Boleh nyalain video? Aku pengin denger ombak di situ."),
        aku("Di layarku muncul sebelah pipinya yang basah. Dia menyandarkan HP ke jendela. Aku menaruh punyaku di atas bantal.", 2),
        z("Nggak apa-apa kalau Kakak diem sebentar?", 3),
        n("Iya. Aku juga lagi diem. Dengerin deh, di tempatku ada cicak ikut nimbrung.")
      ], lanjut: "kursi" },
      cerita: { ...layar, baris: [
        n("Angkat video, Kak. Tadi sebelum kirim pesan, Kakak paling kangen apa?"),
        aku("Yang muncul di layar malah alisnya dulu. Begitu HP-nya dia mundurkan, kelihatan satu garis air di pipinya.", 2),
        z("Kamu suka narik lengan jaket Kakak kalau lihat kapal kecil. Tadi ada satu lewat. Kakak malah nungguin lengannya ketarik.", 3),
        n("Besok kalau ada lagi, fotoin. Biar aku yang narik lengan Kakak lewat chat.")
      ], lanjut: "kursi" },
      kursi: { ...layar, jam: "17.47", bidik: "kosong", baris: [
        z("Sebentar, Nad. Itu perahu kertas kita… kok ada dua?", 2),
        aku("Kakak membalik kameranya. Di layar kulihat perahu tiket di atas bangku. Di sampingnya ada satu lagi, kertasnya kuning dan lipatannya hampir putus.", 3),
        aku("Gambar membeku. Bunyi mesin di HP-ku hilang. Lalu jok yang tadi kosong melesak, seperti baru diduduki dua orang.", 3)
      ], lanjut: "tamu" },
      tamu: { ...masa, baris: [
        aku("Seorang laki-laki duduk menahan kertas tua itu dengan jempolnya. Di sebelahnya, perempuan berkepang menyelipkan rambut ke telinga. Gerakannya persis kebiasaanku.", 3),
        zm("Nad, kameranya jangan dimatiin dulu, ya. Aku Zubair. Yang tadi geser dari kursi jendela itu juga aku. Cuma aku udah sepuluh tahun lebih tua."),
        nm("Dan aku Nadia. Di sini udah 2036, Dek. Astaga, aku masih inget bau tas kotak-kotak itu.", 1),
        n("Kalau beneran aku… apa yang tadi kutulis di perahu? Kertasnya jangan dibalik.", 3),
        nm(s => "“" + namaKapal(s) + ".” " + (s.tiket === "lambat" ? "Huruf terakhirnya goyang. Kaptennya kebelet, kan?" : "Ada ekor panjang di huruf T. Gara-gara si kapten seblak."), 1),
        aku("Kakak mengangkat perahu yang putih ke kamera. Tanganku ikut terangkat, ingin menyentuh perahu yang kuning. Ujung jariku malah meninggalkan bekas di kaca HP.", 2),
        zm("Bair, aku masih inget malunya nangis di kapal. Tapi gara-gara kamu berani kirim dua belas detik itu, Nadia bisa nemenin kita pulang.", 2),
        z("Jadi… masih boleh nangis sampai sandar?", 3),
        zm("Boleh banget. Nanti lap mukanya dulu. Kalau enggak, mas-mas yang jual tisu bakal ngasih kamu sebungkus lagi.", 3),
        nm("Nad, kamu juga boleh bilang kangen. Aku dulu kelamaan jadi orang yang selalu jawab ‘aku nggak apa-apa’.", 2),
        aku("Perempuan di layar itu tersenyum dengan mataku. Ada banyak yang pengin kutanya. Sinyalnya mulai pecah di ujung kepangnya.", 3)
      ], pilihan: [
        opsi("“Kalian masih suka teleponan?”", "telepon", "tanya", "telepon"),
        opsi("“Kalau aku yang nangis besok?”", "besok", "tanya", "besok")
      ] },
      telepon: { ...masa, baris: [
        nm("Masih. Kemarin dia nelepon dari dapur. Nanya gula di mana, padahal aku cuma sejauh satu pintu.", 1),
        zm("Toplesnya dipindah. Itu keadaan darurat.", 1),
        n("Aku ketawa beneran, Kak. Makasih. Yang di dapur sama yang di kapal.", 1)
      ], lanjut: "putus" },
      besok: { ...masa, baris: [
        nm("Telepon duluan, Nad. Kamu nggak perlu nyiapin alasan yang bagus. Bilang ‘temenin aku bentar’ juga cukup."),
        zm("Kakak yang sekarang denger juga, kan? Kalau dia nelepon sambil nangis besok, angkat, ya.", 3),
        z("Yang besok sama yang lusa juga bakal Kakak angkat.", 2),
        aku("Kali ini aku yang cari ujung lengan baju buat ngelap mata. Aku mengangguk ke kamera.", 2)
      ], lanjut: "putus" },
      putus: { ...masa, baris: [
        nm("Kapalnya sebentar lagi sandar. Semangat, kalian berdua. Sampaiin satu sama lain, ya, kalau udah nyampe.", 3),
        aku("Ujung kepangnya buyar duluan, lalu bahu laki-laki di sebelahnya. Sesaat sebelum layar pulih, kulihat tangan mereka masih saling menggenggam.", 2)
      ], lanjut: "pulang" },
      pulang: { ...layar, jam: "17.52", kanal: "Panggilan video", baris: [
        z("Nad… kamu lihat juga, kan? Di sini perahunya tinggal satu.", 2),
        n(s => s.temani === "ombak" ? "Lihat. Sini, kita dengerin ombak sampai Kakak boleh turun. Di tempatku cicaknya udah diem." : "Lihat. Kalau ada kapal kecil sebelum sandar, kasih lihat aku ya. Aku masih pegang HP-nya."),
        aku("Ada suara petugas dari seberang. Kakak memasukkan perahu putih ke saku dalam, tempat yang ada resletingnya.")
      ], lanjut: "sampai" },
      sampai: { ...kamar, babak: 5, jam: "18.12", kanal: "Pesan masuk", baris: [
        chat(s => "Udah sampai Balikpapan, Nad. " + namaKapal(s) + " juga selamat. Nih, laporan kapten.", 1),
        aku("Ada foto saku jaket dan satu ujung kertas putih. Besok aku bakal kangen lagi. Sekarang aku tahu aku boleh ngomong duluan."),
        n(s => s.tanya === "besok" ? "Aku juga kangen, Kak. Besok temenin aku bentar, ya? Sekarang makan dulu sana." : "Kalau nanti Kakak nyari gula, telepon aku aja. Buat malam ini, makan dulu ya, Kapten.", 1),
        aku("Foto itu kusimpan di HP-ku. Di luar kamar, Ibu memanggil buat makan. Kali ini aku bisa menjawab tanpa perlu berdeham dulu.")
      ], akhir: true }
    }
  };
})();
