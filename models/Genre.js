const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return Genre.init(sequelize, DataTypes);
}

class Genre extends Sequelize.Model {
  static init(sequelize, DataTypes) {
  super.init({
    genre_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    genre_name: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    create_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
    },
    update_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
    },
    is_deleted: {
      type: DataTypes.CHAR(1),
      allowNull: false,
      defaultValue: "N"
    }
  }, {
    sequelize,
    tableName: 'Genre',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "genre_id" },
        ]
      },
    ]
  });
  return Genre;
  }
}
