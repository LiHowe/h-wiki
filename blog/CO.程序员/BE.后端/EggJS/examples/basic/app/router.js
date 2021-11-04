'use strict'

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app
  // resources 会自动生成RESTful风格的路由结构, 具体参见 https://eggjs.org/zh-cn/basics/router.html
  router.resources('user', '/users', controller.user)
  router.post('/login', controller.user.login)
  // userRoutes(router, controller.user);
}
