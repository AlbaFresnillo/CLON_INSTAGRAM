import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import fileUpload from 'express-fileupload';
import routes from './routes/index.js';
import { errorController,notFoundController } from './middlewares/index.js';
import { PORT, UPLOADS_DIR } from '../env.js';
import dotenv from 'dotenv';
import listEndpoints from 'express-list-endpoints';

const server = express();

dotenv.config();
const { UPLOADS_DIR } = process.env;

server.use(morgan('dev'));
server.use(express.json());
server.use(cors());//acepta pedidos desde cualquier IP
server.use(express.static(UPLOADS_DIR));

//Middleware que desencripta un body en formato "form-data" creando la propiedad body y la propiedad files en el objeto request
server.use(fileUpload());

//middleware de rutas
server.use(routes);

//middleware de ruta no encontrada
server.use(notFoundController)

//middleware de manejo de errores
server.use(errorController);

//Ponemos el servidor a escuchar peticiones en un puerto dato
server.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});

const serverEndpoints = listEndpoints(server);
console.log('Rutas de la API:');
serverEndpoints.forEach(route => console.log(route.path));

export default server;
