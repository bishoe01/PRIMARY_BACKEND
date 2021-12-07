const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return Employee_notice.init(sequelize, DataTypes);
}

class Employee_notice extends Sequelize.Model {
  static init(sequelize, DataTypes) {
  super.init({
    employee_notice_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      comment: "직원공지id"
    },
    notice_title: {
      type: DataTypes.STRING(100),
      allowNull: false,
      comment: "공지 제목"
    },
    notice_content: {
      type: DataTypes.STRING(100),
      allowNull: false,
      comment: "공지 내용"
    },
    notice_writer: {
      type: DataTypes.STRING(20),
      allowNull: false,
      comment: "작성자"
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
    view_count: {
      type: DataTypes.INTEGER,
      allowNull: true,
      comment: "직원 공지글 조회수\n"
    }
  }, {
    sequelize,
    tableName: 'Employee_notice',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "employee_notice_id" },
        ]
      },
    ]
  });
  return Employee_notice;
  }
}
