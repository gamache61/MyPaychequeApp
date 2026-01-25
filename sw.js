const CACHE_NAME = 'mypaycheque-v2';
const ASSETS = [
    './',
    './index.html',
    './manifest.json',
    './icon.png'
];

// FIXED: Install and cache files
self.addEventListener('install', (e) => {
    e.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(ASSETS);
        })
    );
});

// FIXED: Fetching from cache for offline support
self.addEventListener('fetch', (e) => {
    e.respondWith(
        caches.match(e.request).then((response) => {
            return response || fetch(e.request);
        })
    );
});