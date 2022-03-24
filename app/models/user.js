const { Sequelize, Model } = require("sequelize");
const { sequelize } = require("../../core/db");
const bcrypt = require("bcryptjs");

class User extends Model {
  static async verifyEmailPassword(email, plainPassword) {
    const user = await User.findOne({
      where: {
        email,
      },
    });
    if (!user) {
      throw new global.errs.AuthFailed("账号不存在");
    }
    const correct = bcrypt.compareSync(plainPassword, user.password);
    if (!correct) {
      throw new global.errs.AuthFailed("密码错误");
    }
    return user;
  }

  static async getUserByOpenid(openid){
      return await User.findOne({
          where: {
              openid
          }
      })
  }

  static async registerByOpenid(openid){
      return await User.create({
          openid
      })
  }
}

User.init(
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true, //是否为主键
      autoIncrement: true, //是否自增
    },
    openid: {
      type: Sequelize.STRING(64),
      unique: true, //是否唯一
    },
    nickname: Sequelize.STRING,
    email: {
      type: Sequelize.STRING(128),
      unique: true, //是否唯一
    },
    password: {
      type: Sequelize.STRING,
      set(val) {
        const salt = bcrypt.genSaltSync(10);
        const psw = bcrypt.hashSync(val, salt);
        this.setDataValue("password", psw);
      },
    },
  },
  {
    sequelize,
    tableName: "user",
  }
);

module.exports = { User };
