import { likeAlreadyExistsError } from '../../services/errorService.js';
import insertLikeModel from '../../models/posts/insertLikeModel.js';
import selectPostByIdModel from '../../models/posts/selectPostByIdModel.js';
// import deleteLikeModel from '../../models/posts/deleteLikeModel.js';

const likePostController = async (req, res, next) => {
    try {
        const { postId } = req.params;
        const { value } = req.body;

        const post = await selectPostByIdModel(postId);

        // el dueño del post no puede dar like a su propio post
        if(post.userId === req.user.id) likeAlreadyExistsError();

        const likesAvg = await insertLikeModel(value, postId, req.user.id);

        res.send({
            status: 'ok',
            data: likesAvg
        });

        // Verificar si el usuario ya le dio "Like"
        //const alreadyLiked = await insertLikeModel.checkIfLiked(postId, userId);

        //if (alreadyLiked) {
        
            // Si ya le dio "Like", poder eliminarlo
        //    const likesAvg = await deleteLikeModel.deleteLike(postId, userId);

        //    res.status(200).json({
        //        status: 'ok',
        //        message: 'Me gusta eliminado.',
        //        data: likesAvg
        //    });
        //} else {

            // Si no le "Like" previamente, permitir darlo
        //    const likesAvg = await insertLikeModel.likePost(postId, userId);

        //    res.status(200).json({
        //        status: 'ok',
        //        data: likesAvg
        //    });
        //}
    } catch (error) {
            next(error);
        // Verificar tipo de error y manejarlo adecuadamente
        //if(error.message === 'Like already exists') {
            // Si ya le dio "Like", lanzar el error
        //    likeAlreadyExistsError();
        //} else {
        //    next(error);
        //}
    }
};

export default likePostController;