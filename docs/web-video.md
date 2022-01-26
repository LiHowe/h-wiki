---
categories:
  - frontend
  - media
titleSlug: analyser
title: <video>标签使用
thumbnail: ''
series: Web Media
description: 暂无
wip: true
top: false
---

# Video

`<video>` 是可替换元素, 即 `display` 默认为 `inline`

### 基础属性

`width` ：视频宽

`height` : 视频高

`src` ： 视频源

`poster` : 视频封面URL

### 播放控制

`autoplay` : 设置视频自动播放

`control` : 显示播放控制器

`loop` : 循环播放

`muted` : 静音

`playbackRate` ： 播放速度

### 时长控制

`duration` : 视频总时长, `MediaStream` 的视频源为`Infinity

`currentTime` : 视频当前播放进度, 单位： 秒

`played` :  视频已经播放的内容时间范围

`buffered` ：视频已经缓冲的内容时间范围

### 事件

- `canplay`

  视频已经缓冲了一定内容， 能够开始播放。

- `loadeddata`

  视频首帧加载完成

- `ended`

  视频播放完成

- `pause`

  当视频暂停

- `progress`

  在视频资源被浏览器加载的时候周期调用

- `timeupdate`

  视频进度（ `currentTime` ）改动时调用

- `volumechange`

  视频音量调节时调用

- `waiting`

  视频播放到未缓冲的进度时调用

- `stalled`

  用户请求视频数据，但是数据意外地没返回

  场景: 观看视频点击进度条到任意位置，该位置的视频数据由于一些原因请求失败.

### 问题

- 如何控制播放进度

  设置 `<video>` 的 currentTime来达到控制视频当前播放进度的目的

- 如何判断视频已经完全加载(缓冲完成)

  ```jsx
  const video = document.querySelector('video')
  const buf = video.buffered
  if (buf.length === 1) {
  	if (buf.start(0) === 0 && buf.end(0) === video.duration) {
  		// 视频缓冲完了
  	}
  }
  ```

- 如何全屏

  使用元素的 `[requestFullscreen](<https://developer.mozilla.org/en-US/docs/Web/API/Element/requestFullScreen>)` API, 返回一个promise

  ```jsx
  const videoEl = document.querySelector('video')
  videoEl.requestFullscreen()
  ```

- 如何实现倍速播放

  设置视频元素的 `playbackRate` 来达到目的

  ```jsx
  const videoEl = document.querySelector('video')
  // 正常速度
  videoEl.playbackRate = 1
  // 0.5倍速
  videlEl.playbackRate = 0.5
  // 2倍速
  videoEl.playbackRate = 2
  // ....
  ```