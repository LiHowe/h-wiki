/**
 *
 */
export default class Recorder {

  /**
   * 视频类型
   */
  static VideoType = {
    WEBM_VP9: 'video/webm;codecs=vp9,opus',
    WEBM_VP8: 'video/webm;codecs=vp8,opus',
    WEBM_H264: 'video/webm;codecs=h264,opus',
    MP4_H264: 'video/mp4;codecs=h264,aac',
    MP4_H265: 'video/mp4;codecs=h265,aac'
  }

  /**
   * 音频格式
   * @type {{MP3, OPUS, AAC, FLAC}}
   */
  static AudioType = {
    MP3: 'audio/mp3',
    OPUS: 'audio/opus',
    AAC: 'audio/aac',
    FLAC: 'audio/flac'
  }

  /**
   * 录制状态
   * @type {{READY, PAUSED, PROCESSED, ENDED, ERROR}}
   */
  static Status = {
    READY: 1,
    PROCESSED: 2,
    PAUSED: 3,
    ENDED: 4,
    ERROR: -1
  }

  /**
   * 事件
   */
  static Hooks = {
    START: 1,
    PAUSE: 2,
    RESUME: 3,
    PROCESS: 4,
    STOP: 5,
    ERROR: 6
  }

  state = 0

  /**
   * 录制对象对象<br/>
   * Opera & Safari 目前尚未支持 (since 08/17-21)
   * TODO: opera & Safari采用其他方式进行录制
   * @type {MediaRecorder}
   */
  recorder = null

  /**
   * 事件监听
   */
  listener = {}

  /**
   * 音视频数据
   * @type {[]}
   */
  recordData = []

  constructor (stream, options = {}) {
    this.recorder = new MediaRecorder(stream, Object.assign({
      mimeType: Recorder.VideoType.WEBM_H264
    }, options))
    this.state = Recorder.Status.READY
    this.listener = {}
    this.initRecorderEvent()
  }

  /**
   * 获取支持的媒体类型
   * @param params {{audio: boolean, video: boolean}}
   */
  getSupportedTypes ({ audio, video } = { audio: true, video: true }) {
    const res = {
      audio: [],
      video: []
    }
    if (audio) {
      res.audio = Object.keys(Recorder.AudioType).filter(key => {
        return MediaRecorder.isTypeSupported(Recorder.AudioType[key])
      }).map(key => ({
        [key]: Recorder.AudioType[key]
      }))
    }
    if (video) {
      res.video = Object.keys(Recorder.VideoType).filter(key => {
        return MediaRecorder.isTypeSupported(Recorder.VideoType[key])
      }).map(key => ({
        [key]: Recorder.VideoType[key]
      }))
    }
    return res
  }

  start = () => {
    this.recorder.start()
  }

  pause = () => {
    this.recorder.pause()
  }

  resume = () => {
    this.recorder.resume()
  }

  stop = () => {
    this.recorder.stop()
  }

  reset = () => {
    this.recordData = []
  }

  /**
   * 初始化录制事件
   */
  initRecorderEvent () {
    const {
      START,
      PROCESS,
      PAUSE,
      RESUME,
      STOP
    } = Recorder.Hooks
    this.recorder.onstart = () => {
      this.state = Recorder.Status.PROCESSED
      this.listener[START] && this.listener[START].forEach(fn => {
        this.callFnWithCatch(fn)
      })
    }
    this.recorder.ondataavailable = ({ data }) => {
      this.listener[PROCESS] && this.listener[PROCESS].forEach(fn => {
        this.callFnWithCatch(fn, data)
      })
      this.recordData.push(data)
    }
    this.recorder.onpause = () => {
      this.state = Recorder.Status.PAUSED
      this.listener[PAUSE] && this.listener[PAUSE].forEach(fn => {
        this.callFnWithCatch(fn)
      })
    }
    this.recorder.onresume = () => {
      this.state = Recorder.Status.PROCESSED
      this.listener[RESUME] && this.listener[RESUME].forEach(fn => {
        this.callFnWithCatch(fn)
      })
    }
    this.recorder.onstop = () => {
      this.state = Recorder.Status.ENDED
      this.listener[STOP] && this.listener[STOP].forEach(fn => {
        this.callFnWithCatch(fn, this.recordData)
      })
    }
  }

  /**
   * 事件监听
   * @param type {number}
   * @param handler
   * @return {number} 事件id, 用于注销
   */
  on = (type, handler) => {
    if (!Recorder.Hooks[type]) {
      console.log('没有该事件 -- ', type)
      return -1
    }
    if (!this.listener[type]) {
      this.listener[type] = []
    }
    const exist = this.listener[type].findIndex(handler)
    if (exist !== -1) return exist
    this.listener[type].push(handler)
    return this.listener[type].length - 1
  }

  /**
   * 取消事件监听
   * @param type
   * @param handler
   */
  off = (type, handler) => {
    const handlers = this.listener[type]
    if (!handlers || handlers.length === 0) return
    for (let i = 0, l = handlers.length; i < l; i++) {
      if (handlers[i] === handler) {
        this.listener[type].splice(i, 1)
        return
      }
    }
  }

  /**
   * 错误捕获
   * @param error
   */
  handleError (error) {
    console.log('❌ 错误', error)
    this.listener[Recorder.Hooks.ERROR].forEach(fn => {
      fn(error)
    })
  }

  /**
   * 调用方法
   * @param fn
   * @param params
   */
  callFnWithCatch = (fn, ...params) => {
    try {
      fn(...params)
    } catch (e) {
      this.handleError(e)
    }
  }

  exportToBlob = () => {
    return new Blob(this.recordData, { type: this.recorder.mimeType })
  }
}
