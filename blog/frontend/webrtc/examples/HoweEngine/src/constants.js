export default {
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
