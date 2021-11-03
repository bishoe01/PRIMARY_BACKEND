const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Screening', {
    screening_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      comment: "영상id"
    },
    screening_name: {
      type: DataTypes.STRING(20),
      allowNull: false,
      comment: "영상이름"
    },
    start_time: {
      type: DataTypes.STRING(255),
      allowNull: true,
      comment: "시작시간"
    },
    during_time: {
      type: DataTypes.STRING(255),
      allowNull: true,
      comment: "재생시간"
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
    tableName: 'Screening',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "screening_id" },
        ]
      },
    ]
  });
};
