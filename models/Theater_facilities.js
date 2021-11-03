const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Theater_facilities', {
    facilities_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      comment: "시설물id"
    },
    facilities_type: {
      type: DataTypes.CHAR(1),
      allowNull: false,
      comment: "물건 유형"
    },
    total_quantity: {
      type: DataTypes.INTEGER,
      allowNull: true,
      comment: "총 개수"
    },
    remain_quantity: {
      type: DataTypes.INTEGER,
      allowNull: true,
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
      allowNull: true,
      defaultValue: "N"
    }
  }, {
    sequelize,
    tableName: 'Theater_facilities',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "facilities_id" },
        ]
      },
    ]
  });
};
