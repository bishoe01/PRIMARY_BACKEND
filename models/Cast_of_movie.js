const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return Cast_of_movie.init(sequelize, DataTypes);
}

class Cast_of_movie extends Sequelize.Model {
  static init(sequelize, DataTypes) {
  super.init({
    cast_of_movie_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    cast_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
      comment: "출연진 id",
      references: {
        model: 'Cast',
        key: 'cast_id'
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
    is_deleted: {
      type: DataTypes.CHAR(1),
      allowNull: false,
      defaultValue: "N",
      comment: "삭제여부"
    },
    update_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP'),
      comment: "수정일"
    },
    create_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP'),
      comment: "생성일"
    }
  }, {
    sequelize,
    tableName: 'Cast_of_movie',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "cast_of_movie_id" },
        ]
      },
      {
        name: "FK_Movie_TO_Cast_of_movie_1",
        using: "BTREE",
        fields: [
          { name: "movie_id" },
        ]
      },
      {
        name: "FK_Cast_TO_Cast_of_movie_1",
        using: "BTREE",
        fields: [
          { name: "cast_id" },
        ]
      },
    ]
  });
  return Cast_of_movie;
  }
}
