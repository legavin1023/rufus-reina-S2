"use strict";

// Fullscreen requires a tap; orientation lock is requested after entering it.
document.addEventListener("DOMContentLoaded", () => {
  const mobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent) ||
    (navigator.maxTouchPoints > 1 && matchMedia("(pointer: coarse)").matches);
  if (!mobile) return;

  const panel = document.createElement("div");
  panel.className = "mobile-display-prompt";
  panel.innerHTML = '<div><p class="mobile-display-message" role="status">가로 전체화면으로 게임을 시작하세요.</p><button type="button">가로 전체화면 시작</button></div>';
  document.body.appendChild(panel);
  const button = panel.querySelector("button");
  const fullscreen = () => document.fullscreenElement || document.webkitFullscreenElement;
  let started = false;
  let busy = false;
  let fullscreenUnavailable = false;

  function update() {
    panel.hidden = started;
    button.textContent = started ? "전체화면 다시 시도" : "가로 전체화면 시작";
    let restore = document.querySelector(".mobile-fullscreen-button");
    if (!restore) {
      restore = document.createElement("button");
      restore.type = "button";
      restore.className = "mobile-fullscreen-button";
      restore.textContent = "전체화면";
      restore.addEventListener("click", enter);
      document.body.appendChild(restore);
    }
    restore.hidden = !started || Boolean(fullscreen()) || fullscreenUnavailable;
  }

  async function enter() {
    if (busy) return;
    busy = true;
    button.disabled = true;
    started = true;
    update();
    try {
      const root = document.documentElement;
      const request = root.requestFullscreen || root.webkitRequestFullscreen;
      if (!fullscreen() && request) {
        try { await request.call(root); } catch (_) { /* Continue playing without fullscreen. */ }
      } else if (!request) {
        fullscreenUnavailable = true;
      }
      try { await screen.orientation?.lock?.("landscape"); } catch (_) { /* Manual rotation fallback. */ }
      started = true;
      update();
    } finally {
      busy = false;
      button.disabled = false;
    }
  }

  button.addEventListener("click", enter);
  window.addEventListener("resize", update);
  document.addEventListener("fullscreenchange", update);
  document.addEventListener("webkitfullscreenchange", update);
  screen.orientation?.addEventListener("change", update);
  update();
});
