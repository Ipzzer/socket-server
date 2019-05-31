import Server from './classes/server';
import router from './routes/router';
import bodyParser = require('body-parser');
import cors = require('cors');
// import cors from 'cors';

const server: any = Server.instance;

// Body Parser - Debe ir antes del router
server.app.use( bodyParser .urlencoded({  extended: true}) ); 
server.app.use( bodyParser.json() ); 

// CORS
server.app.use( cors( { origin: true, credentials: true } ) );

// Rutas de servicio
server.app.use('/', router);

server.start( () => {
    console.log(`Servidor corriendo en el puerto ${server.port}`);
});