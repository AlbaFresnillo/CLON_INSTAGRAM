import { likeAlreadyExistsError } from '../../services/errorService.js';
import insertLikeModel from '../../models/reels/insertLikeModel.js';
import selectReelByIdModel from '../../models/reels/selectReelByIdModel.js';

const likeReelController = async (req, res, next) => {
    try {
        const { reelId } = req.params;
        const { value } = req.body;

        const reel = await selectReelByIdModel(reelId);

        // el dueño del reel no puede dar like a su propio reel
        if(reel.userId === req.user.id) likeAlreadyExistsError();

        // Insertamos el like en la base de datos y obtenemos la nueva media de likes.
        const likesSum = await insertLikeModel(value, reelId, req.user.id);

         // Enviamos una respuesta al cliente con la información actualizada.
        res.send({
            status: 'ok',
            data: likesSum,
            message: '❤️'
        });
    } catch (err) {
        if (err.name === 'SequelizeUniqueConstraintError') {
            likeAlreadyExistsError();
        } else {
            next(err);
        }
    }
};

export default likeReelController;