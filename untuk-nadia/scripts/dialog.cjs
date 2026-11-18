"use strict";

const story = require("../www/cerita.js");
const voices = { nadia: ["id+f2", 53, 157], zubair: ["id+m3", 47, 154],
  nadia36: ["id+f4", 48, 150], zubair36: ["id+m2", 42, 146],
  putra: ["id+m4", 73, 165], putri: ["id+f3", 78, 169] };
const lines = [];
for (const [id, scene] of Object.entries(story.adegan)) {
  scene.baris.forEach((line, i) => {
    if (line.siapa === "batin") return;
    const choices = typeof line.teks === "string" ? [{}] :
      Object.keys(line.teks.variasi).map(value => ({[line.teks.kunci]: value}));
    for (const choice of choices) {
      const { klip, teks } = story.baca(id, i, choice);
      const [voice, pitch, speed] = voices[line.siapa];
      lines.push({ klip, teks, voice, pitch, speed });
    }
  });
}
process.stdout.write(JSON.stringify(lines));
