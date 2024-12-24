const CACHE_NAME = 'my-cache-v1';
const urlsToCache = [
  '/', // Home page
  '/index.html', // Other pages
  '/styles.css', // CSS file
  '/app.js', // Your JS file
  '/favicon/favicon.ico',  // Add favicon to cache
  '/favicon/apple-touch-icon.ico',  // Add Apple touch icon to cache
  // Add other static assets you want to cache
];

// Install event - caches the app's assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Caching app shell');
        return cache.addAll(urlsToCache);
      })
  );
});

// Activate event - clears old caches
self.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhitelist.includes(cacheName)) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Fetch event - serves assets from cache or fetches from network if not cached
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((cachedResponse) => {
        // Return cached response if found, otherwise fetch from network
        return cachedResponse || fetch(event.request);
      })
      .catch((error) => {
        // Handle any fetch errors here (e.g., when offline)
        console.error('Fetch failed:', error);
        return caches.match('/offline.html');  // Optional fallback to an offline page
      })
  );
});
