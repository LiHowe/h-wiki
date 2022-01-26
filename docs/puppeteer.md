---
categories:
  - frontend
  - libs
titleSlug: puppeteer
title: Puppeteer简单使用
thumbnail: ''
description: 暂无
series: 工具库
wip: true
top: false
---

# Puppeteer简单使用

### 如何处理文件下载

```jsx
await page._client.send('Page.setDownloadBehavior', {
  behavior: 'allow',
  downloadPath
})
```

- 打开浏览器 `browser = puppeteer.launch(opts)`
- 新建页面  `page = puppeteer.newPage()`
- 页面跳转 `page.goto(url)`
- 关闭页面 `page.close()`
- 页面等待 *`page.waitForTimeout(ms)`*
- 页面执行脚本 `page.evaluate(fn)`

> 如果脚本需要接收参数， 使用下面方法

```tsx
// provide by node
const a = 'a'
const b = 1
// inject to web page
page.evaluate((a, b) => {
	console.log(a, b)
}, a, b)
```

- 关闭浏览器 `browser.close()`

## 问题

- 在docker中直接使用会报错 `cannot open shared object file: No such file or directory`

1. 