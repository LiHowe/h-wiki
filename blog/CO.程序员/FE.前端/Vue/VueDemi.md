# vue-demi

## 用途

用于创建`Vue2` 和 `Vue3` 通用组件， 主要就是为了给Vue2使用composition-api

## 原理解析

项目结构

![Untitled.png](https://s2.loli.net/2022/01/09/RY3wFi7QBbyOEcZ.png)

可以看出， `vue-demi` 支持 `cjs` , `iife` , `mjs` 三种类型的引用方式( `CommonJS` , `<script>` , `ESModule` ).

源码十分简单， 实质上就是使用了 [vuejs/composition-api](https://github.com/vuejs/composition-api) 来实现Vue不同版本代码兼容

源码阅读：

### Step.1

我们先查看`package.json` 来查看项目的依赖以及脚本

```json

 "scripts": {
    "postinstall": "node ./scripts/postinstall.js",
    "release": "npx bumpp --tag --commit --push && npm publish"
  },
  "peerDependencies": {
    "@vue/composition-api": "^1.0.0-rc.1",
    "vue": "^3.0.0-0 || ^2.6.0"
  }
```

可以看到， 该项目有 postinstall 钩子， 该钩子会执行scripts 文件夹下的postinstall.js文件

### Step.2

我们来查看`postintall.js` 文件的具体逻辑,

在我们执行完`npm install` 操作后，会使用Node运行下面代码

```javascript
const { switchVersion, loadModule } = require('./utils')
// require('vue')， 加载Vue模块
const Vue = loadModule('vue')
// 如果还没有安装Vue， 提示用户
if (!Vue || typeof Vue.version !== 'string') {
  console.warn('[vue-demi] Vue is not found. Please run "npm install vue" to install.')
}
// 如果本地的是Vue2
else if (Vue.version.startsWith('2.')) {
  switchVersion(2)
}
// 如果本地的是Vue3
else if (Vue.version.startsWith('3.')) {
  switchVersion(3)
}
// 其他情况
else {
  console.warn(`[vue-demi] Vue version v${Vue.version} is not suppported.`)
}
```

代码逻辑概括为: 判断npm install 所安装的Vue 版本， 将代码切换为对应Vue版本的形式.

```javascript
function switchVersion(version, vue) {
  copy('index.cjs', version, vue)
  copy('index.mjs', version, vue)
  copy('index.d.ts', version, vue)

  if (version === 2)
    updateVue2API()
}
```

如果是Vue2版本， 则会执行 updateVue2API 来为Vue2添加 Composition-API  代码引用

```javascript
content.replace(
    /\/\*\*VCA-EXPORTS\*\*\/[\s\S]+\/\*\*VCA-EXPORTS\*\*\//m,
`/**VCA-EXPORTS**/
export { ${exports.join(', ')} } from '@vue/composition-api/dist/vue-composition-api.mjs'
/**VCA-EXPORTS**/`
    )
```

### Step.3

首先安装项目所需依赖(使用你所喜欢的包管理工具, 这里我使用的是pnpm)

`pnpm instal` 

这时来查看 `lib/index.mjs` 文件的代码， 变成了如下

```javascript

import Vue from 'vue'
import VueCompositionAPI from '@vue/composition-api/dist/vue-composition-api.mjs'

function install(_vue) {
  _vue = _vue || Vue
  if (_vue && !_vue['__composition_api_installed__'])
    Vue.use(VueCompositionAPI)
}

install(Vue)

var isVue2 = true
var isVue3 = false
var Vue2 = Vue
var version = Vue.version

/**VCA-EXPORTS**/
export { computed, createApp, createRef, customRef, defineAsyncComponent, defineComponent, del, getCurrentInstance, h, inject, isRaw, isReactive, isReadonly, isRef, markRaw, nextTick, onActivated, onBeforeMount, onBeforeUnmount, onBeforeUpdate, onDeactivated, onErrorCaptured, onMounted, onServerPrefetch, onUnmounted, onUpdated, provide, proxyRefs, reactive, readonly, ref, set, shallowReactive, shallowReadonly, shallowRef, toRaw, toRef, toRefs, triggerRef, unref, useCSSModule, useCssModule, warn, watch, watchEffect } from '@vue/composition-api/dist/vue-composition-api.mjs'
/**VCA-EXPORTS**/

export {
  Vue,
  Vue2,
  isVue2,
  isVue3,
  version,
  install,
}

```

## 相关链接

+ [Composition-API](./../CompositonApi.md)
