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
  Save: "저장",
  Load: "불러오기",
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
    const titleScreen = document.querySelector("main-screen");
    // if (titleScreen && !titleScreen.querySelector('.title-composition')) {
    //   titleScreen.insertAdjacentHTML('afterbegin', `
    //     <div class="title-composition">
    //       <div class="title-copy">
    //         <p class="title-eyebrow">RUFUS &amp; REINA · 15TH ANNIVERSARY</p>
    //         <h1>루퍼스 <span>&amp;</span> 레이나</h1>
    //         <p class="title-subtitle">열다섯 번째 크리스마스</p>
    //         <div class="title-divider" aria-hidden="true"><span>✦</span></div>
    //         <p class="title-description">지금까지의 15년처럼,<br>앞으로도 평생을 너와 함께.</p>
    //       </div>
    //       <div class="anniversary-art" aria-hidden="true">
    //         <span class="anniversary-number">15</span>
    //         <div class="anniversary-orbit"></div>
    //         <div class="title-ring ring-one"></div><div class="title-ring ring-two"></div>
    //         <span class="art-star star-one">✦</span><span class="art-star star-two">✧</span>
    //         <span class="anniversary-caption">FIFTEEN YEARS, AND FOREVER</span>
    //       </div>
    //     </div>
    //     <p class="title-footer">A CHRISTMAS LOVE STORY <span>12.24</span></p>
    //   `);
    // }
    //<button type="button" class="theme-toggle" aria-pressed="false">색상·테두리 켜기</button><button type="button" data-test-game="tree">
    // Temporary visual and minigame testing controls; never advance the story.
    document.documentElement.classList.add("theme-off");
    const testTools = document.createElement("details");
    testTools.className = "game-test-tools";
    testTools.innerHTML =
      '<summary>테스트</summary><div class="test-tool-buttons">트리 게임 테스트</button><button type="button" data-test-game="retry">야바위 게임 테스트</button><button type="button" class="test-game-exit" hidden>테스트 종료</button><p class="test-tool-status" role="status"></p></div>';
    document.body.appendChild(testTools);
    const themeToggle = testTools.querySelector(".theme-toggle");
    themeToggle.addEventListener("click", () => {
      const off = document.documentElement.classList.toggle("theme-off");
      themeToggle.textContent = off ? "색상·테두리 켜기" : "색상·테두리 끄기";
      themeToggle.setAttribute("aria-pressed", String(!off));
    });
    const testButtons = [...testTools.querySelectorAll("[data-test-game]")];
    const testExit = testTools.querySelector(".test-game-exit");
    const testStatus = testTools.querySelector(".test-tool-status");
    let previewGame = null;
    testExit.addEventListener("click", () => previewGame?.cancel());
    for (const testButton of testButtons) {
      testButton.addEventListener("click", async () => {
        const Game = monogatari.action("ProposalGame");
        if (Game.blocking) {
          testStatus.textContent = "현재 미니게임을 마친 뒤 테스트해 주세요.";
          return;
        }
        const snapshot = structuredClone(monogatari.storage());
        testButtons.forEach((button) => {
          button.disabled = true;
        });
        testExit.hidden = false;
        testStatus.textContent = "";
        // Provide a valid original ring only for this isolated shell-game preview.
        if (testButton.dataset.testGame === "retry")
          monogatari.storage().ringChoice = "candy";
        previewGame = new Game(["proposal-game", testButton.dataset.testGame]);
        try {
          await previewGame.apply();
          testStatus.textContent = previewGame.cancelled
            ? "테스트 종료"
            : "테스트 완료";
        } finally {
          const storage = monogatari.storage();
          Object.keys(storage).forEach((key) => {
            delete storage[key];
          });
          Object.assign(storage, snapshot);
          previewGame = null;
          testExit.hidden = true;
          testButtons.forEach((button) => {
            button.disabled = false;
          });
        }
      });
    }

    // 메인 메뉴에서 도움말 제거
    mainMenu.removeButton("Help");

    // Load always returns to the title, regardless of the screen it was opened from.
    const returnToMain = () => {
      monogatari.autoPlay(false);
      monogatari.action("ProposalGame")?.reset();
      stopConfetti();
      monogatari.showMainScreen();
    };
    monogatari.registerListener("load-to-main", { callback: returnToMain });

    // Mouse side buttons and browser Back must stay within the game.
    // A same-document history entry lets Back reach popstate before leaving.
    const armBrowserBack = () => {
      window.history.pushState(
        { ...window.history.state, rufusReinaBackGuard: true },
        "",
        window.location.href,
      );
    };
    armBrowserBack();
    window.addEventListener("popstate", () => {
      returnToMain();
      armBrowserBack();
    });
    monogatari.component("load-screen").template(`
      <button class="top left" data-action="load-to-main" aria-label="메인 메뉴로 돌아가기">
        <span class="fas fa-arrow-left"></span>
      </button>
      <h2 data-string="Load">불러오기</h2>
      <div data-ui="saveSlots">
        <h3 data-string="LoadSlots">저장된 게임</h3>
        <div data-ui="slots">
          <slot-container label="${monogatari.setting("SaveLabel")}" type="load"></slot-container>
        </div>
      </div>
      ${
        monogatari.setting("AutoSave") > 0
          ? `
        <div data-ui="autoSaveSlots">
          <h3 data-string="LoadAutoSaveSlots">자동 저장된 게임</h3>
          <div data-ui="slots" data-content="slots">
            <slot-container label="${monogatari.setting("AutoSaveLabel")}" type="load"></slot-container>
          </div>
        </div>`
          : ""
      }
    `);

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

function createGameSnow() {
  if (document.getElementById("game-snow")) {
    return;
  }

  const snowContainer = document.createElement("div");
  snowContainer.id = "game-snow";

  const snowCount = 44;

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
