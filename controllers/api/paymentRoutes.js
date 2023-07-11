const router = require('express').Router();
const sequelize = require("../../config/connection");
const withAuth = require("../../utils/auth");
const { Payment } = require('../../models');
//retrieve
//route to get customer payment
router.get('/payment', withAuth, async (req, res) => {
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

//post method for payment
    router.post('/payment', withAuth ,async (req, res) => {
            console.log('req.body', req.body);
            try {
              const newPayment = await Payment.create({
                date: req.body.date,
                payment_amt: req.body.payment_amt,
                order_id: req.body.order_id
              });
              res.status(201).json(newPayment);
            } catch (error) {
                console.log(error);
                res.status(500).json(error); // 500 - Internal Server Error
            }
    });


module.exports = router;