const express = require('express');

const router = express.Router();

router.use('/', require('./login'));
router.use('/', require('./todos'));
router.use('/', require('./user'));

module.exports = router;
