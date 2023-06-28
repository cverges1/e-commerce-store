const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Transaction extends Model {}

Transaction.init({
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  order_id: {
    type: DataTypes.INTEGER,
    references: {
      model: "order",
      key: "id",
    },
  },
  payment_id: {
    type: DataTypes.INTEGER,
    references: {
      model: "payment",
      key: "id",
    },
  },
  delivery_id: {
    type: DataTypes.INTEGER,
    references: {
      model: "delivery",
      key: "id",
    },
  },
  user_id: {
    type: DataTypes.INTEGER,
    references: {
      model: "user",
      key: "id",
    },
  },
  sequelize,
  timestamps: false,
  freezeTableName: true,
  underscored: true,
  modelName: "transaction",
});

module.exports = Transaction;