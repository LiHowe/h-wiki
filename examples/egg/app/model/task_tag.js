'use strict'
const commonFields = require('./common')

module.exports = ({
  Sequelize,
  model
}) => {

  const {
    UUID
  } = Sequelize

  const TaskTag = model.define('taskTag', {
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
  }, {
    createdAt: 'created_time',
    updatedAt: 'updated_time',
  })
  return TaskTag
}
