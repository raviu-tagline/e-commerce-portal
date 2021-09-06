const cacheData = "eCommerceCache"
this.addEventListener("install", (e) => {
    e.waitUntil(
        caches.open(cacheData).then((cache) => {
            cache.addAll([
                "http://localhost:3000/static/js/bundle.js",
                "http://localhost:3000/static/js/vendors~main.chunk.js",
                "http://localhost:3000/static/js/main.chunk.js",
                "http://localhost:3000/logo.png",
                "http://localhost:3000/images/product_images/931x785.png",
                "http://localhost:3009/Category",
                "http://localhost:3009/SubCategory",
                "http://localhost:3009/Product?_limit=12&_page=1",
                "/index.html",
                "/",
                "http://localhost:3000/login",
                "http://localhost:3000/admin"
            ])
        })
    )
})

this.addEventListener("fetch", (e) => {
    if (!navigator.onLine) {
        e.respondWith(
            caches.match(e.request).then(result => {
                if (result) {
                    return result
                } else {
                    let cloneUrl = e.request.clone()
                    return fetch(cloneUrl)
                }
            })
        )
    }
})