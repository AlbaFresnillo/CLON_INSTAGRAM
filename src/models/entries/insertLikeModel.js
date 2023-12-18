import getPool from "../../db/getPool.js";
import { likeAlreadyExistsError } from "../../services/errorService.js";

const insertLikeModel = async (value, entryId, userId) => {
    const pool = await getPool();


    // Comprobar que si existe un like previo por parte del usuario para esa entrada, no pueda darle de nuevo

    const [likes] = await pool.query(
    `
        SELECT id FROM entrylikes
        WHERE userId = ? AND entryId = ?
    `,
    [userId, entryId]
    );

    if (likes.length) likeAlreadyExistsError();

    // Insertamos el like en entrylikes
    await pool.query(
    `
        INSERT INTO entrylikes (value, entryId, userId)
        VALUES (?, ?, ?)
    `,
    [value, entryId, userId]
    );

    const [likesAvg] = await pool.query(
    `
        SELECT AVG(value) AS avg FROM entrylikes WHERE entryId = ${entryId}
    `
    );

    return Number(likesAvg[0].avg);
}

export default insertLikeModel;