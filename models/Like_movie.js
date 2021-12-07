const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return Like_movie.init(sequelize, DataTypes);
}

class Like_movie extends Sequelize.Model {
  static init(sequelize, DataTypes) {
  super.init({
    like_movie_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      comment: "좋아요 누른 영화 id"
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
    tableName: 'Like_movie',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "like_movie_id" },
        ]
      },
      {
        name: "FK_User_TO_Like_movie_1",
        using: "BTREE",
        fields: [
          { name: "user_id" },
        ]
      },
      {
        name: "FK_Movie_TO_Like_movie_1",
        using: "BTREE",
        fields: [
          { name: "movie_id" },
        ]
      },
    ]
  });
  return Like_movie;
  }
}
