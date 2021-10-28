# 初始化

## APP实例

首先,我们先了解一下Vue实例(App对象)所包含的属性以及方法.

控制台输出的`createApp()`创建的Vue实例对象

![image-2021102716360739](https://i.loli.net/2021/10/27/ULFWPGyrvEYpnd4.png)

## CreateApp

`CreateApp`是Vue3的实例创建方法, 方法定义在`runtime-dom/src/index.ts`

方法主要做了以下几件事情:

1. 调用 `ensureRenderer`方法来创建渲染器(单例)

   1. 创建渲染器`runtime-core/src/renderer.ts` 的`baseCreateRenderer` 方法

2. 调用`createApp`方法来创建Vue实例对象

   实则调用`runtime-core/src/apiCreateApp.ts`中的`createAppAPI`的返回值`createApp`方法来创建实例对象

   ![image-20211028134532060](https://i.loli.net/2021/10/28/5kteP24puZmzH9Q.png)

3. 重写`mount`方法

   1. `normalizeContainer` 标准化容器
   2. 如果组件对象没有定义`render` 函数和`template` 模板，则取容器的`innerHTML` 作为组件模板内容
   3. 清空容器内容(`innerHTML = ''`)
   4. 调用原始`mount`方法
      1. `createVNode`来创建VNode
      2. `render`来渲染VNode
      3. 返回实例的代理对象
   5. 如果容器是元素(`Element`)的话，移除元素`v-cloak`属性， 添加`data-v-app`属性
   
   

### 核心方法

* `normalizeContainer` : 标准化容器， 实质上就是调用querySelector查找对应选择器元素

```typescript
/**
 * 标准化容器方法
 * @param container mount目标挂载容器， 支持元素选择器字符串，ShadowDOM，普通DOM元素
 * @returns 
 */
function normalizeContainer(
  container: Element | ShadowRoot | string
): Element | null {
  // 如果传入选择器字符串
  if (isString(container)) {
    // 按照选择器查找
    // 返回元素查找器结果
    return document.querySelector(container)
  }
  return container as any
}
```



+ `baseCreateRenderer`: 创建渲染器



+ `isSameVNodeType`: 是否是相同虚拟节点类型

  ```typescript
  // 通过判断新旧节点的type属性和key来判断是否是相同节点类型
  function isSameVNodeType(n1: VNode, n2: VNode): boolean {
    return n1.type === n2.type && n1.key === n2.key
  }
  ```


