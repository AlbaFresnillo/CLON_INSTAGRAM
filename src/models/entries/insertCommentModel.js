import getPool from "../../db/getPool.js";

const insertCommentModel = async (userId, postId, text) => {
    const pool = await getPool();

    try {
        
        // Insertar el comentario en la tabla 'comments' sin verificar existencia previa
        await connection.execute(
            `
                INSERT INTO comments (userId, postId, text) VALUES (?, ?, ?)
            `,
            [userId, postId, text]
        );

        return true;
    } catch (error) {
        throw error;
    } finally {
        await connection.release();
    }
};

export default insertCommentModel;