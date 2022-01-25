/* eslint valid-jsdoc: "off" */

'use strict'

/**
 * egg配置项, 返回一个object
 * 如果是返回object的function, 则可以接受appInfo参数,
 * appInfo 对象构成如下
 * {
 *  pkg     -> package.json,
 *  name    -> pkg.name
 *  baseDir -> 应用代码的目录
 *  HOME    -> 用户目录
 *  root    -> 应用根目录, 只有在 local 和 unittest 环境下为 baseDir, 其他环境都为 HOME
 * }
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {}

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1622095089764_1233'

  config.security = {
    csrf: {
      enable: false
    }
  }

  // add your middleware config here
  config.middleware = [
    'params'
  ]

  config.sequelize = {
    define: {
      freezeTableName: true,
    },
  }

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  }

  return {
    ...config,
    ...userConfig,
  }
}
