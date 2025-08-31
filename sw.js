// sw.js (minimal setup for PWA install)

self.addEventListener('install', (event) => {
  console.log('[SW] Installed');
  self.skipWaiting(); // turant control le
});

self.addEventListener('activate', (event) => {
  console.log('[SW] Activated');
  self.clients.claim(); // sabhi tabs control me le
});

self.addEventListener('fetch', (event) => {
  // Simple network-first fetch
  event.respondWith(fetch(event.request).catch(() => caches.match(event.request)));
});