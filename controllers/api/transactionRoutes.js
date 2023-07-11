const router = require('express').Router();
const sequelize = require("../../config/connection");
const withAuth = require("../../utils/auth");


const { Transaction } = require('../../models');

//route to get customer transaction
router.get('/transaction', async (req, res) => {
    console.log("req.body", req.body);
    try {
        const getTransaction = await Transaction.findAll({
            attributes: {
                include: ['order_id', 'payment_id', 'user_id'],
                exclude: ['delivery_id']
            }
        });
        res.status(200).json(getTransaction); // 200 - OK

    } catch (error) {
        console.log(error);
        req.statusCode(500).json(error); //500 internal server error
    }
});

//post transaction for customer to see
router.post("/transaction", withAuth, async (req, res) => {
    console.log("req.body", req.body);
    //create new transaction
    try {
        const newTransaction = await Transaction.create({
            order_id: req.body.order_id,
            payment_id: req.body.payment_id,
            delivery_id: req.body.delivery_id
        })
        //save new session to db
        req.session.save(() => {
            //create new session variable based on newly created order
            req.session.payment_id = newTransaction.id;
            res.status(201).json(newTransaction); // 201 - Created
        });
     } catch (error) {
        console.log(error);
        res.status(500).json(error); // 500 - Internal Server Error
    }
});

module.exports = router;