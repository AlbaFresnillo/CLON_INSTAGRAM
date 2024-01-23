// Importamos joi.
import joi from 'joi';

// Importamos los mensajes de error personalizados.
import joiErrorMessages from '../joiErrorMessages.js';

// Creamos el esquema de Joi donde comprobamos la propiedad "value".
const likeReelSchema = joi.object({
    value: joi
        .number()
        .valid(1, -1)
        .required()
        .messages(joiErrorMessages),
});

export default likeReelSchema;