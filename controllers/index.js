const router = require('express').Router();

// const apiRoutes = require('./api/index');
const htmlRoutes = require('./html/index');
const apiRoutes = require('./api/index');

router.use('/', htmlRoutes);
router.use('/api', apiRoutes);

module.exports = router;