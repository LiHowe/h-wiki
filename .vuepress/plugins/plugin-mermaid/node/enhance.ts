import { defineClientAppEnhance } from '@vuepress/client'
import Mermaid from '../client/Mermaid'

export default defineClientAppEnhance(({ app }) => {
  app.component('Mermaid', Mermaid)
})
