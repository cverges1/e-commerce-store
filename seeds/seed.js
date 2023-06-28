const sequelize = require('../config/connection');
const {
  User,
  Product,
  Category,
  Transaction,
  Merchant,
} = require("../models");

const userData = require("./userData.json");
const categoryData = require("./categoryData.json");
const merchantData = require("./merchantData.json");
const productData = require("./productData.json");
const transactionData = require("./transactionData.json");


const seedData = async () => {
  await sequelize.sync({ force: true });

  await User.bulkCreate(userData, {individualHooks: true });
  await Merchant.bulkCreate(merchantData);
  await Category.bulkCreate(categoryData);
  await Product.bulkCreate(productData);
  await Transaction.bulkCreate(transactionData);
};

seedData();
