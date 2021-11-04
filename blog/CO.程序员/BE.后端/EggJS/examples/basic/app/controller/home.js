'use strict'

const Controller = require('egg').Controller

class HomeController extends Controller {
  async index() {
    const { ctx } = this
    const name = ctx.query.name
    const res = await ctx.service.user.find(name)
    ctx.body = res.user
  }
}

module.exports = HomeController
