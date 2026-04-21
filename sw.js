/**
 * Service Worker — AURA FIT
 * 
 * Cache-first strategy para assets locais.
 * Network-first para CDN (Plyr, fontes).
 */

const CACHE_NAME = 'aura-fit-v26';
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

// Instalação: cacheia assets locais
self.addEventListener('install', event => {
    // Força o SW a se tornar o ativo imediatamente
    self.skipWaiting();
    
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            return cache.addAll(LOCAL_ASSETS);
        })
    );
});

// Ativação: limpa caches antigos
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(keys => {
            return Promise.all(
                keys.filter(key => key !== CACHE_NAME)
                    .map(key => caches.delete(key))
            );
        }).then(() => {
            // Garante que o SW controle todas as abas imediatamente
            return self.clients.claim();
        })
    );
});

// Interceptação de requisições
self.addEventListener('fetch', event => {
    const url = new URL(event.request.url);
    
    // CDN e recursos externos: network-first
    if (url.origin !== location.origin) {
        event.respondWith(
            fetch(event.request).catch(function() {
                return caches.match(event.request);
            })
        );
        return;
    }

    // Navegação (páginas HTML): sempre retornar o index.html se falhar ou estiver offline
    if (event.request.mode === 'navigate') {
        event.respondWith(
            fetch(event.request).catch(function() {
                return caches.match('/', { ignoreSearch: true }) || caches.match('/index.html');
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
