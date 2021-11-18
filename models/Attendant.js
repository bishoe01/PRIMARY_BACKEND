const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return Attendant.init(sequelize, DataTypes);
}

class Attendant extends Sequelize.Model {
  static init(sequelize, DataTypes) {
  super.init({
    attendant_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      comment: "출결id"
    },
    time_out: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP'),
      comment: "퇴근 시간"
    },
    time_in: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP'),
      comment: "출근 시간"
    },
    employee_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: "직원Id",
      references: {
        model: 'Employee',
        key: 'employee_id'
      }
    }
  }, {
    sequelize,
    tableName: 'Attendant',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "attendant_id" },
        ]
      },
      {
        name: "FK_Employee_TO_Attendant_1",
        using: "BTREE",
        fields: [
          { name: "employee_id" },
        ]
      },
    ]
  });
  return Attendant;
  }
}
