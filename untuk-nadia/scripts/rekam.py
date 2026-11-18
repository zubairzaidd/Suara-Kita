"""Buat dialog Indonesia dari naskah yang sama dengan teks di layar."""
import argparse
import json
import re
import subprocess
import tempfile
from pathlib import Path


def ucap(teks):
    teks = re.sub(r"\b2036\b", "dua ribu tiga puluh enam", teks)
    teks = re.sub(r"\bHP\b", "hape", teks)
    teks = re.sub(r"\bDeal\b", "Dil", teks)
    return teks.replace("…", ", ").replace("“", "").replace("”", "")


def rekam(root, daftar):
    target = root / "www" / "audio" / "dialog"
    target.mkdir(parents=True, exist_ok=True)
    with tempfile.TemporaryDirectory() as tmp:
        wav = Path(tmp) / "baris.wav"
        for baris in daftar:
            tujuan = target / (baris["klip"] + ".ogg")
            subprocess.run(["espeak-ng", "-v", baris["voice"], "-p", str(baris["pitch"]),
                            "-s", str(baris["speed"]), "-w", str(wav), "--stdin"],
                           input=ucap(baris["teks"]), text=True, check=True)
            subprocess.run(["ffmpeg", "-nostdin", "-hide_banner", "-loglevel", "error", "-y",
                            "-i", str(wav), "-af", "highpass=f=85,lowpass=f=6800",
                            "-c:a", "libvorbis", "-q:a", "1", str(tujuan)], check=True)
            if tujuan.stat().st_size < 500:
                raise ValueError(f"Audio kosong: {tujuan.name}")


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--cek", action="store_true", help="Periksa daftar tanpa merender suara.")
    args = parser.parse_args()
    root = Path(__file__).resolve().parents[1]
    daftar = json.loads(subprocess.check_output(["node", str(root / "scripts" / "dialog.cjs")]))
    ids = [b["klip"] for b in daftar]
    if not ids or len(ids) != len(set(ids)):
        raise ValueError("ID dialog tidak unik")
    if not args.cek:
        rekam(root, daftar)
        # Tanda ini ditambahkan hanya setelah seluruh klip berhasil dibuat.
        js = root / "www" / "suara.js"
        marker = "window.DIALOG_BUNDLED = true; // render-apk"
        isi = js.read_text(encoding="utf-8")
        if marker not in isi:
            js.write_text(isi.replace('"use strict";', '"use strict";\n' + marker, 1), encoding="utf-8")
    print(f"{len(ids)} dialog Bahasa Indonesia.")


if __name__ == "__main__":
    main()
