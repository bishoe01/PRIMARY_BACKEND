const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return Reservation.init(sequelize, DataTypes);
}

class Reservation extends Sequelize.Model {
  static init(sequelize, DataTypes) {
  super.init({
    reservation_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      comment: "예매 id"
    },
    parking_barcode: {
      type: DataTypes.TEXT,
      allowNull: false,
      comment: "주차권 바코드"
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
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
      comment: "유저 id",
      references: {
        model: 'User',
        key: 'user_id'
      }
    },
    movie_schedule_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
      comment: "상영 스케줄 id",
      references: {
        model: 'Movie_schedule',
        key: 'movie_schedule_id'
      }
    }
  }, {
    sequelize,
    tableName: 'Reservation',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "reservation_id" },
        ]
      },
      {
        name: "FK_User_TO_Reservation_1",
        using: "BTREE",
        fields: [
          { name: "user_id" },
        ]
      },
      {
        name: "FK_Movie_schedule_TO_Reservation_1",
        using: "BTREE",
        fields: [
          { name: "movie_schedule_id" },
        ]
      },
    ]
  });
  return Reservation;
  }
}
