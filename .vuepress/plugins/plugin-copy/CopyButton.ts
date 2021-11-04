import { h, ref, onMounted, createApp } from 'vue'
import Clipboard from 'clipboard'
export default createApp({
  setup(props, ctx) {
    const copy = ref('copy')
    const status = ref(0)
    onMounted(() => {
      const copyCode = new Clipboard(copy.value, {
        target (trigger) {
          return trigger.previousElementSibling
        }
      })
      copyCode.on('success', event => {
        event.clearSelection()
        status.value = 1
        // 2s 后还原状态
        window.setTimeout(() => {
          status.value = 0
        }, 2000)
      })
    })
    const classes = `
    dark:bg-gray-700 dark:text-gray-200 group-hover:opacity-100
    h-8 w-8 shadow-md
    rounded text-base
    bottom-1 right-1
    absolute opacity-0
    transition-opacity
    bg-gray-800
    text-gray-100
    duration-150
    border
    border-gray-50
    flex items-center justify-center
    hover:text-green-400
    hover:border-green-400
    `
    return () => h('button', {
      props: {
        ref: copy.value,
      },
      class: classes,
    }, [status.value])
  }
})
