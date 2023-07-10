// POST
const router = require('express').Router();
const sequelize = require("../../config/connection");

const { Payment, } = require('../../models');

//route to get customer payment
router.get('/payment', async (req, res) => {
    console.log("req.body", req.body);
    try {
        const getPayment = await Payment.findAll({
            attributes: {
                include: ['date', 'payment_amt', 'order_id']
            }
        });
        res.status(200).json(getPayment); // 200 - OK

    } catch (error) {
        console.log(error);
        req.statusCode(500).json(error); //500 internal server error
    }
});

module.exports = router;