import getPool from '../../db/getPool.js';

const insertPhotoModel = async (photoName, entryId) => {
    const pool = await getPool();

    const [result] = await pool.query(
        `
            INSERT INTO posts (name, entryId)
            VALUES (?, ?)
        `,
        [photoName, entryId]
    );

    const { insertId } = result;

    return insertId;
}

export default insertPhotoModel;