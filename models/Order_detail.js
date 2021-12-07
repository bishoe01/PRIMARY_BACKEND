const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return Order_detail.init(sequelize, DataTypes);
}

class Order_detail extends Sequelize.Model {
  static init(sequelize, DataTypes) {
  super.init({
    order_detail: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
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
      comment: "상품 번호",
      references: {
        model: 'Product',
        key: 'product_id'
      }
    },
    order_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
      comment: "주문 id",
      references: {
        model: 'Order',
        key: 'order_id'
      }
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
      {
        name: "FK_Product_TO_Order_detail_1",
        using: "BTREE",
        fields: [
          { name: "product_id" },
        ]
      },
      {
        name: "FK_Order_TO_Order_detail_1",
        using: "BTREE",
        fields: [
          { name: "order_id" },
        ]
      },
    ]
  });
  return Order_detail;
  }
}
