import express from 'express';

import loginRouter from './/login/route.js';
import todosRouter from './todos/route.js';
import userRouter from './user/route.js';

const router = express.Router();

router.use('/', loginRouter);
router.use('/', todosRouter);
router.use('/', userRouter);

export default router;
