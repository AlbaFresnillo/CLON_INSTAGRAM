// Importamos las dependencias.
import jwt from "jsonwebtoken";

// Importamos los errores.
import {
  notAuthenticatedError,
  invalidCredentialsError,
} from "../services/errorService.js";

import { SECRET } from "../../env.js";

// Función controladora intermedia que desencripta el token y crea la propiedad "req.user".
// Si no hay token lanza un error.
const authUserController = async (req, res, next) => {
  try {
    // Siempre debemos enviar el token a través de la propiedad "Authorization" de los headers.
    // Aunque la propiedad "Authorization" se escriba con "A" mayúscula, en node la recibimos
    // con la "a" minúscula.
    const { authorization } = req.headers;

    if (!authorization) {
      notAuthenticatedError();
    }

    // 'Bearer "encrypted token"
    const token = authorization.split(" ")[1];

    try {
      // Variable que almacenará la info del token.
      //console.log(SECRET);
      const tokenInfo = jwt.verify(token, SECRET);

      // Si hemos llegado hasta aquí quiere decir que el token ya se ha desencriptado.
      // Creamos la propiedad "user" en el objeto "request" (es una propiedad inventada).
      req.user = tokenInfo;
      // Después de asignar req.user
console.log('Información del usuario:', req.user);

      // Pasamos el control a la siguiente función controladora.
      next();
    } catch (err) {
      console.log('Error al verificar el token:',err);
      invalidCredentialsError();
    }
  } catch (err) {
    next(err);
  }
};

export default authUserController;