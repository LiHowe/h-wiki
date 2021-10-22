/**
 * 用于增强app功能
 */

import { defineClientAppEnhance } from '@vuepress/client'
import HomeLayout from './HomeLayout.vue'

export default defineClientAppEnhance(({ app }) => {
  app.component('HomeLayout', HomeLayout)
})
