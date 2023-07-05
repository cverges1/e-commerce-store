const { Model, DataTypes } = require("sequelize");
const connection = require("../config/connection");

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
    price: {
      type: DataTypes.STRING,
    },
    on_sale: {
      type: DataTypes.BOOLEAN,
    },
    category_id: {
      type: DataTypes.INTEGER,
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
    }},{
    sequelize: connection,
    timestamps: false,
    underscored: true,
    freezeTableName: true,
    modelName: "product",
  });

module.exports = Product;
