const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Merchant extends Model {}

Merchant.init({
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  sequelize,
  timestamps: false,
  freezeTableName: true,
  underscored: true,
  modelName: "merchant",
});

module.exports = Merchant;
