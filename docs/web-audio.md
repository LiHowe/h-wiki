---
categories:
  - frontend
  - media
titleSlug: ''
title: 录音
thumbnail: ''
description: 暂无
series: Web Media
wip: true
top: false
---
# Web Audio API

目前可以使用以下几种方式来在网页上进行录音, 基本原理都是先获取媒体设备数据流, 然后使用不同的对象进行处理存储.

## 1. 使用ScriptProcessor获取数据进行录音

> 该方法已被MDN标记为废弃, 处理音频数据官方推荐**AudioWorklet**

主要使用HTML5的[WebAudioAPI](CO.程序员/FE.前端/多媒体/WebAudioAPI.md)进行实现, 主要流程如下

![整体流程](https://i.loli.net/2021/07/23/qs4lyPumXBkgZ3Y.png)

### 创建音频上下文

音频上下文(Audio context)用于创建一个上下文来供用户使用[WebAudioAPI](CO.程序员/FE.前端/多媒体/WebAudioAPI.md)操作音频

`const audioContext = new AudioContext()`

### 获取麦克风权限

使用`navigator.mediaDevices.getUserMedia()` 来向用户请求媒体权限, 获取成功后悔得到一个媒体流(MediaStream) 值得注意的是**该动作可能会一直pending, 因为用户可能既不点`允许` 又不点 `拒绝`**

```jsx
navigator.mediaDevices.getUserMedia(
  { audio: true, video: false },
  stream => {
    this.handleMediaSuccess(stream);
    this._log('✅ 获取录音权限成功!');
  },
  e => {
    this._log('❌ 获取录音权限失败!', e);
  }
);

// 或者
navigator.mediaDevices.getUserMedia({ audio: true, video: false}))
.then(stream => {})
.catch(e => {})

// 又或者

const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: false}))
```

如果想要查看用户媒体设备列表则可以使用

`navigator.mediaDevices.enumerateDevices()` 来获取, 该方法返回一个promise, 包含了用户的设备信息

### 创建音频处理节点

使用 `AudioContext.createScriptProcessor(缓冲区大小?, 输入声道数?, 输出声道数?)` 来创建一个处理器来处理音频

-   缓冲区大小: 非必须, 取值必须是 `256, 512, 1024, 2048, 4096, 8192, 16384` 其中的一个, 如果不传或者传 `0` , 则会取用当前环境最适合的缓冲区大小
-   输入声道数: 非必须, 最大为32, 默认为2
-   输出声道数: 非必须, 最大为32, 默认为2

```jsx
const audioCtx = new AudioContext()
const processor = audioCtx.createScriptProcessor(0, 1, 1)
```

然后使用 `onaudioprocess` 来获取音频输入流的声道样本数据并进行处理(比如降低采样率、位深、转码等).

```jsx
processor.onaudioprocess = e => {
  // 单声道, 直接获取0
  this.worker.postMessage({
    type: 'iat',
    data: e.inputBuffer.getChannelData(0),
  });
};
```

将音频处理器(processor)与音频上下文(context)进行连接

```jsx
audioCtx.connect(processor)
processor.connect(audioCtx.destination)
```

由于音频操作基本上是纯数据操作, 这样我们就可以将这些操作移交给 `Web Worker` 去进行处理, `new ProcessWorker()` ,然后通过 Worker与主线程的通信进行数据传输(`postmessage`, `onmessage`).

### 处理音频

-   **将音频采样率降低至16kHz**
    
    ```jsx
    to16kHz(audioData) {
      const data = new Float32Array(audioData);
      const fitCount = Math.round(data.length * (16000 / 44100));
      const newData = new Float32Array(fitCount);
      const springFactor = (data.length - 1) / (fitCount - 1);
      newData[0] = data[0];
      for (let i = 1; i < fitCount - 1; i++) {
        var tmp = i * springFactor;
        var before = Math.floor(tmp).toFixed();
        var after = Math.ceil(tmp).toFixed();
        var atPoint = tmp - before;
        newData[i] = data[before] + (data[after] - data[before]) * atPoint;
      }
      newData[fitCount - 1] = data[data.length - 1];
      return newData;
    }
    ```
    
-   **转换位深为16bit**
    
    ```jsx
    to16BitPCM(input) {
      const dataLength = input.length * (16 / 8);
      const dataBuffer = new ArrayBuffer(dataLength);
      const dataView = new DataView(dataBuffer);
      const offset = 0;
      for (let i = 0; i < input.length; i++, offset += 2) {
        const s = Math.max(-1, Math.min(1, input[i]));
        // 32768 (16-bit) or 8388608 (24-bit)
        dataView.setInt16(offset, s < 0 ? s * 0x8000 : s * 0x7fff, true);
      }
      return dataView;
    }
    ```
    
-   **转换音频格式为WAV**
    
    下图为WAV文件编码
    
   ![WAV文件编码](https://i.loli.net/2021/10/11/TyqKemfhbIv2xr3.png)
   
```javascript
// 源自 mattdiamond/Recorderjs
encodeWAV(originBuffer) {
	const buffer = new ArrayBuffer(44 + originBuffer.length * 2);
	const view = new DataView(buffer);
	const numChannels = 1;
	const sampleRate = 16000; // 与音频采样率数据保持一致

	function writeString(view, offset, string) {
		for (var i = 0; i < string.length; i++) {
			view.setUint8(offset + i, string.charCodeAt(i));
		}
	}

	/* RIFF identifier */
	writeString(view, 0, 'RIFF');
	/* RIFF chunk length */
	view.setUint32(4, 36 + originBuffer.length * 2, true);
	/* RIFF type */
	writeString(view, 8, 'WAVE');
	/* format chunk identifier */
	writeString(view, 12, 'fmt ');
	/* format chunk length */
	view.setUint32(16, 16, true);
	/* sample format (raw) */
	view.setUint16(20, 1, true);
	/* channel count */
	view.setUint16(22, numChannels, true);
	/* sample rate */
	view.setUint32(24, sampleRate, true);
	/* byte rate (sample rate * block align) */
	view.setUint32(28, sampleRate * 4, true);
	/* block align (channel count * bytes per sample) */
	view.setUint16(32, numChannels * 2, true);
	/* bits per sample */
	view.setUint16(34, 16, true);
	/* data chunk identifier */
	writeString(view, 36, 'data');
	/* data chunk length */
	view.setUint32(40, originBuffer.length * 2, true);
	const offset = 44;
	for (let i = 0; i < input.length; i++, offset += 2) {
		const s = Math.max(-1, Math.min(1, originBuffer[i]));
		// 32768 (16-bit) or 8388608 (24-bit)
		view.setInt16(offset, s < 0 ? s * 0x8000 : s * 0x7fff, true);
	}
}
```

### 下载音频文件

使用 `new Blob([audioBufferData], { type: 'audio/wav' })` 来生成音频文件的Blob对象, 然后使用 `fileSaver` 或者创建 a标签进行下载

```jsx
// data为 dataview
const url = URL.createObjectURL(new Blob([data], { type: 'audio/wav' }))
createDownloadLink(url) {
  const a = document.createElement('a');
  a.href = url;
  a.download = new Date().toISOString() + '.wav';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}
```



## 2. 使用MediaRecorder进行录制

### 2.1 获取媒体流

```javascript
const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
```



### 2.2 创建录音器

```javascript
const recorder = new MediaRecorder(stream)
```

> 如果stream是音视频都包含的话可以将音频轨道提取并添加到新建的媒体流中
>
> 如:
>
> ```javascript
> const audioStream = new MediaStream(stream.getAudioTracks())
> const recorder = new MediaRecorder(audioStream)
> ```



### 2.3 绑定事件并开始录音

```javascript
recorder.ondataavailable = ({ data }) => {
  // 一些操作, data是录制好的音频Blob
}
// 可以传入时间间隔参数
// 如果传入时间间隔参数,那么ondataavailable将会按此间隔不断被调用
// 如果不传, 则只会在调用stop方法的时候被调用
recorder.start()
// ... 等待录音
recorder.stop() // 会触发ondataavailable
```

