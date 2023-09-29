const cacheName = 'crache_v1';
const API_KEY = '88c94c12-dce5-495c-a742-e213469f2052';

const addResourcesToCache = async (resources) => {
  const cache = await caches.open("crache_v1");
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