import { path } from '@vuepress/utils'
// TODO: [主题]待完成
/**
 * @param opts 插件配置
 */
export default (opts: Record<string, any>) => ({
  name: 'vuepress-theme-wiki', // 插件名称
  // extends: '@vuepress/theme-default', // 需要继承的主题
  // 指定主题的布局组件, 一个主题必须至少有两个布局： Layout和 404
  layouts: path.resolve(__dirname, './layouts'),
  plugins: [
    // 这个插件会将config.ts中的`themeConfig`作为对象生成临时文件
    // `import { themeData } from '@temp/internal/themeData.js'`
    ['@vuepress/theme-data', { themeData: opts }],
  ]
})
