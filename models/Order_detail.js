const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Order_detail', {
    order_detail: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
      primaryKey: true,
      comment: "주문상세 id"
    },
    order_quantity: {
      type: DataTypes.STRING(20),
      allowNull: false,
      comment: "비밀번호"
    },
    order_price: {
      type: DataTypes.CHAR(1),
      allowNull: false,
      comment: "삭제여부"
    },
    order_status: {
      type: DataTypes.CHAR(4),
      allowNull: false,
      comment: "주문 상태"
    },
    refund_check: {
      type: DataTypes.CHAR(1),
      allowNull: true,
      comment: "환불 가능 여부"
    },
    product_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
      comment: "상품 번호"
    },
    order_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
      comment: "주문 id"
    },
    created_at: {
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
    tableName: 'Order_detail',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "order_detail" },
        ]
      },
    ]
  });
};
