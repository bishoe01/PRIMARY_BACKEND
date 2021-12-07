const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return Admin.init(sequelize, DataTypes);
}

class Admin extends Sequelize.Model {
  static init(sequelize, DataTypes) {
  super.init({
    admin_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    login_id: {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    password: {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    name: {
      type: DataTypes.STRING(30),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'Admin',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "admin_id" },
        ]
      },
    ]
  });
  return Admin;
  }
}
