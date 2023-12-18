import { likeAlreadyExistsError } from '../../services/errorService.js';
import insertLikeModel from '../../models/entries/insertLikeModel.js';
import deleteLikeModel from '../../models/entries/deleteLikeModel.js';

const likeEntryController = async (req, res, next) => {
    try {
        const postId = req.params.postId;
        const userId = req.user.id;

        // Verificar si el usuario ya le dio "Like"
        const alreadyLiked = await insertLikeModel.checkIfLiked(postId, userId);

        if (alreadyLiked) {
        
            // Si ya le dio "Like", poder eliminarlo
            const likesAvg = await deleteLikeModel.deleteLike(postId, userId);

            res.status(200).json({
                status: 'ok',
                message: 'Me gusta eliminado.',
                data: likesAvg
            });
        } else {

            // Si no le "Like" previamente, permitir darlo
            const likesAvg = await insertLikeModel.likePost(postId, userId);

            res.status(200).json({
                status: 'ok',
                data: likesAvg
            });
        }
    } catch (error) {

        // Verificar tipo de error y manejarlo adecuadamente
        if(error.message === 'Like already exists') {
            // Si ya le dio "Like", lanzar el error
            likeAlreadyExistsError();
        } else {
            next(error);
        }
    }
};

export default likeEntryController;