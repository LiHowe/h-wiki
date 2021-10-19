const definitions = require('./config/definitions')
const themeConfig = require('./config/themeConfig')

module.exports = {
  title: 'H-Wiki',
  description: 'This is my blog',
  lang: 'zh-CN',
  // 使用的是markdown-it来渲染的, 所以支持markdown-it的插件
  markdown: {
    lineNumbers: true, // 配置显示行号
    extendMarkdown: md => {
      // 使用markdown-it插件 md.use(require('markdown-it-xxx'))
      md.use(require('markdown-it-footnote'))
      md.use(require('markdown-it-sub'))
      md.use(require('markdown-it-sup'))
      md.use(require('markdown-it-katex'))
    }
  },
  // 主题配置
  themeConfig,
  // <head>配置
  head: [
    ['link', {rel: 'icon', href: '/images/icon.png'}],
    ['link', { rel: 'stylesheet', href: 'https://cdn.jsdelivr.net/npm/katex@0.13.5/dist/katex.min.css' }],
    ['script', { href: '//at.alicdn.com/t/font_2339230_gyuxqs79usf.js' }]
  ],
  // vuepress插件
  plugins: [],
  define: definitions
}
