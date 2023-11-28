// service-worker.js

const CACHE_NAME = 'dictionary-app-cache-v1';
const urlsToCache = [
  '/index.html', // adjust this based on your file structure
  '/script.js',
  // Add other URLs you want to cache
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        return response || fetch(event.request);
      })
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            // Delete outdated caches
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
