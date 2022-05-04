const cacheUrls = [
  'theme/theme-default.css',
  './error.html'
]

const CACHE_NAME = 'style-v2'

self.addEventListener('install', e => {
  self.skipWaiting()
  console.log('main worker installed!', e)
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(cacheUrls))
  )
})

self.addEventListener('activate', e => {
  caches.keys().then(keys => {
    return Promise.all(keys.map(key => {
      if (keys.indexOf(key) !== -1) {
        return caches.delete(key)
      }
    }))
  })
})

self.addEventListener('fetch', e => {
  function handleRequest(request) {
    if (request.headers.get('offline') === '1') {
      console.log('cache request:', e.request.url)
      return fetch(request).then(res => {
        return caches.open(CACHE_NAME).then(cache => {
          cache.put(request, res.clone())
          return res
        })
      })
    } else {
      return fetch(request)
    }
  }
  e.respondWith(
    caches.match(e.request).then(res => {
      if(res) return res
      return handleRequest(e.request)
    }).catch(_ => {
      return caches.match('./error.html')
    })
  )
})

