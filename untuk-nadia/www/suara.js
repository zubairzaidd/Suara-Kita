"use strict";

// Di APK, dialog yang dirender dari naskah ikut disalin ke folder audio.
const SuaraNovel = (() => {
  const setelanKey = "untuk-nadia.audio.v1";
  const opsi = { musik: true, dialog: true, efek: true };
  try {
    const data = JSON.parse(localStorage.getItem(setelanKey));
    for (const k of Object.keys(opsi)) if (typeof data?.[k] === "boolean") opsi[k] = data[k];
  } catch { /* Gunakan pilihan awal saat penyimpanan tidak tersedia. */ }

  const musik = new Audio();
  musik.loop = true;
  musik.preload = "none";
  let trek = "", aktif = false, versi = 0, klip = null, bicara = false, konteks = null;
  const efekAktif = new Set();
  const nada = {
    ketuk: [[0, 620, .045, .025]], pilih: [[0, 494, .09, .04], [.08, 659, .14, .045]],
    panggil: [[0, 494, .16, .05], [.19, 659, .18, .05], [.43, 494, .2, .04]],
    waktu: [[0, 392, .23, .05], [.10, 494, .27, .045], [.23, 740, .47, .045]],
    buka: [[0, 523, .26, .04], [.19, 659, .25, .04], [.33, 784, .4, .05]],
    foto: [[0, 480, .045, .04], [.045, 260, .08, .035]],
    pesan: [[0, 659, .12, .045], [.13, 880, .22, .045]]
  };
  function boleh() { return aktif && !document.hidden; }
  function volume() { musik.volume = bicara ? .16 : .38; }
  function musikkan(nama) {
    if (trek !== nama) { musik.pause(); trek = nama; musik.src = "audio/" + nama + ".ogg"; }
    volume();
    if (boleh() && opsi.musik && musik.paused) musik.play().catch(() => {});
  }
  function jedaDialog() {
    versi++;
    if (klip) {
      klip.onended = null; klip.onerror = null;
      klip.pause(); klip = null;
    }
    if (window.speechSynthesis) window.speechSynthesis.cancel();
    bicara = false;
    volume();
  }
  function hidup() {
    aktif = true;
    if (konteks?.state === "suspended") konteks.resume().catch(() => {});
  }
  function tidur() {
    aktif = false;
    musik.pause(); jedaDialog();
    for (const n of efekAktif) { try { n.stop(); } catch {} }
    if (konteks?.state === "running") konteks.suspend().catch(() => {});
  }
  function efek(nama) {
    if (!boleh() || !opsi.efek || !nada[nama]) return;
    const Context = window.AudioContext || window.webkitAudioContext;
    if (!Context) return;
    try {
      konteks ||= new Context();
      if (konteks.state === "suspended") konteks.resume().catch(() => {});
      for (const [tunda, frek, durasi, kuat] of nada[nama]) {
        const awal = konteks.currentTime + tunda, akhir = awal + durasi;
        const os = konteks.createOscillator(), gain = konteks.createGain();
        os.frequency.value = frek;
        gain.gain.setValueAtTime(.0001, awal);
        gain.gain.exponentialRampToValueAtTime(kuat, awal + .01);
        gain.gain.exponentialRampToValueAtTime(.0001, akhir);
        os.connect(gain).connect(konteks.destination);
        efekAktif.add(os);
        os.onended = () => { efekAktif.delete(os); os.disconnect(); gain.disconnect(); };
        os.start(awal); os.stop(akhir + .02);
      }
    } catch { /* Teks dan musik tetap berjalan saat efek tidak tersedia. */ }
  }
  function ucap(baris) {
    jedaDialog();
    if (!boleh() || !opsi.dialog || !baris.klip) return;
    const nomor = versi;
    const selesai = () => { if (nomor === versi) { bicara = false; klip = null; volume(); } };
    const web = () => {
      if (nomor !== versi || !boleh()) return;
      const mesin = window.speechSynthesis, Kata = window.SpeechSynthesisUtterance;
      if (!mesin || !Kata) { selesai(); return; }
      const daftar = mesin.getVoices().filter(v => /^(id|in)([-_]|$)/i.test(v.lang));
      if (!daftar.length) { selesai(); return; }
      const pesan = new Kata(baris.teks); pesan.lang = "id-ID";
      pesan.voice = daftar.find(v => v.localService) || daftar[0];
      const anak = ["putra", "putri"].includes(baris.siapa);
      pesan.pitch = anak ? 1.24 : baris.siapa.startsWith("zubair") ? .91 : 1.05;
      pesan.rate = anak ? 1 : .95;
      pesan.onend = selesai; pesan.onerror = selesai;
      bicara = true; volume(); mesin.speak(pesan);
    };
    if (!window.DIALOG_BUNDLED) { web(); return; }
    const track = new Audio("audio/dialog/" + baris.klip + ".ogg");
    klip = track; track.volume = .9; bicara = true; volume();
    track.onended = selesai;
    const gagal = () => {
      if (nomor !== versi || klip !== track) return;
      track.onerror = null; klip = null; web();
    };
    track.onerror = gagal;
    track.play().catch(gagal);
  }
  function atur(k, on) {
    opsi[k] = on;
    try { localStorage.setItem(setelanKey, JSON.stringify(opsi)); } catch {}
    if (k === "dialog" && !on) jedaDialog();
    if (k === "musik" && !on) musik.pause();
    if (k === "musik" && on && trek) musikkan(trek);
    if (k === "efek" && !on) for (const n of efekAktif) { try { n.stop(); } catch {} }
  }
  return { opsi, hidup, tidur, musikkan, ucap, efek, atur };
})();
