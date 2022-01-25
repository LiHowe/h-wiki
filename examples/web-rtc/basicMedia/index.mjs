import HoweEngine, {EngineEvent} from "../../HoweEngine/engine.js";
import Constants from "../../HoweEngine/constants.js"
import { translate } from "../../HoweEngine/utils.js";
import {generateButton, generateCheckbox, generateSelect} from '../utils.js'
import Recorder from "../../HoweEngine/recorder.js";

const operateArea = document.querySelector('.setting-area')
const displayArea = document.querySelector('.display-area')
const snipArea = document.querySelector('.snip-area')
// 获取引擎
const engine = new HoweEngine()
window.engine = engine

// 构建视频tag
const videoEl = document.querySelector('#v')
videoEl.style.width = '100%'

// 获取视频流
const stream = await engine.getStream()
videoEl.srcObject = stream

// 音频设备列表
const mics = await engine.getMics()
generateSelect('音频输入:', mics.map(mic => ({
  label: mic.label,
  value: mic.deviceId
})), mic => {
  engine.changeAudioInput(mic.value)
}, operateArea)

// 视频设备列表
const cameras = await engine.getCameras()
console.log(cameras)
generateSelect('视频输入:', cameras.map(cam => ({
  label: cam.label,
  value: cam.deviceId
})), cam => {
  engine.changeVideoInput(cam.value)
}, operateArea)

const sounds = await engine.getSoundOutputs()
generateSelect('音频输出:', sounds.map(s => ({
  label: s.label,
  value: s.deviceId
})), s => {
  engine.changeAudioOutput(s.value)
}, operateArea)


generateButton('关闭摄像头', (btn) => {
  engine.toggledCamera(!engine.getVideoConfig('enabled'))
  btn.innerText = `${engine.getVideoConfig('enabled') ? '关闭' : '开启'}摄像头`
}, operateArea)


// 截图
generateButton('截图', async () => {
  const img = document.createElement('img')
  img.src = await engine.grabFrame()
  if (!img.src) return
  img.classList.add('w-1/4')
  snipArea.appendChild(img)
}, operateArea)


// 还原分辨率
generateButton('还原分辨率', () => {
  engine.changeDefinition(Constants.definitions.AUTO)
}, operateArea)

// 分辨率列表, 改变分辨率
const definitions = Object.keys(Constants.definitions)
generateSelect('分辨率列表:',definitions.map(key => {
  return {
    label: key,
    value: Constants.definitions[key]
  }
}), (item => {
  engine.setVideoConfig(item.value)
}), operateArea)

generateCheckbox('噪声抑制', (flag) => {
  engine.setAudioConfig({
    noiseSuppression: flag
  })
}, operateArea)

generateCheckbox('静音', () => {
  engine.getAudioConfig('enabled') ? engine.mute() : engine.unmute()
}, operateArea, false)

generateCheckbox('自动增强', (flag) => {
  engine.setAudioConfig({
    autoGainControl: flag
  })
}, operateArea)

generateCheckbox('回声抑制', flag => {
  engine.setAudioConfig({
    echoCancellation: flag
  })
}, operateArea)

let canvas

generateCheckbox('声波图', flag => {
  if (flag) {
    !canvas && generateOscilloscope()
  } else {
    console.log('delete canvas')
    if (canvas) {
      canvas.remove()
      canvas = null
    }
  }
}, operateArea, false)

// 声波图, 计算原理待学习
function generateOscilloscope() {
  const analyser = engine.audioAnalyser || engine.initAnalyser()
  canvas = document.createElement('canvas')
  const wrapper = document.querySelector('.audio-area')
  const canvasCtx = canvas.getContext('2d')
  canvas.id = 'oscilloscope'
  canvas.width = wrapper.offsetWidth
  canvas.height = 100
  wrapper.appendChild(canvas)
  const data = new Uint8Array(canvas.width)
  canvasCtx.strokeStyle = 'rgb(10,130,211)'

  const interval = setInterval(() => {
    if (!canvas) {
      clearInterval(interval)
      return
    }
    canvasCtx.fillStyle = '#f8f8f8';
    canvasCtx.fillRect(0, 0, canvas.width, canvas.height)

    analyser.getByteFrequencyData(data)
    canvasCtx.lineWidth = 2
    data.forEach((y, x) => {
      y = canvas.height - (y / 128) * canvas.height / 4
      const c = Math.floor((x * 255) / canvas.width)
      canvasCtx.fillStyle = "rgb(" + c + ",0," + (255 - x) + ")"
      canvasCtx.fillRect(x, y, 2, canvas.height - y)
    });

    analyser.getByteTimeDomainData(data)
    canvasCtx.lineWidth = 3
    canvasCtx.beginPath()
    data.forEach((y, x) => {
      y = canvas.height - (y / 128) * canvas.height / 2
      x ? canvasCtx.lineTo(x, y) : canvasCtx.moveTo(x, y)
    });
    canvasCtx.stroke()
  }, 1000 * canvas.width / engine.getAudioConfig('sampleRate'))
}

function showAudioInfo (config) {
  const wrapper = document.querySelector('.audio-info')
  const existUl = wrapper.querySelector('ul')
  if (existUl) existUl.remove()
  const ul = document.createElement('ul')
  for (let key in translate.audio) {
    const li = document.createElement('li')
    li.classList.add('text-sm')
    li.innerHTML = `<strong>${translate.audio[key]}:</strong> ${config[key]}`
    ul.appendChild(li)
  }
  wrapper.appendChild(ul)
}

function showVideoInfo (config) {
  const wrapper = document.querySelector('.video-info')
  const existUl = wrapper.querySelector('ul')
  if (existUl) existUl.remove()
  const ul = document.createElement('ul')
  for (let key in translate.video) {
    const li = document.createElement('li')
    li.classList.add('text-sm')
    li.innerHTML = `<strong>${translate.video[key]}:</strong> ${config[key]}`
    ul.appendChild(li)
  }
  wrapper.appendChild(ul)
}

showAudioInfo(engine.getAudioConfig())
showVideoInfo(engine.getVideoConfig())

engine.on(EngineEvent.AudioConfigChange, e => {
  showAudioInfo(e.getAudioConfig())
})

engine.on(EngineEvent.VideoConfigChange, e => {
  showVideoInfo(e.getVideoConfig())
})

let recorder = new Recorder(await engine.getStream())
const recordData = []

generateButton('录制视频', async () => {
  console.log('开始录制')
  recorder.start()
}, operateArea)

generateButton('暂停录制', (btn) => {
  console.log('暂停/恢复录制', recorder.state)
  const isPaused = recorder.state === Recorder.Status.PAUSED
  isPaused ? recorder.resume() : recorder.pause()
  btn.innerText = isPaused ? '开始录制' : '暂停录制'
}, operateArea)

generateButton('停止录制', () => {
  console.log('停止录制')
  recorder.stop()
}, operateArea)

generateButton('预览录制视频', () => {
  const v = document.createElement('video')
  v.src = window.URL.createObjectURL(recorder.exportToBlob())
  v.controls = true
  v.autoplay = true
  displayArea.appendChild(v)
}, operateArea)
