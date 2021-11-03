const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Suggestion', {
    suggestion_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      comment: "건의id"
    },
    suggestion_type: {
      type: DataTypes.CHAR(1),
      allowNull: false,
      comment: "건의유형"
    },
    title: {
      type: DataTypes.STRING(20),
      allowNull: false,
      comment: "제목"
    },
    content: {
      type: DataTypes.STRING(100),
      allowNull: false,
      comment: "내용"
    },
    result: {
      type: DataTypes.STRING(100),
      allowNull: true,
      comment: "결과"
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      comment: "날짜"
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
    tableName: 'Suggestion',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "suggestion_id" },
        ]
      },
    ]
  });
};
