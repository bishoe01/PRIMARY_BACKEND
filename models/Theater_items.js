const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Theater_items', {
    items_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      comment: "특수물품id"
    },
    item_type: {
      type: DataTypes.CHAR(1),
      allowNull: false,
      comment: "물건 유형"
    },
    total_quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: "총 개수"
    },
    remain_quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: "현재 개수"
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
    tableName: 'Theater_items',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "items_id" },
        ]
      },
    ]
  });
};
