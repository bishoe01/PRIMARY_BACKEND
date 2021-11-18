const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return Movie_schedule.init(sequelize, DataTypes);
}

class Movie_schedule extends Sequelize.Model {
  static init(sequelize, DataTypes) {
  super.init({
    movie_schedule_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      comment: "상영 스케줄 id"
    },
    start_time: {
      type: DataTypes.DATE,
      allowNull: false,
      comment: "상영 시작 날짜 + 시간"
    },
    end_time: {
      type: DataTypes.DATE,
      allowNull: false,
      comment: "상영 종료 날짜 + 시간"
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
    movie_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
      comment: "영화 id",
      references: {
        model: 'Movie',
        key: 'movie_id'
      }
    },
    hall_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
      comment: "상영관 id",
      references: {
        model: 'Hall',
        key: 'hall_id'
      }
    }
  }, {
    sequelize,
    tableName: 'Movie_schedule',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "movie_schedule_id" },
        ]
      },
      {
        name: "FK_Movie_TO_Movie_schedule_1",
        using: "BTREE",
        fields: [
          { name: "movie_id" },
        ]
      },
      {
        name: "FK_Hall_TO_Movie_schedule_1",
        using: "BTREE",
        fields: [
          { name: "hall_id" },
        ]
      },
    ]
  });
  return Movie_schedule;
  }
}
