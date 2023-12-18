import insertPhotoModel from "../../models/entries/insertPhotoModel.js";
import selectEntryByIdModel from "../../models/entries/selectEntryByIdModel.js";
import { photoLimitError } from "../../services/errorService.js";
import { savePhotoService } from "../../services/photoService.js";

const addEntryPhotoController = async (req, res, next) => {
    try {
        const {entryId} = req.params;
        
        // Ver si la entrada tiene 8 fotos
        const entry = await selectEntryByIdModel(entryId);
        
        if(entry.photos.length > 7) photoLimitError();
        const photoName = await savePhotoService(req.files.photo, 500);
        const photoId = await insertPhotoModel(photoName,entryId);

        res.send({
            status: 'ok',
            data:{
                photo:{
                    id: photoId,
                    name: photoName
                }
            }
        })
    } catch (error) {
        next(error);
    }
}

export default addEntryPhotoController;