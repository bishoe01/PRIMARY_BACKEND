const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Compliment', {
    compliment_id: {
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
    employee_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: "직원id"
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
    ]
  });
};
