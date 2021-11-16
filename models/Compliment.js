const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return Compliment.init(sequelize, DataTypes);
}

class Compliment extends Sequelize.Model {
  static init(sequelize, DataTypes) {
  super.init({
    compliment_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      comment: "칭찬id"
    },
    compliment_date: {
      type: DataTypes.DATE,
      allowNull: true,
      comment: "날짜"
    },
    content: {
      type: DataTypes.STRING(100),
      allowNull: true,
      comment: "내용"
    },
    compliment_count: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      comment: "칭찬수"
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
    },
    employee_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Employee',
        key: 'employee_id'
      }
    }
  }, {
    sequelize,
    tableName: 'Compliment',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "compliment_id" },
        ]
      },
      {
        name: "FK_Employee_TO_Compliment_1",
        using: "BTREE",
        fields: [
          { name: "employee_id" },
        ]
      },
    ]
  });
  return Compliment;
  }
}
