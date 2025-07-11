import getPool from '../db/getPool.js';
import { notFoundError } from '../services/errorService.js';

const userExistsController = async (req, res, next) => {
    try {
        const pool = await getPool();

        const userId = req.user?.id || req.params.userId;

        const [users] = await pool.query(`SELECT id FROM users WHERE id = ?`, [
            userId,
        ]);

        if (users.length < 1) {
            notFoundError('usuario');
        }

        next();

    } catch (err) {
        next(err);
    }
};

export default userExistsController;