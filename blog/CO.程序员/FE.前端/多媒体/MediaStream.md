# MediaStream

MediaStream是使用WebAPI来通过浏览器获取用户的摄像头、麦克风以及屏幕展示的权限之后媒体设备所采集的音视频数据流，主要使用场景有
1. 屏幕录制或共享（如有些面试的笔试链接）
2. 音视频通话（如视频会议, 需要[WebRTC](CO.程序员/FE.前端/WebRTC/WebRTC.md)）
3. 音视频录制
4. 语音识别()

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



其中, 设备约束可以是准确值, 也可以是范围值, 可以使用以下属性来控制所请求设备的**属性参数范围**:

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



### 2. 媒体设备约束参数

#### 通用属性 - common

+ `deviceId`: 用于指定请求特定设备
+ `groupId`: 请求特定组设备

#### 视频设备 - Video

+ [`aspectRatio`](https://developer.mozilla.org/en-US/docs/Web/API/MediaTrackConstraints/aspectRatio): 
+ [`facingMode`](https://developer.mozilla.org/en-US/docs/Web/API/MediaTrackConstraints/facingMode): 前置 | 后置摄像头
+ `frameRate`: 视频帧率, 如果不指定的话, 系统会默认与屏幕垂直同步率相同
+ `height`: 视频高度
+ `width`: 视频宽度

#### 音频设备 - Audio

+ `autoGainControl`: 声音自动增强
+ `channelCount`: 声道数量
+ `echoCancellation`: 回声消除
+ `latency`: 延迟
+ `noiseSuppression`: 噪音抑制
+ `sampleRate`: 音频采样率
+ `sampleSize`: 音频位深
+ `volume`: 音量



### 3. 使用媒体流

通过上面的操作我们可以拿到用户音视频设备的数据流, 这样我们就可以使用这些数据进行加工, 录制和传输了.

一个媒体流对象(`MediaStream`)中包含一个或多个媒体轨道(`MediaTrack`)

操作媒体流实质上是在操作媒体轨道

```javascript
// getMedia方法来自[1. 获取媒体权限]
const stream = await getMedia()

```





### 4. 操作媒体轨道

首先, 我们先分清`constraints`, `settings`, `capabilities`这三个概念

+ `capabilities`: 表明当前轨道的能力范围
+ `constraints`: 表示当前用户请求设备的约束条件
+ `settings`: 表示实际上系统返回给用户的设备信息

除非用户指定`exact`属性来表明特定值, 否则系统返回给用户的设备是不确定的







## 常见操作

### 1. 音频录制

通过上面我们可以获取到媒体输入设备的媒体数据流, 所以我们只需要使用该媒体流进行存储即可.
1. **获取媒体流**

```javascript
let stream = null
try {
  // 由于我们只是录制音频, 所以只需要打开音频
  stream = await navigator.mediaDevices.getUserMedia({ audio: true })
} catch (e) {
  console.error('获取音频设备失败')
}

```

2. **加工（可选）**

  因为音频的默认采样率是44100Hz, 如果直接存储这么高采样率的音频会造成资源的浪费， 所以我们往往需要将默认采样率压缩到一个比较低的值（通常会压缩到16000Hz）

  又因为压缩音频操作属于纯数据处理，没必要在主线程进行处理，所以音频的压缩转码等操作一般使用[WebWorker](CO.程序员/FE.前端/基础/WebWorker.md)来处理

  

3. **存储**

   