---
categories:
  - frontend
  - vue
  - Ver.3
  - 源码解析
titleSlug: v/node
title: VNode
thumbnail: ''
series: Vue源码解析
description: 暂无
wip: true
top: false
---
# VNode

想要了解Vue的渲染方式就需要先了解下Vue的虚拟节点

VNode实质上是一个用于表述节点信息的对象



## 虚拟节点的定义

```typescript
export interface VNode<
  HostNode = RendererNode,
  HostElement = RendererElement,
  ExtraProps = { [key: string]: any }
> {
  // 内部属性
  __v_isVNode: true																			// 是否是vNode
  [ReactiveFlags.SKIP]: true														// 
  staticCount: number																		// vnode包含的静态元素数量
  ssContent: VNode | null
  ssFallback: VNode | null
	dynamicProps: string[] | null
  dynamicChildren: VNode[] | null
	memo?: any[]
  isCompatRoot?: true
  ce?: (instance: ComponentInternalInstance) => void
  
	// 属性
  type: VNodeTypes
  props: (VNodeProps & ExtraProps) | null
  key: string | number | symbol | null
  ref: VNodeNormalizedRef | null
  scopeId: string | null
  slotScopeIds: string[] | null
  children: VNodeNormalizedChildren
  component: ComponentInternalInstance | null
  dirs: DirectiveBinding[] | null
  transition: TransitionHooks<HostElement> | null

  // DOM属性
  el: HostNode | null
  anchor: HostNode | null // fragment anchor
  target: HostElement | null // teleport target
  targetAnchor: HostNode | null // teleport target anchor
  
	
	// 标识
  shapeFlag: number
  patchFlag: number																				// patchFlag > 0表明这个节点在更新时需要打补丁
  
  suspense: SuspenseBoundary | null
  appContext: AppContext | null  
}
```



## 创建虚拟节点

实际上我们用户使用的版本通常是`h(runtime-core/src/h.ts)`, `h`是`createVNode`的简化版本, 可以允许我们在使用时忽略props参数.

`createVNode(runtime-core/src/vnode.ts)`是编译器生成代码使用的版本, 因为它只有一种使用方式, 避免了额外的调用开销, 也允许指定patchFlag用于优化

>  代码有所简化, 删除了dev环境判断和2.x兼容判断

```typescript
function _createVNode(
	type: VNodeTypes | ClassComponent | typeof NULL_DYNAMIC_COMPONENT, // 虚拟节点类型
  props: (Data & VNodeProps) | null = null, // 节点属性
  children: unknown = null, // 节点的子节点
  patchFlag: number = 0, // 是否需要打补丁
  dynamicProps: string[] | null = null, // 动态属性列表
  isBlockNode = false // 是否是块节点
): VNode {
  // 如果没传type, 或者type是空的动态组件, 则列为注释节点
  if (!type || type === NULL_DYNAMIC_COMPONENT) type = Comment
  // 如果类型是vNode
  if (isVNode(type)) {
    // 克隆节点
    const cloned = cloneVNode(type, props, true /* mergeRef: true */)
    // 如果有子节点, 标准化子节点
    if (children) {
      normalizeChildren(cloned, children)
    }
    return cloned
  }
  // 如果type是方法,并且有__vccOpts属性
  if (isClassComponent(type)) {
    // 将类型设置为__vccOpts属性值
    type = type.__vccOpts
  }
  // 标准化class和style
  if (props) {
    // 如果是响应式对象或者代理对象, 进行克隆
    props = guardReactiveProps(props)!
    let { class: klass, style } = props
    if (klass && !isString(klass)) {
      props.class = normalizeClass(klass)
    }
    if (isObject(style)) {
      if (isProxy(style) && !isArray(style)) {
        style = extend({}, style)
      }
      props.style = normalizeStyle(style)
    }
  }
  // 将vnode类型信息编码为对应类型数字
  const shapeFlag = isString(type)
    ? ShapeFlags.ELEMENT
    : __FEATURE_SUSPENSE__ && isSuspense(type)
    ? ShapeFlags.SUSPENSE
    : isTeleport(type)
    ? ShapeFlags.TELEPORT
    : isObject(type)
    ? ShapeFlags.STATEFUL_COMPONENT
    : isFunction(type)
    ? ShapeFlags.FUNCTIONAL_COMPONENT
    : 0
  // 创建基础VNode
  return createBaseVNode(
    type,
    props,
    children,
    patchFlag,
    dynamicProps,
    shapeFlag,
    isBlockNode, // false
    true // 是否需要标准化子节点
  )
}

/**
 * 创建基本vNode
 * @param type vNode类型， 必须
 * @param props 属性， 默认null
 * @param children 子节点，默认null
 * @param patchFlag 是否打补丁， 默认0
 * @param dynamicProps 动态属性
 * @param shapeFlag 表现形式，是文档片段则 0，否则默认是元素 1
 * @param isBlockNode 是否是块节点，默认false
 * @param needFullChildrenNormalization 是否需要标准化子节点， 默认false
 * @returns 
 */
function createBaseVNode(
  type: VNodeTypes | ClassComponent | typeof NULL_DYNAMIC_COMPONENT,
  props: (Data & VNodeProps) | null = null,
  children: unknown = null,
  patchFlag = 0,
  dynamicProps: string[] | null = null,
  shapeFlag = type === Fragment ? 0 : ShapeFlags.ELEMENT,
  isBlockNode = false,
  needFullChildrenNormalization = false
) {
  // 建立初始vNode对象
  const vnode = {
    __v_isVNode: true,
    __v_skip: true,
    type,
    props,
    key: props && normalizeKey(props),
    ref: props && normalizeRef(props),
    scopeId: currentScopeId,
    slotScopeIds: null,
    children,
    component: null,
    suspense: null,
    ssContent: null,
    ssFallback: null,
    dirs: null,
    transition: null,
    el: null,
    anchor: null,
    target: null,
    targetAnchor: null,
    staticCount: 0,
    shapeFlag,
    patchFlag,
    dynamicProps,
    dynamicChildren: null,
    appContext: null
  } as VNode

  // 如果需要标准化子节点
  if (needFullChildrenNormalization) {
    normalizeChildren(vnode, children)
    // normalize suspense children
    if (__FEATURE_SUSPENSE__ && shapeFlag & ShapeFlags.SUSPENSE) {
      ;(type as typeof SuspenseImpl).normalize(vnode)
    }
  } else if (children) { 
    // compiled element vnode - if children is passed, only possible types are
    // string or Array.
    vnode.shapeFlag |= isString(children)
      ? ShapeFlags.TEXT_CHILDREN
      : ShapeFlags.ARRAY_CHILDREN
  }

  // track vnode for block tree
  if (
    isBlockTreeEnabled > 0 &&
    !isBlockNode &&
    currentBlock &&
    // patchFlag > 0表明这个节点需要在更新的时候打补丁
    // 组件节点也需要被打补丁，因为即使组件不需要更新，为了以后可以正确地卸载它, 也需要将组件实例持久化到下一个vnode上，
    (vnode.patchFlag > 0 || shapeFlag & ShapeFlags.COMPONENT) &&
    // the EVENTS flag is only for hydration and if it is the only flag, the
    // vnode should not be considered dynamic due to handler caching.
    vnode.patchFlag !== PatchFlags.HYDRATE_EVENTS
  ) {
    currentBlock.push(vnode)
  }
  return vnode
}
```



## 渲染VNode

`render`方法接收3个参数,

+ vnode: 需要渲染的VNode
+ container: 目标挂载元素
+ isSVG: 是否是SVG元素

调用`patch`方法(`patch`涉及到位运算)



