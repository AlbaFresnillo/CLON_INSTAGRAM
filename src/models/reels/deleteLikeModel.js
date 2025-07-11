import getPool from "../../db/getPool.js";

const deleteLikeModel = async (userId, reelId, likeId) => {
    const pool = await getPool();
    try {
        const [result] = await pool.query(
            `
                SELECT id FROM likes 
                WHERE userId = ? AND reelId = ? AND id = ?
            `,
            [userId, reelId, likeId]
        );

        if (result.length > 0) {
            return null;
        }

        await pool.query(
            `
                DELETE FROM likes 
                WHERE userId = ? AND reelId = ? AND id = ?
            `,
            [userId, reelId, likeId]
        );

        return result[0];
    } catch (err) {
        throw err;
    }
};

export default deleteLikeModel;