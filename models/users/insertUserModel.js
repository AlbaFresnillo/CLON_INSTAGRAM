import bcrypt from 'bcrypt';
import getPool from '../../db/getPool.js';

import sendMailUtil from '../../util/sendMailUtil.js';

import {
    emailAllReadyRegistratedError,
    userAllReadyRegistratedError
} from '../../services/errorService.js';

const insertUserModel = async (username, email, password, registrationCode) => {
    const pool = await getPool();

    let [user] = await pool.query(
        `
            SELECT id FROM users WHERE username = ?
        `,
        [username]
    );

    if(user.length){
        userAllReadyRegistratedError();
    };

    [user] = await pool.query(
        `
            SELECT id FROM users WHERE email = ?
        `,
        [email]
    );

    if(user.length){
        emailAllReadyRegistratedError();
    };

    /**hacer logica de envio de email */
    const emailSubject = '🎉 Activa tu usuario INSTAHAB 🎉 ';

    const emailBody = `
            !!! 🎉 Bienvenid@ ${username} 🎉 ¡¡¡¡¡

            Gracias por registrarse en INSTAHAB 😊. Para activar tu cuenta haga click en el siguiente enlace:

            <a href="http://localhost:${PORT}/users/validate/${registrationCode}" >❤️ Activar mi cuenta ❤️</a>
    `

    await sendMailUtil(email,emailSubject,emailBody);

    const hashedPassword = await bcrypt.hash(password,10);

    await pool.query(
        `
            INSERT INTO users (username, email, password, registrationCode)
            VALUES (?,?,?,?)
        `,
        [username, email, hashedPassword, registrationCode]
    );
};

export default insertUserModel;