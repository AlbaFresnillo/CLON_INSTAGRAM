// Importamos las dependencias.
import { v4 as uuid } from 'uuid';

// Importamos la función que devuelve una conexión con la base de datos.
import getPool from '../../db/getPool.js';

// Importamos los errores.
import { likeAlreadyExistsError } from '../../services/errorService.js';

// Función que realiza una consulta a la base de datos para votar una entrada.
const insertLikeModel = async (value, reelId, userId) => {
    const pool = await getPool();

    // Comprobamos si ya existe un voto previo por parte del usuario que está intentando
    // votar.
    const [likes] = await pool.query(
        `SELECT id FROM likes WHERE userId = ? AND reelId = ?`,
        [userId, reelId]
    );

    // Si la longitud del array de votos es mayor que cero lanzamos un error indicando
    // que la entrada ya ha sido votada por este usuario.
    if (likes.length > 0) {
        likeAlreadyExistsError();
    }

    // Insertamos el voto.
    await pool.query(
        `INSERT INTO likes(id, value, reelId, userId) VALUES(?, ?, ?, ?)`,
        [uuid(), value, reelId, userId]
    );

  // Obtenemos la suma de votos.
const [likesSum] = await pool.query(
    `SELECT SUM(value) AS sum FROM likes WHERE reelId = ?`,
    [reelId]
);

// Retornamos la suma de likes

return Number(likesSum[0].sum);
};

export default insertLikeModel;