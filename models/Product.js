const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return Product.init(sequelize, DataTypes);
}

class Product extends Sequelize.Model {
  static init(sequelize, DataTypes) {
  super.init({
    product_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      comment: "상품 번호"
    },
    product_name: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: "아이디"
    },
    product_price: {
      type: DataTypes.STRING(20),
      allowNull: false,
      comment: "비밀번호"
    },
    product_desctiption: {
      type: DataTypes.CHAR(1),
      allowNull: false,
      comment: "삭제여부"
    },
    product_type_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
      comment: "종류 id",
      references: {
        model: 'Product_type',
        key: 'product_type_id'
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
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'Product',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "product_id" },
        ]
      },
      {
        name: "FK_Product_type_TO_Product_1",
        using: "BTREE",
        fields: [
          { name: "product_type_id" },
        ]
      },
    ]
  });
  return Product;
  }
}
