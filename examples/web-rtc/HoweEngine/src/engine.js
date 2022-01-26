const Constants = {
  /**
   * 设备类型
   * @type {{input: { audio: 'audioinput', video: 'videoinput' }, output: { audio: 'audiooutput' }}}
   */
   deviceType: {
    input: {
      audio: 'audioinput',
      video: 'videoinput'
    },
    output: {
      audio: 'audiooutput'
    }
  },
  /**
   * 清晰度
   * @type {{SD: object, HD: object, FULL_HD: object, AUTO: boolean}}
   */
  definitions: {
    FULL_HD: {
      width: 1920,
      height: 1080
    }, // 1080P
    HD: {
      width: 1280,
      height: 720
    }, // 720P
    SD: {
      width: 720,
      height: 480
    }, // 480P
  },
  videoOutputTypes: [
    'video/webm;codecs=vp9,opus',
    'video/webm;codecs=vp8,opus',
    'video/webm;codecs=h264,opus',
    'video/mp4;codecs=h264,aac',
    'video/mp4;codecs=h265,aac'
  ]
}
export const EngineEvent = {
  ConfigChange: 1000,
  AudioConfigChange: 1001,
  VideoConfigChange: 1002,
}

export default class HoweEngine {
  // 数据流
  stream = null
  // 环境
  #env = navigator.mediaDevices

  // chromium截取对象
  #captureObj = null

  // 视频轨道
  #videoTrack = null

  // 音视频设置
  settings = {
    audio: {
      channels: 1
    },
    video: {
      frameRate: 60
    }
  }

  /**
   * @type {MediaStreamTrack}
   */
  audioTrack = null

  /**
   * @type {MediaStreamTrack}
   */
  videoTrack = null

  audioContext

  audioAnalyser

  // 事件监听
  listeners = {}

  // 设备环境监测决定功能可用性
  feature = {
    imageCapture: false, // ImageCapture支持
  }

  // 约束条件
  constraint = {
    audio: null, // 音频设备约束
    video: null, // 视频设备约束
    frame: null, // 屏幕录制约束
  }

  /**
   * 开启音频设备
   * @param {boolean | Object} constraint 
   */
  useAudio = (constraint = true) => {
    this.constraint.audio = constraint
  }

  /**
   * 开启视频设备
   * @param {boolean | Object} constraint 
   */
  useVideo = (constraint = true) => {
    this.constraint.video = constraint
  }

  /**
   * 
   * @param {DeviceConstraint} constraint 
   */
  use = (constraint = { video: true, audio: true }) => {
    this.constraint = constraint
  }

  /**
   * 获取媒体流
   * @returns {Promise<MediaStream | null>}
   */
  getStream = async() => {
    if (this.stream) return this.stream
    let stream = null
    try {
      stream = await this.#env.getUserMedia({
        // 摄像头配置
        // width与height支持 min: 最小高度 max: 最大高度 ideal: 理想高度, 如果不想指定, 则可以直接写true
        video: {
          width: {
            min: 1280,
            max: 1920
          },
          height: {
            min: 720,
            max: 1080
          },
          frameRate: this.settings.video.frameRate,
        },
        audio: true
      })
    } catch (e) {
      console.error(e)
    }
    this.stream = stream
    this.audioTrack = this.stream.getAudioTracks()[0]
    this.videoTrack = this.stream.getVideoTracks()[0]
    this.settings.audio = { ...this.audioTrack.getSettings(), enabled: true}
    this.settings.video = { ...this.videoTrack.getSettings(), enabled: true }
    return stream
  }

  /**
   * 获取用户设备
   * @param {MediaDeviceKind[]} filters 过滤条件
   * @param {boolean} hideDefault 是否隐藏默认设备 -- 默认true
   * @returns {Promise<MediaDeviceInfo[]>}
   */
  #getUserDevices = async (filters = [], hideDefault = true) => {
    const devices = await this.#env.enumerateDevices()
    return devices.filter(d => filters.includes(d.kind) && d.deviceId !== 'default')
  }

  /**
   * 环境监测
   */
  detectEnv () {
    this.feature.imageCapture = !!window.ImageCapture
  }

  /**
   * 获取麦克风
   * @returns {Promise<MediaDeviceInfo[]>} 麦克风设备列表
   */
  getMics = async () => {
    return await this.#getUserDevices([Constants.deviceType.input.audio])
  }

  /**
   * 获取摄像头
   * @returns {Promise<MediaDeviceInfo[]>} 摄像头设备列表
   */
  getCameras = async () => {
    return await this.#getUserDevices([Constants.deviceType.input.video])
  }

  /**
   * 获取音频输出设备
   * @return {Promise<MediaDeviceInfo[]>}
   */
  getSoundOutputs = async () => {
    return await this.#getUserDevices([Constants.deviceType.output.audio])
  }

  /**
   * 开启/关闭摄像头
   * @param status {boolean}
   */
  toggledCamera = (status) => {
    if (status === null || status === undefined) {
      status = !this.settings.video.enabled
    }
    this.videoTrack.enabled = status
    this.settings.video.enabled = status
  }

  /**
   * 获取视频轨道
   * @return {null}
   */
  #getVideoTrack() {
    if (!this.stream) return null
    if (this.#videoTrack) return this.#videoTrack
    this.#videoTrack = this.stream.getVideoTracks()[0]
    return this.#videoTrack
  }

  /**
   * 截图
   * @returns {Promise<null|string>} 截图结果, 失败返回null, 成功返回图片的地址引用(blob:xxxxx)
   */
  capture = async({ width, height } = {}) => {
    // chromium 内核浏览器支持
    if (this.feature.imageCapture) {
      await this.#initCapture()
      const track = this.#getVideoTrack()
      if (!track) {
        console.log('没有视频轨道, 无法截图')
        return null
      }
      if (!track.enabled) {
        console.log('摄像头未开启, 无法截图')
        return null
      }
      console.time('截图耗时')
      // 目前首次截图耗时在3s左右, 之后平均耗时30ms. 主要是调用takePhoto方法的耗时, 初始化并不耗时
      const blob = await this.#captureObj.takePhoto({ width, height })
      console.timeEnd('截图耗时')
      return URL.createObjectURL(blob)
    } else {
      // 其他浏览器截图方法
    }
  }

  /**
   * 截帧(截图)
   * @return {Promise<string>} base64的png
   */
  grabFrame = async () => {
    // bit map picture
    await this.#initCapture()
    const bmp = await this.#captureObj.grabFrame()
    return new Promise(resolve => {
      const canvas = document.createElement('canvas')
      canvas.width = bmp.width
      canvas.height = bmp.height
      canvas.getContext('2d').drawImage(bmp, 0, 0)
      resolve(canvas.toDataURL())
    })
  }

  /**
   * 初始化Chromium截取功能
   * 可以原生实现照相与截帧操作. https://developer.mozilla.org/en-US/docs/Web/API/ImageCapture
   * 主要由Chromium内核浏览器实现, safari与firefox都不支持(2021.08)
   * @return {Promise<void>}
   */
  async #initCapture() {
    this.#captureObj = new ImageCapture(this.#getVideoTrack())
    console.log(await this.#captureObj.getPhotoSettings())
  }

  /**
   * 切换清晰度, 超出设备支持的清晰度将会降级为设备最高清晰度
   * @param {object} definition 清晰度
   */
  changeDefinition = async (definition) => {
    await this.stream.getVideoTracks()[0].applyConstraints(definition)
  }

  /**
   * TODO: 切换视频输入设备
   * @param deviceId {string}
   */
  changeVideoInput = async (deviceId) => {
    await this.setVideoConfig({ deviceId: { exact: deviceId }})
  }

  /**
   * 切换音频输入设备
   * 注意: 音频轨道无法直接通过applyConstraints来切换配置
   * @param deviceId {string}
   */
  changeAudioInput = async (deviceId) => {
    await this.setAudioConfig({ deviceId: { exact: deviceId} })
  }

  /**
   * TODO: 切换音频输出设备
   * @param deviceId
   * @return {Promise<void>}
   */
  changeAudioOutput = async (deviceId) => {

  }

  /**
   * 静音
   */
  mute = () => {
    this.audioTrack.enabled = false
    this.settings.audio.enabled = false
  }

  /**
   * 取消静音
   */
  unmute = () => {
    this.audioTrack.enabled = true
    this.settings.audio.enabled = true
  }

  /**
   * 更改音频轨道配置
   * 获取原轨道配置, 删除原音频轨道, 使用新规则轨道代替
   * @param config {MediaTrackConstraints}
   */
  setAudioConfig = async (config = {}) => {
    const { enabled } = Object.assign(this.settings.audio, config)
    this.audioTrack.stop()
    this.stream.removeTrack(this.audioTrack)
    this.audioTrack = (await this.#env.getUserMedia({ audio: this.settings.audio })).getAudioTracks()[0]
    this.stream.addTrack(this.audioTrack)
    this.audioTrack.enabled = this.settings.audio.enabled
    this.settings.audio = { ...this.audioTrack.getSettings(), enabled }
    this.#dispatch(EngineEvent.AudioConfigChange)
    this.#dispatch(EngineEvent.ConfigChange)
  }

  /**
   * 获取音频配置
   * @param [attr] {string} 可指定字段获取
   * @return {*|{channels: number}}
   */
  getAudioConfig = (attr = null) => attr ? this.settings.audio[attr] : this.settings.audio

  /**
   * 更改视频轨道配置
   * 直接更改原轨道
   * @param config
   * @return {Promise<void>}
   */
  setVideoConfig = async (config = {}) => {
    const { enabled } = Object.assign(this.settings.video, config)
    await this.videoTrack.applyConstraints(this.settings.video)
    this.settings.video = { ...this.videoTrack.getSettings(), enabled }
    this.#dispatch(EngineEvent.VideoConfigChange)
    this.#dispatch(EngineEvent.ConfigChange)
  }

  /**
   * 获取视频配置
   * @param [attr] {string} 可指定字段获取
   * @return {*|{frameRate: number}}
   */
  getVideoConfig = (attr = null) => attr ? this.settings.video[attr] : this.settings.video

  /**
   * 音频数据分析器
   * @return {AnalyserNode}
   */
  initAnalyser () {
    this.audioContext = new AudioContext()
    this.audioAnalyser = this.audioContext.createAnalyser()
    this.audioContext.createMediaStreamSource(this.stream).connect(this.audioAnalyser)
    return this.audioAnalyser
  }

  /**
   * 事件监听回调
   * @callback eventCallback
   * @param {HoweEngine} engineInstance
   * @return null
   */

  /**
   * 事件监听
   * @param eventType {number}
   * @param handler {eventCallback}
   */
  on = (eventType, handler) => {
    let cbs = this.listeners[eventType]
    if (!cbs) cbs = []
    if (cbs.find(item => item === handler)) return
    cbs.push(handler)
    this.listeners[eventType] = cbs
    console.log('添加事件监听', this.listeners[eventType])
  }

  /**
   * 取消事件监听
   * @param eventType {number}
   * @param handler {eventCallback}
   */
  off = (eventType, handler) => {
    if (!handler) throw new ParamError('handler')
    const handlers = this.listeners[eventType]
    if (!handlers) return
    for (let i = 0, l = handlers.length; i < l; i++) {
      if (handlers[i] === handler) {
        handlers.splice(i, 1)
        return
      }
    }
  }

  /**
   * 分发事件
   * @param eventType {number}
   */
  #dispatch (eventType) {
    if (!this.listeners[eventType]) return
    this.listeners[eventType].forEach(fn => {
      fn(this)
    })
  }

}

export class EngineError {

}

export class ParamError extends Error {
  name = '参数错误'
  message = '参数缺失:'

  constructor(paramName) {
    super();
    this.message += ` ${paramName}`
  }
}
