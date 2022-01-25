// ------- GainNode --------
export default (ctx) => {
// 创建声音增益处理器
  const gainNode = ctx.createGain()
  const gainValueNode = document.querySelector('#gainValue')
  // 改变声音增益, gain.maxValue 与 gain.minValue可以取到增益的最大值和最小值.
  // 为了耳膜着想, 增大一倍 (gain.value = 2) 就可以试出效果了.
  gainValueNode.onchange = (range) => {
    gainValueNode.innerHTML = range.value
    gainNode.gain.value = Number(range.value)
  }
  // 处理器绑定输出
  gainNode.connect(ctx.destination)
  return gainNode
}
