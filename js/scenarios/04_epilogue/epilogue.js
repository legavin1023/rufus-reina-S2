/* global monogatari */

// 컨페티 애니메이션을 제어하기 위한 전역 변수
window.confettiAnimationId = null;

// 1. 컨페티 시작
function startConfetti() {
  // 기존 컨페티가 있다면 먼저 제거
  stopConfetti();

  const canvas = document.createElement("canvas");
  canvas.id = "my-confetti-canvas";
  canvas.style.position = "absolute";
  canvas.style.top = "0";
  canvas.style.left = "0";
  canvas.style.width = "100%";
  canvas.style.height = "100%";
  canvas.style.pointerEvents = "none";
  canvas.style.zIndex = "99";

  document.getElementById("monogatari").appendChild(canvas);

  const context = canvas.getContext("2d");

  let w = (canvas.width = window.innerWidth);
  let h = (canvas.height = window.innerHeight);

  const resizeHandler = () => {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
  };

  window.addEventListener("resize", resizeHandler);

  const NUM_CONFETTI = 350;

  const COLORS = [
    [85, 71, 106],
    [174, 61, 99],
    [219, 56, 83],
    [244, 92, 68],
    [248, 182, 70],
  ];

  const PI_2 = 2 * Math.PI;
  let xpos = 0.5;

  const mouseMoveHandler = (e) => {
    xpos = e.pageX / w;
  };

  document.addEventListener("mousemove", mouseMoveHandler);

  const range = (a, b) => (b - a) * Math.random() + a;

  const drawCircle = (x, y, r, style) => {
    context.beginPath();
    context.arc(x, y, r, 0, PI_2, false);
    context.fillStyle = style;
    context.fill();
  };

  class Confetti {
    constructor() {
      this.style = COLORS[~~range(0, 5)];
      this.rgb = `rgba(${this.style[0]},${this.style[1]},${this.style[2]}`;
      this.r = ~~range(2, 6);
      this.r2 = 2 * this.r;
      this.replace();
    }

    replace() {
      this.opacity = 0;
      this.dop = 0.03 * range(1, 4);
      this.x = range(-this.r2, w - this.r2);
      this.y = range(-20, h - this.r2);
      this.xmax = w - this.r;
      this.ymax = h - this.r;
      this.vx = range(0, 2) + 8 * xpos - 5;
      this.vy = 0.7 * this.r + range(-1, 1);
    }

    draw() {
      this.x += this.vx;
      this.y += this.vy;
      this.opacity += this.dop;

      if (this.opacity > 1) {
        this.opacity = 1;
        this.dop *= -1;
      }

      if (this.opacity < 0 || this.y > this.ymax) {
        this.replace();
      }

      if (!(0 < this.x && this.x < this.xmax)) {
        this.x = (this.x + this.xmax) % this.xmax;
      }

      drawCircle(~~this.x, ~~this.y, this.r, `${this.rgb},${this.opacity})`);
    }
  }

  const confetti = Array.from({ length: NUM_CONFETTI }, () => new Confetti());

  function step() {
    // 캔버스가 없으면 애니메이션 종료
    const canvas = document.getElementById("my-confetti-canvas");

    if (!canvas) {
      window.confettiAnimationId = null;
      return;
    }

    context.clearRect(0, 0, w, h);
    confetti.forEach((c) => c.draw());

    window.confettiAnimationId = requestAnimationFrame(step);
  }

  window.confettiAnimationId = requestAnimationFrame(step);

  // 정리 함수에 필요한 이벤트 정보 저장
  canvas._confettiResizeHandler = resizeHandler;
  canvas._confettiMouseMoveHandler = mouseMoveHandler;
}

// 2. 컨페티 종료 및 완전 삭제
function stopConfetti() {
  console.log("[Confetti] STOP");

  if (window.confettiAnimationId !== null) {
    cancelAnimationFrame(window.confettiAnimationId);
    window.confettiAnimationId = null;
  }

  // Remove the current canvas and any canvas left by an older version.
  const canvases = document.querySelectorAll("#my-confetti-canvas, #world");

  canvases.forEach((canvas) => {
    if (canvas._confettiResizeHandler) {
      window.removeEventListener("resize", canvas._confettiResizeHandler);
    }
    if (canvas._confettiMouseMoveHandler) {
      document.removeEventListener("mousemove", canvas._confettiMouseMoveHandler);
    }
    // Clear/hide first so no frozen frame can remain visible during screen changes.
    canvas.getContext?.("2d")?.clearRect(0, 0, canvas.width, canvas.height);
    canvas.style.display = "none";
    canvas.remove();
  });
}
// 3. 에필로그
window.scenario_Epilogue = [
  "scene wedding",

  () => {
    startConfetti();
    return true;
  },

  "centered [ HAPPY END ]",

  () => {
    stopConfetti();
    return true;
  },

  "end",
];
