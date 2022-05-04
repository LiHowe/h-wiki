navigator.serviceWorker.register('./sw.js').then(function(registration) {
  console.log('ServiceWorker registration successful with scope: ', registration.scope, registration);
}).catch(function(err) {
  console.log('ServiceWorker registration failed: ', err);
});

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
