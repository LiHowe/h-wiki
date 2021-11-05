/**
 * @param options 插件参数
 * @parma app
 */
export default (options, app) => ({
  name: 'vuepress-plugin-markdown-enhance',
  extendsMarkdown: md => {
    // 使用markdown-it插件 md.use(require('markdown-it-xxx'))
    md.use(require('markdown-it-footnote'))
    md.use(require('markdown-it-sub'))
    md.use(require('markdown-it-sup'))
    md.use(require('markdown-it-katex'))
  }
})
