(function () {
    let filesToCache = [
        '/',
        '/css/styles.css',
        '/data/restaurants.json',
        '/img/1.jpg',
        '/img/2.jpg',
        '/img/3.jpg',
        '/img/4.jpg',
        '/img/5.jpg',
        '/img/6.jpg',
        '/img/7.jpg',
        '/img/8.jpg',
        '/img/9.jpg',
        '/img/10.jpg',
        '/js/dbhelper.js',
        '/js/main.js',
        '/js/restaurant_info.js',
        '/index.html',
        '/restaurant.html',
        '/css/responsive.css',
    ];


    let staticCacheName = 'cache-v1'
    self.addEventListener('install', event => {
        console.log('installed..');
        event.waitUntil(
            caches.open(staticCacheName)
            .then(cache => {
                return cache.addAll(filesToCache);
            })
        );
    })


    self.addEventListener('activate', event => {
        event.waitUntil(self.clients.claim());
    });


    self.addEventListener('fetch', function (event) {
        event.respondWith(
            caches.open('cache-v1').then(function (cache) {
                return cache.match(event.request).then(function (response) {
                    return response || fetch(event.request).then(function (response) {
                        cache.put(event.request, response.clone());
                        if (response) {
                            return response;
                        }

                    });
                });
            })
        );
    });
})();




























// self.addEventListener('activate', event => {
//     event.waitUntil(self.clients.claim());
// });

// self.addEventListener('fetch', event => {

//     event.respondWith(
//         caches.match(event.request)
//         .then(response => {
//              return response || fetch(event.request);
//         })
//         .catch(err => console.log(err))
//     );
// });