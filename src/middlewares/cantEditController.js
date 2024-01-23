import selectReelByIdModel from "../models/reels/selectReelByIdModel.js";
import { unauthorizedUserError } from "../services/errorService.js";

const cantEditController = async (req, res, next) => {
    try {
        
        const { reelId } = req.params;

        const reel = await selectReelByIdModel(reelId);

        // Si no somos propietarios no podemos editar nada
        if (reel.userId !== req.user.id) {
            unauthorizedUserError();
        }
        next();
    } catch (err) {
        next(err);
    }
};

export default cantEditController;