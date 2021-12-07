---
WIP: false
---



# Proxy

首先, 我们先来看看`Proxy`的作用

`Proxy` -- 代理对象， 用于包装另一个对象， **拦截其读取属性、写入属性或者其他操作**， 相当于为对象包裹了一层拦截器

<img src="https://i.loli.net/2021/11/14/XTj5oQKnrLAtvU2.png" style="zoom: 67%;" />

## 使用

构建Proxy对象的语法为

```javascript
const proxy = new Proxy(target, handler)
```

+ `target`: 需要被代理的**对象(可以是函数)**
+ `handler`: 被代理对象的捕获器(trap)配置

### 基础使用

举个例子

```javascript
const target = {}
// 空代理
const proxy = new Proxy(target, {})
// 下面我们为proxy赋值
proxy.a = 1
// 因为我们没有为target设置任何代理配置， 相当于一个空代理，所以对代理对象proxy的赋值会如实转发给原对象target
console.log(target)
// -> {a: 1}
console.log(proxy)
// -> Proxy {a: 1}
```

上面的例子中我们创建了一个空的代理对象, 未设置任何捕获器, 所以它不会对目标对象的操作做任何处理，保留源对象默认行为.



### handler可配置捕获器一览

+ `get`: 读取操作捕获器

+ `set`: 赋值操作捕获器

+ `has`: `in`操作符捕获器

  

+ `getPrototypeOf`: [`Object.getPrototypeOf`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/GetPrototypeOf) 方法的捕捉器。

+ `setPrototypeOf`: [`Object.setPrototypeOf`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/setPrototypeOf) 方法的捕捉器。



+ `ownkeys`: [`Object.getOwnPropertyNames`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/getOwnPropertyNames) 方法和 [`Object.getOwnPropertySymbols`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/getOwnPropertySymbols) 方法的捕捉器

+ `defineProperty`: [`Object.defineProperty`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty) 方法的捕捉器。

+ `deleteProperty`: [`delete`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/delete) 操作符的捕捉器。

+ `getOwnPropertyDescriptor`: [`Object.getOwnPropertyDescriptor`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/getOwnPropertyDescriptor) 方法的捕捉器。

  

+ `isExtensible`: [`Object.isExtensible`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/isExtensible) 方法的捕捉器。

+ `preventExtensions`: [`Object.preventExtensions`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/preventExtensions) 方法的捕捉器。

+ `apply`: 函数调用操作的捕捉器。

+ `construct`: [`new`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/new) 操作符的捕捉器。



> 注: 对创建的Proxy对象进行操作才会触发这些捕获器, 对源对象操作不会触发任何捕获器.

### get捕获器

通过配置`handler`对象的`get`方法来为对象的**读取操作(底层的[[get]])**设置代理

`get(target, prop, receiver): any`

+ `target`: 被代理对象
+ `prop`: 将要被读取的属性名称
+ `receiver`: 

下面我们来创建一个代理了其取值(`get`)方法的代理对象, 比如数组对象取`-1`下标值， 我们让他返回数组最后一个元素

```javascript
const proxy = new Proxy([1,2,3,4,5], {
  get (target, prop) {
    // 这里 prop 接收到的属性为 string | symbol 类型
    if (prop === '-1') {
      return target[target.length - 1]
    }
    return target[prop]
  }
})

console.log(proxy[-1])  // -> 5
proxy.push(6)
console.log(proxy[-1]) // -> 6
```

> 注: prop接收到属性名为字符串类型, 像数组下标这样的数字也会被转化为string (Symbol依旧是symbol)



### set捕获器

通过配置`handler`的`set`方法可以为对象的**赋值操作(底层的[[set]])**设置代理

`set(target, prop, value, receiver): boolean`

+ `target`: 被代理对象
+ `prop`: 将要被赋值的属性名称
+ `value`: 被赋值属性的值
+ `receiver`: 

比如我们让一个数组只可以放入数字类型(`number`)的值

```javascript
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

proxy.push('1') // -> TypeError: This array can only accept numbers
```

在上面的例子中, 我们将 `throw TypeError`去掉, 即只有在`value`为`number`的时候才返回`true`, 其余不操作

```javascript
const proxy = new Proxy([], {
  set(target, prop, value) {
    if (typeof value === 'number') {
      target[prop] = value
      return true
    }
  }
})

proxy.push('1') // -> TypeError: 'set' on proxy: trap returned falsish for property '0'
```

由此我们可以看出, 代理set方法, **需要返回`true`来表明值已经被成功设置**, 否则将会触发`TypeError`

那么, 我们将`return true`直接提到`if`外再测试一下

```javascript {6}
const proxy = new Proxy([], {
  set(target, prop, value) {
    if (typeof value === 'number') {
      target[prop] = value
    }
    return true
  }
})

proxy.push('1')
console.log(proxy[0]) // -> undefined
console.log(proxy.length) //-> 1
```



### has捕获器

`has(target, p): boolean`

+ `target`: 被代理对象
+ `p`: 对象属性

该捕获器用于拦截

`key in object`

使用JSInfo的例子来说明

该例子构建一个语法糖, 使用`in`操作符来判断一个数字是否在范围内

```javascript
let range = {
  start: 1,
  end: 10
}

range = new Proxy(range, {
  has(target, prop) {
    return prop >= target.start && prop <= target.end
  }
})

alert(5 in range); // true
alert(50 in range); // false
```



### ownkeys捕获器

通过配置`handler`的`ownkeys`方法可以为对象的**获取属性列表(底层的[[OwnPropertyKeys]])**设置代理

`ownkeys(target): Array<String|Symbol>`

+ `target`: 被代理对象

该捕获器用于拦截:

- `Object.getOwnPropertyNames(obj)`: 返回对象所有非 Symbol 键
- `Object.getOwnPropertySymbols(obj)`: 返回对象所有 Symbol 键
- `Object.keys/values()`: 返回对象带有 `enumerable` 标志的非 Symbol 键/值
- `for..in`: 循环遍历对象所有带有 `enumerable` 标志的非 Symbol 键，以及原型对象的键。

比如

+ 不想让`_`开头的属性被枚举出来

```javascript
const obj = { a: 1, b: 2, _a: 3 }
const proxy = new Proxy(obj, {
  ownKeys(target) {
    return Object.keys(target).filter(key => !key.startsWith('_'))
  }
})
for(let key in proxy) console.log(key) // -> a b
console.log(Object.getOwnPropertyNames(proxy)) // -> [ 'a', 'b' ]
console.log(Object.keys(proxy)) // -> [ 'a', 'b' ]
console.log(Object.values(proxy)) // -> [ 1, 2 ]
```

+ 返回不存在的键, 需要搭配着[`getOwnPropertyDescriptor`](###getOwnPropertyDescriptor捕获器)使用

```javascript {10}
const obj = {}
const proxy = new Proxy(obj, {
  ownKeys(target) {
    return [ 'a', 'b' ]
  },
  getOwnPropertyDescriptor() {
    // 所有属性均可枚举,配置,写入
    return {
      enumerable: true,
      configurable: true,
      writable: true,
    }
  }
})
console.log(Object.keys(proxy)) // -> [ 'a', 'b' ]
console.log(Object.values(proxy)) // -> [ undefined, undefined ]
console.log(Object.getOwnPropertyNames(proxy)) // -> [ 'a', 'b' ]
proxy.a = '1'
console.log(proxy.a) // -> 1, 如果writable设置为false, 则打印 undefined
console.log(obj) // -> {}, 不会反映到源对象, 可以设置set捕获器实现虚拟属性反映到源对象
```



### getOwnPropertyDescriptor捕获器

`getOwnPropertyDescriptor(target: {}, p: string | symbol): PropertyDescriptor`

+ `target`: 被代理对象
+ `p`: 对象属性

该捕获器用于拦截

- [`Object.getOwnPropertyDescriptor()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/getOwnPropertyDescriptor)





### deleteProperty捕获器

`deleteProperty(target, p): boolean`

+ `target`: 被代理对象
+ `p`: 对象待删除属性

该捕获器用于拦截

`delete object[key]`

> 注: 如果被代理对象的待删除的属性是不可配置的(`configurable: false`), 则会抛出`TypeError`

```javascript
const obj = { a: 1, b: 2 }
Object.defineProperty(obj, 'c', {
	configurable: false,
  enumerable: true,
  value: 3
})
const proxy = new Proxy(obj, {
  deleteProperty(target, p) {
    console.log('删除属性:', p)
    if (p === 'c') { // 只删除c属性
      delete target[p]
    }
    return true // '假'删除成功, 相当于把对象的每个属性通过defineProperty定义为configurable: false一样
  }
})
console.log('原始属性', Object.keys(proxy)) // ->  [ 'a', 'b', 'c' ]
delete proxy.a // -> 删除属性: a 
delete proxy.b // -> 删除属性: b 
console.log('删除a, b后', Object.keys(proxy)) // -> 删除a, b后 [ 'a', 'b', 'c' ]
delete proxy.c // -> 删除属性: c 
// -> TypeError: 'deleteProperty' on proxy: trap returned truish for property 'c' which is non-configurable in the proxy target
```



### apply捕获器

`apply(target, thisArg, args)`

+ `target`: 被代理对象
+ `thisArg`: this值
+ `args`: 方法参数列表

该捕获器用于拦截方法的`apply`

比如我们来实现一个`delay`函数

```javascript
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

delay(test, 1000)() // -> test \n Delay: 1.001s
```

> 关联阅读:
>
> + 如何实现一个准确的定时器
> + apply, bind, call的区别以及用法



### construct捕获器

`construct(target, args): Object`

+ `target`: 被代理对象
+ `args`: 构造函数参数列表

比如, 捕获构造函数并为其设置固定参数值

```javascript
function User (name, age) {
  this.name = name
  this.age = age
}

const UserProxy = new Proxy(User, {
  construct(target, args) {
    console.log('target is', target, 'args is', args) // -> target is [Function: User] args is [ 'jojo', 20 ]
    args.length = 1
    return new target(...args, 18)
  }
})

console.log(new UserProxy('jojo', 20)) // -> User { name: 'test', age: 18 }
console.log(UserProxy.length) // -> 2, 构造函数接收的参数数量
```



### 撤销代理

语法: 

```javascript
let { proxy, revoke } = Proxy.revocable(target, handler)
```

+ proxy: 目标对象的代理对象
+ revoke: 关闭代理对象的函数(取消对象与代理对象间的连接)

例子

```javascript
const user = {
  name: 'howe'
}
const { proxy, revoke } = Proxy.revocable(user, {})
console.log(proxy.name) // howe
revoke()
console.log(proxy.name) // Uncaught TypeError: Cannot perform 'get' on a proxy that has been revoked
```

revoke之后, proxy的内置属性`[[IsRevoked]]`将会被置为`true`

> 我们可以通过一个`WeakMap`来存储proxy和对应的revoke函数
>
> ```javascript
> const revokes = new WeakMap()
> const user = {
>   name: 'howe'
> }
> const { proxy, revoke } = Proxy.revocable(user, {})
> revokes.set(proxy, revoke)
> console.log(proxy.name) // howe
> revokes.get(proxy)() // <- revoke
> console.log(proxy.name) // Uncaught TypeError: Cannot perform 'get' on a proxy that has been revoked
> ```
>
> 这样的好处是, 我们在有需要的时候能够通过proxy来找到对应的revoke函数, 而不需要一直携带revoke, 又因为使用的是`weakmap`, 不会影响垃圾回收机制.



## 总结

+ 代理对象相当于在原对象外面**包裹了一层对象**, 在访问或对原对象操作的时候需要经过代理层进行相应处理, 如果没有对应处理方法则会直接使用原对象的方法进行处理.

+ 代理对象也可以代理代理对象(套娃)

+ IE浏览器不支持(应该没人用IE了吧)

+ 代理对象会保持原对象类型

+ Proxy的局限性

  + 在代理JS内置对象(如: `Map`, `Set`, `Date`, `Promise`等)的时候使用内置方法将会失败

    ```javascript
    const map = new Map()
    const proxy = new Proxy(map, {})
    proxy.set('a', 1) // Uncaught TypeError: Method Map.prototype.set called on incompatible receiver #<Map>
    ```

    解决方案:

    ```javascript
    const map = new Map()
    const proxy = new Proxy(map, {
      get(target, prop) {
        let val = Reflect.get(...arguments)
        return typeof val === 'function' ? val.bind(target) : val
      }
    })
    proxy.set('a', 1)
    console.log(proxy.get('a')) // 1
    ```

    

  + 私有字段问题

    ```javascript
    class User {
      #name = 'howe'
      
      getName () {
        return this.#name
      }
    }
    const user = new User()
    const userP = new Proxy(user, {})
    
    console.log(user.getName()) // howe
    console.log(userP.getName()) // Uncaught TypeError: Cannot read private member #name from an object whose class did not declare it
    ```

    解决方案同内置对象处理方法一样

    ```javascript
    const proxy = new Proxy(user, {
      get(target, prop) {
        let val = Reflect.get(...arguments)
        return typeof val === 'function' ? val.bind(target) : val
      }
    })


+ 通过`Proxy.revocable()`方法来创建可撤销的代理



## 参考链接

+ [Proxy 和 Reflect (javascript.info)](https://zh.javascript.info/proxy)
+ [Proxy - JavaScript | MDN (mozilla.org)](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy)

