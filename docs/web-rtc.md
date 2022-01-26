---
categories:
  - frontend
  - webrtc
titleSlug: web/rtc
title: WebRTC
series: Web Media
thumbnail: ''
description: 暂无
wip: true
top: false
---
# WebRTC

WebRTC: Web Real-Time Communications, WebRTC允许两个设备之间进行实时,点对点的数据交换. 目前主要应用场景有: 音视频通话, 屏幕共享等

## 名词

+ **ICE**
Interactive Connectivity Establishment, 交互式连接建立. 用于让两端互相找到对方并建立连接.

+ **NAT**
Network Address Translation

+ **STUN**
Session Traversal Utilities for NAT, 用来获取用户IP地址

+ **TURN**
Traversal Using Relays around NAT, 在STUN失败的时候使用, 作为中继服务器

+ **SDP**
Session Description Protocol, 是点对点连接的标准

+ **Signaling**(信令)
  WebRTC使用RTCPeerConnection在浏览器之间进行流式数据通信,但也需要一种机制来协调通信并发送控制信息,这一过程被称为信令。


## 主要接口

下面接口使用的都是 `navigator.mediaDevices` 下的方法, 直接使用`navigator`的方式已被标记为废弃.

### EnumerateDevices

用于获取用户媒体设备信息, 可以获取当前用户环境可用的所有媒体设备列表.

```javascript
// 可以得到用户的媒体设备信息, 返回用户可用媒体设备列表(输入设备与输出设备)
const devices = await navigator.mediaDevices.enumerateDevices()
```
![设备信息输出](https://i.loli.net/2021/08/12/HzDq6wEucb3AF8O.png)

每个设备对象都有4个属性

+ `deviceId`: 设备id, 在获取媒体流(`getUserMedia`)时候可以指定设备
+ `groupId`: 设备组id
+ `kind`: 设备类型(音频|视频, 输入|输出)
+ `label`: 设备名称

### MediaStream(getUserMedia())

用于获取媒体流(通过媒体设备输入或输出的二进制数据)

**使用方法**:

`navigator.mediaDevices.getUserMedia(constraints):Promise<MediaStream>`

> 下面为老方法: MDN标记已废弃, 不推荐使用
> `navigator.getUserMedia(constraints, successCallback, errorCallback):void`

该方法接收参数`constraints`为请求媒体设备的设置,其中包含音频轨道(`audio`) 与 视频轨道(`video`)设置, 会返回一个包含所请求轨道的媒体流(`MediaStream`).

音频与视频轨道的通用配置有

+ `deviceId`: 使用指定的媒体设备
+ `groupId`: 使用指定设备组

音视频特定配置如下, 其中每个配置项都支持**详细配置**与**简洁配置**

**详细配置**: 支持期望值(ideal) 与 精准值(extra) 或者 最大(max)最小(min)值配置, 如果请求的精准值系统无法满足则会报错.

**简洁配置**: 直接指定一个值, 由系统判断来使用最接近这个值的设备.


> 在不使用extra的情况下, 请求返回的媒体流的各项参数配置并不一定等于你的配置值
>
> 在用户环境不满足你所请求的设备要求时, 系统会将你所请求的值设置为系统支持的最大值

> 音频与视频配置的每个属性的**默认值**以及**可接受配置值**可能会根据设备环境的不同而不同.
>
> 以下设置的默认值为 **2019 Macbook Pro**环境下测试结果.


#### audio

该属性可以直接写 `true(全部系统默认设置)` 或者对以下某些属性进行单独配置.

+ `autoGainControl`: `boolean` 默认 `true`

  是否开启音频自动增益(开启后声音会大一些). safari不支持
  + `true`: 开启
  + `false`: 关闭

+ `channelCount`: `number`, 默认 `1`

  声道数, 支持 max, min 设置. firefox不支持
  + `1`: 单声道
  + `2`: 立体声

+ `echoCancellation`: `boolean`,默认 `true`

  回声消除(减少回音收集)

+ `latency`: `number`, 默认 `0.01`

  延迟, 以`秒`为单位

+ `noiseSuppression`: `boolean`, 默认 `true`

  噪音抑制(会减少环境声干扰). safari不支持

+ `sampleRate`: `number`, 默认 `48000`(48kHz)

  音频采样率. firefox不支持

+ `sampleSize`: `number`, 默认 `16`(16bit)

  音频线性采样大小. firefox不支持

#### video

+ `width`: `number`

  视频宽度

+ `height`: `number`

  视频高度

+ `frameRate`: `number`, 默认 `30`

  视频帧数

+ `facingMode`: `string`

  摄像头

  + `'user'`: 前置摄像头
  + `'environment'`: 后置摄像头

+ `aspectRatio`: `number`

  视频宽高比, 比如 `1920/1080`, 也可以直接写计算结果 `1.7777777777777777`

#### 例子

```javascript
// 获取 1080P 画质 60帧 的音视频媒体流
const stream = await navigator.mediaDevices.getUserMedia({
  video: {
    width: 1920,
    height: 1080,
    frameRate: 60,
  },
  audio: true
})
```



#### 获取当前环境支持的配置项

我们可以使用 `navigator.mediaDevices.getSupportedConstraints()` 来获取当前浏览器环境所支持的媒体设置.


![Group 3](https://i.loli.net/2021/08/12/LZMtwSG2CyOvrnN.png)



#### 获取音视频配置取值范围

也可以使用媒体流(MediaStream)来获取音频或视频轨道, 然后来获取对应音视频配置项的支持范围

```javascript
const stream = await navigator.mediaDevices.getUserMedia({
  video: {
    width: 1920,
    height: 1080,
    frameRate: 60,
  },
  audio: true
})

// 获取视频轨道
const videoTrack = stream.getVideoTracks()[0]
// 获取音频轨道
const audioTrack = stream.getAudioTracks()[0]

console.log(videoTrack.getCapabilities())
console.log(audioTrack.getCapabilities())
```

![image-20210816142705757](https://i.loli.net/2021/08/16/5ODyKZqcUYpmxnd.png)



![image-20210816142810429](https://i.loli.net/2021/08/16/TGX7nU5yajvbpOW.png)



### MediaRecorder

**十分简单**的用来录制媒体的接口.

> 兼容性问题: Safari 与 Opera 不支持.

#### 使用

构造函数:

```javascript
const mediaRecorder = new MediaRecorder(MediaStream, [options])
```

+ `MediaStream`: 需要录制的媒体流
+ `options`: 可选, 可以配置音频和视频的录制码率以及格式

为什么说这是个十分简单的接口, 因为它提供了直观且简单的调用方法来让我们进行音视频录制.

+ `mediaRecorder.start()`: 开始录制
+ `mediaRecorder.stop()`: 停止录制
+ `mediaRecorder.pause()`: 暂停录制
+ `mediaRecorder.resume()`: 继续录制


+ `mediaRecorder.requestData()`: 请求从`调用start`到`调用该方法`之间的录制结果, 返回 Blob
+ `mediaRecorder.isTypeSupported(mimeType)`: 判断当前环境是否支持传入的mime类型

该接口也提供了一些便捷的事件

+ `onndataavaliable`: 在`stop()`之后可用, 可以获得录制的媒体数据(Blob)
+ `onstart`: 开始时调用
+ `onstop`: 结束时调用
+ `onpause`: 暂停时调用
+ `onresume`: 恢复录制时调用
+ `onerror`: 错误

#### 例子

```javascript

const videoEl = document.createElement('video')
document.body.appendChild(videoEl)
videoEl.autoplay = true
const mediaStream = navigator.mediaDevices.getUserMedia({ video: true, audio: true })
videoEl.srcObject = mediaStream
const recorder = new MediaRecorder(mediaStream, { type: 'video/webm;codecs=vp9,opus' })
const recordData = []

// 存储录制数据
recorder.ondataavailable = ({ data }) => {
  recordData.push(data)
}

recorder.start()

// 录制5s
setTimeout(() => {
  recorder.stop()
  download()
}, 5 * 1000)

// 下载录制视频
function download () {
  const downloadLink = document.createElement('a')
  a.download = 'demo.webm'
  a.url = URL.createObjectURL(new Blob(recordData, { type: recorder.mimeType }))
  a.click()
  URL.revokeObjectURL(a.url)
}
```

### RTCPeerConnection

### RTCDataChannel


## 参考链接

+ [WebRTC samples](https://webrtc.github.io/samples/)
