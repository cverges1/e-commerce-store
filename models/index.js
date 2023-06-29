const User = require("./user");
const Product = require("./product");
const Category = require("./category");
const Merchant = require("./merchant");
const Payment = require("./payment");
const Transaction = require("./transaction");
const Delivery = require("./delivery");
const Order = require("./order");
const Admin = require("./admin");

User.hasMany(Product, {
  foreignKey: "user_id",
});

Product.belongsTo(User, {
  foreignKey: "user_id",
});

User.hasMany(Payment, {
  foreignKey: "user_id",
});

Payment.belongsTo(User, {
  foreignKey: "user_id",
});

User.hasMany(Order, {
  foreignKey: "user_id",
});

Order.belongsTo(User, {
  foreignKey: "user_id",
});

User.hasMany(Payment, {
  foreignKey: "user_id",
});

Payment.belongsTo(User, {
  foreignKey: "user_id",
});

User.hasMany(Transaction, {
  foreignKey: "user_id",
});

Transaction.belongsTo(User, {
  foreignKey: "user_id",
});

User.hasMany(Admin, {
  foreignKey: "user_id",
});

Admin.belongsTo(User, {
  foreignKey: "user_id",
});

Category.hasMany(Product, {
  foreignKey: "category_id",
  onDelete: "CASCADE",
});

Product.belongsTo(Category, {
  foreignKey: "category_id",
});

Merchant.hasMany(User, {
  foreignKey: "merchant_id",
  onDelete: "CASCADE",
});

User.belongsTo(Merchant, {
  foreignKey: "merchant_id",
});

Merchant.hasMany(Product, {
  foreignKey: "merchant_id",
  onDelete: "CASCADE",
});

Product.belongsTo(Merchant, {
  foreignKey: "merchant_id",
});

Order.hasMany(Product, {
  foreignKey: "product_id",
});

Product.belongsTo(Order, {
  foreignKey: "product_id",
});

Transaction.hasMany(Payment, {
  foreignKey: "payment_id",
});

Payment.belongsTo(Transaction, {
  foreignKey: "payment_id",
});

Transaction.hasMany(Order, {
  foreignKey: "order_id",
});

Order.belongsTo(Transaction, {
  foreignKey: "order_id",
});

Transaction.hasMany(Delivery, {
  foreignKey: "delivery_id",
});

Delivery.belongsTo(Transaction, {
  foreignKey: "delivery_id",
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
