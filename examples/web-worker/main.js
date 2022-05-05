const WorkerVersion = '0.0.1' // 或者请求最新
const KEY_SERVICE_WORKER = 'key-sw'
navigator.serviceWorker.register('./sw.js').then(function(registration) {
  console.log('ServiceWorker registration successful with scope: ', registration.scope, registration);

  // 版本更新
  // const v = localStorage.getItem(KEY_SERVICE_WORKER)
  // if (v !== WorkerVersion) {
  //   registration.update().then(_ => {
  //     localStorage.setItem(KEY_SERVICE_WORKER, WorkerVersion)
  //   })
  // }

  registration.addEventListener('updatefound', function() {
    const installingWorker = registration.installing;
    console.log('A new service worker is being installed:',
      installingWorker);
    const res = confirm('发现新的worker, 是否更新')
    res && registration.update().then(() => {
      console.log('worker update success!')
      location.reload()
    })
  });

}).catch(function(err) {
  console.log('ServiceWorker registration failed: ', err);
});

Notification.requestPermission(res => {
  if (res === 'granted') {
    navigator.serviceWorker.ready.then(registration => {
      registration.showNotification('Vibration Sample', {
        body: 'Service Worker注册成功!',
        vibrate: [200, 100, 200, 100, 200, 100, 200],
        tag: 'Service Notification'
      });
    })
  }
})


const btn = document.createElement('button')
btn.addEventListener('click', () => {
  const headers = new Headers()
  headers.set('offline', '1')
  fetch('./theme/theme-dark.css', {
    headers
  }).then(async res => {
    const fileContent = await res.text()
    console.log('改变主题', 'dark')
    const styleElement = document.createElement('style')
    styleElement.innerHTML = fileContent
    styleElement.setAttribute('rel', 'stylesheet')
    document.head.appendChild(styleElement)
  })
})
btn.innerHTML = '改变主题(缓存)'
document.body.appendChild(btn)

const btn1 = btn.cloneNode()
btn1.innerHTML = '改变主题'
btn1.addEventListener('click', () => {
  fetch('./theme/theme-light.css').then(async res => {
    const fileContent = await res.text()
    console.log('改变主题', 'light')
    const styleElement = document.createElement('style')
    styleElement.innerHTML = fileContent
    styleElement.setAttribute('rel', 'stylesheet')
    document.head.appendChild(styleElement)
  })
})
document.body.appendChild(btn1)

// navigator.serviceWorker.register('./sw.js', {
//   scope: './subpage'
// }).then(function(registration) {
//   console.log('ServiceWorker registration successful with scope: ', registration.scope, registration);
// }).catch(function(err) {
//   console.log('ServiceWorker registration failed: ', err);
// });
//
