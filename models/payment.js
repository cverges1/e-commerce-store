const { Model, DataTypes } = require("sequelize");
const connection = require("../config/connection");

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
  payment_amt: {
    type: DataTypes.INTEGER,
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
  }},{
  sequelize: connection,
  timestamps: false,
  underscored: true,
  freezeTableName: true,
  modelName: "payment",
});

module.exports = Payment;

