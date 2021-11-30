const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return Request.init(sequelize, DataTypes);
}

class Request extends Sequelize.Model {
  static init(sequelize, DataTypes) {
  super.init({
    request_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    request_type: {
      type: DataTypes.CHAR(1),
      allowNull: true
    },
    title: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    content: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    result: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
    },
    is_deleted: {
      type: DataTypes.CHAR(1),
      allowNull: true,
      defaultValue: "N"
    },
    employee_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Employee',
        key: 'employee_id'
      }
    },
    is_approved: {
      type: DataTypes.CHAR(1),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'Request',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "request_id" },
        ]
      },
      {
        name: "employee_id",
        using: "BTREE",
        fields: [
          { name: "employee_id" },
        ]
      },
    ]
  });
  return Request;
  }
}
