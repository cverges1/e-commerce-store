const { Model, DataTypes } = require("sequelize");
const connection = require("../config/connection");

class Category extends Model {}

Category.init({
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
  modelName: "category",
});

module.exports = Category;
