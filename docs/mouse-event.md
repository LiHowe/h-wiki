---
categories:
  - frontend
  - basic
  - HTML
titleSlug: ''
title: 鼠标事件
series: JS基础
thumbnail: ''
description: 暂无
wip: true
top: false
---
# 鼠标事件

## 鼠标事件(MouseEvent)对应属性

### 位置信息

+ screenX | screenY

鼠标当前位置相对于 `桌面` 左上角的偏移量

+ clientX | clientY | x | y

鼠标当前位置相对于 `浏览器当前显示区域` 左上角的偏移量

+ offsetX | offsetY

鼠标当前位置相对于 `元素padding边` 左上角的偏移量

+ pageX | pageY

鼠标当前位置相对于 `网页内容区域` 左上角偏移量

### 按键情况

+ altKey

当前 `alt` 键是否按下

+ metaKey

当前系统键是否按下(window徽标键 | `Command`键)

+ ctrlKey

当前 `ctrl` 键是否按下

+ shiftKey

当前 `shiftKey` 键是否按下

### 元素

+ relatedTarget

表示事件的次要目标, 比如从 `元素A移动鼠标到元素B`, B鼠标事件的次要目标为A

## 事件冒泡和捕获

