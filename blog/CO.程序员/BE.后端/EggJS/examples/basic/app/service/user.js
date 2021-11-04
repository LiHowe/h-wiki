'use strict'

const Service = require('egg').Service

/**
 * 服务(Service)
 * 由于Service继承自egg的Service, 所以this有下列属性便于开发
 * ctx: 请求的上下文
 *  curl: 用于发起网络请求
 *  service: 用于调用其他service
 *  db: 用于调用DB
 * app: 当前应用实例
 * service: 可以访问到其他的Service, 相当于ctx.service
 * config: 运行项
 * logger: logger对象, 有debug, info, warn, error四种等级的log
 */
class UserService extends Service {
  async get() {
    return await this.ctx.model.User.findAll()
  }
}

module.exports = UserService
