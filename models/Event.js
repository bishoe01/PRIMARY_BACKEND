const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return Event.init(sequelize, DataTypes);
}

class Event extends Sequelize.Model {
  static init(sequelize, DataTypes) {
  super.init({
    event_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      comment: "이벤트 id"
    },
    event_name: {
      type: DataTypes.STRING(20),
      allowNull: false,
      comment: "이름"
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
        ]
      },
    ]
  });
  return Event;
  }
}
