---
categories:
  - frontend
  - media
titleSlug: analyser
title: 音频分析器
thumbnail: ''
series: Web Media
description: 暂无
wip: true
top: false
---
# Analyser

音频分析器主要用来获取音频的`频域` 和 `时域` 数据, 便于用户进行可视化展示`ss`

## 使用

创建分析器

```javascript

const analyser = ctx.createAnalyser()

analyser.fftSize = 2**11 // 设置快速傅里叶变换窗口大小, 取值为2^5 至 2^15, 默认 2048

```


获取频域数据

+ Uint8Array: `analyser.getByteFrequencyData()`
+ Float32Array: `analyser.getFloatFrequencyData()`

  

获取时域数据

+ Uint8Array: `analyser.getByteTimeDomainData()`
+ Float32Array: `analyser.getFloatTimeDomainData()`


## 例子
创建一个声波图

```javascript

/**
* index.html
* <audio id="audio" src="./demo.m4a"></audio>
*/

const ctx = new AudioContext()

const audioElement = document.querySelector('#audio')

// 获取音频标签的音频数据流

const source = ctx.createMediaElementSource(audioElement)

// ------- Analyser --------

const analyser = ctx.createAnalyser()

analyser.fftSize = 2048
const canvas = document.querySelector('#wave')
const canvasCtx = canvas.getContext('2d')
const arraybuffer = new Uint8Array(canvas.width)
let interval = null
audioElement.onplay = draw

audioElement.onstop = () => clearInterval(interval)

function draw() {
	interval = setInterval(() => {
		canvasCtx.fillStyle = '#f8f8f8';
		canvasCtx.fillRect(0, 0, canvas.width, canvas.height)
		analyser.getByteFrequencyData(arraybuffer)
		canvasCtx.lineWidth = 2
		arraybuffer.forEach((y, x) => {
			y = canvas.height - (y / 128) * canvas.height / 4
			const c = Math.floor((x * 255) / canvas.width)
			canvasCtx.fillStyle = "rgb(" + c + ",0," + (255 - x) + ")"
			canvasCtx.fillRect(x, y, 2, canvas.height - y)
		});
	}, 1000 * canvas.width / 48000)
}

analyser.connect(ctx.destination)
source.connect(analyser)

```


效果

![image-20210823135638796](https://i.loli.net/2021/08/23/H4edjtVOISDQ2AU.png)
