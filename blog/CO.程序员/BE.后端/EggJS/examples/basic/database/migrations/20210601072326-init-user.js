'use strict'
const commonFields = require('../../app/model/common')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    const {
      INTEGER,
      STRING
    } = Sequelize
    await queryInterface.createTable('user', {
      id: {
        type: INTEGER(20),
        primaryKey: true,
        autoIncrement: true
      },
      username: {
        type: STRING(30),
        unique: true,
        allowNull: false,
        field: 'user_name'
      },
      nickname: {
        type: STRING(30),
        field: 'nick_name'
      },
      password: STRING(30),
      email: STRING(40),
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
    await queryInterface.dropTable('user')
  },
}
