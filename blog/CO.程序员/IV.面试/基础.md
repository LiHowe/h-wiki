# JS基础



### 题目:

%`代码`|`对象比较`%

```JavaScript
console.log([] == false)
console.log([1] == [1])
console.log([1] == new Array(1).fill(1))
console.log({} == false)
```



### 题目: `async`, `setTimeout`, `Promise`执行顺序

```javascript
async function async1() {
 console.log('async1 start');
 
 await async2();
 
 console.log('async1 end');
}
 
async function async2() {
 console.log('async2');
}
 
console.log('script start');
 
setTimeout(() => {
 console.log('setTimeout');
}, 0);
 
async1();
 
new Promise((resolve) => {
 console.log('promise1');
 resolve();
})
 .then(() => {
   console.log('promise2');
 });
 
console.log('script end');	
```

​	关联: [EventLoop](#说说EventLoop)



### 说说EventLoop





### 判断对象类型的几种方式

####  `typeof`, `instanceof`的区别



#### `==` 与 `===`的区别





### ES6都有什么新特性





### 怎么创建一个新对象



### 节流和防抖



### 函数柯里化





###  闭包相关

#### 什么是闭包



#### 什么时候会用到闭包(闭包的使用场景)



#### 闭包的优缺点



#### 如何访问到闭包内部的变量





###  原型以及原型链



###  `this`的指向





###  函数作用域分为几种, 都有什么区别?







### `Promise`相关问题



### `async`, `await`的作用以及原理

%`基础`|`JS`%

