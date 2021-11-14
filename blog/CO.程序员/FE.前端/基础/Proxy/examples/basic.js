const target = [1,2,3,4,5]
const proxy = new Proxy(target, {
  get (target, prop) {
    if (prop === '-1') {
      return target[target.length - 1]
    }
    return target[prop]
  }
})

console.log(proxy[-1])

const proxy1 = new Proxy([], {
  set(target, prop, value) {
    if (typeof value === 'number') {
      target[prop] = value
    }
    return true
  }
})
