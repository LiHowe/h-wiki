import { defineComponent, h, onMounted, ref, onBeforeMount } from 'vue'
import { svg2blob } from './utils'
import { downloadIcon } from './icons'

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
      root.value.innerHTML = downloadIcon
    })
    // TODO: Copy button
    // TODO: Convert to origin code button
    return () => h('div', {
      class: 'mermaid-toolbar'
    },[
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
