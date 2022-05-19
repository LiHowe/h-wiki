---
categories:
  - frontend
  - basic
titleSlug: ''
title: JS事件循环
thumbnail: ''
series: JS基础
description: event loop
wip: true
top: false
---

# EventLoop



## MicroTasks - 微任务

Promise.then()



测试:

```javascript
const button = document.querySelector('.btn')
button.addEventListener('click', () => {
  Promise.resolve().then(() => console.log('Microtask1'))
  console.log('Listener1')
})
button.addEventListener('click', () => {
  Promise.resolve().then(() => console.log('Microtask2'))
  console.log('Listener2')
})
// 然后点击button
```

上面代码的输出结果为:

```
Listener1
Microtask1
Listener2
Microtask2
```

然后, 我们使用JS来模拟用户点击事件

```javascript
// same code...
button.click()
```

输出结果为:

```
Listener1
Listener2
Microtask1
Microtask2
```







## MacroTasks





## 参考链接

+ [JSConf-Jake Archibald](https://www.youtube.com/watch?v=cCOL7MC4Pl0)
+ 