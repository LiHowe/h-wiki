export default (ctx) => {
  const audioElement = document.querySelector('#audio')

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
  return analyser
}
