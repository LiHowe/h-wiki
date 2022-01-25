---
categories:
  - frontend
  - media
  - WebAudio
titleSlug: web/audio/api
title: WebAudioAPI
thumbnail: ''
description: 暂无
wip: true
top: false
---
# Web Audio API

Web Audio API 主要用于对音频进行操作, 所有的操作都在[音频上下文(AudioContext)](CO.程序员/FE.前端/多媒体/AudioContext.md)中进行操作

![Web Audio API](https://i.loli.net/2021/10/12/sJfiz9PXOxStLop.png)

## 作用

音频上下文, 接收音频输入数据处理后进行输出, 相当于webpack中的loader一样

## 使用

**构造函数**:

```javascript

const ctx = new AudioContext()

```

  

**常用方法**:

+ `ctx.createMediaElementSource()`: 将`<audio>` 或 `<video>` 与上下文进行关联

+ `ctx.createMediaStreamSource()`: 将 `MediaStream` 与上下文进行关联

  
  
+ `ctx.close()`: 关闭音频上下文, 释放资源

+ `ctx.suspend()`: 暂停音频上下文时间进程(会暂时减少音频资源占用)

+ `ctx.resume()`: 恢复音频上下文时间进程

