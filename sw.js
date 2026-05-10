/* Service Worker — Tableau de bord financier
 * Stratégie : cache-first pour les assets locaux, stale-while-revalidate pour les CDN.
 * Au premier chargement en ligne, les libs CDN (Chart.js, SheetJS, fonts Google) sont
 * mises en cache automatiquement. Une fois mises en cache, l'app fonctionne 100% hors-ligne.
 */

const VERSION = 'v1.0.0';
const CACHE_NAME = `finances-${VERSION}`;

// Assets locaux pré-chargés à l'installation
const PRECACHE_URLS = [
  './',
  './index.html',
  './manifest.webmanifest',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/icon-maskable-512.png',
  './icons/icon-180.png',
  './icons/favicon-32.png',
];

// Domaines externes mis en cache au passage
const EXTERNAL_HOSTS = [
  'cdnjs.cloudflare.com',
  'fonts.googleapis.com',
  'fonts.gstatic.com',
];

// === INSTALL ===
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) =>
      cache.addAll(PRECACHE_URLS).catch((err) => {
        console.warn('[SW] Précache partiel:', err);
      })
    )
  );
  self.skipWaiting();
});

// === ACTIVATE ===
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k))
      )
    )
  );
  self.clients.claim();
});

// === FETCH ===
self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;

  const url = new URL(req.url);

  // Externes (CDN, fonts) → stale-while-revalidate
  if (url.origin !== location.origin) {
    if (!EXTERNAL_HOSTS.some((h) => url.hostname.includes(h))) return;
    event.respondWith(staleWhileRevalidate(req));
    return;
  }

  // Locales → cache-first
  event.respondWith(cacheFirst(req));
});

async function cacheFirst(req) {
  const cache = await caches.open(CACHE_NAME);
  const cached = await cache.match(req);
  if (cached) return cached;
  try {
    const fresh = await fetch(req);
    if (fresh && fresh.ok) cache.put(req, fresh.clone());
    return fresh;
  } catch (e) {
    if (req.mode === 'navigate') {
      const fallback = await cache.match('./index.html');
      if (fallback) return fallback;
    }
    throw e;
  }
}

async function staleWhileRevalidate(req) {
  const cache = await caches.open(CACHE_NAME);
  const cached = await cache.match(req);
  const fetchPromise = fetch(req)
    .then((resp) => {
      if (resp && resp.ok) cache.put(req, resp.clone());
      return resp;
    })
    .catch(() => cached);
  return cached || fetchPromise;
}

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
