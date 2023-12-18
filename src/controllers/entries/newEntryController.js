import insertEntryModel from "../../models/entries/insertEntryModel.js";
import insertPhotoModel from "../../models/entries/insertPhotoModel.js";
import { savePhotoService } from '../../services/photoService.js';

const newEntryController = async (req, res, next) => {
    try {
        
        const {title, place, description} = req.body;

        const entryId = await insertEntryModel (title, place, description, req.user.id);

        let photos=[];

        if (req.files){
            for (let photo of Object.values(req.files).slice(0,3)){

                let photoName = await savePhotoService(photo, 500);

                const photoId = await insertPhotoModel(photoName, entryId);

                photos.push({
                    id: photoId,
                    name: photoName
                })
            }
        }

        res. send({
            status: 'ok',
            data:{
                entry:{
                    id: entryId, 
                    title, 
                    place,
                    description,
                    userId: req.user.id,
                    photos,
                    createdAt: new Date()
                }
            }
        });
    } catch (error) {
        next(error);
    }
}

export default newEntryController;