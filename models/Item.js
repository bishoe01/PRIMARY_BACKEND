const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return Item.init(sequelize, DataTypes);
}

class Item extends Sequelize.Model {
  static init(sequelize, DataTypes) {
  super.init({
    item_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      comment: "특수물품id"
    },
    is_available: {
      type: DataTypes.CHAR(1),
      allowNull: false,
      defaultValue: "Y",
      comment: "사용가능여부"
    },
    department_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: "부서id",
      references: {
        model: 'Department',
        key: 'department_id'
      }
    },
    items_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: "특수물품id",
      references: {
        model: 'Theater_items',
        key: 'items_id'
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
      allowNull: true,
      defaultValue: "N"
    }
  }, {
    sequelize,
    tableName: 'Item',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "item_id" },
        ]
      },
      {
        name: "FK_Department_TO_Item_1",
        using: "BTREE",
        fields: [
          { name: "department_id" },
        ]
      },
      {
        name: "FK_Theater_items_TO_Item_1",
        using: "BTREE",
        fields: [
          { name: "items_id" },
        ]
      },
    ]
  });
  return Item;
  }
}
