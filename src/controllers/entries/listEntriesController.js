import selectAllEntriesModel from "../../models/entries/selectAllEntriesModel.js";

const listEntriesController = async (req, res, next) => {

    try {
        const entries = await selectAllEntriesModel();

        res.send({
            data: entries
        })
    } catch (error) {
        next(error);
    }
}

export default listEntriesController;