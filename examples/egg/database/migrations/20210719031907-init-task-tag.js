'use strict'
const commonFields = require('../../app/model/common')

module.exports = {
  /**
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
      UUID
    } = Sequelize

    await queryInterface.createTable('task-tag', {
      tagId: {
        type: UUID,
        references: {
          model: 'tag',
          key: 'id',
        },
        allowNull: false
      },
      taskId: {
        type: UUID,
        references: {
          model: 'task',
          key: 'id'
        },
        allowNull: false
      },
      ...commonFields(Sequelize),
    })
  },

  down: async queryInterface => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.dropTable('task-tag')
  }
}
