import getPool from "../../db/getPool.js";

const deleteCommentModel = async (userId, reelId, commentId) => {

    const pool = await getPool();

    try {
        // Check if the userId, reelId and commentId exist
        const [userRows] = await pool.query(
            `SELECT id FROM users WHERE id = ?`,
            [userId]
        );
        const [reelRows] = await pool.query(
            `SELECT id FROM reels WHERE id = ?`,
            [reelId]
        );
        const [commentRows] = await pool.query(
            `SELECT id FROM comments WHERE id = ?`,
            [commentId]
        );

   

        // Check if the user is the owner of the comment
        const [commentOwnerRows] = await pool.query(
            `SELECT id FROM comments WHERE id = ? AND userId = ?`,
            [commentId, userId]
        );


        // Delete the comment
        const [deletedRows] = await pool.query(
            `DELETE FROM comments WHERE id = ?`,
            [commentId]
        );
        
        return true;
    } catch (error) {
        console.log(error);
        throw error;
    };
};

export default deleteCommentModel;