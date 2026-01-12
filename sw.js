const CACHE_NAME = 'MyPaychequeApp-v5';
const ASSETS = [
  'https://gamache61.github.io/MyPaychequeApp/',
  'https://gamache61.github.io/MyPaychequeApp/index.html',
  'https://gamache61.github.io/MyPaychequeApp/manifest.json',
  'https://gamache61.github.io/MyPaychequeApp/icon.png',
  'https://cdn.jsdelivr.net/npm/flatpickr/dist/flatpickr.min.css',
  'https://cdn.jsdelivr.net/npm/flatpickr'
];

// Model: Gemini 3 Flash

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('MyPaychequeApp: Caching assets');
      return Promise.all(
        ASSETS.map(url => {
          return cache.add(url).catch(err => console.log('Failed to cache:', url));
        })
      );
    })
  );
});

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

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});