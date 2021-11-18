const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return Membership.init(sequelize, DataTypes);
}

class Membership extends Sequelize.Model {
  static init(sequelize, DataTypes) {
  super.init({
    membership_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      comment: "멤버십 id"
    },
    membership_name: {
      type: DataTypes.STRING(10),
      allowNull: false,
      comment: "멤버십 등급 이름"
    },
    point_rate: {
      type: DataTypes.FLOAT,
      allowNull: false,
      comment: "적립율"
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
    tableName: 'Membership',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "membership_id" },
        ]
      },
    ]
  });
  return Membership;
  }
}
