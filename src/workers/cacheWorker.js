const cacheName = process.env.CACHE_VERSION;

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(cacheName).then((cache) => {
      return cache.addAll(JSON.parse(process.env.CACHE_FILES));
    }).then(() => {
      self.skipWaiting();
    })
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(cacheNames => {
        return cacheNames.filter(name => cacheName !== name);
      })
      .then(cachesToDelete => {
        if (cachesToDelete.length > 0) {
          require('idb-keyval').clear();
        }
        return Promise.all(cachesToDelete.map(cacheToDelete => {
          return caches.delete(cacheToDelete);
        }));
      })
      .then(() => {
        return self.clients.claim();
      })
      .then(() => {
        self.clients.matchAll().then(function (clients) {
          clients.forEach(client => {
            client.postMessage({
              msg: 'pageNeedsRefresh'
            });
          });
        });
      })
  );
});

self.addEventListener('fetch', function (event) {
  if (!event.request.url.startsWith(self.location.origin)) {
    return;
  }

  event.respondWith(
    caches.match(event.request).then(function (response) {
      if (response) {
        return response;
      }

      const indexRequest = new Request('/index.html');
      return caches.match(indexRequest);
    })
  );
});
