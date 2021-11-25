import { defineComponent, h, onMounted, onBeforeMount, onUpdated } from 'vue'
import { nanoid } from 'nanoid'
import { mergeThemeConfig } from './theme'
import ToolBar from './ToolBar'
interface Mermaid {
  init: any
}
declare global {
  interface Window {
    __mermaid: Mermaid
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
      defualt: ''
    }
  },
  setup(props) {
    const id = 'mermaid-wrapper' + nanoid(4)
    let configObj = {
      startOnLoad: true,
      securityLevel: 'loose',
      themeVariables: {
        primaryColor: '#3b82f6',
        darkMode: true,
        fontSize: '15px'
      }
    }
    try {
      configObj = JSON.parse(props.config?.replace(/\'/g, '\"') || '{}')
    } catch (e) {
      console.error(e)
    }

    function getMermaid (): Promise<Mermaid> {
      return new Promise(resolve => {
        if (window.__mermaid) {
          resolve(window.__mermaid)
          return
        }
        import('mermaid').then(({ default: Mermaid }) => {
          Mermaid.mermaidAPI.initialize(mergeThemeConfig(configObj))
          window && (window.__mermaid = Mermaid)
          resolve(Mermaid)
        })
      })
    }
    // The diagrams rendered by `init` is larger than the diagrams which rendered by `render`
    // I can not figure out for now
    // const init = async () => {
    //   console.log('call render')
    //   try {
    //     (await getMermaid()).init(undefined, `#${id}`)
    //   } catch (err) {
    //     console.error(err)
    //   }
    // }
    const render = async () => {
      (await getMermaid()).mermaidAPI.render(`mermaid_${nanoid(4)}`, props.code, svgCode => {
        document.querySelector(`#${id}`).innerHTML = svgCode
      })
    }
    // dev develop
    // @ts-ignore
    if (__VUEPRESS_DEV__) onUpdated(render)

    onMounted(render)

    return () => h('div', {
      class: 'mermaid',
    }, [ 
      h(ToolBar, { target: id }),
      h('div', {
        id
      }, props.code)
    ])
  }
})
