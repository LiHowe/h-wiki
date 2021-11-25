function getSvg (selectorOrEl: string | SVGElement): SVGElement {
  if (!selectorOrEl) return
  let svg = null
  if (typeof selectorOrEl === 'string') {
    if (!selectorOrEl.startsWith('#') && !selectorOrEl.startsWith('.')) selectorOrEl = `#${selectorOrEl}`
    svg = document.querySelector(selectorOrEl)
    if (!svg) return
  } else {
    svg = selectorOrEl
  }
  return svg
}

export function svg2canvas (selectorOrEl: string | SVGElement): Promise<HTMLCanvasElement> {
  const svg = getSvg(selectorOrEl)
  if (!svg) return
  const canvas = document.createElement('canvas')
  const content = canvas.getContext('2d')
  const img = new Image()
  img.src = 'data:image/svg+xml,' + svg.outerHTML
  return new Promise(resolve => {
    img.onload = () => {
      canvas.width = img.width
      canvas.height = img.height
      content.drawImage(img, 0, 0)
      resolve(canvas)
    }
  })
}

export function svg2blob (selectorOrEl: string | SVGElement): Blob {
  const svg = getSvg(selectorOrEl)
  if (!svg) return
  return new Blob([svg.outerHTML], { type: 'image/svg+xml;charset=utf-8' })
}

export function blob2Base64 (blob: Blob): Promise<String> {
  const reader = new FileReader()
  reader.readAsDataURL(blob)
  return new Promise(resolve => {
    reader.onloadend = () => {
      resolve(reader.result as String)
    }
  })
}
