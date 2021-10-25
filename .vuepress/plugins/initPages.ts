import { createPage } from '@vuepress/core'
import { Context } from 'vuepress-types'
/**
 * @param options 插件参数
 * @parma app 
 */
export default (options, app: Context) => ({
  name: 'vuepress-plugin-init-pages',
  onInitialized: async (app) => {
    console.log('enter plugin')
    debugger
  },
  onPrepared: (app) => {
    console.log('prepared', app)
    debugger
  },
  extendPageData (page) {
    page.$frontmatter.wip = false
  }
})
