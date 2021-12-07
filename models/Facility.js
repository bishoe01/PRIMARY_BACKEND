const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return Facility.init(sequelize, DataTypes);
}

class Facility extends Sequelize.Model {
  static init(sequelize, DataTypes) {
  super.init({
    facility_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      comment: "특수시설물id"
    },
    available_or_not: {
      type: DataTypes.CHAR(1),
      allowNull: false,
      comment: "사용가능여부"
    },
    facilities_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: "시설물id",
      references: {
        model: 'Theater_facilities',
        key: 'facilities_id'
      }
    },
    department_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: "부서id",
      references: {
        model: 'Department',
        key: 'department_id'
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
    tableName: 'Facility',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "facility_id" },
        ]
      },
      {
        name: "FK_Theater_facilities_TO_Facility_1",
        using: "BTREE",
        fields: [
          { name: "facilities_id" },
        ]
      },
      {
        name: "FK_Department_TO_Facility_1",
        using: "BTREE",
        fields: [
          { name: "department_id" },
        ]
      },
    ]
  });
  return Facility;
  }
}
