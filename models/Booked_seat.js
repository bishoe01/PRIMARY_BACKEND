const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return Booked_seat.init(sequelize, DataTypes);
}

class Booked_seat extends Sequelize.Model {
  static init(sequelize, DataTypes) {
  super.init({
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
    seat_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
      comment: "좌석 id",
      references: {
        model: 'Seat',
        key: 'seat_id'
      }
    },
    reservation_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
      comment: "예매 id",
      references: {
        model: 'Reservation',
        key: 'reservation_id'
      }
    }
  }, {
    sequelize,
    tableName: 'Booked_seat',
    timestamps: false,
    indexes: [
      {
        name: "FK_Seat_TO_Booked_seat_1",
        using: "BTREE",
        fields: [
          { name: "seat_id" },
        ]
      },
      {
        name: "FK_Reservation_TO_Booked_seat_1",
        using: "BTREE",
        fields: [
          { name: "reservation_id" },
        ]
      },
    ]
  });
  return Booked_seat;
  }
}
