const CACHE_NAME = 'MyPaychequeApp-v1';
const ASSETS = [
  'index.html',
  'manifest.json',
  'icon.png',
  'https://cdn.jsdelivr.net/npm/flatpickr/dist/flatpickr.min.css',
  'https://cdn.jsdelivr.net/npm/flatpickr'
];

// Install the service worker and cache all necessary files
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('MyPaychequeApp: Caching assets');
      return cache.addAll(ASSETS);
    })
  );
});

// Activate and clean up old caches if version changes
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            console.log('MyPaychequeApp: Clearing old cache');
            return caches.delete(cache);
          }
        })
      );
    })
  );
});

// Intercept requests and serve from cache if available, otherwise fetch from network
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});