import express from 'express';

import reelRoutes from './reelRoutes.js';
import userRoutes from './userRoutes.js'

const router = express.Router();

// Rutas relacionadas con los reels bajo '/api/reels'
router.use('/api/reels', reelRoutes);

// Rutas relacionadas con los usuarios bajo '/api/users'
router.use('/api/users', userRoutes);

export default router;