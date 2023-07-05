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


module.exports = router;
