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
      STRING,
    } = Sequelize

    await queryInterface.createTable('tag', {
      name: {
        type: STRING(20),
        allowNull: false,
        unique: true,
        comment: '标签名'
      },
      color: {
        type: STRING(20),
        comment: '标签颜色'
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
    await queryInterface.dropTable('tag')
  }
}
