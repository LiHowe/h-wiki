import { defineClientAppSetup } from '@vuepress/client'
import { onMounted, createApp } from 'vue'
import CopyButton from './CopyButton'

const codeElements = () => document.querySelectorAll('div[class*="language-"]')
// TODO: 复制代码组件实现
export default defineClientAppSetup(() => {
  onMounted(() => {
    console.log('mounted')
    setTimeout(() => {
      console.log('genCode')
      codeElements().forEach(el => {
        const element = document.createElement('div')
        element.style.position = 'absolute'
        element.style.top = '0px'
        CopyButton.mount(element)
        el.appendChild(element)
      })
    }, 1000)
  })
})

