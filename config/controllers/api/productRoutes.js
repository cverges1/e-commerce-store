const router = require('express').Router();


const sequelize = require('../../config/connection');
const { Product, User, Category, Transaction } = require('../../models');

//post a new product
router.post('./product', async (req, res) => {
    try {
        const newProduct = await User.create({
            id: req.body.id,
            name: req.body.name,
            description: req.body.description,
            date: req.body.date,
    }); 
    res.status(201).json(newProduct);
} catch (error) {
        console.log(error);
        req.status(500).json(error);
    }
})

//get a new product
router.get('./product', async (req, res) => {
    try {
        const chosenProduct = await Product.findAll({
            attributes: {
                exclude: ['category_id', 'merchant_id'],
                include: []
            }
        })
    } catch (error) {
        console.log(error);
        req.status(500).json(error); // 500 internal server error message
    }
})

