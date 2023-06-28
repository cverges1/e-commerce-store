const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Product extends Model {}

Product.init(
  {
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
    description: {
      type: DataTypes.STRING,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    on_sale: {
      type: DataTypes.BOOLEAN,
    },
    category_id: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: "category",
        key: "id",
      },
    },
    merchant_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "merchant",
        key: "id",
      },
    },
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "product",
  });

module.exports = Product;
