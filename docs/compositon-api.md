---
categories:
  - frontend
  - vue
titleSlug: compositon/api
title: CompositonApi
thumbnail: ''
description: 暂无
wip: true
top: false
---
# Composition-api

## 用途

为了使Vue2可以早早的使用上Vue3的语法而推出

## 原理解析

### 目录结构

首先， 我们先来看一下项目的目录结构

![Untitled.png](https://s2.loli.net/2022/01/09/ieUcaPbY8juKBsg.png)

### 入口文件

然后由入口文件(`index.ts`)开始阅读

```tsx
import type Vue from 'vue'
import { Data, SetupFunction } from './component'
import { Plugin } from './install'

// 当前库版本
export const version = __VERSION__

export * from './apis'
export * from './component'
export {
  getCurrentInstance,
  ComponentInternalInstance,
  SetupContext,
} from './runtimeContext'

// 默认导出 -- Plugin
export default Plugin

// 拓展Vue2 component options类型定义
declare module 'vue/types/options' {
  interface ComponentOptions<V extends Vue> {
    setup?: SetupFunction<Data, Data>
  }
}

// 当使用CDN(<script>)方式使用的时候, 如果Vue也是使用的<script>形式使用, 则自动安装
// 并由此可以看出, 该库是作为plugin为Vue2使用
if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(Plugin)
}
```

### install.ts

主要代码逻辑如下（非源代码， 已优化结构便于阅读）

```tsx
// Vue2的plugin定义
export const Plugin = {
  install: (Vue: VueConstructor) => {
		if (isVueRegistered(Vue)) return
		// 为Vue2增加组件合并策略(setup属性)
	  // https://cn.vuejs.org/v2/api/#optionMergeStrategies
	  Vue.config.optionMergeStrategies.setup = function (
	    parent: Function,
	    child: Function
	  ) {
	    // setup接收的两个参数 props: 组件参数， context: 组件实例
	    return function mergedSetupFn(props: any, context: any) {
				// 合并组件setup
	      return mergeData(
	        isFunction(parent) ? parent(props, context) || {} : undefined,
	        isFunction(child) ? child(props, context) || {} : undefined
	      )
	    }
	  }
		// 为Vue增加已经安装过该plugin的标识属性(PluginInstalledFlag)
	  setVueConstructor(Vue)
		// 全局mixin
	  mixin(Vue)
	},
}
```

接下来看一下全局的 `mixin` 都做了什么操作

### mixin.ts

主要代码如下

```tsx
Vue.mixin({
  beforeCreate: functionApiInit,
  mounted(this: ComponentInstance) {
    updateTemplateRef(this)
  },
  beforeUpdate() {
    updateVmAttrs(this as ComponentInstance)
  },
  updated(this: ComponentInstance) {
    updateTemplateRef(this)
    if (this.$vnode?.context) {
      updateTemplateRef(this.$vnode.context)
    }
  },
})
```

可以看到, `composition-api` 主要为Vue2混入了4个生命周期钩子函数

- `beforeCreate`
- `mounted`
- `beforeUpdate`
- `updated`

> 还记得mixin的生命周期函数与原组件的生命周期函数执行顺序么?
> 

> 混入对象的钩子将在组件自身钩子**之前**调用
> 

## 学到了什么
