import { createPage } from '@vuepress/core'
/**
 * @param options 插件参数
 * @parma app 
 */
export default (options, app) => {
  console.log('enter', app)
  return {
    name: 'vuepress-plugin-init-pages',
    onInitialized: async (app) => {
    }
  }
}
