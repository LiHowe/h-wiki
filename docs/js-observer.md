---
categories:
- frontend
- basic
titleSlug: js-array
title: Observer
thumbnail: ''
series: JS基础
description: 暂无
wip: true
top: false
---

# Observer



## Resize Observer

用于监视元素大小变动



### 使用

例:

```javascript
// entries 为该Observer所监视的元素数组
const ob = new ResizeObserver(entries => {
  for (let entry of entries) {
    entry.target.style.width = Math.min(100, entry.contentRect.width)
  }
})
ob.observe(document.querySelector('.demo'))
```





## Performance Observer





## Intersection Observer

