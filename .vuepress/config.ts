import definitions from './config/definitions'
import themeConfig from './config/themeConfig'
import { defaultTheme } from 'vuepress'
import { viteBundler } from '@vuepress/bundler-vite'

import CopyPlugin from './plugins/plugin-copy'
import MarkdownEnhance from 'vuepress-plugin-md-enhance'

export default {
  title: 'Howe\'s Wiki',
  description: 'Knowledge of all i know about',
  lang: 'zh-CN',
  bundler: viteBundler({
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
    },
    vuePluginOptions: {},
  }),
  dev: {
    open: false, // 是否自动打开浏览器
  },
  // 使用的是markdown-it来渲染的, 所以支持markdown-it的插件
  // markdown: {
  //   anchor: false, // 如果设置为false, 会导致默认主题的侧边栏导航失效
  //   emoji: {},
  // },
  theme: defaultTheme(themeConfig),
  // <head>配置
  head: [
    ['link', { rel: 'manifest', href: '/manifest.webmanifest'} ],
    ['link', {rel: 'icon', href: '/images/icon.png'}],
    ['link', { rel: 'stylesheet', href: 'https://cdn.jsdelivr.net/npm/katex@0.13.5/dist/katex.min.css' }],
    ['script', { src: '//at.alicdn.com/t/font_2339230_l56isvfb5i8.js' }],
  ],
  // vuepress插件
  plugins: [
    // MermaidPlugin({}),
    CopyPlugin({}),
    // MarkdownPlugin({}),
    // MPlugin(),
    MarkdownEnhance({
      gfm: true,
      sup: true,
      sub: true,
      footnote: true,
      lazyLoad: true,
      tasklist: true,
      tex: true,
      mermaid: true,
      flowchart: true,
      include: {},
      codegroup: true,
      container: true,
    })
  ],
  define: definitions
}
