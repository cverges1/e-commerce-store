const router = require('express').Router();


const sequelize = require('../../config/connection');
const { Category, Product, User, Transaction } = require('../../models');
