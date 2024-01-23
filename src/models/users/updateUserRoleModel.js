import getPool from '../../db/getPool.js';

const updateUserRoleModel = async (userId, newRole) => {
    const pool = await getPool();
    await pool.query(`
    UPDATE users 
    SET role = ? 
    WHERE id = ?`, 
    [newRole, userId]);
};

export default updateUserRoleModel;