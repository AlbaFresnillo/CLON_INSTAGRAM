import selectReelByIdModel from '../models/reels/selectReelByIdModel.js';
import getPool from '../db/getPool.js';
import { notFoundError } from '../services/errorService.js';

const reelExistsController = async (req, res, next) => {
    try {

        const pool = await getPool();

        const {reelId} = req.params;

        const [reels] = await pool.query(
            `SELECT id FROM reels WHERE id = ?`,
            [reelId]
        );


        if (reels.length < 1) {
            notFoundError('reel');
        }
        
        next();
    
    } catch (err) {
        next(err);
    }
}

export default reelExistsController;