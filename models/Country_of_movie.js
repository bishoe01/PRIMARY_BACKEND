const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return Country_of_movie.init(sequelize, DataTypes);
}

class Country_of_movie extends Sequelize.Model {
  static init(sequelize, DataTypes) {
  super.init({
    country_of_movie_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
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
    country_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
      comment: "국가 id",
      references: {
        model: 'Country',
        key: 'country_id'
      }
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
    tableName: 'Country_of_movie',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "country_of_movie_id" },
        ]
      },
      {
        name: "FK_Movie_TO_Country_of_movie_1",
        using: "BTREE",
        fields: [
          { name: "movie_id" },
        ]
      },
      {
        name: "FK_Country_TO_Country_of_movie_1",
        using: "BTREE",
        fields: [
          { name: "country_id" },
        ]
      },
    ]
  });
  return Country_of_movie;
  }
}
