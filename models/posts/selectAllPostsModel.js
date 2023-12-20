import getPool from "../../db/getPool.js";

const selectAllPostsModel = async () => {
    const pool = await getPool();

    const [posts] = await pool.query(
        `
            SELECT p.id, p.title, p.place, u.username, AVG(IFNULL(v.value,0)) AS likes, p.createdAt
            FROM posts p
            LEFT JOIN postlikes v ON v.postId = p.id
            INNER JOIN users u ON u.id = p.userId
            GROUP BY p.id
            ORDER BY p.createdAt DESC
        `
    );

    for (const post of posts){
        const [photos] = await pool.query(
            `
                SELECT id, name FROM postphotos WHERE postId = ?
            `,
            [post.id]
        );

        post.photos = photos
    }

    return posts;
}

export default selectAllPostsModel;