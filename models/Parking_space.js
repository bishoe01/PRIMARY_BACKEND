const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Parking_space', {
    parking_space_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    space_name: {
      type: DataTypes.STRING(10),
      allowNull: false
    },
    price_per_hour: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    for_the_disabled: {
      type: DataTypes.CHAR(1),
      allowNull: false
    },
    parking_lot_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    department_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false
    },
    is_deleted: {
      type: DataTypes.CHAR(1),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'Parking_space',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "parking_space_id" },
        ]
      },
    ]
  });
};
