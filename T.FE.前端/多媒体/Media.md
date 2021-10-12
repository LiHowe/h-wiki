# Web Media

WebMedia主要指使用WebAPI来通过浏览器获取用户的摄像头、麦克风以及屏幕展示的权限，主要使用场景有
1.  屏幕录制或共享（如有些面试的笔试链接）
2. 音视频通话（如视频会议）
3. 音视频录制

## 使用

### 获取媒体权限

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



### 媒体设备约束参数

#### 通用属性 - common

+ `deviceId`: 用于指定请求特定设备
+ `groupId`: 请求特定组设备

#### 视频设备 - Video

+ [`aspectRatio`](https://developer.mozilla.org/en-US/docs/Web/API/MediaTrackConstraints/aspectRatio): 
+ [`facingMode`](https://developer.mozilla.org/en-US/docs/Web/API/MediaTrackConstraints/facingMode): 前置 | 后置摄像头
+ `frameRate`: 视频帧率
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

