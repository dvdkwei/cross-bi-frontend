/* eslint-disable no-undef */
import { precacheAndRoute, cleanupOutdatedCaches } from "workbox-precaching";

cleanupOutdatedCaches();
precacheAndRoute(self.__WB_MANIFEST);

const cacheName = 'crache_v1';
const API_KEY = import.meta.env.VITE_API_KEY;

const addResourcesToCache = async (resources) => {
  const cache = await caches.open(cacheName);
  await cache.addAll(resources);
};

self.addEventListener('install', (event) => {
  self.skipWaiting();

  event.waitUntil(addResourcesToCache([
    '/',
    'index.html',
    'src/assets',
    'src/styles'
  ]));
});

self.addEventListener('fetch', (event) => {
  let url = event.request.url;

  if (!url.startsWith('http') || event.request.method !== 'GET') {
    return;
  }

  event.respondWith(caches.open(cacheName).then(async (cache) => {
    const headers = new Headers();
    headers.append('x-api-key', API_KEY);
    headers.append('Content-Type', 'appplication/json');

    return fetch(url, { headers: headers })
    .then((fetched) => {
      cache.put(event.request, fetched.clone());
      return fetched;
    })
    .catch(() => {
      return cache.match(url);
    })
  }));
});

self.addEventListener('push', (event) => {
  const pushData = event.data.text();

  const data = JSON.parse(pushData);

  event.waitUntil(
    self.registration.showNotification(data.title, { 
      body: data.body, 
      icon: './pwa-192x192.png',
      vibrate: [200, 100, 200, 100, 200, 100, 200], 
      badge: './pwa-192x192.png'
    })
  );
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  if(clients.openWindow){
    event.waitUntil(clients.openWindow('https://app.crossbi.de'));
  }
});