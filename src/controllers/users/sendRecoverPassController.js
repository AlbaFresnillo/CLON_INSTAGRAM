import selectUserByEmailModel from "../../models/users/selectUserByEmailModel.js";
import { notFoundError } from "../../services/errorService.js";
import randomstring from 'randomstring';
import updateRecoverPasswordModel from "../../models/users/updateRecoverPasswordModel.js";

const sendRecoverPasswordController = async (req,res,next) => {
    try {
        
        const { email } = req.body;

        const user = await selectUserByEmailModel(email);

        if(!user) notFoundError();

        const recoverPassCode = randomstring.generate(10);

        await updateRecoverPassModel(email, recoverPassCode);

        res.send({
            status: 'ok',
            message: 'Correo de recuperación de contraseña enviado'
        })
    } catch (err) {
        next(err)
    }
};

export default sendRecoverPasswordController;