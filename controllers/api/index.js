const router = require('express').Router();

const userRoutes = require('./userRoutes.js');
const orderRoutes = require('./orderRoutes.js');
const paymentRoutes = require('./paymentRoutes.js');
const transactionRoutes = require('./transactionRoutes.js');
const productRoutes = require('./productRoutes.js');

router.use('/users', userRoutes);
router.use('/orders', orderRoutes);
router.use('/payments', paymentRoutes);
router.use('/transactions', transactionRoutes);
router.use('/products', productRoutes);

module.exports = router;