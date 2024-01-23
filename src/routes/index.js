import express from 'express';

import reelRoutes from './reelRoutes.js';
import userRoutes from './userRoutes.js'

const router = express.Router();

router.use(reelRoutes);
router.use(userRoutes);

export default router;