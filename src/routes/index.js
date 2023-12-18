import express from 'express';

import entriesRouter from './entriesRouter.js';
import useRouter from './useRouter.js'

const router = express.Router();

router.use(entriesRouter);
router.use(useRouter);

export default router;