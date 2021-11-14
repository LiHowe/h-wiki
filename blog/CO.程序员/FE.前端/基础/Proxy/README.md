---
WIP: true
---



# Proxy & Reflect

首先， 我们先来看看`Proxy`的作用

`Proxy` -- 代理对象， 用于包装另一个对象， **拦截其读取属性、写入属性或者其他操作**， 相当于为对象包裹了一层拦截器

<img src="https://i.loli.net/2021/11/14/XTj5oQKnrLAtvU2.png" style="zoom: 67%;" />

## 使用

构建Proxy对象的语法为

```javascript
const proxy = new Proxy(target, handler)
```

+ `target`: 需要被代理的**对象(可以是函数)**
+ `handler`: 被代理对象的代理配置

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

上面的例子中我们创建了一个空的代理对象， 它不会对目标对象的赋值与取值做任何处理， 只是单纯的转发给目标对象。

### 代理目标对象的get方法

下面我们来创建一个代理了其取值(`get`)方法的代理对象, 比如数组对象取`-1`下标值， 我们让他返回数组最后一个元素

```javascript
const proxy = new Proxy([1,2,3,4,5], {
  get (target, prop) {
    // 这里 prop 接收到的属性为 string 类型
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

### 代理目标对象的set方法

比如我们让一个数组只可以放入数字类型(`number`)的值

```javascript
const proxy = new Proxy([], {
  set(target, prop, value) {
    if (typeof value === 'number') {
      target[prop] = value
      return true
    } else {
      return false
    }
  }
})

proxy.push('1')
console.log(proxy[0]) // -> Uncaught TypeError: 'set' on proxy: trap returned falsish for property '0'

```







## 总结
