const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Holiday', {
    holiday_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      comment: "휴일id"
    },
    start_date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      comment: "시작 날짜"
    },
    end_date: {
      type: DataTypes.DATEONLY,
      allowNull: true,
      comment: "마지막 날짜"
    },
    description: {
      type: DataTypes.STRING(20),
      allowNull: true,
      comment: "해당 휴일에 대한 설명"
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
    },
    is_deleted: {
      type: DataTypes.CHAR(1),
      allowNull: false,
      defaultValue: "N"
    }
  }, {
    sequelize,
    tableName: 'Holiday',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "holiday_id" },
        ]
      },
    ]
  });
};
