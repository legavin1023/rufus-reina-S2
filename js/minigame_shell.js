/* global monogatari */
(() => {
  const objects = [
    ['☃️', '눈사람 장식'], ['🎁', '포장된 선물상자'], ['☕', '신발모양 머그컵(코코아)'],
    ['🔮', '스노 글로브'], ['🍋', '레모네이드'], ['🐈', '지나가는 고양이'],
    ['⛸️', '스케이트를 타는 어린이'], ['🪙', '탑처럼 쌓은 금화'], ['🦌', '루돌프 인형'], ['📦', '짐을 나르는 상인들'],
  ];
  function shuffle(items) {
    const result = [...items];
    for (let i = result.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [result[i], result[j]] = [result[j], result[i]];
    }
    return result;
  }
  class ProposalGame extends monogatari.action('Function') {
    static id = 'ProposalGame';
    static blocking = false;
    static active = null;
    static matchString([command]) { return command === 'proposal-game'; }
    static matchObject() { return false; }
    static async shouldProceed() { if (this.blocking) throw new Error('미니게임 진행 중'); }
    static async shouldRollback() { if (this.blocking) throw new Error('미니게임 진행 중'); }
    static async reset() { this.active?.cancel(); }
    constructor([, mode]) { super({ Function: {} }); this.mode = mode; }
    async apply() {
      ProposalGame.active?.cancel();
      ProposalGame.blocking = true;
      this.engine.autoPlay(false);
      const panel = document.createElement('section');
      panel.className = 'proposal-game';
      panel.setAttribute('role', 'dialog');
      panel.setAttribute('aria-modal', 'true');
      panel.setAttribute('aria-label', this.mode === 'tree' ? '레이나의 망상' : '반지 다시 고르기');
      panel.innerHTML = '<div class="proposal-game-card"><h2></h2><p class="game-instructions"></p><p class="game-status" role="status" aria-live="polite"></p><div class="game-items"></div><div class="game-controls"></div></div>';
      panel.addEventListener('click', e => e.stopPropagation());
      panel.addEventListener('keydown', e => {
        e.stopPropagation();
        if (e.key === 'Tab') {
          const buttons = [...panel.querySelectorAll('button:not(:disabled)')];
          const next = (buttons.indexOf(document.activeElement) + (e.shiftKey ? -1 : 1) + buttons.length) % buttons.length;
          if (buttons.length) { e.preventDefault(); buttons[next].focus(); }
        }
      });
      const previousFocus = document.activeElement;
      let animation = null;
      const cleanup = () => { if (animation !== null) cancelAnimationFrame(animation); animation = null; };
      if (this.mode === 'tree') panel.classList.add('merchant-game');
      document.getElementById('monogatari').appendChild(panel);
      const title = panel.querySelector('h2');
      const instructions = panel.querySelector('.game-instructions');
      const status = panel.querySelector('.game-status');
      const items = panel.querySelector('.game-items');
      const controls = panel.querySelector('.game-controls');
      const button = (parent, text, handler) => {
        const el = document.createElement('button'); el.type = 'button'; el.textContent = text;
        el.addEventListener('click', handler); parent.appendChild(el); return el;
      };
      await new Promise(resolve => {
        let finished = false;
        const finish = (key, value) => {
          if (finished) return;
          finished = true;
          if (key) this.engine.storage()[key] = value;
          cleanup(); panel.remove(); ProposalGame.blocking = false; ProposalGame.active = null;
          previousFocus?.focus(); resolve();
        };
        this.cancel = () => { this.cancelled = true; finish(); };
        ProposalGame.active = this;
        if (this.mode === 'retry') {
          title.textContent = '다시 한 번, 기회를!';
          instructions.textContent = '다이아백금반지의 위치를 기억하세요. 상자를 닫고 섞은 뒤 하나만 고를 수 있어요.';
          const excluded = this.engine.storage().ringChoice;
          const rings = shuffle(['empty', 'candy', 'gold', 'diamond'].filter(ring => ring !== excluded));
          const names = { empty: '빈 상자', candy: '사탕반지', gold: '순금반지', diamond: '다이아백금반지' };
          items.className = 'shell-game-field';
          let phase = 'ready';
          const boxes = rings.map((ring, slot) => {
            const box = { ring, slot, el: null };
            box.el = button(items, `💍 ${names[ring]}`, () => {
              if (phase !== 'pick') return;
              phase = 'result';
              boxes.forEach(other => {
                other.el.disabled = true;
                other.el.textContent = other === box ? `✨ ${names[other.ring]}` : '🎁';
              });
              status.textContent = `고른 상자: ${names[ring]}`;
              button(controls, '상자 받아가기', () => finish('retryRing', ring)).focus();
            });
            box.el.className = 'shell-game-box';
            box.el.style.left = `${slot * 34}%`;
            box.el.disabled = true;
            return box;
          });
          status.textContent = '어느 상자에 다이아백금반지가 있는지 확인하세요.';
          button(controls, '위치를 기억했어요 · 섞기', () => {
            if (phase !== 'ready') return;
            phase = 'shuffle'; controls.replaceChildren();
            boxes.forEach(box => { box.el.textContent = '🎁'; });
            status.textContent = '상자가 움직입니다. 반지 상자를 눈으로 따라가세요!';
            // Exchange physical boxes, preserving their contents through every swap.
            const swaps = Array.from({ length: 12 }, (_, index) => {
              const a = Math.floor(Math.random() * boxes.length);
              const b = (a + 1 + Math.floor(Math.random() * (boxes.length - 1))) % boxes.length;
              return { a, b, duration: 430 - index * 14 };
            });
            let last = null, elapsed = 0, step = -1, activeSwap = null;
            const frame = now => {
              const delta = last === null || document.hidden ? 0 : Math.min(now - last, 80);
              last = now; elapsed += delta;
              // Pause briefly after closing the lids, then between exchanges.
              if (step === -1 && elapsed < 600) { animation = requestAnimationFrame(frame); return; }
              if (step === -1) { step = 0; elapsed = 0; }
              if (!activeSwap) {
                const { a, b, duration } = swaps[step];
                activeSwap = { first: boxes[a], second: boxes[b], from: boxes[a].slot, to: boxes[b].slot, duration };
              }
              const { first, second, from, to, duration } = activeSwap;
              const t = Math.min(elapsed / duration, 1);
              const eased = t * t * (3 - 2 * t);
              const arc = Math.sin(t * Math.PI) * 38;
              first.el.style.left = `${(from + (to - from) * eased) * 34}%`;
              second.el.style.left = `${(to + (from - to) * eased) * 34}%`;
              first.el.style.transform = `translateY(${-arc}px)`;
              second.el.style.transform = `translateY(${arc}px)`;
              if (elapsed >= duration + 65) {
                first.slot = to; second.slot = from;
                first.el.style.transform = ''; second.el.style.transform = '';
                activeSwap = null; elapsed = 0; step++;
                if (step === swaps.length) {
                  cleanup(); phase = 'pick';
                  status.textContent = '다이아백금반지가 든 상자는 어느 것일까요?';
                  boxes.forEach(box => {
                    box.el.textContent = `🎁 ${box.slot + 1}번 상자`;
                    box.el.disabled = false;
                  });
                  [...boxes].sort((a, b) => a.slot - b.slot).forEach(box => items.appendChild(box.el));
                  boxes.find(box => box.slot === 0).el.focus();
                  return;
                }
              }
              animation = requestAnimationFrame(frame);
            };
            animation = requestAnimationFrame(frame);
          }).focus();
          return;
        }
        title.textContent = '크리스마스 미니게임';
        instructions.textContent = '35초 동안 레이나에게 다가오는 장애물을 클릭해 막아주세요. 5번 부딪히면 실패하며 총 3번 도전할 수 있어요. 고백은 게임이 끝난 뒤 이어집니다.';
        items.className = 'merchant-field';
        const stage = document.createElement('div'); stage.className = 'merchant-reina';
        stage.innerHTML = '<div class="reina-aura"></div><img src="./assets/characters/reina/stand_flustered.png" alt="레이나"><span class="reina-name">REINA</span>';
        const progressBar = document.createElement('div'); progressBar.className = 'merchant-progress';
        progressBar.setAttribute('role', 'progressbar'); progressBar.setAttribute('aria-label', '미니게임 진행도');
        progressBar.setAttribute('aria-valuemin', '0'); progressBar.setAttribute('aria-valuemax', '35');
        panel.querySelector('.proposal-game-card').appendChild(progressBar);
        const moves = ['snowman','gift','cocoa','globe','lemon','cat','skater','coins','deer','merchant'];
        const lives = [6200,4400,5000,5500,4800,5500,3400,5100,4700,3700];
        const reducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
        let failures = 0;
        const round = () => {
          cleanup(); items.replaceChildren(); items.appendChild(stage); controls.replaceChildren();
          instructions.hidden = true; panel.classList.add('merchant-playing'); panel.classList.remove('merchant-result');
          stage.classList.remove('reina-hit');
          const mobile = window.matchMedia('(max-width: 700px), (pointer: coarse) and (max-width: 1024px)').matches;
          const speedFactor = mobile ? 1.45 : 1;
          const spawnInterval = mobile ? 2200 : 1500;
          const minInterval = mobile ? 1300 : 750;
          const spawnCutoff = mobile ? Math.max(...lives) * speedFactor + 300 : 6500;
          let elapsed = 0, last = null, spawnAt = mobile ? 1900 : 1100, missed = 0, cleared = 0, impactUntil = 0;
          let deck = shuffle(objects.map((_, i) => i));
          const total = 35000, obstacles = new Set(), effects = new Set();
          const burst = (x, y, hit = false) => {
            const el = document.createElement('span'); el.className = hit ? 'merchant-impact' : 'merchant-burst';
            el.textContent = hit ? '!' : '✦'; el.setAttribute('aria-hidden', 'true');
            el.style.left = x + '%'; el.style.top = y + '%'; items.appendChild(el);
            effects.add({ el, until: elapsed + 600 });
          };
          const endRound = success => {
            cleanup(); obstacles.clear(); effects.clear(); items.replaceChildren(); items.appendChild(stage);
            panel.classList.remove('merchant-playing', 'merchant-danger'); panel.classList.add('merchant-result');
            stage.classList.remove('reina-hit');
            stage.querySelector('img').src = './assets/characters/reina/stand_' + (success ? 'smile' : 'crying') + '.png';
            if (success) {
              status.textContent = '성공';
              button(controls, '고백 이어서 보기', () => finish('treeGameResult', 'success')).focus();
            } else {
              failures++;
              status.textContent = failures === 3 ? '실패 · 도전 종료' : '실패 · 남은 도전 ' + (3 - failures) + '회';
              button(controls, failures === 3 ? '이야기로 돌아가기' : '다시 도전하기', failures === 3 ? () => finish('treeGameResult', 'failure') : round).focus();
            }
          };
          stage.querySelector('img').src = './assets/characters/reina/stand_flustered.png';
          const frame = now => {
            const delta = last === null || document.hidden ? 0 : Math.min(now - last, 80);
            last = now; elapsed += delta;
            progressBar.style.setProperty('--progress', Math.min(elapsed / total, 1));
            progressBar.setAttribute('aria-valuenow', String(Math.floor(elapsed / 1000)));
            const hud = Math.max(0, Math.ceil((total - elapsed) / 1000)) + '초 · 충돌 ' + missed + '/5 · 제거 ' + cleared + ' · 도전 ' + (3 - failures) + '회';
            if (status.textContent !== hud) status.textContent = hud;
            panel.classList.toggle('merchant-danger', total - elapsed <= 8000);
            if (elapsed >= impactUntil) stage.classList.remove('reina-hit');
            for (const effect of effects) if (elapsed >= effect.until) { effect.el.remove(); effects.delete(effect); }
            if (elapsed >= total) { endRound(true); return; }
            if (elapsed >= spawnAt && elapsed < total - spawnCutoff) {
              spawnAt = elapsed + Math.max(minInterval, spawnInterval - elapsed / 45);
              if (!deck.length) deck = shuffle(objects.map((_, i) => i));
              const index = deck.pop(), object = objects[index];
              const edge = Math.floor(Math.random() * 4), scatter = .12 + Math.random() * .76;
              const origin = edge === 0 ? [scatter, .06] : edge === 1 ? [.94, scatter] : edge === 2 ? [scatter, .94] : [.06, scatter];
              let obstacle;
              const el = button(items, object[0], () => {
                if (!obstacles.has(obstacle)) return;
                obstacles.delete(obstacle); el.remove(); cleared++; burst(obstacle.x * 100, obstacle.y * 100);
              });
              el.className = 'merchant-obstacle object-' + moves[index];
              el.title = object[1]; el.setAttribute('aria-label', object[1] + ' 없애기');
              obstacle = { el, age: 0, life: lives[index] * speedFactor, move: moves[index], origin, x: origin[0], y: origin[1], side: Math.random() < .5 ? -1 : 1 };
              obstacles.add(obstacle);
            }
            const width = items.clientWidth, height = items.clientHeight;
            for (const obstacle of obstacles) {
              obstacle.age += delta;
              const t = Math.min(obstacle.age / obstacle.life, 1);
              let p = t, bend = 0, bounce = 0, rotation = 0;
              switch (obstacle.move) {
                case 'cat': p = t < .6 ? t * .45 : .27 + Math.pow((t - .6) / .4, 1.5) * .73; bounce = Math.sin(t * 48) * 3; break;
                case 'merchant': p = Math.pow(t, .8); bounce = Math.abs(Math.sin(t * 35)) * -7; rotation = Math.sin(t * 35) * 6; break;
                case 'skater': bend = Math.sin(t * Math.PI * 2) * .2 * (1 - t); rotation = Math.sin(t * 9) * 18; break;
                case 'gift': bounce = -Math.sin(t * Math.PI) * 90; rotation = t * 300; break;
                case 'coins': bend = Math.sin(t * Math.PI * 6) * .18 * (1 - t); bounce = Math.cos(t * 18) * 16 * (1 - t); rotation = t * 360; break;
                case 'snowman': p = Math.pow(t, 1.4); rotation = t * 480; break;
                case 'cocoa': bend = Math.sin(t * Math.PI) * .1; rotation = Math.sin(t * 14) * 16; break;
                case 'globe': bounce = Math.sin(t * 22) * 26 * (1 - t); rotation = t * 240; break;
                case 'lemon': bend = Math.sin(t * 20) * .07 * (1 - t); rotation = Math.sin(t * 20) * 12; break;
                case 'deer': bounce = -Math.abs(Math.sin(t * 18)) * 38 * (1 - t); rotation = Math.sin(t * 18) * 8; break;
              }
              const dx = .5 - obstacle.origin[0], dy = .5 - obstacle.origin[1], distance = Math.hypot(dx, dy) || 1;
              const curve = reducedMotion ? 0 : bend * obstacle.side;
              obstacle.x = obstacle.origin[0] + dx * p - dy / distance * curve;
              obstacle.y = obstacle.origin[1] + dy * p + dx / distance * curve;
              const radius = obstacle.el.offsetWidth * .55 + 2;
              const x = Math.max(radius, Math.min(width - radius, obstacle.x * width));
              const y = Math.max(radius, Math.min(height - radius, obstacle.y * height + (reducedMotion ? 0 : bounce)));
              obstacle.el.style.left = x + 'px'; obstacle.el.style.top = y + 'px';
              obstacle.el.style.transform = 'translate(-50%, -50%) rotate(' + (reducedMotion ? 0 : rotation) + 'deg) scale(' + (.8 + p * .3) + ')';
              if (t >= 1) {
                obstacles.delete(obstacle); obstacle.el.remove(); missed++;
                burst(50, 50, true); stage.classList.add('reina-hit'); impactUntil = elapsed + 450;
                if (missed >= 5) { endRound(false); return; }
              }
            }
            animation = requestAnimationFrame(frame);
          };
          animation = requestAnimationFrame(frame);
        };
        items.appendChild(stage);
        button(controls, '미니게임 시작', round).focus();
      });
    }
    async didApply() { return { advance: !this.cancelled }; }
    async revert() { /* Re-entry creates a fresh round; storage is restored by the engine. */ }
  }
  monogatari.registerAction(ProposalGame);
  monogatari.on('end', () => ProposalGame.active?.cancel());
})();
