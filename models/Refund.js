const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Refund', {
    refund_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
      primaryKey: true,
      comment: "환불 id"
    },
    refund_title: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: "상품 id"
    },
    refund_reson: {
      type: DataTypes.STRING(20),
      allowNull: false,
      comment: "환불사유"
    },
    refund_img: {
      type: DataTypes.CHAR(1),
      allowNull: false,
      comment: "이미지"
    },
    order_detail: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
      comment: "주문상세 id"
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
    },
    is_deleted: {
      type: DataTypes.CHAR(1),
      allowNull: false,
      defaultValue: "N"
    }
  }, {
    sequelize,
    tableName: 'Refund',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "refund_id" },
        ]
      },
    ]
  });
};
