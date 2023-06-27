const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Payment extends Model {}

Payment.init({
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
  user_id: {
    type: DataTypes.INTEGER,
    references: {
      model: "user",
      key: "id",
    },
  },
  order_id: {
    type: DataTypes.INTEGER,
    references: {
      model: "order",
      key: "id",
    },
  },
  sequelize,
  timestamps: false,
  freezeTableName: true,
  underscored: true,
  modelName: "payment",
});

module.exports = Payment;

