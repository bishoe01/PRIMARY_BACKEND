const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return Cart.init(sequelize, DataTypes);
}

class Cart extends Sequelize.Model {
  static init(sequelize, DataTypes) {
  super.init({
    cart_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      comment: "장바구니id"
    },
    order_quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: "수량"
    },
    order_check: {
      type: DataTypes.CHAR(1),
      allowNull: false
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
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
      comment: "유저 id",
      references: {
        model: 'User',
        key: 'user_id'
      }
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
    },
    updated_id: {
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
    tableName: 'Cart',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "cart_id" },
        ]
      },
      {
        name: "FK_Product_TO_Cart_1",
        using: "BTREE",
        fields: [
          { name: "product_id" },
        ]
      },
      {
        name: "FK_User_TO_Cart_1",
        using: "BTREE",
        fields: [
          { name: "user_id" },
        ]
      },
    ]
  });
  return Cart;
  }
}
