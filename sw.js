const CACHE_NAME = 'mypaycheque-cache-v1';
const URLS_TO_CACHE = [
  'index.html',
  'manifest.json',
  'icon.png'
];

// UPDATED: Simple install event
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(URLS_TO_CACHE);
    })
  );
});

// UPDATED: Simple fetch event
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});