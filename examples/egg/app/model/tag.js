'use strict'
const commonFields = require('./common')

module.exports = ({
  Sequelize,
  model
}) => {
  const {
    STRING
  } = Sequelize

  const Tag = model.define('tag', {
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
  }, {
    createdAt: 'created_time',
    updatedAt: 'updated_time',
  })
  return Tag
}
