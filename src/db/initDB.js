import dotenv from 'dotenv';
dotenv.config();

import getPool from './getPool.js';
import {v4 as uuidv4} from 'uuid';

// Generar un UUID
const newUUID = uuidv4();

console.log("MYSQL_USER", process.env.MYSQL_USER)


const initDB = async () => {
    try {
        let pool = await getPool();

   
        console.log('Creando base de datos...');
        await pool.query('CREATE DATABASE IF NOT EXISTS instahab');

        console.log('Usando la base de datos...');
        await pool.query('USE instahab');

        console.log('Eliminando tablas si existen...');
        await pool.query('DROP TABLE IF EXISTS users, posts, likes, comments');

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
            createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);

        await pool.query(`
        CREATE TABLE IF NOT EXISTS posts (
          id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
          user_id INT NOT NULL,
          text VARCHAR(280) NOT NULL,
          image VARCHAR(100),
          createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY (user_id) REFERENCES users(id)
          )
        `);

        await pool.query(`
        CREATE TABLE IF NOT EXISTS likes (
            id INTEGER UNSIGNED PRIMARY KEY AUTO_INCREMENT,
            user_id INT NOT NULL,
            post_id INT NOT NULL,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (user_id) REFERENCES users(id),
            FOREIGN KEY (post_id) REFERENCES posts(id),
            UNIQUE KEY unique_like (user_id, post_id) 
          )
        `);

        await pool.query(`
        CREATE TABLE IF NOT EXISTS comments (
            id INT AUTO_INCREMENT PRIMARY KEY,
            user_id INT NOT NULL,
            post_id INT NOT NULL,
            comment_text VARCHAR(280) NOT NULL,
            createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (user_id) REFERENCES users(id),
            FOREIGN KEY (post_id) REFERENCES posts(id)
          )
        `);

 // Ejecutar las consultas para crear las tablas

 console.log('Tabla "users" creada correctamente.');

 console.log('Tabla "posts" creada correctamente.');

 console.log('Tabla "likes" creada correctamente.');

 console.log('Tabla "comments" creada correctamente.');

 pool.end();
    } catch (error) {
        console.error('Ha habido un error al crear la base de datos y las tablas.', error);
        pool.end();
    }
};

initDB();