'use strict'

const commonFields = require('./common')

module.exports = ({
  Sequelize,
  model
}) => {
  const {
    STRING
  } = Sequelize

  const Project = model.define('project', {
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
  }, {
    createdAt: 'created_time',
    updatedAt: 'updated_time',
  })

  return Project
}
