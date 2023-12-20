import express from 'express';

const router = express.Router();

import { 
    newUserController,
    loginUserController,
    validateUserController,
    getUserProfileController,
    getOwnUserController,
    sendRecoverPassController,
    editUserPasswordController
} from '../controllers/users/index.js';

import authUserController from '../middlewares/authUserController.js';
import userExistsController from '../middlewares/userExistsController.js';

router.post('/users/register', newUserController);
router.get('/users/validate/:registrationCode', validateUserController)

router.post('/users/login', loginUserController);

//obtener el perfil publico del usuario
router.get('/users/:userId',userExistsController, getUserProfileController);

//obtener el perfil privado del usuario
router.get('/users',authUserController, getOwnUserController);

//recuperar contraseña --> blanqueo --> envío de mail
router.post('/users/password/recover', sendRecoverPassController);

//toma el codigo de recuperación enviado en el endpoint anterior y
//actualiza la contraseña en la base de datos
router.put('/users/password', editUserPasswordController);

export default router;