const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return Payment.init(sequelize, DataTypes);
}

class Payment extends Sequelize.Model {
  static init(sequelize, DataTypes) {
  super.init({
    payment_id: {
      autoIncrement: true,
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
      comment: "예매 id",
      references: {
        model: 'Reservation',
        key: 'reservation_id'
      }
    },
    parking_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Parking',
        key: 'parking_id'
      }
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
      {
        name: "FK_Reservation_TO_Payment_1",
        using: "BTREE",
        fields: [
          { name: "reservation_id" },
        ]
      },
      {
        name: "FK_Parking_TO_Payment_1",
        using: "BTREE",
        fields: [
          { name: "parking_id" },
        ]
      },
    ]
  });
  return Payment;
  }
}
