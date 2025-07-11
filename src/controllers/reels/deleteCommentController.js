import reelExistsController from "../../middlewares/reelExistsController.js";
import deleteCommentModel from "../../models/reels/deleteCommentModel.js";

const deleteCommentController = async (req, res, next) => {
    try {
        await reelExistsController(req, res, async () => {
            const { commentId, reelId } = req.params;
            const userId = req.userId;

            const deleted = await deleteCommentModel(userId, reelId, commentId);

            if(deleted) {
                res.send({
                    status: 'ok',
                    message: 'Comentario eliminado correctamente',
                    data: deleted,
                });
            } else {
                throw new Error('No se pudo eliminar el comentario');
            }
        });
    } catch (error) {
        console.log(error);
    }
};

export default deleteCommentController;