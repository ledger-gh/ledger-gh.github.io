const V = 'ledger-v4.0.0';
const SHELL = ['/manifest.webmanifest', '/icon-192.png', '/icon-512.png'];
const LIBS = ['cdn.jsdelivr.net', 'cdnjs.cloudflare.com', 'unpkg.com'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(V).then(c => c.addAll(SHELL)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== V).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (req.mode === 'navigate') return;
  if (url.origin === location.origin) {
    e.respondWith(caches.match(req).then(hit => {
      const net = fetch(req).then(res => { if (res.ok) { const copy = res.clone(); caches.open(V).then(c => c.put(req, copy)); } return res; }).catch(() => hit);
      return hit || net;
    }));
    return;
  }
  if (LIBS.includes(url.hostname)) {
    e.respondWith(caches.match(req).then(hit => hit || fetch(req).then(res => { if (res.ok) { const copy = res.clone(); caches.open(V).then(c => c.put(req, copy)); } return res; })));
  }
});
