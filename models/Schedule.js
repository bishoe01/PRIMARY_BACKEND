const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return Schedule.init(sequelize, DataTypes);
}

class Schedule extends Sequelize.Model {
  static init(sequelize, DataTypes) {
  super.init({
    schedule_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      comment: "PK increment"
    },
    title: {
      type: DataTypes.STRING(20),
      allowNull: false,
      comment: "일정 제목"
    },
    description: {
      type: DataTypes.STRING(100),
      allowNull: false,
      comment: "일정 설명"
    },
    start_date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      comment: "시작 날짜"
    },
    end_date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      comment: "마지막 날짜"
    },
    attend_time: {
      type: DataTypes.STRING(20),
      allowNull: true,
      comment: "출근 시간"
    },
    leave_time: {
      type: DataTypes.STRING(20),
      allowNull: true,
      comment: "퇴근 시간"
    },
    is_approved: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: 0,
      comment: "승인 여부"
    },
    schedule_type: {
      type: DataTypes.CHAR(1),
      allowNull: true,
      comment: "일정 유형"
    },
    employee_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: "대상 직원",
      references: {
        model: 'Employee',
        key: 'employee_id'
      }
    },
    totalwork_time: {
      type: DataTypes.INTEGER,
      allowNull: true,
      comment: "총 근무 시간"
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
    tableName: 'Schedule',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "schedule_id" },
        ]
      },
      {
        name: "FK_Employee_TO_Schedule_1",
        using: "BTREE",
        fields: [
          { name: "employee_id" },
        ]
      },
    ]
  });
  return Schedule;
  }
}
