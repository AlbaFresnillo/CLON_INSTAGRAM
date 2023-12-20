import selectPostByIdModel from "../models/posts/selectPostByIdModel.js";
import { unauthorizedUserError } from "../services/errorService.js";

const cantEditController = async (req, res, next) => {
    try {
        
        const { postId } = req.params;

        const post = await selectPostByIdModel(postId);

        // Si no somos propietarios no podemos editar nada
        if (post.userId !== req.user.id) unauthorizedUserError();

        next();
    } catch (error) {
        next(error);
    }
};

export default cantEditController;