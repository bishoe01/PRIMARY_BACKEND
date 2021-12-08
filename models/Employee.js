const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return Employee.init(sequelize, DataTypes);
}

class Employee extends Sequelize.Model {
  static init(sequelize, DataTypes) {
  super.init({
    employee_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      comment: "직원Id"
    },
    name: {
      type: DataTypes.STRING(20),
      allowNull: false,
      comment: "이름"
    },
    email: {
      type: DataTypes.STRING(30),
      allowNull: true,
      comment: "이메일"
    },
    gender: {
      type: DataTypes.CHAR(1),
      allowNull: false,
      comment: "1 : 남자 2: 여자"
    },
    birth: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      comment: "생일"
    },
    salary: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: "연봉"
    },
    address: {
      type: DataTypes.STRING(20),
      allowNull: true,
      comment: "주소"
    },
    rank: {
      type: DataTypes.CHAR(1),
      allowNull: false,
      comment: "직급 1 : 평사원 2:대리 3: 팀장"
    },
    leaves_left: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: "남은 휴가"
    },
    department_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
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
    },
    menu_want: {
      type: DataTypes.CHAR(1),
      allowNull: true,
      defaultValue: "0"
    }
  }, {
    sequelize,
    tableName: 'Employee',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "employee_id" },
        ]
      },
      {
        name: "FK_Department_TO_Employee_1",
        using: "BTREE",
        fields: [
          { name: "department_id" },
        ]
      },
    ]
  });
  return Employee;
  }
}
