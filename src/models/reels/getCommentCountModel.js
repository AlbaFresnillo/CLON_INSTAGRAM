import getPool from "../../db/getPool.js";

const getCommentCountModel = async (reelId) => {
    try {
        const pool = await getPool();
        // Consultar el conteo de comentarios en la tabla 'reels'
        const [results] = await pool.execute(
            `
                SELECT commentCount FROM reels WHERE id = ?
            `,
            [reelId]
        );

        return results[0]?.commentCount || 0;
  
    } catch (error) {
            console.log(error);
    }

};

export default getCommentCountModel;