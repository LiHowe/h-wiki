/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * 本地环境配置
 */
module.exports = {
  sequelize: {
    dialect: 'mysql',
    host: 'rm-bp12a79z32y9km54lvo.mysql.rds.aliyuncs.com',
    port: 3306,
    username: 'howe',
    password: 'Hzh123456',
    database: 'todo_dev',
    timezone: '+08:00',
    dialectOptions: {
      charset: 'utf8',
    },
  },
};