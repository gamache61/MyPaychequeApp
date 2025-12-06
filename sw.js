const CACHE_NAME = 'paycheque-pro-v1';
const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/styles.css',
  '/app.js', 
  '/manifest.json',
  '/icons/icon-192x192.png',
  '/icons/icon-512x512.png'
];

// 1. INSTALL EVENT: Caches the calculator assets immediately
self.addEventListener('install', (event) => {
  console.log('[Service Worker] Installing Paycheque Pro...');
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[Service Worker] Caching App Shell');
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
});

// 2. ACTIVATE EVENT: Cleans up old versions of the app
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(
        keyList.map((key) => {
          if (key !== CACHE_NAME) {
            console.log('[Service Worker] Removing old cache', key);
            return caches.delete(key);
          }
        })
      );
    })
  );
  return self.clients.claim();
});

// 3. FETCH EVENT: The "Offline First" Strategy
// Intercepts network requests. If the file is in cache, serve it. 
// If not, try to fetch it from the web.
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      // Return cached file if found
      if (response) {
        return response;
      }
      // Otherwise, request from network
      return fetch(event.request).catch(() => {
        // Optional: Return a custom offline page if network fails 
        // and the file isn't cached (e.g., for external tax API calls)
        // return caches.match('/offline.html');
      });
    })
  );
});