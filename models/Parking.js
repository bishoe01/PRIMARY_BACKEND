const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Parking', {
    parking_id: {
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
    ]
  });
};
