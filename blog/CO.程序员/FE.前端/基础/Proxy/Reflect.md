# Reflect

Reflect, 熟悉Java的同学可能会知道这个对象所代表的意思, 即, **在程序运行的时候, 我们可以通过该对象来获取对象自身的信息**

听起来跟直接调用`对象.属性`没什么区别.

下面我们来详细的讲解一下Reflect对象的作用



首先, 我们先来看下Reflect都提供了哪些静态方法

每个方法与Proxy的方法名称及参数都保持一致.

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



我们来通过一个例子了解一下Reflect的作用

```javascript
const c = {}
Object.defineProperty(c, 'p', {
  enumerable: false
})
c[Symbol(2)] = 'a'
console.log('key of c', Object.keys(c))
// key of c []
console.log('key of c', Object.getOwnPropertyNames(c))
// key of c ['p']
console.log('symbol key of c', Object.getOwnPropertySymbols(c))
// symbol key of c [Symbol(2)]
console.log('Reflect, key of c', Reflect.ownKeys(c))
// Reflect, key of c ['p', Symbol(2)]
```

