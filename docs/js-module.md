---
categories:
  - frontend
  - basic
titleSlug: ''
title: 模块化
thumbnail: ''
series: JS基础
description: 暂无
wip: true
top: false
---
# 模块化规范

在前端开发的过程中引用一些第三方库的时候, 有些使用`import x from xxx`, 有些使用 `require('xxx')`

那么, 这些库在代码结构上有什么区别呢?

这里我们提出大家常见的几个词
+ `AMD`
+ `UMD`
+ `ESM`
+ `CommonJS`

## 总结

| 模块化规范      | 模块引用方式                      | 模块导出(定义)方式       |
|------------|-----------------------------|------------------|
| `AMD`      | `require([xx], callback)`   | `require.config` |
| `CMD`      | `seajs.use([xx], callback)` | `define()`       |
| `UMD`      | 整合`AMD`, `CommonJS`, `CMD`  | ...              |
| `ESM`      | `import ... from ...`       | `export`         |
| `CommonJS` | `require(...)`              | `module.exports` |


## 相关文章

+ [webpack 构建目标](../../TE.工程化/webpack/构建.md)
