const CACHE_NAME = 'foca-loca-cache-v1';
const urlsToCache = [
  './',
  './index.html',
  './libre.html',
  './styles-libre.css',
  './cumple.html',
  './styles-cumple.css',
  './styles.css',
  './fonts/PetitCochon.ttf',
  './app-libre.js',
  './app-cumple.js',
  './app-index.js',
  './cumple.jpg',
  './foca.jpg',
  './foca1.jpg',
  './focaloca1.jpg',
  './icon-192.png',
  './aviso.png',
  './icon.ico',
  './manifest.json',
  './icon-512.png',
  './screenshots/screenshot1.png',
  './screenshots/screenshot2.png',
  './arti.jpg',
  './arti.png',
  './arti.jpeg',
  './campana.jpg',
  './campana.png',
];

// Instalación y precacheo
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
      .then(() => self.skipWaiting()) // activar inmediatamente
  );
});

// Activación y limpieza de cachés viejos
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => 
      Promise.all(
        cacheNames.filter(name => name !== CACHE_NAME)
          .map(name => caches.delete(name))
      )
    ).then(() => self.clients.claim()) // asumir control inmediato
  );
});

// Respuesta fetch con estrategia cache primero
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
      .catch(() => {
        // Fallback si falla fetch y no hay cache (ej: página offline)
        if (event.request.mode === 'navigate') {
          return caches.match('./index.html');
        }
        // Para otros recursos, podrías retornar un fallback o simplemente undefined
        return;
      })
  );
});
