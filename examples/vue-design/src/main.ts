import './style.css'

const data = {
  text: 'hello reactive!',
  flag: false
}

// 用来存储副作用函数 effects, 以目标对象为key
const bucket = new WeakMap()

// 存储当前激活的副作用函数
let activeEffect

const obj = new Proxy(data, {
  get(target, key) {
    if (!activeEffect) return
    let depsMap = bucket.get(target)
    if (!depsMap) bucket.set(target, (depsMap = new Map()))
    let deps = depsMap.get(key)
    if (!deps) depsMap.set(key, (deps = new Set()))
    deps.add(activeEffect)

    return target[key]
  },
  set(target, key, value) {
    target[key] = value
    const depsMap = bucket.get(target)
    if (!depsMap) return
    const effects = depsMap.get(key)
    effects.forEach(fn => fn())
    return true
  }
})

function effect(fn) {
  activeEffect = fn
  fn()
}

effect(() => {
  document.querySelector('#app')!.innerHTML = `<h1>${obj.flag ? obj.text : 'No Flag'}</h1>`
})

const btn = document.createElement('button')
btn.addEventListener('click', () => {
  obj.text = `Hello ${Math.round(Math.random() * 10)}`
})
btn.innerHTML = 'Change Text'
document.body.appendChild(btn)
