const router = require('express').Router();


const sequelize = require('../../config/connection');
const { Transaction, User, Category, Product } = require('../../models');
