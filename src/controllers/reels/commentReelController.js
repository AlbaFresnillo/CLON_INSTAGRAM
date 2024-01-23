import insertCommentModel from "../../models/reels/insertCommentModel.js";

const commentReelController = {
    async addComment(req, res, next) {
        try {
            const { reelId } = req.params;
            const { comment } = req.body;

            if (!req.reel) {
                return res.status(404).send({
                    status: 'fail',
                    message: 'Reel not found'
                });
            }


            await insertCommentModel(comment, req.user.id, reelId, next);

            res.status(200).json({
                status: 'ok',
                message: 'Comentario agregado correctamente',
                data: comment,
            });
        } catch (error) {
            next(error);
        }
    },
};

export default commentReelController;