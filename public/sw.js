/**
 * Service Worker for m2gh.ir Portfolio
 * Version: 1.0.0
 * Features: Offline support, Cache-first strategy, Background sync
 */

const CACHE_VERSION = 'v1.0.0';
const CACHE_NAME = `m2gh-portfolio-${CACHE_VERSION}`;
const OFFLINE_URL = '/offline.html';

// Assets to cache on install
const STATIC_ASSETS = [
  '/',
  '/index-4.html',
  '/article-enhanced.html',
  '/styles.min-2.css',
  '/maze.min-2.js',
  '/manifest.json',
  '/favicon.ico',
  OFFLINE_URL
];

// Install event - cache static assets
self.addEventListener('install', (event) => {
  console.log('[Service Worker] Installing...', CACHE_VERSION);

  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('[Service Worker] Caching static assets');
        return cache.addAll(STATIC_ASSETS);
      })
      .then(() => self.skipWaiting())
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('[Service Worker] Activating...', CACHE_VERSION);

  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== CACHE_NAME) {
              console.log('[Service Worker] Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => self.clients.claim())
  );
});

// Fetch event - cache-first strategy with network fallback
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip cross-origin requests
  if (url.origin !== location.origin) {
    return;
  }

  // Skip API requests and analytics
  if (url.pathname.startsWith('/api/') ||
      url.pathname.includes('analytics') ||
      url.pathname.includes('clarity')) {
    return;
  }

  event.respondWith(
    caches.match(request)
      .then((cachedResponse) => {
        if (cachedResponse) {
          // Return cached version and update in background
          fetchAndCache(request);
          return cachedResponse;
        }

        // Not in cache, fetch from network
        return fetchAndCache(request);
      })
      .catch(() => {
        // Network failed, return offline page for HTML requests
        if (request.headers.get('accept').includes('text/html')) {
          return caches.match(OFFLINE_URL);
        }
      })
  );
});

// Helper function to fetch and cache
function fetchAndCache(request) {
  return fetch(request)
    .then((response) => {
      // Don't cache non-successful responses
      if (!response || response.status !== 200 || response.type === 'error') {
        return response;
      }

      // Clone the response
      const responseToCache = response.clone();

      caches.open(CACHE_NAME)
        .then((cache) => {
          cache.put(request, responseToCache);
        });

      return response;
    });
}

// Message event for cache updates
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }

  if (event.data && event.data.type === 'CLEAR_CACHE') {
    caches.delete(CACHE_NAME)
      .then(() => {
        event.ports[0].postMessage({ success: true });
      });
  }
});

// Background sync for offline form submissions
self.addEventListener('sync', (event) => {
  if (event.tag === 'sync-comments') {
    event.waitUntil(syncComments());
  }
});

async function syncComments() {
  try {
    // Retrieve pending comments from IndexedDB
    const pendingComments = await getStoredComments();

    for (const comment of pendingComments) {
      await fetch('/api/comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(comment)
      });
    }

    // Clear pending comments after successful sync
    await clearStoredComments();
  } catch (error) {
    console.error('[Service Worker] Sync failed:', error);
  }
}

// Helper functions for IndexedDB (simplified)
async function getStoredComments() {
  // Implementation would use IndexedDB
  return [];
}

async function clearStoredComments() {
  // Implementation would use IndexedDB
  return true;
}
