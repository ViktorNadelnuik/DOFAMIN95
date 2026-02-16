const CACHE_NAME = "vtz-cache-v1";
const ASSETS = [
  "/DOFAMIN95/",
  "/DOFAMIN95/en.html",
  "/DOFAMIN95/index.html",
  "/DOFAMIN95/logo.png",
  "/DOFAMIN95/vtz-mpb-patch.png",
  "/DOFAMIN95/hero-bg.jpg",
  "/DOFAMIN95/supporters.css"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
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
  const req = event.request;
  event.respondWith(
    caches.match(req).then((cached) => cached || fetch(req).then((res) => {
      const copy = res.clone();
      caches.open(CACHE_NAME).then((cache) => cache.put(req, copy));
      return res;
    }).catch(() => cached))
  );
});
