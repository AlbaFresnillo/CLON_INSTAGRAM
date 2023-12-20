import getPool from "../../db/getPool.js";

const selectPostByIdModel = async (postId) => {

    const pool = await getPool();

    const [post] = await pool.query(
        `
            SELECT p.id, p.title, p.place, u.username, p.userId, AVG(IFNULL(v.value,0)) AS likes, p.createdAt
            FROM posts p
            LEFT JOIN postlikes v ON v.postId = p.id
            INNER JOIN users u On u.id = p.userId
            WHERE p.id = ${postId}
            GROUP BY p.id
            ORDER BY p.createdAt DESC
        `
    );

    const [photos] = await pool.query(
        `
            SELECT id, name FROM postphotos WHERE postId = ?
        `
        [postId]
    );

    post[0].photos = photos;

    return post[0];

}

export default selectPostByIdModel;