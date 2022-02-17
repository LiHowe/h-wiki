---
WIP: false
categories:
  - frontend
  - media
titleSlug: media-recorder
title: Media Recorder
series: Web Media
thumbnail: ''
description: 暂无
wip: true
top: false
---

# Media Recorder

MediaRecorder是用来录制媒体的接口, 它接收一个媒体流, 对该媒体流进行录制.

## 使用

### 例子

```javascript
const rc = new MediaRecorder(stream)
rc.start()
rc.ondataavailable = ({ data }) => {
  // data is blob
  videoElement.src = URL.createObjectURL(data)
}
setTimeout(() => {
  rc.stop()
})
```



### 实例化

语法: 

```javascript
const rc = new MediaRecorder(stream[, options])
```

Recorder实例的属性及方法如下:



**属性(均为只读)**

+ `mimeType`
+ `state`: 当前录制器状态, (`inactive`, `recording`, `paused`)
+ `stream`: 当前录制器的录制源(媒体流)
+ `ignoreMutedMedia`: 是否忽略无声的或者黑屏的视频, 默认进行录制
+ `videoBitsPerSecond`: 视频码率
+ `audioBitsPerSecond`: 音频码率



**方法**

+ `isTypeSupported(mimetype)`

​	用来判断传入的 `mimetype` 是否受当前环境(设备)支持

+ `start(timeslice?)`

​	开始录制

​	`timeslice` 为可选参数, 用于控制Recorder切割视频片段的间隔, 如果不设置则为连续, 否则会每隔 `timeslice` 毫秒自动调用一次 `requestData` 来返回该时间间隔内所录制的内容.

​	该方法会触发 recorder 的 `onstart` 事件

+ `pause()`

​	暂停录制

​	该方法会触发 recorder 的 `onpause` 事件

+ `resume()`

​	恢复录制

​	该方法会触发 recorder 的 `onresume` 事件

+ `stop()`

​	停止录制

​	会触发 `ondataavailable` 方法来返回录制内容, 同时将 `Recorder` 实例的 `state` 设置为 `inactive`

​	也会触发 `onstop` 事件



**事件**

+ `ondataavailable`
+ `onerror`
+ `onpause`
+ `onresume`
+ `onstart`
+ `onstop`