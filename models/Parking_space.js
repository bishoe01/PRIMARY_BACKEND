const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return Parking_space.init(sequelize, DataTypes);
}

class Parking_space extends Sequelize.Model {
  static init(sequelize, DataTypes) {
  super.init({
    parking_space_id: {
      autoIncrement: true,
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
      allowNull: false,
      references: {
        model: 'Parking_lot',
        key: 'parking_lot_id'
      }
    },
    department_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Department',
        key: 'department_id'
      }
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
      {
        name: "FK_Parking_lot_TO_Parking_space_1",
        using: "BTREE",
        fields: [
          { name: "parking_lot_id" },
        ]
      },
      {
        name: "FK_Department_TO_Parking_space_1",
        using: "BTREE",
        fields: [
          { name: "department_id" },
        ]
      },
    ]
  });
  return Parking_space;
  }
}
