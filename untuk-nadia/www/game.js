"use strict";

(() => {
  const get = id => document.getElementById(id);
  const layar = ["cover","play","end"];
  const save = "untuk-nadia.bab1.v1";
  const tokoh = {
    batin: ["Nadia", "Dalam hatimu", "nadia", 0], nadia: ["Nadia", "Jawabanmu", "nadia", 0],
    zubair: ["Kak Zubair", "2026", "zubair", 0], zubair36: ["Kak Zubair", "Dari 2036", "zubair", 1],
    nadia36: ["Nadia", "Dirimu di 2036", "nadia", 1], putra: ["Si Kakak", "Putra kalian", "putra", 0],
    putri: ["Si Adik", "Putri kalian", "putri", 0]
  };
  const judulBagian = ["","Menyeberang","Panggilan","Dari 2036","Keluarga","Sampai"];
  const setelan = { musik: "musicSetting", dialog: "voiceSetting", efek: "fxSetting" };
  const laguAwal = "seberang-jendela", laguAkhir = "lampu-rumah";
  let posisi, kini = "cover", adeganTerakhir = "", pemicuPanel = null;
  function layarKe(id) {
    kini = id;
    for (const v of layar) get(v).hidden = v !== id;
    get("play").scrollTop = 0;
  }
  function simpan(pos) {
    try { if (pos) localStorage.setItem(save, JSON.stringify(pos)); else localStorage.removeItem(save); } catch {}
  }
  function tersimpan() {
    try {
      const s = JSON.parse(localStorage.getItem(save));
      if (!s || !Object.hasOwn(BAB_SATU.adegan,s.id)) return null;
      const node = BAB_SATU.adegan[s.id];
      if (!Number.isInteger(s.baris) || s.baris < 0 || s.baris >= node.baris.length) return null;
      if (!s.pilihan || typeof s.pilihan !== "object" || Array.isArray(s.pilihan)) return null;
      return s;
    } catch { return null; }
  }
  function keJudul() {
    SuaraNovel.tidur(); layarKe("cover"); posisi = tersimpan();
    get("startLabel").textContent = posisi ? "Lanjutkan percakapan" : "Buka surat dari Kakak";
    get("restart").hidden = !posisi;
  }
  function mulai(lanjut) {
    posisi = (lanjut && tersimpan()) || { id: BAB_SATU.awal, baris: 0, pilihan: {} };
    adeganTerakhir = ""; layarKe("play"); SuaraNovel.hidup(); gambar(); fokus();
  }
  function fokus() {
    (get("next").hidden ? get("choices").firstElementChild : get("next"))?.focus({ preventScroll: true });
  }
  function tampilkanSprite(el, siapa, muka) {
    const [, , aset, era] = tokoh[siapa];
    el.className = "person " + aset;
    el.style.backgroundPosition = aset === "putra" || aset === "putri" ? "center" : (muka * 100 / 3) + "% " + (era * 100) + "%";
  }
  function panggung(node, baris) {
    const stage = get("stage");
    stage.dataset.bg = node.latar;
    stage.classList.toggle("anomaly", node.latar === "jendela");
    get("cast").classList.toggle("duo", node.tokoh.length === 2);
    for (const [i,id] of ["actorA","actorB"].entries()) {
      const siapa = node.tokoh[i], el = get(id);
      el.hidden = !siapa;
      if (!siapa) continue;
      let muka = siapa === "zubair" && node.latar === "kapal" ? 3 : 0;
      for (let j = posisi.baris; j >= 0; j--) {
        if (node.baris[j].siapa === siapa) { muka = node.baris[j].muka; break; }
      }
      tampilkanSprite(el, siapa, muka);
      el.classList.toggle("quiet", node.tokoh.includes(baris.siapa) && baris.siapa !== siapa);
    }
    get("location").textContent = node.tempat; get("clock").textContent = node.jam;
    get("channel").hidden = !node.kanal; get("channel").textContent = node.kanal || "";
  }
  function lagu(node) { return node.bagian >= 4 ? laguAkhir : laguAwal; }
  function sekarang() { return BAB_SATU.baca(posisi.id, posisi.baris, posisi.pilihan); }
  function pindah(id) { posisi.id = id; posisi.baris = 0; gambar(); }
  function balas(item) {
    if (item.kunci) posisi.pilihan[item.kunci] = item.nilai;
    SuaraNovel.efek("pilih"); pindah(item.ke); fokus();
  }
  function gambar() {
    const node = BAB_SATU.adegan[posisi.id], baris = sekarang();
    const akhir = posisi.baris === node.baris.length - 1;
    const pilihan = akhir ? node.pilihan : null;
    const fokusPindah = document.activeElement === get("next") && Boolean(pilihan);
    const [nama,label] = tokoh[baris.siapa];
    panggung(node,baris); tampilkanSprite(get("avatar"),baris.siapa,baris.muka);
    get("speaker").textContent = nama; get("voiceKind").textContent = label;
    get("part").textContent = judulBagian[node.bagian];
    const kata = get("words");
    kata.textContent = baris.teks; kata.classList.remove("appear"); void kata.offsetWidth; kata.classList.add("appear");
    const p = get("progress");
    p.setAttribute("aria-label", "Bagian " + node.bagian + " dari 5");
    Array.from(p.children).forEach((el,i) => el.classList.toggle("done", i < node.bagian));
    const kotak = get("choices");
    kotak.replaceChildren(); kotak.hidden = !pilihan; get("next").hidden = Boolean(pilihan);
    for (const item of pilihan || []) {
      const b = document.createElement("button"); b.type = "button"; b.textContent = item.label;
      b.addEventListener("click", () => balas(item)); kotak.append(b);
    }
    get("nextLabel").textContent = node.akhir && akhir ? "Buka surat terakhir" : "Lanjut";
    if (fokusPindah) fokus();
    simpan(posisi);
    if (adeganTerakhir !== posisi.id) {
      adeganTerakhir = posisi.id; SuaraNovel.musikkan(lagu(node));
      if (node.efek) SuaraNovel.efek(node.efek);
    }
    SuaraNovel.ucap(baris);
  }
  function selesai() {
    const kalimat = {
      kangen: "Nad, kalau kangen lagi, telepon Kakak. Bahkan kalau kamu cuma mau denger bunyi air dari sisi teluk yang ini.",
      capek: "Nad, besok biar Kakak yang nanyain warna kaus kedua itu. Kalau masih di tas juga gapapa. Aku tetep mau denger suara kamu.",
      tawa: "Nad, Kakak masih punya banyak cerita yang bisa bikin kamu ketawa. Besok minta satu lagi ya, sayang."
    };
    get("endText").textContent = kalimat[posisi.pilihan.hati] || kalimat.kangen;
    SuaraNovel.ucap({klip:null}); SuaraNovel.musikkan(laguAkhir); SuaraNovel.efek("buka");
    simpan(null); posisi = null; layarKe("end"); get("again").focus({preventScroll:true});
  }
  function maju() {
    if (kini !== "play" || get("next").hidden || get("audioPanel").open) return;
    const node = BAB_SATU.adegan[posisi.id];
    SuaraNovel.efek("ketuk");
    if (posisi.baris < node.baris.length - 1) { posisi.baris++; gambar(); }
    else if (node.lanjut) pindah(node.lanjut);
    else if (node.akhir) selesai();
  }
  function audioKembali() {
    if (kini === "cover" || document.hidden) return;
    SuaraNovel.hidup();
    SuaraNovel.musikkan(kini === "end" ? laguAkhir : lagu(BAB_SATU.adegan[posisi.id]));
    if (kini === "play") SuaraNovel.ucap(sekarang());
  }
  const panel = get("audioPanel");
  for (const [k,id] of Object.entries(setelan)) {
    const el = get(id); el.checked = SuaraNovel.opsi[k];
    el.addEventListener("change", () => {
      SuaraNovel.atur(k, el.checked);
      if (k === "dialog" && el.checked && kini === "play") SuaraNovel.ucap(sekarang());
      if (k === "efek" && el.checked) SuaraNovel.efek("pilih");
    });
  }
  for (const id of ["sound","coverAudio","endAudio"]) get(id).addEventListener("click", () => {
    pemicuPanel = get(id); panel.showModal();
  });
  get("closeAudio").addEventListener("click", () => panel.close());
  panel.addEventListener("close", () => pemicuPanel?.focus());
  get("start").addEventListener("click", () => mulai(true));
  for (const id of ["restart","again"]) get(id).addEventListener("click", () => mulai(false));
  for (const id of ["home","endHome"]) get(id).addEventListener("click", () => { keJudul(); get("start").focus(); });
  get("stage").addEventListener("click", maju); get("next").addEventListener("click", maju);
  document.addEventListener("visibilitychange", () => { if (document.hidden) SuaraNovel.tidur(); else audioKembali(); });
  window.addEventListener("pagehide", () => SuaraNovel.tidur());
  window.addEventListener("pageshow", e => { if(e.persisted) audioKembali(); });
  document.addEventListener("keydown", e => {
    if (kini !== "play" || panel.open || e.repeat) return;
    if (e.key === "ArrowRight") { e.preventDefault(); maju(); }
    if (e.key === "Escape") { keJudul(); get("start").focus(); }
  });
  keJudul();
})();
