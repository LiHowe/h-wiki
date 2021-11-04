'use strict'

const Controller = require('egg').Controller

class TaskController extends Controller {
  /**
   * 获取任务列表
   */
  async index() {
    const { ctx } = this
    const res = await ctx.service.task.get(ctx.query)
    return ctx.helper.success({
      ctx,
      res,
      msg: '查询成功'
    })
  }

  /**
   * 创建任务
   */
  // async create() {}

  /**
   * 更新任务信息
   */
  // async update() {}

  /**
   * 删除任务
   */
  // async destroy() {}
}

module.exports = TaskController
