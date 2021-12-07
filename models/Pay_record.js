const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return Pay_record.init(sequelize, DataTypes);
}

class Pay_record extends Sequelize.Model {
  static init(sequelize, DataTypes) {
  super.init({
    pay_record_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      comment: "급여내역id"
    },
    employee_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: "급여 지불 대상",
      references: {
        model: 'Employee',
        key: 'employee_id'
      }
    },
    amount: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: "금액"
    },
    issue_date: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP'),
      comment: "지급날짜"
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
    tableName: 'Pay_record',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "pay_record_id" },
        ]
      },
      {
        name: "FK_Employee_TO_Pay_record_1",
        using: "BTREE",
        fields: [
          { name: "employee_id" },
        ]
      },
    ]
  });
  return Pay_record;
  }
}
