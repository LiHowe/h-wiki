import definitions from './config/definitions'
import themeConfig from './config/themeConfig'
import { path } from '@vuepress/utils'

export default {
  title: 'Howe\'s Blog',
  description: 'This is my blog',
  lang: 'zh-CN',
  bundler: '@vuepress/bundler-vite',
  bundlerConfig: {
    viteOptions: {
      css: {
        postcss: {
          plugins: [
            require('tailwindcss'),
            require('autoprefixer'),
            require('postcss-nested')
          ]
        }
      },
    }
  },
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
  // theme: path.resolve(__dirname, './theme/index.ts'),
  // 主题配置
  themeConfig,
  // <head>配置
  head: [
    ['link', {rel: 'icon', href: '/images/icon.png'}],
    ['link', { rel: 'stylesheet', href: 'https://cdn.jsdelivr.net/npm/katex@0.13.5/dist/katex.min.css' }],
    ['script', { href: '//at.alicdn.com/t/font_2339230_gyuxqs79usf.js' }],
    ['script', { href: 'https://cpwebassets.codepen.io/assets/embed/ei.js' }], // codepen
  ],
  // vuepress插件
  plugins: [
    [require('./plugins/initPages.ts'), {}]
  ],
  define: definitions
}