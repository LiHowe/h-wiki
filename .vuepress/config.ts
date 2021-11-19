import definitions from './config/definitions'
import themeConfig from './config/themeConfig'
import { path } from '@vuepress/utils'

export default {
  title: 'Howe\'s Blog',
  description: 'This is my blog',
  lang: 'zh-CN',
  bundler: '@vuepress/bundler-vite',
  open: false, // 是否自动打开浏览器
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
    // anchor: false, // 如果设置为false, 会导致默认主题的侧边栏导航失效
  },
  // theme: path.resolve(__dirname, './theme/index.ts'),
  // 主题配置
  themeConfig,
  // <head>配置
  head: [
    ['link', {rel: 'icon', href: '/images/icon.png'}],
    ['link', { rel: 'stylesheet', href: 'https://cdn.jsdelivr.net/npm/katex@0.13.5/dist/katex.min.css' }],
    ['script', { src: '//at.alicdn.com/t/font_2339230_l56isvfb5i8.js' }],
  ],
  // vuepress插件
  plugins: [
    [path.resolve(__dirname, './plugins/plugin-copy/index.ts'), {}],
    [path.resolve(__dirname, './plugins/markdown-plugin.ts'), {}],
    [path.resolve(__dirname, './plugins/plugin-mermaid/index.ts'), {
      theme: 'ocean',
    }],

    // ['mermaid-next', {
    //   theme: 'default',
    // }],
    ['@vuepress/plugin-git', false],
  ],
  define: definitions
}
