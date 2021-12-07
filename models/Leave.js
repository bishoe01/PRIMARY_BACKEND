const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return Leave.init(sequelize, DataTypes);
}

class Leave extends Sequelize.Model {
  static init(sequelize, DataTypes) {
  super.init({
    leave_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      comment: "휴가id"
    },
    employee_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: "직원id",
      references: {
        model: 'Employee',
        key: 'employee_id'
      }
    },
    start_date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      comment: "시작일"
    },
    end_date: {
      type: DataTypes.DATE,
      allowNull: false,
      comment: "종료일"
    },
    leave_type: {
      type: DataTypes.CHAR(1),
      allowNull: false,
      comment: "휴가 유형"
    },
    reason: {
      type: DataTypes.STRING(100),
      allowNull: true,
      defaultValue: "",
      comment: "구체적 사유"
    },
    is_approved: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: 0,
      comment: "승인 여부"
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
      allowNull: true,
      defaultValue: "N"
    }
  }, {
    sequelize,
    tableName: 'Leave',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "leave_id" },
        ]
      },
      {
        name: "FK_Employee_TO_Leave_1",
        using: "BTREE",
        fields: [
          { name: "employee_id" },
        ]
      },
    ]
  });
  return Leave;
  }
}
