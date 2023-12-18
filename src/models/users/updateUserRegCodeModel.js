import getPool from "../../db/getPool.js";
import { notFoundError } from "../../services/errorService.js";

const updateUserRegCodeModel = async (registrationCode) => {
    const pool = await getPool();

    const [user] = await pool.query(
        `
            SELECT id FROM users WHERE registrationCode = ?
        `,
        [registrationCode]
    );

    if(!user.length){
        notFoundError('usuario');
    }

    await pool.query(
        `
            UPDATE users
            SET active=true, registrationCode=null
            WHERE registrationCode = ?
        `,
        [registrationCode]
    );
}

export default updateUserRegCodeModel;