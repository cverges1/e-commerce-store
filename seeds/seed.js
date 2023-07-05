const {
  User,
  Product,
  Category,
  Transaction,
  Merchant,
  Order,
  Payment,
  Delivery,
} = require("../models");

const sequelize = require('../config/connection');

const userData = require("./userData.json");
const categoryData = require("./categoryData.json");
const merchantData = require("./merchantData.json");
const productData = require("./productData.json");
const transactionData = require("./transactionData.json");
const orderData = require("./orderData.json");
const paymentData = require("./paymentData.json");
const deliveryData = require("./deliveryData.json");

const seedData = async () => {
  await sequelize.sync({ force: true });

  await Merchant.bulkCreate(merchantData);
  await Delivery.bulkCreate(deliveryData);
  await Category.bulkCreate(categoryData);
  await Product.bulkCreate(productData);
  await User.bulkCreate(userData, {individualHooks: true });
  await Order.bulkCreate(orderData);
  await Payment.bulkCreate(paymentData);
  await Transaction.bulkCreate(transactionData);
};

seedData();
