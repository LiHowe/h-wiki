import { defineClientAppEnhance } from '@vuepress/client'
import Mermaid from './index.vue'

export default defineClientAppEnhance(({ app }) => {
  app.component('Mermaid', Mermaid)
})
