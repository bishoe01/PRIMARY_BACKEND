const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Employee', {
    employee_id: {
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
      type: DataTypes.STRING(20),
      allowNull: true,
      comment: "이메일"
    },
    gender: {
      type: DataTypes.CHAR(1),
      allowNull: false,
      comment: "성별"
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
      comment: "직급"
    },
    leaves_left: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: "남은 휴가"
    },
    department_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: "부서id"
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
    ]
  });
};
