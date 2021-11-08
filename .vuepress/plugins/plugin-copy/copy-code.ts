import { defineClientAppSetup } from '@vuepress/client'
import { onMounted, createApp } from 'vue'
import CopyButton from './Button.vue'
import { nanoid } from 'nanoid'

const codeElements = () => document.querySelectorAll('div[class*="language-"]')
export default defineClientAppSetup(() => {
  onMounted(() => {
    console.log('mounted')
    setTimeout(() => {
      codeElements().forEach(el => {
        const uid = nanoid(4)
        const element = document.createElement('span')
        element.style.position = 'absolute'
        element.style.right = '0px'
        element.style.bottom = '0px'
        element.style.zIndex = '1'
        createApp({ ...CopyButton, props: ['uid']}, {
          uid
        }).mount(element)
        el.appendChild(element)
        el.children[0].setAttribute('id', uid.toString())
      })
    }, 1000)
  })
})

