// Cargar variables de entorno
// const config = require('./core/config');
import config from './core/config.js';
// const app = require('./app.js');
// import config from './core/config.js';
import app from './app.js';

const port = process.env.PORT || 3000;

//Verificador
app.listen(port, () => {
    console.log('corriendo en servidor en puerto:', port);
});