const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return Country.init(sequelize, DataTypes);
}

class Country extends Sequelize.Model {
  static init(sequelize, DataTypes) {
  super.init({
    country_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      comment: "국가 id"
    },
    country_name: {
      type: DataTypes.STRING(15),
      allowNull: false,
      comment: "국가 이름"
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
    tableName: 'Country',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "country_id" },
        ]
      },
    ]
  });
  return Country;
  }
}
