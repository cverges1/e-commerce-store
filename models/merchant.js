const { Model, DataTypes } = require("sequelize");
const connection = require("../config/connection");

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
  }},{
  sequelize: connection,
  timestamps: false,
  underscored: true,
  freezeTableName: true,
  modelName: "merchant",
});

module.exports = Merchant;
