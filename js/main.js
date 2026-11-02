"use strict";
/* global Monogatari, monogatari */

const { $_ready, $_ } = Monogatari;

monogatari.debug.level(5);

function stopConfetti() {
  document.getElementById("monogatari")?.classList.remove("wedding-art-view");
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
    window.initGameSfx();
    window.initStoryReactions();
    // '시작'은 항상 새 게임. 저장 불러오기는 별도의 onLoad 경로를 사용한다.
    const originalOnStart = monogatari.onStart;
    monogatari.onStart = async function (...args) {
      this.stopAmbient();
      window.gameSfx?.stopAll();
      stopConfetti();
      await this.resetGame();
      return originalOnStart.apply(this, args);
    };
    // 엔진의 재생 허락 버튼은 게임 중에도 메인 BGM을 재시작하므로 직접 처리한다.
    document.addEventListener("click", (event) => {
      const prompt = event.target.closest?.('[data-ui="broadcast"][data-content="allow-playback"]');
      if (!prompt) return;
      event.preventDefault();
      event.stopImmediatePropagation();
      monogatari.audioContext?.resume().catch(console.warn);
      if (monogatari.global("playing")) monogatari.stopAmbient();
      else monogatari.playAmbient();
      document.querySelectorAll('[data-ui="broadcast"][data-content="allow-playback"]').forEach((node) => node.remove());
    }, true);
    // 허락 전에 보류된 play()가 뒤늦게 성공해도 중복 재생을 막는다.
    monogatari.ambientPlayer?.addEventListener("play", () => {
      if (monogatari.global("playing")) monogatari.stopAmbient();
    });
    // 저장 복원은 새 게임 시작과 달리 메인 배경음을 자동 정지하지 않는다.
    const stopTitleMusicOnLoad = () => monogatari.stopAmbient();
    monogatari.on("willLoadGame", stopTitleMusicOnLoad);
    monogatari.on("didLoadGame", stopTitleMusicOnLoad);
    const mainMenu = monogatari.component("main-menu");
    const titleScreen = document.querySelector("main-screen");
    if (titleScreen && !titleScreen.querySelector(".title-composition")) {
      titleScreen.insertAdjacentHTML(
        "afterbegin",
        `
        <div class="title-composition title-scene">
          <img class="title-background" src="./assets/ui/261025 루퍼이나 두근두근 프로포즈 대작전 합본.png" alt="" draggable="false" />
          <img class="title-logo" src="./assets/ui/261025 루퍼이나 두근두근 프로포즈 대작전 로고 외곽선.png" alt="루퍼이나 두근두근 프로포즈 대작전 — 15주년이니까 이제는 결혼이 하고 싶어" draggable="false" />
        </div>
      `,
      );
    }

    // Temporary visual and minigame testing controls; never advance the story.
    const testTools = document.createElement("details");
    testTools.className = "game-test-tools";
    testTools.innerHTML =
      '<summary>테스트</summary><div class="test-tool-buttons"><button type="button" data-test-game="globe">스노 글로브 테스트</button><button type="button" data-test-game="tree">트리 게임 테스트</button><button type="button" data-test-game="retry">야바위 게임 테스트</button><button type="button" class="test-game-exit" hidden>테스트 종료</button><p class="test-tool-status" role="status"></p></div>';
    document.body.appendChild(testTools);
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

    // 저장 이름과 별개로 실제 저장된 장면을 카드의 제목으로 표시한다.
    const saveSlot = monogatari.component("save-slot");
    const originalSlotRender = saveSlot.prototype.render;
    const savedParts = {
      Start: "프롤로그", Ch1_Main: "제1장 · 상점 선택",
      Ch1_WeaponShop_Fail: "제1장 · 무기점", Ch1_WeaponShop_Choice_Done: "제1장 · 무기점",
      Ch1_JewelryShop_Branch: "제1장 · 보석상", Ch1_JewelryShop_Choice_Done: "제1장 · 보석상",
      Ch2_Main: "제2장 · 크리스마스 마켓", Ch2_SouvenirShop: "제2장 · 기념품점",
      Ch2_BeverageStall: "제2장 · 음료 가판대", Ch2_IceRink: "제2장 · 아이스링크장",
      Ch3_Main: "제3장 · 크리스마스 트리", Ch3_Proposal: "제3장 · 프로포즈",
      Ch3_TreeGame_Fail: "제3장 · 트리 게임 이후", Ch3_Retry: "제3장 · 다시 한 번, 기회를!",
      Ch3_Retry_Empty: "제3장 · 빈 상자", Ch3_Retry_Candy: "제3장 · 사탕반지",
      Ch3_Retry_Gold: "제3장 · 순금반지", Ch3_Retry_Diamond: "제3장 · 다이아백금반지",
      Ch3_CandyRing_Fail: "제3장 · 사탕반지 프로포즈", Ch3_GoldRing_Fail: "제3장 · 순금반지 프로포즈",
      Ch3_DiamondRing_Success: "제3장 · 다이아백금반지 프로포즈", Epilogue: "에필로그",
    };
    saveSlot.prototype.render = function (...args) {
      const html = originalSlotRender.apply(this, args);
      const label = this.data?.game?.state?.label ?? this.data?.Engine?.Label;
      const part = savedParts[label] ?? "이야기 진행 중";
      return html.replace(/(<small class='badge'>)/, `<div class="save-part">${part}</div>$1`);
    };

    // Remember where the load screen was opened without resetting the story.
    let loadOpenedFromGame = false;
    const isScreenVisible = (name) => {
      const screen = document.querySelector(`#monogatari [data-screen="${name}"]`);
      return !!screen?.getClientRects().length;
    };
    const originalShowScreen = monogatari.showScreen;
    monogatari.showScreen = function (screen, ...args) {
      if (screen === "load" && !isScreenVisible("load")) {
        loadOpenedFromGame = isScreenVisible("game") && !!this.global("playing");
      }
      return originalShowScreen.call(this, screen, ...args);
    };
    const returnToMain = () => {
      monogatari.autoPlay(false);
      monogatari.action("ProposalGame")?.reset();
      window.gameSfx?.stopAll();
      monogatari.removeMediaPlayer("music");
      monogatari.state({ music: [] });
      stopConfetti();
      monogatari.showMainScreen();
    };
    const returnFromLoad = () => {
      if (loadOpenedFromGame) {
        monogatari.showScreen("game");
      } else {
        returnToMain();
      }
    };
    monogatari.registerListener("load-back", { callback: returnFromLoad });

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
      if (isScreenVisible("load")) returnFromLoad();
      else returnToMain();
      armBrowserBack();
    });
    monogatari.component("load-screen").template(`
      <button class="top left" data-action="load-back" aria-label="이전 화면으로 돌아가기">
        <span class="fas fa-arrow-left"></span>
      </button>
      <h2 data-string="Load">불러오기</h2>
      <div data-ui="saveSlots">
        <h3 data-string="LoadSlots">저장된 게임</h3>
        <div data-ui="slots">
          <slot-container label="${monogatari.setting("SaveLabel")}" type="load"></slot-container>
        </div>
      </div>
        <div data-ui="autoSaveSlots">
          <h3 data-string="LoadAutoSaveSlots">자동 저장된 게임</h3>
          <div data-ui="slots" data-content="slots">
            <slot-container label="${monogatari.setting("AutoSaveLabel")}" type="load"></slot-container>
          </div>
        </div>
    `);

    // 크레딧 추가
    mainMenu.addButton({
      string: "Credits",
      icon: "",
      data: { action: "open-screen", open: "credits" },
    });

    // Keep the engine's real buttons, actions, labels and click sound listener.
    // Background, logo and menu share one 1920 × 1080 composition.
    titleScreen?.querySelector(".title-scene")?.appendChild(
      titleScreen.querySelector("main-menu"),
    );

    const settingsScreen = monogatari.component("settings-screen");

    settingsScreen.template(
      `
      <button class="top left" data-action="back" aria-label="이전 화면으로 돌아가기">
        <span class="fas fa-arrow-left"></span>
      </button>

      <h2 data-string="Settings">설정</h2>
      <p class="settings-intro">편안한 속도와 소리로 이야기를 즐겨보세요.</p>

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
              aria-label="배경음 음량"
            />

            <span data-string="Sound">효과음</span>

            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              data-action="set-volume"
              data-target="sound"
              aria-label="효과음 음량"
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
              aria-label="텍스트 속도"
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
              aria-label="자동 진행 속도"
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

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", createGameSnow, { once: true });
} else {
  createGameSnow();
}
