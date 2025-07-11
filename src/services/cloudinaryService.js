// Importamos el SDK de Cloudinary
import cloudinary from 'cloudinary';
import { v4 as uuid } from 'uuid';

// importamos credenciales de env
import { CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_ACCESS_KEY } from '../../env.js';

// Configuramos Cloudinary con tus credenciales
cloudinary.config({ 
  cloud_name: CLOUDINARY_CLOUD_NAME, 
  api_key: CLOUDINARY_API_KEY, 
  api_secret: CLOUDINARY_ACCESS_KEY
});

/**
 * Sube una imagen a Cloudinary y devuelve la URL de la imagen.
 * @param {File} img - El archivo de imagen a subir.
 * @returns {Promise<string>} La URL de la imagen subida.
 */

export const cloudinaryService = async (img) => {
  try {
    // Subir la imagen a Cloudinary
    const imgName = `${uuid()}`;
    const result = await cloudinary.uploader.upload(img.tempFilePath, {
      folder: "diario_de_viajes", // Opcional: especifica una carpeta en Cloudinary
      public_id: imgName  // Opcional: especifica un ID público
    });

    // Devolver la URL segura de la imagen
    // https://res.cloudinary.com/dfqstzkd3/image/upload/v1705345009/z2aovgdkik7yar9wpkn2.png
    return result.secure_url;
  } catch (err) {
    console.error('Error al subir la imagen a Cloudinary:', err);
    throw new Error(err);
  }
};

export default {
  cloudinaryService
};