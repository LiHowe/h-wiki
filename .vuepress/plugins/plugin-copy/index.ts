import { path } from '@vuepress/utils'
/**
 * @param options 插件参数
 * @parma app 
 */
export default (options, app) => ({
  name: 'vuepress-plugin-init-pages',
  clientAppSetupFiles: path.resolve(__dirname, './copy-code.ts')
})
