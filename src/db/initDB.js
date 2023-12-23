import dotenv from 'dotenv';
dotenv.config();

import getPool from './getPool.js';
import {v4 as uuidv4} from 'uuid';

// Generar un UUID
const newUUID = uuidv4();

const initDB = async () => {
    try {
        let pool = await getPool();

   
        console.log('Creando base de datos...');
        await pool.query('CREATE DATABASE IF NOT EXISTS instahab');

        console.log('Usando la base de datos...');
        await pool.query('USE instahab');

        console.log('Eliminando tablas si existen...');
        await pool.query('DROP TABLE IF EXISTS users, posts, postPhotos, postLikes, postComments');

        console.log('Creando tablas...');
        await pool.query(`
        CREATE TABLE IF NOT EXISTS users (
            id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
            email VARCHAR(100) UNIQUE NOT NULL,
            username VARCHAR(30) UNIQUE NOT NULL,
            password VARCHAR(100) NOT NULL,
            active BOOLEAN DEFAULT false,
            role ENUM('admin', 'normal') DEFAULT 'normal',
            registrationCode CHAR(30),
            recoverPassCode CHAR(10),
            createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            modifiedAt DATETIME ON UPDATE CURRENT_TIMESTAMP

            )
        `);

        await pool.query(`
        CREATE TABLE IF NOT EXISTS posts (
          id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
          text VARCHAR(280),
          userId INT NOT NULL,
          createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY (userId) REFERENCES users(id)
          )
        `);

        await pool.query(`
        CREATE TABLE IF NOT EXISTS postPhotos (
            id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
            name VARCHAR(100) NOT NULL,
            postId INT NOT NULL,
            FOREIGN KEY (postId) REFERENCES posts(id),
            createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
        )
`);


        await pool.query(`
        CREATE TABLE IF NOT EXISTS postLikes (
            id INTEGER UNSIGNED PRIMARY KEY AUTO_INCREMENT,
            value TINYINT UNSIGNED NOT NULL,
            userId INT NOT NULL,
            postId INT NOT NULL,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (userId) REFERENCES users(id),
            FOREIGN KEY (postId) REFERENCES posts(id),
            UNIQUE KEY unique_like (userId, postId)
          )
        `);

        await pool.query(`
        CREATE TABLE IF NOT EXISTS postComments (
            id INT AUTO_INCREMENT PRIMARY KEY,
            userId INT NOT NULL,
            postId INT NOT NULL,
            comment_text VARCHAR(280) NOT NULL,
            createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (userId) REFERENCES users(id),
            FOREIGN KEY (postId) REFERENCES posts(id)
          )
        `);

 // Ejecutar las consultas para crear las tablas

 console.log('Tabla "users" creada correctamente.');

 console.log('Tabla "posts" creada correctamente.');

 console.log('Tabla "postPhotos" creada correctamente.');

 console.log('Tabla "postlikes" creada correctamente.');

 console.log('Tabla "comments" creada correctamente.');

 pool.end();
    } catch (error) {
        console.error('Ha habido un error al crear:', error);
        pool.end();
    }
};

initDB();