import getPool from "../../db/getPool.js";
import sendMailUtil from "../../util/sendMailUtil.js";

const updateRecoverPasswordModel = async (email, recoverPassCode) => {
    const pool = await getPool();

    await pool.query(
        `
            UPDATE users
            SET recoverPassCode = ?
            WHERE email = ?
        `,
        [recoverPassCode, email]
    );

    const emailSubject = 'Recuperación de contraseña de INSTAHAB';

    const emailBody = 
        `
            Se ha solicitado la recuperación de la contraseña de INSTAHAB de esta cuenta.
            
            Para crear una nueva contraseña utiliza el siguiente código de recuperación: ${recoverPassCode}

            Si no has sido tu, ignora este mail.
        `;

    await sendMailUtil(email, emailSubject, emailBody);

};

export default updateRecoverPasswordModel;