---
categories:
  - frontend
  - vue
  - Ver.3
  - 源码解析
titleSlug: ''
title: 任务调度
thumbnail: ''
description: 暂无
wip: true
top: false
---
# scheduler

Vue3的任务处理相关函数定义在`runtime-core/src/scheduler.ts`中, 其中, 任务队列主要分为3种类型

1. 标准任务队列(`queue`)
2. 前置任务队列(`pendingPreFlushCbs`)
3. 后置任务队列(`pendingPostFlushCbs`)



## flushJobs

执行任务队列里的方法称之为`flush`, 本人习惯译为`冲洗`或`刷新`, 方法的定义如下

```typescript {11, 11}
/**
 * 冲洗任务队列
 * @param seen 
 */
function flushJobs(seen?: CountMap) {
  isFlushPending = false
  isFlushing = true
  // ↓ 先执行前置任务列表中的任务
  flushPreFlushCbs(seen)
  // 冲洗前先排序，为了确保
  // 1. 组件的更新顺序为 父组件 -> 子组件
  // 2. 如果一个组件在一个父组件更新期间被卸载，它的更新可以被跳过
  queue.sort((a, b) => getId(a) - getId(b))
  try {
    for (flushIndex = 0; flushIndex < queue.length; flushIndex++) {
      const job = queue[flushIndex]
      if (job && job.active !== false) {
        // 带错误捕获地执行任务
        callWithErrorHandling(job, null, ErrorCodes.SCHEDULER)
      }
    }
  } finally {
    flushIndex = 0
    queue.length = 0
    // ↓ 最后执行后置任务列表中的任务
    flushPostFlushCbs(seen)
    // 将刷新标识设置为false表示结束
    isFlushing = false
    currentFlushPromise = null
    // 确保所有的任务都有被清空
    if (
      queue.length ||
      pendingPreFlushCbs.length ||
      pendingPostFlushCbs.length
    ) {
      // 没干净再来一次
      flushJobs(seen)
    }
  }
}
```

方法主要执行了以下步骤:

1. 冲洗前置任务队列
2. 将任务队列排序
3. 冲洗任务队列
4. 冲洗后置任务队列
5. 确认任务队列,前置任务队列和后置任务队列是否都被冲洗干净, 没冲干净就从步骤1再来一次



## NextTick

首先我们来看一下`nextTick`的方法定义

```typescript
// runtime-core/src/scheduler.ts
export function nextTick<T = void>(
  this: T,
  fn?: (this: T) => void
): Promise<void> {
  const p = currentFlushPromise || resolvedPromise
  return fn ? p.then(this ? fn.bind(this) : fn) : p
}
```

