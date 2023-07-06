const router = require('express').Router();

const homeRoutes = require('./homeRoutes');
const dashboardRoutes = require('./dashboardRoutes');

router.use('/', homeRoutes);
router.use('/dashboard', dashboardRoutes);

module.exports = router;