---
categories:
  - frontend
  - vue
titleSlug: vue-checklist
title: Vue自检清单
thumbnail: ''
series: Vue
description: 暂无
wip: true
top: false
---

# Vue自检清单


## 知识点


### ⭐️ | Beginner

- Vue的各个生命周期都做了什么
- v-for的key有什么作用
- 组件间的通信方式有哪些

### ⭐️⭐️ | Expert

- Vue初始化流程
    1. new Vue()
    2. 调用$mount(), 实质是将template模板转换为render函数(`compileToFunctions`)
    3. 执行render函数构建vNode.(深度优先遍历)(在数据变更之后也会触发render函数)
    4. vNode(虚拟DOM)渲染成DOM.(patch方法, diff算法)
- 组件各个生命周期都做了什么
  
    **beforeDestroy**
    
    啥也没做
    
    **destroyed**
    
    1. 设置_isBeingDestroyed为true
    2. 将自己从父组件的$children中移出
    3. 销毁所有依赖该组件的watcher
    4. 移除数据观测引用
    5. 设置_isDestroyed标识为true
    6. 调用补丁方法__patch__来销毁组件对应dom
    
- slot="name" 与 v-slot:name的区别
- vNode是什么
  
    虚拟节点(Virtual Node)
    
- 页面节点更新过程
- 指令的钩子函数有哪些，作用是什么
    1. **bind**： 只在指令绑定到元素时调用
    2. **inserted**： 绑定元素插入到父节点时调用（父节点不一定已经被插入到文档中）
    3. **update**： 所在组件的VNode更新时调用，**但是可能发生在其子 VNode 更新之前**
    4. **componentUpdated**： 指令所在组件的 VNode **及其子 VNode** 全部更新后调用
    5. **unbind**：指令与元素解绑时
- Vue 如何监听数组变化的
  
    通过覆盖array原型的7种方法进行
    
- keepAlive的组件为什么不调用初始化等生命周期
- keepAlive的组件在什么时候调用activated与deactivated生命周期

### ⭐️⭐️⭐️ | Master

- 双向绑定原理
- computed原理
  
    该知识点涉及到watcher的分类
    
    - deep watcher
    - user watcher
    - computed watcher(lazy watcher)
    - sync watcher
    计算属性实质上是通过`Object.defineProperty(组件, 计算属性名, 计算方法)`来实现的, vue为计算属性创建了一个内部watcher(lazy), 通过watcher的dirty来实现监听数据改变重新计算
- `$set`, `$delete`原理
    
    - **数组**: 调用数组的**splice**方法
    - **对象**: 调用**defineReactive**方法
- KeepAlive原理
- vue-router原理
  
    vue-router分为`hash`模式和`history`模式
    
    - **hash模式**
      
        监听`hashchange`改变, 改变current的值来实现, 然后`<router-view>`负责渲染current路由对应的组件
        
        ```
        window.addEventListener('hashchange',  () => {
            this.history.current = location.pathname
        })
        
        ```
        
    - **history模式**
      
        监听`popstate`
    
- diff算法
- computed的原理
- nextTick原理
- Vue是怎么知道实例更新的 | Vue的beforeUpdate是怎么实现的
  
    beforeUpdate实际上就是在初始化的时候(beforeMount之后 mounted之前)通过new Watcher() 来监听当前实例来实现的
    
    ```jsx
    new Watcher(vm, updateComponent, noop, {
        before () {
          // 实例已经挂载后 且 实例未被销毁 的时候, 当实例变化时调用钩子函数 -- beforeUpdate
          if (vm._isMounted && !vm._isDestroyed) {
            callHook(vm, 'beforeUpdate')
          }
        }
      }, true /* isRenderWatcher */)
    ```
    
- Vue3与Vue2比较
    - 
      
        
    

## 常见问题


- 如何在 `jsx` 或者 `tsx` 中设置 `scoped` 样式
- 如何打包发布一个vue组件