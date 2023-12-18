import { notFoundError } from "../../services/errorService.js";
import selectUserByIdModel from "../../models/users/selectUserByIdModel.js";

const getOwnUserController = async (req,res,next) => {
    try {
        
        const user = await selectUserByIdModel(req.user.id);

        if (!user) {
            notFoundError('Usuario');
        }

        res.send({
            status: 'ok',
            data: {
                user
            }
        });

    } catch (error) {
        next(error);
    }
};

export default getOwnUserController;