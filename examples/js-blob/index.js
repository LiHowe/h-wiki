// const uploader = document.querySelector('#uploader')

function logFiles (inputEl) {
  const files = inputEl.files
  console.log(files)
}

const textBlob = new Blob(['this is text Blob'], { type: 'text/plain' })
const textBlob2 = new Blob([new Uint8Array([','.charCodeAt(0), 104, 111, 119, 101])], { type: 'text/plain' })
const textFile = new File([textBlob, textBlob2], 'demo.txt', { lastModified: Date.now() })
console.log(textFile)
const reader = new FileReader()
reader.readAsText(textFile)
reader.addEventListener('load', () => {
  console.log(reader.result)
})
reader.addEventListener('error', e => {
  console.error(`reader读取文件错误, ${e}`)
})

console.log(new File([new Blob(['中文字符'], { type: 'text/plain' })], '中文.txt'))
console.log(new File([new Blob([''], { type: 'text/plain' })], '符号.txt'))

// TODO: 中文字符占用字节数, 以及默认编码格式是什么
