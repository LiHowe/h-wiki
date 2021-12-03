import MermaidPlugin from './markdown-it-mermaidx'
import { path } from '@vuepress/utils'
import { MermaidThemeConfig } from '../client/theme'
export interface MermaidConfiguration {
  themeConfig?: MermaidThemeConfig
}

export default  (opt: MermaidConfiguration = {}) => ({
  name: 'vuepress-plugin-markdown-mermaid',
  clientAppEnhanceFiles: path.resolve(__dirname, '../client/enhance.ts'),
  extendsMarkdown: (md: any) => {
    md.__mermaidConfig = opt
    md.use(MermaidPlugin)
  }
})
