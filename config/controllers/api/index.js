const router = require('express').Router();

const apiRoutes = require('./api');

router.use('/api', apiRoutes);

router.use((req, res) => res.send('<h1>Oops! Wrong Route!</h1>'));

module.exports = router;