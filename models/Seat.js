const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Seat', {
    seat_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
      primaryKey: true,
      comment: "좌석 id"
    },
    seat_row: {
      type: DataTypes.CHAR(1),
      allowNull: false,
      defaultValue: "A",
      comment: "좌석 열"
    },
    seat_col: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
      comment: "좌석 행"
    },
    is_booked: {
      type: DataTypes.CHAR(1),
      allowNull: false,
      defaultValue: "N",
      comment: "예약여부"
    },
    seat_type: {
      type: DataTypes.CHAR(1),
      allowNull: false,
      defaultValue: "B",
      comment: "좌석 타입 (B : 일반좌석, D : 장애인석, C:커플석)"
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
    hall_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
      comment: "상영관 id"
    }
  }, {
    sequelize,
    tableName: 'Seat',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "seat_id" },
        ]
      },
    ]
  });
};
