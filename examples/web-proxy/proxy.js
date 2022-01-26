function exp (name, cb) {
  return () => {
    console.log(name)
    try {
      cb()
    } catch (e) {
      console.error(e)
    }
  }
}

exp('为数组添加功能', () => {
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
})


exp('为数组只允许接收number类型的数组添加功能', () => {
  const proxy = new Proxy([], {
    set(target, prop, value) {
      if (typeof value === 'number') {
        target[prop] = value
        return true
      } else {
        throw TypeError('This array can only accept numbers')
      }
    }
  })
  proxy.push('1')
  proxy.push(2)
  console.log(proxy)
})

exp('只返回true的set代理', () => {
  const proxy = new Proxy([], {
    set(target, prop, value) {
      if (typeof value === 'number') {
        target[prop] = value
      }
      return true
    }
  })
  
  proxy.push('123')
  console.log('proxy[0]: ', proxy[0])
})

exp('prop类型测试', () => {
  const proxy = new Proxy({
    [Symbol(1)]: 1
  }, {
    get (target, prop) {
      console.log('getting prop:', prop, ', type is:', typeof prop)
      return target[prop]
    }
  })
  
  console.log(proxy, proxy[true])
})

exp('ownkeys捕获器: 隐藏属性', () => {
  const obj = { a: 1, b: 2, _a: 3 }
  const proxy = new Proxy(obj, {
    ownKeys(target) {
      return Object.keys(target).filter(key => !key.startsWith('_'))
    }
  })
  for(let key in proxy) console.log(key)
  console.log(Object.getOwnPropertyNames(proxy))
  console.log(Object.keys(proxy))
  console.log(Object.values(proxy))
})

exp('ownkeys捕获器: 虚拟属性', () => {
  const obj = {}
  const proxy = new Proxy(obj, {
    ownKeys(target) {
      return [ 'a', 'b' ]
    },
    getOwnPropertyDescriptor(target, p) {
      return {
        enumerable: true,
        configurable: true,
        writable: true,
      }
    },
    deleteProperty(target, p) {
      console.log('delete:', p)
      return true
    },
  })
  console.log(Object.keys(proxy))
  console.log(Object.values(proxy))
  console.log(Object.getOwnPropertyNames(proxy))
  proxy.a = '1'
  console.log(proxy.a) // 如果writable不配置或者为false, 则打印undefined
})

exp('deleteProperty捕获器, 只允许删除a属性', () => {
  const obj = { a: 1, b: 2 }
  Object.defineProperty(obj, 'c', {
    configurable: false,
    enumerable: true,
    value: 3
  })
  const proxy = new Proxy(obj, {
    deleteProperty(target, p) {
      console.log('删除属性:', p)
      if (p === 'c') {
        delete target[p]
      }
      return true
    }
  })
  console.log('原始属性', Object.keys(proxy))
  delete proxy.a
  delete proxy.b
  console.log('删除a, b后', Object.keys(proxy))
  delete proxy.c
  console.log('源对象属性', Object.keys(obj))
})


exp('has捕获器', () => {
  let range = {
    start: 1,
    end: 10
  };
  
  range = new Proxy(range, {
    has(target, prop) {
      return prop >= target.start && prop <= target.end
    }
  })
  
  alert(5 in range); // true
  alert(50 in range); // false
})


exp('apply捕获器, 实现delay', () => {
  function delay (fn, time) {
    return new Proxy(fn, {
      apply(target, thisArg, args) {
        console.time('Delay')
        setTimeout(() => {
          target.apply(thisArg, args)
          console.timeEnd('Delay')
        }, time)
      }
    })
  }

  function test () {
    console.log('test')
  }

  delay(test, 1000)()
})


exp('construct捕获器: ES5', () => {
  function User (name, age) {
    this.name = name
    this.age = age
  }

  const UserProxy = new Proxy(User, {
    construct(target, args) {
      console.log('target is', target, 'args is', args)
      args.length = 1
      return new target(...args, 18)
    }
  })

  console.log(new UserProxy('jojo', 20))
  console.log(UserProxy.length)
  console.log(typeof User)
  console.log(typeof UserProxy)
})

exp('construct捕获器: ES6', () => {
  class User {
    constructor (name, age) {
      this.name = name
      this.age = age
    }
  }

  const UserProxy = new Proxy(User, {
    construct(target, args) {
      console.log('target is', target, 'args is', args)
      args.length = 1
      return new target(...args, 18)
    }
  })

  console.log(new UserProxy('jojo', 20))
  console.log(UserProxy.length)
  console.log(typeof User)
  console.log(typeof UserProxy)
})
