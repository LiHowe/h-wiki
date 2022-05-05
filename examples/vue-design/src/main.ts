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
    // 得到对象对应的 key - effects map
    let depsMap = bucket.get(target)
    if (!depsMap) bucket.set(target, (depsMap = new Map()))
    // 得到对象对应key的effects set
    let deps = depsMap.get(key)
    if (!deps) depsMap.set(key, (deps = new Set()))
    debugger
    // 添加当前激活的副作用函数
    deps.add(activeEffect)

    return target[key]
  },
  set(target, key, value) {
    // 赋值
    target[key] = value
    // 获得对象对应的 key effects map
    const depsMap = bucket.get(target)
    debugger
    if (!depsMap) return true
    // 取得对应key的副作用函数数组
    const effects = depsMap.get(key)
    if (!effects) return true
    effects.forEach(fn => fn())
    return true
  }
})

function effect(fn) {
  const effectFn = () => {
    cleanup(effectFn)
    activeEffect = fn
    fn()
  }
  // 用来保存当前副作用函数的依赖,用于后面将副作用函数与其关联的依赖解绑.
  effectFn.deps = []
  effectFn()
}

// 用于 副作用函数与对象重新建立联系, 并清除旧联系来避免多余的副作用函数触发.
function cleanup(fn) {
  for (let i = 0; i < fn.deps.length; i++) {
    const deps = fn.deps[i]
    // 将副作用函数从依赖集合中移除
    deps.delete(fn)
  }
  // 清空副作用函数依赖
  fn.deps.length = 0
}

function track(target, key) {
  if (!activeEffect) return
  let depsMap = bucket.get(target)
  if (!depsMap) bucket.set(target, (depsMap = new Map()))
  let deps = depsMap.get(key)
  if (!deps) depsMap.set(key, (deps = new Set()))
  deps.add(activeEffect)
  // 为了与副作用数组建立联系
  activeEffect.deps.push(deps)

}

effect(() => {
  document.querySelector('#app')!.innerHTML = `<h1>${obj.flag ? obj.text : 'No Flag'}</h1>`
})

const btn = document.createElement('button')
btn.addEventListener('click', () => {
  obj.text = `Hello ${Math.round(Math.random() * 10)}`
  // obj.flag = !obj.flag
})
btn.innerHTML = 'Change Text'
document.body.appendChild(btn)


function traverse(value, seen = new Set()) {
  if (typeof value !== 'object' || value === null || seen.has(value)) return
  seen.add(value)
  for(const key in value) {
    traverse(value[key], seen)
  }
  return value
}
