import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import fileUpload from 'express-fileupload';
import dotenv from 'dotenv';

import routes from './routes/index.js';
import { notFoundController, errorController } from './middlewares/index.js';


const server = express();

dotenv.config();
const { UPLOADS_DIR } = process.env;

server.use(morgan('dev'));
server.use(express.json());
server.use(cors());//acepta pedidos desde cualquier IP
server.use(express.static(UPLOADS_DIR));
server.use(fileUpload());

//middleware de rutas
server.use(routes);

//middleware de ruta no encontrada
server.use(notFoundController)

//middleware de manejo de errores
server.use(errorController);

export default server;
