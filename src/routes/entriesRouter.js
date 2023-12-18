import express from 'express';

// Creación de un enrutador Express
const router = express.Router();

// Importacón de controladores y middlewares necesarios para manejar las solicitudes de ruta 
import authUserController from '../middlewares/authUserController.js';

import {
    entryExistsController,
    userExistsController,
    cantEditController
} from '../middlewares/index.js';

import {
    newEntryController,
    listEntriesController,
    getEntryController,
    likeEntryController, 
    addEntryPhotoController,
    commentEntryController
} from '../controllers/entries/index.js';

// Configuración de las rutas
router.post('/entries', authUserController, userExistsController, newEntryController);

router.get('/entries', listEntriesController);

router.get('/entries/:entryId', entryExistsController, getEntryController);

router.post('/entries/:entryId/likes',
            authUserController,
            userExistsController,
            entryExistsController,
            likeEntryController  
);

router.post('/entries/:entryId/photos',
            authUserController,
            userExistsController,
            entryExistsController,
            cantEditController,
            addEntryPhotoController
);

router.post('/entries/:entryId/comments',
            authUserController,
            userExistsController,
            entryExistsController,
            commentEntryController.addComment
);

router.delete('/entries/comments/:commentId',
            authUserController,
            userExistsController,
            entryExistsController,
            commentEntryController.deleteComment
)
export default router;
