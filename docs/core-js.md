---
categories:
  - frontend
  - architecture
titleSlug: core/js
title: core-js介绍
series: 工程化
thumbnail: ''
description: 暂无
wip: true
top: false
---
# Core-JS

Core-Js 是JavaScript的模块化标准库, 用于在不支持最新ES特性的环境中通过引用一些方法(`polyfill`)来使环境支持最新的ES特性

比如, 如果你开发的代码是使用`ES6+`, 但是代码交付时的运行环境为`ES5`, 那么一些`ES6`以上的新特性将会报错, 这时我们就需要引用`core-js`来使运行环境也支持`ES6`以上的新特性.

`core-js`支持一次性全量引用以及单方法模块化引用





## 相关链接

[Babel](./babel.md)

