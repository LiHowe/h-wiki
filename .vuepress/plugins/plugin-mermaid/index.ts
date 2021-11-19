import MermaidPlugin from './markdown-it-mermaidx'
import { path } from '@vuepress/utils'
export interface MermaidConfiguration {
  theme?: string
  securityLevel?: string
}

export default  (opt: MermaidConfiguration = {}) => ({
  name: 'vuepress-plugin-markdown-mermaid',
  clientAppEnhanceFiles: path.resolve(__dirname, './enhance.ts'),
  extendsMarkdown: (md: any) => {
    md.__mermaidConfig = opt
    md.use(MermaidPlugin)
  }
})
