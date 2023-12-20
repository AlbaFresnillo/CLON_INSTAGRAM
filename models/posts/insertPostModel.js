import getPool from '../../db/getPool.js';

const insertPostModel = async (title, place, description, usedId) => {
    const pool = await getPool();

    const [result] = await pool.query(
        `
            INSERT INTO posts (title, place, description, userId)
            VALUE (?, ?, ?, ?)
        `,
        [title, place, description, userId]
    );
    
    console.log(result);

    const { insertId } = result;

    return insertId;
}

export default insertPostModel;