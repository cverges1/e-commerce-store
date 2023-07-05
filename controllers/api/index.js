const router = require('express').Router();

const userRoutes = require('./userRoutes.js');
const orderRoutes = require('./orderRoutes.js');
const paymentRoutes = require('./paymentRoutes.js');
const transactionRoutes = require('./transactionRoutes.js');
const productRoutes = require('./productRoutes.js');

router.use('/users', userRoutes);
router.use('/order', orderRoutes);
router.use('/payment', paymentRoutes);
router.use('/transaction', transactionRoutes);
router.use('/product', productRoutes);

module.exports = router;