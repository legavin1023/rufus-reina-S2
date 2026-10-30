"use strict";

// Always load from the network. Save data in localStorage/IndexedDB is untouched.
const gameCachePrefix = "Monogatari-v";
async function clearGameCaches() {
  const keys = await caches.keys();
  await Promise.all(keys.filter(key => key.startsWith(gameCachePrefix)).map(key => caches.delete(key)));
}
self.addEventListener("install", event => {
  event.waitUntil(self.skipWaiting());
});
self.addEventListener("activate", event => {
  event.waitUntil(clearGameCaches().then(() => self.clients.claim()));
});
self.addEventListener("fetch", event => {
  const request = event.request;
  if (request.method !== "GET") return;
  event.respondWith((async () => {
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
    case "CACHE_ASSETS":
      respond({ success: true, cached: 0, total: Array.isArray(data?.urls) ? data.urls.length : 0, disabled: true });
      break;
    case "CHECK_CACHE": respond({ cached: false }); break;
    case "GET_CACHED": respond({ found: false }); break;
    default: respond({ error: "Unknown message type: " + type });
  }
});
