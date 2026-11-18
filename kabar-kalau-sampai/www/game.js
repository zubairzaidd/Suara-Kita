"use strict";

(() => {
  const get = id => document.getElementById(id);
  const tampilan = [get("cover"), get("play"), get("end")];
  const simpanan = "kabar-kalau-sampai.bab1.v1";
  const kunciSuara = "kabar-kalau-sampai.suasana";
  const identitas = {
    batin: ["Nadia", "Dalam hatiku", "nadia", 0],
    nadia: ["Nadia", "Ucapanku", "nadia", 0],
    zubair: ["Zubair", "Kak Zubair", "zubair", 0],
    rekaman: ["Zubair", "Transkrip pesan suara", "zubair", 0],
    pesan: ["Zubair", "Pesan untukku", "zubair", 0],
    nadia36: ["Nadia", "Sepuluh tahun lagi", "nadia", 1],
    zubair36: ["Zubair", "Sepuluh tahun lagi", "zubair", 1]
  };
  const bagian = ["", "Berangkat", "Sampai rumah", "Kapal pulang", "Dua tamu", "Kabar sampai"];
  let posisi;
  let layarAktif = "cover";
  let terakhir = "";
  let suaraAktif = baca(kunciSuara) === "1";
  let audio;
  let sumber;
  let volume;
  let nadaFilter;

  function baca(kunci) {
    try { return window.localStorage.getItem(kunci); } catch { return null; }
  }
  function tulis(kunci, nilai) {
    try {
      if (nilai === null) window.localStorage.removeItem(kunci);
      else window.localStorage.setItem(kunci, nilai);
    } catch { /* Cerita tetap bisa dimainkan ketika penyimpanan penuh. */ }
  }
  function mulaiBaru() { return { id: BAB_SATU.awal, indeks: 0, pilihan: {} }; }
  function ambilSimpanan() {
    try {
      const s = JSON.parse(baca(simpanan));
      if (!s || !Object.hasOwn(BAB_SATU.adegan, s.id)) return null;
      if (!Number.isInteger(s.indeks) || s.indeks < 0 || s.indeks >= BAB_SATU.adegan[s.id].baris.length) return null;
      if (!s.pilihan || typeof s.pilihan !== "object" || Array.isArray(s.pilihan)) return null;
      return s;
    } catch { return null; }
  }
  function buka(nama) {
    layarAktif = nama;
    for (const el of tampilan) el.hidden = el.id !== nama;
    get("play").scrollTop = 0;
  }
  function judul() {
    buka("cover");
    matikanSuasana();
    posisi = ambilSimpanan();
    get("startLabel").textContent = posisi ? "Lanjutkan cerita" : "Mulai cerita";
    get("restart").hidden = !posisi;
  }
  function mulai(lanjutkan) {
    posisi = (lanjutkan && ambilSimpanan()) || mulaiBaru();
    terakhir = "";
    buka("play");
    perbarui();
    fokusLanjut();
  }
  function fokusLanjut() {
    const target = get("next").hidden ? get("choices").firstElementChild : get("next");
    if (target) target.focus({preventScroll: true});
  }
  function sprite(el, tokoh, tahun, muka) {
    el.className = "person " + tokoh;
    el.style.backgroundPosition = ((muka / 3) * 100) + "% " + (tahun * 100) + "%";
  }
  function ekspresi(adegan, siapa, nilaiAwal) {
    for (let i = posisi.indeks; i >= 0; i--) {
      if (adegan.baris[i].siapa === siapa) return adegan.baris[i].muka;
    }
    return nilaiAwal;
  }
  function panggung(adegan, baris) {
    const stage = get("stage"), a = get("actorA"), b = get("actorB");
    stage.dataset.bg = adegan.latar;
    const berdua = adegan.bidik === "berdua";
    stage.classList.toggle("anomaly", berdua);
    get("cast").classList.toggle("duo", berdua);
    a.hidden = adegan.bidik === "kosong";
    b.hidden = !berdua;
    if (berdua) {
      sprite(a, "zubair", 1, ekspresi(adegan, "zubair36", 0));
      sprite(b, "nadia", 1, ekspresi(adegan, "nadia36", 0));
      a.classList.toggle("quiet", baris.siapa === "nadia36");
      b.classList.toggle("quiet", baris.siapa === "zubair36");
    } else if (!a.hidden) {
      sprite(a, "zubair", 0, ekspresi(adegan, "zubair", adegan.babak === 3 ? 3 : 0));
    }
    get("location").textContent = adegan.lokasi;
    get("clock").textContent = adegan.jam;
    get("channel").hidden = !adegan.kanal;
    get("channel").textContent = adegan.kanal || "";
  }
  function pilih(opsi) {
    if (opsi.kunci) posisi.pilihan[opsi.kunci] = opsi.nilai;
    pindah(opsi.ke);
    fokusLanjut();
  }
  function pindah(id) {
    posisi.id = id;
    posisi.indeks = 0;
    perbarui();
  }
  function perbarui() {
    const adegan = BAB_SATU.adegan[posisi.id];
    const baris = adegan.baris[posisi.indeks];
    const [nama, label, tokoh, tahun] = identitas[baris.siapa];
    const opsi = posisi.indeks === adegan.baris.length - 1 ? adegan.pilihan : null;
    const fokusPindah = document.activeElement === get("next") && Boolean(opsi);
    panggung(adegan, baris);
    get("speaker").textContent = nama;
    get("voiceKind").textContent = label;
    get("part").textContent = bagian[adegan.babak];
    sprite(get("avatar"), tokoh, tahun, baris.muka);
    const words = get("words");
    words.textContent = typeof baris.teks === "function" ? baris.teks(posisi.pilihan) : baris.teks;
    words.classList.remove("appear");
    void words.offsetWidth;
    words.classList.add("appear");
    const progress = get("progress");
    progress.setAttribute("aria-label", "Bagian " + adegan.babak + " dari 5");
    Array.from(progress.children).forEach((el, i) => el.classList.toggle("done", i < adegan.babak));
    const choices = get("choices");
    choices.replaceChildren();
    choices.hidden = !opsi;
    for (const item of opsi || []) {
      const button = document.createElement("button");
      button.type = "button";
      button.textContent = item.label;
      button.addEventListener("click", () => pilih(item));
      choices.append(button);
    }
    get("next").hidden = Boolean(opsi);
    get("nextLabel").textContent = adegan.akhir && posisi.indeks === adegan.baris.length - 1 ? "Tutup Bab 1" : "Lanjut";
    if (fokusPindah) fokusLanjut();
    tulis(simpanan, JSON.stringify(posisi));
    if (terakhir !== posisi.id) {
      terakhir = posisi.id;
      aturSuasana(adegan.latar);
      if (posisi.id === "suara" || posisi.id === "sampai") nadaPesan();
    }
  }
  function maju() {
    if (layarAktif !== "play" || get("next").hidden) return;
    const adegan = BAB_SATU.adegan[posisi.id];
    if (posisi.indeks < adegan.baris.length - 1) {
      posisi.indeks += 1;
      perbarui();
    } else if (adegan.lanjut) {
      pindah(adegan.lanjut);
    } else if (adegan.akhir) {
      const nama = posisi.pilihan.tiket === "lambat" ? "Si Lambat" : "Si Nekat";
      get("endText").textContent = "Di HP-ku ada foto " + nama + ". Di seberang teluk, ada yang ingat ngabarin aku pulang.";
      tulis(simpanan, null);
      posisi = null;
      buka("end");
      matikanSuasana();
      get("again").focus({preventScroll: true});
    }
  }

  // Suasana ombak dan nada HP dibuat di perangkat agar bisa dimainkan luring.
  function aturIkonSuara() {
    get("sound").setAttribute("aria-pressed", String(suaraAktif));
    const label = suaraAktif ? "Matikan suara suasana" : "Nyalakan suara suasana";
    get("sound").setAttribute("aria-label", label);
    get("sound").title = label;
    get("soundIcon").setAttribute("href", suaraAktif ? "#i-sound" : "#i-off");
  }
  function matikanSuasana() {
    if (sumber) { sumber.stop(); sumber.disconnect(); sumber = null; }
    if (nadaFilter) { nadaFilter.disconnect(); nadaFilter = null; }
    if (volume) { volume.disconnect(); volume = null; }
  }
  function aturSuasana(latar) {
    if (!suaraAktif || document.hidden || layarAktif !== "play") return;
    const Context = window.AudioContext || window.webkitAudioContext;
    if (!Context) { suaraAktif = false; aturIkonSuara(); return; }
    try {
      audio ||= new Context();
      if (audio.state === "suspended") audio.resume().catch(() => {});
      if (!sumber) {
        const n = audio.sampleRate * 4, buffer = audio.createBuffer(1, n, audio.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < n; i++) data[i] = (Math.random() * 2 - 1) * (.58 - .34 * Math.cos(2 * Math.PI * i / n));
        sumber = audio.createBufferSource();
        sumber.buffer = buffer;
        sumber.loop = true;
        nadaFilter = audio.createBiquadFilter();
        nadaFilter.type = "lowpass";
        volume = audio.createGain();
        volume.gain.value = 0;
        sumber.connect(nadaFilter).connect(volume).connect(audio.destination);
        sumber.start();
      }
      const air = latar === "kapal" || latar === "pelabuhan";
      nadaFilter.frequency.setTargetAtTime(air ? 750 : 450, audio.currentTime, .25);
      volume.gain.setTargetAtTime(air ? .17 : .05, audio.currentTime, .35);
    } catch { matikanSuasana(); suaraAktif = false; aturIkonSuara(); }
  }
  function nadaPesan() {
    if (!suaraAktif || !audio || document.hidden) return;
    for (const [jeda, frekuensi] of [[0, 659], [.14, 880]]) {
      const t = audio.currentTime + jeda;
      const nada = audio.createOscillator(), v = audio.createGain();
      nada.frequency.value = frekuensi;
      v.gain.value = 0;
      v.gain.setValueAtTime(0, t);
      v.gain.linearRampToValueAtTime(.045, t + .015);
      v.gain.exponentialRampToValueAtTime(.0001, t + .22);
      nada.connect(v).connect(audio.destination);
      nada.onended = () => { nada.disconnect(); v.disconnect(); };
      nada.start(t); nada.stop(t + .23);
    }
  }
  get("start").addEventListener("click", () => mulai(true));
  get("restart").addEventListener("click", () => mulai(false));
  get("again").addEventListener("click", () => mulai(false));
  for (const id of ["home", "endHome"]) get(id).addEventListener("click", () => { judul(); get("start").focus(); });
  get("next").addEventListener("click", maju);
  get("stage").addEventListener("click", maju);
  get("sound").addEventListener("click", () => {
    suaraAktif = !suaraAktif;
    if (suaraAktif) aturSuasana(BAB_SATU.adegan[posisi.id].latar); else matikanSuasana();
    tulis(kunciSuara, suaraAktif ? "1" : "0");
    aturIkonSuara();
  });
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) matikanSuasana();
    else if (layarAktif === "play") aturSuasana(BAB_SATU.adegan[posisi.id].latar);
  });
  document.addEventListener("keydown", e => {
    if (layarAktif !== "play" || e.repeat) return;
    if (e.key === "Escape") { judul(); get("start").focus(); }
    if (e.key === "ArrowRight") { e.preventDefault(); maju(); }
  });
  aturIkonSuara();
  judul();
})();
