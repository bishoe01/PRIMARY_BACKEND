const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Facility', {
    facility_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      comment: "특수시설물id"
    },
    available_or_not: {
      type: DataTypes.CHAR(1),
      allowNull: false,
      comment: "사용가능여부"
    },
    facilities_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: "시설물id"
    },
    department_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: "부서id"
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
    tableName: 'Facility',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "facility_id" },
        ]
      },
    ]
  });
};
