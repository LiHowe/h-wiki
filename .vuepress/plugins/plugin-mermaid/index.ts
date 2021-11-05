import MermaidPlugin from './markdown-it-mermaidx'
import { path } from '@vuepress/utils'

export default  () => ({
  name: 'vuepress-plugin-markdown-mermaid',
  clientAppEnhanceFiles: path.resolve(__dirname, './enhance.ts'),
  extendsMarkdown: (md) => {
    md.use(MermaidPlugin)
  }
})
