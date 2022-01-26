---
WIP: false
categories:
  - frontend
  - media
titleSlug: media/stream
title: MediaStream
series: Web Media
thumbnail: ''
description: 暂无
wip: true
top: false
---



# MediaStream

MediaStream是使用WebAPI来通过浏览器获取用户的摄像头、麦克风以及屏幕展示的权限之后媒体设备所采集的音视频数据流，主要使用场景有
1. 屏幕录制或共享（如有些面试的笔试链接）
2. 音视频通话（如视频会议, 配合[WebRTC](CO.程序员/FE.前端/WebRTC/WebRTC.md)）
3. 音视频录制编辑
4. 语音识别(配合AI能力)

## 基本使用

### 1. 获取媒体权限

通过使用 `navigator.mediaDevices.getUserMedia(设备约束)` API来向用户请求媒体设备权限, 返回一个`Promise`, 请求成功则会返回一个包含所请求设备约束的媒体流对象-`MediaStream`, 请求失败(如用户拒绝、设备不存在)则会返回`DOMException`类型错误

例如:
```javascript
async function getMedia() {
  let stream = null
	try {
    stream = await navigator.mediaDevices.getUserMedia(
      { video: true, audio: true } // 同时获取音视频
    )
  } catch (e) {
    // 错误处理
  }
  return stream
}
```



其中, 设备约束可以是**准确值**, 也可以是**范围值**, 可以使用以下属性来控制所请求设备的**属性参数范围**:

+ `ideal`: 表示期望值, 浏览器可能会返回能用但是不符合期望的设备

+ `min`: 最低期望

+ `max`: 最高期望

+ `exact`: 精确值, 如果没有符合精确值的设备会返回`NotFoundError`

  

例子:

+ 没有要求, 能用就行

```javascript
{
  audio: true,
  video: true
}
```



+ **期望**请求到`1280 * 720`分辨率的视频设备

> 注意: 这只是一个期望值, 浏览器会尝试请求符合你期望的分辨率的设备, 如果无法精准满足你所期望的值的时候, 浏览器将会返回其他分辨率的设备

```javascript
{
  audio: true,
  video: {
    width: 1280,
    height: 720,
  }
}
// 👆等同于上面
{
  audio: true,
  video: {
    width: {
      ideal: 1280
    },
    height: {
      ideal: 720
    }
  }
}
```

+ **强制**请求到`1280*720`分辨率的视频设备

```javascript
{
  audio: true,
  video: {
    width: {
      exact: 1280
    },
    height: {
      exact: 720
    },
  }
}
```

如果用户设备不满足所请求的视频分辨率, 则会reject一个`NotFoundError`

+ **移动设备**请求前置或者后置摄像头

```javascript
{
  audio: true,
  video: {
    facingMode: {
      extar: 'user', // 'user'为前置, environment'为后置
    },
  }
}
```



#### 媒体设备约束参数

**通用属性 - common**

+ `deviceId`: 用于指定请求特定设备
+ `groupId`: 请求特定组设备

**视频设备 - Video**

+ [`aspectRatio`](https://developer.mozilla.org/en-US/docs/Web/API/MediaTrackConstraints/aspectRatio): 
+ [`facingMode`](https://developer.mozilla.org/en-US/docs/Web/API/MediaTrackConstraints/facingMode): 前置 | 后置摄像头
+ `frameRate`: 视频帧率, 如果不指定的话, 系统会默认与屏幕垂直同步率相同
+ `height`: 视频高度
+ `width`: 视频宽度

**音频设备 - Audio**

+ `autoGainControl`: 声音自动增强
+ `channelCount`: 声道数量
+ `echoCancellation`: 回声消除
+ `latency`: 延迟
+ `noiseSuppression`: 噪音抑制
+ `sampleRate`: 音频采样率
+ `sampleSize`: 音频位深
+ `volume`: 音量



### 2. 媒体流(MediaStream)

以常见的剪辑软件(Adobe Pr)为例, 可以看出, 一个媒体流对象(`MediaStream`)中包含**一个或多个**媒体轨道(`MediaTrack`)

媒体轨道分为**音频轨道**和**视频轨道**

![image-20211112145756904](https://i.loli.net/2021/11/12/cvKN3YqhCa5g8Gy.png)



#### 创建媒体流

获得媒体流对象的方式有以下几种

1. 请求用户媒体设备返回的媒体流

   如 `navigator.mediaDevices.getUserMedia({ audio: true, video: true })`

2. 由构造函数创建

   1. 创建空媒体流对象(不包含轨道数据)

      ```javascript
      const ms = new MediaStream()
      ```

      ![image-20211112153615108](https://i.loli.net/2021/11/12/icZjXpGx2AgvJsz.png)
      
   2. 由已有轨道或者媒体流创建
   
      ```javascript
      // 已有媒体流对象 ms1
      const ms = new MediaStream(ms1)
      
      // 已有媒体轨道对象 mt1
      const ms = new MediaStream([mt1])
      
      // 有多个媒体轨道 mts
      const ms = new MediaStream(mts)
      ```
   
      > 注: 一个媒体轨道可以由多个媒体流共享



媒体流对象会在实例化的时候生成一个36位的字符串UUID(唯一标识符)作为id

媒体流对象有两个只读属性

+ `active`:

  + `boolean` 

  + 如果对象内包含的媒体轨道(MediaStreamTrack)有`readyState`为`"live"`的, 则为`true`,否则为`false`

    即, 媒体流对象的状态取决于媒体轨道的整体状态, 如果所有轨道都处于结束状态, 则媒体对象也会对应失活

+ `id`
  + `string`
  + 在媒体流对象实例化的时候自动生成(一个36位的字符串UUID)



#### 常用方法

+ **获取轨道**

  + `getTracks()`

    获取媒体流全部轨道

    ![image-20211112142923557](https://i.loli.net/2021/11/12/hwpPlEWsdx75DNf.png)

  + `getAudioTracks()`

    获取全部音频轨道, 如上图中`kind`为`audio`的轨道对象

  + `getVideoTracks()`

    获取全部视频轨道, 如上图中`kind`为`video`的轨道对象

  + `getTrackById(id)`

    根据轨道的`id`来获取轨道

+ **增删轨道**
  
  + `addTrack(track)`
  + `removeTrack(track)`



### 3. 媒体轨道(MediaStreamTrack)

在看过了媒体流操作之后, 我们来了解一下媒体轨道的使用

#### 属性

首先, 我们来看下媒体轨道对象的属性都有哪些

<img src="https://i.loli.net/2021/11/12/E8zdNehTrUt4OoB.png" alt="image-20211112170431907" style="zoom:50%;" />

+ `enabled`: 唯一可以更改的属性, 用来控制轨道的启用与否, 我们可以通过更改该属性来开关摄像头以及麦克风
+ `id`: 对象唯一标识
+ `kind`: 轨道的类型, 音频: `audio`, 视频: `video`
+ `label`: 轨道数据源对应的设备标识
+ `muted`: 是否因为技术问题而无法提供媒体数据(非传统静音含义)
+ `readyState`: 轨道状态
  + `"live"`: 激活态, 轨道提供实时数据
  + `"ended"`: 结束态, 轨道将不再提供新数据



#### 方法

**获取属性**

+ `getCapabilities()`
+ `getConstraints()`
+ `getSettings()`



**操作**

+ `applyConstraints(constraints)`: 为轨道应用新约束条件
+ `stop()`: 停止轨道数据传输, 将轨道`readyState`置为`ended`
+ `clone()`: 创建轨道副本



<iframe height="300" style="width: 100%;" scrolling="no" title="Untitled" src="https://codepen.io/lihowe/embed/preview/wvqEJVp?default-tab=html" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href="https://codepen.io/lihowe/pen/wvqEJVp">
  Untitled</a> by Howe (<a href="https://codepen.io/lihowe">@lihowe</a>)
  on <a href="https://codepen.io">CodePen</a>.
</iframe>
> 由于iframe导致权限无法获取, 请自行在浏览器中模拟或者打开新浏览器窗口至CodePen进行测试

#### `constraints`, `settings`, `capabilities`的区别

+ `capabilities`

  表明当前轨道的能力范围, 即, 媒体轨道可以接收的值的范围

+ `constraints`

  表示当前用户请求设备的约束条件, 可能是模糊的或不满足轨道能力的约束条件范围

+ `settings`

  表示实际上系统返回给用户的设备信息, 即, 当用户给予不符合轨道能力范围的约束或者模糊的约束条件时, 系统返回给用户的设备信息

除非用户指定`exact`属性来表明特定值, 否则系统返回给用户的设备是不确定的

让我们通过下面的例子来加深理解

```javascript
// 我们请求音频设备, 不表明约束条件
const mediaStream = await navigator.mediaDevices.getUserMedia({ audio: true})
```

这时候我们调用音频轨道的`getConstraints()`

```javascript
mediaStream.getAudioTracks()[0].getConstraints()
```

![image-20211115103905688](https://i.loli.net/2021/11/15/mhlPtdELoXG6IzQ.png)

因为我们的约束只是`audio: true`, 即没有特定约束, 所以获取约束条件返回空对象`{}`

再让我们看下其他两个方法的返回值

![image-20211115104334194](https://i.loli.net/2021/11/15/WNsRrF5EuJt2Z8b.png)

我们看出`getSettings()`更像是约束的`exact`值

![image-20211115105108031](https://i.loli.net/2021/11/15/8dJuPkC9nFs5SNm.png)

### 4. 媒体设备

`MediaDevices`主要为我们提供访问连接媒体输入设备的方法

+ `enumerateDevices(): Promise<Array<InputDeviceInfo | MediaDeviceInfo>>`

  枚举出所有可用的输入以及输出设备

  ```javascript
  const devices = await navigator.mediaDevices.enumerateDevices()
  console.log(devices)
  ```

  ![image-20211115101222490](https://i.loli.net/2021/11/15/O8cyC5BJlsoD1HW.png)

+ `getSupportedConstraints()`

  返回当前浏览器环境可以支持的媒体约束属性

  ![image-20211115101411534](https://i.loli.net/2021/11/15/1xuUEVNP8ClcTIk.png)

  返回的对象的key即为我们可以设置的[媒体设备约束参数](###媒体设备约束参数)

+ `getUserMedia(constraints): Promise<MediaStream>`

  获取用户的相机或麦克风, 返回包含对应约束设备数据的媒体流

+ `getDisplayMedia(): Promise<MediaStream>`

  获取用户屏幕显示内容(具体内容由用户选择决定), 移动端浏览器均不支持(*统计于2021/11*)

