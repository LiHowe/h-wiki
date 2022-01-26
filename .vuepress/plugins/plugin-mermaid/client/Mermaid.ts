import {defineComponent, h, onBeforeMount, onMounted, onUpdated} from 'vue'
import { nanoid } from 'nanoid'
import ToolBar from './ToolBar'
// import Mermaid from 'mermaid'
import { applyTheme } from './theme'
declare global {
  interface Window {
    __mermaid: any
  }
}

export default defineComponent({
  name: 'Mermaid',
  props: {
    code: {
      type: String,
      required: true,
      default: ''
    },
    config: {
      type: String,
      default: ''
    }
  },
  setup(props) {
    const id = 'mermaid-' + nanoid(4)
    const baseConfig = {
      startOnLoad: false,
      securityLevel: 'loose'
    }

    const render = () => {
      window.__mermaid?.mermaidAPI.render(`mermaid_${nanoid(4)}`, props.code, svgCode => {
        document.querySelector(`#${id}`).innerHTML = svgCode
      })
    }
    // dev develop
    // @ts-ignore
    // if (__VUEPRESS_DEV__) onUpdated(render)

    onBeforeMount(async () => {
      window.__mermaid = (await import('mermaid')).default
      console.log('call beforeMount', window.__mermaid)
      window.__mermaid.initialize(baseConfig)
      render()
    })

    onMounted(render)
    let themeConfig = {}
    try {
      themeConfig = JSON.parse(props.config?.replace(/\'/g, '\"') || '{}')
    } catch (e) {
      console.error(e)
    }

    return () => h('div', {
      class: 'mermaid-wrapper',
    }, [
      h(ToolBar, { target: id }),
      h('pre', {
        id,
        class: 'mermaid-svg-wrapper'
      }, applyTheme(props.code, themeConfig))
    ])
  }
})
