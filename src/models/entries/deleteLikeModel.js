import getPool from "../../db/getPool.js";

const deleteLikeModel = async (postId, userId) => {
    const pool = await getPool();

    // Vertificar si el usuario ya le dio "Like"
    const [like] = await pool.query(
        `
            SELECT id FROM entrylikes
            WHERE userId = ? AND entryId = ?
        `,
        [userId, postId]
    );

    // Si existe el "Like", poder eliminarlo
    if (like.length) {
        await pool.query(
            `
                DELETE FROM entrylikes
                WHERE userId = ? AND entryId = ?
            `,
            [userId, postId]
        );
    }

    // Obtener el promedio de los "Likes" restantes
    const [likesAvg] = await pool.query(
        `
            SELECT AVG(value) AS avg FROM entrylikes WHERE entryId = ${postId}
        `
    );

    return Number(likesAvg[0].avg);
};

export default deleteLikeModel;