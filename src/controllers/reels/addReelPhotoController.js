import insertPhotoModel from "../../models/reels/insertPhotoModel.js";
import selectReelByIdModel from "../../models/reels/selectReelByIdModel.js";
import { photoLimitError } from "../../services/errorService.js";
import { savePhotoService } from "../../services/photoService.js";

const addReelPhotoController = async (req, res, next) => {
    try {
        const {reelId} = req.params;
        
        // Ver si el reel tiene 8 fotos
        const reel = await selectReelByIdModel(reelId);
        
        if(reel.photos.length > 7) photoLimitError();
        const photoName = await savePhotoService(req.files.photo, 500);
        const photoId = await insertPhotoModel(photoName,reelId);

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

export default addReelPhotoController;