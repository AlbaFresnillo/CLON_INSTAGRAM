import insertReelModel from "../../models/reels/insertReelModel.js";
import insertPhotoModel from "../../models/reels/insertPhotoModel.js";
import { savePhotoService } from '../../services/photoService.js';

const newReelController = async (req, res, next) => {
    try {
        
        const {text, image} = req.body;

        const reelId = await insertReelModel (text,image, req.user.id);

        let photos=[];

        if (req.files){
            for (let photo of Object.values(req.files).slice(0,8)){

                let photoName = await savePhotoService(photo, 500);

                const photoId = await insertPhotoModel(photoName, reelId);

                photos.push({
                    id: photoId,
                    name: photoName
                })
            }
        }

        res. send({
            status: 'ok',
            data:{
                reel:{
                    id: reelId, 
                    text,                 
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

export default newReelController;