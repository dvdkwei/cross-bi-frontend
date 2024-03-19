/* eslint-disable no-undef */
import { precacheAndRoute, cleanupOutdatedCaches } from "workbox-precaching";
import { clientsClaim } from 'workbox-core';

const CACHE_NAME = import.meta.env.VITE_CACHE_NAME;
const API_KEY = import.meta.env.VITE_API_KEY;
const IS_DEV_MODE = import.meta.env.VITE_DEV_MODE;

cleanupOutdatedCaches();

if(!IS_DEV_MODE) {
  precacheAndRoute(self.__WB_MANIFEST)
}

self.skipWaiting();
clientsClaim();

const addResourcesToCache = async (resources) => {
  try {
    const cache = await caches.open(CACHE_NAME);
    await cache.addAll(resources);
  }
  catch(err){
    console.error(err);
  }
};

self.addEventListener('install', (event) => {
  event.waitUntil(addResourcesToCache([
    '/',
    'index.html',
    'src/assets',
    'src/styles'
  ]));
});

self.addEventListener('fetch', (event) => {
  let url = event.request.url;
  const isHTTP= url.startsWith('http');
  const isGETRequest = (event.request.method == 'GET');
  const isTimeFilterRequest = (url.includes('from') || url.includes('to'));

  if (!isHTTP || !isGETRequest || isTimeFilterRequest) {
    return;
  }

  event.respondWith(
    caches.open(CACHE_NAME).then(async (cache) => {
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
      });
    })
  );
});

self.addEventListener('push', (event) => {
  const pushData = event.data.text();
  const data = JSON.parse(pushData);

  event.waitUntil(
    self.registration.showNotification(data.title, { 
      body: data.body, 
      icon: '/pwa-192x192.png',
      vibrate: [200, 100, 200, 100, 200, 100, 200], 
      badge: '/pwa-192x192.png'
    })
  );
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  if(clients.openWindow){
    event.waitUntil(clients.openWindow('https://app.crossbi.de'));
  }
});