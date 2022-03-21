const data = { text: 'hello reactive!' }

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
  document.querySelector('#main')!.innerHTML = `<h1>${obj.text}</h1>`
})
