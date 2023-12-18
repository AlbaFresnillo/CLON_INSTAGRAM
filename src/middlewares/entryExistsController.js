import getPool from "../db/getPool.js";
import { notFoundError } from "../services/errorService.js";

const entryExistsController = async (req, res, next) => {

    try{
        const pool = await getPool();
        
        const {entryId} = req.params;

        const [entry] = await pool.query(
            `
                SELECT id FROM entries WHERE id = ${entryId}
            `
        );

        if(entry.length < 1) notFoundError('entrada');

        next();
    } catch (error) {
        next(error)
    }
}

export default entryExistsController;