import bcrypt from 'bcrypt';
import { v4 as uuid } from "uuid";
import getPool from '../../db/getPool.js';
import sendMailUtil from '../../util/sendMailUtil.js';

import {
    emailAlreadyRegisteredError,
    userAlreadyRegisteredError
} from '../../services/errorService.js';

const insertUserModel = async (username, email, password, registrationCode) => {
    const pool = await getPool();

    let [users] = await pool.query(
        `
            SELECT id FROM users WHERE username = ?
        `,
        [username]
    );

    if(users.length>0){
        userAlreadyRegisteredError();
    };

    [users] = await pool.query(
        `
            SELECT id FROM users WHERE email = ?
        `,
        [email]
    );

    if(users.length>0){
        emailAlreadyRegisteredError();
    };

    /**hacer logica de envio de email */
    const emailSubject = 'Activa tu usuario de INSTAHAB';

    const emailBody = `
    👋 !!!Bienvenid@ ${username}¡¡¡¡¡👋

            Gracias por registrarse en  📷 INSTAHAB. Para activar tu cuenta haga click en el siguiente enlace:

            <a href="http://localhost:3060/auth/activate/${registrationCode}">❤️ Activar mi cuenta ❤️ </a>
    `

    await sendMailUtil(email,emailSubject,emailBody);

    const hashedPassword = await bcrypt.hash(password,10);

    await pool.query(
        `
            INSERT INTO users (id,username, email, password, registrationCode)
            VALUES (?,?,?,?,?)
        `,
        [uuid(),username, email, hashedPassword, registrationCode]
    );
};

export default insertUserModel;