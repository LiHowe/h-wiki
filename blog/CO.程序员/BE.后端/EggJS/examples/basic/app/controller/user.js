'use strict'

const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const Controller = require('egg').Controller

class UserController extends Controller {
  async index() {
    const { ctx } = this
    const res = await ctx.service.user.get(ctx.query)
    return ctx.helper.success({ ctx, res, msg: '请求成功' })
  }
  async login() {
    const { ctx } = this
    passport.use(new LocalStrategy((userName, password, done) => {
      // 先验证用户名有效性
      const userExist = ctx.service.user.get({ userName })
      if (!userExist) return done(null, false, { message: '用户名不存在' })
      const user = ctx.service.user.validPassword({ userName, password })
      if (!user) return done(null, false, { message: '密码错误' })
      return done(null, user)
    }))

  }
}

module.exports = UserController
