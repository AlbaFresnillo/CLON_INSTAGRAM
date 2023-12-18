import selectEntryByIdModel from "../../models/entries/selectEntryByIdModel.js";

const getEntryController = async (req, res, next) => {
    try {
        const {entryId} = req.params;

        const entry = await selectEntryByIdModel(entryId);

        res.send({
            status: 'ok',
            data: entry
        });
    
    } catch (error) {
        next(error);
    }
}

export default getEntryController;