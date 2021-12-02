import express from 'express';

import UserController from './controller.js';
import logErrors from './errors.js';

const router = express.Router();

router.get('/', UserController.getUsers);
router.get('/:id', UserController.getUsers);
router.get('/email/:email', UserController.getUsers);
router.use(logErrors);

export default router;
