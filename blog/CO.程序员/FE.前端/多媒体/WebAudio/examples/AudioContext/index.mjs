import getGainNode from './gainNode.js'
import getAnalyser from './analyser.js'
// 创建音频数据上下文
const ctx = new AudioContext()

const audioElement = document.querySelector('#audio')

// 获取音频标签的音频数据流
const source = ctx.createMediaElementSource(audioElement)

// 处理器绑定输入
source.connect(getGainNode(ctx))
source.connect(getAnalyser(ctx))
