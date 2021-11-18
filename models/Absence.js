const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return Absence.init(sequelize, DataTypes);
}

class Absence extends Sequelize.Model {
  static init(sequelize, DataTypes) {
  super.init({
    absence_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      comment: "결근id"
    },
    reason: {
      type: DataTypes.STRING(100),
      allowNull: true,
      comment: "결근 사유"
    },
    is_awol: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: 1,
      comment: "무단 결근 판정 여부"
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      comment: "결근 날짜"
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
    },
    employee_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Employee',
        key: 'employee_id'
      }
    }
  }, {
    sequelize,
    tableName: 'Absence',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "absence_id" },
        ]
      },
      {
        name: "FK_Employee_TO_Absence_1",
        using: "BTREE",
        fields: [
          { name: "employee_id" },
        ]
      },
    ]
  });
  return Absence;
  }
}
