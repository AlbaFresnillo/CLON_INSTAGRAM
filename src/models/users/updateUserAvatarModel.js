import getPool from '../../db/getPool.js';

// Función que realiza una consulta a la base de datos para actualizar el avatar de un usuario.
const updateUserAvatarModel = async (avatarImg, userId) => {
    const pool = await getPool();

    await pool.query(`UPDATE users SET avatar = ? WHERE id = ?`, [
        avatarImg,
        userId,
    ]);
};

export default updateUserAvatarModel;