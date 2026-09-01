/* Block 4 PWA — network-first for the app shell, cache fallback for offline.
   No more hoarding stale HTML like a doomsday prepper. */
const CACHE = 'workout-b4-v1';
const SHELL = ['./', './index.html', './app.js', './career-data.js', './manifest.webmanifest', './icon-512.png', './apple-touch-icon.png'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(SHELL)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys =>
    Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
  ).then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== location.origin) return; // fonts etc: browser default
  e.respondWith(
    fetch(req).then(resp => {
      if (resp && resp.status === 200) {
        const clone = resp.clone();
        caches.open(CACHE).then(c => c.put(req, clone));
      }
      return resp;
    }).catch(() => caches.match(req).then(c => c || caches.match('./index.html')))
  );
});
