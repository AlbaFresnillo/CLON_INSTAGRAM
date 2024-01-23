import deleteLikeModel from "../../models/reels/deleteLikeModel.js";

const deleteLikeController = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const reelId = req.params.reelId;
        const likeId = req.params.likeId;

        const deletedLike = await deleteLikeModel(userId, reelId, likeId);

        if (!deletedLike) {
            return res.status(404).send({
                status: "error",
                message: "No like found with the provided parameters",
            });
        }

        res.send({
            status: "ok",
            message: 'Like eliminado correctamente',
            data: { deletedLike },
        });
    } catch (error) {
        return next(error);
    }
};

export default deleteLikeController;