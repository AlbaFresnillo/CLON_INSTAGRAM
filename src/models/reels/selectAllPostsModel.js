import getPool from "../../db/getPool.js";

const selectAllReelsModel = async () => {
    try {
        const pool = await getPool();

        const [reels] = await pool.query(`
            SELECT r.id, 
                   r.text,
                   u.username,
                   l.likes,
                   c.comment_text,
                   GROUP_CONCAT(rp.name) AS photos
            FROM reels r
            LEFT JOIN (
                SELECT reelId, COUNT(*) AS likes
                FROM likes
                GROUP BY reelId
            ) l ON l.reelId = r.id
            INNER JOIN users u ON u.id = r.userId
            LEFT JOIN (
                SELECT reelId, GROUP_CONCAT(comment_text) AS comment_text
                FROM comments
                GROUP BY reelId
            ) c ON c.reelId = r.id
            LEFT JOIN reelphotos rp ON rp.reelId = r.id
            GROUP BY r.id
            ORDER BY r.createdAt DESC;
        `);

        return reels;
    } catch (error) {
        console.error("Error in selectAllReelsModel:", error);
        throw error;
    }
};

export default selectAllReelsModel;