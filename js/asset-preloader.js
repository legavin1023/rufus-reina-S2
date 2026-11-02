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
    const worker = navigator.serviceWorker?.controller;
    if (worker) await new Promise((resolve, reject) => {
      const channel = new MessageChannel();
      const timer = setTimeout(() => reject(new Error('로딩 준비 시간이 초과되었습니다.')), 15000);
      channel.port1.onmessage = () => { clearTimeout(timer); channel.port1.close(); resolve(); };
      worker.postMessage({ type: 'RESET_SESSION_ASSETS' }, [channel.port2]);
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
    let next = 0, completed = 0;
    await Promise.all(Array.from({ length: 4 }, async () => {
      while (next < queue.length) {
        const url = queue[next++];
        const file = await fetch(url);
        if (!file.ok) throw new Error('파일을 불러오지 못했습니다: ' + decodeURI(new URL(url).pathname));
        await file.arrayBuffer();
        completed++;
        bar.value = completed / queue.length;
        status.textContent = `${completed} / ${queue.length} · ${Math.round(bar.value * 100)}%`;
      }
    }));
    overlay.remove();
  } catch (error) {
    status.textContent = error.message;
    const retry = document.createElement('button');
    retry.textContent = '다시 불러오기';
    retry.onclick = () => location.reload();
    overlay.appendChild(retry);
    throw error;
  }
};
