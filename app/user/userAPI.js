const express = require('express');
const router = express.Router();

const UserController = require('./usersController');
const logErrors = require('./usersErrors');

router.get('/', UserController.getUsers);
router.get('/:id', UserController.getUsers);
router.get('/email/:email', UserController.getUsers);
router.use(logErrors);

module.exports = router;
