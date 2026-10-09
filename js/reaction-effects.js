/* global monogatari */
"use strict";

// Presentation only: scenario arrays, sprites, saves and story timing stay intact.
(() => {
  const cues = [
    [/허억, 허억|치, 침착하자|드, 들켰나|아아앗|이번엔 잘해야|망치면 어떡하지|미, 미안/, "flustered"],
    [/반드시 프로포즈|준비는 완벽|최고의 하루|완벽한 데이트|다시 골라볼게|아직은 괜찮을 거야|좋아, 이걸로 다시/, "resolve"],
    [/어\? 진이다|어어\?!|어\?! 저, 정말|……응\?!|으응\?!|헙|이렇게 큰 크리스마스 트리/, "surprise"],
    [/루퍼스~|헤헤\. 잠깐이면|귀여운 게 너무|메리 크리스마스|맛있어|당 충전|맞아!! 사실 준비한/, "joy"],
    [/가슴이 두근|이 두근거림|앞으로도 평생을|루퍼스와 함께 와도|한참이 아니라, 평생|곁에 두고두고/, "heart"],
    [/20골드\?|장난하십니까/, "anger"],
    [/재테크에 손|이상한 소리로 당신|가만히 둘 수/, "anger-strong"],
    [/후우|휴우, 다행|침착하자\. 잘할/, "relief"],
    [/예스야, 무조건 예스야|앞으로 평생 함께/, "glitter"],
  ];
  const counts = { flustered: 3, resolve: 1, surprise: 4, joy: 5, heart: 1, anger: 3, "anger-strong": 5, relief: 1, glitter: 9 };
  let layer, timer, anchor;
  const clear = () => {
    clearTimeout(timer);
    layer?.replaceChildren();
    anchor = null;
  };
  const place = () => {
    if (!anchor?.isConnected || !layer) return;
    const rect = anchor.getBoundingClientRect();
    const box = document.querySelector("text-box")?.getBoundingClientRect();
    const ceiling = box && box.height > 0 ? box.top - 58 : innerHeight - 80;
    const center = rect.left + rect.width / 2;
    // Place beside the sprite, never over its face or the dialogue.
    const x = center > innerWidth / 2 ? rect.left - 24 : rect.right + 24;
    layer.style.setProperty("--reaction-x", `${Math.max(48, Math.min(innerWidth - 48, x))}px`);
    layer.style.setProperty("--reaction-y", `${Math.max(65, Math.min(ceiling, rect.top + rect.height * 0.18))}px`);
  };
  window.initStoryReactions = () => {
    if (layer) return;
    layer = document.createElement("div");
    layer.className = "story-reactions";
    layer.setAttribute("aria-hidden", "true");
    document.querySelector("game-screen")?.appendChild(layer);
    monogatari.on("didRunAction", (event) => {
      clear();
      const statement = event.detail?.action?._statement;
      if (typeof statement !== "string" || document.querySelector(".proposal-game")) return;
      const dialogue = statement.match(/^(r|ru|j)\s+(.+)$/);
      if (!dialogue) return;
      const text = dialogue[2].replace(/\{[^}]*\}/g, "");
      const cue = cues.find(([pattern]) => pattern.test(text));
      if (!cue) return;
      anchor = document.querySelector(`#monogatari [data-character="${dialogue[1]}"]:not([data-visibility="invisible"])`);
      if (!anchor) return;
      layer.dataset.reaction = cue[1];
      Array.from({ length: counts[cue[1]] }).forEach((_, index) => {
        const particle = document.createElement("span");
        particle.style.setProperty("--i", index);
        particle.style.setProperty("--spread", `${(index - (counts[cue[1]] - 1) / 2) * 12}px`);
        layer.appendChild(particle);
      });
      place();
      timer = setTimeout(clear, 2400);
    });
    monogatari.on("willRevertAction", clear);
    monogatari.on("didUpdateState", (event) => {
      if (event.detail?.oldState?.label !== event.detail?.newState?.label) clear();
    });
    window.addEventListener("resize", place);
    document.addEventListener("visibilitychange", clear);
  };
})();
