---
category: tip
tags:
- css
- html
---
# Scale与Zoom的区别

前两天做业务的时候使用了 `zoom` 和 `transform: scale` 属性来对元素进行缩放

突然就分不清这两个样式的具体区别, 特此记录.

## 总结

|    | zoom | scale |
| ---- | ---- | ---- |
| CSS标准 | :x: | :white_check_mark: |
| 语法 | `zoom: <percentage or number>` | `transform: scale(<number>)` |
| 浏览器兼容性 | `firefox`不行 | 都OK |
| 默认行为 | 基于元素左上角缩放 | 基于元素中心, 可通过`transform-origin`设置 |
| 取值 | 正数 | 可为负值 |
| 元素行为 | 尺寸及占据空间都改变 | 尺寸改变， 占据空间不变 |
| `getBoundingClientRect` | `height`, `width`不变 | `height`, `width`跟随缩放改变 |

## 例子

<iframe height="300" style="width: 100%;" scrolling="no" title="Untitled" src="https://codepen.io/lihowe/embed/xxXyKLP?default-tab=html%2Cresult" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href="https://codepen.io/lihowe/pen/xxXyKLP">
  Untitled</a> by Howe (<a href="https://codepen.io/lihowe">@lihowe</a>)
  on <a href="https://codepen.io">CodePen</a>.
</iframe>
![image-20220110211721616](https://s2.loli.net/2022/01/10/CpaBQSgP1O3KG8F.png)
