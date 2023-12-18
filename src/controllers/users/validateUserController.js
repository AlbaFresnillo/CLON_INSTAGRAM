import updateUserRegCodeModel from "../../models/users/updateUserRegCodeModel.js";

const validateUserController = async (req,res,next) => {
    try {
        
        const {registrationCode} = req.params;

        await updateUserRegCodeModel(registrationCode);

        res.send({
            status: 'ok',
            message: 'Usuario activado'
        });
        
    } catch (error) {
        next(error);
    }
}

export default validateUserController;