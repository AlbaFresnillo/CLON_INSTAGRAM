import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import fileUpload from 'express-fileupload';
import dotenv from 'dotenv';
import fs from 'fs/promises';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

import routes from './routes/index.js';
import { notFoundController, errorController } from './middlewares/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const server = express();

dotenv.config();
const { UPLOADS_DIR } = process.env;

// Verificar si el directorio UPLOADS_DIR existe, si no, créalo
async function ensureUploadsDirectory() {
    try {
        await fs.mkdir(UPLOADS_DIR, { recursive: true });
    } catch (error) {
        console.error('Error al crear el directorio UPLOADS_DIR:', error);
        throw error; // Lanzar el error para detener la aplicación si no se pudo crear el directorio
    }
}

// Llamar a la función para asegurarse de que el directorio exista
await ensureUploadsDirectory();

server.use(morgan('dev'));
server.use(express.json());
server.use(cors());
server.use(express.static(join(__dirname, UPLOADS_DIR)));
server.use(fileUpload());

// middleware de rutas
server.use(routes);

// middleware de ruta no encontrada
server.use(notFoundController);

// middleware de manejo de errores
server.use(errorController);

export default server;
