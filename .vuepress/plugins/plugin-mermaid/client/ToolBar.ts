import { defineComponent, h, onMounted, ref, onBeforeMount } from 'vue'
import { svg2blob } from './utils'

function downloadIcon () {
  return `<svg t="1637825330776" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2305" width="200" height="200"><path d="M704 341.333333h64a64 64 0 0 1 64 64v362.666667a64 64 0 0 1-64 64H256a64 64 0 0 1-64-64V405.333333a64 64 0 0 1 64-64h64v64h-64v362.666667h512V405.333333h-64v-64z m-154.794667-212.266666l0.042667 347.456 74.005333-74.026667 45.226667 45.248-150.826667 150.848-150.848-150.826667 45.248-45.269333 73.173334 73.173333V129.066667h64z" p-id="2306"></path></svg>`
}

function buttonStyle () {
  return `
  border: none;
  font-size: 1.5rem;
  border-radius: 4px;
  cursor: pointer;
  `
}

export default defineComponent({
  name: 'ToolBar',
  props: {
    target: {
      type: String,
      default: '',
      required: true
    }
  },
  setup(props) {
    function saveSVG () {
      const svg = document.querySelector(`#${props.target}`) as SVGElement
      const url = URL.createObjectURL(svg2blob(svg))
      const downloadLink = document.createElement('a')
      downloadLink.href = url
      downloadLink.download = `${svg.id}.svg`
      downloadLink.click()
      URL.revokeObjectURL(url)
    }
    const root = ref(null)
    onMounted(() => {
      root.value.innerHTML = downloadIcon()
    })
    return () => h('div', [
      // download button
      h('button', {
        onClick: saveSVG,
        ref: root,
        style: buttonStyle()
      }, 'download')
      // copy button
    ])
  }
})
