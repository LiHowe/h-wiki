'use strict'

/**
 * 必备字段
 * @param {import("sequelize").DataTypes} Sequelize sequelize实例
 * @return {object} 通用字段对象
 */
module.exports = Sequelize => {
  const {
    DATE,
    STRING,
    BOOLEAN,
    UUID,
    UUIDV4
  } = Sequelize
  return {
    id: {
      type: UUID,
      primaryKey: true,
      defaultValue: UUIDV4
    },
    createdAt: {
      type: DATE,
      field: 'created_time'
    },
    createdBy: {
      type: STRING,
      field: 'created_by'
    },
    updatedAt: {
      type: DATE,
      field: 'updated_time'
    },
    updatedBy: {
      type: STRING,
      field: 'updated_by'
    },
    active: {
      type: BOOLEAN,
      defaultValue: 1,
      allowNull: false
    },
  }
}
