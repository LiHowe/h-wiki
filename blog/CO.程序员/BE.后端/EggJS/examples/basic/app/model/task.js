'use strict'
const commonFields = require('./common')

module.exports = ({
  Sequelize,
  model
}) => {
  const {
    INTEGER,
    STRING,
    DATE,
    TEXT,
    BLOB
  } = Sequelize

  const Task = model.define('task', {
    name: {
      type: STRING(50),
      allowNull: false
    },
    description: {
      type: TEXT,
      comment: '任务描述, 后期考虑支持Markdown或者附件'
    },
    attachment: {
      type: BLOB,
      comment: '附件'
    },
    project: {
      type: INTEGER(20),
      references: {
        model: 'project',
        key: 'id',
      },
      comment: '关联项目, 外键'
    },
    icon: {
      type: STRING(255),
      comment: '展示图标'
    },
    color: {
      type: STRING(20),
      comment: '颜色, 颜色与图标都存在则使用图标(icon)'
    },
    displayType: {
      type: INTEGER(10),
      defaultValue: 1,
      field: 'display_type',
      comment: '展示类型, 1: 列表, 2: 看板'
    },
    startTime: {
      type: DATE,
      field: 'start_time',
      comment: '任务开始时间,为了时间段任务使用'
    },
    endTime: {
      type: DATE,
      field: 'end_time',
      comment: '用来显示截至时间,也就是提示时间'
    },
    remind: {
      type: INTEGER(10),
      defaultValue: 0,
      comment: '是否提醒'
    },
    top: {
      type: INTEGER(10),
      comment: '是否置顶'
    },
    priority: {
      type: INTEGER(10),
      comment: '优先级'
    },
    ...commonFields(Sequelize),
  }, {
    createdAt: 'created_time',
    updatedAt: 'updated_time',
  })
  return Task
}
