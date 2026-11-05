"use strict";

// Scripts stay fresh; unchanged assets are reused across visits by content hash.
// Save data in localStorage/IndexedDB is untouched.
const gameCachePrefix = "Monogatari-v";
let assetVersions;
const pendingAssets = new Map();
async function getAssetVersions() {
  if (!assetVersions) assetVersions = fetch(new URL('./js/asset-versions.json?_fresh=' + Date.now(), self.registration.scope), { cache: 'no-store' })
    .then(response => { if (!response.ok) throw Error('Asset version manifest unavailable'); return response.json(); })
    .catch(error => { assetVersions = null; throw error; });
  return assetVersions;
}
async function clearGameCaches() {
  const keys = await caches.keys();
  await Promise.all(keys.filter(key => key.startsWith(gameCachePrefix)).map(key => caches.delete(key)));
}
self.addEventListener("install", event => {
  event.waitUntil(self.skipWaiting());
});
self.addEventListener("activate", event => {
  event.waitUntil((async () => {
    await clearGameCaches();
    await self.clients.claim();
    // Old cached HTML cannot run the new entry loader. Replace open game
    // documents after this worker takes over, including already-installed apps.
    const windows = await self.clients.matchAll({ type: "window", includeUncontrolled: true });
    await Promise.all(windows.map(client => {
      if (!client.url.startsWith(self.registration.scope)) return;
      return client.navigate(client.url).catch(() => {});
    }));
  })());
});
self.addEventListener("fetch", event => {
  const request = event.request;
  if (request.method !== "GET") return;
  event.respondWith((async () => {
    const assetUrl = new URL(request.url);
    if (assetUrl.origin === self.location.origin && assetUrl.pathname.includes('/assets/') && event.clientId) {
      const versions = await getAssetVersions();
      const relative = decodeURIComponent(assetUrl.pathname.slice(new URL(self.registration.scope).pathname.length));
      const version = versions[relative];
      if (version) {
        const cache = await caches.open('RufusAssets-v1');
        const key = assetUrl.origin + assetUrl.pathname + '?v=' + version;
        const cached = await cache.match(key);
        if (cached) return cached;
        if (!pendingAssets.has(key)) {
          const job = fetch(key, { cache: 'no-store' }).then(async response => {
            if (response.ok && response.status === 200) await cache.put(key, response.clone());
            return response;
          }).finally(() => pendingAssets.delete(key));
          pendingAssets.set(key, job);
        }
        return (await pendingAssets.get(key)).clone();
      }
      assetUrl.searchParams.set('_fresh', String(Date.now()));
      return fetch(assetUrl.href, { cache: 'no-store' });
    }
    if (request.mode === "navigate") await clearGameCaches();
    const url = new URL(request.url);
    let freshRequest = request;
    // Fresh URLs also bypass intermediary/CDN caches, including the entry HTML.
    if (url.origin === self.location.origin) {
      url.searchParams.set("_fresh", String(Date.now()));
      if (request.mode === "navigate") {
        return fetch(url.href, { cache: "no-store", credentials: request.credentials });
      }
      freshRequest = new Request(url.href, request);
    }
    return fetch(freshRequest, { cache: "no-store" });
  })());
});
// Keep the engine's cache protocol compatible without writing new caches.
self.addEventListener("message", event => {
  const { type, data } = event.data || {};
  const respond = response => event.ports?.[0]?.postMessage(response);
  switch (type) {
    case "SET_ASSET_VERSIONS":
      assetVersions = Promise.resolve(data.versions);
      respond({ success: true });
      break;
    case "RESET_SESSION_ASSETS":
      event.waitUntil((async () => {
        await caches.delete('RufusSession-' + event.source.id);
        const clients = await self.clients.matchAll({ includeUncontrolled: true });
        const active = new Set(clients.map(client => 'RufusSession-' + client.id));
        const keys = await caches.keys();
        await Promise.all(keys.filter(key => key.startsWith('RufusSession-') && !active.has(key)).map(key => caches.delete(key)));
        respond({ success: true });
      })());
      break;
    case "CACHE_ASSETS":
      respond({ success: true, cached: 0, total: Array.isArray(data?.urls) ? data.urls.length : 0, disabled: true });
      break;
    case "CHECK_CACHE": respond({ cached: false }); break;
    case "GET_CACHED": respond({ found: false }); break;
    default: respond({ error: "Unknown message type: " + type });
  }
});
