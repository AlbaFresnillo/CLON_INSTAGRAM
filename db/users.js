import bcrypt from 'bcrypt';
import { generateError } from '../helpers';
import { getConnection } from './getPool';
import { v4 as uuidv4 } from 'uuid';


// Devuelve la información pública de un usuario por su email
const getUserByEmail = async (email) => {
  let connection;

  try {
    connection = await getConnection();

    const [result] = await connection.query(
      `
      SELECT * FROM users WHERE email = ?
    `,
      [email]
    );

    if (result.length === 0) {
      throw generateError('No hay ningún usuario con ese email', 404);
    }

    return result[0];
  } finally {
    if (connection) connection.release();
  }
};

// Devuelve la información pública de un usuario por su id
const getUserById = async (id) => {
  let connection;

  try {
    connection = await getConnection();

    const [result] = await connection.query(
      `
      SELECT id, email, created_at FROM users WHERE id = ?
    `,
      [id]
    );

    if (result.length === 0) {
      throw generateError('No hay ningún usuario con esa id', 404);
    }

    return result[0];
  } finally {
    if (connection) connection.release();
  }
};

// Crea un usuario en la base de datos y devuelve su id
const createUser = async (email, password) => {
  let connection;

  try {
    connection = await getConnection();
    //Comprobar que no exista otro usuario con ese email
    const [existingUser] = await connection.query(
      `
      SELECT id,authenticated FROM users WHERE email = ?
    `,
      [email]
    );
    // Si el usuario existe
    if (existingUser.length > 0) {

      const user = existingUser[0];
      // Si ya está autenticado, no es necesario hacer nada más
      if (user.authenticated) {
        return user.id; // Devolver el ID actual
      }

    // Si no está autenticado, actualizar el ID a uno autenticado
  const authenticatedUserId = uuidv4(); // Generar un nuevo ID autenticado

  await connection.query(
    `
    UPDATE users SET id = ?, authenticated = 1 WHERE email = ?
  `,
    [authenticatedUserId, email]
  );

  return authenticatedUserId; // Devolver el nuevo ID autenticado
}

  // Si el usuario no existe, crear un nuevo usuario con UUID por defecto
const userId = uuidv4(); // Generar un ID único para el usuario

  // Encriptar la contraseña
const passwordHash = await bcrypt.hash(password, 8);


await connection.query(
  `
  INSERT INTO users (id, email, password, authenticated) VALUES (?, ?, ?, 0)
`,
  [userId, email, passwordHash]
);

    return userId; // Devolver el ID generado por UUID
  } catch (error) {
    throw generateError('Error al crear el usuario', 500); // Manejar el error adecuadamente
  } finally {
    if (connection) connection.release();
  }
};
 

export {
  createUser,
  getUserById,
  getUserByEmail,
};