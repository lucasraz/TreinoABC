/**
 * Service Worker — A-FIT
 * 
 * Cache-first strategy para assets locais.
 * Network-first para CDN (Plyr, fontes).
 */

const CACHE_NAME = 'auera-fit-v23';
const LOCAL_ASSETS = [
    '/',
    '/index.html',
    '/styles.css',
    '/app.js',
    '/data/exercises.js',
    '/data/exercise_catalog.js',
    '/manifest.json',
    '/logo.png',
    '/icon-192.png',
    '/icon-512.png'
];

// Install: cache local assets
self.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open(CACHE_NAME).then(function(cache) {
            return cache.addAll(LOCAL_ASSETS);
        })
    );
    self.skipWaiting();
});

// Activate: clean old caches
self.addEventListener('activate', function(event) {
    event.waitUntil(
        caches.keys().then(function(names) {
            return Promise.all(
                names
                    .filter(function(name) { return name !== CACHE_NAME; })
                    .map(function(name) { return caches.delete(name); })
            );
        })
    );
    self.clients.claim();
});

// Fetch: cache-first for local, network-first for CDN
self.addEventListener('fetch', function(event) {
    const url = new URL(event.request.url);
    
    // Ignorar requests que não são GET
    if (event.request.method !== 'GET') return;
    
    // CDN assets: network-first
    if (url.origin !== self.location.origin) {
        event.respondWith(
            fetch(event.request)
                .then(function(response) {
                    const clone = response.clone();
                    caches.open(CACHE_NAME).then(function(cache) {
                        cache.put(event.request, clone);
                    });
                    return response;
                })
                .catch(function() {
                    return caches.match(event.request);
                })
        );
        return;
    }
    
    // Local assets: cache-first
    event.respondWith(
        caches.match(event.request, { ignoreSearch: true }).then(function(cached) {
            return cached || fetch(event.request).then(function(response) {
                const clone = response.clone();
                caches.open(CACHE_NAME).then(function(cache) {
                    cache.put(event.request, clone);
                });
                return response;
            });
        })
    );
});
