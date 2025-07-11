// controllers/users/changeUserRoleController.js
import updateUserRoleModel from '../../models/users/updateUserRoleModel.js';
import { adminOnlyError } from '../../services/errorService.js';

const changeUserRoleController = async (req, res, next) => {
    try {
        const { userId } = req.params;
        const { newRole } = req.body;

        // Verificar si el usuario que hace la solicitud es un administrador
        if (req.user.role !== 'admin') {
            adminOnlyError();
        }

        // Actualizar el rol del usuario en la base de datos
        await updateUserRoleModel(userId, newRole);

        res.send({
            status: 'ok',
            message: 'Rol del usuario actualizado correctamente',
        });
    } catch (err) {
        next(err);
    }
};

export default changeUserRoleController;