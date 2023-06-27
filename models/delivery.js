const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Delivery extends Model {}

Delivery.init({
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  sequelize,
  timestamps: false,
  freezeTableName: true,
  underscored: true,
  modelName: "delivery",
});

module.exports = Delivery;
