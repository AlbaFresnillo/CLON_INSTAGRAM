import express from 'express';

import postsRouter from './postsRouter.js';
import userRouter from './userRouter.js'

const router = express.Router();

router.use(postsRouter);
router.use(userRouter);

export default router;