import getPool from "../../db/getPool.js";

const insertCommentModel = async (comment, userId, reelId) => {

    try {
        const pool = await getPool();
        // Insertar el comentario en la tabla 'comments' sin verificar existencia previa
        await pool.execute(
            `
                INSERT INTO comments (\`comment\`, userId, reelId) 
                VALUES (?, ?, ?)
            `,
            [comment, userId, reelId]
        );

        // Incrementar el conteo de comentarios en la tabla 'reels'
        await pool.execute(
            `
                UPDATE reels SET commentCount = commentCount + 1 WHERE id = ?
            `,
            [reelId]
        );

        return true;
  
    } catch (error) {
            console.log(error);
    }
};

export default insertCommentModel;
