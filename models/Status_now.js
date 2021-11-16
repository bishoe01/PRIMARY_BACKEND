const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return Status_now.init(sequelize, DataTypes);
}

class Status_now extends Sequelize.Model {
  static init(sequelize, DataTypes) {
  super.init({
    status_now_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      comment: "직원현재상태id"
    },
    employee_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: "직원Id",
      references: {
        model: 'Employee',
        key: 'employee_id'
      }
    },
    status: {
      type: DataTypes.STRING(255),
      allowNull: true,
      comment: "직원의 상태"
    },
    start_date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      comment: "시작일"
    },
    end_date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      comment: "종료일"
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
    tableName: 'Status_now',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "status_now_id" },
        ]
      },
      {
        name: "FK_Employee_TO_Status_now_1",
        using: "BTREE",
        fields: [
          { name: "employee_id" },
        ]
      },
    ]
  });
  return Status_now;
  }
}
