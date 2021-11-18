const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return Genre_of_movie.init(sequelize, DataTypes);
}

class Genre_of_movie extends Sequelize.Model {
  static init(sequelize, DataTypes) {
  super.init({
    genre_of_movie_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
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
    genre_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
      comment: "장르 id",
      references: {
        model: 'Genre',
        key: 'genre_id'
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
    }
  }, {
    sequelize,
    tableName: 'Genre_of_movie',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "genre_of_movie_id" },
        ]
      },
      {
        name: "FK_Movie_TO_Genre_of_movie_1",
        using: "BTREE",
        fields: [
          { name: "movie_id" },
        ]
      },
      {
        name: "FK_Genre_TO_Genre_of_movie_1",
        using: "BTREE",
        fields: [
          { name: "genre_id" },
        ]
      },
    ]
  });
  return Genre_of_movie;
  }
}
