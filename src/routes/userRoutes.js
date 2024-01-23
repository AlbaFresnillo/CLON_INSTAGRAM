import express from 'express';

const router = express.Router();

import { 
    newUserController,
    loginUserController,
    validateUserController,
    getUserProfileController,
    getOwnUserController,
    sendRecoverPasswordController,
    editUserPasswordController,
    editUserAvatarController,
    changeUserRoleController
} from '../controllers/users/index.js';

import{
    authUserController,
    userExistsController
}  from '../middlewares/index.js';
 
//Crear usuario pendiente de activar 
router.post('/api/users/register', newUserController);

//Validar un usuario
router.get('/api/users/validate/:registrationCode', validateUserController)

//Login de usuario
router.post('/api/users/login', loginUserController);

//obtener el perfil publico del usuario
router.get('/api/user/:userId',userExistsController, getUserProfileController);

//obtener el perfil privado del usuario
router.get('/api/users',authUserController, getOwnUserController,getOwnUserController);

//recuperar contraseña --> blanqueo --> envío de mail
router.post('api/users/password/recover', sendRecoverPasswordController);

//toma el codigo de recuperación enviado en el endpoint anterior y
//actualiza la contraseña en la base de datos
router.put('api/users/password', editUserPasswordController);

// Editar el avatar de un usuario.
router.put(
    "api/users/avatar",
    authUserController,
    userExistsController,
    editUserAvatarController
  );
  
  // Cambiar el rol de un usuario
  router.put("api/users/:userId/role", authUserController, changeUserRoleController);
  
export default router;