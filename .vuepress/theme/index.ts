import { path } from '@vuepress/utils'
// TODO: [主题]待完成
export default {
  name: 'vuepress-theme-h-wiki', // 插件名称
  extends: '@vuepress/theme-default', // 需要继承的主题
  // 指定主题的布局组件, 一个主题必须至少有两个布局： Layout和404
  layouts: path.resolve(__dirname, './layouts')
}
