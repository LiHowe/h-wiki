import { defineClientAppEnhance } from '@vuepress/client'
import Mermaid from './Mermaid'

export default defineClientAppEnhance(({ app }) => {
  console.log(app)
  app.component('Mermaid', Mermaid)
})
