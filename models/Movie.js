const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Movie', {
    movie_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
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
      comment: "상영 시간"
    },
    genre: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: "장르 (1: 액션, 2: 멜로, 3: 코미디, 4: 가족, 5: 판타지, 6: 기타)"
    },
    country: {
      type: DataTypes.STRING(50),
      allowNull: false,
      comment: "국가"
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
    summary: {
      type: DataTypes.STRING(2000),
      allowNull: false,
      comment: "줄거리"
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
};
