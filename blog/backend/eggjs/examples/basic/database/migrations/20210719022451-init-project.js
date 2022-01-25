'use strict';
const commonFields = require('../../app/model/common')

module.exports = {
  /**
   *
   * @param {import('sequelize').QueryInterface} queryInterface
   * @param {import("sequelize").DataTypes} Sequelize
   */
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    const {
      STRING,
      UUID
    } = Sequelize

    await queryInterface.createTable('project', {
      name: {
        type: STRING(50),
        allowNull: false
      },
      icon: {
        type: STRING(255)
      },
      color: {
        type: STRING(20)
      },
      type: {
        type: STRING(20)
      },
      ...commonFields(Sequelize),
    })

    await queryInterface.addColumn('task', 'project_id', {
      type: UUID,
      references: {
        model: 'project',
        key: 'id'
      },
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE',
      comment: '外键, 任务所属清单'
    })
  },

  down: async queryInterface => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.dropTable('project')
  }
};
