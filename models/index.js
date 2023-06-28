const User = require("./user");
const Product = require("./product");
const Category = require("./category");
const Merchant = require("./merchant");
const Payment = require("./payment");
const Transaction = require("./transaction");
const Delivery = require("./delivery");
const Order = require("./order");

User.hasMany(Product, {
  foreignKey: "userId",
});

Product.belongsTo(User, {
  foreignKey: "userId",
});

User.hasMany(Payment, {
  foreignKey: "userId",
});

Payment.belongsTo(User, {
  foreignKey: "userId",
});

User.hasMany(Order, {
  foreignKey: "userId",
});

Order.belongsTo(User, {
  foreignKey: "userId",
});

User.hasMany(Transaction, {
  foreignKey: "userId",
});

Transaction.belongsTo(User, {
  foreignKey: "userId",
});

Category.hasMany(Product, {
  foreignKey: "categoryId",
  onDelete: "CASCADE",
});

Product.belongsTo(Category, {
  foreignKey: "categoryId",
});

Merchant.hasMany(Product, {
  foreignKey: "merchantId",
  onDelete: "CASCADE",
});

Product.belongsTo(Merchant, {
  foreignKey: "merchantId",
});

Order.hasMany(Product, {
  foreignKey: "productId",
});

Product.belongsTo(Order, {
  foreignKey: "productId",
});

Transaction.hasOne(Payment, {
  foreignKey: "paymentId",
});

Payment.belongsTo(Transaction, {
  foreignKey: "paymentId",
});

Transaction.hasOne(Order, {
  foreignKey: "orderId",
});

Order.belongsTo(Transaction, {
  foreignKey: "orderId",
});

Transaction.hasOne(Delivery, {
  foreignKey: "deliveryId",
});

Delivery.belongsTo(Transaction, {
  foreignKey: "deliveryId",
});

module.exports = {
  User,
  Product,
  Category,
  Merchant,
  Payment,
  Transaction,
  Delivery,
  Order,
};
