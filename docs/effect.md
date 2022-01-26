---
categories:
  - frontend
  - vue
  - Ver.3
  - 源码解析
  - reactivity
titleSlug: effect
title: effect
series: Vue源码解析
thumbnail: ''
description: 暂无
wip: true
top: false
---
# effect

副作用



## 问题

1. Vue是如何追踪对象属性变化的







## 解析

首先, 我们先来看下副作用(`ReactiveEffect`)类的定义

位于`packages/reactivity/src/effect.ts`

```typescript
class ReactiveEffect<T = any> {
  // 激活状态
  active = true
  // 依赖列表
  deps: Dep[] = []
	// 是否是计算属性
  computed?: boolean
  // 是否允许递归
  allowRecurse?: boolean
  // 停止时候的回调函数
  onStop?: () => void
  // dev only
  onTrack?: (event: DebuggerEvent) => void
  // dev only
  onTrigger?: (event: DebuggerEvent) => void
  // 执行方法
  run() {
    if (!this.active) {
      return this.fn()
    }
    if (!effectStack.includes(this)) {
      try {
        effectStack.push((activeEffect = this))
        enableTracking()

        trackOpBit = 1 << ++effectTrackDepth

        if (effectTrackDepth <= maxMarkerBits) {
          initDepMarkers(this)
        } else {
          cleanupEffect(this)
        }
        return this.fn()
      } finally {
        if (effectTrackDepth <= maxMarkerBits) {
          finalizeDepMarkers(this)
        }

        trackOpBit = 1 << --effectTrackDepth

        resetTracking()
        effectStack.pop()
        const n = effectStack.length
        activeEffect = n > 0 ? effectStack[n - 1] : undefined
      }
    }
  }
	// 停止方法
  stop() {
    if (this.active) {
      cleanupEffect(this)
      if (this.onStop) {
        this.onStop()
      }
      this.active = false
    }
  }
  // 构造函数
  constructor(
    public fn: () => T, // 执行函数
    public scheduler: EffectScheduler | null = null, // 定时任务
    scope?: EffectScope | null // 作用域
  ) {
    recordEffectScope(this, scope)
  }
}
```







### trigger - 副作用触发器

该方法在对目标对象(`target`)进行赋值操作时触发

```typescript
function trigger(
  target: object,
  type: TriggerOpTypes,
  key?: unknown,
  newValue?: unknown,
  oldValue?: unknown,
  oldTarget?: Map<unknown, unknown> | Set<unknown>
) {}
```

首先, trigger方法接收6个参数, 分别是

+ `target`: 目标对象
+ `type`: 触发操作类型
+ `key`: 属性名
+ `newValue`: 属性新值
+ `oldValue`: 属性旧值
+ `oldTarget`: 旧目标对象



#### 方法流程

1. 获取当前对象的属性依赖映射`depsMap`

2. 根据当前操作类型(`type`)进行不同操作

   1. 清空集合类型: 收集当前对象所有属性的依赖

   2. 操作数组对象的`length`: 收集`length`属性的依赖 和 位于新数组长度之后的数组元素依赖

   3. 其他情况:

      1. 增加对象属性: 

         1. **数组对象**且**key为数字类型**(新增数组下标): 收集`length`属性依赖(因为数组长度改变了)
         2. 非数组对象: 收集迭代键(`ITERATE_KEY`)对应依赖, 如果是Map对象还会收集Map迭代键(`MAP_KEY_ITERATE_KEY`)对应依赖

      2. 删除对象属性: 

         非数组对象: 收集迭代键(`ITERATE_KEY`)对应依赖, 如果是Map对象还会收集Map迭代键(`MAP_KEY_ITERATE_KEY`)对应依赖

      3. 修改对象属性:

         如果是Map对象: 收集迭代键(`ITERATE_KEY`)对应依赖

3. 根据依赖数组的长度来执行不同操作
   1. 长度为1: 取唯一的依赖执行`triggerEffects`
   2. 长度不为1: 过滤空的依赖(`dep`) -> 由这些依赖合并创建一个新依赖 -> 调用`triggerEffects`



### triggerEffects - 触发副作用

本方法其实就是遍历副作用集合并执行副作用函数(用于响应对象变动)
