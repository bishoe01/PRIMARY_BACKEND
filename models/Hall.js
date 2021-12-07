const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return Hall.init(sequelize, DataTypes);
}

class Hall extends Sequelize.Model {
  static init(sequelize, DataTypes) {
  super.init({
    hall_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      comment: "상영관 id"
    },
    hall_name: {
      type: DataTypes.CHAR(10),
      allowNull: false
    },
    type: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
      comment: "상영타입 (1: 2D, 2: 3D, 3:IMAX 등)"
    },
    create_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP'),
      comment: "생성일"
    },
    update_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP'),
      comment: "수정일"
    },
    is_deleted: {
      type: DataTypes.CHAR(1),
      allowNull: false,
      defaultValue: "N",
      comment: "삭제여부"
    },
    theater_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
      comment: "극장 id",
      references: {
        model: 'Theater',
        key: 'theater_id'
      }
    },
    seat_num: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: "좌석수"
    }
  }, {
    sequelize,
    tableName: 'Hall',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "hall_id" },
        ]
      },
      {
        name: "FK_Theater_TO_Hall_1",
        using: "BTREE",
        fields: [
          { name: "theater_id" },
        ]
      },
    ]
  });
  return Hall;
  }
}
