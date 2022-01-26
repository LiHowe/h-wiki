---
categories:
  - interview
titleSlug: vue
title: vue
thumbnail: ''
description: 暂无
series: Vue
wip: true
top: false
---
# Vue相关

因为vue3.x已经推出有一阵时间了, 所以基础及原理的知识点可能会让我们对2.x和3.x分别回答并比较区别



### `MVVM`, `MVC`, `MVP`都是什么, 有什么区别

> + M: Model: 模型, 用于储存页面业务数据
> + V: View: 视图, 负责页面显示逻辑
> + C: Controller: 控制器
> + P: Presenter:
> + VM: ViewModel: 视图模型

+ MVC:
  所有的通信都是单向的

+ MVP:
  将MVC的Controller换成Presenter
  各部分间的通信为双向的, Presenter掌管几乎全部业务逻辑
  View <--> Presenter <--> Model

+ MVVM:
  与MVP模式一致, 只不过将P换成ViewModel, 与MVP的区别在于`双向绑定`, 即, `View`的变动会自动反映在`ViewModel`上, 反之亦然.


### `v-if`与`v-show`的区别



### 生命周期



#### 2.x的生命周期



#### 3.x的生命周期



#### 父子组件的生命周期执行顺序



#### 各个生命周期都做了什么操作





### Vue的常见修饰符有哪些, 都有什么作用



### Vue3都有哪些新特性



### `setup` 的作用



### 组件通信的几种方式





### vue从代码编写到页面元素挂载所经历的过程

即, 从编译模板开始一直说到mounted间的所有过程, 考察对Vue的源码掌握程度





### 谈一下对虚拟DOM的理解





### 为什么`data`是一个函数而不是一个对象



#### 如果data设置成一个对象会怎么样?



### Vue diff算法

%框架% %vue%





### `v-for`中设置`key`的作用? 如果使用index作为key会有什么影响





### Vue如何实现双向绑定

%框架% %vue%

先说2.x的实现原理, 然后说3.x的实现原理, 最后比较3.x实现方式的优点



### `v-model`原理



#### 为什么3.x的可以有多个`v-model`





### Vue3 `setup`的实现原理



#### setup前设置`async`会怎么样, 为什么会这样





### 计算属性(`computed`)的实现原理



#### 与`watch`的区别



### `watch`的作用实现原理



### 指令的定义方法, 以及原理



### `filter`的原理及作用



### `nextTick`原理



### `keep-alive`原理

