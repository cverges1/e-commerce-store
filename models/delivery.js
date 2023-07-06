const { Model, DataTypes } = require("sequelize");
const connection = require("../config/connection");

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
  }},{
  sequelize: connection,
  timestamps: false,
  underscored: true,
  freezeTableName: true,
  modelName: "delivery",
});

module.exports = Delivery;
