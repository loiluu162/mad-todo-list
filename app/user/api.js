const express = require('express');
const router = express.Router();

const UserController = require('./controller');
const logErrors = require('./errors');

router.get('/', UserController.getUsers);
router.get('/:id', UserController.getUsers);
router.get('/email/:email', UserController.getUsers);
router.use(logErrors);

module.exports = router;
