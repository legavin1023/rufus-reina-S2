"use strict";
/* global Monogatari, monogatari */

const { $_ready, $_ } = Monogatari;

monogatari.debug.level(5);

function stopConfetti() {
  if (
    window.confettiAnimationId !== null &&
    window.confettiAnimationId !== undefined
  ) {
    cancelAnimationFrame(window.confettiAnimationId);
    window.confettiAnimationId = null;
  }

  document.querySelectorAll("#my-confetti-canvas, #world").forEach((canvas) => {
    if (canvas._confettiResizeHandler) {
      window.removeEventListener("resize", canvas._confettiResizeHandler);
    }

    if (canvas._confettiMouseMoveHandler) {
      document.removeEventListener(
        "mousemove",
        canvas._confettiMouseMoveHandler,
      );
    }

    canvas.getContext?.("2d")?.clearRect(0, 0, canvas.width, canvas.height);
    canvas.style.display = "none";
    canvas.remove();
  });
}

monogatari.translation("한국어", {
  Settings: "설정",
  Audio: "음량",
  Music: "음악",
  Sound: "효과음",
  TextSpeed: "텍스트 속도",
  AutoPlaySpeed: "자동 진행 속도",
  Back: "뒤로",
  Credits: "크레딧",
});

$_ready(() => {
  monogatari.init("#monogatari").then(() => {
    const mainMenu = monogatari.component("main-menu");

    // 메인 메뉴에서 불러오기 제거
    mainMenu.removeButton("Load");

    // 메인 메뉴에서 도움말 제거
    mainMenu.removeButton("Help");

    // 게임 중 Quick Menu에서 저장/불러오기 제거
    const quickMenu = monogatari.component("quick-menu");

    quickMenu.removeButton("Save");
    quickMenu.removeButton("Load");

    // 크레딧 추가
    mainMenu.addButton({
      string: "Credits",
      icon: "",
      data: { action: "open-screen", open: "credits" },
    });

    const settingsScreen = monogatari.component("settings-screen");

    settingsScreen.template(
      `
      <button class="top left" data-action="back">
        <span class="fas fa-arrow-left"></span>
      </button>

      <h2 data-string="Settings">설정</h2>

      <div class="settings">

        <div class="settings-group">
          <div
            data-settings="audio"
            class="vertical vertical--center text--center"
          >
            <h3 data-string="Audio">음량</h3>

            <span data-string="Music">음악</span>

            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              data-action="set-volume"
              data-target="music"
            />

            <span data-string="Sound">효과음</span>

            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              data-action="set-volume"
              data-target="sound"
            />
          </div>
        </div>

        <div class="settings-group">

          <div data-settings="text-speed">
            <h3 data-string="TextSpeed">텍스트 속도</h3>

            <input
              type="range"
              min="1"
              max="50"
              step="1"
              data-action="set-text-speed"
            />
          </div>

          <div data-settings="auto-play-speed">
            <h3 data-string="AutoPlaySpeed">자동 진행 속도</h3>

            <input
              type="range"
              min="0"
              max="60"
              step="1"
              data-action="set-auto-play-speed"
            />
          </div>

        </div>
      </div>
      `,
    );

    monogatari.on("end", () => {
      console.log("[Confetti] 게임 종료 → 컨페티 제거");
      stopConfetti();
    });
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const cursor = "url('./assets/cursor/snowflake.cur') 4 2, auto";

  document.documentElement.style.setProperty("cursor", cursor, "important");

  document.body.style.setProperty("cursor", cursor, "important");

  const applyCursor = () => {
    document.querySelectorAll("*").forEach((element) => {
      element.style.setProperty("cursor", cursor, "important");
    });
  };

  applyCursor();

  const observer = new MutationObserver(() => {
    applyCursor();
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true,
  });
});
function createGameSnow() {
  if (document.getElementById("game-snow")) {
    return;
  }

  const snowContainer = document.createElement("div");
  snowContainer.id = "game-snow";

  const snowCount = 120;

  for (let i = 0; i < snowCount; i++) {
    const snowflake = document.createElement("div");

    snowflake.className = "game-snowflake";

    snowflake.style.left = `${Math.random() * 100}vw`;

    const size = Math.random() * 6 + 3;

    snowflake.style.width = `${size}px`;
    snowflake.style.height = `${size}px`;

    snowflake.style.opacity = Math.random() * 0.6 + 0.3;

    const duration = Math.random() * 15 + 12;

    snowflake.style.animationDuration = `${duration}s`;

    snowflake.style.animationDelay = `${Math.random() * -30}s`;

    snowContainer.appendChild(snowflake);
  }

  document.body.appendChild(snowContainer);
}

document.addEventListener("DOMContentLoaded", () => {
  createGameSnow();
});
