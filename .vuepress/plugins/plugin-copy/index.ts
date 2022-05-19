import { path } from '@vuepress/utils'

export default (options) => (app) => ({
  name: 'vuepress-plugin-init-pages',
  clientConfigFile: path.resolve(__dirname, './copy-code.ts'),
})
