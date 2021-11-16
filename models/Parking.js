const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return Parking.init(sequelize, DataTypes);
}

class Parking extends Sequelize.Model {
  static init(sequelize, DataTypes) {
  super.init({
    parking_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    time_in: {
      type: DataTypes.DATE,
      allowNull: false,
      comment: "입장시간"
    },
    time_out: {
      type: DataTypes.DATE,
      allowNull: false,
      comment: "퇴출시간"
    },
    parking_space_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Parking_space',
        key: 'parking_space_id'
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
    tableName: 'Parking',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "parking_id" },
        ]
      },
      {
        name: "FK_Parking_space_TO_Parking_1",
        using: "BTREE",
        fields: [
          { name: "parking_space_id" },
        ]
      },
    ]
  });
  return Parking;
  }
}
