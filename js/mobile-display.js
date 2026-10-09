"use strict";

// Fullscreen requires a tap; orientation lock is requested after entering it.
document.addEventListener("DOMContentLoaded", () => {
  const mobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent) ||
    (navigator.maxTouchPoints > 1 && matchMedia("(pointer: coarse)").matches);
  if (!mobile) return;

  const root = document.documentElement;
  const requestFullscreen = root.requestFullscreen || root.webkitRequestFullscreen;
  const standalone = () => navigator.standalone === true || matchMedia("(display-mode: standalone), (display-mode: fullscreen)").matches;
  const canFullscreen = () => typeof requestFullscreen === "function" &&
    document.fullscreenEnabled !== false && document.webkitFullscreenEnabled !== false;

  const panel = document.createElement("div");
  panel.className = "mobile-display-prompt";
  panel.innerHTML = '<div><p class="mobile-display-message" role="status">가로 전체화면으로 게임을 시작하세요.</p><button type="button">가로 전체화면 시작</button></div>';
  document.body.appendChild(panel);
  const button = panel.querySelector("button");
  const message = panel.querySelector("p");
  const fullscreen = () => document.fullscreenElement || document.webkitFullscreenElement;
  let started = false;
  let busy = false;
  let fullscreenUnavailable = !canFullscreen();

  // Some embedded browsers expose the API but never settle its promise.
  const bounded = operation => new Promise((resolve, reject) => {
    const timer = setTimeout(() => reject(new Error("Display request timed out")), 1800);
    Promise.resolve(operation).then(resolve, reject).finally(() => clearTimeout(timer));
  });

  function update() {
    panel.hidden = started;
    const available = canFullscreen() && !fullscreenUnavailable && !standalone();
    message.textContent = available ? "버튼을 눌러 게임을 시작하세요. 전체화면으로 전환합니다." : "버튼을 눌러 게임을 시작하세요.";
    button.textContent = available ? "전체화면으로 시작" : "게임 시작";
    let restore = document.querySelector(".mobile-fullscreen-button");
    if (!restore) {
      restore = document.createElement("button");
      restore.type = "button";
      restore.className = "mobile-fullscreen-button";
      restore.textContent = "전체화면";
      restore.addEventListener("click", enter);
      document.body.appendChild(restore);
    }
    restore.hidden = !started || Boolean(fullscreen()) || !available || busy;
    restore.disabled = busy;
  }

  async function enter() {
    if (busy) return;
    busy = true;
    button.disabled = true;
    started = true;
    update();
    try {
      if (!fullscreen() && !standalone() && canFullscreen() && !fullscreenUnavailable) {
        try { await bounded(requestFullscreen.call(root)); }
        catch (_) { fullscreenUnavailable = true; }
      }
      if (fullscreen() && typeof window.screen?.orientation?.lock === "function") {
        try { await bounded(window.screen.orientation.lock("landscape")); }
        catch (_) { /* Playing remains available without an orientation lock. */ }
      }
    } finally {
      busy = false;
      button.disabled = false;
      update();
    }
  }

  button.addEventListener("click", enter);
  window.addEventListener("resize", update);
  document.addEventListener("fullscreenchange", update);
  document.addEventListener("webkitfullscreenchange", update);
  window.screen?.orientation?.addEventListener?.("change", update);
  update();
});
