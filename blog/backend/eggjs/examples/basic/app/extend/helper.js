'use strict'

/**
 * helper.js
 * 相当于工具类, 文件内exports出去的方法可以直接在ctx上获取
 */

const moment = require('moment')

// 请求成功
exports.success = ({ ctx, res = null, msg = '成功' }) => {
  ctx.body = {
    code: 200,
    data: res,
    msg,
  }
  ctx.status = 200
}

// 请求失败
exports.error = ({ ctx, res = null, msg = '失败' }) => {
  ctx.body = {
    code: 500,
    data: res,
    msg,
  }
  ctx.status = 500
}

/**
 * 日期格式转换
 * @param {string | date} time 原始日期
 * @param {string} type datetime | date | time
 * @return {string} 转化后日期
 */
exports.formatTime = (time, type = 'datetime') => {
  const formatter = {
    date: 'YYYY-MM-DD',
    time: 'HH:mm:ss',
    datetime: 'YYYY-MM-DD HH:mm:ss'
  }
  return moment(time).format(formatter[type] || formatter.datetime)
}
