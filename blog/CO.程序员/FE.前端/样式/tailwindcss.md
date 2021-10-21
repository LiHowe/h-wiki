---
category: code
layout: blog
title: 初探TailwindCSS
date: 06/08-2021 13:14
coverImage: https://i.loli.net/2021/06/09/likAPwq4rTvBxfZ.png
thumbnail: https://i.loli.net/2021/06/11/hyQ8ksvMN3jIlVF.png
tags:
  - CSS
description: TailwindCSS是一个原子化的CSS框架, 提供丰富的原子类以加快开发人员页面样式开发速度.
stick: false
wip: true
---

## 📄 介绍

[Tailwind](https://tailwindcss.com/) [ 'teilˌwind ] CSS 是一个CSS框架，将CSS进行原子化，把大部分的CSS属性封装成一个个对应的工具类(class)，进而提高使用者页面样式的编写速度(ps:如果你熟悉文档的话)。



## 为什么要使用这东西?

希望大家先看看下面的官网的例子来决定该框架是否适合你, 例如要实现下面的样式

<div class="chat-notification">
  <div class="chat-notification-logo-wrapper">
    <img class="chat-notification-logo" src="https://avatars0.githubusercontent.com/u/67109815?v=4" alt="ChitChat Logo">
  </div>
  <div class="chat-notification-content">
    <h4 class="chat-notification-title">ChitChat</h4>
    <p class="chat-notification-message">You have a new message!</p>
  </div>
</div>

<style>
  .chat-notification {
    display: flex;
    max-width: 24rem;
    margin: 0 auto;
    padding: 1.5rem;
    border-radius: 0.5rem;
    background-color: #fff;
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  }
  .chat-notification-logo-wrapper {
    flex-shrink: 0;
  }
  .chat-notification-logo {
    height: 3rem;
    width: 3rem;
  }
  .chat-notification-content {
    margin-left: 1.5rem;
    padding-top: 0.25rem;
  }
  .chat-notification-title {
    color: #1a202c;
    font-size: 1.25rem;
    line-height: 1.25;
  }
  .chat-notification-message {
    color: #718096;
    font-size: 1rem;
    line-height: 1.5;
  }
</style>

+ 使用传统CSS

```html
<div class="chat-notification">
  <div class="chat-notification-logo-wrapper">
    <img class="chat-notification-logo" src="https://avatars0.githubusercontent.com/u/67109815?v=4" alt="ChitChat Logo">
  </div>
  <div class="chat-notification-content">
    <h4 class="chat-notification-title">ChitChat</h4>
    <p class="chat-notification-message">You have a new message!</p>
  </div>
</div>
```
  
```css
<style>
  .chat-notification {
    display: flex;
    max-width: 24rem;
    margin: 0 auto;
    padding: 1.5rem;
    border-radius: 0.5rem;
    background-color: #fff;
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  }
  .chat-notification-logo-wrapper {
    flex-shrink: 0;
  }
  .chat-notification-logo {
    height: 3rem;
    width: 3rem;
  }
  .chat-notification-content {
    margin-left: 1.5rem;
    padding-top: 0.25rem;
  }
  .chat-notification-title {
    color: #1a202c;
    font-size: 1.25rem;
    line-height: 1.25;
  }
  .chat-notification-message {
    color: #718096;
    font-size: 1rem;
    line-height: 1.5;
  }
</style>
```

+ 使用tailwindCSS

```html
<div class="p-6 max-w-sm mx-auto bg-white rounded-xl shadow-md flex items-center space-x-4">
  <div class="flex-shrink-0">
    <img class="h-12 w-12" src="[/img/logo.svg](https://avatars0.githubusercontent.com/u/67109815?v=4)" alt="ChitChat Logo">
  </div>
  <div>
    <div class="text-xl font-medium text-black">ChitChat</div>
    <p class="text-gray-500">You have a new message!</p>
  </div>
</div>
```

通过观察和比较上面的例子可以看出`tailwindCSS`较传统CSS写法的优势

1. 以功能类(或称为原子类)为主进行样式开发, 无需进行css开发
2. 不需要痛苦地为每个元素起类名了

其实`tailwindCSS`的优势远不止这些, 它还有以下优点

1. 内置响应式设计, 无需再写`@media`等媒体查询来进行响应式设计
2. 提供了深色模式, 能够快速的进行网站双色模式的开发
3. 提供了函数和指令, 可以获取当前使用的主题配置等
4. 能够提供设计约束, 避免自己手写CSS导致各种单位以及样式不统一的问题
5. 便于后期项目维护
6. 提供了tree-shaking(借助于PurgeCSS), 可以显著减小打包后的CSS文件大小
7. 提供了VSCode插件, 能够显著提升开发速度(前提是得对文档熟悉)

当然, `tailwindCSS`的缺点也比较明显:

1. 有一定的学习成本, 需要记类名(这可能不是框架的缺点,而是我自己的缺点)
2. 复杂样式下html元素的类名比较长
3. C端等自定义样式较多的项目不适合使用

## 👋 开始使用

### 安装

tailwindcss目前主要支持6种工具/框架进行安装使用

+ Next.js: [英文指引](https://tailwindcss.com/docs/guides/nextjs) | [中文指引](https://www.tailwindcss.cn/docs/guides/nextjs)
+ Vue3(Vite): [英文指引](https://tailwindcss.com/docs/guides/vue-3-vite) | [中文指引](https://www.tailwindcss.cn/docs/guides/vue-3-vite)
+ Laravel: [英文指引](https://tailwindcss.com/docs/guides/laravel) | [中文指引](https://www.tailwindcss.cn/docs/guides/laravel)
+ Nuxt.js: [英文指引](https://tailwindcss.com/docs/guides/nuxtjs) | [中文指引](https://www.tailwindcss.cn/docs/guides/nuxtjs)
+ Create React App: [英文指引](https://tailwindcss.com/docs/guides/create-react-app) | [中文指引](https://www.tailwindcss.cn/docs/guides/create-react-app)
+ Gatsby: [英文指引](https://tailwindcss.com/docs/guides/gatsby) | [中文指引](https://www.tailwindcss.cn/docs/guides/gatsby)

除了以上方式外，你还可以以PostCSS插件的方式进行安装使用



### IDE支持

VS Code选手: [Tailwindcss插件](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss), [PostCSS插件](https://marketplace.visualstudio.com/items?itemName=csstools.postcss)

Webstorm选手: 新版本已经自动集成了!!（老版本自行在插件市场搜索 Tailwind CSS进行下载安装）

### 响应式

class前缀 | 宽度阈值 | 对应CSS
-- | -- | -- 
`sm` | 640px | `@media (min-width: 640px) { ... }`
`md` | 768px | `@media (min-width: 768px) { ... }` 
`lg` | 1024px | `@media (min-width: 1024px) { ... }` 
`xl` | 1280px | `@media (min-width: 1280px) { ... }` 
`2xl` | 1536px | `@media (min-width: 1536px) { ... }` 

### 状态转化(hover, focus和其他状态)

出于文件大小考虑，TailwindCSS并没有为全部的样式类启用全部的转化，除了内置的转化外，如果需要支持其他特定转化态则需要修改配置文件.

```js
// tailwind.config.js
module.exports = {
  // ...
  variants: {
    extend: {
      backgroundColor: ['active'], // 这样active就支持背景颜色的改变了
    }
  },
}
```

+ hover:

  + 颜色、阴影以及透明度
  + 基础的transform

+ focus:

  + 同hover
  + 轮廓环(ring,其实就是box-shadow)样式的修改
  + zIndex、accessibility

+ active: 都不支持，需要手动开启

+ group-hover:

  比如当你需要鼠标移到元素上时，它的子元素进行样式变化，则需要使用这个状态。需要给父元素添加`group`，子元素使用`group-hover:变化`进行样式控制。

  支持背景、边框、字体的颜色以及透明度变化

  例:

  ```html
  <div class="mt-5 group px-6 py-5 max-w-full mx-auto w-72 border border-indigo-500 border-opacity-25 cursor-pointer rounded-lg select-none overflow-hidden space-y-1 hover:bg-white hover:shadow-lg hover:border-transparent">
    <p class="text-indigo-600 group-hover:text-gray-900">小卡片</p>
    <p class="text-indigo-500 group-hover:text-gray-500">这是描述内容</p>
  </div>
  ```

  ![group-hover](https://i.loli.net/2021/06/15/75drQAPnOU4j9bt.png)

+ 

## 🤔 问题

1. 比内联CSS好在哪儿？
2. 比传统class写法好在哪？
3. 与Bootstrap有什么不同？



## 🐛 错误记录

+ tailwindCSS @apply cannot be use with .dark之类的问题

  **原因**

  由于引用`@nuxt/content-theme-docs`导致不兼容问题

  **解决方案**

  移除`content-theme-docs`依赖即可





## 🔗 相关链接

[官网链接(英文)](https://tailwindcss.com/)

[官网链接(中文,会落后几个小版本)](https://www.tailwindcss.cn/)

