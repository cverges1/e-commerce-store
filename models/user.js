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
    },
    funds: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    is_admin: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    merchant_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "merchant",
        key: "id",
      },
    },
  },
  {
    hooks: {
      beforeCreate: async (newUserData) => {
        // console.log(newUserData.dataValues.password);
        const plainTextPassword = newUserData.dataValues.password;
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
    },
    sequelize: connection,
    timestamps: false,
    underscored: true,
    freezeTableName: true,
    modelName: "user",
  }
);

module.exports = User;
