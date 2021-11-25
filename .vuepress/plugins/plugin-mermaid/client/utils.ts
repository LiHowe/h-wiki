export function svg2canvas () {
  
}

export function svg2img (selectorOrEl: string | SVGElement): string {
  if (!selectorOrEl) return
  let svg = null
  if (typeof selectorOrEl === 'string') {
    if (!selectorOrEl.startsWith('#') && !selectorOrEl.startsWith('.')) selectorOrEl = `#${selectorOrEl}`
    svg = document.querySelector(selectorOrEl)
    if (!svg) return
  } else {
    svg = selectorOrEl
  }
  const svgBlob = new Blob([svg.outerHTML], { type: 'image/svg+xml;charset=utf-8' })
  return URL.createObjectURL(svgBlob)
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
