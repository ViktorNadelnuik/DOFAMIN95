const CACHE_NAME = "vtz-cache-v2";
const ASSETS = [
  "/DOFAMIN95/",
  "/DOFAMIN95/index.html",
  "/DOFAMIN95/en.html",
  "/DOFAMIN95/logo.png",
  "/DOFAMIN95/vtz-mpb-patch.png",
  "/DOFAMIN95/supporters.css"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) =>
      cache.addAll(ASSETS).catch(()=>{})
    )
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.map((k) => (k === CACHE_NAME ? null : caches.delete(k))))
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((cached) =>
      cached || fetch(event.request)
    )
  );
});
