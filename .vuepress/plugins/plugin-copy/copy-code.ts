import { defineClientConfig } from '@vuepress/client'
import { onMounted, createApp, watch } from 'vue'
import CopyButton from './Button.vue'
import { customAlphabet } from 'nanoid'
import { useRoute } from 'vue-router'

const nanoid = customAlphabet('abcdefg', 4)

const codeElements = () => document.querySelectorAll('div[class*="language-"]')
export default defineClientConfig({
  setup: () => {
    const route = useRoute()
    function genBtn() {
      setTimeout(() => {
        codeElements().forEach(el => {
          const uid = nanoid()
          const element = document.createElement('span')
          element.style.position = 'absolute'
          element.style.right = '0px'
          element.style.bottom = '0px'
          element.style.zIndex = '1'
          el.appendChild(element)
          createApp({ ...CopyButton, props: ['uid']}, {
            uid
          }).mount(element)
          el.children[0].setAttribute('id', uid.toString())
        })
      }, 500)
    }

    onMounted(() => {
      genBtn()
    })

    watch(() => route.path, () => {
      genBtn()
    })
  }
})

