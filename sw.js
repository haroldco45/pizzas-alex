const CACHE = 'pizzas-alex-v1';
const FILES = ['./','index.html','manifest.webmanifest',
  'img/perro.jpg','img/lasagna.jpg','img/peperoni.jpg','img/estofada.jpg','img/bbq.jpg','img/tropical.jpg',
  'img/jamon.jpg','img/hawaiana.jpg','img/pollo-champinones.jpg','img/icon-192.png','img/icon-512.png'];
self.addEventListener('install', e => { e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES))); self.skipWaiting(); });
self.addEventListener('activate', e => { e.waitUntil(caches.keys().then(k => Promise.all(k.filter(x => x !== CACHE).map(x => caches.delete(x))))); self.clients.claim(); });
// Primero la red (para que siempre salga lo último), y si no hay señal, lo guardado
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  e.respondWith(fetch(e.request).then(r => { const copy = r.clone(); caches.open(CACHE).then(c => c.put(e.request, copy)); return r; })
    .catch(() => caches.match(e.request)));
});
