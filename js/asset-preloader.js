/* global monogatari */
window.preloadGameAssets = async function () {
  const overlay = document.createElement('div');
  overlay.style.cssText = 'position:fixed;inset:0;z-index:2147483647;display:grid;place-content:center;text-align:center;gap:18px;background:#28141e;color:#fff1f5;font-size:20px';
  overlay.innerHTML = '<p>이야기를 준비하고 있어요.</p><progress max="1" value="0" style="width:min(360px,75vw);accent-color:#e5a4be"></progress><small role="status">파일 확인 중…</small>';
  document.body.appendChild(overlay);
  const status = overlay.querySelector('small');
  const bar = overlay.querySelector('progress');
  try {
    await window.gameNetworkReady;
    const versionResponse = await fetch('./js/asset-versions.json', { cache: 'no-store' });
    if (!versionResponse.ok) throw new Error('파일 버전을 확인하지 못했습니다.');
    const versions = await versionResponse.json();
    const worker = navigator.serviceWorker?.controller;
    if (worker) await new Promise((resolve, reject) => {
      const channel = new MessageChannel();
      const timer = setTimeout(() => reject(new Error('로딩 준비 시간이 초과되었습니다.')), 15000);
      channel.port1.onmessage = () => { clearTimeout(timer); channel.port1.close(); resolve(); };
      worker.postMessage({ type: 'SET_ASSET_VERSIONS', data: { versions } }, [channel.port2]);
    });
    const response = await fetch('./js/preload-assets.json', { cache: 'no-store' });
    if (!response.ok) throw new Error('이미지 목록을 불러오지 못했습니다.');
    const urls = new Set(await response.json());
    const paths = monogatari.setting('AssetsPath');
    for (const kind of ['music', 'sounds', 'voices', 'videos', 'images', 'scenes']) {
      for (const file of Object.values(monogatari.assets(kind) || {})) {
        if (typeof file === 'string') urls.add(`${paths.root}/${paths[kind]}/${file}`);
      }
    }
    for (const character of Object.values(monogatari.characters())) {
      for (const file of Object.values(character.sprites || {})) {
        if (typeof file === 'string') urls.add(`${paths.root}/${paths.characters}/${character.directory || ''}/${file}`);
      }
    }
    const queue = [...new Set([...urls].map(url => new URL(url, document.baseURI).href))];
    const critical = new Set();
    const addCritical = relative => critical.add(new URL(relative, document.baseURI).href);
    addCritical(`${paths.root}/${paths.music}/${monogatari.assets('music').Title}`);
    const reina = monogatari.characters().r;
    for (const expression of ['flustered', 'normal', 'energetic']) {
      addCritical(`${paths.root}/${paths.characters}/${reina.directory}/${reina.sprites[expression]}`);
    }
    for (const url of queue) if (new URL(url).pathname.includes('/assets/ui/')) critical.add(url);
    const initialQueue = queue.filter(url => critical.has(url));
    const backgroundQueue = queue.filter(url => !critical.has(url));
    // 프롤로그 BGM을 백그라운드 다운로드의 맨 앞에 둔다.
    const daily = new URL(`${paths.root}/${paths.music}/${monogatari.assets('music').Daily}`, document.baseURI).href;
    backgroundQueue.sort((a, b) => (a === daily ? -1 : b === daily ? 1 : 0));
    const download = async url => {
      const file = await fetch(url);
      if (!file.ok) throw new Error('파일을 불러오지 못했습니다: ' + decodeURI(new URL(url).pathname));
      await file.arrayBuffer();
    };
    let next = 0, completed = 0;
    await Promise.all(Array.from({ length: 4 }, async () => {
      while (next < initialQueue.length) {
        const url = initialQueue[next++];
        await download(url);
        completed++;
        bar.value = completed / initialQueue.length;
        status.textContent = `${completed} / ${initialQueue.length} · ${Math.round(bar.value * 100)}%`;
      }
    }));
    overlay.remove();
    // 메인 표시 후 나머지를 두 개씩 준비한다. 실패한 파일은 실제 사용 시 재요청한다.
    setTimeout(() => {
      let index = 0;
      window.gameBackgroundPreload = Promise.all(Array.from({ length: 2 }, async () => {
        while (index < backgroundQueue.length) {
          const url = backgroundQueue[index++];
          try { await download(url); } catch (error) { console.warn(error); }
        }
      }));
    }, 300);
  } catch (error) {
    status.textContent = error.message;
    const retry = document.createElement('button');
    retry.textContent = '다시 불러오기';
    retry.onclick = () => location.reload();
    overlay.appendChild(retry);
    throw error;
  }
};
