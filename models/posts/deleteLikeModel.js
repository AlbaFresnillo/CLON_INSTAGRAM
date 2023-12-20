import getPool from "../../db/getPool.js";

const deleteLikeModel = async (postId, userId) => {
    const pool = await getPool();

    // Vertificar si el usuario ya le dio "Like"
    const [like] = await pool.query(
        `
            SELECT id FROM postlikes
            WHERE userId = ? AND postId = ?
        `,
        [userId, postId]
    );

    // Si existe el "Like", poder eliminarlo
    if (like.length) {
        await pool.query(
            `
                DELETE FROM postlikes
                WHERE userId = ? AND postId = ?
            `,
            [userId, postId]
        );
    }

    // Obtener el promedio de los "Likes" restantes
    const [likesAvg] = await pool.query(
        `
            SELECT AVG(value) AS avg FROM postlikes WHERE postId = ${postId}
        `
    );

    return Number(likesAvg[0].avg);
};

export default deleteLikeModel;