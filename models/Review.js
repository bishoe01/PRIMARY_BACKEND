const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return Review.init(sequelize, DataTypes);
}

class Review extends Sequelize.Model {
  static init(sequelize, DataTypes) {
  super.init({
    review_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      comment: "리뷰 id"
    },
    reveiw_title: {
      type: DataTypes.STRING(20),
      allowNull: false,
      comment: "리뷰 제목"
    },
    text: {
      type: DataTypes.STRING(1000),
      allowNull: false,
      comment: "내용"
    },
    star_point: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
      comment: "별점"
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
    movie_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
      comment: "영화 id",
      references: {
        model: 'Movie',
        key: 'movie_id'
      }
    }
  }, {
    sequelize,
    tableName: 'Review',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "review_id" },
        ]
      },
      {
        name: "FK_User_TO_Review_1",
        using: "BTREE",
        fields: [
          { name: "user_id" },
        ]
      },
      {
        name: "FK_Movie_TO_Review_1",
        using: "BTREE",
        fields: [
          { name: "movie_id" },
        ]
      },
    ]
  });
  return Review;
  }
}
