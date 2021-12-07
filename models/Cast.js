const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return Cast.init(sequelize, DataTypes);
}

class Cast extends Sequelize.Model {
  static init(sequelize, DataTypes) {
  super.init({
    cast_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      comment: "출연진 id"
    },
    cast_name: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    nationality: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    job: {
      type: DataTypes.CHAR(1),
      allowNull: false,
      defaultValue: "1",
      comment: "1: 배우 2: 감독"
    },
    create_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP'),
      comment: "생성일"
    },
    cast_birth: {
      type: DataTypes.DATEONLY,
      allowNull: true
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
    tableName: 'Cast',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "cast_id" },
        ]
      },
    ]
  });
  return Cast;
  }
}
