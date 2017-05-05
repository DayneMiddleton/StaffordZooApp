var BASE_PATH = '/staffordZoo/';
var CACHE_NAME = 'bgPWA-v14';
var TEMP_IMAGE_CACHE_NAME = 'temp-cache-v1';
var CACHED_URLS = [
 // HTML
    BASE_PATH + 'index.html',
    BASE_PATH + 'AfricanLion.html',
    BASE_PATH + 'AfricanPaintedDog.html',
    BASE_PATH + 'Anegadalguana.html',
    BASE_PATH + 'BaldEagle.html',
    BASE_PATH + 'Bird.html',
    BASE_PATH + 'BlackMamba.html',
    BASE_PATH + 'ContactUs.html',
    BASE_PATH + 'Falcon.html',
    BASE_PATH + 'FindUs.html',
    BASE_PATH + 'GrantsZebra.html',
    BASE_PATH + 'GreatHornedOwl.html',
    BASE_PATH + 'GuiraCuckoo.html',
    BASE_PATH + 'KomodoDragon.html',
    BASE_PATH + 'Mammals.html',
    BASE_PATH + 'MaylanianTiger.html',
    BASE_PATH + 'MeetTheAnimals.html',
    BASE_PATH + 'Offline.html',
    BASE_PATH + 'Reptiles.html',
    BASE_PATH + 'RiverTurtle.html',
    BASE_PATH + 'TodaysSchedule.html',
   
    
    
    // Images for favicons
    BASE_PATH + 'images/icons/android-icon-36x36.png',
    BASE_PATH + 'images/icons/android-icon-48x48.png',
    BASE_PATH + 'images/icons/android-icon-72x72.png',
    BASE_PATH + 'images/icons/android-icon-96x96.png',
    BASE_PATH + 'images/icons/android-icon-144x144.png',
    BASE_PATH + 'images/icons/android-icon-192x192.png',
    BASE_PATH + 'images/icons/favicon-32x32.png',

    //Images for pages
   
    BASE_PATH + 'images/icons/favicon.ico',
    BASE_PATH + 'images/icons/favicon-16x16.png',
    BASE_PATH + 'images/icons/favicon-32x32.png',
    BASE_PATH + 'images/icons/favicon-96x96.png',
    BASE_PATH + 'images/icons/ms-icon-70x70.png',
    BASE_PATH + 'images/icons/ms-icon-144x144.png',
    BASE_PATH + 'images/icons/ms-icon-150x150.png',
    BASE_PATH + 'images/icons/ms-icon-310x310.png',
    BASE_PATH + 'images/icons/favicon.ico',
    BASE_PATH + 'images/Events/AfricanLion.png',
    BASE_PATH + 'images/Events/BirdOnGlove.jpg',
    BASE_PATH + 'images/Events/HoldSnake.jpg',
    BASE_PATH + 'images/offlinemap.jpg',
    BASE_PATH + 'images/AfricanLion.PNG',
    BASE_PATH + 'images/AfricanPaintedDog.PNG',
    BASE_PATH + 'images/BaldEagle.jpg',
    BASE_PATH + 'images/Bird.PNG',
    BASE_PATH + 'images/Birdfly.jpg',
    BASE_PATH + 'images/Buzzard.jpg',
    BASE_PATH + 'images/Buzzard.jpg',
    BASE_PATH + 'images/BuzzardImage.jpg',
    BASE_PATH + 'images/Cheetah.jpg',
    BASE_PATH + 'images/ContactUs.PNG',
    BASE_PATH + 'images/Crocodile.PNG',
    BASE_PATH + 'images/Cuckoo.jpg',
    BASE_PATH + 'images/EagleImage.jpg',
    BASE_PATH + 'images/Falcon.PNG',
    BASE_PATH + 'images/GrantsZebra.PNG',
    BASE_PATH + 'images/GreatHornedOwl.jpg',
    BASE_PATH + 'images/HawkImage.PNG',
    BASE_PATH + 'images/Iguana.PNG',
    BASE_PATH + 'images/Komodo.PNG',
    BASE_PATH + 'images/LionImage.jpg',
    BASE_PATH + 'images/Mammals.PNG',
    BASE_PATH + 'images/Map.PNG',
    BASE_PATH + 'images/MaylanianTiger.PNG',
    BASE_PATH + 'images/MeetTheAnimals.PNG',
    BASE_PATH + 'images/Owl.PNG',
    BASE_PATH + 'images/OwlHome.jpg',
    BASE_PATH + 'images/Reptiles.PNG',
    BASE_PATH + 'images/RiverTurtle.PNG',
    BASE_PATH + 'images/SeaHorseImage.jpg',
    BASE_PATH + 'images/SnakeClose.PNG',
    BASE_PATH + 'images/SnakeImage.jpg',
    BASE_PATH + 'images/Tiger.jpg',
    BASE_PATH + 'images/TodaysSchedule.PNG',

    
     
    // JavaScript
    BASE_PATH + 'offline-map.js',
    BASE_PATH + 'scripts.js',
    BASE_PATH + 'js/menu.js',
    BASE_PATH + 'js/app.js',
    
    
   
    // Manifest
    BASE_PATH + 'manifest.json',
   
    BASE_PATH + 'Events.json',
  // CSS and fonts
    'https://fonts.googleapis.com/css?family=Roboto:regular,bold,italic,thin,light,bolditalic,black,medium&lang=en',
    'https://fonts.googleapis.com/icon?family=Material+Icons',
    BASE_PATH + 'min-style.css',
    BASE_PATH + 'styles.css',
   

  
];


var googleMapsAPIJS = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyB4r037t9M4xqaHF8RR2p2mQqiWhgmeeAk&callback=initMap';

self.addEventListener('install', function(event) {
  // Cache everything in CACHED_URLS. Installation fails if anything fails to cache
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      return cache.addAll(CACHED_URLS);
    })
  );
});

self.addEventListener('fetch', function(event) {
  var requestURL = new URL(event.request.url);
  // Handle requests for index.html
  if (requestURL.pathname === BASE_PATH + 'TodaysSchedule.html') {
    event.respondWith(
      caches.open(CACHE_NAME).then(function(cache) {
        return cache.match('TodaysSchedule.html').then(function(cachedResponse) {
          var fetchPromise = fetch('TodaysSchedule.html').then(function(networkResponse) {
            cache.put('TodaysSchedule.html', networkResponse.clone());
            return networkResponse;
          });
          return cachedResponse || fetchPromise;
        });
      })
    );

      
 // Handle requests for Google Maps JavaScript API file
  } else if (requestURL.href === googleMapsAPIJS) {
    event.respondWith(
      fetch(
        googleMapsAPIJS+'&'+Date.now(),
        { mode: 'no-cors', cache: 'no-store' }
      ).catch(function() {
        return caches.match('offline-map.js');
      })
    );
      
    // Handle requests for events JSON file
  } else if (requestURL.pathname === BASE_PATH + 'events.json') {
    event.respondWith(
      caches.open(CACHE_NAME).then(function(cache) {
        return fetch(event.request).then(function(networkResponse) {
          cache.put(event.request, networkResponse.clone());
          return networkResponse;
        }).catch(function() {
          return caches.match(event.request);
        });
      })
    );
  } else if (requestURL.href === EventsJSON) {
    event.respondWith(
      caches.open(CACHE_NAME).then(function(cache) {
        return fetch(event.request).then(function(networkResponse) {
          cache.put(event.request, networkResponse.clone());
          caches.delete(TEMP_IMAGE_CACHE_NAME);
          return networkResponse;
        }).catch(function() {
          return caches.match(event.request);
        });
      })
    );
  // Handle requests for event images.
  } else if (requestURL.pathname.includes('/Events/')) {
    event.respondWith(
      caches.open(CACHE_NAME).then(function(cache) {
        return cache.match(event.request).then(function(cacheResponse) {
          return cacheResponse||fetch(event.request).then(function(networkResponse) {
            cache.put(event.request, networkResponse.clone());
            return networkResponse;
          }).catch(function() {
            return cache.match('images/Events/AfricanLion.PNG');
            return cache.match('images/Events/BirdOnGlove.jpg')
            return cache.match('images/Events/HoldSnake.jpg')
          });
        });
      })
    );
  // 
  }  else if (
    CACHED_URLS.includes(requestURL.href) ||
    CACHED_URLS.includes(requestURL.pathname)
  ) {
    event.respondWith(
      caches.open(CACHE_NAME).then(function(cache) {
        return cache.match(event.request).then(function(response) {
          return response || fetch(event.request);
        });
      })
    );
  }
});


self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (cacheName.startsWith('gih-cache') && CACHE_NAME !== cacheName) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});