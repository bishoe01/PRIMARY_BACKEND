const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return Parking_lot.init(sequelize, DataTypes);
}

class Parking_lot extends Sequelize.Model {
  static init(sequelize, DataTypes) {
  super.init({
    parking_lot_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    number_of_spaces: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: "주차칸 수"
    },
    theater_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
      comment: "극장 id",
      references: {
        model: 'Theater',
        key: 'theater_id'
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
    tableName: 'Parking_lot',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "parking_lot_id" },
        ]
      },
      {
        name: "FK_Theater_TO_Parking_lot_1",
        using: "BTREE",
        fields: [
          { name: "theater_id" },
        ]
      },
    ]
  });
  return Parking_lot;
  }
}
