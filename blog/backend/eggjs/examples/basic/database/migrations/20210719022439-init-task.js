'use strict'
const commonFields = require('../../app/model/common')

module.exports = {
  /**
   * @param {import('sequelize').QueryInterface} queryInterface
   * @param {import("sequelize")} Sequelize
   */
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    const {
      INTEGER,
      STRING,
      DATE,
      TEXT,
      BLOB,
    } = Sequelize

    await queryInterface.createTable('task', {
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
      // FIXME: 由于执行顺序的原因, 执行该文件时还未创建project表, 导致引用失败
      // 目前没有查到相关解决方案, 或者如何进行外键定义
      // projectId: {
      //   type: UUID,
      //   references: {
      //     model: 'project',
      //     key: 'id',
      //   },
      //   onDelete: 'SET NULL',
      //   onUpdate: 'CASCADE',
      //   field: 'project_id',
      //   comment: '关联项目, 外键'
      // },
      //  projectId: { type: INTEGER(20), field: 'project_id' },
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
      // 后期考虑是否添加位置信息
    })

  },

  down: async queryInterface => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.dropTable('task')
  }
}
