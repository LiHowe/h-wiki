'use strict'

/**
 * 中间件 -- 解决 get和post请求的query获取问题
 */
module.exports = () => {
  return async function params(ctx, next) {
    ctx.params = {
      ...ctx.query,
      ...ctx.request.body
    }
    await next()
  }
}
