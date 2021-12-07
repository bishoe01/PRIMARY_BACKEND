const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return Product_type.init(sequelize, DataTypes);
}

class Product_type extends Sequelize.Model {
  static init(sequelize, DataTypes) {
  super.init({
    product_type_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      comment: "종류 id"
    },
    type_description: {
      type: DataTypes.STRING(20),
      allowNull: false,
      comment: "종류 설명"
    },
    type_name: {
      type: DataTypes.STRING(20),
      allowNull: false,
      comment: "종류명"
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
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'Product_type',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "product_type_id" },
        ]
      },
    ]
  });
  return Product_type;
  }
}
