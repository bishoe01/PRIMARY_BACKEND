const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return Screen_management.init(sequelize, DataTypes);
}

class Screen_management extends Sequelize.Model {
  static init(sequelize, DataTypes) {
  super.init({
    management_id: {
      autoIncrement: true,
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
      comment: "영상id",
      references: {
        model: 'Screening',
        key: 'screening_id'
      }
    },
    facility_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: "특수시설물id",
      references: {
        model: 'Facility',
        key: 'facility_id'
      }
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
      {
        name: "FK_Screening_TO_Screen_management_1",
        using: "BTREE",
        fields: [
          { name: "screening_id" },
        ]
      },
      {
        name: "FK_Facility_TO_Screen_management_1",
        using: "BTREE",
        fields: [
          { name: "facility_id" },
        ]
      },
    ]
  });
  return Screen_management;
  }
}
