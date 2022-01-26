---
categories:
  - frontend
  - basic
titleSlug: function
title: Function
thumbnail: ''
series: JS基础
description: 暂无
wip: true
top: false
---
# Function

## call()

+ **作用**
  为了改变函数运行时的上下文(context), 即, 改变函数体内部this的指向
+ **语法**
  `fun.call(thisArg, arg1, arg2, ...)`
+ **例子**

```javascript
  // 简单示例
  const a = {
    name: 'a',
    word: 'a word',
    speak: function() {
      console.log(this.word)
    }
  }
  const b = {
    name: 'b',
    word: 'b word'
  }
  a.speak.call(b) // ==> b word
```

```javascript
  // 调用父构造函数
  function Product(name, price) {
    this.name = name;
    this.price = price;
  }
  function Toy(name, price) {
    Product.call(this, name, price);
    this.category = 'Toy'
  }
  const toy = new Toy('t', 50)
```

```javascript
  // 调用匿名函数
  [
    {
      name: 'test1',
      value: 't1'
    },
    {
      name: 'test2',
      value: 't2'
    }
  ].forEach(item => {
    (function() {
      this.print = function() {
        console.log(this.name, this.value)
      }
      this.print()
    }).call(item)
  })
  // => test1 t1 test2 t2
```

```javascript
  // this指向
 const a = {
    name: 'a',
    word: 'a word',
    speak: () => {
      console.log(this.word) // this 指向 window
    }
  }
  const b = {
    name: 'b',
    word: 'b word'
  }
  a.speak.call(b) // ==> undefined
```

## apply()

+ **作用**
  同call(), 为了改变函数运行时的上下文(context), 即, 改变函数体内部this的指向.
+ **语法**
  `fun.call(thisArg, [arg1, arg2, ...])`
+ **例子**
  同call(), 只是改变了参数传入形式

## bind()

+ **作用**
  创建一个新函数, 为方法的this提供值
+ **语法**
  `fun.bind(arg)`
+ **例子**
