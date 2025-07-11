import getPool from "../../db/getPool.js";

const selectReelByIdModel = async (reelId) => {

    const pool = await getPool();

    const [reel] = await pool.query(
        `
        SELECT r.id, r.text, u.username, r.userId, SUM(IFNULL(l.value,0)) AS likes, r.createdAt
        FROM reels r
        LEFT JOIN likes l ON l.reelId = r.id
        INNER JOIN users u On u.id = r.userId
        WHERE r.id = ${reelId}
        GROUP BY r.id
        ORDER BY r.createdAt DESC
        `
    );

    const [photos] = await pool.query(
        `
            SELECT id, name FROM reelphotos WHERE reelId = ?
        `,
        [reelId] 
    );

    reel[0].photos = photos;

    return reel[0];

}

export default selectReelByIdModel;