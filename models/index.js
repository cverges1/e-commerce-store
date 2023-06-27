const User = require("./user");
const Product = require("./product");
const Category = require("./category");
const Merchant = require("./merchant");
const Payment = require("./payment");
const Transaction = require("./transaction");
const Delivery = require("./delivery");

User.hasMany(Product, {
  foreignKey: "userId",
});

Product.belongsTo(User, {
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

User.hasMany(Transaction, {
  foreignKey: "userId",
});

Transaction.belongsTo(User, {
  foreignKey: "userId",
});

Payment.hasOne(Transaction, {
  foreignKey: "paymentId",
});

Transaction.belongsTo(Payment, {
  foreignKey: "paymentId",
});

module.exports = {
  User,
  Product,
  Category,
  Merchant,
  Payment,
  Transaction,
  Delivery,
};
