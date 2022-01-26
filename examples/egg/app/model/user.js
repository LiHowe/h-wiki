'use strict'
const commonFields = require('./common')

module.exports = ({
  Sequelize,
  model
}) => {
  const {
    STRING
  } = Sequelize

  const User = model.define('user', {
    username: {
      type: STRING(30),
      unique: true,
      notNull: true,
      field: 'user_name'
    },
    nickname: {
      type: STRING(30),
      field: 'nick_name'
    },
    password: STRING(30),
    email: {
      type: STRING(40),
      validate: {
        isEmail: true,
      }
    },
    ...commonFields(Sequelize),
  }, {
    tableName: 'user',
    createdAt: 'created_time',
    updatedAt: 'updated_time',
  })

  return User
}
