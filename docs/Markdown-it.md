---
WIP: true
categories:
  - frontend
  - libs
titleSlug: markdown/it
title: Markdown-it
thumbnail: ''
description: 暂无
series: 工具库
wip: true
top: false
---



# Markdown-it

## API

### 实例化

`new MarkdownIt([presetName], [options])`

+ presetName: 解析模式,
  + `commonmark`
  + `default`
  + `zero`
+ options: 解析配置
  + `html`: `boolean` 是否在模板中启用HTML标签, 默认`false`

```javascript
// NodeJS
const MarkdownIt = require('markdown-it')
const md = new MarkdownIt()
// or
const md = require('markdown-it')()
// Browser
const md = window.markdownit()
```



