import getPool from './getPool.js';
import fs from fs;

const initDB = async () => {
    // Variable que almacenará una conexión con la base de datos.
    let pool;

    try {
        pool = await getPool();

        console.log('Borrando tablas...');

        // Función para borrar el contenido de la carpeta 'uploads'
async function borrarContenidoUploads() {
  const uploadsFolder = 'uploads'; // Ajusta la ruta según tu estructura
  const files = await fs.promises.readdir(uploadsFolder);

  for (const file of files) {
      await fs.promises.unlink(path.join(uploadsFolder, file));
  }

  console.log('Contenido de la carpeta "uploads" borrado correctamente.');
}


       // await pool.query(
           // 'DROP TABLE IF EXISTS likes, reelPhotos, reels, users'
      //  );

        console.log('Creando tablas...');
        //Tabla de usuarios
        await pool.query(`
        CREATE TABLE IF NOT EXISTS users (
            id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
            email VARCHAR(100) UNIQUE NOT NULL,
            username VARCHAR(30) UNIQUE NOT NULL,
            password VARCHAR(100) NOT NULL,
            avatar VARCHAR(100),
            active BOOLEAN DEFAULT false,
            role ENUM('admin', 'normal') DEFAULT 'normal', 
            registrationCode CHAR(30),
            recoverPassCode CHAR(10),
            createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            modifiedAt DATETIME ON UPDATE CURRENT_TIMESTAMP

            )
        `);
          //Tabla de reels
        await pool.query(`
        CREATE TABLE IF NOT EXISTS reels (
          id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
          text VARCHAR(280),
          likes DOUBLE DEFAULT 0,
          userId INT NOT NULL,
          createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          modifiedAt DATETIME ON UPDATE CURRENT_TIMESTAMP,
          FOREIGN KEY (userId) REFERENCES users(id)
          )
        `);
          //Tabla de fotos
        await pool.query(`
        CREATE TABLE IF NOT EXISTS reelPhotos (
            id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
            name VARCHAR(100) NOT NULL,
            reelId INT NOT NULL,
            FOREIGN KEY (reelId) REFERENCES reels(id),
            createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
            modifiedAt DATETIME ON UPDATE CURRENT_TIMESTAMP
        )
`);

          //Tabla de likes
        await pool.query(`
        CREATE TABLE IF NOT EXISTS likes (
            id INTEGER UNSIGNED PRIMARY KEY AUTO_INCREMENT,
            userId INT NOT NULL,
            reelId INT NOT NULL,
            value INTEGER DEFAULT 0,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            modifiedAt DATETIME ON UPDATE CURRENT_TIMESTAMP,
            FOREIGN KEY (userId) REFERENCES users(id),
            FOREIGN KEY (reelId) REFERENCES reels(id),
            UNIQUE KEY unique_like (userId, reelId)
          )
        `);
          //Tabla de comentarios
        await pool.query(`
        CREATE TABLE IF NOT EXISTS comments (
            id INT AUTO_INCREMENT PRIMARY KEY,
            comment TEXT,
            userId INT NOT NULL,
            reelId INT NOT NULL,
            createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            modifiedAt DATETIME ON UPDATE CURRENT_TIMESTAMP,
            FOREIGN KEY (userId) REFERENCES users(id),
            FOREIGN KEY (reelId) REFERENCES reels(id)
          )
        `);

 // Ejecutar las consultas para crear las tablas

 console.log('Tabla "users" creada correctamente.');

 console.log('Tabla "reels" creada correctamente.');

 console.log('Tabla "reelPhotos" creada correctamente.');

 console.log('Tabla "likes" creada correctamente.');

 console.log('Tabla "comments" creada correctamente.');

   // Borrando contenido de la carpeta 'uploads'
   console.log('Borrando contenido de la carpeta "uploads"...');
   await borrarContenidoUploads();

 pool.end();
 console.log('Base de datos inicializada correctamente.');

    } catch (err) {
        console.error('Ha habido un error al crear:', err);
        pool.end();
    }
};

initDB();