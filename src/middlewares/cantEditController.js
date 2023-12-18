import selectEntryByIdModel from "../models/entries/selectEntryByIdModel.js";
import { unauthorizedUserError } from "../services/errorService.js";

const cantEditController = async (req, res, next) => {
    try {
        
        const { entryId } = req.params;

        const entry = await selectEntryByIdModel(entryId);

        // Si no somos propietarios no podemos editar nada
        if (entry.userId !== req.user.id) unauthorizedUserError();

        next();
    } catch (error) {
        next(error);
    }
}

export default cantEditController;