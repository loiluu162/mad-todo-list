const express = require('express');
const router = express.Router();

const ToDosController = require('./todosController');
const logErrors = require('./todosErrors');

router.get('/', ToDosController.gettodos);
router.get('/:id', ToDosController.gettodos);
router.get('/email/:email', ToDosController.gettodos);
router.use(logErrors);

module.exports = router;
