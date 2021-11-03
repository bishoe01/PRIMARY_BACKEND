const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Screen_management', {
    management_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      comment: "스크린관리id"
    },
    on_off: {
      type: DataTypes.CHAR(1),
      allowNull: false,
      comment: "켜짐\/꺼짐"
    },
    screening_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: "영상id"
    },
    facility_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: "특수시설물id"
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
    tableName: 'Screen_management',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "management_id" },
        ]
      },
    ]
  });
};
