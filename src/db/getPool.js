import mysql from "mysql2/promise";

// Obtenemos las variables de entorno necesarias mediante destructuring.
import { MYSQL_HOST, MYSQL_USER, MYSQL_PASSWORD, MYSQL_DATABASE } from "../../env.js";
//console.log("MYSQL_HOST desde getPool:", MYSQL_HOST);
// Variable que almacená un grupo (array) de conexiones.
let pool;

// Función que retorna un pool de conexiones con la base de datos.
const getPool = async () => {
  try {
    // Si la variable "pool" es undefined...
    if (!pool) {
      // Creamos una pool temporal.
      const poolTemp = mysql.createPool({
        host: MYSQL_HOST,
        user: MYSQL_USER,
        password: MYSQL_PASSWORD,
      });
     
      // Con el pool temporal creamos la base de datos si no existe.
      await poolTemp.query(`CREATE DATABASE IF NOT EXISTS ${MYSQL_DATABASE}`);

      // Creamos un grupo de conexiones.
      pool = mysql.createPool({
        connectionLimit: 10,
        host: MYSQL_HOST,
        user: MYSQL_USER,
        password: MYSQL_PASSWORD,
        database: MYSQL_DATABASE,
        timezone: "Z",
      });
    }

    // Retornamos un pool.
    return pool;
  } catch (err) {
     // Manejar el error específico y lanzar una excepción para ser capturada por el llamador.
     console.error('Error al obtener el pool de conexiones:', err);
     throw new Error('Error al obtener el pool de conexiones.');
  }
};

// Exportamos la función.
export default getPool;