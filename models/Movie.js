const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return Movie.init(sequelize, DataTypes);
}

class Movie extends Sequelize.Model {
  static init(sequelize, DataTypes) {
  super.init({
    movie_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      comment: "영화 id"
    },
    title: {
      type: DataTypes.STRING(100),
      allowNull: false,
      comment: "영화 제목"
    },
    running_time: {
      type: DataTypes.STRING(20),
      allowNull: false,
      comment: "상영 시간 (분 단위)"
    },
    company: {
      type: DataTypes.STRING(50),
      allowNull: false,
      comment: "배급사"
    },
    poster_image: {
      type: DataTypes.STRING(255),
      allowNull: false,
      comment: "포스터 이미지"
    },
    open_date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      comment: "개봉일"
    },
    status: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
      comment: "1: 현재 상영중\n2: 상영 예정"
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 1,
      comment: "1 : 전체 관람, 2: 12세 관람가, 3: 15세 관람가, 4: 청소년관람불가"
    },
    summary: {
      type: DataTypes.STRING(2000),
      allowNull: false,
      comment: "줄거리"
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
    create_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP'),
      comment: "생성일"
    }
  }, {
    sequelize,
    tableName: 'Movie',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "movie_id" },
        ]
      },
    ]
  });
  return Movie;
  }
}
