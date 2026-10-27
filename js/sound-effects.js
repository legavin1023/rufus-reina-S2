/* global monogatari */
"use strict";
(() => {
  const files = {
    shuffle: "야바위 섞는 소리 효과음.mp3",
    diamond: "야뱌위 다이아반지 찾았을때 뾰로롱.mp3",
    save: "저장 page-flip-8.wav",
    click: "클릭 Hint by dland Id-320181.wav",
    success: "트리 게임 성공소리 Magic Chime.mp3",
    failure: "트리 야바위 게임 실패 소리 253886__themusicalnomad__negative-beeps.wav",
    popA: "트리게임 방울 터트리는 소리 Cartoon Pop by AlaskaRobotics Id-221091.wav",
    popB: "트리게임 방울 터트리는 소리 Drip1 by Neotone Id-75343.wav",
    miss: "트리게임 터트리기 실패Cartoon Boing.mp3",
  };
  const buffers = new Map();
  const voices = new Set();
  const generations = new Map();
  let initialized = false;
  const stop = (name) => {
    generations.set(name, (generations.get(name) || 0) + 1);
    for (const voice of [...voices]) {
      if (voice.name === name) { voice.source.stop(); voice.dispose(); }
    }
  };
  const stopAll = () => Object.keys(files).forEach(stop);
  const load = (name, context) => {
    if (!buffers.has(name)) {
      const promise = fetch("./assets/sounds/효과음/normalized/" + encodeURIComponent(files[name]))
        .then(response => { if (!response.ok) throw Error("Sound unavailable: " + name); return response.arrayBuffer(); })
        .then(data => context.decodeAudioData(data));
      buffers.set(name, promise);
      promise.catch(() => buffers.delete(name));
    }
    return buffers.get(name);
  };
  const play = async (name, { loop = false } = {}) => {
    if (!files[name]) return;
    if (loop) stop(name);
    const token = generations.get(name) || 0;
    try {
      const context = monogatari.audioContext;
      if (!context) return;
      if (context.state === "suspended") await context.resume();
      const buffer = await load(name, context);
      if (token !== (generations.get(name) || 0)) return;
      // Bound rapid clicks while allowing a few natural overlapping tails.
      while (voices.size >= 6) {
        const oldest = voices.values().next().value;
        oldest.source.stop(); oldest.dispose();
      }
      const source = context.createBufferSource();
      const gain = context.createGain();
      gain.gain.value = Math.max(0, Math.min(1, Number(monogatari.preference("Volume")?.Sound ?? 1)));
      source.buffer = buffer;
      source.loop = loop;
      source.connect(gain);
      gain.connect(context.destination);
      const voice = { name, source, dispose() { voices.delete(voice); source.disconnect(); gain.disconnect(); } };
      source.onended = () => voice.dispose();
      voices.add(voice);
      source.start();
    } catch (error) { console.warn("Sound effect could not play", name, error); }
  };
  window.gameSfx = { play, stop, stopAll };
  window.initGameSfx = () => {
    if (initialized) return;
    initialized = true;
    if (monogatari.audioContext) {
      Object.keys(files).forEach(name => load(name, monogatari.audioContext).catch(() => {}));
    }
    // Save only after a successful write, including automatic notebook saves.
    const saveTo = monogatari.saveTo;
    monogatari.saveTo = async function (...args) {
      const result = await saveTo.apply(this, args);
      play("save");
      return result;
    };
    document.addEventListener("click", event => {
      const target = event.target.closest?.("button, [data-action], [data-choice], text-box");
      if (!target || target.disabled || target.closest(".merchant-obstacle, .shell-game-box, .snow-globe, .game-test-tools")) return;
      if (target.matches('[data-action="save"], [data-action="save-slot"]')) return;
      play("click");
    }, true);
    monogatari.on("end", stopAll);
    document.addEventListener("visibilitychange", () => { if (document.hidden) stopAll(); });
  };
})();
