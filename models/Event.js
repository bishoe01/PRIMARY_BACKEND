const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Event', {
    event_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
      primaryKey: true,
      comment: "이벤트 id"
    },
    employee_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      comment: "등록자"
    },
    event_name: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: "이름"
    },
    creation_date: {
      type: DataTypes.STRING(20),
      allowNull: false,
      comment: "등록 날짜"
    },
    start_date: {
      type: DataTypes.CHAR(1),
      allowNull: false,
      defaultValue: "N",
      comment: "시작 날짜"
    },
    end_date: {
      type: DataTypes.DATE,
      allowNull: false,
      comment: "종료 날짜"
    },
    banner_image: {
      type: DataTypes.TEXT,
      allowNull: false,
      comment: "이미지"
    },
    title: {
      type: DataTypes.STRING(20),
      allowNull: false,
      comment: "제목"
    },
    description: {
      type: DataTypes.STRING(20),
      allowNull: false,
      comment: "설명"
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
    tableName: 'Event',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "event_id" },
          { name: "employee_id" },
        ]
      },
    ]
  });
};
