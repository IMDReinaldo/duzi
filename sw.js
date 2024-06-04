
//This is the "Offline copy of pages" service worker

// const CACHE = "pwabuilder-offline";

// importScripts('https://storage.googleapis.com/workbox-cdn/releases/5.1.2/workbox-sw.js');

// self.addEventListener("message", (event) => {
  // if (event.data && event.data.type === "SKIP_WAITING") {
    // self.skipWaiting();
  // }
// });

// workbox.routing.registerRoute(
  // new RegExp('/*'),
  // new workbox.strategies.StaleWhileRevalidate({
    // cacheName: CACHE
  // })
// );

// const cacheName = 'unity-webgl-cache-v1';
// const contentToCache = [
  // '/index.html',
  // '/Build/02.framework.js',
  // '/Build/02.loader.js',
  // '/Build/02.wasm',
  // '/Build/02.data',
  // '/TemplateData/style.css'
// ];

// self.addEventListener('install', (event) => {
  // event.waitUntil(
    // caches.open(cacheName).then((cache) => {
      // return cache.addAll(contentToCache);
    // })
  // );
// });

// self.addEventListener('activate', (event) => {
  // const cacheWhitelist = [cacheName];
  // event.waitUntil(
    // caches.keys().then((keyList) =>
      // Promise.all(keyList.map((key) => {
        // if (!cacheWhitelist.includes(key)) {
          // return caches.delete(key);
        // }
      // }))
    // )
  // );
// });

// self.addEventListener("fetch", e => {
 // e.respondWith(
     // caches.match(e.request).then(response => {
         // if(response){
             // console.log('[Service Worker] Récupération de la ressource: '+e.request.url);
             // return response
         // } else {
             // return fetch(e.request).then((response) => {
                 // return caches.open(cacheName).then((cache) => {
                     // console.log('[Service Worker] Mise en cache de la nouvelle ressource: '+e.request.url)
                     // cache.put(e.request, response.clone())
                     // return response
                 // })
             // })
         // }
     // })
 // )
// })   

const cacheName = 'unity-webgl-cache-v1';
const contentToCache = [
   '/02/',
   '/Build/',    
   '/TemplateData/',
   '/index.html',
   '/Build/02.framework.js',
   '/Build/02.loader.js',
   '/Build/02.wasm',
   '/Build/02.data',
   '/TemplateData/style.css'
];

self.addEventListener('install', function (event) {
  event.waitUntil(
    caches.open('mysite-static-v3').then(function (cache) {
      return cache.addAll([
    '/02/',
   '/Build/',    
   '/TemplateData/',
   '/index.html',
   '/Build/02.framework.js',
   '/Build/02.loader.js',
   '/Build/02.wasm',
   '/Build/02.data',
   '/TemplateData/style.css'
      ]);
    }),
  );
});

self.addEventListener("fetch", e => {
 e.respondWith(
     caches.match(e.request).then(response => {
         if(response){
             console.log('[Service Worker] Récupération de la ressource: '+e.request.url);
             return response
         } else {
             return fetch(e.request).then((response) => {
                 return caches.open(cacheName).then((cache) => {
                     console.log('[Service Worker] Mise en cache de la nouvelle ressource: '+e.request.url)
                     cache.put(e.request, response.clone())
                     return response
                 })
             })
         }
     })
 )
})   

self.addEventListener('activate', (event) => {
  const cacheWhitelist = [cacheName];
  event.waitUntil(
    caches.keys().then((keyList) =>
      Promise.all(keyList.map((key) => {
        if (!cacheWhitelist.includes(key)) {
          return caches.delete(key);
        }
      }))
    )
  );
});


