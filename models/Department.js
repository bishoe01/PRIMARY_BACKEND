const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return Department.init(sequelize, DataTypes);
}

class Department extends Sequelize.Model {
  static init(sequelize, DataTypes) {
  super.init({
    department_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(20),
      allowNull: false
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
    update_at: {
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
    tableName: 'Department',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "department_id" },
        ]
      },
      {
        name: "FK_Theater_TO_Department_1",
        using: "BTREE",
        fields: [
          { name: "theater_id" },
        ]
      },
    ]
  });
  return Department;
  }
}
