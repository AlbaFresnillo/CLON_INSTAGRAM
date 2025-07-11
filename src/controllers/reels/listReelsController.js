import selectAllReelsModel from "../../models/reels/selectAllReelsModel.js";

const listReelsController = async (req, res, next) => {

    try {
        const reels = await selectAllReelsModel();

        res.send({
            data: reels
        })
    } catch (error) {
        console.error('Error en listReelsController:', error);
        next(error);
    }
}

export default listReelsController;