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
    [/저 말입니까\?|이걸…… 말입니까|무슨 고민|생각이 많아|이 다음은 뭡니까|^……\?$/, "question"],
    [/예스야, 무조건 예스야|앞으로 평생 함께/, "glitter"],
  ];
  const emoji = { flustered: "💦", resolve: "✨", surprise: "❗", joy: "✨", heart: "💗", anger: "💢", "anger-strong": "💢", question: "❓", glitter: "💖" };
  let layer, timer, anchor;
  let visibleBounds = null;
  let revision = 0;
  const masks = new Map();
  // Read pixels in memory only. The source image and sprite styling never change.
  const silhouette = (image) => {
    const source = image.currentSrc || image.src;
    if (masks.has(source)) return masks.get(source);
    const result = (async () => {
      try {
        await image.decode();
        const scale = Math.min(1, 320 / Math.max(image.naturalWidth, image.naturalHeight));
        const mask = document.createElement("canvas");
        mask.width = Math.max(1, Math.round(image.naturalWidth * scale));
        mask.height = Math.max(1, Math.round(image.naturalHeight * scale));
        const context = mask.getContext("2d", { willReadFrequently: true });
        context.drawImage(image, 0, 0, mask.width, mask.height);
        const pixels = context.getImageData(0, 0, mask.width, mask.height);
        const data = pixels.data;
        const total = mask.width * mask.height;
        let transparent = false;
        for (let i = 3; i < data.length; i += 4) {
          if (data[i] < 16) { transparent = true; break; }
        }
        if (!transparent) {
          // Only remove a plain near-white background connected to image edges.
          const corners = [0, mask.width - 1, total - mask.width, total - 1];
          if (!corners.every(i => data[i * 4] > 240 && data[i * 4 + 1] > 240 && data[i * 4 + 2] > 240)) return null;
          const visited = new Uint8Array(total);
          const queue = new Int32Array(total);
          let head = 0, tail = 0;
          const visit = i => {
            if (visited[i]) return;
            visited[i] = 1;
            const p = i * 4;
            if (data[p] > 235 && data[p + 1] > 235 && data[p + 2] > 235) queue[tail++] = i;
          };
          for (let x = 0; x < mask.width; x++) { visit(x); visit(total - mask.width + x); }
          for (let y = 0; y < mask.height; y++) { visit(y * mask.width); visit(y * mask.width + mask.width - 1); }
          while (head < tail) {
            const i = queue[head++];
            data[i * 4 + 3] = 0;
            if (i % mask.width) visit(i - 1);
            if (i % mask.width < mask.width - 1) visit(i + 1);
            if (i >= mask.width) visit(i - mask.width);
            if (i < total - mask.width) visit(i + mask.width);
          }
          if (tail < total * .1 || tail > total * .995) return null;
        }
        let left = mask.width, right = 0, top = mask.height, bottom = 0;
        for (let y = 0; y < mask.height; y++) {
          for (let x = 0; x < mask.width; x++) {
            if (data[(y * mask.width + x) * 4 + 3] < 64) continue;
            left = Math.min(left, x); right = Math.max(right, x);
            top = Math.min(top, y); bottom = Math.max(bottom, y);
          }
        }
        if (left > right || top > bottom) return null;
        // Measure beside the head, excluding the wider arms and transparent padding.
        let headRight = left;
        const headY = top + (bottom - top) * .22;
        for (let y = Math.floor(top + (bottom - top) * .12); y <= Math.ceil(top + (bottom - top) * .32); y++) {
          for (let x = left; x <= right; x++) {
            if (data[(y * mask.width + x) * 4 + 3] >= 64) headRight = Math.max(headRight, x);
          }
        }
        mask.reactionBounds = { right: (headRight + 1) / mask.width, y: headY / mask.height };
        for (let i = 0; i < data.length; i += 4) {
          data[i] = data[i + 1] = data[i + 2] = 255;
        }
        context.putImageData(pixels, 0, 0);
        return mask;
      } catch (_) { return null; }
    })();
    masks.set(source, result);
    return result;
  };
  const addOutline = async (image, reaction, token) => {
    if (!(image instanceof HTMLImageElement)) return;
    const source = image.currentSrc || image.src;
    const mask = await silhouette(image);
    if (token !== revision || !image.isConnected || source !== (image.currentSrc || image.src)) return;
    visibleBounds = mask?.reactionBounds || null;
    layer.querySelector(".reaction-emoji")?.style.setProperty("visibility", "visible");
    place();
    if (!mask || reaction === "question") return;
    const outline = document.createElement("canvas");
    outline.className = "reaction-outline";
    outline.width = mask.width + 16;
    outline.height = mask.height + 16;
    const ctx = outline.getContext("2d");
    const warm = reaction === "heart" || reaction === "glitter";
    const angry = reaction.startsWith("anger");
    const color = document.documentElement.classList.contains("theme-off") ? "#888" : angry ? "#cb7373" : warm ? "#edafc8" : "#e6c487";
    ctx.shadowColor = color;
    ctx.shadowBlur = 5;
    for (const [x, y] of [[-2, 0], [2, 0], [0, -2], [0, 2]]) ctx.drawImage(mask, 8 + x, 8 + y);
    ctx.shadowBlur = 0;
    ctx.globalCompositeOperation = "source-in";
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, outline.width, outline.height);
    // Erase the complete interior: only the external edge remains visible.
    ctx.globalCompositeOperation = "destination-out";
    ctx.drawImage(mask, 8, 8);
    layer.prepend(outline);
    place();
  };
  const clear = () => {
    revision++;
    clearTimeout(timer);
    layer?.replaceChildren();
    anchor = null;
    visibleBounds = null;
  };
  const place = () => {
    if (!anchor?.isConnected || !layer) return;
    const rect = anchor.getBoundingClientRect();
    const outline = layer.querySelector(".reaction-outline");
    if (outline) {
      const padX = rect.width * 8 / (outline.width - 16);
      const padY = rect.height * 8 / (outline.height - 16);
      Object.assign(outline.style, { left: `${rect.left - padX}px`, top: `${rect.top - padY}px`, width: `${rect.width + padX * 2}px`, height: `${rect.height + padY * 2}px` });
    }
    const box = document.querySelector("text-box")?.getBoundingClientRect();
    const icon = layer.querySelector(".reaction-emoji");
    const halfIcon = (icon?.offsetWidth || 72) / 2;
    const margin = halfIcon * 1.1 + 8;
    const ceiling = box && box.height > 0 ? box.top - margin : innerHeight - margin;
    const x = rect.left + rect.width * (visibleBounds?.right ?? 1) + halfIcon + 10;
    layer.style.setProperty("--reaction-x", `${Math.max(margin, Math.min(innerWidth - margin, x))}px`);
    layer.style.setProperty("--reaction-y", `${Math.max(margin, Math.min(ceiling, rect.top + rect.height * (visibleBounds?.y ?? .22)))}px`);
  };
  window.initStoryReactions = () => {
    if (layer) return;
    layer = document.createElement("div");
    layer.className = "story-reactions";
    layer.setAttribute("aria-hidden", "true");
    // Keep the overlay outside screen containers that can clip or transform it.
    document.querySelector("#monogatari")?.appendChild(layer);
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
      const particle = document.createElement("span");
      particle.className = "reaction-emoji";
      particle.style.visibility = "hidden";
      particle.textContent = emoji[cue[1]];
      layer.appendChild(particle);
      addOutline(anchor, cue[1], revision);
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
