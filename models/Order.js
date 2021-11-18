const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return Order.init(sequelize, DataTypes);
}

class Order extends Sequelize.Model {
  static init(sequelize, DataTypes) {
  super.init({
    order_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      comment: "주문 id"
    },
    order_date: {
      type: DataTypes.DATE,
      allowNull: false,
      comment: "주문 날짜"
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
    updated_at: {
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
    tableName: 'Order',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "order_id" },
        ]
      },
      {
        name: "FK_User_TO_Order_1",
        using: "BTREE",
        fields: [
          { name: "user_id" },
        ]
      },
    ]
  });
  return Order;
  }
}
