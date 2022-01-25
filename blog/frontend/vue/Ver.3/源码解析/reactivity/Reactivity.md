# Reactive

本文前置知识点

+ [`Proxy`](../../../基础/Proxy/Proxy.md)

## 问题

1. 简单讲一下双向绑定的原理.

2. 如何将双向绑定对象转换为原始对象.

3. 什么样的对象无法创建响应式?
   1. 对象有为真值`__v_isReadonly`属性 (`packages/reactivity/src/reactive.ts --> reactive方法`)
   2. 非对象(`typeof target !== 'obejct'`)
   3. `null`(上一条的补充, 因为`typeof null`为`object`)
   4. 已创建响应式的对象(对象有`__v_raw`且有`__v_isReactive`属性的**非只读**对象)
   4. 由`markRaw`创建的对象(即`__v_raw`为true)
   5. 对象有真值的`__v_skip`属性
   6. 非可拓展对象(`!Object.isExtensible(target)`)
   7. 非`Object`, `Array`, `Map`, `Set`, `WeakMap`, `WeakSet`对象
   
4. WeakMap是什么, 与普通Map有什么区别, 为什么使用WeakMap作为响应式mapping?

5. 为一个嵌套对象创建响应式, 其属性值是响应式的吗?

   是, 因为创建的proxy的get捕获器中判断了: 如果属性值为对象的话, 会返回响应式的值, 如果是只读对象的话, 返回值则也是只读对象.

6. 判断对象类型的几种方式及优缺点
   1. `typeof`
   2. `instanceof`
   3. `Object.prototype.toString.call().slice(8, -1)`

7. 自己简单实现一个创建响应式对象的方法.

8. 源码中`/*__PURE__*/`的作用

## 响应式原理解析

Vue创建响应式的方法为`reactive(target)`

方法位置: `packages/reactivity/src/reactive.ts`文件中

### reactive

该方法只是判断了一下目标对象是否有只读标识(`ReactiveFlags.IS_READONLY` 也就是 `__v_isReadonly`)
实际调用[`createReactiveObject`](#createReactiveObject)来创建响应式对象.

`creative`调用`createReactiveObject`的入参为

+ `target`: 目标对象
+ `false`: 默认非只读对象
+ `mutableHandlers`: 定义于`packages/reactivity/src/baseHandlers.ts`
+ `mutableCollectionHandlers`: 定义于`packages/reactivity/src/collectionHandlers.ts`
+ `reactiveMap`: 定义于当前文件顶部, 初始值为`new WeakMap<Target, any>()`

### createReactiveObject

```TypeScript
function createReactiveObject(
  target: Target,
  isReadonly: boolean,
  baseHandlers: ProxyHandler<any>,
  collectionHandlers: ProxyHandler<any>,
  proxyMap: WeakMap<Target, any>
) {}
```

该方法接收5个参数

+ `target`: 目标对象(待响应式对象)
+ `isReadonly`: 是否是只读对象
+ `baseHandlers`: 对象基础处理函数
+ `collectionHandlers`: 集合对象处理函数
+ `proxyMap`: 已创建的响应式对象缓存

该方法主要做了几件事

1. 继续判断目标对象是否符合创建响应式条件
2. **为目标对象创建代理对象(`Proxy`)**
   1. 普通对象: 使用`mutableHandlers`来作为Proxy的handler, 注: Array在这也算普通对象
   2. 集合对象: 使用`mutableCollectionHandlers`来作为handler. 主要是`Map`, `WeakMap`, `Set`, `WeakSet`

3. 缓存目标对象代理, 以原对象为key, 代理对象为value
4. 返回代理对象



### mutableHandlers

普通对象的代理捕获器对象

方法定义于`packages/reactivity/src/baseHandlers.ts`

该方法只捕获了目标对象的以下方法

+ `get`: 取值, 由`createGetter`创建
+ `set`: 赋值
+ `deleteProperty`: 删除属性
+ `has`: 属性是否存在
+ `ownKeys`: 属性列表

这些方法都定义于`packages/reactivity/src/baseHandlers.ts`

#### get(key)

由`createGetter`方法创建

用于当对象值被读取的时候进行追踪

1. 如果key为`__v_reactive`, 返回`!isReadonly`值

2. 如果key为`__v_isReadonly`, 返回`isReadonly`值

3. 如果key为`__v_raw`, 如果有对应对象缓存, 则返回缓存的原始对象

4. 如果是需要监测的数组方法(`includes`, `indexOf`, `lastIndexOf`, `push`, `pop`, `shift`, `unshift`, `splice`之一), 返回监测对象对应方法调用结果

5. 如果key是`Symbol`类型, 且key为内置`Symbol`属性或方法(如下图), 返回对应属性值

   ![内置Symbol属性](https://s2.loli.net/2021/12/06/wVtbl8ALNyHiGnD.png)

6. 如果key是不需要追踪的(`__proto__`, `__v_isRef`, `__isVue`), 直接返回对应属性值

7. **如果不是只读对象, 则追踪当前属性影响(副作用)**

8. 如果是浅模式(shallow), 返回对应属性值

9. 如果属性值是`Ref`对象

   如果是`当前对象是数组`或者是`key是数字类型`, 则返回打开后(.value)的属性值, 否则直接返回`Ref`对象

10. 如果属性值是对象

    如果**当前对象**是只读对象, 则返回只读的属性值对象, 否则返回响应式的属性值对象

11. 以上都不符合, 直接返回属性值



#### set(key, val)

由`createSetter`方法创建

用于当对象的属性被赋值的时候进行追踪

1. 获取旧值
2. 如果不是浅层模式(shallow), 获取新值和旧值的原始值, 如果旧值是`Ref`, 则直接更改旧值`ref`的`value`
3. 设置对象属性值
4. 根据设置属性值的类型(**新增**属性还是**修改**属性)来调用`trigger`方法





#### deleteProperty(target, key)

当删除对象属性的时候触发

1. 先判断key是否存在
2. 删除对象对应key
3. **执行**副作用方法(`trigger`)



#### has(target, key)

当判断`key`是否存在于对象`target`时触发

1. 获取结果(key是否存在)
2. 如果key不是`Symbol`才会追踪副作用(`track`)



#### ownkeys(target)

获取对象`target`全部key

如果对象是数组类型, 则追踪`length`属性变化, 否则追踪迭代键`ITERATE_KEY`(为了迭代操作而虚拟的键, `Symbol('')`)



### mutableCollectionHandlers

集合对象(`Map`, `WeakMap`, `Set`, `WeakSet`)的代理捕获器对象, 只捕获了`get`方法

方法定义于`packages/reactivity/src/collectionHandlers.ts`



#### get

代理了集合对象的以下方法

+ get
+ size: 追踪`ITERATE_KEY`
+ has
+ add
+ set
+ delete
+ clear
+ forEach: 追踪`ITERATE_KEY`





## 参考链接

+ [深入响应性原理 | Vue.js (vuejs.org)](https://v3.cn.vuejs.org/guide/reactivity.html#什么是响应性)

+ [Proxy](../../../基础/Proxy/Proxy.md)
