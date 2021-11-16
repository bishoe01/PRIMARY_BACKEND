const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return Menu.init(sequelize, DataTypes);
}

class Menu extends Sequelize.Model {
  static init(sequelize, DataTypes) {
  super.init({
    menu_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      comment: "식사id"
    },
    menu_type: {
      type: DataTypes.STRING(20),
      allowNull: false,
      comment: "식사유형"
    },
    menu_details: {
      type: DataTypes.STRING(100),
      allowNull: false,
      comment: "알러지 등"
    },
    menu_list: {
      type: DataTypes.STRING(100),
      allowNull: false,
      comment: "메뉴목록"
    },
    menu_image: {
      type: DataTypes.STRING(255),
      allowNull: false,
      comment: "메뉴사진"
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
    tableName: 'Menu',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "menu_id" },
        ]
      },
    ]
  });
  return Menu;
  }
}
