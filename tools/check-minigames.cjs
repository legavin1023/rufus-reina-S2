const { chromium } = require('playwright');
const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');
const root = path.resolve(__dirname, '..');
const server = http.createServer((req, res) => {
  const file = path.resolve(root, '.' + decodeURIComponent(req.url.split('?')[0] === '/' ? '/index.html' : req.url.split('?')[0]));
  if (!file.startsWith(root + path.sep)) { res.writeHead(403).end(); return; }
  fs.readFile(file, (err, data) => {
    if (err) { res.writeHead(404).end(); return; }
    res.setHeader('Content-Type', ({'.html':'text/html','.js':'text/javascript','.css':'text/css','.png':'image/png','.json':'application/json'})[path.extname(file)] || 'application/octet-stream');
    res.end(data);
  });
});
(async () => {
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  let browser;
  try {
    browser = await chromium.launch({channel:'msedge', headless:true});
    const page = await browser.newPage({viewport:{width:1280,height:720}});
    const errors = []; page.on('pageerror', e => errors.push(e.message));
    await page.goto(`http://127.0.0.1:${server.address().port}`);
    await page.locator('.game-test-tools').waitFor();
    await page.evaluate(() => {
      let now = 0, next = 0; const callbacks = new Map();
      window.requestAnimationFrame = callback => { callbacks.set(++next, callback); return next; };
      window.cancelAnimationFrame = id => callbacks.delete(id);
      window.stepGame = (ms, clear = false) => {
        for (let t = 0; t < ms; t += 80) {
          now += 80; const batch = [...callbacks.values()]; callbacks.clear(); batch.forEach(fn => fn(now));
          if (clear) document.querySelectorAll('.merchant-obstacle:not(:disabled)').forEach(el => el.click());
        }
      };
      window.launchGame = mode => {
        const Game = monogatari.action('ProposalGame');
        window.currentGame = new Game(['proposal-game', mode]);
        window.gameDone = false;
        window.currentGame.apply().then(() => { window.gameDone = true; });
      };
    });
    const launch = mode => page.evaluate(mode => window.launchGame(mode), mode);
    const step = (ms, clear = false) => page.evaluate(({ms, clear}) => window.stepGame(ms, clear), {ms,clear});
    await launch('globe');
    await page.getByRole('button', {name:'스노 글로브 흔들기'}).click();
    assert.equal(await page.locator('.globe-snow i').count(),45);
    fs.mkdirSync(path.join(root,'build/qa'), {recursive:true});
    await page.screenshot({path:path.join(root,'build/qa/globe.png')});
    await page.getByRole('button', {name:'이야기 이어가기'}).click();
    assert.equal(await page.evaluate(() => monogatari.action('ProposalGame').blocking),false);
    await launch('tree');
    await page.getByRole('button', {name:'미니게임 시작'}).click();
    await step(2400);
    await page.getByRole('button', {name:'일시정지 · Esc'}).click();
    const before = await page.locator('.hud-time').innerText();
    await step(8000,true);
    assert.equal(await page.locator('.hud-time').innerText(), before);
    await page.keyboard.press('Tab');
    assert.equal(await page.evaluate(() => document.activeElement.textContent),'계속하기');
    await page.getByRole('button', {name:'계속하기',exact:true}).click();
    await step(35000,true);
    assert.equal(await page.locator('.merchant-summary strong').innerText(),'마음을 가다듬었어요');
    await page.screenshot({path:path.join(root,'build/qa/tree.png')});
    await page.getByRole('button', {name:'고백 이어서 보기'}).click();
    assert.equal(await page.evaluate(() => monogatari.storage().treeGameResult),'success');
    await launch('tree');
    for (let attempt = 0; attempt < 3; attempt++) {
      await page.getByRole('button', {name:attempt ? '다시 도전하기' : '미니게임 시작',exact:true}).click();
      await step(35000);
    }
    await page.getByRole('button', {name:'이야기로 돌아가기'}).click();
    assert.equal(await page.evaluate(() => monogatari.storage().treeGameResult),'failure');
    for (const excluded of ['candy','gold']) {
      await page.evaluate(ring => { monogatari.storage().ringChoice = ring; }, excluded);
      await launch('retry');
      assert.equal(await page.locator(`.shell-game-box[data-ring="${excluded}"]`).count(),0);
      await page.evaluate(() => { window.diamondBox = document.querySelector('.shell-game-box[data-ring="diamond"]'); });
      await page.getByRole('button', {name:'위치를 기억했어요 · 섞기'}).click();
      await step(9000);
      assert.equal(await page.locator('.shell-game-box:not(:disabled)').count(),3);
      await page.screenshot({path:path.join(root,`build/qa/rings-${excluded}.png`)});
      await page.evaluate(() => window.diamondBox.click());
      await page.getByRole('button', {name:'상자 받아가기'}).click();
      assert.equal(await page.evaluate(() => monogatari.storage().retryRing),'diamond');
    }
    await page.setViewportSize({width:844,height:390});
    await launch('globe');
    await page.screenshot({path:path.join(root,'build/qa/globe-mobile.png')});
    assert.equal(await page.getByRole('button', {name:'이야기 이어가기'}).isVisible(),true);
    const layout = await page.evaluate(() => {
      const globe = document.querySelector('.snow-globe').getBoundingClientRect();
      const next = document.querySelector('.game-controls button').getBoundingClientRect();
      return {globeBottom:globe.bottom, buttonTop:next.top, buttonBottom:next.bottom, height:innerHeight};
    });
    assert.ok(layout.globeBottom <= layout.buttonTop && layout.buttonBottom <= layout.height, 'mobile globe and continue button must not overlap or overflow');
    await page.evaluate(() => window.currentGame.cancel());
    assert.equal(await page.locator('.proposal-game').count(),0);
    assert.equal(await page.evaluate(() => monogatari.action('ProposalGame').blocking),false);
    assert.deepEqual(errors,[]);
    console.log('PASS: globe, pause, keyboard focus, tree success and three failures, ring exclusions and result, mobile layout, cancellation, browser errors');
  } finally { await browser?.close(); server.close(); }
})().catch(e => { console.error(e); process.exitCode = 1; });
