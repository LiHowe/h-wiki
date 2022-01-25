
/**
 * 必备字段
 * @param {import("sequelize").DataTypes} Sequelize
 * @returns
 */
module.exports = (Sequelize) => {
  const { DATE, STRING, INTEGER } = Sequelize
  return {
    createdTime: { type: DATE, field: 'created_time' },
    createdBy: { type: STRING(30), field: 'created_by' },
    updatedTime: { type: DATE, field: 'updated_time' },
    updatedBy: { type: STRING(30), field: 'updated_by' },
    active: { type: INTEGER(1), defaultValue: 1, allowNull: false },
  }
}
