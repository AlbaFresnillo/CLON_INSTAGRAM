import getPool from '../../db/getPool.js';

const insertEntryModel = async (title, place, description, usedId) => {
    const pool = await getPool();

    const [result] = await pool.query(
        `
            INSERT INTO entries (title, place, description, userId)
            VALUE (?, ?, ?, ?)
        `,
        [title, place, description, userId]
    );
    
    console.log(result);

    const { insertId } = result;

    return insertId;
}

export default insertEntryModel;