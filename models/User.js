const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return User.init(sequelize, DataTypes);
}

class User extends Sequelize.Model {
  static init(sequelize, DataTypes) {
  super.init({
    user_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      comment: "유저 id"
    },
    name: {
      type: DataTypes.STRING(20),
      allowNull: false,
      comment: "이름"
    },
    login_id: {
      type: DataTypes.STRING(20),
      allowNull: false,
      comment: "아이디"
    },
    password: {
      type: DataTypes.STRING(20),
      allowNull: false,
      comment: "비밀번호"
    },
    nickname: {
      type: DataTypes.STRING(20),
      allowNull: true,
      comment: "닉네임"
    },
    phone_number: {
      type: DataTypes.STRING(20),
      allowNull: false,
      comment: "전화번호"
    },
    email: {
      type: DataTypes.STRING(45),
      allowNull: false,
      comment: "이메일"
    },
    birth: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      comment: "생년월일"
    },
    point: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0,
      comment: "포인트"
    },
    create_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP'),
      comment: "생성일"
    },
    update_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP'),
      comment: "수정일"
    },
    is_deleted: {
      type: DataTypes.CHAR(1),
      allowNull: false,
      defaultValue: "N",
      comment: "삭제여부"
    },
    membership_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
      comment: "멤버십 id",
      references: {
        model: 'Membership',
        key: 'membership_id'
      }
    }
  }, {
    sequelize,
    tableName: 'User',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "user_id" },
        ]
      },
      {
        name: "FK_Membership_TO_User_1",
        using: "BTREE",
        fields: [
          { name: "membership_id" },
        ]
      },
    ]
  });
  return User;
  }
}
