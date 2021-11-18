const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return Theater.init(sequelize, DataTypes);
}

class Theater extends Sequelize.Model {
  static init(sequelize, DataTypes) {
  super.init({
    theater_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      comment: "극장 id"
    },
    theater_name: {
      type: DataTypes.STRING(50),
      allowNull: false,
      comment: "극장 이름"
    },
    address: {
      type: DataTypes.STRING(100),
      allowNull: false,
      comment: "주소"
    },
    address_code: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: "우편번호"
    },
    introduction: {
      type: DataTypes.STRING(500),
      allowNull: false,
      comment: "소개"
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
    tableName: 'Theater',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "theater_id" },
        ]
      },
    ]
  });
  return Theater;
  }
}
