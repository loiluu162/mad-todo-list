import express from 'express';
import loginRouter from './login/route.js';
import userRouter from './user/route.js';
import todosRouter from './todos/route.js';
import storageRouter from './storage/route.js';
const router = express.Router();

router.use('/auth', loginRouter);
router.use('/user', userRouter);
router.use('/todos', todosRouter);
router.use('/storage', storageRouter);

export default router;
