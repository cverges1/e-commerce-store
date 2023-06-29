const { Model, DataTypes } = require("sequelize");
const bcrypt = require("bcrypt");
const connection = require("../config/connection");

class Admin extends Model {
  checkPassword(loginPw) {
    return bcrypt.compareSync(loginPw, this.password);
  }
}

Admin.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "user",
        key: "id",
      },
    },
  },
  {
    sequelize: connection,
    timestamps: false,
    underscored: true,
    freezeTableName: true,
    modelName: "admin",
  }
);

module.exports = Admin;
