const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Payment', {
    payment_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    fee: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: "요금"
    },
    payment_method: {
      type: DataTypes.STRING(20),
      allowNull: false,
      comment: "지불방법"
    },
    reservation_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
      comment: "예매 id"
    },
    parking_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    user_id: {
      type: DataTypes.STRING(255),
      allowNull: true,
      comment: "유저"
    },
    employee_id: {
      type: DataTypes.STRING(255),
      allowNull: true,
      comment: "직원"
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
    tableName: 'Payment',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "payment_id" },
        ]
      },
    ]
  });
};
