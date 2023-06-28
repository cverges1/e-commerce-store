const { Model, DataTypes } = require("sequelize");
const bcrypt = require("bcrypt");
const connection = require("../config/connection");

class User extends Model {
  checkPassword(loginPw) {
    return bcrypt.compareSync(loginPw, this.password);
  }
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [8],
      },
    },
    shipping_address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    billing_address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    payment_info: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isCreditCard: true,
      },
    },
    funds: {
      type: DataTypes.STRING,
      allowNull: false,
    }},{
    sequelize: connection,
    timestamps: false,
    freezeTableName: true,
    modelName: "user",
  },
  {
    hooks: {
      beforeCreate: async (newUserData) => {
        const plainTextPassword = newUserData.password;
        const hashedPassword = await bcrypt.hash(plainTextPassword, 10);
        newUserData.password = hashedPassword;
        return newUserData;
      },
      beforeUpdate: async (updatedUserData) => {
        const plainTextPassword = updatedUserData.password;
        const hashedPassword = await bcrypt.hash(plainTextPassword, 10);
        updatedUserData.password = hashedPassword;
        return updatedUserData;
      },
  }},{
    sequelize: connection,
    timestamps: false,
    freezeTableName: true,
    modelName: "user",
  });

module.exports = User;
